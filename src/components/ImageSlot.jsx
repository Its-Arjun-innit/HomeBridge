import site from '../site.config.js';
import { slots } from '../images.js';

/**
 * A photo position on the page. Renders the image once `src` is set in
 * images.js, and a labelled placeholder panel until then.
 *
 * @param id       key in images.js
 * @param variant  'fade' (default, edges dissolve into the page) | 'plain' | 'round'
 * @param ratio    override the registry's aspect ratio for this placement
 * @param className extra classes on the wrapper
 * @param priority true for above-the-fold images — skips lazy loading
 */
export default function ImageSlot({ id, variant = 'fade', ratio, className = '', priority = false }) {
  const conf = slots[id];

  if (!conf) {
    // A typo'd id would otherwise fail silently and leave a hole in the page.
    if (import.meta.env.DEV) console.warn(`ImageSlot: no slot named "${id}" in images.js`);
    return null;
  }

  const style = { aspectRatio: ratio || conf.ratio };
  const classes = ['figure', `figure--${variant}`, className].filter(Boolean).join(' ');

  if (conf.src) {
    if (import.meta.env.DEV && !conf.alt) {
      console.warn(
        `ImageSlot "${id}" has a photo but no alt text. Describe it in images.js — ` +
          `screen readers and search engines both read it.`,
      );
    }
    return (
      <figure className={classes} style={style}>
        <img
          src={conf.src}
          alt={conf.alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      </figure>
    );
  }

  if (!site.showEmptyImageSlots) return null;

  return (
    <div className={`${classes} figure--empty`} style={style} role="presentation">
      <div className="figure__empty-inner">
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <circle cx="8.5" cy="9.5" r="1.6" />
          <path d="M21 16l-5-5-5.5 5.5" />
          <path d="M3 18l4-4 3 3" />
        </svg>
        <p className="figure__hint">{conf.hint}</p>
        <code className="figure__id">{id}</code>
      </div>
    </div>
  );
}
