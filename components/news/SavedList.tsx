"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { browserDb, useAccount } from "@/lib/news/account";
import { toNewsItem, type NewsItem } from "@/lib/news/types";
import { AccountBar } from "./AccountBar";
import { NewsCard } from "./NewsCard";
import { SignInDialog } from "./SignInDialog";
import { SignInForm } from "./SignInForm";

export function SavedList() {
  const { ready, available, user, saved } = useAccount();
  const [items, setItems] = useState<NewsItem[] | null>(null);
  const userId = user?.id;

  useEffect(() => {
    if (!userId) return;
    let live = true;
    void browserDb()!
      .from("saved_items")
      .select("created_at, news_items(*)")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (!live) return;
        const rows = (data ?? []).map((r) => (r as { news_items: unknown }).news_items).filter(Boolean) as Record<string, unknown>[];
        setItems(rows.map(toNewsItem));
      });
    return () => {
      live = false;
    };
  }, [userId]);

  if (!available) return <p className="mt-8 text-lg text-muted">Saving stories isn&apos;t switched on yet.</p>;
  if (!ready) return <p className="label-mono mt-10 text-muted" role="status">Loading…</p>;
  if (!user)
    return (
      <div className="mt-10 max-w-md">
        <p className="text-lg text-muted">Sign in with your email to see the stories you&apos;ve saved, on any device.</p>
        <SignInForm className="mt-8" next="/news/saved" />
      </div>
    );

  // Unsaving from this page removes the card straight away.
  const shown = (items ?? []).filter((i) => saved.has(i.id));
  return (
    <div className="mt-8">
      <AccountBar />
      {items === null ? (
        <p className="label-mono mt-10 text-muted" role="status">Loading your stories…</p>
      ) : shown.length ? (
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          {shown.map((item, i) => (
            <div key={item.id} className="flex">
              <NewsCard item={item} index={i} />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-3xl border border-dashed border-line-strong p-8 md:p-12">
          <p className="font-display-tight text-3xl">Nothing saved yet.</p>
          <p className="mt-3 text-muted">Tap Save on any story in the daily brief and it&apos;ll live here.</p>
          <Link href="/news" className="label-mono mt-6 inline-block text-signature">
            Open today&apos;s brief →
          </Link>
        </div>
      )}
      <SignInDialog />
    </div>
  );
}
