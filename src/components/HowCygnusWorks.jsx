import { useEffect, useRef, useState } from 'react';
import { ArrowRight, BrainCircuit, CircleCheck, MessageSquareText, Network } from 'lucide-react';
import useTilt from './useTilt.js';
import LiveFeed from './LiveFeed.jsx';
import voyagerMark from '../assets/voyager-mark.svg';

const steps = [
  { key: 'request', title: 'Request', detail: 'A traveller asks on WhatsApp, email or the web app. No forms to fill in.', Icon: MessageSquareText },
  { key: 'capture', title: 'Capture', detail: 'Voyager pulls in their profile, preferences and travel policy.', Icon: BrainCircuit },
  { key: 'decide', title: 'Decide', detail: 'It picks the best in-policy option. Exceptions go for approval.', Icon: Network },
  { key: 'manage', title: 'Manage', detail: 'It books, sends the itinerary and tracks the trip until it closes.', Icon: CircleCheck },
];

export default function HowCygnusWorks() {
  const stepsRef = useRef(null);
  const [stepsIn, setStepsIn] = useState(false);
  useTilt(stepsRef, '.hcw-step', { tilt: false });

  // the step cards rise in one by one the first time the list scrolls into view
  useEffect(() => {
    const list = stepsRef.current;
    if (!list || !('IntersectionObserver' in window)) { setStepsIn(true); return undefined; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStepsIn(true); io.disconnect(); } }, { threshold: .25 });
    io.observe(list);
    return () => io.disconnect();
  }, []);
  return <section id="how-cygnus-works" className="hcw-section" aria-labelledby="hcw-title">
    <span className="hcw-eyebrow"><i/> How Cygnus Works</span>
    <div className="hcw-columns">
      <div className="hcw-intro">
        <div className="hcw-about">
          <div className="hcw-voyager">
            {/* <img className="hcw-voyager-mark" src={voyagerMark} alt=""/> */}
            <strong>Voyager</strong>
          </div>
          <p className="hcw-lead">Voyager takes the request, applies your policy and handles the booking. Your team only steps in when a decision needs them.</p>
          <p className="hcw-works-with">Works with WhatsApp, email, web app, HRMS, expense tools and travel suppliers.</p>
        </div>
        <a className="hcw-overview" href="/resources#resources-video">Watch the overview <span aria-hidden="true">▶</span></a>
      </div>
      <div className="hcw-steps">
        <h2 id="hcw-title">From travel request to finished trip,<br className="hcw-break"/> in four steps.</h2>
        <div className="hcw-flow">
        <ol ref={stepsRef} className={`hcw-step-list${stepsIn ? ' is-in' : ''}`}>
          {steps.map(({ key, title, detail, Icon }, index) => <li className={`hcw-step hcw-step-${key}`} key={key} style={{ '--i': index }}>
            <div className="hcw-step-top">
              <span className="hcw-step-icon"><Icon size={25} strokeWidth={1.8} aria-hidden="true"/></span>
              <small>0{index + 1}</small>
            </div>
            <h3>{title}</h3>
            <p>{detail}</p>
            {index < steps.length - 1 && <span className="hcw-step-arrow" aria-hidden="true"><ArrowRight size={14}/></span>}
          </li>)}
        </ol>
        <LiveFeed/>
        </div>
      </div>
    </div>
  </section>;
}
