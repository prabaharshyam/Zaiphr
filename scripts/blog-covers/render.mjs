/**
 * Renders blog cover images into public/blog/<slug>/cover.jpg (1600×900).
 *
 *   node scripts/blog-covers/render.mjs            # all posts
 *   node scripts/blog-covers/render.mjs my-post    # one
 *
 * Each category has its own motif; the slug seeds small variations so no two covers match.
 * Uses playwright-core with a local Chromium (set CHROMIUM_PATH if needed).
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import matter from "gray-matter";
import { chromium } from "playwright-core";

const root = process.cwd();
const url = (p) => pathToFileURL(path.join(root, p)).href;
const only = process.argv.slice(2);

const fontCss = `
@font-face{font-family:'Archivo';font-weight:100 900;font-stretch:62% 125%;src:url(${url("app/fonts/Archivo-Variable.woff2")})}
@font-face{font-family:'Geist Mono';src:url(${url("node_modules/geist/dist/fonts/geist-mono/GeistMono-Variable.woff2")})}`;

/** Small deterministic PRNG from the slug. */
function rng(seed) {
  let h = 2166136261;
  for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return () => ((h = Math.imul(h ^ (h >>> 15), 2246822507) ^ Math.imul(h ^ (h >>> 13), 3266489909)) >>> 0) / 4294967296;
}

const LIME = "#C8FF2E";

const motifs = {
  // Orbits with nodes - "intelligence" around a core
  "AI for Business": (r) => {
    const rings = [120, 200, 285, 370];
    let s = `<circle cx="0" cy="0" r="46" fill="${LIME}"/><circle cx="0" cy="0" r="80" fill="none" stroke="${LIME}" stroke-opacity=".35"/>`;
    rings.forEach((rad, i) => {
      s += `<circle cx="0" cy="0" r="${rad}" fill="none" stroke="#EDEEF2" stroke-opacity="${0.16 - i * 0.025}" ${i % 2 ? 'stroke-dasharray="3 9"' : ""}/>`;
      const n = 2 + Math.floor(r() * 3);
      for (let k = 0; k < n; k++) {
        const a = r() * Math.PI * 2;
        const x = Math.cos(a) * rad, y = Math.sin(a) * rad;
        s += `<line x1="0" y1="0" x2="${x}" y2="${y}" stroke="${LIME}" stroke-opacity=".12"/><circle cx="${x}" cy="${y}" r="${4 + r() * 7}" fill="${k === 0 ? LIME : "#EDEEF2"}" fill-opacity="${k === 0 ? 1 : 0.7}"/>`;
      }
    });
    return s;
  },
  // Workflow nodes and connectors
  Automation: (r) => {
    const cols = [-300, -100, 100, 300];
    let s = "";
    const nodes = cols.map((x, i) => {
      const count = i === 0 || i === 3 ? 1 : 2 + Math.floor(r() * 2);
      return Array.from({ length: count }, (_, k) => ({ x, y: (k - (count - 1) / 2) * 150 + (r() - 0.5) * 30 }));
    });
    for (let i = 0; i < nodes.length - 1; i++)
      for (const a of nodes[i]) for (const b of nodes[i + 1]) {
        const mx = (a.x + b.x) / 2;
        s += `<path d="M${a.x + 60} ${a.y} C ${mx} ${a.y}, ${mx} ${b.y}, ${b.x - 60} ${b.y}" fill="none" stroke="${LIME}" stroke-opacity=".38" stroke-width="2"/>`;
      }
    nodes.flat().forEach((n, i) => {
      const hot = i === 0 || i === nodes.flat().length - 1;
      s += `<rect x="${n.x - 60}" y="${n.y - 34}" width="120" height="68" rx="18" fill="${hot ? LIME : "#11131A"}" stroke="${hot ? LIME : "#EDEEF2"}" stroke-opacity="${hot ? 1 : 0.22}"/>`;
      s += `<rect x="${n.x - 38}" y="${n.y - 6}" width="${40 + r() * 36}" height="6" rx="3" fill="${hot ? "#0A0D02" : "#EDEEF2"}" fill-opacity="${hot ? 0.7 : 0.3}"/>`;
      s += `<rect x="${n.x - 38}" y="${n.y + 8}" width="${24 + r() * 24}" height="6" rx="3" fill="${hot ? "#0A0D02" : "#EDEEF2"}" fill-opacity="${hot ? 0.45 : 0.16}"/>`;
    });
    return s;
  },
  // Browser + phone wireframes
  "Websites & Apps": (r) => {
    const bars = (x, y, w, n) =>
      Array.from({ length: n }, (_, i) => `<rect x="${x}" y="${y + i * 26}" width="${w * (0.45 + r() * 0.5)}" height="10" rx="5" fill="#EDEEF2" fill-opacity="${0.22 - i * 0.03}"/>`).join("");
    return `
      <g transform="translate(-340 -230)">
        <rect width="560" height="400" rx="22" fill="#0E1017" stroke="#EDEEF2" stroke-opacity=".2"/>
        <rect width="560" height="44" rx="22" fill="#151821"/><rect y="22" width="560" height="22" fill="#151821"/>
        ${[24, 46, 68].map((x) => `<circle cx="${x}" cy="22" r="6" fill="#EDEEF2" fill-opacity=".25"/>`).join("")}
        <rect x="40" y="86" width="${260 + r() * 80}" height="34" rx="8" fill="#EDEEF2" fill-opacity=".85"/>
        <rect x="40" y="132" width="${200 + r() * 60}" height="34" rx="8" fill="#EDEEF2" fill-opacity=".85"/>
        ${bars(40, 196, 300, 3)}
        <rect x="40" y="290" width="150" height="44" rx="22" fill="${LIME}"/>
        <rect x="360" y="86" width="160" height="250" rx="16" fill="${LIME}" fill-opacity=".1" stroke="${LIME}" stroke-opacity=".5"/>
      </g>
      <g transform="translate(120 -150)">
        <rect width="230" height="440" rx="38" fill="#0B0C11" stroke="#EDEEF2" stroke-opacity=".3" stroke-width="2"/>
        <rect x="85" y="14" width="60" height="16" rx="8" fill="#EDEEF2" fill-opacity=".2"/>
        <rect x="22" y="56" width="186" height="150" rx="16" fill="${LIME}" fill-opacity=".85"/>
        ${bars(22, 230, 170, 4)}
        <rect x="22" y="352" width="186" height="46" rx="23" fill="#EDEEF2" fill-opacity=".9"/>
      </g>`;
  },
  // Rising bars and a growth curve
  "Marketing & Growth": (r) => {
    let s = "";
    const n = 9;
    const pts = [];
    for (let i = 0; i < n; i++) {
      const x = -380 + i * 95;
      const h = 70 + i * 32 + r() * 60;
      pts.push([x + 30, 250 - h - 30]);
      s += `<rect x="${x}" y="${250 - h}" width="60" height="${h}" rx="12" fill="${i === n - 1 ? LIME : "#EDEEF2"}" fill-opacity="${i === n - 1 ? 1 : 0.1 + i * 0.03}"/>`;
    }
    s += `<polyline points="${pts.map((p) => p.join(",")).join(" ")}" fill="none" stroke="${LIME}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`;
    const [lx, ly] = pts[pts.length - 1];
    s += `<circle cx="${lx}" cy="${ly}" r="12" fill="${LIME}"/><circle cx="${lx}" cy="${ly}" r="28" fill="none" stroke="${LIME}" stroke-opacity=".4"/>`;
    s += `<line x1="-400" y1="252" x2="420" y2="252" stroke="#EDEEF2" stroke-opacity=".2"/>`;
    return s;
  },
};

