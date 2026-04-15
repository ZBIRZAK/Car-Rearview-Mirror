export const PRODUCT_KEYS = ['COMPLETE', 'GLASS', 'MIRROR', 'COVER', 'SINGLE'];

export const COMPLETE_OPTION_DEFS = [
  { key: 'Glace retroviseur', label: 'Glace', icon: 'glass' },
  { key: 'Rabattement electrique', label: 'Rabattement', icon: 'folding' },
  { key: 'Eclairage sous retroviseur', label: 'Sous-eclairage', icon: 'underlight' },
  { key: 'Forme retroviseur', label: 'Forme', icon: 'shape' },
  { key: 'Chauffage glace', label: 'Chauffage', icon: 'heating' },
  { key: 'Memoire position', label: 'Memoire', icon: 'memory' },
  { key: 'Reglage electrique', label: 'Reglage electrique', icon: 'adjustment' },
  { key: 'Anti-eblouissement', label: 'Anti-eblouissement', icon: 'antiLight' },
  { key: 'Clignotant', label: 'Clignotant', icon: 'lamp' },
  { key: 'Commande directionnelle', label: 'Commande', icon: 'controller' },
  { key: 'Angle mort', label: 'Angle mort', icon: 'blindSpot' },
  { key: 'Camera', label: 'Camera', icon: 'camera' },
];

export const PIECE_OPTION_DEFS = {
  GLASS: [
    { key: 'Heating', label: 'Heating', icon: 'heating' },
    { key: 'Anti-light', label: 'Anti-light', icon: 'antiLight' },
    { key: 'Blind spot', label: 'Blind spot', icon: 'blindSpot' },
  ],
  MIRROR: [
    { key: 'ELECTRIC / MANUAL', label: 'ELECTRIC / MANUAL', icon: 'adjustment' },
    { key: 'FOLDING', label: 'FOLDING', icon: 'folding' },
    { key: 'Underlight', label: 'Underlight', icon: 'underlight' },
    { key: 'LAMP', label: 'LAMP', icon: 'lamp' },
    { key: 'CAMERA', label: 'CAMERA', icon: 'camera' },
    { key: 'Memory', label: 'Memory', icon: 'memory' },
  ],
  COVER: [
    { key: 'COLORS', label: 'COLORS', icon: 'shape' },
    { key: 'CARBON', label: 'CARBON', icon: 'shape' },
    { key: 'BATMAN', label: 'BATMAN', icon: 'shape' },
  ],
  SINGLE: [
    { key: 'DINAMIC', label: 'DINAMIC', icon: 'lamp' },
  ],
};

export const DEFAULT_PRODUCT_ADMIN_CONFIG = {
  enabledProducts: [],
  completeOptionKeys: [],
  productImagesByKey: Object.fromEntries(PRODUCT_KEYS.map((key) => [key, []])),
  pieceOptionsByKey: Object.fromEntries(
    Object.keys(PIECE_OPTION_DEFS).map((productKey) => [productKey, []])
  ),
};
