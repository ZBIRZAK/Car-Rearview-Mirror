import React, { useState } from 'react';
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

function App() {
  // State management
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [currentView, setCurrentView] = useState('home'); // 'home', 'models', 'years', 'product', 'form', 'success'
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

  // Reset all selections and return to home
  const resetToHome = () => {
    setSelectedBrand(null);
    setSelectedModel(null);
    setSelectedYear(null);
    setCurrentView('home');
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
    setCurrentView('models');
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
    setCurrentView('years');
  };

  // Handle year selection
  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setCurrentView('product');
  };

  const handleProductConfigChange = (field, value) => {
    setProductConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContinueToForm = () => {
    setCurrentView('form');
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
    setCurrentView('success');
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
    setCurrentView('contact');
  };

  const handleStartSelection = () => {
    if (selectedBrand) {
      setCurrentView('models');
      return;
    }
    setShowBrandHint(true);
  };

  // Handle menu page navigation
  const handleMenuClick = (page) => {
    if (page === 'home') {
      resetToHome();
    } else if (page === 'about') {
      setCurrentView('about');
      setSelectedBrand(null);
      setSelectedModel(null);
      setSelectedYear(null);
    } else if (page === 'contact') {
      setCurrentView('contact');
      setSelectedBrand(null);
      setSelectedModel(null);
      setSelectedYear(null);
    }
  };

  const showBrandRail = ['home', 'models', 'years', 'product', 'form'].includes(currentView);

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

      <div className={`main-content${showBrandRail ? '' : ' main-content-full'}`}>
        {currentView === 'home' && <Home onStartSelection={handleStartSelection} showBrandHint={showBrandHint} />}

        {currentView === 'about' && <About />}

        {currentView === 'contact' && <Contact />}

        {currentView === 'models' && (
          <Models
            brand={selectedBrand}
            models={mockData.models[selectedBrand.id] || []}
            onModelSelect={handleModelSelect}
            onBack={() => setCurrentView('home')}
          />
        )}

        {currentView === 'years' && (
          <Years model={selectedModel} years={mockData.years} onYearSelect={handleYearSelect} onBack={() => setCurrentView('models')} />
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
            onBack={() => setCurrentView('product')}
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

        {currentView === 'success' && (
          <Success
            submission={submission}
            onNewRequest={resetToHome}
            onWhatsApp={handleWhatsAppClick}
          />
        )}
      </div>

      <BottomNav active={activeNav} onHome={resetToHome} onWhatsApp={handleWhatsAppClick} onContact={handleContactClick} />
    </div>
  );
}

export default App;
