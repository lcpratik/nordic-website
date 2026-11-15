// Guest reviews shown in "What our guests say".
// Only add real reviews, copied with the guest's permission or from a public review site.
// While this list is empty, the site shows tidy placeholder cards instead.

export type Review = {
  quote: string;
  name: string;
  country?: string;
  source: "Google" | "Booking.com" | "Tripadvisor" | "Airbnb" | "Agoda" | "Direct";
  date: string; // e.g. "February 2027"
};

export const reviews: Review[] = [];

// Fill these in once you have reviews, e.g. { rating: 4.8, count: 120 }.
export const reviewSummary: { rating: number; count: number } | null = null;
