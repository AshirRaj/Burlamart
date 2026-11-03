import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Plus, Minus } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const GroceryProductCard = ({ product, shop }) => {
  const { cartItems, addToCart, updateQuantity } = useCart();

  const cartItem = cartItems.find((i) => i.id === product.id);
  const qty = cartItem ? cartItem.quantity : 0;

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, shop || { id: 'shop-1', name: 'Burlamart Fresh Store', category: 'grocery' });
  };

  const handleIncrement = (e) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(product.id, qty + 1);
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(product.id, qty - 1);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200/90 hover:border-emerald-500 hover:shadow-md transition p-3 flex flex-col justify-between w-40 sm:w-48 flex-shrink-0 relative group">
      {/* Top Left Discount Tag */}
      {product.discountPct && (
        <span className="absolute top-2 left-2 z-10 bg-blue-600 text-white font-extrabold text-[9px] px-1.5 py-0.5 rounded shadow-2xs uppercase">
          {product.discountPct}% OFF
        </span>
      )}

      {/* Product Image Link to Detail */}
      <Link
        to={`/product/${product.id}`}
        className="w-full h-28 sm:h-32 flex items-center justify-center overflow-hidden mb-2 relative rounded-xl bg-gray-50/50"
      >
        <img
          src={product.image}
          alt={product.name}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300"
          loading="lazy"
        />
      </Link>

      {/* Product Info */}
      <div className="space-y-1 flex-1">
        {/* Delivery Time Badge: 8 MINS */}
        <div className="flex items-center gap-1 text-[10px] font-bold text-gray-500">
          <Clock className="w-3 h-3 text-gray-400" />
          <span>{product.deliveryTime || '8 MINS'}</span>
        </div>

        {/* Product Title */}
        <Link to={`/product/${product.id}`}>
          <h4
            className="text-xs sm:text-[13px] font-bold text-gray-900 line-clamp-2 leading-snug hover:text-emerald-800 transition min-h-[32px]"
            title={product.name}
          >
            {product.name}
          </h4>
        </Link>

        {/* Weight / Pack size */}
        <div className="text-[11px] text-gray-500 font-medium">
          {product.weightDisplay || '1 unit'}
        </div>
      </div>

      {/* Price & Green ADD Button */}
      <div className="pt-2 mt-2 border-t border-gray-100 flex items-center justify-between gap-1">
        <div className="flex flex-col">
          <span className="text-sm sm:text-base font-extrabold text-gray-950 leading-none">
            ₹{product.price}
          </span>
          {product.mrp && product.mrp > product.price && (
            <span className="text-[10px] text-gray-400 line-through leading-tight">
              ₹{product.mrp}
            </span>
          )}
        </div>

        {qty === 0 ? (
          <button
            type="button"
            onClick={handleAdd}
            className="border border-emerald-600 bg-white hover:bg-emerald-50 text-emerald-700 font-extrabold text-xs px-3.5 py-1 rounded-lg uppercase tracking-wider transition shadow-2xs active:scale-95"
          >
            ADD
          </button>
        ) : (
          <div className="bg-[#1B4332] text-white flex items-center justify-between rounded-lg px-2 py-1 text-xs font-bold gap-2 shadow-sm">
            <button
              type="button"
              onClick={handleDecrement}
              className="hover:text-emerald-300 transition"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="font-extrabold text-xs">{qty}</span>
            <button
              type="button"
              onClick={handleIncrement}
              className="hover:text-emerald-300 transition"
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

