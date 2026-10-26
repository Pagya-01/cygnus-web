import { useEffect, useRef, useState } from 'react';
import { BedDouble, CarFront, CircleCheck, FileCheck2, Plane, ReceiptText, RefreshCw, ShieldCheck, Ticket, Train, UserCheck, Wallet } from 'lucide-react';

// Live activity feed for the Industries section: a new update arrives at the top every few seconds,
// the list moves down and the oldest row fades out at the bottom.
const NEXT_MS = 2800;      // time between new updates
const ROWS = 6;            // rows shown (the last one fades out)
const ROW_H = 64;          // row height (px) — keep in sync with .live-feed-row in styles.css
const ROW_GAP = 10;

// tone: 'indigo' or 'green' badge
const EVENTS = [
  { title: 'Flight rebooked after a delay', meta: 'Banking · Mumbai → Delhi', badge: 'Rebooked', tone: 'indigo', Icon: RefreshCw },
  { title: 'Plant visit approved in 2 minutes', meta: 'Manufacturing · Pune', badge: 'Approved', tone: 'green', Icon: CircleCheck },
  { title: 'Hotel moved to match the new flight', meta: 'IT & technology · Bengaluru', badge: 'Updated', tone: 'indigo', Icon: BedDouble },
  { title: 'Monthly bill sent to finance', meta: 'Retail · 214 GST invoices', badge: 'Sent', tone: 'green', Icon: ReceiptText },
  { title: 'Fare held within policy', meta: 'Pharma · Hyderabad → Chennai', badge: 'In policy', tone: 'indigo', Icon: ShieldCheck },
  { title: 'Same-day cab booked for a warehouse visit', meta: 'Logistics · Gurugram', badge: 'Booked', tone: 'green', Icon: CarFront },
  { title: 'Client visit booked on WhatsApp', meta: 'Consulting · Delhi → Mumbai', badge: 'Booked', tone: 'green', Icon: Plane },
  { title: 'Over-budget hotel sent to the manager', meta: 'FMCG · Kolkata', badge: 'Approval', tone: 'indigo', Icon: UserCheck },
  { title: 'Visa documents checked before travel', meta: 'IT & technology · Bengaluru → Singapore', badge: 'Ready', tone: 'green', Icon: FileCheck2 },
  { title: 'Train tickets issued for a site audit', meta: 'Manufacturing · Nashik', badge: 'Issued', tone: 'green', Icon: Train },
  { title: 'Trip spend added to the cost centre', meta: 'Banking · Q3 travel budget', badge: 'Reconciled', tone: 'indigo', Icon: Wallet },
  { title: 'Conference passes booked for 40 people', meta: 'Pharma · Goa', badge: 'Booked', tone: 'green', Icon: Ticket },
];

export default function LiveFeed() {
  const rootRef = useRef(null);
  const nextRef = useRef(ROWS);
  // newest first; each entry carries a unique id so it keeps its element while it moves down
  const [items, setItems] = useState(() => EVENTS.slice(0, ROWS).map((e, i) => ({ ...e, id: i, fresh: false })));
  const [running, setRunning] = useState(false);

  // only run while the feed is on screen, not hovered, and motion is allowed
  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let inView = false, hover = false;
    const update = () => setRunning(inView && !hover);
    const io = new IntersectionObserver(([e]) => { inView = e.isIntersecting; update(); }, { threshold: .2 });
    io.observe(root);
    const enter = () => { hover = true; update(); }, leave = () => { hover = false; update(); };
    root.addEventListener('mouseenter', enter); root.addEventListener('mouseleave', leave);
    return () => { io.disconnect(); root.removeEventListener('mouseenter', enter); root.removeEventListener('mouseleave', leave); };
  }, []);

  useEffect(() => {
    if (!running) return undefined;
    const id = window.setInterval(() => {
      const n = nextRef.current++;
      const event = EVENTS[n % EVENTS.length];
      setItems(list => [{ ...event, id: n, fresh: true }, ...list.map(item => ({ ...item, fresh: false }))].slice(0, ROWS + 1));
    }, NEXT_MS);
    return () => window.clearInterval(id);
  }, [running]);

  return <div ref={rootRef} className="live-feed">
    <div className="live-feed-head">
      <span className="live-feed-status"><i aria-hidden="true"/>Live on Voyager</span>
      <span className="live-feed-caption">Updates from teams in every industry</span>
    </div>
    <ul className="live-feed-list" style={{ height: ROWS * (ROW_H + ROW_GAP) - ROW_GAP }} aria-live="off">
      {items.map(({ id, title, meta, badge, tone, Icon, fresh }, index) => <li
        key={id}
        className={`live-feed-slot${index >= ROWS ? ' is-leaving' : ''}`}
        style={{ transform: `translateY(${index * (ROW_H + ROW_GAP)}px)` }}
        aria-hidden={index >= ROWS}
      >
        <div className={`live-feed-row${fresh ? ' is-fresh' : ''}`}>
          <span className="live-feed-icon"><Icon size={18} strokeWidth={1.8} aria-hidden="true"/></span>
          <span className="live-feed-text"><strong>{title}</strong><small>{meta}</small></span>
          <span className={`live-feed-badge is-${tone}`}>{badge}</span>
        </div>
      </li>)}
    </ul>
  </div>;
}
