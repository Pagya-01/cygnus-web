import { useEffect, useRef, useState } from 'react';
import engineStill from '../assets/product/voyager-engine-stage.jpg';

// Figma "mech-stage" (1037863:5064 → 1038234:45247): exploded wireframe gearbox on a 16.8s loop.
// Coordinates are the Figma design space (1442×520); the stage is scaled to fit its container.
const src = name => `/engine/${name}`;

// Parts in Figma z-order. Layers: g = glass surface, b = bore & radial edges (inset %, top/bottom then left/right), m = surface mesh.
// `move` names the explode keyframe group (timing) and `dx` its distance in design px.
const parts = [
  { name: 'housing-lip', box: [357.24, 191.1, 44.741, 196.56], move: 'a', dx: -298, layers: [['b', '9d4a6', '9%', '7.11%'], ['m', '9df98']] },
  { name: 'input-housing-flange', box: [300.3, 182.52, 97.734, 213.72], move: 'a', dx: -298, layers: [['g', 'ed703'], ['b', 'c2f0a', '7.5%', '2.95%'], ['m', '9e4df']] },
  { name: 'end-housing-lobes', box: [258.96, 197.34, 64.116, 187.2], move: 'a', dx: -298, layers: [['g', '3b588'], ['b', '2f2f7', '15%', '7.88%'], ['m', '9b601', 10.14]] },
  { name: 'boss-1', box: [242.59, 326.82, 71.208, 67.813], move: 'a', dx: -298, boss: ['4854e', 179.4] },
  { name: 'boss-2', box: [243.33, 258.96, 70.775, 67.357], move: 'a', dx: -298, boss: ['459a8', 179.77] },
  { name: 'boss-3', box: [244.11, 189.55, 71.399, 68.013], move: 'a', dx: -298, boss: ['973ac', 179.24] },
  { name: 'sleeve-channel-1', box: [368.16, 344.76, 53.414, 28.08], move: 'b', dx: -237, layers: [['m', '3c251']] },
  { name: 'sleeve-channel-2', box: [368.16, 275.34, 53.414, 28.08], move: 'b', dx: -237, layers: [['m', '9297a']] },
  { name: 'sleeve-channel-3', box: [368.16, 205.92, 53.414, 28.08], move: 'b', dx: -237, layers: [['m', 'e4422']] },
  { name: 'input-sleeve', box: [354.9, 207.48, 116.064, 163.8], move: 'b', dx: -237, layers: [['g', 'aa49e'], ['b', '4c1ae', '25.5%', '6.48%'], ['m', 'eaaf7']] },
  { name: 'input-shaft', box: [460.2, 235.56, 61.495, 107.64], move: 'c', dx: -194, layers: [['g', '05d30'], ['b', 'ca9db', '38.5%', '12.13%'], ['m', 'e0dad']] },
  { name: 'shaft-coupling', box: [512.46, 258.96, 31.231, 60.84], move: 'd', dx: -174, layers: [['b', '37669', '28.5%', '9.99%'], ['m', 'f8a7f']] },
  { name: 'retaining-disc', box: [535.86, 202.02, 40.81, 174.72], move: 'e', dx: -162, layers: [['g', 'a503d'], ['b', '1290d', '24.23%', '28.9%'], ['m', '5a2c2']] },
  { name: 'bearing-race', box: [569.4, 209.82, 38.002, 159.12], move: 'f', dx: -144, layers: [['g', 'f1faa'], ['b', '0ed97', '21.69%', '18.08%'], ['m', '532f4']] },
  { name: 'spacer-ring', box: [589.68, 191.1, 43.181, 196.56], move: 'g', dx: -128, layers: [['b', '62c67', '9.5%', '7.79%'], ['m', '77fe0']] },
  { name: 'carrier-retaining-flange', box: [602.16, 181.74, 46.55, 215.28], move: 'g', dx: 33, layers: [['g', '42b7a'], ['b', 'ff487', '5%', '4.16%'], ['m', '76c75']] },
  { name: 'carrier-roller-1', box: [633.36, 320.58, 38.47, 96.72], move: 'g', dx: 33, layers: [['b', 'f6cf9', '12.5%', '5.66%'], ['m', '6a641']] },
  { name: 'carrier-roller-2', box: [633.36, 241.02, 38.47, 96.72], move: 'g', dx: 33, layers: [['b', '72564', '12.5%', '5.66%'], ['m', '20a15']] },
  { name: 'carrier-roller-3', box: [633.36, 161.46, 38.47, 96.72], move: 'g', dx: 33, layers: [['b', '9514d', '12.5%', '5.66%'], ['m', 'ee21c']] },
  { name: 'main-carrier', box: [648.96, 166.14, 113.568, 249.6], move: 'g', dx: 33, layers: [['g', '97949'], ['b', 'c6048', '11%', '4.35%'], ['m', '51cbc']] },
  { name: 'planet-gear-1', box: [758.16, 308.88, 33.353, 63.96], move: 'd', dx: 103, layers: [['b', 'd3568', '27.5%', '9.49%'], ['m', 'f5891', 0.27, 0.05]] },
  { name: 'planet-gear-2', box: [758.16, 257.4, 33.353, 63.96], move: 'd', dx: 103, layers: [['b', '8b249', '27.5%', '9.49%'], ['m', '641f4', 0.27, 0.05]] },
  { name: 'planet-gear-3', box: [758.16, 205.92, 33.353, 63.96], move: 'd', dx: 103, layers: [['b', 'd4e50', '27.5%', '9.49%'], ['m', '8626f', 0.27, 0.05]] },
  { name: 'output-gear', box: [754.26, 200.46, 56.191, 177.84], move: 'd', dx: 103, layers: [['g', 'b46ef'], ['b', 'a5092', '19%', '10.83%'], ['m', '07c49', 0, 0.06]] },
  { name: 'output-hub', box: [804.96, 218.4, 52.853, 141.96], move: 'b', dx: 166, layers: [['g', '3abdf'], ['b', '54306', '31%', '14.99%'], ['m', 'a45b9']] },
  { name: 'end-housing-inner-wall', box: [897, 188.76, 77.563, 201.24], move: 'a', dx: 243, layers: [['b', '06dc6', '14.5%', '6.77%'], ['m', 'ad9b6']] },
  { name: 'end-housing-flange', box: [842.4, 163.02, 71.23, 252.72], move: 'a', dx: 243, layers: [['g', 'b1134'], ['b', '602c6', '11.5%', '7.35%'], ['m', '2d158']] },
];

