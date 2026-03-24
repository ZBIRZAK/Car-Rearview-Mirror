create extension if not exists "pgcrypto";

create table if not exists public.requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  status text not null default 'new',
  brand text,
  model text,
  year int,
  order_scope text,
  selected_feature text,
  position text,
  product_type text,
  adjustment_type text,
  options jsonb not null default '[]'::jsonb,
  full_name text,
  email text,
  phone text,
  message text
);

alter table public.requests enable row level security;

drop policy if exists "allow_insert_requests" on public.requests;
create policy "allow_insert_requests"
on public.requests
for insert
to anon, authenticated
with check (true);

drop policy if exists "allow_select_requests" on public.requests;
create policy "allow_select_requests"
on public.requests
for select
to anon, authenticated
using (true);

drop policy if exists "allow_update_requests" on public.requests;
create policy "allow_update_requests"
on public.requests
for update
to anon, authenticated
using (true)
with check (true);
