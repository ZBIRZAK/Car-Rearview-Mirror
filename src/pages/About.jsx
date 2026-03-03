import React from 'react';

function AboutLineIcon({ type }) {
  if (type === 'quality') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3 5 6v6c0 5 3.4 8.6 7 9 3.6-.4 7-4 7-9V6z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    );
  }
  if (type === 'delivery') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 7h12v8H3z" />
        <path d="M15 10h4l2 2v3h-6z" />
        <path d="M7 18a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
        <path d="M18 18a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
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

export default function About() {
  return (
    <div className="about-view about-v2">
      <div className="about-hero">
        <p className="about-kicker">A propos de nous</p>
        <h2>A propos de nous</h2>
        <p>
          Nous aidons les conducteurs a trouver rapidement le bon retroviseur,
          avec un parcours simple et un support humain.
        </p>
      </div>

      <div className="about-stats">
        <div className="about-stat-card">
          <strong>14+</strong>
          <span>Annees d'experience</span>
        </div>
        <div className="about-stat-card">
          <strong>50k+</strong>
          <span>Clients accompagnes</span>
        </div>
        <div className="about-stat-card">
          <strong>98%</strong>
          <span>Taux de satisfaction</span>
        </div>
      </div>

      <div className="about-v2-layout">
        <section className="about-panel">
          <h3>Notre histoire</h3>
          <p>
            Fondee en 2010, Car Rearview Mirror Shop est specialisee dans les
            retroviseurs et accessoires auto de haute qualite. Ce qui a commence
            comme une petite entreprise familiale est devenu une reference du
            secteur.
          </p>
          <div className="about-timeline">
            <div className="about-timeline-item">
              <span className="year">2010</span>
              <p>Lancement de notre activite specialisee retroviseurs.</p>
            </div>
            <div className="about-timeline-item">
              <span className="year">2018</span>
              <p>Extension du catalogue multi-marques et multi-modeles.</p>
            </div>
            <div className="about-timeline-item">
              <span className="year">2024</span>
              <p>Refonte du parcours digital pour simplifier la selection.</p>
            </div>
          </div>
        </section>

        <section className="about-panel">
          <h3>Notre mission</h3>
          <p>
            Nous pensons que chaque conducteur merite une visibilite claire et
            une conduite en securite. Notre mission est de proposer des
            retroviseurs premium avec un haut niveau de qualite et de service
            client.
          </p>
          <h3>Notre vision</h3>
          <p>
            Devenir la reference francophone pour le choix de retroviseurs en
            ligne, avec une experience claire, rapide et fiable.
          </p>
        </section>
      </div>

      <section className="about-panel">
        <h3>Pourquoi nous choisir</h3>
        <div className="about-feature-grid">
          <div className="about-feature-item">
            <span className="about-feature-icon"><AboutLineIcon type="quality" /></span>
            <div>
              <h4>Qualite premium</h4>
              <p>Tous nos retroviseurs sont testes pour garantir durabilite et clarte.</p>
            </div>
          </div>
          <div className="about-feature-item">
            <span className="about-feature-icon"><AboutLineIcon type="delivery" /></span>
            <div>
              <h4>Livraison rapide</h4>
              <p>Expedition rapide avec suivi jusqu'a votre adresse.</p>
            </div>
          </div>
          <div className="about-feature-item">
            <span className="about-feature-icon"><AboutLineIcon type="price" /></span>
            <div>
              <h4>Prix competitifs</h4>
              <p>Les meilleurs prix sans compromis sur la qualite.</p>
            </div>
          </div>
          <div className="about-feature-item">
            <span className="about-feature-icon"><AboutLineIcon type="support" /></span>
            <div>
              <h4>Support 24/7</h4>
              <p>Notre service client est disponible pour vous aider.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="about-panel">
        <h3>Expertise technique</h3>
        <p>
          Avec plus de 14 ans d'experience dans l'automobile, notre equipe
          comprend l'importance d'un retroviseur adapte. Nous collaborons
          directement avec les fabricants pour proposer les dernieres
          innovations.
        </p>
      </section>
    </div>
  );
}
