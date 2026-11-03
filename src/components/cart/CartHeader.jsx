import React from 'react';
import { Store, Trash2 } from 'lucide-react';

export const CartHeader = ({ currentShop, clearCart }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-3xl border border-gray-200 shadow-xs">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
          <Store className="w-5 h-5 text-emerald-700" />
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-extrabold text-base text-gray-900">
              Ordering from: {currentShop?.name || 'Selected Shop'}
            </h2>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
              One-Shop Cart Policy Active
            </span>
          </div>
          <p className="text-xs text-gray-500">
            {currentShop?.address || 'Local Shop'} • {currentShop?.distanceKm || 1.4} km away
          </p>
        </div>
      </div>

      <button
        onClick={clearCart}
        className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 self-start sm:self-auto p-1.5 rounded-xl hover:bg-rose-50 transition"
      >
        <Trash2 className="w-4 h-4" />
        <span>Clear Cart</span>
      </button>
    </div>
  );
};

