import { site } from "@/config/site";
import { services } from "@/config/services";
import { serviceDetails } from "@/config/service-details";
import { companyFaqs, fromPrice } from "@/config/faq";
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
- Started: 2026
- Email: ${site.email}
- Phone / WhatsApp: ${site.phone}
- Book a free 30-minute call: ${u("/contact")}
- Not affiliated with other companies that use the name "Zaiphr".

## Services

${services
  .map((s) => `- [${s.title}](${u(`/services/${s.slug}`)}): ${s.summary} From ${fromPrice(s.slug)}. ${serviceDetails[s.slug]?.intro ?? ""}`)
  .join("\n")}

## Questions and answers

${companyFaqs.map((f) => `### ${f.q}\n${f.a}`).join("\n\n")}

## Free tools

- [AI Stack Finder](${u("/tools/ai-stack-finder")}): describe a business problem and get a recommended set of AI tools, how they connect and what they cost.
- [AI tools directory](${u("/ai-tools")}): hand-picked AI tools for small businesses, by category and industry.
- [AI News](${u("/news")}): a daily brief of the AI stories that matter for founders.

## Work

${getProjects()
  .map((p) => `- [${p.client}](${u(`/work/${p.slug}`)})${p.live ? ` (live site: ${p.live})` : " (concept project, fictional brand)"}: ${p.summary}`)
  .join("\n")}

## Guides

${getPosts()
  .map((p) => `- [${p.title}](${u(`/blog/${p.slug}`)}): ${p.description}`)
  .join("\n")}

## Key pages

- [About](${u("/about")})
- [Services](${u("/services")})
- [Use cases by industry](${u("/use-cases")})
- [Contact](${u("/contact")})
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
