-- Peugeot model years (compiled from public model production references)
-- Run this after Peugeot brand + models already exist in car_brands/car_models.

begin;

with b as (
  select id
  from car_brands
  where lower(name) = lower('Peugeot')
  limit 1
),
years as (
  -- Supermini / compact
  select '208'::text as model, generate_series(2012, extract(year from current_date)::int) as year
  union all
  select '308'::text, generate_series(2007, extract(year from current_date)::int)
  union all
  select '408'::text, generate_series(2010, extract(year from current_date)::int)

  -- SUV / crossover
  union all
  select '2008'::text, generate_series(2013, extract(year from current_date)::int)
  union all
  select '3008'::text, generate_series(2008, extract(year from current_date)::int)
  union all
  select '5008'::text, generate_series(2009, extract(year from current_date)::int)

  -- Sedan / wagon
  union all
  select '508'::text, generate_series(2010, 2025)

  -- Vans / LCV
  union all
  select 'Partner'::text, generate_series(1996, extract(year from current_date)::int)
  union all
  select 'Expert'::text, generate_series(1995, extract(year from current_date)::int)
  union all
  select 'Boxer'::text, generate_series(1994, extract(year from current_date)::int)
  union all
  select 'Rifter'::text, generate_series(2018, extract(year from current_date)::int)
  union all
  select 'Traveller'::text, generate_series(2016, extract(year from current_date)::int)
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

-- Any Peugeot models still missing years after this script:
select m.name as peugeot_model_without_year_mapping
from car_models m
join car_brands b on b.id = m.brand_id
where lower(b.name) = lower('Peugeot')
  and not exists (
    select 1
    from car_model_years y
    where y.model_id = m.id
  )
order by m.name;
