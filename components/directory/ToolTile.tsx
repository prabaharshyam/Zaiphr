import { pricingLabel, toolCategories, type AiTool } from "@/config/ai-tools";

export function ToolTile({ tool, note }: { tool: AiTool; note?: string }) {
  return (
    <article className="glass flex h-full flex-col rounded-2xl p-6">
      <div className="flex items-start gap-3">
        <span aria-hidden className="font-display-wide grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-surface-2 text-signature">
          {tool.name[0]}
        </span>
        <div className="min-w-0">
          <h3 className="text-lg font-medium">{tool.name}</h3>
          <p className="label-mono text-[0.58rem] text-muted">{toolCategories[tool.category]}</p>
        </div>
      </div>
      <p className="mt-4 text-[0.95rem] leading-relaxed text-text/85">{note ?? tool.tagline}</p>
      {tool.india && <p className="mt-3 text-xs text-signature">India: {tool.india}</p>}
      <div className="mt-auto flex items-center justify-between gap-3 pt-5">
        <div className="flex flex-wrap gap-1.5">
          <span className="label-mono rounded-full border border-line-strong px-2.5 py-1 text-[0.56rem]">{pricingLabel[tool.pricing]}</span>
          <span className="label-mono rounded-full border border-line-strong px-2.5 py-1 text-[0.56rem]">{tool.difficulty}</span>
        </div>
        <a href={tool.url} target="_blank" rel="noopener noreferrer" className="label-mono shrink-0 text-[0.6rem] text-signature underline-offset-4 hover:underline">
          Visit ↗
        </a>
      </div>
    </article>
  );
}
