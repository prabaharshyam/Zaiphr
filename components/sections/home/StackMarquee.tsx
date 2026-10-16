import { Marquee } from "@/components/ui/Marquee";

// Text only - no third-party logos.
const stack = [
  "Claude",
  "OpenAI",
  "n8n",
  "Make",
  "Twilio",
  "WhatsApp Business",
  "Next.js",
  "React Native",
  "Shopify",
  "Supabase",
  "Meta Ads",
  "Google Ads",
  "Figma",
  "Vercel",
];

export function StackMarquee() {
  return (
    <section aria-label="Tools and platforms we build with" className="relative z-10 border-y border-line bg-bg-2/60 py-6 backdrop-blur-sm">
      <Marquee duration={45}>
        {stack.map((t) => (
          <span key={t} className="flex items-center gap-10 pr-10">
            <span className="font-display text-2xl font-semibold tracking-[-0.02em] text-text/70 [font-stretch:110%] md:text-3xl">
              {t}
            </span>
            <span className="text-signature" aria-hidden>
              ✦
            </span>
          </span>
        ))}
      </Marquee>
    </section>
  );
}
