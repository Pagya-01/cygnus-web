import { BarChart3, Clock3, FileText, LayoutGrid, Search, Workflow } from 'lucide-react';
import SolutionPage from './SolutionPage.jsx';
import sceneFinanceSpend from '../assets/solutions/scene-finance-spend.svg';

const page = {
  key: 'finance-cfo', theme: 'finance', mailSubject: 'Finance demo request',
  hero: {
    eyebrow: 'For finance and CFOs',
    title: <><span>See every rupee of travel<br/> spend </span>before it's spent</>,
    description: 'Live spend by team and cost centre, approvals before booking, and one reconciled monthly bill for every trip.',
    secondary: { label: 'See all features', href: '#finance-features' },
    stats: [{ value: '23%', label: 'avg reduction in travel spend' }, { value: '90%', label: 'less time on reconciliation' }, { value: 'Full', label: 'audit trail on every booking' }],
    scene: sceneFinanceSpend, sceneAlt: 'Cygnus finance dashboard showing travel spend by team, budgets and reconciled invoices',
  },
  challenges: {
    title: <>Travel spend you only see<br/> after it's gone</>,
    description: "Most companies don't have a travel spend problem. They have a travel visibility problem. Cygnus fixes the visibility first.",
    items: [
      { title: 'Travel spend is a black box', description: 'You see the cost after trips happen — in expense reports, not dashboards. By the time you review it, the money is gone.' },
      { title: 'Policy violations silently drain budgets', description: 'Employees book outside policy. The overrun compounds. Finance absorbs the cost without a clear audit trail or root cause.' },
      { title: 'Reconciliation consumes weeks', description: "Your team manually matches invoices, receipts, and card statements every month. It's error-prone, slow, and adds zero value." },
      { title: 'No benchmark or optimization data', description: "You can see what was spent. You can't see what should have been spent, where money leaked, or how to negotiate better." },
    ],
  },
  features: {
    id: 'finance-features',
    title: 'Controls finance can rely on',
    description: 'A spend management system for travel, not just a booking tool.',
    items: [
      { title: 'Live spend dashboards', description: 'Track travel spend by team, department, project, cost center, and geography — as bookings happen, not after the month closes.', Icon: BarChart3 },
      { title: 'Budget checks before booking', description: 'Trips above threshold trigger approval workflows before booking confirmation. Overruns are caught before they happen.', Icon: Clock3 },
      { title: 'Automatic reconciliation', description: 'Invoices, corporate card transactions, and receipts are matched automatically. Close the books faster, with fewer errors.', Icon: Workflow },
      { title: 'ERP and accounting sync', description: 'Push data directly to Tally, SAP, Oracle, or your ERP via open API. No double entry, no sync delays.', Icon: LayoutGrid },
      { title: 'Savings reports', description: 'Identify top spend categories, preferred vendor compliance rates, and savings opportunities — with actionable recommendations.', Icon: Search },
      { title: 'Audit-ready records', description: 'Every booking, approval, and expense is logged with a full audit trail. Compliance and audit prep takes minutes, not days.', Icon: FileText },
    ],
  },
  demo: {
    id: 'finance-demo', eyebrow: 'Finance & CFO',
    title: 'Close the month without chasing travel bills',
    description: 'Get real-time visibility, automated controls, and finance-grade reporting in one platform.',
  },
};

export default function FinanceCfoPage() {
  return <SolutionPage page={page}/>;
}
