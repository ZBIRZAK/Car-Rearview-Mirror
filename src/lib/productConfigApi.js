import { hasSupabaseConfig, supabase } from './supabaseClient';
import { DEFAULT_PRODUCT_ADMIN_CONFIG } from '../config/productAdminConfig';

function ensureSupabase() {
  if (!hasSupabaseConfig || !supabase) {
    throw new Error('Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  }
}

function normalizeConfig(rawValue) {
  if (!rawValue || typeof rawValue !== 'object') return { ...DEFAULT_PRODUCT_ADMIN_CONFIG };
  return {
    enabledProducts: Array.isArray(rawValue.enabledProducts) ? rawValue.enabledProducts : [...DEFAULT_PRODUCT_ADMIN_CONFIG.enabledProducts],
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
