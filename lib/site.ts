// One place for everything you will need to edit before launch.
// Search for "TODO" to find the placeholders.

export const site = {
  name: "Nordic Rooms & Apartments",
  shortName: "Nordic",
  tagline: "Simply, Nordic.",
  location: "Paknajol, Kathmandu, Nepal",
  // Used for the map embeds and the "Get Directions" link.
  mapQuery: "Paknajol, Kathmandu, Nepal",
  opening: "January 2027",

  // TODO: replace with real details before launch
  contact: {
    reservationsEmail: "nordicroomandapartments@gmail.com",
    email: "nordicroomandapartments@gmail.com",
    phone: "+977-9860088476",
    whatsapp: "+977-9860088476",
    // Digits only with country code, e.g. "9779800000000". Leave empty to hide WhatsApp links.
    whatsappLink: "9779860088476",
    instagramHandle: "@nordicroomandapartments.np",
  },

  social: {
    instagram: "https://www.instagram.com/nordicroomandapartments.np/",
    facebook: "https://www.facebook.com/profile.php?id=61592636510950",
    tiktok: "https://www.tiktok.com/@nordic.apartments",
  },

  // When your hero film is ready, put it in public/videos/hero.mp4 and set this to "/videos/hero.mp4".
  heroVideo: "/videos/hero.mp4" as string | null,
  // Optional still image shown while the video loads, e.g. "/images/hero-poster.jpg".
  heroPoster: "/images/hero-poster.jpg" as string | null,

  // When booking opens, set this to your booking engine or OTA link and the booking bar will send guests there.
  bookingUrl: null as string | null,
};

export const nav = [
  { label: "Stay", href: "/stay" },
  { label: "Story", href: "/our-story" },
  { label: "Explore", href: "/thamel" },
  { label: "Contact", href: "/contact" },
];
