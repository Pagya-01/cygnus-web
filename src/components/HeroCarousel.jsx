import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { cards } from '../data/travelCards.js';
import TravelCard from './TravelCard.jsx';

// Carousel configuration. Keep an even number of cards for paired center focus.
const AUTOPLAY_DELAY_MS = 3000; // Delay before advancing to the next pair.
const CARDS_ADVANCED_PER_TICK = 2; // Number of cards that move on each tick.
const ARC_ROTATION_PER_STEP_DEG = 18; // Y rotation added for every ring from center.
const BLUR_PER_RING_PX = [0, 2, 4, 6]; // Focus pair, first ring, second ring, outer rings.
const TRANSITION_DURATION_MS = 900; // Smooth card transform, blur, and opacity time.
const CARD_SIZE_PX = { width: 120, height: 150 }; // Hero feature card dimensions.
const SLOT_STEP_RATIO = 0.1112; // Keeps outer slots near the viewport edges.
const MIN_SLOT_STEP_PX = 159; // Figma keeps the 1440 spacing on tablet and mobile.

function getOffset(index, activeIndex, count) {
  const focusStart = Math.floor(count / 2) - 1;
  const slot = (index - activeIndex + focusStart + count) % count;
  return slot - (count - 1) / 2;
}

function getCardPosition(index, activeIndex, count, viewportWidth) {
  const offset = getOffset(index, activeIndex, count);
  const ring = Math.max(0, Math.round(Math.abs(offset) - 0.5));
  const depth = ring * 44;
  const scale = Math.max(0.7, 1 - ring * 0.075);
  const rotation = offset < 0 ? ring * ARC_ROTATION_PER_STEP_DEG : -ring * ARC_ROTATION_PER_STEP_DEG;
  const arcDrop = ring * ring * 6;
  const blur = BLUR_PER_RING_PX[Math.min(ring, BLUR_PER_RING_PX.length - 1)];
  const opacity = ring === 0 ? 1 : Math.max(0.4, 0.8 - (ring - 1) * 0.13);

  return {
    offset,
    ring,
    style: {
      '--offset': offset,
      '--x': `${offset * Math.max(MIN_SLOT_STEP_PX, viewportWidth * SLOT_STEP_RATIO)}px`,
      '--depth': `${-depth}px`,
      '--rotation': `${rotation}deg`,
      '--scale': scale,
      '--arc-drop': `${arcDrop}px`,
      '--blur': `${blur}px`,
      '--opacity': opacity,
      '--card-z': ring === 0 ? 20 : 10 - ring,
      '--card-width': `${CARD_SIZE_PX.width}px`,
      '--card-height': `${CARD_SIZE_PX.height}px`,
      '--transition-duration': `${TRANSITION_DURATION_MS}ms`,
    },
  };
}

export default function HeroCarousel({ activeIndex, onActiveIndexChange }) {
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(() => window.innerWidth);
  const [wrappingCards, setWrappingCards] = useState(() => new Set());
  const previousIndex = useRef(activeIndex);
  const wrapTimeout = useRef(null);

  useEffect(() => {
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener?.('change', updatePreference);
    return () => mediaQuery.removeEventListener?.('change', updatePreference);
  }, []);

  useLayoutEffect(() => {
    const beforeIndex = previousIndex.current;
    previousIndex.current = activeIndex;
    if (beforeIndex === activeIndex) return undefined;

    const wrapped = new Set();
    cards.forEach((_, index) => {
      const before = getOffset(index, beforeIndex, cards.length);
      const after = getOffset(index, activeIndex, cards.length);
      if (Math.abs(after - before) > cards.length / 2) wrapped.add(index);
    });

    if (wrapped.size === 0) return undefined;
    setWrappingCards(wrapped);
    window.clearTimeout(wrapTimeout.current);
    wrapTimeout.current = window.setTimeout(() => setWrappingCards(new Set()), 80);
    return undefined;
  }, [activeIndex]);

  useEffect(() => () => window.clearTimeout(wrapTimeout.current), []);

  useEffect(() => {
    if (paused || reducedMotion) return undefined;
    const interval = window.setInterval(() => {
      onActiveIndexChange((currentIndex) => (currentIndex + CARDS_ADVANCED_PER_TICK) % cards.length);
    }, AUTOPLAY_DELAY_MS);
    return () => window.clearInterval(interval);
  }, [paused, reducedMotion, onActiveIndexChange]);

  return <div
    className={`carousel${reducedMotion ? ' carousel-reduced-motion' : ''}`}
    role="region"
    aria-label="Business travel platform features"
    aria-roledescription="carousel"
    aria-live="off"
    onMouseEnter={() => setPaused(true)}
    onMouseLeave={() => setPaused(false)}
  >
    {cards.map((card, index) => {
      const position = getCardPosition(index, activeIndex, cards.length, viewportWidth);
      return <div
        className={`carousel-slot${wrappingCards.has(index) ? ' is-wrapping' : ''}`}
        key={card.title}
        style={position.style}
        aria-hidden={position.ring > 0}
      >
        <TravelCard card={card} />
      </div>;
    })}
  </div>;
}
