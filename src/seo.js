const SITE_NAME = 'Retroviseurs Exterieurs Premium';
const SITE_URL = 'https://car-rearview-mirror.vercel.app';
const SITE_IMAGE = `${SITE_URL}/seo-cover.png`;
const DEFAULT_DESCRIPTION =
  "Retroviseur exterieur gauche, droit, electrique, chauffant, rabattable et photochromatique. Trouvez le modele compatible par marque, modele et annee.";

const NON_INDEXABLE_VIEWS = new Set(['models', 'years', 'product', 'form', 'success']);

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

const CATEGORY_SEO = {
  'retroviseur-exterieur-gauche': {
    title: 'Retroviseur exterieur gauche (cote conducteur) | Retroviseurs Exterieurs Premium',
    description:
      'Trouvez un retroviseur exterieur gauche compatible: electrique, chauffant, rabattable. Selection par marque, modele et annee.',
    faq: {
      question: 'Pourquoi choisir un retroviseur exterieur gauche compatible ?',
      answer:
        'Un retroviseur cote conducteur bien compatible garantit un montage correct, moins de vibrations et une meilleure visibilite pour la securite.',
    },
  },
  'retroviseur-exterieur-droit': {
    title: 'Retroviseur exterieur droit (cote passager) | Retroviseurs Exterieurs Premium',
    description:
      'Achetez un retroviseur exterieur droit compatible: version manuelle ou electrique avec options premium.',
    faq: {
      question: 'Quand remplacer le retroviseur exterieur droit ?',
      answer:
        'Un remplacement est recommande en cas de casse, jeu mecanique ou probleme de reglage afin de conserver une bonne visibilite laterale.',
    },
  },
  'retroviseur-exterieur-chauffant': {
    title: 'Retroviseur exterieur chauffant / degivrant | Retroviseurs Exterieurs Premium',
    description:
      'Retroviseurs exterieurs chauffants pour une meilleure visibilite en hiver. Modeles gauche, droit et compatibles multi-marques.',
    faq: {
      question: 'Le retroviseur chauffant est-il vraiment utile ?',
      answer:
        'Oui, il aide a reduire la buee et le givre et ameliore la visibilite lors des conditions froides ou humides.',
    },
  },
  'retroviseur-exterieur-electrique': {
    title: 'Retroviseur exterieur electrique | Retroviseurs Exterieurs Premium',
    description:
      "Selection de retroviseurs exterieurs electriques pour plus de confort de reglage et une compatibilite precise.",
    faq: {
      question: 'Quel est l avantage d un retroviseur electrique ?',
      answer:
        'Le reglage electrique est plus rapide et plus confortable, surtout lors de changements de conducteur frequents.',
    },
  },
  'retroviseur-exterieur-rabattable-electriquement': {
    title: 'Retroviseur exterieur rabattable electriquement | Retroviseurs Exterieurs Premium',
    description:
      'Modeles rabattables electriquement pour le stationnement en ville et la protection des retroviseurs.',
    faq: {
      question: 'Pourquoi choisir un retroviseur rabattable electriquement ?',
      answer:
        'Il protege mieux le retroviseur lors du stationnement dans les espaces etroits et apporte un vrai confort d utilisation.',
    },
  },
};

