import { NextResponse } from "next/server";
import { site } from "@/lib/site";

// Receives contact enquiries and waitlist signups and emails them with Resend.
//
// Environment variables (set in Vercel, see .env.example):
//   RESEND_API_KEY            required. Resend API key (server only, never sent to the browser).
//   EMAIL_FROM                the sender, on a domain verified in Resend, e.g. "Nordic <hello@yourdomain.com>".
//   HOTEL_NOTIFICATION_EMAIL  where notifications go. Defaults to the contact email in lib/site.ts.
//
// A success response is only returned once Resend has accepted the hotel notification.
// Guest confirmation emails are sent as well when EMAIL_FROM is on a verified domain.

export const runtime = "nodejs";

const RESEND_URL = process.env.RESEND_API_URL || "https://api.resend.com/emails"; // override is for local testing only
const SANDBOX_FROM = "Nordic Website <onboarding@resend.dev>";
const MAX_BODY_BYTES = 20_000;
const EMAIL_RE = /^[^\s@<>"',;]+@[^\s@<>"',;]+\.[^\s@<>"',;]+$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const ID_RE = /^[A-Za-z0-9-]{8,64}$/;

type Kind = "enquiry" | "notify";
type Fields = Partial<Record<(typeof FIELD_KEYS)[number], string>>;

// field key -> max length. Multi-line text is only allowed for "message".
const LIMITS = {
  name: 100,
  email: 254,
  country: 100,
  interest: 80,
  guests: 80,
  stayLength: 60,
  checkIn: 10,
  checkOut: 10,
  dates: 80,
  message: 4000,
  source: 60,
} as const;
const FIELD_KEYS = Object.keys(LIMITS) as (keyof typeof LIMITS)[];

const LABELS: Record<keyof typeof LIMITS, string> = {
  name: "Name",
  email: "Email",
  country: "Country",
  interest: "Enquiry about",
  checkIn: "Arrival date",
  checkOut: "Departure date",
  dates: "Dates",
  guests: "Guests",
  stayLength: "Expected length of stay",
  message: "Message",
  source: "Sent from",
};

function clean(value: unknown, max: number, multiline = false): string {
  if (typeof value !== "string") return "";
  let v = value.normalize("NFC");
  // drop control characters (keep line breaks only where they make sense)
  v = multiline ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "") : v.replace(/[\u0000-\u001F\u007F]/g, " ");
  return v.trim().slice(0, max);
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);
}

function json(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

/* ---------- light abuse protection (per server instance) ---------- */

const hits = new Map<string, number[]>();
const RATE_WINDOW_MS = 10 * 60_000;
const RATE_MAX = 8;
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((t) => now - t < RATE_WINDOW_MS)) hits.delete(k);
  return recent.length > RATE_MAX;
}

// Same submission id twice (double click, retry) -> one email.
type Outcome = { status: number; body: Record<string, unknown> };
const inFlight = new Map<string, Promise<Outcome>>();
const done = new Map<string, number>();
const DONE_TTL_MS = 15 * 60_000;

/* ---------- Resend ---------- */

async function sendEmail(payload: Record<string, unknown>): Promise<{ ok: boolean; status: number; errorName?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  for (let attempt = 0; attempt < 2; attempt++) {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 10_000);
    try {
      const res = await fetch(RESEND_URL, {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: ctrl.signal,
      });
      if (res.ok) return { ok: true, status: res.status };
      let errorName: string | undefined;
      try {
        errorName = String(((await res.json()) as { name?: string }).name ?? "");
      } catch {}
      // retry once on a server-side hiccup; client errors will not improve
      if (res.status >= 500 && attempt === 0) continue;
      return { ok: false, status: res.status, errorName };
    } catch {
      if (attempt === 0) continue;
      return { ok: false, status: 0, errorName: "network_or_timeout" };
    } finally {
      clearTimeout(timer);
    }
  }
  return { ok: false, status: 0 };
}

/* ---------- email content ---------- */
// Branded, email-safe HTML (tables + inline styles, no website CSS or scripts).
// The plain-text version of every email is sent as well, so nothing depends on the HTML.

const SITE_URL = (process.env.SITE_URL || "https://nordic-website-flame.vercel.app").replace(/\/$/, "");
const C = { page: "#f6f1eb", card: "#ffffff", ink: "#26231f", muted: "#6b645d", line: "#e2d9ce", accent: "#b4583a", soft: "#fbf8f5" };
const SERIF = "Georgia, 'Times New Roman', serif";
const SANS = "Helvetica, Arial, sans-serif";

