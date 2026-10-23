import { useEffect, useRef } from 'react';
import logoUjjivan from '../assets/partners/ujjivan.png';
import logoHaier from '../assets/partners/haier.png';
import logoZomato from '../assets/partners/zomato.png';
import logoBeckPollitzer from '../assets/partners/beck_pollitzer.png';
import logoCeat from '../assets/partners/ceat.png';
import logoPaytmInsider from '../assets/partners/paytm_insider.png';
import logoArmstrong from '../assets/partners/armstrong.png';
import logoWtiCabs from '../assets/partners/wti_cabs.png';
import logoGits from '../assets/partners/gits.png';
import logoSakal from '../assets/partners/sakal.png';
import logoBajajAllianz from '../assets/partners/bajaj_allianz.png';
import logoCrescendo from '../assets/partners/crescendo_worldwide.png';
import logoFiat from '../assets/partners/fiat.png';
import logoKessebohmer from '../assets/partners/kessebohmer.png';
import logoTataElxsi from '../assets/partners/tata_elxsi.png';
import logoSerumInstitute from '../assets/partners/serum_institute.png';
import logoIncedo from '../assets/partners/incedo.png';
import logoIciciPrudential from '../assets/partners/icici_prudential.png';
import logoWhirlpool from '../assets/partners/whirlpool.png';
import logoDaikin from '../assets/partners/daikin.png';
import logoEnreap from '../assets/partners/enreap.png';
import logoMahaMetro from '../assets/partners/maha_metro.png';
import logoApptware from '../assets/partners/apptware.png';
import logoKotak from '../assets/partners/kotak.png';
import logoIciciBank from '../assets/partners/icici_bank.png';

const ROW_COUNT = 5;
const TILES_PER_ROW = 20;
const TILES_PER_COPY = TILES_PER_ROW / 2;
const ROW_SPEEDS = [26, 30, 28, 33, 27]; // pixels per second
const START_SCALE = 1.35;
const SCROLL_DISTANCE = 150; // vh
const MOBILE_START_SCALE = 1.15;
const MOBILE_SCROLL_DISTANCE = 100; // vh
const OUTER_ROW_OPACITY = 0.6;
const OUTER_ROW_BLUR = 4; // px
const MOBILE_BREAKPOINT = 640;
const LOGOS = [
  { name: 'Ujjivan Small Finance Bank', src: logoUjjivan },
  { name: 'Haier', src: logoHaier },
  { name: 'Zomato', src: logoZomato },
  { name: 'Beck & Pollitzer', src: logoBeckPollitzer },
  { name: 'CEAT', src: logoCeat },
  { name: 'Paytm Insider', src: logoPaytmInsider },
  { name: 'Armstrong', src: logoArmstrong },
  { name: 'WTI Cabs', src: logoWtiCabs },
  { name: 'Gits', src: logoGits },
  { name: 'Sakal', src: logoSakal },
  { name: 'Bajaj Allianz', src: logoBajajAllianz },
  { name: 'Crescendo Worldwide', src: logoCrescendo },
  { name: 'Fiat', src: logoFiat },
  { name: 'Kesseböhmer', src: logoKessebohmer },
  { name: 'Tata Elxsi', src: logoTataElxsi },
  { name: 'Serum Institute of India', src: logoSerumInstitute },
  { name: 'Incedo', src: logoIncedo },
  { name: 'ICICI Prudential Mutual Fund', src: logoIciciPrudential },
  { name: 'Whirlpool', src: logoWhirlpool },
  { name: 'Daikin', src: logoDaikin },
  { name: 'Enreap', src: logoEnreap },
  { name: 'Maha Metro', src: logoMahaMetro },
  { name: 'Apptware', src: logoApptware },
  { name: 'Kotak Mahindra Bank', src: logoKotak },
  { name: 'ICICI Bank', src: logoIciciBank },
];
const STARTS = [0, 4, 9, 14, 19];

function LogoTile({ logo, index }) {
  return <div className={`trusted-logo-tile${index % 7 === 3 ? ' is-dim' : ''}`}>
    <img className="trusted-logo-image" src={logo.src} alt={logo.name}/>
  </div>;
}

