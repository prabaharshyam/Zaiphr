/** Pulse Athletic: monthly short-form content and ad creative engine for a fitness studio (concept, fictional brand). */
import { doc, photos, stage, win, phone, backdrop } from "../kit.mjs";

const C = { black: "#0B0B0C", red: "#FF3B30", bone: "#F2F0EC", grey: "#8B8B8F", dark: "#161618", line: "#2A2A2D" };
const fonts = ["Anton", "Inter Tight:wght@400;500;600;700;800", "JetBrains Mono:wght@500"];

const logo = (s, c = "#fff") => `<span style="display:inline-flex;align-items:center;gap:${s * 0.25}px;font:${s}px/1 'Anton';letter-spacing:.02em;color:${c}"><svg width="${s * 1.3}" height="${s}" viewBox="0 0 52 40"><path d="M2 22h10l5-12 8 22 6-16 4 6h15" fill="none" stroke="${C.red}" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round"/></svg>PULSE</span>`;

const base = `body{font-family:'Inter Tight',sans-serif}.mono{font:500 11.5px 'JetBrains Mono';letter-spacing:.1em;text-transform:uppercase}`;

/** A creative: photo with hook copy, in any aspect ratio. */
const creative = (w, h, src, { kicker, hook, sub, pos = "50% 50%", cta = "Book a free trial", tag = "" }) => `
<div style="position:relative;width:${w}px;height:${h}px;overflow:hidden;border-radius:${w * 0.03}px;background:#000;font-family:'Inter Tight'">
  <img src="${src}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:${pos}"/>
  <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.55) 0%,rgba(0,0,0,0) 32%,rgba(0,0,0,0) 50%,rgba(0,0,0,.85) 100%)"></div>
  <div style="position:absolute;left:${w * 0.07}px;top:${w * 0.07}px;right:${w * 0.07}px;display:flex;justify-content:space-between;align-items:center">${logo(w * 0.055)}${tag ? `<span style="font:700 ${w * 0.032}px 'Inter Tight';background:${C.red};color:#fff;padding:${w * 0.012}px ${w * 0.025}px;border-radius:99px">${tag}</span>` : ""}</div>
  <div style="position:absolute;left:${w * 0.07}px;right:${w * 0.07}px;bottom:${w * 0.08}px;color:#fff">
    <div style="font:700 ${w * 0.036}px 'Inter Tight';letter-spacing:.08em;text-transform:uppercase;color:${C.red}">${kicker}</div>
    <div style="font:${w * (h / w > 1.5 ? 0.15 : 0.12)}px/0.95 'Anton';text-transform:uppercase;margin-top:${w * 0.02}px">${hook}</div>
    ${sub ? `<div style="font:500 ${w * 0.042}px/1.35 'Inter Tight';margin-top:${w * 0.03}px;opacity:.9">${sub}</div>` : ""}
    <div style="display:inline-block;margin-top:${w * 0.045}px;background:#fff;color:#000;font:700 ${w * 0.04}px 'Inter Tight';padding:${w * 0.025}px ${w * 0.05}px;border-radius:99px">${cta} →</div>
  </div>
</div>`;