function nepalTime() {
  return new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kathmandu", dateStyle: "long", timeStyle: "short" }).format(new Date());
}

function submittedAt() {
  return `${nepalTime()} (Nepal time) · ${new Date().toISOString()}`;
}

/** 2027-02-10 -> 10 February 2027 (HTML only; the plain-text email keeps the raw value). */
function prettyDate(iso: string) {
  if (!DATE_RE.test(iso)) return iso;
  const d = new Date(`${iso}T12:00:00Z`);
  return new Intl.DateTimeFormat("en-GB", { timeZone: "UTC", dateStyle: "long" }).format(d);
}

function layout({ preheader, children }: { preheader: string; children: string }) {
  return `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light only"><meta name="supported-color-schemes" content="light only">
<title>Nordic Rooms &amp; Apartments</title>
<style>
@media only screen and (max-width:620px){
  .wrap{padding:16px 10px !important}
  .px{padding-left:22px !important;padding-right:22px !important}
  .col{display:block !important;width:100% !important;padding-right:0 !important}
  .lbl{padding-bottom:2px !important}
  .btn a{display:block !important}
}
</style></head>
<body style="margin:0;padding:0;background:${C.page};-webkit-text-size-adjust:100%">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${C.page}">${escapeHtml(preheader)}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.page}"><tr><td align="center" class="wrap" style="padding:32px 16px">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px">
    <tr><td align="center" style="padding:4px 0 22px">
      <img src="${SITE_URL}/images/logo.png" width="110" alt="NORDIC" style="display:block;width:110px;height:auto;border:0;font-family:${SERIF};font-size:18px;letter-spacing:3px;color:${C.ink}">
    </td></tr>
    <tr><td class="px" style="background:${C.card};border-top:3px solid ${C.accent};padding:34px 40px 30px;font-family:${SANS};font-size:15px;line-height:1.6;color:${C.ink}">
${children}
    </td></tr>
    <tr><td align="center" style="padding:20px 10px 4px;font-family:${SANS};font-size:12px;line-height:1.6;color:${C.muted}">
      Nordic Rooms &amp; Apartments &middot; Kathmandu, Nepal
    </td></tr>
  </table>
</td></tr></table>
</body></html>`;
}

const label = (t: string) =>
  `<p style="margin:0 0 10px;font-family:${SANS};font-size:11px;font-weight:bold;letter-spacing:2.5px;text-transform:uppercase;color:${C.accent}">${escapeHtml(t)}</p>`;
const heading = (t: string) =>
  `<h1 style="margin:0 0 22px;font-family:${SERIF};font-weight:normal;font-size:26px;line-height:1.25;color:${C.ink}">${escapeHtml(t)}</h1>`;

/** Label / value rows with subtle dividers. `html` values are already safe. */
function rowsTable(rows: { label: string; value: string; html?: boolean }[]) {
  const body = rows
    .map(
      (r) => `<tr>
  <td class="col lbl" width="150" valign="top" style="padding:11px 14px 11px 0;border-top:1px solid ${C.line};font-family:${SANS};font-size:13px;color:${C.muted}">${escapeHtml(r.label)}</td>
  <td class="col" valign="top" style="padding:11px 0;border-top:1px solid ${C.line};font-family:${SANS};font-size:15px;color:${C.ink}">${r.html ? r.value : escapeHtml(r.value)}</td>
</tr>`
    )
    .join("\n");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-bottom:1px solid ${C.line}">\n${body}\n</table>`;
}

const mailLink = (email: string) =>
  `<a href="mailto:${escapeHtml(email)}" style="color:${C.accent};text-decoration:underline">${escapeHtml(email)}</a>`;

