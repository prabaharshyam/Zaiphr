# Zaiphr Labs — website & web app

The marketing site, free lead-gen tools, AI news hub and blog for **Zaiphr Labs**, an AI-native tech studio.

**Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · GSAP + ScrollTrigger + SplitText · Lenis · three.js / React Three Fiber · Framer Motion · Supabase · Resend · Claude API · Vercel.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in keys as phases need them
npm run dev                  # http://localhost:3000
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` / `start` | Production build / serve |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no emit |
| `npm run format` | Prettier (+ Tailwind class sorting) |

## Where to edit things (no component changes needed)

| File | Controls |
| --- | --- |
| `config/site.ts` | Company name, positioning line, email, phone, WhatsApp, Calendly, socials, currency |
| `config/services.ts` | The 7 services: title, summary, capabilities, order, 3D form |
| `config/navigation.ts` | Header and footer links |
| `config/stats.ts` | Home page counters |
| `config/process.ts` | Process timeline steps |
| `config/service-details.ts` | Service page copy, industry use cases, FAQs, pricing (₹ and $) |
| `config/use-cases.ts` | The Use Cases library |
| `config/about.ts` | Mission, values, founder (add your photo + bio), stack |
| `config/features.ts` | Feature flags (e.g. testimonials — keep off until quotes are real) |
| `content/legal/*.mdx` | Privacy, Terms, Cookie notice |
| `content/work/*.mdx` | Case studies (frontmatter drives cards; body is the case study) |
| `app/globals.css` (top) | Design tokens: colors, easing, gutters, type scale |

## Project structure

```
app/                  routes (App Router)
  fonts/              self-hosted Archivo Variable (OFL)
components/
  effects/            Cursor, Preloader, Grain
  layout/             Nav, MobileMenu, Footer, NewsletterForm
  providers/          SmoothScroll (Lenis↔GSAP), TransitionProvider (route wipes)
  sections/           page sections (home/, …)
  three/              WebGL scenes (Phase 2)
  ui/                 design system: Button, Magnetic, RevealText, ScrambleText,
                      GlassCard, SectionHeading, Marquee, TransitionLink, Logo
config/               editable business content
lib/                  gsap registration, hooks, ready-signal, utils
```

## Adding a case study

1. Copy any file in `content/work/` to `content/work/<slug>.mdx` and edit the frontmatter.
2. Put images in `public/work/<slug>/` — `cover.jpg` (16:10) is required.
3. Set `label` to `Client Project` for real work; keep `Concept Project` / `Showcase Build` for concepts.

Concept covers are generated from HTML by `node scripts/mockups/render.mjs` (needs a local Chromium; set `CHROMIUM_PATH`).

## The 3D scene

`components/three/` — a single GPU particle system (`CipherCore`) that morphs between 9 point-cloud forms (`forms.ts`): core → one form per service → core. Scroll code writes `lib/scene-store.ts`; the render loop reads it. It is lazy-loaded after the preloader, scales its particle count to the device, pauses when off-screen, and falls back to a CSS core for reduced motion / no WebGL / Save-Data.

## Design system

- **Palette:** near-black `#05060A` + one signature light, acid lime `#C8FF2E`, used sparingly.
- **Type:** Archivo Variable (display — `font-display-wide` uses the 125% width axis), Geist (body), Geist Mono (labels/stats).
- **Motion:** Lenis smooth scroll synced to GSAP's ticker; `RevealText` (SplitText line/char/word masks), `ScrambleText` (cipher decode), `Magnetic`, custom cursor (`data-cursor="View"` on any element shows a labelled lens).
- **Page transitions:** use `TransitionLink` (or `Button href`) instead of `next/link` to get the wipe.
- **Accessibility:** `prefers-reduced-motion` disables smooth scroll, swaps reveals for fades and removes the cursor; preloader is hidden without JS and shown once per session; skip link; visible focus rings.

## Build phases

- [x] **1. Foundation** — tokens, fonts, layout, nav, footer, smooth scroll, cursor, transitions, preloader
- [x] **2. Home** — WebGL Cipher Core, 7-form services story, work gallery, process, tools/news teasers, stats, CTA
- [x] **3. Pages** — 7 service pages (3D form hero, pricing ₹/$, FAQ + JSON-LD), Work index + case studies, 24 Use Cases, About, multi-step Contact, Legal (DPDP)
- [ ] 4. Supabase + leads + emails + admin
- [ ] 5. Free tools (Competitor Analysis, Readiness Score, ROI Calculator)
- [ ] 6. AI News (UI, daily pipeline, saved/auth/digest)
- [ ] 7. Blog + 10 posts
- [ ] 8. AI chat assistant
- [ ] 9. SEO, performance, accessibility pass → Vercel deploy
