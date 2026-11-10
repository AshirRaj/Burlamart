/**
 * Burlamart Centralized API Service Layer
 * 
 * NOTE FOR BACKEND DEVELOPER:
 * All endpoints below represent the planned API contracts. When ready,
 * set VITE_ENABLE_MOCK_DATA=false in your .env file and specify VITE_API_BASE_URL.
 * 
 * Proposed Backend Endpoint Map:
 * - Auth: POST /auth/login, POST /auth/otp, POST /auth/logout
 * - Categories: GET /categories, PUT /categories/:id/template
 * - Shops: GET /shops, GET /shops/:id, PUT /shops/:id/storefront
 * - Products: GET /products, GET /products/:id, POST /products, PUT /products/:id
 * - Master Templates: GET /templates, POST /templates, POST /templates/:id/use
 * - Orders: GET /orders, POST /orders, PUT /orders/:id/status, PUT /orders/:id/reassign
 * - Rider: GET /rider/orders, PUT /rider/orders/:id/accept, PUT /rider/orders/:id/split-payment
 * - Settings: GET /admin/settings, PUT /admin/settings
 * - Wallet & Rewards: GET /wallet/balance, POST /wallet/redeem, POST /rewards/spin
 */

import {
  INITIAL_CATEGORIES,
  INITIAL_SHOPS,
  INITIAL_PRODUCTS,
  INITIAL_MASTER_TEMPLATES,
  INITIAL_ORDERS,
  INITIAL_RIDERS,
  INITIAL_PLATFORM_SETTINGS,
  INITIAL_USER_SAVED_COMBOS
} from './mockData';
import { ALL_GROCERY_PRODUCTS } from '../components/grocery/groceryData';
import { ALL_ELECTRONICS_PRODUCTS } from '../components/electronics/electronicsData';
import { PACKAGED_PRODUCTS } from '../data/packagedFoodData';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const USE_MOCK = import.meta.env.VITE_ENABLE_MOCK_DATA !== 'false';

// Local storage persistent helper for mock state
const getStoredState = (key, initial) => {
  try {
    const item = localStorage.getItem(`burlamart_${key}`);
    if (!item) return initial;
    const parsed = JSON.parse(item);
    // If initial has missing items or updated hotel services, merge them
    if (Array.isArray(initial) && Array.isArray(parsed)) {
      const initialMap = new Map(initial.map(i => [i.id, i]));
      const updatedParsed = parsed.map(item => {
        const fresh = initialMap.get(item.id);
        if (fresh && fresh.category === 'hotels-services') {
          return { ...item, ...fresh };
        }
        return item;
      });
      const existingIds = new Set(updatedParsed.map(i => i.id));
      const missing = initial.filter(i => !existingIds.has(i.id));
      const merged = [...updatedParsed, ...missing];
      if (missing.length > 0 || key === 'products') {
        localStorage.setItem(`burlamart_${key}`, JSON.stringify(merged));
      }
      return merged;
    }
    return parsed;
  } catch (e) {
    return initial;
  }
};

const setStoredState = (key, data) => {
  try {
    localStorage.setItem(`burlamart_${key}`, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('burlamart_db_updated', { detail: { key } }));
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }
};

