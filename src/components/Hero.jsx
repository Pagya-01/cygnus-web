import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import HeroCarousel from './HeroCarousel.jsx';
import { cards } from '../data/travelCards.js';

export default function Hero() {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const heroRef = useRef(null);

  // Sky background grows as the visitor scrolls through the hero (1 → 1.3).
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let frame = 0;
    const update = () => {
      frame = 0;
      const progress = Math.min(1, Math.max(0, window.scrollY / Math.max(1, hero.offsetHeight)));
      hero.style.setProperty('--hero-zoom', (1 + progress * 0.3).toFixed(4));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, []);

  return <main ref={heroRef} className="hero" id="top">
    <div className="hero-sky" aria-hidden="true"><div className="hero-sky-image"/></div>
    <div className="sky-glow" aria-hidden="true"/><div className="cloud-bank cloud-left" aria-hidden="true"/><div className="cloud-bank cloud-right" aria-hidden="true"/><div className="horizon-haze" aria-hidden="true"/>
    <section className="hero-copy" aria-labelledby="hero-title">
      <div className="eyebrow"><span className="eyebrow-mark"/>AI-Native Corporate Travel</div>
      <h1 id="hero-title">The Operating System<br className="desktop-break"/> For Corporate Travel</h1>
      <p>Employees book on WhatsApp or the web, policy and approvals apply on their own, and finance gets one monthly bill. Our travel desk handles the exceptions.</p>
      <div className="hero-actions"><a className="button button-primary" href="#contact-cta">Book a demo <ArrowRight size={16} aria-hidden="true"/></a><a className="button button-secondary" href="#how-cygnus-works">See how it works <ArrowRight size={16} aria-hidden="true"/></a></div>
    </section>
    {/* the card carousel sits under the copy on the same screen */}
    <div className="hero-cards">
    <div className="carousel-caption"><span/>Across Cygnus customers</div>
    <HeroCarousel activeIndex={activeCardIndex} onActiveIndexChange={setActiveCardIndex} />
    <div className="hero-foot">
      <nav className="foot-dots" aria-label="Choose card pair">
        {Array.from({ length: cards.length / 2 }, (_, index) => <button
          type="button"
          key={index}
          className={activeCardIndex / 2 === index ? 'is-active' : ''}
          aria-label={`Show card pair ${index + 1}`}
          aria-current={activeCardIndex / 2 === index ? 'step' : undefined}
          onClick={() => setActiveCardIndex(index * 2)}
        />)}
      </nav>
    </div>
    </div>
  </main>;
}
