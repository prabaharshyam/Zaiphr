import { NextResponse } from "next/server";
import { z } from "zod";
import Anthropic from "@anthropic-ai/sdk";
import { db } from "@/lib/server/db";
import { hasAi, hasDb } from "@/lib/server/env";
import { ipHash } from "@/lib/server/request";
import { chatStream, type ChatEvent, type ChatMessage } from "@/lib/server/chat/engine";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const TOOL = "chat";
const MAX_USER_TURNS = 20;
const CONVERSATIONS_PER_HOUR = 8;
const MESSAGES_PER_HOUR_NO_DB = 40;

const schema = z.object({
  conversationId: z.string().uuid(),
  startPage: z.string().max(200).optional(),
  messages: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().trim().min(1).max(2000) }))
    .min(1)
    .max(MAX_USER_TURNS * 2),
});

/** Whether the assistant is switched on (the widget falls back to contact options if not). */
export function GET() {
  return NextResponse.json({ enabled: hasAi() });
}

// Per-instance fallback limiter when there's no database.
const memory = new Map<string, number[]>();
function memoryLimited(ip: string) {
  const now = Date.now();
  const hits = (memory.get(ip) ?? []).filter((t) => now - t < 3600_000);
  hits.push(now);
  memory.set(ip, hits);
  return hits.length > MESSAGES_PER_HOUR_NO_DB;
}

/** Keeps roles alternating user/assistant and ending on the user. */
function normalise(messages: ChatMessage[]) {
  const out: ChatMessage[] = [];
  for (const m of messages) {
    if (out.length && out[out.length - 1].role === m.role) out[out.length - 1] = { ...m, content: `${out[out.length - 1].content}\n\n${m.content}` };
    else out.push(m);
  }
  while (out.length && out[0].role !== "user") out.shift();
  return out;
}

const line = (e: ChatEvent) => JSON.stringify(e) + "\n";

export async function POST(req: Request) {
  if (!hasAi()) return NextResponse.json({ error: "The assistant is offline." }, { status: 503 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid request" }, { status: 422 });
  const { conversationId, startPage } = parsed.data;
  const messages = normalise(parsed.data.messages);
  if (!messages.length || messages[messages.length - 1].role !== "user") return NextResponse.json({ error: "Invalid request" }, { status: 422 });
  if (messages.filter((m) => m.role === "user").length > MAX_USER_TURNS) {
    return NextResponse.json({ error: "This chat has reached its length limit — start a new chat, or contact the team directly." }, { status: 429 });
  }

  const ip = ipHash(req);
  let rowId: string | null = null;
  if (hasDb()) {
    const { data: existing } = await db().from("tool_runs").select("id").eq("tool", TOOL).eq("input_hash", conversationId).maybeSingle();
    if (existing) rowId = existing.id;
    else {
      const since = new Date(Date.now() - 3600_000).toISOString();
      const { count } = await db().from("tool_runs").select("id", { count: "exact", head: true }).eq("tool", TOOL).eq("ip_hash", ip).gte("created_at", since);
      if ((count ?? 0) >= CONVERSATIONS_PER_HOUR) return NextResponse.json({ error: "Lots of chats from your network — please try again later, or contact us directly." }, { status: 429 });
      const { data } = await db().from("tool_runs").insert({ tool: TOOL, input_hash: conversationId, ip_hash: ip, inputs: { startPage }, status: "ok" }).select("id").single();
      rowId = data?.id ?? null;
    }
  } else if (memoryLimited(ip)) {
    return NextResponse.json({ error: "Too many messages — please try again later, or contact us directly." }, { status: 429 });
  }

  // Page context goes on the first user turn only, so earlier turns stay byte-identical (cache-friendly).
  const withContext = messages.map((m, i) => (i === 0 && startPage ? { ...m, content: `(Visitor opened the chat on ${startPage})\n\n${m.content}` } : m));

  const encoder = new TextEncoder();
  const body = new ReadableStream({
    async start(controller) {
      let reply = "";
      let action: unknown = null;
      try {
        for await (const e of chatStream(withContext)) {
          if (e.type === "text") reply += e.text;
          if (e.type === "action") action = e.action;
          controller.enqueue(encoder.encode(line(e)));
        }
      } catch (err) {
        console.error("[chat] failed", err);
        const busy = err instanceof Anthropic.RateLimitError || (err instanceof Anthropic.APIError && (err.status ?? 0) >= 500);
        controller.enqueue(
          encoder.encode(line({ type: "error", message: busy ? "I'm a bit overloaded right now — please try again in a minute." : "Something went wrong on my side. Please try again, or contact the team directly." })),
        );
      } finally {
        controller.close();
        if (rowId) {
          const transcript = [...messages, { role: "assistant", content: reply.trim(), ...(action ? { action } : {}) }];
          await db().from("tool_runs").update({ inputs: { startPage, messages: transcript }, result: { turns: transcript.length } }).eq("id", rowId).then(() => {}, () => {});
        }
      }
    },
  });
  return new Response(body, { headers: { "Content-Type": "application/x-ndjson; charset=utf-8", "Cache-Control": "no-store", "X-Accel-Buffering": "no" } });
}
