"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scroll motion for the whole site (all timings live in globals.css):
 *  A. text and blocks fade up as they enter the screen
 *  B. photos and placeholders are revealed through a mask, with a slow zoom from 1.2 to 1.1
 *  C. photos drift slightly against the scroll (parallax)
 *  D. groups of items (cards, icons, text lines) enter one after another
 */
export default function ScrollEffects() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("motion")) return;

    // Find the element whose children should be staggered: follow single-child wrappers down.
    const groupOf = (el: Element): Element | null => {
      let node: Element = el;
      for (let depth = 0; depth < 3 && node.children.length === 1; depth++) node = node.children[0];
      return node.children.length >= 2 ? node : null;
    };

    const targets = new Set<Element>();
    document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
      const group = groupOf(el);
      if (group) {
        group.classList.add("reveal-group");
        Array.from(group.children).forEach((child, i) => (child as HTMLElement).style.setProperty("--i", String(i)));
        targets.add(group);
        // The wrapper itself should not hide while its children animate.
        if (el !== group) el.classList.add("reveal-wrapper");
      } else {
        targets.add(el);
      }
    });
    document.querySelectorAll(".ph, [data-media]").forEach((el) => targets.add(el));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Anything already above the screen (e.g. after an anchor jump) should simply be shown.
          if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    targets.forEach((el) => io.observe(el));

    // C. Parallax: move each photo a few percent against the scroll.
    const images = Array.from(document.querySelectorAll<HTMLElement>("[data-media] img"));
    let frame = 0;
    const AMOUNT = 4; // percent of the image height, each way (8% in total)
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      images.forEach((img) => {
        const box = (img.parentElement as HTMLElement).getBoundingClientRect();
        if (box.bottom < 0 || box.top > vh) return;
        const p = Math.max(-1, Math.min(1, (box.top + box.height / 2 - vh / 2) / (vh / 2 + box.height / 2)));
        img.style.transform = `translate3d(0, ${(-p * AMOUNT).toFixed(2)}%, 0)`;
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}
