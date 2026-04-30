import React, { useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import { mockData } from './data/mockData';
import Header from './components/Header';
import RightSidebar from './components/RightSidebar';
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
import { fetchCatalogSnapshot } from './lib/catalogApi';
import { fetchProductAdminConfig } from './lib/productConfigApi';
import { DEFAULT_PRODUCT_ADMIN_CONFIG } from './config/productAdminConfig';
import { DEFAULT_HOME_CONTENT, normalizeHomeContent } from './config/homeContentDefaults';
import { fetchAppSetting } from './lib/appSettingsApi';
import { completeTypeLabel, productCatalogCards } from './pages/product/constants';
import {
  getSupabaseSession,
  hasSupabaseConfig,
  onSupabaseAuthStateChange,
  signInWithEmailPassword,
  signOutSupabase,
} from './lib/supabaseClient';

const FLOW_STORAGE_KEY = 'crm_flow_state_v1';
const WHATSAPP_NUMBER = String(import.meta.env.VITE_WHATSAPP_NUMBER || '1234567890').replace(/\D/g, '');
const WECHAT_URL = import.meta.env.VITE_WECHAT_URL || 'https://www.wechat.com/';
const INSTAGRAM_URL = import.meta.env.VITE_INSTAGRAM_URL || 'https://www.instagram.com/';
const POSITION_ORDER = ['Cote conducteur', 'Cote passager'];
const createEmptyProductConfig = () => ({
  orderScope: '',
  selectedFeature: '',
  position: [],
  productType: '',
  adjustmentType: '',
  options: []
});

const normalizePositions = (value) => {
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item || '').trim())
      .filter((item) => POSITION_ORDER.includes(item));
  }
  const single = String(value || '').trim();
  if (!single) return [];
  return POSITION_ORDER.includes(single) ? [single] : [];
};

const positionsToText = (value) => {
  const positions = normalizePositions(value);
  return positions.length ? positions.join(' + ') : '-';
};

function createFallbackCatalog() {
  const yearsByBrandModel = {};
  Object.entries(mockData.models).forEach(([brandId, modelList]) => {
    yearsByBrandModel[brandId] = {};
    modelList.forEach((modelName) => {
      yearsByBrandModel[brandId][modelName] = [...mockData.years];
    });
  });
  return {
    brands: mockData.brands,
    modelsByBrand: mockData.models,
    yearsByBrandModel,
  };
}

function createCatalogFromSnapshot(snapshot, fallbackYears = mockData.years) {
  const modelsByBrand = {};
  const yearsByBrandModel = {};
  const modelKeyById = {};

  (snapshot.brands || []).forEach((brand) => {
    const brandId = String(brand.id);
    modelsByBrand[brandId] = [];
    yearsByBrandModel[brandId] = {};
  });

  (snapshot.models || []).forEach((model) => {
    const brandId = String(model.brand_id);
    const modelName = model.name;
    if (!modelsByBrand[brandId]) modelsByBrand[brandId] = [];
    if (!yearsByBrandModel[brandId]) yearsByBrandModel[brandId] = {};
    if (!modelsByBrand[brandId].includes(modelName)) {
      modelsByBrand[brandId].push(modelName);
    }
    yearsByBrandModel[brandId][modelName] = [];
    modelKeyById[model.id] = { brandId, modelName };
  });

  (snapshot.years || []).forEach((row) => {
    const target = modelKeyById[row.model_id];
    if (!target) return;
    const currentYears = yearsByBrandModel[target.brandId][target.modelName] || [];
    yearsByBrandModel[target.brandId][target.modelName] = [...currentYears, row.year];
  });

  Object.keys(modelsByBrand).forEach((brandId) => {
    modelsByBrand[brandId].forEach((modelName) => {
      const years = yearsByBrandModel[brandId][modelName] || [];
      yearsByBrandModel[brandId][modelName] = years.length ? years : [...fallbackYears];
    });
  });

  return {
    brands: (snapshot.brands || []).map((brand) => ({
      id: String(brand.id),
      name: brand.name,
      icon: brand.logo_url || String(brand.name || '?').slice(0, 1).toUpperCase(),
      isImage: Boolean(brand.logo_url),
    })),
    modelsByBrand,
    yearsByBrandModel,
  };
}

