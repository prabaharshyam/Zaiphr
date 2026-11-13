/** Pearlline Dental: AI voice receptionist, clinic site and call console (concept, fictional brand). */
import { doc, photos, stage, win, phone, backdrop, photoBackdrop } from "../kit.mjs";

const C = { deep: "#073B37", teal: "#2BB3A3", mint: "#D9F4EF", ice: "#F3FBF9", ink: "#0E2321", mute: "#5B7A76", line: "#DCEBE8", coral: "#FF7A59" };
const fonts = ["Plus Jakarta Sans:wght@400;500;600;700;800", "Fraunces:ital,opsz,wght@0,9..144,400;1,9..144,400", "JetBrains Mono:wght@400;500"];

const mark = (s, bg = C.deep, fg = C.mint) =>
  `<svg width="${s}" height="${s}" viewBox="0 0 40 40"><rect width="40" height="40" rx="12" fill="${bg}"/><path d="M11 17c0-5 4-8 9-8s9 3 9 8c0 6-3 14-5 14s-2-6-4-6-2 6-4 6-5-8-5-14z" fill="${fg}"/></svg>`;
const logo = (s, c = C.deep) => `<span style="display:inline-flex;align-items:center;gap:${s * 0.35}px;font:700 ${s * 0.62}px 'Plus Jakarta Sans';letter-spacing:-.02em;color:${c}">${mark(s)}Pearlline<span style="font-weight:400;opacity:.6">Dental</span></span>`;

const base = `body{font-family:'Plus Jakarta Sans',sans-serif;color:${C.ink}}
.mono{font:500 11.5px 'JetBrains Mono';letter-spacing:.08em;text-transform:uppercase}
.pill{display:inline-flex;align-items:center;gap:7px;border-radius:999px;padding:6px 12px;font-size:13px;font-weight:600}`;

