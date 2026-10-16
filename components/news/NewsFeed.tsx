"use client";

import { useMemo, useState } from "react";
import { NEWS_CATEGORIES, type NewsCategory, type NewsItem } from "@/lib/news/types";
import { cn } from "@/lib/utils";
import { NewsCard } from "./NewsCard";
import { SignInDialog } from "./SignInDialog";

/** Today's stories with category filters. Lead story spans full width. */
export function NewsFeed({ items }: { items: NewsItem[] }) {
  const [cat, setCat] = useState<NewsCategory | "all">("all");
  const present = useMemo(() => (Object.keys(NEWS_CATEGORIES) as NewsCategory[]).filter((c) => items.some((i) => i.category === c)), [items]);
  const shown = cat === "all" ? items : items.filter((i) => i.category === cat);
  const chip = (on: boolean) =>
    cn("rounded-full border px-4 py-2 text-sm transition-colors", on ? "border-signature bg-signature text-signature-ink" : "border-line-strong hover:border-text");

  return (
    <>
      {present.length > 1 && (
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
          <button type="button" className={chip(cat === "all")} aria-pressed={cat === "all"} onClick={() => setCat("all")}>
            All · {items.length}
          </button>
          {present.map((c) => (
            <button key={c} type="button" className={chip(cat === c)} aria-pressed={cat === c} onClick={() => setCat(c)}>
              {NEWS_CATEGORIES[c]}
            </button>
          ))}
        </div>
      )}
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {shown.map((item) => {
          const index = items.indexOf(item);
          const lead = cat === "all" && index === 0;
          return (
            <div key={item.id} className={cn("flex", lead && "md:col-span-2")}>
              <NewsCard item={item} index={index} lead={lead} />
            </div>
          );
        })}
      </div>
      <SignInDialog />
    </>
  );
}
