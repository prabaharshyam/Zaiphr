/** Hearthloom: micro-creator launch programme for a handmade home-décor brand (concept, fictional brand). */
import { doc, photos, stage, win, phone, backdrop } from "../kit.mjs";

const C = { olive: "#5E6B3A", sage: "#8A9A5B", cream: "#F6F1E7", linen: "#ECE3D2", ink: "#2E2A22", mute: "#857C6A", line: "#E2D8C6", terra: "#B5643C" };
const fonts = ["Young Serif", "Work Sans:wght@400;500;600;700", "IBM Plex Mono:wght@500"];

const logo = (s, c = C.ink) => `<span style="display:inline-flex;align-items:center;gap:${s * 0.3}px;font:${s * 0.75}px/1 'Young Serif';color:${c}"><svg width="${s}" height="${s}" viewBox="0 0 40 40"><path d="M6 36V18L20 6l14 12v18" fill="none" stroke="${C.sage}" stroke-width="2.6"/><path d="M12 36c0-6 3.5-10 8-10s8 4 8 10M12 30h16M14 24h12" fill="none" stroke="currentColor" stroke-width="2.2"/></svg>hearthloom</span>`;
const base = `body{font-family:'Work Sans',sans-serif;color:${C.ink}}.mono{font:500 11.5px 'IBM Plex Mono';letter-spacing:.1em;text-transform:uppercase}`;

