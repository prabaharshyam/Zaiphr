/**
 * HTML compositions for concept-project covers (1600×1000).
 * Every brand, name and number here is fictional and illustrative.
 */
import path from "node:path";
import { pathToFileURL } from "node:url";

const nm = (p) => pathToFileURL(path.join(process.cwd(), "node_modules", p)).href;
const app = (p) => pathToFileURL(path.join(process.cwd(), p)).href;

export const fontCss = `
@font-face{font-family:'DM Sans';font-weight:400;src:url(${nm("@fontsource/dm-sans/files/dm-sans-latin-400-normal.woff2")})}
@font-face{font-family:'DM Sans';font-weight:500;src:url(${nm("@fontsource/dm-sans/files/dm-sans-latin-500-normal.woff2")})}
@font-face{font-family:'DM Sans';font-weight:700;src:url(${nm("@fontsource/dm-sans/files/dm-sans-latin-700-normal.woff2")})}
@font-face{font-family:'Fraunces';font-weight:400;src:url(${nm("@fontsource/fraunces/files/fraunces-latin-400-normal.woff2")})}
@font-face{font-family:'Fraunces';font-weight:600;src:url(${nm("@fontsource/fraunces/files/fraunces-latin-600-normal.woff2")})}
@font-face{font-family:'Fraunces';font-weight:700;src:url(${nm("@fontsource/fraunces/files/fraunces-latin-700-normal.woff2")})}
@font-face{font-family:'Space Grotesk';font-weight:500;src:url(${nm("@fontsource/space-grotesk/files/space-grotesk-latin-500-normal.woff2")})}
@font-face{font-family:'Space Grotesk';font-weight:700;src:url(${nm("@fontsource/space-grotesk/files/space-grotesk-latin-700-normal.woff2")})}
@font-face{font-family:'Instrument Serif';font-weight:400;src:url(${nm("@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2")})}
@font-face{font-family:'Instrument Serif';font-style:italic;font-weight:400;src:url(${nm("@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2")})}
@font-face{font-family:'Archivo';font-weight:100 900;font-stretch:62% 125%;src:url(${app("app/fonts/Archivo-Variable.woff2")})}
@font-face{font-family:'Geist Mono';src:url(${nm("geist/dist/fonts/geist-mono/GeistMono-Variable.woff2")})}
`;

const noise = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.55'/></svg>")`;

export const baseCss = `
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1600px;height:1000px;overflow:hidden}
body{font-family:'DM Sans',sans-serif;-webkit-font-smoothing:antialiased;color:#111}
.stage{position:relative;width:1600px;height:1000px;overflow:hidden}
.stage::after{content:"";position:absolute;inset:0;background-image:${noise};opacity:.09;mix-blend-mode:overlay;pointer-events:none;z-index:50}
.abs{position:absolute}
.phone{position:absolute;width:330px;height:680px;border-radius:56px;background:#0b0b0d;padding:11px;
  box-shadow:0 60px 120px -30px rgba(0,0,0,.55),0 0 0 1.5px rgba(255,255,255,.1) inset,0 0 0 1px rgba(0,0,0,.6)}
.phone .screen{width:100%;height:100%;border-radius:46px;overflow:hidden;position:relative}
.phone .island{position:absolute;top:13px;left:50%;transform:translateX(-50%);width:100px;height:30px;background:#000;border-radius:20px;z-index:5}
.status{display:flex;justify-content:space-between;padding:18px 30px 0;font:600 14px 'DM Sans';height:50px}
.browser{position:absolute;border-radius:18px;overflow:hidden;box-shadow:0 70px 140px -30px rgba(0,0,0,.5),0 0 0 1px rgba(0,0,0,.06)}
.browser .bar{height:46px;display:flex;align-items:center;gap:8px;padding:0 18px;background:#ececef;border-bottom:1px solid rgba(0,0,0,.06)}
.browser .bar.dark{background:#1a1a1d;border-color:rgba(255,255,255,.06)}
.dot{width:12px;height:12px;border-radius:50%;background:#d0d0d4}
.bar .d1{background:#ff5f57}.bar .d2{background:#febc2e}.bar .d3{background:#28c840}
.url{margin-left:28px;width:420px;height:28px;border-radius:9px;background:rgba(255,255,255,.9);font:500 12px 'DM Sans';color:#666;display:flex;align-items:center;padding:0 14px;gap:8px}
.bar.dark .url{background:#2a2a2e;color:#999}
.card{position:absolute;border-radius:22px;box-shadow:0 40px 80px -24px rgba(0,0,0,.4)}
.mono{font-family:'Geist Mono',monospace;letter-spacing:.06em;text-transform:uppercase}
.pill{display:inline-flex;align-items:center;gap:6px;border-radius:999px;padding:6px 12px;font:600 12px 'DM Sans'}
`;

const page = (css, body) =>
  `<!doctype html><html><head><meta charset="utf-8"><style>${fontCss}${baseCss}${css}</style></head><body><div class="stage">${body}</div></body></html>`;

const browserBar = (url, dark = false) =>
  `<div class="bar ${dark ? "dark" : ""}"><span class="dot d1"></span><span class="dot d2"></span><span class="dot d3"></span><span class="url">🔒 ${url}</span></div>`;

const status = (color = "#111") => `<div class="status" style="color:${color}"><span>9:41</span><span>●●● ▮</span></div>`;

