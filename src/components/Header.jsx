import React, { useState } from 'react';
import logo from '../logo/Test.png';

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
        <span className="logo-text">CarMirror</span>
      </div>

      {/* Desktop Navigation */}
      <nav className="header-nav">
        <button className="nav-link" onClick={() => handleClick('home')}>
          Home
        </button>
        <button className="nav-link" onClick={() => handleClick('about')}>
          About Us
        </button>
        <button className="nav-link" onClick={() => handleClick('contact')}>
          Contact
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="mobile-menu">
          <button className="mobile-menu-item" onClick={() => handleClick('home')}>
            Home
          </button>
          <button className="mobile-menu-item" onClick={() => handleClick('about')}>
            About Us
          </button>
          <button className="mobile-menu-item" onClick={() => handleClick('contact')}>
            Contact
          </button>
        </div>
      )}
    </header>
  );
}
