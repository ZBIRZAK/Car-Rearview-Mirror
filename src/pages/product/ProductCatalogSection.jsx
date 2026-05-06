import React from 'react';
import CatalogPreview from './CatalogPreview';
import { unavailablePlaceholderImagesByKey } from './constants';

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
  onUnavailableSelect,
}) {
  if (hasCatalogSelection) return null;
  const shouldShowSkeleton = productConfigLoading && !visibleCatalogCards.length;
  const whatsappNumber = String(import.meta.env.VITE_WHATSAPP_NUMBER || '').replace(/\D/g, '');
  const fallbackUnavailableCards = [
    { key: 'COMPLETE', label: 'Retroviseur complet', previewFocus: 'complete' },
    { key: 'GLASS', label: 'Glass', previewFocus: 'glass' },
    { key: 'COVER', label: 'Cover', previewFocus: 'cover' },
    { key: 'SINGLE', label: 'Signle', previewFocus: 'single' },
  ];

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
      {shouldShowSkeleton ? (
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
            <div className="empty-state product-unavailable-cards-wrap">
              {/* <p>{t('product_catalog_empty_coming_soon', "Le site est en cours de mise a jour. D'autres produits seront ajoutes bientot.")}</p> */}
              <div className="order-scope-grid product-catalog-grid">
                {fallbackUnavailableCards.map((item) => {
                  const unavailableImageSrc = unavailablePlaceholderImagesByKey[item.key] || productPreviewImage;
                  return (
                  <button
                    key={item.key}
                    type="button"
                    className="catalog-product-card catalog-product-card-unavailable"
                    onClick={() => onUnavailableSelect?.({ ...item, imageSrc: unavailableImageSrc })}
                  >
                    <CatalogPreview
                      focus={item.previewFocus}
                      imageSrc={unavailableImageSrc}
                    />
                    <span className="catalog-unavailable-indicator" aria-hidden="true">!</span>
                    <span className="catalog-product-meta">
                      <span className="order-scope-title">{item.label}</span>
                    </span>
                  </button>
                  );
                })}
              </div>
              {/* <button type="button" className="secondary-button" onClick={handleMissingProductWhatsApp}>
                {t('product_catalog_empty_whatsapp_btn', 'Demander ce produit sur WhatsApp')}
              </button> */}
            </div>
          ) : null}
        </>
      )}
    </section>
  );
}
