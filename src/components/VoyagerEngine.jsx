import { useEffect, useRef, useState } from 'react';
import { mountVoyagerEngine } from './voyagerEngine3d.js';
import './VoyagerEngine.css';

const REDUCED = '(prefers-reduced-motion: reduce)';

/**
 * Voyager engine: a 3D gearbox that plays on scroll.
 * It pins in the middle of the screen, makes one full turn, then its parts slide apart.
 * People with reduced motion turned on see one still frame instead.
 *
 * theme: 'light' (navy lines, for light backgrounds) or 'dark' (white lines, for dark backgrounds)
 */
export default function VoyagerEngine({ theme = 'light' }) {
  const trackRef = useRef(null);
  const canvasRef = useRef(null);
  const [still, setStill] = useState(() => window.matchMedia(REDUCED).matches);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(REDUCED);
    const onChange = () => setStill(query.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    try {
      return mountVoyagerEngine(trackRef.current, canvasRef.current, { theme, still });
    } catch (error) {
      console.warn('Voyager engine: WebGL is not available, hiding the animation.', error);
      setFailed(true);
      return undefined;
    }
  }, [theme, still]);

  if (failed) return null;

  return (
    <div ref={trackRef} className={`voyager-engine-3d${still ? ' is-still' : ''}`}>
      <div className="voyager-engine-3d-stage">
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="The Voyager engine: a gearbox that turns and separates into its parts as you scroll"
        />
      </div>
    </div>
  );
}
