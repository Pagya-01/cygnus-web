import { Building2, Factory, GraduationCap, HeartPulse, Hotel, Landmark, Plane, ShoppingBag, Stethoscope, Truck, Utensils, Workflow } from 'lucide-react';
import { useEffect, useRef } from 'react';

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

export default function IndustriesSection() {
  const sectionRef = useRef(null);

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
  </section>;
}
