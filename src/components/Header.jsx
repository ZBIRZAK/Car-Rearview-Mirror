import React, { useState } from 'react';
import logo from '../logo/Test.svg';
import { useI18n } from '../i18n';

export default function Header({ onMenuClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useI18n();

  const handleClick = (page) => {
    onMenuClick(page);
    setIsOpen(false);
  };

  const handleLinkClick = (event, page) => {
    event.preventDefault();
    handleClick(page);
  };

  return (
    <header className="header">
      <div className="header-inner">
        {/* Mobile Hamburger */}
        <button
          className={`hamburger-toggle ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Logo */}
        <div className="header-logo">
          <img src={logo} alt="Logo" className="logo-img" />
        </div>

        {/* Desktop Navigation */}
        <nav className="header-nav">
          <a href="/" className="nav-link" onClick={(event) => handleLinkClick(event, 'home')}>
            {t('nav_home', 'Accueil')}
          </a>
          <a href="/a-propos" className="nav-link" onClick={(event) => handleLinkClick(event, 'about')}>
            {t('nav_about', 'A propos')}
          </a>
          <a href="/contact" className="nav-link" onClick={(event) => handleLinkClick(event, 'contact')}>
            {t('nav_contact', 'Contact')}
          </a>
          <a href="/dashboard" className="nav-link" onClick={(event) => handleLinkClick(event, 'dashboard')}>
            {t('nav_dashboard', 'Dashboard')}
          </a>
          <a href="/conditions-generales-de-vente" className="nav-link" onClick={(event) => handleLinkClick(event, 'terms')}>
            {t('nav_terms', 'CGV')}
          </a>
          <a href="/politique-de-confidentialite" className="nav-link" onClick={(event) => handleLinkClick(event, 'privacy')}>
            {t('nav_privacy', 'Confidentialite')}
          </a>
          <div className="lang-switch" aria-label={t('lang_switch', 'Langue')}>
            <button
              type="button"
              className={`lang-btn ${language === 'fr' ? 'active' : ''}`}
              onClick={() => setLanguage('fr')}
            >
              {t('lang_fr', 'FR')}
            </button>
            <button
              type="button"
              className={`lang-btn ${language === 'ar' ? 'active' : ''}`}
              onClick={() => setLanguage('ar')}
            >
              {t('lang_ar', 'AR')}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isOpen ? <button className="mobile-menu-backdrop" aria-label="Fermer le menu" onClick={() => setIsOpen(false)} /> : null}
      {isOpen && (
        <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu mobile">
          <div className="mobile-menu-header">
            <p className="mobile-menu-title">{t('nav_mobile_title', 'Navigation')}</p>
            <p className="mobile-menu-subtitle">{t('nav_mobile_subtitle', 'Accedez rapidement aux pages principales')}</p>
          </div>
          <div className="lang-switch mobile">
            <button
              type="button"
              className={`lang-btn ${language === 'fr' ? 'active' : ''}`}
              onClick={() => setLanguage('fr')}
            >
              {t('lang_fr', 'FR')}
            </button>
            <button
              type="button"
              className={`lang-btn ${language === 'ar' ? 'active' : ''}`}
              onClick={() => setLanguage('ar')}
            >
              {t('lang_ar', 'AR')}
            </button>
          </div>
          <div className="mobile-menu-actions">
            <a href="/" className="mobile-menu-item" onClick={(event) => handleLinkClick(event, 'home')}>
              <span className="mobile-menu-item-label">{t('nav_home', 'Accueil')}</span>
              <span className="mobile-menu-item-hint">{t('nav_home', 'Accueil')}</span>
            </a>
            <a href="/a-propos" className="mobile-menu-item" onClick={(event) => handleLinkClick(event, 'about')}>
              <span className="mobile-menu-item-label">{t('nav_about', 'A propos')}</span>
              <span className="mobile-menu-item-hint">{t('nav_about', 'A propos')}</span>
            </a>
            <a href="/contact" className="mobile-menu-item" onClick={(event) => handleLinkClick(event, 'contact')}>
              <span className="mobile-menu-item-label">{t('nav_contact', 'Contact')}</span>
              <span className="mobile-menu-item-hint">{t('nav_contact', 'Contact')}</span>
            </a>
            <a href="/dashboard" className="mobile-menu-item" onClick={(event) => handleLinkClick(event, 'dashboard')}>
              <span className="mobile-menu-item-label">{t('nav_dashboard', 'Dashboard')}</span>
              <span className="mobile-menu-item-hint">{t('nav_dashboard', 'Dashboard')}</span>
            </a>
            <a href="/conditions-generales-de-vente" className="mobile-menu-item" onClick={(event) => handleLinkClick(event, 'terms')}>
              <span className="mobile-menu-item-label">{t('nav_terms', 'CGV')}</span>
              <span className="mobile-menu-item-hint">{t('nav_terms', 'CGV')}</span>
            </a>
            <a href="/politique-de-confidentialite" className="mobile-menu-item" onClick={(event) => handleLinkClick(event, 'privacy')}>
              <span className="mobile-menu-item-label">{t('nav_privacy', 'Confidentialite')}</span>
              <span className="mobile-menu-item-hint">{t('nav_privacy', 'Confidentialite')}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
