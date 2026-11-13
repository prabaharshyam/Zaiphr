/** Spice Route Kitchens: cinematic restaurant website with direct ordering (concept, fictional brand). */
import { doc, photos, stage, win, phone, backdrop, photoBackdrop } from "../kit.mjs";

const C = { night: "#120D09", ember: "#F4A300", chili: "#C2410C", cream: "#F7EFE2", ink: "#1E1611", mute: "#9A8A78", card: "#1C1510", line: "#2E241C" };
const fonts = ["Gloock", "Manrope:wght@400;500;600;700", "Space Mono:wght@400;700"];

const logo = (s, c = C.cream) => `<span style="display:inline-flex;align-items:center;gap:${s * 0.3}px;color:${c}"><svg width="${s}" height="${s}" viewBox="0 0 40 40"><circle cx="20" cy="20" r="17" fill="none" stroke="${C.ember}" stroke-width="2.4"/><path d="M8 26c6-2 8-10 12-10s6 8 12 10" fill="none" stroke="currentColor" stroke-width="2.4"/><circle cx="20" cy="11" r="2.6" fill="${C.ember}"/></svg><span style="font:${s * 0.62}px/0.95 'Gloock'">Spice Route<br/><span style="font:700 ${s * 0.22}px 'Space Mono';letter-spacing:.3em;color:${C.ember}">KITCHENS</span></span></span>`;
const base = `body{font-family:'Manrope',sans-serif}.mono{font:400 12px 'Space Mono';letter-spacing:.14em;text-transform:uppercase}`;

const dishes = (p) => [
  [p.d1, "Dindigul mutton biryani", "Tamil Nadu", "Seeraga samba rice, slow dum, onion raita", "₹420"],
  [p.d2, "Kerala sadya thali", "Kerala", "14 dishes on banana leaf, payasam to finish", "₹380"],
  [p.d3, "Butter chicken, Old Delhi", "Delhi", "Tandoor-charred, makhani, butter naan", "₹360"],
  [p.d4, "Ghee roast masala dosa", "Karnataka", "Crisp, golden, with three chutneys", "₹190"],
  [p.d5, "Railway mutton curry", "Anglo-Indian", "Coconut, potatoes, a 1920s recipe", "₹390"],
  [p.d6, "Punjabi samosa chaat", "Punjab", "Chole, tamarind, mint and crunch", "₹160"],
];

