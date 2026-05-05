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

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Dokker' limit 1)
insert into car_model_years (model_id, year) select m.id, 2012 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Dokker', 2012, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (1).webp","/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (2).webp","/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (3).webp","/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (4).webp","/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (5).webp"],"GLASS":["/Dacia/Dokker/Dokker (2012–2024)/Glass (1).webp","/Dacia/Dokker/Dokker (2012–2024)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Dokker/Dokker (2012–2024)/Cover (1).jpg","/Dacia/Dokker/Dokker (2012–2024)/Cover (2).jpg","/Dacia/Dokker/Dokker (2012–2024)/Cover (3).webp","/Dacia/Dokker/Dokker (2012–2024)/Cover (4).webp"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Dokker' limit 1)
insert into car_model_years (model_id, year) select m.id, 2013 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Dokker', 2013, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (1).webp","/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (2).webp","/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (3).webp","/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (4).webp","/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (5).webp"],"GLASS":["/Dacia/Dokker/Dokker (2012–2024)/Glass (1).webp","/Dacia/Dokker/Dokker (2012–2024)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Dokker/Dokker (2012–2024)/Cover (1).jpg","/Dacia/Dokker/Dokker (2012–2024)/Cover (2).jpg","/Dacia/Dokker/Dokker (2012–2024)/Cover (3).webp","/Dacia/Dokker/Dokker (2012–2024)/Cover (4).webp"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Dokker' limit 1)
insert into car_model_years (model_id, year) select m.id, 2014 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Dokker', 2014, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (1).webp","/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (2).webp","/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (3).webp","/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (4).webp","/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (5).webp"],"GLASS":["/Dacia/Dokker/Dokker (2012–2024)/Glass (1).webp","/Dacia/Dokker/Dokker (2012–2024)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Dokker/Dokker (2012–2024)/Cover (1).jpg","/Dacia/Dokker/Dokker (2012–2024)/Cover (2).jpg","/Dacia/Dokker/Dokker (2012–2024)/Cover (3).webp","/Dacia/Dokker/Dokker (2012–2024)/Cover (4).webp"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Dokker' limit 1)
insert into car_model_years (model_id, year) select m.id, 2015 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Dokker', 2015, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (1).webp","/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (2).webp","/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (3).webp","/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (4).webp","/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (5).webp"],"GLASS":["/Dacia/Dokker/Dokker (2012–2024)/Glass (1).webp","/Dacia/Dokker/Dokker (2012–2024)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Dokker/Dokker (2012–2024)/Cover (1).jpg","/Dacia/Dokker/Dokker (2012–2024)/Cover (2).jpg","/Dacia/Dokker/Dokker (2012–2024)/Cover (3).webp","/Dacia/Dokker/Dokker (2012–2024)/Cover (4).webp"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Dokker' limit 1)
insert into car_model_years (model_id, year) select m.id, 2016 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Dokker', 2016, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (1).webp","/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (2).webp","/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (3).webp","/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (4).webp","/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (5).webp"],"GLASS":["/Dacia/Dokker/Dokker (2012–2024)/Glass (1).webp","/Dacia/Dokker/Dokker (2012–2024)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Dokker/Dokker (2012–2024)/Cover (1).jpg","/Dacia/Dokker/Dokker (2012–2024)/Cover (2).jpg","/Dacia/Dokker/Dokker (2012–2024)/Cover (3).webp","/Dacia/Dokker/Dokker (2012–2024)/Cover (4).webp"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Dokker' limit 1)
insert into car_model_years (model_id, year) select m.id, 2017 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Dokker', 2017, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (1).webp","/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (2).webp","/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (3).webp","/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (4).webp","/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (5).webp"],"GLASS":["/Dacia/Dokker/Dokker (2012–2024)/Glass (1).webp","/Dacia/Dokker/Dokker (2012–2024)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Dokker/Dokker (2012–2024)/Cover (1).jpg","/Dacia/Dokker/Dokker (2012–2024)/Cover (2).jpg","/Dacia/Dokker/Dokker (2012–2024)/Cover (3).webp","/Dacia/Dokker/Dokker (2012–2024)/Cover (4).webp"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Dokker' limit 1)
insert into car_model_years (model_id, year) select m.id, 2018 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Dokker', 2018, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (1).webp","/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (2).webp","/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (3).webp","/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (4).webp","/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (5).webp"],"GLASS":["/Dacia/Dokker/Dokker (2012–2024)/Glass (1).webp","/Dacia/Dokker/Dokker (2012–2024)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Dokker/Dokker (2012–2024)/Cover (1).jpg","/Dacia/Dokker/Dokker (2012–2024)/Cover (2).jpg","/Dacia/Dokker/Dokker (2012–2024)/Cover (3).webp","/Dacia/Dokker/Dokker (2012–2024)/Cover (4).webp"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Dokker' limit 1)
insert into car_model_years (model_id, year) select m.id, 2019 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Dokker', 2019, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (1).webp","/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (2).webp","/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (3).webp","/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (4).webp","/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (5).webp"],"GLASS":["/Dacia/Dokker/Dokker (2012–2024)/Glass (1).webp","/Dacia/Dokker/Dokker (2012–2024)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Dokker/Dokker (2012–2024)/Cover (1).jpg","/Dacia/Dokker/Dokker (2012–2024)/Cover (2).jpg","/Dacia/Dokker/Dokker (2012–2024)/Cover (3).webp","/Dacia/Dokker/Dokker (2012–2024)/Cover (4).webp"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Dokker' limit 1)
insert into car_model_years (model_id, year) select m.id, 2020 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Dokker', 2020, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (1).webp","/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (2).webp","/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (3).webp","/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (4).webp","/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (5).webp"],"GLASS":["/Dacia/Dokker/Dokker (2012–2024)/Glass (1).webp","/Dacia/Dokker/Dokker (2012–2024)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Dokker/Dokker (2012–2024)/Cover (1).jpg","/Dacia/Dokker/Dokker (2012–2024)/Cover (2).jpg","/Dacia/Dokker/Dokker (2012–2024)/Cover (3).webp","/Dacia/Dokker/Dokker (2012–2024)/Cover (4).webp"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Dokker' limit 1)
insert into car_model_years (model_id, year) select m.id, 2021 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Dokker', 2021, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (1).webp","/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (2).webp","/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (3).webp","/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (4).webp","/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (5).webp"],"GLASS":["/Dacia/Dokker/Dokker (2012–2024)/Glass (1).webp","/Dacia/Dokker/Dokker (2012–2024)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Dokker/Dokker (2012–2024)/Cover (1).jpg","/Dacia/Dokker/Dokker (2012–2024)/Cover (2).jpg","/Dacia/Dokker/Dokker (2012–2024)/Cover (3).webp","/Dacia/Dokker/Dokker (2012–2024)/Cover (4).webp"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Dokker' limit 1)
insert into car_model_years (model_id, year) select m.id, 2022 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Dokker', 2022, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (1).webp","/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (2).webp","/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (3).webp","/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (4).webp","/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (5).webp"],"GLASS":["/Dacia/Dokker/Dokker (2012–2024)/Glass (1).webp","/Dacia/Dokker/Dokker (2012–2024)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Dokker/Dokker (2012–2024)/Cover (1).jpg","/Dacia/Dokker/Dokker (2012–2024)/Cover (2).jpg","/Dacia/Dokker/Dokker (2012–2024)/Cover (3).webp","/Dacia/Dokker/Dokker (2012–2024)/Cover (4).webp"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Dokker' limit 1)
insert into car_model_years (model_id, year) select m.id, 2023 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Dokker', 2023, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (1).webp","/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (2).webp","/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (3).webp","/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (4).webp","/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (5).webp"],"GLASS":["/Dacia/Dokker/Dokker (2012–2024)/Glass (1).webp","/Dacia/Dokker/Dokker (2012–2024)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Dokker/Dokker (2012–2024)/Cover (1).jpg","/Dacia/Dokker/Dokker (2012–2024)/Cover (2).jpg","/Dacia/Dokker/Dokker (2012–2024)/Cover (3).webp","/Dacia/Dokker/Dokker (2012–2024)/Cover (4).webp"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Dokker' limit 1)
insert into car_model_years (model_id, year) select m.id, 2024 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Dokker', 2024, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (1).webp","/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (2).webp","/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (3).webp","/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (4).webp","/Dacia/Dokker/Dokker (2012–2024)/rétroviseur complet (5).webp"],"GLASS":["/Dacia/Dokker/Dokker (2012–2024)/Glass (1).webp","/Dacia/Dokker/Dokker (2012–2024)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Dokker/Dokker (2012–2024)/Cover (1).jpg","/Dacia/Dokker/Dokker (2012–2024)/Cover (2).jpg","/Dacia/Dokker/Dokker (2012–2024)/Cover (3).webp","/Dacia/Dokker/Dokker (2012–2024)/Cover (4).webp"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Duster' limit 1)
insert into car_model_years (model_id, year) select m.id, 2010 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Duster', 2010, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Duster/Duster 1 (2010–2013)/rétroviseur complet (1).webp","/Dacia/Duster/Duster 1 (2010–2013)/rétroviseur complet (2).webp","/Dacia/Duster/Duster 1 (2010–2013)/rétroviseur complet (3).webp"],"GLASS":["/Dacia/Duster/Duster 1 (2010–2013)/Glass (1).jpg"],"MIRROR":[],"COVER":["/Dacia/Duster/Duster 1 (2010–2013)/Cover (1).jpg"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Duster' limit 1)
insert into car_model_years (model_id, year) select m.id, 2011 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Duster', 2011, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Duster/Duster 1 (2010–2013)/rétroviseur complet (1).webp","/Dacia/Duster/Duster 1 (2010–2013)/rétroviseur complet (2).webp","/Dacia/Duster/Duster 1 (2010–2013)/rétroviseur complet (3).webp"],"GLASS":["/Dacia/Duster/Duster 1 (2010–2013)/Glass (1).jpg"],"MIRROR":[],"COVER":["/Dacia/Duster/Duster 1 (2010–2013)/Cover (1).jpg"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Duster' limit 1)
insert into car_model_years (model_id, year) select m.id, 2012 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Duster', 2012, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Duster/Duster 1 (2010–2013)/rétroviseur complet (1).webp","/Dacia/Duster/Duster 1 (2010–2013)/rétroviseur complet (2).webp","/Dacia/Duster/Duster 1 (2010–2013)/rétroviseur complet (3).webp"],"GLASS":["/Dacia/Duster/Duster 1 (2010–2013)/Glass (1).jpg"],"MIRROR":[],"COVER":["/Dacia/Duster/Duster 1 (2010–2013)/Cover (1).jpg"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Duster' limit 1)
insert into car_model_years (model_id, year) select m.id, 2013 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Duster', 2013, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Duster/Duster 1 (2013–2017)/rétroviseur complet (1).webp","/Dacia/Duster/Duster 1 (2013–2017)/rétroviseur complet (2).webp","/Dacia/Duster/Duster 1 (2013–2017)/rétroviseur complet (3).webp"],"GLASS":["/Dacia/Duster/Duster 1 (2013–2017)/Glass (1).webp","/Dacia/Duster/Duster 1 (2013–2017)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Duster/Duster 1 (2013–2017)/Cover (1).webp"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Duster' limit 1)
insert into car_model_years (model_id, year) select m.id, 2014 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Duster', 2014, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Duster/Duster 1 (2013–2017)/rétroviseur complet (1).webp","/Dacia/Duster/Duster 1 (2013–2017)/rétroviseur complet (2).webp","/Dacia/Duster/Duster 1 (2013–2017)/rétroviseur complet (3).webp"],"GLASS":["/Dacia/Duster/Duster 1 (2013–2017)/Glass (1).webp","/Dacia/Duster/Duster 1 (2013–2017)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Duster/Duster 1 (2013–2017)/Cover (1).webp"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Duster' limit 1)
insert into car_model_years (model_id, year) select m.id, 2015 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Duster', 2015, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Duster/Duster 1 (2013–2017)/rétroviseur complet (1).webp","/Dacia/Duster/Duster 1 (2013–2017)/rétroviseur complet (2).webp","/Dacia/Duster/Duster 1 (2013–2017)/rétroviseur complet (3).webp"],"GLASS":["/Dacia/Duster/Duster 1 (2013–2017)/Glass (1).webp","/Dacia/Duster/Duster 1 (2013–2017)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Duster/Duster 1 (2013–2017)/Cover (1).webp"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Duster' limit 1)
insert into car_model_years (model_id, year) select m.id, 2016 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Duster', 2016, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Duster/Duster 1 (2013–2017)/rétroviseur complet (1).webp","/Dacia/Duster/Duster 1 (2013–2017)/rétroviseur complet (2).webp","/Dacia/Duster/Duster 1 (2013–2017)/rétroviseur complet (3).webp"],"GLASS":["/Dacia/Duster/Duster 1 (2013–2017)/Glass (1).webp","/Dacia/Duster/Duster 1 (2013–2017)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Duster/Duster 1 (2013–2017)/Cover (1).webp"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Duster' limit 1)
insert into car_model_years (model_id, year) select m.id, 2017 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Duster', 2017, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Duster/Duster 1 (2013–2017)/rétroviseur complet (1).webp","/Dacia/Duster/Duster 1 (2013–2017)/rétroviseur complet (2).webp","/Dacia/Duster/Duster 1 (2013–2017)/rétroviseur complet (3).webp"],"GLASS":["/Dacia/Duster/Duster 1 (2013–2017)/Glass (1).webp","/Dacia/Duster/Duster 1 (2013–2017)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Duster/Duster 1 (2013–2017)/Cover (1).webp"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Duster' limit 1)
insert into car_model_years (model_id, year) select m.id, 2018 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Duster', 2018, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Duster/Duster 2 (2018–2023)/rétroviseur complet (1).webp","/Dacia/Duster/Duster 2 (2018–2023)/rétroviseur complet (2).webp","/Dacia/Duster/Duster 2 (2018–2023)/rétroviseur complet (3).webp","/Dacia/Duster/Duster 2 (2018–2023)/rétroviseur complet (4).webp","/Dacia/Duster/Duster 2 (2018–2023)/rétroviseur complet (5).webp"],"GLASS":["/Dacia/Duster/Duster 2 (2018–2023)/Glass (1).webp","/Dacia/Duster/Duster 2 (2018–2023)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Duster/Duster 2 (2018–2023)/Cover (1).webp"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Duster' limit 1)
insert into car_model_years (model_id, year) select m.id, 2019 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Duster', 2019, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Duster/Duster 2 (2018–2023)/rétroviseur complet (1).webp","/Dacia/Duster/Duster 2 (2018–2023)/rétroviseur complet (2).webp","/Dacia/Duster/Duster 2 (2018–2023)/rétroviseur complet (3).webp","/Dacia/Duster/Duster 2 (2018–2023)/rétroviseur complet (4).webp","/Dacia/Duster/Duster 2 (2018–2023)/rétroviseur complet (5).webp"],"GLASS":["/Dacia/Duster/Duster 2 (2018–2023)/Glass (1).webp","/Dacia/Duster/Duster 2 (2018–2023)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Duster/Duster 2 (2018–2023)/Cover (1).webp"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Duster' limit 1)
insert into car_model_years (model_id, year) select m.id, 2020 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Duster', 2020, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Duster/Duster 2 (2018–2023)/rétroviseur complet (1).webp","/Dacia/Duster/Duster 2 (2018–2023)/rétroviseur complet (2).webp","/Dacia/Duster/Duster 2 (2018–2023)/rétroviseur complet (3).webp","/Dacia/Duster/Duster 2 (2018–2023)/rétroviseur complet (4).webp","/Dacia/Duster/Duster 2 (2018–2023)/rétroviseur complet (5).webp"],"GLASS":["/Dacia/Duster/Duster 2 (2018–2023)/Glass (1).webp","/Dacia/Duster/Duster 2 (2018–2023)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Duster/Duster 2 (2018–2023)/Cover (1).webp"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Duster' limit 1)
insert into car_model_years (model_id, year) select m.id, 2021 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Duster', 2021, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Duster/Duster 2 (2018–2023)/rétroviseur complet (1).webp","/Dacia/Duster/Duster 2 (2018–2023)/rétroviseur complet (2).webp","/Dacia/Duster/Duster 2 (2018–2023)/rétroviseur complet (3).webp","/Dacia/Duster/Duster 2 (2018–2023)/rétroviseur complet (4).webp","/Dacia/Duster/Duster 2 (2018–2023)/rétroviseur complet (5).webp"],"GLASS":["/Dacia/Duster/Duster 2 (2018–2023)/Glass (1).webp","/Dacia/Duster/Duster 2 (2018–2023)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Duster/Duster 2 (2018–2023)/Cover (1).webp"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Duster' limit 1)
insert into car_model_years (model_id, year) select m.id, 2022 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Duster', 2022, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Duster/Duster 2 (2018–2023)/rétroviseur complet (1).webp","/Dacia/Duster/Duster 2 (2018–2023)/rétroviseur complet (2).webp","/Dacia/Duster/Duster 2 (2018–2023)/rétroviseur complet (3).webp","/Dacia/Duster/Duster 2 (2018–2023)/rétroviseur complet (4).webp","/Dacia/Duster/Duster 2 (2018–2023)/rétroviseur complet (5).webp"],"GLASS":["/Dacia/Duster/Duster 2 (2018–2023)/Glass (1).webp","/Dacia/Duster/Duster 2 (2018–2023)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Duster/Duster 2 (2018–2023)/Cover (1).webp"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Duster' limit 1)
insert into car_model_years (model_id, year) select m.id, 2023 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Duster', 2023, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Duster/Duster 2 (2018–2023)/rétroviseur complet (1).webp","/Dacia/Duster/Duster 2 (2018–2023)/rétroviseur complet (2).webp","/Dacia/Duster/Duster 2 (2018–2023)/rétroviseur complet (3).webp","/Dacia/Duster/Duster 2 (2018–2023)/rétroviseur complet (4).webp","/Dacia/Duster/Duster 2 (2018–2023)/rétroviseur complet (5).webp"],"GLASS":["/Dacia/Duster/Duster 2 (2018–2023)/Glass (1).webp","/Dacia/Duster/Duster 2 (2018–2023)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Duster/Duster 2 (2018–2023)/Cover (1).webp"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Duster' limit 1)
insert into car_model_years (model_id, year) select m.id, 2024 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Duster', 2024, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Duster/Duster 3 (2024–présent)/rétroviseur complet (1).jpg","/Dacia/Duster/Duster 3 (2024–présent)/rétroviseur complet (2).jpg"],"GLASS":["/Dacia/Duster/Duster 3 (2024–présent)/Glass (1).jpg","/Dacia/Duster/Duster 3 (2024–présent)/Glass (2).jpg","/Dacia/Duster/Duster 3 (2024–présent)/Glass (3).webp","/Dacia/Duster/Duster 3 (2024–présent)/Glass (4).webp"],"MIRROR":[],"COVER":["/Dacia/Duster/Duster 3 (2024–présent)/Cover (1).webp","/Dacia/Duster/Duster 3 (2024–présent)/Cover (2).webp"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Duster' limit 1)
insert into car_model_years (model_id, year) select m.id, 2025 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Duster', 2025, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Duster/Duster 3 (2024–présent)/rétroviseur complet (1).jpg","/Dacia/Duster/Duster 3 (2024–présent)/rétroviseur complet (2).jpg"],"GLASS":["/Dacia/Duster/Duster 3 (2024–présent)/Glass (1).jpg","/Dacia/Duster/Duster 3 (2024–présent)/Glass (2).jpg","/Dacia/Duster/Duster 3 (2024–présent)/Glass (3).webp","/Dacia/Duster/Duster 3 (2024–présent)/Glass (4).webp"],"MIRROR":[],"COVER":["/Dacia/Duster/Duster 3 (2024–présent)/Cover (1).webp","/Dacia/Duster/Duster 3 (2024–présent)/Cover (2).webp"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Duster' limit 1)
insert into car_model_years (model_id, year) select m.id, 2026 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Duster', 2026, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Duster/Duster 3 (2024–présent)/rétroviseur complet (1).jpg","/Dacia/Duster/Duster 3 (2024–présent)/rétroviseur complet (2).jpg"],"GLASS":["/Dacia/Duster/Duster 3 (2024–présent)/Glass (1).jpg","/Dacia/Duster/Duster 3 (2024–présent)/Glass (2).jpg","/Dacia/Duster/Duster 3 (2024–présent)/Glass (3).webp","/Dacia/Duster/Duster 3 (2024–présent)/Glass (4).webp"],"MIRROR":[],"COVER":["/Dacia/Duster/Duster 3 (2024–présent)/Cover (1).webp","/Dacia/Duster/Duster 3 (2024–présent)/Cover (2).webp"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Jogger' limit 1)
insert into car_model_years (model_id, year) select m.id, 2021 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Jogger', 2021, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Jogger/Jogger (2021–présent)/rétroviseur complet (1).webp","/Dacia/Jogger/Jogger (2021–présent)/rétroviseur complet (2).webp"],"GLASS":["/Dacia/Jogger/Jogger (2021–présent)/Glass (1).webp","/Dacia/Jogger/Jogger (2021–présent)/Glass (2).webp","/Dacia/Jogger/Jogger (2021–présent)/Glass (3).webp","/Dacia/Jogger/Jogger (2021–présent)/Glass (4).webp"],"MIRROR":[],"COVER":["/Dacia/Jogger/Jogger (2021–présent)/Cover (1).webp","/Dacia/Jogger/Jogger (2021–présent)/Cover (2).webp"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Jogger' limit 1)
insert into car_model_years (model_id, year) select m.id, 2022 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Jogger', 2022, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Jogger/Jogger (2021–présent)/rétroviseur complet (1).webp","/Dacia/Jogger/Jogger (2021–présent)/rétroviseur complet (2).webp"],"GLASS":["/Dacia/Jogger/Jogger (2021–présent)/Glass (1).webp","/Dacia/Jogger/Jogger (2021–présent)/Glass (2).webp","/Dacia/Jogger/Jogger (2021–présent)/Glass (3).webp","/Dacia/Jogger/Jogger (2021–présent)/Glass (4).webp"],"MIRROR":[],"COVER":["/Dacia/Jogger/Jogger (2021–présent)/Cover (1).webp","/Dacia/Jogger/Jogger (2021–présent)/Cover (2).webp"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Jogger' limit 1)
insert into car_model_years (model_id, year) select m.id, 2023 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Jogger', 2023, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Jogger/Jogger (2021–présent)/rétroviseur complet (1).webp","/Dacia/Jogger/Jogger (2021–présent)/rétroviseur complet (2).webp"],"GLASS":["/Dacia/Jogger/Jogger (2021–présent)/Glass (1).webp","/Dacia/Jogger/Jogger (2021–présent)/Glass (2).webp","/Dacia/Jogger/Jogger (2021–présent)/Glass (3).webp","/Dacia/Jogger/Jogger (2021–présent)/Glass (4).webp"],"MIRROR":[],"COVER":["/Dacia/Jogger/Jogger (2021–présent)/Cover (1).webp","/Dacia/Jogger/Jogger (2021–présent)/Cover (2).webp"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Jogger' limit 1)
insert into car_model_years (model_id, year) select m.id, 2024 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Jogger', 2024, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Jogger/Jogger (2021–présent)/rétroviseur complet (1).webp","/Dacia/Jogger/Jogger (2021–présent)/rétroviseur complet (2).webp"],"GLASS":["/Dacia/Jogger/Jogger (2021–présent)/Glass (1).webp","/Dacia/Jogger/Jogger (2021–présent)/Glass (2).webp","/Dacia/Jogger/Jogger (2021–présent)/Glass (3).webp","/Dacia/Jogger/Jogger (2021–présent)/Glass (4).webp"],"MIRROR":[],"COVER":["/Dacia/Jogger/Jogger (2021–présent)/Cover (1).webp","/Dacia/Jogger/Jogger (2021–présent)/Cover (2).webp"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Jogger' limit 1)
insert into car_model_years (model_id, year) select m.id, 2025 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Jogger', 2025, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Jogger/Jogger (2021–présent)/rétroviseur complet (1).webp","/Dacia/Jogger/Jogger (2021–présent)/rétroviseur complet (2).webp"],"GLASS":["/Dacia/Jogger/Jogger (2021–présent)/Glass (1).webp","/Dacia/Jogger/Jogger (2021–présent)/Glass (2).webp","/Dacia/Jogger/Jogger (2021–présent)/Glass (3).webp","/Dacia/Jogger/Jogger (2021–présent)/Glass (4).webp"],"MIRROR":[],"COVER":["/Dacia/Jogger/Jogger (2021–présent)/Cover (1).webp","/Dacia/Jogger/Jogger (2021–présent)/Cover (2).webp"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Jogger' limit 1)
insert into car_model_years (model_id, year) select m.id, 2026 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Jogger', 2026, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Jogger/Jogger (2021–présent)/rétroviseur complet (1).webp","/Dacia/Jogger/Jogger (2021–présent)/rétroviseur complet (2).webp"],"GLASS":["/Dacia/Jogger/Jogger (2021–présent)/Glass (1).webp","/Dacia/Jogger/Jogger (2021–présent)/Glass (2).webp","/Dacia/Jogger/Jogger (2021–présent)/Glass (3).webp","/Dacia/Jogger/Jogger (2021–présent)/Glass (4).webp"],"MIRROR":[],"COVER":["/Dacia/Jogger/Jogger (2021–présent)/Cover (1).webp","/Dacia/Jogger/Jogger (2021–présent)/Cover (2).webp"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Lodgy' limit 1)
insert into car_model_years (model_id, year) select m.id, 2012 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Lodgy', 2012, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Lodgy/Dacia Lodgy (2012–2022)/rétroviseur complet (1).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/rétroviseur complet (2).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/rétroviseur complet (3).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/rétroviseur complet (4).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/rétroviseur complet (5).webp"],"GLASS":["/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Glass (1).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Cover (1).jpg","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Cover (2).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Cover (3).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Cover (4).jpg"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Lodgy' limit 1)
insert into car_model_years (model_id, year) select m.id, 2013 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Lodgy', 2013, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Lodgy/Dacia Lodgy (2012–2022)/rétroviseur complet (1).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/rétroviseur complet (2).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/rétroviseur complet (3).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/rétroviseur complet (4).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/rétroviseur complet (5).webp"],"GLASS":["/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Glass (1).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Cover (1).jpg","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Cover (2).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Cover (3).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Cover (4).jpg"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Lodgy' limit 1)
insert into car_model_years (model_id, year) select m.id, 2014 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Lodgy', 2014, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Lodgy/Dacia Lodgy (2012–2022)/rétroviseur complet (1).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/rétroviseur complet (2).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/rétroviseur complet (3).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/rétroviseur complet (4).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/rétroviseur complet (5).webp"],"GLASS":["/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Glass (1).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Cover (1).jpg","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Cover (2).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Cover (3).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Cover (4).jpg"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Lodgy' limit 1)
insert into car_model_years (model_id, year) select m.id, 2015 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Lodgy', 2015, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Lodgy/Dacia Lodgy (2012–2022)/rétroviseur complet (1).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/rétroviseur complet (2).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/rétroviseur complet (3).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/rétroviseur complet (4).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/rétroviseur complet (5).webp"],"GLASS":["/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Glass (1).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Cover (1).jpg","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Cover (2).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Cover (3).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Cover (4).jpg"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Lodgy' limit 1)
insert into car_model_years (model_id, year) select m.id, 2016 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Lodgy', 2016, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Lodgy/Dacia Lodgy (2012–2022)/rétroviseur complet (1).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/rétroviseur complet (2).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/rétroviseur complet (3).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/rétroviseur complet (4).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/rétroviseur complet (5).webp"],"GLASS":["/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Glass (1).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Cover (1).jpg","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Cover (2).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Cover (3).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Cover (4).jpg"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Lodgy' limit 1)
insert into car_model_years (model_id, year) select m.id, 2017 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Lodgy', 2017, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Lodgy/Dacia Lodgy (2012–2022)/rétroviseur complet (1).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/rétroviseur complet (2).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/rétroviseur complet (3).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/rétroviseur complet (4).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/rétroviseur complet (5).webp"],"GLASS":["/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Glass (1).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Cover (1).jpg","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Cover (2).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Cover (3).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Cover (4).jpg"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Lodgy' limit 1)
insert into car_model_years (model_id, year) select m.id, 2018 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Lodgy', 2018, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Lodgy/Dacia Lodgy (2012–2022)/rétroviseur complet (1).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/rétroviseur complet (2).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/rétroviseur complet (3).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/rétroviseur complet (4).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/rétroviseur complet (5).webp"],"GLASS":["/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Glass (1).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Cover (1).jpg","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Cover (2).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Cover (3).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Cover (4).jpg"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Lodgy' limit 1)
insert into car_model_years (model_id, year) select m.id, 2019 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Lodgy', 2019, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Lodgy/Dacia Lodgy (2012–2022)/rétroviseur complet (1).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/rétroviseur complet (2).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/rétroviseur complet (3).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/rétroviseur complet (4).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/rétroviseur complet (5).webp"],"GLASS":["/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Glass (1).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Cover (1).jpg","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Cover (2).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Cover (3).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Cover (4).jpg"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Lodgy' limit 1)
insert into car_model_years (model_id, year) select m.id, 2020 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Lodgy', 2020, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Lodgy/Dacia Lodgy (2012–2022)/rétroviseur complet (1).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/rétroviseur complet (2).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/rétroviseur complet (3).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/rétroviseur complet (4).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/rétroviseur complet (5).webp"],"GLASS":["/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Glass (1).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Cover (1).jpg","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Cover (2).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Cover (3).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Cover (4).jpg"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Lodgy' limit 1)
insert into car_model_years (model_id, year) select m.id, 2021 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Lodgy', 2021, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Lodgy/Dacia Lodgy (2012–2022)/rétroviseur complet (1).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/rétroviseur complet (2).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/rétroviseur complet (3).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/rétroviseur complet (4).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/rétroviseur complet (5).webp"],"GLASS":["/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Glass (1).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Cover (1).jpg","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Cover (2).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Cover (3).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Cover (4).jpg"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Lodgy' limit 1)
insert into car_model_years (model_id, year) select m.id, 2022 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Lodgy', 2022, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Lodgy/Dacia Lodgy (2012–2022)/rétroviseur complet (1).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/rétroviseur complet (2).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/rétroviseur complet (3).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/rétroviseur complet (4).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/rétroviseur complet (5).webp"],"GLASS":["/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Glass (1).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Cover (1).jpg","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Cover (2).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Cover (3).webp","/Dacia/Lodgy/Dacia Lodgy (2012–2022)/Cover (4).jpg"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Logan' limit 1)
insert into car_model_years (model_id, year) select m.id, 2004 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Logan', 2004, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Logan/Logan 1 (2004–2012)/rétroviseur complet (1).webp","/Dacia/Logan/Logan 1 (2004–2012)/rétroviseur complet (2).webp","/Dacia/Logan/Logan 1 (2004–2012)/rétroviseur complet (3).webp","/Dacia/Logan/Logan 1 (2004–2012)/rétroviseur complet (4).webp"],"GLASS":["/Dacia/Logan/Logan 1 (2004–2012)/Glass (1).webp","/Dacia/Logan/Logan 1 (2004–2012)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Logan/Logan 1 (2004–2012)/Cover (1).jpg","/Dacia/Logan/Logan 1 (2004–2012)/Cover (2).jpg"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Logan' limit 1)
insert into car_model_years (model_id, year) select m.id, 2005 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Logan', 2005, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Logan/Logan 1 (2004–2012)/rétroviseur complet (1).webp","/Dacia/Logan/Logan 1 (2004–2012)/rétroviseur complet (2).webp","/Dacia/Logan/Logan 1 (2004–2012)/rétroviseur complet (3).webp","/Dacia/Logan/Logan 1 (2004–2012)/rétroviseur complet (4).webp"],"GLASS":["/Dacia/Logan/Logan 1 (2004–2012)/Glass (1).webp","/Dacia/Logan/Logan 1 (2004–2012)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Logan/Logan 1 (2004–2012)/Cover (1).jpg","/Dacia/Logan/Logan 1 (2004–2012)/Cover (2).jpg"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Logan' limit 1)
insert into car_model_years (model_id, year) select m.id, 2006 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Logan', 2006, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Logan/Logan 1 (2004–2012)/rétroviseur complet (1).webp","/Dacia/Logan/Logan 1 (2004–2012)/rétroviseur complet (2).webp","/Dacia/Logan/Logan 1 (2004–2012)/rétroviseur complet (3).webp","/Dacia/Logan/Logan 1 (2004–2012)/rétroviseur complet (4).webp"],"GLASS":["/Dacia/Logan/Logan 1 (2004–2012)/Glass (1).webp","/Dacia/Logan/Logan 1 (2004–2012)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Logan/Logan 1 (2004–2012)/Cover (1).jpg","/Dacia/Logan/Logan 1 (2004–2012)/Cover (2).jpg"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Logan' limit 1)
insert into car_model_years (model_id, year) select m.id, 2007 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Logan', 2007, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Logan/Logan 1 (2004–2012)/rétroviseur complet (1).webp","/Dacia/Logan/Logan 1 (2004–2012)/rétroviseur complet (2).webp","/Dacia/Logan/Logan 1 (2004–2012)/rétroviseur complet (3).webp","/Dacia/Logan/Logan 1 (2004–2012)/rétroviseur complet (4).webp"],"GLASS":["/Dacia/Logan/Logan 1 (2004–2012)/Glass (1).webp","/Dacia/Logan/Logan 1 (2004–2012)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Logan/Logan 1 (2004–2012)/Cover (1).jpg","/Dacia/Logan/Logan 1 (2004–2012)/Cover (2).jpg"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Logan' limit 1)
insert into car_model_years (model_id, year) select m.id, 2008 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Logan', 2008, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Logan/Logan 1 (2004–2012)/rétroviseur complet (1).webp","/Dacia/Logan/Logan 1 (2004–2012)/rétroviseur complet (2).webp","/Dacia/Logan/Logan 1 (2004–2012)/rétroviseur complet (3).webp","/Dacia/Logan/Logan 1 (2004–2012)/rétroviseur complet (4).webp"],"GLASS":["/Dacia/Logan/Logan 1 (2004–2012)/Glass (1).webp","/Dacia/Logan/Logan 1 (2004–2012)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Logan/Logan 1 (2004–2012)/Cover (1).jpg","/Dacia/Logan/Logan 1 (2004–2012)/Cover (2).jpg"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Logan' limit 1)
insert into car_model_years (model_id, year) select m.id, 2009 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Logan', 2009, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Logan/Logan 1 (2004–2012)/rétroviseur complet (1).webp","/Dacia/Logan/Logan 1 (2004–2012)/rétroviseur complet (2).webp","/Dacia/Logan/Logan 1 (2004–2012)/rétroviseur complet (3).webp","/Dacia/Logan/Logan 1 (2004–2012)/rétroviseur complet (4).webp"],"GLASS":["/Dacia/Logan/Logan 1 (2004–2012)/Glass (1).webp","/Dacia/Logan/Logan 1 (2004–2012)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Logan/Logan 1 (2004–2012)/Cover (1).jpg","/Dacia/Logan/Logan 1 (2004–2012)/Cover (2).jpg"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Logan' limit 1)
insert into car_model_years (model_id, year) select m.id, 2010 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Logan', 2010, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Logan/Logan 1 (2004–2012)/rétroviseur complet (1).webp","/Dacia/Logan/Logan 1 (2004–2012)/rétroviseur complet (2).webp","/Dacia/Logan/Logan 1 (2004–2012)/rétroviseur complet (3).webp","/Dacia/Logan/Logan 1 (2004–2012)/rétroviseur complet (4).webp"],"GLASS":["/Dacia/Logan/Logan 1 (2004–2012)/Glass (1).webp","/Dacia/Logan/Logan 1 (2004–2012)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Logan/Logan 1 (2004–2012)/Cover (1).jpg","/Dacia/Logan/Logan 1 (2004–2012)/Cover (2).jpg"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Logan' limit 1)
insert into car_model_years (model_id, year) select m.id, 2011 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Logan', 2011, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Logan/Logan 1 (2004–2012)/rétroviseur complet (1).webp","/Dacia/Logan/Logan 1 (2004–2012)/rétroviseur complet (2).webp","/Dacia/Logan/Logan 1 (2004–2012)/rétroviseur complet (3).webp","/Dacia/Logan/Logan 1 (2004–2012)/rétroviseur complet (4).webp"],"GLASS":["/Dacia/Logan/Logan 1 (2004–2012)/Glass (1).webp","/Dacia/Logan/Logan 1 (2004–2012)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Logan/Logan 1 (2004–2012)/Cover (1).jpg","/Dacia/Logan/Logan 1 (2004–2012)/Cover (2).jpg"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Logan' limit 1)
insert into car_model_years (model_id, year) select m.id, 2012 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Logan', 2012, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Logan/Logan 2 (2012–2020)/rétroviseur complet (1).webp","/Dacia/Logan/Logan 2 (2012–2020)/rétroviseur complet (2).webp","/Dacia/Logan/Logan 2 (2012–2020)/rétroviseur complet (3).webp","/Dacia/Logan/Logan 2 (2012–2020)/rétroviseur complet (4).webp","/Dacia/Logan/Logan 2 (2012–2020)/rétroviseur complet (5).webp","/Dacia/Logan/Logan 2 (2012–2020)/rétroviseur complet (6).webp"],"GLASS":["/Dacia/Logan/Logan 2 (2012–2020)/Glass (1).webp","/Dacia/Logan/Logan 2 (2012–2020)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Logan/Logan 2 (2012–2020)/Cover (1).webp","/Dacia/Logan/Logan 2 (2012–2020)/Cover (2).webp","/Dacia/Logan/Logan 2 (2012–2020)/Cover (3).jpg","/Dacia/Logan/Logan 2 (2012–2020)/Cover (4).jpg"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Logan' limit 1)
insert into car_model_years (model_id, year) select m.id, 2013 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Logan', 2013, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Logan/Logan 2 (2012–2020)/rétroviseur complet (1).webp","/Dacia/Logan/Logan 2 (2012–2020)/rétroviseur complet (2).webp","/Dacia/Logan/Logan 2 (2012–2020)/rétroviseur complet (3).webp","/Dacia/Logan/Logan 2 (2012–2020)/rétroviseur complet (4).webp","/Dacia/Logan/Logan 2 (2012–2020)/rétroviseur complet (5).webp","/Dacia/Logan/Logan 2 (2012–2020)/rétroviseur complet (6).webp"],"GLASS":["/Dacia/Logan/Logan 2 (2012–2020)/Glass (1).webp","/Dacia/Logan/Logan 2 (2012–2020)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Logan/Logan 2 (2012–2020)/Cover (1).webp","/Dacia/Logan/Logan 2 (2012–2020)/Cover (2).webp","/Dacia/Logan/Logan 2 (2012–2020)/Cover (3).jpg","/Dacia/Logan/Logan 2 (2012–2020)/Cover (4).jpg"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Logan' limit 1)
insert into car_model_years (model_id, year) select m.id, 2014 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Logan', 2014, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Logan/Logan 2 (2012–2020)/rétroviseur complet (1).webp","/Dacia/Logan/Logan 2 (2012–2020)/rétroviseur complet (2).webp","/Dacia/Logan/Logan 2 (2012–2020)/rétroviseur complet (3).webp","/Dacia/Logan/Logan 2 (2012–2020)/rétroviseur complet (4).webp","/Dacia/Logan/Logan 2 (2012–2020)/rétroviseur complet (5).webp","/Dacia/Logan/Logan 2 (2012–2020)/rétroviseur complet (6).webp"],"GLASS":["/Dacia/Logan/Logan 2 (2012–2020)/Glass (1).webp","/Dacia/Logan/Logan 2 (2012–2020)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Logan/Logan 2 (2012–2020)/Cover (1).webp","/Dacia/Logan/Logan 2 (2012–2020)/Cover (2).webp","/Dacia/Logan/Logan 2 (2012–2020)/Cover (3).jpg","/Dacia/Logan/Logan 2 (2012–2020)/Cover (4).jpg"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Logan' limit 1)
insert into car_model_years (model_id, year) select m.id, 2015 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Logan', 2015, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Logan/Logan 2 (2012–2020)/rétroviseur complet (1).webp","/Dacia/Logan/Logan 2 (2012–2020)/rétroviseur complet (2).webp","/Dacia/Logan/Logan 2 (2012–2020)/rétroviseur complet (3).webp","/Dacia/Logan/Logan 2 (2012–2020)/rétroviseur complet (4).webp","/Dacia/Logan/Logan 2 (2012–2020)/rétroviseur complet (5).webp","/Dacia/Logan/Logan 2 (2012–2020)/rétroviseur complet (6).webp"],"GLASS":["/Dacia/Logan/Logan 2 (2012–2020)/Glass (1).webp","/Dacia/Logan/Logan 2 (2012–2020)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Logan/Logan 2 (2012–2020)/Cover (1).webp","/Dacia/Logan/Logan 2 (2012–2020)/Cover (2).webp","/Dacia/Logan/Logan 2 (2012–2020)/Cover (3).jpg","/Dacia/Logan/Logan 2 (2012–2020)/Cover (4).jpg"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Logan' limit 1)
insert into car_model_years (model_id, year) select m.id, 2016 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Logan', 2016, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Logan/Logan 2 (2012–2020)/rétroviseur complet (1).webp","/Dacia/Logan/Logan 2 (2012–2020)/rétroviseur complet (2).webp","/Dacia/Logan/Logan 2 (2012–2020)/rétroviseur complet (3).webp","/Dacia/Logan/Logan 2 (2012–2020)/rétroviseur complet (4).webp","/Dacia/Logan/Logan 2 (2012–2020)/rétroviseur complet (5).webp","/Dacia/Logan/Logan 2 (2012–2020)/rétroviseur complet (6).webp"],"GLASS":["/Dacia/Logan/Logan 2 (2012–2020)/Glass (1).webp","/Dacia/Logan/Logan 2 (2012–2020)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Logan/Logan 2 (2012–2020)/Cover (1).webp","/Dacia/Logan/Logan 2 (2012–2020)/Cover (2).webp","/Dacia/Logan/Logan 2 (2012–2020)/Cover (3).jpg","/Dacia/Logan/Logan 2 (2012–2020)/Cover (4).jpg"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Logan' limit 1)
insert into car_model_years (model_id, year) select m.id, 2017 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Logan', 2017, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Logan/Logan 2 (2012–2020)/rétroviseur complet (1).webp","/Dacia/Logan/Logan 2 (2012–2020)/rétroviseur complet (2).webp","/Dacia/Logan/Logan 2 (2012–2020)/rétroviseur complet (3).webp","/Dacia/Logan/Logan 2 (2012–2020)/rétroviseur complet (4).webp","/Dacia/Logan/Logan 2 (2012–2020)/rétroviseur complet (5).webp","/Dacia/Logan/Logan 2 (2012–2020)/rétroviseur complet (6).webp"],"GLASS":["/Dacia/Logan/Logan 2 (2012–2020)/Glass (1).webp","/Dacia/Logan/Logan 2 (2012–2020)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Logan/Logan 2 (2012–2020)/Cover (1).webp","/Dacia/Logan/Logan 2 (2012–2020)/Cover (2).webp","/Dacia/Logan/Logan 2 (2012–2020)/Cover (3).jpg","/Dacia/Logan/Logan 2 (2012–2020)/Cover (4).jpg"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Logan' limit 1)
insert into car_model_years (model_id, year) select m.id, 2018 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Logan', 2018, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Logan/Logan 2 (2012–2020)/rétroviseur complet (1).webp","/Dacia/Logan/Logan 2 (2012–2020)/rétroviseur complet (2).webp","/Dacia/Logan/Logan 2 (2012–2020)/rétroviseur complet (3).webp","/Dacia/Logan/Logan 2 (2012–2020)/rétroviseur complet (4).webp","/Dacia/Logan/Logan 2 (2012–2020)/rétroviseur complet (5).webp","/Dacia/Logan/Logan 2 (2012–2020)/rétroviseur complet (6).webp"],"GLASS":["/Dacia/Logan/Logan 2 (2012–2020)/Glass (1).webp","/Dacia/Logan/Logan 2 (2012–2020)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Logan/Logan 2 (2012–2020)/Cover (1).webp","/Dacia/Logan/Logan 2 (2012–2020)/Cover (2).webp","/Dacia/Logan/Logan 2 (2012–2020)/Cover (3).jpg","/Dacia/Logan/Logan 2 (2012–2020)/Cover (4).jpg"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Logan' limit 1)
insert into car_model_years (model_id, year) select m.id, 2019 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Logan', 2019, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Logan/Logan 2 (2012–2020)/rétroviseur complet (1).webp","/Dacia/Logan/Logan 2 (2012–2020)/rétroviseur complet (2).webp","/Dacia/Logan/Logan 2 (2012–2020)/rétroviseur complet (3).webp","/Dacia/Logan/Logan 2 (2012–2020)/rétroviseur complet (4).webp","/Dacia/Logan/Logan 2 (2012–2020)/rétroviseur complet (5).webp","/Dacia/Logan/Logan 2 (2012–2020)/rétroviseur complet (6).webp"],"GLASS":["/Dacia/Logan/Logan 2 (2012–2020)/Glass (1).webp","/Dacia/Logan/Logan 2 (2012–2020)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Logan/Logan 2 (2012–2020)/Cover (1).webp","/Dacia/Logan/Logan 2 (2012–2020)/Cover (2).webp","/Dacia/Logan/Logan 2 (2012–2020)/Cover (3).jpg","/Dacia/Logan/Logan 2 (2012–2020)/Cover (4).jpg"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Logan' limit 1)
insert into car_model_years (model_id, year) select m.id, 2020 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Logan', 2020, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Logan/Logan 3 (2020–présent)/rétroviseur complet (1).webp","/Dacia/Logan/Logan 3 (2020–présent)/rétroviseur complet (2).webp","/Dacia/Logan/Logan 3 (2020–présent)/rétroviseur complet (3).webp"],"GLASS":["/Dacia/Logan/Logan 3 (2020–présent)/Glass (1).webp","/Dacia/Logan/Logan 3 (2020–présent)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Logan/Logan 3 (2020–présent)/Cover (1).jpg","/Dacia/Logan/Logan 3 (2020–présent)/Cover (2).jpg"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Logan' limit 1)
insert into car_model_years (model_id, year) select m.id, 2021 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Logan', 2021, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Logan/Logan 3 (2020–présent)/rétroviseur complet (1).webp","/Dacia/Logan/Logan 3 (2020–présent)/rétroviseur complet (2).webp","/Dacia/Logan/Logan 3 (2020–présent)/rétroviseur complet (3).webp"],"GLASS":["/Dacia/Logan/Logan 3 (2020–présent)/Glass (1).webp","/Dacia/Logan/Logan 3 (2020–présent)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Logan/Logan 3 (2020–présent)/Cover (1).jpg","/Dacia/Logan/Logan 3 (2020–présent)/Cover (2).jpg"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Logan' limit 1)
insert into car_model_years (model_id, year) select m.id, 2022 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Logan', 2022, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Logan/Logan 3 (2020–présent)/rétroviseur complet (1).webp","/Dacia/Logan/Logan 3 (2020–présent)/rétroviseur complet (2).webp","/Dacia/Logan/Logan 3 (2020–présent)/rétroviseur complet (3).webp"],"GLASS":["/Dacia/Logan/Logan 3 (2020–présent)/Glass (1).webp","/Dacia/Logan/Logan 3 (2020–présent)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Logan/Logan 3 (2020–présent)/Cover (1).jpg","/Dacia/Logan/Logan 3 (2020–présent)/Cover (2).jpg"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Logan' limit 1)
insert into car_model_years (model_id, year) select m.id, 2023 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Logan', 2023, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Logan/Logan 3 (2020–présent)/rétroviseur complet (1).webp","/Dacia/Logan/Logan 3 (2020–présent)/rétroviseur complet (2).webp","/Dacia/Logan/Logan 3 (2020–présent)/rétroviseur complet (3).webp"],"GLASS":["/Dacia/Logan/Logan 3 (2020–présent)/Glass (1).webp","/Dacia/Logan/Logan 3 (2020–présent)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Logan/Logan 3 (2020–présent)/Cover (1).jpg","/Dacia/Logan/Logan 3 (2020–présent)/Cover (2).jpg"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Logan' limit 1)
insert into car_model_years (model_id, year) select m.id, 2024 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Logan', 2024, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Logan/Logan 3 (2020–présent)/rétroviseur complet (1).webp","/Dacia/Logan/Logan 3 (2020–présent)/rétroviseur complet (2).webp","/Dacia/Logan/Logan 3 (2020–présent)/rétroviseur complet (3).webp"],"GLASS":["/Dacia/Logan/Logan 3 (2020–présent)/Glass (1).webp","/Dacia/Logan/Logan 3 (2020–présent)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Logan/Logan 3 (2020–présent)/Cover (1).jpg","/Dacia/Logan/Logan 3 (2020–présent)/Cover (2).jpg"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Logan' limit 1)
insert into car_model_years (model_id, year) select m.id, 2025 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Logan', 2025, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Logan/Logan 3 (2020–présent)/rétroviseur complet (1).webp","/Dacia/Logan/Logan 3 (2020–présent)/rétroviseur complet (2).webp","/Dacia/Logan/Logan 3 (2020–présent)/rétroviseur complet (3).webp"],"GLASS":["/Dacia/Logan/Logan 3 (2020–présent)/Glass (1).webp","/Dacia/Logan/Logan 3 (2020–présent)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Logan/Logan 3 (2020–présent)/Cover (1).jpg","/Dacia/Logan/Logan 3 (2020–présent)/Cover (2).jpg"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Logan' limit 1)
insert into car_model_years (model_id, year) select m.id, 2026 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Logan', 2026, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Logan/Logan 3 (2020–présent)/rétroviseur complet (1).webp","/Dacia/Logan/Logan 3 (2020–présent)/rétroviseur complet (2).webp","/Dacia/Logan/Logan 3 (2020–présent)/rétroviseur complet (3).webp"],"GLASS":["/Dacia/Logan/Logan 3 (2020–présent)/Glass (1).webp","/Dacia/Logan/Logan 3 (2020–présent)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Logan/Logan 3 (2020–présent)/Cover (1).jpg","/Dacia/Logan/Logan 3 (2020–présent)/Cover (2).jpg"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Sandero' limit 1)
insert into car_model_years (model_id, year) select m.id, 2008 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Sandero', 2008, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Sandero/Dacia Sandero 1 (2008-2012)/rétroviseur complet (1).webp","/Dacia/Sandero/Dacia Sandero 1 (2008-2012)/rétroviseur complet (2).webp","/Dacia/Sandero/Dacia Sandero 1 (2008-2012)/rétroviseur complet (3).webp","/Dacia/Sandero/Dacia Sandero 1 (2008-2012)/rétroviseur complet (4).webp","/Dacia/Sandero/Dacia Sandero 1 (2008-2012)/rétroviseur complet (5).webp","/Dacia/Sandero/Dacia Sandero 1 (2008-2012)/rétroviseur complet (6).webp"],"GLASS":["/Dacia/Sandero/Dacia Sandero 1 (2008-2012)/Glass (1).webp","/Dacia/Sandero/Dacia Sandero 1 (2008-2012)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Sandero/Dacia Sandero 1 (2008-2012)/Cover (1).jpg","/Dacia/Sandero/Dacia Sandero 1 (2008-2012)/Cover (2).jpg"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Sandero' limit 1)
insert into car_model_years (model_id, year) select m.id, 2009 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Sandero', 2009, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Sandero/Dacia Sandero 1 (2008-2012)/rétroviseur complet (1).webp","/Dacia/Sandero/Dacia Sandero 1 (2008-2012)/rétroviseur complet (2).webp","/Dacia/Sandero/Dacia Sandero 1 (2008-2012)/rétroviseur complet (3).webp","/Dacia/Sandero/Dacia Sandero 1 (2008-2012)/rétroviseur complet (4).webp","/Dacia/Sandero/Dacia Sandero 1 (2008-2012)/rétroviseur complet (5).webp","/Dacia/Sandero/Dacia Sandero 1 (2008-2012)/rétroviseur complet (6).webp"],"GLASS":["/Dacia/Sandero/Dacia Sandero 1 (2008-2012)/Glass (1).webp","/Dacia/Sandero/Dacia Sandero 1 (2008-2012)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Sandero/Dacia Sandero 1 (2008-2012)/Cover (1).jpg","/Dacia/Sandero/Dacia Sandero 1 (2008-2012)/Cover (2).jpg"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Sandero' limit 1)
insert into car_model_years (model_id, year) select m.id, 2010 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Sandero', 2010, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Sandero/Dacia Sandero 1 (2008-2012)/rétroviseur complet (1).webp","/Dacia/Sandero/Dacia Sandero 1 (2008-2012)/rétroviseur complet (2).webp","/Dacia/Sandero/Dacia Sandero 1 (2008-2012)/rétroviseur complet (3).webp","/Dacia/Sandero/Dacia Sandero 1 (2008-2012)/rétroviseur complet (4).webp","/Dacia/Sandero/Dacia Sandero 1 (2008-2012)/rétroviseur complet (5).webp","/Dacia/Sandero/Dacia Sandero 1 (2008-2012)/rétroviseur complet (6).webp"],"GLASS":["/Dacia/Sandero/Dacia Sandero 1 (2008-2012)/Glass (1).webp","/Dacia/Sandero/Dacia Sandero 1 (2008-2012)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Sandero/Dacia Sandero 1 (2008-2012)/Cover (1).jpg","/Dacia/Sandero/Dacia Sandero 1 (2008-2012)/Cover (2).jpg"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Sandero' limit 1)
insert into car_model_years (model_id, year) select m.id, 2011 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Sandero', 2011, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Sandero/Dacia Sandero 1 (2008-2012)/rétroviseur complet (1).webp","/Dacia/Sandero/Dacia Sandero 1 (2008-2012)/rétroviseur complet (2).webp","/Dacia/Sandero/Dacia Sandero 1 (2008-2012)/rétroviseur complet (3).webp","/Dacia/Sandero/Dacia Sandero 1 (2008-2012)/rétroviseur complet (4).webp","/Dacia/Sandero/Dacia Sandero 1 (2008-2012)/rétroviseur complet (5).webp","/Dacia/Sandero/Dacia Sandero 1 (2008-2012)/rétroviseur complet (6).webp"],"GLASS":["/Dacia/Sandero/Dacia Sandero 1 (2008-2012)/Glass (1).webp","/Dacia/Sandero/Dacia Sandero 1 (2008-2012)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Sandero/Dacia Sandero 1 (2008-2012)/Cover (1).jpg","/Dacia/Sandero/Dacia Sandero 1 (2008-2012)/Cover (2).jpg"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Sandero' limit 1)
insert into car_model_years (model_id, year) select m.id, 2012 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Sandero', 2012, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/rétroviseur complet (1).webp","/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/rétroviseur complet (2).webp","/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/rétroviseur complet (3).webp","/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/rétroviseur complet (4).webp"],"GLASS":["/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/Glass (1).webp","/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/Cover (1).jpg","/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/Cover (2).jpg"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Sandero' limit 1)
insert into car_model_years (model_id, year) select m.id, 2013 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Sandero', 2013, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/rétroviseur complet (1).webp","/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/rétroviseur complet (2).webp","/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/rétroviseur complet (3).webp","/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/rétroviseur complet (4).webp"],"GLASS":["/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/Glass (1).webp","/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/Cover (1).jpg","/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/Cover (2).jpg"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Sandero' limit 1)
insert into car_model_years (model_id, year) select m.id, 2014 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Sandero', 2014, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/rétroviseur complet (1).webp","/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/rétroviseur complet (2).webp","/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/rétroviseur complet (3).webp","/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/rétroviseur complet (4).webp"],"GLASS":["/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/Glass (1).webp","/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/Cover (1).jpg","/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/Cover (2).jpg"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Sandero' limit 1)
insert into car_model_years (model_id, year) select m.id, 2015 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Sandero', 2015, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/rétroviseur complet (1).webp","/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/rétroviseur complet (2).webp","/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/rétroviseur complet (3).webp","/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/rétroviseur complet (4).webp"],"GLASS":["/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/Glass (1).webp","/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/Cover (1).jpg","/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/Cover (2).jpg"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Sandero' limit 1)
insert into car_model_years (model_id, year) select m.id, 2016 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Sandero', 2016, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/rétroviseur complet (1).webp","/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/rétroviseur complet (2).webp","/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/rétroviseur complet (3).webp","/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/rétroviseur complet (4).webp"],"GLASS":["/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/Glass (1).webp","/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/Cover (1).jpg","/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/Cover (2).jpg"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Sandero' limit 1)
insert into car_model_years (model_id, year) select m.id, 2017 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Sandero', 2017, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/rétroviseur complet (1).webp","/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/rétroviseur complet (2).webp","/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/rétroviseur complet (3).webp","/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/rétroviseur complet (4).webp"],"GLASS":["/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/Glass (1).webp","/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/Cover (1).jpg","/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/Cover (2).jpg"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Sandero' limit 1)
insert into car_model_years (model_id, year) select m.id, 2018 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Sandero', 2018, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/rétroviseur complet (1).webp","/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/rétroviseur complet (2).webp","/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/rétroviseur complet (3).webp","/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/rétroviseur complet (4).webp"],"GLASS":["/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/Glass (1).webp","/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/Cover (1).jpg","/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/Cover (2).jpg"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Sandero' limit 1)
insert into car_model_years (model_id, year) select m.id, 2019 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Sandero', 2019, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/rétroviseur complet (1).webp","/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/rétroviseur complet (2).webp","/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/rétroviseur complet (3).webp","/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/rétroviseur complet (4).webp"],"GLASS":["/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/Glass (1).webp","/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/Cover (1).jpg","/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/Cover (2).jpg"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Sandero' limit 1)
insert into car_model_years (model_id, year) select m.id, 2020 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Sandero', 2020, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/rétroviseur complet (1).webp","/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/rétroviseur complet (2).webp","/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/rétroviseur complet (3).webp","/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/rétroviseur complet (4).webp"],"GLASS":["/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/Glass (1).webp","/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/Cover (1).jpg","/Dacia/Sandero/Dacia Sandero 2 (2012-2021)/Cover (2).jpg"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Sandero' limit 1)
insert into car_model_years (model_id, year) select m.id, 2021 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Sandero', 2021, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/rétroviseur complet (1).webp","/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/rétroviseur complet (2).webp","/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/rétroviseur complet (3).webp","/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/rétroviseur complet (4).webp","/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/rétroviseur complet (5).webp","/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/rétroviseur complet (6).webp"],"GLASS":["/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/Glass (1).webp","/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/Glass (2).webp","/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/Glass (3).webp","/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/Glass (4).webp"],"MIRROR":[],"COVER":["/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/Cover (1).webp","/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/Cover (2).webp"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Sandero' limit 1)
insert into car_model_years (model_id, year) select m.id, 2022 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Sandero', 2022, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/rétroviseur complet (1).webp","/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/rétroviseur complet (2).webp","/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/rétroviseur complet (3).webp","/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/rétroviseur complet (4).webp","/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/rétroviseur complet (5).webp","/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/rétroviseur complet (6).webp"],"GLASS":["/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/Glass (1).webp","/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/Glass (2).webp","/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/Glass (3).webp","/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/Glass (4).webp"],"MIRROR":[],"COVER":["/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/Cover (1).webp","/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/Cover (2).webp"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Sandero' limit 1)
insert into car_model_years (model_id, year) select m.id, 2023 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Sandero', 2023, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/rétroviseur complet (1).webp","/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/rétroviseur complet (2).webp","/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/rétroviseur complet (3).webp","/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/rétroviseur complet (4).webp","/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/rétroviseur complet (5).webp","/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/rétroviseur complet (6).webp"],"GLASS":["/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/Glass (1).webp","/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/Glass (2).webp","/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/Glass (3).webp","/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/Glass (4).webp"],"MIRROR":[],"COVER":["/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/Cover (1).webp","/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/Cover (2).webp"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Sandero' limit 1)
insert into car_model_years (model_id, year) select m.id, 2024 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Sandero', 2024, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/rétroviseur complet (1).webp","/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/rétroviseur complet (2).webp","/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/rétroviseur complet (3).webp","/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/rétroviseur complet (4).webp","/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/rétroviseur complet (5).webp","/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/rétroviseur complet (6).webp"],"GLASS":["/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/Glass (1).webp","/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/Glass (2).webp","/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/Glass (3).webp","/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/Glass (4).webp"],"MIRROR":[],"COVER":["/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/Cover (1).webp","/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/Cover (2).webp"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Sandero' limit 1)
insert into car_model_years (model_id, year) select m.id, 2025 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Sandero', 2025, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/rétroviseur complet (1).webp","/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/rétroviseur complet (2).webp","/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/rétroviseur complet (3).webp","/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/rétroviseur complet (4).webp","/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/rétroviseur complet (5).webp","/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/rétroviseur complet (6).webp"],"GLASS":["/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/Glass (1).webp","/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/Glass (2).webp","/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/Glass (3).webp","/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/Glass (4).webp"],"MIRROR":[],"COVER":["/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/Cover (1).webp","/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/Cover (2).webp"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Sandero' limit 1)
insert into car_model_years (model_id, year) select m.id, 2026 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Sandero', 2026, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/rétroviseur complet (1).webp","/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/rétroviseur complet (2).webp","/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/rétroviseur complet (3).webp","/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/rétroviseur complet (4).webp","/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/rétroviseur complet (5).webp","/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/rétroviseur complet (6).webp"],"GLASS":["/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/Glass (1).webp","/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/Glass (2).webp","/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/Glass (3).webp","/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/Glass (4).webp"],"MIRROR":[],"COVER":["/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/Cover (1).webp","/Dacia/Sandero/Dacia Sandero 3 (2021-2026)/Cover (2).webp"],"SINGLE":[]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Spring' limit 1)
insert into car_model_years (model_id, year) select m.id, 2021 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Spring', 2021, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER","SINGLE"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Spring/Spring (2021–présent)/rétroviseur complet (1).webp","/Dacia/Spring/Spring (2021–présent)/rétroviseur complet (2).webp","/Dacia/Spring/Spring (2021–présent)/rétroviseur complet (3).webp","/Dacia/Spring/Spring (2021–présent)/rétroviseur complet (4).webp"],"GLASS":["/Dacia/Spring/Spring (2021–présent)/Glass (1).webp","/Dacia/Spring/Spring (2021–présent)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Spring/Spring (2021–présent)/Cover (1).jpg","/Dacia/Spring/Spring (2021–présent)/Cover (2).jpg"],"SINGLE":["/Dacia/Spring/Spring (2021–présent)/Signle (2).webp","/Dacia/Spring/Spring (2021–présent)/signle (1).webp"]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Spring' limit 1)
insert into car_model_years (model_id, year) select m.id, 2022 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Spring', 2022, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER","SINGLE"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Spring/Spring (2021–présent)/rétroviseur complet (1).webp","/Dacia/Spring/Spring (2021–présent)/rétroviseur complet (2).webp","/Dacia/Spring/Spring (2021–présent)/rétroviseur complet (3).webp","/Dacia/Spring/Spring (2021–présent)/rétroviseur complet (4).webp"],"GLASS":["/Dacia/Spring/Spring (2021–présent)/Glass (1).webp","/Dacia/Spring/Spring (2021–présent)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Spring/Spring (2021–présent)/Cover (1).jpg","/Dacia/Spring/Spring (2021–présent)/Cover (2).jpg"],"SINGLE":["/Dacia/Spring/Spring (2021–présent)/Signle (2).webp","/Dacia/Spring/Spring (2021–présent)/signle (1).webp"]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Spring' limit 1)
insert into car_model_years (model_id, year) select m.id, 2023 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Spring', 2023, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER","SINGLE"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Spring/Spring (2021–présent)/rétroviseur complet (1).webp","/Dacia/Spring/Spring (2021–présent)/rétroviseur complet (2).webp","/Dacia/Spring/Spring (2021–présent)/rétroviseur complet (3).webp","/Dacia/Spring/Spring (2021–présent)/rétroviseur complet (4).webp"],"GLASS":["/Dacia/Spring/Spring (2021–présent)/Glass (1).webp","/Dacia/Spring/Spring (2021–présent)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Spring/Spring (2021–présent)/Cover (1).jpg","/Dacia/Spring/Spring (2021–présent)/Cover (2).jpg"],"SINGLE":["/Dacia/Spring/Spring (2021–présent)/Signle (2).webp","/Dacia/Spring/Spring (2021–présent)/signle (1).webp"]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Spring' limit 1)
insert into car_model_years (model_id, year) select m.id, 2024 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Spring', 2024, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER","SINGLE"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Spring/Spring (2021–présent)/rétroviseur complet (1).webp","/Dacia/Spring/Spring (2021–présent)/rétroviseur complet (2).webp","/Dacia/Spring/Spring (2021–présent)/rétroviseur complet (3).webp","/Dacia/Spring/Spring (2021–présent)/rétroviseur complet (4).webp"],"GLASS":["/Dacia/Spring/Spring (2021–présent)/Glass (1).webp","/Dacia/Spring/Spring (2021–présent)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Spring/Spring (2021–présent)/Cover (1).jpg","/Dacia/Spring/Spring (2021–présent)/Cover (2).jpg"],"SINGLE":["/Dacia/Spring/Spring (2021–présent)/Signle (2).webp","/Dacia/Spring/Spring (2021–présent)/signle (1).webp"]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Spring' limit 1)
insert into car_model_years (model_id, year) select m.id, 2025 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Spring', 2025, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER","SINGLE"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Spring/Spring (2021–présent)/rétroviseur complet (1).webp","/Dacia/Spring/Spring (2021–présent)/rétroviseur complet (2).webp","/Dacia/Spring/Spring (2021–présent)/rétroviseur complet (3).webp","/Dacia/Spring/Spring (2021–présent)/rétroviseur complet (4).webp"],"GLASS":["/Dacia/Spring/Spring (2021–présent)/Glass (1).webp","/Dacia/Spring/Spring (2021–présent)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Spring/Spring (2021–présent)/Cover (1).jpg","/Dacia/Spring/Spring (2021–présent)/Cover (2).jpg"],"SINGLE":["/Dacia/Spring/Spring (2021–présent)/Signle (2).webp","/Dacia/Spring/Spring (2021–présent)/signle (1).webp"]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='Spring' limit 1)
insert into car_model_years (model_id, year) select m.id, 2026 from m on conflict (model_id, year) do nothing;
with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)
insert into product_configs (brand_id, model, year, config)
select (select id::text from b), 'Spring', 2026, '{"catalogProducts":[],"enabledProducts":["COMPLETE","GLASS","COVER","SINGLE"],"completeOptionKeys":[],"productImagesByKey":{"COMPLETE":["/Dacia/Spring/Spring (2021–présent)/rétroviseur complet (1).webp","/Dacia/Spring/Spring (2021–présent)/rétroviseur complet (2).webp","/Dacia/Spring/Spring (2021–présent)/rétroviseur complet (3).webp","/Dacia/Spring/Spring (2021–présent)/rétroviseur complet (4).webp"],"GLASS":["/Dacia/Spring/Spring (2021–présent)/Glass (1).webp","/Dacia/Spring/Spring (2021–présent)/Glass (2).webp"],"MIRROR":[],"COVER":["/Dacia/Spring/Spring (2021–présent)/Cover (1).jpg","/Dacia/Spring/Spring (2021–présent)/Cover (2).jpg"],"SINGLE":["/Dacia/Spring/Spring (2021–présent)/Signle (2).webp","/Dacia/Spring/Spring (2021–présent)/signle (1).webp"]},"productOptionDefsByProductKey":{},"pieceOptionsByKey":{"GLASS":[],"MIRROR":[],"COVER":[],"SINGLE":[]}}'::jsonb
from b
on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();

commit;
