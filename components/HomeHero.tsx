"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import BookingBar from "./BookingBar";
import styles from "./HomeHero.module.css";

/**
 * Full screen hero on the Home page.
 * As you scroll, the film shrinks into a small centred square and the booking bar fades away.
 */
export default function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [faded, setFaded] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const section = sectionRef.current;
      const stage = stageRef.current;
      if (!section || !stage) return;
      const travel = 600;
      const p = Math.min(1, Math.max(0, -section.getBoundingClientRect().top / travel));
      stage.style.setProperty("--p", p.toFixed(4));
      setFaded(p > 0.4);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Safari ignores React's `muted` prop, so set it on the element and start playback ourselves.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    // Safari only counts click, touchend and keydown as user gestures (scrolling does not).
    const gestures = ["click", "touchend", "keydown"] as const;
    const cleanup = () => gestures.forEach((e) => window.removeEventListener(e, start));
    function start() {
      video!.play().then(
        () => {
          cleanup();
        },
        () => {}
      );
    }
    start();
    video.addEventListener("loadeddata", start);
    video.addEventListener("canplay", start);
    // If the browser still blocks autoplay (e.g. Low Power Mode), start on the first real gesture.
    gestures.forEach((e) => window.addEventListener(e, start));
    return () => {
      cleanup();
      video.removeEventListener("loadeddata", start);
      video.removeEventListener("canplay", start);
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} aria-label="Welcome">
      <div ref={stageRef} className={styles.stage}>
        <div className={styles.media}>
          {site.heroVideo ? (
            <video
              ref={videoRef}
              className={styles.video}
              src={site.heroVideo}
              poster={site.heroPoster ?? undefined}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
            />
          ) : (
            <>
              <div className={`${styles.placeholder} drift`} aria-hidden="true" />
              <div className={styles.glow} aria-hidden="true" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/mark.png" alt="" className={`${styles.bigMark} drift`} />
              <span className={styles.soon}>Film coming soon</span>
            </>
          )}
          <div className={styles.shade} aria-hidden="true" />
        </div>

        <div className={styles.overlay} style={{ pointerEvents: faded ? "none" : undefined }} aria-hidden={faded}>
          <BookingBar style={{ position: "absolute" }} />
        </div>
      </div>
    </section>
  );
}
