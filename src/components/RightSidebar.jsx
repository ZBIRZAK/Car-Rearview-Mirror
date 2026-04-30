import React from 'react';
import checkoutIcon from '../icons/checkout.png';
import homeIcon from '../icons/new logo social/home.svg';
import whatsappIcon from '../icons/new logo social/whatsapp.svg';
import instagramIcon from '../icons/new logo social/instagram.svg';
import telephoneIcon from '../icons/new logo social/telephone.svg';

export default function RightSidebar({
  brands,
  selectedBrand,
  onBrandSelect,
  onMenu,
  menuOpen = false,
  onCart,
  onHome,
  onWhatsApp,
  onWeChat,
  onInstagram,
  onContact,
  cartCount = 0,
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
        <button type="button" className="sidebar-icon-btn sidebar-icon-cart" onClick={onCart} aria-label="Panier">
          <img src={checkoutIcon} alt="" aria-hidden="true" className="sidebar-cart-icon-img" />
          <span className="sidebar-cart-badge">{cartCount}</span>
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
        <button type="button" className="sidebar-icon-btn sidebar-icon-bottom" onClick={onHome} aria-label="Home">
          <img src={homeIcon} alt="" aria-hidden="true" className="sidebar-bottom-icon-img" />
        </button>
        <button type="button" className="sidebar-icon-btn sidebar-icon-bottom" onClick={onWhatsApp} aria-label="WhatsApp">
          <img src={whatsappIcon} alt="" aria-hidden="true" className="sidebar-bottom-icon-img" />
        </button>
        <button type="button" className="sidebar-icon-btn sidebar-icon-bottom" onClick={onInstagram} aria-label="Instagram">
          <img src={instagramIcon} alt="" aria-hidden="true" className="sidebar-bottom-icon-img" />
        </button>
        <button type="button" className="sidebar-icon-btn sidebar-icon-bottom" onClick={onContact} aria-label="Contact">
          <img src={telephoneIcon} alt="" aria-hidden="true" className="sidebar-bottom-icon-img" />
        </button>
      </div>
    </aside>
  );
}
