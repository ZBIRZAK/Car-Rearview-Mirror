import React, { useState } from 'react';
import { useI18n } from '../i18n';

export default function Form({ brand, model, year, productConfig, formData, onChange, onSubmit, onBack }) {
  if (!year) return null;
  const { t } = useI18n();
  const positionText = Array.isArray(productConfig?.position)
    ? (productConfig.position.length ? productConfig.position.join(' + ') : t('form_none', 'Aucune'))
    : (productConfig?.position || t('form_none', 'Aucune'));

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    if (name === 'fullName') {
      if (!value.trim()) return t('form_error_full_name_required', 'Le nom complet est obligatoire.');
      if (value.trim().length < 2) return t('form_error_full_name_invalid', 'Veuillez entrer un nom valide.');
    }

    if (name === 'email') {
      if (!value.trim()) return t('form_error_email_required', "L'email est obligatoire.");
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return t('form_error_email_invalid', 'Veuillez entrer une adresse email valide.');
    }

    if (name === 'phone') {
      if (!value.trim()) return t('form_error_phone_required', 'Le numero de telephone est obligatoire.');
      const phoneRegex = /^[0-9+\-\s()]+$/;
      if (!phoneRegex.test(value)) return t('form_error_phone_invalid', 'Veuillez entrer un numero de telephone valide.');
    }

    if (name === 'consent') {
      if (!value) return t('form_error_consent_required', 'Veuillez accepter les CGV et la Politique de Confidentialite.');
    }

    return '';
  };

  const validateForm = () => {
    const nextErrors = {
      fullName: validateField('fullName', formData.fullName),
      email: validateField('email', formData.email),
      phone: validateField('phone', formData.phone),
      consent: validateField('consent', formData.consent)
    };

    setErrors(nextErrors);
    return Object.values(nextErrors).every((error) => !error);
  };

  const handleFieldChange = (e) => {
    onChange(e);
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, fieldValue)
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
        <h2>{t('form_title', 'Derniere etape : vos coordonnees')}</h2>
        <p className="form-subtitle">{t('form_subtitle', 'Nous vous contacterons avec la meilleure option et le meilleur prix.')}</p>

        <div className="form-meta-row">
          <span className="form-meta-chip">{brand?.name}</span>
          <span className="form-meta-chip">{model}</span>
          <span className="form-meta-chip">{year}</span>
        </div>

        <div className="product-summary">
          <p><strong>{t('form_summary_order', 'Commande')} :</strong> {productConfig?.orderScope === 'complete' ? t('form_order_complete', 'Complete') : productConfig?.orderScope === 'piece' ? t('form_order_piece', 'Piece') : t('form_undefined', 'Non definie')}</p>
          <p><strong>{t('form_summary_position', 'Position')} :</strong> {positionText}</p>
          <p><strong>{t('form_summary_type', 'Type')} :</strong> {productConfig?.productType || t('form_undefined', 'Non definie')}</p>
          <p><strong>{t('form_summary_piece', 'Piece cible')} :</strong> {productConfig?.selectedFeature || t('form_undefined', 'Non definie')}</p>
          <p><strong>{t('form_summary_adjustment', 'Reglage')} :</strong> {productConfig?.adjustmentType || t('form_undefined', 'Non definie')}</p>
          <p><strong>{t('form_summary_options', 'Options')} :</strong> {productConfig?.options?.length ? productConfig.options.join(', ') : t('form_none', 'Aucune')}</p>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="fullName">{t('form_full_name', 'Nom complet')}</label>
            <input
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleFieldChange}
              placeholder={t('form_full_name_ph', 'Entrez votre nom complet')}
              aria-invalid={Boolean(errors.fullName)}
            />
            {errors.fullName && <p className="field-error">{errors.fullName}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email">{t('form_email', 'Adresse email')}</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFieldChange}
              placeholder={t('form_email_ph', 'Entrez votre email')}
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email && <p className="field-error">{errors.email}</p>}
          </div>

          <div className="form-group form-group-full">
            <label htmlFor="phone">{t('form_phone', 'Numero de telephone')}</label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleFieldChange}
              placeholder={t('form_phone_ph', 'Entrez votre numero de telephone')}
              aria-invalid={Boolean(errors.phone)}
            />
            {errors.phone && <p className="field-error">{errors.phone}</p>}
          </div>

          <div className="form-group form-group-full">
            <label htmlFor="message">{t('form_message', 'Message (optionnel)')}</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleFieldChange}
              placeholder={t('form_message_ph', 'Ajoutez un detail utile (reference, couleur, cote exact, etc.)')}
              rows={4}
            />
          </div>

          <div className="form-group form-group-full consent-group">
            <label className="consent-label">
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleFieldChange}
              />
              <span>
                {t('form_consent_prefix', "J'accepte les")}{' '}
                <a className="consent-legal-link" href="/conditions-generales-de-vente">
                  {t('form_consent_terms', 'Conditions Generales de Vente')}
                </a>{' '}
                {t('form_consent_and', 'et la')}{' '}
                <a className="consent-legal-link" href="/politique-de-confidentialite">
                  {t('form_consent_privacy', 'Politique de Confidentialite')}
                </a>
                .
              </span>
            </label>
            {errors.consent && <p className="field-error">{errors.consent}</p>}
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="secondary-button" onClick={onBack}>{t('back', 'Retour')}</button>
          <button type="submit" className="submit-button">{t('send_request', 'Envoyer la demande')}</button>
        </div>
      </form>
    </div>
  );
}
