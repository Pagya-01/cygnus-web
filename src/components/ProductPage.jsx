import { ArrowDown, ArrowRight, ChartColumn, Check, LayoutGrid, Smartphone } from 'lucide-react';
import { useRef } from 'react';
import ClosingCard from './ClosingCard.jsx';
import useTilt from './useTilt.js';
import VoyagerEngine from './VoyagerEngine.jsx';
import sceneBookingEngine from '../assets/product/scene-booking-engine.svg';
import scenePolicyApprovals from '../assets/product/scene-policy-approvals.svg';
import sceneSpendAnalytics from '../assets/product/scene-spend-analytics.svg';
import sceneIntegrations from '../assets/product/scene-integrations.svg';
import sceneTravelDesk from '../assets/solutions/scene-travel-desk.svg';
import sceneFinanceSpend from '../assets/solutions/scene-finance-spend.svg';
import sceneTravellerWhatsapp from '../assets/solutions/scene-traveller-whatsapp.svg';

// Part ids stay as they were so header links (/product#voyager-…) keep working.
const parts = [
  { id: 'voyager-booking-engine', title: '01. Booking engine', detail: 'Compares every supplier in real time, applies your negotiated fares and confirms in one step.' },
  { id: 'voyager-automation', title: '02. Policy & approvals', detail: 'Rules by grade, team or trip value check every booking and route approvals automatically.' },
  { id: 'voyager-analytics', title: '03. Spend analytics', detail: 'Spend by team, cost centre and trip, live as bookings happen and ready to export.' },
  { id: 'voyager-integrations', title: '04. Integrations', detail: 'Syncs with your HRMS and sends invoices to Tally, SAP or Zoho, so nothing is typed twice.' },
];

// Scenes exported at 1180×700 include the window shadow; `wide` crops back to the 1120×640 window.
const scenes = [
  { key: 'travel-desk', src: sceneTravelDesk, alt: 'Travel desk dashboard with live trips and pending approvals', wide: true },
  { key: 'finance-spend', src: sceneFinanceSpend, alt: 'Spend overview with spend by team and budgets', wide: true },
  { key: 'policy-approvals', src: scenePolicyApprovals, alt: 'A trip request passing policy checks and approvals' },
  { key: 'spend-analytics', src: sceneSpendAnalytics, alt: 'Spend analytics dashboard' },
  { key: 'booking-engine', src: sceneBookingEngine, alt: 'Voyager searching airline, hotel and cab suppliers at once' },
  { key: 'integrations', src: sceneIntegrations, alt: 'Voyager kept in sync with HRMS and accounting systems' },
];

const roles = [
  {
    key: 'admins', label: 'Travel admins', Icon: LayoutGrid, href: '/solutions/travel-admins', link: 'Explore for travel admins',
    heading: 'Run every company trip from one desk',
    body: 'Requests, approvals, bookings and invoices in one place, with policy applied automatically and our travel desk on call for exceptions.',
    stats: [['60%', 'reduction in admin time'], ['100%', 'policy compliance at booking'], ['<1 wk', 'average setup time']],
    pairs: [['Drowning in booking requests', 'One booking portal'], ['Policy compliance is a constant battle', 'Policy applied at booking'], ['No real-time visibility', 'Live trip dashboard'], ['Supplier management is entirely manual', 'Negotiated rates, always applied']],
    scene: sceneTravelDesk, sceneAlt: 'Cygnus travel desk dashboard with live trips, pending approvals and agent activity',
  },
  {
    key: 'finance', label: 'Finance & CFO', Icon: ChartColumn, href: '/solutions/finance-cfo', link: 'Explore for finance & CFO',
    heading: 'See every rupee of travel spend before it’s spent',
    body: 'Live spend by team and cost centre, approvals before booking, and one reconciled monthly bill for every trip.',
    stats: [['23%', 'avg reduction in travel spend'], ['90%', 'less time on reconciliation'], ['Full', 'audit trail on every booking']],
    pairs: [['Travel spend is a black box', 'Live spend dashboards'], ['Policy violations silently drain budgets', 'Budget checks before booking'], ['Reconciliation consumes weeks', 'Automatic reconciliation'], ['No benchmark or optimization data', 'Savings reports']],
    scene: sceneFinanceSpend, sceneAlt: 'Cygnus finance dashboard showing travel spend by team, budgets and reconciled invoices',
  },
  {
    key: 'employees', label: 'Employees who travel', Icon: Smartphone, href: '/solutions/corporate-travelers', link: 'Explore for employees',
    heading: 'Work travel that’s easy to book and easy to fix',
    body: 'Book on WhatsApp in minutes, see what’s allowed before you book, skip expense forms, and reach a real person when plans change.',
    stats: [['<3 min', 'to book a full trip'], ['Zero', 'expense forms to fill'], ['24/7', 'dedicated on-trip support']],
    pairs: [['Booking is still painful', 'Book in minutes'], ['You never know what’s actually allowed', 'Know what’s allowed'], ['Expense reporting is a post-trip nightmare', 'No expense forms'], ['You’re on your own when things go wrong', 'Help day or night']],
    scene: sceneTravellerWhatsapp, sceneAlt: 'A traveller booking a trip with Voyager on WhatsApp',
  },
];