const site = (p) =>
  doc({
    fonts,
    css: `${base}
body{background:${C.night};color:${C.cream}}
.wrap{max-width:1320px;margin:0 auto;padding:0 48px}
.hero{position:relative;height:900px}
.hero img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.hero::after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(18,13,9,.7),rgba(18,13,9,.1) 35%,rgba(18,13,9,.95))}
nav{position:relative;z-index:2;display:flex;justify-content:space-between;align-items:center;height:100px}
nav .l{display:flex;gap:34px;font-size:15px;font-weight:500}
.btn{display:inline-flex;align-items:center;gap:10px;height:56px;padding:0 30px;border-radius:999px;font-weight:700;font-size:15px}
.btn.e{background:${C.ember};color:${C.ink}}.btn.o{border:1.5px solid rgba(247,239,226,.6)}
.hero .t{position:absolute;z-index:2;left:0;right:0;bottom:90px}
h1{font:128px/0.92 'Gloock';letter-spacing:-.02em}
h1 em{font-style:normal;color:${C.ember}}
section{padding:100px 0}
h2{font:72px/0.98 'Gloock';letter-spacing:-.015em}
.reg{display:flex;gap:10px;margin-top:34px;flex-wrap:wrap}.reg span{border:1px solid ${C.line};border-radius:99px;padding:11px 20px;font-size:14.5px}.reg .on{background:${C.ember};color:${C.ink};border-color:${C.ember};font-weight:700}
.menu{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:40px}
.dish{background:${C.card};border:1px solid ${C.line};border-radius:24px;overflow:hidden}
.dish img{height:290px;width:100%;object-fit:cover}
.dish .b{padding:20px 22px}
.dish h3{font:28px/1.05 'Gloock'}
.dish .f{display:flex;justify-content:space-between;align-items:center;margin-top:18px}
.add{background:${C.cream};color:${C.ink};border-radius:99px;padding:9px 16px;font-weight:700;font-size:14px}
.story{display:grid;grid-template-columns:1.1fr 1fr;gap:70px;align-items:center}
.story img{width:100%;height:620px;object-fit:cover;border-radius:28px}
.why{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:30px}.why div{border-top:1px solid ${C.line};padding-top:18px;font-size:15px;color:${C.mute};line-height:1.55}.why b{display:block;color:${C.cream};font-size:17px;margin-bottom:6px}
.book{background:${C.ember};color:${C.ink};border-radius:36px;padding:70px;display:grid;grid-template-columns:1.1fr 1fr;gap:40px;align-items:center}
.fld{background:rgba(30,22,17,.08);border-radius:16px;padding:16px 18px;display:flex;justify-content:space-between;font-weight:600;margin-top:10px}
@media(max-width:600px){
 .wrap{padding:0 18px} nav{height:70px} nav .l,.hide-m{display:none} .hero{height:760px} .hero .t{bottom:40px} h1{font-size:64px}
 section{padding:56px 0} h2{font-size:44px} .menu,.story,.book,.why{grid-template-columns:1fr} .menu{gap:16px} .dish img{height:220px}
 .story img{height:360px} .story{gap:28px} .book{padding:32px 22px;border-radius:28px}
}`,
    body: `<div class="hero"><img src="${p.hero}"/><div class="wrap"><nav>${logo(44)}<div class="l"><span>Menu</span><span>Order online</span><span>Restaurants</span><span>Catering</span><span>Story</span></div><span class="btn e hide-m" style="height:46px">Order now</span></nav></div>
<div class="t"><div class="wrap"><div class="mono" style="color:${C.ember}">Eight regions · one table · Bengaluru &amp; Chennai</div><h1 style="margin-top:20px">India, one<br/><em>plate</em> at a time.</h1>
<p style="font-size:19px;line-height:1.6;max-width:540px;margin-top:22px;opacity:.85">Recipes carried across railway lines, temple towns and coastal kitchens, cooked by chefs from each region. Order direct and it costs you less.</p>
<div style="display:flex;gap:12px;margin-top:32px;flex-wrap:wrap"><span class="btn e">Order for delivery · 10% off direct</span><span class="btn o">Book a table</span></div></div></div></div>
<section><div class="wrap"><div class="mono" style="color:${C.ember}">The menu, by region</div><h2 style="margin-top:14px">Where are we<br/>eating tonight?</h2>
<div class="reg">${["All regions", "Tamil Nadu", "Kerala", "Karnataka", "Delhi", "Punjab", "Bengal", "Anglo-Indian", "Goa"].map((r, i) => `<span class="${i === 0 ? "on" : ""}">${r}</span>`).join("")}</div>
<div class="menu">${dishes(p)
      .map(([src, n, r, d, pr]) => `<div class="dish"><img src="${src}"/><div class="b"><div class="mono" style="color:${C.ember}">${r}</div><h3 style="margin-top:8px">${n}</h3><p style="color:${C.mute};font-size:14.5px;margin-top:8px;line-height:1.5">${d}</p><div class="f"><b style="font-size:18px">${pr}</b><span class="add">+ Add</span></div></div></div>`)
      .join("")}</div></div></section>
<section style="padding-top:0"><div class="wrap story"><img src="${p.room}"/><div><div class="mono" style="color:${C.ember}">Our story</div><h2 style="margin-top:14px">Eight kitchens<br/>under one roof.</h2>
<p style="font-size:17px;line-height:1.7;color:${C.mute};margin-top:20px">Each region has its own station and its own chef: a Chettinad cook on the biryani dum, a Kozhikode family on the sadya, a third-generation tandoor master from Chandni Chowk.</p>
<div class="why"><div><b>Order direct</b>10% less than delivery apps, every day.</div><div><b>Live tracking</b>Know when it leaves the pass.</div><div><b>Loyalty</b>Every 6th order, dessert on us.</div></div></div></div></section>
<section style="padding-top:0"><div class="wrap"><div class="book"><div><div class="mono">Tables</div><h2 style="margin-top:14px;color:${C.ink}">Book a table<br/>in 20 seconds.</h2></div>
<div><div class="fld"><span>Indiranagar</span><span>▾</span></div><div class="fld"><span>Friday, 15 Nov</span><span>4 guests</span></div><div class="fld"><span>8:00 pm</span><span style="opacity:.6">3 tables left</span></div><span class="btn" style="background:${C.ink};color:${C.cream};margin-top:14px;width:100%;justify-content:center">Confirm on WhatsApp</span></div></div></div></section>`,
  });

