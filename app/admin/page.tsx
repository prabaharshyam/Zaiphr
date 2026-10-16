import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/server/admin-auth";
import { hasDb, hasEmail } from "@/lib/server/env";
import { leadCounts, listLeads, SOURCES, STATUSES } from "@/lib/server/admin-leads";
import { LeadsTable } from "@/components/admin/LeadsTable";
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

  if (!hasDb()) {
    return (
      <div className="container-x">
        <h1 className="font-display-wide text-5xl">Leads</h1>
        <p className="mt-6 max-w-xl text-muted">
          Supabase isn&apos;t configured yet. Add <code className="text-text">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
          <code className="text-text">SUPABASE_SERVICE_ROLE_KEY</code>, then run <code className="text-text">supabase/migrations/0001_init.sql</code>.
        </p>
      </div>
    );
  }

  const [leads, counts] = await Promise.all([listLeads(filters), leadCounts()]);
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
          <a href={`/admin/export${qs({})}`} className="rounded-full border border-line-strong px-4 py-2 text-sm hover:border-signature">
            Export CSV
          </a>
          <form action={logout}>
            <button className="rounded-full border border-line-strong px-4 py-2 text-sm text-muted hover:text-text">Sign out</button>
          </form>
        </div>
      </div>

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
