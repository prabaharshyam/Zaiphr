/** Kōen Coffee: identity, packaging, café website and launch content (concept, fictional brand). */
import { doc, photos, stage, win, phone, backdrop, photoBackdrop } from "../kit.mjs";

const C = { roast: "#2B1D14", medium: "#6B4A2F", light: "#B98B5E", crema: "#F2E8D5", sunset: "#E2602B", paper: "#F7F1E6" };
const fonts = ["Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;1,9..144,400", "DM Sans:wght@400;500;700", "DM Mono:wght@400;500"];

const mark = (s, fg = C.roast, bg = C.sunset) =>
  `<svg width="${s}" height="${s}" viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="${bg}"/><path d="M50 6 C34 30 66 70 50 94" fill="none" stroke="${fg}" stroke-width="7" stroke-linecap="round"/></svg>`;
const logo = (s, color = C.roast, bg = C.sunset, fg = C.roast) =>
  `<span style="display:inline-flex;align-items:center;gap:${s * 0.28}px">${mark(s, fg, bg)}<span style="font:400 ${s * 0.95}px/1 'Fraunces';letter-spacing:-.03em;color:${color}">kōen</span></span>`;

/** A stand-up coffee pouch, drawn in CSS. */
const pouch = (w, bg, ink, name, origin, notes) => `
<div class="pouch" style="width:${w}px;height:${w * 1.42}px;background:${bg};color:${ink}">
  <div class="crimp"></div><div class="valve"></div>
  <div style="position:absolute;left:12%;right:12%;top:20%">${mark(w * 0.2, bg, ink)}</div>
  <div style="position:absolute;left:12%;right:12%;bottom:12%">
    <div style="font:400 ${w * 0.13}px/1 'Fraunces';letter-spacing:-.02em">${name}</div>
    <div style="font:500 ${w * 0.045}px 'DM Mono';letter-spacing:.12em;text-transform:uppercase;margin-top:${w * 0.05}px;opacity:.75">${origin}</div>
    <div style="font:400 ${w * 0.05}px/1.4 'DM Sans';margin-top:${w * 0.06}px;opacity:.8">${notes}</div>
    <div style="display:flex;justify-content:space-between;font:500 ${w * 0.042}px 'DM Mono';letter-spacing:.1em;margin-top:${w * 0.08}px;opacity:.7"><span>250 G</span><span>ROASTED 04·11</span></div>
  </div>
  <div class="sheen"></div>
</div>`;
const pouchCss = `
.pouch{position:relative;border-radius:6px 6px 14px 14px;box-shadow:0 2px 0 rgba(255,255,255,.15) inset,0 30px 50px -18px rgba(0,0,0,.45),0 10px 18px -8px rgba(0,0,0,.3)}
.pouch .crimp{position:absolute;left:0;right:0;top:0;height:7%;border-radius:6px 6px 0 0;background:repeating-linear-gradient(90deg,rgba(0,0,0,.12) 0 2px,rgba(255,255,255,.06) 2px 5px);border-bottom:1px solid rgba(0,0,0,.15)}
.pouch .valve{position:absolute;right:12%;top:12%;width:9%;aspect-ratio:1;border-radius:50%;background:rgba(0,0,0,.18);box-shadow:0 1px 0 rgba(255,255,255,.25)}
.pouch .sheen{position:absolute;inset:0;border-radius:inherit;background:linear-gradient(100deg,rgba(255,255,255,0) 0%,rgba(255,255,255,.16) 18%,rgba(255,255,255,0) 30%,rgba(0,0,0,0) 70%,rgba(0,0,0,.18) 100%)}`;

const beans = [
  { name: "Estate Dark", origin: "Chikmagalur · Washed", notes: "Cocoa, molasses, toasted almond", price: "₹649", bg: C.roast, ink: C.crema },
  { name: "Park Blend", origin: "Coorg & Araku · Honey", notes: "Orange peel, jaggery, milk chocolate", price: "₹599", bg: C.sunset, ink: C.roast },
  { name: "Morning Light", origin: "Baba Budangiri · Natural", notes: "Stone fruit, jasmine, cane sugar", price: "₹699", bg: C.crema, ink: C.roast },
];