const order = (p) =>
  doc({
    fonts,
    css: `${base}body{background:${C.cream};color:${C.ink};height:790px;position:relative}
.h{display:flex;justify-content:space-between;align-items:center;padding:14px 18px}
.it{display:flex;gap:12px;align-items:center;padding:12px 18px;border-bottom:1px solid #E8DCC8}
.it img{width:64px;height:64px;border-radius:14px;object-fit:cover}
.q{display:flex;align-items:center;gap:12px;border:1.5px solid ${C.ink};border-radius:99px;padding:5px 12px;font-weight:700}
.tr{margin:16px 18px;background:${C.ink};color:${C.cream};border-radius:20px;padding:18px}
.steps{display:flex;justify-content:space-between;margin-top:14px;position:relative}.steps::before{content:"";position:absolute;left:12px;right:12px;top:10px;height:3px;background:#3a2e25}.steps::after{content:"";position:absolute;left:12px;width:58%;top:10px;height:3px;background:${C.ember}}
.steps span{position:relative;z-index:1;font-size:11.5px;text-align:center;width:72px;color:#cbb9a3}.steps i{display:block;width:22px;height:22px;border-radius:50%;background:#3a2e25;margin:0 auto 6px;border:3px solid ${C.ink}}.steps .on i{background:${C.ember}}
.pay{position:absolute;left:0;right:0;bottom:0;padding:14px 18px 30px;background:#fff;border-top:1px solid #E8DCC8}`,
    body: `<div class="h"><span style="font-size:20px">←</span><b style="font-size:17px">Your order</b><span class="mono" style="color:${C.chili}">Direct · 10% off</span></div>
<div class="tr"><div class="mono" style="color:${C.ember}">Arriving 8:24 pm · Indiranagar kitchen</div><div style="font:28px 'Gloock';margin-top:8px">On the pass now</div>
<div class="steps"><span class="on"><i></i>Placed</span><span class="on"><i></i>Cooking</span><span class="on"><i></i>Packed</span><span><i></i>On the way</span></div></div>
${dishes(p)
      .slice(0, 3)
      .map(([src, n, r, , pr], i) => `<div class="it"><img src="${src}"/><div style="flex:1"><div style="font-weight:700;font-size:15px">${n}</div><div class="mono" style="font-size:10.5px;color:${C.mute};margin-top:4px">${r}</div></div><div style="text-align:right"><div style="font-weight:700">${pr}</div><div class="q" style="margin-top:6px;font-size:13px">− ${i === 0 ? 2 : 1} +</div></div></div>`)
      .join("")}
<div style="padding:14px 18px;font-size:14.5px;line-height:1.9"><div style="display:flex;justify-content:space-between"><span>Items</span><span>₹1,580</span></div><div style="display:flex;justify-content:space-between;color:#2E7D32"><span>Direct-order saving</span><span>− ₹158</span></div><div style="display:flex;justify-content:space-between"><span>Delivery</span><span>₹29</span></div></div>
<div class="pay"><div style="display:flex;justify-content:space-between;font-weight:700;font-size:17px"><span>Total</span><span>₹1,451</span></div><div style="margin-top:12px;background:${C.ember};border-radius:16px;text-align:center;padding:16px;font-weight:800">Pay with UPI</div></div>`,
  });

