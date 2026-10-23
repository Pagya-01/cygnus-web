import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { BrainCircuit, CircleCheck, Globe, Hash, Mail, MessageCircle, MessageSquareText, Network, Play, ReceiptText, UsersRound } from 'lucide-react';
import BrandLogo from './BrandLogo';

const sources = [
  { label: 'WhatsApp', Icon: MessageCircle },
  { label: 'Email', Icon: Mail },
  { label: 'Web app', Icon: Globe },
  { label: 'HRMS', Icon: UsersRound },
  { label: 'Expense tools', Icon: ReceiptText },
  { label: 'Travel Suppliers', Icon: Hash },
];

const steps = [
  {
    title: 'Request', detail: 'A traveller asks on WhatsApp, email or the web app, in their own words. No forms to fill in.', Icon: MessageSquareText,
    preview: <div className="how-preview-chat"><span><i/> WhatsApp · Voyager</span><p>Mumbai → Singapore, Tue–Thu. Hotel near the office.</p><small>On it. Checking your travel policy…</small></div>,
  },
  {
    title: 'Check policy', detail: "Cygnus pulls in the traveller's profile, preferences and travel policy automatically.", Icon: BrainCircuit,
    preview: <div className="how-preview-profile"><span className="how-preview-avatar">PS</span><div><strong>Priya Sharma</strong><small>Sales · Mumbai</small></div><dl><dt>Policy</dt><dd>Economy, ₹9k/night</dd><dt>Seat</dt><dd>Aisle</dd><dt>Cost centre</dt><dd>SAL-204</dd></dl></div>,
  },
  {
    title: 'Compare & approve', detail: 'It compares flights and hotels and recommends the best in-policy option. Anything outside policy goes for approval.', Icon: Network,
    preview: <div className="how-preview-options"><span>3 options · policy checked</span><p><b>SQ 421 · 08:15</b><small>₹31,200</small><i>Best fit</i></p><p><b>AI 342 · 23:30</b><small>₹27,900</small><i>In policy</i></p><p><b>Business class</b><small>₹96,000</small><i>Approval</i></p></div>,
  },
  {
    title: 'Book & support', detail: 'It books, sends the itinerary, and tracks changes, approvals and spend until the trip closes.', Icon: CircleCheck,
    preview: <div className="how-preview-itinerary"><strong>Trip to Singapore <i>On track</i></strong><span><CircleCheck/> Flight ticketed · PNR K7Q2LM</span><span><CircleCheck/> Hotel confirmed · 2 nights</span><span><CircleCheck/> Manager approved</span><span><CircleCheck/> Itinerary sent on WhatsApp</span></div>,
  },
];

function FanLines() {
  const paths = [
    'M160 0 C160 140 954 290 954 345',
    'M480 0 C480 140 957 290 957 345',
    'M800 0 C800 140 959 290 959 345',
    'M1120 0 C1120 140 961 290 961 345',
    'M1440 0 C1440 140 963 290 963 345',
    'M1760 0 C1760 140 966 290 966 345',
  ];
  return <svg className="how-sky-lines" viewBox="0 0 1920 360" preserveAspectRatio="none" aria-hidden="true">
    {paths.map((path, index) => <g key={index} style={{ '--channel-delay': `${index * 1.2}s` }}>
      <path className="how-sky-flow-line" d={path}/>
      <path className="how-sky-flow-line-glow" d={path} pathLength="1"/>
      <path className="how-sky-flow-line-head" d={path} pathLength="1"/>
    </g>)}
  </svg>;
}

