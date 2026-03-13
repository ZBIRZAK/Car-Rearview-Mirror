import React, { useMemo, useState } from 'react';
import mirrorProductImage from '../images/side-rear-view-mirror-on-a-car-transparent-background-png.webp';

const positions = ['Cote conducteur', 'Cote passager'];
const completeTypeLabel = 'Retroviseur complet (ensemble pret a monter)';

const pieceTypes = [
  'Glace de retroviseur uniquement',
  'Coque / Cache exterieur uniquement',
  'Support / Platine de fixation',
  'Moteur de reglage',
  'Clignotant integre seul',
];

const adjustmentTypes = [
  'Reglage manuel',
  'Reglage electrique',
  'Rabattable manuel',
  'Rabattable electrique',
  'Rabattement automatique',
];

const featureCards = [
  { key: 'Glace retroviseur', label: 'Glace', feature: 'Verre du retroviseur', icon: 'glass', pieceType: 'Glace de retroviseur uniquement', optionHints: ['Chauffage glace', 'Anti-eblouissement', 'Angle mort'] },
  { key: 'Rabattement electrique', label: 'Rabattement', feature: 'Rabattement electrique', icon: 'folding', pieceType: 'Moteur de reglage', optionHints: ['Electrique', 'Rabattable', 'Memoire position'] },
  { key: 'Eclairage sous retroviseur', label: 'Sous-eclairage', feature: 'Lumiere sous retroviseur', icon: 'underlight', pieceType: 'Clignotant integre seul', optionHints: ['Eclairage sous retroviseur', 'Lumiere simple', 'Lumiere dynamique'] },
  { key: 'Forme retroviseur', label: 'Forme', feature: 'Forme du retroviseur', icon: 'shape', pieceType: 'Coque / Cache exterieur uniquement', optionHints: ['Cache', 'Couleurs', 'Carbone', 'Batman'] },
  { key: 'Chauffage glace', label: 'Chauffage', feature: 'Chauffage de la glace', icon: 'heating', pieceType: 'Glace de retroviseur uniquement', optionHints: ['Chauffage glace', 'Glace retroviseur'] },
  { key: 'Memoire position', label: 'Memoire', feature: 'Memoire de position', icon: 'memory', pieceType: 'Moteur de reglage', optionHints: ['Memoire position', 'Reglage electrique'] },
  { key: 'Reglage electrique', label: 'Reglage electrique', feature: 'Commande electrique', icon: 'adjustment', pieceType: 'Moteur de reglage', optionHints: ['Reglage electrique', 'Commande directionnelle'] },
  { key: 'Anti-eblouissement', label: 'Anti-eblouissement', feature: 'Verre anti-lumiere', icon: 'antiLight', pieceType: 'Glace de retroviseur uniquement', optionHints: ['Anti-eblouissement', 'Glace retroviseur'] },
  { key: 'Clignotant', label: 'Clignotant', feature: 'Lampe / indicateur', icon: 'lamp', pieceType: 'Clignotant integre seul', optionHints: ['Clignotant', 'Lumiere simple', 'Lumiere dynamique'] },
  { key: 'Commande directionnelle', label: 'Commande', feature: 'Controle du mouvement', icon: 'controller', pieceType: 'Moteur de reglage', optionHints: ['Commande directionnelle', 'Reglage electrique'] },
  { key: 'Angle mort', label: 'Angle mort', feature: 'Detection angle mort', icon: 'blindSpot', pieceType: 'Glace de retroviseur uniquement', optionHints: ['Angle mort', 'Anti-eblouissement'] },
  { key: 'Camera', label: 'Camera', feature: 'Camera integree', icon: 'camera', pieceType: 'Support / Platine de fixation', optionHints: ['Camera', 'Support / Platine'] },
];

