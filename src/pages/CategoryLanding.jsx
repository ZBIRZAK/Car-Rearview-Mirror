import React from 'react';
import { useI18n } from '../i18n';

export const categoryContentMap = {
  'retroviseur-exterieur-gauche': {
    h1: 'Retroviseur exterieur gauche (cote conducteur)',
    intro:
      "Selectionnez un retroviseur exterieur gauche compatible avec votre marque, modele et annee. Ideal pour remplacement rapide cote conducteur.",
    benefits: [
      'Compatibilite precise par marque et modele',
      'Versions manuelles et electriques disponibles',
      'Options chauffantes et rabattables selon le vehicule',
    ],
    faqTitle: 'Pourquoi choisir un retroviseur gauche compatible ?',
    faqText:
      "Un retroviseur cote conducteur mal adapte peut reduire la visibilite et generer des vibrations. Un modele compatible garantit un montage correct et une meilleure securite.",
  },
  'retroviseur-exterieur-droit': {
    h1: 'Retroviseur exterieur droit (cote passager)',
    intro:
      "Trouvez rapidement le retroviseur exterieur droit adapte a votre vehicule, avec options electriques, chauffantes et clignotant integre.",
    benefits: [
      'Recherche simplifiee par marque, modele et annee',
      'Large choix de coques et glaces cote passager',
      'Qualite premium pour un usage quotidien',
    ],
    faqTitle: 'Quand remplacer le retroviseur droit ?',
    faqText:
      "En cas de casse, de jeu mecanique ou de defaut de reglage, un remplacement rapide du retroviseur droit ameliore la visibilite laterale et limite les angles morts.",
  },
  'retroviseur-exterieur-chauffant': {
    h1: 'Retroviseur exterieur chauffant / degivrant',
    intro:
      "Ameliorez votre securite en hiver avec un retroviseur exterieur chauffant. Le degivrage rapide aide a conserver une bonne visibilite par temps froid.",
    benefits: [
      "Vision plus claire en hiver et par temps humide",
      "Options disponibles en gauche, droit ou paire",
      "Compatible avec de nombreux modeles de vehicules",
    ],
    faqTitle: 'Le retroviseur chauffant est-il utile ?',
    faqText:
      "Oui, il limite la buee et le givre sur la glace du retroviseur, ce qui rend la conduite plus sure en conditions meteorologiques difficiles.",
  },
  'retroviseur-exterieur-electrique': {
    h1: 'Retroviseur exterieur electrique',
    intro:
      "Choisissez un retroviseur exterieur electrique pour un reglage precis et pratique depuis l'habitacle.",
    benefits: [
      "Confort de reglage sans manipulation manuelle",
      'Choix selon position gauche ou droite',
      'Versions rabattables electriquement disponibles',
    ],
    faqTitle: 'Pourquoi passer a un retroviseur electrique ?',
    faqText:
      "Le reglage electrique apporte un vrai confort d'utilisation et permet un ajustement rapide de la position du retroviseur selon le conducteur.",
  },
  'retroviseur-exterieur-rabattable-electriquement': {
    h1: 'Retroviseur exterieur rabattable electriquement',
    intro:
      "Le retroviseur rabattable electriquement est ideal pour le stationnement en ville et la protection des coques.",
    benefits: [
      'Protection accrue en stationnement',
      "Rabattement pratique a l'ouverture/fermeture du vehicule",
      'Disponible selon equipements et finitions',
    ],
    faqTitle: 'Quel avantage en ville ?',
    faqText:
      "Le rabattement electrique reduit le risque de choc dans les rues et parkings et facilite le quotidien dans les zones etroites.",
  },
};

