/** Skyhaven Realty: WhatsApp lead qualification + CRM, with the developer's site (concept, fictional brand). */
import { doc, photos, stage, win, phone, backdrop, photoBackdrop } from "../kit.mjs";

const C = { night: "#0F1418", ink: "#161C21", gold: "#C9A227", sand: "#F4EFE6", stone: "#E6DED0", mute: "#7C7F80", line: "#E5E0D6", green: "#1FA35B" };
const fonts = ["Bodoni Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;1,6..96,400", "Manrope:wght@400;500;600;700"];

const logo = (s, c = C.night) => `<span style="display:inline-flex;align-items:center;gap:${s * 0.3}px;color:${c}"><svg width="${s}" height="${s}" viewBox="0 0 40 40"><path d="M6 34V18L20 6l14 12v16" fill="none" stroke="${C.gold}" stroke-width="2.4"/><path d="M14 34V22h12v12" fill="none" stroke="currentColor" stroke-width="2.4"/></svg><span style="font:500 ${s * 0.6}px 'Bodoni Moda';letter-spacing:.14em">SKYHAVEN</span></span>`;

const base = `body{font-family:'Manrope',sans-serif;color:${C.ink}}.up{font-size:12px;letter-spacing:.2em;text-transform:uppercase;font-weight:600}`;