const optionGroups = [
  {
    title: 'GLASS',
    options: ['Glace retroviseur', 'Chauffage glace', 'Anti-eblouissement', 'Angle mort'],
  },
  {
    title: 'MIRROR',
    options: ['Forme retroviseur', 'Electrique', 'Manuel', 'Rabattable', 'Reglage electrique', 'Commande directionnelle', 'Memoire position', 'Camera'],
  },
  {
    title: 'LIGHT',
    options: ['Eclairage sous retroviseur', 'Clignotant', 'Lumiere simple', 'Lumiere dynamique'],
  },
  {
    title: 'COVER',
    options: ['Cache', 'Couleurs', 'Carbone', 'Batman'],
  },
];

function FeatureIcon({ type }) {
  if (type === 'glass') {
    return (
      <svg viewBox="0 0 64 64" className="feature-icon-svg" aria-hidden="true">
        <path d="M8 16h30l10 9v23H8z" fill="#111" />
        <path d="M14 22h20l7 6v15H14z" fill="#e8ecef" />
        <path d="M22 30l4-3M24 35l5-3M19 35l3-2" stroke="#6a737d" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === 'folding') {
    return (
      <svg viewBox="0 0 64 64" className="feature-icon-svg" aria-hidden="true">
        <path d="M8 18h31l9 8v20H8z" fill="#111" />
        <path d="M49 45c5-4 8-9 8-15 0-6-3-10-9-14" stroke="#111" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M50 13l8 2-4 7z" fill="#111" />
        <path d="M30 22l-5 10h5l-2 8 9-12h-6l3-6z" fill="#d83a2f" />
      </svg>
    );
  }
  if (type === 'underlight') {
    return (
      <svg viewBox="0 0 64 64" className="feature-icon-svg" aria-hidden="true">
        <path d="M8 17h31l9 8v20H8z" fill="#111" />
        <path d="M26 36h20v5H26z" fill="#d83a2f" />
        <path d="M25 45l-3 5M32 45v6M39 45l2 5M46 45l3 5" stroke="#111" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === 'shape') {
    return (
      <svg viewBox="0 0 64 64" className="feature-icon-svg" aria-hidden="true">
        <path d="M9 47l14-26h27c5 0 8 3 8 7v11c0 4-3 8-9 8H9z" fill="#111" />
        <path d="M9 47l14-26v26z" fill="none" stroke="#111" strokeWidth="2.4" />
      </svg>
    );
  }
  if (type === 'heating') {
    return (
      <svg viewBox="0 0 64 64" className="feature-icon-svg" aria-hidden="true">
        <rect x="8" y="8" width="48" height="48" rx="6" fill="#111" />
        <path d="M20 45c2-4 2-7 0-10-2-3-2-7 0-11M32 45c2-4 2-7 0-10-2-3-2-7 0-11M44 45c2-4 2-7 0-10-2-3-2-7 0-11" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === 'memory') {
    return (
      <svg viewBox="0 0 64 64" className="feature-icon-svg" aria-hidden="true">
        <path d="M12 48h40V16H12z" fill="#fff" stroke="#111" strokeWidth="2.2" />
        <path d="M12 48h40v8H12z" fill="#e8ecef" stroke="#111" strokeWidth="2.2" />
        <text x="32" y="36" textAnchor="middle" fontSize="22" fontWeight="700" fill="#111" fontFamily="Arial, sans-serif">M</text>
      </svg>
    );
  }
  if (type === 'adjustment') {
    return (
      <svg viewBox="0 0 64 64" className="feature-icon-svg" aria-hidden="true">
        <path d="M18 12h28c5 0 8 3 8 8v24c0 5-3 8-8 8H18z" fill="#111" />
        <path d="M32 23v18M23 32h18M26 26l-4 4 4 4M38 26l4 4-4 4M26 38l-4-4 4-4M38 38l4-4-4-4" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === 'antiLight') {
    return (
      <svg viewBox="0 0 64 64" className="feature-icon-svg" aria-hidden="true">
        <path d="M10 42l12-20h26c4 0 7 3 7 7v9c0 4-3 7-8 7H10z" fill="#fff" stroke="#111" strokeWidth="2.2" />
        <path d="M12 42l12-20v20z" fill="#fff" stroke="#111" strokeWidth="2.2" />
        <path d="M24 26h26c3 0 5 2 5 5v7c0 2-2 4-5 4H24z" fill="#3a74d8" />
        <path d="M35 26v16" stroke="#c9d5ea" strokeWidth="2" />
      </svg>
    );
  }
  if (type === 'lamp') {
    return (
      <svg viewBox="0 0 64 64" className="feature-icon-svg" aria-hidden="true">
        <path d="M8 17h31l9 8v20H8z" fill="#111" />
        <path d="M39 35h8v6h-8z" fill="#d83a2f" />
        <path d="M51 35l5-1M51 38h6M51 41l5 1" stroke="#d83a2f" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === 'controller') {
    return (
      <svg viewBox="0 0 64 64" className="feature-icon-svg" aria-hidden="true">
        <rect x="10" y="10" width="44" height="44" rx="8" fill="#fff" stroke="#111" strokeWidth="2.2" />
        <path d="M32 18l4 7h-8zM32 46l-4-7h8zM18 32l7-4v8zM46 32l-7 4v-8z" fill="#111" />
      </svg>
    );
  }
  if (type === 'blindSpot') {
    return (
      <svg viewBox="0 0 64 64" className="feature-icon-svg" aria-hidden="true">
        <path d="M10 42l12-20h26c4 0 7 3 7 7v9c0 4-3 7-8 7H10z" fill="#fff" stroke="#111" strokeWidth="2.2" />
        <path d="M12 42l12-20v20z" fill="#fff" stroke="#111" strokeWidth="2.2" />
        <path d="M18 40l6-10 6 10z" fill="#d83a2f" />
      </svg>
    );
  }
  if (type === 'camera') {
    return (
      <svg viewBox="0 0 64 64" className="feature-icon-svg" aria-hidden="true">
        <path d="M8 16h30l10 9v23H8z" fill="#111" />
        <path d="M14 22h20l7 6v15H14z" fill="#e8ecef" />
        <circle cx="22" cy="45" r="6" fill="#fff" stroke="#111" strokeWidth="2.2" />
        <circle cx="22" cy="45" r="2.5" fill="#111" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 64 64" className="feature-icon-svg" aria-hidden="true">
      <circle cx="32" cy="32" r="10" fill="#111" />
    </svg>
  );
}

export default function Product({ brand, model, year, productConfig, onChange, onContinue }) {
  if (!year) return null;

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [showValidationHint, setShowValidationHint] = useState(false);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [showManualPiecePicker, setShowManualPiecePicker] = useState(false);

  const selectedOptions = productConfig.options || [];
  const isCompleteOrder = productConfig.orderScope === 'complete';
  const isPieceOrder = productConfig.orderScope === 'piece';
  const selectedFeatureKey = productConfig.selectedFeature || '';
  const selectedFeature = featureCards.find((item) => item.key === selectedFeatureKey) || null;

  const requiredMissing = useMemo(() => {
    const missing = [];
    if (!productConfig.orderScope) missing.push('type de commande');
    if (!productConfig.position) missing.push('position');
    if (!productConfig.productType) missing.push('type de produit');
    if (productConfig.orderScope === 'complete' && !productConfig.adjustmentType) missing.push('type de reglage');
    return missing;
  }, [productConfig.orderScope, productConfig.position, productConfig.productType, productConfig.adjustmentType]);

  const canContinue = requiredMissing.length === 0;

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

  const toggleOption = (optionLabel) => {
    const nextOptions = selectedOptions.includes(optionLabel)
      ? selectedOptions.filter((item) => item !== optionLabel)
      : [...selectedOptions, optionLabel];
    onChange('options', nextOptions);
  };

  const handleFeatureSelect = (feature) => {
    onChange('selectedFeature', feature.key);
    onChange('orderScope', 'piece');
    onChange('productType', feature.pieceType);
    setShowManualPiecePicker(false);
  };

  const advancedStepNumber = isCompleteOrder ? 6 : 5;

  const handleOrderScopeSelect = (scope) => {
    if (scope === 'complete') {
      onChange('orderScope', 'complete');
      onChange('productType', completeTypeLabel);
      onChange('selectedFeature', '');
      return;
    }

    onChange('orderScope', 'piece');
    if (productConfig.productType === completeTypeLabel) {
      onChange('productType', '');
    }
  };

  const contextualOptionGroups = useMemo(() => {
    if (!isPieceOrder || !selectedFeature) return optionGroups;

    return [
      {
        title: 'OPTIONS RECOMMANDEES POUR CETTE PIECE',
        options: selectedFeature.optionHints,
      },
      ...optionGroups,
    ];
  }, [isPieceOrder, selectedFeature]);

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
        <span className="step-pill">Etape 3 sur 4</span>
        <h2>Configurez votre demande</h2>
        <p>{brand?.name} {model} ({year})</p>
      </div>

      <div className="product-layout">
        <aside className="product-preview product-preview-v2">
          <button type="button" className="product-image-trigger" onClick={openLightbox}>
            <img src={mirrorProductImage} alt="Retroviseur exterieur de voiture" className="product-brand-image" />
          </button>
          <p className="image-hint">Appuyez sur l'image pour zoomer</p>

          {!isCompleteOrder ? (
            <div className="piece-slider-block">
              <p className="piece-slider-title">Choisissez la piece via icone (definit automatiquement commande piece).</p>
              <div className="piece-slider" role="listbox" aria-label="Selection de piece par icone">
                {featureCards.map((card) => (
                  <button
                    key={card.key}
                    type="button"
                    className={`piece-icon-btn ${selectedFeatureKey === card.key ? 'active' : ''}`}
                    onClick={() => handleFeatureSelect(card)}
                  >
                    <span className="piece-icon-art">
                      <FeatureIcon type={card.icon} />
                    </span>
                    <span className="piece-icon-label">{card.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <div className="product-mini-summary">
            <p><strong>Commande :</strong> {isCompleteOrder ? 'Complete' : isPieceOrder ? 'Piece' : 'Non definie'}</p>
            <p><strong>Position :</strong> {productConfig.position || 'Aucune'}</p>
            <p><strong>Type :</strong> {productConfig.productType || 'Aucun'}</p>
            <p><strong>Piece cible :</strong> {selectedFeature?.label || 'Non definie'}</p>
            <p><strong>Reglage :</strong> {productConfig.adjustmentType || (isPieceOrder ? 'Optionnel' : 'Aucun')}</p>
            <p><strong>Options :</strong> {selectedOptions.length ? selectedOptions.join(', ') : 'Aucune'}</p>
          </div>

            {requiredMissing.length ? (
              <div className="missing-required-box">
                <p>Champs requis manquants:</p>
                <ul>
                  {requiredMissing.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ) : null}
        </aside>

        <div className="product-config">
          <section className="config-group">
            <h3>1. Type de commande</h3>
            <p className="config-help">Choisissez ce que vous voulez commander.</p>
            <div className="order-scope-grid">
              <button
                type="button"
                className={`order-scope-card ${isCompleteOrder ? 'active' : ''}`}
                onClick={() => handleOrderScopeSelect('complete')}
              >
                <span className="order-scope-title">Retroviseur complet</span>
                <span className="order-scope-sub">Produit complet pret a monter</span>
              </button>
              <button
                type="button"
                className={`order-scope-card ${isPieceOrder ? 'active' : ''}`}
                onClick={() => handleOrderScopeSelect('piece')}
              >
                <span className="order-scope-title">Piece uniquement</span>
                <span className="order-scope-sub">Exemple: seulement la glace</span>
              </button>
            </div>
          </section>

          <section className="config-group">
            <h3>2. Cote du retroviseur</h3>
            <p className="config-help">Choisissez le cote: conducteur ou passager.</p>
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
          </section>

          <section className="config-group">
            <h3>3. Produit a commander</h3>
            <p className="config-help">
              {isCompleteOrder
                ? 'Mode complet: type deja defini.'
                : selectedFeature && !showManualPiecePicker
                  ? 'Piece definie via l icone selectionnee.'
                  : 'Mode piece: choisissez la piece exacte.'}
            </p>

            {isCompleteOrder ? (
              <div className="choice-list">
                <button type="button" className="choice-btn active" onClick={() => onChange('productType', completeTypeLabel)}>
                  {completeTypeLabel}
                </button>
              </div>
            ) : (
              <>
                {selectedFeature && !showManualPiecePicker ? (
                  <div className="choice-list">
                    <button type="button" className="choice-btn active">
                      {productConfig.productType}
                    </button>
                    <button
                      type="button"
                      className="secondary-button"
                      onClick={() => setShowManualPiecePicker(true)}
                    >
                      Changer la piece manuellement
                    </button>
                  </div>
                ) : (
                  <div className="choice-list piece-type-grid">
                    {pieceTypes.map((item) => (
                      <button
                        key={item}
                        type="button"
                        className={`choice-btn ${productConfig.productType === item ? 'active' : ''}`}
                        onClick={() => {
                          onChange('productType', item);
                          const match = featureCards.find((card) => card.pieceType === item);
                          if (match) onChange('selectedFeature', match.key);
                          setShowManualPiecePicker(false);
                        }}
                        disabled={!isPieceOrder}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </section>

          <section className="config-group">
            <h3>4. Type de reglage {isPieceOrder ? '(optionnel)' : ''}</h3>
            <p className="config-help">
              {isPieceOrder
                ? 'Si vous ne savez pas, laissez vide. Notre equipe verifiera avec vous.'
                : 'Obligatoire pour un retroviseur complet.'}
            </p>
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
          </section>

          {isCompleteOrder ? (
            <section className="config-group">
              <h3>5. Options du retroviseur (optionnel)</h3>
              <p className="config-help">Choisissez les options visibles pour votre retroviseur complet.</p>
              <div className="feature-grid">
                {featureCards.map((card) => (
                  <button
                    key={card.key}
                    type="button"
                    className={`feature-card ${selectedOptions.includes(card.key) ? 'active' : ''}`}
                    onClick={() => toggleOption(card.key)}
                  >
                    <span className="feature-card-icon">
                      <FeatureIcon type={card.icon} />
                    </span>
                    <span className="feature-card-title">{card.label}</span>
                    <span className="feature-card-sub">{card.feature}</span>
                  </button>
                ))}
              </div>
            </section>
          ) : null}

          <div className="advanced-toggle-wrap">
            <button
              type="button"
              className="secondary-button advanced-toggle-btn"
              onClick={() => setShowAdvancedOptions((prev) => !prev)}
            >
              {showAdvancedOptions ? 'Masquer les options avancees' : 'Afficher les options avancees'}
            </button>
          </div>

          {showAdvancedOptions ? (
            <section className="config-group">
              <h3>{advancedStepNumber}. Details supplementaires (optionnel)</h3>
              <p className="config-help">Options techniques detaillees par categorie.</p>
              <div className="option-groups">
                  {contextualOptionGroups.map((group) => (
                    <div key={group.title} className="option-group">
                    <p className="option-group-title">{group.title}</p>
                    <div className="option-chip-list">
                      {group.options.map((optionLabel) => (
                        <button
                          key={optionLabel}
                          type="button"
                          className={`option-chip ${selectedOptions.includes(optionLabel) ? 'active' : ''}`}
                          onClick={() => toggleOption(optionLabel)}
                        >
                          {optionLabel}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          <button type="button" className="submit-button" onClick={handleContinue}>
            Continuer vers le formulaire
          </button>

          {showValidationHint && !canContinue ? (
            <p className="inline-hint-error">
              Merci de completer les champs requis avant de continuer.
            </p>
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
