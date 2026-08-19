import { testimonials } from '../content.js';
import Section from './Section.jsx';
import ImageSlot from './ImageSlot.jsx';
import Reveal from './Reveal.jsx';

/**
 * Renders whatever is in `testimonials`. Entries flagged `placeholder: true`
 * are visibly marked so they cannot be mistaken for real reviews — replace them
 * with attributed quotes you have permission to publish, or remove this section
 * from Home.jsx until you have some.
 */
export default function Testimonials() {
  if (!testimonials.length) return null;

  return (
    <Section tone="tint" eyebrow="In their words" title="What families tell us" center>
      <div className="grid grid--3">
        {testimonials.map((t, i) => (
          <Reveal key={t.name + i} i={i} fill>
            <figure className="quote-card">
              {t.placeholder && (
                <span className="placeholder-flag">Placeholder — not a real review</span>
              )}
              <blockquote>“{t.quote}”</blockquote>
              <figcaption>
                <ImageSlot
                  id={`testimonial-${i + 1}`}
                  variant="round"
                  className="quote-card__avatar figure--compact"
                />
                <span>
                  <strong>{t.name}</strong>
                  {t.detail}
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
