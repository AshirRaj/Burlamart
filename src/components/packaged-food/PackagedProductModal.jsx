import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Star, Plus, Minus, ShieldCheck, Heart, Clock, Sparkles, ExternalLink } from 'lucide-react';

export const PackagedProductModal = ({
  product,
  onClose,
  quantity = 0,
  onAddToCart,
  onUpdateQuantity,
  isWishlisted = false,
  onToggleWishlist
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const discountPct = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden my-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 hover:bg-gray-100 text-gray-700 flex items-center justify-center shadow-md transition cursor-pointer"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left: Image Container */}
          <div className="md:col-span-5 bg-[#FBF9F5] p-6 flex flex-col items-center justify-center relative border-b md:border-b-0 md:border-r border-gray-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full max-h-64 object-contain drop-shadow-md rounded-2xl"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-amber-400 text-gray-950 font-black text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-xl shadow-xs">
                {product.badge}
              </span>
            )}
            {/* Wishlist toggle */}
            <button
              type="button"
              onClick={() => onToggleWishlist(product)}
              className="mt-4 flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-rose-600 transition"
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current text-rose-500' : ''}`} />
              <span>{isWishlisted ? 'In Wishlist' : 'Add to Wishlist'}</span>
            </button>
          </div>

          {/* Right: Info & Nutrition */}
          <div className="md:col-span-7 p-6 sm:p-7 flex flex-col justify-between space-y-5">
            <div className="space-y-3">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800">
                  {product.brand}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-gray-900 leading-snug mt-0.5">
                  {product.name}
                </h3>
                <span className="text-xs text-gray-500 font-semibold">{product.weight}</span>
              </div>

              {/* Rating & Dietary */}
              <div className="flex items-center gap-3 text-xs">
                <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 text-amber-900 font-black">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  <span>{product.rating}</span>
                  <span className="text-gray-400 font-medium">({product.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-emerald-700 font-bold text-xs bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{product.dietary || '100% Vegetarian'}</span>
                </div>
              </div>

              {/* Pricing */}
              <div className="pt-2 border-t border-gray-100 flex items-baseline gap-3">
                <span className="text-3xl font-black text-gray-900">₹{product.price}</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <>
                    <span className="text-base text-gray-400 line-through">₹{product.originalPrice}</span>
                    <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      Save {discountPct}%
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-1">
                  Description
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Ingredients */}
              {product.ingredients && (
                <div>
                  <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-1">
                    Ingredients
                  </h4>
                  <p className="text-[11px] text-gray-500 leading-relaxed">
                    {product.ingredients}
                  </p>
                </div>
              )}

              {/* Nutritional Information Table */}
              {product.nutrition && (
                <div>
                  <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    <span>Nutritional Values</span>
                  </h4>
                  <div className="grid grid-cols-4 gap-2 text-center text-xs">
                    <div className="bg-gray-50 p-2 rounded-xl border border-gray-100">
                      <span className="block text-[10px] text-gray-400 uppercase font-bold">Energy</span>
                      <strong className="text-gray-900 text-[11px]">{product.nutrition.energy}</strong>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-xl border border-gray-100">
                      <span className="block text-[10px] text-gray-400 uppercase font-bold">Protein</span>
                      <strong className="text-gray-900 text-[11px]">{product.nutrition.protein}</strong>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-xl border border-gray-100">
                      <span className="block text-[10px] text-gray-400 uppercase font-bold">Carbs</span>
                      <strong className="text-gray-900 text-[11px]">{product.nutrition.carbs}</strong>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-xl border border-gray-100">
                      <span className="block text-[10px] text-gray-400 uppercase font-bold">Fat</span>
                      <strong className="text-gray-900 text-[11px]">{product.nutrition.fat}</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Add to Cart Bar & Product Page Link */}
            <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-bold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>10 mins</span>
                </div>
                <Link
                  to={`/product/${product.id}`}
                  onClick={onClose}
                  className="text-xs font-bold text-[#1B4332] hover:underline flex items-center gap-1"
                >
                  <span>Full Page</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>

              <div>
                {quantity > 0 ? (
                  <div className="flex items-center bg-[#1B4332] text-white rounded-xl shadow-md overflow-hidden">
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(product, quantity - 1)}
                      className="px-3.5 py-2 hover:bg-[#2D6A4F] transition active:scale-95"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-3 font-black text-sm min-w-[28px] text-center">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(product, quantity + 1)}
                      className="px-3.5 py-2 hover:bg-[#2D6A4F] transition active:scale-95"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => onAddToCart(product)}
                    className="px-6 py-2.5 bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-black text-sm rounded-xl shadow-lg transition active:scale-95 flex items-center gap-2 cursor-pointer"
                  >
                    <span>ADD TO CART</span>
                    <Plus className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