const site = (p) =>
  doc({
    fonts,
    css: `${base}
body{background:${C.sand}}
.wrap{max-width:1320px;margin:0 auto;padding:0 48px}
.hero{position:relative;height:880px;color:#fff}
.hero img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.hero::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(15,20,24,.55),rgba(15,20,24,.05) 30%,rgba(15,20,24,.75))}
nav{position:relative;z-index:2;display:flex;justify-content:space-between;align-items:center;height:96px}
nav .l{display:flex;gap:36px;font-size:14px;font-weight:500}
.btn{display:inline-flex;align-items:center;gap:10px;height:54px;padding:0 28px;font-weight:600;font-size:14px;letter-spacing:.06em}
.btn.g{background:${C.gold};color:${C.night}}.btn.o{border:1px solid rgba(255,255,255,.6);color:#fff}.btn.wa{background:${C.green};color:#fff}
.hero .t{position:absolute;z-index:2;left:0;right:0;bottom:70px}
h1{font:400 104px/0.95 'Bodoni Moda';letter-spacing:-.02em}
h1 em{color:${C.gold}}
.facts{display:flex;gap:60px;margin-top:44px;padding-top:28px;border-top:1px solid rgba(255,255,255,.25)}
.facts b{display:block;font:400 34px 'Bodoni Moda'}
.facts span{font-size:13px;opacity:.75;letter-spacing:.08em}
section{padding:100px 0}
h2{font:400 60px/1.02 'Bodoni Moda';letter-spacing:-.01em}
.proj{display:grid;grid-template-columns:repeat(3,1fr);gap:26px;margin-top:50px}
.proj .im{height:420px;position:relative;overflow:hidden}.proj img{width:100%;height:100%;object-fit:cover}
.proj .st{position:absolute;left:18px;top:18px;background:${C.sand};padding:7px 12px;font-size:11px;letter-spacing:.14em;font-weight:700;text-transform:uppercase}
.proj h3{font:400 30px 'Bodoni Moda';margin-top:20px}
.proj .m{display:flex;justify-content:space-between;color:${C.mute};font-size:14.5px;margin-top:8px;border-bottom:1px solid ${C.line};padding-bottom:16px}
.proj .pr{display:flex;justify-content:space-between;margin-top:14px;font-weight:600}
.am{display:grid;grid-template-columns:1.1fr 1fr;gap:70px;align-items:center}
.am img{width:100%;height:600px;object-fit:cover}
.am ul{list-style:none;margin-top:28px;columns:2;column-gap:30px}
.am li{padding:14px 0;border-bottom:1px solid ${C.line};font-size:15.5px}
.visit{background:${C.night};color:#fff;padding:80px;display:grid;grid-template-columns:1.2fr 1fr;gap:50px;align-items:center}
.slot{display:flex;gap:10px;margin-top:20px}.slot span{border:1px solid rgba(255,255,255,.25);padding:14px 18px;font-size:14px}
.slot .on{background:${C.gold};color:${C.night};border-color:${C.gold}}
footer{padding:50px 0;color:${C.mute};font-size:13.5px}
@media(max-width:600px){
 .wrap{padding:0 20px} nav{height:70px} nav .l,.hide-m{display:none} .hero{height:760px} h1{font-size:56px} .hero .t{bottom:36px}
 .facts{gap:24px;flex-wrap:wrap} .facts b{font-size:26px} section{padding:56px 0} h2{font-size:40px}
 .proj,.am,.visit{grid-template-columns:1fr} .proj .im{height:300px} .am img{height:340px} .am{gap:30px} .am ul{columns:1}
 .visit{padding:40px 22px} .slot{flex-wrap:wrap}
}`,
    body: `<div class="hero"><img src="${p.hero}"/><div class="wrap"><nav>${logo(40, "#fff")}<div class="l"><span>Residences</span><span>Villas</span><span>Locations</span><span>About</span></div><span class="btn g hide-m" style="height:46px">Book a site visit</span></nav></div>
<div class="t"><div class="wrap"><div class="up" style="color:${C.gold}">Now launching · Whitefield, Bengaluru</div><h1 style="margin-top:20px">Skyhaven<br/><em>Residences</em></h1>
<p style="font-size:19px;line-height:1.6;max-width:540px;margin-top:22px;opacity:.9">3 and 4 BHK sky villas with private decks, 400 m from the metro. RERA registered, possession December 2028.</p>
<div style="display:flex;gap:12px;margin-top:30px;flex-wrap:wrap"><span class="btn wa">💬 Chat on WhatsApp</span><span class="btn o">Download brochure</span></div>
<div class="facts"><div><b>₹1.85 Cr</b><span>STARTING PRICE</span></div><div><b>2,140 sq ft</b><span>FROM, 3 BHK</span></div><div><b>4.2 acres</b><span>72% OPEN SPACE</span></div><div class="hide-m"><b>Dec 2028</b><span>POSSESSION</span></div></div></div></div></div>
<section><div class="wrap"><div class="up" style="color:${C.gold}">Our projects</div><h2 style="margin-top:14px">Three addresses,<br/>one standard.</h2>
<div class="proj">${[
      [p.p1, "Now launching", "Skyhaven Residences", "Whitefield", "3 & 4 BHK", "₹1.85 Cr onwards"],
      [p.p2, "Ready to move", "Skyhaven Villas", "Sarjapur Road", "4 BHK villas", "₹3.4 Cr onwards"],
      [p.p3, "Sold out · resale", "Skyhaven Heights", "Hebbal", "2 & 3 BHK", "On request"],
    ]
      .map(([src, st, n, loc, c, pr]) => `<div><div class="im"><img src="${src}"/><span class="st">${st}</span></div><h3>${n}</h3><div class="m"><span>${loc}</span><span>${c}</span></div><div class="pr"><span>${pr}</span><span style="color:${C.gold}">View →</span></div></div>`)
      .join("")}</div></div></section>
<section style="padding-top:0"><div class="wrap am"><img src="${p.interior}"/><div><div class="up" style="color:${C.gold}">Inside the residences</div><h2 style="margin-top:14px">Light on three sides.<br/>Sky on the fourth.</h2>
<p style="color:${C.mute};font-size:17px;line-height:1.7;margin-top:20px">Every home is a corner home, with floor-to-ceiling glass, a 9 ft deck and a private lift lobby.</p>
<ul>${["Private lift lobby", "9 ft sky deck", "Clubhouse, 42,000 sq ft", "Lap pool + kids' pool", "EV charging, every bay", "Rainwater harvesting", "Co-working lounge", "24/7 concierge"].map((x) => `<li>${x}</li>`).join("")}</ul></div></div></section>
<section style="padding-top:0"><div class="wrap"><div class="visit"><div><div class="up" style="color:${C.gold}">Site visits</div><h2 style="margin-top:14px">See it this weekend.</h2><p style="opacity:.7;margin-top:16px;font-size:17px;line-height:1.6">Pick a slot and we'll send directions and your relationship manager's number on WhatsApp.</p></div>
<div><div class="up" style="opacity:.6">Saturday, 16 Nov</div><div class="slot"><span>10:00 am</span><span class="on">11:30 am</span><span>4:00 pm</span></div><div class="up" style="opacity:.6;margin-top:22px">Sunday, 17 Nov</div><div class="slot"><span>10:00 am</span><span>12:00 pm</span><span>5:00 pm</span></div><span class="btn g" style="margin-top:26px">Confirm visit</span></div></div></div></section>
<div class="wrap"><footer>${logo(30)}<div style="margin-top:14px">RERA: PRM/KA/RERA/1251/446/PR/0000 (illustrative) · © 2026 Skyhaven Realty</div></footer></div>`,
  });

