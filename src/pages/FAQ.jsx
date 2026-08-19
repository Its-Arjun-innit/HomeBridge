import Hero from '../components/Hero.jsx';
import Section from '../components/Section.jsx';
import CallToAction from '../components/CallToAction.jsx';
import ImageSlot from '../components/ImageSlot.jsx';
import { faqs } from '../content.js';

// Native <details>/<summary>: keyboard and screen-reader behaviour for free,
// and it works before React hydrates. ponytail: no accordion library.
export default function FAQ() {
  const draft = faqs.filter((f) => f.a.includes('TODO')).length;

  return (
    <>
      <Hero title="Questions Families Ask" slot="faq-hero" image="/media/hero.webp">
        <p>
          Starting home care raises a lot of questions. Here are the ones we hear most — and if
          yours isn’t here, just ask.
        </p>
      </Hero>

      <Section>
        {draft > 0 && (
          <p className="form-status form-status--warn" style={{ maxWidth: '52rem' }} data-reveal>
            <strong>Note for the site owner:</strong> {draft} of these {faqs.length} answers
            contain <code>TODO: confirm</code> placeholders. They describe how home care
            generally works, not how HomeBridge specifically operates. Replace each with your
            real process, rates, and screening details in <code>src/content.js</code> before
            publishing — families make decisions on these answers.
          </p>
        )}

        <div className="split split--aside">
          <div className="faq" data-reveal>
            {faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <div>{f.a}</div>
              </details>
            ))}
          </div>
          <div data-reveal style={{ '--i': 1 }}>
            <ImageSlot id="faq-aside" />
          </div>
        </div>
      </Section>

      <CallToAction
        title="Still have a question?"
        body="Call us or send a message. There’s no obligation, and no question is too small."
      />
    </>
  );
}