const kds = (p) =>
  doc({
    fonts,
    css: `${base}body{background:#0D0A08;color:${C.cream};height:620px;padding:22px 26px}
.cols{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:18px}
.tk{background:${C.card};border:1px solid ${C.line};border-radius:16px;padding:16px;margin-top:12px}
.tk .h{display:flex;justify-content:space-between;align-items:center}
.ln{display:flex;justify-content:space-between;font-size:14.5px;padding:7px 0;border-bottom:1px dashed ${C.line}}
.bd{font:700 11px 'Space Mono';padding:4px 8px;border-radius:6px}`,
    body: `<div style="display:flex;justify-content:space-between;align-items:center">${logo(36)}<div style="display:flex;gap:10px;align-items:center"><span class="mono" style="color:${C.mute}">Kitchen display · Indiranagar · Fri 7:52 pm</span><span class="bd" style="background:#2E7D32;color:#fff">Direct 64%</span><span class="bd" style="background:${C.line}">Apps 36%</span></div></div>
<div class="cols">${[
      ["New", "#3B82F6", [["#4182", "Direct · delivery", "2× Dindigul biryani|1× Raita|1× Payasam", "0:42"], ["T12", "Dine-in · 4 guests", "1× Sadya thali|2× Dosa|1× Samosa chaat", "1:10"]]],
      ["Cooking", C.ember, [["#4179", "Direct · pickup", "1× Butter chicken|3× Butter naan", "6:15"], ["#4177", "Swiggy", "1× Railway mutton|2× Appam", "8:02"], ["T07", "Dine-in", "2× Ghee roast dosa", "4:30"]]],
      ["Ready", "#22C55E", [["#4175", "Direct · delivery", "1× Sadya thali|1× Payasam", "Rider 2 min"]]],
      ["Out", C.mute, [["#4172", "Direct · delivery", "2× Biryani|1× Chaat", "8:24 ETA"], ["#4170", "Zomato", "1× Butter chicken", "8:19 ETA"]]],
    ]
      .map(
        ([t, c, list]) => `<div><div style="display:flex;justify-content:space-between;align-items:center;border-bottom:3px solid ${c};padding-bottom:10px"><b style="font-size:18px">${t}</b><span class="mono" style="color:${C.mute}">${list.length}</span></div>${list
          .map(([id, src, items, tm]) => `<div class="tk"><div class="h"><b style="font:24px 'Gloock'">${id}</b><span class="bd" style="background:${src.startsWith("Direct") ? C.ember : C.line};color:${src.startsWith("Direct") ? C.ink : C.cream}">${src}</span></div>${items
            .split("|")
            .map((x) => `<div class="ln"><span>${x}</span><span style="color:${C.mute}">☐</span></div>`)
            .join("")}<div class="mono" style="color:${t === "New" ? "#3B82F6" : C.mute};margin-top:10px">⏱ ${tm}</div></div>`)
          .join("")}</div>`,
      )
      .join("")}</div>`,
  });

