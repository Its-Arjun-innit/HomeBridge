# HomeBridge Home Care Services — website

Vite + React. Eight pages, no backend. Live at **https://homebridgeca.com**.

```bash
npm run dev      # local dev at http://localhost:5173
npm run build    # production build → dist/
npm run check    # form-validation self-check (runs in CI before every deploy)
```

Pages: Home, Services, About, FAQ, Careers, Contact, Privacy Policy, Terms.

---

## Already done — don't redo these

- **Contact details are real.** Phone `(587) 437-4067`, alternate
  `(403) 629-0632`, email `Admin1@homebridgeca.com`, hours *Mon–Fri 9am–5pm MT*.
  All live in `src/site.config.js` and propagate to the header, footer, and
  Contact page.
- **The form delivers.** Submissions reach `Admin1@homebridgeca.com` via
  [Web3Forms](https://web3forms.com), verified with a live test. Each arrives as
  a labelled table with a searchable subject —
  `Care inquiry — Ana Silva — Calgary T2P 1J9 — A parent`.
- **Legal pages exist** at `/privacy` and `/terms`, linked from the footer and
  the "More" nav menu. They still need finishing — see below.

## Before this goes live

Six things are deliberately unfinished, because they need facts only you have.
Nothing below was guessed or filled in with plausible-sounding text.

**1. Finish the legal pages** (`src/legal.js`).
- **Privacy Policy** — resolve the two `TODO: confirm` items (data **retention
  period**, and a mailing address if you have one), then **have it reviewed by
  legal counsel**. It is a structured template covering PIPEDA, Alberta PIPA,
  CASL and GDPR, written from what the site actually does — but it is not legal
  advice and has not been lawyer-checked.
- **Terms** — write your own **service, fees, and cancellation** clauses. Until
  you do, those three sections are hidden from the published page (they appear as
  labelled slots only in `npm run dev`), so visitors never see a placeholder.

**2. Write the FAQ answers** (`src/content.js`). All **8** answers are still
drafts describing how home care generally works, not how HomeBridge operates —
so the published FAQ page currently shows *none* of them, falling back to a short
"we're still writing these up" note and your phone number. The cost question
matters most; families filter on it.

**3. Fill in the Careers details** (`src/pages/Careers.jsx`). Four of the six
"what to expect" cards are drafts and are hidden in production: **schedules,
requirements, pay and benefits, training and support**. Applications drop sharply
when pay is missing.

**4. Replace the testimonials** (`src/content.js`). Three placeholders, flagged
`placeholder: true`, and hidden in production — the section disappears entirely
until you add real ones. Swap in genuine, attributed reviews you have permission
to publish. Do not publish invented reviews.

**5. Add photos.** `src/images.js` is the checklist: **11 of 48 slots are
filled**, the rest are empty. Unfilled slots show a labelled placeholder in
`npm run dev` and collapse to nothing in production, so visitors never see a gap.
To fill one: drop the file in `public/media/`, then set `src` and `alt` in
`images.js`.

**6. Two remaining config items** (`src/site.config.js`).
- `address` is blank — fill it in, or delete the address block from the Footer
  and Contact page if there's no public office.
- `serviceArea` is a best guess based on your area code (Calgary, Airdrie,
  Cochrane, Chestermere, Okotoks, Strathmore). **Trim it to what you actually
  cover** — it also populates the city selector on the inquiry form, so a wrong
  list means misrouted enquiries.

**Also worth a decision:** the form collects a name, phone, postal code and *what
care is needed*, often about a third party such as a parent or spouse. That is
health-adjacent personal information under PIPEDA, and it passes through
Web3Forms' servers on its way to you. Read their terms, or trim what the form
asks for.

> Search the repo for `TODO: confirm` to find every outstanding item in place.

## Deploying

Pushing to `main` runs `.github/workflows/deploy.yml`, which audits runtime
dependencies, runs `npm run check`, builds with Vite, and publishes `dist/`
(Pages source = GitHub Actions). `public/CNAME` holds the custom domain.

Routing is client-side, so the host must serve a fallback for unknown paths —
without it a direct visit to `/services` 404s. Per host:

| Host | Mechanism |
|---|---|
| **GitHub Pages** (in use) | `public/404.html` redirects, `public/spa-restore.js` restores the URL before the router reads it |
| Vercel | `vercel.json` rewrite |
| Netlify | `public/_redirects` |
| Apache / nginx | `.htaccess` fallback / `try_files $uri /index.html` |

## Assets

Sources stay outside the repo (`Elements/`, and the client's Desktop folder);
only optimized derivatives are committed. Regenerate with:

```bash
# Hero background and video (from Elements/)
ffmpeg -y -i "Elements/Animation ending background.jpg" -vf "scale=2400:-2" -c:v libwebp -quality 80 public/media/hero.webp
ffmpeg -y -i "Elements/Animation ending background.jpg" -vf "scale=1200:-2" -c:v libwebp -quality 78 public/media/hero-1200.webp
ffmpeg -y -i "Elements/Opening Eledery Heart video.mp4" -frames:v 1 -c:v libwebp -quality 82 public/media/opening-poster.webp
ffmpeg -y -i "Elements/Opening Eledery Heart video.mp4" -an -c:v copy -movflags +faststart public/media/opening.mp4

# Client-supplied photography → 1600px webp
ffmpeg -y -i "<source>.jpg" -vf "scale=1600:-2" -c:v libwebp -quality 82 public/media/<slot>.webp

# Logo: full lockup for the footer, cropped mark for the header
ffmpeg -y -i "Main logo.png" -vf "scale=600:-1" public/media/logo-full.png
ffmpeg -y -i "Main logo.png" -vf "crop=480:340:145:55,scale=400:-1" -pix_fmt rgba public/media/logo-mark.png

# Favicons: square, beige-backed (transparency vanishes on dark browser chrome,
# and iOS rejects it on home-screen icons)
ffmpeg -y -i public/media/logo-mark.png -vf "pad=440:440:(440-400)/2:(440-283)/2:color=0xf3eee3ff,scale=32:32" public/favicon-32.png
ffmpeg -y -i public/media/logo-mark.png -vf "pad=440:440:(440-400)/2:(440-283)/2:color=0xf3eee3ff,scale=180:180" public/apple-touch-icon.png
```

The hero background went 25.5 MB → 632 KB. The hero video only loads above 992px
wide and never when the visitor has reduced-motion set; phones get the 114 KB
poster still instead.

## Design source

The visual language comes from `uxpilot-export-08-19-26.fig` (a UX Pilot export).
It is a ZIP holding `canvas.fig` — Figma's `fig-kiwi` format: a deflate-compressed
Kiwi schema followed by a **zstd**-compressed scene graph — plus ten JPEGs that
seeded the site's photography. Four have since been replaced by client-supplied
photos (the two value panels, the home pull-quote, and the About image).

Taken from it: the paper/panel/ink/gold palette, Cormorant Garamond + Inter,
12px eyebrows with wide tracking, square corners, hairline rules, the four-across
image panels, and the numbered service rows. The words are HomeBridge's own copy
— only the arrangement is the design's.

Two deliberate departures, both documented at the point of use in `styles.css`:
body copy is held at 16px where the design uses 14px, and gold (`#b09164`) is
2.85:1 on paper so it is used only as a mark, never behind text.

## Security posture

This is a **static site with no backend** — no server, database, accounts,
sessions, cookies, or file uploads. Runtime dependencies are exactly `react`,
`react-dom`, `react-router-dom`. That architecture removes most of the usual
attack surface outright, so the common checklist items (SQL injection, auth
bypass, session hijacking, password storage, row-level security, upload
restrictions) have nothing to apply to here.

What is in place:

- **HTTPS enforced** — `http://` 301s to `https://`.
- **CSP** via `<meta>` in `index.html`, restricting scripts to same-origin,
  network calls to the form endpoint only, and blocking objects/frames. The
  SPA-restore snippet lives in `public/spa-restore.js` rather than inline
  specifically so `script-src` can stay `'self'`. `style-src` needs
  `'unsafe-inline'` because the pages use React inline `style={{…}}`.
- **Referrer-Policy** `strict-origin-when-cross-origin`.
- **Input validation** in `src/validate.js`, including length caps enforced in
  code (not just `maxLength`, which a tampered client ignores), covered by
  `npm run check`.
- **Output escaping** — React escapes by default; no `dangerouslySetInnerHTML`
  anywhere. `LegalDoc` only allows `/`, `http(s):` and `mailto:` in hrefs.
- **Bot protection** — honeypot field wired to Web3Forms' `botcheck`, behind
  their own spam filtering. Deliberately no CAPTCHA: on a care-enquiry form used
  by seniors and stressed families, the accessibility and conversion cost
  outweighs a speculative benefit. Revisit if real spam appears.
- **Dependency scanning** — Dependabot (weekly npm + monthly actions) plus
  `npm audit --omit=dev --audit-level=high` blocking the deploy. Scoped to
  runtime deps on purpose: a dev-dependency advisory shouldn't stop a content
  fix from shipping.

**Known gaps, stated rather than glossed over:**

- **No HSTS, `X-Frame-Options`, or `X-Content-Type-Options`.** These are
  response headers, and GitHub Pages neither sends them nor allows custom ones.
  `frame-ancestors` is ignored inside a meta CSP, so **clickjacking protection
  is not available on this host.** Putting Cloudflare (free tier) or Netlify in
  front of the site would close all four.
- **The Web3Forms access key is public.** It's embedded in the bundle because
  that is how their API works — it isn't a leak. **Restrict it to
  `homebridgeca.com` in the Web3Forms dashboard**; that is the only real
  protection against someone reusing it against your quota.
- **Client-side field tampering is possible** and can't be prevented without a
  backend. The blast radius is a malformed email to the business — there is no
  price, role, or record to manipulate.

## Notes

**Where things live**

- Design tokens and all styling in one file, `src/styles.css`.
- Copy in `src/content.js`, photos in `src/images.js`, legal text in
  `src/legal.js`, business details in `src/site.config.js` — edit there, not in
  the page components.
- Two flags in `site.config.js` gate unfinished work: `showEmptyImageSlots` and
  `showDraftContent`. Both are `import.meta.env.DEV`, so drafts and placeholders
  are visible while developing and never reach a visitor.

**The inquiry form**

- A four-step wizard: who the care is for → what help is needed → where (a city
  selector plus postal code) → contact details. Step logic and rules are in
  `src/validate.js`, covered by `npm run check`.
- Postal codes are validated as Canadian only (`A1A 1A1`), excluding the letters
  Canada Post never uses; US ZIPs and UK postcodes are rejected, and the
  submitted value is normalised to canonical spacing however it was typed.
- Phone is an area-code select (Alberta codes) plus a 7-digit input. It's
  optional — but half a phone number isn't a phone number, so filling one part
  requires the other.
- The city selector ends with **"Outside these areas"** so an out-of-region
  visitor can still get in touch rather than hitting a wall.
- The caregiver application is deliberately a plain single-step form — an
  application isn't a qualification funnel, and steps would only add friction.

**Interface behaviour**

- Scroll reveal is one `IntersectionObserver` in `App.jsx`. The hidden state is
  scoped to `html.js-ready`, so if the bundle fails to run the page is fully
  visible rather than blank. Reduced-motion visitors skip it entirely.
- `Reveal` is a wrapper, not an attribute on the card: both the reveal and the
  hover lift animate `transform`, so they need separate elements or the reveal
  wins and cards never lift.
- On mobile the header hides on scroll down and returns on scroll up — but never
  near the top, while the menu is open, or while focus is inside it (smooth
  scrolling keeps firing scroll events after focus lands, which would otherwise
  hide the bar out from under a keyboard user).
- The FAQ accordion and the "More" nav menu are both native
  `<details>`/`<summary>`: correct keyboard and screen-reader behaviour without a
  library. "More" also closes on Escape, outside click, and route change.
- Images blend into the page with a CSS mask that fades their edges, plus a veil
  in the surrounding background colour. Deliberately not `mix-blend-mode`, which
  darkens faces and greys out lighter skin tones.
- Hover effects are wrapped in `@media (hover: hover)` so they never fire on
  touch, where they leave sticky stuck-on states.
- Base font is 18px and every colour pairing meets WCAG AA, on purpose — the
  audience is seniors and their families.
