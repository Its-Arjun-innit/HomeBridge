import { useEffect, useState } from 'react';
import { slots } from '../images.js';

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia?.(query).matches ?? false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    mq.addEventListener('change', onChange);
    setMatches(mq.matches);
    return () => mq.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

/**
 * @param video  path to a looping background clip; omitted → still image only
 * @param image  still shown as the video poster, and instead of it when motion is reduced
 * @param aside  optional right-hand column (the inquiry form on the home page)
 */
export default function Hero({ title, children, video, image, slot, aside, trust }) {
  // Hero backgrounds sit under headline text, so an unfilled slot falls back to
  // the existing photo rather than showing a dashed placeholder panel — a dashed
  // box behind white type is unreadable. Fill the slot in images.js to replace it.
  const background = (slot && slots[slot]?.src) || image;
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  // The clip is ~2.7 MB. Phones get the poster still instead — many visitors here
  // are on limited mobile data, and the video is decoration either way.
  const wideEnough = useMediaQuery('(min-width: 62rem)');
  const playVideo = video && wideEnough && !reduced;

  return (
    <section className={`hero${aside ? '' : ' hero--page'}`}>
      <div className="hero__media">
        {playVideo ? (
          <video
            src={video}
            poster={image}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            tabIndex={-1}
          />
        ) : (
          background && <img src={background} alt="" />
        )}
      </div>

      <div className="wrap hero__inner">
        <div className="hero__copy" data-reveal>
          <h1>{title}</h1>
          {children}
          {trust && (
            <ul className="hero__trust">
              {trust.map((t) => (
                <li key={t}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  {t}
                </li>
              ))}
            </ul>
          )}
        </div>
        {aside && (
          <div data-reveal style={{ '--i': 2 }}>
            {aside}
          </div>
        )}
      </div>
    </section>
  );
}
