"use client";

import Link from "next/link";
import { useState } from "react";
import { Placeholder } from "./ui";

function Counter({ index, total, onPrev, onNext, label }: { index: number; total: number; onPrev: () => void; onNext: () => void; label: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <button type="button" className="round-btn" aria-label={`Previous ${label}`} onClick={onPrev}>
        ←
      </button>
      <span style={{ fontSize: 14, minWidth: 44, textAlign: "center" }} aria-live="polite">
        {index + 1} / {total}
      </span>
      <button type="button" className="round-btn" aria-label={`Next ${label}`} onClick={onNext}>
        →
      </button>
    </div>
  );
}

function useCycle(total: number) {
  const [i, setI] = useState(0);
  return {
    i,
    prev: () => setI((v) => (v + total - 1) % total),
    next: () => setI((v) => (v + 1) % total),
  };
}

export type Slide = { kicker: string; title: string; tagline: string; text: string; cta: string; href: string };

/** Image and text slider with a "1 / 4" counter. */
export function FeatureSlider({ slides, bg }: { slides: Slide[]; bg?: "sand" }) {
  const { i, prev, next } = useCycle(slides.length);
  const s = slides[i];
  return (
    <section className={bg ? `bg-${bg}` : undefined}>
      <div className="container section split">
        <div className="reveal">
          <Placeholder tone={bg ? 3 : 1} />
        </div>
        <div className="stack reveal">
          <p className="kicker">{s.kicker}</p>
          <h2 className="h2">{s.title}</h2>
          <p className="subhead">{s.tagline}</p>
          <p className="body">{s.text}</p>
          <div className="btn-row" style={{ marginTop: 6 }}>
            <a href="/stay#book" className="btn">
              Book Your Stay
            </a>
            <Link href={s.href} className="btn-outline">
              {s.cta}
            </Link>
          </div>
          <div style={{ marginTop: 20 }}>
            <Counter index={i} total={slides.length} onPrev={prev} onNext={next} label="slide" />
          </div>
        </div>
      </div>
    </section>
  );
}

export type Faq = { q: string; a: string };

/** "Useful information": questions that open and close, one divider line per item. */
export function FaqSlider({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="container section reveal" style={{ maxWidth: 820 }}>
      <h2 className="h2 faq-title">Useful information</h2>
      <div className="faq-list">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className={`faq-item${isOpen ? " is-open" : ""}`}>
              <h3 className="faq-q">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-a-${i}`}
                  id={`faq-q-${i}`}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{f.q}</span>
                  <span className="faq-icon" aria-hidden="true" />
                </button>
              </h3>
              <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className="faq-a">
                <div>
                  <p className="body">{f.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export { Counter, useCycle };
