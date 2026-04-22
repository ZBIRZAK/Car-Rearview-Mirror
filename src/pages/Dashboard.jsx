import React, { useEffect, useMemo, useState } from 'react';
import { fetchRequests, updateRequestStatus } from '../lib/requestsApi';
import {
  createCatalogBrand,
  createCatalogModel,
  createCatalogYear,
  deleteCatalogBrand,
  deleteCatalogModel,
  deleteCatalogYear,
  fetchCatalogBrands,
  fetchCatalogModels,
  fetchCatalogYears,
} from '../lib/catalogApi';
import { fetchProductAdminConfig, saveProductAdminConfig } from '../lib/productConfigApi';
import { COMPLETE_OPTION_DEFS, DEFAULT_CATALOG_PRODUCTS, DEFAULT_PRODUCT_ADMIN_CONFIG, PIECE_OPTION_DEFS } from '../config/productAdminConfig';
import { hasSupabaseConfig } from '../lib/supabaseClient';
import { mockData } from '../data/mockData';
import { DEFAULT_HOME_CONTENT, normalizeHomeContent } from '../config/homeContentDefaults';
import { fetchAppSetting, saveAppSetting } from '../lib/appSettingsApi';
import glaceOptionIcon from '../images/new-icones/Glace.png';
import sousEclairageOptionIcon from '../images/new-icones/Sous-eclairage.png';
import formeOptionIcon from '../images/new-icones/Forme.png';
import chauffageOptionIcon from '../images/new-icones/Chauffage.png';
import memoireOptionIcon from '../images/new-icones/Memoire.png';
import antiEblouissementOptionIcon from '../images/new-icones/Anti-eblouissement.png';
import cameraOptionIcon from '../images/new-icones/Camera.png';
import angleMortOptionIcon from '../images/new-icones/Angle mort.png';
import reglageIcon from '../images/new-icones/Reglage.png';
import rabattementIcon from '../images/new-icones/rabattement.png';

function formatDate(value) {
  if (!value) return '-';
  try {
    return new Date(value).toLocaleString();
  } catch {
    return value;
  }
}

const OPTION_ICON_MARK = {
  glass: '🪞',
  folding: '↩️',
  underlight: '💡',
  shape: '⬛',
  heating: '♨️',
  memory: '🧠',
  adjustment: '🧭',
  antiLight: '🟦',
  lamp: '🚨',
  controller: '🎛️',
  blindSpot: '⚠️',
  camera: '📷',
};

const OPTION_IMAGE_BY_KEY = {
  'Glace retroviseur': glaceOptionIcon,
  'Eclairage sous retroviseur': sousEclairageOptionIcon,
  'Forme retroviseur': formeOptionIcon,
  'Chauffage glace': chauffageOptionIcon,
  'Memoire position': memoireOptionIcon,
  'Anti-eblouissement': antiEblouissementOptionIcon,
  Camera: cameraOptionIcon,
  'Angle mort': angleMortOptionIcon,
  Heating: chauffageOptionIcon,
  'Anti-light': antiEblouissementOptionIcon,
  'Blind spot': angleMortOptionIcon,
  'ELECTRIC / MANUAL': reglageIcon,
  FOLDING: rabattementIcon,
  Underlight: sousEclairageOptionIcon,
  LAMP: sousEclairageOptionIcon,
  CAMERA: cameraOptionIcon,
  Memory: memoireOptionIcon,
};

const HOME_WHY_ICON_CHOICES = ['shield', 'bolt', 'price', 'support'];
const EMPTY_MECHANIC_CONTACT = { name: '', address: '', phone: '', image: '' };
const PRODUCT_SCOPE_CHOICES = [
  { value: 'complete', label: 'Produit complet' },
  { value: 'piece', label: 'Piece' },
];
const PIECE_GROUP_CHOICES = ['GLASS', 'MIRROR', 'COVER', 'SINGLE'];
const PRODUCT_OPTION_ICON_CHOICES = ['none', ...Object.keys(OPTION_ICON_MARK)];

const toProductKey = (value) => String(value || '')
  .trim()
  .toUpperCase()
  .replace(/[^A-Z0-9]+/g, '_')
  .replace(/^_+|_+$/g, '');

