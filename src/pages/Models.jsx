import React from 'react';

export default function Models({ brand, models, onModelSelect }) {
  if (!brand) return null;
  return (
    <div className="models-view step-shell">
      <div className="view-header">
        <span className="step-pill">Etape 1 sur 3</span>
        <h2>Choisissez le modele {brand.name}</h2>
        <p>Selectionnez votre modele pour passer a l'annee.</p>
      </div>
      <div className="models-grid">
        {models.map((model, index) => (
          <button key={index} className="model-card" onClick={() => onModelSelect(model)}>
            <h3>{model}</h3>
            <p className="model-helper">Appuyez pour choisir</p>
          </button>
        ))}
      </div>
    </div>
  );
}
