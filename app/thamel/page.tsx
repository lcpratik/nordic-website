import type { Metadata } from "next";
import IconRow from "@/components/IconRow";
import PageHero from "@/components/PageHero";
import { Button, ClosingBanner, Intro, MapEmbed, Split, Teasers } from "@/components/ui";

export const metadata: Metadata = {
  title: "Explore",
  description: "In the heart of Thamel, Kathmandu. The old city, markets and trekking shops are all close by.",
};

// TODO: replace "A short walk" / "A short ride" with real times once the address is final.
const nearby: [string, string][] = [
  ["Garden of Dreams", "A short walk"],
  ["Kathmandu Durbar Square", "A short walk"],
  ["Asan Bazaar", "A short walk"],
  ["Swayambhunath", "A short ride"],
  ["Pashupatinath", "A short ride"],
  ["Boudhanath Stupa", "A short ride"],
];

export default function ThamelPage() {
  return (
    <>
      <PageHero label="Explore" />

      <Intro kicker="Explore" title="In the heart of Thamel" subtitle="Everything is close">
        Thamel is the traveller’s quarter of Kathmandu. Cafes, rooftop dinners, trekking shops and centuries of history, all just
        outside our door.
      </Intro>

      <IconRow
        paddingBottom={40}
        items={[
          { icon: "pagoda", label: "Old City Nearby" },
          { icon: "flags", label: "Heart of Thamel" },
          { icon: "backpack", label: "Trekker Friendly" },
          { icon: "tea", label: "Cafes and Tea" },
          { icon: "bed", label: "Quiet Nights" },
          { icon: "kettle", label: "Made for Long Stays" },
        ]}
      />

      <Split kicker="The old city" title="Centuries of history, a short walk away" actions={<Button href="/stay">Plan Your Stay</Button>}>
        Pagodas, courtyards and busy market lanes. Kathmandu’s old city is one of the most remarkable places in Asia, and it starts
        just south of Thamel.
      </Split>

      <section className="container" style={{ paddingBottom: 56 }}>
        <div className="grid-3" style={{ gap: 36 }}>
          {[
            ["Temples and squares", "Kathmandu Durbar Square and the old city lanes are a short walk away."],
            ["Markets", "Asan Bazaar for spices, fabric and everyday Kathmandu life."],
            ["Our local guide", "Our own list of favourite places to eat, walk and see. Coming soon."],
          ].map(([title, text]) => (
            <div key={title} className="stack reveal" style={{ gap: 10, borderTop: "1px solid var(--ink)", paddingTop: 24 }}>
              <h3 className="h3" style={{ fontSize: 24 }}>{title}</h3>
              <p className="body" style={{ fontSize: 15 }}>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <Split
        kicker="Before and after the trek"
        title="The gateway to the Himalaya"
        imageSide="right"
        tone={3}
        actions={<Button href="/stay#book">Book Your Stay</Button>}
        extra={
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 20, marginTop: 18 }}>
            {[
              ["Gear shops", "All around you"],
              ["Trek agencies", "Steps away"],
              ["Rest days", "Quiet rooms to recover"],
            ].map(([t, s]) => (
              <div key={t} className="stack" style={{ gap: 6 }}>
                <h3 className="h3" style={{ fontSize: 20 }}>{t}</h3>
                <p className="small" style={{ margin: 0 }}>{s}</p>
              </div>
            ))}
          </div>
        }
      >
        Thamel is where most treks begin and end. Gear up, meet your guide, then come back to a quiet room and a proper rest.
      </Split>

      <section className="bg-navy">
        <div className="container section split" style={{ alignItems: "start" }}>
          <div className="stack reveal">
            <p className="kicker">Nearby</p>
            <h2 className="h2">Kathmandu is waiting</h2>
            <p className="body">From Thamel, the city’s best known places are a walk or a short ride away.</p>
            <div style={{ marginTop: 12 }}>
              <MapEmbed height={300} />
            </div>
          </div>
          <div className="reveal" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", columnGap: 32, borderBottom: "1px solid #2c353e" }}>
            {nearby.map(([place, time]) => (
              <div key={place} style={{ display: "flex", justifyContent: "space-between", gap: 16, padding: "18px 0", borderTop: "1px solid #2c353e", fontSize: 15, color: "#ffffff" }}>
                <span>{place}</span>
                <span style={{ color: "#aab3ba" }}>{time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Teasers
        items={[
          {
            kicker: "Stay",
            title: "Rooms and Apartments",
            tagline: "A quiet base in Thamel",
            text: "Simple rooms for trekkers, bright apartments for longer stays.",
            actions: (
              <>
                <Button href="/stay#book" small>Book Your Stay</Button>
                <Button href="/stay" variant="outline" small>Discover</Button>
              </>
            ),
          },
          { kicker: "Our story", title: "Simply, Nordic", tagline: "Wood, light and calm", text: "Why we built a calm house in the busiest part of town.", actions: <Button href="/our-story" variant="outline" small>Read Our Story</Button> },
          { kicker: "Contact", title: "Say hello", tagline: "Questions before you book", text: "Early enquiries, long stays and groups are all welcome.", actions: <Button href="/contact" small>Contact Us</Button> },
        ]}
      />

      <ClosingBanner />
    </>
  );
}
