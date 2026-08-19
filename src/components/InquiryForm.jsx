import { useRef, useState, useEffect } from 'react';
import site from '../site.config.js';
import {
  validateInquiry,
  validateStep,
  validateApplication,
  formatPostalCode,
  firstError,
  STEPS,
} from '../validate.js';
import { telHref } from '../format.js';
import { careForOptions, helpWithOptions, emailConsent } from '../content.js';
import Icon, { CHECK } from './Icon.jsx';

const EMPTY = {
  careFor: '',
  helpWith: [],
  postalCode: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
  consent: false,
};

const STEP_TITLES = {
  careFor: 'Who is the care for?',
  helpWith: 'What would you like help with?',
  postalCode: 'Where is the care needed?',
  contact: 'How should we reach you?',
};

/**
 * The care inquiry: a four-step wizard, one question at a time.
 * `variant="careers"` renders the caregiver application instead — a plain
 * single-step form, since an application isn't a qualification funnel.
 */
export default function InquiryForm({ variant = 'care', title, note }) {
  const careers = variant === 'careers';
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [stepIndex, setStepIndex] = useState(0);
  const [status, setStatus] = useState('idle');
  const fieldRefs = useRef({});
  const headingRef = useRef(null);
  const startedRef = useRef(false);

  const step = STEPS[stepIndex];
  const isLast = stepIndex === STEPS.length - 1;

  // Move focus to the new step's heading so screen readers and keyboard users
  // follow the change. Skipped on first render — stealing focus on page load
  // would yank the visitor down to the form.
  useEffect(() => {
    if (!startedRef.current) {
      startedRef.current = true;
      return;
    }
    headingRef.current?.focus();
  }, [stepIndex]);

  const clearError = (key) =>
    setErrors((prev) => {
      // Email and phone are a paired requirement on the application form, so an
      // error raised against one is answered by filling either.
      const keys = key === 'email' || key === 'phone' ? ['email', 'phone'] : [key];
      if (!keys.some((k) => prev[k])) return prev;
      const next = { ...prev };
      keys.forEach((k) => delete next[k]);
      return next;
    });

  const set = (key, value) => {
    setValues((v) => ({ ...v, [key]: value }));
    clearError(key);
  };

  const onInput = (key) => (e) =>
    set(key, e.target.type === 'checkbox' ? e.target.checked : e.target.value);

  const toggleHelp = (slug) => {
    setValues((v) => ({
      ...v,
      helpWith: v.helpWith.includes(slug)
        ? v.helpWith.filter((s) => s !== slug)
        : [...v.helpWith, slug],
    }));
    clearError('helpWith');
  };

  function goNext() {
    const result = validateStep(step, values);
    if (!result.ok) {
      setErrors(result.errors);
      fieldRefs.current[firstError(result.errors)]?.focus();
      return;
    }
    setErrors({});
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
  }

  function goBack() {
    setErrors({});
    setStepIndex((i) => Math.max(i - 1, 0));
  }

  async function submit(payload) {
    if (!site.formspreeId) {
      setStatus('unconfigured');
      return;
    }
    setStatus('submitting');
    try {
      const res = await fetch(`https://formspree.io/f/${site.formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Formspree responded ${res.status}`);
      setStatus('done');
      setValues(EMPTY);
      setStepIndex(0);
    } catch (err) {
      console.error('Inquiry submission failed:', err);
      setStatus('error');
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    if (e.target.elements._gotcha?.value) return; // bot filled the honeypot

    // Not on the final step yet: Enter should advance, not send.
    if (!careers && !isLast) {
      goNext();
      return;
    }

    const result = careers ? validateApplication(values) : validateInquiry(values);
    // Set unconditionally: on success this clears anything left over from an
    // earlier failed attempt, so a stale message can't linger over a good submit.
    setErrors(result.errors);
    if (!result.ok) {
      fieldRefs.current[firstError(result.errors)]?.focus();
      return;
    }

    const helpLabels = values.helpWith
      .map((s) => helpWithOptions.find((o) => o.slug === s)?.label || s)
      .join(', ');

    submit(
      careers
        ? {
            ...values,
            _subject: `Caregiver application — ${values.firstName} ${values.lastName}`,
          }
        : {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            phone: values.phone,
            careFor: values.careFor,
            helpWith: helpLabels,
            postalCode: formatPostalCode(values.postalCode) || values.postalCode,
            message: values.message,
            consent: values.consent,
            _subject: `Care inquiry — ${values.firstName} ${values.lastName}`,
          },
    );
  }

  // ── Confirmation ──────────────────────────────────────────────────────────
  if (status === 'done') {
    return (
      <div className="form-card form-done">
        <span className="form-done__mark">
          <Icon paths={CHECK} size={28} />
        </span>
        <h3>Thank you — your message is on its way.</h3>
        <p className="form-card__note">
          Someone from our team will be in touch shortly. If it’s urgent, please call us at{' '}
          <a href={telHref(site.phone)}>{site.phone}</a>.
        </p>
      </div>
    );
  }

  // ── Shared bits ───────────────────────────────────────────────────────────
  const statusBanner = (
    <div aria-live="polite">
      {status === 'error' && (
        <p className="form-status form-status--error">
          We couldn’t send that message. Please try again, or call us at{' '}
          <a href={telHref(site.phone)}>{site.phone}</a> — we don’t want you left waiting.
        </p>
      )}
      {status === 'unconfigured' && (
        <p className="form-status form-status--warn">
          This form isn’t connected yet. Add your Formspree ID to <code>src/site.config.js</code>{' '}
          to start receiving submissions. In the meantime, please call{' '}
          <a href={telHref(site.phone)}>{site.phone}</a>.
        </p>
      )}
    </div>
  );

  const textField = (key, label, type = 'text', extra = {}) => (
    <div className={`field${errors[key] ? ' field--error' : ''}`}>
      <label htmlFor={`${variant}-${key}`}>
        {label}
        {extra.required && (
          <span className="req" aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </label>
      <input
        id={`${variant}-${key}`}
        name={key}
        type={type}
        value={values[key]}
        onChange={onInput(key)}
        ref={(el) => (fieldRefs.current[key] = el)}
        aria-invalid={errors[key] ? 'true' : undefined}
        aria-describedby={errors[key] ? `${variant}-${key}-err` : undefined}
        autoComplete={extra.autoComplete}
        inputMode={extra.inputMode}
        maxLength={extra.maxLength}
      />
      {errors[key] && (
        <span className="field-error" id={`${variant}-${key}-err`}>
          {errors[key]}
        </span>
      )}
    </div>
  );

  const consentField = (
    <div className={`field field--check${errors.consent ? ' field--error' : ''}`}>
      <input
        id={`${variant}-consent`}
        name="consent"
        type="checkbox"
        checked={values.consent}
        onChange={onInput('consent')}
        ref={(el) => (fieldRefs.current.consent = el)}
        aria-invalid={errors.consent ? 'true' : undefined}
        aria-describedby={errors.consent ? `${variant}-consent-err` : undefined}
      />
      <label htmlFor={`${variant}-consent`}>
        {careers
          ? 'It’s okay to contact me about this application.'
          : emailConsent}
        {errors.consent && (
          <span className="field-error" id={`${variant}-consent-err`}>
            {errors.consent}
          </span>
        )}
      </label>
    </div>
  );

  const honeypot = (
    <div className="honeypot" aria-hidden="true">
      <label htmlFor={`${variant}-_gotcha`}>Leave this field empty</label>
      <input id={`${variant}-_gotcha`} name="_gotcha" type="text" tabIndex={-1} />
    </div>
  );

  // ── Caregiver application: single step ────────────────────────────────────
  if (careers) {
    return (
      <form className="form-card" onSubmit={onSubmit} noValidate>
        {title && <h3>{title}</h3>}
        {note && <p className="form-card__note">{note}</p>}
        {statusBanner}

        <div className="field-row">
          {textField('firstName', 'First name', 'text', {
            required: true,
            autoComplete: 'given-name',
          })}
          {textField('lastName', 'Last name', 'text', {
            required: true,
            autoComplete: 'family-name',
          })}
        </div>
        {textField('email', 'Email address', 'email', { autoComplete: 'email' })}
        {textField('phone', 'Phone number', 'tel', { autoComplete: 'tel' })}

        <div className="field">
          <label htmlFor={`${variant}-message`}>
            Tell us a little about your caregiving experience
          </label>
          <textarea
            id={`${variant}-message`}
            name="message"
            value={values.message}
            onChange={onInput('message')}
          />
        </div>

        {honeypot}
        {consentField}

        <button className="btn btn--accent" type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending…' : 'Send my application'}
        </button>
      </form>
    );
  }

  // ── Care inquiry: four steps ──────────────────────────────────────────────
  return (
    <form className="form-card wizard" onSubmit={onSubmit} noValidate>
      <div className="wizard__head">
        <p className="wizard__progress">
          Step {stepIndex + 1} of {STEPS.length}
        </p>
        <ol className="wizard__dots" aria-hidden="true">
          {STEPS.map((s, i) => (
            <li key={s} className={i <= stepIndex ? 'is-done' : undefined} />
          ))}
        </ol>
      </div>

      {/* h2, not h3: on the home page this sits directly under the h1, and
          skipping a level breaks the heading outline for screen readers.
          tabIndex -1 so focus can be moved here on each step change. */}
      <h2 className="wizard__title" tabIndex={-1} ref={headingRef}>
        {STEP_TITLES[step]}
      </h2>
      {stepIndex === 0 && note && <p className="form-card__note">{note}</p>}

      {statusBanner}

      {step === 'careFor' && (
        <fieldset className="wizard__fieldset">
          <legend className="sr-only">{STEP_TITLES.careFor}</legend>
          <div className="choice-grid">
            {careForOptions.map((option, i) => (
              <button
                key={option}
                type="button"
                className={`choice${values.careFor === option ? ' is-selected' : ''}`}
                aria-pressed={values.careFor === option}
                ref={i === 0 ? (el) => (fieldRefs.current.careFor = el) : undefined}
                onClick={() => {
                  set('careFor', option);
                  setStepIndex(1); // a single choice: advance straight away
                }}
              >
                {option}
              </button>
            ))}
          </div>
          {errors.careFor && <span className="field-error">{errors.careFor}</span>}
        </fieldset>
      )}

      {step === 'helpWith' && (
        <fieldset className="wizard__fieldset">
          <legend className="sr-only">{STEP_TITLES.helpWith}</legend>
          <p className="form-card__note">Choose as many as apply.</p>
          <div className="choice-grid choice-grid--multi">
            {helpWithOptions.map((o, i) => (
              <button
                key={o.slug}
                type="button"
                className={`choice choice--multi${
                  values.helpWith.includes(o.slug) ? ' is-selected' : ''
                }`}
                aria-pressed={values.helpWith.includes(o.slug)}
                ref={i === 0 ? (el) => (fieldRefs.current.helpWith = el) : undefined}
                onClick={() => toggleHelp(o.slug)}
              >
                <span className="choice__tick" aria-hidden="true">
                  <Icon paths={CHECK} size={16} />
                </span>
                {o.label}
              </button>
            ))}
          </div>
          {errors.helpWith && <span className="field-error">{errors.helpWith}</span>}
        </fieldset>
      )}

      {step === 'postalCode' && (
        <>
          <p className="form-card__note">
            This tells us whether we have caregivers in your area.
          </p>
          <div className={`field${errors.postalCode ? ' field--error' : ''}`}>
            <label htmlFor={`${variant}-postalCode`}>
              Postal code
              <span className="req" aria-hidden="true">
                {' '}
                *
              </span>
            </label>
            <input
              id={`${variant}-postalCode`}
              name="postalCode"
              type="text"
              className="input--postal"
              value={values.postalCode}
              onChange={(e) => set('postalCode', e.target.value.toUpperCase())}
              onBlur={() => {
                const tidy = formatPostalCode(values.postalCode);
                if (tidy) set('postalCode', tidy);
              }}
              ref={(el) => (fieldRefs.current.postalCode = el)}
              placeholder="K1A 0B1"
              autoComplete="postal-code"
              maxLength={7}
              aria-invalid={errors.postalCode ? 'true' : undefined}
              aria-describedby={`${variant}-postal-help${
                errors.postalCode ? ` ${variant}-postalCode-err` : ''
              }`}
            />
            <span className="field-hint" id={`${variant}-postal-help`}>
              Canadian postal codes only, in the format A1A 1A1.
            </span>
            {errors.postalCode && (
              <span className="field-error" id={`${variant}-postalCode-err`}>
                {errors.postalCode}
              </span>
            )}
          </div>
        </>
      )}

      {step === 'contact' && (
        <>
          <div className="field-row">
            {textField('firstName', 'First name', 'text', {
              required: true,
              autoComplete: 'given-name',
            })}
            {textField('lastName', 'Last name', 'text', {
              required: true,
              autoComplete: 'family-name',
            })}
          </div>
          {textField('email', 'Email address', 'email', {
            required: true,
            autoComplete: 'email',
          })}
          {textField('phone', 'Phone number (optional)', 'tel', { autoComplete: 'tel' })}
          {honeypot}
          {consentField}
        </>
      )}

      <div className="wizard__actions">
        {stepIndex > 0 && (
          <button type="button" className="btn btn--ghost" onClick={goBack}>
            Back
          </button>
        )}
        {step !== 'careFor' && !isLast && (
          <button type="button" className="btn btn--accent" onClick={goNext}>
            Continue
          </button>
        )}
        {isLast && (
          <button className="btn btn--accent" type="submit" disabled={status === 'submitting'}>
            {status === 'submitting' ? 'Sending…' : 'Request a consultation'}
          </button>
        )}
      </div>
    </form>
  );
}
