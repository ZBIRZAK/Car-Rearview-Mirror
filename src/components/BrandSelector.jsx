import React from 'react';

export default function BrandSelector({ brands, selectedBrand, onSelect, disabled }) {
  return (
    <div className="brand-selector">
      <h3>Marques</h3>
      <div className="brand-list">
        {brands.map(brand => (
          <button
            key={brand.id}
            className={`brand-item ${selectedBrand?.id === brand.id ? 'active' : ''}`}
            onClick={() => onSelect(brand)}
            disabled={disabled}
          >
            {brand.isImage ? (
              <img src={brand.icon} alt={brand.name} className="brand-image" />
            ) : (
              <span className="brand-icon">{brand.icon}</span>
            )}
            <span className="brand-name">{brand.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
