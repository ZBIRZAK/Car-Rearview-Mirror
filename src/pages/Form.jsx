import React from 'react';

export default function Form({ brand, model, year, productConfig, formData, onChange, onSubmit }) {
  if (!year) return null;
  return (
    <div className="form-view">
      <form className="lead-form" onSubmit={onSubmit}>
        <h2>Get Your Quote</h2>
        <p className="form-subtitle">{brand?.name} {model} ({year})</p>
        <div className="product-summary">
          <p><strong>Position:</strong> {productConfig?.position || 'None'}</p>
          <p><strong>Type:</strong> {productConfig?.productType}</p>
          <p><strong>Réglage:</strong> {productConfig?.adjustmentType}</p>
          <p><strong>Options:</strong> {productConfig?.options?.length ? productConfig.options.join(', ') : 'None'}</p>
        </div>

        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input id="fullName" name="fullName" value={formData.fullName} onChange={onChange} placeholder="Enter your full name" required />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input id="email" type="email" name="email" value={formData.email} onChange={onChange} placeholder="Enter your email" required />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input id="phone" type="tel" name="phone" value={formData.phone} onChange={onChange} placeholder="Enter your phone number" required />
        </div>

        <button type="submit" className="submit-button">Submit Inquiry</button>
      </form>
    </div>
  );
}
