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

/**
 * Length caps. Enforced here rather than relying on the inputs' maxLength, which
 * is a UI hint any tampered client ignores. Email cap is the RFC 5321 maximum.
 */
export const LIMITS = { name: 100, email: 254, message: 2000 };

const tooLong = (value, max, label) =>
  (value || '').trim().length > max ? `${label} must be ${max} characters or fewer.` : null;

/** Area codes in service. Alberta only — the business operates in Calgary. */
export const AREA_CODES = ['403', '587', '780', '825', '368'];

/** Escape hatch on the city selector so out-of-area visitors aren't blocked. */
export const OUTSIDE_AREA = 'Outside these areas';

/**
 * The phone field is split into an area-code select and a 7-digit input.
 * Phone is optional, but half a phone number is not a phone number: if either
 * part is filled, both must be.
 */
export function validatePhoneParts(fields = {}) {
  const errors = {};
  const area = trim(fields.areaCode);
  const local = trim(fields.phoneLocal);
  if (!area && !local) return errors; // omitted entirely — fine

  if (!area) errors.areaCode = 'Please choose an area code.';
  if (!local) errors.phoneLocal = 'Please enter the rest of the number.';
  else if (digits(local) !== 7) errors.phoneLocal = 'A phone number needs 7 digits after the area code.';
  return errors;
}

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
    if (!trim(fields.city)) errors.city = 'Please choose the area where care is needed.';

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

  if (!trim(fields.firstName)) errors.firstName = 'Please enter your first name.';
  else errors.firstName = tooLong(fields.firstName, LIMITS.name, 'First name') || undefined;
  if (!trim(fields.lastName)) errors.lastName = 'Please enter your last name.';
  else errors.lastName = tooLong(fields.lastName, LIMITS.name, 'Last name') || undefined;

  if (!email) {
    errors.email = 'Please enter your email address so we can reply.';
  } else if (email.length > LIMITS.email) {
    errors.email = `Email must be ${LIMITS.email} characters or fewer.`;
  } else if (!EMAIL.test(email)) {
    errors.email = 'That email address doesn’t look right.';
  }

  const longMsg = tooLong(fields.message, LIMITS.message, 'Message');
  if (longMsg) errors.message = longMsg;

  // Phone is optional here — email is the required reply channel.
  Object.assign(errors, validatePhoneParts(fields));

  if (!fields.consent) {
    errors.consent = 'Please confirm we can email you about your inquiry.';
  }

  // tooLong() yields undefined when the value is fine; drop those so callers
  // counting Object.keys() don't see phantom errors.
  Object.keys(errors).forEach((k) => errors[k] === undefined && delete errors[k]);
  return errors;
}

export const FIELD_ORDER = [
  'careFor',
  'helpWith',
  'city',
  'postalCode',
  'firstName',
  'lastName',
  'email',
  'areaCode',
  'phoneLocal',
  'message',
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
  const hasPhone = trim(fields.areaCode) || trim(fields.phoneLocal);

  if (!trim(fields.firstName)) errors.firstName = 'Please enter your first name.';
  else if (tooLong(fields.firstName, LIMITS.name, 'First name'))
    errors.firstName = tooLong(fields.firstName, LIMITS.name, 'First name');
  if (!trim(fields.lastName)) errors.lastName = 'Please enter your last name.';
  else if (tooLong(fields.lastName, LIMITS.name, 'Last name'))
    errors.lastName = tooLong(fields.lastName, LIMITS.name, 'Last name');

  const longExp = tooLong(fields.message, LIMITS.message, 'Message');
  if (longExp) errors.message = longExp;

  if (!email && !hasPhone) {
    errors.email = 'Please give us either an email address or a phone number so we can reply.';
  } else if (email && !EMAIL.test(email)) {
    errors.email = 'That email address doesn’t look right.';
  }
  Object.assign(errors, validatePhoneParts(fields));

  if (!fields.consent) errors.consent = 'Please confirm we can contact you about this application.';

  return { ok: Object.keys(errors).length === 0, errors };
}

/** First invalid field, in visual order — used to move focus after a failed submit. */
export function firstError(errors) {
  return FIELD_ORDER.find((f) => errors[f]) || null;
}
