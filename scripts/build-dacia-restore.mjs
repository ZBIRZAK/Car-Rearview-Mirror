import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(process.cwd(), 'Dacia');
const OUT_JSON = path.resolve(process.cwd(), 'supabase', 'dacia_restore_payload.json');
const OUT_SQL = path.resolve(process.cwd(), 'supabase', 'dacia_restore.sql');
const OUT_PARTS_DIR = path.resolve(process.cwd(), 'supabase', 'dacia_restore_parts');
const OUT_TINY_DIR = path.resolve(process.cwd(), 'supabase', 'dacia_restore_tiny');

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
    SIGNLE: [],
    R_TROVISEUR_COMPLET: [],
  },
  productOptionDefsByProductKey: {},
  pieceOptionsByKey: {
    GLASS: [],
    MIRROR: [],
    COVER: [],
    SINGLE: [],
  },
};

function mimeFromExt(fileName) {
  const ext = path.extname(fileName).toLowerCase();
  if (ext === '.png') return 'image/png';
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  if (ext === '.webp') return 'image/webp';
  if (ext === '.gif') return 'image/gif';
  if (ext === '.svg') return 'image/svg+xml';
  return null;
}

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
  if (n.includes('retroviseur complet') || n.includes('retro viseur complet')) return 'R_TROVISEUR_COMPLET';
  if (n.includes('glass')) return 'GLASS';
  if (n.includes('cover')) return 'COVER';
  if (n.includes('single') || n.includes('signle')) return 'SIGNLE';
  return null;
}

