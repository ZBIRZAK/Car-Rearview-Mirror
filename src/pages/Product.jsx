import React, { useEffect, useMemo, useState } from 'react';
import { useI18n } from '../i18n';
import completeMirrorImage1 from '../images/retroviseur complet-BMW-X3-1.jpeg';
import completeMirrorImage2 from '../images/retroviseur complet-BMW-X3-2.jpeg';

const productPreviewImage = 'https://images.pexels.com/photos/1686880/pexels-photo-1686880.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1800&h=1200';
const completePreviewImages = [completeMirrorImage1, completeMirrorImage2];

const positions = ['Cote conducteur', 'Cote passager'];
const completeTypeLabel = 'Retroviseur complet (ensemble pret a monter)';

const pieceTypes = [
  'Glace de retroviseur uniquement',
  'Coque / Cache exterieur uniquement',
  'Support / Platine de fixation',
  'Moteur de reglage',
  'Clignotant integre seul',
];

const adjustmentTypes = [
  'Reglage manuel',
  'Reglage electrique',
  'Rabattable manuel',
  'Rabattable electrique',
  'Rabattement automatique',
];

const featureCards = [
  { key: 'Glace retroviseur', label: 'Glace', feature: 'Verre du retroviseur', icon: 'glass', pieceType: 'Glace de retroviseur uniquement', optionHints: ['Chauffage glace', 'Anti-eblouissement', 'Angle mort'] },
  { key: 'Rabattement electrique', label: 'Rabattement', feature: 'Rabattement electrique', icon: 'folding', pieceType: 'Moteur de reglage', optionHints: ['Electrique', 'Rabattable', 'Memoire position'] },
  { key: 'Eclairage sous retroviseur', label: 'Sous-eclairage', feature: 'Lumiere sous retroviseur', icon: 'underlight', pieceType: 'Clignotant integre seul', optionHints: ['Eclairage sous retroviseur', 'Lumiere simple', 'Lumiere dynamique'] },
  { key: 'Forme retroviseur', label: 'Forme', feature: 'Forme du retroviseur', icon: 'shape', pieceType: 'Coque / Cache exterieur uniquement', optionHints: ['Cache', 'Couleurs', 'Carbone', 'Batman'] },
  { key: 'Chauffage glace', label: 'Chauffage', feature: 'Chauffage de la glace', icon: 'heating', pieceType: 'Glace de retroviseur uniquement', optionHints: ['Chauffage glace', 'Glace retroviseur'] },
  { key: 'Memoire position', label: 'Memoire', feature: 'Memoire de position', icon: 'memory', pieceType: 'Moteur de reglage', optionHints: ['Memoire position', 'Reglage electrique'] },
  { key: 'Reglage electrique', label: 'Reglage electrique', feature: 'Commande electrique', icon: 'adjustment', pieceType: 'Moteur de reglage', optionHints: ['Reglage electrique', 'Commande directionnelle'] },
  { key: 'Anti-eblouissement', label: 'Anti-eblouissement', feature: 'Verre anti-lumiere', icon: 'antiLight', pieceType: 'Glace de retroviseur uniquement', optionHints: ['Anti-eblouissement', 'Glace retroviseur'] },
  { key: 'Clignotant', label: 'Clignotant', feature: 'Lampe / indicateur', icon: 'lamp', pieceType: 'Clignotant integre seul', optionHints: ['Clignotant', 'Lumiere simple', 'Lumiere dynamique'] },
  { key: 'Commande directionnelle', label: 'Commande', feature: 'Controle du mouvement', icon: 'controller', pieceType: 'Moteur de reglage', optionHints: ['Commande directionnelle', 'Reglage electrique'] },
  { key: 'Angle mort', label: 'Angle mort', feature: 'Detection angle mort', icon: 'blindSpot', pieceType: 'Glace de retroviseur uniquement', optionHints: ['Angle mort', 'Anti-eblouissement'] },
  { key: 'Camera', label: 'Camera', feature: 'Camera integree', icon: 'camera', pieceType: 'Support / Platine de fixation', optionHints: ['Camera', 'Support / Platine'] },
];

