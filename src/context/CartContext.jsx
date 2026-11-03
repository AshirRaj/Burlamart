import React, { createContext, useContext, useState, useMemo } from 'react';
import { useApp } from './AppContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { platformSettings } = useApp();

  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('burlamart_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [currentShop, setCurrentShop] = useState(() => {
    try {
      const saved = localStorage.getItem('burlamart_cart_shop');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [deliveryType, setDeliveryType] = useState('delivery'); // 'delivery' or 'pickup'
  const [address, setAddress] = useState('Flat 402, Sunshine Heights, Civil Lines, Jaipur (Pin 302006)');
  const [distanceKm, setDistanceKm] = useState(2.4);
  const [useFastDelivery, setUseFastDelivery] = useState(false);
  const [includePackaging, setIncludePackaging] = useState(true);
  const [shopConflictModal, setShopConflictModal] = useState(null); // { newProduct, newShop }

  // Save to storage
  const persistCart = (items, shop) => {
    setCartItems(items);
    setCurrentShop(shop);
    localStorage.setItem('burlamart_cart', JSON.stringify(items));
    localStorage.setItem('burlamart_cart_shop', JSON.stringify(shop));
  };

  // Add to cart with one-shop constraint
  const addToCart = (product, shop) => {
    if (cartItems.length > 0 && currentShop && shop && currentShop.id !== shop.id) {
      // Trigger one-shop conflict prompt
      setShopConflictModal({ newProduct: product, newShop: shop });
      return false;
    }

    const targetShop = currentShop || shop;
    const existingIndex = cartItems.findIndex(i => i.id === product.id);
    let updated;

    if (existingIndex > -1) {
      updated = cartItems.map((item, idx) => 
        idx === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updated = [...cartItems, { ...product, quantity: 1 }];
    }

    persistCart(updated, targetShop);
    return true;
  };

  const confirmSwitchShop = () => {
    if (shopConflictModal) {
      const { newProduct, newShop } = shopConflictModal;
      const updated = [{ ...newProduct, quantity: 1 }];
      persistCart(updated, newShop);
      setShopConflictModal(null);
    }
  };

  const cancelSwitchShop = () => {
    setShopConflictModal(null);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const updated = cartItems.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    persistCart(updated, currentShop);
  };

  const removeFromCart = (productId) => {
    const updated = cartItems.filter(item => item.id !== productId);
    const shopToKeep = updated.length === 0 ? null : currentShop;
    persistCart(updated, shopToKeep);
  };

  const clearCart = () => {
    persistCart([], null);
  };

  // Check if cart contains hotel stay or venue booking (where physical delivery does not apply)
  const isHotelStay = useMemo(() => {
    return currentShop?.category === 'hotels-services' || 
           cartItems.some(item => item.category === 'hotels-services');
  }, [currentShop, cartItems]);

  // Check if any item has limited stock (requires next-day delivery)
  const hasLimitedStock = useMemo(() => {
    return cartItems.some(item => item.limitedStock);
  }, [cartItems]);

  // Check if cart is eligible for EMI (category in emiCategories & subtotal >= emiMinCartValue)
  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }, [cartItems]);

  const totalWeightKg = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + ((item.weightKg || 0.2) * item.quantity), 0);
  }, [cartItems]);

  const totalQuantity = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  const isEmiEligible = useMemo(() => {
    const emiCats = platformSettings.emiCategories || ['electronics'];
    const minVal = platformSettings.emiMinCartValue || 3000;
    const hasEmiCategory = cartItems.some(i => emiCats.includes(i.category) || i.isEmiEligible);
    return hasEmiCategory && subtotal >= minVal;
  }, [cartItems, subtotal, platformSettings]);

  // Mandatory packaging if totalWeightKg >= mandatoryPackagingWeightW
  const isPackagingMandatory = useMemo(() => {
    return totalWeightKg >= (platformSettings.mandatoryPackagingWeightW || 6);
  }, [totalWeightKg, platformSettings]);

  // Fast delivery eligibility (only within R km & not limited-stock)
  const isFastDeliveryEligible = useMemo(() => {
    if (hasLimitedStock) return false;
    return distanceKm <= (platformSettings.fastDeliveryMaxDistanceR || 5);
  }, [distanceKm, platformSettings, hasLimitedStock]);

  // Dynamic calculations based on Admin settings
  const chargesBreakdown = useMemo(() => {
    if (cartItems.length === 0) {
      return {
        subtotal: 0,
        deliveryFee: 0,
        weightCharge: 0,
        quantityCharge: 0,
        packagingCharge: 0,
        fastDeliveryCharge: 0,
        total: 0
      };
    }

    // Hotel reservations & venue services have ZERO physical shipping/packaging charges
    if (isHotelStay) {
      return {
        subtotal,
        deliveryFee: 0,
        weightCharge: 0,
        quantityCharge: 0,
        packagingCharge: 0,
        fastDeliveryCharge: 0,
        total: subtotal
      };
    }

    if (deliveryType === 'pickup') {
      return {
        subtotal,
        deliveryFee: 0,
        weightCharge: 0,
        quantityCharge: 0,
        packagingCharge: 0,
        fastDeliveryCharge: 0,
        total: subtotal
      };
    }

    // 1. Base delivery fee by distance slabs
    const X = platformSettings.distanceSlabX || 3;
    const Y = platformSettings.distanceSlabY || 8;
    let baseDelivery = platformSettings.slab1Fee || 20;

    if (currentShop?.hasOwnDelivery) {
      baseDelivery = currentShop.ownDeliveryFee || 15;
    } else {
      if (distanceKm <= X) {
        baseDelivery = platformSettings.slab1Fee || 20;
      } else if (distanceKm <= Y) {
        baseDelivery = platformSettings.slab2Fee || 35;
      } else {
        const extraKm = distanceKm - Y;
        baseDelivery = (platformSettings.slab3Fee || 60) + Math.round(extraKm * (platformSettings.perKmRateBeyondY || 6));
      }
    }

    // 2. Extra charge by cart weight
    const weightThreshold = platformSettings.weightThresholdKg || 5;
    let weightCharge = 0;
    if (totalWeightKg > weightThreshold) {
      const extraWeight = Math.ceil(totalWeightKg - weightThreshold);
      weightCharge = extraWeight * (platformSettings.weightExtraPerKg || 10);
    }

    // 3. Extra charge by item quantity
    const quantityThreshold = platformSettings.quantityThreshold || 8;
    let quantityCharge = 0;
    if (totalQuantity > quantityThreshold) {
      const extraQty = totalQuantity - quantityThreshold;
      quantityCharge = extraQty * (platformSettings.quantityExtraPerItem || 5);
    }

    // 4. Packaging charge
    const effectivePackaging = isPackagingMandatory || includePackaging;
    const packagingCharge = effectivePackaging ? (platformSettings.packagingCharge || 15) : 0;

    // 5. Fast delivery charge
    const fastDeliveryCharge = (useFastDelivery && isFastDeliveryEligible) ? (platformSettings.fastDeliveryFee || 30) : 0;

    const total = subtotal + baseDelivery + weightCharge + quantityCharge + packagingCharge + fastDeliveryCharge;

    return {
      subtotal,
      deliveryFee: baseDelivery,
      weightCharge,
      quantityCharge,
      packagingCharge,
      fastDeliveryCharge,
      total
    };
  }, [
    cartItems,
    deliveryType,
    subtotal,
    currentShop,
    distanceKm,
    totalWeightKg,
    totalQuantity,
    includePackaging,
    isPackagingMandatory,
    useFastDelivery,
    isFastDeliveryEligible,
    platformSettings
  ]);

  return (
    <CartContext.Provider value={{
      cartItems,
      currentShop,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      totalQuantity,
      totalWeightKg,
      subtotal,
      chargesBreakdown,
      deliveryType,
      setDeliveryType,
      address,
      setAddress,
      distanceKm,
      setDistanceKm,
      useFastDelivery,
      setUseFastDelivery,
      includePackaging,
      setIncludePackaging,
      isPackagingMandatory,
      isFastDeliveryEligible,
      hasLimitedStock,
      isHotelStay,
      isEmiEligible,
      shopConflictModal,
      confirmSwitchShop,
      cancelSwitchShop
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