function toDataUrl(absPath, fileName) {
  const mime = mimeFromExt(fileName);
  if (!mime) return null;
  const bytes = fs.readFileSync(absPath);
  return `data:${mime};base64,${bytes.toString('base64')}`;
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
      SIGNLE: [],
      R_TROVISEUR_COMPLET: [],
    };

    for (const file of files) {
      if (file === '.DS_Store') continue;
      const key = classifyProductKey(file);
      if (!key) continue;
      const dataUrl = toDataUrl(path.join(variantAbs, file), file);
      if (dataUrl) productImagesByKey[key].push(dataUrl);
    }

    // Keep aliases used in existing Volkswagen prod data.
    productImagesByKey.COMPLETE = [...productImagesByKey.R_TROVISEUR_COMPLET];
    productImagesByKey.SINGLE = [...productImagesByKey.SIGNLE];

    const catalogProducts = [
      {
        key: 'R_TROVISEUR_COMPLET',
        label: 'Rétroviseur complet',
        subtitle: '',
        pieceType: 'Rétroviseur complet',
        orderScope: 'complete',
        optionGroup: 'COMPLETE',
        previewFocus: 'generic',
        requiresPosition: true,
        requiresAdjustment: true,
      },
      {
        key: 'GLASS',
        label: 'Glass',
        subtitle: '',
        pieceType: 'Glass',
        orderScope: 'piece',
        optionGroup: 'GLASS',
        previewFocus: 'generic',
        requiresPosition: true,
        requiresAdjustment: false,
      },
      {
        key: 'COVER',
        label: 'Cover',
        subtitle: '',
        pieceType: 'Cover',
        orderScope: 'piece',
        optionGroup: 'COVER',
        previewFocus: 'generic',
        requiresPosition: true,
        requiresAdjustment: false,
      },
      {
        key: 'SIGNLE',
        label: 'Signle',
        subtitle: '',
        pieceType: 'Signle',
        orderScope: 'piece',
        optionGroup: 'SINGLE',
        previewFocus: 'generic',
        requiresPosition: true,
        requiresAdjustment: false,
      },
    ];

    const variantConfig = {
      ...defaultConfig,
      catalogProducts,
      productImagesByKey,
      enabledProducts: catalogProducts
        .map((item) => item.key)
        .filter((k) => Array.isArray(productImagesByKey[k]) && productImagesByKey[k].length > 0),
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

const globalHeader = `${sql}`;

const perModelBodies = new Map();

for (const entry of mergedEntries) {
  let modelBody = '';
  const yearConfigPairs = entry.years.map((y) => {
    const matchingRanges = entry.ranges.filter((r) => y >= r.start && y <= r.end);
    const selectedRange = matchingRanges.length
      ? matchingRanges.sort((a, b) => b.start - a.start)[0]
      : null;
    const selectedConfig = selectedRange?.config || defaultConfig;
    return { year: y, configJson: JSON.stringify(selectedConfig) };
  });

  const grouped = [];
  for (const pair of yearConfigPairs) {
    const last = grouped[grouped.length - 1];
    if (!last) {
      grouped.push({ start: pair.year, end: pair.year, configJson: pair.configJson });
      continue;
    }
    if (last.end + 1 === pair.year && last.configJson === pair.configJson) {
      last.end = pair.year;
    } else {
      grouped.push({ start: pair.year, end: pair.year, configJson: pair.configJson });
    }
  }

  for (const block of grouped) {
    modelBody += `with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='${esc(entry.model)}' limit 1), y as (select generate_series(${block.start}, ${block.end}) as year)\n`;
    modelBody += `insert into car_model_years (model_id, year) select m.id, y.year from m cross join y on conflict (model_id, year) do nothing;\n`;

    const cfg = block.configJson.replace(/'/g, "''");
    modelBody += `with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), y as (select generate_series(${block.start}, ${block.end}) as year)\n`;
    modelBody += `insert into product_configs (brand_id, model, year, config)\n`;
    modelBody += `select (select id::text from b), '${esc(entry.model)}', y.year, '${cfg}'::jsonb\n`;
    modelBody += `from b cross join y\n`;
    modelBody += `on conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();\n\n`;
  }
  perModelBodies.set(entry.model, modelBody);
  sql += modelBody;
}

sql += 'commit;\n';
fs.writeFileSync(OUT_SQL, sql, 'utf8');

fs.rmSync(OUT_PARTS_DIR, { recursive: true, force: true });
fs.mkdirSync(OUT_PARTS_DIR, { recursive: true });

const initSql = `${globalHeader}commit;\n`;
fs.writeFileSync(path.join(OUT_PARTS_DIR, '00_init_brand_models.sql'), initSql, 'utf8');

const modelSlugs = [];
for (const model of modelsUnique) {
  const slug = model.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
  modelSlugs.push(slug);
  const body = perModelBodies.get(model) || '';
  const partSql = `-- Auto-generated from /Dacia folder (${model})\nbegin;\n\n${globalHeader}${body}commit;\n`;
  fs.writeFileSync(path.join(OUT_PARTS_DIR, `${slug}.sql`), partSql, 'utf8');
}

const runOrder = ['00_init_brand_models.sql', ...modelSlugs.map((s) => `${s}.sql`)];
fs.writeFileSync(path.join(OUT_PARTS_DIR, 'README_RUN_ORDER.txt'), runOrder.join('\n') + '\n', 'utf8');

if (process.env.SKIP_TINY === '1') {
  console.log(`Wrote: ${OUT_JSON}`);
  console.log(`Wrote: ${OUT_SQL}`);
  console.log(`Wrote parts dir: ${OUT_PARTS_DIR}`);
  console.log('Skipped tiny dir generation (SKIP_TINY=1)');
  console.log(`Models parsed: ${modelsUnique.length}`);
  console.log(`Model variants parsed: ${mergedEntries.reduce((acc, item) => acc + item.ranges.length, 0)}`);
  console.log(`Merged models: ${mergedEntries.length}`);
  console.log(`Total model-year rows: ${mergedEntries.reduce((acc, e) => acc + e.years.length, 0)}`);
  process.exit(0);
}

// Tiny mode: one file per model-year to satisfy strict SQL editor limits.
fs.rmSync(OUT_TINY_DIR, { recursive: true, force: true });
fs.mkdirSync(OUT_TINY_DIR, { recursive: true });
fs.writeFileSync(path.join(OUT_TINY_DIR, '00_init_brand_models.sql'), initSql, 'utf8');

const tinyRunOrder = ['00_init_brand_models.sql'];
for (const entry of mergedEntries) {
  for (const y of entry.years) {
    const matchingRanges = entry.ranges.filter((r) => y >= r.start && y <= r.end);
    const selectedRange = matchingRanges.length
      ? matchingRanges.sort((a, b) => b.start - a.start)[0]
      : null;
    const selectedConfig = selectedRange?.config || defaultConfig;
    const cfg = JSON.stringify(selectedConfig).replace(/'/g, "''");

    const slug = entry.model.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
    const fileName = `${slug}_${y}.sql`;
    const tinySql = `-- Auto-generated from /Dacia folder (${entry.model} ${y})\nbegin;\n\n${globalHeader}with b as (select id from car_brands where lower(name)=lower('Dacia') limit 1), m as (select id from car_models where brand_id=(select id from b) and name='${esc(entry.model)}' limit 1)\ninsert into car_model_years (model_id, year) select m.id, ${y} from m on conflict (model_id, year) do nothing;\nwith b as (select id from car_brands where lower(name)=lower('Dacia') limit 1)\ninsert into product_configs (brand_id, model, year, config)\nselect (select id::text from b), '${esc(entry.model)}', ${y}, '${cfg}'::jsonb\nfrom b\non conflict (brand_id, model, year) do update set config = excluded.config, updated_at = now();\n\ncommit;\n`;
    fs.writeFileSync(path.join(OUT_TINY_DIR, fileName), tinySql, 'utf8');
    tinyRunOrder.push(fileName);
  }
}
fs.writeFileSync(path.join(OUT_TINY_DIR, 'README_RUN_ORDER.txt'), tinyRunOrder.join('\n') + '\n', 'utf8');

console.log(`Wrote: ${OUT_JSON}`);
console.log(`Wrote: ${OUT_SQL}`);
console.log(`Wrote parts dir: ${OUT_PARTS_DIR}`);
console.log(`Wrote tiny dir: ${OUT_TINY_DIR}`);
console.log(`Models parsed: ${modelsUnique.length}`);
console.log(`Model variants parsed: ${mergedEntries.reduce((acc, item) => acc + item.ranges.length, 0)}`);
console.log(`Merged models: ${mergedEntries.length}`);
console.log(`Total model-year rows: ${mergedEntries.reduce((acc, e) => acc + e.years.length, 0)}`);
