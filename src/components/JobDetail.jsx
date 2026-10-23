import { ArrowLeft } from 'lucide-react';
import MetaGrid from './MetaGrid.jsx';
import ActionBar from './ActionBar.jsx';

export default function JobDetail({job,onBack,detailRef}) {
 return <article className="job-detail-pane" ref={detailRef} key={job.slug} aria-labelledby="job-detail-title">
  <button type="button" className="job-back-button" onClick={onBack}><ArrowLeft size={17}/> Back to all jobs</button>
  <div className="job-detail-content" key={job.slug}>
   <header className="job-detail-header"><div className="job-card-tags"><span className="job-pill">{job.area}</span><span className="job-pill">{job.workMode}</span></div><h2 id="job-detail-title">{job.title}</h2></header>
   <MetaGrid job={job}/><ActionBar job={job}/><hr className="job-divider"/>
   <section className="job-description-section"><h3>Description</h3><p>{job.description}</p></section>
   <section className="job-description-section"><h3>Responsibilities</h3><BulletList items={job.responsibilities}/></section>
   {job.sections.map(section=><section className="job-description-section" key={section.heading}><h3>{section.heading}</h3>{section.subheading&&<h4 className="job-section-subheading">{section.subheading}</h4>}{section.paragraphs?.map((paragraph,index)=><p key={index}>{paragraph}</p>)}{section.bullets&&<BulletList items={section.bullets}/>}</section>)}
  </div>
 </article>;
}

function BulletList({items}) { return <div className="job-bullet-list">{items.map((item,index)=><p key={index}><span aria-hidden="true">•</span>{item}</p>)}</div>; }
