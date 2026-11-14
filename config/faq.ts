/**
 * Plain-language answers about the company itself. Shown on the home page, marked up as
 * FAQPage, and used in llms.txt and the chat assistant, so search engines and AI assistants
 * can quote them.
 */
import { site } from "./site";
import { services } from "./services";
import { engagements } from "./engagements";

export const companyFaqs: { q: string; a: string }[] = [
  {
    q: "What is Zaiphr Labs?",
    a: `${site.name} (zaiphr.in) is an AI consulting and engineering firm based in India, founded in 2026. We help organisations find where AI creates real value, prove it quickly in our labs, and build production systems such as AI agents, automation, conversational AI, knowledge systems and AI-native products.`,
  },
  {
    q: "What does Zaiphr Labs do?",
    a: `We work across seven practice areas: ${services.map((s) => s.title).join(", ")}. Engagements usually combine strategy, engineering and enablement, so what we recommend is what gets built and adopted.`,
  },
  {
    q: "What is the 'Labs' in Zaiphr Labs?",
    a: "Our labs are where ideas are tested before they're scaled. We prototype on real data in weeks, measure results against agreed criteria and only then recommend a production build. The labs also build our own products, such as the AI Stack Finder and our daily AI news brief.",
  },
  {
    q: "How do engagements work, and how are they priced?",
    a: `We don't publish price lists. Every engagement is scoped to your objectives and priced after a discovery conversation. Typical models: ${engagements.map((e) => `${e.name} (${e.duration})`).join(", ")}.`,
  },
  {
    q: "Who does Zaiphr Labs work with?",
    a: "Organisations of every size, from growth-stage companies to established enterprises, across financial services, healthcare, retail and e-commerce, real estate, education, technology and hospitality. We work with clients in India and worldwide.",
  },
  {
    q: "How quickly can we see results?",
    a: "An Opportunity Sprint delivers a prioritised, costed AI roadmap in 2 to 3 weeks. A Labs Prototype proves a use case on your data in 4 to 6 weeks. Production builds typically take 8 to 16 weeks, with working releases along the way.",
  },
  {
    q: "How does Zaiphr Labs handle data security and responsible AI?",
    a: "We use model tiers that don't train on your data, minimise and mask personal data, deploy in your cloud where required, and put evaluation, human oversight and audit logs around every system. We design for India's Digital Personal Data Protection Act alongside your legal team.",
  },
  {
    q: "Where is Zaiphr Labs based?",
    a: `${site.name} is based in India and works with clients in India and other countries. Reach the team at ${site.email}, on ${site.phone}, or by booking a call at zaiphr.in/contact.`,
  },
  {
    q: "Is Zaiphr Labs the same as other companies called Zaiphr?",
    a: `No. ${site.name} at zaiphr.in is an independent AI consulting firm in India. It is not affiliated with other businesses that use a similar name.`,
  },
];
