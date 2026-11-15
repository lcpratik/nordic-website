// Accommodation content for the Stay page.
// Only add details here once they are confirmed. Anything left empty simply does not show,
// so the page never displays blanks or "coming soon" notes.

export type Accommodation = {
  id: "rooms" | "bunk" | "apartments";
  /** Main category on the Stay page. */
  group: "Rooms" | "Apartments";
  title: string;
  kicker: string;
  description: string;
  /** Who it is made for. */
  bestFor: string;
  /** e.g. "Bunk beds". Add when confirmed. */
  sleeping?: string;
  /** e.g. "2 guests". Add when confirmed. */
  maxOccupancy?: string;
  /** Confirmed amenities only, e.g. ["Hot water", "Wi-Fi"]. */
  amenities?: string[];
  /** Real photographs of this accommodation, e.g. ["/images/stay/private-room-1.jpg"]. */
  photos?: string[];
  /** Pre-selects the enquiry type on the Contact page. */
  enquiry: "private" | "bunk" | "apartment";
  askLabel: string;
  tone: 1 | 2 | 3;
};

export const accommodations: Accommodation[] = [
  {
    id: "rooms",
    group: "Rooms",
    title: "Private Rooms",
    kicker: "Rooms · Rest before the mountains",
    description:
      "Simple, quiet private rooms for trekkers and travellers. A good bed, a calm space and everything you need for the road ahead.",
    bestFor: "Backpackers, trekkers and short stays",
    enquiry: "private",
    askLabel: "Ask About Rooms",
    tone: 1,
  },
  {
    id: "bunk",
    group: "Rooms",
    title: "Bunk Room",
    kicker: "Rooms · On the move",
    description: "A simple bunk room for trekkers and travellers who just need a good night’s rest before the trail.",
    bestFor: "Backpackers and trekkers",
    sleeping: "Bunk beds",
    enquiry: "bunk",
    askLabel: "Ask About the Bunk Room",
    tone: 2,
  },
  {
    id: "apartments",
    group: "Apartments",
    title: "Apartments",
    kicker: "Apartments · Room to live",
    description: "Bright apartments with space to cook, work and settle in. Made for families, remote workers and longer stays.",
    bestFor: "Families, remote workers and longer stays",
    enquiry: "apartment",
    askLabel: "Ask About Apartments",
    tone: 3,
  },
];

/** Rows for the details list. Missing information is skipped. */
export function detailRows(a: Accommodation): [string, string][] {
  const rows: [string, string][] = [["Best for", a.bestFor]];
  if (a.sleeping) rows.push(["Sleeping", a.sleeping]);
  if (a.maxOccupancy) rows.push(["Sleeps up to", a.maxOccupancy]);
  if (a.amenities?.length) rows.push(["Amenities", a.amenities.join(", ")]);
  rows.push(["Rates and availability", "On enquiry"]);
  return rows;
}
