import { z } from "zod";

const opt = (max: number) => z.string().trim().max(max).optional().or(z.literal("").transform(() => undefined));

export const attributionSchema = z
  .object({
    utm_source: opt(120),
    utm_medium: opt(120),
    utm_campaign: opt(120),
    utm_term: opt(120),
    utm_content: opt(120),
    referrer: opt(300),
    landing: opt(300),
  })
  .partial()
  .optional();

export const leadSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  email: z.string().trim().toLowerCase().email("Enter a valid email").max(200),
  phone: opt(40),
  company: opt(160),
  website: opt(300),
  source: z.enum(["contact_form", "quick_brief", "tool", "news_digest", "chat"]),
  tool: opt(60),
  services: z.array(z.string().max(80)).max(10).optional(),
  budget: opt(80),
  timeline: opt(80),
  message: opt(5000),
  inputs: z.record(z.string(), z.unknown()).optional(),
  report: z.record(z.string(), z.unknown()).optional(),
  consent: z.literal(true, { message: "Consent is required" }),
  attribution: attributionSchema,
  /** Honeypot - real users never fill this. */
  hp: z.string().max(0).optional(),
});

export type LeadInput = z.input<typeof leadSchema>;
export type Lead = z.output<typeof leadSchema>;
