import React, { useState } from 'react';
import logo from '../logo/Test.svg';

export default function Header({ onMenuClick }) {
  const [isOpen, setIsOpen] = useState(false);

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
            Accueil
          </a>
          <a href="/a-propos" className="nav-link" onClick={(event) => handleLinkClick(event, 'about')}>
            A propos
          </a>
          <a href="/contact" className="nav-link" onClick={(event) => handleLinkClick(event, 'contact')}>
            Contact
          </a>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isOpen ? <button className="mobile-menu-backdrop" aria-label="Fermer le menu" onClick={() => setIsOpen(false)} /> : null}
      {isOpen && (
        <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu mobile">
          <div className="mobile-menu-header">
            <p className="mobile-menu-title">Navigation</p>
            <p className="mobile-menu-subtitle">Accedez rapidement aux pages principales</p>
          </div>
          <div className="mobile-menu-actions">
            <a href="/" className="mobile-menu-item" onClick={(event) => handleLinkClick(event, 'home')}>
              <span className="mobile-menu-item-label">Accueil</span>
              <span className="mobile-menu-item-hint">Retour a la selection</span>
            </a>
            <a href="/a-propos" className="mobile-menu-item" onClick={(event) => handleLinkClick(event, 'about')}>
              <span className="mobile-menu-item-label">A propos</span>
              <span className="mobile-menu-item-hint">Notre histoire et nos valeurs</span>
            </a>
            <a href="/contact" className="mobile-menu-item" onClick={(event) => handleLinkClick(event, 'contact')}>
              <span className="mobile-menu-item-label">Contact</span>
              <span className="mobile-menu-item-hint">Canaux de support et formulaire</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
