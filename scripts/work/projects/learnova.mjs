/** Learnova: AI study companion for Class 9–12 (showcase build, fictional brand). */
import { doc, photos, stage, win, phone, backdrop } from "../kit.mjs";

const C = { violet: "#7C3AED", deep: "#2E1065", ink: "#1F1235", mute: "#6E6585", line: "#ECE7F6", bg: "#FAF8FF", lav: "#F1EAFF", sun: "#FFC94A", mint: "#2BBF8E", coral: "#FF6B6B" };
const fonts = ["Lexend:wght@300;400;500;600;700", "Noto Sans Devanagari:wght@400;600", "JetBrains Mono:wght@500"];

const logo = (s, c = C.ink) => `<span style="display:inline-flex;align-items:center;gap:${s * 0.25}px;font:600 ${s * 0.72}px/1 'Lexend';letter-spacing:-.03em;color:${c}"><svg width="${s}" height="${s}" viewBox="0 0 40 40"><rect width="40" height="40" rx="12" fill="${C.violet}"/><path d="M12 28l8-16 8 16M15 22h10" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="30" cy="10" r="3.5" fill="${C.sun}"/></svg>learnova</span>`;
const base = `body{font-family:'Lexend',sans-serif;color:${C.ink}}.mono{font:500 11px 'JetBrains Mono';letter-spacing:.08em;text-transform:uppercase}.hi{font-family:'Noto Sans Devanagari','Lexend',sans-serif}
.chip{display:inline-flex;align-items:center;gap:6px;border-radius:99px;padding:6px 12px;font-size:13px;font-weight:500}`;

