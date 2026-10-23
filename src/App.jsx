import Hero from './components/Hero.jsx';
import Header from './components/Header.jsx';
import TrustedBy from './components/TrustedBy.jsx';
import HowCygnusWorks from './components/HowCygnusWorks.jsx';
import AgentsSection from './components/AgentsSection.jsx';
import IndustriesSection from './components/IndustriesSection.jsx';
import ContactCta from './components/ContactCta.jsx';
import Footer from './components/Footer.jsx';
import ResourcesPage from './components/ResourcesPage.jsx';
import ProductPage from './components/ProductPage.jsx';
import AgentsPage from './components/AgentsPage.jsx';
import ContactUsPage from './components/ContactUsPage.jsx';
import CareersPage from './components/CareersPage.jsx';
import TravelAdminsPage from './components/TravelAdminsPage.jsx';
import FinanceCfoPage from './components/FinanceCfoPage.jsx';
import CorporateTravelersPage from './components/CorporateTravelersPage.jsx';

export default function App() {
  const pathname = window.location.pathname.replace(/\/$/, '');
  const isResources = pathname === '/resources';
  const isProduct = pathname === '/product';
  const isAgents = pathname === '/agents';
  const isContactUs = pathname === '/contactus';
  const isCareers = pathname === '/careers';
  const isTravelAdmins = pathname === '/solutions/travel-admins';
  const isFinanceCfo = pathname === '/solutions/finance-cfo';
  const isCorporateTravelers = pathname === '/solutions/corporate-travelers';
  let page;
  if (isCorporateTravelers) page = <><Header isCorporateTravelers/><CorporateTravelersPage/><Footer/></>;
  else if (isFinanceCfo) page = <><Header isFinanceCfo/><FinanceCfoPage/><Footer/></>;
  else if (isTravelAdmins) page = <><Header isTravelAdmins/><TravelAdminsPage/><Footer/></>;
  else if (isAgents) page = <><Header isAgents/><AgentsPage/><Footer/></>;
  else if (isContactUs) page = <><Header isContactUs/><ContactUsPage/><Footer/></>;
  else if (isCareers) page = <><Header isCareers/><CareersPage/><Footer/></>;
  else if (isResources) page = <><Header isResources/><ResourcesPage/><Footer/></>;
  else if (isProduct) page = <><Header isProduct/><ProductPage/><Footer/></>;
  else page = <><Header/><Hero/><TrustedBy/><HowCygnusWorks/><AgentsSection/><IndustriesSection/><ContactCta/><Footer/></>;

  return page;
}