const site = (p) =>
  doc({
    fonts,
    css: `${base}
body{background:${C.cream}}
.wrap{max-width:1320px;margin:0 auto;padding:0 48px}
nav{display:flex;justify-content:space-between;align-items:center;height:86px}
nav .l{display:flex;gap:30px;font-size:15px}
.btn{display:inline-flex;align-items:center;height:52px;padding:0 26px;border-radius:999px;font-weight:600;font-size:15px}
.btn.d{background:${C.olive};color:#fff}.btn.o{border:1.5px solid ${C.ink}}
.hero{display:grid;grid-template-columns:1fr 1.15fr;gap:40px;align-items:stretch;padding-bottom:80px}
h1{font:84px/1 'Young Serif';letter-spacing:-.02em}
h1 em{font-style:normal;color:${C.terra}}
.hero .ims{display:grid;grid-template-columns:1.3fr 1fr;grid-template-rows:1fr 1fr;gap:14px;height:640px}
.hero .ims img{width:100%;height:100%;object-fit:cover;border-radius:22px}
.hero .ims img:first-child{grid-row:1/3}
section{padding:90px 0}
h2{font:54px/1.05 'Young Serif';letter-spacing:-.015em}
.cats{display:flex;gap:10px;margin-top:30px;flex-wrap:wrap}.cats span{border:1px solid ${C.line};background:#fff;border-radius:99px;padding:10px 18px;font-size:14.5px}.cats .on{background:${C.ink};color:#fff}
.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:22px;margin-top:34px}
.grid img{height:360px;width:100%;object-fit:cover;border-radius:20px}
.grid .n{display:flex;justify-content:space-between;margin-top:14px;font-weight:500}
.grid .s{color:${C.mute};font-size:14px;margin-top:4px}
.mk{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center;background:${C.linen};border-radius:32px;padding:56px}
.mk img{width:100%;height:480px;object-fit:cover;border-radius:22px}
.st{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:30px}.st b{display:block;font:44px 'Young Serif';color:${C.olive}}
.ugc{display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin-top:34px}
.ugc div{height:300px;border-radius:16px;overflow:hidden;position:relative}.ugc img{width:100%;height:100%;object-fit:cover}
.ugc span{position:absolute;left:12px;bottom:12px;background:rgba(255,255,255,.9);border-radius:99px;padding:5px 10px;font-size:12.5px;font-weight:600}
@media(max-width:600px){
 .wrap{padding:0 18px} nav{height:64px} nav .l,.hide-m{display:none}
 .hero{grid-template-columns:1fr;padding-bottom:40px} h1{font-size:50px} .hero .ims{height:420px}
 section{padding:54px 0} h2{font-size:38px} .grid{grid-template-columns:1fr 1fr;gap:12px} .grid img{height:210px}
 .mk{grid-template-columns:1fr;padding:24px;gap:24px} .mk img{height:280px} .ugc{grid-template-columns:1fr 1fr} .ugc div{height:220px}
}`,
    body: `<div class="wrap"><nav>${logo(40)}<div class="l"><span>Ceramics</span><span>Textiles</span><span>Lighting</span><span>Gifting</span><span>Our makers</span></div><div style="display:flex;gap:16px;align-items:center"><span class="hide-m">Search</span><span class="btn d" style="height:44px">Cart · 0</span></div></nav>
<div class="hero"><div style="display:flex;flex-direction:column;justify-content:center"><div class="mono" style="color:${C.sage}">Handmade in India · 40 artisan studios</div>
<h1 style="margin-top:22px">Slow-made things<br/>for <em>lived-in</em><br/>homes.</h1>
<p style="font-size:18.5px;line-height:1.65;color:${C.mute};margin-top:22px;max-width:470px">Wheel-thrown ceramics from Khurja, hand-loomed throws from Panipat and block-printed linens from Bagru. Each piece signed by the hands that made it.</p>
<div style="display:flex;gap:12px;margin-top:32px;flex-wrap:wrap"><span class="btn d">Shop the festive edit</span><span class="btn o">Meet the makers</span></div></div>
<div class="ims"><img src="${p.h1}"/><img src="${p.h2}"/><img src="${p.h3}"/></div></div></div>
<section style="padding-top:20px"><div class="wrap"><div class="mono" style="color:${C.sage}">New this week</div><h2 style="margin-top:12px">The festive edit</h2>
<div class="cats"><span class="on">All</span><span>Vases</span><span>Planters</span><span>Throws &amp; rugs</span><span>Tableware</span><span>Under ₹1,500</span></div>
<div class="grid">${[
      [p.g1, "Khurja stacking bowls", "Set of 4 · stoneware", "₹1,850"],
      [p.g2, "Twin bottle vases", "Matte glaze · pair", "₹2,400"],
      [p.g3, "Bagru kilim, 5×7", "Hand-loomed cotton", "₹6,900"],
      [p.g4, "Desert planter", "Terracotta · 8 in", "₹1,250"],
    ]
      .map(([src, n, s, pr]) => `<div><img src="${src}"/><div class="n"><span>${n}</span><span>${pr}</span></div><div class="s">${s}</div></div>`)
      .join("")}</div></div></section>
<section style="padding-top:0"><div class="wrap"><div class="mk"><img src="${p.mk}"/><div><div class="mono" style="color:${C.sage}">Our makers</div><h2 style="margin-top:12px">Every piece, a person.</h2>
<p style="font-size:17px;line-height:1.65;color:${C.mute};margin-top:18px">We work directly with small studios, pay before the kiln is fired and print each maker's name on the tag.</p>
<div class="st"><div><b>40</b>artisan studios</div><div><b>11</b>craft clusters</div><div><b>100%</b>paid upfront</div></div></div></div></div></section>
<section style="padding-top:0"><div class="wrap"><div class="mono" style="color:${C.sage}">#HomeWithHearthloom</div><h2 style="margin-top:12px">In your homes</h2>
<div class="ugc">${[p.u1, p.u2, p.u3, p.u4, p.u5].map((src, i) => `<div><img src="${src}"/><span>@${["homewithmeera", "thenookproject", "slowliving.sana", "studio.kabir", "plantsandpots.in"][i]}</span></div>`).join("")}</div></div></section>`,
  });

