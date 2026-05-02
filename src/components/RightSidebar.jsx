import React from 'react';
import previousIcon from '../icons/previous.png';
import telegramIcon from '../icons/new logo social/telegram.png';
import instagramIcon from '../icons/new logo social/instagram.png';
import wechatIcon from '../icons/new logo social/wechat.png';
import whatsappIcon from '../icons/new logo social/whatsapp.png';

export default function RightSidebar({
  brands,
  selectedBrand,
  onBrandSelect,
  onMenu,
  menuOpen = false,
  onBack,
  onWhatsApp,
  onWeChat,
  onInstagram,
  onContact,
  disabled = false,
}) {
  return (
    <aside className="right-sidebar" aria-label="Sidebar actions">
      <div className="right-sidebar-top">
        <button
          type="button"
          className={`sidebar-icon-btn sidebar-icon-menu ${menuOpen ? 'open' : ''}`}
          onClick={onMenu}
          aria-label="Menu"
        >
          <span className="menu-glyph" aria-hidden="true">
            <span className="menu-glyph-line line-1" />
            <span className="menu-glyph-line line-2" />
            <span className="menu-glyph-line line-3" />
          </span>
        </button>
      </div>

      <div className="sidebar-divider" aria-hidden="true" />

      <div className="right-sidebar-brands">
        {brands.map((brand) => (
          <button
            key={brand.id}
            type="button"
            className={`sidebar-brand-btn ${selectedBrand?.id === brand.id ? 'active' : ''}`}
            onClick={() => onBrandSelect(brand)}
            disabled={disabled}
            aria-label={brand.name}
            title={brand.name}
          >
            {brand.isImage ? (
              <img src={brand.icon} alt={brand.name} className="sidebar-brand-img" />
            ) : (
              <span className="sidebar-brand-fallback">{brand.icon}</span>
            )}
          </button>
        ))}
      </div>

      <div className="sidebar-divider" aria-hidden="true" />

      <div className="right-sidebar-bottom">
        <button type="button" className="sidebar-icon-btn sidebar-icon-bottom" onClick={onBack} aria-label="Retour">
          <img src={previousIcon} alt="" aria-hidden="true" className="sidebar-bottom-icon-img" />
        </button>
        <button type="button" className="sidebar-icon-btn sidebar-icon-bottom" onClick={onContact} aria-label="Telegram">
          <img src={telegramIcon} alt="" aria-hidden="true" className="sidebar-bottom-icon-img" />
        </button>
        <button type="button" className="sidebar-icon-btn sidebar-icon-bottom" onClick={onWhatsApp} aria-label="WhatsApp">
          <img src={whatsappIcon} alt="" aria-hidden="true" className="sidebar-bottom-icon-img" />
        </button>
        <button type="button" className="sidebar-icon-btn sidebar-icon-bottom" onClick={onInstagram} aria-label="Instagram">
          <img src={instagramIcon} alt="" aria-hidden="true" className="sidebar-bottom-icon-img" />
        </button>
        <button type="button" className="sidebar-icon-btn sidebar-icon-bottom" onClick={onWeChat} aria-label="WeChat">
          <img src={wechatIcon} alt="" aria-hidden="true" className="sidebar-bottom-icon-img" />
        </button>
      </div>
    </aside>
  );
}
