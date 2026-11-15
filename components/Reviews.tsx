"use client";

import Link from "next/link";
import { reviews, reviewSummary, type Review } from "@/lib/reviews";
import { Counter, useCycle } from "./Sliders";

const PER_PAGE = 3;

function QuoteMark() {
  return (
    <span aria-hidden="true" style={{ fontFamily: "var(--font-display)", fontSize: 56, lineHeight: 0.6, height: 24, color: "var(--terracotta-text)" }}>
      “
    </span>
  );
}

function Card({ review, index }: { review?: Review; index: number }) {
  const bg = index % 2 === 0 ? "var(--sand)" : "var(--cream)";
  return (
    <figure className="reveal" style={{ margin: 0, background: bg, padding: 28, display: "flex", flexDirection: "column", gap: 22, minHeight: 220 }}>
      <QuoteMark />
      <blockquote style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 20, lineHeight: 1.55, color: review ? "var(--ink)" : "#6F675F" }}>
        {review ? review.quote : "Guest review will appear here after opening. A few honest lines about their stay at Nordic."}
      </blockquote>
      <figcaption style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 4, borderTop: "1px solid var(--line)", paddingTop: 16 }}>
        <span style={{ fontSize: 15 }}>
          {review ? `${review.name}${review.country ? `, ${review.country}` : ""}` : "[Guest name], [Country]"}
        </span>
        <span className="small" style={{ fontSize: 13 }}>
          {review ? `${review.source} · ${review.date}` : "[Google / Booking.com / Tripadvisor] · [Month Year]"}
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * "What our guests say". Shows real reviews from lib/reviews.ts in pages of three.
 * Until there are reviews, it shows three clearly labelled placeholder cards.
 */
export default function Reviews() {
  const hasReviews = reviews.length > 0;
  const pages = hasReviews ? Math.ceil(reviews.length / PER_PAGE) : 1;
  const { i, prev, next } = useCycle(pages);
  const visible = hasReviews ? reviews.slice(i * PER_PAGE, i * PER_PAGE + PER_PAGE) : [undefined, undefined, undefined];

  return (
    <section className="container section" aria-labelledby="reviews-title">
      <div className="reveal" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 20, marginBottom: 28 }}>
        <div className="stack" style={{ gap: 12, maxWidth: 620 }}>
          <p className="kicker">Guest stories</p>
          <h2 id="reviews-title" className="h2">What our guests say</h2>
          <p className="body">
            Real words from real guests, shared after their stay.
            {!hasReviews && " Our first guests arrive in January 2027."}
          </p>
        </div>
        {pages > 1 && <Counter index={i} total={pages} onPrev={prev} onNext={next} label="reviews" />}
      </div>

      <div className="grid-3">
        {visible.map((r, idx) => (
          <Card key={r ? `${r.name}-${r.date}` : idx} review={r} index={idx} />
        ))}
      </div>

      <div className="reveal" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16, borderTop: "1px solid var(--line)", paddingTop: 24, marginTop: 28 }}>
        <span className="small">
          {reviewSummary
            ? `Rated ${reviewSummary.rating} / 5 from ${reviewSummary.count.toLocaleString()} reviews`
            : "Overall rating and review count will show here once reviews come in."}
        </span>
        <Link href="/contact" className="link">
          Stayed with us? Share your story
        </Link>
      </div>
    </section>
  );
}