const leads = {
  New: [["Karthik S.", "Meta ad · 3 BHK", "62", "2m ago"], ["Farah A.", "Website · 4 BHK", "48", "18m ago"], ["Rohan P.", "99acres · 3 BHK", "35", "1h ago"]],
  "Hot · qualified": [["Ananya & Vikram", "₹2–2.5 Cr · 3 BHK · 3 mo", "91", "Visit Sat 11:30"], ["Dr. Meera N.", "₹3 Cr+ · villa · ready", "88", "Callback 6 pm"], ["Suresh K.", "₹1.8–2 Cr · loan pre-approved", "84", "Visit Sun 10:00"]],
  "Site visit": [["The Kapoors", "4 BHK · NRI · video tour", "79", "Done · Sat"], ["Neha G.", "3 BHK · upgrading", "74", "Done · Sun"]],
  Negotiation: [["Arjun M.", "Unit 1104 · 3 BHK", "93", "Offer sent"], ["Lakshmi R.", "Villa 12", "86", "Bank visit"]],
  Booked: [["Sanjay & Priya", "Unit 802 · ₹2.1 Cr", "100", "Token paid"]],
};

const crm = () =>
  doc({
    fonts,
    css: `${base}body{background:#F3F4F5;height:900px;display:grid;grid-template-columns:230px 1fr 360px}
.side{background:${C.night};color:#fff;padding:24px 18px}
.side .i{padding:11px 14px;border-radius:10px;font-size:14px;opacity:.7;margin-top:4px}.side .i.on{background:rgba(201,162,39,.16);opacity:1;color:${C.gold}}
.main{padding:24px 24px;overflow:hidden}
.cols{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin-top:20px}
.col{background:#E9EBED;border-radius:14px;padding:10px;min-height:700px}
.col h4{display:flex;justify-content:space-between;font-size:13px;padding:6px 6px 10px}
.ld{background:#fff;border-radius:12px;padding:12px;margin-top:8px;box-shadow:0 1px 2px rgba(0,0,0,.06);font-size:13px}
.ld b{font-size:14px}.sc{float:right;font-weight:700;font-size:12px;padding:3px 7px;border-radius:7px}
.det{background:#fff;border-left:1px solid #E1E3E5;padding:22px}
.k{display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #EEE;font-size:14px}
.bb{background:#F3F4F5;border-radius:12px;padding:10px 12px;font-size:13px;line-height:1.45;margin-top:8px}`,
    body: `<div class="side">${logo(30, "#fff")}<div style="font-size:12px;opacity:.5;letter-spacing:.14em;margin:28px 0 8px 14px">SALES</div>
${["Pipeline", "Leads", "Site visits", "Inventory", "Campaigns", "WhatsApp inbox", "Reports"].map((t, i) => `<div class="i ${i === 0 ? "on" : ""}">${t}</div>`).join("")}
<div style="position:absolute;bottom:24px;left:18px;width:194px;border:1px solid rgba(201,162,39,.4);border-radius:14px;padding:14px;font-size:13px"><div style="color:${C.gold};font-weight:700">Assistant · live</div><div style="opacity:.7;margin-top:4px">Avg. qualify time 1m 52s</div></div></div>
<div class="main"><div style="display:flex;justify-content:space-between;align-items:center"><div><div style="font-size:24px;font-weight:700">Skyhaven Residences · pipeline</div><div style="color:${C.mute};font-size:14px;margin-top:4px">This week · 184 enquiries · 41 qualified by the WhatsApp assistant</div></div><div style="display:flex;gap:8px"><span style="border:1px solid #DDD;border-radius:10px;padding:8px 12px;font-size:13px;background:#fff">All sources ▾</span><span style="background:${C.night};color:#fff;border-radius:10px;padding:8px 12px;font-size:13px">+ Lead</span></div></div>
<div class="cols">${Object.entries(leads)
      .map(
        ([k, list]) => `<div class="col"><h4><span>${k}</span><span style="color:${C.mute}">${list.length + (k === "New" ? 21 : k === "Hot · qualified" ? 6 : 0)}</span></h4>${list
          .map(([n, d, sc, t]) => {
            const v = +sc;
            const [bg, fg] = v >= 85 ? ["#FDEFEA", "#C2410C"] : v >= 70 ? ["#FFF6DB", "#9A6B00"] : ["#EEF1F3", "#55606A"];
            return `<div class="ld" style="${n === "Ananya & Vikram" ? `outline:2px solid ${C.gold}` : ""}"><span class="sc" style="background:${bg};color:${fg}">${sc}</span><b>${n}</b><div style="color:${C.mute};margin-top:4px">${d}</div><div style="margin-top:8px;font-size:12px;color:${C.mute}">💬 ${t}</div></div>`;
          })
          .join("")}</div>`,
      )
      .join("")}</div></div>
<div class="det"><div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:12px;letter-spacing:.14em;color:${C.gold};font-weight:700">HOT LEAD · SCORE 91</span><span style="font-size:20px">×</span></div>
<div style="font-size:22px;font-weight:700;margin-top:8px">Ananya &amp; Vikram</div><div style="color:${C.mute};font-size:14px;margin-top:2px">Source: Meta lead ad · Whitefield 3 BHK</div>
<div style="margin-top:16px">${[["Budget", "₹2 – 2.5 Cr"], ["Configuration", "3 BHK, east facing"], ["Timeline", "Within 3 months"], ["Funding", "Home loan, pre-approved"], ["Site visit", "Sat 16 Nov · 11:30 am"], ["Assigned to", "Rahul (RM)"]].map(([a, b]) => `<div class="k"><span style="color:${C.mute}">${a}</span><b>${b}</b></div>`).join("")}</div>
<div style="font-size:12px;letter-spacing:.14em;color:${C.mute};font-weight:700;margin-top:20px">ASSISTANT SUMMARY</div>
<div class="bb">Couple relocating from Pune for work. Want 3 BHK near metro, east facing, high floor. Pre-approved with HDFC. Asked about clubhouse timeline and car parks (needs 2).</div>
<div style="display:flex;gap:8px;margin-top:16px"><span style="flex:1;text-align:center;background:${C.green};color:#fff;border-radius:10px;padding:11px;font-size:13.5px;font-weight:600">Open chat</span><span style="flex:1;text-align:center;border:1px solid #DDD;border-radius:10px;padding:11px;font-size:13.5px;font-weight:600">Call now</span></div></div>`,
  });