const site = (p) =>
  doc({
    fonts,
    css: `${base}
body{background:${C.ice}}
.wrap{max-width:1280px;margin:0 auto;padding:0 48px}
nav{display:flex;justify-content:space-between;align-items:center;height:86px}
nav .l{display:flex;gap:34px;font-size:15px;font-weight:500;color:${C.mute}}
.btn{display:inline-flex;align-items:center;gap:10px;height:54px;padding:0 26px;border-radius:16px;font-weight:600;font-size:15px}
.btn.p{background:${C.deep};color:#fff}.btn.s{background:#fff;border:1px solid ${C.line}}
.hero{display:grid;grid-template-columns:1fr 1.05fr;gap:50px;align-items:center;padding:30px 0 80px}
h1{font:400 92px/0.98 'Fraunces';letter-spacing:-.035em;color:${C.deep}}
h1 em{color:${C.teal}}
.hero .im{position:relative;height:620px;border-radius:32px;overflow:hidden}
.hero .im img{width:100%;height:100%;object-fit:cover}
.call{position:absolute;left:26px;bottom:26px;width:340px;background:rgba(255,255,255,.95);backdrop-filter:blur(8px);border-radius:22px;padding:18px;box-shadow:0 20px 50px -20px rgba(7,59,55,.4)}
.wave{display:flex;gap:3px;align-items:center;height:30px}.wave i{width:3px;border-radius:3px;background:${C.teal}}
.trust{display:flex;gap:40px;margin-top:44px;color:${C.mute};font-size:14px}
.trust b{display:block;color:${C.deep};font-size:26px;font-weight:700}
section{padding:96px 0}
h2{font:400 58px/1.02 'Fraunces';letter-spacing:-.03em;color:${C.deep}}
.svc{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-top:46px}
.svc .c{background:#fff;border:1px solid ${C.line};border-radius:24px;overflow:hidden}
.svc img{height:220px;width:100%;object-fit:cover}
.svc .b{padding:20px 22px 24px}.svc h3{font-size:19px;font-weight:700}
.svc p{color:${C.mute};font-size:14.5px;line-height:1.55;margin-top:8px}
.svc .f{display:flex;justify-content:space-between;margin-top:16px;font-size:14px;font-weight:600}
.pearl{background:${C.deep};border-radius:36px;color:#fff;display:grid;grid-template-columns:1fr 1fr;gap:50px;padding:70px;align-items:center}
.pearl h2{color:#fff}
.bub{max-width:82%;padding:13px 16px;border-radius:18px;font-size:15px;line-height:1.45;margin-top:10px}
.bub.a{background:rgba(255,255,255,.1);border-bottom-left-radius:6px}
.bub.u{background:${C.teal};margin-left:auto;border-bottom-right-radius:6px;color:${C.ink}}
.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:46px}
.steps div{background:#fff;border:1px solid ${C.line};border-radius:24px;padding:28px}
.steps b{font:400 46px 'Fraunces';color:${C.teal}}
.visit{display:grid;grid-template-columns:1.1fr 1fr;gap:40px;align-items:stretch}
.visit img{width:100%;height:100%;min-height:420px;object-fit:cover;border-radius:28px}
.visit .card{background:#fff;border:1px solid ${C.line};border-radius:28px;padding:40px}
.visit .r{display:flex;justify-content:space-between;padding:14px 0;border-bottom:1px solid ${C.line};font-size:15px}
footer{padding:50px 0;color:${C.mute};font-size:14px;border-top:1px solid ${C.line};margin-top:40px}
@media(max-width:600px){
 .wrap{padding:0 20px} nav{height:64px} nav .l,.hide-m{display:none} nav .btn{white-space:nowrap;height:38px!important;padding:0 14px;font-size:13px;border-radius:12px}
 .hero{grid-template-columns:1fr;gap:26px;padding:10px 0 50px} h1{font-size:54px} .hero .im{height:420px} .call{width:auto;right:16px;left:16px;bottom:16px}
 .trust{gap:22px;flex-wrap:wrap} section{padding:56px 0} h2{font-size:40px}
 .svc,.steps,.visit,.pearl{grid-template-columns:1fr} .svc{grid-template-columns:1fr 1fr;gap:12px} .svc img{height:130px} .svc p{display:none}
 .pearl{padding:36px 22px;border-radius:28px;gap:26px}
}`,
    body: `<div class="wrap"><nav>${logo(38)}<div class="l"><span>Treatments</span><span>Aligners</span><span>Our clinic</span><span>Prices</span><span>Contact</span></div>
<div style="display:flex;gap:12px"><span class="btn s hide-m" style="height:46px">☎ 080 4719 2200</span><span class="btn p" style="height:46px">Book a visit</span></div></nav>
<div class="hero"><div><span class="pill" style="background:${C.mint};color:${C.deep}">● Calls answered 24/7, in English, Hindi and Kannada</span>
<h1 style="margin-top:26px">Gentle dentistry,<br/><em>booked in a minute.</em></h1>
<p style="font-size:19px;line-height:1.6;color:${C.mute};margin-top:24px;max-width:500px">Call any time and Pearl, our AI receptionist, finds you a slot, books it and sends the details on WhatsApp. Our dentists take it from there.</p>
<div style="display:flex;gap:12px;margin-top:34px;flex-wrap:wrap"><span class="btn p">Book a check-up · ₹499</span><span class="btn s">☎ Call the clinic</span></div>
<div class="trust"><div><b>14 yrs</b>in HSR Layout</div><div><b>Same week</b>appointments</div><div><b>0%</b>EMI on aligners</div></div></div>
<div class="im"><img src="${p.hero}"/><div class="call"><div style="display:flex;justify-content:space-between;align-items:center"><span class="mono" style="color:${C.teal}">● Pearl · on a call</span><span class="mono" style="color:${C.mute}">01:12</span></div>
<div class="wave" style="margin-top:12px">${[8, 14, 22, 12, 26, 18, 9, 20, 28, 14, 8, 18, 24, 12, 16, 22, 10, 6, 14, 20, 26, 12, 8, 16].map((h) => `<i style="height:${h}px"></i>`).join("")}</div>
<div style="font-size:14.5px;margin-top:12px;line-height:1.45">"Thursday at 6:30 pm is free with Dr. Rao. Shall I book your cleaning?"</div></div></div></div></div>
<section style="padding-top:20px"><div class="wrap"><div class="mono" style="color:${C.teal}">Treatments</div><h2 style="margin-top:12px">Everything your smile needs,<br/>under one roof.</h2>
<div class="svc">${[
      [p.s1, "Cleaning & check-up", "A 45-minute clean, polish and full exam with X-rays if needed.", "from ₹499"],
      [p.s2, "Clear aligners", "Invisible aligners with a 3D preview of your new smile.", "from ₹54,000"],
      [p.s3, "Implants", "Single-tooth and full-arch implants, planned on a 3D scan.", "from ₹28,000"],
      [p.s4, "Root canal", "Single-sitting RCT under the microscope, with a crown.", "from ₹6,500"],
    ]
      .map(([src, t, d, pr]) => `<div class="c"><img src="${src}"/><div class="b"><h3>${t}</h3><p>${d}</p><div class="f"><span>${pr}</span><span style="color:${C.teal}">Book →</span></div></div></div>`)
      .join("")}</div></div></section>
<section style="padding-top:0"><div class="wrap"><div class="pearl"><div><div class="mono" style="color:${C.teal}">Meet Pearl</div><h2 style="margin-top:12px">Never on hold.<br/>Never a missed call.</h2>
<p style="opacity:.75;font-size:17px;line-height:1.65;margin-top:20px">Pearl answers in under two rings, day or night, checks the dentists' calendars, books or moves your visit and reminds you the day before. Anything clinical goes straight to our team.</p>
<div style="display:flex;gap:10px;margin-top:26px;flex-wrap:wrap"><span class="pill" style="background:rgba(255,255,255,.1)">English</span><span class="pill" style="background:rgba(255,255,255,.1)">हिंदी</span><span class="pill" style="background:rgba(255,255,255,.1)">ಕನ್ನಡ</span></div></div>
<div><div class="bub u">Hi, I have a toothache since last night. Can I come in today?</div><div class="bub a">I'm sorry to hear that. Dr. Mehta has an emergency slot at 4:15 pm today. Shall I book it?</div><div class="bub u">Yes please.</div><div class="bub a">Done. You'll get the address and a map on WhatsApp in a moment. Take care until then.</div></div></div></div></section>
<section style="padding-top:0"><div class="wrap"><div class="mono" style="color:${C.teal}">How booking works</div><h2 style="margin-top:12px">Three steps. One minute.</h2>
<div class="steps"><div><b>01</b><h3 style="font-size:20px;margin-top:10px">Call or WhatsApp</h3><p style="color:${C.mute};margin-top:8px;line-height:1.55">Any hour, any day. Pearl picks up on the second ring.</p></div><div><b>02</b><h3 style="font-size:20px;margin-top:10px">Pick a slot</h3><p style="color:${C.mute};margin-top:8px;line-height:1.55">She offers the next three free times with the right dentist.</p></div><div><b>03</b><h3 style="font-size:20px;margin-top:10px">Get reminded</h3><p style="color:${C.mute};margin-top:8px;line-height:1.55">Confirmation now, a reminder the day before, reschedule in one tap.</p></div></div></div></section>
<section style="padding-top:0"><div class="wrap visit"><img src="${p.room}"/><div class="card"><div class="mono" style="color:${C.teal}">Visit us</div><h2 style="margin-top:12px;font-size:46px">27th Main,<br/>HSR Layout</h2>
<div style="margin-top:24px"><div class="r"><span>Monday to Saturday</span><b>9 am to 8 pm</b></div><div class="r"><span>Sunday</span><b>10 am to 2 pm</b></div><div class="r"><span>Phone line</span><b>24/7 with Pearl</b></div><div class="r"><span>Parking</span><b>Free, basement</b></div></div></div></div></section>
<div class="wrap"><footer>${logo(30)}<div style="margin-top:14px">© 2026 Pearlline Dental Care · HSR Layout, Bengaluru</div></footer></div>`,
  });

