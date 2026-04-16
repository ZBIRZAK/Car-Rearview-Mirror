import React from 'react';
import { useI18n } from '../i18n';
import heroMirrorImage from '../images/hero-image.jpeg';
import { DEFAULT_HOME_CONTENT, normalizeHomeContent } from '../config/homeContentDefaults';

function WhyLineIcon({ type }) {
  if (type === 'shield') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3 5 6v6c0 5 3.4 8.6 7 9 3.6-.4 7-4 7-9V6z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    );
  }
  if (type === 'bolt') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M13 2 4 14h6l-1 8 9-12h-6z" />
      </svg>
    );
  }
  if (type === 'price') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3v18" />
        <path d="M16 7.5c0-1.7-1.8-3-4-3s-4 1.3-4 3 1.2 2.6 4 3 4 1.2 4 3-1.8 3-4 3-4-1.3-4-3" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18 10a6 6 0 1 0-12 0v5H4v3h4v-3h8v3h4v-3h-2z" />
      <path d="M9 19a3 3 0 0 0 6 0" />
    </svg>
  );
}

export default function Home({ onStartSelection, showBrandHint, homeContent = DEFAULT_HOME_CONTENT }) {
  const { t } = useI18n();
  const normalizedContent = normalizeHomeContent(homeContent);
  const renderSeoLink = (link, index) => {
    const href = String(link?.href || '').trim();
    if (href) {
      return <a href={href}>{link.label}</a>;
    }
    return link.label || `Lien ${index + 1}`;
  };

  return (
    <div className="home-view">
      <div className="home-content">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-image">
            <img src={heroMirrorImage} alt="Retroviseur principal" className="hero-photo" />
            <div className="hero-image-overlay-text" aria-hidden="true">
              {normalizedContent.heroOverlayLines.map((line, index) => (
                <span
                  key={`${line}-${index}`}
                  className={`hero-overlay-line ${index % 2 === 0 ? 'hero-overlay-white' : 'hero-overlay-gold'}`}
                >
                  {line}
                </span>
              ))}
            </div>
          </div>
          <div className="hero-text">
            <h1 className="app-title">{t('home_title', 'Retroviseurs Auto Premium')}</h1>
            <p className="app-description">
              {t('home_desc', 'Trouvez le retroviseur ideal pour votre vehicule. Produits de qualite, prix competitifs et livraison rapide.')}
            </p>
            <button className="cta-button" onClick={onStartSelection}>{t('home_cta', 'Choisir ma marque')}</button>
            {/* <p className="time-estimate">{t('home_time', 'Temps estime : 30 secondes')}</p> */}
            {showBrandHint ? (
              <p className="brand-hint">{t('home_hint', 'Commencez par choisir une marque dans la barre laterale droite.')}</p>
            ) : null}
            <div className="trust-strip">
              {normalizedContent.trustStrip.map((item, index) => (
                <span key={`${item}-${index}`}>{item}</span>
              ))}
            </div>
          </div>
        </div>

        <section className="mechanic-contacts-section" aria-label="Contacts mecaniciens">
          <h2 className="section-title">{normalizedContent.mechanicSectionTitle}</h2>
          <p className="mechanic-contacts-intro">{normalizedContent.mechanicSectionIntro}</p>
          {normalizedContent.mechanicGroups.map((entry) => (
            <div key={entry.group} className="mechanic-contact-group">
              <h3 className="mechanic-group-title">{entry.group}</h3>
              <div className="mechanic-contacts-grid">
                {entry.contacts.map((contact) => {
                  return (
                    <article key={contact.phone} className="mechanic-contact-card">
                      <img src={contact.image} alt={contact.name} className="mechanic-contact-image" />
                      <h3>{contact.name}</h3>
                      <p>{contact.address}</p>
                      <p className="mechanic-contact-phone">{contact.phone}</p>
                      <div className="mechanic-contact-actions">
                        <a href={`tel:${contact.phone}`}>Appeler</a>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          ))}
        </section>

        {/* Featured Products */}
        <div className="featured-section">
          <h2 className="section-title">{normalizedContent.featuredSectionTitle}</h2>
          <div className="featured-grid">
            {normalizedContent.featuredItems.map((item, index) => (
              <div key={`${item.title}-${index}`} className="featured-item">
                <div className="featured-image">
                  <img src={item.image} alt={item.title || `Produit en vedette ${index + 1}`} className="featured-photo" />
                </div>
                <h3>{item.title || `Produit ${index + 1}`}</h3>
                <p>{item.description || ''}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="why-section">
          <h2 className="section-title">{normalizedContent.whySectionTitle}</h2>
          <div className="why-grid">
            {normalizedContent.whyItems.map((item, index) => (
              <div className="why-item" key={`${item.title}-${index}`}>
                <div className="why-image">
                  <span className="why-icon"><WhyLineIcon type={item.icon} /></span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="final-cta">
          <h2>{normalizedContent.finalCta.title}</h2>
          <p>{normalizedContent.finalCta.description}</p>
          <button className="cta-button">{normalizedContent.finalCta.buttonLabel}</button>
        </div>

        <section className="seo-categories" aria-label="Categories SEO retroviseurs exterieurs">
          <h2 className="section-title">{normalizedContent.seo.title}</h2>
          <p className="seo-intro">{normalizedContent.seo.intro}</p>
          <div className="seo-grid">
            {normalizedContent.seo.cards.map((card, cardIndex) => (
              <article className="seo-card" key={`${card.title}-${cardIndex}`}>
                <h3>{card.title}</h3>
                <ul>
                  {card.links.map((link, linkIndex) => (
                    <li key={`${link.label}-${linkIndex}`}>{renderSeoLink(link, linkIndex)}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
