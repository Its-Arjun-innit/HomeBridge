import Hero from '../components/Hero.jsx';
import Section from '../components/Section.jsx';
import InquiryForm from '../components/InquiryForm.jsx';
import ImageSlot from '../components/ImageSlot.jsx';
import Reveal from '../components/Reveal.jsx';
import Icon, { CHECK } from '../components/Icon.jsx';
import site from '../site.config.js';

// TODO: confirm — every item below describes the role in general terms only.
// Replace with HomeBridge's actual requirements, certifications, pay structure,
// and benefits before publishing. Do not publish invented qualifications.
const EXPECTATIONS = [
  {
    title: 'What the work looks like',
    body: 'Supporting clients in their own homes with personal care, meals, mobility, housekeeping, errands, and companionship.',
  },
  {
    title: 'Who tends to thrive here',
    body: 'People who are patient, dependable, and genuinely enjoy the company of the person they’re caring for.',
  },
  {
    title: 'Schedules',
    body: 'TODO: confirm — describe shift lengths, weekend/overnight expectations, and how much flexibility caregivers have.',
  },
  {
    title: 'Requirements',
    body: 'TODO: confirm — list the certifications, background checks, licensing, and driving requirements you actually require.',
  },
  {
    title: 'Pay and benefits',
    body: 'TODO: confirm — state pay range and any benefits. Applications drop sharply when this is missing.',
  },
  {
    title: 'Training and support',
    body: 'TODO: confirm — describe onboarding, ongoing training, and who caregivers can reach when they need help.',
  },
];

export default function Careers() {
  return (
    <>
      <Hero title="Join Our Care Team" slot="careers-hero" image="/media/hero.webp">
        <p>
          Caregiving is demanding work that matters enormously to the people who receive it. If
          you bring patience, reliability, and genuine kindness, we’d like to hear from you.
        </p>
      </Hero>

      <Section tight>
        <div className="split">
          <div data-reveal>
            <ImageSlot id="careers-day" />
          </div>
          <div data-reveal style={{ '--i': 1 }}>
            <p className="eyebrow">A day in the role</p>
            <h2>Real work, in real homes</h2>
            <p>
              No two shifts look the same. You might start the morning helping someone get
              washed and dressed, spend the middle of the day cooking and running errands, and
              finish with an hour of company over a cup of tea.
            </p>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Working with us"
        title="What to expect"
        lede="Our caregivers are the whole of what we offer. We look for people who treat clients the way they’d want their own family treated."
      >
        <div className="grid grid--3">
          {(site.showDraftContent
            ? EXPECTATIONS
            : EXPECTATIONS.filter((e) => !e.body.includes('TODO'))
          ).map((e, i) => (
            <Reveal key={e.title} i={i} fill>
              <article className="card service-card">
                <span className="service-card__bullet">
                  <Icon paths={CHECK} size={22} />
                </span>
                <div>
                  <h3>{e.title}</h3>
                  <p>{e.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="band" data-reveal>
          <ImageSlot id="careers-team" />
        </div>
      </Section>

      <Section tone="sand50" id="apply">
        <div className="split">
          <div data-reveal>
            <p className="eyebrow">Apply</p>
            <h2>Tell us about yourself</h2>
            <p className="lede">
              Send us your details and a little about your experience. We read every
              application, and we’ll get back to you either way.
            </p>
            <div style={{ marginTop: '2rem' }}>
              <ImageSlot id="careers-apply" />
            </div>
          </div>
          <div data-reveal style={{ '--i': 1 }}>
            <InquiryForm variant="careers" title="Caregiver application" />
          </div>
        </div>
      </Section>
    </>
  );
}
