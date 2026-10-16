/**
 * Particle "forms" for the Cipher Core. Every generator returns N points (xyz) so any
 * form can morph into any other. Forms are roughly centred, ~4.4 units across.
 */
import * as THREE from "three";

type Rand = () => number;

function mulberry32(seed: number): Rand {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const gauss = (r: Rand) => {
  // Box–Muller, clamped
  const u = Math.max(1e-6, r());
  const v = r();
  return Math.max(-3, Math.min(3, Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)));
};

class Writer {
  out: Float32Array;
  i = 0;
  constructor(public n: number) {
    this.out = new Float32Array(n * 3);
  }
  push(x: number, y: number, z: number) {
    if (this.i >= this.n) return;
    const k = this.i * 3;
    this.out[k] = x;
    this.out[k + 1] = y;
    this.out[k + 2] = z;
    this.i++;
  }
  get full() {
    return this.i >= this.n;
  }
  /** Fill any remainder by repeating existing points (keeps counts equal). */
  finish(r: Rand) {
    const filled = Math.max(1, this.i);
    while (!this.full) {
      const k = Math.floor(r() * filled) * 3;
      this.push(this.out[k], this.out[k + 1], this.out[k + 2]);
    }
    return this.out;
  }
}

/* ─────────────── 2D raster sampling (for typographic / UI forms) ─────────────── */

type Draw = (ctx: CanvasRenderingContext2D, size: number) => void;

function rasterPoints(draw: Draw, size = 512): Float32Array {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d", { willReadFrequently: true })!;
  ctx.clearRect(0, 0, size, size);
  ctx.fillStyle = "#fff";
  ctx.strokeStyle = "#fff";
  draw(ctx, size);
  const data = ctx.getImageData(0, 0, size, size).data;
  const pts: number[] = [];
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      if (data[(y * size + x) * 4 + 3] > 120) pts.push(x, y);
    }
  }
  return new Float32Array(pts);
}

function sampleRaster(
  w: Writer,
  r: Rand,
  count: number,
  draw: Draw,
  opts: { scale?: number; depth?: number; size?: number } = {},
) {
  const size = opts.size ?? 512;
  const scale = opts.scale ?? 4.4;
  const depth = opts.depth ?? 0.12;
  const px = rasterPoints(draw, size);
  const total = px.length / 2;
  if (!total) return;
  for (let n = 0; n < count && !w.full; n++) {
    const k = Math.floor(r() * total) * 2;
    const x = ((px[k] + r()) / size - 0.5) * scale;
    const y = -((px[k + 1] + r()) / size - 0.5) * scale;
    w.push(x, y, (r() - 0.5) * depth);
  }
}

function transform(points: Float32Array, m: THREE.Matrix4) {
  const v = new THREE.Vector3();
  for (let i = 0; i < points.length; i += 3) {
    v.set(points[i], points[i + 1], points[i + 2]).applyMatrix4(m);
    points[i] = v.x;
    points[i + 1] = v.y;
    points[i + 2] = v.z;
  }
  return points;
}

const roundRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) => {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
};

const displayFont = () => {
  const v = getComputedStyle(document.documentElement).getPropertyValue("--font-archivo").trim();
  return v || "Arial Black, sans-serif";
};

/* ─────────────── Forms ─────────────── */