const wa = () =>
  doc({
    fonts,
    css: `${base}body{height:790px;background:#EFE7DE;font-family:-apple-system,'Manrope',sans-serif}
.top{background:#F7F7F7;display:flex;align-items:center;gap:10px;padding:10px 14px;border-bottom:1px solid #ddd}
.m{max-width:82%;background:#fff;border-radius:12px;padding:9px 12px;font-size:14.5px;line-height:1.42;margin:8px 12px;box-shadow:0 1px 1px rgba(0,0,0,.08)}
.m.o{background:#D9FDD3;margin-left:auto}.time{font-size:10.5px;color:#888;text-align:right;margin-top:3px}
.qr{display:flex;flex-wrap:wrap;gap:6px;margin:0 12px}.qr span{background:#fff;border-radius:18px;padding:8px 12px;color:#0A7CFF;font-size:13.5px;box-shadow:0 1px 1px rgba(0,0,0,.08)}`,
    body: `<div class="top"><span style="font-size:22px;color:#0A7CFF">‹</span><span style="width:36px;height:36px;border-radius:50%;background:${C.night};display:grid;place-items:center">${logo(20, "#fff").replace(/SKYHAVEN/, "")}</span><div><div style="font-weight:600">Skyhaven Realty <span style="color:${C.green}">✓</span></div><div style="font-size:12px;color:#777">Typically replies instantly</div></div></div>
<div class="m"><div style="height:110px;margin:-2px -4px 8px;border-radius:8px;background:url('IMG') center/cover"></div>Hi! Thanks for your interest in <b>Skyhaven Residences, Whitefield</b>. I can share prices and book a site visit. What size are you looking for?<div class="time">7:41 pm</div></div>
<div class="qr"><span>2 BHK</span><span style="background:#E7F0FF">3 BHK</span><span>4 BHK</span></div>
<div class="m o">3 BHK<div class="time">7:41 pm ✓✓</div></div>
<div class="m">Great choice. 3 BHKs start at ₹1.85 Cr. What budget are you working with?<div class="time">7:41 pm</div></div>
<div class="m o">Around 2 to 2.5 Cr. Is east facing available?<div class="time">7:42 pm ✓✓</div></div>
<div class="m">Yes: 14 east-facing 3 BHKs on floors 9 to 22 fit that budget. Would you like to see them this weekend?<div class="time">7:42 pm</div></div>
<div class="qr"><span>Sat 10:00</span><span style="background:#E7F0FF">Sat 11:30</span><span>Sun 12:00</span></div>
<div class="m o">Sat 11:30<div class="time">7:43 pm ✓✓</div></div>
<div class="m">Booked ✓ Rahul, your relationship manager, will meet you at the sales lounge. Map and floor plans below 👇<div class="time">7:43 pm</div></div>`,
  });

