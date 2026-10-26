import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const HOLD_MS = 2200;       // how long each phrase stays before the next one comes in
const TRANSITION_MS = 550;  // fade/slide time (match --rw-duration in styles.css)

/**
 * A phrase that swaps in place: the current one fades out drifting up, the next fades in from below.
 * The wrapper eases its width to the incoming phrase so the centred line doesn't jump.
 * Screen readers get the first phrase only; reduced motion shows the first phrase without rotating.
 */
export default function RotatingWords({ words, className = '' }) {
  const [index, setIndex] = useState(0);
  const [previous, setPrevious] = useState(null);
  const [width, setWidth] = useState(null);
  const [maxWidth, setMaxWidth] = useState(null);
  const sizers = useRef([]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || words.length < 2) return undefined;
    const id = window.setInterval(() => {
      setIndex(current => { setPrevious(current); return (current + 1) % words.length; });
    }, HOLD_MS + TRANSITION_MS);
    return () => window.clearInterval(id);
  }, [words.length]);

  // drop the outgoing phrase once its exit animation is done
  useEffect(() => {
    if (previous === null) return undefined;
    const id = window.setTimeout(() => setPrevious(null), TRANSITION_MS);
    return () => window.clearTimeout(id);
  }, [previous]);

  // measure the incoming phrase (also on resize / font load) so the width can ease to it
  useLayoutEffect(() => {
    const measure = () => {
      setWidth(sizers.current[index]?.getBoundingClientRect().width ?? null);
      // widest phrase: lets the layout reserve a fixed slot so the words before it never move
      setMaxWidth(Math.max(0, ...sizers.current.map(el => el?.getBoundingClientRect().width || 0)) || null);
    };
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [index]);

  return <span className={`rw ${className}`.trim()}>
    <span className="rw-sr">{words[0]}</span>
    <span className="rw-window" aria-hidden="true" style={width ? { width, '--rw-max': maxWidth ? `${maxWidth}px` : undefined } : undefined}>
      {previous !== null && <span className="rw-word is-out" key={`out-${previous}`}>{words[previous]}</span>}
      <span className={`rw-word${previous !== null ? ' is-in' : ''}`} key={`in-${index}`}>{words[index]}</span>
    </span>
    <span className="rw-sizers" aria-hidden="true">
      {words.map((word, i) => <span key={word} ref={el => { sizers.current[i] = el; }}>{word}</span>)}
    </span>
  </span>;
}