/* ───────────── 1. Pearlline Dental - AI voice receptionist ───────────── */
const pearlline = () =>
  page(
    `
.stage{background:radial-gradient(1200px 800px at 75% 30%,#d9f4ef 0%,#9fdcd2 35%,#2bb3a3 75%,#0f6f66 100%)}
.ring{position:absolute;border-radius:50%;border:1.5px solid rgba(255,255,255,.35)}
.callscreen{background:linear-gradient(180deg,#0e2b29 0%,#0a1f1e 100%);color:#e9fffb}
.wave{display:flex;align-items:center;gap:4px;height:80px;justify-content:center}
.wave i{display:block;width:5px;border-radius:4px;background:#5ee6d4}
.bubble{max-width:240px;padding:12px 15px;border-radius:18px;font-size:14px;line-height:1.4;margin-bottom:10px}
`,
    `
<div class="ring" style="width:900px;height:900px;left:780px;top:50px"></div>
<div class="ring" style="width:680px;height:680px;left:890px;top:160px;border-style:dashed;opacity:.6"></div>
<div class="abs" style="left:90px;top:96px;color:#073b37">
  <div style="display:flex;align-items:center;gap:12px;font:700 22px 'DM Sans'"><span style="width:36px;height:36px;border-radius:12px;background:#073b37;display:grid;place-items:center;color:#d9f4ef;font-size:20px">◡</span>Pearlline Dental</div>
  <div style="font:400 92px/0.95 'Fraunces';letter-spacing:-.03em;margin-top:70px;width:640px">Every call,<br/><em style="font-style:italic;color:#0f6f66">answered.</em></div>
  <div style="font:500 20px/1.5 'DM Sans';margin-top:28px;width:470px;color:#0b4e48">Meet Pearl - the AI receptionist that books, reschedules and reminds, 24/7.</div>
  <div style="display:flex;gap:10px;margin-top:34px">
    <span class="pill" style="background:#073b37;color:#d9f4ef">● Live on 3 clinics</span>
    <span class="pill" style="background:rgba(255,255,255,.6);color:#073b37">English · हिंदी · ಕನ್ನಡ</span>
  </div>
</div>
<div class="phone" style="left:930px;top:150px;transform:rotate(-4deg)"><div class="island"></div><div class="screen callscreen">
  ${status("#e9fffb")}
  <div style="text-align:center;margin-top:34px">
    <div style="width:84px;height:84px;border-radius:50%;margin:0 auto;background:radial-gradient(circle at 35% 30%,#7af0de,#14857a);box-shadow:0 0 50px rgba(94,230,212,.6)"></div>
    <div style="font:700 22px 'DM Sans';margin-top:16px">Pearl · AI Receptionist</div>
    <div class="mono" style="font-size:11px;color:#5ee6d4;margin-top:6px">● Live call · 01:42</div>
  </div>
  <div class="wave" style="margin-top:14px">${[18, 34, 52, 30, 64, 42, 72, 38, 56, 26, 46, 66, 34, 50, 22, 40, 28].map((h) => `<i style="height:${h}px"></i>`).join("")}</div>
  <div style="padding:16px 18px 0">
    <div class="bubble" style="background:#173d3a;margin-left:auto;border-bottom-right-radius:6px">Hi, can I get a cleaning this Saturday morning?</div>
    <div class="bubble" style="background:#5ee6d4;color:#06302c;border-bottom-left-radius:6px">Of course! I have 10:30 or 12:00 at Indiranagar with Dr. Mehra. Which works?</div>
    <div class="bubble" style="background:#173d3a;margin-left:auto;border-bottom-right-radius:6px">10:30 please.</div>
  </div>
  <div style="position:absolute;bottom:34px;left:0;right:0;display:flex;justify-content:center;gap:26px">
    <span style="width:58px;height:58px;border-radius:50%;background:#173d3a;display:grid;place-items:center;font-size:20px">🔇</span>
    <span style="width:58px;height:58px;border-radius:50%;background:#ff4d4d;display:grid;place-items:center;font-size:20px">✆</span>
  </div>
</div></div>
<div class="card" style="left:1250px;top:520px;width:300px;padding:22px;background:#fff">
  <div class="mono" style="font-size:11px;color:#0f6f66">✓ Appointment booked</div>
  <div style="font:700 22px 'DM Sans';margin-top:10px;color:#062a27">Sat, 10:30 AM</div>
  <div style="font:500 14px 'DM Sans';color:#557;margin-top:4px">Scaling & polishing · Dr. A. Mehra</div>
  <div style="display:flex;gap:8px;margin-top:16px"><span class="pill" style="background:#e3f7f3;color:#0f6f66">Calendar ✓</span><span class="pill" style="background:#e9fbe7;color:#1f7a2e">WhatsApp sent</span></div>
</div>
<div class="card" style="left:780px;top:690px;width:250px;padding:18px 20px;background:rgba(255,255,255,.88)">
  <div class="mono" style="font-size:10px;color:#0f6f66">Today</div>
  <div style="display:flex;align-items:baseline;gap:8px;margin-top:6px"><span style="font:700 40px 'DM Sans';color:#062a27">47</span><span style="font:500 14px 'DM Sans';color:#557">calls answered</span></div>
  <div style="height:6px;border-radius:6px;background:#d6efea;margin-top:10px"><div style="width:100%;height:100%;border-radius:6px;background:#2bb3a3"></div></div>
  <div style="font:500 12px 'DM Sans';color:#557;margin-top:8px">0 missed · 31 booked</div>
</div>
`,
  );

