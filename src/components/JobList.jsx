import JobCard from './JobCard.jsx';

export default function JobList({jobs,selectedSlug,onSelect}) {
 return <aside className="job-list-pane" aria-label="Open positions"><div className="job-list-heading"><span>OPEN POSITIONS</span><p>{jobs.length} open positions</p></div><div className="job-card-list" role="listbox" aria-label="Select a job">
  {jobs.map(job=><div role="presentation" key={job.slug}><JobCard job={job} selected={selectedSlug===job.slug} onSelect={()=>onSelect(job)}/></div>)}
 </div></aside>;
}
