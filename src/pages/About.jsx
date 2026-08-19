import Hero from '../components/Hero.jsx';
import Section from '../components/Section.jsx';
import CallToAction from '../components/CallToAction.jsx';
import ImageSlot from '../components/ImageSlot.jsx';
import Reveal from '../components/Reveal.jsx';
import Icon from '../components/Icon.jsx';
import { mission, vision, promise, values, intro } from '../content.js';

export default function About() {
  return (
    <>
      <Hero title="About HomeBridge Care Services" slot="about-hero" image="/media/hero.webp">
        <p>{intro.lede}</p>
      </Hero>

      <Section tight>
        <div className="split">
          <div data-reveal>
            <ImageSlot id="about-story" />
          </div>
          <div className="prose" data-reveal style={{ '--i': 1 }}>
            {intro.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </Section>

      <section className="section section--teal section--tight has-bg-figure">
        <div className="bg-figure" aria-hidden="true">
          <ImageSlot id="about-quote-bg" className="figure--compact" />
        </div>
        <div className="wrap" data-reveal>
          <blockquote className="pullquote" style={{ maxWidth: '46rem' }}>
            {intro.pullQuote}
          </blockquote>
          <p className="lede" style={{ marginTop: '1.75rem', maxWidth: '46rem' }}>
            {intro.pullQuoteTail}
          </p>
        </div>
      </section>

      <Section eyebrow="Our mission" title="Enriching lives, one home at a time">
        <div className="split">
          <div className="prose" data-reveal>
            {mission.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div data-reveal style={{ '--i': 1 }}>
            <ImageSlot id="about-mission" />
          </div>
        </div>

        <div className="grid grid--2" style={{ marginTop: 'clamp(2rem, 4vw, 3rem)' }}>
          <Reveal fill>
            <article className="card">
              <h3>Our Vision</h3>
              <p>{vision}</p>
            </article>
          </Reveal>
          <Reveal i={1} fill>
            <article className="card">
              <h3>Our Promise</h3>
              <p>{promise}</p>
            </article>
          </Reveal>
        </div>
      </Section>

      <Section tone="sand50" eyebrow="What guides us" title="The way we work" center>
        <div className="grid grid--4">
          {values.map((v, i) => (
            <Reveal key={v.title} i={i} fill>
              <article className="card">
                <span className="card__icon">
                  <Icon paths={v.icon} size={26} />
                </span>
                <h3>{v.title}</h3>
                <p>{v.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="band" data-reveal>
          <ImageSlot id="about-team" />
        </div>
      </Section>

      <CallToAction />
    </>
  );
}
