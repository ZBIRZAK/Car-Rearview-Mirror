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

create table if not exists public.car_brands (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null unique,
  logo_url text
);

create table if not exists public.car_models (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  brand_id uuid not null references public.car_brands(id) on delete cascade,
  name text not null,
  unique (brand_id, name)
);

create table if not exists public.car_model_years (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  model_id uuid not null references public.car_models(id) on delete cascade,
  year int not null check (year between 1980 and 2100),
  unique (model_id, year)
);

create table if not exists public.app_settings (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.product_configs (
  id uuid primary key default gen_random_uuid(),
  brand_id text not null,
  model text not null,
  year int not null check (year between 1980 and 2100),
  config jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  unique (brand_id, model, year)
);

alter table public.requests enable row level security;
alter table public.car_brands enable row level security;
alter table public.car_models enable row level security;
alter table public.car_model_years enable row level security;
alter table public.app_settings enable row level security;
alter table public.product_configs enable row level security;

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
to authenticated
using (true);

drop policy if exists "allow_update_requests" on public.requests;
create policy "allow_update_requests"
on public.requests
for update
to authenticated
using (true)
with check (true);

drop policy if exists "allow_all_select_brands" on public.car_brands;
create policy "allow_all_select_brands"
on public.car_brands
for select
to anon, authenticated
using (true);

drop policy if exists "allow_all_insert_brands" on public.car_brands;
create policy "allow_all_insert_brands"
on public.car_brands
for insert
to authenticated
with check (true);

drop policy if exists "allow_all_update_brands" on public.car_brands;
create policy "allow_all_update_brands"
on public.car_brands
for update
to authenticated
using (true)
with check (true);

drop policy if exists "allow_all_delete_brands" on public.car_brands;
create policy "allow_all_delete_brands"
on public.car_brands
for delete
to authenticated
using (true);

drop policy if exists "allow_all_select_models" on public.car_models;
create policy "allow_all_select_models"
on public.car_models
for select
to anon, authenticated
using (true);

drop policy if exists "allow_all_insert_models" on public.car_models;
create policy "allow_all_insert_models"
on public.car_models
for insert
to authenticated
with check (true);

drop policy if exists "allow_all_update_models" on public.car_models;
create policy "allow_all_update_models"
on public.car_models
for update
to authenticated
using (true)
with check (true);

drop policy if exists "allow_all_delete_models" on public.car_models;
create policy "allow_all_delete_models"
on public.car_models
for delete
to authenticated
using (true);

drop policy if exists "allow_all_select_model_years" on public.car_model_years;
create policy "allow_all_select_model_years"
on public.car_model_years
for select
to anon, authenticated
using (true);

drop policy if exists "allow_all_insert_model_years" on public.car_model_years;
create policy "allow_all_insert_model_years"
on public.car_model_years
for insert
to authenticated
with check (true);

drop policy if exists "allow_all_update_model_years" on public.car_model_years;
create policy "allow_all_update_model_years"
on public.car_model_years
for update
to authenticated
using (true)
with check (true);

drop policy if exists "allow_all_delete_model_years" on public.car_model_years;
create policy "allow_all_delete_model_years"
on public.car_model_years
for delete
to authenticated
using (true);

drop policy if exists "allow_all_select_settings" on public.app_settings;
create policy "allow_all_select_settings"
on public.app_settings
for select
to anon, authenticated
using (true);

drop policy if exists "allow_all_insert_settings" on public.app_settings;
create policy "allow_all_insert_settings"
on public.app_settings
for insert
to authenticated
with check (true);

drop policy if exists "allow_all_update_settings" on public.app_settings;
create policy "allow_all_update_settings"
on public.app_settings
for update
to authenticated
using (true)
with check (true);

drop policy if exists "allow_all_select_product_configs" on public.product_configs;
create policy "allow_all_select_product_configs"
on public.product_configs
for select
to anon, authenticated
using (true);

drop policy if exists "allow_all_insert_product_configs" on public.product_configs;
create policy "allow_all_insert_product_configs"
on public.product_configs
for insert
to authenticated
with check (true);

drop policy if exists "allow_all_update_product_configs" on public.product_configs;
create policy "allow_all_update_product_configs"
on public.product_configs
for update
to authenticated
using (true)
with check (true);

drop policy if exists "allow_all_delete_product_configs" on public.product_configs;
create policy "allow_all_delete_product_configs"
on public.product_configs
for delete
to authenticated
using (true);
