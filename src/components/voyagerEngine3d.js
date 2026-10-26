/**
 * Voyager engine — a 3D wireframe gearbox that plays on scroll (three.js).
 *
 * Markup it expects (VoyagerEngine.jsx renders this):
 *   track  : tall element; its extra height is the scroll distance the animation plays over
 *   stage  : `position: sticky` box inside the track (pins while the track scrolls past)
 *   canvas : fills the stage
 *
 * Scroll progress through the track (0 → 1) drives everything:
 *   0.08 – 0.58  one full 360° turn of the whole machine
 *   0.50 – 0.66  the machine grows to full size
 *   0.66 – 0.94  the parts slide apart along the axis
 *
 * mountVoyagerEngine(track, canvas, { theme: 'light' | 'dark', still: false }) → destroy()
 *   theme : 'light' = navy lines for light backgrounds, 'dark' = white lines for dark backgrounds
 *   still : true draws one still frame (parts apart) and does not animate, for reduced motion
 */
import * as THREE from 'three';

const THEMES = {
  light: { line: 0x17263e, faceFrom: 0xdfe3ea, faceTo: 0xf6f7fa, lineFrom: .72, lineTo: .86, ghostFrom: .05, ghostTo: .09 },
  dark:  { line: 0xffffff, faceFrom: 0x5c5c5b, faceTo: 0x1c1c1b, lineFrom: .80, lineTo: .90, ghostFrom: .05, ghostTo: .12 },
};

