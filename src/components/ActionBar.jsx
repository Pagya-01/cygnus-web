import { useState } from 'react';
import { ArrowUpRight, Share2 } from 'lucide-react';

export default function ActionBar({job}) {
 const [shareMessage,setShareMessage]=useState('');
 const applyHref='mailto:hello@cygnus.travel?subject='+encodeURIComponent('Application: '+job.title)+'&body='+encodeURIComponent('Hello, I’d like to apply for '+job.title+'.');
 const share=async()=>{
  const url=window.location.href;
  if(navigator.share){try{await navigator.share({title:job.title,text:'Job at Cygnus: '+job.title,url});setShareMessage('Link shared');return}catch(error){if(error instanceof Error&&error.name==='AbortError')return}}
  try{await navigator.clipboard.writeText(url);setShareMessage('Link copied')}catch{window.prompt('Copy the link to this job',url);setShareMessage('Link ready to copy')}
 };
 return <div className="job-actions"><a className="job-action-primary" href={applyHref}>Apply <ArrowUpRight size={16}/></a><a className="job-action-secondary" href="/contactus">Learn more about Cygnus</a><button className="job-action-share" type="button" onClick={share}><Share2 size={15}/> Share</button><span className="job-share-status" aria-live="polite">{shareMessage}</span></div>;
}
