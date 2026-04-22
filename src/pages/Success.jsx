import React from 'react';
import { useI18n } from '../i18n';

export default function Success({ submission, onNewRequest, onWhatsApp }) {
  if (!submission) return null;
  const { t } = useI18n();
  const positionText = Array.isArray(submission.productConfig?.position)
    ? (submission.productConfig.position.length ? submission.productConfig.position.join(' + ') : t('form_none', 'Aucune'))
    : (submission.productConfig?.position || t('form_none', 'Aucune'));

  return (
    <div className="success-view form-shell">
      <div className="success-card">
        <h2>{t('success_title', 'Demande envoyee avec succes')}</h2>
        <p>{t('success_subtitle', 'Merci. Notre equipe vous contactera rapidement avec une offre adaptee.')}</p>

        <div className="product-summary">
          <p><strong>{t('success_vehicle', 'Vehicule')} :</strong> {submission.brand} {submission.model} ({submission.year})</p>
          <p><strong>{t('form_summary_order', 'Commande')} :</strong> {submission.productConfig?.orderScope === 'complete' ? t('form_order_complete', 'Complete') : submission.productConfig?.orderScope === 'piece' ? t('form_order_piece', 'Piece') : t('form_undefined', 'Non definie')}</p>
          <p><strong>{t('form_summary_position', 'Position')} :</strong> {positionText}</p>
          <p><strong>{t('form_summary_type', 'Type')} :</strong> {submission.productConfig?.productType || t('form_undefined', 'Non definie')}</p>
          <p><strong>{t('form_summary_piece', 'Piece cible')} :</strong> {submission.productConfig?.selectedFeature || t('form_undefined', 'Non definie')}</p>
          <p><strong>{t('form_summary_adjustment', 'Reglage')} :</strong> {submission.productConfig?.adjustmentType || t('form_undefined', 'Non definie')}</p>
          <p><strong>{t('form_summary_options', 'Options')} :</strong> {submission.productConfig?.options?.length ? submission.productConfig.options.join(', ') : t('form_none', 'Aucune')}</p>
          <p><strong>{t('success_client', 'Client')} :</strong> {submission.fullName}</p>
          <p><strong>{t('success_email', 'Email')} :</strong> {submission.email}</p>
          <p><strong>{t('success_phone', 'Telephone')} :</strong> {submission.phone}</p>
          {submission.message ? <p><strong>{t('success_message', 'Message')} :</strong> {submission.message}</p> : null}
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
