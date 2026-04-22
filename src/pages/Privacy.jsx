import React from 'react';
import { useI18n } from '../i18n';

export default function Privacy() {
  const { t } = useI18n();
  return (
    <div className="legal-view">
      <div className="legal-shell">
        <h1>{t('privacy_title', 'Politique de Confidentialite')}</h1>
        <p className="legal-updated">{t('legal_updated', 'Derniere mise a jour : 4 mars 2026')}</p>

        <section>
          <h2>{t('privacy_1_title', '1. Donnees collectees')}</h2>
          <p>
            {t('privacy_1_text', 'Nous pouvons collecter les informations saisies via les formulaires, notamment nom, email, telephone, details vehicule et contenu des demandes.')}
          </p>
        </section>

        <section>
          <h2>{t('privacy_2_title', '2. Finalites du traitement')}</h2>
          <p>
            {t('privacy_2_text', 'Les donnees sont utilisees pour traiter les demandes, confirmer la compatibilite des produits, assurer le support client et ameliorer la qualite du service.')}
          </p>
        </section>

        <section>
          <h2>{t('privacy_3_title', '3. Base legale')}</h2>
          <p>
            {t('privacy_3_text', "Le traitement repose sur l'execution des demandes clients, l'interet legitime de support et, selon les cas, le consentement explicite.")}
          </p>
        </section>

        <section>
          <h2>{t('privacy_4_title', '4. Conservation')}</h2>
          <p>
            {t('privacy_4_text', 'Les donnees sont conservees pendant la duree necessaire aux finalites annoncees, puis archivees ou supprimees conformement aux obligations legales.')}
          </p>
        </section>

        <section>
          <h2>{t('privacy_5_title', '5. Partage des donnees')}</h2>
          <p>
            {t('privacy_5_text', "Les donnees ne sont partagees qu'avec les prestataires necessaires a l'execution du service (hebergement, logistique, support), dans le respect de la confidentialite.")}
          </p>
        </section>

        <section>
          <h2>{t('privacy_6_title', '6. Vos droits')}</h2>
          <p>
            {t('privacy_6_text', "Vous pouvez demander l'acces, la rectification, l'effacement ou la limitation de vos donnees, ainsi que vous opposer a certains traitements selon la loi applicable.")}
          </p>
        </section>

        <section>
          <h2>{t('privacy_7_title', '7. Cookies')}</h2>
          <p>
            {t('privacy_7_text', "Le site peut utiliser des cookies techniques et de mesure d'audience. Vous pouvez gerer vos preferences depuis les reglages de votre navigateur.")}
          </p>
        </section>

        <section>
          <h2>{t('privacy_8_title', '8. Contact confidentialite')}</h2>
          <p>
            {t('privacy_8_text', 'Pour exercer vos droits ou poser une question sur la protection des donnees, merci de passer par la page Contact du site.')}
          </p>
        </section>
      </div>
    </div>
  );
}
