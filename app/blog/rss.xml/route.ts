import { site } from "@/config/site";
import { getPosts } from "@/lib/blog";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/[<>&"']/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;" })[c]!);

export function GET() {
  const items = getPosts()
    .map(
      (p) => `<item><title>${esc(p.title)}</title><link>${site.url}/blog/${p.slug}</link><guid>${site.url}/blog/${p.slug}</guid><pubDate>${new Date(`${p.date}T06:00:00+05:30`).toUTCString()}</pubDate><category>${esc(p.category)}</category><description>${esc(p.description)}</description></item>`,
    )
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${esc(site.name)}: Field notes</title><link>${site.url}/blog</link><atom:link href="${site.url}/blog/rss.xml" rel="self" type="application/rss+xml"/><description>Practical playbooks on AI, automation and growth for founders and small businesses.</description><language>en-in</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
