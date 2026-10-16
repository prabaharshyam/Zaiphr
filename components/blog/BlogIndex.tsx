"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { PostCard, type PostCardData } from "./PostCard";

/** Category filter + post grid. */
export function BlogIndex({ posts, categories }: { posts: PostCardData[]; categories: string[] }) {
  const [cat, setCat] = useState<string>("all");
  const shown = cat === "all" ? posts : posts.filter((p) => p.category === cat);
  const chip = (on: boolean) =>
    cn("rounded-full border px-4 py-2 text-sm transition-colors", on ? "border-signature bg-signature text-signature-ink" : "border-line-strong hover:border-text");
  return (
    <>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
        <button type="button" className={chip(cat === "all")} aria-pressed={cat === "all"} onClick={() => setCat("all")}>
          All · {posts.length}
        </button>
        {categories.map((c) => (
          <button key={c} type="button" className={chip(cat === c)} aria-pressed={cat === c} onClick={() => setCat(c)}>
            {c}
          </button>
        ))}
      </div>
      <ul className="mt-12 grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <li key={p.slug}>
            <PostCard post={p} />
          </li>
        ))}
      </ul>
    </>
  );
}
