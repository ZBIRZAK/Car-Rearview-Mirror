import React from 'react';
import { useI18n } from '../i18n';

export default function Success({ submission, onNewRequest, onWhatsApp }) {
  if (!submission) return null;
  const { t } = useI18n();

  return (
    <div className="success-view form-shell">
      <div className="success-card">
        <h2>{t('success_title', 'Demande envoyee avec succes')}</h2>
        <p>{t('success_subtitle', 'Merci. Notre equipe vous contactera rapidement avec une offre adaptee.')}</p>

        <div className="product-summary">
          <p><strong>Vehicule :</strong> {submission.brand} {submission.model} ({submission.year})</p>
          <p><strong>Commande :</strong> {submission.productConfig?.orderScope === 'complete' ? 'Complete' : submission.productConfig?.orderScope === 'piece' ? 'Piece' : 'Non definie'}</p>
          <p><strong>Position :</strong> {submission.productConfig?.position}</p>
          <p><strong>Type :</strong> {submission.productConfig?.productType}</p>
          <p><strong>Piece cible :</strong> {submission.productConfig?.selectedFeature || 'Non definie'}</p>
          <p><strong>Reglage :</strong> {submission.productConfig?.adjustmentType}</p>
          <p><strong>Options :</strong> {submission.productConfig?.options?.length ? submission.productConfig.options.join(', ') : 'Aucune'}</p>
          <p><strong>Client :</strong> {submission.fullName}</p>
          <p><strong>Email :</strong> {submission.email}</p>
          <p><strong>Telephone :</strong> {submission.phone}</p>
          {submission.message ? <p><strong>Message :</strong> {submission.message}</p> : null}
        </div>

        <div className="form-actions">
          <button type="button" className="secondary-button" onClick={onNewRequest}>
            {t('new_request', 'Nouvelle demande')}
          </button>
          <button type="button" className="submit-button" onClick={onWhatsApp}>
            {t('whatsapp_continue', 'Continuer sur WhatsApp')}
          </button>
        </div>
      </div>
    </div>
  );
}
