import type { Metadata } from "next";
import IconRow from "@/components/IconRow";
import PageHero from "@/components/PageHero";
import Reviews from "@/components/Reviews";
import { Button, ClosingBanner, Intro, Placeholder, Teasers } from "@/components/ui";

export const metadata: Metadata = {
  title: "Our Story",
  description: "A Nordic idea, at home in Kathmandu. What guides Nordic Rooms & Apartments, and what our guests say.",
};

// Flip these to true once there are authentic reviews and real photographs.
const SHOW_REVIEWS = false;
const SHOW_GALLERY = false;

export default function OurStoryPage() {
  return (
    <>
      <PageHero label="Our Story" />

      <Intro
        kicker="Our Story"
        title="Our Story and Ethos"
        subtitle="A Nordic idea, at home in Kathmandu"
      >
        Nordic Rooms and Apartments began with a simple wish: a calm, honest place to stay in the heart of Thamel. Here is what
        guides us.
      </Intro>

      <section className="container section split" style={{ alignItems: "start" }}>
        <h2 className="h2 reveal">What we stand for</h2>
        <div className="stack reveal" style={{ gap: 18 }}>
          <p className="body">
            Nordic homes are built around one idea. Keep what matters, remove the rest, and make every room feel calm and warm.
            Clean lines, natural wood and soft light.
          </p>
          <p className="body">
            We brought that idea to Thamel, the liveliest corner of Kathmandu. Outside, the city never stops. Inside, you can
            finally breathe. That balance is what Nordic is about.
          </p>
        </div>
      </section>

      <section className="bg-navy">
        <div className="container section stack center reveal" style={{ maxWidth: 760, gap: 24 }}>
          <h3 className="kicker">Our promise</h3>
          <p className="navy-quote" style={{ lineHeight: 1.6 }}>
            Keep it simple.
            <br />
            Keep it quiet.
            <br />
            Let the light in and the noise out.
            <br />
            Treat every guest like family,
            <br />
            and every day in Kathmandu
            <br />
            like the start of something good.
          </p>
        </div>
      </section>

      {SHOW_REVIEWS && (
        <div id="reviews" style={{ scrollMarginTop: 112 }}>
          <Reviews />
        </div>
      )}

      <section className="container reveal">
        <Placeholder ratio="21 / 8" label="" />
      </section>

      {SHOW_GALLERY && (
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
      )}

      <div style={{ paddingTop: 56 }}>
        <IconRow
          paddingBottom={56}
          items={[
            { icon: "chair", label: "Simple Design" },
            { icon: "bed", label: "Calm Spaces" },
            { icon: "tea", label: "Warm Welcome" },
            { icon: "flags", label: "Rooted in Thamel" },
          ]}
        />
      </div>

      <Teasers
        items={[
          { kicker: "Stay", title: "Rooms and Apartments", tagline: "Rest before the mountains", text: "Simple, quiet rooms for trekkers and bright apartments for longer stays.", actions: <Button href="/stay" small>Discover Stay</Button> },
          { kicker: "Explore", title: "Kathmandu", tagline: "The city at your door", text: "Cafes, temples, markets and trekking shops, all close by.", actions: <Button href="/thamel" variant="outline" small>Start Exploring</Button> },
          { kicker: "Contact", title: "Say hello", tagline: "Questions before you book", text: "Early enquiries, long stays and groups are all welcome.", actions: <Button href="/contact" small>Contact Us</Button> },
        ]}
      />

      <ClosingBanner ctaLabel="Join the Waitlist" ctaHref="/#notify" />
    </>
  );
}
