"use server";

import { revalidatePath } from "next/cache";
import { isAdmin } from "@/lib/server/admin-auth";
import { runNewsPipeline } from "@/lib/server/news/pipeline";

export async function runNews(force: boolean) {
  if (!(await isAdmin())) throw new Error("Unauthorized");
  try {
    const { status, stats } = await runNewsPipeline({ force });
    revalidatePath("/news");
    revalidatePath("/");
    revalidatePath("/admin/news");
    return { ok: true, message: status === "skipped" ? `Skipped: ${stats.skipped}` : `Done · ${stats.stories ?? 0} stories · digest ${stats.digest?.skipped ?? `${stats.digest?.sent ?? 0} sent`}${stats.skipped ? ` (${stats.skipped})` : ""}` };
  } catch (e) {
    revalidatePath("/admin/news");
    return { ok: false, message: e instanceof Error ? e.message : String(e) };
  }
}
