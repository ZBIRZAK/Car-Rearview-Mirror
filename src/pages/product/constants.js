import completeMirrorImage1 from '../../images/retroviseur complet-BMW-X3-1.jpeg';
import completeMirrorImage2 from '../../images/retroviseur complet-BMW-X3-2.jpeg';

export const productPreviewImage = 'https://images.pexels.com/photos/1686880/pexels-photo-1686880.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1800&h=1200';

const completePreviewImages = [completeMirrorImage1, completeMirrorImage2];

export const defaultProductImagesByKey = {
  COMPLETE: completePreviewImages,
  GLASS: [productPreviewImage],
  MIRROR: [productPreviewImage],
  COVER: [productPreviewImage],
  SINGLE: [productPreviewImage],
};

export const positions = ['Cote conducteur', 'Cote passager'];
export const completeTypeLabel = 'Retroviseur complet (ensemble pret a monter)';

export const featureCards = [
  { key: 'Glace retroviseur', label: 'Glace', feature: 'Verre du retroviseur', icon: 'glass' },
  { key: 'Rabattement electrique', label: 'Rabattement', feature: 'Rabattement electrique', icon: 'folding' },
  { key: 'Eclairage sous retroviseur', label: 'Sous-eclairage', feature: 'Lumiere sous retroviseur', icon: 'underlight' },
  { key: 'Forme retroviseur', label: 'Forme', feature: 'Forme du retroviseur', icon: 'shape' },
  { key: 'Chauffage glace', label: 'Chauffage', feature: 'Chauffage de la glace', icon: 'heating' },
  { key: 'Memoire position', label: 'Memoire', feature: 'Memoire de position', icon: 'memory' },
  { key: 'Reglage electrique', label: 'Reglage electrique', feature: 'Commande electrique', icon: 'adjustment' },
  { key: 'Anti-eblouissement', label: 'Anti-eblouissement', feature: 'Verre anti-lumiere', icon: 'antiLight' },
  { key: 'Clignotant', label: 'Clignotant', feature: 'Lampe / indicateur', icon: 'lamp' },
  { key: 'Commande directionnelle', label: 'Commande', feature: 'Controle du mouvement', icon: 'controller' },
  { key: 'Angle mort', label: 'Angle mort', feature: 'Detection angle mort', icon: 'blindSpot' },
  { key: 'Camera', label: 'Camera', feature: 'Camera integree', icon: 'camera' },
];

export const pieceSelectorCards = [
  { key: 'GLASS', label: 'GLASS', subtitle: 'Verre', icon: 'pieceGlass', pieceType: 'Glace de retroviseur uniquement' },
  { key: 'MIRROR', label: 'MIRROR', subtitle: 'Corps', icon: 'pieceMirror', pieceType: 'Support / Platine de fixation' },
  { key: 'COVER', label: 'COVER', subtitle: 'Coque', icon: 'pieceCover', pieceType: 'Coque / Cache exterieur uniquement' },
  { key: 'SINGLE', label: 'SINGLE', subtitle: 'Lumiere', icon: 'pieceSingle', pieceType: 'Clignotant integre seul' },
];

export const productCatalogCards = [
  { key: 'COMPLETE', label: 'Retroviseur complet', subtitle: 'Produit complet', icon: 'shape', previewFocus: 'complete', imageSrc: completeMirrorImage1 },
  { ...pieceSelectorCards[0], previewFocus: 'glass' },
  { ...pieceSelectorCards[1], previewFocus: 'mirror' },
  { ...pieceSelectorCards[2], previewFocus: 'cover' },
  { ...pieceSelectorCards[3], previewFocus: 'single' },
];

export const pieceSuggestedOptionsByCategory = {
  GLASS: ['Heating', 'Anti-light', 'Blind spot'],
  MIRROR: ['ELECTRIC / MANUAL', 'FOLDING', 'Underlight', 'LAMP', 'CAMERA', 'Memory'],
  COVER: ['COLORS', 'CARBON', 'BATMAN'],
  SINGLE: ['DINAMIC'],
};
