import logoSvg from '../assets/cygnus-logo.svg?raw';

export default function BrandLogo({ className = '' }) {
  return <span
    className={`brand-logo ${className}`.trim()}
    role="img"
    aria-label="Cygnus"
    dangerouslySetInnerHTML={{ __html: logoSvg }}
  />;
}
