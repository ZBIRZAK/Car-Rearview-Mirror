import React from 'react';
import { useI18n } from '../i18n';

export default function Terms() {
  const { t } = useI18n();
  return (
    <div className="legal-view">
      <div className="legal-shell">
        <h1>{t('terms_title', 'Conditions Generales de Vente (CGV)')}</h1>
        <p className="legal-updated">{t('legal_updated', 'Derniere mise a jour : 4 mars 2026')}</p>

        <section>
          <h2>{t('terms_1_title', '1. Objet')}</h2>
          <p>
            {t('terms_1_text', 'Les presentes conditions regissent les ventes de retroviseurs exterieurs, accessoires et pieces associees proposees sur ce site.')}
          </p>
        </section>

        <section>
          <h2>{t('terms_2_title', '2. Produits et compatibilite')}</h2>
          <p>
            {t('terms_2_text', 'Les informations de compatibilite sont fournies a titre indicatif. Le client doit verifier la correspondance marque, modele, annee et options du vehicule avant validation de la commande.')}
          </p>
        </section>

        <section>
          <h2>{t('terms_3_title', '3. Prix et paiement')}</h2>
          <p>
            {t('terms_3_text', 'Les prix affiches sont exprimes dans la devise indiquee sur le site. Les frais eventuels de livraison, taxes ou services complementaires sont precises avant la confirmation finale.')}
          </p>
        </section>

        <section>
          <h2>{t('terms_4_title', '4. Livraison')}</h2>
          <p>
            {t('terms_4_text', 'Les delais de livraison sont communiques a titre estimatif. Un retard de transport ne peut donner lieu a annulation automatique sauf dispositions legales contraires.')}
          </p>
        </section>

        <section>
          <h2>{t('terms_5_title', '5. Retours et remboursement')}</h2>
          <p>
            {t('terms_5_text', 'Les retours sont acceptes selon la politique en vigueur, pour les produits non utilises et en bon etat. Les frais de retour peuvent rester a la charge du client sauf erreur imputable au vendeur.')}
          </p>
        </section>

        <section>
          <h2>{t('terms_6_title', '6. Garantie et responsabilite')}</h2>
          <p>
            {t('terms_6_text', 'La garantie legale de conformite et les garanties applicables sont maintenues. La responsabilite du vendeur ne saurait etre engagee en cas de mauvais montage, usage non conforme ou incompatibilite non signalee.')}
          </p>
        </section>

        <section>
          <h2>{t('terms_7_title', '7. Service client')}</h2>
          <p>
            {t('terms_7_text', "Pour toute question, vous pouvez contacter le support via la page Contact ou l'adresse email affichee sur le site.")}
          </p>
        </section>

        <section>
          <h2>{t('terms_8_title', '8. Droit applicable')}</h2>
          <p>
            {t('terms_8_text', "Les presentes CGV sont soumises au droit applicable du pays d'exploitation du service, sous reserve des dispositions imperatives de protection du consommateur.")}
          </p>
        </section>
      </div>
    </div>
  );
}
