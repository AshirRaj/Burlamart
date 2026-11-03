import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { api } from '../../services/api';
import { ShoppingBag, ArrowRight, Check } from 'lucide-react';

// Modular Cart Components
import { CartHeader } from '../../components/cart/CartHeader';
import { CartItemList } from '../../components/cart/CartItemList';
import { CartFulfillment } from '../../components/cart/CartFulfillment';
import { CartRelatedProducts } from '../../components/cart/CartRelatedProducts';
import { CartSummary } from '../../components/cart/CartSummary';
import { SaveComboModal } from '../../components/cart/SaveComboModal';

export const CartPage = () => {
  const { 
    cartItems, 
    currentShop, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    subtotal,
    deliveryType,
    setDeliveryType,
    hasLimitedStock,
    isHotelStay,
    distanceKm,
    useFastDelivery,
    setUseFastDelivery,
    isFastDeliveryEligible,
    includePackaging,
    setIncludePackaging,
    isPackagingMandatory,
    chargesBreakdown,
    addToCart
  } = useCart();

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [comboName, setComboName] = useState('My Favourite Cart');
  const [showComboInput, setShowComboInput] = useState(false);
  const [comboSavedNotice, setComboSavedNotice] = useState(false);

  useEffect(() => {
    const fetchRelated = async () => {
      if (currentShop) {
        const all = await api.products.getAll({ shopId: currentShop.id });
        const filtered = all.filter(p => !cartItems.some(i => i.id === p.id)).slice(0, 4);
        setRelatedProducts(filtered);
      }
    };
    fetchRelated();
  }, [currentShop, cartItems]);

  const handleSaveAsCombo = async () => {
    if (!comboName.trim()) return;
    await api.combos.save({
      name: comboName,
      shopId: currentShop?.id || 'shop-1',
      shopName: currentShop?.name || 'Selected Shop',
      items: cartItems.map(i => ({ 
        id: i.id, 
        name: i.name, 
        quantity: i.quantity, 
        price: i.price,
        bookingDetails: i.bookingDetails || undefined
      })),
      totalPrice: subtotal
    });

    setComboSavedNotice(true);
    setShowComboInput(false);
    setTimeout(() => setComboSavedNotice(false), 3500);
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-extrabold text-gray-900">Your Cart is Empty</h2>
        <p className="text-xs text-gray-500 max-w-sm mx-auto">
          Explore groceries, book rooms & hotel stays, discover electronics, or grab tasty packaged snacks!
        </p>
        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1B4332] text-white rounded-2xl font-bold text-xs hover:bg-[#2D6A4F] shadow-md transition"
          >
            <span>Start Shopping & Booking</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-6 sm:space-y-8 overflow-hidden">
      {/* Toast Notice */}
      {comboSavedNotice && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-sm animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-700 flex-shrink-0" />
          <span>Combo saved! You can reorder it anytime from your Account.</span>
        </div>
      )}

      {/* 1. Cart Header & Store Info */}
      <CartHeader currentShop={currentShop} clearCart={clearCart} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Left Column: Items, Category-Specific Fulfillment, Related */}
        <div className="lg:col-span-2 space-y-6">
          {/* 2. Review Cart Items */}
          <CartItemList cartItems={cartItems} updateQuantity={updateQuantity} />

          {/* 3. Category-Aware Fulfillment (Hotel Check-in vs Doorstep Delivery vs Store Pickup) */}
          <CartFulfillment
            isHotelStay={isHotelStay}
            deliveryType={deliveryType}
            setDeliveryType={setDeliveryType}
            currentShop={currentShop}
            distanceKm={distanceKm}
            chargesBreakdown={chargesBreakdown}
            hasLimitedStock={hasLimitedStock}
            useFastDelivery={useFastDelivery}
            setUseFastDelivery={setUseFastDelivery}
            isFastDeliveryEligible={isFastDeliveryEligible}
            includePackaging={includePackaging}
            setIncludePackaging={setIncludePackaging}
            isPackagingMandatory={isPackagingMandatory}
          />

          {/* 4. Related Products from this Shop */}
          <CartRelatedProducts
            relatedProducts={relatedProducts}
            onAddToCart={addToCart}
            shop={currentShop}
          />
        </div>

        {/* Right Column: Order Summary & Bill Breakdown */}
        <div className="space-y-6">
          <CartSummary
            isHotelStay={isHotelStay}
            chargesBreakdown={chargesBreakdown}
            deliveryType={deliveryType}
            cartItems={cartItems}
            onOpenComboModal={() => setShowComboInput(true)}
          />
        </div>
      </div>

      {/* Save Combo Modal */}
      <SaveComboModal
        isOpen={showComboInput}
        onClose={() => setShowComboInput(false)}
        comboName={comboName}
        setComboName={setComboName}
        onSaveCombo={handleSaveAsCombo}
        subtotal={subtotal}
      />
    </div>
  );
};
