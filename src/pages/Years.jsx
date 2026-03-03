import React from 'react';

export default function Years({ model, years, onYearSelect }) {
  if (!model) return null;
  const recentYears = years.filter((year) => year >= 2018);
  const olderYears = years.filter((year) => year < 2018);

  return (
    <div className="years-view step-shell">
      <div className="view-header">
        <span className="step-pill">Step 2 of 3</span>
        <h2>Select {model} Year</h2>
        <p>Choose your vehicle production year to continue.</p>
      </div>

      <div className="year-section">
        <h3 className="year-section-title">Recent Years</h3>
        <div className="years-grid">
          {recentYears.map((year) => (
            <button key={year} className="year-card" onClick={() => onYearSelect(year)}>
              <h3>{year}</h3>
            </button>
          ))}
        </div>
      </div>

      <div className="year-section">
        <h3 className="year-section-title">Older Years</h3>
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
