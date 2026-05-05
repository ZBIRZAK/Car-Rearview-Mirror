import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(process.cwd(), 'Dacia');
const OUT_JSON = path.resolve(process.cwd(), 'supabase', 'dacia_restore_payload.json');
const OUT_SQL = path.resolve(process.cwd(), 'supabase', 'dacia_restore.sql');

const CURRENT_YEAR = new Date().getFullYear();

const defaultConfig = {
  catalogProducts: [],
  enabledProducts: [],
  completeOptionKeys: [],
  productImagesByKey: {
    COMPLETE: [],
    GLASS: [],
    MIRROR: [],
    COVER: [],
    SINGLE: [],
  },
  productOptionDefsByProductKey: {},
  pieceOptionsByKey: {
    GLASS: [],
    MIRROR: [],
    COVER: [],
    SINGLE: [],
  },
};

function normalizeText(s) {
  return String(s || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function listDirs(dir) {
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

function listFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isFile())
    .map((d) => d.name);
}

function parseYearRange(label) {
  const clean = String(label || '')
    .replace(/[–—]/g, '-')
    .replace(/\s+/g, ' ')
    .trim();

  const match = clean.match(/\(([^)]+)\)/);
  if (!match) return [];
  const inside = match[1];

  const parts = inside.split('-').map((p) => p.trim());
  if (!parts.length) return [];

  const start = Number((parts[0].match(/\d{4}/) || [])[0]);
  if (!Number.isFinite(start)) return [];

  let end;
  const endRaw = parts[1] || parts[0];
  const endYearMatch = endRaw.match(/\d{4}/);
  if (endYearMatch) {
    end = Number(endYearMatch[0]);
  } else {
    const n = normalizeText(endRaw);
    if (n.includes('present') || n.includes('present') || n.includes('aujourd')) {
      end = CURRENT_YEAR;
    } else {
      end = start;
    }
  }

  if (!Number.isFinite(end)) end = start;
  if (end < start) [end] = [start];

  const years = [];
  for (let y = start; y <= end; y += 1) years.push(y);
  return { years, start, end };
}

function modelNameFromVariant(brandModelDir, variantDirName) {
  const inside = (variantDirName.match(/\(([^)]+)\)/) || [])[1] || '';
  const model = String(brandModelDir || '').trim();

  return {
    model: model.replace(/\s+/g, ' ').trim(),
    ...parseYearRange(`(${inside})`),
  };
}

function classifyProductKey(fileName) {
  const n = normalizeText(fileName);
  if (n.includes('retroviseur complet') || n.includes('retro viseur complet')) return 'COMPLETE';
  if (n.includes('glass')) return 'GLASS';
  if (n.includes('cover')) return 'COVER';
  if (n.includes('single') || n.includes('signle')) return 'SINGLE';
  return null;
}

function toPublicAssetPath(absPath) {
  const rel = path.relative(process.cwd(), absPath).replace(/\\/g, '/');
  return `/${rel}`;
}

if (!fs.existsSync(ROOT) || !fs.statSync(ROOT).isDirectory()) {
  throw new Error(`Missing Dacia folder: ${ROOT}`);
}

const brand = 'Dacia';
const modelFolders = listDirs(ROOT);
const mergedByModel = new Map();

for (const modelFolder of modelFolders) {
  const modelFolderAbs = path.join(ROOT, modelFolder);
  const variants = listDirs(modelFolderAbs);

  for (const variant of variants) {
    const variantAbs = path.join(modelFolderAbs, variant);
    const files = listFiles(variantAbs);
    const { model, years, start, end } = modelNameFromVariant(modelFolder, variant);
    if (!years.length || !Number.isFinite(start) || !Number.isFinite(end)) continue;

    const productImagesByKey = {
      COMPLETE: [],
      GLASS: [],
      MIRROR: [],
      COVER: [],
      SINGLE: [],
    };

    for (const file of files) {
      if (file === '.DS_Store') continue;
      const key = classifyProductKey(file);
      if (!key) continue;
      productImagesByKey[key].push(toPublicAssetPath(path.join(variantAbs, file)));
    }

    const variantConfig = {
      ...defaultConfig,
      productImagesByKey,
      enabledProducts: Object.entries(productImagesByKey)
        .filter(([, arr]) => Array.isArray(arr) && arr.length > 0)
        .map(([k]) => k),
    };

    const existing = mergedByModel.get(model) || {
      model,
      years: new Set(),
      ranges: [],
    };

    years.forEach((y) => existing.years.add(y));
    existing.ranges.push({ start, end, config: variantConfig, variant });

    mergedByModel.set(model, existing);
  }
}

const mergedEntries = [...mergedByModel.values()]
  .map((entry) => ({
    model: entry.model,
    years: [...entry.years].sort((a, b) => a - b),
    ranges: entry.ranges.slice().sort((a, b) => a.start - b.start),
  }))
  .sort((a, b) => a.model.localeCompare(b.model));

const payload = { brand, modelEntries: mergedEntries };
fs.writeFileSync(OUT_JSON, JSON.stringify(payload, null, 2), 'utf8');

const esc = (s) => String(s).replace(/'/g, "''");

let sql = '';
sql += '-- Auto-generated from /Dacia folder\n';
sql += 'begin;\n\n';
sql += `insert into car_brands (name) values ('${esc(brand)}') on conflict (name) do nothing;\n\n`;

sql += 'with b as (select id from car_brands where lower(name)=lower(\'Dacia\') limit 1)\n';
sql += 'insert into car_models (brand_id, name)\nselect b.id, v.model\nfrom b\njoin (values\n';

const modelsUnique = [...new Set(mergedEntries.map((m) => m.model))].sort();
sql += modelsUnique.map((m) => `  ('${esc(m)}')`).join(',\n');
sql += '\n) as v(model) on true\n';
sql += 'on conflict (brand_id, name) do nothing;\n\n';

for (const entry of mergedEntries) {
  for (const y of entry.years) {
    const matchingRanges = entry.ranges.filter((r) => y >= r.start && y <= r.end);
    const selectedRange = matchingRanges.length
      ? matchingRanges.sort((a, b) => b.start - a.start)[0]
      : null;
    const selectedConfig = selectedRange?.config || defaultConfig;

    sql += `with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='${esc(entry.model)}' limit 1)\n`;
    sql += `insert into car_model_years (model_id, year) select m.id, ${y} from m on conflict (model_id, year) do nothing;\n`;

    const cfg = JSON.stringify(selectedConfig).replace(/'/g, "''");
    sql += `with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)\n`;
    sql += `insert into product_configs (brand_id, model, year, config)\n`;
    sql += `select (select id::text from b), '${esc(entry.model)}', ${y}, '${cfg}'::jsonb\n`;
    sql += `from b\n`;
    sql += `on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();\n\n`;
  }
}

sql += 'commit;\n';
fs.writeFileSync(OUT_SQL, sql, 'utf8');

console.log(`Wrote: ${OUT_JSON}`);
console.log(`Wrote: ${OUT_SQL}`);
console.log(`Models parsed: ${modelsUnique.length}`);
console.log(`Model variants parsed: ${mergedEntries.reduce((acc, item) => acc + item.ranges.length, 0)}`);
console.log(`Merged models: ${mergedEntries.length}`);
console.log(`Total model-year rows: ${mergedEntries.reduce((acc, e) => acc + e.years.length, 0)}`);
