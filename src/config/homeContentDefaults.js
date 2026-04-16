const DEFAULT_SEO_CARDS = [
  {
    title: 'Par cote',
    links: [
      { label: 'Retroviseur exterieur gauche (cote conducteur)', href: '/retroviseur-exterieur-gauche' },
      { label: 'Retroviseur exterieur droit (cote passager)', href: '/retroviseur-exterieur-droit' },
    ],
  },
  {
    title: 'Par fonctionnalite',
    links: [
      { label: 'Retroviseur exterieur electrique', href: '/retroviseur-exterieur-electrique' },
      { label: 'Retroviseur exterieur chauffant / degivrant', href: '/retroviseur-exterieur-chauffant' },
      { label: 'Retroviseur exterieur rabattable electriquement', href: '/retroviseur-exterieur-rabattable-electriquement' },
      { label: 'Retroviseur avec clignotant integre', href: '' },
      { label: 'Retroviseur exterieur photochromatique', href: '' },
    ],
  },
  {
    title: 'Par type de vehicule',
    links: [
      { label: 'Retroviseur exterieur pour utilitaire', href: '' },
      { label: 'Retroviseur exterieur pour camping-car / fourgon', href: '' },
      { label: 'Retroviseur exterieur surbaisse (sport / tuning)', href: '' },
      { label: 'Retroviseur exterieur tout-terrain / off-road', href: '' },
    ],
  },
  {
    title: 'Par type de verre',
    links: [
      { label: 'Retroviseur grand angle / aspherique', href: '' },
      { label: 'Verre de retroviseur convexe', href: '' },
      { label: 'Retroviseur exterieur a memoire', href: '' },
    ],
  },
  {
    title: 'Guides & besoins',
    links: [
      { label: 'Remplacer retroviseur exterieur', href: '' },
      { label: 'Comment demonter retroviseur exterieur', href: '' },
      { label: 'Reparation retroviseur exterieur', href: '' },
      { label: 'Retroviseur exterieur universel', href: '' },
    ],
  },
  {
    title: 'Longue traine',
    links: [
      { label: 'Retroviseur exterieur chauffant gauche pour [Marque Modele]', href: '' },
      { label: 'Coque de retroviseur exterieur carbone [Marque Modele]', href: '' },
      { label: "Kit eclairage d'aile pour retroviseur exterieur", href: '' },
    ],
  },
];

const DEFAULT_WHY_ITEMS = [
  {
    icon: 'shield',
    title: 'Qualite Premium',
    description: 'Tous nos retroviseurs passent un controle strict avant expedition',
  },
  {
    icon: 'bolt',
    title: 'Livraison Rapide',
    description: 'Livraison rapide a votre adresse avec suivi de colis',
  },
  {
    icon: 'price',
    title: 'Meilleurs Prix',
    description: 'Prix competitifs sans frais caches',
  },
  {
    icon: 'support',
    title: 'Support 24/7',
    description: 'Une equipe disponible pour repondre a toutes vos questions',
  },
];

export const DEFAULT_HOME_CONTENT = {
  heroOverlayLines: ['VOTRE', 'RETROVISEUR,', 'NOTRE', 'EXPERTISE.'],
  trustStrip: ['Livraison rapide', 'Paiement securise', 'Support 24/7'],
  mechanicSectionTitle: 'Contacts mecaniciens',
  mechanicSectionIntro: "Besoin d'aide pour le montage ? Contactez un mecanicien partenaire.",
  featuredSectionTitle: 'Produits en vedette',
  featuredItems: [
    {
      title: 'Retroviseur Universel',
      description: 'Compatible avec la plupart des vehicules avec finition premium',
      image: 'https://images.pexels.com/photos/17168615/pexels-photo-17168615.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1500&h=1000',
    },
    {
      title: 'Retroviseur Anti-Eblouissement',
      description: "Reduit l'eblouissement de nuit grace a une technologie avancee",
      image: 'https://images.pexels.com/photos/15360851/pexels-photo-15360851.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1500&h=1000',
    },
    {
      title: 'Reglage Electrique',
      description: 'Commandes electriques pratiques pour un ajustement facile',
      image: 'https://images.pexels.com/photos/12152813/pexels-photo-12152813.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1500&h=1000',
    },
  ],
  whySectionTitle: 'Pourquoi nous choisir ?',
  whyItems: DEFAULT_WHY_ITEMS,
  finalCta: {
    title: 'Pret a ameliorer votre vehicule ?',
    description: 'Parcourez notre collection et trouvez le retroviseur parfait',
    buttonLabel: 'Explorer',
  },
  seo: {
    title: 'Retroviseurs exterieurs : recherches populaires',
    intro: "Trouvez rapidement le bon produit selon le cote, la fonctionnalite et l'usage de votre vehicule.",
    cards: DEFAULT_SEO_CARDS,
  },
  mechanicGroups: [
    {
      group: 'Tolier',
      contacts: [
        {
          name: 'Atelier Tolerie Atlas',
          address: '12 Rue Al Massira, Casablanca',
          phone: '+212612345678',
          image: 'https://images.pexels.com/photos/13065690/pexels-photo-13065690.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=700&h=500',
        },
        {
          name: 'Carrosserie Maghreb',
          address: '45 Avenue Hassan II, Rabat',
          phone: '+212623456789',
          image: 'https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=700&h=500',
        },
      ],
    },
    {
      group: 'Mecanicien',
      contacts: [
        {
          name: 'Meca Express',
          address: '8 Boulevard Mohammed V, Tanger',
          phone: '+212634567890',
          image: 'https://images.pexels.com/photos/3806249/pexels-photo-3806249.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=700&h=500',
        },
        {
          name: 'Garage Pro Service',
          address: '22 Rue Oued Sebou, Fes',
          phone: '+212635678901',
          image: 'https://images.pexels.com/photos/4489737/pexels-photo-4489737.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=700&h=500',
        },
      ],
    },
    {
      group: 'Electricien',
      contacts: [
        {
          name: 'Electro Auto Center',
          address: '19 Avenue des FAR, Marrakech',
          phone: '+212646789012',
          image: 'https://images.pexels.com/photos/13197681/pexels-photo-13197681.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=700&h=500',
        },
        {
          name: 'Diag Elec Auto',
          address: '5 Rue Al Qods, Agadir',
          phone: '+212657890123',
          image: 'https://images.pexels.com/photos/16085026/pexels-photo-16085026.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=700&h=500',
        },
      ],
    },
  ],
};

