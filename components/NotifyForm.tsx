"use client";

import { useRef, useState } from "react";
import { newRequestId } from "@/lib/requestId";

/** Email signup used for "Be the first to know". Sends to /api/contact. */
export default function NotifyForm({
  source,
  details,
  successText = "Thank you. You are on the list.",
  buttonText = "Notify me",
}: {
  source: string;
  details?: Record<string, string>;
  successText?: string;
  buttonText?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const busy = useRef(false);
  const requestId = useRef(newRequestId());

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy.current) return; // ignore repeated clicks or Enter presses while sending
    busy.current = true;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "notify", email, source, requestId: requestId.current, ...details }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    } finally {
      busy.current = false;
    }
  };

  if (status === "done") {
    return <p className="notify-msg" style={{ margin: 0, fontSize: 15, color: "var(--terracotta-text)" }}>{successText}</p>;
  }

  return (
    <form className="pill-form" onSubmit={submit}>
      <label htmlFor={`notify-${source}`} className="sr-only">
        Email address
      </label>
      <input
        id={`notify-${source}`}
        type="email"
        required
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit" className="btn" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : buttonText}
      </button>
      {status === "error" && (
        <p role="alert" className="notify-msg" style={{ margin: 0, width: "100%", fontSize: 14, color: "var(--terracotta-text)" }}>
          Something went wrong. Please try again or message us on WhatsApp.
        </p>
      )}
    </form>
  );
}
