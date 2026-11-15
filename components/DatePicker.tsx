"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./DatePicker.module.css";

const DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** Local date as "YYYY-MM-DD" (avoids the UTC shift that toISOString causes). */
export function toISO(d: Date) {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}
function parse(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}
function pretty(iso: string) {
  const d = parse(iso);
  return `${d.getDate()} ${MONTHS[d.getMonth()].slice(0, 3)} ${d.getFullYear()}`;
}

type Props = {
  id: string;
  label: string;
  value: string;
  min: string;
  /** Start of the stay, used to shade the range on the check-out calendar. */
  rangeStart?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onChange: (iso: string) => void;
};

/** Small calendar that opens above its field, so it is never cut off at the bottom of the hero. */
export default function DatePicker({ id, label, value, min, rangeStart, open, onOpenChange, onChange }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [view, setView] = useState(() => parse(value || min));

  // Show the month of the current value (or the earliest allowed date) each time it opens.
  useEffect(() => {
    if (open) {
      const base = parse(value || rangeStart || min);
      setView(new Date(base.getFullYear(), base.getMonth(), 1));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) onOpenChange(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onOpenChange]);

  const year = view.getFullYear();
  const month = view.getMonth();
  const firstOffset = (new Date(year, month, 1).getDay() + 6) % 7; // Monday first
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [...Array(firstOffset).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  const minDate = parse(min);
  const prevDisabled = new Date(year, month, 0) < minDate; // last day of previous month is before min

  return (
    <div className={styles.root} ref={rootRef}>
      <button
        type="button"
        id={id}
        className={`${styles.trigger} ${value ? "" : styles.empty}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-label={`${label}${value ? `: ${pretty(value)}` : ""}`}
        onClick={() => onOpenChange(!open)}
      >
        {value ? pretty(value) : "Add date"}
      </button>

      {open && (
        <div className={styles.pop} role="dialog" aria-label={`Choose ${label.toLowerCase()}`}>
          <div className={styles.head}>
            <button
              type="button"
              className={styles.nav}
              aria-label="Previous month"
              disabled={prevDisabled}
              onClick={() => setView(new Date(year, month - 1, 1))}
            >
              ←
            </button>
            <span className={styles.title}>
              {MONTHS[month]} {year}
            </span>
            <button type="button" className={styles.nav} aria-label="Next month" onClick={() => setView(new Date(year, month + 1, 1))}>
              →
            </button>
          </div>
          <div className={styles.grid}>
            {DAYS.map((d) => (
              <span key={d} className={styles.dow}>
                {d}
              </span>
            ))}
            {cells.map((day, i) => {
              if (!day) return <span key={`e${i}`} />;
              const iso = toISO(new Date(year, month, day));
              const disabled = iso < min;
              const selected = iso === value;
              const inRange = !!rangeStart && !!value && iso > rangeStart && iso < value;
              const isToday = iso === toISO(new Date());
              return (
                <button
                  key={iso}
                  type="button"
                  disabled={disabled}
                  className={[styles.day, selected ? styles.selected : "", inRange ? styles.range : "", isToday ? styles.today : ""].join(" ")}
                  onClick={() => {
                    onChange(iso);
                    onOpenChange(false);
                  }}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
