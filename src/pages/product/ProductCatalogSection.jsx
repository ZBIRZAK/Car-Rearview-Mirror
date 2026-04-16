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
}) {
  if (hasCatalogSelection) return null;

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
          {!visibleCatalogCards.length ? <p className="empty-state">Aucun produit actif. Activez des produits dans le dashboard.</p> : null}
        </>
      )}
    </section>
  );
}
