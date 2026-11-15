import HomeHero from "@/components/HomeHero";
import IconRow from "@/components/IconRow";
import NotifyForm from "@/components/NotifyForm";
import { FaqSlider } from "@/components/Sliders";
import { Button, ClosingBanner, Placeholder } from "@/components/ui";
import { site } from "@/lib/site";

const stays = [
  {
    title: "Private Rooms",
    text: "Quiet private rooms for trekkers and travellers. A good bed, soft light and everything you need for the road ahead.",
    href: "/stay#rooms",
    tone: 1 as const,
  },
  {
    title: "Apartments",
    text: "Bright apartments with room to cook, work and settle in. Made for families and longer stays.",
    href: "/stay#apartments",
    tone: 2 as const,
  },
  {
    title: "Bunk Room",
    text: "A simple bunk room for trekkers and travellers on the move.",
    href: "/stay#bunk",
    tone: 3 as const,
  },
];

const faqs = [
  { q: "When do you open?", a: `We welcome our first guests in ${site.opening}. Leave your email and we will tell you the moment booking opens.` },
  { q: "Where are you?", a: "In Paknajol, Kathmandu, just north of Thamel. You will find us on the map on our Contact page." },
  { q: "Rooms or apartments?", a: "Rooms are for short stays, ideal before or after a trek. Apartments have more space for families, remote work and longer stays." },
  { q: "How can I book?", a: "Direct booking opens soon. Until then, message us on WhatsApp or email and we will note your dates." },
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

      <section className="container" style={{ paddingBottom: 56 }}>
        <div className="book-direct reveal" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
          <div className="stack" style={{ padding: "clamp(32px, 5vw, 56px)", gap: 14, justifyContent: "center" }}>
            <p className="kicker">Book direct</p>
            <h2 className="h2" style={{ fontSize: "clamp(28px, 3vw, 34px)" }}>The best way to stay is straight with us</h2>
            <p className="body" style={{ fontSize: 15 }}>
              Direct booking opens before we welcome our first guests in {site.opening}. Be the first to know.
            </p>
            <div style={{ marginTop: 6 }}>
              <NotifyForm source="home-book-direct" buttonText="Get Notified" />
            </div>
          </div>
          <Placeholder ratio="auto" minHeight={320} />
        </div>
      </section>

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
                <Placeholder ratio="4 / 3" tone={c.tone} label="Photographs coming soon" showMark={false} />
                <div className="stack" style={{ gap: 10 }}>
                  <h3 className="h3">{c.title}</h3>
                  <p className="body" style={{ fontSize: 14 }}>{c.text}</p>
                  <div className="btn-row" style={{ marginTop: 8 }}>
                    <Button href="/stay#book" small>Book Your Stay</Button>
                    <Button href={c.href} variant="outline" small>Explore {c.title}</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container section grid-2">
        <figure className="reveal" style={{ margin: 0 }}>
          <Placeholder ratio="3 / 2" label="" showMark={false} />
          <figcaption className="small" style={{ marginTop: 12 }}>Morning light in the lounge · coming soon</figcaption>
        </figure>
        <figure className="reveal" style={{ margin: 0 }}>
          <Placeholder ratio="3 / 2" tone={2} label="" showMark={false} />
          <figcaption className="small" style={{ marginTop: 12 }}>Evenings in Thamel · coming soon</figcaption>
        </figure>
      </section>

      <section className="bg-navy">
        <div className="container section stack center reveal" style={{ maxWidth: 760, gap: 18 }}>
          <p className="kicker">Guest stories</p>
          <p className="navy-quote">Our first guests arrive in {site.opening}. Their words will live here.</p>
          <a href="#book" className="link">Be one of the first</a>
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

      <section>
        <div className="container section">
          <div className="reveal" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 16, marginBottom: 28 }}>
            <div className="stack" style={{ gap: 12 }}>
              <p className="kicker">Look inside</p>
              <h2 className="h2">Walk through the house</h2>
            </div>
            <p className="small" style={{ margin: 0 }}>Virtual tours open with the house.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18 }}>
            {["Entrance", "Rooms", "Apartments", "Common Spaces"].map((name, i) => (
              <div key={name} className="stack reveal" style={{ gap: 10 }}>
                <Placeholder tone={i % 2 === 0 ? 1 : 2} label="" showMark={false} />
                <span style={{ fontSize: 16 }}>{name}</span>
                <span className="small" style={{ fontSize: 13 }}>Tour coming soon</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FaqSlider faqs={faqs} />
      <ClosingBanner />
    </>
  );
}
