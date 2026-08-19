/**
 * Fade-up wrapper for scroll reveal.
 *
 * Deliberately a wrapper rather than a `data-reveal` attribute on the card
 * itself: both effects animate `transform`, so sharing one element means the
 * reveal's `transform: none` beats the hover lift and the card never moves.
 * Wrapper owns the entry animation, child owns the hover.
 *
 * @param i     stagger index — drives transition-delay
 * @param fill  set when the wrapper is a grid item, so the child stretches to
 *              the full row height the way the bare card used to
 */
export default function Reveal({ i = 0, fill = false, className = '', children }) {
  const classes = ['reveal', fill && 'reveal--fill', className].filter(Boolean).join(' ');
  return (
    <div className={classes} data-reveal style={{ '--i': i }}>
      {children}
    </div>
  );
}