export default function Dashboard({
  isAdminAuthenticated = false,
  authLoading = false,
  onAdminLogin,
  onAdminLogout,
  adminUserEmail = '',
}) {
  const [activeTab, setActiveTab] = useState('requests');
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);
  const [selectedBrandId, setSelectedBrandId] = useState('');
  const [selectedModelId, setSelectedModelId] = useState('');
  const [newBrandName, setNewBrandName] = useState('');
  const [newBrandLogoData, setNewBrandLogoData] = useState('');
  const [newBrandLogoFileName, setNewBrandLogoFileName] = useState('');
  const [importingMockBrands, setImportingMockBrands] = useState(false);
  const [newModelName, setNewModelName] = useState('');
  const [newYearValue, setNewYearValue] = useState('');
  const [productAdminConfig, setProductAdminConfig] = useState(DEFAULT_PRODUCT_ADMIN_CONFIG);
  const [savingProductConfig, setSavingProductConfig] = useState(false);
  const [selectedConfigYear, setSelectedConfigYear] = useState(null);
  const [rangeStartYear, setRangeStartYear] = useState('');
  const [rangeEndYear, setRangeEndYear] = useState('');
  const [productConfigMessage, setProductConfigMessage] = useState('');
  const [draggingImageRef, setDraggingImageRef] = useState(null);
  const [newCatalogProduct, setNewCatalogProduct] = useState({
    label: '',
    subtitle: '',
    orderScope: 'piece',
    pieceType: '',
    optionGroup: 'GLASS',
    previewFocus: 'generic',
    requiresPosition: true,
    requiresAdjustment: false,
  });
  const [newOptionDraftByProductKey, setNewOptionDraftByProductKey] = useState({});
  const [expandedOptionProductKey, setExpandedOptionProductKey] = useState('');
  const [homeContentForm, setHomeContentForm] = useState(() => normalizeHomeContent(DEFAULT_HOME_CONTENT));
  const [homeContentLoading, setHomeContentLoading] = useState(false);
  const [homeContentSaving, setHomeContentSaving] = useState(false);
  const [homeContentMessage, setHomeContentMessage] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [authBusy, setAuthBusy] = useState(false);
  const [authError, setAuthError] = useState('');
  const getOptionIconImage = (option) => OPTION_IMAGE_BY_KEY[option?.key] || OPTION_IMAGE_BY_KEY[option?.label] || '';
  const catalogProducts = useMemo(() => {
    if (Array.isArray(productAdminConfig.catalogProducts) && productAdminConfig.catalogProducts.length) {
      return productAdminConfig.catalogProducts;
    }
    return DEFAULT_CATALOG_PRODUCTS.filter((item) => (productAdminConfig.enabledProducts || []).includes(item.key));
  }, [productAdminConfig.catalogProducts, productAdminConfig.enabledProducts]);
  const productOptionDefsByProductKey = useMemo(
    () => (productAdminConfig.productOptionDefsByProductKey && typeof productAdminConfig.productOptionDefsByProductKey === 'object'
      ? productAdminConfig.productOptionDefsByProductKey
      : {}),
    [productAdminConfig.productOptionDefsByProductKey]
  );

  useEffect(() => {
    if (!catalogProducts.length) {
      setExpandedOptionProductKey('');
      return;
    }
    if (!expandedOptionProductKey || !catalogProducts.some((item) => item.key === expandedOptionProductKey)) {
      setExpandedOptionProductKey(catalogProducts[0].key);
    }
  }, [catalogProducts, expandedOptionProductKey]);

  const handleAdminSignIn = async (event) => {
    event.preventDefault();
    if (!onAdminLogin) return;
    setAuthBusy(true);
    setAuthError('');
    try {
      await onAdminLogin(adminEmail.trim(), adminPassword);
      setAdminPassword('');
    } catch (err) {
      setAuthError(err?.message || 'Connexion admin impossible.');
    } finally {
      setAuthBusy(false);
    }
  };

  const handleAdminSignOut = async () => {
    if (!onAdminLogout) return;
    setAuthBusy(true);
    setAuthError('');
    try {
      await onAdminLogout();
      setAdminPassword('');
    } catch (err) {
      setAuthError(err?.message || 'Deconnexion impossible.');
    } finally {
      setAuthBusy(false);
    }
  };

  const loadRequests = async () => {
    if (!hasSupabaseConfig || !isAdminAuthenticated) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const data = await fetchRequests();
      setRequests(data);
    } catch (err) {
      setError(err?.message || 'Failed to load requests.');
    } finally {
      setLoading(false);
    }
  };

  const loadBrands = async () => {
    if (!hasSupabaseConfig || !isAdminAuthenticated) return;
    try {
      const data = await fetchCatalogBrands();
      setBrands(data);
      if (!selectedBrandId && data.length) setSelectedBrandId(data[0].id);
      if (selectedBrandId && !data.find((item) => item.id === selectedBrandId)) {
        setSelectedBrandId(data[0]?.id || '');
      }
    } catch (err) {
      setError(err?.message || 'Failed to load brands.');
    }
  };

  const loadModels = async (brandId) => {
    if (!hasSupabaseConfig || !isAdminAuthenticated) return;
    if (!brandId) {
      setModels([]);
      setSelectedModelId('');
      return;
    }
    try {
      const data = await fetchCatalogModels(brandId);
      setModels(data);
      if (!selectedModelId && data.length) setSelectedModelId(data[0].id);
      if (selectedModelId && !data.find((item) => item.id === selectedModelId)) {
        setSelectedModelId(data[0]?.id || '');
      }
    } catch (err) {
      setError(err?.message || 'Failed to load models.');
    }
  };

  const loadYears = async (modelId) => {
    if (!hasSupabaseConfig || !isAdminAuthenticated) return;
    if (!modelId) {
      setYears([]);
      return;
    }
    try {
      const data = await fetchCatalogYears(modelId);
      setYears(data);
    } catch (err) {
      setError(err?.message || 'Failed to load years.');
    }
  };

  useEffect(() => {
    if (!isAdminAuthenticated) return;
    loadRequests();
    loadBrands();
  }, [isAdminAuthenticated]);

  useEffect(() => {
    let cancelled = false;
    const loadHomeContent = async () => {
      if (!isAdminAuthenticated) return;
      setHomeContentLoading(true);
      setHomeContentMessage('');
      try {
        const stored = await fetchAppSetting('home_content');
        if (cancelled) return;
        setHomeContentForm(normalizeHomeContent(stored));
      } catch (err) {
        if (!cancelled) {
          setHomeContentForm(normalizeHomeContent(DEFAULT_HOME_CONTENT));
          setError(err?.message || 'Failed to load home content.');
        }
      } finally {
        if (!cancelled) setHomeContentLoading(false);
      }
    };
    loadHomeContent();
    return () => {
      cancelled = true;
    };
  }, [isAdminAuthenticated]);

  useEffect(() => {
    if (!isAdminAuthenticated) return;
    loadModels(selectedBrandId);
  }, [selectedBrandId, isAdminAuthenticated]);

  useEffect(() => {
    if (!isAdminAuthenticated) return;
    loadYears(selectedModelId);
  }, [selectedModelId, isAdminAuthenticated]);

  useEffect(() => {
    if (!years.length) {
      setSelectedConfigYear(null);
      setRangeStartYear('');
      setRangeEndYear('');
      return;
    }
    if (!selectedConfigYear || !years.some((item) => Number(item.year) === Number(selectedConfigYear))) {
      setSelectedConfigYear(Number(years[0].year));
    }
    if (!rangeStartYear) setRangeStartYear(String(years[0].year));
    if (!rangeEndYear) setRangeEndYear(String(years[0].year));
  }, [years, selectedConfigYear, rangeStartYear, rangeEndYear]);

  useEffect(() => {
    const loadScopedProductConfig = async () => {
      if (!isAdminAuthenticated) return;
      if (!selectedBrandId || !selectedModelId || !selectedConfigYear) {
        setProductAdminConfig(DEFAULT_PRODUCT_ADMIN_CONFIG);
        return;
      }
      const selectedModel = models.find((item) => item.id === selectedModelId);
      if (!selectedModel) return;
      try {
        const config = await fetchProductAdminConfig({
          brandId: selectedBrandId,
          model: selectedModel.name,
          year: Number(selectedConfigYear),
        });
        setProductAdminConfig(config);
      } catch (err) {
        setError(err?.message || 'Failed to load product config.');
      }
    };
    loadScopedProductConfig();
  }, [selectedBrandId, selectedModelId, selectedConfigYear, models, isAdminAuthenticated]);

  useEffect(() => {
    setProductConfigMessage('');
  }, [selectedBrandId, selectedModelId, selectedConfigYear]);

  const statusOptions = useMemo(() => {
    const unique = Array.from(new Set(requests.map((item) => item.status).filter(Boolean)));
    return unique.length ? unique : ['new', 'in_progress', 'done', 'cancelled'];
  }, [requests]);

  const stats = useMemo(() => {
    const counts = requests.reduce((acc, item) => {
      const key = item.status || 'unknown';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
    return {
      total: requests.length,
      ...counts,
    };
  }, [requests]);

  const filteredRequests = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return requests.filter((item) => {
      const statusMatch = statusFilter === 'all' || item.status === statusFilter;
      if (!statusMatch) return false;
      if (!term) return true;
      const haystack = [
        item.brand,
        item.model,
        item.year,
        item.full_name,
        item.phone,
        item.email,
        item.product_type,
        item.message,
      ]
        .map((v) => String(v || '').toLowerCase())
        .join(' ');
      return haystack.includes(term);
    });
  }, [requests, statusFilter, searchTerm]);

  const handleStatusChange = async (id, status) => {
    try {
      const updated = await updateRequestStatus(id, status);
      setRequests((prev) => prev.map((item) => (item.id === id ? updated : item)));
    } catch (err) {
      setError(err?.message || 'Failed to update status.');
    }
  };

  const handleAddBrand = async () => {
    const name = newBrandName.trim();
    if (!name) return;
    try {
      await createCatalogBrand(name, newBrandLogoData);
      setNewBrandName('');
      setNewBrandLogoData('');
      setNewBrandLogoFileName('');
      await loadBrands();
    } catch (err) {
      setError(err?.message || 'Failed to add brand.');
    }
  };

  const toDataUrl = (fileOrBlob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(new Error('Failed to read image file.'));
    reader.readAsDataURL(fileOrBlob);
  });

  const handleBrandLogoFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      setNewBrandLogoData('');
      setNewBrandLogoFileName('');
      return;
    }
    try {
      const dataUrl = await toDataUrl(file);
      setNewBrandLogoData(dataUrl);
      setNewBrandLogoFileName(file.name);
    } catch (err) {
      setError(err?.message || 'Failed to load logo file.');
    }
  };

  const importMockBrandsWithLogos = async () => {
    setImportingMockBrands(true);
    setError('');
    try {
      const existingNames = new Set(brands.map((item) => String(item.name || '').trim().toLowerCase()));
      const brandIdByName = Object.fromEntries(
        brands.map((item) => [String(item.name || '').trim().toLowerCase(), item.id])
      );
      const uniqueMockBrands = mockData.brands.reduce((acc, item) => {
        const nameKey = String(item.name || '').trim().toLowerCase();
        if (!nameKey || acc.some((x) => String(x.name || '').trim().toLowerCase() === nameKey)) return acc;
        acc.push(item);
        return acc;
      }, []);

      for (const brand of uniqueMockBrands) {
        const name = String(brand.name || '').trim();
        const key = name.toLowerCase();
        if (!name) continue;
        if (existingNames.has(key)) continue;
        let logoDataUrl = '';
        if (brand.isImage && brand.icon) {
          try {
            const response = await fetch(brand.icon);
            const blob = await response.blob();
            logoDataUrl = await toDataUrl(blob);
          } catch {
            logoDataUrl = '';
          }
        }
        const insertedBrand = await createCatalogBrand(name, logoDataUrl);
        existingNames.add(key);
        brandIdByName[key] = insertedBrand?.id || brandIdByName[key];
      }

      const refreshedBrands = await fetchCatalogBrands();
      refreshedBrands.forEach((item) => {
        brandIdByName[String(item.name || '').trim().toLowerCase()] = item.id;
      });

      const mockModelsByBrandName = {};
      Object.entries(mockData.models || {}).forEach(([mockBrandId, modelList]) => {
        const sourceBrand = (mockData.brands || []).find((b) => String(b.id) === String(mockBrandId));
        if (!sourceBrand) return;
        const brandNameKey = String(sourceBrand.name || '').trim().toLowerCase();
        if (!brandNameKey) return;
        if (!Array.isArray(mockModelsByBrandName[brandNameKey])) mockModelsByBrandName[brandNameKey] = [];
        (modelList || []).forEach((modelName) => {
          const clean = String(modelName || '').trim();
          if (!clean) return;
          if (!mockModelsByBrandName[brandNameKey].includes(clean)) {
            mockModelsByBrandName[brandNameKey].push(clean);
          }
        });
      });

      for (const [brandNameKey, modelNames] of Object.entries(mockModelsByBrandName)) {
        const targetBrandId = brandIdByName[brandNameKey];
        if (!targetBrandId) continue;

        const existingModels = await fetchCatalogModels(targetBrandId);
        const existingModelNames = new Set(existingModels.map((m) => String(m.name || '').trim().toLowerCase()));
        const modelIdByName = Object.fromEntries(
          existingModels.map((m) => [String(m.name || '').trim().toLowerCase(), m.id])
        );

        for (const modelName of modelNames) {
          const modelKey = modelName.toLowerCase();
          if (!existingModelNames.has(modelKey)) {
            const insertedModel = await createCatalogModel(targetBrandId, modelName);
            existingModelNames.add(modelKey);
            modelIdByName[modelKey] = insertedModel?.id || modelIdByName[modelKey];
          }
        }

        // Import years for each model from mockData.years default list.
        const yearsList = Array.isArray(mockData.years) ? mockData.years : [];
        for (const modelName of modelNames) {
          const modelId = modelIdByName[modelName.toLowerCase()];
          if (!modelId) continue;
          const existingYears = await fetchCatalogYears(modelId);
          const existingYearSet = new Set(existingYears.map((y) => Number(y.year)));
          for (const year of yearsList) {
            const yearNum = Number(year);
            if (!Number.isFinite(yearNum) || existingYearSet.has(yearNum)) continue;
            await createCatalogYear(modelId, yearNum);
            existingYearSet.add(yearNum);
          }
        }
      }

      await loadBrands();
      if (selectedBrandId) await loadModels(selectedBrandId);
      if (selectedModelId) await loadYears(selectedModelId);
    } catch (err) {
      setError(err?.message || 'Failed to import mockData brands.');
    } finally {
      setImportingMockBrands(false);
    }
  };

  const handleDeleteBrand = async (brandId) => {
    try {
      await deleteCatalogBrand(brandId);
      await loadBrands();
    } catch (err) {
      setError(err?.message || 'Failed to delete brand.');
    }
  };

  const handleAddModel = async () => {
    const name = newModelName.trim();
    if (!name || !selectedBrandId) return;
    try {
      await createCatalogModel(selectedBrandId, name);
      setNewModelName('');
      await loadModels(selectedBrandId);
    } catch (err) {
      setError(err?.message || 'Failed to add model.');
    }
  };

  const handleDeleteModel = async (modelId) => {
    try {
      await deleteCatalogModel(modelId);
      await loadModels(selectedBrandId);
    } catch (err) {
      setError(err?.message || 'Failed to delete model.');
    }
  };

  const handleAddYear = async () => {
    const year = Number(newYearValue);
    if (!selectedModelId || !Number.isFinite(year) || year < 1980 || year > 2100) return;
    try {
      await createCatalogYear(selectedModelId, year);
      setNewYearValue('');
      await loadYears(selectedModelId);
    } catch (err) {
      setError(err?.message || 'Failed to add year.');
    }
  };

  const handleDeleteYear = async (yearId) => {
    try {
      await deleteCatalogYear(yearId);
      await loadYears(selectedModelId);
    } catch (err) {
      setError(err?.message || 'Failed to delete year.');
    }
  };

  const persistProductConfig = async (nextConfig) => {
    if (!selectedBrandId || !selectedModelId || !selectedConfigYear) {
      setError('Choisissez marque, modele et annee pour configurer les options.');
      return;
    }
    const selectedModel = models.find((item) => item.id === selectedModelId);
    if (!selectedModel) {
      setError('Modele introuvable.');
      return;
    }
    setSavingProductConfig(true);
    try {
      const normalizedCatalog = Array.isArray(nextConfig.catalogProducts) ? nextConfig.catalogProducts : [];
      const normalizedPayload = {
        ...nextConfig,
        enabledProducts: normalizedCatalog.length
          ? normalizedCatalog.map((item) => item.key)
          : (Array.isArray(nextConfig.enabledProducts) ? nextConfig.enabledProducts : []),
      };
      const saved = await saveProductAdminConfig({
        brandId: selectedBrandId,
        model: selectedModel.name,
        year: Number(selectedConfigYear),
      }, normalizedPayload);
      setProductAdminConfig(saved);
      setProductConfigMessage(`Configuration enregistree pour ${selectedConfigYear}.`);
    } catch (err) {
      setError(err?.message || 'Failed to save product config.');
    } finally {
      setSavingProductConfig(false);
    }
  };

  const applyConfigToYearRange = async () => {
    if (!selectedBrandId || !selectedModelId) {
      setError('Choisissez une marque et un modele.');
      return;
    }
    const selectedModel = models.find((item) => item.id === selectedModelId);
    if (!selectedModel) {
      setError('Modele introuvable.');
      return;
    }

    const start = Number(rangeStartYear);
    const end = Number(rangeEndYear);
    if (!Number.isFinite(start) || !Number.isFinite(end)) {
      setError('Choisissez une plage d annees valide.');
      return;
    }
    if (start > end) {
      setError('Annee debut doit etre inferieure ou egale a annee fin.');
      return;
    }

    const targetYears = Array.from(
      new Set((years || []).map((item) => Number(item.year)).filter((year) => Number.isFinite(year)))
    )
      .filter((year) => year >= start && year <= end)
      .sort((a, b) => a - b);

    if (!targetYears.length) {
      setError('Aucune annee trouvee dans cette plage pour ce modele.');
      return;
    }

    setSavingProductConfig(true);
    setProductConfigMessage('');
    setError('');
    try {
      const normalizedCatalog = Array.isArray(productAdminConfig.catalogProducts) ? productAdminConfig.catalogProducts : [];
      const normalizedPayload = {
        ...productAdminConfig,
        enabledProducts: normalizedCatalog.length
          ? normalizedCatalog.map((item) => item.key)
          : (Array.isArray(productAdminConfig.enabledProducts) ? productAdminConfig.enabledProducts : []),
      };

      for (const targetYear of targetYears) {
        await saveProductAdminConfig({
          brandId: selectedBrandId,
          model: selectedModel.name,
          year: targetYear,
        }, normalizedPayload);
      }
      setProductConfigMessage(`Configuration copiee sur ${targetYears.length} annee(s): ${start} -> ${end}.`);
    } catch (err) {
      setError(err?.message || 'Failed to copy config to year range.');
    } finally {
      setSavingProductConfig(false);
    }
  };

  const addCatalogProduct = () => {
    const label = String(newCatalogProduct.label || '').trim();
    if (!label) {
      setError('Ajoutez un nom de produit.');
      return;
    }
    const baseKey = toProductKey(label) || 'PRODUCT';
    const existingKeys = new Set(catalogProducts.map((item) => item.key));
    let uniqueKey = baseKey;
    let cursor = 2;
    while (existingKeys.has(uniqueKey)) {
      uniqueKey = `${baseKey}_${cursor}`;
      cursor += 1;
    }
    const orderScope = newCatalogProduct.orderScope === 'complete' ? 'complete' : 'piece';
    const nextProduct = {
      key: uniqueKey,
      label,
      subtitle: String(newCatalogProduct.subtitle || '').trim(),
      orderScope,
      pieceType: String(newCatalogProduct.pieceType || '').trim() || label,
      optionGroup: orderScope === 'complete'
        ? 'COMPLETE'
        : (String(newCatalogProduct.optionGroup || 'GLASS').toUpperCase()),
      previewFocus: String(newCatalogProduct.previewFocus || 'generic').trim() || 'generic',
      requiresPosition: newCatalogProduct.requiresPosition !== false,
      requiresAdjustment: newCatalogProduct.requiresAdjustment === true,
    };
    const defaultOptionDefs = orderScope === 'complete'
      ? COMPLETE_OPTION_DEFS.map((item) => ({ key: item.key, label: item.label, icon: item.icon || '', imageSrc: '' }))
      : (PIECE_OPTION_DEFS[nextProduct.optionGroup] || []).map((item) => ({
        key: item.key,
        label: item.label,
        icon: item.icon || '',
        imageSrc: '',
      }));
    persistProductConfig({
      ...productAdminConfig,
      catalogProducts: [...catalogProducts, nextProduct],
      productOptionDefsByProductKey: {
        ...productOptionDefsByProductKey,
        [uniqueKey]: defaultOptionDefs,
      },
    });
    setNewCatalogProduct({
      label: '',
      subtitle: '',
      orderScope: 'piece',
      pieceType: '',
      optionGroup: 'GLASS',
      previewFocus: 'generic',
      requiresPosition: true,
      requiresAdjustment: false,
    });
  };

  const updateCatalogProduct = (productKey, field, value) => {
    const next = catalogProducts.map((item) => {
      if (item.key !== productKey) return item;
      if (field === 'orderScope') {
        const scope = value === 'complete' ? 'complete' : 'piece';
        return {
          ...item,
          orderScope: scope,
          optionGroup: scope === 'complete' ? 'COMPLETE' : (item.optionGroup || 'GLASS'),
        };
      }
      if (field === 'optionGroup') {
        return { ...item, optionGroup: String(value || 'GLASS').toUpperCase() };
      }
      return { ...item, [field]: value };
    });
    persistProductConfig({ ...productAdminConfig, catalogProducts: next });
  };

  const removeCatalogProduct = (productKey) => {
    const nextProducts = catalogProducts.filter((item) => item.key !== productKey);
    const nextImageMap = { ...(productAdminConfig.productImagesByKey || {}) };
    const nextOptionDefsMap = { ...productOptionDefsByProductKey };
    delete nextImageMap[productKey];
    delete nextOptionDefsMap[productKey];
    persistProductConfig({
      ...productAdminConfig,
      catalogProducts: nextProducts,
      productImagesByKey: nextImageMap,
      productOptionDefsByProductKey: nextOptionDefsMap,
    });
    setNewOptionDraftByProductKey((prev) => {
      const next = { ...prev };
      delete next[productKey];
      return next;
    });
  };

  const updateOptionDraft = (productKey, field, value) => {
    setNewOptionDraftByProductKey((prev) => ({
      ...prev,
      [productKey]: {
        key: prev[productKey]?.key || '',
        label: prev[productKey]?.label || '',
        icon: prev[productKey]?.icon || 'none',
        imageSrc: prev[productKey]?.imageSrc || '',
        [field]: value,
      },
    }));
  };

  const addProductOption = (productKey) => {
    const draft = newOptionDraftByProductKey[productKey] || { key: '', label: '', icon: 'none', imageSrc: '' };
    const optionLabel = String(draft.label || '').trim();
    if (!optionLabel) {
      setError('Ajoutez un libelle d option.');
      return;
    }
    const optionKey = String(draft.key || '').trim() || optionLabel;
    const optionIcon = String(draft.icon || '').trim();
    const current = Array.isArray(productOptionDefsByProductKey[productKey]) ? productOptionDefsByProductKey[productKey] : [];
    const exists = current.some((item) => String(item.key || '').toLowerCase() === optionKey.toLowerCase());
    if (exists) {
      setError('Cette option existe deja pour ce produit.');
      return;
    }
    persistProductConfig({
      ...productAdminConfig,
      productOptionDefsByProductKey: {
        ...productOptionDefsByProductKey,
        [productKey]: [
          ...current,
          {
            key: optionKey,
            label: optionLabel,
            icon: optionIcon === 'none' ? '' : optionIcon,
            imageSrc: String(draft.imageSrc || ''),
          },
        ],
      },
    });
    setNewOptionDraftByProductKey((prev) => ({
      ...prev,
      [productKey]: { key: '', label: '', icon: 'none', imageSrc: '' },
    }));
  };

  const updateProductOption = (productKey, optionKey, field, value) => {
    const current = Array.isArray(productOptionDefsByProductKey[productKey]) ? productOptionDefsByProductKey[productKey] : [];
    const next = current.map((item) => {
      if (item.key !== optionKey) return item;
      if (field === 'icon') return { ...item, icon: value === 'none' ? '' : value };
      return { ...item, [field]: value };
    });
    persistProductConfig({
      ...productAdminConfig,
      productOptionDefsByProductKey: {
        ...productOptionDefsByProductKey,
        [productKey]: next,
      },
    });
  };

  const removeProductOption = (productKey, optionKey) => {
    const current = Array.isArray(productOptionDefsByProductKey[productKey]) ? productOptionDefsByProductKey[productKey] : [];
    const next = current.filter((item) => item.key !== optionKey);
    persistProductConfig({
      ...productAdminConfig,
      productOptionDefsByProductKey: {
        ...productOptionDefsByProductKey,
        [productKey]: next,
      },
    });
  };

  const updateProductOptionImage = async (productKey, optionKey, file) => {
    if (!file) return;
    try {
      const dataUrl = await toDataUrl(file);
      updateProductOption(productKey, optionKey, 'imageSrc', dataUrl);
    } catch (err) {
      setError(err?.message || 'Failed to add option image.');
    }
  };

  const addProductImage = async (productKey, file) => {
    if (!file) return;
    try {
      const dataUrl = await toDataUrl(file);
      const currentMap = productAdminConfig.productImagesByKey || {};
      const current = Array.isArray(currentMap[productKey]) ? currentMap[productKey] : [];
      persistProductConfig({
        ...productAdminConfig,
        productImagesByKey: {
          ...currentMap,
          [productKey]: [...current, dataUrl],
        },
      });
    } catch (err) {
      setError(err?.message || 'Failed to add product image.');
    }
  };

  const removeProductImage = (productKey, indexToRemove) => {
    const currentMap = productAdminConfig.productImagesByKey || {};
    const current = Array.isArray(currentMap[productKey]) ? currentMap[productKey] : [];
    const next = current.filter((_, index) => index !== indexToRemove);
    persistProductConfig({
      ...productAdminConfig,
      productImagesByKey: {
        ...currentMap,
        [productKey]: next,
      },
    });
  };

  const reorderProductImages = (productKey, fromIndex, toIndex) => {
    if (fromIndex === toIndex) return;
    const currentMap = productAdminConfig.productImagesByKey || {};
    const current = Array.isArray(currentMap[productKey]) ? [...currentMap[productKey]] : [];
    if (fromIndex < 0 || toIndex < 0 || fromIndex >= current.length || toIndex >= current.length) return;
    const [moved] = current.splice(fromIndex, 1);
    current.splice(toIndex, 0, moved);
    persistProductConfig({
      ...productAdminConfig,
      productImagesByKey: {
        ...currentMap,
        [productKey]: current,
      },
    });
  };

  const handleSaveHomeContent = async () => {
    setHomeContentMessage('');
    setError('');
    setHomeContentSaving(true);
    try {
      const normalized = normalizeHomeContent(homeContentForm);
      await saveAppSetting('home_content', normalized);
      setHomeContentForm(normalized);
      setHomeContentMessage('Contenu accueil sauvegarde.');
    } catch (err) {
      setError(err?.message || 'Failed to save home content.');
    } finally {
      setHomeContentSaving(false);
    }
  };

  const handleResetHomeContent = () => {
    setHomeContentMessage('');
    setHomeContentForm(normalizeHomeContent(DEFAULT_HOME_CONTENT));
  };

  const updateHomeListValue = (fieldKey, index, value) => {
    setHomeContentForm((prev) => {
      const next = [...(prev[fieldKey] || [])];
      next[index] = value;
      return { ...prev, [fieldKey]: next };
    });
  };

  const updateHomeFeatured = (index, field, value) => {
    setHomeContentForm((prev) => {
      const next = [...(prev.featuredItems || [])];
      next[index] = { ...(next[index] || {}), [field]: value };
      return { ...prev, featuredItems: next };
    });
  };

  const updateMechanicGroupField = (groupIndex, field, value) => {
    setHomeContentForm((prev) => {
      const groups = [...(prev.mechanicGroups || [])];
      groups[groupIndex] = {
        ...(groups[groupIndex] || {}),
        [field]: value,
      };
      return { ...prev, mechanicGroups: groups };
    });
  };

  const updateMechanicContactField = (groupIndex, contactIndex, field, value) => {
    setHomeContentForm((prev) => {
      const groups = [...(prev.mechanicGroups || [])];
      const targetGroup = { ...(groups[groupIndex] || {}), contacts: [...(groups[groupIndex]?.contacts || [])] };
      targetGroup.contacts[contactIndex] = {
        ...(targetGroup.contacts[contactIndex] || {}),
        [field]: value,
      };
      groups[groupIndex] = targetGroup;
      return { ...prev, mechanicGroups: groups };
    });
  };

  const addMechanicGroup = () => {
    setHomeContentForm((prev) => ({
      ...prev,
      mechanicGroups: [
        ...(prev.mechanicGroups || []),
        { group: 'Nouveau groupe', contacts: [{ ...EMPTY_MECHANIC_CONTACT }] },
      ],
    }));
  };

  const removeMechanicGroup = (groupIndex) => {
    setHomeContentForm((prev) => ({
      ...prev,
      mechanicGroups: (prev.mechanicGroups || []).filter((_, index) => index !== groupIndex),
    }));
  };

  const addMechanicContact = (groupIndex) => {
    setHomeContentForm((prev) => {
      const groups = [...(prev.mechanicGroups || [])];
      const targetGroup = { ...(groups[groupIndex] || {}), contacts: [...(groups[groupIndex]?.contacts || [])] };
      targetGroup.contacts.push({ ...EMPTY_MECHANIC_CONTACT });
      groups[groupIndex] = targetGroup;
      return { ...prev, mechanicGroups: groups };
    });
  };

  const removeMechanicContact = (groupIndex, contactIndex) => {
    setHomeContentForm((prev) => {
      const groups = [...(prev.mechanicGroups || [])];
      const targetGroup = { ...(groups[groupIndex] || {}), contacts: [...(groups[groupIndex]?.contacts || [])] };
      targetGroup.contacts = targetGroup.contacts.filter((_, index) => index !== contactIndex);
      groups[groupIndex] = targetGroup;
      return { ...prev, mechanicGroups: groups };
    });
  };

  const updateHomeWhyItem = (index, field, value) => {
    setHomeContentForm((prev) => {
      const next = [...(prev.whyItems || [])];
      next[index] = { ...(next[index] || {}), [field]: value };
      return { ...prev, whyItems: next };
    });
  };

  const updateHomeSeo = (field, value) => {
    setHomeContentForm((prev) => ({
      ...prev,
      seo: {
        ...(prev.seo || {}),
        [field]: value,
      },
    }));
  };

  const parseSeoLinksText = (textValue) => String(textValue || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, href = ''] = line.split('|');
      return { label: String(label || '').trim(), href: String(href || '').trim() };
    });

  const seoLinksToText = (links) => (Array.isArray(links) ? links : [])
    .map((item) => (item.href ? `${item.label}|${item.href}` : item.label))
    .join('\n');

  const updateHomeSeoCard = (cardIndex, field, value) => {
    setHomeContentForm((prev) => {
      const nextCards = [...(prev.seo?.cards || [])];
      const nextCard = { ...(nextCards[cardIndex] || {}) };
      if (field === 'links') {
        nextCard.links = parseSeoLinksText(value);
      } else {
        nextCard[field] = value;
      }
      nextCards[cardIndex] = nextCard;
      return {
        ...prev,
        seo: {
          ...(prev.seo || {}),
          cards: nextCards,
        },
      };
    });
  };

  if (!hasSupabaseConfig) {
    return (
      <div className="dashboard-view">
        <div className="view-header">
          <h2>Dashboard</h2>
          <p>Administration des demandes et du catalogue (Supabase)</p>
        </div>
        <section className="dashboard-shell">
          <div className="dashboard-alert">
            Supabase n'est pas configure. Ajoutez `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY` dans `.env`.
          </div>
        </section>
      </div>
    );
  }

  if (authLoading) {
    return (
      <div className="dashboard-view">
        <div className="view-header">
          <h2>Dashboard</h2>
          <p>Verification de la session admin...</p>
        </div>
      </div>
    );
  }

  if (!isAdminAuthenticated) {
    return (
      <div className="dashboard-view">
        <div className="view-header">
          <h2>Dashboard</h2>
          <p>Connexion administrateur requise</p>
        </div>
        <section className="dashboard-shell">
          <form className="dashboard-auth-card" onSubmit={handleAdminSignIn}>
            <label>
              Email admin
              <input
                type="email"
                className="dashboard-search-input"
                value={adminEmail}
                onChange={(event) => setAdminEmail(event.target.value)}
                required
                autoComplete="username"
              />
            </label>
            <label>
              Mot de passe
              <input
                type="password"
                className="dashboard-search-input"
                value={adminPassword}
                onChange={(event) => setAdminPassword(event.target.value)}
                required
                autoComplete="current-password"
              />
            </label>
            {authError ? <p className="inline-hint-error">{authError}</p> : null}
            <button type="submit" className="year-filter-btn active" disabled={authBusy}>
              {authBusy ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>
        </section>
      </div>
    );
  }

  return (
    <div className="dashboard-view">
      <div className="view-header">
        <h2>Dashboard</h2>
        <p>Administration des demandes et du catalogue (Supabase)</p>
        <div className="dashboard-admin-row">
          <span className="dashboard-admin-email">{adminUserEmail || 'admin'}</span>
          <button type="button" className="secondary-button" onClick={handleAdminSignOut} disabled={authBusy}>
            {authBusy ? '...' : 'Se deconnecter'}
          </button>
        </div>
      </div>

      <section className="dashboard-shell">
        <div className="dashboard-tabs">
          <button
            type="button"
            className={`year-filter-btn ${activeTab === 'requests' ? 'active' : ''}`}
            onClick={() => setActiveTab('requests')}
          >
            Demandes
          </button>
          <button
            type="button"
            className={`year-filter-btn ${activeTab === 'catalog' ? 'active' : ''}`}
            onClick={() => setActiveTab('catalog')}
          >
            Produits (Marques/Modeles/Annees)
          </button>
          <button
            type="button"
            className={`year-filter-btn ${activeTab === 'home_content' ? 'active' : ''}`}
            onClick={() => setActiveTab('home_content')}
          >
            Accueil dynamique
          </button>
        </div>

        {error ? <p className="inline-hint-error">{error}</p> : null}

        {activeTab === 'requests' ? (
          <>
            <div className="dashboard-toolbar">
              <div className="dashboard-stats">
                <span className="dashboard-stat-chip">Total: {stats.total || 0}</span>
                {statusOptions.map((status) => (
                  <span key={status} className="dashboard-stat-chip">
                    {status}: {stats[status] || 0}
                  </span>
                ))}
              </div>
            </div>

            <div className="dashboard-toolbar">
              <input
                type="search"
                className="dashboard-search-input"
                placeholder="Rechercher client, modele, telephone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="year-filters">
                <button type="button" className={`year-filter-btn ${statusFilter === 'all' ? 'active' : ''}`} onClick={() => setStatusFilter('all')}>Tous</button>
                {statusOptions.map((status) => (
                  <button
                    key={status}
                    type="button"
                    className={`year-filter-btn ${statusFilter === status ? 'active' : ''}`}
                    onClick={() => setStatusFilter(status)}
                  >
                    {status}
                  </button>
                ))}
              </div>
              <button type="button" className="secondary-button dashboard-refresh" onClick={loadRequests}>Actualiser</button>
            </div>

            {loading ? <p className="empty-state">Chargement...</p> : null}

            {!loading && hasSupabaseConfig ? (
              <div className="dashboard-list">
                {filteredRequests.map((item) => (
                  <article key={item.id} className="dashboard-card">
                    <div className="dashboard-card-head">
                      <strong>{item.brand} {item.model} ({item.year})</strong>
                      <span>{formatDate(item.created_at)}</span>
                    </div>
                    <p><strong>Client:</strong> {item.full_name || '-'} | <strong>Tel:</strong> {item.phone || '-'}</p>
                    <p><strong>Commande:</strong> {item.order_scope || '-'} | <strong>Type:</strong> {item.product_type || '-'}</p>
                    <p><strong>Position:</strong> {item.position || '-'} | <strong>Options:</strong> {Array.isArray(item.options) && item.options.length ? item.options.join(', ') : 'Aucune'}</p>
                    <p><strong>Message:</strong> {item.message || '-'}</p>
                    <div className="dashboard-status-row">
                      {statusOptions.map((status) => (
                        <button
                          key={status}
                          type="button"
                          className={`year-filter-btn ${item.status === status ? 'active' : ''}`}
                          onClick={() => handleStatusChange(item.id, status)}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </article>
                ))}
                {!filteredRequests.length ? <p className="empty-state">Aucune demande pour ce filtre.</p> : null}
              </div>
            ) : null}
          </>
        ) : null}

        {activeTab === 'catalog' ? (
          <div className="dashboard-catalog-layout">
            <article className="dashboard-catalog-col">
              <h3>Marques</h3>
              <div className="dashboard-add-row">
                <input
                  type="text"
                  value={newBrandName}
                  onChange={(e) => setNewBrandName(e.target.value)}
                  placeholder="Nouvelle marque"
                  className="dashboard-search-input"
                />
              </div>
              <div className="dashboard-add-row">
                <label className="dashboard-file-label">
                  <input type="file" accept="image/*" onChange={handleBrandLogoFileChange} />
                  <span>{newBrandLogoFileName || 'Choisir logo (optionnel)'}</span>
                </label>
                <button type="button" className="year-filter-btn active" onClick={handleAddBrand}>Ajouter</button>
              </div>
              <div className="dashboard-add-row">
                <button
                  type="button"
                  className="secondary-button dashboard-import-btn"
                  onClick={importMockBrandsWithLogos}
                  disabled={importingMockBrands}
                >
                  {importingMockBrands ? 'Import...' : 'Importer mockData (marques + modeles + annees + logos)'}
                </button>
              </div>
              <div className="dashboard-catalog-list">
                {brands.map((brand) => (
                  <div
                    key={brand.id}
                    className={`dashboard-catalog-item ${selectedBrandId === brand.id ? 'active' : ''}`}
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedBrandId(brand.id)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        setSelectedBrandId(brand.id);
                      }
                    }}
                  >
                    <span>{brand.name}{brand.logo_url ? ' (logo)' : ''}</span>
                    <button
                      type="button"
                      className="dashboard-delete-action-btn"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleDeleteBrand(brand.id);
                      }}
                    >
                      Suppr.
                    </button>
                  </div>
                ))}
              </div>
            </article>

            <article className="dashboard-catalog-col">
              <h3>Modeles</h3>
              <div className="dashboard-add-row">
                <input
                  type="text"
                  value={newModelName}
                  onChange={(e) => setNewModelName(e.target.value)}
                  placeholder={selectedBrandId ? 'Nouveau modele' : 'Choisissez une marque'}
                  className="dashboard-search-input"
                  disabled={!selectedBrandId}
                />
                <button type="button" className="year-filter-btn active" onClick={handleAddModel} disabled={!selectedBrandId}>Ajouter</button>
              </div>
              <div className="dashboard-catalog-list">
                {models.map((model) => (
                  <div
                    key={model.id}
                    className={`dashboard-catalog-item ${selectedModelId === model.id ? 'active' : ''}`}
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedModelId(model.id)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        setSelectedModelId(model.id);
                      }
                    }}
                  >
                    <span>{model.name}</span>
                    <button
                      type="button"
                      className="dashboard-delete-action-btn"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleDeleteModel(model.id);
                      }}
                    >
                      Suppr.
                    </button>
                  </div>
                ))}
              </div>
            </article>

            <article className="dashboard-catalog-col">
              <h3>Annees</h3>
              <div className="dashboard-add-row">
                <input
                  type="number"
                  min="1980"
                  max="2100"
                  value={newYearValue}
                  onChange={(e) => setNewYearValue(e.target.value)}
                  placeholder={selectedModelId ? 'Annee' : 'Choisissez un modele'}
                  className="dashboard-search-input"
                  disabled={!selectedModelId}
                />
                <button type="button" className="year-filter-btn active" onClick={handleAddYear} disabled={!selectedModelId}>Ajouter</button>
              </div>
              <div className="dashboard-catalog-list">
                {years.map((item) => (
                  <div
                    key={item.id}
                    className={`dashboard-catalog-item ${Number(selectedConfigYear) === Number(item.year) ? 'active' : ''}`}
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedConfigYear(Number(item.year))}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        setSelectedConfigYear(Number(item.year));
                      }
                    }}
                  >
                    <span>{item.year}</span>
                    <button
                      type="button"
                      className="dashboard-delete-action-btn"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleDeleteYear(item.id);
                      }}
                    >
                      Suppr.
                    </button>
                  </div>
                ))}
              </div>
            </article>

            <article className="dashboard-catalog-col dashboard-product-config-col">
              <h3>Produits et options (app)</h3>
              <p className="config-help">
                Configurez les produits et leurs options pour l annee:
                {' '}
                <strong>{selectedConfigYear || '-'}</strong>
              </p>
              <div className="dashboard-check-group">
                <p className="dashboard-check-title">Copier la meme configuration sur une plage d annees</p>
                <div className="dashboard-add-row">
                  <select
                    className="dashboard-search-input"
                    value={rangeStartYear}
                    onChange={(event) => setRangeStartYear(event.target.value)}
                    disabled={!years.length}
                  >
                    {!years.length ? <option value="">Aucune annee</option> : null}
                    {years.map((item) => (
                      <option key={`range-start-${item.id}`} value={item.year}>
                        {item.year}
                      </option>
                    ))}
                  </select>
                  <select
                    className="dashboard-search-input"
                    value={rangeEndYear}
                    onChange={(event) => setRangeEndYear(event.target.value)}
                    disabled={!years.length}
                  >
                    {!years.length ? <option value="">Aucune annee</option> : null}
                    {years.map((item) => (
                      <option key={`range-end-${item.id}`} value={item.year}>
                        {item.year}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    className="year-filter-btn active"
                    onClick={applyConfigToYearRange}
                    disabled={savingProductConfig || !years.length}
                  >
                    Appliquer de {rangeStartYear || '-'} a {rangeEndYear || '-'}
                  </button>
                </div>
              </div>
              {savingProductConfig ? <p className="empty-state">Sauvegarde...</p> : null}
              {productConfigMessage ? <p className="empty-state">{productConfigMessage}</p> : null}

              <div className="dashboard-check-group">
                <p className="dashboard-check-title">Produits actifs (dynamiques)</p>
                <div className="dashboard-add-row">
                  <input
                    type="text"
                    className="dashboard-search-input"
                    placeholder="Nom produit (ex: Retroviseur complet)"
                    value={newCatalogProduct.label}
                    onChange={(event) => setNewCatalogProduct((prev) => ({ ...prev, label: event.target.value }))}
                  />
                  <input
                    type="text"
                    className="dashboard-search-input"
                    placeholder="Sous-titre (optionnel)"
                    value={newCatalogProduct.subtitle}
                    onChange={(event) => setNewCatalogProduct((prev) => ({ ...prev, subtitle: event.target.value }))}
                  />
                </div>
                <div className="dashboard-add-row">
                  <select
                    className="dashboard-search-input"
                    value={newCatalogProduct.orderScope}
                    onChange={(event) => setNewCatalogProduct((prev) => ({
                      ...prev,
                      orderScope: event.target.value,
                      optionGroup: event.target.value === 'complete' ? 'COMPLETE' : prev.optionGroup || 'GLASS',
                      requiresAdjustment: event.target.value === 'complete' ? true : prev.requiresAdjustment,
                    }))}
                  >
                    {PRODUCT_SCOPE_CHOICES.map((item) => (
                      <option key={item.value} value={item.value}>{item.label}</option>
                    ))}
                  </select>
                  <select
                    className="dashboard-search-input"
                    value={newCatalogProduct.optionGroup}
                    onChange={(event) => setNewCatalogProduct((prev) => ({ ...prev, optionGroup: event.target.value }))}
                    disabled={newCatalogProduct.orderScope === 'complete'}
                  >
                    {PIECE_GROUP_CHOICES.map((groupKey) => (
                      <option key={groupKey} value={groupKey}>{groupKey}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    className="dashboard-search-input"
                    placeholder="Texte produit (commande)"
                    value={newCatalogProduct.pieceType}
                    onChange={(event) => setNewCatalogProduct((prev) => ({ ...prev, pieceType: event.target.value }))}
                  />
                  <label className="dashboard-check-item">
                    <input
                      type="checkbox"
                      checked={newCatalogProduct.requiresPosition !== false}
                      onChange={(event) => setNewCatalogProduct((prev) => ({ ...prev, requiresPosition: event.target.checked }))}
                    />
                    <span>Cote obligatoire</span>
                  </label>
                  <label className="dashboard-check-item">
                    <input
                      type="checkbox"
                      checked={newCatalogProduct.requiresAdjustment === true}
                      onChange={(event) => setNewCatalogProduct((prev) => ({ ...prev, requiresAdjustment: event.target.checked }))}
                    />
                    <span>Reglage obligatoire</span>
                  </label>
                  <button type="button" className="year-filter-btn active" onClick={addCatalogProduct}>
                    Ajouter
                  </button>
                </div>

                <div className="dashboard-catalog-list">
                  {catalogProducts.map((item) => (
                    <div key={item.key} className="dashboard-home-subcard">
                      <div className="dashboard-home-subcard-head">
                        <strong>{item.key}</strong>
                        <button
                          type="button"
                          className="dashboard-delete-action-btn"
                          onClick={() => removeCatalogProduct(item.key)}
                        >
                          Suppr.
                        </button>
                      </div>
                      <div className="dashboard-home-grid dashboard-home-grid-2">
                        <label className="dashboard-home-label">
                          Nom
                          <input
                            type="text"
                            className="dashboard-search-input"
                            value={item.label || ''}
                            onChange={(event) => updateCatalogProduct(item.key, 'label', event.target.value)}
                          />
                        </label>
                        <label className="dashboard-home-label">
                          Sous-titre
                          <input
                            type="text"
                            className="dashboard-search-input"
                            value={item.subtitle || ''}
                            onChange={(event) => updateCatalogProduct(item.key, 'subtitle', event.target.value)}
                          />
                        </label>
                        <label className="dashboard-home-label">
                          Type commande
                          <select
                            className="dashboard-search-input"
                            value={item.orderScope === 'complete' ? 'complete' : 'piece'}
                            onChange={(event) => updateCatalogProduct(item.key, 'orderScope', event.target.value)}
                          >
                            {PRODUCT_SCOPE_CHOICES.map((choice) => (
                              <option key={choice.value} value={choice.value}>{choice.label}</option>
                            ))}
                          </select>
                        </label>
                        <label className="dashboard-home-label">
                          Groupe options
                          <select
                            className="dashboard-search-input"
                            value={item.orderScope === 'complete' ? 'COMPLETE' : (item.optionGroup || 'GLASS')}
                            onChange={(event) => updateCatalogProduct(item.key, 'optionGroup', event.target.value)}
                            disabled={item.orderScope === 'complete'}
                          >
                            {PIECE_GROUP_CHOICES.map((groupKey) => (
                              <option key={groupKey} value={groupKey}>{groupKey}</option>
                            ))}
                          </select>
                        </label>
                        <label className="dashboard-home-label">
                          Texte produit (commande)
                          <input
                            type="text"
                            className="dashboard-search-input"
                            value={item.pieceType || ''}
                            onChange={(event) => updateCatalogProduct(item.key, 'pieceType', event.target.value)}
                          />
                        </label>
                        <label className="dashboard-home-label">
                          Focus preview
                          <input
                            type="text"
                            className="dashboard-search-input"
                            value={item.previewFocus || ''}
                            onChange={(event) => updateCatalogProduct(item.key, 'previewFocus', event.target.value)}
                          />
                        </label>
                        <label className="dashboard-check-item">
                          <input
                            type="checkbox"
                            checked={item.requiresPosition !== false}
                            onChange={(event) => updateCatalogProduct(item.key, 'requiresPosition', event.target.checked)}
                          />
                          <span>Cote obligatoire</span>
                        </label>
                        <label className="dashboard-check-item">
                          <input
                            type="checkbox"
                            checked={item.requiresAdjustment === true}
                            onChange={(event) => updateCatalogProduct(item.key, 'requiresAdjustment', event.target.checked)}
                          />
                          <span>Reglage obligatoire</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
                {!catalogProducts.length ? <p className="empty-state">Aucun produit actif.</p> : null}
              </div>

              <div className="dashboard-check-group">
                <p className="dashboard-check-title">Images par produit (1 ou plus)</p>
                <p className="config-help">Ajoutez plusieurs images par produit. Glissez pour reordonner.</p>
                <div className="dashboard-product-images-grid">
                  {catalogProducts.map((productItem) => {
                    const productKey = productItem.key;
                    const images = productAdminConfig.productImagesByKey?.[productKey] || [];
                    return (
                      <div key={productKey} className="dashboard-product-images-block">
                        <div className="dashboard-product-images-head">
                          <strong>{productItem.label || productKey}</strong>
                          <span className="dashboard-image-count-badge">{images.length} image(s)</span>
                        </div>
                        <label className="dashboard-file-label dashboard-file-label-inline dashboard-image-add-btn">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(event) => {
                              const file = event.target.files?.[0];
                              if (file) addProductImage(productKey, file);
                              event.target.value = '';
                            }}
                          />
                          <span>+ Ajouter une image</span>
                        </label>
                        <div className="dashboard-product-images-list">
                          {images.map((src, index) => (
                            <div
                              key={`${productKey}-${index}`}
                              className={`dashboard-product-image-item ${draggingImageRef?.productKey === productKey && draggingImageRef?.index === index ? 'dragging' : ''}`}
                              draggable
                              onDragStart={() => setDraggingImageRef({ productKey, index })}
                              onDragOver={(event) => event.preventDefault()}
                              onDrop={(event) => {
                                event.preventDefault();
                                if (!draggingImageRef) return;
                                if (draggingImageRef.productKey !== productKey) return;
                                reorderProductImages(productKey, draggingImageRef.index, index);
                                setDraggingImageRef(null);
                              }}
                              onDragEnd={() => setDraggingImageRef(null)}
                            >
                              <img src={src} alt={`${productKey} ${index + 1}`} />
                              {/* <p className="dashboard-image-index">Image {index + 1}</p> */}
                              <div className="dashboard-image-actions">
                                <button
                                  type="button"
                                  className="dashboard-delete-action-btn dashboard-mini-action-btn"
                                  onClick={() => reorderProductImages(productKey, index, Math.max(0, index - 1))}
                                  disabled={index === 0}
                                  aria-label="Monter"
                                  title="Monter"
                                >
                                  ↑
                                </button>
                                <button
                                  type="button"
                                  className="dashboard-delete-action-btn dashboard-mini-action-btn"
                                  onClick={() => reorderProductImages(productKey, index, Math.min(images.length - 1, index + 1))}
                                  disabled={index === images.length - 1}
                                  aria-label="Descendre"
                                  title="Descendre"
                                >
                                  ↓
                                </button>
                                <button
                                  type="button"
                                  className="dashboard-delete-action-btn dashboard-image-remove-btn"
                                  onClick={() => removeProductImage(productKey, index)}
                                >
                                  Suppr.
                                </button>
                              </div>
                            </div>
                          ))}
                          {!images.length ? <p className="dashboard-images-empty">Aucune image pour ce produit.</p> : null}
                        </div>
                      </div>
                    );
                  })}
                </div>
                {!catalogProducts.length ? (
                  <p className="empty-state">Aucun produit actif.</p>
                ) : null}
              </div>

              <div className="dashboard-check-group dashboard-options-editor-group">
                <p className="dashboard-check-title">Options par produit (dynamiques)</p>
                <p className="config-help">Chaque produit peut avoir ses propres options (ex: Capteur, Couleur, Chauffage, etc.).</p>
                <div className="dashboard-options-editor-list">
                  {catalogProducts.map((productItem) => {
                    const productKey = productItem.key;
                    const optionDefs = Array.isArray(productOptionDefsByProductKey[productKey])
                      ? productOptionDefsByProductKey[productKey]
                      : [];
                    const draft = newOptionDraftByProductKey[productKey] || { key: '', label: '', icon: 'none', imageSrc: '' };
                    const isExpanded = expandedOptionProductKey === productKey;
                    return (
                      <div key={productKey} className={`dashboard-product-images-block dashboard-options-editor-block ${isExpanded ? 'expanded' : ''}`}>
                        <button
                          type="button"
                          className="dashboard-options-editor-toggle"
                          onClick={() => setExpandedOptionProductKey((prev) => (prev === productKey ? '' : productKey))}
                        >
                          <strong>{productItem.label || productKey}</strong>
                          <span className="dashboard-image-count-badge">{optionDefs.length} option(s)</span>
                        </button>

                        {isExpanded ? (
                          <>
                            <div className="dashboard-home-stack">
                              {optionDefs.map((option) => (
                                <div key={`${productKey}-${option.key}`} className="dashboard-home-subcard dashboard-home-subcard-nested">
                                  <div className="dashboard-home-grid dashboard-home-grid-3">
                                    <label className="dashboard-home-label">
                                      Libelle
                                      <input
                                        type="text"
                                        className="dashboard-search-input"
                                        value={option.label || ''}
                                        onChange={(event) => updateProductOption(productKey, option.key, 'label', event.target.value)}
                                      />
                                    </label>
                                    <label className="dashboard-home-label">
                                      Cle
                                      <input
                                        type="text"
                                        className="dashboard-search-input"
                                        value={option.key || ''}
                                        disabled
                                      />
                                    </label>
                                    <label className="dashboard-home-label">
                                      Icone
                                      <select
                                        className="dashboard-search-input"
                                        value={option.icon || 'none'}
                                        onChange={(event) => updateProductOption(productKey, option.key, 'icon', event.target.value)}
                                      >
                                        {PRODUCT_OPTION_ICON_CHOICES.map((iconKey) => (
                                          <option key={iconKey} value={iconKey}>{iconKey}</option>
                                        ))}
                                      </select>
                                    </label>
                                    <div className="dashboard-home-label">
                                      <span>Image option</span>
                                      <label className="dashboard-file-label dashboard-file-label-inline">
                                        <input
                                          type="file"
                                          accept="image/*"
                                          onChange={(event) => {
                                            const file = event.target.files?.[0];
                                            if (file) updateProductOptionImage(productKey, option.key, file);
                                            event.target.value = '';
                                          }}
                                        />
                                        <span>{option.imageSrc ? 'Changer image' : 'Ajouter image'}</span>
                                      </label>
                                    </div>
                                  </div>
                                  <div className="dashboard-home-subcard-head">
                                    <span className="dashboard-option-label">
                                      {option.imageSrc ? (
                                        <img src={option.imageSrc} alt="" className="dashboard-option-icon" loading="lazy" decoding="async" />
                                      ) : getOptionIconImage(option) ? (
                                        <img src={getOptionIconImage(option)} alt="" className="dashboard-option-icon" loading="lazy" decoding="async" />
                                      ) : option.icon ? (
                                        <span className="dashboard-option-emoji">{OPTION_ICON_MARK[option.icon] || '▫️'}</span>
                                      ) : (
                                        <span className="dashboard-option-emoji">▫️</span>
                                      )}
                                      <span>{option.label || option.key}</span>
                                    </span>
                                    <button
                                      type="button"
                                      className="dashboard-delete-action-btn"
                                      onClick={() => removeProductOption(productKey, option.key)}
                                    >
                                      Suppr.
                                    </button>
                                  </div>
                                </div>
                              ))}
                              {!optionDefs.length ? <p className="dashboard-images-empty">Aucune option pour ce produit.</p> : null}
                            </div>
                            <div className="dashboard-home-grid dashboard-home-grid-3">
                              <label className="dashboard-home-label">
                                Nouveau libelle
                                <input
                                  type="text"
                                  className="dashboard-search-input"
                                  value={draft.label}
                                  onChange={(event) => updateOptionDraft(productKey, 'label', event.target.value)}
                                />
                              </label>
                              <label className="dashboard-home-label">
                                Cle (optionnel)
                                <input
                                  type="text"
                                  className="dashboard-search-input"
                                  value={draft.key}
                                  onChange={(event) => updateOptionDraft(productKey, 'key', event.target.value)}
                                />
                              </label>
                              <label className="dashboard-home-label">
                                Icone
                                <select
                                  className="dashboard-search-input"
                                  value={draft.icon}
                                  onChange={(event) => updateOptionDraft(productKey, 'icon', event.target.value)}
                                >
                                  {PRODUCT_OPTION_ICON_CHOICES.map((iconKey) => (
                                    <option key={iconKey} value={iconKey}>{iconKey}</option>
                                  ))}
                                </select>
                              </label>
                            </div>
                            <button type="button" className="year-filter-btn active" onClick={() => addProductOption(productKey)}>
                              + Ajouter option
                            </button>
                          </>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
                {!catalogProducts.length ? <p className="empty-state">Aucun produit actif.</p> : null}
              </div>
            </article>
          </div>
        ) : null}

        {activeTab === 'home_content' ? (
          <article className="dashboard-catalog-col dashboard-home-content-col">
            <h3>Contenu page accueil</h3>
            <p className="config-help">Editez les sections directement. Sauvegarde en base sur `app_settings.home_content`.</p>
            {homeContentLoading ? <p className="empty-state">Chargement...</p> : null}
            {homeContentMessage ? <p className="empty-state">{homeContentMessage}</p> : null}

            <section className="dashboard-home-form-block">
              <h4>Hero</h4>
              <div className="dashboard-home-grid dashboard-home-grid-4">
                {(homeContentForm.heroOverlayLines || []).map((line, index) => (
                  <label key={`hero-${index}`} className="dashboard-home-label">
                    Ligne {index + 1}
                    <input
                      type="text"
                      className="dashboard-search-input"
                      value={line}
                      onChange={(event) => updateHomeListValue('heroOverlayLines', index, event.target.value)}
                    />
                  </label>
                ))}
              </div>
              <div className="dashboard-home-grid dashboard-home-grid-3">
                {(homeContentForm.trustStrip || []).map((line, index) => (
                  <label key={`trust-${index}`} className="dashboard-home-label">
                    Badge {index + 1}
                    <input
                      type="text"
                      className="dashboard-search-input"
                      value={line}
                      onChange={(event) => updateHomeListValue('trustStrip', index, event.target.value)}
                    />
                  </label>
                ))}
              </div>
            </section>

            <section className="dashboard-home-form-block">
              <h4>Contacts mecaniciens</h4>
              <div className="dashboard-home-grid dashboard-home-grid-2">
                <label className="dashboard-home-label">
                  Titre section
                  <input
                    type="text"
                    className="dashboard-search-input"
                    value={homeContentForm.mechanicSectionTitle || ''}
                    onChange={(event) => setHomeContentForm((prev) => ({ ...prev, mechanicSectionTitle: event.target.value }))}
                  />
                </label>
                <label className="dashboard-home-label">
                  Intro section
                  <input
                    type="text"
                    className="dashboard-search-input"
                    value={homeContentForm.mechanicSectionIntro || ''}
                    onChange={(event) => setHomeContentForm((prev) => ({ ...prev, mechanicSectionIntro: event.target.value }))}
                  />
                </label>
              </div>
              <div className="dashboard-home-stack">
                {(homeContentForm.mechanicGroups || []).map((group, groupIndex) => (
                  <div className="dashboard-home-subcard" key={`mechanic-group-${groupIndex}`}>
                    <div className="dashboard-home-subcard-head">
                      <p className="dashboard-check-title">Groupe {groupIndex + 1}</p>
                      <button
                        type="button"
                        className="dashboard-delete-action-btn"
                        onClick={() => removeMechanicGroup(groupIndex)}
                      >
                        Suppr. groupe
                      </button>
                    </div>
                    <label className="dashboard-home-label">
                      Nom du groupe
                      <input
                        type="text"
                        className="dashboard-search-input"
                        value={group.group || ''}
                        onChange={(event) => updateMechanicGroupField(groupIndex, 'group', event.target.value)}
                      />
                    </label>

                    <div className="dashboard-home-stack">
                      {(group.contacts || []).map((contact, contactIndex) => (
                        <div className="dashboard-home-subcard dashboard-home-subcard-nested" key={`mechanic-contact-${groupIndex}-${contactIndex}`}>
                          <div className="dashboard-home-subcard-head">
                            <p className="dashboard-check-title">Contact {contactIndex + 1}</p>
                            <button
                              type="button"
                              className="dashboard-delete-action-btn"
                              onClick={() => removeMechanicContact(groupIndex, contactIndex)}
                            >
                              Suppr. contact
                            </button>
                          </div>
                          <div className="dashboard-home-grid dashboard-home-grid-2">
                            <label className="dashboard-home-label">
                              Nom
                              <input
                                type="text"
                                className="dashboard-search-input"
                                value={contact.name || ''}
                                onChange={(event) => updateMechanicContactField(groupIndex, contactIndex, 'name', event.target.value)}
                              />
                            </label>
                            <label className="dashboard-home-label">
                              Telephone
                              <input
                                type="text"
                                className="dashboard-search-input"
                                value={contact.phone || ''}
                                onChange={(event) => updateMechanicContactField(groupIndex, contactIndex, 'phone', event.target.value)}
                              />
                            </label>
                            <label className="dashboard-home-label">
                              Adresse
                              <input
                                type="text"
                                className="dashboard-search-input"
                                value={contact.address || ''}
                                onChange={(event) => updateMechanicContactField(groupIndex, contactIndex, 'address', event.target.value)}
                              />
                            </label>
                            <label className="dashboard-home-label">
                              Image URL
                              <input
                                type="text"
                                className="dashboard-search-input"
                                value={contact.image || ''}
                                onChange={(event) => updateMechanicContactField(groupIndex, contactIndex, 'image', event.target.value)}
                              />
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      className="secondary-button dashboard-home-add-btn"
                      onClick={() => addMechanicContact(groupIndex)}
                    >
                      + Ajouter contact
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="secondary-button dashboard-home-add-btn"
                onClick={addMechanicGroup}
              >
                + Ajouter groupe
              </button>
            </section>

            <section className="dashboard-home-form-block">
              <h4>Produits en vedette</h4>
              <label className="dashboard-home-label">
                Titre section
                <input
                  type="text"
                  className="dashboard-search-input"
                  value={homeContentForm.featuredSectionTitle || ''}
                  onChange={(event) => setHomeContentForm((prev) => ({ ...prev, featuredSectionTitle: event.target.value }))}
                />
              </label>
              <div className="dashboard-home-stack">
                {(homeContentForm.featuredItems || []).map((item, index) => (
                  <div className="dashboard-home-subcard" key={`featured-${index}`}>
                    <p className="dashboard-check-title">Carte {index + 1}</p>
                    <label className="dashboard-home-label">
                      Titre
                      <input
                        type="text"
                        className="dashboard-search-input"
                        value={item.title || ''}
                        onChange={(event) => updateHomeFeatured(index, 'title', event.target.value)}
                      />
                    </label>
                    <label className="dashboard-home-label">
                      Description
                      <input
                        type="text"
                        className="dashboard-search-input"
                        value={item.description || ''}
                        onChange={(event) => updateHomeFeatured(index, 'description', event.target.value)}
                      />
                    </label>
                    <label className="dashboard-home-label">
                      Image URL
                      <input
                        type="text"
                        className="dashboard-search-input"
                        value={item.image || ''}
                        onChange={(event) => updateHomeFeatured(index, 'image', event.target.value)}
                      />
                    </label>
                  </div>
                ))}
              </div>
            </section>

            <section className="dashboard-home-form-block">
              <h4>Pourquoi nous choisir</h4>
              <label className="dashboard-home-label">
                Titre section
                <input
                  type="text"
                  className="dashboard-search-input"
                  value={homeContentForm.whySectionTitle || ''}
                  onChange={(event) => setHomeContentForm((prev) => ({ ...prev, whySectionTitle: event.target.value }))}
                />
              </label>
              <div className="dashboard-home-stack">
                {(homeContentForm.whyItems || []).map((item, index) => (
                  <div className="dashboard-home-subcard" key={`why-${index}`}>
                    <p className="dashboard-check-title">Bloc {index + 1}</p>
                    <div className="dashboard-home-grid dashboard-home-grid-3">
                      <label className="dashboard-home-label">
                        Icone
                        <select
                          className="dashboard-search-input"
                          value={item.icon || 'support'}
                          onChange={(event) => updateHomeWhyItem(index, 'icon', event.target.value)}
                        >
                          {HOME_WHY_ICON_CHOICES.map((iconType) => (
                            <option key={iconType} value={iconType}>{iconType}</option>
                          ))}
                        </select>
                      </label>
                      <label className="dashboard-home-label">
                        Titre
                        <input
                          type="text"
                          className="dashboard-search-input"
                          value={item.title || ''}
                          onChange={(event) => updateHomeWhyItem(index, 'title', event.target.value)}
                        />
                      </label>
                      <label className="dashboard-home-label">
                        Description
                        <input
                          type="text"
                          className="dashboard-search-input"
                          value={item.description || ''}
                          onChange={(event) => updateHomeWhyItem(index, 'description', event.target.value)}
                        />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="dashboard-home-form-block">
              <h4>CTA final</h4>
              <div className="dashboard-home-grid dashboard-home-grid-3">
                <label className="dashboard-home-label">
                  Titre
                  <input
                    type="text"
                    className="dashboard-search-input"
                    value={homeContentForm.finalCta?.title || ''}
                    onChange={(event) => setHomeContentForm((prev) => ({
                      ...prev,
                      finalCta: { ...(prev.finalCta || {}), title: event.target.value },
                    }))}
                  />
                </label>
                <label className="dashboard-home-label">
                  Description
                  <input
                    type="text"
                    className="dashboard-search-input"
                    value={homeContentForm.finalCta?.description || ''}
                    onChange={(event) => setHomeContentForm((prev) => ({
                      ...prev,
                      finalCta: { ...(prev.finalCta || {}), description: event.target.value },
                    }))}
                  />
                </label>
                <label className="dashboard-home-label">
                  Label bouton
                  <input
                    type="text"
                    className="dashboard-search-input"
                    value={homeContentForm.finalCta?.buttonLabel || ''}
                    onChange={(event) => setHomeContentForm((prev) => ({
                      ...prev,
                      finalCta: { ...(prev.finalCta || {}), buttonLabel: event.target.value },
                    }))}
                  />
                </label>
              </div>
            </section>

            <section className="dashboard-home-form-block">
              <h4>SEO cards</h4>
              <div className="dashboard-home-grid dashboard-home-grid-2">
                <label className="dashboard-home-label">
                  Titre section SEO
                  <input
                    type="text"
                    className="dashboard-search-input"
                    value={homeContentForm.seo?.title || ''}
                    onChange={(event) => updateHomeSeo('title', event.target.value)}
                  />
                </label>
                <label className="dashboard-home-label">
                  Intro SEO
                  <input
                    type="text"
                    className="dashboard-search-input"
                    value={homeContentForm.seo?.intro || ''}
                    onChange={(event) => updateHomeSeo('intro', event.target.value)}
                  />
                </label>
              </div>
              <div className="dashboard-home-stack">
                {(homeContentForm.seo?.cards || []).map((card, cardIndex) => (
                  <div className="dashboard-home-subcard" key={`seo-card-${cardIndex}`}>
                    <label className="dashboard-home-label">
                      Titre carte {cardIndex + 1}
                      <input
                        type="text"
                        className="dashboard-search-input"
                        value={card.title || ''}
                        onChange={(event) => updateHomeSeoCard(cardIndex, 'title', event.target.value)}
                      />
                    </label>
                    <label className="dashboard-home-label">
                      Liens (1 ligne = `label|href`, href optionnel)
                      <textarea
                        className="dashboard-home-links-textarea"
                        value={seoLinksToText(card.links)}
                        onChange={(event) => updateHomeSeoCard(cardIndex, 'links', event.target.value)}
                        rows={Math.max(3, (card.links || []).length + 1)}
                      />
                    </label>
                  </div>
                ))}
              </div>
            </section>

            <div className="dashboard-add-row">
              <button
                type="button"
                className="year-filter-btn active"
                onClick={handleSaveHomeContent}
                disabled={homeContentSaving}
              >
                {homeContentSaving ? 'Sauvegarde...' : 'Sauvegarder'}
              </button>
              <button
                type="button"
                className="secondary-button"
                onClick={handleResetHomeContent}
                disabled={homeContentSaving}
              >
                Reinitialiser au modele
              </button>
            </div>
          </article>
        ) : null}
      </section>
    </div>
  );
}