export default function TrustedBy() {
  const wrapperRef = useRef(null);
  const sectionRef = useRef(null);
  const rowRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    const wrapper = wrapperRef.current;
    if (!section || !wrapper) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let currentProgress = 0;
    let targetProgress = 0;
    let previousWidth = window.innerWidth;

    const setResponsiveValues = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT;
      const distance = mobile ? MOBILE_SCROLL_DISTANCE : SCROLL_DISTANCE;
      wrapper.style.height = reducedMotion.matches ? 'auto' : `calc(100vh + ${distance}vh)`;
      section.style.setProperty('--start-scale', mobile ? MOBILE_START_SCALE : START_SCALE);
      section.style.setProperty('--outer-row-opacity-target', OUTER_ROW_OPACITY);
      section.style.setProperty('--outer-row-blur-target', `${OUTER_ROW_BLUR}px`);
      previousWidth = window.innerWidth;
    };

    const updateTarget = () => {
      const viewportHeight = window.innerHeight;
      const wrapperTop = wrapper.getBoundingClientRect().top + window.scrollY;
      const scrollRange = Math.max(1, wrapper.offsetHeight - viewportHeight);
      targetProgress = reducedMotion.matches
        ? 1
        : Math.min(1, Math.max(0, (window.scrollY - wrapperTop) / scrollRange));
    };

    const animateProgress = () => {
      frame = 0;
      currentProgress += (targetProgress - currentProgress) * 0.1;
      if (Math.abs(targetProgress - currentProgress) < 0.001) currentProgress = targetProgress;

      const eased = 1 - Math.pow(1 - currentProgress, 3);
      const edgeProgress = Math.min(1, Math.max(0, (currentProgress - 0.3) / 0.7));
      const startScale = Number(section.style.getPropertyValue('--start-scale')) || START_SCALE;
      section.style.setProperty('--p', currentProgress.toFixed(4));
      section.style.setProperty('--zoom', (startScale + (1 - startScale) * eased).toFixed(4));
      section.style.setProperty('--outer-row-opacity', (OUTER_ROW_OPACITY * edgeProgress).toFixed(4));
      section.style.setProperty('--outer-row-blur', `${(OUTER_ROW_BLUR * (1 - edgeProgress)).toFixed(3)}px`);

      if (currentProgress !== targetProgress) frame = requestAnimationFrame(animateProgress);
    };

    const requestProgress = () => {
      updateTarget();
      if (!frame) frame = requestAnimationFrame(animateProgress);
    };

    const measureRows = () => {
      rowRefs.current.forEach((row, index) => {
        const copy = row?.querySelector('.trusted-logo-set');
        if (!copy) return;
        const width = copy.offsetWidth;
        row.style.setProperty('--duration', `${width / ROW_SPEEDS[index]}s`);
      });
    };

    measureRows();
    const resizeObserver = new ResizeObserver(measureRows);
    resizeObserver.observe(section);

    const onResize = () => {
      if (window.innerWidth !== previousWidth) setResponsiveValues();
      requestProgress();
      measureRows();
    };
    const onMotionChange = () => {
      if (reducedMotion.matches) {
        targetProgress = currentProgress = 1;
        cancelAnimationFrame(frame);
        frame = 0;
        section.style.setProperty('--p', '1');
        section.style.setProperty('--zoom', '1');
        section.style.setProperty('--outer-row-opacity', String(OUTER_ROW_OPACITY));
        section.style.setProperty('--outer-row-blur', '0px');
        wrapper.style.height = 'auto';
      } else {
        setResponsiveValues();
        currentProgress = 0;
        requestProgress();
      }
    };

    setResponsiveValues();
    if (reducedMotion.matches) {
      onMotionChange();
    } else {
      window.addEventListener('scroll', requestProgress, { passive: true });
      requestProgress();
    }
    window.addEventListener('resize', onResize);
    reducedMotion.addEventListener?.('change', onMotionChange);
    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener('scroll', requestProgress);
      window.removeEventListener('resize', onResize);
      reducedMotion.removeEventListener?.('change', onMotionChange);
    };
  }, []);

  return <div ref={wrapperRef} className="trusted-scroll-wrapper">
    <section ref={sectionRef} className="trusted-section" aria-label="Partners">
      <div className="trusted-heading">
        <div className="trusted-eyebrow">Trusted by Teams Across Industries</div>
        <p className="trusted-intro">Companies trust Cygnus to manage travel across teams, departments, and locations.</p>
      </div>
      <div className="trusted-rows">
        {Array.from({ length: ROW_COUNT }, (_, index) => {
          const start = STARTS[index];
          const logos = Array.from({ length: TILES_PER_COPY }, (_, offset) => LOGOS[(start + offset) % LOGOS.length]);
          return <div className={`trusted-marquee trusted-marquee-${index + 1}`} key={index} ref={el => { rowRefs.current[index] = el; }}>
            <div className="trusted-track">
              {[0, 1].map(copy => <div className="trusted-logo-set" key={copy} aria-hidden={copy === 1 || undefined}>
                {logos.map((logo, logoIndex) => <LogoTile key={`${copy}-${logoIndex}`} logo={logo} index={logoIndex} />)}
              </div>)}
            </div>
          </div>;
        })}
      </div>
    </section>
  </div>;
}
