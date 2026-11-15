import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Privacy Policy" };

// TODO: have this reviewed before launch. It is a plain starting point, not legal advice.
export default function PrivacyPage() {
  return (
    <section className="container" style={{ maxWidth: 760, paddingTop: 140, paddingBottom: 56 }}>
      <div className="stack" style={{ gap: 18 }}>
        <p className="kicker">Privacy</p>
        <h1 className="h1">Privacy Policy</h1>
        <p className="body">
          When you sign up for updates or send us an enquiry, we collect the details you give us, such as your name, email address,
          dates and message. We use them only to reply to you and to tell you when booking opens.
        </p>
        <p className="body">
          We do not sell or share your details with anyone for marketing. You can ask us to update or delete your details at any
          time by writing to {site.contact.email}.
        </p>
        <p className="body">This page will be updated before we open in {site.opening}.</p>
      </div>
    </section>
  );
}
