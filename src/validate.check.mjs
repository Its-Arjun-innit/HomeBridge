// Run: node src/validate.check.mjs
// Exits non-zero if the inquiry validator regresses.
import assert from 'node:assert/strict';
import {
  validateInquiry,
  validateStep,
  validateApplication,
  isPostalCode,
  formatPostalCode,
  firstError,
} from './validate.js';

const COMPLETE = {
  careFor: 'A parent',
  helpWith: ['personal-care'],
  postalCode: 'K1A 0B1',
  firstName: 'Ana',
  lastName: 'Silva',
  email: 'ana@example.com',
  consent: true,
};

const errs = (f) => validateInquiry(f).errors;

// ── Full inquiry ────────────────────────────────────────────────────────────
assert.equal(validateInquiry(COMPLETE).ok, true, 'a complete inquiry must pass');
assert.equal(validateInquiry({}).ok, false, 'an empty inquiry must fail');
assert.equal(validateInquiry({ ...COMPLETE, phone: '(555) 123-4567' }).ok, true);

// ── Step 1: who the care is for ─────────────────────────────────────────────
assert.ok(validateStep('careFor', {}).errors.careFor);
assert.equal(validateStep('careFor', { careFor: 'Me' }).ok, true);

// ── Step 2: what the help is with ───────────────────────────────────────────
assert.ok(validateStep('helpWith', { helpWith: [] }).errors.helpWith, 'empty selection fails');
assert.equal(validateStep('helpWith', { helpWith: ['meals'] }).ok, true);

// ── Step 3: Canadian postal code ────────────────────────────────────────────
assert.ok(isPostalCode('K1A 0B1'), 'the Ottawa test code is valid');
assert.ok(isPostalCode('k1a0b1'), 'lowercase and unspaced is valid');
assert.ok(isPostalCode('V6B 4Y8'));
assert.ok(!isPostalCode('90210'), 'a US ZIP must be rejected');
assert.ok(!isPostalCode('SW1A 1AA'), 'a UK postcode must be rejected');
assert.ok(!isPostalCode('D1A 0B1'), 'D is never used in the first position');
assert.ok(!isPostalCode('Z1A 0B1'), 'Z is never used in the first position');
assert.ok(!isPostalCode('K1I 0B1'), 'I is never used by Canada Post');
assert.ok(!isPostalCode('K1A 0B'), 'too short must fail');
assert.equal(formatPostalCode('k1a0b1'), 'K1A 0B1', 'normalizes to canonical form');
assert.equal(formatPostalCode('nope'), '', 'invalid input normalizes to empty');
assert.ok(validateStep('postalCode', { postalCode: '90210' }).errors.postalCode);
assert.ok(validateStep('postalCode', {}).errors.postalCode, 'blank postal code fails');

// ── Step 4: contact details ─────────────────────────────────────────────────
assert.ok(errs({ ...COMPLETE, firstName: '  ' }).firstName, 'whitespace first name fails');
assert.ok(errs({ ...COMPLETE, lastName: '' }).lastName);
assert.ok(errs({ ...COMPLETE, email: '' }).email, 'email is required on an inquiry');
assert.ok(errs({ ...COMPLETE, email: 'a@b' }).email, 'missing TLD fails');
assert.ok(errs({ ...COMPLETE, phone: '555-1234' }).phone, 'short phone fails when supplied');
assert.equal(validateInquiry({ ...COMPLETE, phone: '' }).ok, true, 'phone stays optional');
assert.ok(errs({ ...COMPLETE, consent: false }).consent);

// ── Caregiver application: either channel is enough, unlike an inquiry ──────
const APP = { firstName: 'Sam', lastName: 'Okafor', consent: true };
assert.equal(validateApplication({ ...APP, email: 'sam@example.com' }).ok, true);
assert.equal(validateApplication({ ...APP, phone: '555-123-4567' }).ok, true);
assert.ok(validateApplication(APP).errors.email, 'application needs one contact channel');
assert.ok(validateApplication({ ...APP, email: 'sam@example.com', consent: false }).errors.consent);

// ── Focus target follows visual order, not object key order ─────────────────
assert.equal(firstError(errs({})), 'careFor');
assert.equal(firstError(errs({ ...COMPLETE, lastName: '', email: '' })), 'lastName');
assert.equal(firstError({}), null);

console.log('validate.check: all assertions passed');
