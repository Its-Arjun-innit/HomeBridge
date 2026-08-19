// Single edit point for going live. Everything marked TODO is a placeholder.
// Nothing here is a real HomeBridge detail yet — replace before publishing.

export default {
  name: 'HomeBridge Care Services',
  tagline: 'Bridging Care, Comfort, and Independence at Home',

  // TODO: replace with the real business phone. Used in the header button,
  // footer, and as the fallback when a form submission fails.
  phone: '(555) 000-0000',

  // TODO: replace with the real inbox.
  email: 'care@homebridge.example',

  // TODO: fill in, or delete the address block from Footer/Contact if the
  // business has no public office address.
  address: {
    street: '',
    city: '',
    region: '',
    postal: '',
  },

  // TODO: confirm actual availability before publishing this claim.
  hours: 'Calls answered 24 hours a day, 7 days a week',

  // TODO: list the real cities / regions served.
  serviceArea: ['TODO: add the cities and regions you serve'],

  // Show a labelled placeholder panel wherever a photo hasn't been supplied yet
  // (see src/images.js). Development only — on the live site an unfilled slot
  // collapses to nothing, so visitors never see dashed boxes or slot ids.
  // Set to `true` to preview them in a production build.
  showEmptyImageSlots: import.meta.env.DEV,

  // Show unfinished content that is addressed to you rather than to visitors:
  // the FAQ "note for the site owner" banner, answers and Careers items still
  // marked TODO: confirm, and testimonials flagged as placeholders.
  // Development only, so none of it reaches a real visitor. Set to `true` if you
  // want to preview it in a production build.
  //
  // NOTE: with this off, the FAQ shows only questions you have actually
  // answered, and the testimonials section disappears until you add real ones.
  showDraftContent: import.meta.env.DEV,

  // Formspree form ID (the part after /f/ in your endpoint URL).
  // Leave empty and the form refuses to submit rather than posting nowhere.
  // Get one free at https://formspree.io — no backend required.
  formspreeId: '',
};
