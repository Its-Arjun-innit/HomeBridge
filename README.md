# HomeBridge Home Care Services — website

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

**2. The form is connected** to [Web3Forms](https://web3forms.com) and delivers
to `Admin1@homebridgeca.com` (verified with a live test submission). Each one
arrives as a labelled table with a searchable subject —
`Care inquiry — Ana Silva — Calgary T2P 1J9 — A parent`. If delivery ever stops,
check that the recipient address is still confirmed in the Web3Forms dashboard.
The access key in `src/site.config.js` is public by design (embedded in the
page), so committing it is fine.

**Worth a decision before you switch it on:** the form collects a name, phone,
postal code and *what care is needed*, often about a third party such as a parent
or spouse. That is health-adjacent personal information under PIPEDA, and it
passes through Web3Forms' servers on its way to you. Read their terms and confirm
you're comfortable, or trim what the form asks for.

**2a. Finish the legal pages.** There are now real `/privacy` and `/terms` pages
(`src/legal.js`), linked from the footer and from the form's consent line. Two
jobs remain, both marked in the file:
- **Privacy Policy** — resolve the `TODO: confirm` items (data retention period,
  any mailing address) and **have it reviewed by legal counsel**. It's a solid
  template covering PIPEDA, Alberta PIPA, CASL and GDPR, but it is not legal
  advice and hasn't been lawyer-checked.
- **Terms** — write your own service, fees, and cancellation clauses in
  `src/legal.js`. Until you do, those sections are hidden from the published page
  (they show as labelled slots only in `npm run dev`).

**3. Replace the testimonials** in `src/content.js`. They currently render with a
visible "Placeholder — not a real review" badge. Swap in genuine, attributed reviews
you have permission to publish, or delete the `<Testimonials />` line from
`src/pages/Home.jsx` until you have some. Do not publish invented reviews.

**4. Add photos.** `src/images.js` is the checklist. Ten slots are filled from the
design export (see below); the rest are empty. Unfilled slots show a labelled
placeholder while developing and collapse to nothing in production, so visitors
never see them. To fill one: drop the file in `public/media/`, set `src` and `alt`
in `images.js`, done.

**5. Resolve every `TODO: confirm`.** Search the repo for that string. Each one marks
a place where the copy would otherwise assert something about how HomeBridge operates
that hasn't been verified — screening and background checks, insurance, certifications,
minimum hours, rates, what's excluded, caregiver pay. These sit mainly in the FAQ
(`src/content.js`) and Careers (`src/pages/Careers.jsx`). The FAQ page shows a
build-time warning banner listing how many remain; it disappears once they're gone.

## Deploying

**Live on GitHub Pages** at https://homebridgeca.com. Pushing to `main` runs
`.github/workflows/deploy.yml`, which builds with Vite and publishes `dist/`
(Pages source = GitHub Actions). `public/CNAME` holds the custom domain.

Static host, output is `dist/`. Because routing is client-side, the host must serve
a fallback for unknown paths — without it, a direct visit to `/services` 404s.
Per host: GitHub Pages uses `public/404.html` + the restore snippet in
`index.html` (redirects unknown paths to the app, preserving the URL); `vercel.json`
covers Vercel; `public/_redirects` covers Netlify; Apache a `.htaccess` fallback,
nginx `try_files $uri /index.html`.

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

## Design source

The visual language comes from `uxpilot-export-08-19-26.fig` (a UX Pilot export).
It is a ZIP holding `canvas.fig` — Figma's `fig-kiwi` format: a deflate-compressed
Kiwi schema followed by a **zstd**-compressed scene graph — plus ten JPEGs, which
are now the site's photography in `public/media/`.

Taken from it: the paper/panel/ink/gold palette, Cormorant Garamond + Inter,
12px eyebrows with wide tracking, square corners, hairline rules, the staggered
image-panel grid, and the numbered service rows. The words are HomeBridge's own
copy — only the arrangement is the design's.

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
