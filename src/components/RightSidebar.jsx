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
  onTelegram,
  socialContactNumber = '',
  disabled = false,
}) {
  const brandsRef = React.useRef(null);
  const [isShareOpen, setIsShareOpen] = React.useState(false);

  const handleBrandsWheel = (event) => {
    const listEl = brandsRef.current;
    if (!listEl) return;
    const { scrollTop, clientHeight, scrollHeight } = listEl;
    const deltaY = event.deltaY;
    const canScroll = scrollHeight > clientHeight + 1;
    const atTop = scrollTop <= 0;
    const atBottom = scrollTop + clientHeight >= scrollHeight - 1;
    const scrollingDown = deltaY > 0;

    // When the sidebar brand list is at its edge, continue scrolling main content.
    if (!canScroll || (scrollingDown && atBottom) || (!scrollingDown && atTop)) {
      const mainContent = document.querySelector('.main-content');
      if (mainContent) {
        mainContent.scrollTop += deltaY;
        event.preventDefault();
      }
    }
  };

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

      <div ref={brandsRef} className="right-sidebar-brands" onWheel={handleBrandsWheel}>
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
        <div className={`sidebar-social-stack ${isShareOpen ? 'open' : ''}`} aria-hidden={!isShareOpen}>
          <button
            type="button"
            className="sidebar-icon-btn sidebar-icon-bottom"
            onClick={onTelegram}
            aria-label="Telegram"
            title={`Telegram: ${socialContactNumber}`}
            tabIndex={isShareOpen ? 0 : -1}
          >
            <img src={telegramIcon} alt="" aria-hidden="true" className="sidebar-bottom-icon-img" />
          </button>
          <button
            type="button"
            className="sidebar-icon-btn sidebar-icon-bottom"
            onClick={onWhatsApp}
            aria-label="WhatsApp"
            tabIndex={isShareOpen ? 0 : -1}
          >
            <img src={whatsappIcon} alt="" aria-hidden="true" className="sidebar-bottom-icon-img" />
          </button>
          <button
            type="button"
            className="sidebar-icon-btn sidebar-icon-bottom"
            onClick={onInstagram}
            aria-label="Instagram"
            title={`Instagram: ${socialContactNumber}`}
            tabIndex={isShareOpen ? 0 : -1}
          >
            <img src={instagramIcon} alt="" aria-hidden="true" className="sidebar-bottom-icon-img" />
          </button>
          <button
            type="button"
            className="sidebar-icon-btn sidebar-icon-bottom"
            onClick={onWeChat}
            aria-label="WeChat"
            title={`WeChat: ${socialContactNumber}`}
            tabIndex={isShareOpen ? 0 : -1}
          >
            <img src={wechatIcon} alt="" aria-hidden="true" className="sidebar-bottom-icon-img" />
          </button>
        </div>

        <button type="button" className="sidebar-icon-btn sidebar-icon-bottom sidebar-icon-back" onClick={onBack} aria-label="Retour">
          <img src={previousIcon} alt="" aria-hidden="true" className="sidebar-bottom-icon-img sidebar-bottom-icon-previous" />
        </button>

        <button
          type="button"
          className={`sidebar-icon-btn sidebar-icon-bottom sidebar-icon-share ${isShareOpen ? 'open' : ''}`}
          onClick={() => setIsShareOpen((prev) => !prev)}
          aria-label="Partager"
          aria-expanded={isShareOpen}
        >
          {isShareOpen ? (
            <svg viewBox="0 0 24 24" aria-hidden="true" className="sidebar-share-close-mark sidebar-share-toggle-visual">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <img src={whatsappIcon} alt="" aria-hidden="true" className="sidebar-share-icon-img sidebar-share-toggle-visual" />
          )}
        </button>
      </div>
    </aside>
  );
}
