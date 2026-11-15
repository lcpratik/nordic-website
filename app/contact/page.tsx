import type { Metadata } from "next";
import EnquiryForm from "@/components/EnquiryForm";
import PageHero from "@/components/PageHero";
import { Button, ClosingBanner, Intro, MapEmbed, Teasers } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Questions, early enquiries and group stays. Get in touch with Nordic Rooms & Apartments in Paknajol, Kathmandu.",
};

function InfoBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="stack" style={{ gap: 6, borderTop: "1px solid var(--line)", paddingTop: 20, fontSize: 15 }}>
      <h3 className="kicker">{title}</h3>
      {children}
    </div>
  );
}

export default function ContactPage() {
  const wa = site.contact.whatsappLink ? `https://wa.me/${site.contact.whatsappLink}` : null;
  return (
    <>
      <PageHero label="Contact" height={560} />

      <Intro kicker="Contact" title="Contact Us" subtitle="Questions, early enquiries and group stays">
        Whether you are planning a trek, a long stay or simply curious, we would be glad to hear from you.
      </Intro>

      <section className="container split" style={{ alignItems: "start", paddingBottom: 56 }}>
        <div className="stack reveal" style={{ gap: 28 }}>
          <h2 className="h3" style={{ fontSize: 32 }}>General information</h2>
          <InfoBlock title="Reservations">
            <a href={`mailto:${site.contact.reservationsEmail}`}>{site.contact.reservationsEmail}</a>
            {wa ? <a href={wa}>WhatsApp {site.contact.whatsapp}</a> : <span>WhatsApp {site.contact.whatsapp}</span>}
          </InfoBlock>
          <InfoBlock title="General enquiries">
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            <a href={`tel:${site.contact.phone.replace(/[^+\d]/g, "")}`}>{site.contact.phone}</a>
          </InfoBlock>
          <InfoBlock title="Social">
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer">
              Instagram {site.contact.instagramHandle}
            </a>
          </InfoBlock>
          <p className="small" style={{ margin: 0, borderTop: "1px solid var(--line)", paddingTop: 20, lineHeight: 1.7 }}>
            We aim to reply within a day. For anything urgent, WhatsApp is fastest.
          </p>
        </div>
        <div className="bg-navy reveal" style={{ padding: "clamp(24px, 4vw, 44px)" }}>
          <EnquiryForm />
        </div>
      </section>

      <section id="find-us" style={{ scrollMarginTop: 112 }}>
        <div className="container section split">
          <div className="stack reveal">
            <p className="kicker">Find us</p>
            <h2 className="h2">{site.location}</h2>
            {/* TODO: confirm the drive time and add exact directions */}
            <p className="body">
              We are in Paknajol, just north of Thamel. From Tribhuvan International Airport it is roughly a 20 to 40 minute drive,
              depending on traffic.
            </p>
          </div>
          <div className="reveal">
            <MapEmbed />
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
          { kicker: "Explore", title: "Thamel", tagline: "The city at your door", text: "Temples, markets, cafes and trekking shops, all close by.", actions: <Button href="/thamel" variant="outline" small>Discover Thamel</Button> },
          { kicker: "Social", title: "Follow along", tagline: "The house, as it is built", text: "Behind the scenes on our way to opening day.", actions: <Button href={site.social.instagram} variant="outline" small>Follow on Instagram</Button> },
        ]}
      />

      <ClosingBanner />
    </>
  );
}
