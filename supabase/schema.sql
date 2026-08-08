-- ============================================================
-- Local Shine - Supabase schema
-- Run this once in your Supabase project: SQL Editor -> New query
-- ============================================================

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  phone text not null,
  email text not null,
  service text not null,
  property_type text not null,
  address text not null,
  message text,
  status text not null default 'new'
);

-- Enable row-level security
alter table public.inquiries enable row level security;

-- Legacy policy for the old inquiries table.
create policy "Public can submit inquiries"
  on public.inquiries
  for insert
  to anon
  with check (true);

-- Only signed-in users can read inquiries.
create policy "Authenticated can read inquiries"
  on public.inquiries
  for select
  to authenticated
  using (true);

-- Only signed-in users can update status.
create policy "Authenticated can update inquiries"
  on public.inquiries
  for update
  to authenticated
  using (true)
  with check (true);

-- ============================================================
-- After running this file:
-- 1. Go to Authentication -> Users -> Add user.
--    Create your dashboard login email and password.
-- 2. Go to Settings -> API and copy your Project URL + anon public key
--    into js/supabase-config.js.
-- ============================================================