const pieceSelectorCards = [
  { key: 'GLASS', label: 'GLASS', subtitle: 'Verre', icon: 'pieceGlass', pieceType: 'Glace de retroviseur uniquement' },
  { key: 'MIRROR', label: 'MIRROR', subtitle: 'Corps', icon: 'pieceMirror', pieceType: 'Support / Platine de fixation' },
  { key: 'COVER', label: 'COVER', subtitle: 'Coque', icon: 'pieceCover', pieceType: 'Coque / Cache exterieur uniquement' },
  { key: 'SINGLE', label: 'SINGLE', subtitle: 'Lumiere', icon: 'pieceSingle', pieceType: 'Clignotant integre seul' },
];

const productCatalogCards = [
  { key: 'COMPLETE', label: 'Retroviseur complet', subtitle: 'Produit complet', icon: 'shape', previewFocus: 'complete', imageSrc: completeMirrorImage1 },
  { ...pieceSelectorCards[0], previewFocus: 'glass' },
  { ...pieceSelectorCards[1], previewFocus: 'mirror' },
  { ...pieceSelectorCards[2], previewFocus: 'cover' },
  { ...pieceSelectorCards[3], previewFocus: 'single' },
];

const optionGroups = [
  {
    title: 'GLASS',
    options: ['Glace retroviseur', 'Chauffage glace', 'Anti-eblouissement', 'Angle mort'],
  },
  {
    title: 'MIRROR',
    options: ['Forme retroviseur', 'Electrique', 'Manuel', 'Rabattable', 'Reglage electrique', 'Commande directionnelle', 'Memoire position', 'Camera'],
  },
  {
    title: 'LIGHT',
    options: ['Eclairage sous retroviseur', 'Clignotant', 'Lumiere simple', 'Lumiere dynamique'],
  },
  {
    title: 'COVER',
    options: ['Cache', 'Couleurs', 'Carbone', 'Batman'],
  },
];

const pieceOptionGroups = [
  {
    title: 'GLASS',
    options: ['Heating', 'Anti-light', 'Blind spot'],
  },
  {
    title: 'MIRROR',
    options: ['ELECTRIC / MANUAL', 'FOLDING', 'Underlight', 'LAMP', 'CAMERA', 'Memory'],
  },
  {
    title: 'COVER',
    options: ['COLORS', 'CARBON', 'BATMAN'],
  },
  {
    title: 'SINGLE',
    options: ['DINAMIC'],
  },
];

const pieceSuggestedOptionsByCategory = {
  GLASS: ['Heating', 'Anti-light', 'Blind spot'],
  MIRROR: ['ELECTRIC / MANUAL', 'FOLDING', 'Underlight', 'LAMP', 'CAMERA', 'Memory'],
  COVER: ['COLORS', 'CARBON', 'BATMAN'],
  SINGLE: ['DINAMIC'],
};

