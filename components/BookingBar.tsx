"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import DatePicker, { toISO } from "./DatePicker";
import NotifyForm from "./NotifyForm";
import styles from "./BookingBar.module.css";

function CalendarIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#5F5852" strokeWidth="1.3" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="1.5" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <line x1="8" y1="3" x2="8" y2="7" />
      <line x1="16" y1="3" x2="16" y2="7" />
    </svg>
  );
}

/**
 * Floating booking bar in the hero.
 * Before booking opens, "Join the Waitlist" shows a small "booking opens soon" card with an email signup.
 * When site.bookingUrl is set, it sends guests to the booking engine with their dates instead.
 */
export default function BookingBar({ style }: { style?: React.CSSProperties }) {
  const [open, setOpen] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("Room, 1 Adult");
  const [picker, setPicker] = useState<"in" | "out" | null>(null);
  const today = toISO(new Date());

  const onBook = () => {
    if (site.bookingUrl) {
      const url = new URL(site.bookingUrl);
      if (checkIn) url.searchParams.set("checkin", checkIn);
      if (checkOut) url.searchParams.set("checkout", checkOut);
      window.location.href = url.toString();
      return;
    }
    setOpen(true);
  };

  return (
    <div id="book" className={styles.wrap} style={style}>
      <p className={styles.opening}>Opening {site.opening}</p>

      {open && (
        <div className={styles.card} role="dialog" aria-label="Booking opens soon">
          <div className={styles.cardTop}>
            <div>
              <p className={styles.cardTitle}>Booking opens soon.</p>
              <p className={styles.cardText}>
                We open in {site.opening}. Leave your email and you will be the first to book.
              </p>
            </div>
            <button type="button" className={styles.x} aria-label="Close" onClick={() => setOpen(false)}>
              ✕
            </button>
          </div>
          <NotifyForm
            source="booking-bar"
            details={{ checkIn, checkOut, guests }}
            successText="Thank you. We will email you when booking opens."
          />
        </div>
      )}

      <div className={styles.bar}>
        <div className={styles.cell}>
          <CalendarIcon />
          <div className={styles.fieldBox}>
            <label htmlFor="checkin">Check-in Date</label>
            <DatePicker
              id="checkin"
              label="Check-in date"
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
        </div>
        <span className={styles.sep} aria-hidden="true">◆</span>
        <div className={styles.cell}>
          <CalendarIcon />
          <div className={styles.fieldBox}>
            <label htmlFor="checkout">Check-out Date</label>
            <DatePicker
              id="checkout"
              label="Check-out date"
              value={checkOut}
              min={checkIn ? toISO(new Date(new Date(checkIn + "T00:00").getTime() + 86400000)) : today}
              rangeStart={checkIn}
              open={picker === "out"}
              onOpenChange={(o) => setPicker(o ? "out" : null)}
              onChange={setCheckOut}
            />
          </div>
        </div>
        <span className={styles.sep} aria-hidden="true">◆</span>
        <div className={styles.cell}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#5F5852" strokeWidth="1.3" aria-hidden="true">
            <path d="M5 21V4h14v17" />
            <line x1="3" y1="21" x2="21" y2="21" />
            <circle cx="15" cy="13" r="0.8" fill="#5F5852" />
          </svg>
          <div className={styles.fieldBox}>
            <label htmlFor="guests">Stay / Guests</label>
            <select id="guests" value={guests} onChange={(e) => setGuests(e.target.value)}>
              <option>Room, 1 Adult</option>
              <option>Room, 2 Adults</option>
              <option>Apartment, 2 Adults</option>
              <option>Apartment, Family</option>
            </select>
          </div>
        </div>
        <button type="button" className={`btn ${styles.cta}`} onClick={onBook}>
          Join the Waitlist
        </button>
      </div>
    </div>
  );
}
