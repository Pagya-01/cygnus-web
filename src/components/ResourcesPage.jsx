import { useEffect, useRef, useState } from 'react';
import { ArrowDownRight, ArrowRight, Check, CircleHelp, ReceiptText, ShieldCheck, Sparkles } from 'lucide-react';
import useTilt from './useTilt.js';

const expenseSteps = [
  { number: '01', title: 'Capture every expense', text: 'Bring travel spend into one clear view, with trip context attached from the start.', Icon: ReceiptText },
  { number: '02', title: 'Apply policy as you go', text: 'Check bookings against the right rules before costs become exceptions.', Icon: ShieldCheck },
  { number: '03', title: 'Route what needs review', text: 'Send out-of-policy items to the right person with the details they need to decide.', Icon: ArrowRight },
  { number: '04', title: 'Keep teams in control', text: 'Track approvals, spend, and trip changes together from one connected workspace.', Icon: Sparkles },
];

const policyFeatures = [
  'Set limits by team, destination, or travel type',
  'Give travellers clear guidance before they book',
  'Escalate exceptions with context and a decision trail',
];

const blogArticles = [
  {
    initials: 'TP', category: 'Anonymous',
    title: 'A better way to build a business travel policy',
    summary: 'Create clear guidance that gives employees flexibility while keeping every trip aligned. Start with the needs of your teams, set expectations that are easy to understand, and make room for exceptions without losing visibility.',
  },
  {
    initials: 'EM', category: 'Anonymous',
    title: 'Bring travel spend into the same conversation',
    summary: 'Connect booking and expense context to make reviews faster and decisions more useful.',
  },
  {
    initials: 'TO', category: 'Anonymous',
    title: 'Turn every trip into a clearer view of your program',
    summary: 'Use connected travel data to spot patterns, guide teams, and plan with confidence. A shared view of bookings and spend helps teams understand where friction appears and where a small change can improve the journey.',
  },
  {
    initials: 'BI', category: 'Anonymous',
    title: 'What connected travel data can tell you',
    summary: 'Look beyond individual bookings to understand traveler needs, cost patterns, and the decisions that shape your program.',
  },
  {
    initials: 'TX', category: 'Anonymous',
    title: 'Make the journey easier for every traveler',
    summary: 'A thoughtful travel experience gives people useful information at the right time, from the first search to the return home.',
  },
  {
    initials: 'FC', category: 'Anonymous',
    title: 'Keep policy and flexibility in balance',
    summary: 'Build guardrails around the decisions that matter, then give travelers room to choose what works within them.',
  },
];

const faqs = [
  { question: 'How does Cygnus help manage travel expenses?', answer: 'Cygnus brings trip costs and expense details into one clear view. Replace this with your final expense management information.' },
  { question: 'Can we set different travel policies for different teams?', answer: 'Set policy rules to fit the way each team travels. Add details about your policy options here.' },
  { question: 'What happens when a booking falls outside policy?', answer: 'Out-of-policy choices can be flagged and sent for review. Add your approval workflow details here.' },
  { question: 'Do travellers see policy guidance before they book?', answer: 'Travelers can see relevant guidance during the booking process. Replace this with details about when policy checks appear.' },
  { question: 'Can finance and travel teams see the same information?', answer: 'Teams can work from a shared view of travel and spend. Add details about your reporting and integrations here.' },
];