export default function ProductPage() {
  const pageRef = useRef(null);
  useTilt(pageRef, '.pv-scene, .pv-role-screen');
  return <main ref={pageRef} className="pv-page" id="top">
    <section className="pv-intro" aria-labelledby="pv-intro-title">
      <div className="pv-intro-glow" aria-hidden="true"/>
      <span className="pv-eyebrow"><i/> The Voyager platform</span>
      <h1 id="pv-intro-title">From request to invoice, <span>in one platform.</span></h1>
      <p>Voyager is the software behind Cygnus: booking, approvals, spend reports and integrations, used by your travellers, travel desk and finance team.</p>
      <a className="pv-intro-link" href="#voyager-parts">See the four parts <ArrowDown size={16} aria-hidden="true"/></a>
      <VoyagerEngine/>
    </section>

    <section className="pv-engine" id="voyager-parts" aria-label="The four parts of Voyager">
      <div className="pv-parts">
        {parts.map(({ id, title, detail }) => <div className="pv-part" id={id} key={id}>
          <h2>{title}</h2>
          <p>{detail}</p>
        </div>)}
      </div>
    </section>

    <section className="pv-scenes" aria-labelledby="pv-scenes-title">
      <header className="pv-scenes-head">
        <h2 id="pv-scenes-title">One platform for every part of company travel</h2>
        <p>Booking, approvals, spend and integrations, with a live view for your travel desk and finance team.</p>
      </header>
      <div className="pv-collage">
        {scenes.map(({ key, src, alt, wide }) => <figure className={`pv-scene pv-scene-${key}${wide ? ' is-wide' : ''}`} key={key}>
          <img src={src} alt={alt} loading="lazy" decoding="async"/>
        </figure>)}
      </div>
    </section>

    <section className="pv-roles" aria-labelledby="pv-roles-title">
      <header className="pv-roles-head">
        <span className="pv-eyebrow"><i/> Who it’s for</span>
        <h2 id="pv-roles-title">Built for everyone who touches a trip</h2>
        <p>What changes for your travel desk, your finance team and the people who travel.</p>
      </header>
      <div className="pv-role-rows">
        {roles.map(({ key, label, Icon, href, link, heading, body, stats, pairs, scene, sceneAlt }, index) => <article className={`pv-role pv-role-${key}${index % 2 ? ' is-reversed' : ''}`} key={key}>
          <div className="pv-role-copy">
            <span className="pv-role-chip"><Icon size={15} aria-hidden="true"/>{label}</span>
            <div className="pv-role-intro">
              <h3>{heading}</h3>
              <p>{body}</p>
            </div>
            <dl className="pv-role-stats">
              {stats.map(([value, caption]) => <div key={caption}><dt>{value}</dt><dd>{caption}</dd></div>)}
            </dl>
            <p className="pv-role-label">Before → With Cygnus</p>
            <ul className="pv-role-pairs">
              {pairs.map(([before, after]) => <li key={after}>
                <span className="pv-role-before"><i aria-hidden="true"/>{before}</span>
                <span className="pv-role-after"><b aria-hidden="true"><Check size={10} strokeWidth={2}/></b>{after}</span>
              </li>)}
            </ul>
            <a className="pv-role-link" href={href}>{link} <ArrowRight size={14} aria-hidden="true"/></a>
          </div>
          <div className="pv-role-screen">
            <div className="pv-role-window"><img src={scene} alt={sceneAlt} loading="lazy" decoding="async"/></div>
          </div>
        </article>)}
      </div>
    </section>

    <ClosingCard/>
  </main>;
}
