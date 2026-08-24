// Single edit point for the business's real details.

export default {
  name: 'HomeBridge Home Care Services',
  tagline: 'Bridging Care, Comfort, and Independence at Home',
  established: 2026,

  // Primary — the header call button and every tel: link.
  phone: '(587) 437-4067',
  // Secondary — listed alongside the primary on Contact and in the footer.
  phoneAlt: '(403) 629-0632',

  email: 'admin@homebridgeca.com',

  // TODO: fill in, or delete the address block from Footer/Contact if the
  // business has no public office address.
  address: {
    street: '',
    city: '',
    region: '',
    postal: '',
  },

  // Phone-answering hours. Care itself, including overnight, is arranged separately.
  hours: 'Phone answered Mon–Fri, 9am–5pm MT',

  // TODO: confirm — trim to the areas you actually cover. This list also fills
  // the city selector on the inquiry form, so keep it accurate.
  serviceArea: ['Calgary', 'Airdrie', 'Cochrane', 'Chestermere', 'Okotoks', 'Strathmore'],

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

  // ── Where form submissions go ──────────────────────────────────────────────
  // Web3Forms access key. IMPORTANT: the recipient address is bound to the KEY,
  // set in the Web3Forms dashboard — it is NOT taken from `email` above and is
  // not part of the request payload. Changing `email` only changes what the site
  // displays. To actually redirect delivery, either change the recipient for
  // this key in the dashboard, or create a new key for the new address and paste
  // it here.
  //
  // This key was originally issued for Admin1@homebridgeca.com.
  //
  // Leave it empty and the form still validates, but refuses to send and shows
  // the phone number instead of posting nowhere.
  web3formsKey: '9c02108e-07ed-432a-82f9-3e21ff7b203a',
};
