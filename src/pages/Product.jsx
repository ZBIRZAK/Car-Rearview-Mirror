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
  pieceSuggestedOptionsByCategory,
  positions,
  productCatalogCards,
  productPreviewImage,
} from './product/constants';

const stripPhaseSuffix = (value) => String(value || '')
  .replace(/\s*[-–|:]?\s*phase\s*[12]\b/gi, '')
  .replace(/\s{2,}/g, ' ')
  .trim();
const SHOW_CLIGNOTANT = String(import.meta.env.VITE_SHOW_CLIGNOTANT || 'false').toLowerCase() === 'true';
const SHOW_COMMANDE = String(import.meta.env.VITE_SHOW_COMMANDE || 'false').toLowerCase() === 'true';

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
    catalogProducts: Array.isArray(productAdminConfig?.catalogProducts)
      ? productAdminConfig.catalogProducts
      : DEFAULT_PRODUCT_ADMIN_CONFIG.catalogProducts,
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
    productOptionDefsByProductKey: productAdminConfig?.productOptionDefsByProductKey && typeof productAdminConfig.productOptionDefsByProductKey === 'object'
      ? productAdminConfig.productOptionDefsByProductKey
      : DEFAULT_PRODUCT_ADMIN_CONFIG.productOptionDefsByProductKey,
  }), [productAdminConfig]);

  const selectedOptions = productConfig.options || [];
  const isCompleteOrder = productConfig.orderScope === 'complete';
  const isPieceOrder = productConfig.orderScope === 'piece';
  const selectedFeatureKey = productConfig.selectedFeature || '';
  const fallbackCatalogCards = useMemo(() => {
    const enabledSet = new Set(effectiveAdminConfig.enabledProducts || DEFAULT_PRODUCT_ADMIN_CONFIG.enabledProducts);
    return productCatalogCards.filter((item) => enabledSet.has(item.key));
  }, [effectiveAdminConfig.enabledProducts]);
  const visibleCatalogCards = useMemo(() => {
    if (Array.isArray(effectiveAdminConfig.catalogProducts) && effectiveAdminConfig.catalogProducts.length) {
      return effectiveAdminConfig.catalogProducts.map((item) => ({
        key: item.key,
        label: item.label,
        subtitle: item.subtitle,
        pieceType: item.pieceType,
        orderScope: item.orderScope,
        optionGroup: item.optionGroup,
        previewFocus: item.previewFocus || 'generic',
        requiresPosition: item.requiresPosition !== false,
        requiresAdjustment: item.requiresAdjustment === true,
        imageSrc: '',
      }));
    }
    return fallbackCatalogCards;
  }, [effectiveAdminConfig.catalogProducts, fallbackCatalogCards]);
  const enabledProductSet = useMemo(
    () => new Set(visibleCatalogCards.map((item) => item.key)),
    [visibleCatalogCards]
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
    const keys = Array.from(new Set([
      ...Object.keys(defaultProductImagesByKey),
      ...Object.keys(configMap),
      ...visibleCatalogCards.map((item) => item.key),
    ]));
    return Object.fromEntries(
      keys.map((key) => {
        const configured = Array.isArray(configMap[key]) ? configMap[key].filter(Boolean) : [];
        const fallback = defaultProductImagesByKey[key] || [productPreviewImage];
        return [key, configured.length ? configured : fallback];
      })
    );
  }, [effectiveAdminConfig.productImagesByKey, visibleCatalogCards]);
  const selectedCatalogCard = useMemo(() => {
    if (!visibleCatalogCards.length) return null;
    if (selectedFeatureKey) {
      const byKey = visibleCatalogCards.find((item) => item.key === selectedFeatureKey);
      if (byKey) return byKey;
    }
    if (isCompleteOrder) {
      return visibleCatalogCards.find((item) => item.orderScope === 'complete' || item.key === 'COMPLETE') || null;
    }
    if (isPieceOrder) {
      return visibleCatalogCards.find((item) => item.orderScope === 'piece' && item.key === selectedFeatureKey) || null;
    }
    return null;
  }, [visibleCatalogCards, selectedFeatureKey, isCompleteOrder, isPieceOrder]);
  const hasCatalogSelection = Boolean(productConfig.orderScope);
  const selectedCatalogImages = useMemo(() => {
    if (!selectedCatalogCard) return [productPreviewImage];
    return productImagesByKey[selectedCatalogCard.key] || [selectedCatalogCard.imageSrc || productPreviewImage];
  }, [selectedCatalogCard, productImagesByKey]);
  const previewThumbnailImages = useMemo(
    () => selectedCatalogImages.slice(0, 4),
    [selectedCatalogImages]
  );
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
    const requiresPosition = selectedCatalogCard?.requiresPosition !== false;
    const selectedPositions = Array.isArray(productConfig.position)
      ? productConfig.position
      : (productConfig.position ? [productConfig.position] : []);
    if (!productConfig.orderScope) missing.push('type de commande');
    if (requiresPosition && !selectedPositions.length) missing.push('position');
    if (!productConfig.productType) missing.push('type de produit');
    return missing;
  }, [productConfig.orderScope, productConfig.position, productConfig.productType, selectedCatalogCard?.requiresPosition]);

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
    if (item.orderScope === 'complete' || item.key === 'COMPLETE') {
      onChange('orderScope', 'complete');
      onChange('productType', item.pieceType || completeTypeLabel);
      onChange('selectedFeature', item.key);
      onChange('adjustmentType', '');
      onChange('options', []);
      return;
    }

    onChange('orderScope', 'piece');
    onChange('selectedFeature', item.key);
    onChange('productType', item.pieceType || item.label || item.key);
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
    if (isCompleteOrder && selectedFeatureKey && !enabledProductSet.has(selectedFeatureKey)) {
      resetCatalogSelection();
      return;
    }
    if (isPieceOrder && selectedFeatureKey && !enabledProductSet.has(selectedFeatureKey)) {
      resetCatalogSelection();
    }
  }, [hasCatalogSelection, isCompleteOrder, isPieceOrder, selectedFeatureKey, enabledProductSet, resetCatalogSelection]);

  const selectedPieceOptionGroup = selectedCatalogCard?.optionGroup || selectedFeatureKey;
  const selectedOptionDefs = useMemo(() => {
    const prioritizeCompleteOptions = (items) => {
      if (!isCompleteOrder) return items;
      const list = Array.isArray(items) ? [...items] : [];
      const takeByKeys = (keys) => {
        const index = list.findIndex((item) => keys.includes(String(item.key || '').toLowerCase()));
        if (index === -1) return null;
        return list.splice(index, 1)[0];
      };
      const reglage = takeByKeys(['reglage electrique', 'reglage']);
      const rabattement = takeByKeys(['rabattement']);
      const head = [reglage, rabattement].filter(Boolean);
      return [...head, ...list];
    };

    const selectedProductKey = selectedCatalogCard?.key || selectedFeatureKey;
    const dynamicDefs = selectedProductKey
      ? effectiveAdminConfig.productOptionDefsByProductKey?.[selectedProductKey]
      : null;
    if (Array.isArray(dynamicDefs) && dynamicDefs.length) {
      const mappedDynamic = dynamicDefs.map((item) => ({
        key: String(item.key || item.label || '').trim(),
        label: String(item.label || item.key || '').trim(),
        icon: String(item.icon || '').trim(),
        imageSrc: String(item.imageSrc || '').trim(),
      })).filter((item) => item.key && item.label);

      if (isCompleteOrder) {
        const filtered = mappedDynamic.filter((item) => (
          item.key !== 'Glace retroviseur'
          && item.key !== 'Forme retroviseur'
          && item.label !== 'Glace'
          && item.label !== 'Forme'
        ));
        const hasReglage = filtered.some((item) => item.key === 'Reglage electrique' || item.label === t('product_electric', 'Electrique'));
        const withReglage = hasReglage
          ? filtered
          : [{ key: 'Reglage electrique', label: t('product_electric', 'Electrique'), icon: 'adjustment', imageSrc: '' }, ...filtered];
        return prioritizeCompleteOptions(withReglage);
      }

      return mappedDynamic;
    }

    if (isCompleteOrder) {
      const completeFallback = [
        { key: 'Reglage electrique', label: t('product_electric', 'Electrique'), icon: 'adjustment' },
        { key: 'Rabattement', label: t('product_fold_option_title', 'Rabattement'), icon: 'folding' },
        ...visibleFeatureCards.map((card) => ({
          key: card.key,
          label: card.label,
          icon: card.icon || '',
          imageSrc: '',
        })).filter((card) => card.key !== 'Glace retroviseur' && card.key !== 'Forme retroviseur'),
      ];
      return prioritizeCompleteOptions(completeFallback);
    }

    if (isPieceOrder) {
      const configured = effectiveAdminConfig.pieceOptionsByKey?.[selectedPieceOptionGroup];
      const labels = (Array.isArray(configured) && configured.length)
        ? configured
        : (pieceSuggestedOptionsByCategory[selectedPieceOptionGroup] || []);
      const iconByLabel = Object.fromEntries((PIECE_OPTION_DEFS[selectedPieceOptionGroup] || []).map((item) => [item.key, item.icon]));
      return labels.map((label) => ({
        key: label,
        label,
        icon: iconByLabel[label] || '',
        imageSrc: '',
      }));
    }

    return [];
  }, [
    selectedCatalogCard?.key,
    selectedFeatureKey,
    isCompleteOrder,
    isPieceOrder,
    effectiveAdminConfig.productOptionDefsByProductKey,
    effectiveAdminConfig.pieceOptionsByKey,
    selectedPieceOptionGroup,
    visibleFeatureCards,
    t,
  ]);
  const visibleOptionDefs = useMemo(() => selectedOptionDefs.filter((item) => {
    const normalizedKey = String(item.key || '').trim().toLowerCase();
    const normalizedLabel = String(item.label || '').trim().toLowerCase();
    if (!SHOW_CLIGNOTANT && (normalizedKey === 'clignotant' || normalizedLabel === 'clignotant')) return false;
    if (!SHOW_COMMANDE && (
      normalizedKey === 'commande'
      || normalizedLabel === 'commande'
      || normalizedKey === 'commande directionnelle'
      || normalizedLabel === 'commande directionnelle'
    )) return false;
    return true;
  }), [selectedOptionDefs]);

  const positionLabel = (item) => {
    if (item === 'Cote conducteur') return t('side_driver', 'Conducteur');
    if (item === 'Cote passager') return t('side_passenger', 'Passager');
    return item;
  };

  const pieceCardLabel = (card) => {
    if (language !== 'ar') return { label: stripPhaseSuffix(card.label), subtitle: card.subtitle };
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

  useEffect(() => {
    if (!showValidationHint) return undefined;
    const timer = window.setTimeout(() => {
      setShowValidationHint(false);
    }, 3000);
    return () => window.clearTimeout(timer);
  }, [showValidationHint]);

  return (
    <div className="product-view">
      

      <div className={`product-layout ${hasCatalogSelection ? 'with-floating-actions' : 'catalog-only'}`}>
        {hasCatalogSelection ? (
        <aside className="catalog-preview-overlay">
          {selectedCatalogCard ? (
            <div className="piece-slider-block product-image-preview-block" role="region" aria-label={t('product_preview_selected', 'Apercu produit selectionne')}>
              <button type="button" className="product-image-trigger" onClick={openLightbox}>
                <CatalogPreview focus={selectedCatalogCard.previewFocus} imageSrc={selectedPreviewImage} />
              </button>
              {previewThumbnailImages.length > 1 ? (
                <div className="preview-thumbnails" role="listbox" aria-label={t('product_preview_images', 'Images du retroviseur complet')}>
                  {previewThumbnailImages.map((imgSrc, idx) => (
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
            t={t}
            brand={brand}
            model={model}
            year={year}
          />

          <ProductOptionsSection
            t={t}
            hasCatalogSelection={hasCatalogSelection}
            positions={positions}
            productConfig={productConfig}
            onChange={onChange}
            positionLabel={positionLabel}
            isPieceOrder={isPieceOrder}
            selectedFeatureKey={selectedFeatureKey}
            selectedOptions={selectedOptions}
            toggleOption={toggleOption}
            isCompleteOrder={isCompleteOrder}
            selectedOptionDefs={visibleOptionDefs}
            showPositionSection={selectedCatalogCard?.requiresPosition !== false}
          />

          {hasCatalogSelection ? (
            <div className="product-actions-shell product-actions-shell-bottom">
              <ProductActions
                hasCatalogSelection={hasCatalogSelection}
                t={t}
                onContinue={handleContinue}
                onContinueShopping={handleContinueShoppingClick}
                quoteItemsCount={quoteItemsCount}
                showValidationHint={showValidationHint}
                canContinue={canContinue}
              />
            </div>
          ) : null}
        </div>
      </div>

      {isLightboxOpen && (
        <div className="lightbox-overlay" role="dialog" aria-modal="true">
          <button type="button" className="lightbox-close" onClick={closeLightbox} aria-label={t('product_lightbox_close', 'Fermer la visionneuse')}>
            ×
          </button>
          <div className="lightbox-image-wrap">
            <img
              src={selectedPreviewImage}
              alt={t('product_lightbox_alt', 'Retroviseur exterieur de voiture en grand format')}
              className="lightbox-image"
              style={{ transform: `scale(${zoom})` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
