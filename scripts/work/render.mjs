/**
 * Renders portfolio imagery into public/work/<slug>/.
 *
 *   node scripts/work/render.mjs                 # every project
 *   node scripts/work/render.mjs zohrae fynly    # some projects
 *   node scripts/work/render.mjs --fresh         # re-take cached screenshots (and re-capture live sites)
 *
 * Each project module in scripts/work/projects/ returns:
 *   screens: pages to screenshot, either our own HTML (`html`) or a live site (`url`)
 *   comps:   compositions (device frames, boards) that place those screenshots; each becomes a JPEG
 * Screenshots are cached in scripts/work/.cache/screens/<slug>/. Needs network for photos, fonts
 * and live sites. Uses playwright-core with a local Chromium (set CHROMIUM_PATH if needed).
 */
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright-core";
import { CACHE, ROOT, fileUrl } from "./kit.mjs";

const args = process.argv.slice(2);
const fresh = args.includes("--fresh");
const only = args.filter((a) => !a.startsWith("--"));
const projectsDir = path.join(ROOT, "scripts/work/projects");
const slugs = fs.readdirSync(projectsDir).filter((f) => f.endsWith(".mjs")).map((f) => f.replace(/\.mjs$/, ""));

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH ?? "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
  args: ["--allow-file-access-from-files", "--use-gl=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
});
const tmp = path.join(CACHE, "tmp.html");

async function shoot(slug, s) {
  const dir = path.join(CACHE, "screens", slug);
  fs.mkdirSync(dir, { recursive: true });
  const out = path.join(dir, `${s.name}.png`);
  if (fs.existsSync(out) && !fresh) return fileUrl(out);
  const mobile = s.width < 600;
  const ctx = await browser.newContext({
    viewport: { width: s.width ?? 1440, height: s.height ?? 900 },
    deviceScaleFactor: s.dpr ?? (mobile ? 3 : 2),
    isMobile: mobile,
    hasTouch: mobile,
    userAgent: mobile
      ? "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1"
      : undefined,
  });
  const page = await ctx.newPage();
  if (s.url) {
    await page.goto(s.url, { waitUntil: "networkidle", timeout: 90_000 }).catch(() => {});
    await page.waitForTimeout(3500);
    for (const sel of s.click ?? []) {
      const el = await page.$(sel);
      if (el) await el.click().catch(() => {});
      await page.waitForTimeout(3000);
    }
    if (s.scroll) {
      await page.evaluate((y) => window.scrollTo(0, y), s.scroll);
      await page.waitForTimeout(s.settle ?? 2500);
    }
  } else {
    fs.writeFileSync(tmp, s.html);
    await page.goto(fileUrl(tmp), { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
  }
  await page.screenshot({ path: out, fullPage: !!s.fullPage });
  await ctx.close();
  console.log("  screen", s.name);
  return fileUrl(out);
}

for (const slug of slugs) {
  if (only.length && !only.includes(slug)) continue;
  console.log("▸", slug);
  const project = await (await import(path.join(projectsDir, `${slug}.mjs`))).default();
  const shots = {};
  for (const s of project.screens) shots[s.name] = await shoot(slug, s);
  // Screens that embed earlier screenshots (e.g. a marketing page showing the app).
  for (const s of (await project.after?.(shots)) ?? []) shots[s.name] = await shoot(slug, s);

  const outDir = path.join(ROOT, "public/work", slug);
  fs.mkdirSync(outDir, { recursive: true });
  const page = await browser.newPage();
  for (const c of project.comps) {
    await page.setViewportSize({ width: c.w, height: c.h });
    fs.writeFileSync(tmp, c.html(shots));
    await page.goto(fileUrl(tmp), { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(200);
    await page.screenshot({ path: path.join(outDir, c.file), type: "jpeg", quality: c.quality ?? 84 });
    console.log("  ✓", c.file);
  }
  await page.close();
}

fs.rmSync(tmp, { force: true });
await browser.close();
