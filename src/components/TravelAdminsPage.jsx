import { BarChart3, FileText, LayoutGrid, Shield, UsersRound, Workflow } from 'lucide-react';
import SolutionPage from './SolutionPage.jsx';
import sceneTravelDesk from '../assets/solutions/scene-travel-desk.svg';

const page = {
  key: 'travel-admins', theme: 'admins', mailSubject: 'Travel admins demo request',
  hero: {
    eyebrow: 'For travel admins',
    title: <>Run every company trip<br/> <span>from one desk</span></>,
    description: 'Requests, approvals, bookings and invoices in one place, with policy applied automatically and our travel desk on call for exceptions.',
    secondary: { label: 'See all features', href: '#travel-admin-features' },
    stats: [{ value: '60%', label: 'reduction in admin time' }, { value: '100%', label: 'policy compliance at booking' }, { value: '<1 wk', label: 'average setup time' }],
    scene: sceneTravelDesk, sceneAlt: 'Cygnus travel desk dashboard with live trips, pending approvals and agent activity',
  },
  challenges: {
    title: <>What a travel desk deals<br/> with every day</>,
    description: "When travel management runs on emails and spreadsheets, your team becomes the system — and the system doesn't scale.",
    items: [
      { title: 'Drowning in booking requests', description: 'Every trip means a flurry of emails, approvals, and back-and-forth with employees, managers, and vendors — before a single ticket is booked.' },
      { title: 'Policy compliance is a constant battle', description: 'Travellers find workarounds. Preferred vendors get ignored. You enforce policy after the fact, when the money is already spent.' },
      { title: 'No real-time visibility', description: 'You find out about itinerary changes, cancellations, and budget overruns after they happen — not while you can still act on them.' },
      { title: 'Supplier management is entirely manual', description: 'Negotiated rates live in spreadsheets. Vendor contracts require manual cross-referencing. None of it is enforced automatically.' },
    ],
  },
  features: {
    id: 'travel-admin-features',
    title: <>Built for the people who<br/> run company travel</>,
    description: 'Each feature removes a manual step from your travel desk.',
    items: [
      { title: 'One booking portal', description: 'One place for all travel requests, approvals, and bookings. No more chasing emails or switching between tools.', Icon: LayoutGrid },
      { title: 'Policy applied at booking', description: 'Policies apply at the point of booking — before confirmation, not after. No manual review, no exceptions.', Icon: Shield },
      { title: 'Approvals that route themselves', description: 'Approval workflows trigger automatically based on org structure, trip value, and travel category. Zero manual routing.', Icon: UsersRound },
      { title: 'Live trip dashboard', description: "See who's traveling, what's booked, what's pending, and what's at risk — all in real time on one screen.", Icon: BarChart3 },
      { title: 'Negotiated rates, always applied', description: 'Upload preferred vendor rates and contracts. Cygnus auto-applies them at the point of booking — always, not sometimes.', Icon: FileText },
      { title: 'Invoices that reconcile themselves', description: 'Invoices are generated, matched, and pushed to finance automatically. Reconciliation happens without you.', Icon: Workflow },
    ],
  },
  demo: {
    id: 'travel-admin-demo', eyebrow: 'Travel admins',
    title: 'Give your travel desk its time back',
    description: 'In 15 minutes, see how requests, approvals and invoices would run for your team.',
  },
};

export default function TravelAdminsPage() {
  return <SolutionPage page={page}/>;
}
