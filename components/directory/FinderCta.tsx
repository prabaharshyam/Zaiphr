import { Button } from "@/components/ui/Button";

export function FinderCta({ title = "Not sure which ones you need?" }: { title?: string }) {
  return (
    <section className="mt-20 overflow-hidden rounded-3xl border border-signature/40 bg-bg-2 p-8 md:p-12">
      <p className="label-mono text-signature">Free · AI Stack Finder</p>
      <h2 className="font-display-tight mt-4 max-w-2xl text-[clamp(1.8rem,3.4vw,3rem)]">{title}</h2>
      <p className="mt-3 max-w-xl text-muted">Describe your problem in plain words and get a personalised stack, with how the tools connect and what they cost.</p>
      <div className="mt-8">
        <Button href="/tools/ai-stack-finder" size="lg">Find my AI stack</Button>
      </div>
    </section>
  );
}
