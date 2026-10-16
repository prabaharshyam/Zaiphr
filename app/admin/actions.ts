"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { checkPassword, endSession, isAdmin, startSession } from "@/lib/server/admin-auth";
import { db } from "@/lib/server/db";

export async function login(_: unknown, form: FormData) {
  const password = String(form.get("password") ?? "");
  if (!checkPassword(password)) {
    await new Promise((r) => setTimeout(r, 800)); // slow down guessing
    return { error: "Wrong password." };
  }
  await startSession();
  redirect("/admin");
}

export async function logout() {
  await endSession();
  redirect("/admin/login");
}

const updateSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["new", "contacted", "proposal", "won", "lost"]).optional(),
  notes: z.string().max(5000).optional(),
});

export async function updateLead(input: z.input<typeof updateSchema>) {
  if (!(await isAdmin())) throw new Error("Unauthorized");
  const { id, ...patch } = updateSchema.parse(input);
  const { error } = await db().from("leads").update(patch).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
}
