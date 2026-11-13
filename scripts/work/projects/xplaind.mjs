/** Xplaind: live AI-careers learning platform. Imagery is real screenshots of xplaind.in. */
import { stage, win, phone, backdrop } from "../kit.mjs";

const URL = "https://www.xplaind.in";
const V = { violet: "#6D28D9", deep: "#2E1065", lav: "#EDE7FF" };
const at = (name, path, scroll = 0, mobile = false) => ({ name, url: URL + path, scroll, width: mobile ? 390 : 1440, height: mobile ? 790 : 900, settle: 3000 });

export default async function xplaind() {
  return {
    screens: [
      at("home", "/"),
      at("roles", "/", 900),
      at("lesson", "/", 2700),
      at("inside", "/", 3600),
      at("paths", "/paths"),
      at("topics", "/topics"),
      at("interview", "/interview"),
      at("m-home", "/", 0, true),
      at("m-roles", "/", 1700, true),
      at("m-ready", "/", 4400, true),
      at("m-how", "/", 844, true),
      at("m-paths", "/paths", 0, true),
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
            body: `${backdrop(`radial-gradient(100% 90% at 80% 10%,#C4B5FD,#7C3AED 45%,${V.deep})`, "rgba(237,231,255,.3)")}
${win({ src: s.home, left: 100, top: 150, w: 1500, h: 937, url: "xplaind.in" })}
${phone({ src: s["m-home"], left: 1480, top: 290, w: 400 })}`,
          }),
      },
      {
        file: "roles.jpg",
        w: 2000,
        h: 1250,
        html: (s) =>
          stage({
            w: 2000,
            h: 1250,
            body: `${backdrop(`linear-gradient(160deg,#F3EFFF,#D6CBFA)`)}
${win({ src: s.paths, left: 160, top: 130, w: 1680, h: 1050, url: "xplaind.in/paths" })}`,
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
            body: `${backdrop(`linear-gradient(150deg,#4C1D95,${V.deep})`, "rgba(167,139,250,.45)")}
${phone({ src: s["m-home"], left: 300, top: 150, w: 430 })}
${phone({ src: s["m-roles"], left: 785, top: 90, w: 430 })}
${phone({ src: s["m-ready"], left: 1270, top: 150, w: 430 })}`,
          }),
      },
      {
        file: "lesson.jpg",
        w: 2000,
        h: 1250,
        html: (s) =>
          stage({
            w: 2000,
            h: 1250,
            body: `${backdrop(`linear-gradient(160deg,#EEF2FF,#C7D2FE)`)}
${win({ src: s.lesson, left: 160, top: 130, w: 1680, h: 1050, url: "xplaind.in" })}`,
          }),
      },
      {
        file: "topics.jpg",
        w: 2000,
        h: 1250,
        html: (s) =>
          stage({
            w: 2000,
            h: 1250,
            body: `${backdrop(`linear-gradient(160deg,#F5F3FF,#DDD6FE)`)}
${win({ src: s.topics, left: 100, top: 110, w: 1200, h: 750, url: "xplaind.in/topics", extra: "z-index:1" })}
${win({ src: s.interview, left: 700, top: 420, w: 1200, h: 750, url: "xplaind.in/interview", extra: "z-index:2" })}`,
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
            body: `${backdrop(`linear-gradient(170deg,#A78BFA,${V.violet})`, "rgba(255,255,255,.3)")}${phone({ src: s["m-paths"], left: 285, top: 220, w: 430 })}`,
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
            body: `${backdrop(V.lav, "rgba(255,255,255,.7)")}${phone({ src: s["m-how"], left: 285, top: 220, w: 430 })}`,
          }),
      },
    ],
  };
}
