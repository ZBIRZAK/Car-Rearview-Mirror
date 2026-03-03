import React, { useMemo, useState } from 'react';

export default function Models({ brand, models, onModelSelect, onBack }) {
  if (!brand) return null;
  const [query, setQuery] = useState('');

  const filteredModels = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return models;
    return models.filter((model) => model.toLowerCase().includes(term));
  }, [models, query]);

  return (
    <div className="models-view step-shell">
      <div className="view-header">
        <span className="step-pill">Etape 1 sur 3</span>
        <h2>Choisissez le modele {brand.name}</h2>
        <p>Selectionnez votre modele pour passer a l'annee.</p>
        <p className="selected-brand-chip">Marque selectionnee : {brand.name}</p>
      </div>

      <div className="step-toolbar">
        <button type="button" className="secondary-button step-back" onClick={onBack}>Changer la marque</button>
        <input
          type="text"
          className="step-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un modele..."
          inputMode="search"
          autoComplete="off"
        />
      </div>

      <div className="models-grid">
        {filteredModels.map((model, index) => (
          <button key={index} className="model-card" onClick={() => {
            if (document.activeElement && typeof document.activeElement.blur === 'function') document.activeElement.blur();
            onModelSelect(model);
          }}>
            <h3>{model}</h3>
            <p className="model-helper">Appuyez pour choisir</p>
          </button>
        ))}
      </div>
      {!filteredModels.length ? <p className="empty-state">Aucun modele trouve pour cette recherche.</p> : null}
    </div>
  );
}
