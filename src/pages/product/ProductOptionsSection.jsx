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
import batmanOptionIcon from '../../images/new-icones/batman.jpeg';
import carbonOptionIcon from '../../images/new-icones/carbon.jpeg';
import chromeeOptionIcon from '../../images/new-icones/chromee.jpeg';
import autreOptionIcon from '../../images/new-icones/autre.jpeg';

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
    Reglage: reglageIcon,
    'ELECTRIC / MANUAL': reglageIcon,
    Rabattement: rabattementIcon,
    'Rabattement electrique': rabattementIcon,
    FOLDING: rabattementIcon,
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
        { normalized: 'gris', key: 'Gris', label: 'Gris' },
        { normalized: 'blanc', key: 'Blanc', label: 'Blanc' },
        { normalized: 'chromee', key: 'Chromee', label: 'Chromee' },
        { normalized: 'carbon', key: 'Carbon', label: 'Carbon' },
        { normalized: 'batman', key: 'Batman', label: 'Batman' },
        { normalized: 'autre-couleur', key: 'Autre couleur', label: 'Autre couleur' },
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
  const coverColorTopOption = coverColorOptions[0] || null;
  const coverColorRemainingOptions = coverColorTopOption
    ? coverColorOptions.filter((item) => item.key !== coverColorTopOption.key)
    : coverColorOptions;
  const selectedCoverColorKey = coverColorOptions.find((item) => selectedOptions.includes(item.key))?.key || '';
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

      {hasCatalogSelection && isCoverPiece && normalizedOptionDefs.length ? (
        <>
          <section className="config-group">
            <h3>{`${t('product_piece_options_title', '2. Options pour la piece')} (${selectedFeatureKey || 'COVER'})`}</h3>
            <div className="feature-grid cover-position-grid">
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
              {coverColorTopOption ? (
                <button
                  key={coverColorTopOption.key}
                  type="button"
                  className={`feature-card cover-color-btn ${selectedCoverColorKey === coverColorTopOption.key ? 'active' : ''}`}
                  aria-label={coverColorTopOption.label}
                  title={coverColorTopOption.label}
                  onClick={() => {
                    const remaining = selectedOptions.filter((item) => !coverColorOptions.some((colorOpt) => colorOpt.key === item));
                    const isActive = selectedCoverColorKey === coverColorTopOption.key;
                    const next = isActive ? remaining : [...remaining, coverColorTopOption.key];
                    onChange('options', next);
                  }}
                >
                  <span className="feature-card-icon">
                    {coverColorTopOption.imageSrc ? (
                      <img
                        src={coverColorTopOption.imageSrc}
                        alt=""
                        className="feature-card-icon-img"
                        aria-hidden="true"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : coverColorTopOption.coverNormalized === 'batman' ? (
                      <img
                        src={batmanOptionIcon}
                        alt=""
                        className="feature-card-icon-img"
                        aria-hidden="true"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : coverColorTopOption.coverNormalized === 'carbon' || coverColorTopOption.coverNormalized === 'carbone' ? (
                      <img
                        src={carbonOptionIcon}
                        alt=""
                        className="feature-card-icon-img"
                        aria-hidden="true"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : coverColorTopOption.coverNormalized === 'chrome' || coverColorTopOption.coverNormalized === 'chromee' ? (
                      <img
                        src={chromeeOptionIcon}
                        alt=""
                        className="feature-card-icon-img"
                        aria-hidden="true"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : coverColorTopOption.coverNormalized === 'autre-couleur' || coverColorTopOption.coverNormalized === 'autre couleur' ? (
                      <img
                        src={autreOptionIcon}
                        alt=""
                        className="feature-card-icon-img"
                        aria-hidden="true"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <span
                        className={`cover-color-dot cover-dot-${colorClassToken(coverColorTopOption.label || coverColorTopOption.key)}`}
                        style={getCoverDotStyle(coverColorTopOption.label || coverColorTopOption.key)}
                        aria-hidden="true"
                      />
                    )}
                  </span>
                  <span className="feature-card-texts">
                    <span className="feature-card-title">{coverColorTopOption.label}</span>
                  </span>
                </button>
              ) : null}
            </div>
            <div className="feature-grid cover-color-grid">
              {coverColorRemainingOptions.map((option) => {
                const token = colorClassToken(option.label || option.key);
                const isActive = selectedCoverColorKey === option.key;
                return (
                  <button
                    key={option.key}
                    type="button"
                    className={`feature-card cover-color-btn ${isActive ? 'active' : ''}`}
                    aria-label={option.label}
                    title={option.label}
                    onClick={() => {
                      const remaining = selectedOptions.filter((item) => !coverColorOptions.some((colorOpt) => colorOpt.key === item));
                      const next = isActive ? remaining : [...remaining, option.key];
                      onChange('options', next);
                    }}
                  >
                    <span className="feature-card-icon">
                      {option.imageSrc ? (
                        <img
                          src={option.imageSrc}
                          alt=""
                          className="feature-card-icon-img"
                          aria-hidden="true"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : option.coverNormalized === 'batman' ? (
                        <img
                          src={batmanOptionIcon}
                          alt=""
                          className="feature-card-icon-img"
                          aria-hidden="true"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : option.coverNormalized === 'carbon' || option.coverNormalized === 'carbone' ? (
                        <img
                          src={carbonOptionIcon}
                          alt=""
                          className="feature-card-icon-img"
                          aria-hidden="true"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : option.coverNormalized === 'chrome' || option.coverNormalized === 'chromee' ? (
                        <img
                          src={chromeeOptionIcon}
                          alt=""
                          className="feature-card-icon-img"
                          aria-hidden="true"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : option.coverNormalized === 'autre-couleur' || option.coverNormalized === 'autre couleur' ? (
                        <img
                          src={autreOptionIcon}
                          alt=""
                          className="feature-card-icon-img"
                          aria-hidden="true"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <span
                          className={`cover-color-dot cover-dot-${token}`}
                          style={getCoverDotStyle(option.label || option.key)}
                          aria-hidden="true"
                        />
                      )}
                    </span>
                    <span className="feature-card-texts">
                      <span className="feature-card-title">{option.label}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

        </>
      ) : null}

      {hasCatalogSelection && !isCoverPiece && normalizedOptionDefs.length ? (
        <section className="config-group">
          <h3>
            {isCompleteOrder
              ? t('product_step3_options', '3. Options du produit')
              : `${t('product_piece_options_title', '2. Options pour la piece')} (${selectedFeatureKey || 'PIECE'})`}
          </h3>
          <div className="feature-grid">
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
                {isGlassPiece ? (
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
