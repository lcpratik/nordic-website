"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import DatePicker, { pretty, toISO } from "./DatePicker";

const ENQUIRY_TYPES = [
  { key: "general", label: "General enquiry" },
  { key: "private", label: "Private room" },
  { key: "bunk", label: "Bunk room" },
  { key: "apartment", label: "Apartment or long stay" },
  { key: "group", label: "Group stay" },
  { key: "arrival", label: "Arrival question" },
];

const STAY_LENGTHS = ["A few nights", "About a week", "Two to four weeks", "A month or more"];

/** Contact page enquiry form. Sends to /api/contact. */
export default function EnquiryForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [picker, setPicker] = useState<"in" | "out" | null>(null);
  const [interest, setInterest] = useState(ENQUIRY_TYPES[0].label);

  // Links such as /contact?interest=apartment open the form with that enquiry type chosen.
  useEffect(() => {
    const key = new URLSearchParams(window.location.search).get("interest");
    const match = ENQUIRY_TYPES.find((t) => t.key === key);
    if (match) setInterest(match.label);
  }, []);
  const today = toISO(new Date());
  const dayAfter = (iso: string) => toISO(new Date(new Date(iso + "T00:00").getTime() + 86400000));

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "enquiry", ...data }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="stack" style={{ gap: 12, padding: "24px 0" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/mark.png" alt="" style={{ width: 64, height: "auto" }} />
        <h2 className="h3">Thank you.</h2>
        <p className="body" style={{ fontSize: 15 }}>
          Your message is with us. We aim to reply within a day.
        </p>
      </div>
    );
  }

  return (
    <form className="stack" style={{ gap: 18 }} onSubmit={submit}>
      <h2 className="h3" style={{ fontSize: 28, lineHeight: 1.25 }}>
        Tell us how you would like to stay
      </h2>
      <p className="small" style={{ margin: 0, fontSize: 13 }}>
        Fields marked * are required.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
        <div className="field">
          <label htmlFor="c-name">Name *</label>
          <input id="c-name" name="name" required autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="c-email">Email *</label>
          <input id="c-email" name="email" type="email" required autoComplete="email" />
        </div>
        <div className="field">
          <label htmlFor="c-country">Country</label>
          <input id="c-country" name="country" autoComplete="country-name" />
        </div>
        <div className="field">
          <label htmlFor="c-stay">Enquiry about</label>
          <select id="c-stay" name="interest" value={interest} onChange={(e) => setInterest(e.target.value)}>
            {ENQUIRY_TYPES.map((t) => (
              <option key={t.key} value={t.label}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <div style={{ gridColumn: "1 / -1", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          <div className="field">
            <label htmlFor="c-checkin">Arrival date</label>
            <DatePicker
              id="c-checkin"
              label="Arrival date"
              variant="field"
              placement="down"
              placeholder="Choose a day"
              value={checkIn}
              min={today}
              open={picker === "in"}
              onOpenChange={(o) => setPicker(o ? "in" : null)}
              onChange={(iso) => {
                setCheckIn(iso);
                if (checkOut && checkOut <= iso) setCheckOut("");
                setPicker("out");
              }}
            />
          </div>
          <div className="field">
            <label htmlFor="c-checkout">Departure date</label>
            <DatePicker
              id="c-checkout"
              label="Departure date"
              variant="field"
              placement="down"
              placeholder="Choose a day"
              value={checkOut}
              min={checkIn ? dayAfter(checkIn) : today}
              rangeStart={checkIn}
              open={picker === "out"}
              onOpenChange={(o) => setPicker(o ? "out" : null)}
              onChange={setCheckOut}
            />
          </div>
          {/* Sent with the enquiry: exact days, plus a readable range for the email. */}
          <input type="hidden" name="checkIn" value={checkIn} />
          <input type="hidden" name="checkOut" value={checkOut} />
          <input
            type="hidden"
            name="dates"
            value={checkIn && checkOut ? `${pretty(checkIn)} to ${pretty(checkOut)}` : checkIn ? `From ${pretty(checkIn)}` : ""}
          />
        </div>
        <div className="field">
          <label htmlFor="c-guests">Guests</label>
          <input id="c-guests" name="guests" placeholder="e.g. 2 adults" />
        </div>
        <div className="field">
          <label htmlFor="c-length">Expected length of stay</label>
          <select id="c-length" name="stayLength" defaultValue="">
            <option value="">Not sure yet</option>
            {STAY_LENGTHS.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="field">
        <label htmlFor="c-msg">Additional requirements or message</label>
        <textarea id="c-msg" name="message" rows={4} />
      </div>
      <div className="consent" style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13, lineHeight: 1.6, color: "var(--muted)" }}>
        <input id="c-consent" name="consent" type="checkbox" required style={{ width: 18, height: 18, margin: "2px 0 0" }} />
        <label htmlFor="c-consent">
          I agree to the <Link href="/privacy">Privacy Policy</Link> and to being contacted about my enquiry. *
        </label>
      </div>
      <button type="submit" className="btn" style={{ alignSelf: "flex-start", minHeight: 50, padding: "0 30px" }} disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send Enquiry"}
      </button>
      {status === "error" && (
        <p role="alert" style={{ margin: 0, fontSize: 14, color: "var(--terracotta-text)" }}>
          Something went wrong. Please try again or message us on WhatsApp.
        </p>
      )}
    </form>
  );
}
