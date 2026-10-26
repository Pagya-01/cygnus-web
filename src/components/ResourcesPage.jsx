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

const faqs = [
  { question: 'What does the Cygnus AI agent do, and when does a person step in?', answer: 'The agent does the routine work: it finds options, checks them against your policy, books, sends tickets, chases approvers and rebooks when plans change. It also remembers each traveller’s preferences, like a window seat or a favourite hotel. Anything unusual, such as a visa problem, a large group trip or an urgent change, goes to our travel desk, who see the full history and take it from there.' },
  { question: 'How do employees book on WhatsApp?', answer: 'They message Cygnus the way they’d message a colleague, for example “Mumbai to Bengaluru, Thursday morning, back Friday.” The agent replies with options that fit your policy, books the one they pick, and sends the ticket and hotel voucher in the same chat. Employees who prefer the web can book there instead.' },
  { question: 'How does Cygnus make sure bookings follow our travel policy?', answer: 'You set your policy once: fare limits, hotel caps, cabin class and how far ahead to book, with different rules for different grades or departments if you need them. Every option is checked against it before the employee sees it. Trips within policy go straight through, and anything outside goes to the right approver with the reason shown.' },
  { question: 'My flight was cancelled late at night. What happens now?', answer: 'You don’t need to call anyone. As soon as the airline cancels, the agent finds the next best flight within policy, rebooks you, moves your hotel and cab to match, and sends the new details on WhatsApp. If a decision needs a person, our travel desk is on call [24/7].' },
  { question: 'How does the single monthly bill work?', answer: 'Employees don’t pay for anything or file expense claims. Every booking is billed to your company account, and at the end of the month finance gets one bill with a GST invoice for each booking. It’s broken down by employee, department and cost centre, and payment is due within [X days].' },
  { question: 'What does Cygnus charge?', answer: 'You pay the fare plus [a flat service fee per booking / a monthly subscription], with [no setup cost]. The price depends on your team size and how often you travel. Book a demo and we’ll send you a quote.' },
  { question: 'How long does it take to get my company set up on Cygnus?', answer: 'Most companies are booking within [X days]. Send us your travel policy, your approval chain and your employee list, or connect your HRMS, and we’ll set up the rules, approvers and billing for you. Your employees get a WhatsApp message and can start booking right away.' },
  { question: 'Is our employees’ data safe, and where is it stored?', answer: 'Traveller data is encrypted in transit and at rest, and it’s stored [in India / region]. Only the people you authorise can see bookings and spend. [Add any certification you hold, such as ISO 27001.] We never share your data with third parties beyond what’s needed to complete a booking.' },
  { question: 'How does Cygnus help manage travel expenses?', answer: 'Cygnus brings trip costs and expense details into one clear view. Replace this with your final expense management information.' },
  { question: 'Can we set different travel policies for different teams?', answer: 'Set policy rules to fit the way each team travels. Add details about your policy options here.' },
  { question: 'What happens when a booking falls outside policy?', answer: 'Out-of-policy choices can be flagged and sent for review. Add your approval workflow details here.' },
  { question: 'Do travellers see policy guidance before they book?', answer: 'Travelers can see relevant guidance during the booking process. Replace this with details about when policy checks appear.' },
  { question: 'Can finance and travel teams see the same information?', answer: 'Teams can work from a shared view of travel and spend. Add details about your reporting and integrations here.' },
  { question: 'Can policies vary by destination or travel type?', answer: 'Yes. Set rules around the teams, destinations, or types of travel that matter to your organisation.' },
  { question: 'How are out-of-policy requests handled?', answer: 'Requests that need review can be routed to an approver with the trip details and policy context.' },
  { question: 'Can managers approve travel requests?', answer: 'Approval workflows can involve the right manager or approver before a booking is confirmed.' },
  { question: 'Can employees request help with a trip?', answer: 'Travellers can contact the travel team for help with requests, changes, or questions about their plans.' },
  { question: 'Can I see upcoming trips in one place?', answer: 'A shared view of trip information helps travel teams keep track of bookings and changes.' },
  { question: 'Can Cygnus help when travel plans change?', answer: 'The travel team can coordinate updates and keep the relevant trip details together as plans change.' },
  { question: 'Can we review travel spend by team?', answer: 'Travel and expense information can help teams understand costs across their organisation.' },
  { question: 'Can we connect travel information with finance tools?', answer: 'Cygnus supports integrations with finance and HR systems. Contact the team to discuss the systems you use.' },
  { question: 'How do we get started with Cygnus?', answer: 'Book a demo to discuss your travel programme, policies, and the needs of your team.' },
  { question: 'Who can help us set up our travel policies?', answer: 'The Cygnus team can help you discuss your requirements and plan a setup that fits your organisation.' },
];

export default function ResourcesPage() {
  const pageRef = useRef(null);
  useTilt(pageRef, '.resources-expense-step, .resources-policy-card', { tilt: false });
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