/** 0 · Core: faceted icosahedron crystal with the Z mark suspended inside. */
function core(n: number, seed = 1) {
  const r = mulberry32(seed);
  const w = new Writer(n);
  const geo = new THREE.IcosahedronGeometry(1.75, 0); // already non-indexed
  const pos = geo.getAttribute("position");
  const tris = pos.count / 3;
  const a = new THREE.Vector3();
  const b = new THREE.Vector3();
  const c = new THREE.Vector3();

  // Edges (bright wireframe feel)
  const nEdges = Math.floor(n * 0.3);
  for (let i = 0; i < nEdges; i++) {
    const t = Math.floor(r() * tris) * 3;
    const e = Math.floor(r() * 3);
    a.fromBufferAttribute(pos, t + e);
    b.fromBufferAttribute(pos, t + ((e + 1) % 3));
    const s = r();
    w.push(
      a.x + (b.x - a.x) * s + gauss(r) * 0.01,
      a.y + (b.y - a.y) * s + gauss(r) * 0.01,
      a.z + (b.z - a.z) * s + gauss(r) * 0.01,
    );
  }
  // Faces (sparse glassy fill)
  const nFaces = Math.floor(n * 0.35);
  for (let i = 0; i < nFaces; i++) {
    const t = Math.floor(r() * tris) * 3;
    a.fromBufferAttribute(pos, t);
    b.fromBufferAttribute(pos, t + 1);
    c.fromBufferAttribute(pos, t + 2);
    let u = r();
    let v = r();
    if (u + v > 1) {
      u = 1 - u;
      v = 1 - v;
    }
    w.push(
      a.x + (b.x - a.x) * u + (c.x - a.x) * v,
      a.y + (b.y - a.y) * u + (c.y - a.y) * v,
      a.z + (b.z - a.z) * u + (c.z - a.z) * v,
    );
  }
  // Z mark (same geometry as the SVG logo, viewBox 32)
  sampleRaster(
    w,
    r,
    n - w.i,
    (ctx, s) => {
      const k = s / 32;
      ctx.save();
      ctx.scale(k, k);
      ctx.translate(0.5, 0.5);
      ctx.fill(new Path2D("M5 6.5h19.5l2 2V11L12.2 23H27v3.5H7.5l-2-2V22L19.8 10H5z"));
      ctx.fillRect(27, 2, 3.2, 3.2);
      ctx.restore();
    },
    { scale: 1.9, depth: 0.35 },
  );
  geo.dispose();
  return w.finish(r);
}

/** 1 · AI Automations: a workflow DAG — nodes and edges flowing left → right. */
function graph(n: number) {
  const r = mulberry32(2);
  const w = new Writer(n);
  const layers = [3, 5, 5, 3];
  const nodes: THREE.Vector3[][] = layers.map((count, li) =>
    Array.from({ length: count }, (_, i) => {
      const x = -2.1 + li * 1.4;
      const y = (i - (count - 1) / 2) * 0.85 + (r() - 0.5) * 0.2;
      return new THREE.Vector3(x, y, (r() - 0.5) * 1.2);
    }),
  );
  const edges: [THREE.Vector3, THREE.Vector3][] = [];
  for (let li = 0; li < nodes.length - 1; li++) {
    nodes[li].forEach((a, i) => {
      const next = nodes[li + 1];
      const targets = new Set([i % next.length, Math.floor(r() * next.length), (i + 1) % next.length]);
      targets.forEach((t) => edges.push([a, next[t]]));
    });
  }
  const all = nodes.flat();
  const nNodes = Math.floor(n * 0.42);
  for (let i = 0; i < nNodes; i++) {
    const c = all[Math.floor(r() * all.length)];
    const rad = 0.13;
    // shell + core
    const d = new THREE.Vector3(gauss(r), gauss(r), gauss(r)).normalize().multiplyScalar(rad * (r() < 0.7 ? 1 : r()));
    w.push(c.x + d.x, c.y + d.y, c.z + d.z);
  }
  while (!w.full) {
    const [a, b] = edges[Math.floor(r() * edges.length)];
    const t = r();
    // gentle S-curve between nodes, like a node editor wire
    const e = t * t * (3 - 2 * t);
    w.push(
      a.x + (b.x - a.x) * t,
      a.y + (b.y - a.y) * e + gauss(r) * 0.008,
      a.z + (b.z - a.z) * t + gauss(r) * 0.008,
    );
  }
  return w.finish(r);
}

