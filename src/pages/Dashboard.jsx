import React, { useEffect, useMemo, useState } from 'react';
import { fetchRequests, updateRequestStatus } from '../lib/requestsApi';
import { hasSupabaseConfig } from '../lib/supabaseClient';

const statusOptions = ['new', 'in_progress', 'done', 'cancelled'];

function formatDate(value) {
  if (!value) return '-';
  try {
    return new Date(value).toLocaleString();
  } catch {
    return value;
  }
}

export default function Dashboard() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const loadRequests = async () => {
    if (!hasSupabaseConfig) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const data = await fetchRequests();
      setRequests(data);
    } catch (err) {
      setError(err?.message || 'Failed to load requests.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const filteredRequests = useMemo(() => {
    if (statusFilter === 'all') return requests;
    return requests.filter((item) => item.status === statusFilter);
  }, [requests, statusFilter]);

  const handleStatusChange = async (id, status) => {
    try {
      const updated = await updateRequestStatus(id, status);
      setRequests((prev) => prev.map((item) => (item.id === id ? updated : item)));
    } catch (err) {
      setError(err?.message || 'Failed to update status.');
    }
  };

  return (
    <div className="dashboard-view">
      <div className="view-header">
        <h2>Dashboard</h2>
        <p>Gestion des demandes clients (Supabase)</p>
      </div>

      <section className="dashboard-shell">
        {!hasSupabaseConfig ? (
          <div className="dashboard-alert">
            Supabase n'est pas configure. Ajoutez `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY` dans `.env`.
          </div>
        ) : null}

        <div className="dashboard-toolbar">
          <div className="year-filters">
            <button type="button" className={`year-filter-btn ${statusFilter === 'all' ? 'active' : ''}`} onClick={() => setStatusFilter('all')}>Tous</button>
            <button type="button" className={`year-filter-btn ${statusFilter === 'new' ? 'active' : ''}`} onClick={() => setStatusFilter('new')}>Nouveaux</button>
            <button type="button" className={`year-filter-btn ${statusFilter === 'in_progress' ? 'active' : ''}`} onClick={() => setStatusFilter('in_progress')}>En cours</button>
            <button type="button" className={`year-filter-btn ${statusFilter === 'done' ? 'active' : ''}`} onClick={() => setStatusFilter('done')}>Termines</button>
          </div>
          <button type="button" className="secondary-button dashboard-refresh" onClick={loadRequests}>Actualiser</button>
        </div>

        {error ? <p className="inline-hint-error">{error}</p> : null}
        {loading ? <p className="empty-state">Chargement...</p> : null}

        {!loading && hasSupabaseConfig ? (
          <div className="dashboard-list">
            {filteredRequests.map((item) => (
              <article key={item.id} className="dashboard-card">
                <div className="dashboard-card-head">
                  <strong>{item.brand} {item.model} ({item.year})</strong>
                  <span>{formatDate(item.created_at)}</span>
                </div>
                <p><strong>Client:</strong> {item.full_name || '-'} | <strong>Tel:</strong> {item.phone || '-'}</p>
                <p><strong>Commande:</strong> {item.order_scope || '-'} | <strong>Type:</strong> {item.product_type || '-'}</p>
                <p><strong>Position:</strong> {item.position || '-'} | <strong>Options:</strong> {Array.isArray(item.options) && item.options.length ? item.options.join(', ') : 'Aucune'}</p>
                <p><strong>Message:</strong> {item.message || '-'}</p>
                <div className="dashboard-status-row">
                  {statusOptions.map((status) => (
                    <button
                      key={status}
                      type="button"
                      className={`year-filter-btn ${item.status === status ? 'active' : ''}`}
                      onClick={() => handleStatusChange(item.id, status)}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </article>
            ))}
            {!filteredRequests.length ? <p className="empty-state">Aucune demande pour ce filtre.</p> : null}
          </div>
        ) : null}
      </section>
    </div>
  );
}
