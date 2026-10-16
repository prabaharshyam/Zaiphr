# Zaiphr Labs - website & web app

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

## Backend setup (leads, emails, admin)

1. **Supabase** → SQL Editor → paste and run `supabase/migrations/0001_init.sql` (safe to re-run).
2. **Vercel** → Project → Settings → Environment Variables → add the keys from `.env.example`
   (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`,
   `EMAIL_FROM`, `LEAD_NOTIFY_EMAIL`, `ADMIN_PASSWORD`, `NEXT_PUBLIC_SITE_URL`) → redeploy.
3. Open `/admin`, sign in, and submit a test brief on `/contact`.

Until Supabase is configured, every form falls back to opening a prefilled email, so no enquiry is lost.
Leads are rate-limited (8 per IP per hour), validated with zod, protected by a honeypot and stored with a
salted IP hash (never the raw IP).

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
| `config/features.ts` | Feature flags (e.g. testimonials - keep off until quotes are real) |
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
2. Put images in `public/work/<slug>/` - `cover.jpg` (16:10) is required.
3. Set `label` to `Client Project` for real work; keep `Concept Project` / `Showcase Build` for concepts.

Concept covers are generated from HTML by `node scripts/mockups/render.mjs` (needs a local Chromium; set `CHROMIUM_PATH`).

## AI Stack Finder

`/tools/ai-stack-finder` - a visitor describes a business problem and gets a recommended stack picked from the catalogue in `config/ai-tools.ts`.

- **With `ANTHROPIC_API_KEY`:** Claude writes a tailored plan (diagnosis, stack, workflow, costs, watch-outs) and may only pick tools from the catalogue. `STACK_FINDER_MODEL` = `opus` (default), `sonnet` or `haiku`; `STACK_FINDER_EFFORT` = `low` (default, fastest/cheapest), `medium` or `high`.
- **Without a key** (or if the API call fails): an instant keyword matcher builds a starter stack, so the tool always works.
- **With Supabase:** runs are stored in `tool_runs`, identical inputs are served from cache for 14 days, each IP gets 6 runs per hour, and the full plan unlocks after name + email (saved as a lead with source `tool`, plan emailed). Without a DB the full plan shows straight away.
- **Editing the catalogue:** add or edit tools in `aiTools`; industry pages read `industryPicks`. Directory pages under `/ai-tools` rebuild from the same file.

## Link previews & SEO

- Every page builds its metadata with `pageMeta()` in `lib/seo.ts` (title, description, canonical, Open Graph + X card). Use it for new pages so WhatsApp/LinkedIn previews keep working.
- Preview images live in `public/og/` and are screenshots of the real pages: `npm run build && npx next start -p 3100`, then `node scripts/og/render.mjs http://localhost:3100` (or pass keys, e.g. `home services`). Blog posts and case studies use their covers.
- `app/sitemap.ts` lists every public page (including AI News archive days); `app/robots.ts` keeps admin, API, auth and personal pages out of search.
- House style: no em dashes. `lib/text.ts` (`noEmDash`) cleans AI-written text (chat, news, Stack Finder) as a safety net.

## Chat assistant

- **Knowledge:** built at runtime from `config/` (services, packages, process, FAQs, about), `content/work` and `content/blog` - edit those and the assistant updates on the next deploy. Rules live in `lib/server/chat/engine.ts`.
- **Model:** `CHAT_MODEL` (default Sonnet 5.5 with thinking off and low effort for fast replies). The system prompt is cached, so a typical reply costs a fraction of a rupee.
- **Actions:** the model ends a reply with `[[contact: summary]]`, `[[book]]` or `[[whatsapp]]`; the server strips the marker from the stream and the widget shows a consent-based contact form (saved as a lead with source `chat`), a booking button or WhatsApp. It never asks for personal details in the chat itself.
- **Limits:** 8 new conversations per IP per hour, 20 messages per conversation, 2,000 characters per message. Transcripts are stored in `tool_runs` (tool `chat`) and shown at `/admin/chats`.
- **No key?** The widget stays and offers WhatsApp, booking, email and the brief form.

## Writing a blog post

1. Add `content/blog/<slug>.mdx` with frontmatter: `title`, `description` (140–160 chars), `date` (YYYY-MM-DD - future dates stay hidden until that day), `category` (AI for Business · Automation · Websites & Apps · Marketing & Growth), `tags`, `service` (a service slug), optional `featured: true`, `updated`, and `faq` (list of `q`/`a`).
2. Components available in posts: `<KeyTakeaways>` (wrap a bullet list), `<Callout type="tip|note|warning" title="…">`, `<StackFinderCta problem="…" />`, `<ServiceCta service="<slug>" />`. Tables and `- [ ]` checklists work too.
3. Generate the cover: `node scripts/blog-covers/render.mjs <slug>` → `public/blog/<slug>/cover.jpg` (or put your own 16:9 image there).

## AI News

- **Daily run:** Vercel Cron calls `/api/cron/news` at 00:30 UTC (≈6:00 IST) with `CRON_SECRET`. It reads the feeds in `config/news-sources.ts`, drops stories already published in the last 5 days, and asks Claude (`NEWS_MODEL`, default Sonnet) to pick 8–12 stories and write a headline, 60-word summary and "why it matters". Without a key, or if the call fails, a keyword ranker uses each feed's own snippet instead.
- **Safe to re-run:** the brief is built once per IST day and the digest is sent once per day. `/admin/news` shows recent runs, per-feed health, and has Run now / Rebuild today buttons.
- **Digest:** goes to every active row in `subscribers` through Resend's batch API, with a per-subscriber unsubscribe link and one-click `List-Unsubscribe` headers. Resend's free plan allows 100 emails a day.
- **Reader accounts:** `/api/auth/magic-link` mints a one-time token with the service role and emails it through Resend (no Supabase SMTP setup). `/auth/confirm` verifies it in the browser; saved stories live in `saved_items`, protected by row-level security. Needs `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

## The 3D scene

`components/three/` - a single GPU particle system (`CipherCore`) that morphs between 9 point-cloud forms (`forms.ts`): core → one form per service → core. Scroll code writes `lib/scene-store.ts`; the render loop reads it. It is lazy-loaded after the preloader, scales its particle count to the device, pauses when off-screen, and falls back to a CSS core for reduced motion / no WebGL / Save-Data.

## Design system

- **Palette:** near-black `#05060A` + one signature light, acid lime `#C8FF2E`, used sparingly.
- **Type:** Archivo Variable (display - `font-display-wide` uses the 125% width axis), Geist (body), Geist Mono (labels/stats).
- **Motion:** Lenis smooth scroll synced to GSAP's ticker; `RevealText` (SplitText line/char/word masks), `ScrambleText` (cipher decode), `Magnetic`, custom cursor (`data-cursor="View"` on any element shows a labelled lens).
- **Page transitions:** use `TransitionLink` (or `Button href`) instead of `next/link` to get the wipe.
- **Accessibility:** `prefers-reduced-motion` disables smooth scroll, swaps reveals for fades and removes the cursor; preloader is hidden without JS and shown once per session; skip link; visible focus rings.

## Build phases

- [x] **1. Foundation** - tokens, fonts, layout, nav, footer, smooth scroll, cursor, transitions, preloader
- [x] **2. Home** - WebGL Cipher Core, 7-form services story, work gallery, process, tools/news teasers, stats, CTA
- [x] **3. Pages** - 7 service pages (3D form hero, pricing ₹/$, FAQ + JSON-LD), Work index + case studies, 24 Use Cases, About, multi-step Contact, Legal (DPDP)
- [x] **4. Leads** - Supabase schema + RLS, /api/leads + /api/subscribe (validation, honeypot, rate limit, UTM), Resend notifications + confirmations, /admin dashboard (filters, status, notes, CSV)
- [x] **5. Free tools** - AI Stack Finder (Claude-powered, with a no-key instant-match fallback, cached runs, email unlock → lead), /ai-tools directory with 22 category + 8 industry pages (JSON-LD)
- [x] **6. AI News** - daily pipeline (13 feeds → Claude curation → Supabase, keyword fallback), /news + archives, magic-link sign-in, saved stories, daily digest email with one-click unsubscribe, /admin/news
- [x] **7. Blog** - 10 launch posts (MDX), /blog with featured post + topic filter, post pages with contents, reading progress, FAQ + BlogPosting/FAQPage/Breadcrumb JSON-LD, related posts, share links, RSS at /blog/rss.xml, generated covers
- [x] **8. AI chat assistant** - streaming site-wide assistant grounded in the site's own config (services, prices, process, blog), contact form / booking / WhatsApp actions with consent, transcripts in /admin/chats, offline fallback
- [x] **9. Launch polish** - link previews (Open Graph images captured from the real pages), per-page metadata via `lib/seo.ts`, sitemap, robots, manifest + icons, Organization/WebSite JSON-LD, security headers, accessibility fixes (axe clean), no em dashes (house style, enforced on AI output too), mobile text-clipping fixes, sharper mobile 3D scene with lazy form building