const console_ = (p) =>
  doc({
    fonts,
    css: `${base}
body{background:#F6F8F8;display:grid;grid-template-columns:250px 1fr;height:900px}
.side{background:#fff;border-right:1px solid ${C.line};padding:24px 18px}
.side .i{padding:11px 14px;border-radius:12px;font-size:14.5px;color:${C.mute};font-weight:500;margin-top:4px;display:flex;justify-content:space-between}
.side .i.on{background:${C.mint};color:${C.deep};font-weight:600}
main{padding:26px 30px;display:grid;grid-template-columns:1.25fr 1fr;grid-template-rows:auto auto 1fr;gap:20px}
.kpis{grid-column:1/3;display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.k{background:#fff;border:1px solid ${C.line};border-radius:18px;padding:18px 20px}
.k b{display:block;font-size:32px;font-weight:700;margin-top:6px;letter-spacing:-.02em}
.card{background:#fff;border:1px solid ${C.line};border-radius:20px;padding:20px 22px;overflow:hidden}
.t{display:flex;gap:12px;margin-top:14px;font-size:14px;line-height:1.5}
.t .who{flex:none;width:56px;font:500 11px 'JetBrains Mono';color:${C.mute};padding-top:3px}
.t.a .txt{color:${C.deep}}
.tag{font:600 12px 'Plus Jakarta Sans';padding:4px 9px;border-radius:8px}
.cal{display:grid;grid-template-columns:50px repeat(5,1fr);font-size:12px}
.cal .h{padding:8px;color:${C.mute};font-weight:600;border-bottom:1px solid ${C.line}}
.cal .s{height:44px;border-bottom:1px dashed ${C.line};border-left:1px solid ${C.line};position:relative}
.ap{position:absolute;left:4px;right:4px;border-radius:8px;padding:5px 7px;font-size:11.5px;font-weight:600;line-height:1.25}
.row{display:flex;align-items:center;gap:12px;padding:11px 0;border-bottom:1px solid ${C.line};font-size:14px}`,
    body: `<div class="side">${logo(34)}<div class="mono" style="color:${C.mute};margin:30px 0 8px 14px">Front desk</div>
${[["Live calls", "1"], ["Call log", ""], ["Appointments", ""], ["Reminders", "38"], ["Patients", ""], ["Pearl settings", ""], ["Reports", ""]].map(([t, n], i) => `<div class="i ${i === 0 ? "on" : ""}"><span>${t}</span>${n ? `<span class="tag" style="background:${i === 0 ? C.teal : C.mint};color:${C.deep}">${n}</span>` : ""}</div>`).join("")}
<div style="position:absolute;bottom:24px;left:18px;width:214px;background:${C.deep};color:#fff;border-radius:16px;padding:16px"><div class="mono" style="color:${C.teal}">Pearl status</div><div style="font-weight:600;margin-top:6px">● Answering · 3 lines</div><div style="font-size:12.5px;opacity:.7;margin-top:4px">English · Hindi · Kannada</div></div></div>
<main><div style="grid-column:1/3;display:flex;justify-content:space-between;align-items:center"><div><div style="font-size:26px;font-weight:700;letter-spacing:-.02em">Good evening, Dr. Rao</div><div style="color:${C.mute};margin-top:4px">Wednesday, 13 November · clinic closed, Pearl is on the phones</div></div><div style="display:flex;gap:10px"><span class="pill" style="background:#fff;border:1px solid ${C.line}">Today ▾</span><span class="pill" style="background:${C.deep};color:#fff">Export</span></div></div>
<div class="kpis">${[["Calls answered", "46", "100% · 0 missed", C.teal], ["Appointments booked", "19", "41% of calls", C.teal], ["After-hours calls", "12", "would have gone to voicemail", C.coral], ["Avg. time to book", "1m 48s", "from first ring", C.teal]].map(([l, v, s, c]) => `<div class="k"><div class="mono" style="color:${C.mute}">${l}</div><b>${v}</b><div style="font-size:13px;color:${c};font-weight:600">${s}</div></div>`).join("")}</div>
<div class="card" style="grid-row:3"><div style="display:flex;justify-content:space-between;align-items:center"><div><div class="mono" style="color:${C.teal}">● Live · line 2 · 01:12</div><div style="font-size:18px;font-weight:700;margin-top:6px">+91 98861 ••• 40 · returning patient</div></div><span class="tag" style="background:${C.mint};color:${C.deep}">Intent: book cleaning</span></div>
<div style="display:flex;gap:3px;align-items:center;height:34px;margin-top:14px">${Array.from({ length: 70 }, (_, i) => `<i style="display:block;width:3px;border-radius:3px;height:${6 + Math.round(Math.abs(Math.sin(i * 0.7) * 22 + Math.cos(i * 1.9) * 8))}px;background:${i < 48 ? C.teal : C.line}"></i>`).join("")}</div>
${[["Caller", "Hi, I wanted to book a cleaning. It's been almost a year."], ["Pearl", "Happy to help, Ananya. I can see your last visit was in December with Dr. Rao. Would you like to see her again?"], ["Caller", "Yes. Anything after six on a weekday?"], ["Pearl", "Thursday at 6:30 pm or Monday at 7:00 pm are free. Which works better?"], ["Caller", "Thursday is perfect."], ["Pearl", "Booked: cleaning with Dr. Rao, Thursday 14 Nov at 6:30 pm. I'll send the details on WhatsApp now."]].map(([w, t]) => `<div class="t ${w === "Pearl" ? "a" : ""}"><span class="who">${w.toUpperCase()}</span><span class="txt">${t}</span></div>`).join("")}
<div style="display:flex;gap:10px;margin-top:18px"><span class="pill" style="background:${C.mint};color:${C.deep}">✓ Slot held</span><span class="pill" style="background:${C.mint};color:${C.deep}">✓ WhatsApp queued</span><span class="pill" style="background:#fff;border:1px solid ${C.line}">Take over call</span></div></div>
<div class="card" style="grid-row:3;padding:16px 0 0"><div style="display:flex;justify-content:space-between;padding:0 18px 12px"><b>Thursday, 14 Nov</b><span class="mono" style="color:${C.mute}">3 chairs</span></div>
<div class="cal"><div class="h"></div>${["Dr. Rao", "Dr. Mehta", "Hygiene", "Ortho", "Kids"].map((d) => `<div class="h">${d}</div>`).join("")}
${["4 pm", "4:30", "5 pm", "5:30", "6 pm", "6:30", "7 pm", "7:30", "8 pm"].map((t, r) => `<div class="s" style="border-left:none;font-size:11px;color:${C.mute};padding:4px">${t}</div>${[0, 1, 2, 3, 4].map((c) => `<div class="s">${{ "0-1": ["RCT · S. Iyer", "#E3F1FF", "#1F5FAE", 2], "1-0": ["Consult · V. Nair", C.mint, C.deep, 1], "2-2": ["Cleaning · K. Shah", C.mint, C.deep, 2], "3-3": ["Aligner review", "#F3E8FF", "#6B33B5", 1], "5-0": ["● Cleaning · Ananya R.", C.teal, C.ink, 1], "4-4": ["Kids check-up", "#FFF1E6", "#B5541A", 2], "6-1": ["Implant · R. Das", "#E3F1FF", "#1F5FAE", 2], "7-2": ["Cleaning · P. Gill", C.mint, C.deep, 1] }[`${r}-${c}`] ? (([l, bg, fg, n]) => `<div class="ap" style="top:4px;height:${n * 44 - 8}px;background:${bg};color:${fg}">${l}</div>`)({ "0-1": ["RCT · S. Iyer", "#E3F1FF", "#1F5FAE", 2], "1-0": ["Consult · V. Nair", C.mint, C.deep, 1], "2-2": ["Cleaning · K. Shah", C.mint, C.deep, 2], "3-3": ["Aligner review", "#F3E8FF", "#6B33B5", 1], "5-0": ["● Cleaning · Ananya R.", C.teal, C.ink, 1], "4-4": ["Kids check-up", "#FFF1E6", "#B5541A", 2], "6-1": ["Implant · R. Das", "#E3F1FF", "#1F5FAE", 2], "7-2": ["Cleaning · P. Gill", C.mint, C.deep, 1] }[`${r}-${c}`]) : ""}</div>`).join("")}`).join("")}</div></div>
</main>`,
  });

