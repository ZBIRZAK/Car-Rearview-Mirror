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
  const isGlassPiece = isPieceOrder && selectedFeatureKey === 'GLASS';
  const isCoverPiece = isPieceOrder && selectedFeatureKey === 'COVER';
  const isSinglePiece = isPieceOrder && selectedFeatureKey === 'SINGLE';
  const lowerPieceOptions = (pieceSuggestedOptions || []).map((item) => String(item).toLowerCase());
  const COVER_COLOR_CANDIDATES = ['noir', 'blanc', 'gris', 'bleu', 'rouge', 'carbon'];
  const mappedCoverColors = (pieceSuggestedOptions || []).filter((item) => COVER_COLOR_CANDIDATES.includes(String(item).toLowerCase()));
  const coverColorOptions = mappedCoverColors.length ? mappedCoverColors : ['Noir', 'Blanc', 'Gris', 'Bleu', 'Rouge', 'Carbon'];
  const hasBatmanOption = lowerPieceOptions.includes('batman');
  const selectedCoverColor = coverColorOptions.find((item) => selectedOptions.some((opt) => String(opt).toLowerCase() === String(item).toLowerCase())) || '';
  const isBatmanSelected = selectedOptions.some((item) => String(item).toLowerCase() === 'batman');
  const hasDinamicOption = lowerPieceOptions.includes('dinamic');
  const isDinamicSelected = selectedOptions.some((item) => String(item).toLowerCase() === 'dinamic');
  const mappedSingleColors = (pieceSuggestedOptions || []).filter((item) => !['dinamic'].includes(String(item).toLowerCase()));
  const singleColorOptions = mappedSingleColors.length ? mappedSingleColors : ['Blanc', 'Noir'];
  const selectedSingleColor = singleColorOptions.find((item) => selectedOptions.some((opt) => String(opt).toLowerCase() === String(item).toLowerCase())) || '';
  const colorClassToken = (value) => String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const selectedPositions = Array.isArray(productConfig.position)
    ? productConfig.position
    : (productConfig.position ? [productConfig.position] : []);

  const togglePosition = (item) => {
    const nextPositions = selectedPositions.includes(item)
      ? selectedPositions.filter((value) => value !== item)
      : [...selectedPositions, item];
    onChange('position', nextPositions);
  };

  return (
    <>
      {hasCatalogSelection ? (
        <section className="config-group">
          <h3>{t('product_step2', '1. Cote du retroviseur')}</h3>
          {/* <p className="config-help">{t('product_step2_help', 'Selectionnez le cote du vehicule concerne.')}</p> */}
          <div className="choice-list position-choice-list">
            {positions.map((item) => (
              <div key={item} className="position-choice-item">
                <span className="position-choice-icon-wrap" aria-hidden="true">
                  <img src={positionIconByValue[item]} alt="" className="position-choice-icon" loading="lazy" decoding="async" />
                </span>
                <button
                  type="button"
                  className={`choice-btn position-choice-btn ${selectedPositions.includes(item) ? 'active' : ''}`}
                  onClick={() => togglePosition(item)}
                >
                  <span className="position-choice-label">{positionLabel(item)}</span>
                </button>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {hasCatalogSelection && isPieceOrder && (pieceSuggestedOptions.length || isCoverPiece || isSinglePiece) ? (
        isGlassPiece ? (
          <>
            {pieceSuggestedOptions.map((optionLabel, index) => {
              const isSelected = selectedOptions.includes(optionLabel);
              return (
                <section key={optionLabel} className="config-group">
                  <h3>{`${index + 2}. ${optionLabel}`}</h3>
                  <div className="adjustment-group-row">
                    {optionImageByLabel[optionLabel] ? (
                      <span className="adjustment-group-icon-wrap" aria-hidden="true">
                        <img
                          src={optionImageByLabel[optionLabel]}
                          alt=""
                          className="adjustment-group-icon"
                          loading="lazy"
                          decoding="async"
                        />
                      </span>
                    ) : (
                      <span className="adjustment-group-icon-wrap" aria-hidden="true" />
                    )}
                    <div className="adjustment-choice-row adjustment-choice-row-two">
                      <button
                        type="button"
                        className={`choice-btn ${isSelected ? 'active' : ''}`}
                        onClick={() => {
                          if (!isSelected) toggleOption(optionLabel);
                        }}
                      >
                        Oui
                      </button>
                      <button
                        type="button"
                        className={`choice-btn ${!isSelected ? 'active' : ''}`}
                        onClick={() => {
                          if (isSelected) toggleOption(optionLabel);
                        }}
                      >
                        Non
                      </button>
                    </div>
                  </div>
                </section>
              );
            })}
          </>
        ) : isCoverPiece ? (
          <>
            <section className="config-group">
              <h3>2. Couleur cover</h3>
              <div className="adjustment-group-row">
                <span className="adjustment-group-icon-wrap" aria-hidden="true">
                  <img src={formeOptionIcon} alt="" className="adjustment-group-icon" loading="lazy" decoding="async" />
                </span>
                <div className="cover-color-grid">
                  {coverColorOptions.map((colorLabel) => (
                    <button
                      key={colorLabel}
                      type="button"
                      className={`choice-btn cover-color-btn ${selectedCoverColor === colorLabel ? 'active' : ''}`}
                      aria-label={colorLabel}
                      title={colorLabel}
                      onClick={() => {
                        const otherOptions = selectedOptions.filter(
                          (item) => !coverColorOptions.some((color) => color.toLowerCase() === String(item).toLowerCase())
                        );
                        onChange('options', [...otherOptions, colorLabel]);
                      }}
                    >
                        <span className={`cover-color-dot cover-dot-${colorClassToken(colorLabel)}`} aria-hidden="true" />
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {hasBatmanOption ? (
              <section className="config-group">
                <h3>3. Batman</h3>
                <div className="adjustment-group-row">
                  <span className="adjustment-group-icon-wrap" aria-hidden="true">
                    <img src={formeOptionIcon} alt="" className="adjustment-group-icon" loading="lazy" decoding="async" />
                  </span>
                  <div className="adjustment-choice-row adjustment-choice-row-two">
                    <button
                      type="button"
                      className={`choice-btn ${isBatmanSelected ? 'active' : ''}`}
                      onClick={() => {
                        if (isBatmanSelected) return;
                        onChange('options', [...selectedOptions.filter((item) => item !== 'BATMAN' && item !== 'Batman'), 'Batman']);
                      }}
                    >
                      Oui
                    </button>
                    <button
                      type="button"
                      className={`choice-btn ${!isBatmanSelected ? 'active' : ''}`}
                      onClick={() => {
                        if (!isBatmanSelected) return;
                        onChange('options', selectedOptions.filter((item) => item !== 'BATMAN' && item !== 'Batman'));
                      }}
                    >
                      Non
                    </button>
                  </div>
                </div>
              </section>
            ) : null}
          </>
        ) : isSinglePiece ? (
          <>
            <section className="config-group">
              <h3>2. Couleur</h3>
              <div className="adjustment-group-row">
                <span className="adjustment-group-icon-wrap" aria-hidden="true">
                  <img src={formeOptionIcon} alt="" className="adjustment-group-icon" loading="lazy" decoding="async" />
                </span>
                <div className="single-color-grid">
                  {singleColorOptions.map((colorLabel) => (
                    <button
                      key={colorLabel}
                      type="button"
                      className={`choice-btn cover-color-btn ${selectedSingleColor === colorLabel ? 'active' : ''}`}
                      aria-label={colorLabel}
                      title={colorLabel}
                      onClick={() => {
                        const otherOptions = selectedOptions.filter(
                          (item) => !singleColorOptions.some((color) => color.toLowerCase() === String(item).toLowerCase())
                        );
                        onChange('options', [...otherOptions, colorLabel]);
                      }}
                    >
                      <span className={`cover-color-dot cover-dot-${colorClassToken(colorLabel)}`} aria-hidden="true" />
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {hasDinamicOption ? (
              <section className="config-group">
                <h3>3. Dinamic</h3>
                <div className="adjustment-group-row">
                  <span className="adjustment-group-icon-wrap" aria-hidden="true">
                    <img src={sousEclairageOptionIcon} alt="" className="adjustment-group-icon" loading="lazy" decoding="async" />
                  </span>
                  <div className="adjustment-choice-row adjustment-choice-row-two">
                    <button
                      type="button"
                      className={`choice-btn ${isDinamicSelected ? 'active' : ''}`}
                      onClick={() => {
                        if (isDinamicSelected) return;
                        onChange('options', [...selectedOptions.filter((item) => item !== 'DINAMIC'), 'DINAMIC']);
                      }}
                    >
                      Oui
                    </button>
                    <button
                      type="button"
                      className={`choice-btn ${!isDinamicSelected ? 'active' : ''}`}
                      onClick={() => {
                        if (!isDinamicSelected) return;
                        onChange('options', selectedOptions.filter((item) => item !== 'DINAMIC'));
                      }}
                    >
                      Non
                    </button>
                  </div>
                </div>
              </section>
            ) : null}
          </>
        ) : (
          <section className="config-group">
            <h3>{`${t('product_piece_options_title', '2. Options pour la piece')} (${selectedFeatureKey || 'PIECE'})`}</h3>
            <div className="feature-grid">
              <button
                type="button"
                className={`feature-card ${pieceSuggestedOptions.every((item) => !selectedOptions.includes(item)) ? 'active' : ''}`}
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
                    <span className="feature-card-icon" aria-hidden="true">
                      <img
                        src={optionImageByLabel[optionLabel]}
                        alt=""
                        className="feature-card-icon-img"
                        loading="lazy"
                        decoding="async"
                      />
                    </span>
                  ) : pieceOptionIconByLabel[optionLabel] ? (
                    <span className="feature-card-icon" aria-hidden="true">
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
        )
      ) : null}

      {hasCatalogSelection && isCompleteOrder ? (
        <section className="config-group">
          <h3>2. Reglage</h3>
          <div className="adjustment-group">
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
        </section>
      ) : null}

      {hasCatalogSelection && isCompleteOrder ? (
        <section className="config-group">
          <h3>3. Rabattement</h3>
          <div className="adjustment-group">
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
        </section>
      ) : null}

      {hasCatalogSelection && isCompleteOrder ? (
        <section className="config-group">
          <h3>4. Options du retroviseur (optionnel)</h3>
          {/* <p className="config-help">Choisissez les options visibles pour votre retroviseur complet.</p> */}
          <div className="feature-grid">
            {visibleFeatureCards.map((card) => (
              <button
                key={card.key}
                type="button"
                className={`feature-card ${selectedOptions.includes(card.key) ? 'active' : ''}`}
                onClick={() => toggleOption(card.key)}
              >
                <span className="feature-card-icon">
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
                  <span className="feature-card-sub">{card.feature}</span>
                </span>
              </button>
            ))}
          </div>
        </section>
      ) : null}

    </>
  );
}
