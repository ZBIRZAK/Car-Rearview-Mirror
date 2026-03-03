import React from 'react';

export default function BottomNav({ active, onHome, onWhatsApp, onContact }) {
  return (
    <div className="bottom-nav">
      <button
        className={`nav-item ${active === 'home' ? 'active' : ''}`}
        onClick={onHome}
        aria-label="Home"
      >
        <img src="/src/icons/home.png" alt="Home" className="nav-icon" />
      </button>

      <button
        className={`nav-item ${active === 'whatsapp' ? 'active' : ''}`}
        onClick={onWhatsApp}
        aria-label="WhatsApp"
      >
        <img src="/src/icons/whatsapp.png" alt="WhatsApp" className="nav-icon" />
      </button>

      <button
        className={`nav-item ${active === 'contact' ? 'active' : ''}`}
        onClick={onContact}
        aria-label="Contact"
      >
        <img src="/src/icons/contact.png" alt="Contact" className="nav-icon" />
      </button>
    </div>
  );
}
