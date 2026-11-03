import React from 'react';
import { Star, Plus, Minus, Heart, Eye } from 'lucide-react';

export const PackagedProductCard = ({
  product,
  quantity = 0,
  onAddToCart,
  onUpdateQuantity,
  isWishlisted = false,
  onToggleWishlist,
  onOpenDetails
}) => {
  const discountPct = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group bg-white rounded-3xl border border-gray-200/80 hover:border-emerald-300 p-3 sm:p-4 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden">
      {/* 1. Card Top Badge & Wishlist Button */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#FBF9F5] mb-3 flex items-center justify-center cursor-pointer"
        onClick={() => onOpenDetails(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start pointer-events-none">
          {discountPct > 0 && (
            <span className="bg-[#1B4332] text-white text-[10px] font-black px-2 py-0.5 rounded-lg shadow-sm">
              {discountPct}% OFF
            </span>
          )}
          {product.badge && (
            <span className="bg-amber-400 text-gray-950 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-lg shadow-xs">
              {product.badge}
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition shadow-xs active:scale-90 cursor-pointer ${
            isWishlisted
              ? 'bg-rose-50 text-rose-600 border border-rose-200'
              : 'bg-white/80 hover:bg-white text-gray-400 hover:text-rose-500 border border-gray-200/60'
          }`}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current text-rose-500' : ''}`} />
        </button>

        {/* Quick View Button on Hover */}
        <div className="absolute bottom-2 inset-x-2 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center pointer-events-none">
          <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold rounded-full flex items-center gap-1 shadow-sm">
            <Eye className="w-3 h-3" /> Quick Details
          </span>
        </div>
      </div>

      {/* 2. Body Details */}
      <div className="space-y-1.5 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Weight */}
          <div className="flex items-center justify-between text-[11px] text-gray-500 font-semibold">
            <span className="text-emerald-800 uppercase tracking-wider font-bold truncate">
              {product.brand}
            </span>
            <span className="text-gray-400 flex-shrink-0">{product.weight}</span>
          </div>

          {/* Product Name */}
          <h4
            onClick={() => onOpenDetails(product)}
            className="font-bold text-gray-900 text-xs sm:text-sm leading-snug line-clamp-2 mt-1 cursor-pointer hover:text-[#1B4332] transition-colors"
          >
            {product.name}
          </h4>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-1.5 text-xs">
            <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60 text-amber-900 font-black text-[10px]">
              <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
              <span>{product.rating}</span>
            </div>
            <span className="text-[10px] text-gray-400">({product.reviewCount})</span>
          </div>
        </div>

        {/* 3. Pricing and Add/Quantity Control (Swiggy Instamart style) */}
        <div className="pt-3 mt-2 border-t border-gray-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-black text-gray-900">
                ₹{product.price}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-[11px] text-gray-400 line-through">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
            <span className="text-[9px] text-emerald-700 font-bold block">10 mins away</span>
          </div>

          {/* Swiggy Instamart Interactive Add Button / Quantity Counter */}
          <div className="flex-shrink-0">
            {quantity > 0 ? (
              <div className="flex items-center bg-[#1B4332] text-white rounded-xl shadow-xs overflow-hidden border border-[#1B4332]">
                <button
                  type="button"
                  onClick={() => onUpdateQuantity(product, quantity - 1)}
                  className="px-2.5 py-1.5 hover:bg-[#2D6A4F] transition active:scale-95 cursor-pointer"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-2 font-black text-xs min-w-[20px] text-center select-none">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => onUpdateQuantity(product, quantity + 1)}
                  className="px-2.5 py-1.5 hover:bg-[#2D6A4F] transition active:scale-95 cursor-pointer"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => onAddToCart(product)}
                className="px-3.5 sm:px-4 py-1.5 bg-white hover:bg-emerald-50 text-[#1B4332] font-black text-xs rounded-xl border-2 border-[#1B4332] shadow-xs hover:shadow transition active:scale-95 flex items-center gap-1 cursor-pointer"
              >
                <span>ADD</span>
                <Plus className="w-3 h-3 text-[#1B4332] stroke-[3]" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

