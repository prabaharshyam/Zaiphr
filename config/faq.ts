/**
 * Plain-language answers about the company itself. Shown on the home page and the About page,
 * marked up as FAQPage, and used in llms.txt, so search engines and AI assistants can quote them.
 * Prices come from the service config so they never drift.
 */
import { site } from "./site";
import { services } from "./services";
import { serviceDetails } from "./service-details";

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/** Lowest one-off price for a service, or the lowest monthly price if it only has retainers. */
export function fromPrice(slug: string) {
  const pk = serviceDetails[slug]?.packages ?? [];
  const oneOff = pk.filter((p) => !p.per);
  const pool = oneOff.length ? oneOff : pk;
  const min = Math.min(...pool.map((p) => p.inr));
  return `${inr(min)}${oneOff.length ? "" : " a month"}`;
}

export const companyFaqs: { q: string; a: string }[] = [
  {
    q: "What is Zaiphr Labs?",
    a: `${site.name} (zaiphr.in) is an AI agency based in India, started in 2026. We help startups and small businesses use AI to save time and win customers: we build AI automations, AI voice agents and WhatsApp assistants, websites, mobile apps, branding and marketing.`,
  },
  {
    q: "What services does Zaiphr Labs offer?",
    a: `Seven services: ${services.map((s) => s.title).join(", ")}. Most clients start with one, and we connect them so your website, automations and marketing work together.`,
  },
  {
    q: "How much does Zaiphr Labs charge?",
    a: `Every project has a fixed price agreed up front. Starting prices: ${services.map((s) => `${s.title} from ${fromPrice(s.slug)}`).join("; ")}. The final quote depends on scope. Prices for international clients are also available in US dollars.`,
  },
  {
    q: "Who does Zaiphr Labs work with?",
    a: "Founders, startups and small to mid-sized businesses, especially clinics, real estate, D2C and e-commerce brands, education, SaaS and restaurants. We work with clients across India and worldwide, remotely.",
  },
  {
    q: "How long does a project take?",
    a: "Most projects run in fixed-scope sprints of 2 to 8 weeks, and you see working progress every week. A landing page or a first automation can be live in about 2 weeks; a full app MVP takes 6 to 8 weeks.",
  },
  {
    q: "Where is Zaiphr Labs based?",
    a: `${site.name} is based in India and works with clients in India and other countries. You can reach the team at ${site.email}, on WhatsApp at ${site.phone}, or by booking a free 30-minute call on zaiphr.in/contact.`,
  },
  {
    q: "Is Zaiphr Labs the same as other companies called Zaiphr?",
    a: `No. ${site.name} at zaiphr.in is an independent AI agency in India. It is not affiliated with other businesses that use a similar name.`,
  },
];