const site = (p) =>
  doc({
    fonts,
    css: `${base}
body{background:${C.bg}}
.wrap{max-width:1280px;margin:0 auto;padding:0 48px}
nav{display:flex;justify-content:space-between;align-items:center;height:84px}
nav .l{display:flex;gap:30px;font-size:15.5px;color:${C.mute}}
.btn{display:inline-flex;align-items:center;gap:8px;height:54px;padding:0 26px;border-radius:16px;font-weight:600;font-size:15.5px}
.btn.p{background:${C.violet};color:#fff;box-shadow:0 10px 24px -10px rgba(124,58,237,.6)}.btn.s{background:#fff;border:1.5px solid ${C.line}}
.hero{display:grid;grid-template-columns:1fr 1fr;gap:50px;align-items:center;padding:40px 0 80px}
h1{font-size:76px;line-height:1.02;font-weight:600;letter-spacing:-.045em}
h1 u{text-decoration:none;background:linear-gradient(transparent 62%,${C.sun} 62%)}
.ph{position:relative;height:600px}
.ph img{position:absolute;right:0;top:0;width:88%;height:100%;object-fit:cover;border-radius:36px}
.fl{position:absolute;background:#fff;border-radius:20px;padding:14px 16px;box-shadow:0 24px 50px -20px rgba(46,16,101,.35);font-size:14.5px}
section{padding:90px 0}
h2{font-size:50px;font-weight:600;letter-spacing:-.035em;line-height:1.06}
.f3{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:44px}
.f3 div{background:#fff;border:1px solid ${C.line};border-radius:26px;padding:30px}
.f3 .ic{width:52px;height:52px;border-radius:16px;display:grid;place-items:center;font-size:24px}
.sub{display:flex;gap:10px;flex-wrap:wrap;margin-top:30px}.sub span{background:#fff;border:1px solid ${C.line};border-radius:14px;padding:12px 18px;font-weight:500}
.par{background:${C.deep};color:#fff;border-radius:36px;padding:64px;display:grid;grid-template-columns:1fr 1fr;gap:50px;align-items:center}
.par img{width:100%;height:440px;object-fit:cover;border-radius:24px}
@media(max-width:600px){
 .wrap{padding:0 18px} nav{height:64px} nav .l,.hide-m{display:none} .hero{grid-template-columns:1fr;padding:16px 0 40px;gap:30px} h1{font-size:44px}
 .ph{height:420px} .ph img{width:100%} section{padding:54px 0} h2{font-size:34px} .f3,.par{grid-template-columns:1fr} .par{padding:30px 22px} .par img{height:280px}
}`,
    body: `<div class="wrap"><nav>${logo(36)}<div class="l"><span>How it works</span><span>Subjects</span><span>For parents</span><span>Pricing</span></div><div style="display:flex;gap:10px"><span class="btn s hide-m" style="height:44px">Log in</span><span class="btn p" style="height:44px">Try free</span></div></nav>
<div class="hero"><div><span class="chip" style="background:${C.lav};color:${C.violet}">✦ CBSE &amp; ICSE · Class 9 to 12</span>
<h1 style="margin-top:22px">Stuck on a problem? <u>Get a hint,</u> not the answer.</h1>
<p style="font-size:19px;line-height:1.6;color:${C.mute};margin-top:22px;max-width:500px">Snap a question or ask out loud in English or Hindi. Learnova walks you through it one step at a time, the way a good tutor would.</p>
<div style="display:flex;gap:12px;margin-top:32px;flex-wrap:wrap"><span class="btn p">Start free for 7 days</span><span class="btn s">▶ Watch it solve</span></div>
<div style="display:flex;gap:28px;margin-top:36px;color:${C.mute};font-size:14.5px"><span>📷 Snap any question</span><span>🎙 Ask in Hindi</span><span>📈 Weekly parent report</span></div></div>
<div class="ph"><img src="${p.hero}"/>
<div class="fl" style="left:0;top:70px;width:270px"><div class="mono" style="color:${C.violet}">Hint 2 of 4</div><div style="margin-top:6px;line-height:1.45">Try writing 2x² + 5x − 3 as a product of two brackets. What two numbers multiply to −6?</div></div>
<div class="fl" style="right:-10px;bottom:60px;display:flex;align-items:center;gap:10px"><span style="width:40px;height:40px;border-radius:12px;background:${C.mint};display:grid;place-items:center;color:#fff">✓</span><div><b>Quadratics</b><div style="color:${C.mute};font-size:13px">Mastery 72% → 84%</div></div></div></div></div></div>
<section style="padding-top:20px"><div class="wrap"><div class="mono" style="color:${C.violet}">How it helps</div><h2 style="margin-top:12px">A patient tutor in your pocket,<br/>at 11 pm before the test.</h2>
<div class="f3">${[["💡", C.lav, "Hints, step by step", "It asks what you'd try next and only shows the next step when you're stuck. You do the thinking."], ["🎙", "#FFF4D6", "Doubts in your language", "Speak in English, Hindi or a mix of both. It explains back the same way."], ["🎯", "#DDF7EE", "Practice that adapts", "Questions get harder as you improve, with board-style papers before exams."]].map(([i, bg, t, d]) => `<div><div class="ic" style="background:${bg}">${i}</div><h3 style="font-size:21px;font-weight:600;margin-top:18px">${t}</h3><p style="color:${C.mute};margin-top:8px;line-height:1.6">${d}</p></div>`).join("")}</div>
<div class="sub">${["Maths", "Physics", "Chemistry", "Biology", "English", "Economics", "Accountancy", "Computer Science"].map((x) => `<span>${x}</span>`).join("")}</div></div></section>
<section style="padding-top:0"><div class="wrap"><div class="par"><div><div class="mono" style="color:${C.sun}">For parents</div><h2 style="margin-top:12px">Know how they're doing, without asking twice.</h2><p style="opacity:.75;font-size:17px;line-height:1.65;margin-top:18px">A plain-language report every Sunday on WhatsApp: time studied, topics mastered, where they're stuck, and one thing you can do to help.</p><span class="btn" style="background:${C.sun};color:${C.ink};margin-top:26px">See a sample report</span></div><img src="${p.parent}"/></div></div></section>`,
  });