function normalizeString(value, fallback = '') {
  const normalized = String(value ?? '').trim();
  return normalized || fallback;
}

function normalizeLines(value, fallback) {
  if (!Array.isArray(value)) return [...fallback];
  const lines = value.map((item) => normalizeString(item)).filter(Boolean);
  return lines.length ? lines : [...fallback];
}

function normalizeSeoLinks(value, fallback) {
  if (!Array.isArray(value)) return fallback.map((link) => ({ ...link }));
  const links = value
    .map((item) => ({
      label: normalizeString(item?.label),
      href: normalizeString(item?.href),
    }))
    .filter((item) => item.label);
  return links.length ? links : fallback.map((link) => ({ ...link }));
}

export function normalizeHomeContent(rawValue) {
  const raw = rawValue && typeof rawValue === 'object' ? rawValue : {};
  const defaults = DEFAULT_HOME_CONTENT;
  const featuredDefaults = defaults.featuredItems;
  const mechanicDefaults = defaults.mechanicGroups;

  const heroOverlayLines = normalizeLines(raw.heroOverlayLines, defaults.heroOverlayLines).slice(0, 4);
  const trustStrip = normalizeLines(raw.trustStrip, defaults.trustStrip).slice(0, 4);

  const featuredItems = Array.isArray(raw.featuredItems) && raw.featuredItems.length
    ? raw.featuredItems.map((item, index) => ({
      title: normalizeString(item?.title, featuredDefaults[index]?.title || 'Produit'),
      description: normalizeString(item?.description),
      image: normalizeString(item?.image),
    }))
    : featuredDefaults.map((item) => ({ ...item }));

  const mechanicGroups = Array.isArray(raw.mechanicGroups) && raw.mechanicGroups.length
    ? raw.mechanicGroups.map((group, groupIndex) => ({
      group: normalizeString(group?.group, mechanicDefaults[groupIndex]?.group || 'Groupe'),
      contacts: Array.isArray(group?.contacts) && group.contacts.length
        ? group.contacts.map((contact, contactIndex) => ({
          name: normalizeString(contact?.name, mechanicDefaults[groupIndex]?.contacts?.[contactIndex]?.name || 'Contact'),
          address: normalizeString(contact?.address),
          phone: normalizeString(contact?.phone),
          image: normalizeString(contact?.image),
        }))
        : (mechanicDefaults[groupIndex]?.contacts || []).map((contact) => ({ ...contact })),
    }))
    : mechanicDefaults.map((group) => ({
      group: group.group,
      contacts: group.contacts.map((contact) => ({ ...contact })),
    }));

  const whyItems = Array.isArray(raw.whyItems) && raw.whyItems.length
    ? raw.whyItems.map((item, index) => ({
      icon: normalizeString(item?.icon, DEFAULT_WHY_ITEMS[index]?.icon || 'support'),
      title: normalizeString(item?.title, DEFAULT_WHY_ITEMS[index]?.title || `Avantage ${index + 1}`),
      description: normalizeString(item?.description, DEFAULT_WHY_ITEMS[index]?.description || ''),
    }))
    : DEFAULT_WHY_ITEMS.map((item) => ({ ...item }));

  const rawSeoCards = Array.isArray(raw?.seo?.cards) && raw.seo.cards.length ? raw.seo.cards : DEFAULT_SEO_CARDS;
  const seoCards = rawSeoCards.map((card, index) => {
    const fallbackCard = DEFAULT_SEO_CARDS[index] || { title: `Carte ${index + 1}`, links: [] };
    return {
      title: normalizeString(card?.title, fallbackCard.title),
      links: normalizeSeoLinks(card?.links, fallbackCard.links),
    };
  });

  return {
    heroOverlayLines,
    trustStrip,
    mechanicSectionTitle: normalizeString(raw.mechanicSectionTitle, defaults.mechanicSectionTitle),
    mechanicSectionIntro: normalizeString(raw.mechanicSectionIntro, defaults.mechanicSectionIntro),
    featuredSectionTitle: normalizeString(raw.featuredSectionTitle, defaults.featuredSectionTitle),
    featuredItems,
    whySectionTitle: normalizeString(raw.whySectionTitle, defaults.whySectionTitle),
    whyItems,
    finalCta: {
      title: normalizeString(raw?.finalCta?.title, defaults.finalCta.title),
      description: normalizeString(raw?.finalCta?.description, defaults.finalCta.description),
      buttonLabel: normalizeString(raw?.finalCta?.buttonLabel, defaults.finalCta.buttonLabel),
    },
    seo: {
      title: normalizeString(raw?.seo?.title, defaults.seo.title),
      intro: normalizeString(raw?.seo?.intro, defaults.seo.intro),
      cards: seoCards,
    },
    mechanicGroups,
  };
}
