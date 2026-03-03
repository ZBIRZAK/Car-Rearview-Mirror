import React from 'react';

export default function Models({ brand, models, onModelSelect }) {
  if (!brand) return null;
  return (
    <div className="models-view step-shell">
      <div className="view-header">
        <span className="step-pill">Step 1 of 3</span>
        <h2>Select {brand.name} Model</h2>
        <p>Choose your vehicle model to continue to year selection.</p>
      </div>
      <div className="models-grid">
        {models.map((model, index) => (
          <button key={index} className="model-card" onClick={() => onModelSelect(model)}>
            <h3>{model}</h3>
            <p className="model-helper">Tap to select</p>
          </button>
        ))}
      </div>
    </div>
  );
}
