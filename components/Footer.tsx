import Link from "next/link";
import { site } from "@/lib/site";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brand}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.png" alt={site.name} className={styles.logo} />
          <p className={styles.tag}>Calm Nordic rooms and apartments in Kathmandu. Opening {site.opening}.</p>
        </div>
        <div className={styles.col}>
          <span className="kicker">Stay</span>
          <Link href="/stay#rooms">Rooms</Link>
          <Link href="/stay#apartments">Apartments</Link>
        </div>
        <div className={styles.col}>
          <span className="kicker">About</span>
          <Link href="/our-story">Our Story</Link>
          <Link href="/thamel">Explore</Link>
        </div>
        <div className={styles.col}>
          <span className="kicker">Resources</span>
          <Link href="/contact">Contact Us</Link>
          <Link href="/privacy">Privacy Policy</Link>
        </div>
        <div className={styles.col}>
          <span className="kicker">Contact</span>
          <span>{site.location}</span>
          <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          <a href={`tel:${site.contact.phone.replace(/[^+\d]/g, "")}`}>{site.contact.phone}</a>
          <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`} target="_blank" rel="noopener noreferrer">Get Directions</a>
        </div>
      </div>
      <div className={`container ${styles.bottom}`}>
        <span>© {site.name} {new Date().getFullYear()}</span>
        <span className={styles.social}>
          <a href={site.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href={site.social.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href={site.social.tiktok} target="_blank" rel="noopener noreferrer">TikTok</a>
        </span>
      </div>
    </footer>
  );
}