function getSeoForView(view, context) {
  const brand = context?.brand?.name || '';
  const model = context?.model || '';
  const year = context?.year || '';
  const categorySlug = context?.categorySlug || '';
  const selectionLabel = [brand, model, year].filter(Boolean).join(' ');

  const map = {
    home: {
      title: `${SITE_NAME} | Gauche, Droit, Electrique, Chauffant`,
      description:
        "Retroviseurs exterieurs pour voiture: gauche, droit, electrique, chauffant, rabattable et universel. Selection rapide par marque, modele et annee.",
      keywords: BASE_KEYWORDS,
      indexable: true,
      pageType: 'WebPage',
    },
    models: {
      title: `Modeles ${brand || 'vehicule'} | ${SITE_NAME}`,
      description:
        `Choisissez le modele ${brand || 'de votre vehicule'} pour trouver un retroviseur exterieur compatible.`,
      keywords: [...BASE_KEYWORDS, `${brand} retroviseur exterieur`].filter(Boolean),
      indexable: false,
      pageType: 'WebPage',
    },
    years: {
      title: `Annees ${model || ''} | ${SITE_NAME}`.trim(),
      description:
        `Selectionnez l'annee de ${model || 'votre vehicule'} pour afficher les retroviseurs exterieurs compatibles.`,
      keywords: [...BASE_KEYWORDS, `${model} retroviseur exterieur`].filter(Boolean),
      indexable: false,
      pageType: 'WebPage',
    },
    product: {
      title: `${selectionLabel || 'Configuration retroviseur'} | ${SITE_NAME}`,
      description:
        `Configurez votre retroviseur exterieur ${selectionLabel}. Options: electrique, chauffant, rabattable et type de produit.`,
      keywords: [...BASE_KEYWORDS, `${selectionLabel} retroviseur exterieur`].filter(Boolean),
      indexable: false,
      pageType: 'WebPage',
    },
    form: {
      title: `Demande de devis | ${SITE_NAME}`,
      description:
        "Envoyez votre demande pour un retroviseur exterieur compatible. Reponse rapide et accompagnement personnalise.",
      keywords: BASE_KEYWORDS,
      indexable: false,
      pageType: 'WebPage',
    },
    about: {
      title: `A propos | ${SITE_NAME}`,
      description:
        "Decouvrez notre expertise en retroviseurs exterieurs: qualite premium, support et conseils de compatibilite.",
      keywords: BASE_KEYWORDS,
      indexable: true,
      pageType: 'AboutPage',
    },
    contact: {
      title: `Contact | ${SITE_NAME}`,
      description:
        "Contactez notre equipe pour remplacement, reparation ou choix de retroviseur exterieur gauche, droit, chauffant ou electrique.",
      keywords: BASE_KEYWORDS,
      indexable: true,
      pageType: 'ContactPage',
    },
    terms: {
      title: `Conditions Generales de Vente | ${SITE_NAME}`,
      description:
        "Consultez les conditions generales de vente: commandes, prix, livraison, retours, garanties et responsabilites.",
      keywords: [...BASE_KEYWORDS, 'conditions generales de vente', 'CGV retroviseur exterieur'],
      indexable: true,
      pageType: 'WebPage',
    },
    privacy: {
      title: `Politique de Confidentialite | ${SITE_NAME}`,
      description:
        "Consultez notre politique de confidentialite: donnees collectees, finalites, conservation et droits des utilisateurs.",
      keywords: [...BASE_KEYWORDS, 'politique de confidentialite', 'protection des donnees'],
      indexable: true,
      pageType: 'WebPage',
    },
    success: {
      title: `Demande envoyee | ${SITE_NAME}`,
      description:
        'Votre demande a bien ete envoyee. Notre equipe vous recontacte rapidement pour confirmer la compatibilite.',
      keywords: BASE_KEYWORDS,
      indexable: false,
      pageType: 'WebPage',
    },
    category: {
      title: CATEGORY_SEO[categorySlug]?.title || `${SITE_NAME} | Retroviseur exterieur`,
      description:
        CATEGORY_SEO[categorySlug]?.description ||
        "Decouvrez notre selection de retroviseurs exterieurs par cote, fonctionnalite et usage.",
      keywords: [...BASE_KEYWORDS, categorySlug.replace(/-/g, ' ')].filter(Boolean),
      indexable: true,
      pageType: 'CollectionPage',
      categorySlug,
      faq: CATEGORY_SEO[categorySlug]?.faq || null,
    },
  };

  const seo = map[view] || map.home;
  if (NON_INDEXABLE_VIEWS.has(view)) {
    seo.indexable = false;
  }
  return seo;
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
  const robots = seo.indexable ? 'index,follow,max-image-preview:large' : 'noindex,follow,max-image-preview:large';

  document.title = title;
  updateMetaTag('meta[name="description"]', 'content', description);
  updateMetaTag('meta[name="keywords"]', 'content', keywords);
  updateMetaTag('meta[name="robots"]', 'content', robots);
  updateMetaTag('meta[property="og:title"]', 'content', title);
  updateMetaTag('meta[property="og:description"]', 'content', description);
  updateMetaTag('meta[property="og:url"]', 'content', canonical);
  updateMetaTag('meta[property="og:image"]', 'content', SITE_IMAGE);
  updateMetaTag('meta[property="og:type"]', 'content', seo.pageType === 'CollectionPage' ? 'article' : 'website');
  updateMetaTag('meta[name="twitter:title"]', 'content', title);
  updateMetaTag('meta[name="twitter:description"]', 'content', description);
  updateMetaTag('meta[name="twitter:image"]', 'content', SITE_IMAGE);
  updateMetaTag('link[rel="canonical"]', 'href', canonical);

  const graph = [
    {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/seo-cover.png`,
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'support@carrearviewmirrors.com',
      },
    },
    {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: 'fr',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_URL}/?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': seo.pageType || 'WebPage',
      name: title,
      url: canonical,
      inLanguage: 'fr',
      description,
    },
  ];

  if (view === 'category' && seo.categorySlug) {
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Accueil',
          item: SITE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: title,
          item: canonical,
        },
      ],
    });

    if (seo.faq) {
      graph.push({
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: seo.faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: seo.faq.answer,
            },
          },
        ],
      });
    }
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': graph,
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
