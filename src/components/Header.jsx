import React, { useEffect, useState } from 'react';
import logo from '../logo/Test.svg';
import previousIcon from '../icons/previous.png';
import { useI18n } from '../i18n';

export default function Header({
  onMenuClick,
  showProductBack = false,
  onProductBack,
  productHeaderTitle = '',
  menuToggleSignal = 0,
  onMenuOpenChange,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useI18n();
  const isProductHeader = showProductBack;
  const headerTitle = productHeaderTitle || t('product_catalog_title', 'Liste des produits');

  const handleClick = (page) => {
    onMenuClick(page);
    setIsOpen(false);
  };

  const handleLinkClick = (event, page) => {
    event.preventDefault();
    handleClick(page);
  };

  useEffect(() => {
    if (!menuToggleSignal) return;
    setIsOpen((prev) => !prev);
  }, [menuToggleSignal]);

  useEffect(() => {
    if (typeof onMenuOpenChange === 'function') {
      onMenuOpenChange(isOpen);
    }
  }, [isOpen, onMenuOpenChange]);

  return (
    <header className={`header ${isProductHeader ? 'header-product' : ''}`}>
      <div className="header-inner">
        {/* Logo / Product Back */}
        <div className="header-logo">
          {showProductBack ? (
            <>
              <button
                type="button"
                className="product-back-icon-btn"
                onClick={onProductBack}
                aria-label={t('product_back_to_list', 'Retour a la liste des produits')}
                title={t('product_back_to_list', 'Retour a la liste des produits')}
              >
                <img src={previousIcon} alt="" aria-hidden="true" className="product-back-icon-img" />
              </button>
              <h1 className="header-product-title">{headerTitle}</h1>
            </>
          ) : (
            <img src={logo} alt="Logo" className="logo-img" />
          )}
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
          </div>
        </div>
      )}
    </header>
  );
}