/** 2 · Voice Agents: a radial audio waveform ring. */
function wave(n: number) {
  const r = mulberry32(3);
  const w = new Writer(n);
  const bars = 120;
  const amp = Array.from({ length: bars }, (_, k) => {
    const v =
      Math.abs(Math.sin(k * 0.29) * Math.cos(k * 0.083) + 0.35 * Math.sin(k * 0.71)) * 0.9 + 0.08;
    return Math.min(1.1, v);
  });
  const R = 1.55;
  const nRing = Math.floor(n * 0.14);
  for (let i = 0; i < nRing; i++) {
    const th = r() * Math.PI * 2;
    const rr = (r() < 0.5 ? 0.95 : 0.62) * R + gauss(r) * 0.006;
    w.push(Math.cos(th) * rr, Math.sin(th) * rr, gauss(r) * 0.02);
  }
  while (!w.full) {
    const k = Math.floor(r() * bars);
    const th = (k / bars) * Math.PI * 2 + (r() - 0.5) * 0.012;
    const len = amp[k];
    const rr = R + (r() - 0.35) * len;
    w.push(Math.cos(th) * rr, Math.sin(th) * rr, (r() - 0.5) * 0.08);
  }
  return w.finish(r);
}

/** 3 · Websites: a browser window wireframe, tilted in space. */
function browser(n: number) {
  const r = mulberry32(4);
  const w = new Writer(n);
  sampleRaster(
    w,
    r,
    n,
    (ctx, s) => {
      const u = s / 100;
      ctx.lineWidth = 0.7 * u;
      roundRect(ctx, 4 * u, 18 * u, 92 * u, 64 * u, 3 * u);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(4 * u, 25 * u);
      ctx.lineTo(96 * u, 25 * u);
      ctx.stroke();
      [8, 11, 14].forEach((x) => {
        ctx.beginPath();
        ctx.arc(x * u, 21.5 * u, 0.9 * u, 0, Math.PI * 2);
        ctx.fill();
      });
      roundRect(ctx, 30 * u, 20 * u, 40 * u, 3 * u, 1.5 * u);
      ctx.stroke();
      // hero headline + copy
      ctx.fillRect(10 * u, 33 * u, 40 * u, 4 * u);
      ctx.fillRect(10 * u, 39 * u, 30 * u, 4 * u);
      ctx.fillRect(10 * u, 46 * u, 34 * u, 1 * u);
      ctx.fillRect(10 * u, 48.5 * u, 28 * u, 1 * u);
      roundRect(ctx, 10 * u, 53 * u, 12 * u, 4 * u, 2 * u);
      ctx.fill();
      // hero visual
      roundRect(ctx, 56 * u, 31 * u, 34 * u, 27 * u, 2 * u);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(73 * u, 44.5 * u, 7 * u, 0, Math.PI * 2);
      ctx.stroke();
      // cards
      [10, 37, 64].forEach((x) => {
        roundRect(ctx, x * u, 63 * u, 25 * u, 14 * u, 1.5 * u);
        ctx.stroke();
        ctx.fillRect((x + 3) * u, 67 * u, 12 * u, 1.4 * u);
      });
    },
    { scale: 4.8, depth: 0.06, size: 640 },
  );
  const out = w.finish(r);
  return transform(out, new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(0.12, -0.42, 0.02)));
}

