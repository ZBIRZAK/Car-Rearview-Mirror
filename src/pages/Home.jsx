import React from 'react';
import { useI18n } from '../i18n';
import heroMirrorImage from '../images/hero-image.jpeg';

const featuredOneImage = 'https://images.pexels.com/photos/17168615/pexels-photo-17168615.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1500&h=1000';
const featuredTwoImage = 'https://images.pexels.com/photos/15360851/pexels-photo-15360851.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1500&h=1000';
const featuredThreeImage = 'https://images.pexels.com/photos/12152813/pexels-photo-12152813.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1500&h=1000';
const mechanicContacts = [
  {
    name: 'Garage Atlas Auto',
    address: '12 Rue Al Massira, Casablanca',
    phone: '+212612345678',
    image: 'https://images.pexels.com/photos/13065690/pexels-photo-13065690.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=700&h=500',
  },
  {
    name: 'Meca Express',
    address: '45 Avenue Hassan II, Rabat',
    phone: '+212623456789',
    image: 'https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=700&h=500',
  },
  {
    name: 'Service Auto Nord',
    address: '8 Boulevard Mohammed V, Tanger',
    phone: '+212634567890',
    image: 'https://images.pexels.com/photos/3806249/pexels-photo-3806249.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=700&h=500',
  },
];

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

