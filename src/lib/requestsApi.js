import { hasSupabaseConfig, supabase } from './supabaseClient';

const TABLE_NAME = 'requests';

function ensureSupabase() {
  if (!hasSupabaseConfig || !supabase) {
    throw new Error('Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  }
}

export async function createRequest(payload) {
  ensureSupabase();
  const normalizedPositions = Array.isArray(payload.productConfig?.position)
    ? payload.productConfig.position.filter(Boolean)
    : (payload.productConfig?.position ? [payload.productConfig.position] : []);
  const insertPayload = {
    brand: payload.brand || null,
    model: payload.model || null,
    year: payload.year || null,
    order_scope: payload.productConfig?.orderScope || null,
    selected_feature: payload.productConfig?.selectedFeature || null,
    position: normalizedPositions.length ? normalizedPositions.join(' + ') : null,
    product_type: payload.productConfig?.productType || null,
    adjustment_type: payload.productConfig?.adjustmentType || null,
    options: payload.productConfig?.options || [],
    full_name: payload.fullName || null,
    email: payload.email || null,
    phone: payload.phone || null,
    message: payload.message || null,
    status: 'new',
  };

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert(insertPayload)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function fetchRequests(limit = 200) {
  ensureSupabase();
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data || [];
}

export async function updateRequestStatus(id, status) {
  ensureSupabase();
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update({ status })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}
