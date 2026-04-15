import React from 'react';
import FeatureIcon from './FeatureIcon';
import conducteurIcon from '../../images/new-icones/Conducteur.png';
import passagerIcon from '../../images/new-icones/Passager.png';
import glaceOptionIcon from '../../images/new-icones/Glace.png';
import sousEclairageOptionIcon from '../../images/new-icones/Sous-eclairage.png';
import formeOptionIcon from '../../images/new-icones/Forme.png';
import chauffageOptionIcon from '../../images/new-icones/Chauffage.png';
import memoireOptionIcon from '../../images/new-icones/Memoire.png';
import antiEblouissementOptionIcon from '../../images/new-icones/Anti-eblouissement.png';
import cameraOptionIcon from '../../images/new-icones/Camera.png';
import angleMortOptionIcon from '../../images/new-icones/Angle mort.png';
import reglageIcon from '../../images/new-icones/Reglage.png';
import rabattementIcon from '../../images/new-icones/rabattement.png';

export default function ProductOptionsSection({
  t,
  hasCatalogSelection,
  positions,
  productConfig,
  onChange,
  positionLabel,
  isPieceOrder,
  pieceSuggestedOptions,
  selectedFeatureKey,
  selectedOptions,
  toggleOption,
  pieceOptionIconByLabel,
  isCompleteOrder,
  visibleFeatureCards,
}) {
  const positionIconByValue = {
    'Cote conducteur': conducteurIcon,
    'Cote passager': passagerIcon,
  };
  const completeOptionIconByKey = {
    'Glace retroviseur': glaceOptionIcon,
    'Eclairage sous retroviseur': sousEclairageOptionIcon,
    'Forme retroviseur': formeOptionIcon,
    'Chauffage glace': chauffageOptionIcon,
    'Memoire position': memoireOptionIcon,
    'Anti-eblouissement': antiEblouissementOptionIcon,
    Camera: cameraOptionIcon,
    'Angle mort': angleMortOptionIcon,
  };
  const optionImageByLabel = {
    'Glace retroviseur': glaceOptionIcon,
    Glace: glaceOptionIcon,
    Heating: chauffageOptionIcon,
    'Chauffage glace': chauffageOptionIcon,
    'Anti-eblouissement': antiEblouissementOptionIcon,
    'Anti-light': antiEblouissementOptionIcon,
    Camera: cameraOptionIcon,
    CAMERA: cameraOptionIcon,
    'Angle mort': angleMortOptionIcon,
    'Blind spot': angleMortOptionIcon,
    'Memoire position': memoireOptionIcon,
    Memory: memoireOptionIcon,
    'Eclairage sous retroviseur': sousEclairageOptionIcon,
    'Sous-eclairage': sousEclairageOptionIcon,
    Underlight: sousEclairageOptionIcon,
    'Forme retroviseur': formeOptionIcon,
    Forme: formeOptionIcon,
    'Reglage electrique': reglageIcon,
    'ELECTRIC / MANUAL': reglageIcon,
    FOLDING: rabattementIcon,
  };
  const currentAdjustment = (productConfig.adjustmentType || '').toLowerCase();
  const selectedReglage = currentAdjustment.includes('reglage electrique')
    ? 'electrique'
    : currentAdjustment.includes('reglage manuel')
      ? 'manuel'
      : '';
  const selectedRabattement = currentAdjustment.includes('rabattement automatique')
    ? 'automatique'
    : (currentAdjustment.includes('rabattement electrique') || currentAdjustment.includes('rabattable electrique'))
      ? 'electrique'
      : (currentAdjustment.includes('rabattement manuel') || currentAdjustment.includes('rabattable manuel'))
        ? 'manuel'
        : '';

  const composeAdjustmentType = (reglageValue, rabattementValue) => {
    const reglageLabel = reglageValue ? `Reglage ${reglageValue}` : '';
    const rabattementLabel = rabattementValue ? `Rabattement ${rabattementValue}` : '';
    if (reglageLabel && rabattementLabel) return `${reglageLabel} + ${rabattementLabel}`;
    return reglageLabel || rabattementLabel || '';
  };

  const selectReglage = (value) => {
    onChange('adjustmentType', composeAdjustmentType(value, selectedRabattement));
  };

  const selectRabattement = (value) => {
    onChange('adjustmentType', composeAdjustmentType(selectedReglage, value));
  };

  return (
    <>
      {hasCatalogSelection ? (
        <section className="config-group">
          <h3>{t('product_step2', '2. Cote du retroviseur')}</h3>
          {/* <p className="config-help">{t('product_step2_help', 'Selectionnez le cote du vehicule concerne.')}</p> */}
          <div className="choice-list position-choice-list">
            {positions.map((item) => (
              <div key={item} className="position-choice-item">
                <span className="position-choice-icon-wrap" aria-hidden="true">
                  <img src={positionIconByValue[item]} alt="" className="position-choice-icon" loading="lazy" decoding="async" />
                </span>
                <button
                  type="button"
                  className={`choice-btn position-choice-btn ${productConfig.position === item ? 'active' : ''}`}
                  onClick={() => onChange('position', item)}
                >
                  <span className="position-choice-label">{positionLabel(item)}</span>
                </button>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {hasCatalogSelection && isPieceOrder && pieceSuggestedOptions.length ? (
        <section className="config-group">
          <h3>{t('product_piece_options_title', '3. Options pour la piece')} ({selectedFeatureKey || 'PIECE'})</h3>
          {/* <p className="config-help">{t('product_piece_options_help', 'Options facultatives. Choisissez "Juste la piece" si vous ne voulez rien ajouter.')}</p> */}
          <div className="feature-grid feature-grid-pill piece-feature-grid">
            <button
              type="button"
              className={`feature-card piece-only-card ${pieceSuggestedOptions.every((item) => !selectedOptions.includes(item)) ? 'active' : ''}`}
              onClick={() => {
                const nextOptions = selectedOptions.filter((item) => !pieceSuggestedOptions.includes(item));
                onChange('options', nextOptions);
              }}
            >
              <span className="feature-card-texts">
                <span className="feature-card-title">{t('product_only_piece', 'Juste la piece (sans option)')}</span>
              </span>
            </button>
            {pieceSuggestedOptions.map((optionLabel) => (
              <button
                key={optionLabel}
                type="button"
                className={`feature-card ${selectedOptions.includes(optionLabel) ? 'active' : ''}`}
                onClick={() => toggleOption(optionLabel)}
              >
                {optionImageByLabel[optionLabel] ? (
                  <span className="feature-card-icon feature-card-icon-pill" aria-hidden="true">
                    <img
                      src={optionImageByLabel[optionLabel]}
                      alt=""
                      className="feature-card-icon-img"
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                ) : pieceOptionIconByLabel[optionLabel] ? (
                  <span className="feature-card-icon feature-card-icon-pill" aria-hidden="true">
                    <FeatureIcon type={pieceOptionIconByLabel[optionLabel]} />
                  </span>
                ) : null}
                <span className="feature-card-texts">
                  <span className="feature-card-title">{optionLabel}</span>
                </span>
              </button>
            ))}
          </div>
        </section>
      ) : null}

      {hasCatalogSelection && isCompleteOrder ? (
        <section className="config-group">
          <h3>4. Type de reglage</h3>
          <div className="adjustment-selector">
            <div className="adjustment-group">
              <p className="adjustment-group-title">• Reglage</p>
              <div className="adjustment-group-row">
                <span className="adjustment-group-icon-wrap" aria-hidden="true">
                  <img src={reglageIcon} alt="" className="adjustment-group-icon" loading="lazy" decoding="async" />
                </span>
                <div className="adjustment-choice-row adjustment-choice-row-two">
                  <button
                    type="button"
                    className={`choice-btn adjustment-choice-btn ${selectedReglage === 'manuel' ? 'active' : ''}`}
                    onClick={() => selectReglage('manuel')}
                  >
                    Manuel
                  </button>
                  <button
                    type="button"
                    className={`choice-btn adjustment-choice-btn ${selectedReglage === 'electrique' ? 'active' : ''}`}
                    onClick={() => selectReglage('electrique')}
                  >
                    Electrique
                  </button>
                </div>
              </div>
            </div>

            <div className="adjustment-group">
              <p className="adjustment-group-title">• Rabattement</p>
              <div className="adjustment-group-row">
                <span className="adjustment-group-icon-wrap" aria-hidden="true">
                  <img src={rabattementIcon} alt="" className="adjustment-group-icon" loading="lazy" decoding="async" />
                </span>
                <div className="adjustment-choice-row adjustment-choice-row-three">
                  <button
                    type="button"
                    className={`choice-btn adjustment-choice-btn ${selectedRabattement === 'manuel' ? 'active' : ''}`}
                    onClick={() => selectRabattement('manuel')}
                  >
                    Manuel
                  </button>
                  <button
                    type="button"
                    className={`choice-btn adjustment-choice-btn ${selectedRabattement === 'electrique' ? 'active' : ''}`}
                    onClick={() => selectRabattement('electrique')}
                  >
                    Electrique
                  </button>
                  <button
                    type="button"
                    className={`choice-btn adjustment-choice-btn ${selectedRabattement === 'automatique' ? 'active' : ''}`}
                    onClick={() => selectRabattement('automatique')}
                  >
                    Automatique
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {hasCatalogSelection && isCompleteOrder ? (
        <section className="config-group">
          <h3>5. Options du retroviseur (optionnel)</h3>
          {/* <p className="config-help">Choisissez les options visibles pour votre retroviseur complet.</p> */}
          <div className="feature-grid feature-grid-pill">
            {visibleFeatureCards.map((card) => (
              <button
                key={card.key}
                type="button"
                className={`feature-card ${selectedOptions.includes(card.key) ? 'active' : ''}`}
                onClick={() => toggleOption(card.key)}
              >
                <span className="feature-card-icon feature-card-icon-pill">
                  {completeOptionIconByKey[card.key] ? (
                    <img
                      src={completeOptionIconByKey[card.key]}
                      alt=""
                      className="feature-card-icon-img"
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <FeatureIcon type={card.icon} />
                  )}
                </span>
                <span className="feature-card-texts">
                  <span className="feature-card-title">{card.label}</span>
                  {/* <span className="feature-card-sub">{card.feature}</span> */}
                </span>
              </button>
            ))}
          </div>
        </section>
      ) : null}

    </>
  );
}
