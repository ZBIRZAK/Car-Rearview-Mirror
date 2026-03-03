import React from 'react';

export default function Years({ model, years, onYearSelect }) {
  if (!model) return null;
  return (
    <div className="years-view">
      <div className="view-header">
        <h2>Select {model} Year</h2>
        <p>Choose your vehicle production year</p>
      </div>
      <div className="years-grid">
        {years.map(year => (
          <button key={year} className="year-card" onClick={() => onYearSelect(year)}>
            <div className="year-icon">📅</div>
            <h3>{year}</h3>
          </button>
        ))}
      </div>
    </div>
  );
}
