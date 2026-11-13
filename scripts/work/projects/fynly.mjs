/** Fynly: invoicing and cash-flow MVP for freelancers and small agencies (showcase build, fictional brand). */
import { doc, photos, stage, win, phone, backdrop } from "../kit.mjs";

const C = { indigo: "#4F46E5", deep: "#1E1B4B", ink: "#111827", mute: "#6B7280", line: "#E5E7EB", bg: "#F7F7FB", lilac: "#EEF0FF", green: "#059669", red: "#DC2626", amber: "#D97706" };
const fonts = ["Outfit:wght@400;500;600;700", "JetBrains Mono:wght@500"];

const logo = (s, c = C.ink) => `<span style="display:inline-flex;align-items:center;gap:${s * 0.22}px;font:600 ${s * 0.8}px/1 'Outfit';letter-spacing:-.03em;color:${c}"><span style="width:${s * 0.32}px;height:${s * 0.32}px;border-radius:50%;background:${C.indigo}"></span>fynly</span>`;
const base = `body{font-family:'Outfit',sans-serif;color:${C.ink}}.mono{font:500 11px 'JetBrains Mono';letter-spacing:.08em;text-transform:uppercase}
.st{font-size:12px;font-weight:600;padding:4px 9px;border-radius:99px}`;

const invoices = [
  ["Northwind Studio", "INV-0142", "₹48,000", "12 days late", "Overdue", "#FEE2E2", C.red],
  ["Bluefin Media", "INV-0139", "₹1,12,400", "5 days late", "Overdue", "#FEE2E2", C.red],
  ["Atlas Interiors", "INV-0136", "₹26,000", "Reminder 2 sent", "Due", "#FEF3C7", C.amber],
  ["Mango Labs", "INV-0131", "₹72,000", "Paid via UPI", "Paid", "#D1FAE5", C.green],
  ["Kite & Co.", "INV-0128", "₹38,500", "Due in 6 days", "Sent", C.lilac, C.indigo],
  ["Pixelpunk", "INV-0126", "₹64,000", "Paid via card", "Paid", "#D1FAE5", C.green],
];

