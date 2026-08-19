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
  // (see src/images.js). These are visible to visitors on the live site.
  // Change to `import.meta.env.DEV` to show them only while developing.
  showEmptyImageSlots: true,

  // Formspree form ID (the part after /f/ in your endpoint URL).
  // Leave empty and the form refuses to submit rather than posting nowhere.
  // Get one free at https://formspree.io — no backend required.
  formspreeId: '',
};
