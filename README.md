# Nordic Rooms & Apartments · Website

The website for Nordic Rooms & Apartments in Thamel, Kathmandu. Built with Next.js (React) and plain CSS.

## Pages

| Page | File |
| --- | --- |
| Home | `app/page.tsx` |
| Stay (rooms and apartments) | `app/stay/page.tsx` |
| Our Story (with guest reviews) | `app/our-story/page.tsx` |
| Thamel | `app/thamel/page.tsx` |
| Contact | `app/contact/page.tsx` |
| Privacy Policy | `app/privacy/page.tsx` |

## Run it on your Mac

You need Node.js 20 or newer (`node -v` to check, install from nodejs.org).

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Before launch: what to fill in

Search the project for `TODO`. The main places:

1. **`lib/site.ts`**: email, phone, WhatsApp, Instagram handle and social links. Set `heroVideo` once your film is ready (put the file in `public/videos/hero.mp4`). Set `bookingUrl` when booking opens and the booking bar will send guests there.
2. **`lib/reviews.ts`**: add real guest reviews here once you have them. The "What our guests say" section on Our Story picks them up automatically, three per page, with a 1 / 2 / 3 counter.
3. **`app/layout.tsx`**: change `https://www.example.com` to your real domain.
4. **Photos**: placeholders say "Photograph coming soon". Put photos in `public/images/` and pass them in, for example `<PageHero label="Stay" image="/images/stay-hero.jpg" />` or `<Placeholder>` swapped for an `<img>`.
5. **Contact page**: confirm the airport drive time and add a Google Maps embed when the address is public.
6. **Privacy Policy**: have it checked before launch.

## Getting form submissions by email

The "Notify me" signups and the Contact form post to `/api/contact`.

- Without setup, submissions are printed in the server log only.
- To receive them by email, create a free account at resend.com, copy `.env.example` to `.env.local` and fill in `RESEND_API_KEY` and `CONTACT_TO_EMAIL`. On Vercel, add the same values under Project Settings → Environment Variables.

## Put it online (free)

1. Push this folder to a GitHub repository.
2. Go to vercel.com, sign in with GitHub, click **Add New Project** and pick the repo. Vercel detects Next.js automatically.
3. Add your environment variables (see above), deploy, then connect your domain under **Domains**.

## How it is built

- `components/Header.tsx`: see-through header over the hero that turns solid when you scroll, plus the full screen menu.
- `components/HomeHero.tsx`: the Home hero that shrinks into a square as you scroll.
- `components/BookingBar.tsx`: the floating booking bar. Shows "Booking opens soon" until `bookingUrl` is set.
- `components/lineIcons.tsx` and `IconRow.tsx`: the black and white line drawings.
- `components/Reviews.tsx`: the guest reviews section.
- `components/ui.tsx`: shared pieces such as `Placeholder`, `Button`, `Split`, `Intro`, `Teasers`, `ClosingBanner`.
- `app/globals.css`: colours, fonts, buttons, spacing and the fade in on scroll.
- Fonts (Gilda Display and Figtree) are bundled with the site through Fontsource, so no Google Fonts request is needed.
