import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { mockData } from './data/mockData';
import BrandSelector from './components/BrandSelector';
import BottomNav from './components/BottomNav';
import Header from './components/Header';
import Home from './pages/Home';
import Models from './pages/Models';
import Product from './pages/Product';
import Form from './pages/Form';
import Success from './pages/Success';
import About from './pages/About';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import CategoryLanding, { categoryContentMap } from './pages/CategoryLanding';
import { applySeo } from './seo';
import { useI18n } from './i18n';
import Dashboard from './pages/Dashboard';
import { createRequest } from './lib/requestsApi';

const FLOW_STORAGE_KEY = 'crm_flow_state_v1';
const WHATSAPP_NUMBER = String(import.meta.env.VITE_WHATSAPP_NUMBER || '1234567890').replace(/\D/g, '');
const WECHAT_URL = import.meta.env.VITE_WECHAT_URL || 'https://www.wechat.com/';
const INSTAGRAM_URL = import.meta.env.VITE_INSTAGRAM_URL || 'https://www.instagram.com/';
const createEmptyProductConfig = () => ({
  orderScope: '',
  selectedFeature: '',
  position: '',
  productType: '',
  adjustmentType: '',
  options: []
});

const sanitizeMessageCell = (value) => String(value ?? '-')
  .replace(/\|/g, '/')
  .replace(/\s*\n+\s*/g, ' ')
  .trim() || '-';

const isSameQuoteItem = (a, b) => (
  a.brand === b.brand
  && a.model === b.model
  && String(a.year) === String(b.year)
  && a.orderScope === b.orderScope
  && a.productType === b.productType
  && a.selectedFeature === b.selectedFeature
  && a.position === b.position
  && a.adjustmentType === b.adjustmentType
  && a.optionsText === b.optionsText
  && a.selectedCatalogKey === b.selectedCatalogKey
);

const VIEW_TO_PATH = {
  home: '/',
  models: '/modeles',
  years: '/annees',
  product: '/produit',
  form: '/demande',
  success: '/demande-envoyee',
  about: '/a-propos',
  contact: '/contact',
  terms: '/conditions-generales-de-vente',
  privacy: '/politique-de-confidentialite',
  dashboard: '/dashboard',
};