const site = (p) =>
  doc({
    fonts,
    css: `${pouchCss}
body{background:${C.paper};color:${C.roast};font-family:'DM Sans',sans-serif}
.wrap{max-width:1280px;margin:0 auto;padding:0 48px}
.mono{font:500 12px 'DM Mono';letter-spacing:.14em;text-transform:uppercase}
nav{display:flex;align-items:center;justify-content:space-between;height:84px}
nav .links{display:flex;gap:36px;font-size:15px}
.btn{display:inline-flex;align-items:center;gap:10px;height:52px;padding:0 26px;border-radius:999px;font-weight:500;font-size:15px}
.btn.dark{background:${C.roast};color:${C.crema}}.btn.line{border:1.5px solid ${C.roast}}
.hero{display:grid;grid-template-columns:1.05fr 1fr;gap:56px;align-items:center;padding:40px 0 90px}
h1{font:300 112px/0.92 'Fraunces';letter-spacing:-.045em}
h1 em{font-style:italic;color:${C.sunset}}
.hero .ph{position:relative;height:640px;border-radius:28px;overflow:hidden}
.hero .ph img{width:100%;height:100%;object-fit:cover}
.float{position:absolute;left:28px;bottom:28px;right:28px;background:rgba(247,241,230,.92);backdrop-filter:blur(10px);border-radius:18px;padding:18px 20px;display:flex;align-items:center;gap:16px}
.strip{background:${C.roast};color:${C.crema};padding:22px 0;overflow:hidden;white-space:nowrap;font:400 30px 'Fraunces';letter-spacing:-.01em}
.strip span{margin:0 26px}.strip i{color:${C.sunset};font-style:normal}
section{padding:110px 0}
h2{font:300 64px/1 'Fraunces';letter-spacing:-.035em}
.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;margin-top:56px}
.prod .box{height:430px;border-radius:24px;background:#EADFCB;display:grid;place-items:center;position:relative;overflow:hidden}
.prod .box::after{content:"";position:absolute;bottom:58px;width:60%;height:26px;border-radius:50%;background:rgba(43,29,20,.18);filter:blur(10px)}
.prod .meta{display:flex;justify-content:space-between;align-items:baseline;margin-top:20px}
.prod h3{font:400 28px 'Fraunces';letter-spacing:-.02em}
.split{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:center}
.split img{width:100%;height:560px;object-fit:cover;border-radius:28px}
.hours{margin-top:34px;border-top:1px solid rgba(43,29,20,.15)}
.hours div{display:flex;justify-content:space-between;padding:16px 0;border-bottom:1px solid rgba(43,29,20,.15);font-size:16px}
.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;margin-top:56px}
.steps img{height:320px;width:100%;object-fit:cover;border-radius:22px}
.steps h3{font:400 26px 'Fraunces';margin-top:22px}
.steps p{color:${C.medium};margin-top:8px;line-height:1.55}
.sub{background:${C.sunset};border-radius:36px;padding:72px;display:grid;grid-template-columns:1.2fr 1fr;gap:40px;align-items:center}
.sub h2{color:${C.roast}}
.field{display:flex;gap:10px;background:${C.paper};border-radius:999px;padding:6px}
.field span{flex:1;padding:0 18px;display:flex;align-items:center;color:#8d7a67}
footer{background:${C.roast};color:${C.crema};padding:80px 0 40px;margin-top:110px}
footer .cols{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:40px}
footer p{opacity:.7;line-height:1.9;font-size:15px}
@media (max-width:600px){
 .wrap{padding:0 20px} nav{height:64px} nav .links,.hide-m{display:none}
 .hero{grid-template-columns:1fr;gap:28px;padding:14px 0 50px} h1{font-size:62px} .hero .ph{height:440px}
 .strip{font-size:22px;padding:16px 0}
 section{padding:64px 0} h2{font-size:42px}
 .grid3,.steps,.split,.sub,footer .cols{grid-template-columns:1fr} .grid3{gap:36px;margin-top:32px}
 .prod .box{height:380px} .split img{height:380px} .steps img{height:230px}
 .sub{padding:40px 24px;border-radius:28px} footer{margin-top:64px}
}`,
    body: `
<div class="wrap"><nav>${logo(34)}<div class="links"><span>Shop beans</span><span>Subscriptions</span><span>Cafés</span><span>Brew guides</span><span>Journal</span></div>
<div style="display:flex;gap:22px;align-items:center;font-size:15px"><span class="hide-m">Sign in</span><span class="btn dark" style="height:44px;padding:0 20px">Bag · 2</span></div></nav>
<div class="hero"><div>
  <div class="mono" style="color:${C.medium}">Slow-roasted in Bengaluru · since 2026</div>
  <h1 style="margin-top:26px">A pause<br/>in the <em>city.</em></h1>
  <p style="font-size:19px;line-height:1.6;max-width:470px;margin-top:28px;color:${C.medium}">Single-estate Indian coffee, roasted in small batches every Tuesday and brewed slowly in our two cafés. Take ten minutes. We'll take care of the rest.</p>
  <div style="display:flex;gap:12px;margin-top:36px;flex-wrap:wrap"><span class="btn dark">Shop this week's roast →</span><span class="btn line">Find a café</span></div>
  <div style="display:flex;gap:34px;margin-top:52px" class="mono"><span>★ Roasted weekly</span><span>Free shipping over ₹999</span></div>
</div>
<div class="ph"><img src="${p.hero}"/><div class="float">${mark(46)}<div><div class="mono" style="font-size:10.5px;color:${C.medium}">On the bar today</div><div style="font:400 21px 'Fraunces';margin-top:4px">Park Blend, as a flat white</div></div><span style="margin-left:auto;font:500 15px 'DM Sans'">₹220</span></div></div>
</div></div>
<div class="strip">${Array(3).fill(`<span>Single estate</span><i>●</i><span>Roasted on Tuesdays</span><i>●</i><span>Brewed slow</span><i>●</i><span>Grown in Karnataka</span><i>●</i>`).join("")}</div>
<section><div class="wrap">
  <div style="display:flex;justify-content:space-between;align-items:end;gap:20px;flex-wrap:wrap"><div><div class="mono" style="color:${C.medium}">This week's roast</div><h2 style="margin-top:14px">Three coffees,<br/>three moods.</h2></div><span class="btn line hide-m">See all beans</span></div>
  <div class="grid3">${beans
    .map(
      (b) => `<div class="prod"><div class="box">${pouch(210, b.bg, b.ink, b.name, b.origin, b.notes)}</div>
  <div class="meta"><h3>${b.name}</h3><span style="font-weight:500">${b.price}</span></div>
  <div style="color:${C.medium};margin-top:6px">${b.notes}</div></div>`,
    )
    .join("")}</div>
</div></section>
<section style="padding-top:0"><div class="wrap split">
  <img src="${p.cafe}"/>
  <div><div class="mono" style="color:${C.medium}">Visit us</div><h2 style="margin-top:14px">12th Main,<br/>Indiranagar.</h2>
  <p style="font-size:18px;line-height:1.65;color:${C.medium};margin-top:22px;max-width:460px">A long wooden bar, a slow pour-over menu and a window seat that's usually free before nine. No laptops at the bar, plenty everywhere else.</p>
  <div class="hours"><div><span>Monday to Friday</span><span>7:30 am to 9 pm</span></div><div><span>Saturday and Sunday</span><span>8 am to 10 pm</span></div><div><span>Brew class</span><span>Sundays, 11 am</span></div></div></div>
</div></section>
<section style="padding-top:0"><div class="wrap"><div class="mono" style="color:${C.medium}">Brew at home</div><h2 style="margin-top:14px">Three ways to slow down.</h2>
  <div class="steps">${[
    [p.espresso, "Espresso", "18 g in, 36 g out, 28 seconds. Park Blend shines in milk."],
    [p.pour, "Pour-over", "15 g to 250 ml, water just off the boil. Try Morning Light."],
    [p.latte, "Flat white", "A double shot and silky milk. Our bar's most-ordered drink."],
  ]
    .map(([src, t, d]) => `<div><img src="${src}"/><h3>${t}</h3><p>${d}</p></div>`)
    .join("")}</div></div></section>
<section style="padding-top:0"><div class="wrap"><div class="sub">
  <div><div class="mono">The Kōen Club</div><h2 style="margin-top:14px">Fresh beans at your door, every two weeks.</h2></div>
  <div><p style="font-size:17px;line-height:1.6;margin-bottom:22px">Pick a roast or let us choose. Pause or skip whenever you like. Members get 15% off at the bar.</p>
  <div class="field"><span>you@email.com</span><span class="btn dark" style="flex:none">Start for ₹549</span></div></div>
</div></div></section>
<footer><div class="wrap"><div class="cols"><div>${logo(36, C.crema, C.sunset, C.roast)}<p style="margin-top:22px;max-width:300px">Specialty coffee from Karnataka's hills, roasted in Bengaluru.</p></div>
<div><div class="mono" style="opacity:.55;margin-bottom:12px">Shop</div><p>Beans<br/>Subscriptions<br/>Gear<br/>Gift cards</p></div>
<div><div class="mono" style="opacity:.55;margin-bottom:12px">Visit</div><p>Indiranagar<br/>Koramangala<br/>Brew classes</p></div>
<div><div class="mono" style="opacity:.55;margin-bottom:12px">Say hi</div><p>Instagram<br/>hello@koen.coffee</p></div></div>
<div class="mono" style="opacity:.45;margin-top:60px;font-size:11px">© 2026 Kōen Coffee Roasters</div></div></footer>`,
  });

