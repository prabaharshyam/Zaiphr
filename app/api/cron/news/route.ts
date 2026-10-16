import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";
import { revalidatePath } from "next/cache";
import { env, hasDb } from "@/lib/server/env";
import { runNewsPipeline } from "@/lib/server/news/pipeline";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

function authorized(req: Request) {
  if (!env.cronSecret) return false;
  const got = Buffer.from(req.headers.get("authorization") ?? "");
  const want = Buffer.from(`Bearer ${env.cronSecret}`);
  return got.length === want.length && timingSafeEqual(got, want);
}

/** Daily AI brief. Vercel Cron calls this with `Authorization: Bearer $CRON_SECRET`. */
export async function GET(req: Request) {
  if (!authorized(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!hasDb()) return NextResponse.json({ error: "Supabase is not configured" }, { status: 503 });
  try {
    const { status, stats } = await runNewsPipeline();
    revalidatePath("/news");
    revalidatePath("/");
    return NextResponse.json({ status, stats });
  } catch (e) {
    console.error("[cron/news] failed", e);
    return NextResponse.json({ status: "error", error: e instanceof Error ? e.message : String(e) }, { status: 500 });
  }
}
