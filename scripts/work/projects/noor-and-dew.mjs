/** Noor & Dew: Shopify storefront for a skincare brand (concept, fictional brand). */
import { doc, photos, stage, win, phone, backdrop, photoBackdrop } from "../kit.mjs";

const C = { ink: "#3A2A22", clay: "#C66B3D", sand: "#EFE4D6", cream: "#FAF5EE", sage: "#8C9A7E", blush: "#E9C9B5", mute: "#8A7565" };
const fonts = ["Cormorant Garamond:ital,wght@0,400;0,500;1,400", "Jost:wght@300;400;500"];

const logo = (s, c = C.ink) => `<span style="font:500 ${s}px/1 'Cormorant Garamond';letter-spacing:.02em;color:${c}">noor <em style="font-style:italic;color:${C.clay}">&amp;</em> dew</span>`;

/* Product renders in CSS: glass dropper, frosted jar, pump tube. */
const bottleCss = `
.dropper{position:relative;width:var(--w);height:calc(var(--w)*2.1)}
.dropper .cap{position:absolute;left:30%;right:30%;top:0;height:30%;border-radius:40% 40% 8% 8%/30% 30% 8% 8%;background:linear-gradient(90deg,#151515,#4a4a4a 35%,#1d1d1d 60%,#0d0d0d)}
.dropper .collar{position:absolute;left:24%;right:24%;top:27%;height:8%;border-radius:3px;background:linear-gradient(90deg,#b8925d,#f1d9a6 40%,#a07a45 70%,#d8b67d)}
.dropper .glass{position:absolute;left:0;right:0;top:33%;bottom:0;border-radius:22% 22% 10% 10%/12% 12% 6% 6%;background:linear-gradient(90deg,#5a2a0c,#a8591f 22%,#d98a45 38%,#9c4c17 60%,#4a2108);box-shadow:inset 0 -10px 18px rgba(0,0,0,.35)}
.dropper .glass::after{content:"";position:absolute;left:14%;top:6%;width:9%;bottom:10%;border-radius:10px;background:linear-gradient(180deg,rgba(255,255,255,.55),rgba(255,255,255,.08))}
.label{position:absolute;left:12%;right:12%;top:46%;bottom:14%;background:${C.cream};border-radius:3px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;color:${C.ink};box-shadow:inset 0 0 12px rgba(0,0,0,.08)}
.jar{position:relative;width:var(--w);height:calc(var(--w)*.95)}
.jar .lid{position:absolute;left:4%;right:4%;top:0;height:30%;border-radius:10px 10px 4px 4px;background:linear-gradient(90deg,#a9a49c,#eeeae3 35%,#c9c3ba 65%,#8f8a82)}
.jar .body{position:absolute;left:0;right:0;top:27%;bottom:0;border-radius:6px 6px 18px 18px;background:linear-gradient(90deg,#d9cfc4,#fbf8f3 35%,#ece4da 65%,#c8bdb1)}
.tube{position:relative;width:var(--w);height:calc(var(--w)*2.6)}
.tube .pump{position:absolute;left:38%;right:38%;top:0;height:16%;background:linear-gradient(90deg,#999,#eee 40%,#aaa);border-radius:4px 4px 0 0}
.tube .pump::before{content:"";position:absolute;left:-60%;right:30%;top:0;height:24%;background:inherit;border-radius:4px}
.tube .neck{position:absolute;left:26%;right:26%;top:15%;height:9%;background:linear-gradient(90deg,#b98b6a,#f0cfb3 40%,#a97b5a)}
.tube .body{position:absolute;left:0;right:0;top:23%;bottom:0;border-radius:14px 14px 10px 10px;background:linear-gradient(90deg,#c9a083,#f3dccb 30%,#e8c8b1 60%,#b98f72)}
.shadow{position:absolute;bottom:-14px;left:8%;right:8%;height:22px;border-radius:50%;background:rgba(58,42,34,.28);filter:blur(9px);z-index:-1}`;
const lbl = (name, sub, s) => `<div class="label"><div style="font:500 ${s}px/1 'Cormorant Garamond'">${name}</div><div style="font:400 ${s * 0.38}px 'Jost';letter-spacing:.18em;text-transform:uppercase;margin-top:${s * 0.35}px;opacity:.7">${sub}</div><div style="font:500 ${s * 0.42}px 'Cormorant Garamond';margin-top:${s * 0.5}px">noor &amp; dew</div></div>`;
const dropper = (w, name, sub) => `<div class="dropper" style="--w:${w}px"><div class="cap"></div><div class="collar"></div><div class="glass">${lbl(name, sub, w * 0.125)}</div><div class="shadow"></div></div>`;
const jar = (w, name, sub) => `<div class="jar" style="--w:${w}px"><div class="lid"></div><div class="body"><div class="label" style="top:18%;bottom:18%">${`<div style="font:500 ${w * 0.12}px/1 'Cormorant Garamond'">${name}</div><div style="font:400 ${w * 0.045}px 'Jost';letter-spacing:.18em;text-transform:uppercase;margin-top:6px;opacity:.7">${sub}</div>`}</div></div><div class="shadow"></div></div>`;
const tube = (w, name, sub) => `<div class="tube" style="--w:${w}px"><div class="pump"></div><div class="neck"></div><div class="body"><div class="label" style="top:22%;bottom:22%;background:rgba(250,245,238,.85)">${`<div style="font:500 ${w * 0.2}px/1 'Cormorant Garamond'">${name}</div><div style="font:400 ${w * 0.075}px 'Jost';letter-spacing:.18em;text-transform:uppercase;margin-top:6px;opacity:.7">${sub}</div>`}</div></div><div class="shadow"></div></div>`;

