import { isAdmin } from "@/lib/server/admin-auth";
import { listLeads } from "@/lib/server/admin-leads";

const cols = [
  "created_at", "name", "email", "phone", "company", "website", "source", "tool", "services", "budget", "timeline",
  "message", "status", "notes", "utm_source", "utm_medium", "utm_campaign", "referrer", "landing_page", "consent",
] as const;

const cell = (v: unknown) => {
  let s = Array.isArray(v) ? v.join("; ") : v == null ? "" : String(v);
  if (/^[=+\-@]/.test(s)) s = "'" + s; // prevent spreadsheet formula injection
  return `"${s.replace(/"/g, '""')}"`;
};

export async function GET(req: Request) {
  if (!(await isAdmin())) return new Response("Unauthorized", { status: 401 });
  const u = new URL(req.url);
  const leads = await listLeads({
    status: u.searchParams.get("status") ?? undefined,
    source: u.searchParams.get("source") ?? undefined,
    q: u.searchParams.get("q") ?? undefined,
  }, 5000);
  const csv = [cols.join(","), ...leads.map((l) => cols.map((c) => cell(l[c])).join(","))].join("\n");
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="zaiphr-leads-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
