-- Dacia model years (based on production ranges from model references)
begin;

with b as (
  select id
  from car_brands
  where lower(name) = lower('Dacia')
  limit 1
),
years as (
  select 'Dokker'::text as model, generate_series(2012, 2021) as year
  union all
  select 'Duster'::text, generate_series(2010, extract(year from current_date)::int)
  union all
  select 'Jogger'::text, generate_series(2021, extract(year from current_date)::int)
  union all
  select 'Lodgy'::text, generate_series(2012, 2024)
  union all
  select 'Logan'::text, generate_series(2004, extract(year from current_date)::int)
  union all
  select 'Sandero'::text, generate_series(2008, extract(year from current_date)::int)
  union all
  select 'Spring'::text, generate_series(2021, extract(year from current_date)::int)
),
mapped as (
  select m.id as model_id, y.year
  from b
  join car_models m on m.brand_id = b.id
  join years y on lower(y.model) = lower(m.name)
)
insert into car_model_years (model_id, year)
select model_id, year
from mapped
on conflict (model_id, year) do nothing;

commit;

