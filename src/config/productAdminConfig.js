export const PRODUCT_KEYS = ['COMPLETE', 'GLASS', 'MIRROR', 'COVER', 'SINGLE'];

export const DEFAULT_CATALOG_PRODUCTS = [
  {
    key: 'COMPLETE',
    label: 'Retroviseur complet',
    subtitle: 'Produit complet',
    orderScope: 'complete',
    pieceType: 'Retroviseur complet (ensemble pret a monter)',
    optionGroup: 'COMPLETE',
    previewFocus: 'complete',
    requiresPosition: true,
    requiresAdjustment: true,
  },
  {
    key: 'GLASS',
    label: 'GLASS',
    subtitle: 'Verre',
    orderScope: 'piece',
    pieceType: 'Glace de retroviseur uniquement',
    optionGroup: 'GLASS',
    previewFocus: 'glass',
    requiresPosition: true,
    requiresAdjustment: false,
  },
  {
    key: 'MIRROR',
    label: 'MIRROR',
    subtitle: 'Corps',
    orderScope: 'piece',
    pieceType: 'Support / Platine de fixation',
    optionGroup: 'MIRROR',
    previewFocus: 'mirror',
    requiresPosition: true,
    requiresAdjustment: false,
  },
  {
    key: 'COVER',
    label: 'COVER',
    subtitle: 'Coque',
    orderScope: 'piece',
    pieceType: 'Coque / Cache exterieur uniquement',
    optionGroup: 'COVER',
    previewFocus: 'cover',
    requiresPosition: true,
    requiresAdjustment: false,
  },
  {
    key: 'SINGLE',
    label: 'SINGLE',
    subtitle: 'Lumiere',
    orderScope: 'piece',
    pieceType: 'Clignotant integre seul',
    optionGroup: 'SINGLE',
    previewFocus: 'single',
    requiresPosition: true,
    requiresAdjustment: false,
  },
];

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
    { key: 'Noir', label: 'Noir', icon: 'shape' },
    { key: 'Blanc', label: 'Blanc', icon: 'shape' },
    { key: 'Gris', label: 'Gris', icon: 'shape' },
    { key: 'Bleu', label: 'Bleu', icon: 'shape' },
    { key: 'Rouge', label: 'Rouge', icon: 'shape' },
    { key: 'Carbon', label: 'Carbon', icon: 'shape' },
    { key: 'Batman', label: 'Batman', icon: 'shape' },
  ],
  SINGLE: [
    { key: 'DINAMIC', label: 'DINAMIC', icon: 'lamp' },
    { key: 'Blanc', label: 'Blanc', icon: 'shape' },
    { key: 'Noir', label: 'Noir', icon: 'shape' },
  ],
};

export const DEFAULT_PRODUCT_ADMIN_CONFIG = {
  catalogProducts: [],
  enabledProducts: [],
  completeOptionKeys: [],
  productImagesByKey: Object.fromEntries(PRODUCT_KEYS.map((key) => [key, []])),
  productOptionDefsByProductKey: {},
  pieceOptionsByKey: Object.fromEntries(
    Object.keys(PIECE_OPTION_DEFS).map((productKey) => [productKey, []])
  ),
};