export default function Home({ onStartSelection, showBrandHint }) {
  const { t } = useI18n();
  return (
    <div className="home-view">
      <div className="home-content">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-image">
            <img src={heroMirrorImage} alt="Retroviseur principal" className="hero-photo" />
            <div className="hero-image-overlay-text" aria-hidden="true">
              <span className="hero-overlay-line hero-overlay-white">VOTRE</span>
              <span className="hero-overlay-line hero-overlay-gold">RETROVISEUR,</span>
              <span className="hero-overlay-line hero-overlay-white">NOTRE</span>
              <span className="hero-overlay-line hero-overlay-gold">EXPERTISE.</span>
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
              <span>Livraison rapide</span>
              <span>Paiement securise</span>
              <span>Support 24/7</span>
            </div>
          </div>
        </div>

        <section className="mechanic-contacts-section" aria-label="Contacts mecaniciens">
          <h2 className="section-title">Contacts mecaniciens</h2>
          <p className="mechanic-contacts-intro">Besoin d'aide pour le montage ? Contactez un mecanicien partenaire.</p>
          <div className="mechanic-contacts-grid">
            {mechanicContacts.map((contact) => {
              const waPhone = contact.phone.replace(/\D/g, '');
              return (
                <article key={contact.phone} className="mechanic-contact-card">
                  <img src={contact.image} alt={contact.name} className="mechanic-contact-image" />
                  <h3>{contact.name}</h3>
                  <p>{contact.address}</p>
                  <p className="mechanic-contact-phone">{contact.phone}</p>
                  <div className="mechanic-contact-actions">
                    <a href={`tel:${contact.phone}`}>Appeler</a>
                    <a href={`https://wa.me/${waPhone}`} target="_blank" rel="noreferrer">WhatsApp</a>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Featured Products */}
        <div className="featured-section">
          <h2 className="section-title">Produits en vedette</h2>
          <div className="featured-grid">
            <div className="featured-item">
              <div className="featured-image">
                <img src={featuredOneImage} alt="Produit en vedette 1" className="featured-photo" />
              </div>
              <h3>Retroviseur Universel</h3>
              <p>Compatible avec la plupart des vehicules avec finition premium</p>
            </div>

            <div className="featured-item">
              <div className="featured-image">
                <img src={featuredTwoImage} alt="Produit en vedette 2" className="featured-photo" />
              </div>
              <h3>Retroviseur Anti-Eblouissement</h3>
              <p>Reduit l'eblouissement de nuit grace a une technologie avancee</p>
            </div>

            <div className="featured-item">
              <div className="featured-image">
                <img src={featuredThreeImage} alt="Produit en vedette 3" className="featured-photo" />
              </div>
              <h3>Reglage Electrique</h3>
              <p>Commandes electriques pratiques pour un ajustement facile</p>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="why-section">
          <h2 className="section-title">Pourquoi nous choisir ?</h2>
          <div className="why-grid">
            <div className="why-item">
              <div className="why-image">
                <span className="why-icon"><WhyLineIcon type="shield" /></span>
              </div>
              <h3>Qualite Premium</h3>
              <p>Tous nos retroviseurs passent un controle strict avant expedition</p>
            </div>

            <div className="why-item">
              <div className="why-image">
                <span className="why-icon"><WhyLineIcon type="bolt" /></span>
              </div>
              <h3>Livraison Rapide</h3>
              <p>Livraison rapide a votre adresse avec suivi de colis</p>
            </div>

            <div className="why-item">
              <div className="why-image">
                <span className="why-icon"><WhyLineIcon type="price" /></span>
              </div>
              <h3>Meilleurs Prix</h3>
              <p>Prix competitifs sans frais caches</p>
            </div>

            <div className="why-item">
              <div className="why-image">
                <span className="why-icon"><WhyLineIcon type="support" /></span>
              </div>
              <h3>Support 24/7</h3>
              <p>Une equipe disponible pour repondre a toutes vos questions</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="final-cta">
          <h2>Pret a ameliorer votre vehicule ?</h2>
          <p>Parcourez notre collection et trouvez le retroviseur parfait</p>
          <button className="cta-button">Explorer</button>
        </div>

        <section className="seo-categories" aria-label="Categories SEO retroviseurs exterieurs">
          <h2 className="section-title">Retroviseurs exterieurs : recherches populaires</h2>
          <p className="seo-intro">
            Trouvez rapidement le bon produit selon le cote, la fonctionnalite et l'usage de votre vehicule.
          </p>
          <div className="seo-grid">
            <article className="seo-card">
              <h3>Par cote</h3>
              <ul>
                <li><a href="/retroviseur-exterieur-gauche">Retroviseur exterieur gauche (cote conducteur)</a></li>
                <li><a href="/retroviseur-exterieur-droit">Retroviseur exterieur droit (cote passager)</a></li>
              </ul>
            </article>
            <article className="seo-card">
              <h3>Par fonctionnalite</h3>
              <ul>
                <li><a href="/retroviseur-exterieur-electrique">Retroviseur exterieur electrique</a></li>
                <li><a href="/retroviseur-exterieur-chauffant">Retroviseur exterieur chauffant / degivrant</a></li>
                <li><a href="/retroviseur-exterieur-rabattable-electriquement">Retroviseur exterieur rabattable electriquement</a></li>
                <li>Retroviseur avec clignotant integre</li>
                <li>Retroviseur exterieur photochromatique</li>
              </ul>
            </article>
            <article className="seo-card">
              <h3>Par type de vehicule</h3>
              <ul>
                <li>Retroviseur exterieur pour utilitaire</li>
                <li>Retroviseur exterieur pour camping-car / fourgon</li>
                <li>Retroviseur exterieur surbaisse (sport / tuning)</li>
                <li>Retroviseur exterieur tout-terrain / off-road</li>
              </ul>
            </article>
            <article className="seo-card">
              <h3>Par type de verre</h3>
              <ul>
                <li>Retroviseur grand angle / aspherique</li>
                <li>Verre de retroviseur convexe</li>
                <li>Retroviseur exterieur a memoire</li>
              </ul>
            </article>
            <article className="seo-card">
              <h3>Guides & besoins</h3>
              <ul>
                <li>Remplacer retroviseur exterieur</li>
                <li>Comment demonter retroviseur exterieur</li>
                <li>Reparation retroviseur exterieur</li>
                <li>Retroviseur exterieur universel</li>
              </ul>
            </article>
            <article className="seo-card">
              <h3>Longue traine</h3>
              <ul>
                <li>Retroviseur exterieur chauffant gauche pour [Marque Modele]</li>
                <li>Coque de retroviseur exterieur carbone [Marque Modele]</li>
                <li>Kit eclairage d'aile pour retroviseur exterieur</li>
              </ul>
            </article>
          </div>
        </section>
      </div>
    </div>
  );
}