const products = [
  { r: (w) => dropper(w, "Kumkumadi", "Glow oil · 30 ml"), name: "Kumkumadi Glow Oil", tag: "Evening ritual", price: "₹1,290", bg: "#EAD9C6" },
  { r: (w) => tube(w * 0.62, "Rice Water", "Cleanser"), name: "Rice Water Cleanser", tag: "Morning ritual", price: "₹590", bg: "#E4E1D6" },
  { r: (w) => jar(w * 1.05, "Dew Cream", "Ceramides 3%"), name: "Dew Barrier Cream", tag: "Every day", price: "₹890", bg: "#F0DFD3" },
  { r: (w) => dropper(w, "Niacin 5%", "Serum · 30 ml"), name: "5% Niacinamide Serum", tag: "Morning ritual", price: "₹790", bg: "#E2E3D6" },
];

const css = `${bottleCss}
body{background:${C.cream};color:${C.ink};font-family:'Jost',sans-serif;font-weight:400}
.wrap{max-width:1320px;margin:0 auto;padding:0 48px}
.ann{background:${C.ink};color:${C.sand};text-align:center;font-size:13px;letter-spacing:.08em;padding:10px}
nav{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;height:88px}
nav .l{display:flex;gap:32px;font-size:14px;letter-spacing:.06em;text-transform:uppercase}
nav .r{display:flex;gap:26px;justify-content:flex-end;font-size:14px;letter-spacing:.06em;text-transform:uppercase}
.up{font-size:13px;letter-spacing:.18em;text-transform:uppercase}
.btn{display:inline-flex;align-items:center;justify-content:center;height:54px;padding:0 34px;font-size:14px;letter-spacing:.14em;text-transform:uppercase}
.btn.d{background:${C.ink};color:${C.cream}}.btn.l{border:1px solid ${C.ink}}
.hero{position:relative;height:760px;overflow:hidden}
.hero img{width:100%;height:100%;object-fit:cover;object-position:50% 30%}
.hero .t{position:absolute;left:0;right:0;bottom:0;padding:0 48px 76px;max-width:1320px;margin:0 auto;color:#fff}
.hero h1{font:400 108px/0.95 'Cormorant Garamond';letter-spacing:-.01em}
.hero h1 em{font-style:italic}
section{padding:100px 0}
h2{font:400 62px/1.02 'Cormorant Garamond'}
h2 em{font-style:italic;color:${C.clay}}
.rit{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;margin-top:50px}
.rit .c{position:relative;height:520px;overflow:hidden}
.rit img{width:100%;height:100%;object-fit:cover}
.rit .c .cap{position:absolute;left:24px;right:24px;bottom:24px;background:${C.cream};padding:20px 22px;display:flex;justify-content:space-between;align-items:end}
.grid4{display:grid;grid-template-columns:repeat(4,1fr);gap:22px;margin-top:50px}
.p .box{height:420px;display:grid;place-items:center;position:relative}
.p .tag{position:absolute;left:16px;top:16px;background:${C.cream};padding:6px 10px;font-size:11px;letter-spacing:.14em;text-transform:uppercase}
.p .n{display:flex;justify-content:space-between;margin-top:18px;font-size:16px}
.p .s{color:${C.mute};font-size:14px;margin-top:4px}
.p .add{margin-top:16px;border:1px solid ${C.ink};text-align:center;padding:13px;font-size:12px;letter-spacing:.16em;text-transform:uppercase}
.ing{display:grid;grid-template-columns:1fr 1fr;gap:70px;align-items:center}
.ing img{width:100%;height:640px;object-fit:cover}
.ing .row{display:grid;grid-template-columns:70px 1fr;gap:16px;padding:22px 0;border-bottom:1px solid rgba(58,42,34,.15)}
.ing .row b{font:500 34px 'Cormorant Garamond';color:${C.clay}}
.quiz{background:${C.sand};padding:90px;text-align:center}
.badges{display:flex;gap:44px;justify-content:center;margin-top:40px;color:${C.mute};font-size:14px;letter-spacing:.1em;text-transform:uppercase}
footer{background:${C.ink};color:${C.sand};padding:80px 0 40px}
footer .cols{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:40px;font-size:15px;line-height:2;opacity:.85}
@media(max-width:600px){
 .wrap{padding:0 20px} nav{grid-template-columns:auto 1fr auto;height:62px} nav .l,.hide-m{display:none}
 .hero{height:620px}.hero .t{padding:0 20px 40px}.hero h1{font-size:62px}
 section{padding:60px 0} h2{font-size:42px}
 .rit,.grid4,.ing,footer .cols{grid-template-columns:1fr} .grid4{grid-template-columns:1fr 1fr;gap:14px}
 .rit .c{height:360px}.p .box{height:250px}.p .n{font-size:14px}.ing img{height:380px}.ing{gap:30px}
 .quiz{padding:50px 22px}.badges{flex-wrap:wrap;gap:16px}
}`;

