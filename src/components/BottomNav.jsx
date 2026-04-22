import React from 'react';
import homeIcon from '../icons/home.png';
import whatsappIcon from '../icons/whatsapp.png';
import wechatIcon from '../icons/wechat.png';
import instagramIcon from '../icons/facebook-messenger.png';
import contactIcon from '../icons/contact.png';
import { useI18n } from '../i18n';

export default function BottomNav({ active, onHome, onWhatsApp, onWeChat, onInstagram, onContact, className = '' }) {
  const { t } = useI18n();
  return (
    <div className={`bottom-nav ${className}`.trim()}>
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
        aria-label={t('nav_whatsapp', 'WhatsApp')}
      >
        <img src={whatsappIcon} alt={t('nav_whatsapp', 'WhatsApp')} className="nav-icon" />
      </button>

      <button
        className={`nav-item ${active === 'wechat' ? 'active' : ''}`}
        onClick={onWeChat}
        aria-label={t('nav_wechat', 'WeChat')}
      >
        <img src={wechatIcon} alt={t('nav_wechat', 'WeChat')} className="nav-icon" />
      </button>

      <button
        className={`nav-item ${active === 'instagram' ? 'active' : ''}`}
        onClick={onInstagram}
        aria-label={t('nav_instagram', 'Instagram')}
      >
        <img src={instagramIcon} alt={t('nav_instagram', 'Instagram')} className="nav-icon" />
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
