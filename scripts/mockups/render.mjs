/**
 * Renders concept-project cover images into public/work/<slug>/cover.jpg.
 *
 *   node scripts/mockups/render.mjs            # all
 *   node scripts/mockups/render.mjs fynly      # one
 *
 * Uses playwright-core with a local Chromium (set CHROMIUM_PATH if needed).
 */
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright-core";
import { templates } from "./templates.mjs";

const only = process.argv.slice(2);
const executablePath = process.env.CHROMIUM_PATH ?? "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
const browser = await chromium.launch({ executablePath, args: ["--allow-file-access-from-files"] });
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1.25 });
const tmp = path.join(process.cwd(), ".mockup-tmp.html");

for (const [slug, render] of Object.entries(templates)) {
  if (only.length && !only.includes(slug)) continue;
  fs.writeFileSync(tmp, render());
  await page.goto("file://" + tmp, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(150);
  const dir = path.join(process.cwd(), "public/work", slug);
  fs.mkdirSync(dir, { recursive: true });
  await page.screenshot({ path: path.join(dir, "cover.jpg"), type: "jpeg", quality: 84 });
  console.log("✓", slug);
}

fs.rmSync(tmp, { force: true });
await browser.close();
