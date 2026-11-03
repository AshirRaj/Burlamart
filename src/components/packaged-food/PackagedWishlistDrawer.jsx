import React from 'react';
import { X, Heart, ShoppingBag, Trash2, Plus } from 'lucide-react';

export const PackagedWishlistDrawer = ({
  isOpen,
  onClose,
  wishlist = [],
  onRemoveFromWishlist,
  onAddToCart
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
              <Heart className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h3 className="font-black text-gray-900 text-base">Saved Snacks</h3>
              <p className="text-xs text-gray-500">{wishlist.length} items saved in your wishlist</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
          {wishlist.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-300 flex items-center justify-center mx-auto">
                <Heart className="w-8 h-8" />
              </div>
              <h4 className="font-black text-gray-800 text-base">Your Wishlist is Empty</h4>
              <p className="text-xs text-gray-500 max-w-xs mx-auto">
                Tap the heart icon on any snack, biscuit, or combo to save it here for later.
              </p>
            </div>
          ) : (
            wishlist.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 p-3 rounded-2xl border border-gray-100 hover:border-emerald-200 bg-white shadow-xs transition group"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-xl bg-gray-50 flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">
                    {item.brand}
                  </span>
                  <h5 className="font-bold text-xs text-gray-900 truncate">
                    {item.name}
                  </h5>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="font-black text-sm text-gray-900">₹{item.price}</span>
                    {item.originalPrice && item.originalPrice > item.price && (
                      <span className="text-[10px] text-gray-400 line-through">₹{item.originalPrice}</span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => onRemoveFromWishlist(item.id)}
                    className="text-gray-400 hover:text-rose-600 transition p-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      onAddToCart(item);
                      onRemoveFromWishlist(item.id);
                    }}
                    className="px-3 py-1 bg-[#1B4332] hover:bg-[#2D6A4F] text-white text-[11px] font-black rounded-lg shadow-xs flex items-center gap-1 active:scale-95 transition"
                  >
                    <Plus className="w-3 h-3" />
                    <span>ADD</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlist.length > 0 && (
          <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
            <span className="text-xs text-gray-500 font-medium">Ready to order?</span>
            <button
              type="button"
              onClick={() => {
                wishlist.forEach((item) => onAddToCart(item));
                onClose();
              }}
              className="px-4 py-2 bg-[#1B4332] text-white font-black text-xs rounded-xl shadow hover:bg-[#2D6A4F] transition active:scale-95"
            >
              Move All to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

