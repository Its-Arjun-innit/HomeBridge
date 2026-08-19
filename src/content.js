// All prose here is HomeBridge's own supplied copy, or plain description of a
// named service. No claims about credentials, pricing, experience, or outcomes
// are invented — anything needing a fact carries a TODO: confirm marker.

export const intro = {
  lede: 'At HomeBridge Care Services, we believe that every individual deserves to live with dignity, comfort, and confidence in the place they love most—their home.',
  body: [
    'We provide compassionate, personalized care that supports seniors and individuals who need assistance with daily living. Our dedicated caregivers help with bathing, grooming, dressing, meal preparation, mobility support, housekeeping, companionship, transportation, and other everyday tasks that make life safer, easier, and more enjoyable.',
    'We understand that care is about more than assistance—it is about preserving independence, fostering meaningful relationships, and bringing peace of mind to families. Every client is treated with respect, kindness, and the attention they deserve.',
    'Whether you require a few hours of support each week or ongoing daily care, our team is committed to providing reliable, professional services tailored to your unique needs.',
  ],
  pullQuote:
    'We don’t just care for people—we care about people.',
  pullQuoteTail:
    'We are honored to be a trusted partner for individuals and families, helping them maintain their independence, dignity, and quality of life in the comfort of home.',
};

export const promise =
  'To provide compassionate, dependable, and personalized care that enhances well-being, promotes independence, and enriches the lives of those we serve.';

export const mission = [
  'At HomeBridge Care Services, our mission is to enrich the lives of seniors and individuals requiring support by providing compassionate, reliable, and personalized care that promotes dignity, independence, and well-being.',
  'We are committed to creating meaningful connections, fostering trust, and delivering exceptional care that allows our clients to remain safe, comfortable, and confident in their own homes. Through kindness, respect, and professionalism, we strive to bring peace of mind to families and improve the quality of life of every person we serve.',
  'We believe that everyone deserves to age with dignity, live with purpose, and feel valued, respected, and cared for every day.',
];

export const vision =
  'To be the most trusted home care provider in our community, recognized for compassionate service, meaningful relationships, and a commitment to helping individuals live independently and comfortably at home.';

// Icon paths are plain 24×24 stroke outlines drawn by <Icon>.
export const values = [
  {
    title: 'Care with Compassion',
    slot: 'value-compassion',
    body: 'We treat every client the way we would want our own family treated—with warmth, patience, and genuine attention.',
    icon: [
      'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 1 0-7.8 7.8l8.8 8.8 8.8-8.8a5.5 5.5 0 0 0 0-7.8z',
    ],
  },
  {
    title: 'Personalized Care Plans',
    slot: 'value-personalized',
    body: 'Care is shaped around one person’s routine, preferences, and needs—never a fixed package handed to everyone.',
    icon: [
      'M9 3h6a1 1 0 0 1 1 1v1H8V4a1 1 0 0 1 1-1z',
      'M16 5h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2',
      'M9 13l2 2 4-4',
    ],
  },
  {
    title: 'Reliable and Flexible',
    slot: 'value-reliable',
    body: 'From a few hours a week to ongoing daily support, our schedules adapt as needs change.',
    icon: ['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z', 'M12 7.5V12l3 2'],
  },
  {
    title: 'Dignity and Respect',
    slot: 'value-dignity',
    body: 'Independence is the goal of every visit. We support what someone can still do, rather than doing it for them.',
    icon: ['M12 3l7 3v6c0 4.4-3 8.2-7 9-4-.8-7-4.6-7-9V6l7-3z', 'M9 12l2 2 4-4'],
  },
];

// The 11 services HomeBridge listed. Descriptions restate the service itself —
// no scope, pricing, or clinical claims attached.
export const services = [
  {
    slug: 'personal-care',
    title: 'Personal Care Assistance',
    body: 'Hands-on help with the everyday routines that keep daily life comfortable and safe.',
  },
  {
    slug: 'bathing',
    title: 'Bathing and Hygiene Support',
    body: 'Respectful assistance with bathing and personal hygiene, at the pace the client prefers.',
  },
  {
    slug: 'grooming',
    title: 'Grooming and Dressing Assistance',
    body: 'Support with grooming and getting dressed, so each day starts feeling like oneself.',
  },
  {
    slug: 'meals',
    title: 'Meal Planning and Preparation',
    body: 'Planning, shopping for, and preparing meals that suit personal tastes and dietary needs.',
  },
  {
    slug: 'housekeeping',
    title: 'Light Housekeeping and Laundry',
    body: 'Keeping living spaces tidy, clean, and free of the clutter that causes falls.',
  },
  {
    slug: 'companionship',
    title: 'Companionship and Social Engagement',
    body: 'Conversation, shared activities, and regular company—for many families, the part that matters most.',
  },
  {
    slug: 'mobility',
    title: 'Mobility and Walking Assistance',
    body: 'Steady support moving around the home and staying active with confidence.',
  },
  {
    slug: 'transportation',
    title: 'Transportation to Appointments',
    body: 'Getting to medical appointments and other commitments, with a caregiver along for support.',
  },
  {
    slug: 'errands',
    title: 'Grocery Shopping and Errands',
    body: 'Groceries, pharmacy runs, and the errands that are harder to manage alone.',
  },
  {
    slug: 'respite',
    title: 'Respite Care for Family Caregivers',
    body: 'Short-term cover so family caregivers can rest, travel, or simply take a break.',
  },
  {
    slug: 'overnight',
    title: 'Overnight and Extended Care Support',
    body: 'Overnight presence and extended-hours care when support is needed beyond the daytime.',
  },
];

