"use client";

import { AnimatePresence, animate, motion, useMotionValue, useTransform, type PanInfo } from "framer-motion";
import { useState } from "react";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { RevealText } from "@/components/ui/RevealText";
import { Button } from "@/components/ui/Button";

export interface TeaserStory {
  id: string;
  tag: string;
  headline: string;
  body: string;
  why: string;
  source: string;
}

/**
 * Explainer cards shown until the first daily brief exists (no invented news).
 * Once there is a brief, the home page passes the real top stories instead.
 */
const explainers = [
  {
    id: "a",
    tag: "How it works",
    headline: "Today in AI, one swipe at a time",
    body: "Every morning we read the major AI sources so you don't have to, and write each story in 60 words or fewer. Swipe right to save, left to pass, or use your arrow keys.",
    why: "Founders get the signal without the noise: about 25–40 stories a day, ranked by what matters to a business.",
    hue: "from-[#1b2a0a] to-[#0a0d05]",
  },
  {
    id: "b",
    tag: "Sources",
    headline: "Every card links back to the original",
    body: "Each summary is written fresh and credits its sources: TechCrunch, The Verge, official AI lab blogs, Hacker News, Reddit and more. Tap “Read full story” to go deeper.",
    why: "You can trust a summary when you can always check the source.",
    hue: "from-[#14161f] to-[#07080c]",
  },
  {
    id: "c",
    tag: "For founders",
    headline: "Tap any card to see why it matters",
    body: "Flip a card to see one or two lines on what the story means for your business: a tool to try, a cost that just fell, or a risk to watch.",
    why: "This side of every card answers one question: what should I do with this?",
    hue: "from-[#22140a] to-[#0c0805]",
  },
];

const HUES = ["from-[#1b2a0a] to-[#0a0d05]", "from-[#14161f] to-[#07080c]", "from-[#22140a] to-[#0c0805]"];

type Card = { id: string; tag: string; headline: string; body: string; why: string; hue: string; source?: string };