function hotelEmail(kind: Kind, fields: Fields) {
  const title = kind === "enquiry" ? "New Guest Enquiry — Nordic" : "New Waitlist Signup — Nordic";
  const order: (keyof typeof LIMITS)[] = ["name", "email", "interest", "country", "checkIn", "checkOut", "dates", "guests", "stayLength", "message", "source"];
  const plain = order.filter((k) => fields[k]).map((k) => [LABELS[k], fields[k] as string] as const);
  plain.push(["Submitted", submittedAt()]);
  const text = `${title}\n\n${plain.map(([l, v]) => (l === "Message" ? `${l}:\n${v}` : `${l}: ${v}`)).join("\n")}\n`;

  // HTML rows (everything submitted is shown; message gets its own block)
  const rows: { label: string; value: string; html?: boolean }[] = [];
  const add = (k: keyof typeof LIMITS, fmt?: (v: string) => string) => {
    if (fields[k]) rows.push({ label: LABELS[k], value: fmt ? fmt(fields[k] as string) : (fields[k] as string) });
  };
  if (kind === "enquiry") {
    add("name");
    if (fields.email) rows.push({ label: LABELS.email, value: mailLink(fields.email), html: true });
    add("interest");
    add("country");
    add("checkIn", prettyDate);
    add("checkOut", prettyDate);
    add("dates");
    add("guests");
    add("stayLength");
    add("source");
  } else {
    if (fields.email) rows.push({ label: LABELS.email, value: mailLink(fields.email), html: true });
    add("source");
    add("checkIn", prettyDate);
    add("checkOut", prettyDate);
    add("guests");
    add("name");
  }
  rows.push({ label: "Submitted", value: `${nepalTime()} (Nepal time)` });

  let children: string;
  if (kind === "enquiry") {
    const subject = encodeURIComponent("Re: Your enquiry to Nordic Rooms & Apartments");
    const message = fields.message
      ? `<p style="margin:26px 0 8px;font-family:${SANS};font-size:11px;font-weight:bold;letter-spacing:2.5px;text-transform:uppercase;color:${C.muted}">Message</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="background:${C.soft};border-left:3px solid ${C.accent};padding:16px 18px;font-family:${SANS};font-size:15px;line-height:1.65;color:${C.ink}">${escapeHtml(fields.message).replace(/\n/g, "<br>")}</td></tr></table>`
      : "";
    children = `${label("New guest enquiry")}
${heading("A new message from your guest.")}
${rowsTable(rows)}
${message}
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0 6px"><tr><td class="btn" bgcolor="${C.accent}" style="background:${C.accent};border-radius:4px"><a href="mailto:${escapeHtml(fields.email || "")}?subject=${subject}" style="display:inline-block;padding:13px 26px;font-family:${SANS};font-size:15px;color:#ffffff;text-decoration:none">Reply to Guest</a></td></tr></table>
<p style="margin:14px 0 0;font-family:${SANS};font-size:13px;color:${C.muted}">You can also reply to this email. It goes straight to the guest.</p>`;
  } else {
    children = `<h1 style="margin:0 0 20px;font-family:${SERIF};font-weight:normal;font-size:22px;letter-spacing:3px;line-height:1.3;color:${C.ink}">NEW WAITLIST SIGNUP</h1>
${rowsTable(rows)}`;
  }
  const preheader = kind === "enquiry" ? `New enquiry from ${fields.name || "a guest"}` : `${fields.email || "Someone"} joined the waitlist`;
  return { subject: title, text, html: layout({ preheader, children }) };
}

function guestEmail(kind: Kind, name: string) {
  const sign = "Nordic Rooms & Apartments\nKathmandu, Nepal";
  if (kind === "enquiry") {
    const text = `Hello ${name},\n\nThank you for contacting Nordic Rooms & Apartments.\n\nWe have received your message and will get back to you as soon as possible.\n\n${sign}\n`;
    const children = `${label("Message received")}
${heading(`Hello ${name},`)}
<p style="margin:0 0 14px">Thank you for contacting Nordic Rooms &amp; Apartments.</p>
<p style="margin:0 0 26px">We have received your message and will get back to you as soon as possible.</p>
<p style="margin:0;padding-top:18px;border-top:1px solid ${C.line};font-family:${SERIF};font-size:16px;line-height:1.5;color:${C.ink}">Nordic Rooms &amp; Apartments<br><span style="font-family:${SANS};font-size:13px;color:${C.muted}">Kathmandu, Nepal</span></p>`;
    return { subject: "We received your message — Nordic Rooms & Apartments", text, html: layout({ preheader: "We received your message and will reply soon.", children }) };
  }
  const text = `Hello,\n\nThank you for your interest in Nordic Rooms & Apartments.\n\nYou are on our waitlist. We open in ${site.opening}, and we will email you with opening updates. This is not a reservation, and no dates or availability are confirmed yet.\n\n${sign}\n`;
  const children = `${label("Waitlist")}
${heading("You are on the list.")}
<p style="margin:0 0 14px">Thank you for your interest in Nordic Rooms &amp; Apartments.</p>
<p style="margin:0 0 14px">We open in ${escapeHtml(site.opening)}, and we will email you with opening updates.</p>
<p style="margin:0 0 26px;font-size:13px;color:${C.muted}">This is not a reservation, and no dates or availability are confirmed yet.</p>
<p style="margin:0;padding-top:18px;border-top:1px solid ${C.line};font-family:${SERIF};font-size:16px;line-height:1.5;color:${C.ink}">Nordic Rooms &amp; Apartments<br><span style="font-family:${SANS};font-size:13px;color:${C.muted}">Kathmandu, Nepal</span></p>`;
  return { subject: "You are on the waitlist — Nordic Rooms & Apartments", text, html: layout({ preheader: "You are on the Nordic waitlist.", children }) };
}