const sanitizeMessageCell = (value) => String(value ?? '-')
  .replace(/\|/g, '/')
  .replace(/\s*\n+\s*/g, ' ')
  .trim() || '-';

const parseOrderScopeForRequest = (value) => {
  const normalized = String(value || '').toLowerCase();
  return normalized.includes('complet') ? 'complete' : 'piece';
};

const parsePositionsForRequest = (value) => String(value || '')
  .split('+')
  .map((item) => item.trim())
  .filter((item) => POSITION_ORDER.includes(item));

const parseOptionsForRequest = (value) => {
  const normalized = String(value || '').trim();
  if (!normalized || normalized === '-' || normalized.toLowerCase() === 'aucune') return [];
  return normalized.split(',').map((item) => item.trim()).filter(Boolean);
};

const isSameQuoteItem = (a, b) => (
  a.brand === b.brand
  && a.model === b.model
  && String(a.year) === String(b.year)
  && a.orderScope === b.orderScope
  && a.productType === b.productType
  && a.selectedFeature === b.selectedFeature
  && positionsToText(a.position) === positionsToText(b.position)
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

function resolveRoute(pathname, search = '') {
  const normalized = pathname.endsWith('/') && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
  const categorySlug = normalized.replace(/^\//, '');
  if (categoryContentMap[categorySlug]) {
    return { view: 'category', categorySlug, productParams: null, queryString: '' };
  }

  const match = Object.entries(VIEW_TO_PATH).find(([, path]) => path === normalized);
  if (match) {
    const view = match[0];
    if (view === 'product') {
      const params = new URLSearchParams(search || '');
      const year = Number(params.get('year'));
      return {
        view,
        categorySlug: null,
        queryString: params.toString(),
        productParams: {
          brandId: params.get('brand') || null,
          model: params.get('model') || null,
          year: Number.isFinite(year) ? year : null,
          productKey: params.get('product') || null,
        },
      };
    }
    return { view, categorySlug: null, productParams: null, queryString: '' };
  }
  return { view: 'home', categorySlug: null, productParams: null, queryString: '' };
}

function App() {
  const { language, t } = useI18n();
  const mainContentRef = useRef(null);
  const fallbackCatalog = useRef(createFallbackCatalog()).current;
  // State management
  const [catalogData, setCatalogData] = useState(
    hasSupabaseConfig
      ? { brands: [], modelsByBrand: {}, yearsByBrandModel: {} }
      : fallbackCatalog
  );
  const [selectedBrandId, setSelectedBrandId] = useState(null);
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
  const [catalogResolved, setCatalogResolved] = useState(false);
  const [catalogLoading, setCatalogLoading] = useState(hasSupabaseConfig);
  const [homeContent, setHomeContent] = useState(DEFAULT_HOME_CONTENT);
  const [productAdminConfig, setProductAdminConfig] = useState(null);
  const [productAdminConfigLoading, setProductAdminConfigLoading] = useState(false);
  const [productAdminConfigScopeKey, setProductAdminConfigScopeKey] = useState('');
  const [adminSession, setAdminSession] = useState(null);
  const [adminAuthLoading, setAdminAuthLoading] = useState(hasSupabaseConfig);
  const [pendingProductRouteParams, setPendingProductRouteParams] = useState(null);
  const [menuToggleSignal, setMenuToggleSignal] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const productConfigCacheRef = useRef({});

  const selectedBrand = useMemo(
    () => catalogData.brands.find((brand) => String(brand.id) === String(selectedBrandId)) || null,
    [catalogData.brands, selectedBrandId]
  );

  const availableModels = useMemo(() => {
    if (!selectedBrandId) return [];
    return catalogData.modelsByBrand[String(selectedBrandId)] || [];
  }, [catalogData.modelsByBrand, selectedBrandId]);

  const availableYears = useMemo(() => {
    if (!selectedBrandId) return [];
    const yearMap = catalogData.yearsByBrandModel[String(selectedBrandId)] || {};
    if (selectedModel) return yearMap[selectedModel] || [];
    return Array.from(new Set(Object.values(yearMap).flat().map((year) => Number(year))))
      .filter((year) => Number.isFinite(year))
      .sort((a, b) => b - a);
  }, [catalogData.yearsByBrandModel, selectedBrandId, selectedModel]);

  const currentProductScopeKey = useMemo(() => {
    if (!selectedBrandId || !selectedModel || !selectedYear) return '';
    return `${selectedBrandId}__${selectedModel}__${selectedYear}`;
  }, [selectedBrandId, selectedModel, selectedYear]);

  const hasScopedProductConfig = Boolean(
    currentProductScopeKey && productAdminConfigScopeKey === currentProductScopeKey
  );

  const effectiveProductAdminConfig = hasScopedProductConfig
    ? productAdminConfig
    : DEFAULT_PRODUCT_ADMIN_CONFIG;

  const effectiveProductAdminConfigLoading = hasScopedProductConfig
    ? productAdminConfigLoading
    : Boolean(currentProductScopeKey);

  const resolveSelectedCatalogKey = (config) => {
    if (config.orderScope === 'complete') return config.selectedFeature || 'COMPLETE';
    if (config.orderScope === 'piece' && config.selectedFeature) return config.selectedFeature;
    return '';
  };

  const buildProductQueryString = (overrides = {}) => {
    const brandId = overrides.brandId ?? selectedBrandId;
    const model = overrides.model ?? selectedModel;
    const year = overrides.year ?? selectedYear;
    const config = overrides.productConfig ?? productConfig;
    const params = new URLSearchParams();
    if (brandId) params.set('brand', String(brandId));
    if (model) params.set('model', model);
    if (year) params.set('year', String(year));
    const selectedKey = resolveSelectedCatalogKey(config || createEmptyProductConfig());
    if (selectedKey) params.set('product', selectedKey);
    return params.toString();
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
      position: positionsToText(config.position),
      adjustmentType: config.adjustmentType || '-',
      optionsText,
      selectedCatalogKey: resolveSelectedCatalogKey(config),
    };
  };

  const toRequestPayloadFromQuoteItem = (item) => {
    const parsedYear = Number(item.year);
    return {
      brand: item.brand === '-' ? null : item.brand,
      model: item.model === '-' ? null : item.model,
      year: Number.isFinite(parsedYear) ? parsedYear : null,
      productConfig: {
        orderScope: parseOrderScopeForRequest(item.orderScope),
        selectedFeature: item.selectedFeature === '-' ? '' : item.selectedFeature,
        position: parsePositionsForRequest(item.position),
        productType: item.productType === '-' ? '' : item.productType,
        adjustmentType: item.adjustmentType === '-' ? '' : item.adjustmentType,
        options: parseOptionsForRequest(item.optionsText),
      },
      fullName: null,
      email: null,
      phone: null,
      message: 'Demande envoyee via WhatsApp',
    };
  };

  const openWhatsAppQuote = async () => {
    const currentPayload = buildQuotePayload();
    const allRequests = quoteItems.length && isSameQuoteItem(quoteItems[quoteItems.length - 1], currentPayload)
      ? [...quoteItems]
      : [...quoteItems, currentPayload];
    const messageLines = [t('whatsapp_quote_intro', 'Bonjour, je veux une demande de devis.')];

    allRequests.forEach((item, index) => {
      messageLines.push('');
      if (allRequests.length > 1) {
        messageLines.push(t('whatsapp_product_n', 'Produit {n}:').replace('{n}', String(index + 1)));
      }
      messageLines.push(`${t('whatsapp_label_brand', 'Marque')}: ${sanitizeMessageCell(item.brand)}`);
      messageLines.push(`${t('whatsapp_label_model', 'Modele')}: ${sanitizeMessageCell(item.model)}`);
      messageLines.push(`${t('whatsapp_label_year', 'Annee')}: ${sanitizeMessageCell(item.year)}`);
      messageLines.push(`${t('whatsapp_label_order_type', 'Type de commande')}: ${sanitizeMessageCell(item.orderScope)}`);
      messageLines.push(`${t('whatsapp_label_product', 'Produit')}: ${sanitizeMessageCell(item.productType)}`);
      messageLines.push(`${t('whatsapp_label_piece', 'Piece')}: ${sanitizeMessageCell(item.selectedFeature)}`);
      messageLines.push(`${t('whatsapp_label_side', 'Cote')}: ${sanitizeMessageCell(item.position)}`);
      messageLines.push(`${t('whatsapp_label_adjustment', 'Type de reglage')}: ${sanitizeMessageCell(item.adjustmentType)}`);
      messageLines.push(`${t('whatsapp_label_options', 'Options')}: ${sanitizeMessageCell(item.optionsText)}`);
      if (allRequests.length > 1 && index < allRequests.length - 1) {
        messageLines.push('------------------------------');
      }
    });

    const message = encodeURIComponent(messageLines.join('\r\n'));
    setActiveNav('whatsapp');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');

    if (hasSupabaseConfig) {
      try {
        await Promise.allSettled(
          allRequests.map((item) => createRequest(toRequestPayloadFromQuoteItem(item)))
        );
      } catch (error) {
        console.error('Failed to mirror WhatsApp requests into Supabase:', error);
      }
    }

    // Start a fresh quote after sending so old items are not mixed into next request.
    setQuoteItems([]);
    setProductConfig(createEmptyProductConfig());
  };

  const navigateToView = (view, options = {}) => {
    const { categorySlug = null, replace = false, queryString = '' } = options;
    const basePath = view === 'category' ? `/${categorySlug}` : (VIEW_TO_PATH[view] || '/');
    const targetPath = queryString ? `${basePath}?${queryString}` : basePath;

    setCurrentView(view);
    setCurrentCategorySlug(categorySlug);

    if (`${window.location.pathname}${window.location.search}` !== targetPath) {
      window.history[replace ? 'replaceState' : 'pushState']({}, '', targetPath);
    }
  };

  // Reset all selections and return to home
  const resetToHome = () => {
    setSelectedBrandId(null);
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
    setSelectedBrandId(String(brand.id));
    setSelectedModel(null);
    setSelectedYear(null);
    setProductConfig(createEmptyProductConfig());
    setProductAdminConfig(DEFAULT_PRODUCT_ADMIN_CONFIG);
    setProductAdminConfigScopeKey('');
    setProductAdminConfigLoading(false);
    navigateToView('models');
    setShowBrandHint(false);
  };

  // Handle model selection
  const handleModelSelect = (model) => {
    setSelectedModel(model);
    setSelectedYear(null);
    setProductConfig(createEmptyProductConfig());
    setProductAdminConfig(DEFAULT_PRODUCT_ADMIN_CONFIG);
    setProductAdminConfigScopeKey('');
    setProductAdminConfigLoading(false);
  };

  // Handle year selection
  const handleYearSelect = (year) => {
    const nextConfig = createEmptyProductConfig();
    setProductConfig(nextConfig);
    setProductAdminConfig(DEFAULT_PRODUCT_ADMIN_CONFIG);
    setProductAdminConfigScopeKey('');
    setProductAdminConfigLoading(true);
    setSelectedYear(year);
    navigateToView('product', {
      queryString: buildProductQueryString({ year, productConfig: nextConfig }),
    });
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
    setQuoteItems((prev) => [...prev, currentPayload]);
    const nextConfig = createEmptyProductConfig();
    setProductConfig(nextConfig);
    navigateToView('product', {
      queryString: buildProductQueryString({ productConfig: nextConfig }),
    });
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
    if (selectedBrandId) {
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
      setSelectedBrandId(null);
      setSelectedModel(null);
      setSelectedYear(null);
    } else if (page === 'contact') {
      navigateToView('contact');
      setSelectedBrandId(null);
      setSelectedModel(null);
      setSelectedYear(null);
    } else if (page === 'terms') {
      navigateToView('terms');
      setSelectedBrandId(null);
      setSelectedModel(null);
      setSelectedYear(null);
    } else if (page === 'privacy') {
      navigateToView('privacy');
      setSelectedBrandId(null);
      setSelectedModel(null);
      setSelectedYear(null);
    } else if (page === 'dashboard') {
      navigateToView('dashboard');
      setSelectedBrandId(null);
      setSelectedModel(null);
      setSelectedYear(null);
    }
  };

  const handleAdminLogin = async (email, password) => {
    await signInWithEmailPassword(email, password);
  };

  const handleAdminLogout = async () => {
    await signOutSupabase();
  };

  const handleHeaderProductBack = () => {
    if (currentView === 'product' && !productConfig.orderScope) {
      navigateToView('models');
      return;
    }
    setProductConfig(createEmptyProductConfig());
  };

  const handleSidebarMenuOpen = () => {
    setMenuToggleSignal((prev) => prev + 1);
  };

  const handleSidebarCartOpen = () => {
    if (selectedBrandId && selectedModel && selectedYear) {
      navigateToView('product', {
        queryString: buildProductQueryString(),
      });
      return;
    }
    if (selectedBrandId) {
      navigateToView('models');
      return;
    }
    navigateToView('home');
  };

  const showHeaderProductBack = currentView === 'product';
  const productHeaderTitle = currentView === 'product'
    ? [selectedBrand?.name, selectedModel, selectedYear].filter(Boolean).join('-')
    : '';
  const isSingleProductSelection = currentView === 'product' && Boolean(productConfig.orderScope);

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
          setSelectedBrandId(String(saved.brandId));
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

    const route = resolveRoute(window.location.pathname, window.location.search);
    if (route.view === 'product' && route.productParams) {
      setPendingProductRouteParams(route.productParams);
    }
    navigateToView(route.view, {
      categorySlug: route.categorySlug,
      queryString: route.queryString,
      replace: true,
    });
    setIsHydrated(true);

    const onPopState = () => {
      const nextRoute = resolveRoute(window.location.pathname, window.location.search);
      if (nextRoute.view === 'product' && nextRoute.productParams) {
        setPendingProductRouteParams(nextRoute.productParams);
      }
      navigateToView(nextRoute.view, {
        categorySlug: nextRoute.categorySlug,
        queryString: nextRoute.queryString,
        replace: true,
      });
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    if (!catalogResolved || !pendingProductRouteParams) return;

    const { brandId, model, year, productKey } = pendingProductRouteParams;
    if (brandId) setSelectedBrandId(String(brandId));
    if (model) setSelectedModel(model);
    if (year) setSelectedYear(Number(year));

    if (productKey === 'COMPLETE') {
      setProductConfig({
        ...createEmptyProductConfig(),
        orderScope: 'complete',
        productType: completeTypeLabel,
      });
    } else if (productKey) {
      const selectedCatalog = productCatalogCards.find((item) => item.key === productKey);
      if (selectedCatalog) {
        setProductConfig({
          ...createEmptyProductConfig(),
          orderScope: 'piece',
          selectedFeature: productKey,
          productType: selectedCatalog.pieceType || selectedCatalog.label || productKey,
        });
      } else {
        setProductConfig(createEmptyProductConfig());
      }
    } else {
      setProductConfig(createEmptyProductConfig());
    }

    setPendingProductRouteParams(null);
  }, [catalogResolved, pendingProductRouteParams]);

  useEffect(() => {
    if (!isHydrated || currentView !== 'product' || !selectedYear) return;
    const queryString = buildProductQueryString();
    const targetPath = queryString ? `${VIEW_TO_PATH.product}?${queryString}` : VIEW_TO_PATH.product;
    const currentPath = `${window.location.pathname}${window.location.search}`;
    if (currentPath !== targetPath) {
      window.history.replaceState({}, '', targetPath);
    }
  }, [
    isHydrated,
    currentView,
    selectedBrandId,
    selectedModel,
    selectedYear,
    productConfig.orderScope,
    productConfig.selectedFeature,
  ]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      const payload = {
        brandId: selectedBrandId || null,
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
  }, [selectedBrandId, selectedModel, selectedYear, productConfig, quoteItems, formData, submission, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;

    if (currentView === 'years') {
      navigateToView('models', { replace: true });
      return;
    }

    // Prevent blank screens after refresh by redirecting to the nearest valid step.
    if (currentView === 'models' && !selectedBrandId) {
      navigateToView('home', { replace: true });
      return;
    }

    if (currentView === 'product' && !selectedYear) {
      navigateToView(selectedModel ? 'models' : (selectedBrandId ? 'models' : 'home'), { replace: true });
      return;
    }

    if (currentView === 'form' && !selectedYear) {
      navigateToView(selectedModel ? 'models' : (selectedBrandId ? 'models' : 'home'), { replace: true });
      return;
    }

    if (currentView === 'success' && !submission) {
      navigateToView('home', { replace: true });
    }
  }, [currentView, selectedBrandId, selectedModel, selectedYear, submission, isHydrated]);

  useEffect(() => {
    let active = true;
    if (!hasSupabaseConfig) {
      setAdminAuthLoading(false);
      return undefined;
    }
    const loadSession = async () => {
      try {
        const session = await getSupabaseSession();
        if (active) setAdminSession(session);
      } finally {
        if (active) setAdminAuthLoading(false);
      }
    };
    loadSession();
    const unsubscribe = onSupabaseAuthStateChange((session) => {
      if (!active) return;
      setAdminSession(session);
      setAdminAuthLoading(false);
    });
    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    const loadHomeContent = async () => {
      if (!hasSupabaseConfig) {
        setHomeContent(DEFAULT_HOME_CONTENT);
        return;
      }
      try {
        const stored = await fetchAppSetting('home_content');
        if (cancelled) return;
        setHomeContent(normalizeHomeContent(stored));
      } catch {
        if (!cancelled) setHomeContent(DEFAULT_HOME_CONTENT);
      }
    };
    loadHomeContent();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (currentView !== 'home' || !hasSupabaseConfig) return;
    let cancelled = false;
    const refreshHomeContent = async () => {
      try {
        const stored = await fetchAppSetting('home_content');
        if (!cancelled) setHomeContent(normalizeHomeContent(stored));
      } catch {
        // Keep current state if refresh fails.
      }
    };
    refreshHomeContent();
    return () => {
      cancelled = true;
    };
  }, [currentView]);

  useEffect(() => {
    let cancelled = false;
    const loadCatalog = async () => {
      if (hasSupabaseConfig) setCatalogLoading(true);
      try {
        const snapshot = await fetchCatalogSnapshot();
        if (cancelled) return;
        const mapped = createCatalogFromSnapshot(snapshot);
        if (mapped.brands.length) setCatalogData(mapped);
      } catch {
        // Keep fallback catalog when Supabase catalog is unavailable.
        if (!cancelled) setCatalogData(fallbackCatalog);
      } finally {
        if (!cancelled) {
          setCatalogResolved(true);
          setCatalogLoading(false);
        }
      }
    };
    loadCatalog();
    return () => { cancelled = true; };
  }, [fallbackCatalog]);

  useEffect(() => {
    let cancelled = false;
    const loadProductConfig = async () => {
      if (!selectedBrandId || !selectedModel || !selectedYear) {
        setProductAdminConfig(DEFAULT_PRODUCT_ADMIN_CONFIG);
        setProductAdminConfigScopeKey('');
        setProductAdminConfigLoading(false);
        return;
      }
      const scopeKey = `${selectedBrandId}__${selectedModel}__${selectedYear}`;
      const cachedConfig = productConfigCacheRef.current[scopeKey];
      if (cachedConfig) {
        setProductAdminConfig(cachedConfig);
        setProductAdminConfigScopeKey(scopeKey);
        setProductAdminConfigLoading(false);
      } else {
        // Clear previous scope config immediately to avoid showing stale products
        // while loading the new year/model/brand config.
        setProductAdminConfig(DEFAULT_PRODUCT_ADMIN_CONFIG);
        setProductAdminConfigScopeKey('');
        setProductAdminConfigLoading(true);
      }
      try {
        const config = await fetchProductAdminConfig({
          brandId: selectedBrandId,
          model: selectedModel,
          year: selectedYear,
        });
        if (!cancelled && config) {
          setProductAdminConfig(config);
          setProductAdminConfigScopeKey(scopeKey);
          productConfigCacheRef.current[scopeKey] = config;
        }
      } catch {
        if (!cancelled) {
          const fallback = cachedConfig || DEFAULT_PRODUCT_ADMIN_CONFIG;
          setProductAdminConfig(fallback);
          setProductAdminConfigScopeKey(scopeKey);
          productConfigCacheRef.current[scopeKey] = fallback;
        }
      } finally {
        if (!cancelled) setProductAdminConfigLoading(false);
      }
    };
    loadProductConfig();
    return () => {
      cancelled = true;
    };
  }, [selectedBrandId, selectedModel, selectedYear]);

  useEffect(() => {
    if (!catalogResolved) return;
    if (!selectedBrandId) return;
    const brandExists = catalogData.brands.some((brand) => String(brand.id) === String(selectedBrandId));
    if (!brandExists) {
      setSelectedBrandId(null);
      setSelectedModel(null);
      setSelectedYear(null);
    }
  }, [catalogData.brands, selectedBrandId, catalogResolved]);

  useEffect(() => {
    if (!catalogResolved) return;
    if (!selectedModel) return;
    if (!availableModels.includes(selectedModel)) {
      setSelectedModel(null);
      setSelectedYear(null);
    }
  }, [availableModels, selectedModel, catalogResolved]);

  useEffect(() => {
    if (!catalogResolved) return;
    if (!selectedYear) return;
    if (!availableYears.includes(selectedYear)) {
      setSelectedYear(null);
    }
  }, [availableYears, selectedYear, catalogResolved]);

  useEffect(() => {
    applySeo(currentView, {
      brand: selectedBrand,
      model: selectedModel,
      year: selectedYear,
      categorySlug: currentCategorySlug,
    });
  }, [currentView, selectedBrand, selectedModel, selectedYear, currentCategorySlug]);

  return (
    <div className={`app ${language === 'ar' ? 'lang-ar' : 'lang-fr'}${isSingleProductSelection ? ' single-product-nav-offset' : ''}`}>
      <Header
        onMenuClick={handleMenuClick}
        showProductBack={showHeaderProductBack}
        onProductBack={handleHeaderProductBack}
        productHeaderTitle={productHeaderTitle}
        menuToggleSignal={menuToggleSignal}
        onMenuOpenChange={setIsMenuOpen}
      />
      <RightSidebar
        brands={catalogData.brands}
        selectedBrand={selectedBrand}
        onBrandSelect={handleBrandSelect}
        onMenu={handleSidebarMenuOpen}
        menuOpen={isMenuOpen}
        onCart={handleSidebarCartOpen}
        onHome={resetToHome}
        onWhatsApp={handleWhatsAppClick}
        onWeChat={handleWeChatClick}
        onInstagram={handleInstagramClick}
        onContact={handleContactClick}
        cartCount={quoteItems.length}
        disabled={catalogLoading}
      />

      <main ref={mainContentRef} className="main-content">
        {catalogLoading && (currentView === 'home' || currentView === 'models' || currentView === 'years') ? (
          <div className="loading-card">{t('catalog_loading', 'Chargement du catalogue...')}</div>
        ) : null}

        {currentView === 'home' && (
          <Home
            onStartSelection={handleStartSelection}
            showBrandHint={showBrandHint}
            homeContent={homeContent}
          />
        )}

        {currentView === 'about' && <About />}

        {currentView === 'contact' && <Contact />}

        {currentView === 'terms' && <Terms />}

        {currentView === 'privacy' && <Privacy />}

        {currentView === 'dashboard' && (
          <Dashboard
            isAdminAuthenticated={Boolean(adminSession?.user)}
            authLoading={adminAuthLoading}
            adminUserEmail={adminSession?.user?.email || ''}
            onAdminLogin={handleAdminLogin}
            onAdminLogout={handleAdminLogout}
          />
        )}

        {(currentView === 'models' || currentView === 'years') && (
          <Models
            brand={selectedBrand}
            models={availableModels}
            selectedModel={selectedModel}
            years={availableYears}
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
            key={`${selectedBrandId || ''}__${selectedModel || ''}__${selectedYear || ''}`}
            brand={selectedBrand}
            model={selectedModel}
            year={selectedYear}
            productConfig={productConfig}
            productAdminConfig={effectiveProductAdminConfig}
            productConfigLoading={effectiveProductAdminConfigLoading}
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

        {(currentView === 'home' || currentView === 'about') && (
          <footer className="app-footer" aria-label={t('footer_label', 'Pied de page')}>
            <div className="app-footer-links">
              <button type="button" className="app-footer-link" onClick={() => handleMenuClick('home')}>
                {t('nav_home', 'Accueil')}
              </button>
              <button type="button" className="app-footer-link" onClick={() => handleMenuClick('about')}>
                {t('nav_about', 'A propos')}
              </button>
              <button type="button" className="app-footer-link" onClick={() => handleMenuClick('contact')}>
                {t('nav_contact', 'Contact')}
              </button>
              <button type="button" className="app-footer-link" onClick={() => handleMenuClick('terms')}>
                {t('nav_terms', 'CGV')}
              </button>
            </div>
            <p className="app-footer-copy">{t('footer_copy', 'Tous droits reserves.')}</p>
          </footer>
        )}
      </main>

    </div>
  );
}

export default App;
