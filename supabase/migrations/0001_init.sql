-- Zaiphr Labs - initial schema.
-- Run once in Supabase: Dashboard → SQL Editor → paste → Run.
-- The website writes with the service-role key (server-side only), which bypasses RLS.
-- RLS stays ON everywhere so the public anon key can only do what the policies below allow.

create extension if not exists pgcrypto;

-- ───────────────────────── Leads ─────────────────────────
do $$ begin
  create type lead_status as enum ('new', 'contacted', 'proposal', 'won', 'lost');
exception when duplicate_object then null; end $$;

create table if not exists public.leads (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  name          text not null,
  email         text not null,
  phone         text,
  company       text,
  website       text,
  source        text not null,            -- contact_form | quick_brief | tool | news_digest | chat
  tool          text,                     -- competitor_analysis | readiness_score | roi_calculator
  services      text[],
  budget        text,
  timeline      text,
  message       text,
  inputs        jsonb,                    -- tool inputs / extra form fields
  report        jsonb,                    -- tool report snapshot
  utm_source    text,
  utm_medium    text,
  utm_campaign  text,
  utm_term      text,
  utm_content   text,
  referrer      text,
  landing_page  text,
  consent       boolean not null default false,
  status        lead_status not null default 'new',
  notes         text,
  ip_hash       text,                     -- salted SHA-256, never the raw IP
  user_agent    text
);
create index if not exists leads_created_idx on public.leads (created_at desc);
create index if not exists leads_email_idx   on public.leads (lower(email));
create index if not exists leads_status_idx  on public.leads (status);
create index if not exists leads_ip_idx      on public.leads (ip_hash, created_at desc);

-- ───────────────────────── Tool runs ─────────────────────────
create table if not exists public.tool_runs (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  tool        text not null,
  input_hash  text not null,              -- for caching repeated URLs
  inputs      jsonb,
  result      jsonb,
  status      text not null default 'ok', -- ok | error | blocked
  error       text,
  lead_id     uuid references public.leads (id) on delete set null,
  ip_hash     text
);
create index if not exists tool_runs_cache_idx on public.tool_runs (tool, input_hash, created_at desc);
create index if not exists tool_runs_ip_idx    on public.tool_runs (ip_hash, created_at desc);

-- ───────────────────────── Newsletter ─────────────────────────
create table if not exists public.subscribers (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),
  email            text not null,
  source           text not null default 'news_digest',
  unsubscribe_token uuid not null default gen_random_uuid(),
  unsubscribed_at  timestamptz
);
create unique index if not exists subscribers_email_uidx on public.subscribers (lower(email));

-- ───────────────────────── AI News ─────────────────────────
create table if not exists public.news_sources (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null,
  kind        text not null check (kind in ('rss', 'reddit', 'hn', 'producthunt', 'x')),
  url         text not null,
  authority   int not null default 5,     -- 1–10, used in ranking
  enabled     boolean not null default true
);

create table if not exists public.news_items (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),
  slug            text not null unique,
  brief_date      date not null,
  headline        text not null,
  summary         text not null,
  why_it_matters  text,
  category        text not null,
  tags            text[] not null default '{}',
  image_url       text,
  sources         jsonb not null default '[]'::jsonb,  -- [{ name, url }]
  score           numeric not null default 0,
  published_at    timestamptz
);
create index if not exists news_items_brief_idx on public.news_items (brief_date desc, score desc);

create table if not exists public.news_runs (
  id           uuid primary key default gen_random_uuid(),
  started_at   timestamptz not null default now(),
  finished_at  timestamptz,
  status       text not null default 'running', -- running | ok | error
  stats        jsonb,
  error        text
);

-- Saved stories for signed-in readers (magic-link auth)
create table if not exists public.saved_items (
  user_id       uuid not null references auth.users (id) on delete cascade,
  news_item_id  uuid not null references public.news_items (id) on delete cascade,
  created_at    timestamptz not null default now(),
  primary key (user_id, news_item_id)
);

-- ───────────────────────── Row-level security ─────────────────────────
alter table public.leads        enable row level security;
alter table public.tool_runs    enable row level security;
alter table public.subscribers  enable row level security;
alter table public.news_sources enable row level security;
alter table public.news_items   enable row level security;
alter table public.news_runs    enable row level security;
alter table public.saved_items  enable row level security;

-- Public can read published news; nothing else is publicly readable.
drop policy if exists "news is public" on public.news_items;
create policy "news is public" on public.news_items for select to anon, authenticated using (true);

-- Signed-in readers manage only their own saved stories.
drop policy if exists "own saved: read"   on public.saved_items;
drop policy if exists "own saved: insert" on public.saved_items;
drop policy if exists "own saved: delete" on public.saved_items;
create policy "own saved: read"   on public.saved_items for select to authenticated using (auth.uid() = user_id);
create policy "own saved: insert" on public.saved_items for insert to authenticated with check (auth.uid() = user_id);
create policy "own saved: delete" on public.saved_items for delete to authenticated using (auth.uid() = user_id);
