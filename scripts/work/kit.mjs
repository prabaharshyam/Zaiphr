/**
 * Shared building blocks for portfolio renders: page shell, photos, device frames, backdrops.
 *
 * Photography comes from Unsplash (Unsplash License: free for commercial use, no attribution
 * required). Photos are downloaded once into scripts/work/.cache and referenced by file URL.
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { execFileSync } from "node:child_process";

export const ROOT = process.cwd();
export const CACHE = path.join(ROOT, "scripts/work/.cache");
fs.mkdirSync(path.join(CACHE, "photos"), { recursive: true });

export const fileUrl = (p) => pathToFileURL(p).href;

/** Unsplash photo by id (the part after "photo-"), cached locally at the given width. */
export async function photo(id, w = 1600) {
  const out = path.join(CACHE, "photos", `${id}-${w}.jpg`);
  if (!fs.existsSync(out)) {
    // curl rather than fetch: it honours HTTPS_PROXY and friends out of the box.
    execFileSync("curl", ["-sSfL", "-o", out, `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fm=jpg`]);
  }
  return fileUrl(out);
}

/** Resolves every {id: [photoId, width]} entry to a file URL. */
export async function photos(map) {
  const out = {};
  for (const [k, v] of Object.entries(map)) out[k] = await photo(...(Array.isArray(v) ? v : [v]));
  return out;
}

const noise = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>")`;

/** A full HTML document. `fonts` is a Google Fonts css2 family list, e.g. "Fraunces:wght@400;600". */
export const doc = ({ fonts = [], css = "", body, width }) => `<!doctype html><html><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
${fonts.length ? `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?${fonts.map((f) => `family=${f.replace(/ /g, "+")}`).join("&")}&display=block">` : ""}
<style>
*{box-sizing:border-box;margin:0;padding:0}
html{-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility}
img{display:block;max-width:100%}
a{color:inherit;text-decoration:none}
${width ? `html,body{width:${width}px;overflow:hidden}` : ""}
${css}
</style></head><body>${body}</body></html>`;

/* ───────────── Composition helpers (used inside a stage) ───────────── */

export const stageCss = `
.stage{position:relative;overflow:hidden}
.grain::after{content:"";position:absolute;inset:0;background-image:${noise};opacity:.07;mix-blend-mode:overlay;pointer-events:none;z-index:90}
.abs{position:absolute}
.shot{background-repeat:no-repeat;background-size:100% auto}
/* Browser window (Safari-style) */
.win{position:absolute;border-radius:14px;overflow:hidden;background:#fff;
  box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 0 0 1px rgba(0,0,0,.09),0 2px 4px rgba(0,0,0,.05),0 18px 40px -12px rgba(0,0,0,.25),0 70px 120px -40px rgba(0,0,0,.45)}