const appHome = () =>
  doc({
    fonts,
    css: `${base}body{background:${C.bg};height:790px;padding:14px 20px;position:relative}
.c{background:#fff;border:1px solid ${C.line};border-radius:20px;padding:16px;margin-top:12px}
.bar{height:8px;border-radius:8px;background:${C.lav};margin-top:8px}.bar i{display:block;height:100%;border-radius:8px}
.ask{position:absolute;left:20px;right:20px;bottom:30px;background:#fff;border:1.5px solid ${C.line};border-radius:20px;padding:12px 14px;display:flex;align-items:center;gap:10px;box-shadow:0 14px 30px -14px rgba(46,16,101,.3)}`,
    body: `<div style="display:flex;justify-content:space-between;align-items:center">${logo(28)}<span class="chip" style="background:#FFF4D6">🔥 12-day streak</span></div>
<div style="font-size:28px;font-weight:600;letter-spacing:-.03em;margin-top:18px">Hi Aarav 👋</div><div style="color:${C.mute};margin-top:2px">Class 10 · Maths test on Friday</div>
<div class="c" style="background:${C.deep};color:#fff;border:none"><div class="mono" style="color:${C.sun}">Today's plan · 35 min</div><div style="font-size:19px;font-weight:600;margin-top:6px">Quadratic equations: factorisation</div><div style="font-size:13.5px;opacity:.7;margin-top:4px">8 practice questions · 2 board PYQs</div><div style="background:${C.sun};color:${C.ink};border-radius:12px;text-align:center;padding:11px;font-weight:600;margin-top:12px">Continue</div></div>
<div class="c"><div style="display:flex;justify-content:space-between"><b>This week</b><span style="color:${C.mute};font-size:13px">4h 20m studied</span></div>
${[["Quadratics", 84, C.violet], ["Trigonometry", 61, C.sun], ["Chemical reactions", 47, C.coral]].map(([t, v, c]) => `<div style="margin-top:12px;font-size:14px"><div style="display:flex;justify-content:space-between"><span>${t}</span><span style="color:${C.mute}">${v}%</span></div><div class="bar"><i style="width:${v}%;background:${c}"></i></div></div>`).join("")}</div>
<div class="c" style="display:flex;gap:12px;align-items:center"><span style="width:44px;height:44px;border-radius:14px;background:#DDF7EE;display:grid;place-items:center;font-size:20px">📝</span><div style="flex:1"><b style="font-weight:600">Mock test · Friday prep</b><div style="font-size:13px;color:${C.mute}">40 marks · 60 min</div></div><span style="color:${C.violet}">→</span></div>
<div class="ask"><span style="font-size:20px">📷</span><span style="flex:1;color:${C.mute}">Ask a doubt…</span><span style="width:40px;height:40px;border-radius:12px;background:${C.violet};display:grid;place-items:center;color:#fff">🎙</span></div>`,
  });

const appHint = () =>
  doc({
    fonts,
    css: `${base}body{background:#fff;height:790px;padding:14px 20px;position:relative}
.q{background:${C.bg};border:1px solid ${C.line};border-radius:18px;padding:16px;font-size:16px;line-height:1.5}
.st{display:flex;gap:12px;margin-top:14px}.st .n{flex:none;width:28px;height:28px;border-radius:9px;display:grid;place-items:center;font-size:13px;font-weight:600}
.opt{border:1.5px solid ${C.line};border-radius:14px;padding:12px 14px;margin-top:8px;font-size:15px}`,
    body: `<div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:22px">←</span><span class="mono" style="color:${C.violet}">Hint mode</span><span class="chip" style="background:${C.lav};color:${C.violet}">2 / 4</span></div>
<div class="q" style="margin-top:16px"><div class="mono" style="color:${C.mute}">From your photo · Ex 4.2, Q3</div><div style="margin-top:8px">Find the roots of <b>2x² + 5x − 3 = 0</b> by factorisation.</div></div>
<div class="st"><span class="n" style="background:#DDF7EE;color:${C.mint}">✓</span><div style="font-size:15px;line-height:1.5;color:${C.mute}">Multiply a and c: 2 × (−3) = −6</div></div>
<div class="st"><span class="n" style="background:${C.violet};color:#fff">2</span><div style="font-size:15px;line-height:1.5">Which two numbers <b>multiply to −6</b> and <b>add to 5</b>?</div></div>
<div style="margin-top:6px;padding-left:40px">${["2 and −3", "6 and −1", "−6 and 1", "3 and −2"].map((o, i) => `<div class="opt" style="${i === 1 ? `border-color:${C.violet};background:${C.lav};font-weight:600` : ""}">${o}${i === 1 ? " ✓" : ""}</div>`).join("")}</div>
<div style="margin-top:14px;background:#DDF7EE;border-radius:16px;padding:14px;font-size:14.5px;line-height:1.5">Nice! Now split 5x into <b>6x − x</b> and group the terms. Want to try the next step yourself?</div>
<div style="position:absolute;left:20px;right:20px;bottom:30px;display:flex;gap:10px"><span style="flex:1;border:1.5px solid ${C.line};border-radius:14px;text-align:center;padding:14px;font-weight:600">Show next step</span><span style="flex:1;background:${C.violet};color:#fff;border-radius:14px;text-align:center;padding:14px;font-weight:600">I'll try it</span></div>`,
  });

