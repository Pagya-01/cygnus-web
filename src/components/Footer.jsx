import { Linkedin } from 'lucide-react';
import BrandLogo from './BrandLogo';

const linkColumns = [
  {
    key: 'product',
    title: 'Product',
    links: [
      { label: 'Voyager', href: '/product' },
      { label: 'AI agents', href: '/agents' },
      { label: 'Integrations', href: '/product#voyager-integrations' },
      { label: 'Industries', href: '/#industries' },
    ],
  },
  {
    key: 'built-for',
    title: 'Built for',
    links: [
      { label: 'Travel admins', href: '/solutions/travel-admins' },
      { label: 'Finance & CFO', href: '/solutions/finance-cfo' },
      { label: 'Employees who travel', href: '/solutions/corporate-travelers' },
    ],
  },
  {
    key: 'company',
    title: 'Contact us',
    links: [
      { label: 'Careers', href: '/careers' },
      { label: 'Contact us', href: '/contactus' },
    ],
  },
  {
    key: 'legal',
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#privacy-policy' },
      { label: 'Terms of Service', href: '#terms-of-service' },
      { label: 'Security', href: '#security' },
    ],
  },
];

function XMark() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.9 2H22l-6.78 7.75L23.2 22h-6.25l-4.9-7.43L5.55 22H2.4l7.25-8.29L1.8 2h6.4l4.43 6.77L18.9 2Zm-1.1 18h1.74L7.26 3.88H5.4L17.8 20Z"/></svg>;
}

export default function Footer() {
  const isSolutionPage = ['/solutions/travel-admins', '/solutions/finance-cfo', '/solutions/corporate-travelers'].includes(window.location.pathname.replace(/\/$/, ''));
  return <footer className={`site-footer${isSolutionPage ? ' travel-admins-footer' : ''}`}>
    <div className="footer-inner">
      {/* <section className="footer-cta" aria-label="Book a demo">
        <p>Ready to see Cygnus in action?</p>
        <a className="footer-cta-button" href="#contact-cta">Book Demo</a>
      </section> */}

      <div className="footer-main">
        <div className="footer-brand">
          <a className="footer-brand-logo" href="#top" aria-label="Cygnus AI home"><BrandLogo /></a>
          <p>Corporate travel, booked, approved and billed in one place.</p>
          {/* <a className="footer-email" href="mailto:contact@bookcygnus.com">contact@bookcygnus.com</a> */}
        </div>

        {linkColumns.map((column) => <nav className={`footer-col footer-col-${column.key}`} aria-label={column.title} key={column.key}>
          <h2>{column.title}</h2>
          <ul>{column.links.map((link) => <li key={link.label}><a href={link.href}>{link.label}</a></li>)}</ul>
        </nav>)}
      </div>

      <div className="footer-bottom">
        <p>© 2026 Cygnus. All rights reserved.  </p>
        <nav className="footer-socials" aria-label="Social media">
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={16} strokeWidth={2}/></a>
          <a href="https://x.com/" target="_blank" rel="noreferrer" aria-label="X"><XMark /></a>
        </nav>
      </div>
    </div>
  </footer>;
}