/* ───────────── 2. Noor & Dew - D2C skincare storefront ───────────── */
const bottle = (x, y, h, c1, c2, cap, rot = 0, label = "") => `
<div class="abs" style="left:${x}px;top:${y}px;transform:rotate(${rot}deg)">
  <div style="width:${h * 0.18}px;height:${h * 0.16}px;margin:0 auto;border-radius:6px 6px 2px 2px;background:${cap}"></div>
  <div style="width:${h * 0.42}px;height:${h * 0.84}px;border-radius:${h * 0.08}px ${h * 0.08}px ${h * 0.12}px ${h * 0.12}px;background:linear-gradient(100deg,${c1} 0%,${c2} 55%,${c1} 100%);box-shadow:inset -12px 0 24px rgba(0,0,0,.12),inset 10px 0 18px rgba(255,255,255,.35),0 30px 50px -20px rgba(80,40,20,.45);display:flex;align-items:center;justify-content:center">
    <div style="width:70%;padding:10px 0;background:rgba(255,250,242,.9);border-radius:4px;text-align:center;font:600 ${Math.max(9, h * 0.035)}px 'Fraunces';color:#5a3420;letter-spacing:.04em">${label}</div>
  </div>
</div>`;
const noor = () =>
  page(
    `.stage{background:linear-gradient(135deg,#f6ede1 0%,#efdcc6 55%,#e2b996 100%)}`,
    `
<div class="abs" style="width:900px;height:900px;border-radius:50%;left:-200px;top:300px;background:radial-gradient(circle,#ffd9a8 0%,rgba(255,217,168,0) 65%)"></div>
<div class="browser" style="left:120px;top:90px;width:1360px;height:820px;background:#fbf6ef">
  ${browserBar("noordew.in/rituals/morning-glow")}
  <div style="display:flex;justify-content:space-between;align-items:center;padding:26px 54px;font:500 15px 'DM Sans';color:#5a3420">
    <div style="display:flex;gap:30px"><span>Rituals</span><span>Shop all</span><span>Ingredients</span><span>Journal</span></div>
    <div style="font:600 30px 'Fraunces';letter-spacing:.02em;color:#3d2214">Noor <em style="font-weight:400">&</em> Dew</div>
    <div style="display:flex;gap:22px;align-items:center"><span>Search</span><span>Account</span><span class="pill" style="background:#3d2214;color:#fbf6ef">Bag · 2</span></div>
  </div>
  <div style="display:grid;grid-template-columns:1.05fr 1fr;height:520px;margin:0 54px;border-radius:26px;overflow:hidden;background:linear-gradient(160deg,#f3d3b2 0%,#e7a978 60%,#c66b3d 100%);position:relative">
    <div style="padding:64px 0 0 60px;color:#3d2214">
      <div class="mono" style="font-size:12px;opacity:.75">The Morning Glow ritual · 3 steps</div>
      <div style="font:400 76px/0.98 'Fraunces';letter-spacing:-.03em;margin-top:22px">Skin that glows<br/>at <em>golden hour.</em></div>
      <div style="font:500 18px/1.55 'DM Sans';margin-top:24px;width:430px;color:#5a3420">Kumkumadi, niacinamide and sea-buckthorn - a clean routine for dull, tired skin. Dermatologist reviewed.</div>
      <div style="display:flex;gap:14px;margin-top:34px;align-items:center">
        <span class="pill" style="background:#3d2214;color:#fbf6ef;padding:16px 26px;font-size:15px">Shop the ritual - ₹1,890</span>
        <span style="font:600 15px 'DM Sans';text-decoration:underline;text-underline-offset:5px">Find my routine →</span>
      </div>
    </div>
    <div style="position:relative">
      <div class="abs" style="width:360px;height:360px;border-radius:50%;left:110px;top:70px;background:radial-gradient(circle,#ffe7c4,rgba(255,231,196,0) 70%)"></div>
      ${bottle(110, 130, 300, "#e8c39e", "#fff1de", "#3d2214", -6, "GLOW SERUM")}
      ${bottle(285, 90, 360, "#b8592c", "#e39a6a", "#3d2214", 3, "KUMKUMADI OIL")}
      ${bottle(450, 200, 250, "#f7e7d3", "#ffffff", "#b8592c", 8, "DEW CREAM")}
    </div>
  </div>
  <div style="display:flex;gap:18px;margin:26px 54px 0">
    ${["Cleanse", "Treat", "Hydrate", "Protect"].map((s, i) => `<div style="flex:1;background:#f1e4d3;border-radius:16px;padding:16px 18px;display:flex;justify-content:space-between;align-items:center;font:600 15px 'DM Sans';color:#3d2214"><span><span class="mono" style="font-size:10px;opacity:.6">Step 0${i + 1}</span><br/>${s}</span><span style="width:34px;height:34px;border-radius:50%;background:#fbf6ef;display:grid;place-items:center">→</span></div>`).join("")}
  </div>
</div>
<div class="card" style="left:1290px;top:640px;width:250px;padding:18px;background:#3d2214;color:#fbf6ef">
  <div class="mono" style="font-size:10px;opacity:.7">Checkout</div>
  <div style="font:600 18px 'DM Sans';margin-top:8px">Pay with UPI</div>
  <div style="display:flex;gap:6px;margin-top:12px">${["GPay", "PhonePe", "Paytm"].map((x) => `<span class="pill" style="background:rgba(255,255,255,.12);color:#fbf6ef;font-size:11px">${x}</span>`).join("")}</div>
  <div style="font:500 12px 'DM Sans';opacity:.7;margin-top:12px">Saved address · 1-tap reorder</div>
</div>
`,
  );