export default async function spice() {
  const p = await photos({
    hero: ["1585937421612-70a008356fbe", 2200],
    d1: ["1589302168068-964664d93dc0", 800],
    d2: ["1546833999-b9f581a1996d", 800],
    d3: ["1565557623262-b51c2513a641", 800],
    d4: ["1668236543090-82eba5ee5976", 800],
    d5: ["1631452180519-c014fe946bc7", 800],
    d6: ["1601050690597-df0568f70950", 800],
    room: ["1517248135467-4c7edcad34c4", 1400],
    table: ["1414235077428-338989a2e8c0", 2000],
    idli: ["1630383249896-424e482df921", 1200],
  });
  const h = site(p);
  return {
    screens: [
      { name: "desktop", html: h, width: 1440, height: 900, fullPage: true },
      { name: "mobile", html: h, width: 390, height: 790, fullPage: true },
      { name: "order", html: order(p), width: 390, height: 790 },
      { name: "kds", html: kds(p), width: 1440, height: 620 },
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
            body: `${photoBackdrop(p.table, "linear-gradient(120deg,rgba(18,13,9,.88),rgba(18,13,9,.5))", 12)}
${win({ src: s.desktop, left: 110, top: 150, w: 1500, h: 920, url: "spiceroutekitchens.in", dark: true })}
${phone({ src: s.order, left: 1480, top: 300, w: 400, statusBg: C.cream, statusColor: C.ink })}`,
          }),
      },
      {
        file: "menu.jpg",
        w: 2000,
        h: 1250,
        html: (s) =>
          stage({
            w: 2000,
            h: 1250,
            fonts,
            body: `${backdrop(`linear-gradient(160deg,#2a1d13,${C.night})`, "rgba(244,163,0,.18)")}
${win({ src: s.desktop, y: 900, left: 160, top: 110, w: 1680, h: 1140, url: "spiceroutekitchens.in/menu", dark: true })}`,
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
            body: `${backdrop(`linear-gradient(150deg,#FFC23D,${C.ember} 45%,#C77C00)`, "rgba(255,240,200,.4)")}
${phone({ src: s.mobile, y: 0, left: 300, top: 150, w: 430, statusBg: "#1a120c", statusColor: "#fff" })}
${phone({ src: s.mobile, y: 1060, left: 785, top: 90, w: 430, statusBg: C.night, statusColor: "#fff" })}
${phone({ src: s.order, left: 1270, top: 150, w: 430, statusBg: C.cream, statusColor: C.ink })}`,
          }),
      },
      {
        file: "kitchen.jpg",
        w: 2000,
        h: 1250,
        html: (s) =>
          stage({
            w: 2000,
            h: 1250,
            fonts,
            body: `${backdrop(`linear-gradient(160deg,#EADCC6,#C9B293)`)}
${win({ src: s.kds, left: 160, top: 220, w: 1680, h: 723, url: "kitchen.spiceroutekitchens.in", dark: true })}`,
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
            css: base,
            body: `<img src="${p.d1}" class="abs" style="inset:0;width:100%;height:100%;object-fit:cover"/><div class="abs" style="inset:0;background:linear-gradient(180deg,rgba(18,13,9,.55),rgba(18,13,9,0) 35%,rgba(18,13,9,.9))"></div>
<div class="abs" style="left:64px;top:64px">${logo(56)}</div>
<div class="abs" style="left:64px;right:64px;bottom:80px;color:${C.cream}"><div class="mono" style="color:${C.ember}">Region of the month · Tamil Nadu</div><div style="font:112px/0.92 'Gloock';margin-top:18px">Dindigul,<br/>by way of<br/><span style="color:${C.ember}">Indiranagar.</span></div></div>`,
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
            body: `${backdrop(C.cream, "rgba(255,255,255,.5)")}
<div class="abs" style="left:64px;right:64px;top:70px;color:${C.ink}"><div class="mono" style="color:${C.chili}">Takeaway menu card · front</div><div style="font:84px/0.95 'Gloock';margin-top:16px">Eight regions.<br/>One order.</div></div>
<div class="abs" style="left:64px;right:64px;top:420px;display:grid;grid-template-columns:1fr 1fr;gap:16px">${dishes(p)
              .slice(0, 4)
              .map(([src, n, r, , pr]) => `<div style="background:#fff;border-radius:18px;overflow:hidden;box-shadow:0 20px 40px -24px rgba(0,0,0,.4)"><img src="${src}" style="height:220px;width:100%;object-fit:cover"/><div style="padding:14px 16px"><div class="mono" style="color:${C.chili};font-size:10.5px">${r}</div><div style="font:22px/1.1 'Gloock';margin-top:6px">${n}</div><b style="display:block;margin-top:8px">${pr}</b></div></div>`)
              .join("")}</div>
<div class="abs mono" style="left:64px;right:64px;bottom:50px;display:flex;justify-content:space-between;color:${C.mute}"><span>Order direct · 10% off</span><span>spiceroutekitchens.in</span></div>`,
          }),
      },
    ],
  };
}
