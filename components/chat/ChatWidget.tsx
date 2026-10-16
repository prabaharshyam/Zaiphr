"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LogoMark } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";
import { MiniMarkdown } from "./MiniMarkdown";
import { BookCard, ContactCard, HumanCard } from "./ActionCards";

type Action = { type: "contact"; summary: string } | { type: "book" } | { type: "whatsapp" } | { type: "human" };
interface Msg {
  id: string;
  role: "user" | "assistant";
  content: string;
  action?: Action;
  error?: boolean;
  local?: boolean; // shown in the UI but never sent to the model
}
interface Saved {
  conversationId: string;
  startPage: string;
  messages: Msg[];
}

const KEY = "zl-chat";
const MAX_LEN = 2000;
const SUGGESTIONS = [
  "What does a website cost?",
  "Can AI answer my clinic's calls?",
  "How long does an app MVP take?",
  "Which AI tools should I use?",
];
const uid = () => (typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`);
const fresh = (startPage: string): Saved => ({ conversationId: uid(), startPage, messages: [] });

export function ChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [chat, setChat] = useState<Saved>(() => fresh("/"));
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLTextAreaElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const hydrated = useRef(false);

  // Restore this tab's conversation (survives page navigation and reloads).
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(KEY);
      if (raw) setChat(JSON.parse(raw) as Saved);
    } catch {
      /* storage blocked */
    }
    hydrated.current = true;
  }, []);
  useEffect(() => {
    if (!hydrated.current) return;
    try {
      sessionStorage.setItem(KEY, JSON.stringify(chat));
    } catch {
      /* storage blocked */
    }
  }, [chat]);

  // Ask the server once whether the AI is on; if not, the panel offers direct contact options.
  useEffect(() => {
    if (!open || enabled !== null) return;
    fetch("/api/chat")
      .then((r) => r.json())
      .then((d: { enabled?: boolean }) => setEnabled(Boolean(d.enabled)))
      .catch(() => setEnabled(false));
  }, [open, enabled]);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [chat.messages, open]);

  useEffect(() => {
    if (open) setTimeout(() => field.current?.focus(), 60);
  }, [open]);

  const close = useCallback(() => {
    setOpen(false);
    setTimeout(() => launcher.current?.focus(), 0);
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: globalThis.KeyboardEvent) => e.key === "Escape" && close();
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open, close]);

  const patchLast = (fn: (m: Msg) => Msg) =>
    setChat((c) => ({ ...c, messages: c.messages.map((m, i) => (i === c.messages.length - 1 ? fn(m) : m)) }));

  const send = async (text: string) => {
    const content = text.trim().slice(0, MAX_LEN);
    if (!content || busy) return;
    setInput("");

    if (/^(talk to a human|human|speak to (someone|a person))\b/i.test(content) || enabled === false) {
      setChat((c) => ({
        ...c,
        messages: [
          ...c.messages,
          { id: uid(), role: "user", content, local: true },
          { id: uid(), role: "assistant", content: enabled ? "Sure — here's how to reach the team directly:" : "Here's how to reach the team directly:", action: { type: "human" }, local: true },
        ],
      }));
      return;
    }

    const startPage = chat.messages.length ? chat.startPage : pathname;
    const userMsg: Msg = { id: uid(), role: "user", content };
    const history = [...chat.messages.filter((m) => !m.local && !m.error), userMsg].map(({ role, content }) => ({ role, content }));
    setChat((c) => ({ ...c, startPage, messages: [...c.messages, userMsg, { id: uid(), role: "assistant", content: "" }] }));
    setBusy(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId: chat.conversationId, startPage, messages: history }),
      });
      if (!res.ok || !res.body) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? "I couldn't reach the assistant. Please try again.");
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.trim()) continue;
          const e = JSON.parse(line) as { type: string; text?: string; action?: Action; message?: string };
          if (e.type === "text" && e.text) patchLast((m) => ({ ...m, content: m.content + e.text }));
          if (e.type === "action" && e.action) patchLast((m) => ({ ...m, action: e.action }));
          if (e.type === "error") patchLast((m) => ({ ...m, content: e.message ?? "Something went wrong.", error: true }));
        }
      }
    } catch (err) {
      patchLast((m) => ({ ...m, content: err instanceof Error ? err.message : "Something went wrong.", error: true, action: { type: "human" } }));
    } finally {
      setBusy(false);
    }
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    void send(input);
  };
  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      void send(input);
    }
  };

  const transcript = () =>
    chat.messages
      .filter((m) => !m.local && !m.error && m.content)
      .map((m) => `${m.role === "user" ? "Visitor" : "Assistant"}: ${m.content}`)
      .join("\n")
      .slice(-4000);

  if (pathname.startsWith("/admin") || pathname.startsWith("/auth")) return null;

  return (
    <>
      <button
        ref={launcher}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="zl-chat"
        className={cn(
          "group fixed right-4 bottom-4 z-[80] flex h-14 items-center gap-2.5 rounded-full border border-signature/40 bg-bg-2/90 pr-5 pl-2 shadow-[0_20px_60px_-20px_rgba(200,255,46,0.45)] backdrop-blur-xl transition-[opacity,transform] duration-300 hover:border-signature md:right-6 md:bottom-6",
          open && "pointer-events-none translate-y-4 opacity-0",
        )}
      >
        <span className="relative grid h-10 w-10 place-items-center rounded-full bg-signature text-signature-ink">
          <LogoMark className="h-5 w-5" />
          <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-bg-2 bg-signature" aria-hidden />
        </span>
        <span className="text-sm font-medium">Ask Zaiphr AI</span>
      </button>

      <div
        id="zl-chat"
        role="dialog"
        aria-modal="false"
        aria-label="Zaiphr AI assistant"
        hidden={!open}
        className="fixed inset-0 z-[90] flex flex-col bg-bg-2 md:inset-auto md:right-6 md:bottom-6 md:h-[min(680px,calc(100svh-3rem))] md:w-[410px] md:overflow-hidden md:rounded-3xl md:border md:border-line-strong md:shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)]"
      >
        <header className="flex items-center gap-3 border-b border-line px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-signature text-signature-ink">
            <LogoMark className="h-4.5 w-4.5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium">Zaiphr AI</p>
            <p className="label-mono text-[0.58rem] text-muted">{enabled === false ? "Offline · the team is a message away" : "AI assistant · instant answers"}</p>
          </div>
          {chat.messages.length > 0 && (
            <button type="button" onClick={() => setChat(fresh(pathname))} disabled={busy} className="label-mono rounded-full px-2.5 py-1.5 text-[0.6rem] text-muted hover:text-text disabled:opacity-40">
              New chat
            </button>
          )}
          <button type="button" onClick={close} aria-label="Close chat" className="grid h-9 w-9 place-items-center rounded-full border border-line-strong text-muted hover:text-text">
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" stroke="currentColor" strokeWidth="1.6" aria-hidden>
              <path d="M3 3l10 10M13 3L3 13" />
            </svg>
          </button>
        </header>

        <div ref={scroller} data-lenis-prevent className="flex-1 overflow-y-auto overscroll-contain px-4 py-5" role="log" aria-live="polite" aria-relevant="additions">
          <div className="max-w-[92%] rounded-2xl rounded-tl-md bg-surface px-4 py-3 text-[0.95rem] leading-relaxed">
            {enabled === false ? (
              <>Our AI assistant is offline right now, but the team is easy to reach:</>
            ) : (
              <>
                Hi! I&apos;m Zaiphr&apos;s AI assistant. Ask me about our services, pricing and timelines — or describe a problem and I&apos;ll
                suggest an approach.
              </>
            )}
            {enabled === false && <HumanCard />}
          </div>

          {chat.messages.length === 0 && enabled !== false && (
            <div className="mt-4 flex flex-wrap gap-2" aria-label="Suggested questions">
              {[...SUGGESTIONS, "Talk to a human"].map((s) => (
                <button key={s} type="button" onClick={() => void send(s)} className="rounded-full border border-line-strong px-3 py-1.5 text-left text-[0.82rem] text-muted transition-colors hover:border-signature hover:text-text">
                  {s}
                </button>
              ))}
            </div>
          )}

          {chat.messages.map((m, i) => (
            <div key={m.id} className={cn("mt-4 flex", m.role === "user" ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[92%] rounded-2xl px-4 py-3 text-[0.95rem] leading-relaxed",
                  m.role === "user" ? "rounded-tr-md bg-signature text-signature-ink" : "rounded-tl-md bg-surface",
                  m.error && "border border-red-400/40",
                )}
              >
                {m.role === "user" ? (
                  <p className="whitespace-pre-wrap">{m.content}</p>
                ) : m.content ? (
                  <MiniMarkdown text={m.content} />
                ) : (
                  <span className="flex gap-1 py-1.5" aria-label="Assistant is typing">
                    {[0, 1, 2].map((d) => (
                      <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted" style={{ animationDelay: `${d * 120}ms` }} />
                    ))}
                  </span>
                )}
                {m.action?.type === "contact" && !(busy && i === chat.messages.length - 1) && (
                  <ContactCard summary={m.action.summary} transcript={transcript()} conversationId={chat.conversationId} />
                )}
                {m.action?.type === "book" && <BookCard />}
                {(m.action?.type === "whatsapp" || m.action?.type === "human") && <HumanCard />}
              </div>
            </div>
          ))}
        </div>

        {enabled !== false && (
          <form onSubmit={submit} className="border-t border-line p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <div className="flex items-end gap-2 rounded-2xl border border-line-strong bg-surface p-1.5 pl-3.5 focus-within:border-signature">
              <label htmlFor="zl-chat-input" className="sr-only">
                Message
              </label>
              <textarea
                id="zl-chat-input"
                ref={field}
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, MAX_LEN))}
                onKeyDown={onKeyDown}
                rows={1}
                placeholder="Ask anything about Zaiphr…"
                className="max-h-32 min-h-[2.5rem] flex-1 resize-none bg-transparent py-2 text-[0.95rem] outline-none [field-sizing:content] placeholder:text-muted/60"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                aria-label="Send message"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-signature text-signature-ink transition-opacity disabled:opacity-40"
              >
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                  <path d="M8 13V3M3.5 7.5L8 3l4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <p className="mt-2 px-1 text-[0.68rem] leading-snug text-muted">
              AI assistant — answers can be wrong. Don&apos;t share sensitive information.{" "}
              <Link href="/legal/privacy" className="underline underline-offset-2">
                Privacy
              </Link>
            </p>
          </form>
        )}
      </div>
    </>
  );
}
