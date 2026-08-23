/** `tel:` href from a display number — strips everything but digits and a leading +. */
export function telHref(phone = '') {
  const cleaned = phone.replace(/[^\d+]/g, '');
  return `tel:${cleaned.startsWith('+') ? '+' : ''}${cleaned.replace(/\+/g, '')}`;
}

/**
 * Joins the area-code select and the 7-digit input into one display number.
 * Returns '' when either half is missing — phone is optional, and half a phone
 * number is worse than none.
 */
export function composePhone(areaCode = '', local = '') {
  const a = (areaCode.match(/\d/g) || []).join('');
  const l = (local.match(/\d/g) || []).join('');
  if (a.length !== 3 || l.length !== 7) return '';
  return `(${a}) ${l.slice(0, 3)}-${l.slice(3)}`;
}

/** True when a site.config value is still an unedited placeholder. */
export function isPlaceholder(value) {
  return typeof value === 'string' && value.trim().toUpperCase().startsWith('TODO');
}

/**
 * Drops unedited placeholders in a production build, keeps them while
 * developing. A visitor should never be shown the word "TODO"; the owner
 * still needs the reminder on screen.
 */
export function publishable(list = []) {
  return import.meta.env.DEV ? list : list.filter((v) => !isPlaceholder(v));
}
