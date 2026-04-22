import React from 'react';
import { useI18n } from '../i18n';

export default function Contact() {
  const { t } = useI18n();
  return (
    <div className="contact-view contact-v2">
      <div className="contact-hero">
        <p className="contact-kicker">{t('contact_kicker', 'Support client')}</p>
        <h1>{t('contact_title', 'Contactez-nous')}</h1>
        <p>{t('contact_intro', 'Une question sur un retroviseur, la compatibilite ou la livraison ? Notre equipe vous repond rapidement.')}</p>
      </div>

      <div className="contact-v2-layout">
        <aside className="contact-v2-side">
          <section className="contact-panel">
            <h3>{t('contact_channels_title', 'Canaux de contact')}</h3>
            <p className="contact-panel-intro">{t('contact_channels_intro', 'Choisissez le canal le plus pratique selon votre besoin.')}</p>
            <div className="contact-quick-grid">
              <a className="contact-quick-card" href="mailto:support@carrearviewmirrors.com">
                <span className="contact-line-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M3 7h18v10H3z" /><path d="m3 8 9 7 9-7" /></svg>
                </span>
                <div>
                  <h4>{t('contact_email', 'E-mail')}</h4>
                  <p>support@carrearviewmirrors.com</p>
                </div>
              </a>

              <a className="contact-quick-card" href="tel:+15551234567">
                <span className="contact-line-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M6 3h4l2 5-2.5 1.5a16 16 0 0 0 5 5L16 12l5 2v4a2 2 0 0 1-2 2h-1C10.8 20 4 13.2 4 5V4a1 1 0 0 1 1-1z" /></svg>
                </span>
                <div>
                  <h4>{t('contact_phone', 'Telephone')}</h4>
                  <p>+1 (555) 123-4567</p>
                </div>
              </a>

              <a className="contact-quick-card" href="https://wa.me/15559876543" target="_blank" rel="noreferrer">
                <span className="contact-line-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.8-1.2A9 9 0 1 0 12 3z" /><path d="M8.5 9.5c.7 2.2 2.8 4.2 5 5" /></svg>
                </span>
                <div>
                  <h4>WhatsApp</h4>
                  <p>{t('contact_quick_reply', 'Reponse rapide')}</p>
                </div>
              </a>

              <div className="contact-quick-card">
                <span className="contact-line-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M12 21s-7-5.2-7-11a7 7 0 1 1 14 0c0 5.8-7 11-7 11z" /><path d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" /></svg>
                </span>
                <div>
                  <h4>{t('contact_address', 'Adresse')}</h4>
                  <p>123 Auto Parts Street, Detroit, MI 48201</p>
                </div>
              </div>
            </div>
          </section>

          <section className="contact-panel">
            <h3>{t('contact_hours_title', 'Horaires')}</h3>
            <div className="contact-hours-list">
              <div className="contact-hours-row">
                <span>{t('contact_hours_weekdays', 'Lundi - Vendredi')}</span>
                <strong>9h00 - 18h00 EST</strong>
              </div>
              <div className="contact-hours-row">
                <span>{t('contact_hours_sat', 'Samedi')}</span>
                <strong>10h00 - 16h00 EST</strong>
              </div>
              <div className="contact-hours-row">
                <span>{t('contact_hours_sun', 'Dimanche')}</span>
                <strong>{t('contact_closed', 'Ferme')}</strong>
              </div>
            </div>
          </section>
        </aside>

        <main className="contact-v2-main">
          <section className="contact-panel">
            <h3>{t('contact_send_title', 'Envoyer un message')}</h3>
            <p className="contact-panel-intro">{t('contact_send_intro', 'Renseignez vos informations, nous revenons vers vous sous 24h.')}</p>
            <form className="contact-form-v2">
              <label>
                {t('form_full_name', 'Nom complet')}
                <input type="text" placeholder={t('contact_ph_name', 'Ex: Zakaria Z.')} />
              </label>
              <label>
                {t('contact_email', 'E-mail')}
                <input type="email" placeholder={t('contact_ph_email', 'vous@email.com')} />
              </label>
              <label>
                {t('contact_phone', 'Telephone')}
                <input type="tel" placeholder={t('contact_ph_phone', '+1 (555) 000-0000')} />
              </label>
              <label className="full">
                {t('contact_subject', 'Sujet')}
                <input type="text" placeholder={t('contact_ph_subject', 'Compatibilite, livraison, devis...')} />
              </label>
              <label className="full">
                {t('form_message', 'Message (optionnel)')}
                <textarea rows="5" placeholder={t('contact_ph_message', 'Decrivez votre besoin, modele et annee du vehicule...')}></textarea>
              </label>
              <button type="button" className="contact-submit">{t('send_request', 'Envoyer la demande')}</button>
            </form>
          </section>

          <section className="contact-panel">
            <h3>{t('contact_faq_title', 'Questions frequentes')}</h3>
            <div className="contact-faq-list">
              <details>
                <summary>{t('contact_faq_q1', 'Combien de temps prend la livraison ?')}</summary>
                <p>{t('contact_faq_a1', 'La livraison standard prend 3 a 5 jours ouvrables. Une option express est disponible en 1 a 2 jours.')}</p>
              </details>
              <details>
                <summary>{t('contact_faq_q2', 'Proposez-vous la livraison internationale ?')}</summary>
                <p>{t('contact_faq_a2', "Oui, nous livrons a l'international. Les frais varient selon le pays et le transporteur.")}</p>
              </details>
              <details>
                <summary>{t('contact_faq_q3', 'Quelle est votre politique de retour ?')}</summary>
                <p>{t('contact_faq_a3', "Les retours sont acceptes sous 30 jours pour les produits non utilises, dans leur emballage d'origine.")}</p>
              </details>
            </div>
          </section>
        </main>
      </div>

    </div>
  );
}