/* ---------- handler ---------- */

async function handle(kind: Kind, fields: Fields): Promise<Outcome> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set, so no email was sent.");
    return { status: 503, body: { error: "Email is not set up yet." } };
  }
  const configuredFrom = process.env.EMAIL_FROM || process.env.CONTACT_FROM_EMAIL;
  const from = configuredFrom || SANDBOX_FROM;
  const hotelTo = process.env.HOTEL_NOTIFICATION_EMAIL || process.env.CONTACT_TO_EMAIL || site.contact.email;
  // Guest confirmations only go out from a real sending domain (Resend's test sender cannot email guests).
  const canConfirm = !!configuredFrom && !/@resend\.dev/i.test(configuredFrom);

  const hotel = hotelEmail(kind, fields);
  const sent = await sendEmail({ from, to: [hotelTo], reply_to: fields.email, ...hotel });
  if (!sent.ok) {
    console.error("[contact] Resend rejected the hotel notification", { status: sent.status, error: sent.errorName });
    return { status: 502, body: { error: "We could not send your message right now." } };
  }

  if (canConfirm && fields.email) {
    const guest = guestEmail(kind, fields.name || "there");
    const c = await sendEmail({ from, to: [fields.email], reply_to: hotelTo, ...guest });
    if (!c.ok) console.error("[contact] Guest confirmation was not sent", { status: c.status, error: c.errorName });
  }
  return { status: 200, body: { ok: true } };
}

export async function POST(req: Request) {
  // Browser requests from another website are not accepted.
  const origin = req.headers.get("origin");
  const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
  if (origin) {
    try {
      if (new URL(origin).host !== host) return json({ error: "Not allowed." }, 403);
    } catch {
      return json({ error: "Not allowed." }, 403);
    }
  }

  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) return json({ error: "Too many requests. Please try again in a few minutes." }, 429);

  let raw: string;
  try {
    raw = await req.text();
  } catch {
    return json({ error: "Invalid request." }, 400);
  }
  if (raw.length > MAX_BODY_BYTES) return json({ error: "Request is too large." }, 413);

  let body: Record<string, unknown>;
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error();
    body = parsed as Record<string, unknown>;
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  // Hidden field that people never see: bots fill it in. Pretend it worked, send nothing.
  if (typeof body.website === "string" && body.website.trim() !== "") return json({ ok: true });

  const kind: Kind = body.type === "enquiry" ? "enquiry" : "notify";

  const fields: Fields = {};
  for (const key of FIELD_KEYS) {
    const v = clean(body[key], LIMITS[key], key === "message");
    if (v) fields[key] = v;
  }
  if (!fields.email || !EMAIL_RE.test(fields.email)) return json({ error: "Please enter a valid email." }, 400);
  if (kind === "enquiry" && !fields.name) return json({ error: "Please enter your name." }, 400);
  for (const k of ["checkIn", "checkOut"] as const) if (fields[k] && !DATE_RE.test(fields[k] as string)) delete fields[k];
  if (!fields.source) {
    try {
      fields.source = new URL(req.headers.get("referer") || "").pathname.slice(0, LIMITS.source) || undefined;
    } catch {}
  }

  const requestId = typeof body.requestId === "string" && ID_RE.test(body.requestId) ? body.requestId : "";
  if (requestId) {
    const now = Date.now();
    for (const [id, t] of done) if (now - t > DONE_TTL_MS) done.delete(id);
    if (done.has(requestId)) return json({ ok: true });
    const running = inFlight.get(requestId);
    if (running) {
      const r = await running;
      return json(r.body, r.status);
    }
  }

  const job = handle(kind, fields);
  if (requestId) inFlight.set(requestId, job);
  try {
    const result = await job;
    if (requestId && result.status === 200) done.set(requestId, Date.now());
    return json(result.body, result.status);
  } catch {
    console.error("[contact] Unexpected error while sending");
    return json({ error: "We could not send your message right now." }, 500);
  } finally {
    if (requestId) inFlight.delete(requestId);
  }
}
