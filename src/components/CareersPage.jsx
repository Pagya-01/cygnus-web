import { useEffect, useRef, useState } from 'react';
import { ArrowRight, BriefcaseBusiness } from 'lucide-react';
import { jobs } from '../data/jobs.js';
import JobList from './JobList.jsx';
import JobDetail from './JobDetail.jsx';
import WhatsAppButton from './WhatsAppButton.jsx';

function readJobFromUrl() {
 const slug=new URLSearchParams(window.location.search).get('job');
 return jobs.find(job=>job.slug===slug)??jobs[0];
}

export default function CareersPage() {
 const [selectedJob,setSelectedJob]=useState(readJobFromUrl);
 const [mobileDetailOpen,setMobileDetailOpen]=useState(()=>new URLSearchParams(window.location.search).has('job'));
 const detailRef=useRef(null);
 useEffect(()=>{
  const syncFromUrl=()=>{const job=readJobFromUrl();setSelectedJob(job);setMobileDetailOpen(new URLSearchParams(window.location.search).has('job'))};
  window.addEventListener('popstate',syncFromUrl);return()=>window.removeEventListener('popstate',syncFromUrl);
 },[]);
 const selectJob=(job)=>{
  setSelectedJob(job);setMobileDetailOpen(true);
  const url=new URL(window.location.href);url.searchParams.set('job',job.slug);window.history.pushState({job:job.slug},'',url);
  window.requestAnimationFrame(()=>{
   const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
   if(window.matchMedia('(max-width: 760px)').matches)detailRef.current?.scrollTo({top:0,behavior:reduce?'auto':'smooth'});
   else detailRef.current?.scrollIntoView({block:'start',behavior:reduce?'auto':'smooth'});
  });
 };
 const backToList=()=>setMobileDetailOpen(false);
 return <main className="careers-board-page" id="top">
  <section className="contact-careers careers-board-hero" id="careers" aria-labelledby="careers-title">
   <div className="contact-us-section-inner">
    <span className="contact-us-kicker"><BriefcaseBusiness size={15}/> CAREERS AT CYGNUS</span>
    <h1 id="careers-title">Find the career of <span>your dreams</span></h1>
    <div className="contact-careers-copy"><h2>We're more than just a workplace.</h2><p>We know that finding a meaningful and rewarding job can be a long journey. Our goal is to make that process as easy as possible for you, and to create a work environment that's satisfying - one where you'll look forward to coming to every day. Start your journey with us by browsing available jobs.</p><a className="contact-careers-link" href="#open-positions">Explore open roles <ArrowRight size={16}/></a></div>
   </div>
  </section>
  <section className="careers-board-section" id="open-positions" aria-labelledby="open-positions-title">
   <div className="careers-board-container"><header className="careers-board-heading"><span>Opportunities</span><h2 id="open-positions-title">Open roles</h2></header>
    <div className={'job-layout'+(mobileDetailOpen?' is-mobile-detail-open':'')}>
     <JobList jobs={jobs} selectedSlug={selectedJob.slug} onSelect={selectJob}/>
     <JobDetail job={selectedJob} onBack={backToList} detailRef={detailRef}/>
    </div>
   </div>
  </section>
  <WhatsAppButton/>
 </main>;
}
