import { useEffect } from 'react';

const MAX_TILT = 8; // degrees at the card edge
const REST = '1 0 0 0deg';

// 3D hover tilt: cards matching `selector` inside `ref` lift, scale up and tilt toward the cursor.
// Uses the individual `rotate`/`scale` properties (not `transform`), so it stacks on top of any
// existing transform-based reveal animation. Perspective is set on the card's parent and centred
// on the hovered card, so every card tilts around its own middle.
// Pass { tilt: false } for a flat hover: the card only zooms slightly, with no 3D tilt or glare.
export default function useTilt(ref, selector, { tilt = true } = {}) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!canHover || reducedMotion) return undefined;

    const cleanups = [...root.querySelectorAll(selector)].map(card => {
      const parent = card.parentElement;
      card.classList.add('tilt-card');
      if (!tilt) card.classList.add('tilt-flat');
      else parent.style.perspective = '1000px';
      const move = event => {
        if (!tilt) return;
        const box = card.getBoundingClientRect();
        const x = (event.clientX - box.left) / box.width;
        const y = (event.clientY - box.top) / box.height;
        const tiltX = (0.5 - y) * MAX_TILT * 2; // around the horizontal axis
        const tiltY = (x - 0.5) * MAX_TILT * 2; // around the vertical axis
        const angle = Math.hypot(tiltX, tiltY);
        card.style.setProperty('--tilt-rotate', angle < 0.01 ? REST : `${(tiltX / angle).toFixed(3)} ${(tiltY / angle).toFixed(3)} 0 ${angle.toFixed(2)}deg`);
        card.style.setProperty('--glare-x', `${(x * 100).toFixed(1)}%`);
        card.style.setProperty('--glare-y', `${(y * 100).toFixed(1)}%`);
      };
      const enter = () => {
        const box = card.getBoundingClientRect();
        const area = parent.getBoundingClientRect();
        parent.style.perspectiveOrigin = `${box.left - area.left + box.width / 2}px ${box.top - area.top + box.height / 2}px`;
        card.classList.add('is-tilting');
      };
      const leave = () => {
        card.classList.remove('is-tilting');
        card.style.setProperty('--tilt-rotate', REST);
      };
      card.addEventListener('pointerenter', enter);
      card.addEventListener('pointermove', move);
      card.addEventListener('pointerleave', leave);
      return () => {
        card.removeEventListener('pointerenter', enter);
        card.removeEventListener('pointermove', move);
        card.removeEventListener('pointerleave', leave);
        card.classList.remove('tilt-card', 'tilt-flat', 'is-tilting');
        card.style.removeProperty('--tilt-rotate');
        parent.style.perspective = '';
        parent.style.perspectiveOrigin = '';
      };
    });
    return () => cleanups.forEach(cleanup => cleanup());
  }, [ref, selector, tilt]);
}
