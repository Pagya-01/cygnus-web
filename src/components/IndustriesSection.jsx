import { Building2, Factory, GraduationCap, HeartPulse, Hotel, Landmark, Plane, ShoppingBag, Stethoscope, Truck, Utensils, Workflow } from 'lucide-react';
import { useEffect, useRef } from 'react';
import useTilt from './useTilt.js';

const SCROLL_SPEED_BOOST = 10.55;
const SCROLL_IDLE_MS = 100;

const orbitIcons = [
  Factory, ShoppingBag, HeartPulse, Truck, GraduationCap, Hotel,
  Building2, Plane, Stethoscope, Landmark, Utensils, Workflow,
].map((Icon, index) => ({
  Icon,
  phase: (index / 12) * 100,
  delay: `${-index * 8}s`,
}));

const industryCards = [
  { title: 'Manufacturing', detail: 'Plant visits, vendor audits and shift travel, booked within each grade’s policy.', Icon: Factory },
  { title: 'Banking & financial services', detail: 'Client meetings and branch audits, with strict approvals and a full audit trail.', Icon: Landmark },
  { title: 'IT & technology', detail: 'Project and client-site travel at scale, billed to the right project and cost centre.', Icon: Workflow },
  { title: 'Pharma & healthcare', detail: 'Field teams moving across tier-2 and tier-3 cities, with every trip in policy.', Icon: Stethoscope },
  { title: 'Retail & FMCG', detail: 'Store visits and regional travel, with spend visible by zone and team.', Icon: ShoppingBag },
  { title: 'Logistics & supply chain', detail: 'Hub and warehouse visits at short notice, approved in minutes on WhatsApp.', Icon: Truck },
];

export default function IndustriesSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  useTilt(cardsRef, '.industry-card', { tilt: false });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const animations = [...section.querySelectorAll('.industry-orbit-icon')].flatMap(icon => icon.getAnimations());
    let rate = 1;
    let targetRate = 1;
    let previousScrollY = window.scrollY;
    let frame = 0;
    let idleTimer;

    const updateRate = () => {
      frame = 0;
      const easing = 0.14;
      rate += (targetRate - rate) * easing;
      if (Math.abs(targetRate - rate) < 0.555) rate = targetRate;
      animations.forEach(animation => { animation.playbackRate = rate; });
      if (rate !== targetRate) frame = requestAnimationFrame(updateRate);
    };
    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(updateRate);
    };
    const onScroll = () => {
      if (reducedMotion.matches) return;
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - previousScrollY;
      previousScrollY = currentScrollY;
      if (scrollDelta !== 0) targetRate = Math.sign(scrollDelta) * SCROLL_SPEED_BOOST;
      clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        targetRate = 1;
        requestUpdate();
      }, SCROLL_IDLE_MS);
      requestUpdate();
    };
    const onMotionChange = () => {
      if (!reducedMotion.matches) return;
      targetRate = 1;
      rate = 1;
      animations.forEach(animation => { animation.playbackRate = 1; });
      cancelAnimationFrame(frame);
      frame = 0;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    reducedMotion.addEventListener?.('change', onMotionChange);
    return () => {
      clearTimeout(idleTimer);
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      reducedMotion.removeEventListener?.('change', onMotionChange);
    };
  }, []);

  return <section ref={sectionRef} id="industries" className="industries-section" aria-labelledby="industries-title">
    <div className="industry-stage">
      <div className="industry-orbit-field" aria-hidden="true">
        {orbitIcons.map(({ Icon, phase, delay }, index) => <span
          className={`industry-orbit-icon orbit-outer orbit-icon-${index + 1}`}
          key={index}
          style={{ '--orbit-start': `${phase}%`, '--orbit-delay': delay, '--depth-delay': `${-index * 8 - 24}s` }}
        ><Icon strokeWidth={1.65}/></span>)}
      </div>
      <div className="industry-copy">
        <span className="industry-eyebrow"><i/> INDUSTRIES</span>
        <h2 id="industries-title">Built for how <br className="industry-desktop-break"/>your industry travels</h2>
        <p>From plant visits in manufacturing to client travel in banking, policies and approvals fit the way your teams move.</p>
      </div>
      <span className="industry-center-glow" aria-hidden="true"/>
    </div>
    <ul ref={cardsRef} className="industry-cards">
      {industryCards.map(({ title, detail, Icon }) => <li className="industry-card" key={title}>
        <span className="industry-card-icon"><Icon size={18} strokeWidth={1.65} aria-hidden="true"/></span>
        <h3>{title}</h3>
        <p>{detail}</p>
      </li>)}
    </ul>
  </section>;
}
