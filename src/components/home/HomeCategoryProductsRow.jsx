import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Plus, Check, ArrowRight, Sparkles, CreditCard, Clock } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const HomeCategoryProductsRow = ({
  title,
  subtitle,
  badge,
  categoryLink,
  categorySlug,
  icon: IconComp,
  products = [],
  shopId = 'shop-1',
  shopName = 'Burlamart Store'
}) => {
  const { addToCart } = useCart();
  const [addedIds, setAddedIds] = useState([]);

  const handleAddToCart = (e, prod) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(prod, { id: shopId, name: shopName, category: categorySlug });
    setAddedIds(prev => [...prev, prod.id]);
    setTimeout(() => {
      setAddedIds(prev => prev.filter(id => id !== prod.id));
    }, 2000);
  };

  if (!products || products.length === 0) return null;

  return (
    <div className="w-full bg-white rounded-3xl p-5 sm:p-6 border border-gray-200/90 shadow-xs space-y-4">
      {/* Category Row Header with Title & View All Link */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
        <div className="flex items-center gap-3">
          {IconComp && (
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0 shadow-2xs">
              <IconComp className="w-5 h-5" />
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg sm:text-xl font-black text-gray-900 tracking-tight">
                {title}
              </h3>
              {badge && (
                <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200/60 px-2 py-0.5 rounded-full">
                  {badge}
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* The View All Button that redirects to the Category Page */}
        <Link
          to={categoryLink}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-extrabold text-xs rounded-xl transition self-start sm:self-auto cursor-pointer border border-emerald-200/80 group"
        >
          <span>View All in {title.split(' ')[0]}</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
        </Link>
      </div>

      {/* Single-Line Horizontal Product Row (Scrollable on mobile/tablet, multi-column on desktop) */}
      <div className="grid grid-flow-col auto-cols-[200px] sm:auto-cols-[230px] md:auto-cols-[240px] gap-3.5 overflow-x-auto no-scrollbar scroll-smooth pb-2 pt-1">
        {products.map((prod) => {
          const isAdded = addedIds.includes(prod.id);
          const hasDiscount = prod.discountPct || (prod.mrp && prod.mrp > prod.price);
          const discountVal = prod.discountPct || (prod.mrp ? Math.round(((prod.mrp - prod.price) / prod.mrp) * 100) : null);

          return (
            <div
              key={prod.id}
              className="bg-[#fafbfc] rounded-2xl p-3 border border-gray-200/80 hover:border-emerald-400 hover:shadow-md transition-all flex flex-col justify-between group flex-shrink-0"
            >
              <Link to={`/product/${prod.id}`} className="block">
                {/* Product Image & Badges */}
                <div className="w-full h-36 rounded-xl bg-white p-2 mb-2 relative overflow-hidden flex items-center justify-center border border-gray-100">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300"
                  />
                  {hasDiscount && discountVal > 0 && (
                    <span className="absolute top-2 left-2 bg-[#1B4332] text-white text-[9px] font-black px-1.5 py-0.5 rounded shadow-xs">
                      {discountVal}% OFF
                    </span>
                  )}
                  {prod.badge && (
                    <span className="absolute top-2 right-2 bg-amber-100 text-amber-900 text-[9px] font-bold px-1.5 py-0.5 rounded shadow-2xs">
                      {prod.badge}
                    </span>
                  )}
                </div>

                {/* Rating & Net Quantity */}
                <div className="flex items-center justify-between text-[10px] text-gray-500 mb-1">
                  <span className="font-semibold truncate max-w-[110px]">
                    {prod.weightDisplay || prod.brand || '1 unit'}
                  </span>
                  <div className="flex items-center gap-0.5 text-amber-600 font-black">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{prod.rating || 4.5}</span>
                  </div>
                </div>

                {/* Product Name */}
                <h4 className="font-extrabold text-xs text-gray-900 line-clamp-2 leading-snug group-hover:text-emerald-800 transition min-h-[32px]">
                  {prod.name}
                </h4>
              </Link>

              {/* Price & Add to Cart Action */}
              <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="font-black text-sm text-gray-900">
                      ₹{prod.price?.toLocaleString('en-IN')}
                    </span>
                    {prod.mrp && prod.mrp > prod.price && (
                      <span className="text-[10px] text-gray-400 line-through">
                        ₹{prod.mrp?.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                  {prod.isEmiEligible && (
                    <span className="text-[9px] font-bold text-blue-800 flex items-center gap-0.5">
                      <CreditCard className="w-2.5 h-2.5" /> EMI Available
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={(e) => handleAddToCart(e, prod)}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold transition shadow-xs cursor-pointer ${
                    isAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white hover:bg-emerald-700 text-emerald-800 hover:text-white border border-emerald-300'
                  }`}
                  title="Add to Cart"
                >
                  {isAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

