import React from 'react';

export default function About() {
  return (
    <div className="about-view">
      <div className="view-header">
        <h2>A propos de nous</h2>
        <p>Decouvrez notre mission et nos valeurs</p>
      </div>
      <div className="about-content">
        <div className="about-section">
          <h3>🚗 Notre histoire</h3>
          <p>Fondee en 2010, Car Rearview Mirror Shop est specialisee dans les retroviseurs et accessoires auto de haute qualite. Ce qui a commence comme une petite entreprise familiale est devenu une reference du secteur.</p>
        </div>

        <div className="about-section">
          <h3>🎯 Notre mission</h3>
          <p>Nous pensons que chaque conducteur merite une visibilite claire et une conduite en securite. Notre mission est de proposer des retroviseurs premium avec un haut niveau de qualite et de service client.</p>
        </div>

        <div className="about-section">
          <h3>✨ Pourquoi nous choisir</h3>
          <div className="features-list">
            <div className="feature-item">
              <span className="feature-icon">🏆</span>
              <div>
                <h4>Qualite premium</h4>
                <p>Tous nos retroviseurs sont testes pour garantir durabilite et clarte</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🚚</span>
              <div>
                <h4>Livraison rapide</h4>
                <p>Expedition rapide avec suivi jusqu'a votre adresse</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">💰</span>
              <div>
                <h4>Prix competitifs</h4>
                <p>Les meilleurs prix sans compromis sur la qualite</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🎧</span>
              <div>
                <h4>Support 24/7</h4>
                <p>Notre service client est disponible pour vous aider</p>
              </div>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h3>🔧 Expertise</h3>
          <p>Avec plus de 14 ans d'experience dans l'automobile, notre equipe comprend l'importance d'un retroviseur adapte. Nous collaborons directement avec les fabricants pour proposer les dernieres innovations.</p>
        </div>
      </div>
    </div>
  );
}
