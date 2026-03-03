import React from 'react';

export default function Home() {
  return (
    <div className="home-view">
      <div className="home-content">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-text">
            <h1 className="app-title">Retroviseurs Auto Premium</h1>
            <p className="app-description">
              Trouvez le retroviseur ideal pour votre vehicule. Produits de qualite, prix competitifs et livraison rapide.
            </p>
            <button className="cta-button">Commencer</button>
          </div>
          <div className="hero-image">
            <div className="image-placeholder">Image principale</div>
          </div>
        </div>

        {/* Featured Products */}
        <div className="featured-section">
          <h2 className="section-title">Produits en vedette</h2>
          <div className="featured-grid">
            <div className="featured-item">
              <div className="featured-image">
                <div className="image-placeholder">Produit 1</div>
              </div>
              <h3>Retroviseur Universel</h3>
              <p>Compatible avec la plupart des vehicules avec finition premium</p>
            </div>

            <div className="featured-item">
              <div className="featured-image">
                <div className="image-placeholder">Produit 2</div>
              </div>
              <h3>Retroviseur Anti-Eblouissement</h3>
              <p>Reduit l'eblouissement de nuit grace a une technologie avancee</p>
            </div>

            <div className="featured-item">
              <div className="featured-image">
                <div className="image-placeholder">Produit 3</div>
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
                <div className="image-placeholder small">Qualite</div>
              </div>
              <h3>Qualite Premium</h3>
              <p>Tous nos retroviseurs passent un controle strict avant expedition</p>
            </div>

            <div className="why-item">
              <div className="why-image">
                <div className="image-placeholder small">Rapide</div>
              </div>
              <h3>Livraison Rapide</h3>
              <p>Livraison rapide a votre adresse avec suivi de colis</p>
            </div>

            <div className="why-item">
              <div className="why-image">
                <div className="image-placeholder small">Prix</div>
              </div>
              <h3>Meilleurs Prix</h3>
              <p>Prix competitifs sans frais caches</p>
            </div>

            <div className="why-item">
              <div className="why-image">
                <div className="image-placeholder small">Support</div>
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
      </div>
    </div>
  );
}
