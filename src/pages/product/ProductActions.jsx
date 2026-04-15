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
        <button type="button" className="submit-button product-action-primary" onClick={onContinue}>
          {t('product_price_btn', 'Prix')}
        </button>
        <button type="button" className="secondary-button product-action-btn product-action-secondary" onClick={onContinueShopping}>
          {t('product_add_other_btn', "Ajouter d'autre produits")}
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