export default function HowItWorks() {
  const sectionRef = useRef(null);
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    const select = gsap.utils.selector(section);
    const media = gsap.matchMedia();
    media.add({ reduce: '(prefers-reduced-motion: reduce)', motion: '(prefers-reduced-motion: no-preference)' }, ({ conditions }) => {
      const headings = select('.how-sky-heading h2, .how-sky-heading > p');
      const channels = select('.how-sky-source');
      const cards = select('.how-sky-step');
      const progress = select('.how-sky-progress-fill')[0];
      const hub = select('.how-sky-hub')[0];
      const stem = select('.how-sky-stem')[0];
      const stemBeam = select('.how-sky-stem-beam')[0];
      const beams = select('.how-sky-flow-line-glow');
      const beamHeads = select('.how-sky-flow-line-head');
      const clearStates = () => {
        cards.forEach((card) => card.classList.remove('is-active', 'is-final'));
        cards.forEach((node) => node.classList.remove('is-active', 'is-pending'));
      };

      if (conditions.reduce) {
        clearStates();
        gsap.set([...headings, ...channels], { clearProps: 'all' });
        cards.forEach((card, index) => {
          gsap.set(card, { clearProps: 'all' });
          card.classList.add('is-active');
          if (index === 3) card.classList.add('is-final');
        });
        gsap.set(progress, { scaleX: 1 });
        gsap.set([hub, stem, stemBeam], { clearProps: 'all' });
        return clearStates;
      }

      gsap.set(headings, { autoAlpha: 0, y: 8 });
      gsap.set(channels, { autoAlpha: 0, y: 8 });
      gsap.set(cards, { autoAlpha: 0, y: 8, boxShadow: '0 4px 14px rgba(15,23,42,.025)' });
      gsap.set(beams, { strokeDasharray: '0.16 0.84', strokeDashoffset: 0, opacity: 0 });
      gsap.set(beamHeads, { strokeDasharray: '0.025 0.975', strokeDashoffset: 0, opacity: 0 });
      gsap.set(progress, { scaleX: 0, transformOrigin: 'left center' });
      gsap.set(stemBeam, { strokeDasharray: '0.3 0.7', strokeDashoffset: 0 });
      clearStates();

      const timeline = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 1.5 });
      timeline.to(headings, { autoAlpha: 1, y: 0, duration: .25, ease: 'power2.out' }, 0);
      timeline.to(channels, { autoAlpha: 1, y: 0, duration: .25, ease: 'power2.out' }, 0);
      timeline.to(cards, { autoAlpha: .35, y: 0, duration: .25, ease: 'power2.out' }, 0);
      beams.forEach((beam, index) => {
        const head = beamHeads[index];
        const at = index * .48;
        timeline.to(beam, { opacity: 1, duration: .06, ease: 'power1.out' }, at);
        timeline.to(beam, { strokeDashoffset: -1, duration: .5, ease: 'power2.inOut' }, at);
        timeline.to(beam, { opacity: 0, duration: .1, ease: 'power1.out' }, at + .4);
        timeline.to(head, { opacity: 1, duration: .06, ease: 'power1.out' }, at);
        timeline.to(head, { strokeDashoffset: -1, duration: .5, ease: 'power2.inOut' }, at);
        timeline.to(head, { opacity: 0, duration: .1, ease: 'power1.out' }, at + .4);
      });
      timeline.to(hub, { boxShadow: '0 0 0 6px rgba(124,58,237,.12), 0 8px 30px rgba(124,58,237,.35)', duration: .2, ease: 'power2.out' }, 3.05);
      timeline.to(hub, { boxShadow: '0 0 0 6px rgba(124,58,237,.12), 0 8px 30px rgba(124,58,237,.35)', duration: .3 }, 3.25);
      timeline.to(hub, { boxShadow: '0 8px 24px rgba(124,58,237,.14)', duration: .3, ease: 'power2.inOut' }, 3.55);
      timeline.to(hub, { scale: 1.03, duration: .2, ease: 'power2.out' }, 3.05);
      timeline.to(hub, { scale: 1.03, duration: .3 }, 3.25);
      timeline.to(hub, { scale: 1, duration: .3, ease: 'power2.inOut' }, 3.55);
      timeline.to(stemBeam, { strokeDashoffset: -.7, duration: .3, ease: 'power2.inOut' }, 3.85);

      const activate = (index, at) => {
        const card = cards[index];
        const node = cards[index];
        timeline.call(() => {
          node.classList.remove('is-pending');
          node.classList.add('is-active');
          if (index === 3) node.classList.add('is-final');
        }, null, at);
        const shadow = index === 3 ? '0 8px 22px rgba(124,58,237,.1)' : '0 8px 22px rgba(15,23,42,.07)';
        timeline.fromTo(card, { autoAlpha: .35, y: 0, boxShadow: '0 4px 14px rgba(15,23,42,.025)', immediateRender: false }, { autoAlpha: 1, y: -3, boxShadow: shadow, duration: .35, ease: 'power2.out' }, at);
      };
      const pending = (index, at) => timeline.call(() => cards[index].classList.add('is-pending'), null, at);

      pending(0, 3.9);
      activate(0, 4.15);
      pending(1, 4.68);
      timeline.to(progress, { scaleX: 1 / 3, duration: .6, ease: 'none' }, 4.15);
      activate(1, 4.83);
      pending(2, 5.36);
      timeline.to(progress, { scaleX: 2 / 3, duration: .6, ease: 'none' }, 4.83);
      activate(2, 5.51);
      pending(3, 6.04);
      timeline.to(progress, { scaleX: 1, duration: .6, ease: 'none' }, 5.51);
      activate(3, 6.19);

      timeline.to([...headings, ...channels, ...cards], { autoAlpha: 0, y: -8, duration: .25, ease: 'power1.in' }, 7);
      timeline.call(() => {
        clearStates();
        gsap.set(progress, { scaleX: 0 });
        gsap.set(stemBeam, { strokeDashoffset: 0 });
        gsap.set(beams, { strokeDashoffset: 0, opacity: 0 });
        gsap.set(beamHeads, { strokeDashoffset: 0, opacity: 0 });
        gsap.set(cards, { autoAlpha: 0, y: 8, boxShadow: '0 4px 14px rgba(15,23,42,.025)' });
      }, null, 7.25);

      let observer;
      if ('IntersectionObserver' in window) {
        observer = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {
            timeline.play();
            observer.disconnect();
          }
        }, { threshold: .12 });
        observer.observe(section);
      } else timeline.play();
      return () => {
        observer?.disconnect();
        timeline.kill();
      };
    });
    return () => media.revert();
  }, []);

  return <section ref={sectionRef} id="how-cygnus-works" className="how-sky-section" aria-labelledby="how-sky-title">
    <header className="how-sky-heading">
      <span className="how-sky-badge">How it works</span>
      <h2 id="how-sky-title">From travel request to finished trip,<br className="how-sky-desktop-break"/> in four steps.</h2>
      <p>Voyager takes the request, applies your policy and handles the booking.<br/> Your team steps in only when a decision needs them.</p>
    </header>

    <div className="how-sky-flow">
      <FanLines/>
      <div className="how-sky-sources" aria-label="Ways to make a travel request">
        {sources.map(({ label, Icon }) => <div className="how-sky-source" key={label}><span><Icon size={14}/></span>{label}</div>)}
      </div>
      <div className="how-sky-hub"><span className="how-sky-brand-mark" aria-hidden="true"><BrandLogo className="how-sky-brand-mark-svg"/></span><strong>Voyager</strong><svg className="how-sky-stem" viewBox="0 0 2 28" preserveAspectRatio="none" aria-hidden="true"><line className="how-sky-stem-base" x1="1" y1="0" x2="1" y2="28"/><line className="how-sky-stem-beam" x1="1" y1="0" x2="1" y2="28" pathLength="1"/></svg></div>
    </div>

    <div className="how-sky-steps" aria-label="The four steps in a Cygnus trip">
      <div className="how-sky-progress-track" aria-hidden="true"><span className="how-sky-progress-fill"/></div>
      {steps.map(({ title, detail, Icon, preview }, index) => <article className="how-sky-step" data-step={index + 1} key={title}>
        <div className="how-sky-step-preview">{preview}</div>
        <div className="how-sky-step-label"><span><Icon size={17}/></span><small>0{index + 1}</small></div>
        <h3>{title}</h3>
        <p>{detail}</p>
      </article>)}
    </div>
    <a className="how-sky-overview" href="/resources#resources-video">Watch the 2-minute tour <Play size={16} fill="currentColor" aria-hidden="true"/></a>
  </section>;
}
