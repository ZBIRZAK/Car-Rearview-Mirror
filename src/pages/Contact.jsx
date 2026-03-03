import React from 'react';

export default function Contact() {
  return (
    <div className="contact-view">
      <div className="view-header">
        <h2>Contact Us</h2>
        <p>Get in touch with us</p>
      </div>
      <div className="contact-content">
        <div className="contact-section">
          <h3>📧 Get In Touch</h3>
          <p>We'd love to hear from you! Reach out to us through any of the following channels:</p>
        </div>

        <div className="contact-methods">
          <div className="contact-card">
            <div className="contact-icon">📧</div>
            <h4>Email</h4>
            <p>info@carrearviewmirrors.com</p>
            <p>support@carrearviewmirrors.com</p>
          </div>

          <div className="contact-card">
            <div className="contact-icon">📱</div>
            <h4>Phone</h4>
            <p>+1 (555) 123-4567</p>
            <p className="small">Mon-Fri: 9AM - 6PM EST</p>
          </div>

          <div className="contact-card">
            <div className="contact-icon">💬</div>
            <h4>WhatsApp</h4>
            <p>+1 (555) 987-6543</p>
            <p className="small">24/7 Quick Response</p>
          </div>

          <div className="contact-card">
            <div className="contact-icon">📍</div>
            <h4>Address</h4>
            <p>123 Auto Parts Street</p>
            <p>Detroit, MI 48201</p>
          </div>
        </div>

        <div className="business-hours">
          <h3>🕐 Business Hours</h3>
          <div className="hours-list">
            <div className="hour-item">
              <span>Monday - Friday</span>
              <span>9:00 AM - 6:00 PM EST</span>
            </div>
            <div className="hour-item">
              <span>Saturday</span>
              <span>10:00 AM - 4:00 PM EST</span>
            </div>
            <div className="hour-item">
              <span>Sunday</span>
              <span>Closed</span>
            </div>
          </div>
        </div>

        <div className="faq-section">
          <h3>❓ Frequently Asked Questions</h3>
          <div className="faq-item">
            <h4>How long does shipping take?</h4>
            <p>Standard shipping takes 3-5 business days. Express shipping available for 1-2 business days.</p>
          </div>
          <div className="faq-item">
            <h4>Do you offer international shipping?</h4>
            <p>Yes, we ship worldwide with additional shipping costs and customs fees.</p>
          </div>
          <div className="faq-item">
            <h4>What's your return policy?</h4>
            <p>We offer 30-day returns for unused products in original packaging.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