/** 4 · Apps: a phone with a live app UI, plus a ghost screen behind it. */
function phone(n: number) {
  const r = mulberry32(5);
  const w = new Writer(n);
  const draw: Draw = (ctx, s) => {
    const u = s / 100;
    ctx.lineWidth = 0.8 * u;
    roundRect(ctx, 30 * u, 6 * u, 40 * u, 88 * u, 7 * u);
    ctx.stroke();
    roundRect(ctx, 44 * u, 9 * u, 12 * u, 2.6 * u, 1.3 * u);
    ctx.fill();
    // header
    ctx.fillRect(35 * u, 17 * u, 16 * u, 2.6 * u);
    ctx.beginPath();
    ctx.arc(63 * u, 18.3 * u, 2.4 * u, 0, Math.PI * 2);
    ctx.stroke();
    // balance card
    roundRect(ctx, 35 * u, 24 * u, 30 * u, 17 * u, 2.5 * u);
    ctx.stroke();
    ctx.fillRect(38 * u, 29 * u, 14 * u, 3 * u);
    // chart
    ctx.beginPath();
    ctx.moveTo(38 * u, 38 * u);
    [42, 46, 50, 54, 58, 62].forEach((x, i) => ctx.lineTo(x * u, (37 - [1, 4, 2, 6, 5, 8][i]) * u));
    ctx.stroke();
    // list rows
    for (let i = 0; i < 5; i++) {
      const y = 47 + i * 7.5;
      ctx.beginPath();
      ctx.arc(38 * u, (y + 2) * u, 2 * u, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillRect(42 * u, (y + 0.6) * u, 13 * u, 1.3 * u);
      ctx.fillRect(42 * u, (y + 2.8) * u, 8 * u, 0.8 * u);
      ctx.fillRect(58 * u, (y + 1.2) * u, 6 * u, 1.3 * u);
    }
    // tab bar
    ctx.fillRect(34 * u, 85 * u, 32 * u, 0.4 * u);
    [38, 46, 54, 62].forEach((x) => {
      ctx.beginPath();
      ctx.arc(x * u, 89 * u, 1.3 * u, 0, Math.PI * 2);
      ctx.fill();
    });
  };
  sampleRaster(w, r, Math.floor(n * 0.82), draw, { scale: 4.6, depth: 0.08, size: 640 });
  // ghost device behind, offset
  const ghostStart = w.i;
  sampleRaster(
    w,
    r,
    n - w.i,
    (ctx, s) => {
      const u = s / 100;
      ctx.lineWidth = 0.6 * u;
      roundRect(ctx, 30 * u, 6 * u, 40 * u, 88 * u, 7 * u);
      ctx.stroke();
    },
    { scale: 4.6, depth: 0.05, size: 512 },
  );
  for (let i = ghostStart; i < w.i; i++) {
    w.out[i * 3] += 0.9;
    w.out[i * 3 + 1] += 0.25;
    w.out[i * 3 + 2] -= 0.9;
  }
  const out = w.finish(r);
  return transform(out, new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(0.08, 0.5, -0.06)));
}