const appVoice = () =>
  doc({
    fonts,
    css: `${base}body{background:linear-gradient(180deg,${C.deep},#1A0A3D);color:#fff;height:790px;padding:14px 20px;position:relative}
.b{border-radius:18px;padding:13px 15px;font-size:15px;line-height:1.5;margin-top:10px;max-width:90%}`,
    body: `<div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:22px">←</span><span class="mono" style="color:${C.sun}">Voice doubt · Physics</span><span class="chip" style="background:rgba(255,255,255,.1)">हिंदी + EN</span></div>
<div class="b hi" style="background:${C.violet};margin-left:auto;margin-top:22px">Sir, ये refraction में light bend क्यों होती है? Simple में बताइए।</div>
<div class="b hi" style="background:rgba(255,255,255,.1)">बढ़िया सवाल! Light हवा से पानी में जाती है तो उसकी <b>speed कम हो जाती है</b>। जैसे road से कीचड़ में जाते समय cycle का एक पहिया पहले धीमा होता है, वैसे ही light मुड़ जाती है।</div>
<div class="b" style="background:rgba(255,255,255,.1)"><div style="height:120px;border-radius:12px;background:#fff;display:grid;place-items:center"><svg width="240" height="100" viewBox="0 0 240 100"><rect x="0" y="50" width="240" height="50" fill="#DCEBFF"/><line x1="0" y1="50" x2="240" y2="50" stroke="#7C3AED" stroke-width="2"/><path d="M30 5 L120 50 L170 95" fill="none" stroke="#FF6B6B" stroke-width="3"/><line x1="120" y1="10" x2="120" y2="95" stroke="#999" stroke-dasharray="4 4"/></svg></div><div class="hi" style="margin-top:8px">क्या मैं एक छोटा सा question दूँ check करने के लिए?</div></div>
<div style="position:absolute;left:0;right:0;bottom:40px;text-align:center"><div style="display:flex;gap:4px;justify-content:center;align-items:center;height:50px">${[8, 16, 28, 18, 36, 24, 12, 30, 42, 22, 10, 26, 36, 16, 8].map((h) => `<i style="display:block;width:4px;border-radius:4px;height:${h}px;background:${C.sun}"></i>`).join("")}</div>
<div style="width:76px;height:76px;border-radius:50%;background:${C.sun};margin:14px auto 0;display:grid;place-items:center;font-size:30px;box-shadow:0 0 0 12px rgba(255,201,74,.18)">🎙</div><div style="opacity:.6;font-size:13px;margin-top:10px">Listening… tap to stop</div></div>`,
  });

