import { MessageCircle, Phone } from 'lucide-react';

export default function WhatsAppButton() {
 const href='https://wa.me/?text='+encodeURIComponent('Hi, I’d like to learn about job opportunities at Cygnus.');
 return <a className="careers-whatsapp" href={href} target="_blank" rel="noreferrer" aria-label="Contact Cygnus on WhatsApp"><span className="careers-whatsapp-mark"><MessageCircle size={24} strokeWidth={2}/><Phone size={11} strokeWidth={2.5}/></span></a>;
}
