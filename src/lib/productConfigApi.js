import { hasSupabaseConfig, supabase } from './supabaseClient';
import {
  COMPLETE_OPTION_DEFS,
  DEFAULT_CATALOG_PRODUCTS,
  DEFAULT_PRODUCT_ADMIN_CONFIG,
  PIECE_OPTION_DEFS,
} from '../config/productAdminConfig';

function ensureSupabase() {
  if (!hasSupabaseConfig || !supabase) {
    throw new Error('Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  }
}

function normalizeConfig(rawValue) {
  if (!rawValue || typeof rawValue !== 'object') return { ...DEFAULT_PRODUCT_ADMIN_CONFIG };
  const normalizedCatalogProducts = Array.isArray(rawValue.catalogProducts)
    ? rawValue.catalogProducts
      .map((item) => ({
        key: String(item?.key || '').trim().toUpperCase(),
        label: String(item?.label || '').trim(),
        subtitle: String(item?.subtitle || '').trim(),
        orderScope: item?.orderScope === 'complete' ? 'complete' : 'piece',
        pieceType: String(item?.pieceType || '').trim(),
        optionGroup: String(item?.optionGroup || '').trim().toUpperCase() || 'GLASS',
        previewFocus: String(item?.previewFocus || '').trim() || 'generic',
        requiresPosition: item?.requiresPosition !== false,
        requiresAdjustment: item?.requiresAdjustment === true || String(item?.key || '').trim().toUpperCase() === 'COMPLETE',
      }))
      .filter((item) => item.key && item.label)
    : [];
  const fallbackEnabledProducts = Array.isArray(rawValue.enabledProducts)
    ? rawValue.enabledProducts
    : [...DEFAULT_PRODUCT_ADMIN_CONFIG.enabledProducts];
  const derivedCatalogProducts = normalizedCatalogProducts.length
    ? normalizedCatalogProducts
    : DEFAULT_CATALOG_PRODUCTS.filter((item) => fallbackEnabledProducts.includes(item.key));

  const normalizedEnabledProducts = derivedCatalogProducts.length
    ? derivedCatalogProducts.map((item) => item.key)
    : fallbackEnabledProducts;

  const normalizedProductOptionDefsByProductKey = rawValue.productOptionDefsByProductKey
    && typeof rawValue.productOptionDefsByProductKey === 'object'
    ? Object.fromEntries(
      Object.entries(rawValue.productOptionDefsByProductKey).map(([productKey, defs]) => [
        String(productKey || '').trim().toUpperCase(),
        Array.isArray(defs)
          ? defs
            .map((def) => ({
              key: String(def?.key || def?.label || '').trim(),
              label: String(def?.label || def?.key || '').trim(),
              icon: String(def?.icon || '').trim(),
              imageSrc: typeof def?.imageSrc === 'string' ? def.imageSrc.trim() : '',
            }))
            .filter((def) => def.key && def.label)
          : [],
      ])
    )
    : null;

  const legacyCompleteDefs = Array.isArray(rawValue.completeOptionKeys)
    ? rawValue.completeOptionKeys
      .map((optionKey) => {
        const matched = COMPLETE_OPTION_DEFS.find((item) => item.key === optionKey);
        return matched
          ? { key: matched.key, label: matched.label, icon: matched.icon || '', imageSrc: '' }
          : { key: optionKey, label: optionKey, icon: '', imageSrc: '' };
      })
      .filter((item) => item.key && item.label)
    : [];

  const legacyPieceDefs = rawValue.pieceOptionsByKey && typeof rawValue.pieceOptionsByKey === 'object'
    ? Object.fromEntries(
      Object.entries(rawValue.pieceOptionsByKey).map(([pieceKey, optionLabels]) => [
        String(pieceKey || '').trim().toUpperCase(),
        Array.isArray(optionLabels)
          ? optionLabels
            .map((optionLabel) => {
              const fallbackDef = (PIECE_OPTION_DEFS[String(pieceKey || '').toUpperCase()] || [])
                .find((item) => item.key === optionLabel || item.label === optionLabel);
              const normalizedLabel = String(optionLabel || '').trim();
              return {
                key: normalizedLabel,
                label: normalizedLabel,
                icon: fallbackDef?.icon || '',
                imageSrc: '',
              };
            })
            .filter((item) => item.key && item.label)
          : [],
      ])
    )
    : {};

  const derivedProductOptionDefsByProductKey = normalizedProductOptionDefsByProductKey || {
    ...(legacyCompleteDefs.length ? { COMPLETE: legacyCompleteDefs } : {}),
    ...legacyPieceDefs,
  };

  return {
    catalogProducts: derivedCatalogProducts,
    enabledProducts: normalizedEnabledProducts,
    completeOptionKeys: Array.isArray(rawValue.completeOptionKeys) ? rawValue.completeOptionKeys : [...DEFAULT_PRODUCT_ADMIN_CONFIG.completeOptionKeys],
    productImagesByKey: rawValue.productImagesByKey && typeof rawValue.productImagesByKey === 'object'
      ? Object.fromEntries(
        Object.entries(rawValue.productImagesByKey).map(([key, value]) => [
          key,
          Array.isArray(value) ? value.filter((item) => typeof item === 'string' && item.trim()) : [],
        ])
      )
      : { ...DEFAULT_PRODUCT_ADMIN_CONFIG.productImagesByKey },
    pieceOptionsByKey: rawValue.pieceOptionsByKey && typeof rawValue.pieceOptionsByKey === 'object'
      ? rawValue.pieceOptionsByKey
      : { ...DEFAULT_PRODUCT_ADMIN_CONFIG.pieceOptionsByKey },
    productOptionDefsByProductKey: derivedProductOptionDefsByProductKey,
  };
}

function validateScope(scope) {
  const brandId = String(scope?.brandId || '').trim();
  const model = String(scope?.model || '').trim();
  const year = Number(scope?.year);
  if (!brandId || !model || !Number.isFinite(year)) {
    throw new Error('Scope is required: brandId, model, year.');
  }
  return { brandId, model, year };
}

export async function fetchProductAdminConfig(scope) {
  ensureSupabase();
  const target = validateScope(scope);
  const { data, error } = await supabase
    .from('product_configs')
    .select('config')
    .eq('brand_id', target.brandId)
    .eq('model', target.model)
    .eq('year', target.year)
    .maybeSingle();

  if (error) throw error;
  if (!data) return { ...DEFAULT_PRODUCT_ADMIN_CONFIG };
  return normalizeConfig(data.config);
}

export async function saveProductAdminConfig(scope, config) {
  ensureSupabase();
  const target = validateScope(scope);
  const payload = {
    brand_id: target.brandId,
    model: target.model,
    year: target.year,
    config: normalizeConfig(config),
  };
  const { data, error } = await supabase
    .from('product_configs')
    .upsert(payload, { onConflict: 'brand_id,model,year' })
    .select()
    .single();
  if (error) throw error;
  return normalizeConfig(data?.config);
}
