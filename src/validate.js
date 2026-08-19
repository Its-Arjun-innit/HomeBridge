// Inquiry form validation. Pure — no DOM, no React — so it is checkable with
// `node src/validate.check.mjs`.

// ponytail: deliberately permissive email shape check. Real verification is the
// confirmation email, not a regex; over-strict patterns reject valid addresses.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Canadian postal code: A1A 1A1. The excluded letters (D, F, I, O, Q, U) are
// never used by Canada Post, and W and Z never appear in the first position.
const POSTAL_CA = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z] ?\d[ABCEGHJ-NPRSTV-Z]\d$/i;

const digits = (s) => (s.match(/\d/g) || []).length;
const trim = (v) => (v || '').trim();

/** Normalizes to the canonical 'A1A 1A1' form. Returns '' if not valid. */
export function formatPostalCode(raw) {
  const compact = trim(raw).replace(/\s+/g, '').toUpperCase();
  if (!POSTAL_CA.test(compact)) return '';
  return `${compact.slice(0, 3)} ${compact.slice(3)}`;
}

export const isPostalCode = (raw) => POSTAL_CA.test(trim(raw).replace(/\s+/g, ''));

// The wizard's steps, in order. Used for the progress label and step routing.
export const STEPS = ['careFor', 'helpWith', 'postalCode', 'contact'];

/** Errors for a single wizard step, so the visitor can't advance past a gap. */
export function validateStep(step, fields = {}) {
  const errors = {};

  if (step === 'careFor' && !trim(fields.careFor)) {
    errors.careFor = 'Please choose who the care is for.';
  }

  if (step === 'helpWith' && !(fields.helpWith || []).length) {
    errors.helpWith = 'Please choose at least one kind of support.';
  }

  if (step === 'postalCode') {
    const pc = trim(fields.postalCode);
    if (!pc) errors.postalCode = 'Please enter your postal code.';
    else if (!isPostalCode(pc))
      errors.postalCode = 'Please enter a Canadian postal code, for example K1A 0B1.';
  }

  if (step === 'contact') Object.assign(errors, validateContact(fields));

  return { ok: Object.keys(errors).length === 0, errors };
}

/** The final step: who to reply to. */
export function validateContact(fields = {}) {
  const errors = {};
  const email = trim(fields.email);
  const phone = trim(fields.phone);

  if (!trim(fields.firstName)) errors.firstName = 'Please enter your first name.';
  if (!trim(fields.lastName)) errors.lastName = 'Please enter your last name.';

  if (!email) {
    errors.email = 'Please enter your email address so we can reply.';
  } else if (!EMAIL.test(email)) {
    errors.email = 'That email address doesn’t look right.';
  }

  // Phone is optional here — email is the required reply channel — but if one is
  // given it has to be usable. 10 digits in North America, up to 15 with a
  // country code.
  if (phone && (digits(phone) < 10 || digits(phone) > 15)) {
    errors.phone = 'Please enter a phone number including the area code.';
  }

  if (!fields.consent) {
    errors.consent = 'Please confirm we can email you about your inquiry.';
  }

  return errors;
}

export const FIELD_ORDER = [
  'careFor',
  'helpWith',
  'postalCode',
  'firstName',
  'lastName',
  'email',
  'phone',
  'consent',
];

/**
 * Every step at once — the guard before an actual submit, so a visitor who
 * skips ahead somehow still can't send an incomplete inquiry.
 *
 * @returns {{ok: boolean, errors: Record<string, string>}}
 */
export function validateInquiry(fields = {}) {
  const errors = {};
  STEPS.forEach((step) => Object.assign(errors, validateStep(step, fields).errors));
  return { ok: Object.keys(errors).length === 0, errors };
}

/** The caregiver application — a plain single-step form, not the wizard. */
export function validateApplication(fields = {}) {
  const errors = {};
  const email = trim(fields.email);
  const phone = trim(fields.phone);

  if (!trim(fields.firstName)) errors.firstName = 'Please enter your first name.';
  if (!trim(fields.lastName)) errors.lastName = 'Please enter your last name.';

  if (!email && !phone) {
    errors.email = 'Please give us either an email address or a phone number so we can reply.';
  } else {
    if (email && !EMAIL.test(email)) errors.email = 'That email address doesn’t look right.';
    if (phone && (digits(phone) < 10 || digits(phone) > 15))
      errors.phone = 'Please enter a phone number including the area code.';
  }

  if (!fields.consent) errors.consent = 'Please confirm we can contact you about this application.';

  return { ok: Object.keys(errors).length === 0, errors };
}

/** First invalid field, in visual order — used to move focus after a failed submit. */
export function firstError(errors) {
  return FIELD_ORDER.find((f) => errors[f]) || null;
}
