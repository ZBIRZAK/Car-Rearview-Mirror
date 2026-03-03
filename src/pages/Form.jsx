import React, { useState } from 'react';

export default function Form({ brand, model, year, productConfig, formData, onChange, onSubmit, onBack }) {
  if (!year) return null;

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    if (name === 'fullName') {
      if (!value.trim()) return 'Full name is required.';
      if (value.trim().length < 2) return 'Please enter a valid name.';
    }

    if (name === 'email') {
      if (!value.trim()) return 'Email is required.';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return 'Please enter a valid email address.';
    }

    if (name === 'phone') {
      if (!value.trim()) return 'Phone number is required.';
      const phoneRegex = /^[0-9+\-\s()]+$/;
      if (!phoneRegex.test(value)) return 'Please enter a valid phone number.';
    }

    return '';
  };

  const validateForm = () => {
    const nextErrors = {
      fullName: validateField('fullName', formData.fullName),
      email: validateField('email', formData.email),
      phone: validateField('phone', formData.phone)
    };

    setErrors(nextErrors);
    return Object.values(nextErrors).every((error) => !error);
  };

  const handleFieldChange = (e) => {
    onChange(e);
    const { name, value } = e.target;
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  };

  const handleFormSubmit = (e) => {
    if (!validateForm()) {
      e.preventDefault();
      return;
    }
    onSubmit(e);
  };

  return (
    <div className="form-view">
      <form className="lead-form form-shell" onSubmit={handleFormSubmit}>
        <h2>Final Step: Your Contact Details</h2>
        <p className="form-subtitle">We will contact you with the best mirror match and quote.</p>

        <div className="form-meta-row">
          <span className="form-meta-chip">{brand?.name}</span>
          <span className="form-meta-chip">{model}</span>
          <span className="form-meta-chip">{year}</span>
        </div>

        <div className="product-summary">
          <p><strong>Position:</strong> {productConfig?.position || 'None'}</p>
          <p><strong>Type:</strong> {productConfig?.productType}</p>
          <p><strong>Réglage:</strong> {productConfig?.adjustmentType}</p>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleFieldChange}
              placeholder="Enter your full name"
              aria-invalid={Boolean(errors.fullName)}
            />
            {errors.fullName && <p className="field-error">{errors.fullName}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFieldChange}
              placeholder="Enter your email"
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email && <p className="field-error">{errors.email}</p>}
          </div>

          <div className="form-group form-group-full">
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleFieldChange}
              placeholder="Enter your phone number"
              aria-invalid={Boolean(errors.phone)}
            />
            {errors.phone && <p className="field-error">{errors.phone}</p>}
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="secondary-button" onClick={onBack}>Back</button>
          <button type="submit" className="submit-button">Submit Inquiry</button>
        </div>
      </form>
    </div>
  );
}
