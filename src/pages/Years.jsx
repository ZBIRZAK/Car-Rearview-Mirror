import React, { useMemo, useState } from 'react';

export default function Years({ model, years, onYearSelect, onBack }) {
  if (!model) return null;
  const [range, setRange] = useState('all');

  const visibleYears = useMemo(() => {
    if (range === '2020s') return years.filter((year) => year >= 2020);
    if (range === '2010s') return years.filter((year) => year >= 2010 && year < 2020);
    if (range === 'older') return years.filter((year) => year < 2010);
    return years;
  }, [range, years]);

  return (
    <div className="years-view step-shell">
      <div className="view-header">
        <span className="step-pill">Etape 2 sur 3</span>
        <h2>Choisissez l'annee de {model}</h2>
        <p>Selectionnez l'annee de production pour continuer.</p>
      </div>

      <div className="step-toolbar">
        <button type="button" className="secondary-button step-back" onClick={onBack}>Retour aux modeles</button>
        <div className="year-filters">
          <button type="button" className={`year-filter-btn ${range === 'all' ? 'active' : ''}`} onClick={() => setRange('all')}>Toutes</button>
          <button type="button" className={`year-filter-btn ${range === '2020s' ? 'active' : ''}`} onClick={() => setRange('2020s')}>2020+</button>
          <button type="button" className={`year-filter-btn ${range === '2010s' ? 'active' : ''}`} onClick={() => setRange('2010s')}>2010s</button>
          <button type="button" className={`year-filter-btn ${range === 'older' ? 'active' : ''}`} onClick={() => setRange('older')}>Avant 2010</button>
        </div>
      </div>

      <div className="year-section">
        <h3 className="year-section-title">Annees disponibles</h3>
        <div className="years-grid">
          {visibleYears.map((year) => (
            <button key={year} className="year-card" onClick={() => {
              if (document.activeElement && typeof document.activeElement.blur === 'function') document.activeElement.blur();
              onYearSelect(year);
            }}>
              <h3>{year}</h3>
            </button>
          ))}
        </div>
      </div>
      {!visibleYears.length ? <p className="empty-state">Aucune annee disponible pour ce filtre.</p> : null}
    </div>
  );
}
