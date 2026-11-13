/** Zohraé: live luxury lamp and décor e-commerce site. Imagery is real screenshots of zohrae.in. */
import { stage, win, phone, backdrop } from "../kit.mjs";

const URL = "https://www.zohrae.in";
const enter = ["text=Enter in silence", "text=ENTER IN SILENCE"];
const at = (name, path, scroll = 0, mobile = false) => ({ name, url: URL + path, scroll, click: enter, width: mobile ? 390 : 1440, height: mobile ? 790 : 900, settle: 3500 });
const G = { night: "#120D0A", gold: "#C9963B", cream: "#F3EEE4" };

export default async function zohrae() {
  return {
    screens: [
      at("home", "/"),
      at("nuvola", "/", 900),
      at("ballerina", "/", 1800),
      at("collection", "/", 4500),
      at("atelier", "/", 10000),
      at("gift", "/", 13000),
      at("lumiere", "/collections/lumiere", 700),
      at("m-home", "/", 0, true),
      at("m-nuvola", "/", 900, true),
      at("m-ballerina", "/", 1800, true),
      at("m-grid", "/", 4500, true),
      at("m-lumiere", "/collections/lumiere", 0, true),
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
            body: `${backdrop(`radial-gradient(90% 80% at 30% 30%,#3A2716,${G.night} 70%)`, "rgba(201,150,59,.25)")}
${win({ src: s.home, left: 400, top: 150, w: 1500, h: 937, url: "zohrae.in", dark: true })}
${phone({ src: s["m-home"], left: 110, top: 290, w: 400, statusBg: "#1a1410", statusColor: "#fff", z: 3 })}`,
          }),
      },
      {
        file: "ballerina.jpg",
        w: 2000,
        h: 1250,
        html: (s) =>
          stage({
            w: 2000,
            h: 1250,
            body: `${backdrop(`linear-gradient(160deg,#2B1F27,#120C10)`, "rgba(220,170,190,.18)")}
${win({ src: s.ballerina, left: 160, top: 130, w: 1680, h: 1050, url: "zohrae.in", dark: true })}`,
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
            body: `${backdrop(`linear-gradient(150deg,#D9AE62,${G.gold} 45%,#8F6420)`, "rgba(255,240,210,.4)")}
${phone({ src: s["m-nuvola"], left: 300, top: 150, w: 430, statusBg: "#141010", statusColor: "#fff" })}
${phone({ src: s["m-ballerina"], left: 785, top: 90, w: 430, statusBg: "#141010", statusColor: "#fff" })}
${phone({ src: s["m-grid"], left: 1270, top: 150, w: 430, statusBg: "#141010", statusColor: "#fff" })}`,
          }),
      },
      {
        file: "collection.jpg",
        w: 2000,
        h: 1250,
        html: (s) =>
          stage({
            w: 2000,
            h: 1250,
            body: `${backdrop(`linear-gradient(160deg,#EFE7D8,#CDBB98)`)}
${win({ src: s.lumiere, left: 160, top: 130, w: 1680, h: 1050, url: "zohrae.in/collections/lumiere" })}`,
          }),
      },
      {
        file: "atelier.jpg",
        w: 2000,
        h: 1250,
        html: (s) =>
          stage({
            w: 2000,
            h: 1250,
            body: `${backdrop(`linear-gradient(160deg,#F5F0E6,#DCCDB2)`)}
${win({ src: s.atelier, left: 100, top: 110, w: 1200, h: 750, url: "zohrae.in/atelier", extra: "z-index:1" })}
${win({ src: s.gift, left: 700, top: 420, w: 1200, h: 750, url: "zohrae.in", dark: true, extra: "z-index:2" })}`,
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
            body: `${backdrop(`radial-gradient(80% 60% at 50% 40%,#5A3A17,${G.night})`, "rgba(255,190,90,.2)")}${phone({ src: s["m-home"], left: 285, top: 220, w: 430, statusBg: "#1a1410", statusColor: "#fff" })}`,
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
            body: `${backdrop(G.cream, "rgba(255,255,255,.6)")}${phone({ src: s["m-lumiere"], left: 285, top: 220, w: 430, statusBg: G.cream })}`,
          }),
      },
    ],
  };
}
