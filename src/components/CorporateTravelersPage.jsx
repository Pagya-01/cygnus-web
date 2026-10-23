import { CreditCard, Headphones, Search, Shield, Smartphone, TrendingUp } from 'lucide-react';
import SolutionPage from './SolutionPage.jsx';
import sceneTravellerWhatsapp from '../assets/solutions/scene-traveller-whatsapp.svg';

const shareHref = `mailto:?subject=${encodeURIComponent('Cygnus for our work travel')}&body=${encodeURIComponent('Have a look at Cygnus for booking our work trips: https://www.bookcygnus.com/solutions/corporate-travelers')}`;

const page = {
  key: 'corporate-travelers', theme: 'employees', mailSubject: 'Corporate travelers demo request',
  hero: {
    eyebrow: 'For employees who travel',
    title: <>Work travel that's easy to book and <span>easy to fix</span></>,
    description: 'Book on WhatsApp in minutes, see what\'s allowed before you book, skip expense forms, and reach a real person when plans change.',
    secondary: { label: 'Share with your travel team', href: shareHref },
    stats: [{ value: '<3 min', label: 'to book a full trip' }, { value: 'Zero', label: 'expense forms to fill' }, { value: '24/7', label: 'dedicated on-trip support' }],
    scene: sceneTravellerWhatsapp, sceneAlt: 'A traveller booking a trip with Voyager on WhatsApp',
  },
  challenges: {
    title: <>Why employees dread<br/> booking work trips</>,
    description: 'Corporate travel tools are built for admins and finance teams. The people actually traveling are an afterthought. Cygnus changes that.',
    items: [
      { title: 'Booking is still painful', description: 'Navigating corporate portals, seeking manager approvals, and cross-referencing policy rules turns a 5-minute task into an hour-long ordeal.' },
      { title: "You never know what's actually allowed", description: "Policy documents are long and vague. You guess, book, and find out you're out of policy only after the trip is submitted for reimbursement." },
      { title: 'Expense reporting is a post-trip nightmare', description: 'Collecting receipts, filling forms, waiting weeks for reimbursements — the admin burden after every trip is almost worse than the trip itself.' },
      { title: "You're on your own when things go wrong", description: "Flight cancelled. Hotel overbooked. There's no corporate support line, just a personal credit card and a prayer that finance reimburses you." },
    ],
  },
  features: {
    id: 'traveler-features',
    title: 'Built around the person travelling',
    description: "Everything designed to make your next business trip the easiest one you've ever taken.",
    items: [
      { title: 'Book in minutes', description: 'Flights, hotels, and ground transport in one place with corporate pricing. No portals, no external sites, no juggling.', Icon: Search },
      { title: "Know what's allowed", description: 'See exactly what you can book before you book it. Green means go. No surprises, no rejections, no awkward conversations with finance.', Icon: Shield },
      { title: 'No expense forms', description: 'Your itinerary, receipts, and card transactions are matched and submitted automatically. Just travel — Cygnus handles the paperwork.', Icon: CreditCard },
      { title: 'Help day or night', description: 'A dedicated support line for last-minute changes, cancellations, and on-trip issues. Someone always has your back.', Icon: Headphones },
      { title: 'Everything on your phone', description: 'Manage your complete itinerary, get real-time updates, and access support from your phone. No laptop required.', Icon: Smartphone },
      { title: 'Reimbursed in days', description: 'Expense claims process automatically and reimburse in days, not weeks. No chasing finance, no follow-up emails.', Icon: TrendingUp },
    ],
  },
  demo: {
    id: 'traveler-demo', eyebrow: 'Employees who travel',
    title: "Business travel shouldn't feel like work",
    description: 'See how Cygnus makes every trip faster, simpler, and less stressful — for the people doing the traveling.',
  },
};

export default function CorporateTravelersPage() {
  return <SolutionPage page={page}/>;
}
