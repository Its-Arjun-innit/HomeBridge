import { Link } from 'react-router-dom';
import site from '../site.config.js';
import { LEGAL_UPDATED } from '../legal.js';

// Renders [text](url) inside a paragraph as a real link. Internal paths (starting
// with /) use the router; everything else opens in a new tab. No markdown library
// for this one job.
const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

/**
 * Only route-relative, http(s), and mailto URLs may reach an href. The content
 * comes from our own legal.js rather than a visitor, so this is defence in
 * depth — but a `javascript:` or `data:` URL in an href executes, and refusing
 * to render one is a great deal cheaper than discovering it later.
 */
const isSafeUrl = (url) => /^\/(?!\/)/.test(url) || /^(https?:|mailto:)/i.test(url);

function renderText(text, keyBase) {
  const out = [];
  let last = 0;
  let m;
  let i = 0;
  LINK.lastIndex = 0;
  while ((m = LINK.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const [, label, url] = m;
    const key = `${keyBase}-${i++}`;
    if (!isSafeUrl(url)) {
      // Unsafe scheme: show the label as plain text rather than a live link.
      if (import.meta.env.DEV) console.warn(`LegalDoc: refusing unsafe URL "${url}"`);
      out.push(label);
    } else if (url.startsWith('/')) {
      out.push(
        <Link key={key} to={url}>
          {label}
        </Link>,
      );
    } else {
      const external = url.startsWith('http');
      out.push(
        <a
          key={key}
          href={url}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {label}
        </a>,
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/**
 * Long-form legal page body. Sections whose text is still a TODO placeholder
 * follow the site-wide draft rule: shown as a labelled slot while developing,
 * omitted from the published page until real wording replaces them.
 */
export default function LegalDoc({ sections }) {
  return (
    <div className="legal" data-reveal>
      <p className="legal__updated">Last updated: {LEGAL_UPDATED}</p>
      {sections.map((sec) => {
        const paras = sec.body.filter((p) => {
          if (!p.includes('TODO')) return true;
          return site.showDraftContent; // hide TODO-only paragraphs in production
        });
        if (!paras.length) return null; // whole section was placeholder-only

        return (
          <section key={sec.heading} className="legal__section">
            <h2>{sec.heading}</h2>
            {paras.map((p, i) => {
              const isTodo = p.includes('TODO');
              return (
                <p key={i} className={isTodo ? 'legal__todo' : undefined}>
                  {/* A paragraph may carry line-broken bullet lines. */}
                  {p.split('\n').map((line, li, arr) => (
                    <span key={li}>
                      {renderText(line, `${sec.heading}-${i}-${li}`)}
                      {li < arr.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              );
            })}
          </section>
        );
      })}
    </div>
  );
}