// ── Inquiry wizard ──────────────────────────────────────────────────────────

export const careForOptions = [
  'A parent',
  'My spouse or partner',
  'Myself',
  'Someone else',
];

/** Step 2 checkboxes. Kept short deliberately — every extra option is another
    decision between a visitor and getting in touch. The full list of 11 services
    lives in `services` and on the Services page. */
export const helpWithOptions = [
  { slug: 'personal-care', label: 'Personal care' },
  { slug: 'meals', label: 'Meals and cooking' },
  { slug: 'companionship', label: 'Companionship' },
  { slug: 'housekeeping', label: 'Housekeeping and laundry' },
  { slug: 'mobility', label: 'Mobility and walking' },
  { slug: 'unsure', label: 'Not sure yet' },
];

// Consent wording shown beside the checkbox on the final step.
//
// TODO: confirm — have this reviewed before publishing. Under Canada's
// anti-spam law (CASL) commercial email needs clear consent, your business
// identified by name, and a working unsubscribe in every message. This text
// links to a Privacy Policy page that DOES NOT EXIST YET — either write one and
// add the route, or remove the link. Do not publish it pointing nowhere.
export const emailConsent =
  'By checking this box, I agree to receive email messages from HomeBridge Care Services at the address provided. Message frequency may vary based on service needs and inquiry activity. You can unsubscribe at any time using the link in any email, or by replying to ask us to stop. For more details, please refer to our Privacy Policy.';

// FAQ — drafted structure. Every answer that asserts a fact about how
// HomeBridge operates is marked; confirm each one before publishing.
export const faqs = [
  {
    q: 'How do we get started?',
    a: 'Call or send us a message and we’ll arrange a conversation about what kind of support you or your loved one needs. From there we put together a care plan and match a caregiver. TODO: confirm — describe your actual intake process, and whether the initial consultation is free and in-home.',
  },
  {
    q: 'What happens during the first consultation?',
    a: 'We talk through daily routines, the tasks that have become difficult, the home environment, and the schedule that would help most. TODO: confirm — state who attends, how long it takes, and whether there is any cost.',
  },
  {
    q: 'How many hours of care can we book?',
    a: 'Support ranges from a few hours a week to ongoing daily care. TODO: confirm — state your minimum visit length and minimum weekly hours, if any.',
  },
  {
    q: 'How are caregivers selected and matched?',
    a: 'We match caregivers to each client based on the support needed and on personality and routine, because the relationship matters as much as the tasks. TODO: confirm — describe your screening, background checks, training, and insurance. Do not publish this answer until those details are accurate.',
  },
  {
    q: 'Can the care plan change over time?',
    a: 'Yes. Needs change, and the plan is reviewed and adjusted as they do. TODO: confirm — state how often plans are reviewed and how families request a change.',
  },
  {
    q: 'What does home care cost, and is it covered?',
    a: 'TODO: confirm — this answer must state your actual rates or rate structure, and which funding sources, insurance, or programs you accept. Do not publish a placeholder here; families filter on this question.',
  },
  {
    q: 'What is not included in home care?',
    a: 'TODO: confirm — clearly list the services you do not provide (for example, skilled nursing or medical procedures, if applicable). This protects both families and your team.',
  },
  {
    q: 'Which areas do you serve?',
    a: 'TODO: confirm — list the cities and regions in site.config.js and they will appear here and in the footer.',
  },
];

// PLACEHOLDER ONLY. Do not publish these — they are not real clients.
// Replace each entry with a genuine, attributed review you have permission to
// use, or delete the <Testimonials /> line from Home.jsx until you have some.
export const testimonials = [
  {
    placeholder: true,
    quote: 'Replace with a real client or family review.',
    name: 'Client name',
    detail: 'Relationship to client · City',
  },
  {
    placeholder: true,
    quote: 'Replace with a real client or family review.',
    name: 'Client name',
    detail: 'Relationship to client · City',
  },
  {
    placeholder: true,
    quote: 'Replace with a real client or family review.',
    name: 'Client name',
    detail: 'Relationship to client · City',
  },
];
