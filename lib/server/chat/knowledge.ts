import "server-only";
import { site } from "@/config/site";
import { services } from "@/config/services";
import { serviceDetails } from "@/config/service-details";
import { about } from "@/config/about";
import { processSteps } from "@/config/process";
import { useCases } from "@/config/use-cases";
import { getPosts } from "@/lib/blog";
import { getProjects } from "@/lib/work";

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/**
 * Everything the assistant knows about Zaiphr Labs, rendered from the same config the site uses,
 * so prices and services never drift from the pages. Deterministic output → stable prompt cache.
 */
export function knowledgeBase() {
  const svc = services
    .map((s) => {
      const d = serviceDetails[s.slug];
      const pkgs = d.packages
        .map((p) => `  - ${p.name}: ${p.per ? `${inr(p.inr)}/${p.per}` : `from ${inr(p.inr)}`} ($${p.usd}${p.per ? `/${p.per}` : ""}) - ${p.description} Includes: ${p.features.join("; ")}`)
        .join("\n");
      return `### ${s.title} - /services/${s.slug}
${s.summary}
${d.intro}
What we deliver: ${d.deliverables.map((x) => `${x.title} (${x.text})`).join("; ")}
How it works: ${d.process.map((x, i) => `${i + 1}. ${x.title}: ${x.text}`).join(" ")}
Packages:
${pkgs}
FAQs:
${d.faqs.map((f) => `  - Q: ${f.q} A: ${f.a}`).join("\n")}`;
    })
    .join("\n\n");

  const work = getProjects()
    .map((p) => `- ${p.client} (${p.label}, ${p.industry}) - /work/${p.slug}: ${p.summary}`)
    .join("\n");
  const posts = getPosts()
    .map((p) => `- "${p.title}" - /blog/${p.slug}`)
    .join("\n");
  const cases = useCases.map((u) => `- ${u.title} (${u.industry})`).join("\n");

  return `## Company
${site.name} - ${site.tagline}. ${site.description}
Location: ${site.location}. Email: ${site.email}. Phone/WhatsApp: ${site.phone}. Book a free 30-minute call: ${site.calendlyUrl}
Mission: ${about.mission}
What makes us different (taste): ${about.taste.headline} ${about.taste.body.join(" ")} ${about.taste.closing}
Team: ${about.team.body}
Values: ${about.values.map((v) => `${v.title} - ${v.text}`).join(" ")}
How we work: ${about.principles.map(([t, d]) => `${t}: ${d}`).join(" ")}
Engagement process: ${processSteps.map((s) => `${s.title} (${s.duration}): ${s.summary}`).join(" ")}
Prices are in INR first; USD shown for international clients. Third-party usage (e.g. call minutes, ad spend, creator fees, software subscriptions) is billed at cost on top where noted.

## Services
${svc}

## Work (pieces labelled Concept Project or Showcase Build are for fictional brands - never present them as real clients or real results)
${work}

## Use-case library (/use-cases)
${cases}

## Free tools
- AI Stack Finder - /tools/ai-stack-finder: describe a business problem, get a recommended stack of AI tools, how they connect and what it costs.
- AI tools directory - /ai-tools: 115 hand-picked AI tools by category and industry (e.g. /ai-tools/for/clinics-healthcare).
- AI News - /news: daily brief of the AI stories that matter for founders; free email digest.

## Blog (/blog)
${posts}

## Other pages
/about, /contact (project brief form + calendar), /legal/privacy, /legal/terms`;
}
