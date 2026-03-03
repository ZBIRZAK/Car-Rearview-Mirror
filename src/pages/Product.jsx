import React, { useState } from 'react';
import mirrorProductImage from '../images/side-rear-view-mirror-on-a-car-transparent-background-png.webp';

const positions = [
  "Gauche",
  "Droit"
];

const productTypes = [
  "Rétroviseur complet (ensemble complet prêt à monter)",
  "Glace de rétroviseur uniquement",
  "Coque / Cache extérieur uniquement",
  "Support / Platine de fixation",
  "Moteur de réglage",
  "Clignotant intégré seul"
];

const adjustmentTypes = [
  "Réglage manuel",
  "Réglage électrique",
  "Rabattable manuel",
  "Rabattable électrique",
  "Rabattement automatique (à la fermeture du véhicule)"
];

export default function Product({ brand, model, year, productConfig, onChange, onContinue }) {
  if (!year) return null;
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [showValidationHint, setShowValidationHint] = useState(false);

  const canContinue = productConfig.position && productConfig.productType && productConfig.adjustmentType;

  const openLightbox = () => {
    setIsLightboxOpen(true);
    setZoom(1);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setZoom(1);
  };

  const zoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 3));
  const zoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.5));
  const resetZoom = () => setZoom(1);

  const handleContinue = () => {
    if (!canContinue) {
      setShowValidationHint(true);
      return;
    }
    onContinue();
  };

  return (
    <div className="product-view">
      <div className="view-header">
        <h2>Configurez votre produit</h2>
        <p>{brand?.name} {model} ({year})</p>
      </div>

      <div className="product-layout">
        <div className="product-preview">
          <button type="button" className="product-image-trigger" onClick={openLightbox}>
            <img src={mirrorProductImage} alt="Retroviseur exterieur de voiture" className="product-brand-image" />
          </button>
          <p className="image-hint">Appuyez sur l'image pour l'ouvrir en plein ecran</p>
          <h3>Retroviseur {brand?.name}</h3>
          <p>{model} - {year}</p>
          <div className="product-mini-summary">
            <p><strong>Position :</strong> {productConfig.position || 'Aucune'}</p>
            <p><strong>Type :</strong> {productConfig.productType || 'Aucun'}</p>
            <p><strong>Reglage :</strong> {productConfig.adjustmentType || 'Aucun'}</p>
          </div>
        </div>

        <div className="product-config">
          <div className="config-group">
            <h3>1. Position</h3>
            <p className="config-help">Choisissez le cote du retroviseur a remplacer.</p>
            <div className="choice-list position-choice-list">
              {positions.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`choice-btn ${productConfig.position === item ? 'active' : ''}`}
                  onClick={() => onChange('position', item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="config-group">
            <h3>2. Type de produit</h3>
            <p className="config-help">Selectionnez la piece exacte dont vous avez besoin.</p>
            <div className="choice-list">
              {productTypes.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`choice-btn ${productConfig.productType === item ? 'active' : ''}`}
                  onClick={() => onChange('productType', item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="config-group">
            <h3>3. Type de réglage</h3>
            <p className="config-help">Indiquez le systeme de reglage de votre retroviseur.</p>
            <div className="choice-list">
              {adjustmentTypes.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`choice-btn ${productConfig.adjustmentType === item ? 'active' : ''}`}
                  onClick={() => onChange('adjustmentType', item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button type="button" className="submit-button" onClick={handleContinue}>
            Continuer vers le formulaire
          </button>
          {(!canContinue || showValidationHint) && !canContinue ? (
            <p className="inline-hint-error">Completez les 3 sections pour continuer.</p>
          ) : null}
        </div>
      </div>

      {isLightboxOpen && (
        <div className="lightbox-overlay" role="dialog" aria-modal="true">
          <button type="button" className="lightbox-close" onClick={closeLightbox} aria-label="Fermer la visionneuse">
            ×
          </button>
          <div className="lightbox-controls">
            <button type="button" onClick={zoomOut}>-</button>
            <button type="button" onClick={resetZoom}>Reinitialiser</button>
            <button type="button" onClick={zoomIn}>+</button>
          </div>
          <div className="lightbox-image-wrap">
            <img
              src={mirrorProductImage}
              alt="Retroviseur exterieur de voiture en grand format"
              className="lightbox-image"
              style={{ transform: `scale(${zoom})` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
