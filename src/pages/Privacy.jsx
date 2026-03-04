import React from 'react';

export default function Privacy() {
  return (
    <div className="legal-view">
      <div className="legal-shell">
        <h1>Politique de Confidentialite</h1>
        <p className="legal-updated">Derniere mise a jour : 4 mars 2026</p>

        <section>
          <h2>1. Donnees collectees</h2>
          <p>
            Nous pouvons collecter les informations saisies via les formulaires, notamment
            nom, email, telephone, details vehicule et contenu des demandes.
          </p>
        </section>

        <section>
          <h2>2. Finalites du traitement</h2>
          <p>
            Les donnees sont utilisees pour traiter les demandes, confirmer la compatibilite
            des produits, assurer le support client et ameliorer la qualite du service.
          </p>
        </section>

        <section>
          <h2>3. Base legale</h2>
          <p>
            Le traitement repose sur l'execution des demandes clients, l'interet legitime de
            support et, selon les cas, le consentement explicite.
          </p>
        </section>

        <section>
          <h2>4. Conservation</h2>
          <p>
            Les donnees sont conservees pendant la duree necessaire aux finalites annoncees,
            puis archivees ou supprimees conformement aux obligations legales.
          </p>
        </section>

        <section>
          <h2>5. Partage des donnees</h2>
          <p>
            Les donnees ne sont partagees qu'avec les prestataires necessaires a l'execution
            du service (hebergement, logistique, support), dans le respect de la confidentialite.
          </p>
        </section>

        <section>
          <h2>6. Vos droits</h2>
          <p>
            Vous pouvez demander l'acces, la rectification, l'effacement ou la limitation
            de vos donnees, ainsi que vous opposer a certains traitements selon la loi applicable.
          </p>
        </section>

        <section>
          <h2>7. Cookies</h2>
          <p>
            Le site peut utiliser des cookies techniques et de mesure d'audience. Vous
            pouvez gerer vos preferences depuis les reglages de votre navigateur.
          </p>
        </section>

        <section>
          <h2>8. Contact confidentialite</h2>
          <p>
            Pour exercer vos droits ou poser une question sur la protection des donnees,
            merci de passer par la page Contact du site.
          </p>
        </section>
      </div>
    </div>
  );
}
