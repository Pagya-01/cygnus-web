import { MapPin } from 'lucide-react';

export default function JobCard({job,selected,onSelect}) {
 return <button type="button" className={'job-card'+(selected?' is-selected':'')} role="option" aria-selected={selected} onClick={onSelect}>
  <span className="job-card-tags"><span className="job-pill">{job.area}</span><span className={'job-pill job-mode-pill'+(selected?' is-selected':'')}>{job.workMode}</span></span>
  <span className="job-card-title">{job.title}</span>
  <span className="job-card-location"><MapPin size={15} strokeWidth={1.8}/>{job.location}</span>
 </button>;
}