const ad = (p) =>
  doc({
    fonts,
    css: `${base}body{height:790px;background:#fff;font-family:-apple-system,'Manrope',sans-serif}
.h{display:flex;align-items:center;gap:10px;padding:12px 14px}`,
    body: `<div style="display:flex;justify-content:space-between;padding:10px 14px;border-bottom:1px solid #eee;font-weight:700;font-size:18px"><span>Feed</span><span>♡ ✈</span></div>
<div class="h"><span style="width:34px;height:34px;border-radius:50%;background:${C.night};display:grid;place-items:center"></span><div style="flex:1"><div style="font-weight:600;font-size:14px">skyhaven.realty</div><div style="font-size:12px;color:#777">Sponsored</div></div><span>•••</span></div>
<div style="height:390px;background:url('${p.p2}') center/cover;position:relative"><div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(15,20,24,0) 40%,rgba(15,20,24,.85))"></div>
<div style="position:absolute;left:18px;bottom:18px;right:18px;color:#fff"><div class="up" style="color:${C.gold};font-size:11px">Whitefield · 400 m to metro</div><div style="font:400 34px/1 'Bodoni Moda';margin-top:8px">3 BHK sky villas<br/>from ₹1.85 Cr</div></div></div>
<div style="display:flex;justify-content:space-between;align-items:center;background:#F2F2F2;padding:12px 14px"><div style="font-size:13px"><div style="color:#777">WhatsApp</div><b>Get prices &amp; floor plans</b></div><span style="background:${C.green};color:#fff;border-radius:8px;padding:9px 14px;font-weight:600;font-size:14px">Send message</span></div>
<div style="padding:12px 14px;font-size:14px;line-height:1.5"><b>skyhaven.realty</b> Private decks, a 42,000 sq ft clubhouse and possession by Dec 2028. Tap to chat: prices in 30 seconds, visits this weekend.</div>`,
  });

