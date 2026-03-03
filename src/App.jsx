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
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  // State management
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [currentView, setCurrentView] = useState('home'); // 'home', 'models', 'years', 'product', 'form'
  const [activeNav, setActiveNav] = useState('home');
  const [productConfig, setProductConfig] = useState({
    position: '',
    productType: '',
    adjustmentType: '',
    options: []
  });
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: ''
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
    setFormData({ fullName: '', email: '', phone: '' });
    setActiveNav('home');
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
    if (!productConfig.position || !productConfig.productType || !productConfig.adjustmentType) {
      alert('Please select Position, Product Type, and Adjustment Type');
      return;
    }
    setCurrentView('form');
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert('Please fill in all fields');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    // Phone validation (simple)
    const phoneRegex = /^[0-9+\-\s()]+$/;
    if (!phoneRegex.test(formData.phone)) {
      alert('Please enter a valid phone number');
      return;
    }
    
    // Mock submission - log to console
    console.log('Form submitted:', {
      brand: selectedBrand?.name,
      model: selectedModel,
      year: selectedYear,
      productConfig,
      ...formData
    });
    
    alert('Thank you for your inquiry! We will contact you soon.');
    resetToHome();
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
    alert('Contact us:\nEmail: info@carrearviewmirrors.com\nPhone: +1 (555) 123-4567');
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

  return (
    <div className="app">
      <Header onMenuClick={handleMenuClick} />
      <BrandSelector
        brands={mockData.brands}
        selectedBrand={selectedBrand}
        onSelect={handleBrandSelect}
        disabled={false}
      />

      <div className="main-content">
        {currentView === 'home' && <Home />}

        {currentView === 'about' && <About />}

        {currentView === 'contact' && <Contact />}

        {currentView === 'models' && (
          <Models brand={selectedBrand} models={mockData.models[selectedBrand.id] || []} onModelSelect={handleModelSelect} />
        )}

        {currentView === 'years' && (
          <Years model={selectedModel} years={mockData.years} onYearSelect={handleYearSelect} />
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
      </div>

      <BottomNav active={activeNav} onHome={resetToHome} onWhatsApp={handleWhatsAppClick} onContact={handleContactClick} />
    </div>
  );
}

export default App;
