import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { env, hasDb } from "./env";

let client: SupabaseClient | null = null;

/** Service-role client. Server-only: bypasses RLS, never expose to the browser. */
export function db() {
  if (!hasDb()) throw new Error("Supabase is not configured");
  client ??= createClient(env.supabaseUrl, env.supabaseServiceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return client;
}