export default function CategoryLanding({ slug, onStartSelection }) {
  const { t } = useI18n();
  const translatedMap = {
    'retroviseur-exterieur-gauche': {
      h1: t('cat_left_h1', categoryContentMap['retroviseur-exterieur-gauche'].h1),
      intro: t('cat_left_intro', categoryContentMap['retroviseur-exterieur-gauche'].intro),
      benefits: [
        t('cat_left_b1', categoryContentMap['retroviseur-exterieur-gauche'].benefits[0]),
        t('cat_left_b2', categoryContentMap['retroviseur-exterieur-gauche'].benefits[1]),
        t('cat_left_b3', categoryContentMap['retroviseur-exterieur-gauche'].benefits[2]),
      ],
      faqTitle: t('cat_left_faq_title', categoryContentMap['retroviseur-exterieur-gauche'].faqTitle),
      faqText: t('cat_left_faq_text', categoryContentMap['retroviseur-exterieur-gauche'].faqText),
    },
    'retroviseur-exterieur-droit': {
      h1: t('cat_right_h1', categoryContentMap['retroviseur-exterieur-droit'].h1),
      intro: t('cat_right_intro', categoryContentMap['retroviseur-exterieur-droit'].intro),
      benefits: [
        t('cat_right_b1', categoryContentMap['retroviseur-exterieur-droit'].benefits[0]),
        t('cat_right_b2', categoryContentMap['retroviseur-exterieur-droit'].benefits[1]),
        t('cat_right_b3', categoryContentMap['retroviseur-exterieur-droit'].benefits[2]),
      ],
      faqTitle: t('cat_right_faq_title', categoryContentMap['retroviseur-exterieur-droit'].faqTitle),
      faqText: t('cat_right_faq_text', categoryContentMap['retroviseur-exterieur-droit'].faqText),
    },
    'retroviseur-exterieur-chauffant': {
      h1: t('cat_heat_h1', categoryContentMap['retroviseur-exterieur-chauffant'].h1),
      intro: t('cat_heat_intro', categoryContentMap['retroviseur-exterieur-chauffant'].intro),
      benefits: [
        t('cat_heat_b1', categoryContentMap['retroviseur-exterieur-chauffant'].benefits[0]),
        t('cat_heat_b2', categoryContentMap['retroviseur-exterieur-chauffant'].benefits[1]),
        t('cat_heat_b3', categoryContentMap['retroviseur-exterieur-chauffant'].benefits[2]),
      ],
      faqTitle: t('cat_heat_faq_title', categoryContentMap['retroviseur-exterieur-chauffant'].faqTitle),
      faqText: t('cat_heat_faq_text', categoryContentMap['retroviseur-exterieur-chauffant'].faqText),
    },
    'retroviseur-exterieur-electrique': {
      h1: t('cat_elec_h1', categoryContentMap['retroviseur-exterieur-electrique'].h1),
      intro: t('cat_elec_intro', categoryContentMap['retroviseur-exterieur-electrique'].intro),
      benefits: [
        t('cat_elec_b1', categoryContentMap['retroviseur-exterieur-electrique'].benefits[0]),
        t('cat_elec_b2', categoryContentMap['retroviseur-exterieur-electrique'].benefits[1]),
        t('cat_elec_b3', categoryContentMap['retroviseur-exterieur-electrique'].benefits[2]),
      ],
      faqTitle: t('cat_elec_faq_title', categoryContentMap['retroviseur-exterieur-electrique'].faqTitle),
      faqText: t('cat_elec_faq_text', categoryContentMap['retroviseur-exterieur-electrique'].faqText),
    },
    'retroviseur-exterieur-rabattable-electriquement': {
      h1: t('cat_fold_h1', categoryContentMap['retroviseur-exterieur-rabattable-electriquement'].h1),
      intro: t('cat_fold_intro', categoryContentMap['retroviseur-exterieur-rabattable-electriquement'].intro),
      benefits: [
        t('cat_fold_b1', categoryContentMap['retroviseur-exterieur-rabattable-electriquement'].benefits[0]),
        t('cat_fold_b2', categoryContentMap['retroviseur-exterieur-rabattable-electriquement'].benefits[1]),
        t('cat_fold_b3', categoryContentMap['retroviseur-exterieur-rabattable-electriquement'].benefits[2]),
      ],
      faqTitle: t('cat_fold_faq_title', categoryContentMap['retroviseur-exterieur-rabattable-electriquement'].faqTitle),
      faqText: t('cat_fold_faq_text', categoryContentMap['retroviseur-exterieur-rabattable-electriquement'].faqText),
    },
  };
  const data = translatedMap[slug];
  if (!data) return null;
  const relatedSlugs = Object.keys(translatedMap).filter((item) => item !== slug);

  return (
    <div className="category-view">
      <div className="category-shell">
        <h1>{data.h1}</h1>
        <p className="category-intro">{data.intro}</p>

        <div className="category-block">
          <h2>{t('category_points', 'Points cles')}</h2>
          <ul>
            {data.benefits.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="category-block">
          <h2>{data.faqTitle}</h2>
          <p>{data.faqText}</p>
        </div>

        <div className="category-block">
          <h2>{t('category_related', 'Categories associees')}</h2>
          <ul>
            {relatedSlugs.map((relatedSlug) => (
              <li key={relatedSlug}>
                <a href={`/${relatedSlug}`}>{translatedMap[relatedSlug].h1}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="category-actions">
          <button type="button" className="cta-button" onClick={onStartSelection}>
            {t('home_cta', 'Choisir ma marque')}
          </button>
        </div>
      </div>
    </div>
  );
}
