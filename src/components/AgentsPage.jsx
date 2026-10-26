import { ArrowRight, BrainCircuit, CircleCheck, Clock3, MessageSquareText, Pause, Play, Shuffle, Volume2, VolumeX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import useTilt from './useTilt.js';

const agentFlow = [
  {
    number: '01',
    title: 'Reads the request',
    description: 'Turn a travel request into a clear plan, with the traveller’s preferences and company policy in view.',
    Icon: MessageSquareText,
  },
  {
    number: '02',
    title: 'Does the legwork',
    description: 'Coordinate the next steps and keep the trip details together as plans take shape.',
    Icon: BrainCircuit,
  },
  {
    number: '03',
    title: 'Asks when it matters',
    description: 'Pause when a choice needs a person. Resume with the answer and the context already in place.',
    Icon: CircleCheck,
  },
];

const agentBenefits = [
  { title: 'Flight cancelled at 11 pm', text: 'Rebooks the next flight in policy, moves the hotel and messages the traveller.', Icon: Clock3 },
  { title: 'Approval stuck with a manager', text: 'Sends a WhatsApp reminder, then goes to the backup approver.', Icon: Shuffle },
  { title: 'Last-minute trip for a senior leader', text: "Applies the right grade's policy and books in minutes.", Icon: CircleCheck },
];

// 30-second agent demo: plays muted on a loop while on screen, with play/pause and sound toggles.
function AgentDemoVideo() {
  const frameRef = useRef(null);
  const videoRef = useRef(null);
  const pausedByUser = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const frame = frameRef.current;
    const video = videoRef.current;
    if (!frame || !video || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { if (!pausedByUser.current) video.play().catch(() => {}); }
      else video.pause();
    }, { threshold: 0.35 });
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video.paused) { pausedByUser.current = false; video.play().catch(() => {}); }
    else { pausedByUser.current = true; video.pause(); }
  };
  const toggleSound = () => {
    const video = videoRef.current;
    video.muted = !video.muted;
    setMuted(video.muted);
    if (!video.muted && video.paused) { pausedByUser.current = false; video.play().catch(() => {}); }
  };

  return <div ref={frameRef} className="agents-page-video-frame">
    <video ref={videoRef} className="agents-page-video" muted loop playsInline preload="metadata" poster="/cygnus-ai-agent-30s-poster.jpg" aria-label="Cygnus AI agent, 30-second overview" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}>
      <source src="/cygnus-ai-agent-30s.mp4" type="video/mp4"/>
    </video>
    <div className="agents-page-video-controls">
      <button type="button" onClick={togglePlay} aria-label={playing ? 'Pause video' : 'Play video'}>
        {playing ? <Pause size={18} fill="currentColor" aria-hidden="true"/> : <Play size={18} fill="currentColor" aria-hidden="true"/>}
      </button>
      <button type="button" onClick={toggleSound} aria-label={muted ? 'Turn sound on' : 'Turn sound off'}>
        {muted ? <VolumeX size={18} aria-hidden="true"/> : <Volume2 size={18} aria-hidden="true"/>}
      </button>
    </div>
  </div>;
}

