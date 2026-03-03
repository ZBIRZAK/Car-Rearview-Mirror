import React from 'react';
import homeIcon from '../icons/home.png';
import whatsappIcon from '../icons/whatsapp.png';
import contactIcon from '../icons/contact.png';

export default function BottomNav({ active, onHome, onWhatsApp, onContact }) {
  return (
    <div className="bottom-nav">
      <button
        className={`nav-item ${active === 'home' ? 'active' : ''}`}
        onClick={onHome}
        aria-label="Accueil"
      >
        <img src={homeIcon} alt="Accueil" className="nav-icon" />
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
        aria-label="Contact"
      >
        <img src={contactIcon} alt="Contact" className="nav-icon" />
      </button>
    </div>
  );
}
