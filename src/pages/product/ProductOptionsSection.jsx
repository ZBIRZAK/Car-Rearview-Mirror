import React from 'react';
import FeatureIcon from './FeatureIcon';
import conducteurIcon from '../../images/new-icones/Conducteur-v2.png';
import passagerIcon from '../../images/new-icones/Passager-v2.png';
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
  selectedFeatureKey,
  selectedOptions,
  toggleOption,
  isCompleteOrder,
  selectedOptionDefs,
  showAdjustmentSection,
  showPositionSection,
}) {
  const positionIconByValue = {
    'Cote conducteur': conducteurIcon,
    'Cote passager': passagerIcon,
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
    Rabattement: rabattementIcon,
    'Rabattement electrique': rabattementIcon,
    FOLDING: rabattementIcon,
  };
  const currentAdjustment = (productConfig.adjustmentType || '').toLowerCase();
  const selectedReglage = currentAdjustment.includes('reglage electrique')
    ? 'electrique'
    : currentAdjustment.includes('reglage manuel')
      ? 'manuel'
      : '';
  const composeAdjustmentType = (reglageValue) => {
    const reglageLabel = reglageValue ? `Reglage ${reglageValue}` : '';
    return reglageLabel || '';
  };

  const selectReglage = (value) => {
    onChange('adjustmentType', composeAdjustmentType(value));
  };
  const normalizedOptionDefs = (selectedOptionDefs || [])
    .map((item) => ({
      key: String(item?.key || item?.label || '').trim(),
      label: String(item?.label || item?.key || '').trim(),
      icon: String(item?.icon || '').trim(),
      imageSrc: String(item?.imageSrc || '').trim(),
    }))
    .filter((item) => item.key && item.label);
  const isCoverPiece = isPieceOrder && String(selectedFeatureKey || '').toUpperCase() === 'COVER';
  const coverBatmanOption = isCoverPiece
    ? normalizedOptionDefs.find((item) => String(item.key || item.label || '').toLowerCase() === 'batman')
    : null;
  const coverColorOptions = isCoverPiece
    ? normalizedOptionDefs.filter((item) => item.key !== coverBatmanOption?.key)
    : [];
  const selectedCoverColorKey = coverColorOptions.find((item) => selectedOptions.includes(item.key))?.key || '';
  const isBatmanSelected = coverBatmanOption ? selectedOptions.includes(coverBatmanOption.key) : false;
  const colorClassToken = (value) => String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const coverColorFallbackByToken = {
    noir: '#0f1012',
    black: '#0f1012',
    blanc: '#f2f4f7',
    white: '#f2f4f7',
    gris: '#8f949b',
    gray: '#8f949b',
    grey: '#8f949b',
    bleu: '#2f76dc',
    blue: '#2f76dc',
    rouge: '#d43a3a',
    red: '#d43a3a',
    carbon: 'linear-gradient(135deg, #2d3137 0%, #15181d 100%)',
  };
  const getCoverDotStyle = (label) => {
    const token = colorClassToken(label);
    const fallback = coverColorFallbackByToken[token];
    if (!fallback) return undefined;
    return String(fallback).startsWith('linear-gradient')
      ? { backgroundImage: fallback, backgroundColor: 'transparent' }
      : { backgroundColor: fallback };
  };
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
      {hasCatalogSelection && showPositionSection ? (
        <section className="config-group position-config-group">
          <h3>{t('product_step2', '1. Cote du retroviseur')}</h3>
          {/* <p className="config-help">{t('product_step2_help', 'Selectionnez le cote du vehicule concerne.')}</p> */}
          <div className="position-choice-layout">
            <span className="position-side-icon left" aria-hidden="true">
              <img src={positionIconByValue['Cote conducteur']} alt="" className="position-side-icon-img" loading="lazy" decoding="async" />
            </span>
            <div className="choice-list position-choice-list">
              {positions.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`choice-btn position-choice-btn ${selectedPositions.includes(item) ? 'active' : ''}`}
                  onClick={() => togglePosition(item)}
                >
                  <span className="position-choice-label">{positionLabel(item)}</span>
                </button>
              ))}
            </div>
            <span className="position-side-icon right" aria-hidden="true">
              <img src={positionIconByValue['Cote passager']} alt="" className="position-side-icon-img" loading="lazy" decoding="async" />
            </span>
          </div>
        </section>
      ) : null}

      {hasCatalogSelection && showAdjustmentSection ? (
        <section className="config-group">
          <h3>{t('product_adjustment_title', '2. Reglage')}</h3>
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
                  {t('product_manual', 'Manuel')}
                </button>
                <button
                  type="button"
                  className={`choice-btn adjustment-choice-btn ${selectedReglage === 'electrique' ? 'active' : ''}`}
                  onClick={() => selectReglage('electrique')}
                >
                  {t('product_electric', 'Electrique')}
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {hasCatalogSelection && isCoverPiece && normalizedOptionDefs.length ? (
        <>
          <section className="config-group">
            <h3>{`${t('product_piece_options_title', '2. Options pour la piece')} (${selectedFeatureKey || 'COVER'})`}</h3>
            <div className="cover-color-grid">
              {coverColorOptions.map((option) => {
                const token = colorClassToken(option.label || option.key);
                const isActive = selectedCoverColorKey === option.key;
                return (
                  <button
                    key={option.key}
                    type="button"
                    className={`choice-btn cover-color-btn ${isActive ? 'active' : ''}`}
                    aria-label={option.label}
                    title={option.label}
                    onClick={() => {
                      const remaining = selectedOptions.filter((item) => !coverColorOptions.some((colorOpt) => colorOpt.key === item));
                      const next = isActive ? remaining : [...remaining, option.key];
                      onChange('options', next);
                    }}
                  >
                    <span
                      className={`cover-color-dot cover-dot-${token}`}
                      style={getCoverDotStyle(option.label || option.key)}
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </div>
          </section>

          {coverBatmanOption ? (
            <section className="config-group">
              <h3>{t('product_batman_title', '3. Batman')}</h3>
              <div className="adjustment-choice-row adjustment-choice-row-two">
                <button
                  type="button"
                  className={`choice-btn ${isBatmanSelected ? 'active' : ''}`}
                  onClick={() => {
                    if (isBatmanSelected) return;
                    onChange('options', [...selectedOptions.filter((item) => item !== coverBatmanOption.key), coverBatmanOption.key]);
                  }}
                >
                  {t('product_option_yes', 'Oui')}
                </button>
                <button
                  type="button"
                  className={`choice-btn ${!isBatmanSelected ? 'active' : ''}`}
                  onClick={() => {
                    if (!isBatmanSelected) return;
                    onChange('options', selectedOptions.filter((item) => item !== coverBatmanOption.key));
                  }}
                >
                  {t('product_option_no', 'Non')}
                </button>
              </div>
            </section>
          ) : null}
        </>
      ) : null}

      {hasCatalogSelection && !isCoverPiece && normalizedOptionDefs.length ? (
        <section className="config-group">
          <h3>
            {isCompleteOrder && showAdjustmentSection
              ? t('product_step3_options', '3. Options du produit (optionnel)')
              : `${t('product_piece_options_title', '2. Options pour la piece')} (${selectedFeatureKey || 'PIECE'})`}
          </h3>
          <div className="feature-grid">
            {isPieceOrder ? (
              <button
                type="button"
                className={`feature-card ${normalizedOptionDefs.every((item) => !selectedOptions.includes(item.key)) ? 'active' : ''}`}
                onClick={() => {
                  const optionKeys = normalizedOptionDefs.map((item) => item.key);
                  const nextOptions = selectedOptions.filter((item) => !optionKeys.includes(item));
                  onChange('options', nextOptions);
                }}
              >
                <span className="feature-card-texts">
                  <span className="feature-card-title">{t('product_only_piece', 'Juste la piece (sans option)')}</span>
                </span>
              </button>
            ) : null}
            {normalizedOptionDefs.map((card) => (
              <button
                key={card.key}
                type="button"
                className={`feature-card ${selectedOptions.includes(card.key) ? 'active' : ''}`}
                onClick={() => toggleOption(card.key)}
              >
                <span className="feature-card-icon">
                  {card.imageSrc ? (
                    <img
                      src={card.imageSrc}
                      alt=""
                      className="feature-card-icon-img"
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : optionImageByLabel[card.key] || optionImageByLabel[card.label] ? (
                    <img
                      src={optionImageByLabel[card.key] || optionImageByLabel[card.label]}
                      alt=""
                      className="feature-card-icon-img"
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : card.icon ? (
                    <FeatureIcon type={card.icon} />
                  ) : null}
                </span>
                <span className="feature-card-texts">
                  <span className="feature-card-title">{card.label}</span>
                </span>
              </button>
            ))}
          </div>
        </section>
      ) : null}

    </>
  );
}
