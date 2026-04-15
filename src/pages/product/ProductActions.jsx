import React from 'react';

export default function ProductActions({
  hasCatalogSelection,
  t,
  onContinue,
  onContinueShopping,
  quoteItemsCount,
  showValidationHint,
  canContinue,
}) {
  if (!hasCatalogSelection) return null;

  return (
    <>
      <div className="product-actions-stack">
        <button type="button" className="submit-button" onClick={onContinue}>
          {t('continue_form', 'Demande devis')}
        </button>
        <button type="button" className="secondary-button product-action-btn" onClick={onContinueShopping}>
          {t('continue_shopping', 'Continuer vos achats')}
        </button>
        <p className="quote-items-counter">
          {t('quote_items_count', 'Produits ajoutes')}: <strong>{quoteItemsCount}</strong>
        </p>
      </div>

      {showValidationHint && !canContinue ? (
        <p className="inline-hint-error">
          Merci de completer les champs requis avant de continuer.
        </p>
      ) : null}
    </>
  );
}
