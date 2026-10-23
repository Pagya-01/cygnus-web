import { useEffect, useRef } from 'react';

// Live version of the Figma "Illustration / Globe wireframe": orthographic world-atlas 110m,
// centred on the Indian Ocean, countries 0.6px, sphere 1.5px. Drawn in the artwork's 492×212 space.
const W = 492;
const H = 212;
const START = [-78, 12]; // rotation that reproduces the Figma artwork
const DEGREES_PER_SECOND = 6; // one full turn per minute
const STROKE = '#858F9F';

export default function ContactGlobe() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let cancelled = false;
    let frame = 0;
    let visible = false;
    let last = 0;
    let longitude = START[0];
    let draw = () => {};
    let resize;
    let observer;

    const tick = now => {
      frame = 0;
      if (last) longitude += ((now - last) / 1000) * DEGREES_PER_SECOND;
      last = now;
      draw();
      if (visible && !reducedMotion.matches) frame = requestAnimationFrame(tick);
    };
    const play = () => { if (!frame && visible && !reducedMotion.matches) { last = 0; frame = requestAnimationFrame(tick); } };
    const stop = () => { cancelAnimationFrame(frame); frame = 0; };

    Promise.all([
      import('d3-geo'),
      import('topojson-client'),
      import('world-atlas/countries-110m.json'),
    ]).then(([{ geoOrthographic, geoPath }, topojson, atlas]) => {
      if (cancelled) return;
      const world = atlas.default ?? atlas;
      const borders = topojson.mesh(world, world.objects.countries);
      const projection = geoOrthographic().scale(221.7).translate([246, 246.7]).precision(0.3);
      const ctx = canvas.getContext('2d');
      const path = geoPath(projection, ctx);

      draw = () => {
        const scale = canvas.width / W;
        ctx.setTransform(scale, 0, 0, scale, 0, 0);
        ctx.clearRect(0, 0, W, H);
        projection.rotate([longitude, START[1]]);
        ctx.strokeStyle = STROKE;
        ctx.beginPath(); path(borders); ctx.lineWidth = 0.6; ctx.globalAlpha = 1; ctx.stroke();
        ctx.beginPath(); path({ type: 'Sphere' }); ctx.lineWidth = 1.5; ctx.globalAlpha = 0.8; ctx.stroke();
        ctx.globalAlpha = 1;
      };

      const fit = () => {
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(canvas.clientWidth * ratio);
        canvas.height = Math.round(canvas.clientWidth * (H / W) * ratio);
        draw();
      };
      resize = new ResizeObserver(fit);
      resize.observe(canvas);
      fit();

      // spin only while the globe is on screen
      observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) play(); else stop(); });
      observer.observe(canvas);
    });

    const onMotionChange = () => { if (reducedMotion.matches) stop(); else play(); };
    reducedMotion.addEventListener?.('change', onMotionChange);
    return () => {
      cancelled = true;
      stop();
      resize?.disconnect();
      observer?.disconnect();
      reducedMotion.removeEventListener?.('change', onMotionChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="contact-globe-canvas" width={W} height={H}/>;
}
