import React from 'react';
import { useCart } from '../../context/CartContext';
import { AlertTriangle, ArrowRight, X } from 'lucide-react';

export const ShopConflictModal = () => {
  const { shopConflictModal, confirmSwitchShop, cancelSwitchShop, currentShop } = useCart();

  if (!shopConflictModal) return null;

  const { newProduct, newShop } = shopConflictModal;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100">
        <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
          <AlertTriangle className="w-6 h-6" />
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2">
          Replace items in cart?
        </h3>
        
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          Your cart currently has items from <span className="font-semibold text-gray-900">{currentShop?.name || 'another shop'}</span>.
          In accordance with Burlamart's one-shop cart policy, you can only order from one shop at a time.
        </p>

        <div className="bg-amber-50/70 border border-amber-200/60 rounded-xl p-3 mb-5 text-xs text-amber-900 flex items-center gap-2">
          <span>Adding:</span>
          <span className="font-bold truncate">{newProduct.name}</span>
          <ArrowRight className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
          <span className="font-semibold text-emerald-800">{newShop?.name}</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={cancelSwitchShop}
            className="flex-1 py-2.5 px-4 border border-gray-300 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
          >
            Keep Cart
          </button>
          <button
            onClick={confirmSwitchShop}
            className="flex-1 py-2.5 px-4 bg-[#1B4332] hover:bg-[#2D6A4F] text-white rounded-xl text-sm font-semibold shadow-md transition"
          >
            Clear & Add
          </button>
        </div>
      </div>
    </div>
  );
};

