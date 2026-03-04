import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import { mockData } from './data/mockData';
import BrandSelector from './components/BrandSelector';
import BottomNav from './components/BottomNav';
import Header from './components/Header';
import Home from './pages/Home';
import Models from './pages/Models';
import Years from './pages/Years';
import Product from './pages/Product';
import Form from './pages/Form';
import Success from './pages/Success';
import About from './pages/About';
import Contact from './pages/Contact';
import CategoryLanding, { categoryContentMap } from './pages/CategoryLanding';
import { applySeo } from './seo';

const VIEW_TO_PATH = {
  home: '/',
  models: '/modeles',
  years: '/annees',
  product: '/produit',
  form: '/demande',
  success: '/demande-envoyee',
  about: '/a-propos',
  contact: '/contact',
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
  const [productConfig, setProductConfig] = useState({
    position: '',
    productType: '',
    adjustmentType: '',
    options: []
  });
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
    consent: false
  });

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
    setProductConfig({
      position: '',
      productType: '',
      adjustmentType: '',
      options: []
    });
    setFormData({ fullName: '', email: '', phone: '', message: '', consent: false });
    setActiveNav('home');
    setShowBrandHint(false);
    setSubmission(null);
  };

  // Handle brand selection
  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    setSelectedModel(null);
    setSelectedYear(null);
    setProductConfig({
      position: '',
      productType: '',
      adjustmentType: '',
      options: []
    });
    navigateToView('models');
    setShowBrandHint(false);
  };

  // Handle model selection
  const handleModelSelect = (model) => {
    setSelectedModel(model);
    setSelectedYear(null);
    setProductConfig({
      position: '',
      productType: '',
      adjustmentType: '',
      options: []
    });
    navigateToView('years');
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
    navigateToView('form');
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
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      brand: selectedBrand?.name,
      model: selectedModel,
      year: selectedYear,
      productConfig,
      ...formData
    };

    console.log('Formulaire envoye :', payload);
    setSubmission(payload);
    navigateToView('success');
  };

  // Handle WhatsApp click
  const handleWhatsAppClick = () => {
    setActiveNav('whatsapp');
    // Mock WhatsApp link
    window.open('https://wa.me/1234567890', '_blank');
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
    }
  };

  const showBrandRail = ['home', 'models', 'years', 'product', 'form'].includes(currentView);

  useEffect(() => {
    if (mainContentRef.current) {
      mainContentRef.current.scrollTop = 0;
    }
    window.scrollTo(0, 0);
  }, [currentView, currentCategorySlug]);

  useEffect(() => {
    const applyFromPath = (replace = false) => {
      const route = resolveRoute(window.location.pathname);
      navigateToView(route.view, { categorySlug: route.categorySlug, replace });
    };

    applyFromPath(true);
    const onPopState = () => applyFromPath(true);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    applySeo(currentView, {
      brand: selectedBrand,
      model: selectedModel,
      year: selectedYear,
      categorySlug: currentCategorySlug,
    });
  }, [currentView, selectedBrand, selectedModel, selectedYear, currentCategorySlug]);

  return (
    <div className="app">
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

        {currentView === 'models' && (
          <Models
            brand={selectedBrand}
            models={mockData.models[selectedBrand.id] || []}
            onModelSelect={handleModelSelect}
            onBack={() => navigateToView('home')}
          />
        )}

        {currentView === 'years' && (
          <Years model={selectedModel} years={mockData.years} onYearSelect={handleYearSelect} onBack={() => navigateToView('models')} />
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
            onChange={handleProductConfigChange}
            onContinue={handleContinueToForm}
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

      <BottomNav active={activeNav} onHome={resetToHome} onWhatsApp={handleWhatsAppClick} onContact={handleContactClick} />
    </div>
  );
}

export default App;