const chart = (w, h) => {
  const pts = [20, 26, 24, 31, 35, 33, 41, 46, 44, 52, 58, 56];
  const f = [56, 61, 66, 71];
  const x = (i) => (i / 15) * w;
  const y = (v) => h - (v / 80) * h;
  const line = pts.map((v, i) => `${i ? "L" : "M"}${x(i)},${y(v)}`).join(" ");
  const fl = [56, ...f].map((v, i) => `${i ? "L" : "M"}${x(11 + i)},${y(v)}`).join(" ");
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><defs><linearGradient id="g" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="${C.indigo}" stop-opacity=".22"/><stop offset="1" stop-color="${C.indigo}" stop-opacity="0"/></linearGradient></defs>
${[0.25, 0.5, 0.75].map((r) => `<line x1="0" x2="${w}" y1="${h * r}" y2="${h * r}" stroke="${C.line}"/>`).join("")}
<path d="${line} L${x(11)},${h} L0,${h}Z" fill="url(#g)"/><path d="${line}" fill="none" stroke="${C.indigo}" stroke-width="3"/><path d="${fl}" fill="none" stroke="${C.indigo}" stroke-width="3" stroke-dasharray="7 7"/><circle cx="${x(11)}" cy="${y(56)}" r="6" fill="${C.indigo}" stroke="#fff" stroke-width="3"/></svg>`;
};

const dashboard = () =>
  doc({
    fonts,
    css: `${base}body{background:${C.bg};height:900px;display:grid;grid-template-columns:240px 1fr}
.side{background:#fff;border-right:1px solid ${C.line};padding:24px 16px}
.side .i{padding:10px 14px;border-radius:10px;font-size:15px;color:${C.mute};margin-top:3px;display:flex;justify-content:space-between}.side .i.on{background:${C.lilac};color:${C.indigo};font-weight:600}
main{padding:26px 30px}
.card{background:#fff;border:1px solid ${C.line};border-radius:18px;padding:18px 20px}
.k b{display:block;font-size:32px;font-weight:600;letter-spacing:-.02em;margin-top:6px}
.row{display:grid;grid-template-columns:1.6fr 1fr 1fr 1.2fr 90px;align-items:center;padding:12px 0;border-bottom:1px solid ${C.line};font-size:14.5px}`,
    body: `<div class="side">${logo(34)}<div style="margin-top:28px">${[["Overview", ""], ["Invoices", "6"], ["Clients", ""], ["Payments", ""], ["Forecast", ""], ["Expenses", ""], ["GST reports", ""], ["Settings", ""]].map(([t, n], i) => `<div class="i ${i === 0 ? "on" : ""}"><span>${t}</span>${n ? `<span class="st" style="background:#FEE2E2;color:${C.red}">2</span>` : ""}</div>`).join("")}</div>
<div style="position:absolute;bottom:24px;left:16px;width:208px;background:${C.deep};color:#fff;border-radius:16px;padding:16px"><div class="mono" style="color:#A5B4FC">✦ Fynly assistant</div><div style="font-size:14px;line-height:1.45;margin-top:8px">Northwind usually pays after a 2nd nudge. Send it now?</div><div style="display:flex;gap:6px;margin-top:12px"><span class="st" style="background:${C.indigo}">Send</span><span class="st" style="background:rgba(255,255,255,.12)">Later</span></div></div></div>
<main><div style="display:flex;justify-content:space-between;align-items:center"><div><div style="font-size:28px;font-weight:600;letter-spacing:-.02em">Good morning, Aisha</div><div style="color:${C.mute};margin-top:4px">₹2.4L expected this month · 2 invoices overdue</div></div><div style="display:flex;gap:10px"><span class="st" style="background:#fff;border:1px solid ${C.line};padding:10px 14px;font-size:14px">This quarter ▾</span><span class="st" style="background:${C.indigo};color:#fff;padding:10px 16px;font-size:14px">+ New invoice</span></div></div>
<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:20px">${[["Outstanding", "₹3,86,400", "2 overdue", C.red], ["Paid · 30 days", "₹5,12,900", "▲ 18% vs last month", C.green], ["Avg. days to paid", "11.2", "▼ 6.4 days since reminders", C.green], ["GST payable · Q3", "₹68,420", "Due 20 Jan", C.mute]].map(([l, v, s, c]) => `<div class="card k"><div class="mono" style="color:${C.mute}">${l}</div><b>${v}</b><div style="font-size:13px;color:${c};font-weight:600">${s}</div></div>`).join("")}</div>
<div style="display:grid;grid-template-columns:1.5fr 1fr;gap:14px;margin-top:14px">
<div class="card"><div style="display:flex;justify-content:space-between"><b style="font-size:17px">Cash-flow forecast</b><span class="mono" style="color:${C.mute}">Actual · next 90 days</span></div><div style="margin-top:16px">${chart(660, 230)}</div>
<div style="display:flex;gap:20px;font-size:13px;color:${C.mute};margin-top:10px"><span>— Received</span><span>- - Forecast from open invoices</span></div></div>
<div class="card"><b style="font-size:17px">Payments by method</b>${[["UPI", 62, C.indigo], ["Bank transfer", 24, "#818CF8"], ["Card", 11, "#C7D2FE"], ["Other", 3, C.line]].map(([l, v, c]) => `<div style="margin-top:16px"><div style="display:flex;justify-content:space-between;font-size:14px"><span>${l}</span><b>${v}%</b></div><div style="height:9px;border-radius:9px;background:${C.bg};margin-top:7px"><div style="width:${v}%;height:100%;border-radius:9px;background:${c}"></div></div></div>`).join("")}
<div style="margin-top:20px;background:${C.lilac};border-radius:12px;padding:12px 14px;font-size:13.5px;color:${C.deep}">UPI links get paid 3.1 days faster on average (illustrative)</div></div></div>
<div class="card" style="margin-top:14px;padding:8px 20px"><div class="row mono" style="color:${C.mute};font-size:11px"><span>Client</span><span>Invoice</span><span>Amount</span><span>Status</span><span></span></div>${invoices
      .slice(0, 4)
      .map(([c, id, a, n, s, bg, fg]) => `<div class="row"><b style="font-weight:600">${c}</b><span style="color:${C.mute}">${id}</span><b style="font-weight:600">${a}</b><span><span class="st" style="background:${bg};color:${fg}">${s}</span> <span style="color:${C.mute};font-size:13px">${n}</span></span><span style="color:${C.indigo};font-weight:600;text-align:right">${s === "Paid" ? "View" : "Remind"}</span></div>`)
      .join("")}</div></main>`,
  });

const site = (p) =>
  doc({
    fonts,
    css: `${base}
body{background:#fff}
.wrap{max-width:1280px;margin:0 auto;padding:0 48px}
nav{display:flex;justify-content:space-between;align-items:center;height:84px}
nav .l{display:flex;gap:32px;font-size:15.5px;color:${C.mute}}
.btn{display:inline-flex;align-items:center;gap:8px;height:52px;padding:0 24px;border-radius:14px;font-weight:600;font-size:15.5px}
.btn.p{background:${C.indigo};color:#fff}.btn.s{background:${C.lilac};color:${C.indigo}}
.hero{text-align:center;padding:60px 0 0;background:radial-gradient(60% 60% at 50% 0%,${C.lilac},#fff 70%)}
h1{font-size:84px;line-height:1;font-weight:600;letter-spacing:-.045em;max-width:900px;margin:22px auto 0}
h1 span{color:${C.indigo}}
.shot{margin:60px auto 0;width:1180px;border-radius:20px 20px 0 0;border:1px solid ${C.line};border-bottom:none;overflow:hidden;box-shadow:0 -10px 60px -20px rgba(79,70,229,.25);height:430px;background:${C.bg};position:relative}
section{padding:96px 0}
h2{font-size:52px;font-weight:600;letter-spacing:-.035em;line-height:1.05}
.f3{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:44px}
.f3 div{border:1px solid ${C.line};border-radius:22px;padding:28px}
.f3 .ic{width:46px;height:46px;border-radius:14px;background:${C.lilac};display:grid;place-items:center;font-size:20px;color:${C.indigo}}
.split{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}
.split img{width:100%;height:520px;object-fit:cover;border-radius:28px}
.pr{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:44px}.pr div{border:1px solid ${C.line};border-radius:22px;padding:30px}.pr .on{border:2px solid ${C.indigo};background:${C.lilac}}
.pr b{display:block;font-size:44px;font-weight:600;letter-spacing:-.03em;margin-top:12px}
@media(max-width:600px){
 .wrap{padding:0 18px} nav{height:64px} nav .l,.hide-m{display:none} .hero{padding-top:30px} h1{font-size:46px}
 .shot{width:auto;margin:36px 18px 0;height:260px} section{padding:56px 0} h2{font-size:36px}
 .f3,.split,.pr{grid-template-columns:1fr} .split img{height:320px}
}`,
    body: `<div class="hero"><div class="wrap"><nav>${logo(34)}<div class="l"><span>Product</span><span>Pricing</span><span>For agencies</span><span>GST guide</span></div><div style="display:flex;gap:10px"><span class="btn hide-m" style="height:44px">Log in</span><span class="btn p" style="height:44px">Start free</span></div></nav>
<span class="st" style="background:#fff;border:1px solid ${C.line};padding:8px 14px;font-size:13.5px;display:inline-block;margin-top:30px">✦ New: AI payment reminders that sound like you</span>
<h1>Get paid on time, <span>without the awkward follow-ups.</span></h1>
<p style="font-size:20px;line-height:1.55;color:${C.mute};max-width:620px;margin:22px auto 0">GST-ready invoices, UPI payment links and polite automatic reminders for freelancers and small agencies in India.</p>
<div style="display:flex;gap:12px;justify-content:center;margin-top:32px;flex-wrap:wrap"><span class="btn p">Start free, no card</span><span class="btn s">See a 2-min demo</span></div>
<div class="shot"><img src="DASH" style="width:100%"/></div></div></div>
<section><div class="wrap"><div class="mono" style="color:${C.indigo}">Why Fynly</div><h2 style="margin-top:12px">Everything between<br/>"work done" and "money in".</h2>
<div class="f3">${[["₹", "GST invoices in 60 seconds", "CGST, SGST or IGST worked out from the client's state. HSN/SAC codes remembered."], ["⇄", "UPI on every invoice", "A pay link and QR on each invoice. Clients pay from any UPI app, you see it instantly."], ["✦", "Reminders that work", "Friendly nudges before and after the due date, in your tone, on email and WhatsApp."]].map(([i, t, d]) => `<div><div class="ic">${i}</div><h3 style="font-size:21px;margin-top:18px;font-weight:600">${t}</h3><p style="color:${C.mute};margin-top:8px;line-height:1.6">${d}</p></div>`).join("")}</div></div></section>
<section style="padding-top:0"><div class="wrap split"><img src="${p.people}"/><div><div class="mono" style="color:${C.indigo}">Built for small teams</div><h2 style="margin-top:12px">Know next month's cash before it happens.</h2><p style="color:${C.mute};font-size:18px;line-height:1.65;margin-top:18px">The forecast reads every open invoice and each client's payment habits, so you can see a tight month coming weeks early.</p>
<div style="display:flex;gap:36px;margin-top:30px"><div><b style="font-size:34px;font-weight:600">2 min</b><div style="color:${C.mute}">to first invoice</div></div><div><b style="font-size:34px;font-weight:600">0%</b><div style="color:${C.mute}">fees on UPI</div></div></div></div></div></section>
<section style="padding-top:0"><div class="wrap"><div style="text-align:center"><div class="mono" style="color:${C.indigo}">Pricing</div><h2 style="margin-top:12px">Simple, in rupees.</h2></div>
<div class="pr"><div><span class="mono" style="color:${C.mute}">Solo</span><b>₹0</b><p style="color:${C.mute};margin-top:8px">5 invoices a month, UPI links</p></div><div class="on"><span class="mono" style="color:${C.indigo}">Pro</span><b>₹499<span style="font-size:18px;color:${C.mute}">/mo</span></b><p style="color:${C.mute};margin-top:8px">Unlimited invoices, reminders, forecast</p></div><div><span class="mono" style="color:${C.mute}">Agency</span><b>₹1,499<span style="font-size:18px;color:${C.mute}">/mo</span></b><p style="color:${C.mute};margin-top:8px">5 seats, approvals, multi-GSTIN</p></div></div></div></section>`,
  });

const appList = () =>
  doc({
    fonts,
    css: `${base}body{background:#fff;height:790px;padding:12px 20px;position:relative}
.ch{display:flex;gap:8px;margin-top:16px}.ch span{border-radius:99px;padding:8px 14px;font-size:14px;background:${C.bg}}.ch .on{background:${C.indigo};color:#fff}
.it{display:flex;justify-content:space-between;align-items:center;padding:15px 0;border-bottom:1px solid ${C.line}}
.fab{position:absolute;right:20px;bottom:110px;width:60px;height:60px;border-radius:20px;background:${C.indigo};color:#fff;display:grid;place-items:center;font-size:30px;box-shadow:0 14px 30px -10px rgba(79,70,229,.6)}
.tb{position:absolute;left:0;right:0;bottom:0;height:84px;border-top:1px solid ${C.line};display:flex;justify-content:space-around;padding-top:12px;font-size:11.5px;color:${C.mute}}`,
    body: `<div style="display:flex;justify-content:space-between;align-items:center">${logo(28)}<span style="width:34px;height:34px;border-radius:50%;background:${C.lilac};display:grid;place-items:center;font-weight:600;color:${C.indigo}">A</span></div>
<div style="font-size:32px;font-weight:600;letter-spacing:-.03em;margin-top:18px">Invoices</div>
<div style="background:${C.deep};color:#fff;border-radius:18px;padding:16px;margin-top:14px"><div class="mono" style="color:#A5B4FC">Outstanding</div><div style="font-size:30px;font-weight:600;margin-top:4px">₹3,86,400</div><div style="font-size:13px;opacity:.7;margin-top:2px">2 overdue · ₹1,60,400</div></div>
<div class="ch"><span>All</span><span class="on">Overdue</span><span>Due</span><span>Paid</span></div>
${invoices.slice(0, 5).map(([c, id, a, n, s, bg, fg]) => `<div class="it"><div><div style="font-weight:600;font-size:16px">${c}</div><div style="font-size:13px;color:${fg};margin-top:3px">${id} · ${n}</div></div><div style="text-align:right"><b style="font-weight:600">${a}</b><div><span class="st" style="background:${bg};color:${fg};font-size:11px">${s}</span></div></div></div>`).join("")}
<div class="fab">+</div><div class="tb">${["Home", "Invoices", "Clients", "Forecast"].map((t, i) => `<span style="${i === 1 ? `color:${C.indigo};font-weight:600` : ""}">● <br/>${t}</span>`).join("")}</div>`,
  });

const appInvoice = () =>
  doc({
    fonts,
    css: `${base}body{background:${C.bg};height:790px;padding:12px 18px;position:relative}
.c{background:#fff;border-radius:18px;padding:16px;margin-top:12px;border:1px solid ${C.line}}
.r{display:flex;justify-content:space-between;font-size:14.5px;padding:6px 0}`,
    body: `<div style="display:flex;justify-content:space-between;align-items:center"><span style="font-size:22px">←</span><b>INV-0142</b><span>⋯</span></div>
<div class="c"><div style="display:flex;justify-content:space-between"><div><div style="font-size:13px;color:${C.mute}">Billed to</div><div style="font-weight:600;font-size:18px">Northwind Studio</div><div style="font-size:12.5px;color:${C.mute}">GSTIN 29ABCDE1234F1Z5</div></div><span class="st" style="background:#FEE2E2;color:${C.red};align-self:flex-start">Overdue</span></div>
<div style="font-size:36px;font-weight:600;letter-spacing:-.03em;margin-top:14px">₹48,000</div><div style="font-size:13px;color:${C.mute}">Due 1 Nov · 12 days late</div></div>
<div class="c"><div class="r"><span>Brand refresh · phase 2</span><span>₹40,678</span></div><div class="r" style="color:${C.mute}"><span>CGST 9%</span><span>₹3,661</span></div><div class="r" style="color:${C.mute}"><span>SGST 9%</span><span>₹3,661</span></div><div class="r" style="border-top:1px solid ${C.line};margin-top:6px;padding-top:10px;font-weight:600"><span>Total</span><span>₹48,000</span></div></div>
<div class="c" style="background:${C.deep};color:#fff;border:none"><div class="mono" style="color:#A5B4FC">✦ Suggested reminder</div><div style="font-size:14.5px;line-height:1.5;margin-top:8px">"Hi Rhea, hope the launch went well! Just a nudge on INV-0142 for ₹48,000. Here's the UPI link to settle it in a tap."</div>
<div style="display:flex;gap:8px;margin-top:12px"><span class="st" style="background:#25D366;color:#fff;padding:8px 12px">WhatsApp</span><span class="st" style="background:rgba(255,255,255,.12);padding:8px 12px">Email</span><span class="st" style="background:rgba(255,255,255,.12);padding:8px 12px">Edit</span></div></div>
<div class="c"><div style="font-size:13px;color:${C.mute}">History</div>${[["Viewed by client", "28 Oct"], ["Reminder 1 sent", "2 Nov"], ["Viewed again", "6 Nov"]].map(([a, b]) => `<div class="r"><span>● ${a}</span><span style="color:${C.mute}">${b}</span></div>`).join("")}</div>`,
  });

const pay = () =>
  doc({
    fonts,
    css: `${base}body{background:#fff;height:790px;padding:22px;text-align:center}
.qr{width:220px;height:220px;margin:22px auto 0;display:grid;grid-template-columns:repeat(21,1fr);padding:12px;border:1px solid ${C.line};border-radius:18px}
.qr i{display:block;aspect-ratio:1}
.app{display:flex;align-items:center;justify-content:space-between;border:1px solid ${C.line};border-radius:14px;padding:14px 16px;margin-top:10px;font-weight:600;text-align:left}`,
    body: `${logo(26)}<div style="font-size:14px;color:${C.mute};margin-top:20px">Pay Aisha Khan Design</div><div style="font-size:42px;font-weight:600;letter-spacing:-.03em;margin-top:4px">₹48,000</div><div style="font-size:13.5px;color:${C.mute}">INV-0142 · Northwind Studio</div>
<div class="qr">${Array.from({ length: 441 }, (_, i) => {
      const x = i % 21;
      const y = Math.floor(i / 21);
      const finder = (a, b) => x >= a && x < a + 7 && y >= b && y < b + 7 && (x === a || x === a + 6 || y === b || y === b + 6 || (x > a + 1 && x < a + 5 && y > b + 1 && y < b + 5));
      const on = finder(0, 0) || finder(14, 0) || finder(0, 14) || (!(x < 8 && y < 8) && !(x > 12 && y < 8) && !(x < 8 && y > 12) && (x * 7 + y * 13 + x * y) % 3 === 0);
      return `<i style="background:${on ? C.ink : "transparent"}"></i>`;
    }).join("")}</div>
<div style="font-size:13px;color:${C.mute};margin-top:12px">Scan with any UPI app, or open one below</div>
${["Google Pay", "PhonePe", "Paytm", "BHIM / other UPI"].map((a) => `<div class="app"><span>${a}</span><span style="color:${C.indigo}">→</span></div>`).join("")}
<div style="font-size:12px;color:${C.mute};margin-top:16px">🔒 Paid straight to the freelancer's bank account</div>`,
  });

export default async function fynly() {
  const p = await photos({
    people: ["1600880292203-757bb62b4baf", 1400],
    desk: ["1486312338219-ce68d2c6f44d", 2000],
    pay: ["1556742049-0cfed4f6a45d", 1400],
  });
  return {
    screens: [
      { name: "dashboard", html: dashboard(), width: 1440, height: 900 },
      { name: "list", html: appList(), width: 390, height: 790 },
      { name: "invoice", html: appInvoice(), width: 390, height: 790 },
      { name: "pay", html: pay(), width: 390, height: 790 },
    ],
    // The marketing site embeds the dashboard screenshot, so it renders after the dashboard.
    after: async (shots) => [
      { name: "desktop", html: site(p).replace("DASH", shots.dashboard), width: 1440, height: 900, fullPage: true },
      { name: "mobile", html: site(p).replace("DASH", shots.dashboard), width: 390, height: 790, fullPage: true },
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
            body: `${backdrop(`radial-gradient(100% 90% at 80% 10%,#A5B4FC,#6366F1 40%,${C.deep})`, "rgba(238,240,255,.35)")}
${win({ src: s.dashboard, left: 100, top: 150, w: 1500, h: 937, url: "app.fynly.co/overview" })}
${phone({ src: s.list, left: 1480, top: 290, w: 400 })}`,
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
            body: `${backdrop(`linear-gradient(160deg,#EEF0FF,#C7D2FE)`)}
${win({ src: s.desktop, y: 0, left: 160, top: 110, w: 1680, h: 1140, url: "fynly.co" })}`,
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
            body: `${backdrop(`linear-gradient(150deg,#312E81,${C.deep})`, "rgba(99,102,241,.45)")}
${phone({ src: s.list, left: 300, top: 150, w: 430 })}
${phone({ src: s.invoice, left: 785, top: 90, w: 430, statusBg: C.bg })}
${phone({ src: s.pay, left: 1270, top: 150, w: 430 })}`,
          }),
      },
      {
        file: "invoice.jpg",
        w: 2000,
        h: 1250,
        html: () =>
          stage({
            w: 2000,
            h: 1250,
            fonts,
            css: base,
            body: `${backdrop(`linear-gradient(160deg,#E8EAF6,#C5CAE9)`)}
<div class="abs" style="left:260px;top:90px;width:820px;height:1100px;background:#fff;border-radius:8px;box-shadow:0 50px 100px -40px rgba(30,27,75,.45);padding:70px;transform:rotate(-2deg)">
<div style="display:flex;justify-content:space-between"><div><div style="font-size:28px;font-weight:600">Aisha Khan Design</div><div style="color:${C.mute};font-size:15px;margin-top:6px;line-height:1.6">Studio 4, Linking Road, Mumbai 400050<br/>GSTIN 27AAKPK1234L1Z9</div></div><div style="text-align:right"><div class="mono" style="color:${C.indigo}">Tax invoice</div><div style="font-size:30px;font-weight:600;margin-top:6px">INV-0142</div><div style="color:${C.mute};font-size:15px;margin-top:4px">Issued 2 Oct 2026 · Due 1 Nov</div></div></div>
<div style="margin-top:50px;padding:24px;background:${C.bg};border-radius:12px;display:flex;justify-content:space-between"><div><div class="mono" style="color:${C.mute}">Billed to</div><div style="font-size:19px;font-weight:600;margin-top:6px">Northwind Studio LLP</div><div style="color:${C.mute};font-size:14.5px;margin-top:4px">GSTIN 29ABCDE1234F1Z5 · Karnataka</div></div><div style="text-align:right"><div class="mono" style="color:${C.mute}">Place of supply</div><div style="font-size:19px;font-weight:600;margin-top:6px">Maharashtra (27)</div></div></div>
<table style="width:100%;border-collapse:collapse;margin-top:40px;font-size:16px"><tr class="mono" style="color:${C.mute}"><td style="padding:12px 0;border-bottom:2px solid ${C.ink}">Description</td><td style="border-bottom:2px solid ${C.ink}">SAC</td><td style="text-align:right;border-bottom:2px solid ${C.ink}">Amount</td></tr>
${[["Brand refresh · phase 2 (logo, type, colour)", "998391", "₹28,000"], ["Social templates · 24 assets", "998391", "₹9,678"], ["Revisions · 2 rounds", "998391", "₹3,000"]].map(([d, s, a]) => `<tr><td style="padding:16px 0;border-bottom:1px solid ${C.line}">${d}</td><td style="border-bottom:1px solid ${C.line};color:${C.mute}">${s}</td><td style="text-align:right;border-bottom:1px solid ${C.line}">${a}</td></tr>`).join("")}</table>
<div style="display:flex;justify-content:space-between;margin-top:30px"><div style="width:180px;height:180px;border:1px solid ${C.line};border-radius:12px;display:grid;place-items:center;color:${C.mute};font-size:13px;text-align:center">UPI QR<br/>scan to pay</div>
<div style="width:340px;font-size:16px;line-height:2.1"><div style="display:flex;justify-content:space-between"><span>Subtotal</span><span>₹40,678</span></div><div style="display:flex;justify-content:space-between;color:${C.mute}"><span>IGST 18%</span><span>₹7,322</span></div><div style="display:flex;justify-content:space-between;font-size:24px;font-weight:600;border-top:2px solid ${C.ink};margin-top:8px;padding-top:8px"><span>Total</span><span>₹48,000</span></div></div></div>
<div style="position:absolute;left:70px;bottom:60px;color:${C.mute};font-size:13.5px">Made with ${logo(18, C.mute)}</div></div>
<div class="abs" style="left:1180px;top:300px;width:560px;background:#fff;border-radius:24px;padding:30px;box-shadow:0 40px 80px -30px rgba(30,27,75,.45)">
<div class="mono" style="color:${C.indigo}">Smart tax</div><div style="font-size:26px;font-weight:600;margin-top:8px;letter-spacing:-.02em">Interstate supply detected</div><div style="color:${C.mute};font-size:16px;line-height:1.55;margin-top:8px">Client is in Karnataka, you're in Maharashtra, so Fynly applied 18% IGST instead of CGST + SGST.</div>
<div style="display:flex;gap:8px;margin-top:18px"><span class="st" style="background:${C.lilac};color:${C.indigo};font-size:14px;padding:8px 12px">IGST 18%</span><span class="st" style="background:${C.bg};color:${C.mute};font-size:14px;padding:8px 12px">SAC 998391 remembered</span></div></div>
<div class="abs" style="left:1180px;top:640px;width:560px;background:${C.deep};color:#fff;border-radius:24px;padding:30px;box-shadow:0 40px 80px -30px rgba(30,27,75,.55)">
<div style="display:flex;gap:16px;align-items:center"><span style="width:52px;height:52px;border-radius:16px;background:${C.green};display:grid;place-items:center;font-size:24px">✓</span><div><div style="font-size:22px;font-weight:600">₹48,000 received</div><div style="opacity:.7;font-size:15px;margin-top:2px">Northwind Studio paid INV-0142 via UPI · 2 min ago</div></div></div>
<div style="display:flex;justify-content:space-between;margin-top:22px;padding-top:18px;border-top:1px solid rgba(255,255,255,.12);font-size:15px;opacity:.85"><span>Reminders sent</span><span>2, both auto</span></div>
<div style="display:flex;justify-content:space-between;margin-top:10px;font-size:15px;opacity:.85"><span>Marked paid in books</span><span>Automatically</span></div></div>`,
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
            body: `<img src="${p.pay}" class="abs" style="inset:0;width:100%;height:100%;object-fit:cover"/><div class="abs" style="inset:0;background:rgba(30,27,75,.35)"></div>
${phone({ src: s.pay, left: 285, top: 220, w: 430 })}`,
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
            body: `${backdrop(C.indigo, "rgba(255,255,255,.25)")}${phone({ src: s.invoice, left: 285, top: 220, w: 430, statusBg: C.bg })}`,
          }),
      },
    ],
  };
}