const creators = [
  ["Meera Iyer", "@homewithmeera", "Home décor", "38.2K", "Posted", "#E3EBD3"],
  ["Sana Q.", "@slowliving.sana", "Slow living", "21.7K", "Posted", "#E3EBD3"],
  ["Kabir M.", "@studio.kabir", "Interiors", "54.9K", "Content review", "#FFF1D6"],
  ["Ritika J.", "@thenookproject", "Small spaces", "12.4K", "Delivered", "#E6EEF8"],
  ["Aarav D.", "@plantsandpots.in", "Plants", "29.3K", "In transit", "#E6EEF8"],
  ["Nisha P.", "@nishaathome", "Home décor", "17.8K", "Brief sent", "#F1ECE2"],
];

const dashboard = (p) =>
  doc({
    fonts,
    css: `${base}body{background:#FAF8F3;height:900px;display:grid;grid-template-columns:230px 1fr}
.side{background:#fff;border-right:1px solid ${C.line};padding:24px 18px}
.side .i{padding:10px 14px;border-radius:10px;font-size:14px;color:${C.mute};margin-top:3px}.side .i.on{background:${C.linen};color:${C.ink};font-weight:600}
main{padding:24px 28px}
.k{background:#fff;border:1px solid ${C.line};border-radius:16px;padding:16px 18px}
.k>b{display:block;font:30px 'Young Serif';margin-top:6px}
table{width:100%;border-collapse:collapse;font-size:14px}
td,th{padding:11px 10px;border-bottom:1px solid ${C.line};text-align:left}
th{font:500 11px 'IBM Plex Mono';letter-spacing:.1em;text-transform:uppercase;color:${C.mute}}
.av{width:34px;height:34px;border-radius:50%;object-fit:cover;display:inline-block;vertical-align:middle;margin-right:10px}
.st{font-size:12.5px;font-weight:600;padding:5px 10px;border-radius:99px}
.thumbs{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}.thumbs div{height:150px;border-radius:12px;overflow:hidden;position:relative}.thumbs img{width:100%;height:100%;object-fit:cover}
.thumbs span{position:absolute;left:8px;bottom:8px;background:rgba(0,0,0,.6);color:#fff;font-size:11.5px;padding:3px 7px;border-radius:6px}`,
    body: `<div class="side">${logo(34)}<div class="mono" style="color:${C.mute};margin:28px 0 8px 14px">Creators</div>${["Campaigns", "Discover", "Briefs", "Seeding & shipping", "Content library", "Payouts", "Reports"].map((t, i) => `<div class="i ${i === 0 ? "on" : ""}">${t}</div>`).join("")}</div>
<main><div style="display:flex;justify-content:space-between;align-items:center"><div><div class="mono" style="color:${C.sage}">Campaign · live</div><div style="font:30px 'Young Serif';margin-top:6px">Festive edit · micro-creator seeding</div></div><div style="display:flex;gap:8px"><span class="st" style="background:#fff;border:1px solid ${C.line};padding:9px 14px">Share report</span><span class="st" style="background:${C.olive};color:#fff;padding:9px 14px">+ Invite creators</span></div></div>
<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:12px;margin-top:18px">${[["Creators", "24", "18 accepted"], ["Kits shipped", "18", "15 delivered"], ["Posts live", "11", "+ 23 stories"], ["Reach", "4.1L", "illustrative"], ["Code redemptions", "214", "HEARTH10 · illustrative"]].map(([l, v, s]) => `<div class="k"><div class="mono" style="color:${C.mute}">${l}</div><b>${v}</b><div style="font-size:12.5px;color:${C.sage};font-weight:600">${s}</div></div>`).join("")}</div>
<div style="display:grid;grid-template-columns:1.6fr 1fr;gap:14px;margin-top:14px">
<div class="k" style="padding:6px 12px"><table><tr><th>Creator</th><th>Niche</th><th>Followers</th><th>Kit</th><th>Status</th></tr>${creators
      .map(([n, h, ni, f, st, bg], i) => `<tr><td><img class="av" src="${p[`a${i}`]}"/><b>${n}</b><div style="color:${C.mute};font-size:12.5px;margin-left:44px;margin-top:-4px">${h}</div></td><td>${ni}</td><td>${f}</td><td style="color:${C.mute}">${["Bowls + throw", "Vase pair", "Kilim", "Planter set", "Planter set", "Bowls"][i]}</td><td><span class="st" style="background:${bg}">${st}</span></td></tr>`)
      .join("")}</table></div>
<div class="k"><div style="display:flex;justify-content:space-between"><div class="mono" style="color:${C.mute}">Latest content</div><span style="font-size:13px;color:${C.sage};font-weight:600">View all 34 →</span></div>
<div class="thumbs" style="margin-top:12px;grid-template-columns:1fr 1fr">${[p.u1, p.u2, p.u3, p.u4].map((src, i) => `<div><img src="${src}"/><span>${["Reel · 41K views", "Post · 2.1K saves", "Reel · 18K views", "Story · 9 taps"][i]}</span></div>`).join("")}</div>
<div style="font-size:12px;color:${C.mute};margin-top:10px">All figures illustrative · concept project</div></div></div></main>`,
  });

