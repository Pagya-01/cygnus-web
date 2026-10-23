import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import HeroCarousel from './HeroCarousel.jsx';

export default function Hero() {
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  return <main className="hero" id="top">
    <div className="sky-glow" aria-hidden="true"/><div className="cloud-bank cloud-left" aria-hidden="true"/><div className="cloud-bank cloud-right" aria-hidden="true"/><div className="horizon-haze" aria-hidden="true"/>
    <section className="hero-copy" aria-labelledby="hero-title">
      <div className="eyebrow"><span className="eyebrow-mark"/>AI-Native Corporate Travel</div>
      <h1 id="hero-title">The Operating System<br className="desktop-break"/> For Corporate Travel</h1>
      <p>Employees book on WhatsApp or the web, policy and approvals apply on their own, and finance gets one monthly bill. Our travel desk handles the exceptions.</p>
      <div className="hero-actions"><a className="button button-primary" href="#contact-cta">Book a demo <ArrowRight size={16} aria-hidden="true"/></a><a className="button button-secondary" href="#how-cygnus-works">See how it works <ArrowRight size={16} aria-hidden="true"/></a></div>
    </section>
    <div className="carousel-caption"><span/>Across Cygnus customers</div>
    <HeroCarousel activeIndex={activeCardIndex} onActiveIndexChange={setActiveCardIndex} />
    <div className="hero-foot">
      <nav className="foot-dots" aria-label="Choose card pair">
        {Array.from({ length: 5 }, (_, index) => <button
          type="button"
          key={index}
          className={activeCardIndex / 2 === index ? 'is-active' : ''}
          aria-label={`Show card pair ${index + 1}`}
          aria-current={activeCardIndex / 2 === index ? 'step' : undefined}
          onClick={() => setActiveCardIndex(index * 2)}
        />)}
      </nav>
    </div>
  </main>;
}
