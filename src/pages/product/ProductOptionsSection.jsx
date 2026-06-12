import React from 'react';
import FeatureIcon from './FeatureIcon';
import conducteurIcon from '../../images/new-icones/SVG/Conducteur-v2.svg';
import passagerIcon from '../../images/new-icones/SVG/Passager-v2.svg';
import glaceOptionIcon from '../../images/new-icones/SVG/Glace.svg';
import sousEclairageOptionIcon from '../../images/new-icones/SVG/Sous-eclairage.svg';
import formeOptionIcon from '../../images/new-icones/SVG/Forme.svg';
import chauffageOptionIcon from '../../images/new-icones/SVG/Chauffage.svg';
import memoireOptionIcon from '../../images/new-icones/SVG/Memoire.svg';
import antiEblouissementOptionIcon from '../../images/new-icones/SVG/Anti-eblouissement.svg';
import cameraOptionIcon from '../../images/new-icones/SVG/Camera.svg';
import angleMortOptionIcon from '../../images/new-icones/SVG/Angle mort.svg';
import reglageIcon from '../../images/new-icones/SVG/Reglage-electrique.svg';
import reglageManuelIcon from '../../images/new-icones/SVG/Reglage-manuel.svg';
import rabattementIcon from '../../images/new-icones/SVG/rabattement.svg';
import batmanOptionIcon from '../../images/new-icones/SVG/Batman.svg';
import carbonOptionIcon from '../../images/new-icones/SVG/Carbon.svg';
import chromeeOptionIcon from '../../images/new-icones/SVG/Chromee.svg';
import autreOptionIcon from '../../images/new-icones/SVG/Autre couleur.svg';
import dinamicOptionIcon from '../../images/new-icones/SVG/DINAMIC.svg';
import singleBlancOptionIcon from '../../images/new-icones/SVG/Signle Blanc.svg';
import singleNoirOptionIcon from '../../images/new-icones/SVG/Signle Noir.svg';
import coverBlancOptionIcon from '../../images/new-icones/SVG/Blanc.svg';
import coverNoirOptionIcon from '../../images/new-icones/SVG/Noir.svg';
import coverGrisOptionIcon from '../../images/new-icones/SVG/Gris.svg';