const callScreen = (p) =>
  doc({
    fonts,
    css: `${base}body{height:790px;background:linear-gradient(180deg,#0B302D,#071F1D);color:#fff;text-align:center;padding:40px 26px}
.wave{display:flex;gap:4px;justify-content:center;align-items:center;height:60px;margin-top:34px}.wave i{width:4px;border-radius:4px;background:${C.teal}}
.tr{text-align:left;margin-top:30px}.b{padding:12px 15px;border-radius:18px;font-size:15px;line-height:1.45;margin-top:10px;max-width:88%}
.btns{position:absolute;left:0;right:0;bottom:60px;display:flex;justify-content:center;gap:40px}.btns span{width:72px;height:72px;border-radius:50%;display:grid;place-items:center;font-size:26px}`,
    body: `<div class="mono" style="color:${C.teal}">Pearlline Dental · Pearl</div><div style="font-size:30px;font-weight:700;margin-top:14px;letter-spacing:-.02em">Booking your visit</div><div style="opacity:.6;margin-top:6px">01:12 · HD voice</div>
<div style="margin:30px auto 0;width:110px;height:110px;border-radius:50%;background:radial-gradient(circle,${C.teal},#0E6B62);display:grid;place-items:center;box-shadow:0 0 0 14px rgba(43,179,163,.15),0 0 0 30px rgba(43,179,163,.07)">${mark(54, "transparent", "#fff")}</div>
<div class="wave">${[10, 22, 36, 18, 44, 28, 14, 38, 52, 26, 12, 30, 44, 20, 10, 24, 40, 16].map((h) => `<i style="height:${h}px"></i>`).join("")}</div>
<div class="tr"><div class="b" style="background:rgba(255,255,255,.1)">Thursday at 6:30 pm is free with Dr. Rao. Shall I book your cleaning?</div><div class="b" style="background:${C.teal};color:${C.ink};margin-left:auto">Yes, Thursday works.</div><div class="b" style="background:rgba(255,255,255,.1)">Done. Details are on their way to WhatsApp.</div></div>
<div class="btns"><span style="background:rgba(255,255,255,.12)">🔇</span><span style="background:rgba(255,255,255,.12)">⌨</span><span style="background:#FF3B30">✕</span></div>`,
  });

