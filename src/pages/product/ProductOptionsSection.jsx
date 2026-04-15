import React from 'react';
import FeatureIcon from './FeatureIcon';

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
  adjustmentTypes,
}) {
  return (
    <>
      {hasCatalogSelection ? (
        <section className="config-group">
          <h3>{t('product_step2', '2. Cote du retroviseur')}</h3>
          <p className="config-help">{t('product_step2_help', 'Selectionnez le cote du vehicule concerne.')}</p>
          <div className="choice-list position-choice-list">
            {positions.map((item) => (
              <button
                key={item}
                type="button"
                className={`choice-btn ${productConfig.position === item ? 'active' : ''}`}
                onClick={() => onChange('position', item)}
              >
                {positionLabel(item)}
              </button>
            ))}
          </div>
        </section>
      ) : null}

      {hasCatalogSelection && isPieceOrder && pieceSuggestedOptions.length ? (
        <section className="config-group">
          <h3>{t('product_piece_options_title', '3. Options pour la piece')} ({selectedFeatureKey || 'PIECE'})</h3>
          <p className="config-help">{t('product_piece_options_help', 'Options facultatives. Choisissez "Juste la piece" si vous ne voulez rien ajouter.')}</p>
          <div className="piece-options-stack">
            <div className="option-chip-list">
              <button
                type="button"
                className={`option-chip ${pieceSuggestedOptions.every((item) => !selectedOptions.includes(item)) ? 'active' : ''}`}
                onClick={() => {
                  const nextOptions = selectedOptions.filter((item) => !pieceSuggestedOptions.includes(item));
                  onChange('options', nextOptions);
                }}
              >
                {t('product_only_piece', 'Juste la piece (sans option)')}
              </button>
            </div>
            <div className="option-chip-list">
              {pieceSuggestedOptions.map((optionLabel) => (
                <button
                  key={optionLabel}
                  type="button"
                  className={`option-chip ${selectedOptions.includes(optionLabel) ? 'active' : ''}`}
                  onClick={() => toggleOption(optionLabel)}
                >
                  {pieceOptionIconByLabel[optionLabel] ? (
                    <span className="option-chip-icon" aria-hidden="true">
                      <FeatureIcon type={pieceOptionIconByLabel[optionLabel]} />
                    </span>
                  ) : null}
                  <span>{optionLabel}</span>
                </button>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {hasCatalogSelection && isCompleteOrder ? (
        <section className="config-group">
          <h3>5. Options du retroviseur (optionnel)</h3>
          <p className="config-help">Choisissez les options visibles pour votre retroviseur complet.</p>
          <div className="feature-grid">
            {visibleFeatureCards.map((card) => (
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

      {hasCatalogSelection && isCompleteOrder ? (
        <section className="config-group">
          <h3>4. Type de reglage</h3>
          <p className="config-help">Obligatoire pour un retroviseur complet.</p>
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
      ) : null}
    </>
  );
}
