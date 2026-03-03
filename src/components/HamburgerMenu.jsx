import React, { useState } from 'react';

export default function HamburgerMenu({ onMenuClick }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (page) => {
    onMenuClick(page);
    setIsOpen(false);
  };

  return (
    <div className="hamburger-menu">
      <button 
        className={`hamburger-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {(isOpen || window.innerWidth > 768) && (
        <div className="hamburger-dropdown">
          <button className="menu-item" onClick={() => handleClick('home')}>
            Accueil
          </button>
          <button className="menu-item" onClick={() => handleClick('about')}>
            A propos
          </button>
          <button className="menu-item" onClick={() => handleClick('contact')}>
            Contact
          </button>
        </div>
      )}
    </div>
  );
}