.win .bar{height:52px;display:flex;align-items:center;padding:0 20px;gap:9px;background:#f6f6f7;border-bottom:1px solid rgba(0,0,0,.08);font:500 13px -apple-system,'Inter',sans-serif;color:#555}
.win.dark .bar{background:#262628;border-color:rgba(255,255,255,.07);color:#aaa}
.win .tl{width:12px;height:12px;border-radius:50%}
.win .url{position:absolute;left:50%;transform:translateX(-50%);height:32px;min-width:360px;border-radius:9px;background:rgba(0,0,0,.055);display:flex;align-items:center;justify-content:center;gap:7px;padding:0 18px;font-size:13px}
.win.dark .url{background:rgba(255,255,255,.08)}
.win .view{position:relative;width:100%;background-repeat:no-repeat;background-size:100% auto}
/* iPhone-style phone */
.ph{position:absolute;border-radius:var(--r);padding:var(--b);background:linear-gradient(145deg,#3a3a3e,#111114 40%,#2c2c30 70%,#0c0c0e);
  box-shadow:0 0 0 1.5px #6b6b70 inset,0 0 0 1px rgba(0,0,0,.7),0 30px 60px -20px rgba(0,0,0,.45),0 80px 140px -50px rgba(0,0,0,.6)}
.ph::before,.ph::after{content:"";position:absolute;right:-3px;width:3px;border-radius:0 2px 2px 0;background:#2a2a2e}
.ph::before{top:24%;height:11%}.ph::after{top:16%;height:6%;left:-3px;right:auto;border-radius:2px 0 0 2px}
.ph .scr{position:relative;width:100%;height:100%;border-radius:calc(var(--r) - var(--b));overflow:hidden;background:#000}
.ph .img{position:absolute;inset:0;background-repeat:no-repeat;background-size:100% auto}
.ph .island{position:absolute;top:calc(var(--w) * .028);left:50%;transform:translateX(-50%);width:32%;height:calc(var(--w) * .085);background:#000;border-radius:999px;z-index:5}
.ph .glare{position:absolute;inset:0;background:linear-gradient(115deg,rgba(255,255,255,.10) 0%,rgba(255,255,255,0) 32%);pointer-events:none;z-index:6}
.sb{position:absolute;top:0;left:0;right:0;display:flex;justify-content:space-between;align-items:center;z-index:4;font-family:-apple-system,'Inter',sans-serif;font-weight:600}
`;

/**
 * A browser window showing part of a full-page screenshot.
 * src: file URL of a screenshot taken at `cssW` css px wide; y: css px to scroll to.
 */
export function win({ src, y = 0, left, top, w, h, url, dark = false, cssW = 1440, extra = "" }) {
  const scale = w / cssW;
  return `<div class="win ${dark ? "dark" : ""}" style="left:${left}px;top:${top}px;width:${w}px;${extra}">
  <div class="bar"><span class="tl" style="background:#ff5f57"></span><span class="tl" style="background:#febc2e"></span><span class="tl" style="background:#28c840"></span>
  <span class="url"><svg width="11" height="13" viewBox="0 0 11 13"><rect x="1" y="5.5" width="9" height="7" rx="1.6" fill="currentColor"/><path d="M3 5.5V4a2.5 2.5 0 015 0v1.5" stroke="currentColor" stroke-width="1.4" fill="none"/></svg>${url}</span></div>
  <div class="view" style="height:${h}px;background-image:url('${src}');background-position:0 ${-Math.round(y * scale)}px"></div></div>`;
}

/** A phone showing a mobile screenshot (taken 390 css px wide), scrolled to css y. */
export function phone({ src, y = 0, left, top, w = 380, rot = 0, statusColor = "#111", statusBg = "#fff", extra = "", z = 1 }) {
  const h = Math.round(w * 2.06);
  const b = Math.round(w * 0.04);
  const r = Math.round(w * 0.16);
  const inner = w - 2 * b;
  const scale = inner / 390;
  const sbH = Math.round(54 * scale);
  return `<div class="ph" style="--w:${w}px;--b:${b}px;--r:${r}px;left:${left}px;top:${top}px;width:${w}px;height:${h}px;transform:rotate(${rot}deg);z-index:${z};${extra}">
  <div class="scr">
    <div class="sb" style="height:${sbH}px;padding:0 ${Math.round(inner * 0.09)}px;font-size:${Math.round(inner * 0.041)}px;color:${statusColor};background:${statusBg}">
      <span>9:41</span><span style="display:flex;gap:${Math.round(inner * 0.015)}px;align-items:center">${signal(statusColor, inner)}${battery(statusColor, inner)}</span></div>
    <div class="img" style="top:${sbH}px;background-image:url('${src}');background-position:0 ${-Math.round(y * scale)}px"></div>
    <div class="island"></div><div class="glare"></div>
  </div></div>`;
}

const signal = (c, w) => {
  const s = w / 390;
  return `<svg width="${18 * s}" height="${12 * s}" viewBox="0 0 18 12"><g fill="${c}"><rect x="0" y="8" width="3" height="4" rx=".8"/><rect x="5" y="5.5" width="3" height="6.5" rx=".8"/><rect x="10" y="3" width="3" height="9" rx=".8"/><rect x="15" y="0" width="3" height="12" rx=".8"/></g></svg>`;
};
const battery = (c, w) => {
  const s = w / 390;
  return `<svg width="${27 * s}" height="${13 * s}" viewBox="0 0 27 13"><rect x=".5" y=".5" width="23" height="12" rx="3.5" fill="none" stroke="${c}" opacity=".4"/><rect x="2" y="2" width="18" height="9" rx="2" fill="${c}"/><rect x="25" y="4" width="2" height="5" rx="1" fill="${c}" opacity=".4"/></svg>`;
};

/** Soft gradient backdrop with optional light pool. */
export const backdrop = (bg, light = "rgba(255,255,255,.35)") =>
  `<div class="abs" style="inset:0;background:${bg}"></div><div class="abs" style="inset:0;background:radial-gradient(60% 55% at 30% 20%,${light},transparent 70%)"></div>`;

/** Blurred photo backdrop. */
export const photoBackdrop = (src, tint = "rgba(0,0,0,.35)", blur = 0) =>
  `<div class="abs" style="inset:${blur ? -40 : 0}px;background:url('${src}') center/cover;${blur ? `filter:blur(${blur}px) saturate(1.05)` : ""}"></div><div class="abs" style="inset:0;background:${tint}"></div>`;

/** Wraps a composition body into a stage document of the given size. */
export const stage = ({ w, h, fonts = [], css = "", body, grain = true }) =>
  doc({ width: w, fonts, css: `${stageCss}html,body{height:${h}px}.stage{width:${w}px;height:${h}px}${css}`, body: `<div class="stage ${grain ? "grain" : ""}">${body}</div>` });
