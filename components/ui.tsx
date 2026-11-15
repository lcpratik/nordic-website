// Small building blocks used across every page.
import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/lib/site";

/** Soft stone block used wherever a photo will go later. */
export function Placeholder({
  ratio = "4 / 3",
  label = "Photograph coming soon",
  tone = 1,
  showMark = true,
  className = "",
  minHeight,
}: {
  ratio?: string;
  label?: string;
  tone?: 1 | 2 | 3;
  showMark?: boolean;
  className?: string;
  minHeight?: number;
}) {
  const bg = tone === 1 ? "var(--stone)" : tone === 2 ? "var(--stone-2)" : "var(--stone-3)";
  return (
    <div className={`ph ${className}`} style={{ aspectRatio: ratio, background: bg, minHeight }} role="img" aria-label={label}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {showMark && <img src="/images/mark.png" alt="" />}
      {label && <span>{label}</span>}
    </div>
  );
}

/** Pill button. Internal links use Next.js Link, external ones a normal anchor. */
export function Button({
  href,
  children,
  variant = "primary",
  small = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline";
  small?: boolean;
}) {
  const cls = `${variant === "primary" ? "btn" : "btn-outline"}${small ? " btn-sm" : ""}`;
  if (href.startsWith("http")) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  if (href.startsWith("#")) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/** Centred intro under each hero: kicker, title, subtitle, paragraph. */
export function Intro({
  kicker,
  title,
  subtitle,
  children,
  extra,
  as = "h1",
}: {
  kicker: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  extra?: ReactNode;
  as?: "h1" | "h2";
}) {
  const Title = as;
  return (
    <section className="container reveal" style={{ maxWidth: 860, paddingTop: 64, paddingBottom: 48 }}>
      <div className="stack center" style={{ gap: 18 }}>
        <p className="kicker">{kicker}</p>
        <Title className="h1">{title}</Title>
        {subtitle && <h2 className="subhead">{subtitle}</h2>}
        {children && <p className="lead" style={{ maxWidth: 640 }}>{children}</p>}
        {extra}
      </div>
    </section>
  );
}

/** Image on one side, text on the other. */
export function Split({
  id,
  kicker,
  title,
  children,
  actions,
  extra,
  imageSide = "left",
  bg,
  tone = 1,
  media,
}: {
  id?: string;
  kicker: string;
  title: string;
  children: ReactNode;
  actions?: ReactNode;
  extra?: ReactNode;
  imageSide?: "left" | "right";
  bg?: "sand" | "cream";
  tone?: 1 | 2 | 3;
  media?: ReactNode;
}) {
  const image = <div className="reveal">{media ?? <Placeholder tone={tone} />}</div>;
  const text = (
    <div className="stack reveal">
      <p className="kicker">{kicker}</p>
      <h2 className="h2">{title}</h2>
      <p className="body">{children}</p>
      {actions && <div className="btn-row" style={{ marginTop: 6 }}>{actions}</div>}
      {extra}
    </div>
  );
  return (
    <section id={id} className={bg ? `bg-${bg}` : undefined} style={{ scrollMarginTop: 80 }}>
      <div className="container section split">
        {imageSide === "left" ? (
          <>
            {image}
            {text}
          </>
        ) : (
          <>
            {text}
            {image}
          </>
        )}
      </div>
    </section>
  );
}

/** Two column rows like "Rates · At opening". */
export function Details({ rows }: { rows: [string, string][] }) {
  return (
    <div className="details">
      {rows.map(([a, b]) => (
        <div key={a}>
          <span>{a}</span>
          <span>{b}</span>
        </div>
      ))}
    </div>
  );
}

/** Three short blocks that point to other pages. */
export function Teasers({
  items,
}: {
  items: { kicker: string; title: string; tagline: string; text: string; actions: ReactNode }[];
}) {
  return (
    <section className="container section">
      <div className="grid-3" style={{ gap: 36 }}>
        {items.map((t) => (
          <div key={t.title} className="stack reveal" style={{ gap: 12, borderTop: "1px solid var(--ink)", paddingTop: 28 }}>
            <p className="kicker">{t.kicker}</p>
            <h3 className="h3" style={{ fontSize: 26 }}>{t.title}</h3>
            <p className="subhead" style={{ fontSize: 18 }}>{t.tagline}</p>
            <p className="body" style={{ fontSize: 15 }}>{t.text}</p>
            <div className="btn-row" style={{ marginTop: 6 }}>{t.actions}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/** Row of bordered cards with a link each. */
export function Cards({
  title,
  intro,
  items,
}: {
  title: string;
  intro: string;
  items: { title: string; text: string; link: string; href: string }[];
}) {
  return (
    <section className="container section">
      <div className="stack reveal" style={{ maxWidth: 620, gap: 12, marginBottom: 28 }}>
        <h2 className="h2">{title}</h2>
        <p className="body">{intro}</p>
      </div>
      <div className="grid-3">
        {items.map((c) => (
          <div key={c.title} className="stack reveal" style={{ gap: 12, padding: 28, border: "1px solid #ece5dd" }}>
            <h3 className="h3" style={{ fontSize: 22 }}>{c.title}</h3>
            <p className="body" style={{ fontSize: 15 }}>{c.text}</p>
            <Link href={c.href} className="link" style={{ marginTop: "auto", paddingTop: 8 }}>
              {c.link}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

/** Google map of the property (Paknajol for now). */
export function MapEmbed({ height = 380 }: { height?: number }) {
  const q = encodeURIComponent(site.mapQuery);
  return (
    <div style={{ background: "var(--stone)" }}>
      <iframe
        title={`Map of ${site.mapQuery}`}
        src={`https://www.google.com/maps?q=${q}&z=15&output=embed`}
        width="100%"
        height={height}
        style={{ border: 0, display: "block" }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}

/** Closing band at the bottom of every page. */
export function ClosingBanner() {
  return (
    <section className="bg-sand-2">
      <div className="container stack center reveal" style={{ maxWidth: 900, gap: 16, paddingTop: 44, paddingBottom: 44 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/mark.png" alt="" style={{ width: 56, height: "auto" }} />
        <h2 className="h2" style={{ fontSize: "clamp(26px, 3vw, 34px)" }}>Nordic calm in the heart of Kathmandu</h2>
        <Button href="/stay#book">Book Your Stay</Button>
      </div>
    </section>
  );
}
