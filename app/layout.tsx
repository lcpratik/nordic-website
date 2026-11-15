import type { Metadata, Viewport } from "next";
import "@fontsource/gilda-display/400.css";
import "@fontsource/belleza/400.css";
import "@fontsource/figtree/400.css";
import "@fontsource/figtree/500.css";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollEffects from "@/components/ScrollEffects";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  // TODO: change to your real domain before launch
  metadataBase: new URL("https://www.example.com"),
  title: {
    default: `${site.name} · Thamel, Kathmandu`,
    template: `%s · ${site.name}`,
  },
  description:
    "Calm Nordic rooms and apartments in the heart of Thamel, Kathmandu. Opening January 2027.",
  icons: { icon: "/images/mark.png" },
  openGraph: {
    title: `${site.name} · Thamel, Kathmandu`,
    description: "Calm Nordic rooms and apartments in the heart of Thamel. Opening January 2027.",
    images: ["/images/logo.png"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#fbf8f5",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Turn scroll motion on before first paint (skipped when the visitor prefers reduced motion). */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('motion')}",
          }}
        />
      </head>
      <body>
        <a href="#main" className="sr-only">
          Skip to main content
        </a>
        <SmoothScroll />
        <ScrollEffects />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