// End-face disc shown while the stage squashes: concentric rings, three bolts and 24 spokes.
const rings = [[0, 300, '915e6.svg'], [5.25, 289.5, '33725.png'], [12, 276, 'ec400.svg'], [31.5, 237, '52a4c.svg'], [49.5, 201, '6350d.svg'], [72, 156, 'c1a7b.svg'], [105, 90, 'c4171.svg'], [129, 42, '8aa18.svg'], [138, 24, 'be704.svg']];
const bolts = [[124.5, 63], [71.24, 155.25], [177.76, 155.25]];
const spokes = ['62ce5', '8a75c', 'dc254', '929c0', '753a5', 'c417f', '565fd', 'efad1', '21f6f', 'bfe19', 'fb2b5', 'a9954', '53c59', 'e05af', '2ab86', 'f8a1f', '0e3b1', 'a0b76', 'e48e1', '5f6bb', 'b59d5', 'ca532', '43d90', '2bd4b'];

const px = ([left, top, width, height]) => ({ left, top, width, height });

function Layer({ layer: [kind, file, a, b] }) {
  if (kind === 'b') return <span className="mech-layer" style={{ inset: `${a} ${b}` }}><img src={src(`${file}.svg`)} alt=""/></span>;
  // mesh layers may carry a small Figma offset: [top, left]
  return <img className="mech-layer" src={src(`${file}.svg`)} alt="" style={a || b ? { top: a || 0, left: b || 0 } : undefined}/>;
}

export default function VoyagerEngine() {
  const rootRef = useRef(null);
  const [reduced, setReduced] = useState(() => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const query = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(query.matches);
    query?.addEventListener?.('change', onChange);
    return () => query?.removeEventListener?.('change', onChange);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) return undefined;
    // scale the 1442px design stage to the container width
    const resize = new ResizeObserver(([entry]) => root.style.setProperty('--mech-scale', entry.contentRect.width / 1442));
    resize.observe(root);
    // only run the loop while the stage is on screen
    const visible = new IntersectionObserver(([entry]) => setPlaying(entry.isIntersecting), { threshold: 0.15 });
    visible.observe(root);
    return () => { resize.disconnect(); visible.disconnect(); };
  }, [reduced]);

  if (reduced) return <div className="pv-stage"><img src={engineStill} alt="" width="1440" height="520" decoding="async"/></div>;

  return <div className="pv-stage" aria-hidden="true"><div ref={rootRef} className={`mech${playing ? ' is-playing' : ''}`}>
    <div className="mech-canvas">
      <img className="mech-grid" src={src('6efb9.svg')} alt=""/>
      <div className="mech-light"/>
      <div className="mech-squash"><div className="mech-blink">
        <div className="mech-parts">
          {parts.map(({ name, box, move, dx, layers, boss }) => <div key={name} className={`mech-part mech-move-${move}`} style={{ ...px(box), '--dx': `${dx}px` }}>
            {boss
              ? <img className="mech-boss" src={src(`${boss[0]}.svg`)} alt="" style={{ transform: `translate(-50%, -50%) rotate(${boss[1]}deg)` }}/>
              : <div className="mech-clip">{layers.map(layer => <Layer key={layer[1]} layer={layer}/>)}</div>}
          </div>)}
        </div>
      </div></div>
      <div className="mech-face">
        <div className="mech-face-spin">
          <div className="mech-face-squash">
            {rings.map(([at, size, file]) => <img key={file} src={src(file)} alt="" style={{ left: at, top: at, width: size, height: size }}/>)}
            {bolts.map(([x, y]) => <span className="mech-bolt" key={`${x}-${y}`} style={{ left: x, top: y }}>
              <img src={src('d0ed5.png')} alt="" style={{ left: 0, top: 0, width: 51, height: 51 }}/>
              <img src={src('bfbea.svg')} alt="" style={{ left: 5.1, top: 5.1, width: 40.8, height: 40.8 }}/>
              <img src={src('85530.svg')} alt="" style={{ left: 17.34, top: 17.34, width: 16.32, height: 16.32 }}/>
            </span>)}
            {spokes.map((file, k) => <img key={file} className="mech-spoke" src={src(`${file}.svg`)} alt="" style={{ transform: `rotate(${-15 * k}deg)` }}/>)}
          </div>
        </div>
      </div>
      <img className="mech-logo-glow" src={src('c5294.svg')} alt=""/>
      <div className="mech-logo"><img src={src('6e047.svg')} alt=""/></div>
      <div className="mech-fade mech-fade-left"/>
      <div className="mech-fade mech-fade-right"/>
    </div>
  </div></div>;
}
