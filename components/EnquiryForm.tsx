"use client";

import Link from "next/link";
import { useState } from "react";

/** Contact page enquiry form. Sends to /api/contact. */
export default function EnquiryForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

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
          <label htmlFor="c-stay">Interested in</label>
          <select id="c-stay" name="interest" defaultValue="A room">
            <option>A room</option>
            <option>An apartment</option>
            <option>A group stay</option>
            <option>Not sure yet</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="c-dates">Dates</label>
          <input id="c-dates" name="dates" placeholder="e.g. Feb 2027" />
        </div>
        <div className="field">
          <label htmlFor="c-guests">Guests</label>
          <input id="c-guests" name="guests" placeholder="e.g. 2 adults" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="c-msg">Message</label>
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
