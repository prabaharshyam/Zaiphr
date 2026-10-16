"use client";

import { useMemo, useState } from "react";
import { aiTools, toolCategories, type ToolCategory } from "@/config/ai-tools";
import { cn } from "@/lib/utils";
import { ToolTile } from "./ToolTile";

export function Directory() {
  const [cat, setCat] = useState<ToolCategory | "all">("all");
  const [q, setQ] = useState("");
  const [freeOnly, setFreeOnly] = useState(false);
  const [indiaOnly, setIndiaOnly] = useState(false);

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return aiTools.filter(
      (t) =>
        (cat === "all" || t.category === cat) &&
        (!freeOnly || ["free", "freemium", "open-source"].includes(t.pricing)) &&
        (!indiaOnly || !!t.india) &&
        (!term || `${t.name} ${t.tagline} ${t.tags.join(" ")}`.toLowerCase().includes(term)),
    );
  }, [cat, q, freeOnly, indiaOnly]);

  const chip = (on: boolean) =>
    cn("rounded-full border px-3.5 py-1.5 text-sm transition-colors", on ? "border-signature bg-signature text-signature-ink" : "border-line-strong hover:border-text");

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <label htmlFor="dir-q" className="sr-only">Search tools</label>
        <input
          id="dir-q"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search: WhatsApp, invoices, reels, CRM…"
          className="h-12 w-full rounded-full border border-line-strong bg-surface px-5 outline-none focus:border-signature md:max-w-md"
        />
        <div className="flex gap-2">
          <button aria-pressed={freeOnly} onClick={() => setFreeOnly((v) => !v)} className={chip(freeOnly)}>Free plan</button>
          <button aria-pressed={indiaOnly} onClick={() => setIndiaOnly((v) => !v)} className={chip(indiaOnly)}>India ready</button>
        </div>
      </div>
      <div role="group" aria-label="Categories" className="mt-5 flex flex-wrap gap-2">
        <button aria-pressed={cat === "all"} onClick={() => setCat("all")} className={chip(cat === "all")}>All</button>
        {(Object.keys(toolCategories) as ToolCategory[]).map((c) => (
          <button key={c} aria-pressed={cat === c} onClick={() => setCat(c)} className={chip(cat === c)}>
            {toolCategories[c]}
          </button>
        ))}
      </div>
      <p className="label-mono mt-8 text-muted" aria-live="polite">{list.length} tools</p>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((t) => (
          <li key={t.id}>
            <ToolTile tool={t} />
          </li>
        ))}
      </ul>
    </div>
  );
}
