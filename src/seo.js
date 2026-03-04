const SITE_NAME = 'Retroviseurs Exterieurs Premium';
const DEFAULT_DESCRIPTION =
  "Retroviseur exterieur gauche, droit, electrique, chauffant, rabattable et photochromatique. Trouvez le modele compatible par marque, modele et annee.";

const BASE_KEYWORDS = [
  'retroviseur exterieur',
  'retroviseur exterieur gauche',
  'retroviseur exterieur droit',
  'retroviseur exterieur electrique',
  'retroviseur exterieur chauffant',
  'retroviseur exterieur degivrant',
  'retroviseur exterieur rabattable electriquement',
  "retroviseur d'aile clignotant integre",
  'retroviseur exterieur photochromatique',
  'retroviseur exterieur utilitaire',
  'retroviseur exterieur camping car',
  'retroviseur exterieur grand angle',
  'verre de retroviseur convexe',
  'remplacer retroviseur exterieur',
  'reparation retroviseur exterieur',
  'retroviseur exterieur universel',
];

function getSeoForView(view, context) {
  const brand = context?.brand?.name || '';
  const model = context?.model || '';
  const year = context?.year || '';
  const categorySlug = context?.categorySlug || '';
  const selectionLabel = [brand, model, year].filter(Boolean).join(' ');

  const categorySeo = {
    'retroviseur-exterieur-gauche': {
      title: 'Retroviseur exterieur gauche (cote conducteur) | Retroviseurs Exterieurs Premium',
      description:
        'Trouvez un retroviseur exterieur gauche compatible: electrique, chauffant, rabattable. Selection par marque, modele et annee.',
    },
    'retroviseur-exterieur-droit': {
      title: 'Retroviseur exterieur droit (cote passager) | Retroviseurs Exterieurs Premium',
      description:
        'Achetez un retroviseur exterieur droit compatible: version manuelle ou electrique avec options premium.',
    },
    'retroviseur-exterieur-chauffant': {
      title: 'Retroviseur exterieur chauffant / degivrant | Retroviseurs Exterieurs Premium',
      description:
        'Retroviseurs exterieurs chauffants pour une meilleure visibilite en hiver. Modeles gauche, droit et compatibles multi-marques.',
    },
    'retroviseur-exterieur-electrique': {
      title: 'Retroviseur exterieur electrique | Retroviseurs Exterieurs Premium',
      description:
        "Selection de retroviseurs exterieurs electriques pour plus de confort de reglage et une compatibilite precise.",
    },
    'retroviseur-exterieur-rabattable-electriquement': {
      title: 'Retroviseur exterieur rabattable electriquement | Retroviseurs Exterieurs Premium',
      description:
        'Modeles rabattables electriquement pour le stationnement en ville et la protection des retroviseurs.',
    },
  };

  const map = {
    home: {
      title: `${SITE_NAME} | Gauche, Droit, Electrique, Chauffant`,
      description:
        "Retroviseurs exterieurs pour voiture: gauche, droit, electrique, chauffant, rabattable et universel. Selection rapide par marque, modele et annee.",
      keywords: BASE_KEYWORDS,
    },
    models: {
      title: `Modeles ${brand || 'vehicule'} | ${SITE_NAME}`,
      description:
        `Choisissez le modele ${brand || 'de votre vehicule'} pour trouver un retroviseur exterieur compatible.`,
      keywords: [...BASE_KEYWORDS, `${brand} retroviseur exterieur`].filter(Boolean),
    },
    years: {
      title: `Annees ${model || ''} | ${SITE_NAME}`.trim(),
      description:
        `Selectionnez l'annee de ${model || 'votre vehicule'} pour afficher les retroviseurs exterieurs compatibles.`,
      keywords: [...BASE_KEYWORDS, `${model} retroviseur exterieur`].filter(Boolean),
    },
    product: {
      title: `${selectionLabel || 'Configuration retroviseur'} | ${SITE_NAME}`,
      description:
        `Configurez votre retroviseur exterieur ${selectionLabel}. Options: electrique, chauffant, rabattable et type de produit.`,
      keywords: [...BASE_KEYWORDS, `${selectionLabel} retroviseur exterieur`].filter(Boolean),
    },
    form: {
      title: `Demande de devis | ${SITE_NAME}`,
      description:
        "Envoyez votre demande pour un retroviseur exterieur compatible. Reponse rapide et accompagnement personnalise.",
      keywords: BASE_KEYWORDS,
    },
    about: {
      title: `A propos | ${SITE_NAME}`,
      description:
        "Decouvrez notre expertise en retroviseurs exterieurs: qualite premium, support et conseils de compatibilite.",
      keywords: BASE_KEYWORDS,
    },
    contact: {
      title: `Contact | ${SITE_NAME}`,
      description:
        "Contactez notre equipe pour remplacement, reparation ou choix de retroviseur exterieur gauche, droit, chauffant ou electrique.",
      keywords: BASE_KEYWORDS,
    },
    success: {
      title: `Demande envoyee | ${SITE_NAME}`,
      description:
        'Votre demande a bien ete envoyee. Notre equipe vous recontacte rapidement pour confirmer la compatibilite.',
      keywords: BASE_KEYWORDS,
    },
    category: {
      title: categorySeo[categorySlug]?.title || `${SITE_NAME} | Retroviseur exterieur`,
      description:
        categorySeo[categorySlug]?.description ||
        "Decouvrez notre selection de retroviseurs exterieurs par cote, fonctionnalite et usage.",
      keywords: [...BASE_KEYWORDS, categorySlug.replace(/-/g, ' ')].filter(Boolean),
    },
  };

  return map[view] || map.home;
}

function updateMetaTag(selector, attrName, attrValue) {
  const element = document.querySelector(selector);
  if (!element) return;
  element.setAttribute(attrName, attrValue);
}

export function applySeo(view, context = {}) {
  const seo = getSeoForView(view, context);
  const title = seo.title || SITE_NAME;
  const description = seo.description || DEFAULT_DESCRIPTION;
  const keywords = (seo.keywords || BASE_KEYWORDS).join(', ');
  const canonical = `${window.location.origin}${window.location.pathname}`;

  document.title = title;
  updateMetaTag('meta[name="description"]', 'content', description);
  updateMetaTag('meta[name="keywords"]', 'content', keywords);
  updateMetaTag('meta[property="og:title"]', 'content', title);
  updateMetaTag('meta[property="og:description"]', 'content', description);
  updateMetaTag('meta[property="og:url"]', 'content', canonical);
  updateMetaTag('meta[name="twitter:title"]', 'content', title);
  updateMetaTag('meta[name="twitter:description"]', 'content', description);
  updateMetaTag('link[rel="canonical"]', 'href', canonical);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: canonical,
    inLanguage: 'fr',
    description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${canonical}?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  let jsonLdElement = document.getElementById('seo-json-ld');
  if (!jsonLdElement) {
    jsonLdElement = document.createElement('script');
    jsonLdElement.id = 'seo-json-ld';
    jsonLdElement.type = 'application/ld+json';
    document.head.appendChild(jsonLdElement);
  }
  jsonLdElement.textContent = JSON.stringify(jsonLd);
}
