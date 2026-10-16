import { z } from "zod";
import { services } from "@/config/services";

export const TOOL_ID = "ai_stack_finder";

export const finderInputSchema = z.object({
  problem: z.string().trim().min(15, "Tell us a little more: at least a sentence.").max(1200),
  industry: z.string().max(60).optional(),
  teamSize: z.enum(["solo", "2-10", "11-50", "50+"]).optional(),
  budget: z.enum(["free", "low", "flexible"]).optional(),
  comfort: z.enum(["beginner", "some", "technical"]).optional(),
  hp: z.string().max(0).optional(),
});
export type FinderInput = z.infer<typeof finderInputSchema>;

const serviceSlugs = services.map((s) => s.slug) as [string, ...string[]];

/**
 * Shape Claude must return (structured output). Kept free of length constraints -
 * we trim and validate after parsing.
 */
export const planSchema = z.object({
  headline: z.string(),
  diagnosis: z.string(),
  stack: z.array(
    z.object({
      toolId: z.string(),
      role: z.string(),
      why: z.string(),
      setup: z.string(),
    }),
  ),
  workflow: z.array(z.object({ title: z.string(), detail: z.string(), toolIds: z.array(z.string()) })),
  quickWin: z.string(),
  hoursSavedPerWeek: z.string(),
  monthlyCostInr: z.string(),
  monthlyCostUsd: z.string(),
  setupTime: z.string(),
  difficulty: z.enum(["easy", "medium", "advanced"]),
  watchOuts: z.array(z.string()),
  doneForYou: z.object({ service: z.enum(serviceSlugs), pitch: z.string() }),
});
export type Plan = z.infer<typeof planSchema>;

/** What the browser receives. Locked fields are omitted until the lead form is submitted. */
export interface FinderResult {
  runId: string | null;
  engine: "ai" | "match";
  locked: boolean;
  plan: Partial<Plan> & Pick<Plan, "headline" | "diagnosis" | "quickWin" | "stack">;
  totalTools: number;
}

/** Fields visible before unlocking: diagnosis + top 3 tools (without setup notes). */
export function previewOf(plan: Plan): FinderResult["plan"] {
  return {
    headline: plan.headline,
    diagnosis: plan.diagnosis,
    quickWin: plan.quickWin,
    stack: plan.stack.slice(0, 3).map((s) => ({ ...s, setup: "" })),
  };
}
