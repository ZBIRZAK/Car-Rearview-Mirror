import React from 'react';

export default function About() {
  return (
    <div className="about-view">
      <div className="view-header">
        <h2>About Us</h2>
        <p>Learn about our mission and values</p>
      </div>
      <div className="about-content">
        <div className="about-section">
          <h3>🚗 Our Story</h3>
          <p>Founded in 2010, Car Rearview Mirror Shop has been dedicated to providing high-quality automotive mirrors and accessories to drivers worldwide. What started as a small family business has grown into a trusted name in the automotive parts industry.</p>
        </div>

        <div className="about-section">
          <h3>🎯 Our Mission</h3>
          <p>We believe that every driver deserves clear visibility and safety on the road. Our mission is to deliver premium rearview mirrors that enhance driving experience while maintaining the highest standards of quality and customer service.</p>
        </div>

        <div className="about-section">
          <h3>✨ Why Choose Us</h3>
          <div className="features-list">
            <div className="feature-item">
              <span className="feature-icon">🏆</span>
              <div>
                <h4>Premium Quality</h4>
                <p>All our mirrors undergo rigorous testing to ensure durability and clarity</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🚚</span>
              <div>
                <h4>Fast Delivery</h4>
                <p>Quick shipping to your doorstep with tracking information</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">💰</span>
              <div>
                <h4>Competitive Prices</h4>
                <p>Best prices without compromising on quality</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🎧</span>
              <div>
                <h4>24/7 Support</h4>
                <p>Our customer service team is always ready to help</p>
              </div>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h3>🔧 Expertise</h3>
          <p>With over 14 years of experience in the automotive industry, our team of experts understands the importance of proper rearview mirrors. We work directly with manufacturers to ensure we offer the latest innovations in mirror technology.</p>
        </div>
      </div>
    </div>
  );
}