function SwipeCard({ card, onDone, depth }: { card: Card; onDone: (dir: 1 | -1) => void; depth: number }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 300], [-14, 14]);
  const save = useTransform(x, [30, 140], [0, 1]);
  const pass = useTransform(x, [-140, -30], [1, 0]);
  const [flipped, setFlipped] = useState(false);
  const top = depth === 0;

  const fling = (dir: 1 | -1) =>
    animate(x, dir * 700, { type: "spring", stiffness: 260, damping: 30, onComplete: () => onDone(dir) });

  const end = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 120 || Math.abs(info.velocity.x) > 700) fling(info.offset.x > 0 ? 1 : -1);
    else animate(x, 0, { type: "spring", stiffness: 400, damping: 30 });
  };

  return (
    <motion.div
      className="absolute inset-0 [perspective:1400px]"
      style={{ x, rotate, zIndex: 10 - depth }}
      initial={{ scale: 0.9, y: 30, opacity: 0 }}
      animate={{ scale: 1 - depth * 0.05, y: depth * 18, opacity: depth > 2 ? 0 : 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      drag={top ? "x" : false}
      dragSnapToOrigin={false}
      onDragEnd={end}
      data-cursor={top ? "Drag" : undefined}
      tabIndex={top ? 0 : -1}
      aria-hidden={!top}
      onKeyDown={(e) => {
        if (!top) return;
        if (e.key === "ArrowRight") fling(1);
        if (e.key === "ArrowLeft") fling(-1);
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setFlipped((f) => !f);
        }
      }}
    >
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
        onTap={() => top && setFlipped((f) => !f)}
      >
        {/* front */}
        <div className={`absolute inset-0 flex flex-col overflow-hidden rounded-3xl border border-line-strong bg-gradient-to-b ${card.hue} p-7 [backface-visibility:hidden]`}>
          <div className="bg-grid absolute inset-0 opacity-40" aria-hidden />
          <div className="relative flex items-center justify-between">
            <span className="label-mono rounded-full bg-signature px-2.5 py-1 text-[0.6rem] text-signature-ink">{card.tag}</span>
            <span className="label-mono max-w-[50%] truncate text-[0.6rem] text-muted">{card.source ?? "Preview"}</span>
          </div>
          <h3 className="font-display-tight relative mt-auto text-[1.9rem] leading-[1.02]">{card.headline}</h3>
          <p className="relative mt-4 text-[0.95rem] leading-relaxed text-text/75">{card.body}</p>
          <div className="label-mono relative mt-6 flex items-center justify-between border-t border-line pt-4 text-[0.6rem] text-muted">
            <span>Zaiphr AI News</span>
            <span>Tap to flip ↻</span>
          </div>
          <motion.span style={{ opacity: save }} className="label-mono absolute top-8 left-6 -rotate-12 rounded-md border-2 border-signature px-3 py-1 text-lg text-signature">
            Saved
          </motion.span>
          <motion.span style={{ opacity: pass }} className="label-mono absolute top-8 right-6 rotate-12 rounded-md border-2 border-text/70 px-3 py-1 text-lg text-text/80">
            Pass
          </motion.span>
        </div>
        {/* back */}
        <div className="absolute inset-0 flex flex-col justify-center rounded-3xl border border-signature/40 bg-bg-2 p-8 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <p className="label-mono text-signature">Why it matters for founders</p>
          <p className="font-display-tight mt-5 text-2xl leading-snug">{card.why}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function NewsTeaser({ stories = [] }: { stories?: TeaserStory[] }) {
  const live = stories.length >= 3;
  const [stack, setStack] = useState<Card[]>(() =>
    live ? stories.map((s, i) => ({ ...s, hue: HUES[i % HUES.length] })) : explainers,
  );
  const total = live ? stories.length : 10;
  const [log, setLog] = useState<string>("");
  const [read, setRead] = useState(0);

  const done = (dir: 1 | -1) => {
    setStack((s) => {
      const [first, ...rest] = s;
      return [...rest, { ...first, id: first.id + "'" }];
    });
    setRead((r) => r + 1);
    setLog(dir === 1 ? "Saved to your list" : "Passed");
  };

  return (
    <section aria-labelledby="news-heading" className="relative z-10 overflow-hidden border-t border-line bg-bg py-28 md:py-40">
      <div className="container-x grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Eyebrow index="05">AI News · Daily</Eyebrow>
          <RevealText as="h2" className="font-display-tight mt-5 text-[length:var(--text-display)]">
            <span id="news-heading">All of AI, in your morning chai break.</span>
          </RevealText>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
            The 10-odd AI stories that matter each day, picked from the labs, the tech press and India&apos;s startup media —
            each in 60 words with a founder&apos;s takeaway. Swipe through it like a deck of cards.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href="/news">Open today&apos;s brief</Button>
          </div>
          <div className="mt-10 max-w-sm">
            <div className="label-mono flex justify-between text-muted">
              <span>Today&apos;s brief</span>
              <span aria-live="polite">{Math.min(read, total)} of {total} read</span>
            </div>
            <div className="mt-2 h-px bg-line">
              <div className="h-full bg-signature transition-[width] duration-500" style={{ width: `${(Math.min(read, total) / total) * 100}%` }} />
            </div>
          </div>
        </div>
        <div className="lg:col-span-6">
          <div className="relative mx-auto h-[500px] w-full max-w-[380px] select-none">
            <AnimatePresence initial={false}>
              {stack.slice(0, 3).map((c, i) => (
                <SwipeCard key={c.id} card={c} depth={i} onDone={done} />
              ))}
            </AnimatePresence>
          </div>
          <div className="mx-auto mt-14 flex max-w-[380px] items-center justify-between">
            <button type="button" onClick={() => done(-1)} className="label-mono h-12 rounded-full border border-line-strong px-5 transition-colors hover:border-text">
              ← Pass
            </button>
            <span className="label-mono text-[0.62rem] text-muted" aria-live="polite">{log}</span>
            <button type="button" onClick={() => done(1)} className="label-mono h-12 rounded-full bg-signature px-5 text-signature-ink">
              Save →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
