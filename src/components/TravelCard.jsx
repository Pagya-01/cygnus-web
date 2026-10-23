import { ArrowUpRight, Plus, TrendingUp } from 'lucide-react';

export default function TravelCard({ card }) {
  return <article className={`travel-card card-${card.tone}`} aria-label={`${card.title}${card.value ? `: ${card.value}` : ''}`}>
    <div className="travel-card-top">
      <span className="travel-card-title">{card.title}</span>
      <ArrowUpRight className="travel-card-arrow" size={14} aria-hidden="true" />
    </div>

    {card.kind === 'image' && <div className="travel-card-image-body">
      <img src={card.image} alt={card.alt} loading="lazy" />
      <span>{card.label}</span>
    </div>}

    {card.kind === 'stat' && <>
      <strong className="travel-card-value">{card.value}</strong>
      <span className="travel-card-label">{card.label}</span>
      <div className="travel-card-bars" aria-hidden="true">
        {card.bars.map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}
      </div>
    </>}

    {card.kind === 'number' && <div className="travel-card-number-body">
      <strong className="travel-card-value">{card.value}</strong>
      <span className="travel-card-label">{card.label}</span>
    </div>}

    {card.kind === 'training' && <div className="travel-card-training-body">
      <span className="travel-card-plus"><Plus size={21} strokeWidth={1.8} /></span>
      <strong>{card.title}</strong>
      <span className="travel-card-label">{card.label}</span>
    </div>}

    {card.kind === 'text' && <div className="travel-card-text-body">
      <span className="travel-card-spark"><TrendingUp size={17} strokeWidth={1.8} /></span>
      <strong>{card.title}</strong>
      <p>{card.text}</p>
    </div>}

    {card.kind === 'chart' && <div className="travel-card-chart-body">
      <strong className="travel-card-value">{card.value}</strong>
      <span className="travel-card-label">{card.label}</span>
      <svg className="travel-card-chart" viewBox="0 0 150 58" preserveAspectRatio="none" aria-hidden="true">
        <path className="travel-chart-fill" d="M0 50 L25 43 L48 45 L72 29 L94 34 L120 14 L150 5 L150 58 L0 58 Z" />
        <path className="travel-chart-line" d="M0 50 L25 43 L48 45 L72 29 L94 34 L120 14 L150 5" />
        <circle cx="120" cy="14" r="3" />
      </svg>
    </div>}
  </article>;
}
