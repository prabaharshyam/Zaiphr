"use client";

import { createClient, type SupabaseClient, type User } from "@supabase/supabase-js";
import { useSyncExternalStore } from "react";
import { getAttribution } from "@/lib/utm";

/**
 * Reader accounts for AI News: magic-link session (kept by supabase-js in localStorage),
 * the set of saved story ids, and the sign-in dialog. One tiny store shared by every
 * save button on the page.
 */

const url = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "").trim().replace(/\/+$/, "").replace(/\/rest\/v1$/, "");
const anonKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "").trim();
const PENDING_KEY = "zl-pending-save";

let client: SupabaseClient | null = null;
export function browserDb() {
  if (!url || !anonKey) return null;
  client ??= createClient(url, anonKey, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false } });
  return client;
}

interface State {
  ready: boolean;
  available: boolean;
  user: User | null;
  saved: ReadonlySet<string>;
  dialog: boolean;
}

const SERVER: State = { ready: false, available: false, user: null, saved: new Set(), dialog: false };
let state: State = { ...SERVER, available: Boolean(url && anonKey) };
const listeners = new Set<() => void>();
const set = (patch: Partial<State>) => {
  state = { ...state, ...patch };
  listeners.forEach((l) => l());
};

let started = false;
function start() {
  if (started || typeof window === "undefined") return;
  started = true;
  const c = browserDb();
  if (!c) return set({ ready: true });
  void c.auth.getSession().then(({ data }) => onUser(data.session?.user ?? null));
  // Supabase advises against awaiting other calls inside this callback — defer them.
  c.auth.onAuthStateChange((_event, session) => setTimeout(() => void onUser(session?.user ?? null), 0));
}

async function onUser(user: User | null) {
  if (state.ready && user?.id === state.user?.id) return;
  if (!user) return set({ ready: true, user: null, saved: new Set() });
  const { data } = await browserDb()!.from("saved_items").select("news_item_id");
  set({ ready: true, user, saved: new Set((data ?? []).map((r) => String(r.news_item_id))) });
}

function subscribe(listener: () => void) {
  start();
  listeners.add(listener);
  return () => void listeners.delete(listener);
}

export function useAccount() {
  return useSyncExternalStore(subscribe, () => state, () => SERVER);
}

export function openSignIn(pendingSaveId?: string) {
  try {
    if (pendingSaveId) localStorage.setItem(PENDING_KEY, pendingSaveId);
  } catch {
    /* storage blocked — the save just won't be remembered */
  }
  set({ dialog: true });
}
export const closeSignIn = () => set({ dialog: false });

export async function toggleSave(newsItemId: string) {
  const c = browserDb();
  if (!c || !state.user) return openSignIn(newsItemId);
  const wasSaved = state.saved.has(newsItemId);
  const next = new Set(state.saved);
  if (wasSaved) next.delete(newsItemId);
  else next.add(newsItemId);
  set({ saved: next }); // optimistic

  const { error } = wasSaved
    ? await c.from("saved_items").delete().eq("news_item_id", newsItemId).eq("user_id", state.user.id)
    : await c.from("saved_items").upsert({ user_id: state.user.id, news_item_id: newsItemId }, { onConflict: "user_id,news_item_id", ignoreDuplicates: true });
  if (error) {
    const revert = new Set(state.saved);
    if (wasSaved) revert.add(newsItemId);
    else revert.delete(newsItemId);
    set({ saved: revert });
  }
}

/** Saves the story the reader tapped before signing in (called after the magic link verifies). */
export async function applyPendingSave() {
  let id: string | null = null;
  try {
    id = localStorage.getItem(PENDING_KEY);
    localStorage.removeItem(PENDING_KEY);
  } catch {
    return;
  }
  const c = browserDb();
  const { data } = (await c?.auth.getUser()) ?? { data: { user: null } };
  if (!id || !c || !data.user) return;
  await c.from("saved_items").upsert({ user_id: data.user.id, news_item_id: id }, { onConflict: "user_id,news_item_id", ignoreDuplicates: true });
}

export async function signOut() {
  await browserDb()?.auth.signOut();
  set({ user: null, saved: new Set() });
}

export async function requestMagicLink(email: string, opts: { digest: boolean; next?: string }) {
  try {
    const res = await fetch("/api/auth/magic-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, digest: opts.digest, next: opts.next, attribution: getAttribution() }),
    });
    const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
    return data.ok ? { ok: true as const } : { ok: false as const, error: data.error ?? "Something went wrong — please try again." };
  } catch {
    return { ok: false as const, error: "You seem to be offline — please try again." };
  }
}