export default function AgentsPage() {
  const pageRef = useRef(null);
  useTilt(pageRef, '.agents-page-flow-card, .agents-page-benefit-card', { tilt: false });
  useTilt(pageRef, '.agents-page-visual');
  return <main ref={pageRef} className="agents-page" id="top">
    <section className="agents-page-hero" aria-labelledby="agents-page-title">
      <span className="agents-page-rings" aria-hidden="true"><i/><i/><i/></span>
      <div className="agents-page-hero-inner">
        <div className="agents-page-copy">
          <span className="agents-page-kicker">AI agents</span>
          <h1 className="agents-page-title" id="agents-page-title">Your AI travel assistant, always on policy</h1>
          <p>Cygnus agents take requests on WhatsApp, book within your policy, chase approvals and pause for a person when a decision needs one.</p>
          <ul className="agents-page-highlights">
            <li><CircleCheck size={17}/> Books travel within your company policy automatically</li>
            <li><CircleCheck size={17}/> Compares prices across all major suppliers in real time</li>
            <li><CircleCheck size={17}/> Handles approvals and notifies your team instantly</li>
          </ul>
          <div className="agents-page-actions">
            <a className="agents-page-primary" href="/#contact-cta">Book a demo <ArrowRight size={16}/></a>
            <a className="agents-page-secondary" href="#agent-workflow">See how it works <ArrowRight size={16}/></a>
          </div>
          <div className="agents-page-proof"><span><i/> A person approves every exception</span><span><i/> Nothing is lost when work pauses</span></div>
        </div>
        <div className="agents-page-visual" aria-label="An agent pauses for a traveler's hotel choice and is ready to continue" role="img">
          <div className="agents-page-visual-top"><span>CYGNUS / AGENT RUN</span><b><i/> WAITING FOR YOU</b></div>
          <div className="agents-page-trip-card">
            <span className="agents-page-trip-icon"><BrainCircuit size={18}/></span>
            <div><small>BUSINESS TRIP</small><strong>Mumbai <span>→</span> Singapore</strong></div>
            <span className="agents-page-trip-status">In progress</span>
          </div>
          <div className="agents-page-run-list">
            <div className="is-complete"><span><CircleCheck size={16}/></span><div><strong>Check travel policy</strong><small>Completed · within policy</small></div></div>
            <div className="is-complete"><span><CircleCheck size={16}/></span><div><strong>Compare hotel options</strong><small>2 options ready to review</small></div></div>
            <div className="is-current"><span><MessageSquareText size={16}/></span><div><strong>Ask for your preference</strong><small>The agent will continue after your choice</small></div></div>
          </div>
          <div className="agents-page-choice"><span>Choose a hotel to continue</span><b>Review options <ArrowRight size={13}/></b></div>
          <div className="agents-page-visual-foot"><span><i/> Agent paused</span><span>Trip context saved</span></div>
        </div>
      </div>
    </section>

    <section className="agents-page-workflow" id="agent-workflow" aria-labelledby="agent-workflow-title">
      <div className="agents-page-section-head">
        <span className="agents-page-kicker">How an agent works</span>
        <h2 id="agent-workflow-title">The agent does the work.<br className="agents-page-break"/> Your team makes the calls.</h2>
        <p>Agents handle the coordination. Anything that needs judgment comes to a person, with the options ready.</p>
      </div>
      <div className="agents-page-flow-grid">
        {agentFlow.map(({ number, title, description, Icon }) => <article className="agents-page-flow-card" key={number}>
          <div className="agents-page-flow-meta"><span>{number}</span><Icon size={19}/></div>
          <h3>{title}</h3>
          <p>{description}</p>
        </article>)}
      </div>
    </section>

    <section className="agents-page-video-section" aria-labelledby="agents-page-video-title">
      <div className="agents-page-section-head">
        <span className="agents-page-kicker">See it in action</span>
        <h2 id="agents-page-video-title">Watch a Cygnus AI agent<br className="agents-page-break"/> at work.</h2>
        <p>A 30-second look at how an agent handles a trip from request to booking.</p>
      </div>
      <AgentDemoVideo/>
    </section>

    <section className="agents-page-benefits" aria-labelledby="agents-page-benefits-title">
      <div className="agents-page-section-head">
        <span className="agents-page-kicker">A normal week</span>
        <h2 id="agents-page-benefits-title">What the agents handle<br className="agents-page-break"/> when plans change.</h2>
        <p>Three situations every travel desk knows, handled without an email thread.</p>
      </div>
      <div className="agents-page-benefit-grid">
        {agentBenefits.map(({ title, text, Icon }) => <article className="agents-page-benefit-card" key={title}>
          <span><Icon size={18}/></span><h3>{title}</h3><p>{text}</p>
        </article>)}
      </div>
    </section>

  </main>;
}
