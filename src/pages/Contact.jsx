import React from 'react';

export default function Contact() {
  return (
    <div className="contact-view contact-v2">
      <div className="contact-hero">
        <p className="contact-kicker">Support client</p>
        <h1>Contactez-nous</h1>
        <p>Une question sur un retroviseur, la compatibilite ou la livraison ? Notre equipe vous repond rapidement.</p>
      </div>

      <div className="contact-v2-layout">
        <aside className="contact-v2-side">
          <section className="contact-panel">
            <h3>Canaux de contact</h3>
            <p className="contact-panel-intro">Choisissez le canal le plus pratique selon votre besoin.</p>
            <div className="contact-quick-grid">
              <a className="contact-quick-card" href="mailto:support@carrearviewmirrors.com">
                <span className="contact-line-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M3 7h18v10H3z" /><path d="m3 8 9 7 9-7" /></svg>
                </span>
                <div>
                  <h4>E-mail</h4>
                  <p>support@carrearviewmirrors.com</p>
                </div>
              </a>

              <a className="contact-quick-card" href="tel:+15551234567">
                <span className="contact-line-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M6 3h4l2 5-2.5 1.5a16 16 0 0 0 5 5L16 12l5 2v4a2 2 0 0 1-2 2h-1C10.8 20 4 13.2 4 5V4a1 1 0 0 1 1-1z" /></svg>
                </span>
                <div>
                  <h4>Telephone</h4>
                  <p>+1 (555) 123-4567</p>
                </div>
              </a>

              <a className="contact-quick-card" href="https://wa.me/15559876543" target="_blank" rel="noreferrer">
                <span className="contact-line-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.8-1.2A9 9 0 1 0 12 3z" /><path d="M8.5 9.5c.7 2.2 2.8 4.2 5 5" /></svg>
                </span>
                <div>
                  <h4>WhatsApp</h4>
                  <p>Reponse rapide</p>
                </div>
              </a>
            </div>
          </section>

          <section className="contact-panel">
            <h3>Horaires</h3>
            <div className="contact-hours-list">
              <div className="contact-hours-row">
                <span>Lundi - Vendredi</span>
                <strong>9h00 - 18h00 EST</strong>
              </div>
              <div className="contact-hours-row">
                <span>Samedi</span>
                <strong>10h00 - 16h00 EST</strong>
              </div>
              <div className="contact-hours-row">
                <span>Dimanche</span>
                <strong>Ferme</strong>
              </div>
            </div>
          </section>
        </aside>

        <main className="contact-v2-main">
          <section className="contact-panel">
            <h3>Envoyer un message</h3>
            <p className="contact-panel-intro">Renseignez vos informations, nous revenons vers vous sous 24h.</p>
            <form className="contact-form-v2">
              <label>
                Nom complet
                <input type="text" placeholder="Ex: Zakaria Z." />
              </label>
              <label>
                E-mail
                <input type="email" placeholder="vous@email.com" />
              </label>
              <label>
                Telephone
                <input type="tel" placeholder="+1 (555) 000-0000" />
              </label>
              <label className="full">
                Sujet
                <input type="text" placeholder="Compatibilite, livraison, devis..." />
              </label>
              <label className="full">
                Message
                <textarea rows="5" placeholder="Decrivez votre besoin, modele et annee du vehicule..."></textarea>
              </label>
              <button type="button" className="contact-submit">Envoyer la demande</button>
            </form>
          </section>

          <section className="contact-panel">
            <h3>Questions frequentes</h3>
            <div className="contact-faq-list">
              <details>
                <summary>Combien de temps prend la livraison ?</summary>
                <p>La livraison standard prend 3 a 5 jours ouvrables. Une option express est disponible en 1 a 2 jours.</p>
              </details>
              <details>
                <summary>Proposez-vous la livraison internationale ?</summary>
                <p>Oui, nous livrons a l'international. Les frais varient selon le pays et le transporteur.</p>
              </details>
              <details>
                <summary>Quelle est votre politique de retour ?</summary>
                <p>Les retours sont acceptes sous 30 jours pour les produits non utilises, dans leur emballage d'origine.</p>
              </details>
            </div>
          </section>
        </main>
      </div>

      <div className="contact-address">
        <span className="contact-address-label">Adresse</span>
        <p>123 Auto Parts Street, Detroit, MI 48201</p>
        <p className="contact-address-note">Disponible uniquement pour retraits planifies.</p>
      </div>
    </div>
  );
}
