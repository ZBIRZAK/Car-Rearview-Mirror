import React, { useMemo, useState } from 'react';
import { useI18n } from '../i18n';

export default function Models({ brand, models, selectedModel, years, onModelSelect, onYearSelect, onBack }) {
  if (!brand) return null;
  const [query, setQuery] = useState('');
  const { t } = useI18n();

  const filteredModels = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return models;
    return models.filter((model) => model.toLowerCase().includes(term));
  }, [models, query]);

  return (
    <div className="models-view step-shell">
      {/* <div className="view-header">
        <h2>Choisissez le modele et l'annee {brand.name}</h2>
        <p>Selectionnez d'abord un modele, puis l'annee dans la colonne de droite.</p>
        <p className="selected-brand-chip">Marque selectionnee : {brand.name}</p>
      </div> */}

      <div className="step-toolbar">
        {/* <button type="button" className="secondary-button step-back" onClick={onBack}>Changer la marque</button> */}
        <input
          type="text"
          className="step-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('models_search', 'Rechercher un modele...')}
          inputMode="search"
          autoComplete="off"
        />
      </div>

      <div className="models-years-layout">
        <section className="years-column">
          {/* <h3 className="year-section-title">
            {selectedModel ? `Annees disponibles pour ${selectedModel}` : "Selectionnez d'abord un modele"}
          </h3> */}

          <div className="year-section">
            <div className="years-grid">
              {years.map((year) => (
                <button
                  key={year}
                  className="year-card"
                  disabled={!selectedModel}
                  onClick={() => {
                    if (!selectedModel) return;
                    if (document.activeElement && typeof document.activeElement.blur === 'function') document.activeElement.blur();
                    onYearSelect(year);
                  }}
                >
                  <h3>{year}</h3>
                </button>
              ))}
            </div>
          </div>
          {/* {!selectedModel ? <p className="empty-state">Selectionnez un modele pour activer le choix d annee.</p> : null} */}
        </section>

        <section className="models-column">
          {/* <h3 className="year-section-title">Modeles disponibles</h3> */}
          <div className="models-grid">
            {filteredModels.map((model, index) => (
              <button
                key={index}
                className={`model-card ${selectedModel === model ? 'active' : ''}`}
                onClick={() => {
                  if (document.activeElement && typeof document.activeElement.blur === 'function') document.activeElement.blur();
                  onModelSelect(model);
                }}
              >
                <h3>{model}</h3>
                {/* <p className="model-helper">{selectedModel === model ? 'Modele selectionne' : 'Appuyez pour choisir'}</p> */}
              </button>
            ))}
          </div>
          {!filteredModels.length ? <p className="empty-state">{t('models_empty_search', 'Aucun modele trouve pour cette recherche.')}</p> : null}
        </section>
      </div>
    </div>
  );
}