/* ───────────── 3. Skyhaven Realty - WhatsApp qualifier + CRM ───────────── */
const lead = (name, meta, score, hot) => `
<div style="background:#fff;border-radius:14px;padding:14px;margin-bottom:12px;box-shadow:0 6px 16px -8px rgba(11,31,58,.25)">
  <div style="display:flex;justify-content:space-between;align-items:center"><span style="font:700 15px 'DM Sans';color:#0b1f3a">${name}</span><span class="pill" style="padding:4px 9px;font-size:11px;background:${hot ? "#fff3cf" : "#eef1f6"};color:${hot ? "#8a6a00" : "#5a6b85"}">${score}</span></div>
  <div style="font:500 12px 'DM Sans';color:#6b7a90;margin-top:6px">${meta}</div>
</div>`;
const skyhaven = () =>
  page(
    `.stage{background:radial-gradient(1000px 700px at 20% 20%,#1b3a66 0%,#0b1f3a 55%,#06111f 100%)}
.col{flex:1;background:#eef1f6;border-radius:16px;padding:14px}
.colh{display:flex;justify-content:space-between;font:700 13px 'DM Sans';color:#0b1f3a;margin-bottom:12px}
.msg{max-width:235px;padding:10px 13px;border-radius:12px;font:500 13.5px/1.4 'DM Sans';margin-bottom:9px;box-shadow:0 1px 1px rgba(0,0,0,.08)}`,
    `
<div class="abs" style="left:90px;top:80px;color:#f4e7c2">
  <div style="font:600 18px 'DM Sans';letter-spacing:.3em">SKYHAVEN</div>
  <div style="font:400 66px/1 'Instrument Serif';margin-top:30px;color:#fff">Leads that <em style="color:#c9a227">qualify themselves.</em></div>
</div>
<div class="browser" style="left:420px;top:280px;width:1100px;height:640px;background:#fff">
  ${browserBar("crm.skyhaven.in/pipeline/the-arbor")}
  <div style="display:flex;height:calc(100% - 46px)">
    <div style="width:190px;background:#0b1f3a;padding:22px 18px;color:#c6d0df;font:500 14px 'DM Sans'">
      <div style="color:#c9a227;font:700 15px 'DM Sans';margin-bottom:26px">◆ Skyhaven CRM</div>
      ${["Pipeline", "Leads", "Site visits", "Projects", "Automations", "Reports"].map((x, i) => `<div style="padding:10px 12px;border-radius:10px;margin-bottom:4px;${i === 0 ? "background:rgba(201,162,39,.16);color:#fff" : ""}">${x}</div>`).join("")}
    </div>
    <div style="flex:1;padding:22px 24px;background:#f7f8fb">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px">
        <div><div style="font:700 22px 'DM Sans';color:#0b1f3a">The Arbor · 2 & 3 BHK</div><div style="font:500 13px 'DM Sans';color:#6b7a90;margin-top:3px">AI-qualified via WhatsApp · updated just now</div></div>
        <span class="pill" style="background:#0b1f3a;color:#f4e7c2">⚡ Auto-qualify ON</span>
      </div>
      <div style="display:flex;gap:14px">
        <div class="col"><div class="colh"><span>New</span><span>38</span></div>${lead("Rohan S.", "3 BHK · ₹1.2–1.5 Cr · 6 mo", "Score 54", false)}${lead("Anita K.", "2 BHK · ₹85 L · exploring", "Score 31", false)}</div>
        <div class="col"><div class="colh"><span>Qualified</span><span>14</span></div>${lead("Farhan & Zoya", "3 BHK · ₹1.6 Cr · loan approved", "🔥 92", true)}${lead("Meera Iyer", "2 BHK · ₹1.1 Cr · 3 mo", "🔥 84", true)}</div>
        <div class="col"><div class="colh"><span>Site visit</span><span>6</span></div>${lead("Vikram P.", "Sat 11:00 · Tower B", "🔥 88", true)}</div>
        <div class="col"><div class="colh"><span>Booked</span><span>2</span></div>${lead("The Desais", "Unit B-1204 · token paid", "Won", false)}</div>
      </div>
    </div>
  </div>
</div>
<div class="phone" style="left:120px;top:300px;transform:rotate(-3deg)"><div class="island"></div><div class="screen" style="background:#efe7dc">
  <div style="background:#0b5c4b;color:#fff;padding:52px 18px 14px;display:flex;align-items:center;gap:12px">
    <span style="width:38px;height:38px;border-radius:50%;background:#c9a227;display:grid;place-items:center;font:700 16px 'DM Sans';color:#0b1f3a">S</span>
    <span><div style="font:700 15px 'DM Sans'">Skyhaven Assistant ✓</div><div style="font:500 11px 'DM Sans';opacity:.8">online</div></span>
  </div>
  <div style="padding:16px 12px">
    <div class="msg" style="background:#fff">Hi Meera 👋 Thanks for your interest in <b>The Arbor</b>. Looking for 2 or 3 BHK?</div>
    <div class="msg" style="background:#d6f5c9;margin-left:auto">2 BHK. Budget around 1.1 Cr</div>
    <div class="msg" style="background:#fff">Great fit - 2 BHKs start at ₹1.04 Cr. When are you planning to move?</div>
    <div class="msg" style="background:#d6f5c9;margin-left:auto">In 3 months, home loan is pre-approved</div>
    <div class="msg" style="background:#fff">Perfect! Want a site visit? Sat 11:00 or Sun 4:30 📍</div>
    <div style="display:flex;gap:6px;margin-top:4px"><span class="pill" style="background:#fff;color:#0b5c4b;border:1px solid #0b5c4b">Sat 11:00</span><span class="pill" style="background:#fff;color:#0b5c4b;border:1px solid #0b5c4b">Sun 4:30</span></div>
  </div>
</div></div>
`,
  );

/* ───────────── 4. Fynly - invoicing app ───────────── */
const fynly = () =>
  page(
    `.stage{background:linear-gradient(140deg,#eef0ff 0%,#dfe3ff 45%,#c7cdfd 100%)}
.kpi{background:#fff;border-radius:16px;padding:18px;flex:1;box-shadow:0 8px 20px -12px rgba(67,56,202,.25)}`,
    `
<div class="abs" style="width:700px;height:700px;border-radius:50%;right:-120px;top:-180px;background:radial-gradient(circle,#a5b4fc,rgba(165,180,252,0) 70%)"></div>
<div class="browser" style="left:90px;top:120px;width:1080px;height:760px;background:#f8f9ff">
  ${browserBar("app.fynly.co/dashboard")}
  <div style="display:flex;height:calc(100% - 46px)">
    <div style="width:210px;padding:24px 18px;border-right:1px solid #e7e9f7;font:500 14px 'DM Sans';color:#4b5175">
      <div style="font:700 22px 'Space Grotesk';color:#1e1b4b;margin-bottom:28px"><span style="color:#4f46e5">●</span> fynly</div>
      ${["Overview", "Invoices", "Clients", "Payments", "Forecast", "Settings"].map((x, i) => `<div style="padding:10px 12px;border-radius:10px;margin-bottom:4px;${i === 0 ? "background:#eef0ff;color:#4338ca;font-weight:700" : ""}">${x}</div>`).join("")}
    </div>
    <div style="flex:1;padding:26px 30px">
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div><div style="font:700 26px 'Space Grotesk';color:#1e1b4b">Good morning, Aisha</div><div style="font:500 14px 'DM Sans';color:#6b7095;margin-top:4px">₹2.4L expected this month · 3 invoices overdue</div></div>
        <span class="pill" style="background:#4f46e5;color:#fff;padding:12px 18px;font-size:14px">+ New invoice</span>
      </div>
      <div style="display:flex;gap:14px;margin-top:22px">
        <div class="kpi"><div class="mono" style="font-size:10px;color:#6b7095">Outstanding</div><div style="font:700 30px 'Space Grotesk';color:#1e1b4b;margin-top:8px">₹3,86,400</div><div style="font:600 12px 'DM Sans';color:#e11d48;margin-top:6px">3 overdue</div></div>
        <div class="kpi"><div class="mono" style="font-size:10px;color:#6b7095">Paid · 30 days</div><div style="font:700 30px 'Space Grotesk';color:#1e1b4b;margin-top:8px">₹5,12,900</div><div style="font:600 12px 'DM Sans';color:#059669;margin-top:6px">▲ 18%</div></div>
        <div class="kpi"><div class="mono" style="font-size:10px;color:#6b7095">Avg. days to paid</div><div style="font:700 30px 'Space Grotesk';color:#1e1b4b;margin-top:8px">11.2</div><div style="font:600 12px 'DM Sans';color:#059669;margin-top:6px">▼ 6.4 days</div></div>
      </div>
      <div style="background:#fff;border-radius:16px;margin-top:16px;padding:20px;box-shadow:0 8px 20px -12px rgba(67,56,202,.25)">
        <div style="display:flex;justify-content:space-between;font:700 15px 'DM Sans';color:#1e1b4b"><span>Cash-flow forecast</span><span class="mono" style="font-size:10px;color:#6b7095">Next 90 days</span></div>
        <svg width="760" height="190" viewBox="0 0 760 190" style="margin-top:10px">
          <defs><linearGradient id="g" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#6366f1" stop-opacity=".35"/><stop offset="1" stop-color="#6366f1" stop-opacity="0"/></linearGradient></defs>
          ${[40, 80, 120, 160].map((y) => `<line x1="0" x2="760" y1="${y}" y2="${y}" stroke="#eef0f8"/>`).join("")}
          <path d="M0 150 C80 140 120 110 190 118 S320 70 380 84 S520 40 600 52 S700 30 760 22 L760 190 L0 190Z" fill="url(#g)"/>
          <path d="M0 150 C80 140 120 110 190 118 S320 70 380 84 S520 40 600 52" fill="none" stroke="#4f46e5" stroke-width="3"/>
          <path d="M600 52 S700 30 760 22" fill="none" stroke="#4f46e5" stroke-width="3" stroke-dasharray="6 6"/>
          <circle cx="600" cy="52" r="6" fill="#4f46e5"/>
        </svg>
      </div>
    </div>
  </div>
</div>
<div class="phone" style="left:1160px;top:200px;transform:rotate(5deg)"><div class="island"></div><div class="screen" style="background:#fff">
  ${status()}
  <div style="padding:14px 20px">
    <div style="font:700 24px 'Space Grotesk';color:#1e1b4b">Invoices</div>
    <div style="display:flex;gap:8px;margin-top:14px">${["All", "Due", "Overdue", "Paid"].map((x, i) => `<span class="pill" style="font-size:11px;background:${i === 2 ? "#4f46e5" : "#eef0ff"};color:${i === 2 ? "#fff" : "#4338ca"}">${x}</span>`).join("")}</div>
    ${[
      ["Northwind Studio", "INV-0142 · 12 days late", "₹48,000", "#e11d48"],
      ["Bluefin Media", "INV-0139 · 5 days late", "₹1,12,400", "#e11d48"],
      ["Atlas Interiors", "INV-0136 · reminder 2 sent", "₹26,000", "#d97706"],
      ["Mango Labs", "INV-0131 · paid via UPI", "₹72,000", "#059669"],
    ]
      .map(
        ([n, m, a, c]) => `<div style="display:flex;justify-content:space-between;align-items:center;padding:14px 0;border-bottom:1px solid #f0f1f8">
      <div><div style="font:700 14px 'DM Sans';color:#1e1b4b">${n}</div><div style="font:500 11px 'DM Sans';color:${c};margin-top:3px">${m}</div></div>
      <div style="font:700 14px 'Space Grotesk';color:#1e1b4b">${a}</div></div>`,
      )
      .join("")}
    <div style="margin-top:18px;background:#1e1b4b;color:#fff;border-radius:16px;padding:16px">
      <div class="mono" style="font-size:10px;color:#a5b4fc">✦ Fynly assistant</div>
      <div style="font:500 13px/1.45 'DM Sans';margin-top:8px">Northwind usually pays after a 2nd nudge. Send a friendly reminder with a UPI link?</div>
      <div style="display:flex;gap:8px;margin-top:12px"><span class="pill" style="background:#4f46e5;color:#fff">Send reminder</span><span class="pill" style="background:rgba(255,255,255,.12);color:#fff">Edit</span></div>
    </div>
  </div>
</div></div>
`,
  );

/* ───────────── 5. Kōen Coffee - brand identity board ───────────── */
const koenMark = (size, color, bg) => `
<svg width="${size}" height="${size}" viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="${bg}"/><path d="M50 6 C34 30 66 70 50 94" fill="none" stroke="${color}" stroke-width="7" stroke-linecap="round"/></svg>`;
const koen = () =>
  page(
    `.stage{background:#e9dfcc}
.tile{position:absolute;border-radius:24px;overflow:hidden}`,
    `
<div class="tile" style="left:40px;top:40px;width:620px;height:560px;background:#2b1d14;display:flex;flex-direction:column;justify-content:space-between;padding:44px">
  <div class="mono" style="color:#e9dfcc;font-size:12px;opacity:.7">Kōen Coffee · Identity system</div>
  <div style="display:flex;align-items:center;gap:30px">${koenMark(170, "#2b1d14", "#e2602b")}<div style="font:400 120px/0.9 'Fraunces';color:#f2e8d5;letter-spacing:-.04em">kōen</div></div>
  <div style="font:400 30px/1.25 'Instrument Serif';color:#f2e8d5;font-style:italic">A pause in the city.</div>
</div>
<div class="tile" style="left:680px;top:40px;width:880px;height:270px;display:flex">
  ${[
    ["#2b1d14", "Deep Roast", "#f2e8d5"],
    ["#6b4a2f", "Medium", "#f2e8d5"],
    ["#b98b5e", "Light", "#2b1d14"],
    ["#f2e8d5", "Crema", "#2b1d14"],
    ["#e2602b", "Park Sunset", "#2b1d14"],
  ]
    .map(([c, n, t]) => `<div style="flex:1;background:${c};color:${t};padding:22px;display:flex;flex-direction:column;justify-content:flex-end"><div style="font:600 18px 'DM Sans'">${n}</div><div class="mono" style="font-size:11px;opacity:.7;margin-top:4px">${c}</div></div>`)
    .join("")}
</div>
<div class="tile" style="left:680px;top:330px;width:430px;height:270px;background:#f6efe2;padding:30px">
  <div class="mono" style="font-size:11px;color:#6b4a2f">Typography</div>
  <div style="font:400 92px/1 'Fraunces';color:#2b1d14;margin-top:10px">Aa</div>
  <div style="font:600 16px 'DM Sans';color:#2b1d14;margin-top:8px">Fraunces / DM Sans</div>
  <div style="font:500 13px 'DM Sans';color:#6b4a2f;margin-top:4px">Warm serif for voice · clean sans for menus</div>
</div>
<div class="tile" style="left:1130px;top:330px;width:430px;height:630px;background:linear-gradient(180deg,#e2602b,#c24c1c);display:flex;align-items:center;justify-content:center">
  <div style="position:relative;width:230px;height:420px">
    <div style="position:absolute;top:0;left:-6px;width:242px;height:26px;border-radius:10px;background:#2b1d14"></div>
    <div style="position:absolute;top:22px;left:0;width:230px;height:398px;clip-path:polygon(0 0,100% 0,90% 100%,10% 100%);background:linear-gradient(90deg,#e8dcc6,#fbf5ea 45%,#d8c9ad);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px">
      ${koenMark(110, "#f2e8d5", "#2b1d14")}
      <div style="font:400 40px 'Fraunces';color:#2b1d14">kōen</div>
      <div class="mono" style="font-size:10px;color:#6b4a2f">Slow roast · Est. 2026</div>
    </div>
  </div>
</div>
<div class="tile" style="left:40px;top:620px;width:620px;height:340px;background:#6b4a2f;display:flex;align-items:flex-end;gap:26px;padding:40px">
  ${[
    ["#2b1d14", "Estate Dark", "Chikmagalur"],
    ["#e2602b", "Park Blend", "Coorg · Araku"],
    ["#f2e8d5", "Morning Light", "Baba Budangiri"],
  ]
    .map(
      ([c, n, o]) => `<div style="flex:1;height:250px;border-radius:14px 14px 8px 8px;background:${c};position:relative;box-shadow:0 30px 40px -20px rgba(0,0,0,.5);padding:18px;display:flex;flex-direction:column;justify-content:space-between;color:${c === "#f2e8d5" ? "#2b1d14" : "#f2e8d5"}">
      <div style="height:12px;border-radius:4px;background:rgba(0,0,0,.18)"></div>
      <div>${koenMark(46, c, c === "#f2e8d5" ? "#2b1d14" : "#f2e8d5")}<div style="font:600 18px 'Fraunces';margin-top:10px">${n}</div><div class="mono" style="font-size:9px;opacity:.7;margin-top:4px">${o}</div></div></div>`,
    )
    .join("")}
</div>
<div class="tile" style="left:680px;top:620px;width:430px;height:340px;background:#2b1d14;padding:30px;color:#f2e8d5">
  <div class="mono" style="font-size:11px;opacity:.6">Launch post</div>
  <div style="font:400 50px/1 'Fraunces';margin-top:26px">Find your<br/><em style="font-family:'Instrument Serif';color:#e2602b">pause.</em></div>
  <div style="font:500 14px 'DM Sans';opacity:.75;margin-top:20px">Opening Saturday · 12th Main, Indiranagar</div>
</div>
`,
  );

/* ───────────── 6. Pulse Athletic - reels & ad creatives ───────────── */
const reel = (x, y, rot, bg, top, big, small, accent) => `
<div class="phone" style="left:${x}px;top:${y}px;transform:rotate(${rot}deg) scale(.92)"><div class="island"></div><div class="screen" style="background:${bg};color:#fff">
  <div class="abs" style="inset:0;background:radial-gradient(400px 500px at 50% 35%,rgba(255,255,255,.18),transparent 70%)"></div>
  <div class="abs" style="left:-40px;right:-40px;top:200px;height:260px;background:repeating-linear-gradient(115deg,rgba(255,255,255,.06) 0 14px,transparent 14px 40px)"></div>
  <div class="abs" style="top:56px;left:20px;right:20px;display:flex;gap:4px">${[1, 1, 0.4, 0].map((f) => `<div style="flex:1;height:3px;border-radius:3px;background:rgba(255,255,255,.3)"><div style="width:${f * 100}%;height:100%;background:#fff;border-radius:3px"></div></div>`).join("")}</div>
  <div class="abs mono" style="top:74px;left:22px;font-size:11px;opacity:.85">${top}</div>
  <div class="abs" style="left:22px;right:22px;top:250px;font:900 50px/0.92 'Archivo';font-stretch:112%;letter-spacing:-.03em;text-transform:uppercase">${big}</div>
  <div class="abs" style="left:22px;right:60px;bottom:110px;font:600 15px/1.35 'DM Sans'">${small}</div>
  <div class="abs" style="left:22px;bottom:70px;display:flex;align-items:center;gap:8px;font:700 13px 'DM Sans'"><span style="width:28px;height:28px;border-radius:50%;background:${accent};display:grid;place-items:center;font-size:12px">P</span>pulse.athletic</div>
  <div class="abs" style="right:16px;bottom:120px;display:flex;flex-direction:column;gap:18px;align-items:center;font:700 12px 'DM Sans'"><span style="font-size:24px">♥</span>12.4k<span style="font-size:22px">💬</span>318<span style="font-size:22px">↗</span></div>
</div></div>`;
const pulse = () =>
  page(
    `.stage{background:#0c0c0e}`,
    `
<div class="abs" style="left:0;right:0;top:-80px;font:900 260px/0.85 'Archivo';font-stretch:125%;letter-spacing:-.05em;color:#161618;white-space:nowrap">NO DAYS OFF NO DAYS</div>
<div class="abs" style="left:0;right:0;bottom:-60px;font:900 260px/0.85 'Archivo';font-stretch:125%;letter-spacing:-.05em;color:#161618;white-space:nowrap">RESET · PULSE · RESET</div>
<div class="abs" style="width:900px;height:900px;border-radius:50%;left:350px;top:50px;background:radial-gradient(circle,rgba(255,59,48,.35),transparent 65%)"></div>
${reel(210, 170, -7, "linear-gradient(170deg,#ff3b30,#8f0f08)", "Coach's cue · Ep. 14", "Stop<br/>rushing<br/>reps.", "The 3-second lowering rule that fixed my squat.", "#111")}
${reel(635, 120, 0, "linear-gradient(170deg,#1b1b1f,#050506)", "30-day reset · Day 1", "30<br/>day<br/>reset", "Three sessions a week. No excuses. Starts Monday.", "#ff3b30")}
${reel(1060, 170, 7, "linear-gradient(170deg,#f5f5f2,#bdbdb6)", "Myth vs fact", "<span style='color:#111'>Cardio<br/>kills<br/>gains?</span>", "<span style='color:#111'>Short answer: no. Here's what actually does.</span>", "#ff3b30")}
<div class="abs mono" style="left:90px;top:70px;color:#fff;font-size:13px;opacity:.8">Pulse Athletic · Content engine</div>
<div class="card" style="left:1250px;top:740px;width:300px;padding:18px 20px;background:#fff">
  <div class="mono" style="font-size:10px;color:#ff3b30">Format library</div>
  <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:10px">${["Coach's cue", "30-day reset", "Member wins", "Myth vs fact"].map((x) => `<span class="pill" style="background:#f2f2f2;color:#111;font-size:11px">${x}</span>`).join("")}</div>
  <div style="font:500 12px 'DM Sans';color:#555;margin-top:10px">9:16 · 4:5 · 1:1 from one shoot</div>
</div>
`,
  );

/* ───────────── 7. Hearthloom - influencer programme ───────────── */
const creator = (name, handle, niche, f, hue, status) => `
<div style="background:#fff;border-radius:18px;padding:16px;box-shadow:0 10px 24px -14px rgba(60,50,30,.35)">
  <div style="height:150px;border-radius:12px;background:linear-gradient(150deg,hsl(${hue} 35% 78%),hsl(${hue + 25} 30% 58%));position:relative;overflow:hidden">
    <div style="position:absolute;left:20px;bottom:-30px;width:120px;height:90px;border-radius:50% 50% 8px 8px;background:hsl(${hue} 30% 92%);opacity:.9"></div>
    <div style="position:absolute;right:16px;top:16px;width:60px;height:60px;border-radius:12px;background:repeating-linear-gradient(45deg,hsl(${hue + 10} 25% 70%) 0 6px,hsl(${hue + 10} 25% 82%) 6px 12px)"></div>
  </div>
  <div style="display:flex;align-items:center;gap:10px;margin-top:12px">
    <span style="width:34px;height:34px;border-radius:50%;background:hsl(${hue} 35% 45%);color:#fff;display:grid;place-items:center;font:700 13px 'DM Sans'">${name[0]}</span>
    <div><div style="font:700 14px 'DM Sans';color:#2f2a20">${name}</div><div style="font:500 12px 'DM Sans';color:#8a8270">${handle}</div></div>
  </div>
  <div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px">
    <span class="pill" style="background:#f1efe6;color:#5c6a3a;font-size:11px">${niche} · ${f}</span>
    <span class="mono" style="font-size:10px;color:${status === "Posted" ? "#5c6a3a" : "#b4673e"}">${status}</span>
  </div>
</div>`;
const hearthloom = () =>
  page(
    `.stage{background:linear-gradient(160deg,#f4f0e6 0%,#e7e3d2 60%,#d7d3bd 100%)}`,
    `
<div class="abs" style="left:80px;top:80px;width:520px">
  <div style="font:600 20px 'Fraunces';color:#5c6a3a;letter-spacing:.02em">hearthloom</div>
  <div style="font:400 74px/0.98 'Fraunces';color:#2f2a20;letter-spacing:-.03em;margin-top:60px">Fifty creators.<br/><em style="color:#8a9a5b">One cosy launch.</em></div>
  <div style="font:500 18px/1.55 'DM Sans';color:#5a5444;margin-top:24px;width:430px">Micro-creators in slow living, home and DIY, briefed, seeded and tracked in one place.</div>
</div>
<div class="card" style="left:80px;top:560px;width:520px;padding:24px;background:#2f2a20;color:#f4f0e6">
  <div style="display:flex;justify-content:space-between"><span class="mono" style="font-size:11px;opacity:.7">Launch wave · live dashboard</span><span class="mono" style="font-size:11px;color:#c7d49a">● Live</span></div>
  <div style="display:flex;gap:26px;margin-top:20px">
    ${[["50", "Creators"], ["38", "Posts live"], ["1.9M", "Reach"], ["4.8%", "Avg. ER"]].map(([v, l]) => `<div><div style="font:600 34px 'Fraunces'">${v}</div><div class="mono" style="font-size:10px;opacity:.6;margin-top:4px">${l}</div></div>`).join("")}
  </div>
  <svg width="472" height="90" viewBox="0 0 472 90" style="margin-top:18px">${Array.from({ length: 24 }, (_, i) => { const h = 18 + Math.abs(Math.sin(i * 0.6) * 50) + i * 1.2; return `<rect x="${i * 19.6}" y="${90 - h}" width="13" height="${h}" rx="3" fill="${i > 17 ? "#c7d49a" : "rgba(244,240,230,.25)"}"/>`; }).join("")}</svg>
</div>
<div class="abs" style="left:660px;top:70px;width:880px;display:grid;grid-template-columns:repeat(3,1fr);gap:20px">
  ${creator("Ira Menon", "@slowhome.ira", "Slow living", "42k", 40, "Posted")}
  ${creator("Kabir Das", "@kabirmakes", "DIY", "18k", 90, "Posted")}
  ${creator("Tara & Dev", "@thecornerflat", "Home", "64k", 15, "Draft review")}
  ${creator("Neha Joshi", "@nehasnook", "Décor", "27k", 70, "Posted")}
  ${creator("Arjun Rao", "@quietrooms", "Interiors", "55k", 120, "Shipping")}
  ${creator("Sana Q.", "@sana.weaves", "Craft", "12k", 30, "Posted")}
</div>
`,
  );

/* ───────────── 8. Learnova - AI tutor ───────────── */
const learnova = () =>
  page(
    `.stage{background:radial-gradient(900px 700px at 70% 40%,#8b5cf6 0%,#5b21b6 45%,#2e1065 100%)}`,
    `
<div class="abs" style="width:1600px;height:1000px;background-image:radial-gradient(rgba(255,255,255,.12) 1px,transparent 1.5px);background-size:34px 34px"></div>
<div class="abs" style="left:90px;top:110px;color:#fff;width:600px">
  <div style="font:700 26px 'Space Grotesk'"><span style="color:#facc15">✦</span> learnova</div>
  <div style="font:700 78px/0.98 'Space Grotesk';letter-spacing:-.04em;margin-top:70px">Hints first.<br/><span style="color:#facc15">Answers last.</span></div>
  <div style="font:500 20px/1.5 'DM Sans';opacity:.85;margin-top:26px;width:480px">An AI study companion that explains the why, in English or Hindi, by text, photo or voice.</div>
  <div style="display:flex;gap:10px;margin-top:34px"><span class="pill" style="background:#facc15;color:#2e1065;padding:12px 18px;font-size:14px">🎙 Ask out loud</span><span class="pill" style="background:rgba(255,255,255,.14);color:#fff;padding:12px 18px;font-size:14px">📷 Snap a question</span></div>
</div>
<div class="phone" style="left:830px;top:150px;transform:rotate(-5deg)"><div class="island"></div><div class="screen" style="background:#faf8ff">
  ${status()}
  <div style="padding:10px 18px">
    <div style="display:flex;justify-content:space-between;align-items:center"><div style="font:700 18px 'Space Grotesk';color:#2e1065">Quadratics · Class 10</div><span class="pill" style="background:#ede9fe;color:#6d28d9;font-size:11px">Hint 2 of 3</span></div>
    <div style="background:#fff;border:1px solid #ede9fe;border-radius:16px;padding:14px;margin-top:14px;font:600 16px 'DM Sans';color:#2e1065">Solve: x² − 5x + 6 = 0</div>
    <div style="background:#6d28d9;color:#fff;border-radius:16px 16px 16px 4px;padding:14px;margin-top:12px;font:500 14px/1.45 'DM Sans'">Good start! Now find two numbers that <b>multiply to 6</b> and <b>add to −5</b>. What could they be? 🤔</div>
    <div style="background:#ede9fe;color:#2e1065;border-radius:16px 16px 4px 16px;padding:12px 14px;margin:12px 0 0 60px;font:500 14px 'DM Sans'">−2 and −3?</div>
    <div style="background:#6d28d9;color:#fff;border-radius:16px 16px 16px 4px;padding:14px;margin-top:12px;font:500 14px/1.45 'DM Sans'">Exactly 🎉 So (x − 2)(x − 3) = 0. What are the roots?</div>
    <div style="position:absolute;left:18px;right:18px;bottom:30px;display:flex;gap:10px;align-items:center">
      <div style="flex:1;height:46px;border-radius:23px;background:#fff;border:1px solid #e4dcfb;font:500 13px 'DM Sans';color:#9b8fc0;display:flex;align-items:center;padding:0 16px">Type or ask…</div>
      <span style="width:46px;height:46px;border-radius:50%;background:#facc15;display:grid;place-items:center;font-size:18px">🎙</span>
    </div>
  </div>
</div></div>
<div class="card" style="left:1200px;top:240px;width:320px;padding:22px;background:#fff">
  <div class="mono" style="font-size:10px;color:#6d28d9">Weekly report · for parents</div>
  <div style="display:flex;align-items:center;gap:18px;margin-top:14px">
    <svg width="90" height="90" viewBox="0 0 36 36"><circle cx="18" cy="18" r="15.9" fill="none" stroke="#ede9fe" stroke-width="3.2"/><circle cx="18" cy="18" r="15.9" fill="none" stroke="#6d28d9" stroke-width="3.2" stroke-dasharray="72 100" stroke-linecap="round" transform="rotate(-90 18 18)"/><text x="18" y="20.5" text-anchor="middle" font-size="8" font-weight="700" fill="#2e1065" font-family="Space Grotesk">72%</text></svg>
    <div><div style="font:700 16px 'DM Sans';color:#2e1065">Algebra mastery</div><div style="font:500 13px 'DM Sans';color:#059669;margin-top:4px">▲ 14% this week</div></div>
  </div>
  ${[["Quadratics", 82], ["Linear eq.", 91], ["Polynomials", 54]].map(([t, v]) => `<div style="margin-top:12px"><div style="display:flex;justify-content:space-between;font:600 12px 'DM Sans';color:#4c3d7a"><span>${t}</span><span>${v}%</span></div><div style="height:6px;border-radius:6px;background:#ede9fe;margin-top:5px"><div style="width:${v}%;height:100%;border-radius:6px;background:${v < 60 ? "#f59e0b" : "#6d28d9"}"></div></div></div>`).join("")}
</div>
<div class="card" style="left:1230px;top:640px;width:280px;padding:16px 18px;background:#facc15;color:#2e1065">
  <div style="font:700 14px 'DM Sans'">🔥 9-day study streak</div>
  <div style="font:500 12px 'DM Sans';margin-top:4px;opacity:.8">Next: Polynomials practice · 15 min</div>
</div>
`,
  );

/* ───────────── 9. Spice Route Kitchens - restaurant site + ordering ───────────── */
const dish = (hue1, hue2) =>
  `<div style="width:100%;height:100%;border-radius:50%;background:radial-gradient(circle at 50% 50%,${hue1} 0 38%,${hue2} 39% 52%,#f3ead8 53% 64%,#e6d8bd 65% 70%,transparent 71%);box-shadow:0 30px 40px -20px rgba(0,0,0,.6)"></div>`;
const spice = () =>
  page(
    `.stage{background:linear-gradient(150deg,#2a0606 0%,#4a0e0e 50%,#6b1a0e 100%)}`,
    `
<div class="abs" style="width:800px;height:800px;border-radius:50%;left:-200px;bottom:-400px;background:radial-gradient(circle,rgba(244,163,0,.35),transparent 65%)"></div>
<div class="browser" style="left:80px;top:80px;width:1150px;height:840px;background:#140404">
  ${browserBar("spiceroutekitchens.in", true)}
  <div style="display:flex;justify-content:space-between;align-items:center;padding:24px 46px;color:#f6e7c8;font:500 15px 'DM Sans'">
    <div style="font:400 30px 'Instrument Serif';letter-spacing:.02em">Spice Route <em style="color:#f4a300">Kitchens</em></div>
    <div style="display:flex;gap:28px;opacity:.85"><span>Regions</span><span>Menu</span><span>Reserve</span><span>Our story</span></div>
    <span class="pill" style="background:#f4a300;color:#2a0606;padding:12px 18px;font-size:14px">Order direct - 10% back</span>
  </div>
  <div style="position:relative;height:470px;margin:0 46px;border-radius:24px;overflow:hidden;background:radial-gradient(700px 400px at 75% 60%,#7a2a0a,#2a0606 70%)">
    <div class="abs" style="left:56px;top:70px;color:#f6e7c8">
      <div class="mono" style="font-size:12px;color:#f4a300">Eight regions · one table</div>
      <div style="font:400 92px/0.95 'Instrument Serif';margin-top:20px">From Chettinad<br/>to <em style="color:#f4a300">Kashmir.</em></div>
      <div style="font:500 17px/1.55 'DM Sans';opacity:.8;margin-top:22px;width:420px">Slow-cooked regional classics, delivered from our kitchens in 35 minutes or less.</div>
    </div>
    <div class="abs" style="right:60px;top:60px;width:340px;height:340px">${dish("#a3320b", "#d9661f")}</div>
    <div class="abs" style="right:330px;top:250px;width:190px;height:190px">${dish("#e8b23a", "#c2410c")}</div>
    <div class="abs" style="right:20px;top:330px;width:150px;height:150px">${dish("#3f6212", "#65a30d")}</div>
  </div>
  <div style="display:flex;gap:16px;margin:24px 46px 0">
    ${[["Chettinad", "Pepper chicken, kothu parotta"], ["Awadh", "Galouti, dum biryani"], ["Konkan", "Sol kadhi, fish thali"], ["Kashmir", "Rogan josh, kahwa"]].map(([r, d]) => `<div style="flex:1;border:1px solid rgba(246,231,200,.14);border-radius:16px;padding:16px 18px;color:#f6e7c8"><div style="font:400 26px 'Instrument Serif'">${r}</div><div style="font:500 13px 'DM Sans';opacity:.65;margin-top:4px">${d}</div></div>`).join("")}
  </div>
</div>
<div class="phone" style="left:1180px;top:220px;transform:rotate(4deg)"><div class="island"></div><div class="screen" style="background:#fff8ec">
  ${status()}
  <div style="padding:14px 20px">
    <div class="mono" style="font-size:10px;color:#b45309">Order #SR-2048</div>
    <div style="font:400 34px 'Instrument Serif';color:#2a0606;margin-top:6px">On its way 🛵</div>
    <div style="font:600 14px 'DM Sans';color:#7c2d12;margin-top:4px">Arriving in 18 min</div>
    <div style="margin-top:20px">${["Order received", "Kitchen ticket printed", "Packed & handed over", "Out for delivery"].map((s, i) => `<div style="display:flex;gap:12px;align-items:center;margin-bottom:14px"><span style="width:22px;height:22px;border-radius:50%;background:${i < 4 ? "#f4a300" : "#eee"};display:grid;place-items:center;font-size:12px;color:#2a0606">✓</span><span style="font:600 14px 'DM Sans';color:#2a0606">${s}</span></div>`).join("")}</div>
    <div style="background:#2a0606;color:#f6e7c8;border-radius:16px;padding:16px;margin-top:10px">
      <div style="font:600 14px 'DM Sans'">Chettinad Pepper Chicken × 1</div>
      <div style="font:600 14px 'DM Sans';margin-top:6px">Awadhi Dum Biryani × 2</div>
      <div style="display:flex;justify-content:space-between;margin-top:12px;font:700 15px 'DM Sans'"><span>Paid · UPI</span><span>₹1,240</span></div>
    </div>
    <div class="pill" style="margin-top:14px;background:#fde7b0;color:#7c2d12">+ ₹124 loyalty credit earned</div>
  </div>
</div></div>
`,
  );

export const templates = {
  "pearlline-dental": pearlline,
  "noor-and-dew": noor,
  "skyhaven-realty": skyhaven,
  fynly,
  "koen-coffee": koen,
  "pulse-athletic": pulse,
  hearthloom,
  learnova,
  "spice-route-kitchens": spice,
};