function FeatureIcon({ type }) {
  if (type === 'pieceGlass') {
    return (
      <svg viewBox="0 0 64 64" className="feature-icon-svg" aria-hidden="true">
        <path d="M8 42l12-20h28c4 0 8 3 8 7v8c0 4-3 8-8 8H8z" fill="#111" />
        <path d="M12 42l12-20v20z" fill="#111" />
        <path d="M22 26h24c3 0 5 2 5 5v6c0 3-2 5-5 5H22z" fill="#d8e8ff" />
        <path d="M30 26v16" stroke="#7ea2d6" strokeWidth="2.2" />
        <path d="M18 33l3-2M20 37l3-2" stroke="#7a8088" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === 'pieceMirror') {
    return (
      <svg viewBox="0 0 64 64" className="feature-icon-svg" aria-hidden="true">
        <path d="M7 47l14-26h28c5 0 8 3 8 7v10c0 4-3 8-9 8H7z" fill="#111" />
        <path d="M7 47l14-26v26z" fill="none" stroke="#111" strokeWidth="2.2" />
        <path d="M39 31v10M34 36h10" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M39 27l3 4h-6zM39 45l-3-4h6zM30 36l4-3v6zM48 36l-4 3v-6z" fill="#fff" />
      </svg>
    );
  }
  if (type === 'pieceCover') {
    return (
      <svg viewBox="0 0 64 64" className="feature-icon-svg" aria-hidden="true">
        <path d="M9 45l13-24h25c6 0 10 3 11 8v7c0 5-4 9-11 9H9z" fill="#1f1f1f" />
        <path d="M13 42l10-18h22c3 0 6 2 6 5v6c0 3-2 5-6 5H13z" fill="#2e2e2e" />
        <path d="M13 42l10-18v18z" fill="#272727" />
        <path d="M27 27h17c2 0 4 1 4 4v4c0 2-2 4-4 4H27z" fill="#c7a55f" />
      </svg>
    );
  }
  if (type === 'pieceSingle') {
    return (
      <svg viewBox="0 0 64 64" className="feature-icon-svg" aria-hidden="true">
        <path d="M8 17h31l9 8v20H8z" fill="#111" />
        <path d="M30 34h17v7H30z" fill="#d83a2f" />
        <path d="M50 34l6-1M50 38h7M50 42l6 1" stroke="#ff6f61" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M18 29h10v3H18z" fill="#e8ecef" opacity="0.75" />
      </svg>
    );
  }
  if (type === 'glass') {
    return (
      <svg viewBox="0 0 64 64" className="feature-icon-svg" aria-hidden="true">
        <path d="M8 46l13-23h26c4 0 7 3 7 7v9c0 4-3 7-8 7H8z" fill="#0f0f0f" />
        <path d="M11 45l12-22v22z" fill="none" stroke="#0f0f0f" strokeWidth="2.2" />
        <path d="M17 40l8-14h16c3 0 5 2 5 5v5c0 3-2 4-5 4H17z" fill="#f4f7fb" />
        <path d="M25 32l4-2M27 37l4-2M22 37l3-1.5" stroke="#66717c" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === 'folding') {
    return (
      <svg viewBox="0 0 64 64" className="feature-icon-svg" aria-hidden="true">
        <path d="M8 46l13-23h26c4 0 7 3 7 7v9c0 4-3 7-8 7H8z" fill="#0f0f0f" />
        <path d="M11 45l12-22v22z" fill="#0f0f0f" />
        <path d="M47 46c6-4 9-10 9-17 0-7-3-12-10-16" stroke="#0f0f0f" strokeWidth="2.8" fill="none" strokeLinecap="round" />
        <path d="M48 10l8 2-4 7z" fill="#0f0f0f" />
        <path d="M28 24l-4 8h5l-2 7 8-10h-5l2-5z" fill="#d9322a" />
      </svg>
    );
  }
  if (type === 'underlight') {
    return (
      <svg viewBox="0 0 64 64" className="feature-icon-svg" aria-hidden="true">
        <path d="M8 46l13-23h26c4 0 7 3 7 7v9c0 4-3 7-8 7H8z" fill="#0f0f0f" />
        <path d="M11 45l12-22v22z" fill="#0f0f0f" />
        <path d="M29 37h16c1.5 0 2.8 1.2 2.8 2.8v1.4c0 1.6-1.3 2.8-2.8 2.8H29z" fill="#d9322a" />
        <path d="M27 46l-2 4M33 46v5M39 46l2 4M45 46l2 4" stroke="#0f0f0f" strokeWidth="2.1" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === 'shape') {
    return (
      <svg viewBox="0 0 64 64" className="feature-icon-svg" aria-hidden="true">
        <path d="M8 47l13-24h27c5 0 8 3 8 8v8c0 5-3 8-8 8H8z" fill="#0f0f0f" />
        <path d="M8 47l13-24v24z" fill="none" stroke="#0f0f0f" strokeWidth="2.2" />
      </svg>
    );
  }
  if (type === 'heating') {
    return (
      <svg viewBox="0 0 64 64" className="feature-icon-svg" aria-hidden="true">
        <rect x="8" y="8" width="48" height="48" rx="6" fill="#0f0f0f" />
        <path d="M20 44c2.2-4 2.2-7 0-10-2-3-2-6.5 0-10.5M32 44c2.2-4 2.2-7 0-10-2-3-2-6.5 0-10.5M44 44c2.2-4 2.2-7 0-10-2-3-2-6.5 0-10.5" stroke="#f2f2f2" strokeWidth="3" fill="none" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === 'memory') {
    return (
      <svg viewBox="0 0 64 64" className="feature-icon-svg" aria-hidden="true">
        <path d="M13 16h38v30H13z" fill="#f7f7f7" stroke="#0f0f0f" strokeWidth="2.1" />
        <path d="M10 46h44l-3 8H13z" fill="#f1f1f1" stroke="#0f0f0f" strokeWidth="2.1" />
        <text x="32" y="36" textAnchor="middle" fontSize="22" fontWeight="700" fill="#0f0f0f" fontFamily="Arial, sans-serif">M</text>
      </svg>
    );
  }
  if (type === 'adjustment') {
    return (
      <svg viewBox="0 0 64 64" className="feature-icon-svg" aria-hidden="true">
        <path d="M19 10h26c5 0 9 4 9 9v26c0 5-4 9-9 9H19z" fill="#0f0f0f" />
        <path d="M32 23v17M24 32h16" stroke="#f7f7f7" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M32 18l4 5h-8zM32 45l-4-5h8zM19 32l5-4v8zM45 32l-5 4v-8z" fill="#f7f7f7" />
        <path d="M24 24l-3 3M40 24l3 3M24 40l-3-3M40 40l3-3" stroke="#f7f7f7" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === 'antiLight') {
    return (
      <svg viewBox="0 0 64 64" className="feature-icon-svg" aria-hidden="true">
        <path d="M8 46l13-23h26c4 0 7 3 7 7v9c0 4-3 7-8 7H8z" fill="#f8f8f8" stroke="#0f0f0f" strokeWidth="2.1" />
        <path d="M11 45l12-22v22z" fill="#f8f8f8" stroke="#0f0f0f" strokeWidth="2.1" />
        <path d="M23 26h23c3 0 5 2 5 5v7c0 2.5-2 4.5-5 4.5H23z" fill="#2f73d7" />
        <path d="M34 26v16" stroke="#cadaf2" strokeWidth="2" />
      </svg>
    );
  }
  if (type === 'lamp') {
    return (
      <svg viewBox="0 0 64 64" className="feature-icon-svg" aria-hidden="true">
        <path d="M8 46l13-23h26c4 0 7 3 7 7v9c0 4-3 7-8 7H8z" fill="#0f0f0f" />
        <path d="M11 45l12-22v22z" fill="#0f0f0f" />
        <path d="M38 36h10v7H38z" fill="#d9322a" />
        <path d="M51 36l5-1M51 39h6M51 42l5 1" stroke="#d9322a" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === 'controller') {
    return (
      <svg viewBox="0 0 64 64" className="feature-icon-svg" aria-hidden="true">
        <rect x="10" y="10" width="44" height="44" rx="8" fill="#f7f7f7" stroke="#0f0f0f" strokeWidth="2.2" />
        <path d="M32 18l4 6h-8zM32 46l-4-6h8zM18 32l6-4v8zM46 32l-6 4v-8z" fill="#0f0f0f" />
        <path d="M24 24c2.6-2.6 5-3.8 8-3.8s5.4 1.2 8 3.8M24 40c2.6 2.6 5 3.8 8 3.8s5.4-1.2 8-3.8" stroke="#0f0f0f" strokeWidth="1.6" fill="none" />
      </svg>
    );
  }
  if (type === 'blindSpot') {
    return (
      <svg viewBox="0 0 64 64" className="feature-icon-svg" aria-hidden="true">
        <path d="M8 46l13-23h26c4 0 7 3 7 7v9c0 4-3 7-8 7H8z" fill="#f7f7f7" stroke="#0f0f0f" strokeWidth="2.1" />
        <path d="M11 45l12-22v22z" fill="#f7f7f7" stroke="#0f0f0f" strokeWidth="2.1" />
        <path d="M17.5 42l5-9 5 9z" fill="#d9322a" />
        <path d="M14 39l2-1M14 42l2-0.2" stroke="#d9322a" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === 'camera') {
    return (
      <svg viewBox="0 0 64 64" className="feature-icon-svg" aria-hidden="true">
        <path d="M8 46l13-23h26c4 0 7 3 7 7v9c0 4-3 7-8 7H8z" fill="#0f0f0f" />
        <path d="M11 45l12-22v22z" fill="#0f0f0f" />
        <path d="M18 39l7-12h15c3 0 5 2 5 5v5c0 2.5-2 4-5 4H18z" fill="#f2f5f8" />
        <path d="M45 23l7 4v18l-7-3z" fill="#2f2f2f" />
        <circle cx="19" cy="45" r="4.8" fill="#f7f7f7" stroke="#0f0f0f" strokeWidth="2.1" />
        <circle cx="19" cy="45" r="1.9" fill="#0f0f0f" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 64 64" className="feature-icon-svg" aria-hidden="true">
      <circle cx="32" cy="32" r="10" fill="#111" />
    </svg>
  );
}

function CatalogPreview({ focus, imageSrc }) {
  const focusClass = focus ? `focus-${focus}` : '';
  return (
    <span className={`catalog-preview ${focusClass}`}>
      <img key={imageSrc || productPreviewImage} className="catalog-preview-image" src={imageSrc || productPreviewImage} alt="" />
      <span className="catalog-preview-shade" />
    </span>
  );
}

export default function Product({ brand, model, year, productConfig, onChange, onContinue }) {
  if (!year) return null;
  const { t, language } = useI18n();

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [showValidationHint, setShowValidationHint] = useState(false);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [completePreviewIndex, setCompletePreviewIndex] = useState(0);
  const [catalogCompleteImageIndex, setCatalogCompleteImageIndex] = useState(0);

  const selectedOptions = productConfig.options || [];
  const isCompleteOrder = productConfig.orderScope === 'complete';
  const isPieceOrder = productConfig.orderScope === 'piece';
  const selectedFeatureKey = productConfig.selectedFeature || '';
  const selectedFeature = pieceSelectorCards.find((item) => item.key === selectedFeatureKey) || null;
  const selectedCatalogCard = productCatalogCards.find((item) => {
    if (item.key === 'COMPLETE') return isCompleteOrder;
    return selectedFeatureKey === item.key;
  }) || null;
  const hasCatalogSelection = Boolean(productConfig.orderScope);
  const isCompleteCatalogSelection = selectedCatalogCard?.key === 'COMPLETE';
  const selectedPreviewImage = isCompleteCatalogSelection
    ? completePreviewImages[completePreviewIndex] || completePreviewImages[0]
    : (selectedCatalogCard?.imageSrc || productPreviewImage);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCatalogCompleteImageIndex((prev) => (prev + 1) % completePreviewImages.length);
    }, 2600);
    return () => window.clearInterval(timer);
  }, []);

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

  const zoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 3));
  const zoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.5));
  const resetZoom = () => setZoom(1);

  const toggleOption = (optionLabel) => {
    const nextOptions = selectedOptions.includes(optionLabel)
      ? selectedOptions.filter((item) => item !== optionLabel)
      : [...selectedOptions, optionLabel];
    onChange('options', nextOptions);
  };

  const advancedStepNumber = isCompleteOrder ? 6 : 5;

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

  const resetCatalogSelection = () => {
    onChange('orderScope', '');
    onChange('selectedFeature', '');
    onChange('productType', '');
    onChange('adjustmentType', '');
    onChange('options', []);
    setShowValidationHint(false);
    setCompletePreviewIndex(0);
  };

  const contextualOptionGroups = useMemo(() => {
    if (isPieceOrder) return pieceOptionGroups;
    return optionGroups;
  }, [isPieceOrder]);

  const pieceSuggestedOptions = useMemo(() => {
    if (!isPieceOrder) return [];
    return pieceSuggestedOptionsByCategory[selectedFeatureKey] || [];
  }, [isPieceOrder, selectedFeatureKey]);

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

  return (
    <div className="product-view">
      <div className="view-header">
        <h2>{t('product_title', 'Configurez votre demande')}</h2>
        <p>{brand?.name} {model} ({year}) - {t('product_subtitle_suffix', 'suivez simplement les etapes ci-dessous')}</p>
      </div>

      <div className={`product-layout ${hasCatalogSelection ? '' : 'catalog-only'}`}>
        {hasCatalogSelection ? (
        <aside className="catalog-preview-overlay">
          {selectedCatalogCard ? (
            <div className="piece-slider-block product-image-preview-block" role="region" aria-label="Apercu produit selectionne">
              <p className="piece-slider-title">Apercu du produit selectionne</p>
              <button type="button" className="product-image-trigger" onClick={openLightbox}>
                <CatalogPreview focus={selectedCatalogCard.previewFocus} imageSrc={selectedPreviewImage} />
              </button>
              {isCompleteCatalogSelection ? (
                <div className="preview-thumbnails" role="listbox" aria-label="Images du retroviseur complet">
                  {completePreviewImages.map((imgSrc, idx) => (
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

          {/* <div className="product-mini-summary">
            <p><strong>Commande :</strong> {isCompleteOrder ? 'Complete' : isPieceOrder ? 'Piece' : 'Non definie'}</p>
            <p><strong>Position :</strong> {productConfig.position || 'Aucune'}</p>
            <p><strong>Type :</strong> {productConfig.productType || 'Aucun'}</p>
            <p><strong>Piece cible :</strong> {selectedFeature?.label || 'Non definie'}</p>
            <p><strong>Reglage :</strong> {productConfig.adjustmentType || (isPieceOrder ? 'Optionnel' : 'Aucun')}</p>
            <p><strong>Options :</strong> {selectedOptions.length ? selectedOptions.join(', ') : 'Aucune'}</p>
          </div> */}

            {/* {requiredMissing.length ? (
              <div className="missing-required-box">
                <p>Champs requis manquants:</p>
                <ul>
                  {requiredMissing.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            ) : null} */}
        </aside>
        ) : null}

        <div className="product-config">
          {!hasCatalogSelection ? (
            <section className="config-group">
              <h3>{t('product_catalog_title', 'Choisissez le produit a commander')}</h3>
              <p className="config-help">{t('product_catalog_help', 'Selectionnez un produit pour ouvrir sa page d options.')}</p>
              <div className="order-scope-grid product-catalog-grid">
                {productCatalogCards.map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    className="catalog-product-card"
                    onClick={() => handleCatalogSelect(item)}
                  >
                    <CatalogPreview
                      focus={item.previewFocus}
                      imageSrc={item.key === 'COMPLETE' ? completePreviewImages[catalogCompleteImageIndex] : item.imageSrc}
                    />
                    <span className="order-scope-title">{pieceCardLabel(item).label}</span>
                    <span className="order-scope-sub">{pieceCardLabel(item).subtitle}</span>
                  </button>
                ))}
              </div>
            </section>
          ) : null}

          {hasCatalogSelection ? (
            <section className="config-group">
            <h3>{t('product_step2', '2. Cote du retroviseur')}</h3>
            <p className="config-help">{t('product_step2_help', 'Selectionnez le cote du vehicule concerne.')}</p>
            {/* <p className="config-help">Choisissez le cote: conducteur ou passager.</p> */}
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
              {/* <p className="config-help">
                Ces options sont facultatives. Vous pouvez choisir une ou plusieurs options, ou aucune (piece seule).
              </p> */}
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
                      {optionLabel}
                    </button>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          {/* <section className="config-group">
            <h3>3. Produit a commander</h3>
            <p className="config-help">
              {isCompleteOrder
                ? 'Mode complet: type deja defini.'
                : selectedFeature && !showManualPiecePicker
                  ? 'Piece definie via l icone selectionnee.'
                  : 'Mode piece: choisissez la piece exacte.'}
            </p>

            {isCompleteOrder ? (
              <div className="choice-list">
                <button type="button" className="choice-btn active" onClick={() => onChange('productType', completeTypeLabel)}>
                  {completeTypeLabel}
                </button>
              </div>
            ) : (
              <>
                {selectedFeature && !showManualPiecePicker ? (
                  <div className="choice-list">
                    <button type="button" className="choice-btn active">
                      {productConfig.productType}
                    </button>
                    <button
                      type="button"
                      className="secondary-button"
                      onClick={() => setShowManualPiecePicker(true)}
                    >
                      Changer la piece manuellement
                    </button>
                  </div>
                ) : (
                  <div className="choice-list piece-type-grid">
                    {pieceTypes.map((item) => (
                      <button
                        key={item}
                        type="button"
                        className={`choice-btn ${productConfig.productType === item ? 'active' : ''}`}
                        onClick={() => {
                          onChange('productType', item);
                      const match = pieceSelectorCards.find((card) => card.pieceType === item);
                      if (match) onChange('selectedFeature', match.key);
                          setShowManualPiecePicker(false);
                        }}
                        disabled={!isPieceOrder}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </section> */}

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

          {hasCatalogSelection && isCompleteOrder ? (
            <section className="config-group">
              <h3>5. Options du retroviseur (optionnel)</h3>
              <p className="config-help">Choisissez les options visibles pour votre retroviseur complet.</p>
              <div className="feature-grid">
                {featureCards.map((card) => (
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

          {/* <div className="advanced-toggle-wrap">
            <button
              type="button"
              className="secondary-button advanced-toggle-btn"
              onClick={() => setShowAdvancedOptions((prev) => !prev)}
            >
              {showAdvancedOptions ? 'Masquer les options avancees' : 'Afficher les options avancees'}
            </button>
          </div> */}

          {/* {showAdvancedOptions ? (
            <section className="config-group">
              <h3>{advancedStepNumber}. Details supplementaires (optionnel)</h3>
              <p className="config-help">Options techniques detaillees par categorie.</p>
              <div className="option-groups">
                  {contextualOptionGroups.map((group) => (
                    <div key={group.title} className="option-group">
                    <p className="option-group-title">{group.title}</p>
                    <div className="option-chip-list">
                      {group.options.map((optionLabel) => (
                        <button
                          key={optionLabel}
                          type="button"
                          className={`option-chip ${selectedOptions.includes(optionLabel) ? 'active' : ''}`}
                          onClick={() => toggleOption(optionLabel)}
                        >
                          {optionLabel}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : null} */}

          {hasCatalogSelection ? (
            <>
              <button type="button" className="submit-button" onClick={handleContinue}>
                {t('continue_form', 'Continuer vers le formulaire')}
              </button>

              {showValidationHint && !canContinue ? (
                <p className="inline-hint-error">
                  Merci de completer les champs requis avant de continuer.
                </p>
              ) : null}
            </>
          ) : null}
        </div>
      </div>

      {isLightboxOpen && (
        <div className="lightbox-overlay" role="dialog" aria-modal="true">
          <button type="button" className="lightbox-close" onClick={closeLightbox} aria-label="Fermer la visionneuse">
            ×
          </button>
          <div className="lightbox-controls">
            <button type="button" onClick={zoomOut}>-</button>
            <button type="button" onClick={resetZoom}>Reinitialiser</button>
            <button type="button" onClick={zoomIn}>+</button>
          </div>
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
