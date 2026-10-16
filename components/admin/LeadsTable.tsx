"use client";

import { isValidElement, useState, useTransition, type ReactNode } from "react";
import { updateLead } from "@/app/admin/actions";
import type { LeadRow } from "@/lib/server/admin-leads";
import { cn } from "@/lib/utils";

const STATUSES = ["new", "contacted", "proposal", "won", "lost"] as const;
const tone: Record<string, string> = {
  new: "bg-signature text-signature-ink",
  contacted: "bg-sky-400/20 text-sky-200",
  proposal: "bg-violet-400/20 text-violet-200",
  won: "bg-emerald-400/20 text-emerald-200",
  lost: "bg-white/10 text-muted",
};

const fmt = (d: string) =>
  new Date(d).toLocaleString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" });

function Detail({ lead }: { lead: LeadRow }) {
  const [notes, setNotes] = useState(lead.notes ?? "");
  const [saving, start] = useTransition();
  const field = (k: string, v: ReactNode | string[]) =>
    v == null || v === "" || v === false || (Array.isArray(v) && !v.length) ? null : (
      <div key={k}>
        <dt className="label-mono text-[0.6rem] text-muted">{k}</dt>
        <dd className="mt-1 break-words whitespace-pre-wrap">
          {isValidElement(v) ? v : Array.isArray(v) ? v.join(", ") : String(v)}
        </dd>
      </div>
    );
  return (
    <div className="grid gap-8 border-t border-line bg-bg-2 p-6 lg:grid-cols-3">
      <dl className="space-y-4 text-sm">
        {field("Phone", lead.phone && <a className="text-signature" href={`https://wa.me/${lead.phone.replace(/\D/g, "")}`}>{lead.phone}</a>)}
        {field("Website", lead.website)}
        {field("Services", lead.services)}
        {field("Budget", lead.budget)}
        {field("Timeline", lead.timeline)}
        {field("Tool", lead.tool)}
        {field("UTM", [lead.utm_source, lead.utm_medium, lead.utm_campaign].filter(Boolean).join(" / "))}
        {field("Referrer", lead.referrer)}
        {field("Landing page", lead.landing_page)}
      </dl>
      <div className="space-y-4 text-sm">
        {field("Message", lead.message)}
        {lead.inputs && Object.keys(lead.inputs).length > 0 && (
          <div>
            <p className="label-mono text-[0.6rem] text-muted">Inputs</p>
            <pre className="mt-1 max-h-60 overflow-auto rounded-lg bg-bg p-3 text-xs">{JSON.stringify(lead.inputs, null, 2)}</pre>
          </div>
        )}
        {lead.report && (
          <div>
            <p className="label-mono text-[0.6rem] text-muted">Report</p>
            <pre className="mt-1 max-h-60 overflow-auto rounded-lg bg-bg p-3 text-xs">{JSON.stringify(lead.report, null, 2)}</pre>
          </div>
        )}
      </div>
      <div>
        <label htmlFor={`notes-${lead.id}`} className="label-mono text-[0.6rem] text-muted">
          Notes
        </label>
        <textarea
          id={`notes-${lead.id}`}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={6}
          className="mt-1 w-full resize-none rounded-lg border border-line-strong bg-bg p-3 text-sm outline-none focus:border-signature"
        />
        <div className="mt-2 flex items-center gap-3">
          <button
            onClick={() => start(() => updateLead({ id: lead.id, notes }))}
            className="rounded-full bg-signature px-4 py-1.5 text-sm text-signature-ink disabled:opacity-60"
            disabled={saving}
          >
            {saving ? "Saving…" : "Save notes"}
          </button>
          <a href={`mailto:${lead.email}`} className="text-sm text-muted underline">
            Email
          </a>
        </div>
      </div>
    </div>
  );
}

export function LeadsTable({ leads, openId }: { leads: LeadRow[]; openId?: string }) {
  const [open, setOpen] = useState<string | null>(openId ?? null);
  const [pending, start] = useTransition();

  if (!leads.length) return <p className="mt-16 text-muted">No leads match these filters yet.</p>;

  return (
    <div className={cn("mt-10 overflow-hidden rounded-2xl border border-line", pending && "opacity-70")}>
      <div className="label-mono hidden grid-cols-12 gap-4 border-b border-line bg-bg-2 px-5 py-3 text-[0.6rem] text-muted md:grid">
        <span className="col-span-2">Received</span>
        <span className="col-span-3">Name</span>
        <span className="col-span-3">Email</span>
        <span className="col-span-2">Source</span>
        <span className="col-span-2">Status</span>
      </div>
      <ul>
        {leads.map((l) => (
          <li key={l.id} className="border-b border-line last:border-0">
            <div className="grid grid-cols-2 items-center gap-2 px-5 py-4 text-sm md:grid-cols-12 md:gap-4">
              <span className="label-mono text-[0.65rem] text-muted md:col-span-2">{fmt(l.created_at)}</span>
              <button
                onClick={() => setOpen(open === l.id ? null : l.id)}
                aria-expanded={open === l.id}
                className="text-left font-medium hover:text-signature md:col-span-3"
              >
                {l.name}
                {l.company && <span className="block text-xs font-normal text-muted">{l.company}</span>}
              </button>
              <a href={`mailto:${l.email}`} className="truncate text-muted hover:text-text md:col-span-3">
                {l.email}
              </a>
              <span className="label-mono text-[0.65rem] text-muted md:col-span-2">
                {l.source.replace("_", " ")}
                {l.tool ? ` · ${l.tool}` : ""}
              </span>
              <select
                aria-label={`Status for ${l.name}`}
                value={l.status}
                onChange={(e) => start(() => updateLead({ id: l.id, status: e.target.value as LeadRow["status"] }))}
                className={cn("label-mono rounded-full px-3 py-1.5 text-[0.65rem] outline-none md:col-span-2", tone[l.status])}
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s} className="bg-bg-2 text-text">
                    {s}
                  </option>
                ))}
              </select>
            </div>
            {open === l.id && <Detail lead={l} />}
          </li>
        ))}
      </ul>
    </div>
  );
}
