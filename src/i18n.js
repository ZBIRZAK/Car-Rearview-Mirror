import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const LANG_STORAGE_KEY = 'crm_lang_v1';

const translations = {
  fr: {
    nav_home: 'Accueil',
    nav_about: 'A propos',
    nav_contact: 'Contact',
    nav_dashboard: 'Dashboard',
    nav_terms: 'CGV',
    nav_privacy: 'Confidentialite',
    nav_mobile_title: 'Navigation',
    nav_mobile_subtitle: 'Accedez rapidement aux pages principales',
    lang_fr: 'FR',
    lang_ar: 'AR',
    lang_switch: 'Langue',

    home_title: 'Retroviseurs Auto Premium',
    home_desc: 'Trouvez le retroviseur ideal pour votre vehicule. Produits de qualite, prix competitifs et livraison rapide.',
    home_cta: 'Choisir ma marque',
    home_time: 'Temps estime : 30 secondes',
    home_hint: 'Commencez par choisir une marque dans la barre laterale droite.',

    models_search: 'Rechercher un modele...',
    models_audio_help: 'Mode facile: appuyez pour ecouter les etapes.',
    listen_steps: 'Ecouter les etapes',
    stop_voice: 'Arreter la voix',

    product_title: 'Configurez votre demande',
    product_subtitle_suffix: 'suivez simplement les etapes ci-dessous',
    product_audio_help: 'Mode facile: ecoutez la consigne et suivez les boutons.',
    product_piece_pick: "Vous voulez seulement une piece ? Choisissez l'icone correspondante.",
    product_catalog_title: 'Choisissez le produit a commander',
    product_catalog_help: 'Selectionnez un produit pour ouvrir sa page d options.',
    product_selected_product: 'Produit selectionne',
    product_change_selection: 'Changer le produit',
    product_step1: '1. Type de commande',
    product_step1_help: 'Choisissez si vous commandez un retroviseur complet ou uniquement une piece.',
    product_complete: 'Retroviseur complet',
    product_complete_sub: 'Produit complet pret a monter',
    product_piece_only: 'Piece uniquement',
    product_piece_only_sub: 'Exemple: seulement la glace',
    product_next_piece: "Etape suivante: selectionnez la piece via les icones sous la photo.",
    product_step2: '1. Cote du retroviseur',
    product_step2_help: 'Selectionnez le cote du vehicule concerne.',
    side_driver: 'Conducteur',
    side_passenger: 'Passager',
    product_piece_options_title: '2. Options pour la piece',
    product_piece_options_help: 'Options facultatives. Choisissez "Juste la piece" si vous ne voulez rien ajouter.',
    product_only_piece: 'Juste la piece (sans option)',
    continue_form: 'Demande devis',
    continue_shopping: 'Continuer vos achats',
    quote_items_count: 'Produits ajoutes',

    form_title: 'Derniere etape : vos coordonnees',
    form_subtitle: 'Nous vous contacterons avec la meilleure option et le meilleur prix.',
    form_audio_help: "Mode facile: vous pouvez ecouter l'aide.",
    form_full_name: 'Nom complet',
    form_full_name_ph: 'Entrez votre nom complet',
    form_email: 'Adresse email',
    form_email_ph: 'Entrez votre email',
    form_phone: 'Numero de telephone',
    form_phone_ph: 'Entrez votre numero de telephone',
    form_message: 'Message (optionnel)',
    form_message_ph: 'Ajoutez un detail utile (reference, couleur, cote exact, etc.)',
    back: 'Retour',
    send_request: 'Envoyer la demande',

    success_title: 'Demande envoyee avec succes',
    success_subtitle: 'Merci. Notre equipe vous contactera rapidement avec une offre adaptee.',
    new_request: 'Nouvelle demande',
    whatsapp_continue: 'Continuer sur WhatsApp',
  },
  ar: {
    nav_home: 'الرئيسية',
    nav_about: 'من نحن',
    nav_contact: 'اتصل بنا',
    nav_dashboard: 'لوحة التحكم',
    nav_terms: 'الشروط',
    nav_privacy: 'الخصوصية',
    nav_mobile_title: 'التنقل',
    nav_mobile_subtitle: 'الوصول السريع للصفحات الرئيسية',
    lang_fr: 'FR',
    lang_ar: 'AR',
    lang_switch: 'اللغة',

    home_title: 'مرايا سيارات مميزة',
    home_desc: 'اعثر على المرآة المناسبة لسيارتك بسرعة وبجودة عالية.',
    home_cta: 'اختر الماركة',
    home_time: 'الوقت المتوقع: 30 ثانية',
    home_hint: 'ابدأ باختيار الماركة من الشريط الجانبي الأيمن.',

    models_search: 'ابحث عن الموديل...',
    models_audio_help: 'وضع سهل: اضغط للاستماع إلى الخطوات.',
    listen_steps: 'استمع للخطوات',
    stop_voice: 'إيقاف الصوت',

    product_title: 'إعداد الطلب',
    product_subtitle_suffix: 'اتبع الخطوات التالية بسهولة',
    product_audio_help: 'وضع سهل: استمع للتعليمات ثم اتبع الأزرار.',
    product_piece_pick: 'هل تريد قطعة فقط؟ اختر الأيقونة المناسبة.',
    product_catalog_title: 'اختر المنتج المطلوب',
    product_catalog_help: 'اختر منتجا لفتح صفحة الخيارات الخاصة به.',
    product_selected_product: 'المنتج المحدد',
    product_change_selection: 'تغيير المنتج',
    product_step1: '1. نوع الطلب',
    product_step1_help: 'اختر بين مرآة كاملة أو قطعة فقط.',
    product_complete: 'مرآة كاملة',
    product_complete_sub: 'منتج كامل جاهز للتركيب',
    product_piece_only: 'قطعة فقط',
    product_piece_only_sub: 'مثال: الزجاج فقط',
    product_next_piece: 'الخطوة التالية: اختر القطعة من الأيقونات أسفل الصورة.',
    product_step2: '1. جهة المرآة',
    product_step2_help: 'اختر جهة السيارة المطلوبة.',
    side_driver: 'جهة السائق',
    side_passenger: 'جهة الراكب',
    product_piece_options_title: '2. خيارات القطعة',
    product_piece_options_help: 'خيارات إضافية. اختر "القطعة فقط" إذا لا تريد إضافات.',
    product_only_piece: 'القطعة فقط (بدون خيارات)',
    continue_form: 'طلب عرض سعر',
    continue_shopping: 'مواصلة التسوق',
    quote_items_count: 'المنتجات المضافة',

    form_title: 'الخطوة الأخيرة: معلوماتك',
    form_subtitle: 'سنتواصل معك بأفضل عرض وسعر.',
    form_audio_help: 'وضع سهل: يمكنك الاستماع للمساعدة.',
    form_full_name: 'الاسم الكامل',
    form_full_name_ph: 'اكتب اسمك الكامل',
    form_email: 'البريد الإلكتروني',
    form_email_ph: 'اكتب بريدك الإلكتروني',
    form_phone: 'رقم الهاتف',
    form_phone_ph: 'اكتب رقم هاتفك',
    form_message: 'رسالة (اختياري)',
    form_message_ph: 'أضف أي تفاصيل مفيدة (المرجع، اللون، الجهة...)',
    back: 'رجوع',
    send_request: 'إرسال الطلب',

    success_title: 'تم إرسال الطلب بنجاح',
    success_subtitle: 'شكرا لك. سيتواصل فريقنا معك قريبا.',
    new_request: 'طلب جديد',
    whatsapp_continue: 'المتابعة عبر واتساب',
  },
};

const I18nContext = createContext(null);

export function I18nProvider({ children }) {
  const [language, setLanguage] = useState('fr');

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LANG_STORAGE_KEY);
      if (stored === 'fr' || stored === 'ar') setLanguage(stored);
    } catch {
      // ignore storage errors
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(LANG_STORAGE_KEY, language);
    } catch {
      // ignore storage errors
    }
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    t: (key, fallback = '') => translations[language]?.[key] || fallback || translations.fr[key] || key,
  }), [language]);

  return React.createElement(I18nContext.Provider, { value }, children);
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside I18nProvider');
  return ctx;
}
