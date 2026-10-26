import { useEffect, useState } from 'react';
import { ArrowRight, BookOpen, Bot, Building2, ChartBar, ChevronDown, CircleHelp, DollarSign, Grid2X2, Menu, Phone, PlayCircle, Plug, Settings, Sparkles, Workflow } from 'lucide-react';
import BrandLogo from './BrandLogo';

const menuContent = {
  product: {
    label: 'PRODUCT',
    items: [
      { title: 'Booking', description: 'Flights, hotels and cabs in one search.', href: '/product#voyager-booking-engine', Icon: PlayCircle },
      { title: 'Policy & approvals', description: 'Rules and sign-offs that run before anyone books.', href: '/product#voyager-automation', Icon: Settings },
      { title: 'Spend analytics', description: 'Live spend by team, trip and cost centre.', href: '/product#voyager-analytics', Icon: ChartBar },
      { title: 'Integrations', description: 'Works with your HRMS, accounting and ERP.', href: '/product#voyager-integrations', Icon: Plug },
    ],
  },
  solutions: {
    label: 'BUILT FOR',
    items: [
      { title: 'Travel admins', description: 'Run every trip from one desk, without email chains.', href: '/solutions/travel-admins', Icon: Grid2X2 },
      { title: 'Finance & CFO', description: 'See and control travel spend before it happens.', href: '/solutions/finance-cfo', Icon: DollarSign },
      { title: 'Employees who travel', description: 'Book on WhatsApp in minutes. No expense forms.', href: '/solutions/corporate-travelers', Icon: Phone },
    ],
  },
  resources: {
    label: 'LEARN',
    items: [
      { title: 'Product tour', description: 'A 2-minute walkthrough of Voyager.', href: '/resources#resources-video', Icon: PlayCircle },
      { title: 'Policy & expense guide', description: 'How to set travel rules people actually follow.', href: '/resources#expense-policies', Icon: BookOpen },
      { title: 'FAQs', description: 'Setup, security, billing and support.', href: '/resources#faqs', Icon: CircleHelp },
    ],
  },
  contact: {
    label: 'CONNECT',
    items: [
      { title: 'Contact', description: 'Talk with our team about Cygnus.', href: '/contactus', Icon: Sparkles },
      { title: 'Careers', description: 'Join the team building Cygnus.', href: '/careers', Icon: Building2 },
    ],
  },
};

function NavDropdown({ menuKeys, title, openMenu, setOpenMenu, isCurrent = false }) {
  const menuKey = menuKeys[0];
  const open = openMenu === menuKey;
  return <div className={`nav-dropdown${open ? ' is-open' : ''}`} onMouseEnter={() => setOpenMenu(menuKey)} onMouseLeave={() => setOpenMenu(null)}>
    <button className="nav-trigger" type="button" aria-haspopup="true" aria-expanded={open} aria-current={isCurrent ? 'page' : undefined} onFocus={() => setOpenMenu(menuKey)} onClick={() => setOpenMenu(menuKey)}>
      {title}<ChevronDown size={13} aria-hidden="true"/>
    </button>
    <div className={`nav-dropdown-panel${menuKeys.length > 1 ? ' nav-dropdown-panel-columns' : ''}`} aria-label={`${title} navigation`}>
      {menuKeys.map(key => {
        const { label, items } = menuContent[key];
        return <div className={`nav-dropdown-group nav-dropdown-group-${key}`} key={key}>
          <span className="nav-dropdown-kicker">{label}</span>
          <div className="nav-dropdown-items">
            {items.map(({ title: itemTitle, description, href, Icon }) => <a className="nav-dropdown-item" href={href} key={itemTitle} onClick={() => setOpenMenu(null)}>
              <span className="nav-dropdown-icon"><Icon size={17} strokeWidth={1.8}/></span>
              <span className="nav-dropdown-copy"><strong>{itemTitle}</strong><small>{description}</small></span>
            </a>)}
          </div>
        </div>;
      })}
    </div>
  </div>;
}

export default function Header({ isResources = false, isProduct = false, isAgents = false, isContactUs = false, isCareers = false, isTravelAdmins = false, isFinanceCfo = false, isCorporateTravelers = false }) {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  // Transparent over the top of the page; gets a frosted background once the page scrolls.
  const [scrolled, setScrolled] = useState(() => window.scrollY > 8);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const homeHref = isResources || isProduct || isAgents || isContactUs || isCareers || isTravelAdmins || isFinanceCfo || isCorporateTravelers ? '/#top' : '#top';
  const demoHref = isContactUs || isCareers ? '/contactus#contact-cta' : isTravelAdmins ? '#travel-admin-demo' : isFinanceCfo ? '#finance-demo' : isCorporateTravelers ? '#traveler-demo' : isResources || isProduct || isAgents ? '/#contact-cta' : '#contact-cta';

  return <header className={`header${scrolled || mobileOpen ? ' is-scrolled' : ''}`}>
    <a className="brand" href={homeHref} aria-label="Cygnus home"><BrandLogo /></a>
    <nav className={`nav${mobileOpen ? ' is-mobile-open' : ''}`} aria-label="Main navigation" onKeyDown={(event) => { if (event.key === 'Escape') { setOpenMenu(null); event.currentTarget.querySelector('.nav-trigger:focus')?.blur(); } }} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpenMenu(null); }} onClick={(event) => { if (event.target.closest('a')) setMobileOpen(false); }}>
      <NavDropdown menuKeys={['product', 'solutions']} title="Product" openMenu={openMenu} setOpenMenu={setOpenMenu} isCurrent={isProduct || isTravelAdmins || isFinanceCfo || isCorporateTravelers}/>
      <a href="/agents" aria-current={isAgents ? 'page' : undefined}>AI Agents</a>
      <NavDropdown menuKeys={['resources']} title="Resources" openMenu={openMenu} setOpenMenu={setOpenMenu} isCurrent={isResources}/>
      <NavDropdown menuKeys={['contact']} title="Contact us" openMenu={openMenu} setOpenMenu={setOpenMenu} isCurrent={isContactUs || isCareers}/>
    </nav>
    <a className="header-demo" href={demoHref}>Book a demo <span aria-hidden="true"><ArrowRight size={16}/></span></a>
    <button className="menu-button" type="button" aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}><Menu size={21}/></button>
  </header>;
}