const nav = `<div class="ann">Free shipping over ₹799 · Cash on delivery available · Made in Kerala</div>
<div class="wrap"><nav><div class="l"><span>Shop</span><span>Rituals</span><span>Ingredients</span><span>Journal</span></div>${logo(36)}<div class="r"><span class="hide-m">Skin quiz</span><span class="hide-m">Account</span><span>Bag (1)</span></div></nav></div>`;

const home = (p) =>
  doc({
    fonts,
    css,
    body: `${nav}
<div class="hero"><img src="${p.hero}"/><div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0) 40%,rgba(40,24,16,.6))"></div>
<div class="t"><div class="up" style="opacity:.9">Ayurvedic actives · clinical doses</div><h1 style="margin-top:18px">Rituals for<br/><em>sunlit skin.</em></h1>
<div style="display:flex;gap:12px;margin-top:34px;flex-wrap:wrap"><span class="btn d" style="background:${C.cream};color:${C.ink}">Shop bestsellers</span><span class="btn l" style="border-color:#fff;color:#fff">Find your ritual</span></div></div></div>
<section><div class="wrap"><div class="up" style="color:${C.mute}">Shop by ritual</div><h2 style="margin-top:14px">Three steps, <em>morning</em><br/>and night.</h2>
<div class="rit">${[
      [p.r1, "Morning", "Cleanse · Treat · Protect"],
      [p.r2, "Evening", "Melt · Nourish · Repair"],
      [p.r3, "Weekly", "Polish · Mask · Rest"],
    ]
      .map(([src, t, d]) => `<div class="c"><img src="${src}"/><div class="cap"><div><div style="font:400 30px 'Cormorant Garamond'">${t}</div><div style="color:${C.mute};font-size:14px;margin-top:4px">${d}</div></div><span class="up">Shop →</span></div></div>`)
      .join("")}</div></div></section>
<section style="padding-top:0"><div class="wrap"><div style="display:flex;justify-content:space-between;align-items:end"><div><div class="up" style="color:${C.mute}">Bestsellers</div><h2 style="margin-top:14px">Loved on <em>every</em> shelf.</h2></div><span class="up hide-m" style="border-bottom:1px solid">View all 18</span></div>
<div class="grid4">${products
      .map(
        (x) => `<div class="p"><div class="box" style="background:${x.bg}"><span class="tag">${x.tag}</span>${x.r(120)}</div>
<div class="n"><span>${x.name}</span><span>${x.price}</span></div><div class="s">Free gift over ₹1,500</div><div class="add">Add to bag</div></div>`,
      )
      .join("")}</div></div></section>
<section style="padding-top:0"><div class="wrap ing"><img src="${p.ing}"/>
<div><div class="up" style="color:${C.mute}">What's inside</div><h2 style="margin-top:14px">Old remedies,<br/><em>measured</em> doses.</h2>
<p style="color:${C.mute};font-size:17px;line-height:1.7;margin-top:22px;max-width:480px">Every formula pairs one Ayurvedic hero with one proven active, at the percentage that actually works, and nothing else.</p>
${[
      ["01", "Kumkumadi tailam", "Saffron and 16 herbs, cold-infused in sesame oil for 21 days."],
      ["02", "Niacinamide 5%", "Evens tone and calms oil without the sting of higher doses."],
      ["03", "Fermented rice water", "A gentle, pH-balanced cleanse that keeps the barrier intact."],
    ]
      .map(([n, t, d]) => `<div class="row"><b>${n}</b><div><div style="font-size:18px;font-weight:500">${t}</div><div style="color:${C.mute};margin-top:4px;line-height:1.6">${d}</div></div></div>`)
      .join("")}</div></div></section>
<section style="padding-top:0"><div class="wrap"><div class="quiz"><div class="up" style="color:${C.mute}">Two minutes, five questions</div><h2 style="margin-top:14px">Not sure where to <em>start?</em></h2>
<p style="color:${C.mute};font-size:17px;margin-top:16px">Take the skin quiz and we'll build your ritual, with sample sizes first.</p><span class="btn d" style="margin-top:30px">Take the quiz</span>
<div class="badges"><span>UPI &amp; COD</span><span>Dermatologist reviewed</span><span>No fragrance added</span><span>Cruelty free</span></div></div></div></section>
<footer><div class="wrap"><div class="cols"><div>${logo(38, C.sand)}<p style="margin-top:18px;max-width:300px;opacity:.7">Skincare for heat, humidity and hard water. Made in small batches in Kochi.</p></div><div>Shop<br/>Rituals<br/>Gift sets</div><div>Ingredients<br/>Journal<br/>Skin quiz</div><div>Shipping<br/>Returns<br/>Contact</div></div></div></footer>`,
  });