const brief = (p) =>
  doc({
    fonts,
    css: `${base}body{background:${C.cream};height:790px;padding:18px}
.c{background:#fff;border:1px solid ${C.line};border-radius:18px;padding:16px;margin-top:12px}
.row{display:flex;gap:10px;align-items:flex-start;font-size:14.5px;line-height:1.45;margin-top:8px}
.trk{display:flex;justify-content:space-between;margin-top:12px;position:relative}.trk::before{content:"";position:absolute;left:10px;right:10px;top:9px;height:2px;background:${C.line}}
.trk span{position:relative;text-align:center;font-size:11.5px;color:${C.mute};width:70px}.trk i{display:block;width:20px;height:20px;border-radius:50%;margin:0 auto 6px;background:${C.line};border:3px solid #fff}.trk .on i{background:${C.sage}}`,
    body: `<div style="display:flex;justify-content:space-between;align-items:center">${logo(30)}<span class="mono" style="color:${C.sage}">Creator brief</span></div>
<div style="height:150px;border-radius:18px;overflow:hidden;margin-top:14px;position:relative"><img src="${p.h2}" style="width:100%;height:100%;object-fit:cover"/><div style="position:absolute;left:14px;bottom:12px;color:#fff;font:24px 'Young Serif'">Festive edit</div></div>
<div class="c"><div class="mono" style="color:${C.mute}">Hi Meera, your kit</div><div style="font:21px 'Young Serif';margin-top:6px">Khurja bowls + Bagru throw</div>
<div class="trk"><span class="on"><i></i>Packed</span><span class="on"><i></i>Shipped</span><span class="on"><i></i>Delivered</span><span><i></i>Post due 18 Nov</span></div></div>
<div class="c"><div class="mono" style="color:${C.mute}">Deliverables</div>${["1 reel, 20 to 40 s, styled in your own space", "2 stories with your code HEARTH10", "Tag @hearthloom and the maker"].map((t) => `<div class="row"><span style="color:${C.sage}">✓</span>${t}</div>`).join("")}</div>
<div class="c"><div class="mono" style="color:${C.mute}">Please avoid</div>${["Studio-white backdrops", "Calling it 'cheap' or 'dupe'"].map((t) => `<div class="row"><span style="color:${C.terra}">✕</span>${t}</div>`).join("")}</div>
<div style="margin-top:14px;background:${C.olive};color:#fff;border-radius:14px;text-align:center;padding:15px;font-weight:600">Upload draft for review</div>`,
  });

