-- Run once in the Supabase dashboard → SQL Editor.
-- Creates the posts table + public read access. Writes happen via the
-- service-role key (which bypasses RLS) from the inbound-email webhook.

create table if not exists public.posts (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  title        text not null,
  body_html    text not null,                 -- sanitized HTML, wording verbatim
  excerpt      text,
  status       text not null default 'published'
                 check (status in ('draft', 'published')),
  message_id   text unique,                   -- Resend message_id, for de-duplication
  published_at timestamptz not null default now(),
  created_at   timestamptz not null default now()
);

create index if not exists posts_published_idx
  on public.posts (published_at desc);

-- Row-level security: the public site (anon key) can read PUBLISHED posts only.
alter table public.posts enable row level security;

drop policy if exists "public read published" on public.posts;
create policy "public read published"
  on public.posts
  for select
  using (status = 'published');
