-- BuildMatch landing page: leads table.
-- Run once in Supabase > SQL Editor.
-- Only the server (secret / service_role key) can read or write this table.

create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  email       text not null unique
                check (char_length(email) <= 254 and email = lower(email) and email ~ '^[^\s@]+@[^\s@]+\.[^\s@]+$'),
  role        text not null check (role in ('contractor', 'supplier')),
  created_at  timestamptz not null default now()
);

-- Row level security ON, with no policies: the public (anon) and signed-in
-- (authenticated) roles get nothing, even if a grant is added by mistake later.
alter table public.leads enable row level security;
alter table public.leads force row level security;

-- Remove the default access Supabase gives to the browser-facing roles.
revoke all on table public.leads from anon, authenticated, public;

-- The server's secret key acts as service_role, which bypasses RLS.
-- It only needs to add leads and read them back (e.g. for exports).
grant select, insert on table public.leads to service_role;