export default async function koen() {
  const p = await photos({
    hero: ["1495474472287-4d71bcdd2085", 1400],
    cafe: ["1554118811-1e0d58224f24", 1400],
    espresso: ["1511920170033-f8396924c348", 900],
    pour: ["1442512595331-e89e73853f31", 900],
    latte: ["1509042239860-f550ce710b93", 900],
    beans: ["1447933601403-0c6688de566e", 1600],
    bar: ["1501339847302-ac426a4a7cbb", 2000],
    iced: ["1461023058943-07fcbe16d735", 1200],
    cup: ["1514432324607-a09d9b4aefdd", 1200],
  });
  const html = site(p);
  const url = "koen.coffee";
  return {
    screens: [
      { name: "desktop", html, width: 1440, height: 900, fullPage: true },
      { name: "mobile", html, width: 390, height: 790, fullPage: true },
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
            body: `${photoBackdrop(p.bar, "linear-gradient(120deg,rgba(43,29,20,.86),rgba(43,29,20,.55))", 14)}
${win({ src: s.desktop, left: 110, top: 150, w: 1500, h: 900, url })}
${phone({ src: s.mobile, left: 1500, top: 300, w: 400, statusBg: C.paper, statusColor: C.roast })}`,
          }),
      },
      {
        file: "brand.jpg",
        w: 2000,
        h: 1250,
        html: () =>
          stage({
            w: 2000,
            h: 1250,
            fonts,
            css: `${pouchCss}.t{position:absolute;border-radius:26px;overflow:hidden}.mono{font:500 13px 'DM Mono';letter-spacing:.14em;text-transform:uppercase}`,
            body: `${backdrop("#E6DAC4", "rgba(255,255,255,.4)")}
<div class="t" style="left:50px;top:50px;width:900px;height:620px;background:${C.roast};padding:56px;display:flex;flex-direction:column;justify-content:space-between">
  <div class="mono" style="color:${C.crema};opacity:.6">Kōen Coffee · Primary lockup</div>
  <div>${logo(170, C.crema, C.sunset, C.roast)}</div>
  <div style="display:flex;justify-content:space-between;align-items:end"><div style="font:italic 400 40px 'Fraunces';color:${C.crema}">A pause in the city.</div><div class="mono" style="color:${C.crema};opacity:.5">Kōen: Japanese for "park"</div></div>
</div>
<div class="t" style="left:970px;top:50px;width:980px;height:300px;display:flex">${[
              [C.roast, "Deep Roast", C.crema],
              [C.medium, "Medium", C.crema],
              [C.light, "Light", C.roast],
              [C.crema, "Crema", C.roast],
              [C.sunset, "Park Sunset", C.roast],
            ]
              .map(([c, n, ink]) => `<div style="flex:1;background:${c};color:${ink};padding:26px;display:flex;flex-direction:column;justify-content:flex-end"><div style="font:600 21px 'DM Sans'">${n}</div><div class="mono" style="font-size:12px;opacity:.7;margin-top:6px">${c}</div></div>`)
              .join("")}</div>
<div class="t" style="left:970px;top:370px;width:480px;height:300px;background:${C.paper};padding:34px">
  <div class="mono" style="color:${C.medium}">Typography</div>
  <div style="font:300 120px/1 'Fraunces';letter-spacing:-.04em;margin-top:18px;color:${C.roast}">Aa</div>
  <div style="font:600 19px 'DM Sans';color:${C.roast};margin-top:10px">Fraunces Light · DM Sans · DM Mono</div>
</div>
<div class="t" style="left:1470px;top:370px;width:480px;height:830px"><img src="${p.cup}" style="width:100%;height:100%;object-fit:cover"/>
  <div style="position:absolute;left:28px;bottom:28px;background:${C.paper};border-radius:16px;padding:16px 18px;display:flex;gap:12px;align-items:center">${mark(40)}<span style="font:400 20px 'Fraunces'">Photography: warm, close, unposed</span></div></div>
<div class="t" style="left:50px;top:690px;width:900px;height:510px;background:url('${p.beans}') center/cover">
  <div style="position:absolute;inset:0;background:linear-gradient(90deg,rgba(43,29,20,.8),rgba(43,29,20,.25))"></div>
  <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:40px">${beans.map((b) => pouch(220, b.bg, b.ink, b.name, b.origin, b.notes)).join("")}</div></div>
<div class="t" style="left:970px;top:690px;width:480px;height:510px;background:${C.sunset};display:grid;place-items:center">
  <div style="display:grid;grid-template-columns:repeat(4,70px);gap:22px">${Array(16)
    .fill(0)
    .map((_, i) => mark(70, i % 3 === 0 ? C.sunset : C.roast, i % 3 === 0 ? C.roast : C.crema))
    .join("")}</div></div>`,
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
            body: `${backdrop(`linear-gradient(160deg,#EFE5D3,#D9C7AA)`)}
${win({ src: s.desktop, y: 990, left: 160, top: 110, w: 1680, h: 1140, url: `${url}/shop` })}`,
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
            body: `${backdrop(`linear-gradient(150deg,#EC7A43,${C.sunset} 45%,#B9461B)`, "rgba(255,230,200,.35)")}
${phone({ src: s.mobile, y: 0, left: 300, top: 150, w: 430, statusBg: C.paper, statusColor: C.roast })}
${phone({ src: s.mobile, y: 1290, left: 785, top: 90, w: 430, statusBg: C.paper, statusColor: C.roast })}
${phone({ src: s.mobile, y: 2520, left: 1270, top: 150, w: 430, statusBg: C.paper, statusColor: C.roast })}`,
          }),
      },
      {
        file: "social.jpg",
        w: 1000,
        h: 1250,
        html: () =>
          stage({
            w: 1000,
            h: 1250,
            fonts,
            body: `<img src="${p.iced}" class="abs" style="inset:0;width:100%;height:100%;object-fit:cover"/>
<div class="abs" style="inset:0;background:linear-gradient(180deg,rgba(43,29,20,.0) 35%,rgba(43,29,20,.85))"></div>
<div class="abs" style="left:64px;top:64px">${logo(52, C.crema, C.sunset, C.roast)}</div>
<div class="abs" style="left:64px;right:64px;bottom:80px;color:${C.crema}">
  <div style="font:500 16px 'DM Mono';letter-spacing:.16em;text-transform:uppercase;opacity:.8">Summer menu · from Monday</div>
  <div style="font:300 120px/0.92 'Fraunces';letter-spacing:-.045em;margin-top:22px">Cold brew,<br/><em style="color:${C.sunset}">slow</em> made.</div>
  <div style="font:400 24px 'DM Sans';margin-top:26px;opacity:.85">Steeped 18 hours. Poured over jaggery syrup and oat milk.</div></div>`,
          }),
      },
      {
        file: "social-2.jpg",
        w: 1000,
        h: 1250,
        html: () =>
          stage({
            w: 1000,
            h: 1250,
            fonts,
            body: `<div class="abs" style="inset:0;background:${C.roast}"></div>
<div class="abs" style="left:64px;right:64px;top:64px;display:flex;justify-content:space-between;align-items:center">${mark(56)}<span style="font:500 16px 'DM Mono';letter-spacing:.16em;color:${C.crema};opacity:.7">GRAND OPENING · 15·11</span></div>
<div class="abs" style="left:64px;right:64px;top:210px;color:${C.crema}"><div style="font:300 138px/0.9 'Fraunces';letter-spacing:-.05em">Find<br/>your<br/><em style="color:${C.sunset}">pause.</em></div></div>
<div class="abs" style="left:64px;right:64px;bottom:64px;height:360px;border-radius:24px;overflow:hidden"><img src="${p.cafe}" style="width:100%;height:100%;object-fit:cover"/>
<div class="abs" style="left:24px;bottom:24px;background:${C.paper};border-radius:14px;padding:14px 18px;font:500 18px 'DM Sans';color:${C.roast}">12th Main, Indiranagar · first cup on us</div></div>`,
          }),
      },
    ],
  };
}
