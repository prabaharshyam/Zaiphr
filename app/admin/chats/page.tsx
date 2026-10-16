import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/server/admin-auth";
import { db } from "@/lib/server/db";
import { env, hasAi, hasDb } from "@/lib/server/env";

export const dynamic = "force-dynamic";

const ist = (iso: string) =>
  new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(iso));

interface Turn {
  role: "user" | "assistant";
  content: string;
  action?: { type: string; summary?: string };
}

export default async function AdminChatsPage() {
  if (!(await isAdmin())) redirect("/admin/login");
  const { data } = hasDb()
    ? await db().from("tool_runs").select("id, created_at, inputs").eq("tool", "chat").order("created_at", { ascending: false }).limit(60)
    : { data: [] };
  const chats = (data ?? []).map((r) => {
    const inputs = (r.inputs ?? {}) as { startPage?: string; messages?: Turn[] };
    return { id: r.id as string, at: r.created_at as string, startPage: inputs.startPage, messages: inputs.messages ?? [] };
  });

  return (
    <div className="container-x">
      <p className="label-mono text-muted">
        <Link href="/admin" className="hover:text-text">Admin</Link> · Chat assistant
      </p>
      <h1 className="font-display-wide mt-2 text-5xl">Chats</h1>
      <p className="mt-3 text-sm text-muted">
        {hasAi() ? `Assistant on · model ${env.chatModel}` : <span className="text-amber-300">Assistant offline — ANTHROPIC_API_KEY missing; visitors see contact options instead</span>} · last {chats.length} conversations.
        Leads from the chat appear on the Leads page with source &ldquo;chat&rdquo;.
      </p>

      <ul className="mt-10 space-y-3">
        {chats.length === 0 && <li className="rounded-2xl border border-line p-8 text-center text-muted">No conversations yet.</li>}
        {chats.map((c) => {
          const first = c.messages.find((m) => m.role === "user")?.content ?? "(empty)";
          const actions = c.messages.filter((m) => m.action).map((m) => m.action!.type);
          return (
            <li key={c.id}>
              <details className="group rounded-2xl border border-line bg-surface/40 open:border-line-strong">
                <summary className="flex cursor-pointer list-none flex-wrap items-center gap-x-4 gap-y-1 px-5 py-4">
                  <span className="label-mono w-32 text-[0.62rem] text-muted">{ist(c.at)}</span>
                  <span className="min-w-0 flex-1 truncate">{first}</span>
                  <span className="label-mono text-[0.6rem] text-muted">
                    {c.messages.filter((m) => m.role === "user").length} msgs{actions.length ? ` · ${[...new Set(actions)].join(", ")}` : ""}
                  </span>
                </summary>
                <div className="space-y-3 border-t border-line px-5 py-5 text-sm">
                  {c.startPage && <p className="label-mono text-[0.6rem] text-muted">Started on {c.startPage}</p>}
                  {c.messages.map((m, i) => (
                    <div key={i} className={m.role === "user" ? "text-text" : "text-muted"}>
                      <span className="label-mono mr-2 text-[0.6rem] text-signature">{m.role === "user" ? "Visitor" : "AI"}</span>
                      <span className="whitespace-pre-wrap">{m.content}</span>
                      {m.action && <span className="label-mono ml-2 text-[0.6rem] text-amber-300">[{m.action.type}{m.action.summary ? `: ${m.action.summary}` : ""}]</span>}
                    </div>
                  ))}
                </div>
              </details>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
