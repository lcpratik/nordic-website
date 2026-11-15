import type { Metadata } from "next";
import IconRow from "@/components/IconRow";
import PageHero from "@/components/PageHero";
import { FaqSlider } from "@/components/Sliders";
import { Button, Cards, ClosingBanner, Details, Intro, Placeholder, Split, Teasers } from "@/components/ui";
import { accommodations, detailRows } from "@/lib/accommodation";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Stay",
  description: "Calm rooms for trekkers and bright apartments for longer stays in Thamel, Kathmandu.",
};

// Flip to true once there are real guest reviews to point to.
const SHOW_GUEST_STORIES = false;

export default function StayPage() {
  return (
    <>
      <PageHero label="Stay" height={820} withBooking />

      <Intro kicker="Stay" title="Calm rooms and apartments in Kathmandu" subtitle="A quiet base for every kind of journey">
        Whether you are heading into the mountains or settling into Kathmandu for a while, there is a place for you here. Simple,
        comfortable and close to everything.
      </Intro>

      <IconRow
        paddingBottom={40}
        items={[
          { icon: "chair", label: "Nordic Design" },
          { icon: "flags", label: "Heart of Thamel" },
          { icon: "bed", label: "Quiet Rooms" },
          { icon: "backpack", label: "Trekker Friendly" },
          { icon: "kettle", label: "Made for Long Stays" },
          { icon: "tea", label: "Warm Welcome" },
        ]}
      />

      {accommodations.map((a, i) => (
        <Split
          key={a.id}
          id={a.id}
          kicker={a.kicker}
          title={a.title}
          imageSide={i % 2 === 0 ? "left" : "right"}
          media={
            a.photos?.[0] ? (
              <div data-media style={{ aspectRatio: "4 / 3" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a.photos[0]} alt={a.title} loading="lazy" />
              </div>
            ) : (
              <Placeholder tone={a.tone} label="" />
            )
          }
          actions={<Button href={`/contact?interest=${a.enquiry}#enquiry`} variant="outline">{a.askLabel}</Button>}
          extra={<Details rows={detailRows(a)} />}
        >
          {a.description}
        </Split>
      ))}

      <section className="container section">
        <div className="stack center reveal" style={{ gap: 14, marginBottom: 36 }}>
          <p className="kicker">How your stay works</p>
          <h2 className="h2">Simple, from first message to arrival</h2>
        </div>
        <div className="grid-3" style={{ gap: 36 }}>
          {[
            ["01", "Plan Your Stay", "Explore our accommodation and contact Nordic with your requirements."],
            ["02", "Prepare for Arrival", "Receive confirmed arrival details and relevant instructions before your stay."],
            ["03", "Settle In", "Arrive and enjoy your accommodation in Kathmandu."],
          ].map(([n, title, text]) => (
            <div key={n} className="stack reveal" style={{ gap: 10, borderTop: "1px solid var(--ink)", paddingTop: 24 }}>
              <p className="kicker">{n}</p>
              <h3 className="h3" style={{ fontSize: 24 }}>{title}</h3>
              <p className="body" style={{ fontSize: 15 }}>{text}</p>
            </div>
          ))}
        </div>
      </section>

      {SHOW_GUEST_STORIES && (
        <section className="bg-navy">
          <div className="container section stack center reveal" style={{ maxWidth: 760, gap: 18 }}>
            <p className="kicker">Guest stories</p>
            <p className="navy-quote">Our first guests arrive in {site.opening}. Their words will live here.</p>
            <a href="/our-story#reviews" className="link">See guest stories</a>
          </div>
        </section>
      )}

      <Cards
        title="Ways to stay with us"
        intro="Simple ways to plan ahead before we open."
        items={[
          { title: "Book Direct", text: `Direct booking opens before our first guests arrive in ${site.opening}. Be the first to know.`, link: "Get notified", href: "/#notify" },
          { title: "Long Stays", text: "Planning a month or more in Kathmandu? Tell us your dates and we will be in touch.", link: "Send your dates", href: "/contact?interest=apartment#enquiry" },
          { title: "Groups", text: "Travelling with friends or a trekking group? Let us know how many and when.", link: "Ask about groups", href: "/contact?interest=group#enquiry" },
        ]}
      />

      <section className="container reveal">
        <Placeholder ratio="21 / 8" label="" />
      </section>

      <Teasers
        items={[
          { kicker: "Thamel", title: "Explore", tagline: "The city at your door", text: "Temples, markets, cafes and trekking shops, all close by.", actions: <Button href="/thamel" small>Discover Thamel</Button> },
          { kicker: "Our story", title: "Story", tagline: "A Nordic idea in Kathmandu", text: "Why we built a calm house in the busiest part of town.", actions: <Button href="/our-story" variant="outline" small>Read Our Story</Button> },
          { kicker: "Contact", title: "Say hello", tagline: "Questions before you book", text: "Early enquiries, long stays and groups are all welcome.", actions: <Button href="/contact" small>Contact Us</Button> },
        ]}
      />

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
                <Placeholder tone={i % 2 === 0 ? 1 : 2} label="" />
                <span style={{ fontSize: 16 }}>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FaqSlider
        faqs={[
          { q: "What is the difference between rooms and apartments?", a: "Private rooms are for shorter stays, ideal before or after a trek. Apartments have more space, with room to cook and work, for families and longer stays." },
          { q: "Can I stay for a month or longer?", a: "Yes. Our apartments are made for longer stays. Send us your dates and we will share weekly and monthly rates before opening." },
          { q: "When do you open?", a: `We welcome our first guests in ${site.opening}. Leave your email and we will tell you the moment booking opens.` },
          { q: "How can I book?", a: "Direct booking opens soon. Until then, message us on WhatsApp or email and we will note your dates." },
          { q: "Where are you?", a: "In Paknajol, Kathmandu, just north of Thamel. You will find us on the map on our Contact page." },
        ]}
      />

      <ClosingBanner ctaLabel="Join the Waitlist" ctaHref="/#notify" />
    </>
  );
}
