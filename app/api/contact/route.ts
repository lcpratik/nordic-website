import { NextResponse } from "next/server";

// Receives "notify me" signups and contact form enquiries.
// If RESEND_API_KEY and CONTACT_TO_EMAIL are set (see .env.example), each one is emailed to you.
// Otherwise it is printed in the server log, so nothing breaks while you set things up.

const MAX_LEN = 4000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim().slice(0, MAX_LEN) : "";
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const type = clean(body.type) === "enquiry" ? "enquiry" : "notify";
  const email = clean(body.email);
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  const fields: Record<string, string> = {};
  for (const key of ["name", "email", "country", "interest", "dates", "guests", "stayLength", "message", "source", "checkIn", "checkOut"]) {
    const v = clean(body[key]);
    if (v) fields[key] = v;
  }
  if (type === "enquiry" && !fields.name) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }

  const subject = type === "enquiry" ? `New enquiry from ${fields.name}` : `New "notify me" signup: ${email}`;
  const lines = Object.entries(fields).map(([k, v]) => `${k}: ${v}`);

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || "Nordic Website <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.log(`[contact] ${subject}\n${lines.join("\n")}`);
    return NextResponse.json({ ok: true });
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject,
      text: lines.join("\n"),
      html: `<p>${lines.map(escapeHtml).join("<br>")}</p>`,
    }),
  });

  if (!res.ok) {
    console.error("[contact] Email failed", res.status, await res.text());
    return NextResponse.json({ error: "Could not send right now." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