const report = () =>
  doc({
    fonts,
    css: `${base}body{background:${C.bg};height:760px;padding:30px 40px}
.g{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:22px}
.c{background:#fff;border:1px solid ${C.line};border-radius:20px;padding:20px}
.c b.v{display:block;font-size:34px;font-weight:600;letter-spacing:-.03em;margin-top:6px}
.t{display:grid;grid-template-columns:1.4fr 1fr 80px;align-items:center;padding:12px 0;border-bottom:1px solid ${C.line};font-size:15px}`,
    body: `<div style="display:flex;justify-content:space-between;align-items:center"><div style="display:flex;gap:16px;align-items:center">${logo(34)}<span style="color:${C.mute}">Parent report</span></div><span class="chip" style="background:#fff;border:1px solid ${C.line}">Week of 4 to 10 Nov ▾</span></div>
<div style="font-size:32px;font-weight:600;letter-spacing:-.03em;margin-top:22px">Aarav had a strong week in Maths 🎉</div><div style="color:${C.mute};margin-top:6px">Class 10 · CBSE · sample report, illustrative data</div>
<div class="g">${[["Time studied", "4h 20m", "▲ 45 min vs last week", C.mint], ["Questions tried", "126", "88 solved without the answer", C.mint], ["Topics mastered", "3", "Quadratics, AP, Polynomials", C.violet], ["Needs attention", "1", "Chemical reactions", C.coral]].map(([l, v, s, c]) => `<div class="c"><div class="mono" style="color:${C.mute}">${l}</div><b class="v">${v}</b><div style="font-size:13.5px;color:${c};font-weight:500">${s}</div></div>`).join("")}</div>
<div style="display:grid;grid-template-columns:1.3fr 1fr;gap:14px;margin-top:14px">
<div class="c"><b>Minutes per day</b><div style="display:flex;align-items:flex-end;gap:16px;height:220px;margin-top:20px">${[["Mon", 42], ["Tue", 35], ["Wed", 18], ["Thu", 55], ["Fri", 40], ["Sat", 28], ["Sun", 42]].map(([d, v]) => `<div style="flex:1;text-align:center"><div style="height:${v * 3.6}px;border-radius:10px 10px 4px 4px;background:${v > 40 ? C.violet : "#C4B5FD"}"></div><div style="font-size:12.5px;color:${C.mute};margin-top:8px">${d}</div></div>`).join("")}</div></div>
<div class="c"><b>Topic progress</b>${[["Quadratic equations", "84%", "▲ 12"], ["Arithmetic progressions", "78%", "▲ 9"], ["Trigonometry", "61%", "▲ 4"], ["Chemical reactions", "47%", "▼ 3"]].map(([t, v, d]) => `<div class="t"><span>${t}</span><b>${v}</b><span style="color:${d.startsWith("▲") ? C.mint : C.coral};font-size:13.5px">${d}</span></div>`).join("")}</div></div>
<div class="c" style="margin-top:14px;background:${C.deep};color:#fff;border:none;display:flex;gap:20px;align-items:center"><span style="font-size:30px">💬</span><div style="flex:1"><div class="mono" style="color:${C.sun}">One thing you can do this week</div><div style="font-size:17px;margin-top:6px;line-height:1.5">Ask Aarav to explain balancing a chemical equation to you. Teaching it back is the fastest way to fix a weak topic.</div></div><span class="chip" style="background:#25D366;color:#fff">Sent on WhatsApp · Sun 7 pm</span></div>`,
  });

export default async function learnova() {
  const p = await photos({
    hero: ["1588072432836-e10032774350", 1200],
    parent: ["1522202176988-66273c2fd55f", 1200],
    study: ["1434030216411-0b793f4b4173", 1400],
    desk: ["1503676260728-1c00da094a0b", 2000],
  });
  const h = site(p);
  return {
    screens: [
      { name: "desktop", html: h, width: 1440, height: 900, fullPage: true },
      { name: "mobile", html: h, width: 390, height: 790, fullPage: true },
      { name: "home", html: appHome(), width: 390, height: 790 },
      { name: "hint", html: appHint(), width: 390, height: 790 },
      { name: "voice", html: appVoice(), width: 390, height: 790 },
      { name: "report", html: report(), width: 1440, height: 760 },
    ],
    comps: [
      {
        file: "hero.jpg",
        w: 2000,
        h: 1250,
        html: (s) =>
          stage({
            w: 2000,
            h: 1250,
            fonts,
            body: `${backdrop(`radial-gradient(100% 90% at 80% 10%,#C4B5FD,${C.violet} 45%,${C.deep})`, "rgba(255,240,200,.25)")}
${win({ src: s.desktop, left: 100, top: 150, w: 1500, h: 937, url: "learnova.app" })}
${phone({ src: s.hint, left: 1480, top: 290, w: 400 })}`,
          }),
      },
      {
        file: "mobile.jpg",
        w: 2000,
        h: 1250,
        html: (s) =>
          stage({
            w: 2000,
            h: 1250,
            fonts,
            body: `${backdrop(`linear-gradient(150deg,#FFD873,${C.sun} 45%,#F2A900)`, "rgba(255,255,255,.4)")}
${phone({ src: s.home, left: 300, top: 150, w: 430, statusBg: C.bg })}
${phone({ src: s.hint, left: 785, top: 90, w: 430 })}
${phone({ src: s.voice, left: 1270, top: 150, w: 430, statusBg: C.deep, statusColor: "#fff" })}`,
          }),
      },
      {
        file: "report.jpg",
        w: 2000,
        h: 1250,
        html: (s) =>
          stage({
            w: 2000,
            h: 1250,
            fonts,
            body: `${backdrop(`linear-gradient(160deg,#EFE9FF,#CDBDF7)`)}
${win({ src: s.report, left: 160, top: 155, w: 1680, h: 887, url: "parents.learnova.app/aarav" })}`,
          }),
      },
      {
        file: "site.jpg",
        w: 2000,
        h: 1250,
        html: (s) =>
          stage({
            w: 2000,
            h: 1250,
            fonts,
            body: `${backdrop(`linear-gradient(160deg,#F5F1FF,#DCD0FA)`)}
${win({ src: s.desktop, y: 800, left: 160, top: 110, w: 1680, h: 1140, url: "learnova.app/how-it-works" })}`,
          }),
      },
      {
        file: "detail.jpg",
        w: 1000,
        h: 1250,
        html: (s) =>
          stage({
            w: 1000,
            h: 1250,
            fonts,
            body: `<img src="${p.study}" class="abs" style="inset:0;width:100%;height:100%;object-fit:cover"/><div class="abs" style="inset:0;background:rgba(46,16,101,.3)"></div>
${phone({ src: s.voice, left: 285, top: 220, w: 430, statusBg: C.deep, statusColor: "#fff" })}`,
          }),
      },
      {
        file: "detail-2.jpg",
        w: 1000,
        h: 1250,
        html: (s) =>
          stage({
            w: 1000,
            h: 1250,
            fonts,
            body: `${backdrop(C.deep, "rgba(124,58,237,.5)")}${phone({ src: s.home, left: 285, top: 220, w: 430, statusBg: C.bg })}`,
          }),
      },
    ],
  };
}
