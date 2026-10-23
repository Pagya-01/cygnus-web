import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Blocks, Inbox, MessageCircleMore, Pause, PauseCircle, Play, Shuffle, UsersRound } from 'lucide-react';

const agentFeatures = [
  { title: 'Waits, then picks up', description: 'Pauses for an approval or a missing detail, then carries on where it stopped.', Icon: PauseCircle },
  { title: 'Asks before it acts', description: 'Checks with the traveller or manager when a choice needs a person.', Icon: MessageCircleMore },
  { title: 'Replans when trips change', description: 'Flight moved? The hotel, cab and itinerary follow.', Icon: Shuffle },
  { title: 'One inbox for decisions', description: 'Approvals, questions and trip updates in one place for your travel desk.', Icon: Inbox },
  { title: 'Works with your tools', description: 'Reads from your HRMS, writes to your accounting system.', Icon: Blocks },
  { title: 'Every team covered', description: 'Travel, HR, finance and operations each get the view they need.', Icon: UsersRound },
];

function AgentVideo({ isVisible }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isVisible) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isVisible]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  };

  return <div className="agent-video-column">
    <div className="agent-video-frame">
      <video ref={videoRef} className="agent-video" autoPlay muted loop playsInline preload="metadata" aria-label="AI agent demonstration video" onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)}>
        <source src="/ai-agent-demo.mp4" type="video/mp4"/>
        Your browser does not support the video element.
      </video>
      <button type="button" className="agent-video-toggle" onClick={togglePlayback} aria-label={isPlaying ? 'Pause video' : 'Play video'}>
        {isPlaying ? <Pause size={18} fill="currentColor" aria-hidden="true"/> : <Play size={18} fill="currentColor" aria-hidden="true"/>}
      </button>
    </div>
    <a className="agents-learn-more" href="/agents">Learn more! <ArrowRight size={16} aria-hidden="true"/></a>
  </div>;
}

export default function AgentsSection() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const timeline = section?.querySelector('.agent-timeline');
    if (!section || !timeline || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    observer.observe(timeline);
    return () => observer.disconnect();
  }, []);

  return <section ref={sectionRef} id="agents" className={`agents-section${isVisible ? ' is-visible' : ''}`} aria-labelledby="agents-title">
    <div className="agents-inner">
      <header className="agents-heading">
        <span className="agents-eyebrow"><i/> AI AGENTS</span>
        <h2 id="agents-title">AI agents that handle<br className="agents-desktop-break"/> the back-and-forth</h2>
        <p>They chase approvals, rebook when plans change and check with a person before any decision that matters.</p>
      </header>
      <div className="agents-layout">
        <ol className="agent-timeline" aria-label="AI agent capabilities">
          {agentFeatures.map(({ title, description, Icon }, index) => <li className="agent-timeline-row" key={title} style={{ '--i': index }}>
            <span className="agent-timeline-marker"><Icon size={22} strokeWidth={1.8}/></span>
            <div className="agent-timeline-copy"><h3>{title}</h3><p>{description}</p></div>
          </li>)}
        </ol>
        <AgentVideo isVisible={isVisible}/>
      </div>
    </div>
  </section>;
}
