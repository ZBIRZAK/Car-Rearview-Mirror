import { hasSupabaseConfig, supabase } from './supabaseClient';

function ensureSupabase() {
  if (!hasSupabaseConfig || !supabase) {
    throw new Error('Supabase is not configured.');
  }
}

export async function fetchAppSetting(key) {
  ensureSupabase();
  const safeKey = String(key || '').trim();
  if (!safeKey) throw new Error('Setting key is required.');
  const { data, error } = await supabase
    .from('app_settings')
    .select('value')
    .eq('key', safeKey)
    .maybeSingle();
  if (error) throw error;
  return data?.value ?? null;
}

export async function saveAppSetting(key, value) {
  ensureSupabase();
  const safeKey = String(key || '').trim();
  if (!safeKey) throw new Error('Setting key is required.');
  const { data, error } = await supabase
    .from('app_settings')
    .upsert({ key: safeKey, value }, { onConflict: 'key' })
    .select('value')
    .single();
  if (error) throw error;
  return data?.value ?? null;
}
