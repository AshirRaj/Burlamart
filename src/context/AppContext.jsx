import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { INITIAL_PLATFORM_SETTINGS, INITIAL_CATEGORIES } from '../services/mockData';
import { INITIAL_PROMOTIONAL_BANNERS } from '../data/bannerData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [platformSettings, setPlatformSettings] = useState(INITIAL_PLATFORM_SETTINGS);
  const [promotionalBanners, setPromotionalBanners] = useState(() => {
    try {
      const saved = localStorage.getItem('burlamart_promotional_banners');
      return saved ? JSON.parse(saved) : INITIAL_PROMOTIONAL_BANNERS;
    } catch {
      return INITIAL_PROMOTIONAL_BANNERS;
    }
  });
  const [sharedWalletBalance, setSharedWalletBalance] = useState(140); // Customer reward points
  const [vendorCoinBalance, setVendorCoinBalance] = useState(250); // Vendor coin balance for templates/boosts
  const [language, setLanguage] = useState('English');
  const [notifications, setNotifications] = useState({
    push: true,
    sms: true,
    whatsapp: true,
  });
  const [loading, setLoading] = useState(true);

  // Initialize categories and settings from API / storage
  useEffect(() => {
    const initData = async () => {
      try {
        const [cats, sets] = useStateData();
        setCategories(cats);
        setPlatformSettings(sets);
      } catch (err) {
        console.error('Error initializing app data', err);
      } finally {
        setLoading(false);
      }
    };
    initData();
  }, []);

  const useStateData = () => {
    const savedCats = localStorage.getItem('burlamart_categories');
    const savedSets = localStorage.getItem('burlamart_platform_settings');
    const parsedCats = (savedCats ? JSON.parse(savedCats) : INITIAL_CATEGORIES)
      .filter(c => c.id !== 'fashion' && c.id !== 'pharmacy');
    // Keep localStorage clean of removed categories
    if (savedCats) {
      localStorage.setItem('burlamart_categories', JSON.stringify(parsedCats));
    }
    return [
      parsedCats,
      savedSets ? JSON.parse(savedSets) : INITIAL_PLATFORM_SETTINGS
    ];
  };

  // Admin updates category layout template
  const updateCategoryTemplate = async (categoryId, layoutTemplate) => {
    const updated = await api.categories.updateTemplate(categoryId, layoutTemplate);
    setCategories(updated);
    localStorage.setItem('burlamart_categories', JSON.stringify(updated));
    return updated;
  };

  // Admin updates platform settings
  const updateSettings = async (partialSettings, adminName = 'SuperAdmin') => {
    const updated = await api.settings.update(partialSettings, adminName);
    setPlatformSettings(updated);
    localStorage.setItem('burlamart_platform_settings', JSON.stringify(updated));
    return updated;
  };

  // Shared Wallet reward operations
  const creditSharedWallet = (amount) => {
    setSharedWalletBalance(prev => Math.round(prev + amount));
  };

  const debitSharedWallet = (amount) => {
    setSharedWalletBalance(prev => Math.max(0, prev - amount));
  };

  // Vendor Coin operations
  const spendVendorCoins = (amount) => {
    if (vendorCoinBalance >= amount) {
      setVendorCoinBalance(prev => prev - amount);
      return true;
    }
    return false;
  };

  const buyVendorCoins = (amount) => {
    setVendorCoinBalance(prev => prev + amount);
  };

  // Banner Management Operations (Admin)
  const updateBanner = (bannerId, updatedFields) => {
    setPromotionalBanners(prev => {
      const current = prev[bannerId] || {};
      const next = {
        ...prev,
        [bannerId]: { ...current, ...updatedFields }
      };
      localStorage.setItem('burlamart_promotional_banners', JSON.stringify(next));
      return next;
    });
  };

  const toggleBannerActive = (bannerId) => {
    setPromotionalBanners(prev => {
      const current = prev[bannerId];
      if (!current) return prev;
      const next = {
        ...prev,
        [bannerId]: { ...current, isActive: !current.isActive }
      };
      localStorage.setItem('burlamart_promotional_banners', JSON.stringify(next));
      return next;
    });
  };

  const resetBanners = () => {
    setPromotionalBanners(INITIAL_PROMOTIONAL_BANNERS);
    localStorage.setItem('burlamart_promotional_banners', JSON.stringify(INITIAL_PROMOTIONAL_BANNERS));
  };

  return (
    <AppContext.Provider value={{
      categories,
      setCategories,
      updateCategoryTemplate,
      platformSettings,
      updateSettings,
      promotionalBanners,
      updateBanner,
      toggleBannerActive,
      resetBanners,
      sharedWalletBalance,
      creditSharedWallet,
      debitSharedWallet,
      vendorCoinBalance,
      spendVendorCoins,
      buyVendorCoins,
      language,
      setLanguage,
      notifications,
      setNotifications,
      loading
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);

