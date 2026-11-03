import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export const PersistentCartBar = () => {
  const { cartItems, currentShop, subtotal } = useCart();
  const location = useLocation();

  // Don't show cart bar on cart or checkout pages to avoid redundancy
  if (cartItems.length === 0 || location.pathname === '/cart' || location.pathname === '/checkout' || location.pathname.startsWith('/admin') || location.pathname.startsWith('/vendor') || location.pathname.startsWith('/rider')) {
    return null;
  }

  const totalItems = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="fixed bottom-[72px] sm:bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-xl w-[92%] sm:w-full bg-[#1B4332] text-white p-3 sm:p-3.5 rounded-2xl shadow-2xl flex items-center justify-between border border-emerald-700/60 animate-bounceSubtle">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold">
          <ShoppingBag className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xs font-semibold text-emerald-200">
            {totalItems} {totalItems === 1 ? 'item' : 'items'} • <span className="text-white font-bold">₹{subtotal}</span>
          </div>
          <div className="text-[11px] text-gray-300 truncate max-w-[200px] sm:max-w-xs">
            From: <span className="text-white font-medium">{currentShop?.name || 'Selected Shop'}</span>
          </div>
        </div>
      </div>

      <Link
        to="/cart"
        className="bg-emerald-400 hover:bg-emerald-300 text-gray-950 font-extrabold text-xs sm:text-sm px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md transition"
      >
        <span>View Cart</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
};

