/** Page section with an optional heading block. `tone` maps to the modifiers in styles.css. */
export default function Section({
  tone,
  tight,
  eyebrow,
  title,
  lede,
  center,
  id,
  children,
}) {
  const classes = ['section'];
  if (tone) classes.push(`section--${tone}`);
  if (tight) classes.push('section--tight');

  return (
    <section className={classes.join(' ')} id={id}>
      <div className="wrap">
        {(eyebrow || title || lede) && (
          <div className={`section__head${center ? ' section__head--center' : ''}`} data-reveal>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {title && <h2>{title}</h2>}
            {lede && <p className="lede">{lede}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
