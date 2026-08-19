// ─────────────────────────────────────────────────────────────────────────────
// IMAGE CHECKLIST
//
// Every photo slot on the site is listed here. To fill one:
//   1. Drop the file in `public/media/`
//   2. Set `src` to '/media/your-file.webp'
//   3. Write `alt` describing what's in the photo (required — it's what screen
//      readers and search engines read; leave it '' only for pure decoration)
//
// Until `src` is set, the slot renders a labelled placeholder panel on the page.
// `hint` is the suggested subject; it shows in that placeholder and is never
// published once the photo is in.
//
// Ratios are CSS aspect-ratio values. Supply images at roughly 2× the displayed
// size and convert to .webp — see the ffmpeg commands in README.md.
// ─────────────────────────────────────────────────────────────────────────────

const slot = (ratio, hint, src = '', alt = '') => ({ ratio, hint, src, alt });

export const slots = {
  // ── Home ───────────────────────────────────────────────────────────────────
  'home-promise': slot(
    '3 / 4',
    'Supplied by the design export',
    '/media/promise-reading.webp',
    'An older woman reading by a window in soft daylight.',
  ),
  'home-band': slot('21 / 9', 'Wide, calm shot of a home interior — a kitchen table, a sunlit window'),
  'home-story': slot(
    '4 / 3',
    'Supplied by the design export',
    '/media/family-story.webp',
    'A thoughtful woman in soft natural light.',
  ),
  'home-cta-bg': slot('21 / 9', 'Soft, out-of-focus home background — this sits behind text, so nothing busy'),

  // Six service preview cards on the home page
  'home-service-personal-care': slot('4 / 3', 'Gentle hands-on assistance'),
  'home-service-bathing': slot('4 / 3', 'A clean, accessible bathroom — no people needed'),
  'home-service-grooming': slot('4 / 3', 'Someone dressed and ready for the day'),
  'home-service-meals': slot('4 / 3', 'A home-cooked meal being prepared'),
  'home-service-housekeeping': slot('4 / 3', 'A tidy, uncluttered living space'),
  'home-service-companionship': slot('4 / 3', 'Two people talking over tea, laughing'),

  // ── Photography from the design export ─────────────────────────────────────
  'value-compassion': slot('3 / 4', 'From the design export', '/media/value-compassion.webp', 'A caregiver gently assisting someone seated in a warm, light-filled room.'),
  'value-personalized': slot('3 / 4', 'From the design export', '/media/value-personalized.webp', 'An older person’s hands resting in a caregiver’s hands.'),
  'value-reliable': slot('3 / 4', 'From the design export', '/media/value-reliable.webp', 'A quiet living-room corner with a cup of tea and an open book.'),
  'value-dignity': slot('3 / 4', 'From the design export', '/media/value-dignity.webp', 'An older man gardening in a sunlit courtyard, hands in the soil.'),
  'svc-personal-care': slot('21 / 10', 'From the design export', '/media/svc-personal-care.webp', 'Gentle assistance with everyday tasks at home.'),
  'svc-meals': slot('21 / 10', 'From the design export', '/media/svc-meals.webp', 'Fresh vegetables and a prepared meal in a sunlit kitchen.'),
  'svc-companionship': slot('21 / 10', 'From the design export', '/media/svc-companionship.webp', 'Two people laughing together over tea in a cosy living room.'),
  'svc-housekeeping': slot('21 / 10', 'From the design export', '/media/svc-housekeeping.webp', 'A bright, freshly organised living space.'),

  // ── Testimonials (small round portraits) ───────────────────────────────────
  'testimonial-1': slot('1 / 1', 'Portrait of the person quoted — only with their permission'),
  'testimonial-2': slot('1 / 1', 'Portrait of the person quoted — only with their permission'),
  'testimonial-3': slot('1 / 1', 'Portrait of the person quoted — only with their permission'),

  // ── Services page ──────────────────────────────────────────────────────────
  'services-hero': slot('21 / 9', 'Wide banner: a caregiver arriving at a front door, or a warm home exterior'),
  'services-band': slot('21 / 9', 'A caregiver and client on a walk, or sitting together outdoors'),

  // One square per service card — these can be simple, calm detail shots
  'service-personal-care': slot('1 / 1', 'A steadying hand on an arm'),
  'service-bathing': slot('1 / 1', 'Fresh towels, a grab rail, an accessible bathroom'),
  'service-grooming': slot('1 / 1', 'Hairbrush, buttons being fastened, getting ready'),
  'service-meals': slot('1 / 1', 'Chopping vegetables, a plated meal'),
  'service-housekeeping': slot('1 / 1', 'Folded laundry, a clear floor, a made bed'),
  'service-companionship': slot('1 / 1', 'A card game, a photo album, tea together'),
  'service-mobility': slot('1 / 1', 'A walker or cane, a supported step'),
  'service-transportation': slot('1 / 1', 'A car door held open, arriving at an appointment'),
  'service-errands': slot('1 / 1', 'Groceries being carried in, a pharmacy counter'),
  'service-respite': slot('1 / 1', 'A family member resting, a quiet moment'),
  'service-overnight': slot('1 / 1', 'A softly lit hallway or bedside lamp at night'),

  // ── About page ─────────────────────────────────────────────────────────────
  'about-hero': slot('21 / 9', 'Wide banner that says "home" — a porch, a doorway, a lived-in room'),
  'about-story': slot(
    '4 / 3',
    'A caregiver and an older adult together at home',
    '/media/hero.webp',
    'A caregiver and an older adult together at home.',
  ),
  'about-quote-bg': slot('21 / 9', 'Quiet background image — sits behind the pull quote on the dark band'),
  'about-mission': slot('3 / 4', 'A caregiver listening closely to a client'),
  'about-team': slot('16 / 9', 'Your team together — the real one, when you have a photo of it'),

  // ── Careers page ───────────────────────────────────────────────────────────
  'careers-hero': slot('21 / 9', 'Wide banner: a caregiver mid-shift, warm and unposed'),
  'careers-team': slot('16 / 9', 'Caregivers together — training, a team meeting, a shift handover'),
  'careers-day': slot('4 / 3', 'What a day actually looks like — arriving, helping, chatting'),
  'careers-apply': slot('3 / 4', 'A caregiver you would want a new hire to picture themselves as'),

  // ── FAQ page ───────────────────────────────────────────────────────────────
  'faq-hero': slot('21 / 9', 'Wide banner: a calm, reassuring home scene'),
  'faq-aside': slot('3 / 4', 'A family talking with a care consultant at a kitchen table'),

  // ── Contact page ───────────────────────────────────────────────────────────
  'contact-hero': slot('21 / 9', 'Wide banner: a welcoming front door or entryway'),
  'contact-office': slot('4 / 3', 'Your office, or the team who answers the phone'),
  'contact-map': slot('16 / 9', 'A map of your service area — or swap this slot for an embedded map'),
};

/** Slot ids that still have no photo. Used by the README checklist and dev warnings. */
export const unfilled = () =>
  Object.entries(slots)
    .filter(([, s]) => !s.src)
    .map(([id]) => id);