export default async function skyhaven() {
  const p = await photos({
    hero: ["1600596542815-ffad4c1539a9", 2200],
    p1: ["1545324418-cc1a3fa10c00", 900],
    p2: ["1600585154340-be6161a56a0c", 1200],
    p3: ["1512917774080-9991f1c4c750", 900],
    interior: ["1600607687939-ce8a6c25118c", 1400],
    pool: ["1564013799919-ab600027ffc6", 2000],
    living: ["1560448204-e02f11c3d0e2", 1400],
  });
  const h = site(p);
  return {
    screens: [
      { name: "desktop", html: h, width: 1440, height: 900, fullPage: true },
      { name: "mobile", html: h, width: 390, height: 790, fullPage: true },
      { name: "crm", html: crm(), width: 1440, height: 900 },
      { name: "whatsapp", html: wa().replace("IMG", p.p1), width: 390, height: 790 },
      { name: "ad", html: ad(p), width: 390, height: 790 },
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
            body: `${photoBackdrop(p.pool, "linear-gradient(120deg,rgba(15,20,24,.82),rgba(15,20,24,.35))", 10)}
${win({ src: s.crm, left: 100, top: 150, w: 1500, h: 937, url: "crm.skyhaven.in/pipeline" })}
${phone({ src: s.whatsapp, left: 1480, top: 290, w: 400, statusBg: "#F7F7F7", statusColor: "#111" })}`,
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
            body: `${backdrop(`linear-gradient(160deg,#EFE8DC,#CDBFA6)`)}
${win({ src: s.desktop, y: 0, left: 160, top: 110, w: 1680, h: 1140, url: "skyhaven.in/residences" })}`,
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
            body: `${backdrop(`linear-gradient(150deg,#1C252B,${C.night})`, "rgba(201,162,39,.25)")}
${phone({ src: s.ad, left: 300, top: 150, w: 430 })}
${phone({ src: s.whatsapp, left: 785, top: 90, w: 430, statusBg: "#F7F7F7", statusColor: "#111" })}
${phone({ src: s.mobile, y: 0, left: 1270, top: 150, w: 430, statusBg: "#3a3f40", statusColor: "#fff" })}`,
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
            css: `${base}.n{position:absolute;width:330px;background:#fff;border-radius:18px;padding:22px 24px;box-shadow:0 30px 60px -30px rgba(0,0,0,.35)}.n b{display:block;font-size:20px;margin-top:8px}.n p{color:${C.mute};font-size:15px;line-height:1.5;margin-top:6px}`,
            body: `${backdrop(C.sand, "rgba(255,255,255,.8)")}
<div class="abs" style="left:100px;top:90px"><div class="up" style="color:${C.gold}">How a lead moves</div><div style="font:400 66px/1 'Bodoni Moda';margin-top:14px">Ad click to site visit,<br/>in under two minutes</div></div>
${[
              [100, 470, "01", "Ad or portal enquiry", "Meta, Google, 99acres and the website all land in one WhatsApp thread."],
              [530, 470, "02", "Qualify on WhatsApp", "Size, budget, timeline and funding, asked as tap-to-answer buttons."],
              [960, 470, "03", "Score and route", "0 to 100 score from answers and intent. 80+ goes to an RM in real time."],
              [1390, 470, "04", "Book the visit", "Live slots from the sales calendar. Map, plans and RM details sent instantly."],
            ]
              .map(([l, t, n, b, d]) => `<div class="n" style="left:${l}px;top:${t}px"><div class="up" style="color:${C.gold}">${n}</div><b>${b}</b><p>${d}</p></div>`)
              .join("")}
<div class="abs" style="left:100px;right:180px;top:790px;height:300px;border-radius:22px;background:${C.night};color:#fff;padding:36px;display:grid;grid-template-columns:repeat(4,1fr);gap:30px">
${[["Fields captured", "BHK · budget · timeline · funding · location"], ["CRM", "Every answer written to the lead record"], ["Follow-up", "Day 1, 3 and 7 nudges if no visit booked"], ["Handoff", "Any question the bot can't answer goes to a person"]].map(([a, b]) => `<div><div class="up" style="color:${C.gold}">${a}</div><div style="font-size:19px;line-height:1.5;margin-top:12px;opacity:.9">${b}</div></div>`).join("")}</div>`,
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
            body: `<img src="${p.living}" class="abs" style="inset:0;width:100%;height:100%;object-fit:cover"/><div class="abs" style="inset:0;background:linear-gradient(180deg,rgba(15,20,24,.1),rgba(15,20,24,.8))"></div>
<div class="abs" style="left:64px;top:64px">${logo(44, "#fff")}</div>
<div class="abs" style="left:64px;right:64px;bottom:80px;color:#fff"><div class="up" style="color:${C.gold}">Brochure · page 6</div><div style="font:400 92px/0.96 'Bodoni Moda';margin-top:16px">Light on<br/>three sides.</div><div style="font-size:20px;opacity:.85;margin-top:18px">Every Skyhaven home is a corner home.</div></div>`,
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
            body: `${backdrop(`linear-gradient(170deg,${C.gold},#8E6F10)`, "rgba(255,240,200,.4)")}
${phone({ src: s.ad, left: 285, top: 220, w: 430 })}`,
          }),
      },
    ],
  };
}