const whatsapp = () =>
  doc({
    fonts,
    css: `${base}body{height:790px;background:#EFE7DE;font-family:-apple-system,'Plus Jakarta Sans',sans-serif}
.top{background:#F7F7F7;display:flex;align-items:center;gap:12px;padding:10px 16px;border-bottom:1px solid #ddd}
.m{max-width:80%;background:#fff;border-radius:12px;padding:10px 12px;font-size:15px;line-height:1.45;margin:10px 14px;box-shadow:0 1px 1px rgba(0,0,0,.08)}
.m.o{background:#D9FDD3;margin-left:auto}
.time{font-size:11px;color:#888;text-align:right;margin-top:4px}
.qr{display:flex;gap:8px;margin:0 14px}.qr span{flex:1;background:#fff;border-radius:10px;text-align:center;padding:10px;color:#0A7CFF;font-size:14.5px;box-shadow:0 1px 1px rgba(0,0,0,.08)}`,
    body: `<div class="top"><span style="font-size:22px;color:#0A7CFF">‹</span>${mark(38)}<div><div style="font-weight:600">Pearlline Dental <span style="color:#25D366">✓</span></div><div style="font-size:12.5px;color:#777">Business account</div></div></div>
<div style="text-align:center;margin:12px"><span style="background:#fff;border-radius:8px;padding:5px 10px;font-size:12px;color:#666">Today</span></div>
<div class="m"><div style="height:120px;border-radius:8px;background:linear-gradient(135deg,${C.mint},#a7e3d9);display:grid;place-items:center;margin-bottom:10px">${mark(56)}</div><b>Your visit is booked ✓</b><br/>Cleaning with Dr. Rao<br/>📅 Thu, 14 Nov · 6:30 pm<br/>📍 27th Main, HSR Layout<br/><span style="color:#5B7A76">Arrive 10 min early. Free basement parking.</span><div class="time">8:42 pm</div></div>
<div class="qr"><span>📍 Directions</span><span>↻ Reschedule</span></div>
<div style="text-align:center;margin:16px"><span style="background:#fff;border-radius:8px;padding:5px 10px;font-size:12px;color:#666">Tomorrow</span></div>
<div class="m">Hi Ananya, a reminder that your cleaning with Dr. Rao is <b>today at 6:30 pm</b>. Reply 1 to confirm or 2 to move it.<div class="time">10:00 am</div></div>
<div class="m o">1<div class="time">10:03 am ✓✓</div></div>
<div class="m">Confirmed. See you this evening! 😊<div class="time">10:03 am</div></div>`,
  });

