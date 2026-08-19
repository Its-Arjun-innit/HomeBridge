/** `tel:` href from a display number — strips everything but digits and a leading +. */
export function telHref(phone = '') {
  const cleaned = phone.replace(/[^\d+]/g, '');
  return `tel:${cleaned.startsWith('+') ? '+' : ''}${cleaned.replace(/\+/g, '')}`;
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
