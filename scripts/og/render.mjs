/**
 * Captures link-preview (Open Graph) images from the real pages: public/og/<key>.jpg, 1200×630.
 *
 *   npm run build && npx next start -p 3100     # in another terminal
 *   node scripts/og/render.mjs http://localhost:3100 [key ...]
 *
 * Shots are taken at 2× and saved at 1200×630 (supersampled), with the chat button and
 * cookie notice hidden. Uses playwright-core with a local Chromium (set CHROMIUM_PATH if needed).
 */
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright-core";

const [base = "http://localhost:3100", ...only] = process.argv.slice(2);
const services = ["ai-automations", "ai-voice-agents", "websites", "mobile-web-apps", "branding-marketing", "media-ads", "influencer-marketing"];
const shots = {
  home: "/",
  about: "/about",
  services: "/services",
  ...Object.fromEntries(services.map((s) => [`service-${s}`, `/services/${s}`])),
  work: "/work",
  "use-cases": "/use-cases",
  tools: "/tools",
  "ai-stack-finder": "/tools/ai-stack-finder",
  "ai-tools": "/ai-tools",
  news: "/news",
  blog: "/blog",
  contact: "/contact",
};

const out = path.join(process.cwd(), "public/og");
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH ?? "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
  args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
});
const ctx = await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });
await ctx.addInitScript(() => {
  sessionStorage.setItem("zl-preloaded", "1");
  localStorage.setItem("zl-cookie-notice", "1");
});
const page = await ctx.newPage();
for (const [key, route] of Object.entries(shots)) {
  if (only.length && !only.includes(key)) continue;
  await page.goto(base + route, { waitUntil: "networkidle" });
  await page.addStyleTag({ content: `button[aria-controls="zl-chat"],[aria-label="Cookie notice"]{display:none!important}${key === "news" ? `section[aria-label="Stories"]{visibility:hidden}` : ""}` });
  await page.waitForTimeout(key === "home" || key.startsWith("service-") ? 4500 : 2500); // let reveals and the 3D scene settle
  await page.screenshot({ path: path.join(out, `${key}.jpg`), type: "jpeg", quality: 82, scale: "css" });
  console.log("✓", key);
}
fs.copyFileSync(path.join(out, "home.jpg"), path.join(out, "default.jpg"));
await browser.close();
