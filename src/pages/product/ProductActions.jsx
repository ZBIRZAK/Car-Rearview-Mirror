import React from 'react';
import checkoutIcon from '../../icons/checkout.png';

function PriceIcon() {
  return (
    <img src={checkoutIcon} alt="" aria-hidden="true" className="product-action-icon-img" />
  );
}

function AddIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="product-action-icon-svg">
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </svg>
  );
}

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
        <button
          type="button"
          className="submit-button product-action-primary product-action-icon-btn"
          onClick={onContinue}
          aria-label={t('product_price_btn', 'Prix')}
          title={t('product_price_btn', 'Prix')}
        >
          <PriceIcon />
        </button>
        <button
          type="button"
          className="secondary-button product-action-btn product-action-secondary product-action-icon-btn"
          onClick={onContinueShopping}
          aria-label={t('product_add_other_btn', "Ajouter d'autre produits")}
          title={t('product_add_other_btn', "Ajouter d'autre produits")}
        >
          <AddIcon />
        </button>
        <p className="quote-items-counter">
          {t('quote_items_count', 'Produits ajoutes')}: <strong>{quoteItemsCount}</strong>
        </p>
      </div>

      {showValidationHint && !canContinue ? (
        <p className="product-validation-toast" role="status" aria-live="polite">
          {t('product_validation_required', 'Merci de completer les champs requis avant de continuer.')}
        </p>
      ) : null}
    </>
  );
}