const TAU = Math.PI * 2;
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const seg = (p, a, b) => clamp((p - a) / (b - a));
const ease = x => (x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const lerp = (a, b, t) => a + (b - a) * t;

export function mountVoyagerEngine(track, canvas, { theme = 'light', still = false } = {}) {
  const T = THEMES[theme] || THEMES.light;
  const stage = canvas.parentElement;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 400);

  // orient (portrait screens: stand the machine upright) -> root (turn + scale) -> axis (model axis along local Z)
  const orient = new THREE.Group(), root = new THREE.Group(), axis = new THREE.Group();
  axis.rotation.y = Math.PI / 2;
  scene.add(orient); orient.add(root); root.add(axis);

  // ---------- materials: one set per part
  const baseFace = new THREE.MeshBasicMaterial({ color: T.faceFrom, transparent: true, opacity: 1, side: THREE.DoubleSide,
    polygonOffset: true, polygonOffsetFactor: 1, polygonOffsetUnits: 1 });
  const baseLine = new THREE.LineBasicMaterial({ color: T.line, transparent: true, opacity: T.lineFrom });
  const baseGhost = new THREE.LineBasicMaterial({ color: T.line, transparent: true, opacity: T.ghostFrom, depthTest: false, depthWrite: false });

  const makePart = () => {
    const g = new THREE.Group();
    g.userData.m = { face: baseFace.clone(), line: baseLine.clone(), ghost: baseGhost.clone() };
    return g;
  };
  const add = (part, geo, thr = 14) => {
    const m = part.userData.m;
    part.add(new THREE.Mesh(geo, m.face));
    const e = new THREE.EdgesGeometry(geo, thr);
    part.add(new THREE.LineSegments(e, m.line));
    const ghost = new THREE.LineSegments(e, m.ghost); ghost.renderOrder = 5; part.add(ghost);
  };
  const lines = (part, pts) => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    part.add(new THREE.LineSegments(g, part.userData.m.line));
  };
  const circle = (part, r, z, n = 72, cx = 0, cy = 0) => {
    const p = [];
    for (let i = 0; i < n; i++) {
      const a = i / n * TAU, b = (i + 1) / n * TAU;
      p.push(cx + r * Math.cos(a), cy + r * Math.sin(a), z, cx + r * Math.cos(b), cy + r * Math.sin(b), z);
    }
    lines(part, p);
  };
  const spokes = (part, r0, r1, z, n) => {
    const p = [];
    for (let i = 0; i < n; i++) { const a = i / n * TAU; p.push(r0 * Math.cos(a), r0 * Math.sin(a), z, r1 * Math.cos(a), r1 * Math.sin(a), z); }
    lines(part, p);
  };

  // ---------- geometry helpers (axis = Z)
  const cyl = (r, len, segs = 48, open = false, z = 0, rTop = r) => {
    const g = new THREE.CylinderGeometry(rTop, r, len, segs, 1, open);
    g.rotateX(Math.PI / 2); g.translate(0, 0, z); return g;
  };
  const gear = (r, teeth, depth, holeR = 0, toothH = r * .1, z = 0) => {
    const s = new THREE.Shape(), ri = r - toothH, a = TAU / teeth;
    for (let i = 0; i < teeth; i++) {
      const a0 = i * a;
      [[ri, a0], [r, a0 + a * .22], [r, a0 + a * .5], [ri, a0 + a * .72]].forEach(([rr, aa], j) => {
        const x = rr * Math.cos(aa), y = rr * Math.sin(aa);
        if (i === 0 && j === 0) s.moveTo(x, y); else s.lineTo(x, y);
      });
    }
    s.closePath();
    if (holeR > 0) { const h = new THREE.Path(); h.absarc(0, 0, holeR, 0, TAU, true); s.holes.push(h); }
    const g = new THREE.ExtrudeGeometry(s, { depth, bevelEnabled: false, curveSegments: 28 });
    g.translate(0, 0, z - depth / 2); return g;
  };
  const ring = (r0, r1, z, segs = 72) => { const g = new THREE.RingGeometry(r0, r1, segs); g.translate(0, 0, z); return g; };
  const radial = (geo, angle, R, z) => { // geo built along +Y -> point it outward at `angle`
    geo.rotateZ(angle - Math.PI / 2); geo.translate(R * Math.cos(angle), R * Math.sin(angle), z); return geo;
  };

  // ---------- the machine, left to right
  const parts = [];
  const P = (span, dir, build) => { const p = makePart(); p.userData.span = span; p.userData.dir = dir; build(p); axis.add(p); parts.push(p); };

  P(1.3, 1, p => { // 1. toothed drum
    add(p, gear(1.9, 64, .86, .5, .14));
    add(p, gear(1.74, 64, .18, 1.22, .1, -.53));
    add(p, cyl(1.3, .14, 64, false, -.56), 4);
    add(p, cyl(.5, .5, 32, false, -.62), 8);
    spokes(p, .52, 1.2, -.64, 18); circle(p, .82, -.64); circle(p, 1.02, -.64);
  });
  P(1.0, -1, p => { // 2. lugged hub
    add(p, cyl(1.12, .9, 8));
    for (let i = 0; i < 8; i++) add(p, radial(new THREE.BoxGeometry(.44, .36, .9), i / 8 * TAU + TAU / 16, 1.22, 0));
    add(p, cyl(1.46, .12, 64, false, .46), 4);
    circle(p, .7, -.46, 48);
  });
  P(.75, 1, p => { // 3. hex coupling
    add(p, cyl(.72, .5, 6));
    add(p, cyl(.5, .2, 32, false, -.35), 8);
    add(p, cyl(.3, .25, 24, false, .36), 8);
  });
  P(1.6, -1, p => { // 4. input shaft with small gears and a disc
    add(p, cyl(.15, 2.2, 16));
    add(p, gear(.55, 14, .28, .15, .07, -.6));
    add(p, gear(1.05, 48, .06, .2, .06, -.2));
    add(p, gear(.82, 22, .22, .15, .08, .15));
    add(p, gear(.42, 10, .26, .12, .06, .55));
  });
  P(.6, 1, p => { // 5. thin spur gear
    add(p, gear(1.5, 56, .14, .32, .1, -.15));
    add(p, cyl(.34, .6, 24, false, .15), 8);
  });
  P(2.1, -1, p => { // 6. ring-gear drum with six planet gears around a sun gear
    add(p, cyl(1.95, 2.0, 72, true), 3);
    add(p, cyl(1.72, 2.0, 72, true), 3);
    add(p, ring(1.72, 1.95, -1.0), 3); add(p, ring(1.72, 1.95, 1.0), 3);
    add(p, cyl(2.02, .16, 72, false, -.55), 3); add(p, cyl(2.02, .16, 72, false, .55), 3);
    for (let i = 0; i < 6; i++) {
      const a = i / 6 * TAU, cx = 1.12 * Math.cos(a), cy = 1.12 * Math.sin(a);
      const g = gear(.5, 14, 1.5, .12, .08); g.translate(cx, cy, 0); add(p, g);
      circle(p, .2, -.76, 20, cx, cy);
    }
    add(p, gear(.52, 14, 1.7, .15, .08));
    add(p, cyl(1.6, .06, 64, false, .86), 4);
  });
  P(.85, 1, p => { // 7. carrier gear
    add(p, gear(1.5, 44, .8, .95, .12));
    add(p, cyl(.95, .8, 48, true), 4);
    add(p, cyl(.6, .9, 24), 8);
  });
  P(1.95, -1, p => { // 8. bell housing with bevel lobes
    add(p, cyl(1.9, .14, 64, false, -.85), 4);
    const prof = [[1.55, -.78], [1.62, -.45], [1.5, 0], [1.2, .45], [.75, .7], [.5, .72]].map(([r, y]) => new THREE.Vector2(r, y));
    const lathe = new THREE.LatheGeometry(prof, 40); lathe.rotateX(Math.PI / 2); add(p, lathe, 10);
    for (let i = 0; i < 8; i++) add(p, radial(new THREE.ConeGeometry(.34, .55, 12), i / 8 * TAU, 1.55, -.1));
    for (let i = 0; i < 8; i++) add(p, radial(new THREE.CylinderGeometry(.22, .22, .4, 12), i / 8 * TAU + TAU / 16, 1.35, .35));
    add(p, cyl(.5, .45, 24, false, .92), 8);
    spokes(p, .5, 1.5, -.92, 16);
  });

  const layout = explode => {
    const gap = lerp(.08, 1.05, explode);
    const total = parts.reduce((s, p) => s + p.userData.span, 0) + gap * (parts.length - 1);
    let z = -total / 2;
    for (const p of parts) { p.position.z = z + p.userData.span / 2; z += p.userData.span + gap; }
    return total;
  };
  const EXPLODED = layout(1);

  // ---------- fit the machine (fully apart) inside the stage
  const resize = () => {
    const W = Math.max(1, stage.clientWidth), H = Math.max(1, stage.clientHeight);
    const portrait = W / H < .85;
    renderer.setSize(W, H, false);
    camera.aspect = W / H; camera.updateProjectionMatrix();
    orient.rotation.z = portrait ? Math.PI / 2 : 0;
    const t = Math.tan(camera.fov * Math.PI / 360), len = EXPLODED + 1.2, dia = 4.6;
    const dist = portrait
      ? Math.max(len / (2 * t * .86), dia / (2 * t * camera.aspect * .82))
      : Math.max(len / (2 * t * camera.aspect * .86), dia / (2 * t * .8));
    camera.position.set(0, dist * .02, dist); camera.lookAt(0, 0, 0);
  };

  // ---------- scroll progress through the track (0 → 1)
  const progress = () => {
    if (still) return 1;
    const r = track.getBoundingClientRect();
    const stickTop = parseFloat(getComputedStyle(stage).top) || 0;
    const span = r.height - stage.offsetHeight;
    return span > 0 ? clamp((stickTop - r.top) / span) : 1;
  };

  const faceFrom = new THREE.Color(T.faceFrom), faceTo = new THREE.Color(T.faceTo), face = new THREE.Color();
  const clock = new THREE.Clock();
  const frame = () => {
    const p = progress(), time = still ? 0 : clock.getElapsedTime();
    const spin = ease(seg(p, .08, .58));          // one full 360° turn
    const tone = ease(seg(p, .2, .58));           // face colour shift during the turn
    const explode = ease(seg(p, .66, .94));       // parts slide apart
    const s = lerp(.7, 1, ease(seg(p, .5, .66)));  // grow to full size

    root.rotation.y = .12 * (1 - spin) + spin * TAU;
    root.rotation.x = Math.sin(spin * Math.PI) * .22 + .05;
    root.scale.setScalar(s);
    layout(explode);

    face.copy(faceFrom).lerp(faceTo, tone);
    parts.forEach((part, i) => {
      const m = part.userData.m;
      m.face.color.copy(face);
      m.line.opacity = lerp(T.lineFrom, T.lineTo, tone);
      m.ghost.opacity = lerp(T.ghostFrom, T.ghostTo, tone);
      part.rotation.z = part.userData.dir * (p * 2.4 + time * .06) * (i % 2 ? 1.3 : 1);
    });
    renderer.render(scene, camera);
  };

  // ---------- run only while the section is on (or near) the screen
  let raf = 0, visible = true;
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { rootMargin: '200px' });
  io.observe(track);
  const loop = () => { if (visible) frame(); raf = requestAnimationFrame(loop); };
  const onResize = () => { resize(); frame(); };
  window.addEventListener('resize', onResize);
  resize(); frame();
  if (!still) raf = requestAnimationFrame(loop);

  return function destroy() {
    cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener('resize', onResize);
    scene.traverse(o => { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose(); });
    renderer.dispose();
  };
}
