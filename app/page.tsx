import Link from "next/link";
import HomeHero from "@/components/HomeHero";
import IconRow from "@/components/IconRow";
import NotifyForm from "@/components/NotifyForm";
import { Button, Placeholder } from "@/components/ui";
import { site } from "@/lib/site";

// Two main accommodation choices. Private Rooms and the Bunk Room sit inside Rooms.
const stays: {
  title: string;
  text: string;
  href: string;
  tone: 1 | 2 | 3;
  subs?: { label: string; href: string }[];
}[] = [
  {
    title: "Rooms",
    text: "Quiet private rooms and a simple bunk room, made for backpackers, trekkers and short stays. A good bed, soft light and everything you need for the road ahead.",
    href: "/stay#rooms",
    tone: 1,
    subs: [
      { label: "Private Rooms", href: "/stay#rooms" },
      { label: "Bunk Room", href: "/stay#bunk" },
    ],
  },
  {
    title: "Apartments",
    text: "Bright apartments with room to cook, work and settle in. Made for families, remote workers and longer stays.",
    href: "/stay#apartments",
    tone: 2,
  },
];

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <section className="container reveal" style={{ maxWidth: 860, paddingBottom: 48 }}>
        <div className="stack center" style={{ gap: 18 }}>
          <h1 className="kicker" style={{ fontFamily: "var(--font-display)", letterSpacing: "0.08em", fontSize: 12, color: "var(--ink)" }}>
            Nordic Rooms &amp; Apartments, Thamel, Kathmandu
          </h1>
          <h2 className="h2">Slow down in the middle of everything</h2>
          <p className="lead" style={{ maxWidth: 600 }}>
            Outside, Thamel hums with life. Inside, it is quiet. Natural wood, soft light and simple rooms, made for resting before
            the mountains or staying a little longer.
          </p>
          <p className="lead">Calm outside, quiet inside.</p>
        </div>
      </section>

      <IconRow
        items={[
          { icon: "chair", label: "Nordic Design" },
          { icon: "flags", label: "Heart of Thamel" },
          { icon: "backpack", label: "Trekker Friendly" },
          { icon: "kettle", label: "Made for Long Stays" },
          { icon: "bed", label: "Quiet Rooms" },
          { icon: "pagoda", label: "Old City Nearby" },
          { icon: "tea", label: "Warm Welcome" },
        ]}
      />

      <section id="sleep" className="container section" style={{ scrollMarginTop: 80 }}>
        <div className="sleep-grid">
          <div className="stack reveal sleep-intro">
            <p className="kicker">Sleep</p>
            <h2 className="h2">Rest before the mountains</h2>
            <p className="body">
              Calm Scandi-style rooms and apartments. Simple, warm and made for resting, whether you stay a night or a month.
            </p>
            <div style={{ marginTop: 10 }}>
              <Button href="/stay" variant="outline">Learn More</Button>
            </div>
          </div>

          <div className="sleep-list">
            {stays.map((c) => (
              <div key={c.title} className="sleep-row reveal">
                <Placeholder ratio="4 / 3" tone={c.tone} label="" />
                <div className="stack" style={{ gap: 10 }}>
                  <h3 className="h3">{c.title}</h3>
                  <p className="body" style={{ fontSize: 14 }}>{c.text}</p>
                  {c.subs && (
                    <p className="small" style={{ margin: 0 }}>
                      {c.subs.map((sub, i) => (
                        <span key={sub.label}>
                          {i > 0 && " · "}
                          <Link href={sub.href} className="link" style={{ fontSize: 13 }}>{sub.label}</Link>
                        </span>
                      ))}
                    </p>
                  )}
                  <div className="btn-row" style={{ marginTop: 8 }}>
                    <Button href={c.href} variant="outline" small>Explore {c.title}</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container section split">
        <div className="stack reveal">
          <p className="kicker">Explore</p>
          <h2 className="h2">Wander all day, rest all night</h2>
          <p className="body">Temples, markets, rooftop dinners and trekking shops, all around you.</p>
          <div style={{ marginTop: 6 }}>
            <Button href="/thamel">Explore Thamel</Button>
          </div>
        </div>
        <div className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 14 }}>
          {[
            { place: "Garden of Dreams", src: "/images/places/garden-of-dreams.jpg" },
            { place: "Durbar Square", src: "/images/places/durbar-square.jpg" },
            { place: "Asan Bazaar", src: "/images/places/asan-bazaar.jpg" },
            { place: "Swayambhunath", src: "/images/places/swayambhunath.jpg" },
          ].map(({ place, src }) => (
            <figure key={place} data-media style={{ position: "relative", margin: 0, aspectRatio: "1 / 1", background: "var(--stone)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={place} loading="lazy" />
              <figcaption style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "28px 16px 14px", fontSize: 13, color: "#fff", background: "linear-gradient(to top, rgba(20,16,12,0.6), transparent)" }}>
                {place}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="notify" className="container" style={{ paddingBottom: 56, scrollMarginTop: 80 }}>
        <div className="book-direct reveal" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
          <div className="stack" style={{ padding: "clamp(32px, 5vw, 56px)", gap: 14, justifyContent: "center" }}>
            <p className="kicker">Opening {site.opening}</p>
            <h2 className="h2" style={{ fontSize: "clamp(28px, 3vw, 34px)" }}>The best way to stay is straight with us</h2>
            <p className="body" style={{ fontSize: 15 }}>
              Direct booking opens before we welcome our first guests in {site.opening}. Be the first to know.
            </p>
            <div style={{ marginTop: 6 }}>
              <NotifyForm source="home-book-direct" buttonText="Get Notified" />
            </div>
          </div>
          <Placeholder ratio="auto" minHeight={320} label="" />
        </div>
      </section>

    </>
  );
}
