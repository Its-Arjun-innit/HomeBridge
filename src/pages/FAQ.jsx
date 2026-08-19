import Hero from '../components/Hero.jsx';
import Section from '../components/Section.jsx';
import CallToAction from '../components/CallToAction.jsx';
import ImageSlot from '../components/ImageSlot.jsx';
import site from '../site.config.js';
import { faqs } from '../content.js';
import { telHref } from '../format.js';

// Native <details>/<summary>: keyboard and screen-reader behaviour for free,
// and it works before React hydrates. ponytail: no accordion library.
export default function FAQ() {
  const isDraft = (f) => f.a.includes('TODO');
  const draft = faqs.filter(isDraft).length;
  // Visitors see only questions that have a real answer. Drafts stay visible
  // while developing so the remaining work is impossible to forget.
  const shown = site.showDraftContent ? faqs : faqs.filter((f) => !isDraft(f));

  return (
    <>
      <Hero title="Questions Families Ask" slot="faq-hero" image="/media/hero.webp">
        <p>
          Starting home care raises a lot of questions. Here are the ones we hear most — and if
          yours isn’t here, just ask.
        </p>
      </Hero>

      <Section>
        {draft > 0 && site.showDraftContent && (
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
            {/* Every answer is still a draft, so there is nothing to publish yet.
                An empty page is worse than none — point people at the phone. */}
            {shown.length === 0 && (
              <div className="faq-empty">
                <h2>We’re still writing these up.</h2>
                <p>
                  In the meantime, the fastest way to get a straight answer about hours,
                  costs, or how we match caregivers is simply to ask us.
                </p>
                <a className="btn btn--primary" href={telHref(site.phone)}>
                  Call {site.phone}
                </a>
              </div>
            )}
            {shown.map((f) => (
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
