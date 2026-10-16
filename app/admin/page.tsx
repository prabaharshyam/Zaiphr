import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/server/admin-auth";
import { hasDb, hasEmail } from "@/lib/server/env";
import { leadCounts, listLeads, SOURCES, STATUSES } from "@/lib/server/admin-leads";
import { LeadsTable } from "@/components/admin/LeadsTable";
import { runDiagnostics, type Check } from "@/lib/server/diagnostics";
import { logout } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminPage({ searchParams }: PageProps<"/admin">) {
  if (!(await isAdmin())) redirect("/admin/login");
  const sp = await searchParams;
  const filters = {
    status: typeof sp.status === "string" ? sp.status : undefined,
    source: typeof sp.source === "string" ? sp.source : undefined,
    q: typeof sp.q === "string" ? sp.q : undefined,
  };
  const openId = typeof sp.lead === "string" ? sp.lead : undefined;

  const checks = await runDiagnostics();
  const healthy = checks.every((c) => c.ok);
  let leads: Awaited<ReturnType<typeof listLeads>> = [];
  let counts: Record<string, number> = {};
  if (hasDb()) {
    try {
      [leads, counts] = await Promise.all([listLeads(filters), leadCounts()]);
    } catch {
      /* surfaced in the status panel */
    }
  }
  const qs = (patch: Record<string, string | undefined>) => {
    const p = new URLSearchParams();
    Object.entries({ ...filters, ...patch }).forEach(([k, v]) => v && p.set(k, v));
    const s = p.toString();
    return s ? `?${s}` : "";
  };
  const chip = (on: boolean) =>
    `rounded-full border px-3 py-1.5 text-sm transition-colors ${on ? "border-signature bg-signature text-signature-ink" : "border-line-strong hover:border-text"}`;

  return (
    <div className="container-x">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="label-mono text-muted">Zaiphr Labs · Admin</p>
          <h1 className="font-display-wide mt-2 text-5xl">Leads</h1>
        </div>
        <div className="flex items-center gap-3">
          {!hasEmail() && <span className="label-mono text-amber-300">Email not configured</span>}
          {healthy && <span className="label-mono text-signature">● All systems OK</span>}
          <Link href="/admin/news" className="rounded-full border border-line-strong px-4 py-2 text-sm hover:border-signature">
            AI News
          </Link>
          <Link href="/admin/chats" className="rounded-full border border-line-strong px-4 py-2 text-sm hover:border-signature">
            Chats
          </Link>
          <a href={`/admin/export${qs({})}`} className="rounded-full border border-line-strong px-4 py-2 text-sm hover:border-signature">
            Export CSV
          </a>
          <form action={logout}>
            <button className="rounded-full border border-line-strong px-4 py-2 text-sm text-muted hover:text-text">Sign out</button>
          </form>
        </div>
      </div>

      {!healthy && <StatusPanel checks={checks} />}

      <div className="mt-10 flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="label-mono w-16 text-muted">Status</span>
          <Link href={`/admin${qs({ status: undefined })}`} className={chip(!filters.status)}>
            All · {counts.all ?? 0}
          </Link>
          {STATUSES.map((s) => (
            <Link key={s} href={`/admin${qs({ status: s })}`} className={chip(filters.status === s)}>
              {s} · {counts[s] ?? 0}
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="label-mono w-16 text-muted">Source</span>
          <Link href={`/admin${qs({ source: undefined })}`} className={chip(!filters.source)}>
            All
          </Link>
          {SOURCES.map((s) => (
            <Link key={s} href={`/admin${qs({ source: s })}`} className={chip(filters.source === s)}>
              {s.replace("_", " ")}
            </Link>
          ))}
        </div>
        <form className="flex max-w-md gap-2" action="/admin">
          {filters.status && <input type="hidden" name="status" value={filters.status} />}
          {filters.source && <input type="hidden" name="source" value={filters.source} />}
          <input
            name="q"
            defaultValue={filters.q}
            placeholder="Search name, email, company"
            aria-label="Search leads"
            className="flex-1 rounded-full border border-line-strong bg-surface px-4 py-2 text-sm outline-none focus:border-signature"
          />
          <button className="rounded-full bg-signature px-4 py-2 text-sm text-signature-ink">Search</button>
        </form>
      </div>

      <LeadsTable leads={leads} openId={openId} />
    </div>
  );
}

function StatusPanel({ checks }: { checks: Check[] }) {
  return (
    <section aria-label="System status" className="mt-8 rounded-2xl border border-amber-300/40 bg-amber-300/5 p-6">
      <p className="label-mono text-amber-300">System status — something needs attention</p>
      <ul className="mt-4 space-y-2 text-sm">
        {checks.map((c) => (
          <li key={c.label} className="flex flex-wrap gap-x-3">
            <span className={c.ok ? "text-signature" : "text-red-400"}>{c.ok ? "✓" : "✕"}</span>
            <span className="font-mono">{c.label}</span>
            <span className="text-muted">{c.detail}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-muted">Fix the red items in Vercel → Settings → Environment Variables, then redeploy.</p>
    </section>
  );
}