const pdp = (p) =>
  doc({
    fonts,
    css: `${css}
.pd{display:grid;grid-template-columns:1.15fr 1fr;gap:70px;padding:30px 0 100px}
.gal{display:grid;grid-template-columns:110px 1fr;gap:16px}
.thumbs div{height:130px;margin-bottom:12px;background:${C.sand};display:grid;place-items:center;overflow:hidden}
.main{height:760px;background:#EAD9C6;display:grid;place-items:center;position:relative;overflow:hidden}
.opt{display:flex;gap:10px;margin-top:14px}.opt span{border:1px solid rgba(58,42,34,.3);padding:12px 18px;font-size:14px}.opt .on{border-color:${C.ink};background:${C.ink};color:${C.cream}}
.acc div{border-top:1px solid rgba(58,42,34,.15);padding:18px 0;display:flex;justify-content:space-between;font-size:15px}
.pay{display:flex;gap:8px;margin-top:16px;flex-wrap:wrap}.pay span{border:1px solid rgba(58,42,34,.2);padding:6px 10px;font-size:12px;color:${C.mute}}
@media(max-width:600px){.pd{grid-template-columns:1fr;gap:28px;padding-top:14px}.gal{grid-template-columns:1fr}.thumbs{display:none}.main{height:430px}.opt{flex-wrap:wrap}}`,
    body: `${nav}<div class="wrap"><div class="up" style="color:${C.mute};padding:10px 0 0">Shop / Evening ritual / Kumkumadi Glow Oil</div>
<div class="pd"><div class="gal"><div class="thumbs"><div>${dropper(46, "", "")}</div><div><img src="${p.r2}" style="width:100%;height:100%;object-fit:cover"/></div><div><img src="${p.ing}" style="width:100%;height:100%;object-fit:cover"/></div><div style="background:${C.ink}"></div></div>
<div class="main">${dropper(250, "Kumkumadi", "Glow oil · 30 ml")}<span style="position:absolute;left:22px;top:22px;background:${C.cream};padding:8px 12px" class="up">Bestseller</span></div></div>
<div><div class="up" style="color:${C.clay}">Evening ritual · Step 2</div><h2 style="margin-top:12px;font-size:58px">Kumkumadi<br/><em>Glow Oil</em></h2>
<div style="display:flex;gap:16px;align-items:baseline;margin-top:18px"><span style="font-size:26px">₹1,290</span><span style="color:${C.mute};font-size:14px">incl. of all taxes · 30 ml</span></div>
<p style="color:${C.mute};font-size:17px;line-height:1.7;margin-top:22px">A saffron night oil cold-infused for 21 days. Three drops after cleansing fade dullness and uneven tone, and sink in within a minute: no greasy pillowcase.</p>
<div style="margin-top:28px;font-size:14px;letter-spacing:.1em;text-transform:uppercase">Size</div><div class="opt"><span>15 ml · ₹790</span><span class="on">30 ml · ₹1,290</span><span>Refill · ₹990</span></div>
<div style="display:flex;gap:12px;margin-top:26px"><span class="btn d" style="flex:1">Add to bag · ₹1,290</span><span class="btn l">♡</span></div>
<div class="pay"><span>UPI</span><span>Cards</span><span>Net banking</span><span>Cash on delivery</span><span>Pay in 3 · no cost</span></div>
<div style="margin-top:22px;background:${C.sand};padding:16px 18px;font-size:15px">Delivery to <b>560038</b> by <b>Thursday, 14 Nov</b> · free over ₹799</div>
<div class="acc" style="margin-top:26px"><div><span>How to use</span><span>+</span></div><div><span>Full ingredient list</span><span>+</span></div><div><span>Good for: dull, uneven, dry skin</span><span>+</span></div><div><span>Shipping &amp; 15-day returns</span><span>+</span></div></div></div></div></div>`,
  });

