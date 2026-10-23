import { useState } from 'react';
import { ArrowRight, Headphones, Mail, MessageCircle } from 'lucide-react';
import ContactGlobe from './ContactGlobe.jsx';
import formDots from '../assets/contact/form-dots.svg';

// Figma: "Form / Contact with globe" (Homepage #1 → contact-form).
// On /contactus (showDemoIntro) the heading is the page title, styled like the other page heroes.
export default function ContactCta({ showDemoIntro = false }) {
  const Title = showDemoIntro ? 'h1' : 'h2';
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = [
      `Name: ${data.get('name')}`,
      `Work email: ${data.get('email')}`,
      `Company: ${data.get('company')}`,
      `Team size: ${data.get('teamSize')}`,
      `Travel process: ${data.get('travelProcess') || 'Not provided'}`,
    ].join('\n');
    window.location.href = `mailto:hello@cygnus.travel?subject=${encodeURIComponent('Cygnus demo request')}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  return <section id="contact-cta" className="contact-cta" aria-labelledby="contact-cta-title">
    <header className="contact-cta-heading">
      <span className="contact-cta-eyebrow">Book a demo</span>
      <Title id="contact-cta-title">See how your next business<br className="contact-cta-break"/> {showDemoIntro ? <span>trip could run itself</span> : 'trip could run itself'}</Title>
      <p>In 15 minutes, see how booking, approvals and billing would work for your team.</p>
    </header>

    <div className="contact-cta-grid">
      <aside className="contact-cta-touch" aria-labelledby="contact-touch-title">
        <div className="contact-cta-touch-intro">
          <h3 id="contact-touch-title">Get in touch</h3>
          <p>Reach us on any channel below. We reply within one working day.</p>
        </div>
        <ul className="contact-cta-links">
          <li><a href="mailto:contact@bookcygnus.com"><span><Mail size={14} aria-hidden="true"/></span>contact@bookcygnus.com</a></li>
          <li><a href={`https://wa.me/?text=${encodeURIComponent('Hi, I’d like to know more about Cygnus.')}`} target="_blank" rel="noreferrer"><span><MessageCircle size={14} aria-hidden="true"/></span>Chat with us on WhatsApp</a></li>
          <li><span className="contact-cta-link"><span><Headphones size={14} aria-hidden="true"/></span>24/7 travel desk support</span></li>
        </ul>
        <div className="contact-cta-globe" aria-hidden="true"><ContactGlobe/></div>
      </aside>

      <form className="contact-cta-form" onSubmit={handleSubmit}>
        <div className="contact-cta-form-head">
          <h3>Book a demo</h3>
          <p>Tell us about your team and we'll set up a 15-minute walkthrough.</p>
        </div>
        <img className="contact-cta-dots" src={formDots} alt="" aria-hidden="true"/>
        <div className="contact-cta-fields">
          <div className="contact-field">
            <label htmlFor="contact-name">Full name</label>
            <input id="contact-name" name="name" autoComplete="name" placeholder="Priya Sharma" required />
          </div>
          <div className="contact-field">
            <label htmlFor="contact-company">Company</label>
            <input id="contact-company" name="company" autoComplete="organization" placeholder="Acme Pvt Ltd" required />
          </div>
          <div className="contact-field">
            <label htmlFor="contact-email">Work email</label>
            <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@company.com" required />
          </div>
          <div className="contact-field">
            <label htmlFor="contact-team-size">Team size</label>
            <select id="contact-team-size" name="teamSize" defaultValue="" required>
              <option value="" disabled>Select a range</option>
              <option>1–10</option>
              <option>11–50</option>
              <option>51–200</option>
              <option>201–1,000</option>
              <option>1,000+</option>
            </select>
          </div>
          <div className="contact-field contact-field-wide">
            <label htmlFor="contact-process">What would you like to solve? (optional)</label>
            <textarea id="contact-process" name="travelProcess" placeholder="Tell us about your current travel process…" rows="4" />
          </div>
        </div>
        <div className="contact-cta-actions">
          <button className="contact-cta-submit" type="submit">{submitted ? 'Open your email app to finish' : 'Book my demo'} <ArrowRight size={16} aria-hidden="true"/></button>
          <p className="contact-cta-privacy">We'll only use this to contact you about Cygnus. See our <a href="mailto:hello@cygnus.travel?subject=Privacy%20Policy">Privacy Policy</a>.</p>
        </div>
      </form>
    </div>
  </section>;
}