const site = (p) =>
  doc({
    fonts,
    css: `${base}
body{background:${C.black};color:#fff}
.wrap{max-width:1320px;margin:0 auto;padding:0 48px}
nav{display:flex;justify-content:space-between;align-items:center;height:88px}
nav .l{display:flex;gap:34px;font-size:15px;font-weight:500;color:#cfcfd2}
.btn{display:inline-flex;align-items:center;gap:10px;height:54px;padding:0 28px;border-radius:999px;font-weight:700;font-size:15px}
.btn.r{background:${C.red};color:#fff}.btn.o{border:1.5px solid #fff}
.hero{position:relative;height:780px;border-radius:32px;overflow:hidden}
.hero img{width:100%;height:100%;object-fit:cover}
.hero .t{position:absolute;left:56px;bottom:56px;right:56px}
h1{font:150px/0.88 'Anton';text-transform:uppercase;letter-spacing:.005em}
h1 span{color:${C.red}}
section{padding:96px 0}
h2{font:84px/0.92 'Anton';text-transform:uppercase}
.cls{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:44px}
.cls .c{height:440px;border-radius:24px;overflow:hidden;position:relative}
.cls img{width:100%;height:100%;object-fit:cover}
.cls .c div{position:absolute;left:20px;right:20px;bottom:20px}
.cls h3{font:40px/1 'Anton';text-transform:uppercase}
.sch{background:${C.dark};border-radius:28px;padding:36px;margin-top:44px}
.sch .r{display:grid;grid-template-columns:120px 1.5fr 1fr 1fr 140px;align-items:center;padding:18px 0;border-bottom:1px solid ${C.line};font-size:16px}
.tag{font-size:12.5px;font-weight:700;padding:5px 10px;border-radius:99px;background:#232326;justify-self:start}
.pr{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:44px}
.pr div{border:1px solid ${C.line};border-radius:24px;padding:30px}
.pr .hot{background:${C.red};border-color:${C.red}}
.pr b{display:block;font:60px/1 'Anton';margin-top:16px}
@media(max-width:600px){
 .wrap{padding:0 16px} nav{height:64px} nav .l,.hide-m{display:none}
 .hero{height:620px;border-radius:24px} .hero .t{left:22px;right:22px;bottom:26px} h1{font-size:76px}
 section{padding:56px 0} h2{font-size:52px} .cls{grid-template-columns:1fr 1fr;gap:10px} .cls .c{height:250px} .cls h3{font-size:26px} .cls p{display:none}
 .sch{padding:16px} .sch .r{grid-template-columns:70px 1fr 90px;font-size:14px} .sch .r .hm{display:none}
 .pr{grid-template-columns:1fr}
}`,
    body: `<div class="wrap"><nav>${logo(34)}<div class="l"><span>Classes</span><span>Schedule</span><span>Coaches</span><span>Pricing</span><span>Studio</span></div><span class="btn r" style="height:46px">Free trial</span></nav>
<div class="hero"><img src="${p.hero}"/><div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.1),rgba(0,0,0,.8))"></div>
<div class="t"><div class="mono" style="color:${C.red}">Koramangala · 6 am to 10 pm</div><h1 style="margin-top:14px">Strong is<br/><span>a habit.</span></h1>
<div style="display:flex;gap:12px;margin-top:28px;flex-wrap:wrap"><span class="btn r">Book a free class</span><span class="btn o">See the schedule</span></div></div></div></div>
<section><div class="wrap"><div class="mono" style="color:${C.red}">Classes</div><h2 style="margin-top:12px">Four ways to sweat.</h2>
<div class="cls">${[
      [p.c1, "Strength", "Barbells, kettlebells, progressive plans."],
      [p.c2, "Engine", "Rowers, bikes, intervals that count."],
      [p.c3, "Mobility", "Move better, recover faster."],
      [p.c4, "Pulse HIIT", "45 minutes, all out, all smiles."],
    ]
      .map(([src, t, d]) => `<div class="c"><img src="${src}"/><div><h3>${t}</h3><p style="color:#ddd;margin-top:6px;font-size:14px">${d}</p></div></div>`)
      .join("")}</div></div></section>
<section style="padding-top:0"><div class="wrap"><div style="display:flex;justify-content:space-between;align-items:end"><div><div class="mono" style="color:${C.red}">Today · Wednesday</div><h2 style="margin-top:12px">Grab a spot.</h2></div><span class="btn o hide-m" style="height:46px">Full week →</span></div>
<div class="sch">${[
      ["6:30 am", "Strength · Lower", "Coach Arjun", "4 spots left", "Book"],
      ["7:30 am", "Engine · Row & Ride", "Coach Tanvi", "Full · waitlist", "Join list"],
      ["12:30 pm", "Mobility Flow", "Coach Kabir", "9 spots left", "Book"],
      ["6:00 pm", "Pulse HIIT", "Coach Tanvi", "2 spots left", "Book"],
      ["7:15 pm", "Strength · Upper", "Coach Arjun", "6 spots left", "Book"],
    ]
      .map(([t, c, co, sp, b]) => `<div class="r"><b>${t}</b><span style="font-weight:600">${c}</span><span class="hm" style="color:${C.grey}">${co}</span><span class="tag hm" style="${sp.startsWith("2") ? `background:${C.red}` : ""}">${sp}</span><span class="btn ${b === "Book" ? "r" : "o"}" style="height:40px;padding:0 18px;font-size:13.5px;justify-self:end">${b}</span></div>`)
      .join("")}</div></div></section>
<section style="padding-top:0"><div class="wrap"><div class="mono" style="color:${C.red}">Memberships</div><h2 style="margin-top:12px">No lock-ins.</h2>
<div class="pr"><div><div class="mono" style="color:${C.grey}">Drop-in</div><b>₹700</b><p style="color:${C.grey};margin-top:10px">One class, any time.</p></div><div class="hot"><div class="mono">Most popular</div><b>₹6,500</b><p style="margin-top:10px">Unlimited classes, monthly.</p></div><div><div class="mono" style="color:${C.grey}">10-class pack</div><b>₹5,200</b><p style="color:${C.grey};margin-top:10px">Use within 3 months.</p></div></div></div></section>`,
  });

