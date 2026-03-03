import React, { useState } from 'react';
import logo from '../logo/Test.svg';

export default function Header({ onMenuClick }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (page) => {
    onMenuClick(page);
    setIsOpen(false);
  };

  return (
    <header className="header">
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
        <button className="nav-link" onClick={() => handleClick('home')}>
          Accueil
        </button>
        <button className="nav-link" onClick={() => handleClick('about')}>
          A propos
        </button>
        <button className="nav-link" onClick={() => handleClick('contact')}>
          Contact
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen ? <button className="mobile-menu-backdrop" aria-label="Fermer le menu" onClick={() => setIsOpen(false)} /> : null}
      {isOpen && (
        <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu mobile">
          <div className="mobile-menu-header">
            <p className="mobile-menu-title">Navigation</p>
            <p className="mobile-menu-subtitle">Accedez rapidement aux pages principales</p>
          </div>
          <div className="mobile-menu-actions">
            <button className="mobile-menu-item" onClick={() => handleClick('home')}>
              <span className="mobile-menu-item-label">Accueil</span>
              <span className="mobile-menu-item-hint">Retour a la selection</span>
            </button>
            <button className="mobile-menu-item" onClick={() => handleClick('about')}>
              <span className="mobile-menu-item-label">A propos</span>
              <span className="mobile-menu-item-hint">Notre histoire et nos valeurs</span>
            </button>
            <button className="mobile-menu-item" onClick={() => handleClick('contact')}>
              <span className="mobile-menu-item-label">Contact</span>
              <span className="mobile-menu-item-hint">Canaux de support et formulaire</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
