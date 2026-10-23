import { ArrowRight } from 'lucide-react';
import closingGlobe from '../assets/closing-globe.svg';

export default function ClosingCard({
  heading = 'See Voyager run your company’s travel',
  body = 'A 15-minute walkthrough, set up around your travel policy.',
  primary = { label: 'Book a demo', href: '/#contact-cta' },
  secondary = { label: 'Watch the overview', href: '/resources#resources-video' },
}) {
  return <section className="closing-card-section" aria-labelledby="closing-card-title">
    <div className="closing-card">
      <img className="closing-card-globe" src={closingGlobe} alt="" width="836" height="360"/>
      <div className="closing-card-copy">
        <h2 id="closing-card-title">{heading}</h2>
        <p>{body}</p>
      </div>
      <div className="closing-card-buttons">
        <a className="closing-card-primary" href={primary.href}>{primary.label} <ArrowRight size={16} aria-hidden="true"/></a>
        <a className="closing-card-secondary" href={secondary.href}>{secondary.label}</a>
      </div>
    </div>
  </section>;
}