const reelUi = (src, hook, kicker, pos) =>
  doc({
    fonts,
    css: `${base}body{height:790px;overflow:hidden;background:#000;position:relative}`,
    body: `${creative(390, 790, src, { kicker, hook, pos, sub: "", cta: "Book a free class" })}
<div style="position:absolute;right:12px;bottom:190px;display:flex;flex-direction:column;gap:20px;align-items:center;color:#fff;font:600 12px 'Inter Tight';text-align:center"><div style="font-size:26px">♥<div style="font-size:12px">12.4K</div></div><div style="font-size:24px">💬<div style="font-size:12px">318</div></div><div style="font-size:24px">➤<div style="font-size:12px">1.1K</div></div></div>
<div style="position:absolute;left:0;right:0;bottom:0;height:3px;background:rgba(255,255,255,.3)"><div style="width:38%;height:100%;background:#fff"></div></div>`,
  });

const calendar = () =>
  doc({
    fonts,
    css: `${base}body{background:#F5F5F4;color:#111;height:900px;padding:26px 30px}
.g{display:grid;grid-template-columns:repeat(7,1fr);gap:10px;margin-top:20px}
.d{background:#fff;border-radius:14px;padding:12px;min-height:470px;border:1px solid #E7E6E3}
.it{border-radius:10px;padding:9px 10px;font-size:12.5px;margin-top:8px;line-height:1.35;font-weight:500}
.st{display:inline-block;font:600 10.5px 'JetBrains Mono';letter-spacing:.06em;padding:2px 6px;border-radius:5px;margin-bottom:4px}`,
    body: `<div style="display:flex;justify-content:space-between;align-items:center"><div style="display:flex;gap:16px;align-items:center">${logo(26, "#111")}<span style="font-size:22px;font-weight:700">Content engine · November</span></div>
<div style="display:flex;gap:8px;font-size:13px">${["Reels 16", "Static ads 12", "Stories 20", "Shoots 2"].map((x) => `<span style="background:#fff;border:1px solid #E7E6E3;border-radius:99px;padding:7px 12px">${x}</span>`).join("")}<span style="background:#111;color:#fff;border-radius:99px;padding:7px 12px">Export brief</span></div></div>
<div class="g">${["Mon 11", "Tue 12", "Wed 13", "Thu 14", "Fri 15", "Sat 16", "Sun 17"]
      .map((d, i) => {
        const items = [
          [["Reel", "#FFE1DE", "Hook: 'You don't need motivation'", "Live"], ["Story", "#E6F0FF", "Class poll · Thursday HIIT", "Live"]],
          [["Ad 4:5", "#FFF3D6", "Free trial · Strength", "Testing"], ["Reel", "#FFE1DE", "Coach Tanvi · 3 rower mistakes", "Edit"]],
          [["Shoot", "#111", "Studio day · 14 hooks, 3 coaches", "Today"]],
          [["Reel", "#FFE1DE", "Member story · Priya, 52", "Edit"], ["Ad 9:16", "#FFF3D6", "Engine class · 45 min", "Review"]],
          [["Reel", "#FFE1DE", "Before 7 am club", "Draft"], ["Story", "#E6F0FF", "Weekend schedule", "Draft"], ["Ad 4:5", "#FFF3D6", "Mobility Sundays", "Draft"]],
          [["Ad 1:1", "#FFF3D6", "Bring a friend · 2 for 1", "Draft"]],
          [["Report", "#E9F7EE", "Weekly: best hook, CPL, saves", "Auto"], ["Story", "#E6F0FF", "Next week's schedule", "Scheduled"]],
        ][i];
        return `<div class="d"><div style="font-weight:700;font-size:14px">${d}</div>${items.map(([t, bg, x, s]) => `<div class="it" style="background:${bg};color:${bg === "#111" ? "#fff" : "#111"}"><span class="st" style="background:rgba(0,0,0,.08)">${t}</span><br/>${x}<div style="font-size:11px;opacity:.6;margin-top:4px">● ${s}</div></div>`).join("")}</div>`;
      })
      .join("")}</div>
<div style="display:grid;grid-template-columns:2fr 1fr 1fr;gap:10px;margin-top:12px">
<div class="d" style="min-height:250px"><div class="mono" style="color:#777">Hook bank · top performers (illustrative)</div>${["'You don't need motivation. You need a 6:30 slot.'", "'3 rower mistakes everyone makes'", "'52 and deadlifting 80 kg'"].map((h, i) => `<div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #eee;font-size:14px"><span>${h}</span><b style="color:${C.red}">${["4.1%", "3.6%", "3.2%"][i]} hook rate</b></div>`).join("")}</div>
<div class="d" style="min-height:250px"><div class="mono" style="color:#777">Edit pipeline</div><div style="font-size:14px;line-height:2;margin-top:8px">Raw clips → AI rough cut<br/>Captions in 2 languages<br/>3 aspect ratios auto-reframed<br/>Human final pass</div></div>
<div class="d" style="min-height:250px;background:#111;color:#fff"><div class="mono" style="color:${C.red}">Cost per trial booking</div><div style="font:64px/1 'Anton';margin-top:14px">₹212</div><div style="font-size:12px;opacity:.6;margin-top:6px">Target · illustrative</div></div></div>`,
  });

export default async function pulse() {
  const p = await photos({
    hero: ["1517836357463-d25dfeac3438", 2200],
    c1: ["1583454110551-21f2fa2afe61", 800],
    c2: ["1599058917212-d750089bc07e", 800],
    c3: ["1518611012118-696072aa579a", 800],
    c4: ["1571019613454-1cb2f99b2d8b", 800],
    back: ["1574680096145-d05b474e2155", 1400],
    gym: ["1534438327276-14e5300c3a48", 1400],
    rope: ["1599058917212-d750089bc07e", 1400],
    dl: ["1517836357463-d25dfeac3438", 1400],
  });
  const h = site(p);
  const reels = [
    [p.back, "You don't need<br/>motivation.<br/>You need a<br/>6:30 slot.", "Strength · Koramangala", "50% 30%"],
    [p.rope, "45 minutes.<br/>All out.", "Pulse HIIT", "50% 50%"],
    [p.dl, "3 deadlift<br/>mistakes<br/>everyone<br/>makes", "Coach tips · 1 of 3", "40% 50%"],
  ];
  return {
    screens: [
      { name: "desktop", html: h, width: 1440, height: 900, fullPage: true },
      { name: "mobile", html: h, width: 390, height: 790, fullPage: true },
      { name: "calendar", html: calendar(), width: 1440, height: 900 },
      ...reels.map(([src, hook, kicker, pos], i) => ({ name: `reel${i}`, html: reelUi(src, hook, kicker, pos), width: 390, height: 790 })),
    ],
    comps: [
      {
        file: "hero.jpg",
        w: 2000,
        h: 1250,
        html: () =>
          stage({
            w: 2000,
            h: 1250,
            fonts,
            body: `${backdrop(`radial-gradient(90% 80% at 50% 0%,#2a0d0b,${C.black} 70%)`, "rgba(255,59,48,.18)")}
<div class="abs" style="left:90px;top:170px;transform:rotate(-4deg);box-shadow:0 60px 100px -30px rgba(0,0,0,.8)">${creative(420, 747, p.back, { kicker: "Strength · Koramangala", hook: "You don't need motivation.", sub: "You need a 6:30 slot.", pos: "50% 30%", tag: "Reel" })}</div>
<div class="abs" style="left:560px;top:110px;box-shadow:0 60px 100px -30px rgba(0,0,0,.8)">${creative(520, 650, p.gym, { kicker: "New members · November", hook: "First class<br/>on us.", sub: "Strength, Engine, Mobility, HIIT. 6 am to 10 pm.", tag: "Ad 4:5" })}</div>
<div class="abs" style="left:1130px;top:150px;transform:rotate(3deg);box-shadow:0 60px 100px -30px rgba(0,0,0,.8)">${creative(420, 747, p.rope, { kicker: "Pulse HIIT", hook: "45 minutes.<br/>All out.", tag: "Reel" })}</div>
<div class="abs" style="left:1590px;top:520px;transform:rotate(-2deg);box-shadow:0 60px 100px -30px rgba(0,0,0,.8)">${creative(340, 340, p.c1, { kicker: "Bring a friend", hook: "2 for 1", cta: "Claim", tag: "1:1" })}</div>
<div class="abs" style="left:560px;top:800px;box-shadow:0 60px 100px -30px rgba(0,0,0,.8)">${creative(520, 340, p.dl, { kicker: "Coach tips", hook: "Hinge, don't squat.", cta: "Watch", pos: "40% 40%" })}</div>`,
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
            body: `${backdrop(`linear-gradient(160deg,#1d1d20,#050505)`, "rgba(255,59,48,.2)")}
${win({ src: s.desktop, y: 0, left: 160, top: 110, w: 1680, h: 1140, url: "pulseathletic.in", dark: true })}`,
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
            body: `${backdrop(`linear-gradient(150deg,#FF5A4F,${C.red} 40%,#B3140B)`, "rgba(255,220,210,.35)")}
${phone({ src: s.reel0, left: 300, top: 150, w: 430, statusBg: "#000", statusColor: "#fff" })}
${phone({ src: s.reel1, left: 785, top: 90, w: 430, statusBg: "#000", statusColor: "#fff" })}
${phone({ src: s.reel2, left: 1270, top: 150, w: 430, statusBg: "#000", statusColor: "#fff" })}`,
          }),
      },
      {
        file: "calendar.jpg",
        w: 2000,
        h: 1250,
        html: (s) =>
          stage({
            w: 2000,
            h: 1250,
            fonts,
            body: `${backdrop(`linear-gradient(160deg,#EDECE8,#CFCDC6)`)}
${win({ src: s.calendar, left: 160, top: 110, w: 1680, h: 1050, url: "studio.pulseathletic.in/content" })}`,
          }),
      },
      {
        file: "detail.jpg",
        w: 1000,
        h: 1250,
        html: () =>
          stage({
            w: 1000,
            h: 1250,
            fonts,
            body: `<div class="abs" style="inset:0">${creative(1000, 1250, p.c4, { kicker: "Mobility · Sundays", hook: "Move better.<br/>Lift longer.", sub: "60-minute flow for stiff hips and desk backs.", tag: "Ad 4:5" }).replace("border-radius:30px", "border-radius:0")}</div>`,
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
            body: `${backdrop(C.black, "rgba(255,59,48,.25)")}${phone({ src: s.mobile, y: 1370, left: 285, top: 220, w: 430, statusBg: C.black, statusColor: "#fff" })}`,
          }),
      },
    ],
  };
}