/** 5 · Branding: a monumental typographic glyph inside a construction circle. */
function glyph(n: number) {
  const r = mulberry32(6);
  const w = new Writer(n);
  const font = displayFont();
  sampleRaster(
    w,
    r,
    Math.floor(n * 0.82),
    (ctx, s) => {
      ctx.font = `800 ${s * 0.56}px ${font}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("Aa", s * 0.5, s * 0.53);
    },
    { scale: 4.6, depth: 0.5, size: 512 },
  );
  // construction geometry: circle + guides
  sampleRaster(
    w,
    r,
    n - w.i,
    (ctx, s) => {
      const u = s / 100;
      ctx.lineWidth = 0.35 * u;
      ctx.beginPath();
      ctx.arc(50 * u, 50 * u, 40 * u, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(4 * u, 50 * u);
      ctx.lineTo(96 * u, 50 * u);
      ctx.moveTo(50 * u, 4 * u);
      ctx.lineTo(50 * u, 96 * u);
      ctx.stroke();
    },
    { scale: 4.8, depth: 0.04 },
  );
  return w.finish(r);
}

/** 6 · Media & Ads: a curved film strip with frames. */
function film(n: number) {
  const r = mulberry32(7);
  const w = new Writer(n);
  sampleRaster(
    w,
    r,
    n,
    (ctx, s) => {
      const u = s / 100;
      ctx.lineWidth = 0.6 * u;
      const top = 34;
      const h = 32;
      ctx.strokeRect(1 * u, top * u, 98 * u, h * u);
      for (let x = 3; x < 98; x += 4.2) {
        ctx.fillRect(x * u, (top + 2) * u, 2 * u, 2.4 * u);
        ctx.fillRect(x * u, (top + h - 4.4) * u, 2 * u, 2.4 * u);
      }
      for (let f = 0; f < 4; f++) {
        const x = 3 + f * 24;
        roundRect(ctx, x * u, (top + 6.5) * u, 22 * u, (h - 13) * u, 1 * u);
        ctx.stroke();
      }
      // play triangle in frame 2
      ctx.beginPath();
      ctx.moveTo(35 * u, 45 * u);
      ctx.lineTo(35 * u, 55 * u);
      ctx.lineTo(43 * u, 50 * u);
      ctx.closePath();
      ctx.fill();
      // waveform in frame 3
      ctx.beginPath();
      for (let x = 0; x <= 18; x += 0.5) ctx.lineTo((53 + x) * u, (50 + Math.sin(x * 1.3) * 4 * Math.sin(x * 0.2)) * u);
      ctx.stroke();
      // headline bars in frame 4 (ad creative)
      ctx.fillRect(77 * u, 44 * u, 14 * u, 2.4 * u);
      ctx.fillRect(77 * u, 48.5 * u, 10 * u, 2.4 * u);
      roundRect(ctx, 77 * u, 53 * u, 7 * u, 3 * u, 1.5 * u);
      ctx.fill();
    },
    { scale: 6.2, depth: 0.06, size: 768 },
  );
  // bend onto a cylinder
  const out = w.finish(r);
  const R = 2.6;
  for (let i = 0; i < out.length; i += 3) {
    const x = out[i];
    const z = out[i + 2];
    const a = x / R;
    out[i] = Math.sin(a) * (R + z);
    out[i + 2] = Math.cos(a) * (R + z) - R;
  }
  return transform(out, new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(0.25, 0, -0.12)));
}

/** 7 · Influencer: a creator at the centre, audiences on orbits. */
function orbit(n: number) {
  const r = mulberry32(8);
  const w = new Writer(n);
  const sphere = (cx: THREE.Vector3, rad: number, count: number) => {
    for (let i = 0; i < count && !w.full; i++) {
      const d = new THREE.Vector3(gauss(r), gauss(r), gauss(r)).normalize().multiplyScalar(rad);
      w.push(cx.x + d.x, cx.y + d.y, cx.z + d.z);
    }
  };
  sphere(new THREE.Vector3(), 0.55, Math.floor(n * 0.22));
  const rings = [
    { R: 1.15, tilt: new THREE.Euler(1.2, 0.2, 0) },
    { R: 1.7, tilt: new THREE.Euler(1.35, -0.5, 0.3) },
    { R: 2.2, tilt: new THREE.Euler(1.05, 0.6, -0.2) },
  ];
  const sats: THREE.Vector3[] = [];
  rings.forEach((ring, ri) => {
    const m = new THREE.Matrix4().makeRotationFromEuler(ring.tilt);
    const count = Math.floor(n * 0.09);
    for (let i = 0; i < count; i++) {
      const th = r() * Math.PI * 2;
      const v = new THREE.Vector3(Math.cos(th) * ring.R, Math.sin(th) * ring.R, gauss(r) * 0.01).applyMatrix4(m);
      w.push(v.x, v.y, v.z);
    }
    const k = ri + 2;
    for (let s = 0; s < k; s++) {
      const th = (s / k) * Math.PI * 2 + ri;
      sats.push(new THREE.Vector3(Math.cos(th) * ring.R, Math.sin(th) * ring.R, 0).applyMatrix4(m));
    }
  });
  const perSat = Math.floor((n * 0.3) / sats.length);
  sats.forEach((s, i) => sphere(s, 0.12 + (i % 3) * 0.05, perSat));
  // links: creator → audience
  while (!w.full) {
    const s = sats[Math.floor(r() * sats.length)];
    const t = 0.25 + r() * 0.6;
    w.push(s.x * t + gauss(r) * 0.01, s.y * t + gauss(r) * 0.01, s.z * t);
  }
  return w.finish(r);
}

/** Shuffle point order so morph correspondences are random (cleaner burst → re-form). */
function shuffle(points: Float32Array, seed: number) {
  const r = mulberry32(seed);
  for (let i = points.length / 3 - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    for (let k = 0; k < 3; k++) {
      const t = points[i * 3 + k];
      points[i * 3 + k] = points[j * 3 + k];
      points[j * 3 + k] = t;
    }
  }
  return points;
}

export interface FormSet {
  forms: Float32Array[];
  rand: Float32Array;
}

/** Builds all 9 forms (core, 7 services, core). Order must match config/services.ts. */
export function buildForms(n: number): FormSet {
  const c = core(n);
  const forms = [c, graph(n), wave(n), browser(n), phone(n), glyph(n), film(n), orbit(n), core(n, 11)].map(
    (f, i) => shuffle(f, 1000 + i),
  );
  const r = mulberry32(99);
  const rand = new Float32Array(n);
  for (let i = 0; i < n; i++) rand[i] = r();
  return { forms, rand };
}
