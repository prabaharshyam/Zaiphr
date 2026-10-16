import { NEWS_CATEGORIES, type NewsItem } from "@/lib/news/types";
import { cn } from "@/lib/utils";
import { SaveButton } from "./SaveButton";

/** One story: category, headline, 60-word summary, founder takeaway, sources. */
export function NewsCard({ item, index, lead = false }: { item: NewsItem; index: number; lead?: boolean }) {
  const [primary, ...more] = item.sources;
  return (
    <article
      id={item.slug}
      className={cn(
        "group relative flex w-full scroll-mt-28 flex-col rounded-3xl border border-line bg-surface/60 p-6 transition-colors hover:border-line-strong md:p-8",
        lead && "bg-gradient-to-br from-signature/[0.07] via-surface/60 to-surface/60 md:p-10",
      )}
    >
      <div className="label-mono flex items-center gap-3 text-[0.62rem] text-muted">
        <span className="text-signature">{String(index + 1).padStart(2, "0")}</span>
        <span className="rounded-full border border-line-strong px-2.5 py-1">{NEWS_CATEGORIES[item.category]}</span>
        {lead && <span className="text-signature">Top story</span>}
      </div>

      <h3 className={cn("font-display-tight mt-5 leading-[1.08]", lead ? "text-[clamp(1.9rem,3.4vw,3rem)]" : "text-[1.6rem]")}>
        {primary ? (
          <a href={primary.url} target="_blank" rel="noopener noreferrer" className="decoration-signature decoration-2 underline-offset-4 hover:underline">
            {item.headline}
          </a>
        ) : (
          item.headline
        )}
      </h3>

      <p className={cn("mt-4 leading-relaxed text-text/80", lead ? "max-w-3xl text-lg" : "text-[0.98rem]")}>{item.summary}</p>

      {item.whyItMatters && (
        <div className="mt-5 rounded-2xl border-l-2 border-signature bg-signature/[0.06] px-4 py-3">
          <p className="label-mono text-[0.6rem] text-signature">Why it matters</p>
          <p className="mt-1.5 text-[0.95rem] leading-relaxed">{item.whyItMatters}</p>
        </div>
      )}

      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
        <p className="text-sm text-muted">
          {primary && (
            <a href={primary.url} target="_blank" rel="noopener noreferrer" className="hover:text-text">
              {primary.name} ↗
            </a>
          )}
          {more.map((s) => (
            <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="ml-3 hover:text-text">
              {s.name} ↗
            </a>
          ))}
        </p>
        <SaveButton id={item.id} headline={item.headline} />
      </div>
    </article>
  );
}
