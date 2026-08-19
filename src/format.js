/** `tel:` href from a display number — strips everything but digits and a leading +. */
export function telHref(phone = '') {
  const cleaned = phone.replace(/[^\d+]/g, '');
  return `tel:${cleaned.startsWith('+') ? '+' : ''}${cleaned.replace(/\+/g, '')}`;
}

/** True when a site.config value is still an unedited placeholder. */
export function isPlaceholder(value) {
  return typeof value === 'string' && value.trim().toUpperCase().startsWith('TODO');
}
