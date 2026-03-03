import React from 'react';

export default function Models({ brand, models, onModelSelect }) {
  if (!brand) return null;
  return (
    <div className="models-view">
      <div className="view-header">
        <h2>Select {brand.name} Model</h2>
        <p>Choose your vehicle model to continue</p>
      </div>
      <div className="models-grid">
        {models.map((model, index) => (
          <button key={index} className="model-card" onClick={() => onModelSelect(model)}>
            <div className="model-icon">🔧</div>
            <h3>{model}</h3>
          </button>
        ))}
      </div>
    </div>
  );
}
