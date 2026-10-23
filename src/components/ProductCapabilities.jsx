import { ArrowRight, Check } from 'lucide-react';
import sceneBookingEngine from '../assets/product/scene-booking-engine.svg';
import scenePolicyApprovals from '../assets/product/scene-policy-approvals.svg';
import sceneSpendAnalytics from '../assets/product/scene-spend-analytics.svg';
import sceneIntegrations from '../assets/product/scene-integrations.svg';

// Section ids stay as they were so header links (/product#voyager-…) keep working.
const capabilities = [
  {
    id: 'voyager-booking-engine', number: '01', title: 'Booking engine', scene: sceneBookingEngine,
    visual: 'Voyager searching six connected airline, hotel, cab and bus suppliers at once',
    heading: 'Flights, hotels and cabs in one search',
    description: "Voyager compares fares and rates across suppliers in real time, shows what's in policy and confirms in one step.",
    points: ['Flights, hotels and ground transport in one search', 'Corporate and negotiated fares applied automatically', 'Instant confirmation and vouchers', 'Change or cancel from one place'],
  },
  {
    id: 'voyager-automation', number: '02', title: 'Policy & approvals', scene: scenePolicyApprovals,
    visual: 'A trip request passing policy checks and an approval chain',
    heading: 'Approvals and policy that run themselves',
    description: 'Set rules by grade, team or trip value. Voyager routes approvals, sends confirmations and flags exceptions, so your desk handles only what needs a person.',
    points: ['Policy checks before every booking', 'Approval routing by grade, team and trip value', 'Confirmations and reminders sent automatically', 'Itinerary updates on WhatsApp and email'],
  },
  {
    id: 'voyager-analytics', number: '03', title: 'Spend analytics', scene: sceneSpendAnalytics,
    visual: 'Spend overview dashboard with spend by team and invoices',
    heading: 'See where every rupee goes',
    description: 'Dashboards show spend by team, cost centre and trip as bookings happen, not after month-end.',
    points: ['Live spend dashboards', 'Policy compliance and savings by team', 'Reports by department, project and cost centre', 'Export to CSV and BI tools'],
  },
  {
    id: 'voyager-integrations', number: '04', title: 'Integrations', scene: sceneIntegrations,
    visual: 'Voyager kept in sync with HRMS and accounting systems',
    heading: 'Connect to the tools you already use',
    description: 'Voyager syncs traveller profiles and grades from your HRMS and sends invoices to your accounting system, so nothing is typed twice.',
    points: ['HRMS sync for profiles and grades', 'Accounting and ERP export (Tally, SAP, Zoho)', 'Notifications on WhatsApp, email and calendar', 'Open REST API and webhooks'],
  },
];

export default function ProductCapabilities() {
  return <div className="product-capabilities" aria-label="Voyager capabilities">
    {capabilities.map(({ id, number, title, scene, visual, heading, description, points }, index) => <section
      className={`product-capability${index % 2 ? ' is-reversed' : ''}`}
      id={id}
      aria-labelledby={`${id}-title`}
      key={number}
    >
      <header className="product-capability-heading">
        <span className="product-capability-kicker">{number} · {title}</span>
        <h2 id={`${id}-title`}>{heading}</h2>
      </header>
      <div className="product-capability-body">
        <div className="product-capability-visual">
          <img src={scene} alt={visual} width="560" height="380" loading="lazy" decoding="async"/>
        </div>
        <div className="product-capability-copy">
          <p>{description}</p>
          <ul>{points.map(point => <li key={point}><span className="product-capability-check"><Check size={11} strokeWidth={3} aria-hidden="true"/></span>{point}</li>)}</ul>
          <a className="product-capability-link" href="/#contact-cta">See it in a demo <ArrowRight size={16} aria-hidden="true"/></a>
        </div>
      </div>
    </section>)}
  </div>;
}
