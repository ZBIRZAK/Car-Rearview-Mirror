import React from 'react';
import CatalogPreview from './CatalogPreview';

export default function ProductCatalogSection({
  hasCatalogSelection,
  productConfigLoading,
  visibleCatalogCards,
  productImagesByKey,
  catalogCompleteImageIndex,
  productPreviewImage,
  onCatalogSelect,
  pieceCardLabel,
  t,
  brand,
  model,
  year,
}) {
  if (hasCatalogSelection) return null;
  const whatsappNumber = String(import.meta.env.VITE_WHATSAPP_NUMBER || '').replace(/\D/g, '');

  const handleMissingProductWhatsApp = () => {
    if (!whatsappNumber) return;
    const message = [
      t('catalog_missing_whatsapp_intro', "Bonjour, je cherche un produit qui n'est pas encore liste sur le site."),
      `${t('whatsapp_label_brand', 'Marque')}: ${brand?.name || '-'}`,
      `${t('whatsapp_label_model', 'Modele')}: ${model || '-'}`,
      `${t('whatsapp_label_year', 'Annee')}: ${year || '-'}`,
      t('catalog_missing_whatsapp_request', 'Pouvez-vous me proposer ce produit ?'),
    ].join('\n');
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section className="config-group product-catalog-section">
      {productConfigLoading ? (
        <div className="product-catalog-skeleton" aria-hidden="true">
          {[0, 1, 2, 3].map((item) => (
            <div key={item} className="product-catalog-skeleton-card">
              <div className="product-catalog-skeleton-image shimmer" />
              <div className="product-catalog-skeleton-line shimmer" />
              <div className="product-catalog-skeleton-line small shimmer" />
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="order-scope-grid product-catalog-grid">
            {visibleCatalogCards.map((item) => {
              const itemImages = productImagesByKey[item.key] || [item.imageSrc || productPreviewImage];
              const previewImage = itemImages[catalogCompleteImageIndex % itemImages.length] || itemImages[0];
              return (
                <button
                  key={item.key}
                  type="button"
                  className="catalog-product-card"
                  onClick={() => onCatalogSelect(item)}
                >
                  <CatalogPreview
                    focus={item.previewFocus}
                    imageSrc={previewImage}
                  />
                  <span className="catalog-product-meta">
                    <span className="order-scope-title">{pieceCardLabel(item).label}</span>
                    {/* <span className="order-scope-sub">{pieceCardLabel(item).subtitle}</span> */}
                  </span>
                </button>
              );
            })}
          </div>
          {!visibleCatalogCards.length ? (
            <div className="empty-state">
              <p>{t('product_catalog_empty_coming_soon', "Le site est en cours de mise a jour. D'autres produits seront ajoutes bientot.")}</p>
              <button type="button" className="secondary-button" onClick={handleMissingProductWhatsApp}>
                {t('product_catalog_empty_whatsapp_btn', 'Demander ce produit sur WhatsApp')}
              </button>
            </div>
          ) : null}
        </>
      )}
    </section>
  );
}