function resolveRoute(pathname) {
  const normalized = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
  const categorySlug = normalized.replace(/^\//, '');
  if (categoryContentMap[categorySlug]) {
    return { view: 'category', categorySlug };
  }

  const match = Object.entries(VIEW_TO_PATH).find(([, path]) => path === normalized);
  if (match) return { view: match[0], categorySlug: null };
  return { view: 'home', categorySlug: null };
}

function App() {
  const { language } = useI18n();
  const mainContentRef = useRef(null);
  // State management
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [currentView, setCurrentView] = useState('home'); // 'home', 'models', 'years', 'product', 'form', 'success'
  const [currentCategorySlug, setCurrentCategorySlug] = useState(null);
  const [activeNav, setActiveNav] = useState('home');
  const [showBrandHint, setShowBrandHint] = useState(false);
  const [submission, setSubmission] = useState(null);
  const [productConfig, setProductConfig] = useState(createEmptyProductConfig);
  const [quoteItems, setQuoteItems] = useState([]);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
    consent: false
  });
  const [isHydrated, setIsHydrated] = useState(false);

  const resolveSelectedCatalogKey = (config) => {
    if (config.orderScope === 'complete') return 'COMPLETE';
    if (config.orderScope === 'piece' && config.selectedFeature) return config.selectedFeature;
    return '';
  };

  const buildQuotePayload = (config = productConfig) => {
    const orderScopeLabel = config.orderScope === 'complete' ? 'Retroviseur complet' : 'Piece';
    const optionsText = Array.isArray(config.options) && config.options.length
      ? config.options.join(', ')
      : 'Aucune';

    return {
      brand: selectedBrand?.name || '-',
      model: selectedModel || '-',
      year: selectedYear || '-',
      orderScope: orderScopeLabel,
      productType: config.productType || '-',
      selectedFeature: config.selectedFeature || '-',
      position: config.position || '-',
      adjustmentType: config.adjustmentType || '-',
      optionsText,
      selectedCatalogKey: resolveSelectedCatalogKey(config),
    };
  };

  const openWhatsAppQuote = () => {
    const currentPayload = buildQuotePayload();
    const allRequests = quoteItems.length && isSameQuoteItem(quoteItems[quoteItems.length - 1], currentPayload)
      ? [...quoteItems]
      : [...quoteItems, currentPayload];
    const messageLines = ['Bonjour, je veux une demande de devis.'];

    allRequests.forEach((item, index) => {
      messageLines.push('');
      if (allRequests.length > 1) {
        messageLines.push(`Produit ${index + 1}:`);
      }
      messageLines.push(`Marque: ${sanitizeMessageCell(item.brand)}`);
      messageLines.push(`Modele: ${sanitizeMessageCell(item.model)}`);
      messageLines.push(`Annee: ${sanitizeMessageCell(item.year)}`);
      messageLines.push(`Type de commande: ${sanitizeMessageCell(item.orderScope)}`);
      messageLines.push(`Produit: ${sanitizeMessageCell(item.productType)}`);
      messageLines.push(`Piece: ${sanitizeMessageCell(item.selectedFeature)}`);
      messageLines.push(`Cote: ${sanitizeMessageCell(item.position)}`);
      messageLines.push(`Type de reglage: ${sanitizeMessageCell(item.adjustmentType)}`);
      messageLines.push(`Options: ${sanitizeMessageCell(item.optionsText)}`);
      if (allRequests.length > 1 && index < allRequests.length - 1) {
        messageLines.push('------------------------------');
      }
    });

    const message = encodeURIComponent(messageLines.join('\r\n'));
    setActiveNav('whatsapp');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  const navigateToView = (view, options = {}) => {
    const { categorySlug = null, replace = false } = options;
    const targetPath = view === 'category' ? `/${categorySlug}` : (VIEW_TO_PATH[view] || '/');

    setCurrentView(view);
    setCurrentCategorySlug(categorySlug);

    if (window.location.pathname !== targetPath) {
      window.history[replace ? 'replaceState' : 'pushState']({}, '', targetPath);
    }
  };

  // Reset all selections and return to home
  const resetToHome = () => {
    setSelectedBrand(null);
    setSelectedModel(null);
    setSelectedYear(null);
    navigateToView('home');
    setProductConfig(createEmptyProductConfig());
    setQuoteItems([]);
    setFormData({ fullName: '', email: '', phone: '', message: '', consent: false });
    setActiveNav('home');
    setShowBrandHint(false);
    setSubmission(null);
    try {
      sessionStorage.removeItem(FLOW_STORAGE_KEY);
    } catch {
      // ignore storage errors
    }
  };

  // Handle brand selection
  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    setSelectedModel(null);
    setSelectedYear(null);
    setProductConfig(createEmptyProductConfig());
    navigateToView('models');
    setShowBrandHint(false);
  };

  // Handle model selection
  const handleModelSelect = (model) => {
    setSelectedModel(model);
    setSelectedYear(null);
    setProductConfig(createEmptyProductConfig());
  };

  // Handle year selection
  const handleYearSelect = (year) => {
    setSelectedYear(year);
    navigateToView('product');
  };

  const handleProductConfigChange = (field, value) => {
    setProductConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContinueToForm = () => {
    openWhatsAppQuote();
  };

  const handleContinueShopping = () => {
    const currentPayload = buildQuotePayload();
    setQuoteItems((prev) => {
      const lastItem = prev[prev.length - 1];
      if (lastItem && isSameQuoteItem(lastItem, currentPayload)) {
        return prev;
      }
      return [...prev, currentPayload];
    });
    setProductConfig(createEmptyProductConfig());
    navigateToView('product');
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      brand: selectedBrand?.name,
      model: selectedModel,
      year: selectedYear,
      productConfig,
      ...formData
    };

    let persisted = null;
    try {
      persisted = await createRequest(payload);
    } catch (error) {
      console.error('Supabase insert failed, fallback to local success:', error);
    }

    setSubmission({
      ...payload,
      requestId: persisted?.id || null,
      status: persisted?.status || 'local',
      created_at: persisted?.created_at || null,
    });
    navigateToView('success');
  };

  // Handle WhatsApp click
  const handleWhatsAppClick = () => {
    setActiveNav('whatsapp');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank');
  };

  const handleWeChatClick = () => {
    setActiveNav('wechat');
    window.open(WECHAT_URL, '_blank');
  };

  const handleInstagramClick = () => {
    setActiveNav('instagram');
    window.open(INSTAGRAM_URL, '_blank');
  };

  // Handle Contact click
  const handleContactClick = () => {
    setActiveNav('contact');
    navigateToView('contact');
  };

  const handleStartSelection = () => {
    if (selectedBrand) {
      navigateToView('models');
      return;
    }
    setShowBrandHint(true);
  };

  // Handle menu page navigation
  const handleMenuClick = (page) => {
    if (page === 'home') {
      resetToHome();
    } else if (page === 'about') {
      navigateToView('about');
      setSelectedBrand(null);
      setSelectedModel(null);
      setSelectedYear(null);
    } else if (page === 'contact') {
      navigateToView('contact');
      setSelectedBrand(null);
      setSelectedModel(null);
      setSelectedYear(null);
    } else if (page === 'terms') {
      navigateToView('terms');
      setSelectedBrand(null);
      setSelectedModel(null);
      setSelectedYear(null);
    } else if (page === 'privacy') {
      navigateToView('privacy');
      setSelectedBrand(null);
      setSelectedModel(null);
      setSelectedYear(null);
    } else if (page === 'dashboard') {
      navigateToView('dashboard');
      setSelectedBrand(null);
      setSelectedModel(null);
      setSelectedYear(null);
    }
  };

  const showBrandRail = ['home', 'models', 'years', 'form'].includes(currentView)
    || (currentView === 'product' && !productConfig.orderScope);

  useEffect(() => {
    if (!isHydrated) return;
    if (mainContentRef.current) {
      mainContentRef.current.scrollTop = 0;
    }
    window.scrollTo(0, 0);
  }, [currentView, currentCategorySlug, isHydrated]);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(FLOW_STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved?.brandId) {
          const restoredBrand = mockData.brands.find((brand) => brand.id === saved.brandId) || null;
          setSelectedBrand(restoredBrand);
        }
        if (saved?.model) setSelectedModel(saved.model);
        if (saved?.year) setSelectedYear(Number(saved.year));
        if (saved?.productConfig) setProductConfig(saved.productConfig);
        if (Array.isArray(saved?.quoteItems)) setQuoteItems(saved.quoteItems);
        if (saved?.formData) setFormData(saved.formData);
        if (saved?.submission) setSubmission(saved.submission);
      }
    } catch {
      // ignore storage errors
    }

    const route = resolveRoute(window.location.pathname);
    navigateToView(route.view, { categorySlug: route.categorySlug, replace: true });
    setIsHydrated(true);

    const onPopState = () => {
      const nextRoute = resolveRoute(window.location.pathname);
      navigateToView(nextRoute.view, { categorySlug: nextRoute.categorySlug, replace: true });
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      const payload = {
        brandId: selectedBrand?.id || null,
        model: selectedModel || null,
        year: selectedYear || null,
        productConfig,
        quoteItems,
        formData,
        submission,
      };
      sessionStorage.setItem(FLOW_STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // ignore storage errors
    }
  }, [selectedBrand, selectedModel, selectedYear, productConfig, quoteItems, formData, submission, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;

    if (currentView === 'years') {
      navigateToView('models', { replace: true });
      return;
    }

    // Prevent blank screens after refresh by redirecting to the nearest valid step.
    if (currentView === 'models' && !selectedBrand) {
      navigateToView('home', { replace: true });
      return;
    }

    if (currentView === 'product' && !selectedYear) {
      navigateToView(selectedModel ? 'models' : (selectedBrand ? 'models' : 'home'), { replace: true });
      return;
    }

    if (currentView === 'form' && !selectedYear) {
      navigateToView(selectedModel ? 'models' : (selectedBrand ? 'models' : 'home'), { replace: true });
      return;
    }

    if (currentView === 'success' && !submission) {
      navigateToView('home', { replace: true });
    }
  }, [currentView, selectedBrand, selectedModel, selectedYear, submission, isHydrated]);

  useEffect(() => {
    applySeo(currentView, {
      brand: selectedBrand,
      model: selectedModel,
      year: selectedYear,
      categorySlug: currentCategorySlug,
    });
  }, [currentView, selectedBrand, selectedModel, selectedYear, currentCategorySlug]);

  return (
    <div className={`app ${language === 'ar' ? 'lang-ar' : 'lang-fr'}`}>
      <Header onMenuClick={handleMenuClick} />
      {showBrandRail ? (
        <BrandSelector
          brands={mockData.brands}
          selectedBrand={selectedBrand}
          onSelect={handleBrandSelect}
          disabled={false}
        />
      ) : null}

      <main ref={mainContentRef} className={`main-content${showBrandRail ? '' : ' main-content-full'}`}>
        {currentView === 'home' && <Home onStartSelection={handleStartSelection} showBrandHint={showBrandHint} />}

        {currentView === 'about' && <About />}

        {currentView === 'contact' && <Contact />}

        {currentView === 'terms' && <Terms />}

        {currentView === 'privacy' && <Privacy />}

        {currentView === 'dashboard' && <Dashboard />}

        {(currentView === 'models' || currentView === 'years') && (
          <Models
            brand={selectedBrand}
            models={mockData.models[selectedBrand.id] || []}
            selectedModel={selectedModel}
            years={mockData.years}
            onModelSelect={handleModelSelect}
            onYearSelect={handleYearSelect}
            onBack={() => navigateToView('home')}
          />
        )}

        {currentView === 'form' && (
          <Form
            brand={selectedBrand}
            model={selectedModel}
            year={selectedYear}
            productConfig={productConfig}
            formData={formData}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
            onBack={() => navigateToView('product')}
          />
        )}

        {currentView === 'product' && (
          <Product
            brand={selectedBrand}
            model={selectedModel}
            year={selectedYear}
            productConfig={productConfig}
            quoteItemsCount={quoteItems.length}
            onChange={handleProductConfigChange}
            onContinue={handleContinueToForm}
            onContinueShopping={handleContinueShopping}
          />
        )}

        {currentView === 'category' && (
          <CategoryLanding
            slug={currentCategorySlug}
            onStartSelection={handleStartSelection}
          />
        )}

        {currentView === 'success' && (
          <Success
            submission={submission}
            onNewRequest={resetToHome}
            onWhatsApp={handleWhatsAppClick}
          />
        )}
      </main>

      <BottomNav
        active={activeNav}
        onHome={resetToHome}
        onWhatsApp={handleWhatsAppClick}
        onWeChat={handleWeChatClick}
        onInstagram={handleInstagramClick}
        onContact={handleContactClick}
      />
    </div>
  );
}

export default App;
