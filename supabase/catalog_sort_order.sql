begin;

alter table public.car_brands
  add column if not exists sort_order int not null default 0;

alter table public.car_models
  add column if not exists sort_order int not null default 0;

with ordered as (
  select id, row_number() over (order by sort_order, name, created_at) - 1 as next_order
  from public.car_brands
)
update public.car_brands as brands
set sort_order = ordered.next_order
from ordered
where brands.id = ordered.id;

with ordered as (
  select
    id,
    row_number() over (partition by brand_id order by sort_order, name, created_at) - 1 as next_order
  from public.car_models
)
update public.car_models as models
set sort_order = ordered.next_order
from ordered
where models.id = ordered.id;

create index if not exists car_brands_sort_order_idx
  on public.car_brands (sort_order, name);

create index if not exists car_models_brand_sort_order_idx
  on public.car_models (brand_id, sort_order, name);

commit;