const checkout = () =>
  doc({
    fonts,
    css: `body{background:${C.cream};color:${C.ink};font-family:'Jost',sans-serif}
.h{display:flex;justify-content:space-between;align-items:center;padding:14px 20px;border-bottom:1px solid rgba(58,42,34,.12)}
.sec{padding:18px 20px;border-bottom:1px solid rgba(58,42,34,.12)}
.up{font-size:11.5px;letter-spacing:.16em;text-transform:uppercase;color:${C.mute}}
.item{display:flex;gap:14px;align-items:center;margin-top:12px}
.th{width:64px;height:76px;background:#EAD9C6;display:grid;place-items:center;overflow:hidden}
.opt{display:flex;align-items:center;gap:12px;border:1px solid rgba(58,42,34,.2);padding:14px;margin-top:10px;font-size:15px}
.opt.on{border:1.5px solid ${C.ink};background:#fff}
.rad{width:18px;height:18px;border-radius:50%;border:1.5px solid ${C.ink};display:grid;place-items:center}
.rad i{width:9px;height:9px;border-radius:50%;background:${C.ink}}
.chip{border-radius:8px;padding:6px 9px;font-size:12px;background:${C.sand}}
.pay{position:fixed;left:0;right:0;bottom:0;background:${C.cream};padding:14px 20px 30px;border-top:1px solid rgba(58,42,34,.12)}
.btn{background:${C.ink};color:${C.cream};height:54px;display:flex;align-items:center;justify-content:center;font-size:14px;letter-spacing:.14em;text-transform:uppercase}
${bottleCss}`,
    body: `<div class="h"><span style="font-size:20px">←</span>${logo(26)}<span class="up">Secure</span></div>
<div class="sec"><div class="up">Your bag · 2 items</div>
<div class="item"><div class="th">${dropper(30, "", "")}</div><div style="flex:1"><div>Kumkumadi Glow Oil</div><div class="up" style="margin-top:4px">30 ml</div></div><div>₹1,290</div></div>
<div class="item"><div class="th" style="background:#E4E1D6">${tube(20, "", "")}</div><div style="flex:1"><div>Rice Water Cleanser</div><div class="up" style="margin-top:4px">100 ml</div></div><div>₹590</div></div>
<div style="margin-top:14px;background:${C.sand};padding:10px 12px;font-size:13.5px">🎁 Free travel-size Dew Cream added</div></div>
<div class="sec"><div class="up">Deliver to</div><div style="margin-top:8px;font-size:15px;line-height:1.5">Ananya R. · 98450 •••12<br/><span style="color:${C.mute}">14, 2nd Cross, Indiranagar, Bengaluru 560038</span></div><div style="margin-top:8px;font-size:14px;color:${C.clay}">Arrives Thursday, 14 Nov</div></div>
<div class="sec"><div class="up">Pay with</div>
<div class="opt on"><span class="rad"><i></i></span><span style="flex:1">UPI</span><span class="chip">GPay</span><span class="chip">PhonePe</span><span class="chip">Paytm</span></div>
<div style="font-size:13px;color:${C.mute};margin-top:8px;padding-left:4px">Pay from any UPI app. No need to type an ID.</div>
<div class="opt"><span class="rad"></span><span style="flex:1">Credit or debit card</span></div>
<div class="opt"><span class="rad"></span><span style="flex:1">Cash on delivery</span><span style="font-size:13px;color:${C.mute}">+ ₹40</span></div>
<div class="opt"><span class="rad"></span><span style="flex:1">Pay in 3, no cost EMI</span></div></div>
<div class="sec" style="font-size:15px;line-height:2"><div style="display:flex;justify-content:space-between"><span>Subtotal</span><span>₹1,880</span></div><div style="display:flex;justify-content:space-between"><span>Shipping</span><span style="color:${C.sage}">Free</span></div><div style="display:flex;justify-content:space-between;font-weight:500;font-size:17px"><span>Total</span><span>₹1,880</span></div></div>
<div class="pay"><div class="btn">Pay ₹1,880 with UPI</div></div>`,
  });

