import { site } from "@/config/site";
import { services } from "@/config/services";
import { serviceDetails } from "@/config/service-details";
import { companyFaqs } from "@/config/faq";
import { engagements } from "@/config/engagements";
import { getPosts } from "@/lib/blog";
import { getProjects } from "@/lib/work";

export const dynamic = "force-static";

/** llms.txt (llmstxt.org): a plain summary of the business for AI assistants and answer engines. */
export function GET() {
  const u = (path: string) => `${site.url}${path}`;
  const body = `# ${site.name}

> ${site.description}

${site.positioning}

- Website: ${site.url}
- Based in: India (working with clients in India and worldwide)
- Founded: 2026
- What we are: an AI consulting and engineering firm (AI Consulting & Labs)
- Email: ${site.email}
- Phone / WhatsApp: ${site.phone}
- Talk to an expert: ${u("/contact")}
- Not affiliated with other companies that use the name "Zaiphr".

## Practice areas

${services
  .map((s) => `- [${s.title}](${u(`/services/${s.slug}`)}): ${s.summary} ${serviceDetails[s.slug]?.intro ?? ""}`)
  .join("\n")}

## How we engage

We don't publish prices. Each engagement is scoped and priced after a discovery conversation.

${engagements.map((e) => `- ${e.name} (${e.duration}): ${e.summary}`).join("\n")}

## Questions and answers

${companyFaqs.map((f) => `### ${f.q}\n${f.a}`).join("\n\n")}

## Labs: our own products

- [AI Stack Finder](${u("/tools/ai-stack-finder")}): describe a business problem and get a recommended set of AI tools, how they connect and what they cost.
- [AI tools directory](${u("/ai-tools")}): hand-picked AI tools for business teams, by category and industry.
- [AI News](${u("/news")}): a daily brief of the AI stories that matter for business leaders.

## Work

${getProjects()
  .map((p) => `- [${p.client}](${u(`/work/${p.slug}`)})${p.live ? ` (live site: ${p.live})` : " (concept project, fictional brand)"}: ${p.summary}`)
  .join("\n")}

## Insights

${getPosts()
  .map((p) => `- [${p.title}](${u(`/blog/${p.slug}`)}): ${p.description}`)
  .join("\n")}

## Key pages

- [About](${u("/about")})
- [Services](${u("/services")})
- [Labs](${u("/labs")})
- [Industries and use cases](${u("/use-cases")})
- [Contact](${u("/contact")})
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