function cover({ title, category }, slug) {
  const r = rng(slug);
  const motif = (motifs[category] ?? motifs["AI for Business"])(r);
  const glowX = 1050 + r() * 250, glowY = 300 + r() * 300;
  const size = title.length > 60 ? 70 : title.length > 42 ? 80 : 92;
  return `<!doctype html><html><head><style>${fontCss}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1600px;height:900px;overflow:hidden;background:#05060A}
.stage{position:relative;width:1600px;height:900px;overflow:hidden;color:#EDEEF2;font-family:'Archivo',sans-serif}
.grid{position:absolute;inset:0;background-image:linear-gradient(rgba(237,238,242,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(237,238,242,.045) 1px,transparent 1px);background-size:80px 80px;mask-image:radial-gradient(ellipse at 70% 50%,#000 30%,transparent 75%)}
.glow{position:absolute;width:900px;height:900px;left:${glowX - 450}px;top:${glowY - 450}px;border-radius:50%;background:radial-gradient(circle,rgba(200,255,46,.16),transparent 62%)}
.art{position:absolute;right:-40px;top:0;width:1000px;height:900px}
.copy{position:absolute;left:96px;top:96px;bottom:96px;width:760px;display:flex;flex-direction:column}
.mono{font-family:'Geist Mono',monospace;font-size:20px;letter-spacing:.16em;text-transform:uppercase;color:#8A90A2}
.chip{align-self:flex-start;margin-top:auto;margin-bottom:28px;font-family:'Geist Mono',monospace;font-size:19px;letter-spacing:.14em;text-transform:uppercase;background:#C8FF2E;color:#0A0D02;padding:10px 18px;border-radius:999px}
h1{font-weight:800;font-stretch:100%;font-size:${size}px;line-height:1.02;letter-spacing:-.035em;text-wrap:balance}
.foot{margin-top:40px;display:flex;align-items:center;gap:14px}
.dot{width:10px;height:10px;background:#C8FF2E}
.brand{font-weight:800;font-stretch:125%;font-size:26px;letter-spacing:.02em}
.fade{position:absolute;inset:0;background:linear-gradient(90deg,#05060A 38%,rgba(5,6,10,.6) 55%,transparent 75%)}
</style></head><body><div class="stage">
<div class="grid"></div><div class="glow"></div>
<svg class="art" viewBox="-500 -450 1000 900">${motif}</svg>
<div class="fade"></div>
<div class="copy">
  <p class="mono">Zaiphr Labs · Field notes</p>
  <span class="chip">${category}</span>
  <h1>${title.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</h1>
  <div class="foot"><span class="brand">ZAIPHR</span><span class="dot"></span><span class="mono" style="font-size:17px">zaiphr.in/blog</span></div>
</div>
</div></body></html>`;
}

const dir = path.join(root, "content/blog");
const posts = fs
  .readdirSync(dir)
  .filter((f) => f.endsWith(".mdx"))
  .map((f) => ({ slug: f.replace(/\.mdx$/, ""), ...matter(fs.readFileSync(path.join(dir, f), "utf8")).data }))
  .filter((p) => !only.length || only.includes(p.slug));

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH ?? "/opt/pw-browsers/chromium-1194/chrome-linux/chrome", args: ["--allow-file-access-from-files"] });
const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
const tmp = path.join(root, ".blog-cover-tmp.html");
for (const p of posts) {
  fs.writeFileSync(tmp, cover(p, p.slug));
  await page.goto(pathToFileURL(tmp).href, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(100);
  const out = path.join(root, "public/blog", p.slug);
  fs.mkdirSync(out, { recursive: true });
  await page.screenshot({ path: path.join(out, "cover.jpg"), type: "jpeg", quality: 86 });
  console.log("✓", p.slug);
}
fs.rmSync(tmp, { force: true });
await browser.close();
