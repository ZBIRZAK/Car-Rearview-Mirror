import React from 'react';

export default function Years({ model, years, onYearSelect }) {
  if (!model) return null;
  const recentYears = years.filter((year) => year >= 2018);
  const olderYears = years.filter((year) => year < 2018);

  return (
    <div className="years-view step-shell">
      <div className="view-header">
        <span className="step-pill">Etape 2 sur 3</span>
        <h2>Choisissez l'annee de {model}</h2>
        <p>Selectionnez l'annee de production pour continuer.</p>
      </div>

      <div className="year-section">
        <h3 className="year-section-title">Annees recentes</h3>
        <div className="years-grid">
          {recentYears.map((year) => (
            <button key={year} className="year-card" onClick={() => onYearSelect(year)}>
              <h3>{year}</h3>
            </button>
          ))}
        </div>
      </div>

      <div className="year-section">
        <h3 className="year-section-title">Annees anciennes</h3>
        <div className="years-grid years-grid-older">
          {olderYears.map((year) => (
            <button key={year} className="year-card" onClick={() => onYearSelect(year)}>
              <h3>{year}</h3>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