export default async function noor() {
  const p = await photos({
    hero: ["1531123897727-8f129e1688ce", 2000],
    r1: ["1438761681033-6461ffad8d80", 900],
    r2: ["1612817288484-6f916006741a", 900],
    r3: ["1603204077779-bed963ea7d0e", 900],
    ing: ["1612817288484-6f916006741a", 1200],
    stone: ["1610701596007-11502861dcfa", 2000],
    portrait: ["1544005313-94ddf0286df2", 1200],
  });
  const h = home(p);
  const url = "noorandew.in";
  return {
    screens: [
      { name: "desktop", html: h, width: 1440, height: 900, fullPage: true },
      { name: "mobile", html: h, width: 390, height: 790, fullPage: true },
      { name: "pdp", html: pdp(p), width: 1440, height: 900, fullPage: true },
      { name: "pdp-m", html: pdp(p), width: 390, height: 790, fullPage: true },
      { name: "checkout", html: checkout(), width: 390, height: 790 },
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
            body: `${backdrop(`linear-gradient(150deg,#F3E6D6,#DDBFA5)`, "rgba(255,250,240,.6)")}
${win({ src: s.desktop, left: 110, top: 140, w: 1480, h: 920, url })}
${phone({ src: s.mobile, y: 0, left: 1480, top: 300, w: 400, statusBg: C.ink, statusColor: C.sand })}`,
          }),
      },
      {
        file: "product.jpg",
        w: 2000,
        h: 1250,
        html: (s) =>
          stage({
            w: 2000,
            h: 1250,
            fonts,
            body: `${backdrop(`linear-gradient(160deg,#E9DCCB,#CDB49B)`)}
${win({ src: s.pdp, y: 40, left: 160, top: 110, w: 1680, h: 1140, url: `${url}/products/kumkumadi-glow-oil` })}`,
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
            body: `${backdrop(`linear-gradient(150deg,#4A362C,${C.ink})`, "rgba(198,107,61,.35)")}
${phone({ src: s.mobile, y: 1480, left: 300, top: 150, w: 430, statusBg: C.cream, statusColor: C.ink })}
${phone({ src: s["pdp-m"], y: 120, left: 785, top: 90, w: 430, statusBg: C.cream, statusColor: C.ink })}
${phone({ src: s.checkout, y: 0, left: 1270, top: 150, w: 430, statusBg: C.cream, statusColor: C.ink })}`,
          }),
      },
      {
        file: "range.jpg",
        w: 2000,
        h: 1250,
        html: () =>
          stage({
            w: 2000,
            h: 1250,
            fonts,
            css: `${bottleCss}.shadow{bottom:-22px;height:34px}`,
            body: `${photoBackdrop(p.stone, "linear-gradient(180deg,rgba(239,228,214,.55),rgba(198,160,128,.35))", 6)}
<div class="abs" style="left:0;right:0;bottom:0;height:420px;background:linear-gradient(180deg,#d9c3ab,#c4a587)"></div>
<div class="abs" style="left:0;right:0;bottom:418px;height:2px;background:rgba(255,255,255,.4)"></div>
<div class="abs" style="left:0;right:0;bottom:300px;display:flex;justify-content:center;align-items:flex-end;gap:90px">
${jar(260, "Dew Cream", "Ceramides 3%")}${dropper(230, "Kumkumadi", "Glow oil · 30 ml")}${tube(150, "Rice Water", "Cleanser")}${dropper(200, "Niacin 5%", "Serum · 30 ml")}</div>
<div class="abs" style="left:90px;top:90px;color:${C.ink}">${logo(64)}<div style="font:400 18px 'Jost';letter-spacing:.2em;text-transform:uppercase;margin-top:16px;opacity:.7">The core ritual · 4 products</div></div>`,
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
            body: `<img src="${p.portrait}" class="abs" style="inset:0;width:100%;height:100%;object-fit:cover"/>
<div class="abs" style="inset:0;background:linear-gradient(180deg,rgba(58,42,34,0) 45%,rgba(58,42,34,.8))"></div>
<div class="abs" style="left:60px;top:60px">${logo(46, "#fff")}</div>
<div class="abs" style="left:60px;right:60px;bottom:70px;color:#fff"><div style="font:400 18px 'Jost';letter-spacing:.2em;text-transform:uppercase;opacity:.85">The 3-drop evening ritual</div>
<div style="font:400 104px/0.95 'Cormorant Garamond';margin-top:18px">Glow is a<br/><em>habit.</em></div></div>`,
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
            css: bottleCss,
            body: `<div class="abs" style="inset:0;background:${C.sand}"></div>
<div class="abs" style="left:60px;right:60px;top:70px;color:${C.ink}"><div style="font:400 18px 'Jost';letter-spacing:.2em;text-transform:uppercase;color:${C.clay}">Ingredient spotlight</div>
<div style="font:400 92px/0.98 'Cormorant Garamond';margin-top:20px">Saffron, steeped<br/>for <em style="color:${C.clay}">21 days.</em></div></div>
<div class="abs" style="left:0;right:0;bottom:120px;display:flex;justify-content:center">${dropper(270, "Kumkumadi", "Glow oil · 30 ml")}</div>
<div class="abs" style="left:60px;right:60px;bottom:50px;display:flex;justify-content:space-between;font:400 16px 'Jost';letter-spacing:.16em;text-transform:uppercase;color:${C.mute}"><span>noorandew.in</span><span>₹1,290 · 30 ml</span></div>`,
          }),
      },
    ],
  };
}
