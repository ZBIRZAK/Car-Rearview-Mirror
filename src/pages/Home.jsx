import React from 'react';

export default function Home() {
  return (
    <div className="home-view">
      <div className="home-content">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-text">
            <h1 className="app-title">Premium Car Rearview Mirrors</h1>
            <p className="app-description">
              Find the perfect rearview mirror for your vehicle. Quality products, competitive prices, and fast delivery guaranteed.
            </p>
            <button className="cta-button">Get Started</button>
          </div>
          <div className="hero-image">
            <div className="image-placeholder">Hero Image</div>
          </div>
        </div>

        {/* Featured Products */}
        <div className="featured-section">
          <h2 className="section-title">Featured Products</h2>
          <div className="featured-grid">
            <div className="featured-item">
              <div className="featured-image">
                <div className="image-placeholder">Product 1</div>
              </div>
              <h3>Universal Fit Mirror</h3>
              <p>Perfect for most vehicles with premium quality finish</p>
            </div>

            <div className="featured-item">
              <div className="featured-image">
                <div className="image-placeholder">Product 2</div>
              </div>
              <h3>Anti-Glare Mirror</h3>
              <p>Reduce night driving glare with advanced technology</p>
            </div>

            <div className="featured-item">
              <div className="featured-image">
                <div className="image-placeholder">Product 3</div>
              </div>
              <h3>Electric Adjustable</h3>
              <p>Convenient electric controls for easy adjustment</p>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="why-section">
          <h2 className="section-title">Why Choose Us?</h2>
          <div className="why-grid">
            <div className="why-item">
              <div className="why-image">
                <div className="image-placeholder small">Quality</div>
              </div>
              <h3>Premium Quality</h3>
              <p>All mirrors undergo strict quality control before shipping to ensure reliability</p>
            </div>

            <div className="why-item">
              <div className="why-image">
                <div className="image-placeholder small">Fast</div>
              </div>
              <h3>Fast Shipping</h3>
              <p>Quick delivery to your doorstep with tracking information</p>
            </div>

            <div className="why-item">
              <div className="why-image">
                <div className="image-placeholder small">Price</div>
              </div>
              <h3>Best Prices</h3>
              <p>Competitive pricing with no hidden charges or surprises</p>
            </div>

            <div className="why-item">
              <div className="why-image">
                <div className="image-placeholder small">Support</div>
              </div>
              <h3>24/7 Support</h3>
              <p>Round-the-clock customer support for all your questions</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="final-cta">
          <h2>Ready to upgrade your vehicle?</h2>
          <p>Browse our collection and find the perfect mirror for your car</p>
          <button className="cta-button">Explore Now</button>
        </div>
      </div>
    </div>
  );
}
