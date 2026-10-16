"use client";

import { useState, useTransition } from "react";
import { runNews } from "@/app/admin/news/actions";

export function RunNewsButtons() {
  const [pending, start] = useTransition();
  const [msg, setMsg] = useState<{ ok: boolean; message: string } | null>(null);
  const go = (force: boolean) => {
    if (force && !confirm("Rebuild today's brief? Today's stories are replaced and readers lose today's saves. The digest is never sent twice.")) return;
    setMsg(null);
    start(async () => setMsg(await runNews(force)));
  };
  return (
    <div className="flex flex-col items-end gap-2">
      <div className="flex gap-2">
        <button type="button" disabled={pending} onClick={() => go(false)} className="rounded-full bg-signature px-4 py-2 text-sm text-signature-ink disabled:opacity-50">
          {pending ? "Running… (up to 2 min)" : "Run now"}
        </button>
        <button type="button" disabled={pending} onClick={() => go(true)} className="rounded-full border border-line-strong px-4 py-2 text-sm hover:border-text disabled:opacity-50">
          Rebuild today
        </button>
      </div>
      {msg && (
        <p role="status" className={`max-w-md text-right text-sm ${msg.ok ? "text-signature" : "text-red-400"}`}>
          {msg.message}
        </p>
      )}
    </div>
  );
}
