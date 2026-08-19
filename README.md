# HomeBridge Care Services — website

Vite + React, 6 pages, no backend.

```bash
npm run dev      # local dev at http://localhost:5173
npm run build    # production build → dist/
npm run check    # form-validation self-check
```

## Before this goes live

Four things are deliberately unfinished, because they need facts only you have.
Nothing below was guessed or filled in with plausible-sounding text.

**1. `src/site.config.js`** — every contact detail is a placeholder: phone, email,
address, hours, and service area. This is the only file you need to edit for those;
they propagate to the header, footer, and contact page.

**2. Connect the form.** Create a free form at [formspree.io](https://formspree.io),
then paste the ID into `formspreeId` in `src/site.config.js`. Until you do, the form
validates normally but refuses to submit and shows a notice instead of silently
posting nowhere.

**2a. Write a Privacy Policy, or cut the link.** The email consent text in
`src/content.js` (`emailConsent`) ends by referring to "our Privacy Policy" —
**that page does not exist**. Canada's anti-spam law (CASL) requires clear consent,
your business identified by name, and a working unsubscribe in every commercial
email. Have this wording reviewed, add the policy page, and wire up unsubscribe in
whatever sends your mail. Do not publish the consent text pointing at nothing.

**3. Replace the testimonials** in `src/content.js`. They currently render with a
visible "Placeholder — not a real review" badge. Swap in genuine, attributed reviews
you have permission to publish, or delete the `<Testimonials />` line from
`src/pages/Home.jsx` until you have some. Do not publish invented reviews.

**4. Add photos.** `src/images.js` is the checklist — 41 slots across the six
pages, each with a suggested subject. Every unfilled slot currently renders a
labelled placeholder panel **on the live site**, so visitors see them too. To fill
one: drop the file in `public/media/`, set `src` and `alt` in `images.js`, done.
To hide unfilled slots instead, set `showEmptyImageSlots: import.meta.env.DEV` in
`src/site.config.js`.

**5. Resolve every `TODO: confirm`.** Search the repo for that string. Each one marks
a place where the copy would otherwise assert something about how HomeBridge operates
that hasn't been verified — screening and background checks, insurance, certifications,
minimum hours, rates, what's excluded, caregiver pay. These sit mainly in the FAQ
(`src/content.js`) and Careers (`src/pages/Careers.jsx`). The FAQ page shows a
build-time warning banner listing how many remain; it disappears once they're gone.

## Deploying

Static host, output is `dist/`. Because routing is client-side, the host must serve
`index.html` for unknown paths. `public/_redirects` handles this on Netlify; on Vercel
add a rewrite, on Apache a `.htaccess` fallback, on nginx `try_files $uri /index.html`.
Without it, a direct visit to `/services` 404s.

## Assets

Source files stay untouched in `Elements/`. Optimized copies live in `public/media/`,
regenerate with:

```bash
ffmpeg -y -i "Elements/Animation ending background.jpg" -vf "scale=2400:-2" -c:v libwebp -quality 80 public/media/hero.webp
ffmpeg -y -i "Elements/Animation ending background.jpg" -vf "scale=1200:-2" -c:v libwebp -quality 78 public/media/hero-1200.webp
ffmpeg -y -i "Elements/Opening Eledery Heart video.mp4" -frames:v 1 -c:v libwebp -quality 82 public/media/opening-poster.webp
ffmpeg -y -i "Elements/Opening Eledery Heart video.mp4" -an -c:v copy -movflags +faststart public/media/opening.mp4
```

The hero background went 25.5 MB → 632 KB. The hero video only loads above 992px wide
and never when the visitor has reduced-motion set; phones get the 114 KB poster still.

## Notes

- Design tokens and all styling live in one file, `src/styles.css`.
- Copy lives in `src/content.js`, photos in `src/images.js` — edit there, not in
  the page components.
- Images blend into the page with a CSS mask that fades their edges, plus a veil
  in the surrounding background colour. Deliberately not `mix-blend-mode`, which
  darkens faces and greys out lighter skin tones.
- Hover effects are wrapped in `@media (hover: hover)` so they never fire on
  touch, where they leave sticky stuck-on states.
- Scroll reveal is one `IntersectionObserver` in `App.jsx`. The hidden state is
  scoped to `html.js-ready`, so if the bundle fails to run the page is fully
  visible rather than blank. Reduced-motion visitors skip it entirely.
- `Reveal` is a wrapper, not an attribute on the card: both the reveal and the
  hover lift animate `transform`, so they need separate elements or the reveal
  wins and cards never lift.
- The FAQ accordion is native `<details>`/`<summary>`: correct keyboard and screen
  reader behaviour without a library.
- The care inquiry is a four-step wizard (who it's for → what help is needed →
  postal code → contact details). Options and consent wording live in
  `src/content.js`; the step logic and postal-code rules are in `src/validate.js`
  and covered by `npm run check`.
- Postal codes are validated as Canadian only (`A1A 1A1`), excluding the letters
  Canada Post never uses. US ZIPs and UK postcodes are rejected. The submitted
  value is normalised to canonical spacing regardless of how it was typed.
- The caregiver application is deliberately a plain single-step form — an
  application isn't a qualification funnel, and steps would only add friction.
- Base font is 18px and colour pairings meet WCAG AA, on purpose — the audience is
  seniors and their families.
