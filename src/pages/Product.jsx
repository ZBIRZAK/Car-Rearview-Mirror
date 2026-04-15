import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useI18n } from '../i18n';
import { DEFAULT_PRODUCT_ADMIN_CONFIG, PIECE_OPTION_DEFS } from '../config/productAdminConfig';
import CatalogPreview from './product/CatalogPreview';
import ProductCatalogSection from './product/ProductCatalogSection';
import ProductOptionsSection from './product/ProductOptionsSection';
import ProductActions from './product/ProductActions';
import {
  completeTypeLabel,
  defaultProductImagesByKey,
  featureCards,
  pieceSelectorCards,
  pieceSuggestedOptionsByCategory,
  positions,
  productCatalogCards,
  productPreviewImage,
} from './product/constants';

const adjustmentTypes = [
  'Reglage manuel',
  'Reglage electrique',
  'Rabattable manuel',
  'Rabattable electrique',
  'Rabattement automatique',
];

export default function Product({
  brand,
  model,
  year,
  productConfig,
  productAdminConfig = DEFAULT_PRODUCT_ADMIN_CONFIG,
  productConfigLoading = false,
  quoteItemsCount = 0,
  onChange,
  onContinue,
  onContinueShopping,
}) {
  if (!year) return null;
  const { t, language } = useI18n();

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [showValidationHint, setShowValidationHint] = useState(false);
  const [completePreviewIndex, setCompletePreviewIndex] = useState(0);
  const [catalogCompleteImageIndex, setCatalogCompleteImageIndex] = useState(0);
  const effectiveAdminConfig = useMemo(() => ({
    enabledProducts: Array.isArray(productAdminConfig?.enabledProducts)
      ? productAdminConfig.enabledProducts
      : DEFAULT_PRODUCT_ADMIN_CONFIG.enabledProducts,
    completeOptionKeys: Array.isArray(productAdminConfig?.completeOptionKeys)
      ? productAdminConfig.completeOptionKeys
      : DEFAULT_PRODUCT_ADMIN_CONFIG.completeOptionKeys,
    productImagesByKey: productAdminConfig?.productImagesByKey && typeof productAdminConfig.productImagesByKey === 'object'
      ? productAdminConfig.productImagesByKey
      : DEFAULT_PRODUCT_ADMIN_CONFIG.productImagesByKey,
    pieceOptionsByKey: productAdminConfig?.pieceOptionsByKey && typeof productAdminConfig.pieceOptionsByKey === 'object'
      ? productAdminConfig.pieceOptionsByKey
      : DEFAULT_PRODUCT_ADMIN_CONFIG.pieceOptionsByKey,
  }), [productAdminConfig]);

  const selectedOptions = productConfig.options || [];
  const isCompleteOrder = productConfig.orderScope === 'complete';
  const isPieceOrder = productConfig.orderScope === 'piece';
  const selectedFeatureKey = productConfig.selectedFeature || '';
  const enabledProductSet = useMemo(
    () => new Set(effectiveAdminConfig.enabledProducts || DEFAULT_PRODUCT_ADMIN_CONFIG.enabledProducts),
    [effectiveAdminConfig.enabledProducts]
  );
  const visibleCatalogCards = useMemo(
    () => productCatalogCards.filter((item) => enabledProductSet.has(item.key)),
    [enabledProductSet]
  );
  const enabledCompleteOptionSet = useMemo(
    () => new Set(effectiveAdminConfig.completeOptionKeys || DEFAULT_PRODUCT_ADMIN_CONFIG.completeOptionKeys),
    [effectiveAdminConfig.completeOptionKeys]
  );
  const visibleFeatureCards = useMemo(
    () => featureCards.filter((card) => enabledCompleteOptionSet.has(card.key)),
    [enabledCompleteOptionSet]
  );
  const productImagesByKey = useMemo(() => {
    const configMap = effectiveAdminConfig.productImagesByKey || {};
    return Object.fromEntries(
      Object.keys(defaultProductImagesByKey).map((key) => {
        const configured = Array.isArray(configMap[key]) ? configMap[key].filter(Boolean) : [];
        return [key, configured.length ? configured : defaultProductImagesByKey[key]];
      })
    );
  }, [effectiveAdminConfig.productImagesByKey]);
  const selectedCatalogCard = productCatalogCards.find((item) => {
    if (item.key === 'COMPLETE') return isCompleteOrder;
    return selectedFeatureKey === item.key;
  }) || null;
  const hasCatalogSelection = Boolean(productConfig.orderScope);
  const selectedCatalogImages = useMemo(() => {
    if (!selectedCatalogCard) return [productPreviewImage];
    return productImagesByKey[selectedCatalogCard.key] || [selectedCatalogCard.imageSrc || productPreviewImage];
  }, [selectedCatalogCard, productImagesByKey]);
  const selectedPreviewImage = selectedCatalogImages[completePreviewIndex] || selectedCatalogImages[0] || productPreviewImage;

  useEffect(() => {
    if (!selectedCatalogImages.length) return undefined;
    const timer = window.setInterval(() => {
      setCatalogCompleteImageIndex((prev) => (prev + 1) % selectedCatalogImages.length);
    }, 2600);
    return () => window.clearInterval(timer);
  }, [selectedCatalogImages]);

  useEffect(() => {
    setCompletePreviewIndex(0);
    setCatalogCompleteImageIndex(0);
  }, [selectedCatalogCard?.key]);

  const requiredMissing = useMemo(() => {
    const missing = [];
    if (!productConfig.orderScope) missing.push('type de commande');
    if (!productConfig.position) missing.push('position');
    if (!productConfig.productType) missing.push('type de produit');
    if (productConfig.orderScope === 'complete' && !productConfig.adjustmentType) missing.push('type de reglage');
    return missing;
  }, [productConfig.orderScope, productConfig.position, productConfig.productType, productConfig.adjustmentType]);

  const canContinue = requiredMissing.length === 0;

  const openLightbox = () => {
    setIsLightboxOpen(true);
    setZoom(1);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    setZoom(1);
  };

  const toggleOption = (optionLabel) => {
    const nextOptions = selectedOptions.includes(optionLabel)
      ? selectedOptions.filter((item) => item !== optionLabel)
      : [...selectedOptions, optionLabel];
    onChange('options', nextOptions);
  };

  const handleCatalogSelect = (item) => {
    if (item.key === 'COMPLETE') {
      onChange('orderScope', 'complete');
      onChange('productType', completeTypeLabel);
      onChange('selectedFeature', '');
      onChange('adjustmentType', '');
      onChange('options', []);
      return;
    }

    onChange('orderScope', 'piece');
    onChange('selectedFeature', item.key);
    onChange('productType', item.pieceType);
    onChange('adjustmentType', '');
    onChange('options', []);
  };

  const resetCatalogSelection = useCallback(() => {
    onChange('orderScope', '');
    onChange('selectedFeature', '');
    onChange('productType', '');
    onChange('adjustmentType', '');
    onChange('options', []);
    setShowValidationHint(false);
    setCompletePreviewIndex(0);
  }, [onChange]);

  useEffect(() => {
    if (!hasCatalogSelection) return;
    if (isCompleteOrder && !enabledProductSet.has('COMPLETE')) {
      resetCatalogSelection();
      return;
    }
    if (isPieceOrder && selectedFeatureKey && !enabledProductSet.has(selectedFeatureKey)) {
      resetCatalogSelection();
    }
  }, [hasCatalogSelection, isCompleteOrder, isPieceOrder, selectedFeatureKey, enabledProductSet, resetCatalogSelection]);

  const pieceSuggestedOptions = useMemo(() => {
    if (!isPieceOrder) return [];
    const configured = effectiveAdminConfig.pieceOptionsByKey?.[selectedFeatureKey];
    return Array.isArray(configured) ? configured : (pieceSuggestedOptionsByCategory[selectedFeatureKey] || []);
  }, [isPieceOrder, selectedFeatureKey, effectiveAdminConfig.pieceOptionsByKey]);
  const pieceOptionIconByLabel = useMemo(
    () => Object.fromEntries((PIECE_OPTION_DEFS[selectedFeatureKey] || []).map((item) => [item.key, item.icon])),
    [selectedFeatureKey]
  );

  const positionLabel = (item) => {
    if (item === 'Cote conducteur') return t('side_driver', 'Cote conducteur');
    if (item === 'Cote passager') return t('side_passenger', 'Cote passager');
    return item;
  };

  const pieceCardLabel = (card) => {
    if (language !== 'ar') return { label: card.label, subtitle: card.subtitle };
    if (card.key === 'GLASS') return { label: 'زجاج', subtitle: 'زجاج المرآة' };
    if (card.key === 'MIRROR') return { label: 'مرآة', subtitle: 'الهيكل + الحركة' };
    if (card.key === 'COVER') return { label: 'غطاء', subtitle: 'الغطاء الخارجي' };
    if (card.key === 'SINGLE') return { label: 'إشارة', subtitle: 'وحدة الإضاءة' };
    return { label: card.label, subtitle: card.subtitle };
  };

  const handleContinue = () => {
    if (!canContinue) {
      setShowValidationHint(true);
      return;
    }
    onContinue();
  };

  const handleContinueShoppingClick = () => {
    if (!canContinue) {
      setShowValidationHint(true);
      return;
    }
    onContinueShopping();
  };

  return (
    <div className="product-view">
      <div className="view-header product-view-header">
        {hasCatalogSelection ? (
          <button
            type="button"
            className="product-back-icon-btn"
            onClick={resetCatalogSelection}
            aria-label={t('product_back_to_list', 'Retour a la liste des produits')}
            title={t('product_back_to_list', 'Retour a la liste des produits')}
          >
            <span aria-hidden="true">←</span>
          </button>
        ) : null}
        {/* <div className="product-header-text">
          <h2>{t('product_title', 'Configurez votre demande')}</h2>
          <p>{brand?.name} {model} ({year}) </p>
        </div> */}
      </div>

      <div className={`product-layout ${hasCatalogSelection ? '' : 'catalog-only'}`}>
        {hasCatalogSelection ? (
        <aside className="catalog-preview-overlay">
          {selectedCatalogCard ? (
            <div className="piece-slider-block product-image-preview-block" role="region" aria-label="Apercu produit selectionne">
              <button type="button" className="product-image-trigger" onClick={openLightbox}>
                <CatalogPreview focus={selectedCatalogCard.previewFocus} imageSrc={selectedPreviewImage} />
              </button>
              {selectedCatalogImages.length > 1 ? (
                <div className="preview-thumbnails" role="listbox" aria-label="Images du retroviseur complet">
                  {selectedCatalogImages.map((imgSrc, idx) => (
                    <button
                      key={imgSrc}
                      type="button"
                      className={`preview-thumb-btn ${completePreviewIndex === idx ? 'active' : ''}`}
                      onClick={() => setCompletePreviewIndex(idx)}
                      aria-label={`Image ${idx + 1}`}
                    >
                      <img src={imgSrc} alt="" />
                    </button>
                  ))}
                </div>
              ) : null}
              <p className="product-preview-caption">
                <strong>{pieceCardLabel(selectedCatalogCard).label}</strong> - {pieceCardLabel(selectedCatalogCard).subtitle}
              </p>
            </div>
          ) : null}

        </aside>
        ) : null}

        <div className={`product-config ${!hasCatalogSelection ? 'catalog-list-only' : ''} ${hasCatalogSelection ? 'product-config-single-block' : ''}`}>
          <ProductCatalogSection
            hasCatalogSelection={hasCatalogSelection}
            productConfigLoading={productConfigLoading}
            visibleCatalogCards={visibleCatalogCards}
            productImagesByKey={productImagesByKey}
            catalogCompleteImageIndex={catalogCompleteImageIndex}
            productPreviewImage={productPreviewImage}
            onCatalogSelect={handleCatalogSelect}
            pieceCardLabel={pieceCardLabel}
          />

          <ProductOptionsSection
            t={t}
            hasCatalogSelection={hasCatalogSelection}
            positions={positions}
            productConfig={productConfig}
            onChange={onChange}
            positionLabel={positionLabel}
            isPieceOrder={isPieceOrder}
            pieceSuggestedOptions={pieceSuggestedOptions}
            selectedFeatureKey={selectedFeatureKey}
            selectedOptions={selectedOptions}
            toggleOption={toggleOption}
            pieceOptionIconByLabel={pieceOptionIconByLabel}
            isCompleteOrder={isCompleteOrder}
            visibleFeatureCards={visibleFeatureCards}
            adjustmentTypes={adjustmentTypes}
          />
        </div>
      </div>

      <ProductActions
        hasCatalogSelection={hasCatalogSelection}
        t={t}
        onContinue={handleContinue}
        onContinueShopping={handleContinueShoppingClick}
        quoteItemsCount={quoteItemsCount}
        showValidationHint={showValidationHint}
        canContinue={canContinue}
      />

      {isLightboxOpen && (
        <div className="lightbox-overlay" role="dialog" aria-modal="true">
          <button type="button" className="lightbox-close" onClick={closeLightbox} aria-label="Fermer la visionneuse">
            ×
          </button>
          <div className="lightbox-image-wrap">
            <img
              src={selectedPreviewImage}
              alt="Retroviseur exterieur de voiture en grand format"
              className="lightbox-image"
              style={{ transform: `scale(${zoom})` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
