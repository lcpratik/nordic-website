import BookingBar from "./BookingBar";
import styles from "./PageHero.module.css";

/** Photo hero at the top of inner pages. Swap the placeholder for a real image later via the `image` prop. */
export default function PageHero({
  label,
  height = 720,
  withBooking = false,
  image,
}: {
  label: string;
  height?: number;
  withBooking?: boolean;
  image?: string;
}) {
  return (
    <section className={styles.hero} style={{ height }} aria-label={label}>
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt="" className={styles.image} />
      ) : (
        <>
          <div className={`${styles.placeholder} drift`} aria-hidden="true" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/mark.png" alt="" className={`${styles.bigMark} drift`} />
        </>
      )}
      <div className={styles.shade} aria-hidden="true" />
      <span className={styles.label}>{label}</span>
      {withBooking && <BookingBar />}
    </section>
  );
}