export default function ResourcesPage() {
  const pageRef = useRef(null);
  useTilt(pageRef, '.resources-expense-step, .resources-policy-card, .resources-blog-card', { tilt: false });
  const [activeFaq, setActiveFaq] = useState(null);
  const [supportsHover, setSupportsHover] = useState(() => window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  const hoverTimer = useRef(null);
  const pointerItem = useRef(null);
  const expenseSectionRef = useRef(null);

  useEffect(() => {
    const section = expenseSectionRef.current;
    const cards = section?.querySelectorAll('.resources-expense-step, .resources-policy-card');
    if (!section || !cards?.length) return undefined;
    if (!('IntersectionObserver' in window)) {
      cards.forEach(card => card.classList.add('is-in-view'));
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      cards.forEach(card => card.classList.add('is-in-view'));
      observer.unobserve(section);
    }, { threshold: 0.12 });

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const hoverQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const onHoverChange = (event) => setSupportsHover(event.matches);
    hoverQuery.addEventListener?.('change', onHoverChange);
    return () => {
      hoverQuery.removeEventListener?.('change', onHoverChange);
      window.clearTimeout(hoverTimer.current);
    };
  }, []);

  const enterFaq = (index) => {
    if (!supportsHover) return;
    pointerItem.current = index;
    window.clearTimeout(hoverTimer.current);
    const delay = parseFloat(window.getComputedStyle(document.documentElement).getPropertyValue('--faq-hover-delay')) || 80;
    hoverTimer.current = window.setTimeout(() => setActiveFaq(index), delay);
  };
  const leaveFaq = (index) => {
    if (!supportsHover) return;
    pointerItem.current = null;
    window.clearTimeout(hoverTimer.current);
    const delay = parseFloat(window.getComputedStyle(document.documentElement).getPropertyValue('--faq-hover-delay')) || 80;
    hoverTimer.current = window.setTimeout(() => {
      const focusedButton = document.activeElement?.closest('.resources-faq-question');
      if (activeFaq === index && !focusedButton?.matches(':focus-visible')) setActiveFaq(null);
    }, delay);
  };
  const focusFaq = (index) => {
    window.clearTimeout(hoverTimer.current);
    if (document.activeElement?.matches(':focus-visible')) setActiveFaq(index);
  };
  const blurFaq = (index, event) => {
    if (event.currentTarget.contains(event.relatedTarget) || pointerItem.current === index) return;
    if (activeFaq === index) setActiveFaq(null);
  };
  const handleFaqKeyDown = (index, event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      window.clearTimeout(hoverTimer.current);
      setActiveFaq(null);
      event.currentTarget.blur();
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      window.clearTimeout(hoverTimer.current);
      setActiveFaq(current => current === index ? null : index);
    }
  };
  const toggleFaq = (index) => setActiveFaq(current => current === index ? null : index);

  return <main ref={pageRef} className="resources-page" id="top">
    <div className="resources-shell">
      <section className="resources-intro" aria-labelledby="resources-title">
        <span className="resources-kicker"><i/> Resources</span>
        <h1 id="resources-title">Guides for running<br/> <span>company travel well.</span></h1>
        <p>Product tours, policy templates and answers for travel, HR and finance teams.</p>
        <a className="resources-scroll-link" href="#resources-video">Explore resources <ArrowDownRight size={16}/></a>
      </section>

      <section className="resources-video-section" id="resources-video" aria-labelledby="resources-video-title">
        <div className="resources-section-heading">
          <div><span className="resources-kicker"> VIDEO</span>
              <h2 id="resources-video-title">See Cygnus<br/> in one minutes.</h2>
              <p>A short tour from a WhatsApp request to a booked, approved and billed trip.</p>
          </div>
        </div>
        <div className="resources-video-frame">
          <video className="resources-video-player" controls playsInline preload="metadata" poster="/cygnus-resources-poster.jpg" aria-label="Cygnus platform overview">
            <source src="/cygnus-resources-overview.mp4" type="video/mp4"/>
            Your browser does not support MP4 video playback.
          </video>
        </div>
      </section>

      <section className="resources-expenses-section" id="expense-policies" aria-labelledby="expense-policies-title" ref={expenseSectionRef}>
        <div className="resources-section-heading resources-section-heading-split">
          <div><span className="resources-kicker"> EXPENSES &amp; POLICIES</span>
                <h2 id="expense-policies-title">Every expense<br/> tied to its trip.</h2>
          </div>
          <p>Give travellers flexibility, give approvers clarity, and keep every decision connected to the journey.</p>
        </div>
        <div className="resources-expense-grid">
          <div className="resources-expense-steps">
            {expenseSteps.map(({ number, title, text, Icon }, index) => <article className="resources-expense-step" style={{ '--resources-card-index': index }} key={number}>
              <span className="resources-step-number">{number}</span><span className="resources-step-icon"><Icon size={18}/></span>
              <h3>{title}</h3><p>{text}</p>
            </article>)}
          </div>
          <aside className="resources-policy-card" style={{ '--resources-card-index': expenseSteps.length }}>
            <span className="resources-policy-icon"><ShieldCheck size={20}/></span>
            <span className="resources-kicker">POLICY, BUILT INTO THE FLOW</span>
            <h3>Policy checks happen<br/> before booking.</h3>
            <p>Make policy part of the travel experience, so teams can act early and handle exceptions with confidence.</p>
            <ul>{policyFeatures.map(item => <li key={item}><Check size={15}/>{item}</li>)}</ul>
          </aside>
        </div>
      </section>

      <section className="resources-blog-section" id="resources-blog" aria-labelledby="resources-blog-title">
        <div className="resources-blog-heading">
          <div>
            <span className="resources-kicker"><i/> Blogs </span>
            <h2 id="resources-blog-title">What Our Clients say </h2>
          </div>
          {/* <p>Practical perspectives on travel programs, expense management, and the work behind every journey.</p> */}
        </div>
        <div className="resources-blog-grid">
          {blogArticles.map(({ initials, category, title, summary }) => <article className="resources-blog-card" key={title}>
            <div className="resources-blog-copy">
              <div className="resources-blog-meta"><span className="resources-blog-avatar" aria-hidden="true">{initials}</span><span className="resources-blog-category">{category}</span></div>
              <h3>{title}</h3>
              <div className="resources-blog-rating" role="img" aria-label="5 out of 4 stars">★★★★★</div>
              <p>{summary}</p>
            </div>
          </article>)}
        </div>
      </section>

      <section className="resources-faq-section" id="faqs" aria-labelledby="resources-faq-title">
        <div className="resources-faq-intro">
          <span className="resources-kicker">FAQS</span>
          <h2 id="resources-faq-title">Questions,<br className="resources-faq-break"/> answered.</h2>
          <p>More about managing business travel with Cygnus.</p>
          <span className="resources-faq-icon"><CircleHelp size={24}/></span>
        </div>
        <div className="resources-faq-list">
          {faqs.map(({ question, answer }, index) => {
            const questionId = `resource-faq-question-${index + 1}`;
            const answerId = `resource-faq-answer-${index + 1}`;
            const isOpen = activeFaq === index;
            return <article
              className={`resources-faq-item${isOpen ? ' is-open' : ''}`}
              key={question}
              onMouseEnter={() => enterFaq(index)}
              onMouseLeave={() => leaveFaq(index)}
              onBlur={(event) => blurFaq(index, event)}
            >
              <h3 className="resources-faq-question-wrap">
                <button className="resources-faq-question" id={questionId} type="button" aria-expanded={isOpen} aria-controls={answerId}
                  onFocus={() => focusFaq(index)} onKeyDown={(event) => handleFaqKeyDown(index, event)}
                  onClick={(event) => { if (!supportsHover || event.detail === 0) toggleFaq(index); }}>
                  <span>{question}</span><i aria-hidden="true"/>
                </button>
              </h3>
              <div className="resources-faq-answer" id={answerId} role="region" aria-labelledby={questionId} aria-hidden={!isOpen}>
                <div className="resources-faq-answer-inner"><p>{answer}</p></div>
              </div>
            </article>;
          })}
        </div>
      </section>
    </div>
  </main>;
}