// API modules
export const api = {
  // 1. Categories & Layout Templates
  categories: {
    getAll: async () => {
      if (USE_MOCK) {
        return getStoredState('categories', INITIAL_CATEGORIES);
      }
      const res = await fetch(`${BASE_URL}/categories`);
      return res.json();
    },
    updateTemplate: async (categoryId, layoutTemplate) => {
      if (USE_MOCK) {
        const categories = getStoredState('categories', INITIAL_CATEGORIES);
        const updated = categories.map(cat => 
          cat.id === categoryId ? { ...cat, layoutTemplate } : cat
        );
        setStoredState('categories', updated);
        return updated;
      }
      const res = await fetch(`${BASE_URL}/categories/${categoryId}/template`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ layoutTemplate })
      });
      return res.json();
    }
  },

  // 2. Shops & Storefronts
  shops: {
    getAll: async (filter = {}) => {
      if (USE_MOCK) {
        let list = getStoredState('shops', INITIAL_SHOPS);
        if (filter.category) {
          list = list.filter(s => s.category === filter.category);
        }
        return list;
      }
      const params = new URLSearchParams(filter).toString();
      const res = await fetch(`${BASE_URL}/shops?${params}`);
      return res.json();
    },
    getById: async (shopId) => {
      if (USE_MOCK) {
        const list = getStoredState('shops', INITIAL_SHOPS);
        return list.find(s => s.id === shopId) || list[0];
      }
      const res = await fetch(`${BASE_URL}/shops/${shopId}`);
      return res.json();
    },
    updateStorefront: async (shopId, storefrontData) => {
      if (USE_MOCK) {
        const list = getStoredState('shops', INITIAL_SHOPS);
        const updated = list.map(s => s.id === shopId ? { ...s, ...storefrontData } : s);
        setStoredState('shops', updated);
        return updated.find(s => s.id === shopId);
      }
      const res = await fetch(`${BASE_URL}/shops/${shopId}/storefront`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(storefrontData)
      });
      return res.json();
    }
  },

  // 3. Products & Catalogue
  products: {
    getAll: async (filter = {}) => {
      if (USE_MOCK) {
        let list = getStoredState('products', INITIAL_PRODUCTS);
        const existingIds = new Set(list.map(p => p.id));
        const missingElec = ALL_ELECTRONICS_PRODUCTS.filter(p => !existingIds.has(p.id));
        list = [...list, ...missingElec];
        const afterElecIds = new Set(list.map(p => p.id));
        const missingPackaged = PACKAGED_PRODUCTS
          .filter(p => !afterElecIds.has(p.id))
          .map(p => ({ ...p, category: 'packaged-food', subCategory: p.category, shopId: p.shopId || 'shop-5' }));
        list = [...list, ...missingPackaged];

        if (filter.category) list = list.filter(p => p.category === filter.category);
        if (filter.shopId) list = list.filter(p => p.shopId === filter.shopId);
        if (filter.search) {
          const q = filter.search.toLowerCase();
          list = list.filter(p => 
            p.name.toLowerCase().includes(q) || 
            (p.description && p.description.toLowerCase().includes(q)) ||
            (p.subCategory && p.subCategory.toLowerCase().includes(q)) ||
            (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
          );
        }
        return list;
      }
      const params = new URLSearchParams(filter).toString();
      const res = await fetch(`${BASE_URL}/products?${params}`);
      return res.json();
    },
    getById: async (productId) => {
      if (USE_MOCK) {
        const list = getStoredState('products', INITIAL_PRODUCTS);
        const found = list.find(p => p.id === productId);
        if (found) return found;
        const catalogFound = ALL_GROCERY_PRODUCTS.find(p => p.id === productId);
        if (catalogFound) return { ...catalogFound, shopId: 'shop-1' };
        const elecFound = ALL_ELECTRONICS_PRODUCTS.find(p => p.id === productId);
        if (elecFound) return { ...elecFound, shopId: 'shop-4' };
        const packagedFound = PACKAGED_PRODUCTS.find(p => p.id === productId);
        if (packagedFound) {
          return {
            ...packagedFound,
            category: 'packaged-food',
            subCategory: packagedFound.category,
            shopId: packagedFound.shopId || 'shop-5'
          };
        }
        return null;
      }
      const res = await fetch(`${BASE_URL}/products/${productId}`);
      return res.json();
    },
    save: async (productData) => {
      if (USE_MOCK) {
        const list = getStoredState('products', INITIAL_PRODUCTS);
        let updated;
        if (productData.id) {
          updated = list.map(p => p.id === productData.id ? { ...p, ...productData } : p);
        } else {
          const newProd = {
            ...productData,
            id: `prod-${Date.now()}`,
            rating: 5.0,
            reviewsCount: 1
          };
          updated = [newProd, ...list];
        }
        setStoredState('products', updated);
        return productData.id ? productData : updated[0];
      }
      const res = await fetch(`${BASE_URL}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });
      return res.json();
    }
  },

  // 4. Master Product Templates
  masterTemplates: {
    getAll: async () => {
      if (USE_MOCK) {
        return getStoredState('master_templates', INITIAL_MASTER_TEMPLATES);
      }
      const res = await fetch(`${BASE_URL}/templates`);
      return res.json();
    },
    save: async (templateData) => {
      if (USE_MOCK) {
        const list = getStoredState('master_templates', INITIAL_MASTER_TEMPLATES);
        let updated;
        if (templateData.id) {
          updated = list.map(t => t.id === templateData.id ? { ...t, ...templateData } : t);
        } else {
          const newT = { ...templateData, id: `mt-${Date.now()}`, usageCount: 0 };
          updated = [newT, ...list];
        }
        setStoredState('master_templates', updated);
        return templateData.id ? templateData : updated[0];
      }
      const res = await fetch(`${BASE_URL}/templates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(templateData)
      });
      return res.json();
    }
  },

  // 5. Orders & Live Tracking
  orders: {
    getAll: async (filter = {}) => {
      if (USE_MOCK) {
        let list = getStoredState('orders', INITIAL_ORDERS);
        if (filter.shopId) list = list.filter(o => o.shopId === filter.shopId);
        if (filter.riderId) list = list.filter(o => o.riderId === filter.riderId);
        if (filter.status) list = list.filter(o => o.status === filter.status);
        return list;
      }
      const params = new URLSearchParams(filter).toString();
      const res = await fetch(`${BASE_URL}/orders?${params}`);
      return res.json();
    },
    getById: async (orderId) => {
      if (USE_MOCK) {
        const list = getStoredState('orders', INITIAL_ORDERS);
        return list.find(o => o.id === orderId) || list[0];
      }
      const res = await fetch(`${BASE_URL}/orders/${orderId}`);
      return res.json();
    },
    create: async (orderPayload) => {
      if (USE_MOCK) {
        const list = getStoredState('orders', INITIAL_ORDERS);
        const generatedPin = String(Math.floor(1000 + Math.random() * 9000));
        const newOrder = {
          ...orderPayload,
          id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
          status: 'Order Placed',
          deliveryPin: orderPayload.deliveryPin || generatedPin,
          createdAt: new Date().toISOString(),
          timeline: [
            { status: 'Order Placed', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), done: true },
            { status: 'Shop Confirmed', time: 'In Progress...', done: false },
            { status: 'Rider Assigned', time: 'Pending', done: false },
            { status: 'Picked Up', time: 'Pending', done: false },
            { status: 'Delivered', time: 'Pending', done: false },
            { status: 'Payment Recorded', time: 'Pending', done: false }
          ]
        };
        const updated = [newOrder, ...list];
        setStoredState('orders', updated);

        // Auto-decrement product stock in catalogue for purchased items
        if (Array.isArray(orderPayload.items) && orderPayload.items.length > 0) {
          const prods = getStoredState('products', INITIAL_PRODUCTS);
          const qtyMap = new Map(orderPayload.items.map(i => [i.id, i.quantity || 1]));
          const updatedProds = prods.map(p => {
            if (qtyMap.has(p.id) && typeof p.stock === 'number') {
              const nextStock = Math.max(0, p.stock - qtyMap.get(p.id));
              return { ...p, stock: nextStock, limitedStock: nextStock > 0 && nextStock <= 5 };
            }
            return p;
          });
          setStoredState('products', updatedProds);
        }

        return newOrder;
      }
      const res = await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });
      return res.json();
    },
    updateStatus: async (orderId, newStatus, riderNote = '', extraFields = {}) => {
      if (USE_MOCK) {
        const list = getStoredState('orders', INITIAL_ORDERS);
        const updated = list.map(ord => {
          if (ord.id === orderId) {
            const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const timeline = (ord.timeline || []).map(t => {
              if (t.status.toLowerCase().includes(newStatus.toLowerCase())) {
                return { ...t, done: true, time: timeStr, note: riderNote || t.note };
              }
              return t;
            });
            return { ...ord, ...extraFields, status: newStatus, timeline };
          }
          return ord;
        });
        setStoredState('orders', updated);
        return updated.find(o => o.id === orderId);
      }
      const res = await fetch(`${BASE_URL}/orders/${orderId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, note: riderNote })
      });
      return res.json();
    },
    recordSplitPayment: async (orderId, splitData) => {
      if (USE_MOCK) {
        const list = getStoredState('orders', INITIAL_ORDERS);
        const updated = list.map(ord => 
          ord.id === orderId ? { ...ord, codSplit: splitData, paymentStatus: 'Recorded', status: 'Delivered' } : ord
        );
        setStoredState('orders', updated);
        return updated.find(o => o.id === orderId);
      }
      const res = await fetch(`${BASE_URL}/orders/${orderId}/split-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(splitData)
      });
      return res.json();
    },
    reassignToShop: async (orderId, newShopId, reason = 'Out of Stock') => {
      if (USE_MOCK) {
        const list = getStoredState('orders', INITIAL_ORDERS);
        const shops = getStoredState('shops', INITIAL_SHOPS);
        const targetShop = shops.find(s => s.id === newShopId) || shops[1] || shops[0];
        const updated = list.map(ord => {
          if (ord.id === orderId) {
            const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const timeline = [
              ...(ord.timeline || []),
              {
                status: 'Reassigned',
                time: timeStr,
                note: `Order auto-forwarded to ${targetShop.name} (${reason})`,
                done: true
              }
            ];
            return {
              ...ord,
              shopId: targetShop.id,
              shopName: targetShop.name,
              reassignedFrom: ord.shopName,
              reassignmentReason: reason,
              status: 'Order Placed',
              timeline
            };
          }
          return ord;
        });
        setStoredState('orders', updated);
        return updated.find(o => o.id === orderId);
      }
      const res = await fetch(`${BASE_URL}/orders/${orderId}/reassign`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newShopId, reason })
      });
      return res.json();
    }
  },

  // 6. Platform Settings & Audit
  settings: {
    get: async () => {
      if (USE_MOCK) {
        return getStoredState('platform_settings', INITIAL_PLATFORM_SETTINGS);
      }
      const res = await fetch(`${BASE_URL}/admin/settings`);
      return res.json();
    },
    update: async (partialSettings, adminName = 'SuperAdmin') => {
      if (USE_MOCK) {
        const current = getStoredState('platform_settings', INITIAL_PLATFORM_SETTINGS);
        const updated = {
          ...current,
          ...partialSettings,
          auditLogs: [
            {
              id: `log-${Date.now()}`,
              admin: adminName,
              action: `Updated settings: ${Object.keys(partialSettings).join(', ')}`,
              timestamp: new Date().toLocaleString()
            },
            ...(current.auditLogs || [])
          ]
        };
        setStoredState('platform_settings', updated);
        return updated;
      }
      const res = await fetch(`${BASE_URL}/admin/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(partialSettings)
      });
      return res.json();
    }
  },

  // 7. My Combos (Save & Reorder cart)
  combos: {
    getAll: async () => {
      return getStoredState('user_combos', INITIAL_USER_SAVED_COMBOS);
    },
    save: async (combo) => {
      const list = getStoredState('user_combos', INITIAL_USER_SAVED_COMBOS);
      const newCombo = { ...combo, id: `combo-${Date.now()}`, createdAt: new Date().toLocaleDateString() };
      const updated = [newCombo, ...list];
      setStoredState('user_combos', updated);
      return updated;
    },
    delete: async (comboId) => {
      const list = getStoredState('user_combos', INITIAL_USER_SAVED_COMBOS);
      const updated = list.filter(c => c.id !== comboId);
      setStoredState('user_combos', updated);
      return updated;
    }
  }
};

