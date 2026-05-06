-- Auto-generated from /Dacia folder
begin;

insert into car_brands (name) values ('Dacia') on conflict (name) do nothing;

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into car_models (brand_id, name)
select b.id, v.model
from b
join (values
  ('Dokker'),
  ('Duster'),
  ('Jogger'),
  ('Lodgy'),
  ('Logan'),
  ('Sandero'),
  ('Spring')
) as v(model) on true
on conflict (brand_id, name) do nothing;

commit;
