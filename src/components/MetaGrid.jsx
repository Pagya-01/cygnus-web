
export default function MetaGrid({job}) {
 const values=[['Location',job.location],['Work mode',job.workMode],['Seniority / employment type',[job.seniority,job.employmentType].filter(Boolean).join(' · ')],['Department',job.department],['Compensation',job.compensation||'To be discussed']];
 return <dl className="job-meta-grid">{values.map(([label,value])=><div className="job-meta-item" key={label}><dt>{label}</dt><dd>{value||'—'}</dd></div>)}</dl>;
}
