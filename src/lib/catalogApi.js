import { hasSupabaseConfig, supabase } from './supabaseClient';

function ensureSupabase() {
  if (!hasSupabaseConfig || !supabase) {
    throw new Error('Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  }
}

export async function fetchCatalogBrands() {
  ensureSupabase();
  const { data, error } = await supabase
    .from('car_brands')
    .select('*')
    .order('name', { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function createCatalogBrand(name, logoUrl = '') {
  ensureSupabase();
  const payload = {
    name: String(name || '').trim(),
    logo_url: String(logoUrl || '').trim() || null,
  };
  const { data, error } = await supabase
    .from('car_brands')
    .insert(payload)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteCatalogBrand(id) {
  ensureSupabase();
  const { error } = await supabase
    .from('car_brands')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

export async function fetchCatalogModels(brandId) {
  ensureSupabase();
  if (!brandId) return [];
  const { data, error } = await supabase
    .from('car_models')
    .select('*')
    .eq('brand_id', brandId)
    .order('name', { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function createCatalogModel(brandId, name) {
  ensureSupabase();
  const payload = { brand_id: brandId, name: String(name || '').trim() };
  const { data, error } = await supabase
    .from('car_models')
    .insert(payload)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteCatalogModel(id) {
  ensureSupabase();
  const { error } = await supabase
    .from('car_models')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

export async function fetchCatalogYears(modelId) {
  ensureSupabase();
  if (!modelId) return [];
  const { data, error } = await supabase
    .from('car_model_years')
    .select('*')
    .eq('model_id', modelId)
    .order('year', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function createCatalogYear(modelId, year) {
  ensureSupabase();
  const payload = { model_id: modelId, year: Number(year) };
  const { data, error } = await supabase
    .from('car_model_years')
    .insert(payload)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteCatalogYear(id) {
  ensureSupabase();
  const { error } = await supabase
    .from('car_model_years')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

export async function fetchCatalogSnapshot() {
  ensureSupabase();
  const [{ data: brands, error: brandsError }, { data: models, error: modelsError }, { data: years, error: yearsError }] = await Promise.all([
    supabase.from('car_brands').select('*').order('name', { ascending: true }),
    supabase.from('car_models').select('*').order('name', { ascending: true }),
    supabase.from('car_model_years').select('*').order('year', { ascending: false }),
  ]);

  if (brandsError) throw brandsError;
  if (modelsError) throw modelsError;
  if (yearsError) throw yearsError;

  return {
    brands: brands || [],
    models: models || [],
    years: years || [],
  };
}
