import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

// Shared layout for the three Solutions pages (Figma: Travel Admins, Finance & CFO, Employees who travel).
export default function SolutionPage({ page }) {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = [`Name: ${data.get('name')}`, `Work email: ${data.get('email')}`, `Company: ${data.get('company')}`, `Team size: ${data.get('teamSize')}`, `Travel process: ${data.get('travelProcess') || 'Not provided'}`].join('\n');
    window.location.href = `mailto:hello@cygnus.travel?subject=${encodeURIComponent(page.mailSubject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  const { hero, challenges, features, demo } = page;

  return <main className={`solution-page solution-${page.theme}`} id="top">
    <section className="solution-hero" aria-labelledby={`${page.key}-title`}>
      <div className="solution-hero-copy">
        <span className="solution-eyebrow">{hero.eyebrow}</span>
        <h1 id={`${page.key}-title`}>{hero.title}</h1>
        <p>{hero.description}</p>
        <div className="solution-actions">
          <a className="solution-button solution-button-primary" href={`#${demo.id}`}>Book a demo <ArrowRight size={16} aria-hidden="true"/></a>
          <a className="solution-button solution-button-secondary" href={hero.secondary.href}>{hero.secondary.label}</a>
        </div>
      </div>
      <div className="solution-stats">{hero.stats.map(({ value, label }) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
      <div className="solution-showcase"><img src={hero.scene} alt={hero.sceneAlt} width="1180" height="700" decoding="async"/></div>
    </section>

    <section className="solution-challenges" aria-labelledby={`${page.key}-challenges-title`}>
      <div className="solution-intro">
        <span className="solution-eyebrow">The Challenge</span>
        <h2 id={`${page.key}-challenges-title`}>{challenges.title}</h2>
        <p>{challenges.description}</p>
      </div>
      <div className="solution-challenge-grid">{challenges.items.map(item => <article className="solution-challenge" key={item.title}><h3>{item.title}</h3><p>{item.description}</p></article>)}</div>
    </section>

    <section className="solution-features" id={features.id} aria-labelledby={`${page.key}-features-title`}>
      <div className="solution-intro">
        <span className="solution-eyebrow">How Cygnus Helps</span>
        <h2 id={`${page.key}-features-title`}>{features.title}</h2>
        <p>{features.description}</p>
      </div>
      <div className="solution-feature-grid">{features.items.map(({ title, description, Icon }) => <article className="solution-feature" key={title}><span className="solution-feature-icon"><Icon size={18} aria-hidden="true"/></span><h3>{title}</h3><p>{description}</p></article>)}</div>
    </section>

    <section className="solution-demo" id={demo.id} aria-labelledby={`${page.key}-demo-title`}>
      <div className="solution-demo-inner">
        <div className="solution-demo-intro">
          <span className="solution-eyebrow">{demo.eyebrow}</span>
          <h2 id={`${page.key}-demo-title`}>{demo.title}</h2>
          <p>{demo.description}</p>
        </div>
        <form className="solution-form" onSubmit={handleSubmit}>
          <div className="solution-form-grid">
            <label>Full name<input name="name" placeholder="Priya Sharma" autoComplete="name" required/></label>
            <label>Work email<input name="email" type="email" placeholder="you@company.com" autoComplete="email" required/></label>
            <label>Company<input name="company" placeholder="Acme Pvt Ltd" autoComplete="organization" required/></label>
            <label>Team size<select name="teamSize" defaultValue="" required><option value="" disabled>Select a range</option><option>1–10</option><option>11–50</option><option>51–200</option><option>201–1,000</option><option>1,000+</option></select></label>
            <label className="solution-form-wide"><span>What would you like to solve? <small>(optional)</small></span><textarea name="travelProcess" placeholder="Tell us about your current travel process..." rows="3"/></label>
          </div>
          <button type="submit">{submitted ? 'Open your email app to finish' : 'Book my demo'} <ArrowRight size={16} aria-hidden="true"/></button>
          <small className="solution-privacy">We'll only use this to contact you about Cygnus. See our <a href="mailto:hello@cygnus.travel?subject=Privacy%20Policy">Privacy Policy</a>.</small>
          <div className="solution-assurances"><span><Check size={13}/> 15-minute demo</span><span><Check size={13}/> No obligation</span><span><Check size={13}/> Setup in days</span></div>
        </form>
      </div>
    </section>
  </main>;
}
