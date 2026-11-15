import type { Metadata } from "next";
import IconRow from "@/components/IconRow";
import PageHero from "@/components/PageHero";
import { FaqSlider } from "@/components/Sliders";
import { Button, Cards, ClosingBanner, Details, Intro, Placeholder, Split, Teasers } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Stay",
  description: "Calm rooms for trekkers and bright apartments for longer stays in Thamel, Kathmandu.",
};

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

      <Split
        id="rooms"
        kicker="Rest before the mountains"
        title="Private Rooms"
        actions={
          <>
            <Button href="#book">Check Availability</Button>
            <Button href="/contact" variant="outline">Ask About Rooms</Button>
          </>
        }
        extra={<Details rows={[["Room types", "Revealed soon"], ["Amenities", "Revealed soon"], ["Rates", "At opening"]]} />}
      >
        Simple, quiet private rooms for trekkers and travellers. A good bed, a calm space and everything you need for the road ahead.
      </Split>

      <Split
        id="apartments"
        kicker="Room to live"
        title="Apartments"
        imageSide="right"
        tone={3}
        actions={
          <>
            <Button href="#book">Check Availability</Button>
            <Button href="/contact" variant="outline">Ask About Apartments</Button>
          </>
        }
        extra={<Details rows={[["Layouts", "Revealed soon"], ["Amenities", "Revealed soon"], ["Weekly and monthly rates", "At opening"]]} />}
      >
        Bright apartments with space to cook, work and settle in. Made for families, remote workers and longer stays.
      </Split>

      <Split
        id="bunk"
        kicker="On the move"
        title="Bunk Room"
        tone={2}
        actions={
          <>
            <Button href="#book">Check Availability</Button>
            <Button href="/contact" variant="outline">Ask About the Bunk Room</Button>
          </>
        }
        extra={<Details rows={[["Amenities", "Revealed soon"], ["Rates", "At opening"]]} />}
      >
        A simple bunk room for trekkers and travellers who just need a good night&rsquo;s rest before the trail.
      </Split>

      <section className="bg-navy">
        <div className="container section stack center reveal" style={{ maxWidth: 760, gap: 18 }}>
          <p className="kicker">Guest stories</p>
          <p className="navy-quote">Our first guests arrive in {site.opening}. Their words will live here.</p>
          <a href="/our-story#reviews" className="link">See guest stories</a>
        </div>
      </section>

      <Cards
        title="Ways to stay with us"
        intro="Simple ways to plan ahead before we open."
        items={[
          { title: "Book Direct", text: `Direct booking opens before our first guests arrive in ${site.opening}. Be the first to know.`, link: "Get notified", href: "/#book" },
          { title: "Long Stays", text: "Planning a month or more in Kathmandu? Tell us your dates and we will be in touch.", link: "Send your dates", href: "/contact" },
          { title: "Groups", text: "Travelling with friends or a trekking group? Let us know how many and when.", link: "Ask about groups", href: "/contact" },
        ]}
      />

      <section className="container reveal">
        <Placeholder ratio="21 / 8" showMark={false} />
      </section>

      <Teasers
        items={[
          { kicker: "Thamel", title: "Explore", tagline: "The city at your door", text: "Temples, markets, cafes and trekking shops, all close by.", actions: <Button href="/thamel" small>Discover Thamel</Button> },
          { kicker: "Our story", title: "Story", tagline: "A Nordic idea in Kathmandu", text: "Why we built a calm house in the busiest part of town.", actions: <Button href="/our-story" variant="outline" small>Read Our Story</Button> },
          { kicker: "Contact", title: "Say hello", tagline: "Questions before you book", text: "Early enquiries, long stays and groups are all welcome.", actions: <Button href="/contact" small>Contact Us</Button> },
        ]}
      />

      <FaqSlider
        faqs={[
          { q: "What is the difference between rooms and apartments?", a: "Private rooms are for shorter stays, ideal before or after a trek. Apartments have more space, with room to cook and work, for families and longer stays." },
          { q: "Can I stay for a month or longer?", a: "Yes. Our apartments are made for longer stays. Send us your dates and we will share weekly and monthly rates before opening." },
          { q: "When can I book?", a: `Direct booking opens before our first guests arrive in ${site.opening}. Leave your email and we will tell you first.` },
        ]}
      />

      <ClosingBanner />
    </>
  );
}