export default async function pearlline() {
  const p = await photos({
    hero: ["1629909613654-28e377c37b09", 1600],
    s1: ["1606811971618-4486d14f3f99", 800],
    s2: ["1609840114035-3c981b782dfe", 800],
    s3: ["1588776814546-1ffcf47267a5", 800],
    s4: ["1598256989800-fe5f95da9787", 800],
    room: ["1598256989800-fe5f95da9787", 1400],
    smile: ["1609840114035-3c981b782dfe", 1400],
  });
  const h = site(p);
  return {
    screens: [
      { name: "desktop", html: h, width: 1440, height: 900, fullPage: true },
      { name: "mobile", html: h, width: 390, height: 790, fullPage: true },
      { name: "console", html: console_(p), width: 1440, height: 900 },
      { name: "call", html: callScreen(p), width: 390, height: 790 },
      { name: "whatsapp", html: whatsapp(), width: 390, height: 790 },
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
            body: `${backdrop(`radial-gradient(120% 90% at 80% 20%,#5fd1c2,${C.teal} 40%,#0f6f66 80%,${C.deep})`, "rgba(217,244,239,.35)")}
${win({ src: s.console, left: 100, top: 150, w: 1500, h: 937, url: "desk.pearlline.in/live" })}
${phone({ src: s.call, left: 1480, top: 290, w: 400, statusBg: "#0B302D", statusColor: "#fff" })}`,
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
            body: `${backdrop(`linear-gradient(160deg,#E7F6F3,#BFE6DF)`)}
${win({ src: s.desktop, y: 0, left: 160, top: 110, w: 1680, h: 1140, url: "pearlline.in" })}`,
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
            body: `${backdrop(`linear-gradient(150deg,#0F4B46,${C.deep})`, "rgba(43,179,163,.35)")}
${phone({ src: s.mobile, y: 0, left: 300, top: 150, w: 430, statusBg: C.ice, statusColor: C.ink })}
${phone({ src: s.call, y: 0, left: 785, top: 90, w: 430, statusBg: "#0B302D", statusColor: "#fff" })}
${phone({ src: s.whatsapp, y: 0, left: 1270, top: 150, w: 430, statusBg: "#F7F7F7", statusColor: "#111" })}`,
          }),
      },
      {
        file: "flow.jpg",
        w: 2000,
        h: 1250,
        html: () =>
          stage({
            w: 2000,
            h: 1250,
            fonts,
            css: `${base}.n{position:absolute;width:300px;background:#fff;border:1px solid ${C.line};border-radius:22px;padding:22px 24px;box-shadow:0 30px 60px -30px rgba(7,59,55,.35)}
.n b{display:block;font-size:20px;margin-top:8px}.n p{color:${C.mute};font-size:15px;line-height:1.5;margin-top:6px}
.ln{position:absolute;height:2px;background:repeating-linear-gradient(90deg,${C.teal} 0 8px,transparent 8px 14px)}`,
            body: `${backdrop(C.ice, "rgba(217,244,239,.9)")}
<div class="abs" style="left:100px;top:90px"><div class="mono" style="color:${C.teal}">System design</div><div style="font:400 64px/1 'Fraunces';letter-spacing:-.03em;color:${C.deep};margin-top:14px">From first ring to filled chair</div></div>
${[
              [100, 310, "01 · Ring", "Patient calls", "Any hour. Pearl answers on the second ring on the clinic's own number."],
              [520, 310, "02 · Understand", "Intent + language", "Booking, reschedule, emergency or question. English, Hindi or Kannada."],
              [940, 310, "03 · Check", "Live calendar", "Reads each dentist's chair time and treatment length before offering slots."],
              [1360, 310, "04 · Book", "Slot confirmed", "Writes the appointment into the practice calendar with notes."],
              [520, 690, "05 · Confirm", "WhatsApp message", "Details, map and a reschedule button, seconds after the call ends."],
              [940, 690, "06 · Remind", "Day-before nudge", "Reply 1 to confirm, 2 to move. Freed slots go back on offer."],
              [1360, 690, "Handoff", "Clinical questions", "Pain, bleeding or anything medical is transferred to a person, with a summary."],
            ]
              .map(([l, t, m, b, d]) => `<div class="n" style="left:${l}px;top:${t}px"><div class="mono" style="color:${C.teal}">${m}</div><b>${b}</b><p>${d}</p></div>`)
              .join("")}
<div class="ln" style="left:400px;top:400px;width:120px"></div><div class="ln" style="left:820px;top:400px;width:120px"></div><div class="ln" style="left:1240px;top:400px;width:120px"></div>
<div class="abs" style="left:1510px;top:530px;width:2px;height:160px;background:repeating-linear-gradient(180deg,${C.teal} 0 8px,transparent 8px 14px)"></div>
<div class="ln" style="left:820px;top:780px;width:120px"></div>
<div class="abs" style="left:100px;top:690px;width:300px;height:250px;border-radius:22px;background:${C.deep};color:#fff;padding:24px"><div class="mono" style="color:${C.teal}">Guardrails</div><div style="font-size:16px;line-height:1.7;margin-top:12px;opacity:.85">No diagnosis or medical advice<br/>Caller can ask for a human anytime<br/>Every call logged and summarised<br/>Consent line at the start</div></div>`,
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
            body: `${photoBackdrop(p.smile, "rgba(7,59,55,.25)")}
${phone({ src: s.whatsapp, left: 285, top: 220, w: 430, statusBg: "#F7F7F7", statusColor: "#111" })}`,
          }),
      },
      {
        file: "detail-2.jpg",
        w: 1000,
        h: 1250,
        html: () =>
          stage({
            w: 1000,
            h: 1250,
            fonts,
            css: base,
            body: `${backdrop(C.deep, "rgba(43,179,163,.35)")}
<div class="abs" style="left:70px;right:70px;top:80px;color:#fff"><div class="mono" style="color:${C.teal}">Weekly report · sample</div><div style="font:400 66px/1.02 'Fraunces';letter-spacing:-.03em;margin-top:16px">What Pearl did<br/>this week</div></div>
<div class="abs" style="left:70px;right:70px;top:420px;display:grid;grid-template-columns:1fr 1fr;gap:18px">${[["Calls answered", "312"], ["Booked", "131"], ["After hours", "84"], ["Rescheduled", "27"]].map(([l, v]) => `<div style="background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:20px;padding:24px;color:#fff"><div class="mono" style="color:${C.teal}">${l}</div><div style="font-size:54px;font-weight:700;letter-spacing:-.03em;margin-top:8px">${v}</div></div>`).join("")}</div>
<div class="abs" style="left:70px;right:70px;top:880px;background:#fff;border-radius:20px;padding:24px;height:280px"><div class="mono" style="color:${C.mute}">Calls by hour</div>
<div style="display:flex;align-items:flex-end;gap:9px;height:180px;margin-top:20px">${[4, 6, 9, 14, 18, 16, 12, 15, 19, 22, 17, 11, 9, 13, 8, 6, 9, 7, 5, 3, 2, 4].map((v, i) => `<i style="flex:1;height:${v * 8}px;border-radius:5px 5px 2px 2px;background:${i > 14 ? C.coral : C.teal}"></i>`).join("")}</div></div>
<div class="abs mono" style="left:70px;bottom:40px;color:rgba(255,255,255,.5)">Illustrative data · concept project</div>`,
          }),
      },
    ],
  };
}