const post = (src, handle, cap, avatar) =>
  doc({
    fonts,
    css: `${base}body{height:790px;background:#fff;font-family:-apple-system,'Work Sans',sans-serif}`,
    body: `<div style="display:flex;align-items:center;gap:10px;padding:12px 14px"><img src="${avatar}" style="width:34px;height:34px;border-radius:50%;object-fit:cover"/><div style="flex:1"><div style="font-weight:600;font-size:14px">${handle}</div><div style="font-size:12px;color:#777">Paid partnership with hearthloom</div></div><span>•••</span></div>
<img src="${src}" style="width:390px;height:488px;object-fit:cover"/>
<div style="display:flex;justify-content:space-between;padding:12px 14px;font-size:22px"><span>♡ 💬 ➤</span><span>🔖</span></div>
<div style="padding:0 14px;font-size:14px;line-height:1.5"><b>2,184 likes</b><br/><b>${handle}</b> ${cap} <span style="color:#00376b">#HomeWithHearthloom</span><div style="color:#777;margin-top:6px">View all 96 comments</div></div>`,
  });

export default async function hearthloom() {
  const p = await photos({
    h1: ["1616486338812-3dadae4b4ace", 1200],
    h2: ["1586023492125-27b2c045efd7", 900],
    h3: ["1610701596007-11502861dcfa", 900],
    g1: ["1610701596007-11502861dcfa", 800],
    g2: ["1565193566173-7a0ee3dbe261", 800],
    g3: ["1594040226829-7f251ab46d80", 800],
    g4: ["1603204077779-bed963ea7d0e", 800],
    mk: ["1565193566173-7a0ee3dbe261", 1200],
    u1: ["1513694203232-719a280e022f", 800],
    u2: ["1617806118233-18e1de247200", 800],
    u3: ["1493663284031-b7e3aefcae8e", 800],
    u4: ["1555041469-a586c61ea9bc", 800],
    u5: ["1586023492125-27b2c045efd7", 800],
    a0: ["1438761681033-6461ffad8d80", 200],
    a1: ["1544005313-94ddf0286df2", 200],
    a2: ["1500648767791-00dcc994a43e", 200],
    a3: ["1534528741775-53994a69daeb", 200],
    a4: ["1507003211169-0a1dd7228f2d", 200],
    a5: ["1494790108377-be9c29b29330", 200],
    room: ["1616486338812-3dadae4b4ace", 2000],
  });
  const h = site(p);
  return {
    screens: [
      { name: "desktop", html: h, width: 1440, height: 900, fullPage: true },
      { name: "mobile", html: h, width: 390, height: 790, fullPage: true },
      { name: "dashboard", html: dashboard(p), width: 1440, height: 900 },
      { name: "brief", html: brief(p), width: 390, height: 790 },
      { name: "post", html: post(p.u3, "slowliving.sana", "Slow Sunday with the twin bottle vases. Each one is thrown by Ramesh ji in Khurja, so no two are the same.", p.a1), width: 390, height: 790 },
      { name: "post2", html: post(p.u1, "homewithmeera", "Corner glow-up for Diwali: the Bagru throw and stacking bowls. Code HEARTH10 for 10% off.", p.a0), width: 390, height: 790 },
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
            body: `${backdrop(`linear-gradient(140deg,#A3B07A,${C.sage} 45%,${C.olive})`, "rgba(246,241,231,.35)")}
${win({ src: s.dashboard, left: 100, top: 150, w: 1500, h: 937, url: "creators.hearthloom.in/campaigns/festive" })}
${phone({ src: s.brief, left: 1480, top: 290, w: 400, statusBg: C.cream, statusColor: C.ink })}`,
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
            body: `${backdrop(`linear-gradient(160deg,#F1EADC,#D8CBB2)`)}
${win({ src: s.desktop, y: 0, left: 160, top: 110, w: 1680, h: 1140, url: "hearthloom.in" })}`,
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
            body: `${backdrop(`linear-gradient(150deg,${C.linen},#D9CCB3)`, "rgba(255,255,255,.5)")}
${phone({ src: s.post, left: 300, top: 150, w: 430 })}
${phone({ src: s.brief, left: 785, top: 90, w: 430, statusBg: C.cream, statusColor: C.ink })}
${phone({ src: s.post2, left: 1270, top: 150, w: 430 })}`,
          }),
      },
      {
        file: "content.jpg",
        w: 2000,
        h: 1250,
        html: () =>
          stage({
            w: 2000,
            h: 1250,
            fonts,
            css: `${base}.t{position:absolute;width:420px;height:600px;border-radius:20px;overflow:hidden;box-shadow:0 40px 70px -30px rgba(46,42,34,.55)}.t img{width:100%;height:100%;object-fit:cover}
.t .h{position:absolute;left:14px;top:14px;display:flex;gap:8px;align-items:center;background:rgba(255,255,255,.92);border-radius:99px;padding:5px 12px 5px 5px;font-size:14px;font-weight:600}
.t .h img{width:26px;height:26px;border-radius:50%}`,
            body: `${backdrop(C.cream, "rgba(255,255,255,.6)")}
<div class="abs" style="left:90px;top:80px"><div class="mono" style="color:${C.sage}">Creator content · festive edit</div><div style="font:58px 'Young Serif';margin-top:12px">Real homes, not studios</div></div>
${[
              [90, 240, p.u1, p.a0, "homewithmeera"],
              [550, 320, p.u3, p.a1, "slowliving.sana"],
              [1010, 240, p.u2, p.a2, "studio.kabir"],
              [1470, 320, p.u4, p.a3, "thenookproject"],
            ]
              .map(([l, t, src, av, hd]) => `<div class="t" style="left:${l}px;top:${t}px"><img src="${src}"/><div class="h"><img src="${av}"/>@${hd}</div></div>`)
              .join("")}
<div class="abs mono" style="left:90px;bottom:60px;color:${C.mute}">Shot by creators in their own homes · usage rights cleared for 6 months</div>`,
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
            body: `<img src="${p.room}" class="abs" style="inset:0;width:100%;height:100%;object-fit:cover"/><div class="abs" style="inset:0;background:rgba(46,42,34,.25)"></div>
${phone({ src: s.mobile, y: 0, left: 285, top: 220, w: 430, statusBg: C.cream, statusColor: C.ink })}`,
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
            body: `${backdrop(C.olive, "rgba(255,255,255,.18)")}
<div class="abs" style="left:70px;right:70px;top:80px;color:#fff"><div class="mono" style="opacity:.75">Seeding kit</div><div style="font:66px/1.05 'Young Serif';margin-top:14px">An unboxing<br/>worth filming.</div></div>
<div class="abs" style="left:110px;right:110px;top:470px;height:560px;border-radius:24px;background:#D8C7A6;box-shadow:0 40px 80px -30px rgba(0,0,0,.5);overflow:hidden">
<div style="position:absolute;inset:26px;border:2px dashed rgba(46,42,34,.25);border-radius:14px"></div>
<div style="position:absolute;left:60px;top:60px;width:340px;height:440px;background:${C.cream};border-radius:6px;box-shadow:0 20px 30px -10px rgba(0,0,0,.25);padding:36px;transform:rotate(-3deg)"><div class="mono" style="color:${C.sage}">Made by</div><div style="font:36px 'Young Serif';margin-top:10px">Ramesh Prajapati</div><div style="color:${C.mute};margin-top:6px">Khurja, Uttar Pradesh · 31 years at the wheel</div><div style="font:22px/1.4 'Young Serif';margin-top:40px">"Every bowl takes three days. I hope it lasts thirty years."</div><div style="margin-top:40px">${logo(30)}</div></div>
<img src="${p.g1}" style="position:absolute;right:50px;top:90px;width:300px;height:380px;object-fit:cover;border-radius:14px;transform:rotate(4deg);box-shadow:0 20px 40px -10px rgba(0,0,0,.35)"/></div>`,
          }),
      },
    ],
  };
}
