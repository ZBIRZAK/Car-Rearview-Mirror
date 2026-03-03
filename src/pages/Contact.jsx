import React from 'react';

export default function Contact() {
  return (
    <div className="contact-view">
      <div className="view-header">
        <h2>Contactez-nous</h2>
        <p>Prenez contact avec notre equipe</p>
      </div>
      <div className="contact-content">
        <div className="contact-section">
          <h3>📧 Nous contacter</h3>
          <p>Nous serons ravis d'echanger avec vous. Choisissez l'un des canaux ci-dessous :</p>
        </div>

        <div className="contact-methods">
          <div className="contact-card">
            <div className="contact-icon">📧</div>
            <h4>E-mail</h4>
            <p>info@carrearviewmirrors.com</p>
            <p>support@carrearviewmirrors.com</p>
          </div>

          <div className="contact-card">
            <div className="contact-icon">📱</div>
            <h4>Telephone</h4>
            <p>+1 (555) 123-4567</p>
            <p className="small">Lun-Ven : 9h00 - 18h00 EST</p>
          </div>

          <div className="contact-card">
            <div className="contact-icon">💬</div>
            <h4>WhatsApp</h4>
            <p>+1 (555) 987-6543</p>
            <p className="small">Reponse rapide 24/7</p>
          </div>

          <div className="contact-card">
            <div className="contact-icon">📍</div>
            <h4>Adresse</h4>
            <p>123 Auto Parts Street</p>
            <p>Detroit, MI 48201</p>
          </div>
        </div>

        <div className="business-hours">
          <h3>🕐 Horaires d'ouverture</h3>
          <div className="hours-list">
            <div className="hour-item">
              <span>Lundi - Vendredi</span>
              <span>9h00 - 18h00 EST</span>
            </div>
            <div className="hour-item">
              <span>Samedi</span>
              <span>10h00 - 16h00 EST</span>
            </div>
            <div className="hour-item">
              <span>Dimanche</span>
              <span>Ferme</span>
            </div>
          </div>
        </div>

        <div className="faq-section">
          <h3>❓ Questions frequentes</h3>
          <div className="faq-item">
            <h4>Combien de temps prend la livraison ?</h4>
            <p>La livraison standard prend 3 a 5 jours ouvrables. La livraison express est possible en 1 a 2 jours.</p>
          </div>
          <div className="faq-item">
            <h4>Proposez-vous la livraison internationale ?</h4>
            <p>Oui, nous livrons a l'international avec des frais de livraison et de douane supplementaires.</p>
          </div>
          <div className="faq-item">
            <h4>Quelle est votre politique de retour ?</h4>
            <p>Nous acceptons les retours sous 30 jours pour les produits non utilises dans leur emballage d'origine.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
