import Link from "next/link";
import { formatBriefDate, istDate, type NewsItem } from "@/lib/news/types";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { RevealText } from "@/components/ui/RevealText";
import { NewsletterForm } from "@/components/layout/NewsletterForm";
import { AccountBar } from "./AccountBar";
import { NewsFeed } from "./NewsFeed";

/** Shared layout for today's brief and archive days. */
export function BriefView({ date, items, dates, archive = false }: { date: string | null; items: NewsItem[]; dates: string[]; archive?: boolean }) {
  const isToday = date === istDate();
  const title = archive || !isToday ? (date ? formatBriefDate(date) : "Today in AI.") : "Today in AI.";

  return (
    <>
      <section className="relative overflow-hidden pt-[calc(var(--nav-h)+10vh)] pb-12">
        <div className="bg-grid pointer-events-none absolute inset-x-0 top-0 h-[70vh] opacity-60" aria-hidden />
        <div aria-hidden className="pointer-events-none absolute top-10 -right-40 h-[36vw] w-[36vw] rounded-full bg-signature/10 blur-[140px]" />
        <div className="container-x relative">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Eyebrow>{archive ? "AI News · Archive" : "AI News · Daily brief"}</Eyebrow>
            <AccountBar />
          </div>
          <RevealText as="h1" trigger="ready" className="font-display-wide mt-8 max-w-[16ch] text-[clamp(3rem,8vw,7.5rem)] leading-[0.95]">
            {title}
          </RevealText>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {items.length ? (
              <>
                {date && !archive && isToday ? `${formatBriefDate(date)} · ` : ""}
                {items.length} stories that matter for founders, picked from {sourceCount(items)} sources and summarised with a
                founder&apos;s takeaway. New brief every morning at 6:00 IST.
              </>
            ) : (
              "The AI stories that matter for founders, picked every morning from the labs, the tech press and India's startup media, each in 60 words, with what it means for your business."
            )}
          </p>
        </div>
      </section>

      <section aria-label="Stories" className="pb-24">
        <div className="container-x">
          {items.length ? <NewsFeed items={items} /> : <EmptyState />}
        </div>
      </section>

      <section aria-labelledby="digest-heading" className="border-t border-line bg-bg-2 py-20">
        <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="label-mono text-signature">The AI Digest</p>
            <h2 id="digest-heading" className="font-display-tight mt-4 text-[clamp(2rem,3.6vw,3.2rem)] leading-tight">
              Get this brief in your inbox every morning.
            </h2>
            <p className="mt-4 max-w-md text-muted">Top 10 stories, about 3 minutes to read. No spam, one-click unsubscribe.</p>
            <NewsletterForm className="mt-8 max-w-md" />
          </div>
          {dates.length > 0 && (
            <nav aria-label="Earlier briefs" className="lg:col-span-5 lg:col-start-8">
              <p className="label-mono text-muted">Earlier briefs</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {dates.map((d) => (
                  <li key={d}>
                    <Link
                      href={d === istDate() ? "/news" : `/news/${d}`}
                      aria-current={d === date ? "page" : undefined}
                      className="inline-flex rounded-full border border-line-strong px-4 py-2 text-sm transition-colors hover:border-text aria-[current=page]:border-signature aria-[current=page]:text-signature"
                    >
                      {formatBriefDate(d, "short")}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </section>
    </>
  );
}

const sourceCount = (items: NewsItem[]) => new Set(items.flatMap((i) => i.sources.map((s) => s.name))).size;

function EmptyState() {
  return (
    <div className="rounded-3xl border border-dashed border-line-strong p-8 md:p-14">
      <p className="label-mono text-signature">First edition</p>
      <p className="font-display-tight mt-4 max-w-2xl text-[clamp(1.8rem,3.4vw,2.8rem)] leading-tight">
        The first brief lands tomorrow morning at 6:00 IST.
      </p>
      <p className="mt-4 max-w-xl text-muted">
        Subscribe below and it&apos;ll be in your inbox when it does. Every story links to its original source.
      </p>
    </div>
  );
}
