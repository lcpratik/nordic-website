"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import styles from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Header is see-through over the hero, then turns solid once you scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu when the page changes, and stop the page scrolling behind it.
  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    if (menuOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  // Pages with a dark photo hero start with a see-through header. Every other page starts solid.
  const heroPages = ["/", "/stay", "/our-story", "/thamel", "/contact"];
  const solid = scrolled || !heroPages.includes(pathname);
  // Online booking is not open yet, so the header button leads to the email signup on the home page.
  const bookHref = pathname === "/" ? "#notify" : "/#notify";

  return (
    <>
      <header className={`${styles.header} ${solid ? styles.solid : styles.clear}`}>
        <div className={styles.left}>
          <button
            type="button"
            className={styles.burger}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(true)}
          >
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
              <line x1="0" y1="1" x2="20" y2="1" />
              <line x1="0" y1="7" x2="20" y2="7" />
              <line x1="0" y1="13" x2="20" y2="13" />
            </svg>
          </button>
          <nav aria-label="Main" className={styles.links}>
            {nav.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined} className={active ? styles.active : undefined}>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <Link href="/" className={styles.brand} aria-label={`${site.name}, home`}>
          <span className={styles.wordmark}>NORDIC</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/mark.png" alt="" className={styles.mark} />
        </Link>

        <div className={styles.right}>
          <a href={bookHref} className="btn">
            Get Opening Updates
          </a>
        </div>
      </header>

      {menuOpen && <div className={styles.backdrop} onClick={() => setMenuOpen(false)} aria-hidden="true" />}
      {menuOpen && (
        <div data-lenis-prevent className={styles.menu} role="dialog" aria-modal="true" aria-label="Menu">
          <div className={styles.menuTop}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.png" alt={site.name} className={styles.menuLogo} />
            <button type="button" className={styles.close} onClick={() => setMenuOpen(false)}>
              Close <span aria-hidden="true">✕</span>
            </button>
          </div>
          <nav aria-label="Menu" className={styles.menuLinks}>
            <Link href="/">Home</Link>
            <Link href="/stay">Stay</Link>
            <Link href="/our-story">Our Story</Link>
            <Link href="/thamel">Explore</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <p className="kicker">Opening {site.opening}</p>
        </div>
      )}
    </>
  );
}
