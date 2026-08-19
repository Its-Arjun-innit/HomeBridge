import Hero from '../components/Hero.jsx';
import Section from '../components/Section.jsx';
import CallToAction from '../components/CallToAction.jsx';
import ImageSlot from '../components/ImageSlot.jsx';
import Reveal from '../components/Reveal.jsx';
import { services, intro } from '../content.js';

export default function Services() {
  return (
    <>
      <Hero title="Our Services" slot="services-hero" image="/media/hero.webp">
        <p>
          Our dedicated caregivers help with the everyday tasks that make life safer, easier,
          and more enjoyable — always at the pace and in the way each person prefers.
        </p>
      </Hero>

      <Section>
        <div className="grid grid--2">
          {services.map((s, i) => (
            <Reveal key={s.slug} i={i % 2} fill>
              <article className="card service-card">
                <ImageSlot
                  id={`service-${s.slug}`}
                  className="service-card__media figure--compact"
                />
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="band" data-reveal>
          <ImageSlot id="services-band" />
        </div>
      </Section>

      <Section tone="sand50" tight>
        <div className="section__head section__head--center" style={{ marginBottom: 0 }} data-reveal>
          <h2>Support that fits your week, not the other way round</h2>
          <p className="lede">{intro.body[2]}</p>
        </div>
      </Section>

      <CallToAction
        title="Not sure which services you need?"
        body="Most families aren’t, at first. Tell us what’s become difficult and we’ll help you work out where support would make the biggest difference."
      />
    </>
  );
}