const COMPLETE_COLOR_OPTIONS = ['Noir', 'Blanc', 'Gris', 'Autre couleur', 'Carbon', 'Chromee'];
const COVER_PALETTE_ORDER = ['noir', 'blanc', 'gris', 'autre-couleur', 'carbon', 'chromee'];

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
  showPositionSection,
  showValidationHint,
  isPositionMissing,
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
    'Reglage manuel': reglageManuelIcon,
    Reglage: reglageIcon,
    'ELECTRIC / MANUAL': reglageIcon,
    Rabattement: rabattementIcon,
    'Rabattement electrique': rabattementIcon,
    FOLDING: rabattementIcon,
    DINAMIC: dinamicOptionIcon,
    Dynamic: dinamicOptionIcon,
    'Single Blanc': singleBlancOptionIcon,
    'Single Noir': singleNoirOptionIcon,
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
  const isGlassPiece = isPieceOrder && String(selectedFeatureKey || '').toUpperCase() === 'GLASS';
  const singlePieceKey = String(selectedFeatureKey || '').toUpperCase();
  const isSinglePiece = isPieceOrder && (singlePieceKey === 'SINGLE' || singlePieceKey === 'SIGNLE');
  const shouldShowPositionCards = showPositionSection || isGlassPiece;
  const COVER_ALLOWED_KEYS = new Set(['noir', 'black', 'gris', 'gray', 'grey', 'blanc', 'white', 'chrome', 'chromee', 'chromé', 'chromee', 'carbon', 'carbone', 'batman', 'autre-couleur', 'autre couleur', 'other-color', 'other color']);
  const normalizeCoverOption = (value) => String(value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
  const coverDisplayLabelByKey = {
    noir: 'Noir',
    black: 'Noir',
    gris: 'Gris',
    gray: 'Gris',
    grey: 'Gris',
    blanc: 'Blanc',
    white: 'Blanc',
    chrome: 'Chromee',
    chromee: 'Chromee',
    carbon: 'Carbon',
    carbone: 'Carbon',
    batman: 'Batman',
    'autre-couleur': 'Autre couleur',
    'autre couleur': 'Autre couleur',
    'other-color': 'Autre couleur',
    'other color': 'Autre couleur',
  };
  const coverFilteredDefs = isCoverPiece
    ? normalizedOptionDefs
      .map((item) => {
        const normalized = normalizeCoverOption(item.key || item.label);
        return {
          ...item,
          coverNormalized: normalized,
          label: coverDisplayLabelByKey[normalized] || item.label,
        };
      })
      .filter((item) => COVER_ALLOWED_KEYS.has(item.coverNormalized))
    : normalizedOptionDefs;
  const coverEnsuredDefs = isCoverPiece
    ? (() => {
      const requiredCoverOptions = [
        { normalized: 'noir', key: 'Noir', label: 'Noir' },
        { normalized: 'blanc', key: 'Blanc', label: 'Blanc' },
        { normalized: 'gris', key: 'Gris', label: 'Gris' },
        { normalized: 'autre-couleur', key: 'Autre couleur', label: 'Autre couleur' },
        { normalized: 'carbon', key: 'Carbon', label: 'Carbon' },
        { normalized: 'chromee', key: 'Chromee', label: 'Chromee' },
        { normalized: 'batman', key: 'Batman', label: 'Batman' },
      ];
      const byNormalized = new Map(coverFilteredDefs.map((item) => [item.coverNormalized, item]));
      return requiredCoverOptions.map((required) => (
        byNormalized.get(required.normalized) || {
          key: required.key,
          label: required.label,
          icon: '',
          imageSrc: '',
          coverNormalized: required.normalized,
        }
      ));
    })()
    : coverFilteredDefs;
  const coverColorOptions = isCoverPiece ? coverEnsuredDefs : [];
  const coverPaletteOptions = coverColorOptions
    .filter((item) => item.coverNormalized !== 'batman')
    .sort((a, b) => COVER_PALETTE_ORDER.indexOf(a.coverNormalized) - COVER_PALETTE_ORDER.indexOf(b.coverNormalized));
  const coverBatmanOption = coverColorOptions.find((item) => item.coverNormalized === 'batman') || null;
  const selectedCoverColorKey = coverPaletteOptions.find((item) => selectedOptions.includes(item.key))?.key || '';
  const isCoverBatmanSelected = Boolean(coverBatmanOption && selectedOptions.includes(coverBatmanOption.key));
  const selectedCompleteColorKey = COMPLETE_COLOR_OPTIONS.find((item) => selectedOptions.includes(item)) || '';
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
    chrome: 'linear-gradient(135deg, #f6f7fa 0%, #b8bec8 45%, #eef1f5 100%)',
    chromee: 'linear-gradient(135deg, #f6f7fa 0%, #b8bec8 45%, #eef1f5 100%)',
    'autre-couleur': 'conic-gradient(#ff595e, #ffca3a, #8ac926, #1982c4, #6a4c93, #ff595e)',
    'autre couleur': 'conic-gradient(#ff595e, #ffca3a, #8ac926, #1982c4, #6a4c93, #ff595e)',
  };
  const getCoverDotStyle = (label) => {
    const token = colorClassToken(label);
    const fallback = coverColorFallbackByToken[token];
    if (!fallback) return undefined;
    return (String(fallback).startsWith('linear-gradient') || String(fallback).startsWith('conic-gradient'))
      ? { backgroundImage: fallback, backgroundColor: 'transparent' }
      : { backgroundColor: fallback };
  };
  const getSingleDotStyle = (label) => {
    const token = colorClassToken(label);
    if (token === 'noir' || token === 'black') return { backgroundColor: '#0f1012' };
    if (token === 'blanc' || token === 'white') return { backgroundColor: '#f2f4f7' };
    return undefined;
  };
  const getCompleteColorDotStyle = (label) => {
    const token = colorClassToken(label);
    if (token === 'noir') return { backgroundColor: '#0f1012' };
    if (token === 'blanc') return { backgroundColor: '#f2f4f7' };
    if (token === 'gris') return { backgroundColor: '#8f949b' };
    if (token === 'carbon') return { backgroundImage: 'linear-gradient(135deg, #2d3137 0%, #15181d 100%)', backgroundColor: 'transparent' };
    if (token === 'chromee') return { backgroundImage: 'linear-gradient(135deg, #f6f7fa 0%, #b8bec8 45%, #eef1f5 100%)', backgroundColor: 'transparent' };
    if (token === 'autre-couleur') return { backgroundImage: 'conic-gradient(#ff595e, #ffca3a, #8ac926, #1982c4, #6a4c93, #ff595e)', backgroundColor: 'transparent' };
    return undefined;
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

  const toggleCompleteColor = (colorLabel) => {
    const remaining = selectedOptions.filter((item) => !COMPLETE_COLOR_OPTIONS.includes(item));
    const next = selectedCompleteColorKey === colorLabel ? remaining : [...remaining, colorLabel];
    onChange('options', next);
  };

  const toggleCoverColor = (colorKey) => {
    const remaining = selectedOptions.filter((item) => !coverPaletteOptions.some((colorOpt) => colorOpt.key === item));
    const next = selectedCoverColorKey === colorKey ? remaining : [...remaining, colorKey];
    onChange('options', next);
  };

  const toggleCoverBatman = () => {
    if (!coverBatmanOption) return;
    const isActive = selectedOptions.includes(coverBatmanOption.key);
    const next = isActive
      ? selectedOptions.filter((item) => item !== coverBatmanOption.key)
      : [...selectedOptions, coverBatmanOption.key];
    onChange('options', next);
  };

  return (
    <>

      {hasCatalogSelection && isCoverPiece ? (
        <>
          <section className="config-group">
            <h3>{`${t('product_piece_options_title', '2. Options pour la piece')} (${selectedFeatureKey || 'COVER'})`}</h3>
            {showValidationHint && isPositionMissing ? (
              <p className="required-field-indicator">
                <span aria-hidden="true">!</span>
                {t('product_position_required', 'Selectionnez le cote du retroviseur : Conducteur, Passager ou les deux.')}
              </p>
            ) : null}
            <div
              className={`feature-grid cover-position-grid ${showValidationHint && isPositionMissing ? 'required-options-error' : ''}`}
              data-required-missing={showValidationHint && isPositionMissing ? 'true' : undefined}
              tabIndex={showValidationHint && isPositionMissing ? -1 : undefined}
            >
              {positions.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`feature-card position-feature-card ${selectedPositions.includes(item) ? 'active' : ''}`}
                  onClick={() => togglePosition(item)}
                >
                  <span className="feature-card-icon">
                    <img
                      src={positionIconByValue[item]}
                      alt=""
                      className="feature-card-icon-img"
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                  <span className="feature-card-texts">
                    <span className="feature-card-title">{positionLabel(item)}</span>
                  </span>
                </button>
              ))}
              <button
                type="button"
                className={`feature-card position-feature-card ${
                  selectedPositions.includes('Cote conducteur') && selectedPositions.includes('Cote passager') ? 'active' : ''
                }`}
                onClick={() => {
                  const hasBoth = selectedPositions.includes('Cote conducteur') && selectedPositions.includes('Cote passager');
                  onChange('position', hasBoth ? [] : ['Cote conducteur', 'Cote passager']);
                }}
              >
                <span className="feature-card-icon position-double-icon">
                  <img
                    src={conducteurIcon}
                    alt=""
                    className="feature-card-icon-img"
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                  />
                  <img
                    src={passagerIcon}
                    alt=""
                    className="feature-card-icon-img"
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                  />
                </span>
                <span className="feature-card-texts">
                  <span className="feature-card-title">{`${t('side_driver', 'Conducteur')} + ${t('side_passenger', 'Passager')}`}</span>
                </span>
              </button>
              {coverBatmanOption ? (
                <button
                  type="button"
                  className={`feature-card cover-color-btn ${isCoverBatmanSelected ? 'active' : ''}`}
                  aria-label={coverBatmanOption.label}
                  title={coverBatmanOption.label}
                  onClick={toggleCoverBatman}
                >
                  <span className="feature-card-icon">
                    <img
                      src={batmanOptionIcon}
                      alt=""
                      className="feature-card-icon-img"
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                    />
                  </span>
                  <span className="feature-card-texts">
                    <span className="feature-card-title">{coverBatmanOption.label}</span>
                  </span>
                </button>
              ) : null}
            </div>
            <div className="complete-color-section">
              <div className="complete-color-head">
                <h4 className="complete-color-title">{t('product_colors_title', 'Couleurs')}</h4>
                {selectedCoverColorKey ? (
                  <span className="complete-color-selected-label">
                    {selectedCoverColorKey}
                  </span>
                ) : null}
              </div>
              <div className="complete-color-row" role="listbox" aria-label={t('product_colors_title', 'Couleurs')}>
                {coverPaletteOptions.map((option) => {
                  const token = colorClassToken(option.label || option.key);
                  const isActive = selectedCoverColorKey === option.key;
                  return (
                    <button
                      key={option.key}
                      type="button"
                      className={`complete-color-pill ${isActive ? 'active' : ''}`}
                      onClick={() => toggleCoverColor(option.key)}
                      aria-label={option.label}
                      title={option.label}
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
            </div>
          </section>

        </>
      ) : null}

      {hasCatalogSelection && !isCoverPiece && (normalizedOptionDefs.length || shouldShowPositionCards) ? (
        <section className="config-group">
          <h3>
            {isCompleteOrder
              ? t('product_step3_options', '3. Options du produit')
              : `${t('product_piece_options_title', '2. Options pour la piece')} (${selectedFeatureKey || 'PIECE'})`}
          </h3>
          {showValidationHint && isPositionMissing ? (
            <p className="required-field-indicator">
              <span aria-hidden="true">!</span>
              {t('product_position_required', 'Selectionnez le cote du retroviseur : Conducteur, Passager ou les deux.')}
            </p>
          ) : null}
          <div
            className={`feature-grid ${showValidationHint && isPositionMissing ? 'required-options-error' : ''}`}
            data-required-missing={showValidationHint && isPositionMissing ? 'true' : undefined}
            tabIndex={showValidationHint && isPositionMissing ? -1 : undefined}
          >
            {shouldShowPositionCards ? (
              <>
                {positions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={`feature-card position-feature-card ${selectedPositions.includes(item) ? 'active' : ''}`}
                    onClick={() => togglePosition(item)}
                  >
                    <span className="feature-card-icon">
                      <img
                        src={positionIconByValue[item]}
                        alt=""
                        className="feature-card-icon-img"
                        aria-hidden="true"
                        loading="lazy"
                        decoding="async"
                      />
                    </span>
                    <span className="feature-card-texts">
                      <span className="feature-card-title">{positionLabel(item)}</span>
                    </span>
                  </button>
                ))}
                {isGlassPiece || isCompleteOrder ? (
                  <button
                    type="button"
                    className={`feature-card position-feature-card ${
                      selectedPositions.includes('Cote conducteur') && selectedPositions.includes('Cote passager') ? 'active' : ''
                    }`}
                    onClick={() => {
                      const hasBoth = selectedPositions.includes('Cote conducteur') && selectedPositions.includes('Cote passager');
                      onChange('position', hasBoth ? [] : ['Cote conducteur', 'Cote passager']);
                    }}
                  >
                    <span className="feature-card-icon position-double-icon">
                      <img
                        src={conducteurIcon}
                        alt=""
                        className="feature-card-icon-img"
                        aria-hidden="true"
                        loading="lazy"
                        decoding="async"
                      />
                      <img
                        src={passagerIcon}
                        alt=""
                        className="feature-card-icon-img"
                        aria-hidden="true"
                        loading="lazy"
                        decoding="async"
                      />
                    </span>
                    <span className="feature-card-texts">
                      <span className="feature-card-title">{`${t('side_driver', 'Conducteur')} + ${t('side_passenger', 'Passager')}`}</span>
                    </span>
                  </button>
                ) : null}
              </>
            ) : null}
            {isPieceOrder && !isGlassPiece ? (
              <button
                type="button"
                className={`feature-card position-feature-card ${
                  selectedPositions.includes('Cote conducteur') && selectedPositions.includes('Cote passager') ? 'active' : ''
                }`}
                onClick={() => {
                  const hasBoth = selectedPositions.includes('Cote conducteur') && selectedPositions.includes('Cote passager');
                  onChange('position', hasBoth ? [] : ['Cote conducteur', 'Cote passager']);
                }}
              >
                <span className="feature-card-icon position-double-icon">
                  <img
                    src={conducteurIcon}
                    alt=""
                    className="feature-card-icon-img"
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                  />
                  <img
                    src={passagerIcon}
                    alt=""
                    className="feature-card-icon-img"
                    aria-hidden="true"
                    loading="lazy"
                    decoding="async"
                  />
                </span>
                <span className="feature-card-texts">
                  <span className="feature-card-title">{`${t('side_driver', 'Conducteur')} + ${t('side_passenger', 'Passager')}`}</span>
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
                  ) : isSinglePiece && ['blanc', 'white'].includes(colorClassToken(card.key || card.label)) ? (
                    <img
                      src={singleBlancOptionIcon}
                      alt=""
                      className="feature-card-icon-img"
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : isSinglePiece && ['noir', 'black'].includes(colorClassToken(card.key || card.label)) ? (
                    <img
                      src={singleNoirOptionIcon}
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
          {isCompleteOrder ? (
            <div className="complete-color-section">
              <div className="complete-color-head">
                <h4 className="complete-color-title">{t('product_colors_title', 'Couleurs')}</h4>
                {selectedCompleteColorKey ? (
                  <span className="complete-color-selected-label">
                    {selectedCompleteColorKey}
                  </span>
                ) : null}
              </div>
              <div className="complete-color-row" role="listbox" aria-label={t('product_colors_title', 'Couleurs')}>
                {COMPLETE_COLOR_OPTIONS.map((colorLabel) => {
                  const isActive = selectedCompleteColorKey === colorLabel;
                  return (
                    <button
                      key={colorLabel}
                      type="button"
                      className={`complete-color-pill ${isActive ? 'active' : ''}`}
                      onClick={() => toggleCompleteColor(colorLabel)}
                      aria-label={colorLabel}
                      title={colorLabel}
                    >
                      <span
                        className={`cover-color-dot cover-dot-${colorClassToken(colorLabel)}`}
                        style={getCompleteColorDotStyle(colorLabel)}
                        aria-hidden="true"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}
        </section>
      ) : null}

    </>
  );
}
