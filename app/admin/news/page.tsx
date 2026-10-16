import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/server/admin-auth";
import { env, hasAi, hasDb } from "@/lib/server/env";
import { recentRuns } from "@/lib/server/news/pipeline";
import { db } from "@/lib/server/db";
import { RunNewsButtons } from "@/components/admin/RunNewsButtons";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

const ist = (iso: string) =>
  new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(iso));

export default async function AdminNewsPage() {
  if (!(await isAdmin())) redirect("/admin/login");
  const runs = hasDb() ? await recentRuns(10).catch(() => []) : [];
  const subs = hasDb()
    ? ((await db().from("subscribers").select("id", { count: "exact", head: true }).is("unsubscribed_at", null)).count ?? 0)
    : 0;
  const lastWithSources = runs.find((r) => r.stats?.sources?.length);

  return (
    <div className="container-x">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="label-mono text-muted">
            <Link href="/admin" className="hover:text-text">Admin</Link> · AI News
          </p>
          <h1 className="font-display-wide mt-2 text-5xl">News pipeline</h1>
          <p className="mt-3 text-sm text-muted">
            Runs daily at ~6:00 IST · writer: {hasAi() ? env.newsModel : "no API key — keyword fallback"} · {subs} active digest subscribers ·{" "}
            {env.cronSecret ? "cron secret set" : <span className="text-red-400">CRON_SECRET missing — the daily run won&apos;t start</span>}
          </p>
        </div>
        <RunNewsButtons />
      </div>

      <section className="mt-10">
        <h2 className="label-mono text-muted">Recent runs</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-line">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="label-mono bg-surface text-[0.6rem] text-muted">
              <tr>
                {["Started (IST)", "Status", "Brief", "Engine", "Stories", "Sources OK", "Digest", "Note"].map((h) => (
                  <th key={h} className="px-4 py-3 font-normal">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {runs.length ? (
                runs.map((r) => {
                  const s = r.stats ?? { briefDate: "" };
                  const ok = s.sources?.filter((x) => x.ok).length;
                  return (
                    <tr key={r.id} className="border-t border-line align-top">
                      <td className="px-4 py-3 whitespace-nowrap">{ist(r.started_at)}</td>
                      <td className={`px-4 py-3 ${r.status === "ok" ? "text-signature" : r.status === "error" ? "text-red-400" : "text-amber-300"}`}>{r.status}</td>
                      <td className="px-4 py-3 whitespace-nowrap">{s.briefDate}</td>
                      <td className="px-4 py-3">{s.engine === "ai" ? "Claude" : s.engine === "match" ? "Fallback" : "—"}</td>
                      <td className="px-4 py-3">{s.stories ?? "—"}</td>
                      <td className="px-4 py-3">{s.sources ? `${ok}/${s.sources.length}` : "—"}</td>
                      <td className="px-4 py-3">{s.digest ? s.digest.skipped ?? `${s.digest.sent} sent${s.digest.failed ? `, ${s.digest.failed} failed` : ""}` : "—"}</td>
                      <td className="max-w-xs px-4 py-3 text-muted">{r.error ?? s.skipped ?? (s.aiError ? `AI failed: ${s.aiError}` : "")}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-muted">
                    No runs yet. Press Run now to build today&apos;s brief.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {lastWithSources?.stats?.sources && (
        <section className="mt-10">
          <h2 className="label-mono text-muted">Sources · last fetch {ist(lastWithSources.started_at)}</h2>
          <ul className="mt-4 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {lastWithSources.stats.sources.map((s) => (
              <li key={s.id} className="flex items-center justify-between gap-3 bg-bg px-4 py-3 text-sm">
                <span>
                  <span className={s.ok ? "text-signature" : "text-red-400"}>{s.ok ? "●" : "✕"}</span> {s.name}
                </span>
                <span className="text-muted">{s.ok ? `${s.count} item${s.count === 1 ? "" : "s"}` : s.error}</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-muted">Edit sources in config/news-sources.ts. A failing feed is skipped; the rest still run.</p>
        </section>
      )}
    </div>
  );
}
