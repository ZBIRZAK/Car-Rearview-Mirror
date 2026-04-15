import React from 'react';

export default function FeatureIcon({ type }) {
  if (type === 'pieceGlass') {
    return (
      <svg viewBox="0 0 64 64" className="feature-icon-svg" aria-hidden="true">
        <path d="M8 42l12-20h28c4 0 8 3 8 7v8c0 4-3 8-8 8H8z" fill="#111" />
        <path d="M12 42l12-20v20z" fill="#111" />
        <path d="M22 26h24c3 0 5 2 5 5v6c0 3-2 5-5 5H22z" fill="#d8e8ff" />
        <path d="M30 26v16" stroke="#7ea2d6" strokeWidth="2.2" />
        <path d="M18 33l3-2M20 37l3-2" stroke="#7a8088" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === 'pieceMirror') {
    return (
      <svg viewBox="0 0 64 64" className="feature-icon-svg" aria-hidden="true">
        <path d="M7 47l14-26h28c5 0 8 3 8 7v10c0 4-3 8-9 8H7z" fill="#111" />
        <path d="M7 47l14-26v26z" fill="none" stroke="#111" strokeWidth="2.2" />
        <path d="M39 31v10M34 36h10" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M39 27l3 4h-6zM39 45l-3-4h6zM30 36l4-3v6zM48 36l-4 3v-6z" fill="#fff" />
      </svg>
    );
  }
  if (type === 'pieceCover') {
    return (
      <svg viewBox="0 0 64 64" className="feature-icon-svg" aria-hidden="true">
        <path d="M9 45l13-24h25c6 0 10 3 11 8v7c0 5-4 9-11 9H9z" fill="#1f1f1f" />
        <path d="M13 42l10-18h22c3 0 6 2 6 5v6c0 3-2 5-6 5H13z" fill="#2e2e2e" />
        <path d="M13 42l10-18v18z" fill="#272727" />
        <path d="M27 27h17c2 0 4 1 4 4v4c0 2-2 4-4 4H27z" fill="#c7a55f" />
      </svg>
    );
  }
  if (type === 'pieceSingle') {
    return (
      <svg viewBox="0 0 64 64" className="feature-icon-svg" aria-hidden="true">
        <path d="M8 17h31l9 8v20H8z" fill="#111" />
        <path d="M30 34h17v7H30z" fill="#d83a2f" />
        <path d="M50 34l6-1M50 38h7M50 42l6 1" stroke="#ff6f61" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M18 29h10v3H18z" fill="#e8ecef" opacity="0.75" />
      </svg>
    );
  }
  if (type === 'glass') {
    return (
      <svg viewBox="0 0 64 64" className="feature-icon-svg" aria-hidden="true">
        <path d="M8 46l13-23h26c4 0 7 3 7 7v9c0 4-3 7-8 7H8z" fill="#0f0f0f" />
        <path d="M11 45l12-22v22z" fill="none" stroke="#0f0f0f" strokeWidth="2.2" />
        <path d="M17 40l8-14h16c3 0 5 2 5 5v5c0 3-2 4-5 4H17z" fill="#f4f7fb" />
        <path d="M25 32l4-2M27 37l4-2M22 37l3-1.5" stroke="#66717c" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === 'folding') {
    return (
      <svg viewBox="0 0 64 64" className="feature-icon-svg" aria-hidden="true">
        <path d="M8 46l13-23h26c4 0 7 3 7 7v9c0 4-3 7-8 7H8z" fill="#0f0f0f" />
        <path d="M11 45l12-22v22z" fill="#0f0f0f" />
        <path d="M47 46c6-4 9-10 9-17 0-7-3-12-10-16" stroke="#0f0f0f" strokeWidth="2.8" fill="none" strokeLinecap="round" />
        <path d="M48 10l8 2-4 7z" fill="#0f0f0f" />
        <path d="M28 24l-4 8h5l-2 7 8-10h-5l2-5z" fill="#d9322a" />
      </svg>
    );
  }
  if (type === 'underlight') {
    return (
      <svg viewBox="0 0 64 64" className="feature-icon-svg" aria-hidden="true">
        <path d="M8 46l13-23h26c4 0 7 3 7 7v9c0 4-3 7-8 7H8z" fill="#0f0f0f" />
        <path d="M11 45l12-22v22z" fill="#0f0f0f" />
        <path d="M29 37h16c1.5 0 2.8 1.2 2.8 2.8v1.4c0 1.6-1.3 2.8-2.8 2.8H29z" fill="#d9322a" />
        <path d="M27 46l-2 4M33 46v5M39 46l2 4M45 46l2 4" stroke="#0f0f0f" strokeWidth="2.1" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === 'shape') {
    return (
      <svg viewBox="0 0 64 64" className="feature-icon-svg" aria-hidden="true">
        <path d="M8 47l13-24h27c5 0 8 3 8 8v8c0 5-3 8-8 8H8z" fill="#0f0f0f" />
        <path d="M8 47l13-24v24z" fill="none" stroke="#0f0f0f" strokeWidth="2.2" />
      </svg>
    );
  }
  if (type === 'heating') {
    return (
      <svg viewBox="0 0 64 64" className="feature-icon-svg" aria-hidden="true">
        <rect x="8" y="8" width="48" height="48" rx="6" fill="#0f0f0f" />
        <path d="M20 44c2.2-4 2.2-7 0-10-2-3-2-6.5 0-10.5M32 44c2.2-4 2.2-7 0-10-2-3-2-6.5 0-10.5M44 44c2.2-4 2.2-7 0-10-2-3-2-6.5 0-10.5" stroke="#f2f2f2" strokeWidth="3" fill="none" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === 'memory') {
    return (
      <svg viewBox="0 0 64 64" className="feature-icon-svg" aria-hidden="true">
        <path d="M13 16h38v30H13z" fill="#f7f7f7" stroke="#0f0f0f" strokeWidth="2.1" />
        <path d="M10 46h44l-3 8H13z" fill="#f1f1f1" stroke="#0f0f0f" strokeWidth="2.1" />
        <text x="32" y="36" textAnchor="middle" fontSize="22" fontWeight="700" fill="#0f0f0f" fontFamily="Arial, sans-serif">M</text>
      </svg>
    );
  }
  if (type === 'adjustment') {
    return (
      <svg viewBox="0 0 64 64" className="feature-icon-svg" aria-hidden="true">
        <path d="M19 10h26c5 0 9 4 9 9v26c0 5-4 9-9 9H19z" fill="#0f0f0f" />
        <path d="M32 23v17M24 32h16" stroke="#f7f7f7" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M32 18l4 5h-8zM32 45l-4-5h8zM19 32l5-4v8zM45 32l-5 4v-8z" fill="#f7f7f7" />
        <path d="M24 24l-3 3M40 24l3 3M24 40l-3-3M40 40l3-3" stroke="#f7f7f7" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === 'antiLight') {
    return (
      <svg viewBox="0 0 64 64" className="feature-icon-svg" aria-hidden="true">
        <path d="M8 46l13-23h26c4 0 7 3 7 7v9c0 4-3 7-8 7H8z" fill="#f8f8f8" stroke="#0f0f0f" strokeWidth="2.1" />
        <path d="M11 45l12-22v22z" fill="#f8f8f8" stroke="#0f0f0f" strokeWidth="2.1" />
        <path d="M23 26h23c3 0 5 2 5 5v7c0 2.5-2 4.5-5 4.5H23z" fill="#2f73d7" />
        <path d="M34 26v16" stroke="#cadaf2" strokeWidth="2" />
      </svg>
    );
  }
  if (type === 'lamp') {
    return (
      <svg viewBox="0 0 64 64" className="feature-icon-svg" aria-hidden="true">
        <path d="M8 46l13-23h26c4 0 7 3 7 7v9c0 4-3 7-8 7H8z" fill="#0f0f0f" />
        <path d="M11 45l12-22v22z" fill="#0f0f0f" />
        <path d="M38 36h10v7H38z" fill="#d9322a" />
        <path d="M51 36l5-1M51 39h6M51 42l5 1" stroke="#d9322a" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === 'controller') {
    return (
      <svg viewBox="0 0 64 64" className="feature-icon-svg" aria-hidden="true">
        <rect x="10" y="10" width="44" height="44" rx="8" fill="#f7f7f7" stroke="#0f0f0f" strokeWidth="2.2" />
        <path d="M32 18l4 6h-8zM32 46l-4-6h8zM18 32l6-4v8zM46 32l-6 4v-8z" fill="#0f0f0f" />
        <path d="M24 24c2.6-2.6 5-3.8 8-3.8s5.4 1.2 8 3.8M24 40c2.6 2.6 5 3.8 8 3.8s5.4-1.2 8-3.8" stroke="#0f0f0f" strokeWidth="1.6" fill="none" />
      </svg>
    );
  }
  if (type === 'blindSpot') {
    return (
      <svg viewBox="0 0 64 64" className="feature-icon-svg" aria-hidden="true">
        <path d="M8 46l13-23h26c4 0 7 3 7 7v9c0 4-3 7-8 7H8z" fill="#f7f7f7" stroke="#0f0f0f" strokeWidth="2.1" />
        <path d="M11 45l12-22v22z" fill="#f7f7f7" stroke="#0f0f0f" strokeWidth="2.1" />
        <path d="M17.5 42l5-9 5 9z" fill="#d9322a" />
        <path d="M14 39l2-1M14 42l2-0.2" stroke="#d9322a" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === 'camera') {
    return (
      <svg viewBox="0 0 64 64" className="feature-icon-svg" aria-hidden="true">
        <path d="M8 46l13-23h26c4 0 7 3 7 7v9c0 4-3 7-8 7H8z" fill="#0f0f0f" />
        <path d="M11 45l12-22v22z" fill="#0f0f0f" />
        <path d="M18 39l7-12h15c3 0 5 2 5 5v5c0 2.5-2 4-5 4H18z" fill="#f2f5f8" />
        <path d="M45 23l7 4v18l-7-3z" fill="#2f2f2f" />
        <circle cx="19" cy="45" r="4.8" fill="#f7f7f7" stroke="#0f0f0f" strokeWidth="2.1" />
        <circle cx="19" cy="45" r="1.9" fill="#0f0f0f" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 64 64" className="feature-icon-svg" aria-hidden="true">
      <circle cx="32" cy="32" r="10" fill="#111" />
    </svg>
  );
}
