import React from 'react';
import homeIcon from '../icons/home.png';
import whatsappIcon from '../icons/whatsapp.png';
import contactIcon from '../icons/contact.png';
import { useI18n } from '../i18n';

export default function BottomNav({ active, onHome, onWhatsApp, onContact }) {
  const { t } = useI18n();
  return (
    <div className="bottom-nav">
      <button
        className={`nav-item ${active === 'home' ? 'active' : ''}`}
        onClick={onHome}
        aria-label={t('nav_home', 'Accueil')}
      >
        <img src={homeIcon} alt={t('nav_home', 'Accueil')} className="nav-icon" />
      </button>

      <button
        className={`nav-item ${active === 'whatsapp' ? 'active' : ''}`}
        onClick={onWhatsApp}
        aria-label="WhatsApp"
      >
        <img src={whatsappIcon} alt="WhatsApp" className="nav-icon" />
      </button>

      <button
        className={`nav-item ${active === 'contact' ? 'active' : ''}`}
        onClick={onContact}
        aria-label={t('nav_contact', 'Contact')}
      >
        <img src={contactIcon} alt={t('nav_contact', 'Contact')} className="nav-icon" />
      </button>
    </div>
  );
}
