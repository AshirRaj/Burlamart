import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Plus, Minus, Check, ShoppingBag, Eye, Heart, ArrowRight, Flame, PackageCheck, Zap, ExternalLink } from 'lucide-react';
import { PackagedProductCard } from './PackagedProductCard';
import { FREQUENTLY_BOUGHT_TOGETHER } from '../../data/packagedFoodData';

export const PackagedAdditionalSections = ({
  allProducts,
  getItemQuantity,
  onAddToCart,
  onUpdateQuantity,
  onOpenProductModal,
  wishlistIds,
  onToggleWishlist,
  recentlyViewed,
  onBatchAddToCart,
  shop
}) => {
  // Frequently Bought Together selection state
  const bundleItems = FREQUENTLY_BOUGHT_TOGETHER.filter(Boolean);
  const [selectedBundleIds, setSelectedBundleIds] = useState(
    bundleItems.map(p => p.id)
  );

  const toggleBundleItem = (id) => {
    setSelectedBundleIds(prev => 
      prev.includes(id) 
        ? (prev.length > 1 ? prev.filter(x => x !== id) : prev) // keep at least 1
        : [...prev, id]
    );
  };

  const selectedItems = bundleItems.filter(p => selectedBundleIds.includes(p.id));
  const rawTotal = selectedItems.reduce((acc, curr) => acc + (curr.originalPrice || curr.price), 0);
  const discountedTotal = selectedItems.reduce((acc, curr) => acc + curr.price, 0);
  const bundleSavings = rawTotal - discountedTotal;

  // Filter combos and bestsellers from allProducts
  const combos = allProducts.filter(p => p.isCombo);
  const bestsellers = allProducts.filter(p => p.isBestseller && !p.isCombo).slice(0, 8);

  const handleAddBundleToCart = () => {
    if (onBatchAddToCart) {
      onBatchAddToCart(selectedItems);
    }
  };

  return (
    <div className="space-y-16 py-8">
      {/* 1. FREQUENTLY BOUGHT TOGETHER BUNDLE */}
      {bundleItems.length >= 3 && (
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-amber-100/40 via-emerald-50/30 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold mb-2">
                <Zap className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                Frequently Bought Together
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1B4332]">
                Ultimate Snack & Chill Trio
              </h3>
              <p className="text-sm text-gray-600 mt-0.5">
                Pair classic salty potato chips, gooey molten chocolate cookies, and chilled fizz for movie nights.
              </p>
            </div>
            {bundleSavings > 0 && (
              <span className="self-start md:self-auto px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-[#1B4332] text-xs font-bold border border-emerald-300">
                Save ₹{bundleSavings} on this combo
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Items row */}
            <div className="lg:col-span-8 flex flex-col sm:flex-row items-center gap-3 sm:gap-2">
              {bundleItems.map((item, idx) => {
                const isSelected = selectedBundleIds.includes(item.id);
                return (
                  <React.Fragment key={item.id}>
                    <div 
                      onClick={() => toggleBundleItem(item.id)}
                      className={`flex-1 w-full sm:w-auto p-4 rounded-2xl border transition-all cursor-pointer flex flex-col items-center text-center relative group ${
                        isSelected 
                          ? 'border-[#2D6A4F] bg-[#FAF8F5] shadow-xs' 
                          : 'border-gray-200 bg-gray-50/50 opacity-60'
                      }`}
                    >
                      {/* Checkbox badge */}
                      <div className={`absolute top-2.5 left-2.5 w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-[#1B4332] border-[#1B4332] text-white' : 'border-gray-300 bg-white'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      <div className="w-20 h-20 mb-2 rounded-xl bg-white p-1.5 flex items-center justify-center shadow-xs overflow-hidden">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">{item.brand}</span>
                      <h4 className="text-xs font-bold text-gray-900 line-clamp-2 mt-0.5 min-h-[2rem]">
                        {item.name}
                      </h4>
                      <div className="mt-2 flex items-baseline gap-1.5">
                        <span className="text-sm font-extrabold text-[#1B4332]">₹{item.price}</span>
                        {item.originalPrice && item.originalPrice > item.price && (
                          <span className="text-[11px] text-gray-400 line-through">₹{item.originalPrice}</span>
                        )}
                      </div>
                    </div>

                    {idx < bundleItems.length - 1 && (
                      <div className="flex items-center justify-center text-gray-400 font-bold text-lg my-1 sm:my-0 sm:px-1">
                        +
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* Total and 1-click CTA */}
            <div className="lg:col-span-4 bg-[#FAF8F5] border border-gray-200 p-5 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-gray-500 uppercase">Combo Summary</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-3xl font-extrabold text-[#1B4332]">₹{discountedTotal}</span>
                  {rawTotal > discountedTotal && (
                    <span className="text-sm text-gray-400 line-through font-semibold">₹{rawTotal}</span>
                  )}
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  For {selectedItems.length} snack items selected
                </p>
                {bundleSavings > 0 && (
                  <p className="text-xs font-bold text-emerald-700 mt-1 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Instant bundle discount applied
                  </p>
                )}
              </div>

              <button
                onClick={handleAddBundleToCart}
                className="mt-4 w-full py-3 px-4 rounded-xl bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-bold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 group cursor-pointer active:scale-98"
              >
                <ShoppingBag className="w-4 h-4 transition-transform group-hover:scale-110" />
                Add All {selectedItems.length} to Cart
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 2. CURATED COMBOS & FAMILY PACKS */}
      {combos.length > 0 && (
        <section id="family-combos-section" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-gray-200/80 pb-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Special Value Packs
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1B4332]">
                Family Combos & Party Packs
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                Hand-picked assortments of crisps, chai biscuits, and instant noodles bundled with maximum savings.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {combos.map(combo => (
              <div 
                key={combo.id}
                className="bg-white rounded-3xl border border-gray-200/80 hover:border-amber-400 p-5 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="absolute top-4 right-4 z-10">
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-500 text-white shadow-xs">
                    {combo.badge || 'Great Value'}
                  </span>
                </div>

                <div>
                  <div 
                    onClick={() => onOpenProductModal && onOpenProductModal(combo)}
                    className="relative rounded-2xl overflow-hidden bg-[#FAF8F5] h-48 mb-4 flex items-center justify-center cursor-pointer"
                  >
                    <img 
                      src={combo.image} 
                      alt={combo.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <span className="text-xs text-white font-medium flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" /> View pack breakdown
                      </span>
                    </div>
                  </div>

                  <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">{combo.brand}</span>
                  <h4 
                    onClick={() => onOpenProductModal && onOpenProductModal(combo)}
                    className="text-base font-bold text-gray-900 mt-0.5 hover:text-[#1B4332] cursor-pointer"
                  >
                    {combo.name}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {combo.description}
                  </p>

                  {/* Combo items list */}
                  {combo.comboItems && (
                    <div className="mt-3.5 space-y-1.5 bg-[#FAF8F5] p-3 rounded-xl border border-gray-100">
                      <span className="text-[11px] font-bold text-gray-600 uppercase flex items-center gap-1">
                        <PackageCheck className="w-3.5 h-3.5 text-emerald-600" />
                        Includes {combo.comboItems.length} items:
                      </span>
                      {combo.comboItems.map((item, idx) => (
                        <div key={idx} className="text-xs text-gray-700 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-5 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-xs text-gray-500">{combo.weight}</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-[#1B4332]">₹{combo.price}</span>
                      {combo.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">₹{combo.originalPrice}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/product/${combo.id}`}
                      className="p-2 rounded-xl border border-gray-200 hover:border-[#1B4332] text-gray-600 hover:text-[#1B4332] transition"
                      title="Open Product Page"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>

                    {(getItemQuantity ? getItemQuantity(combo.id) : 0) > 0 ? (
                      <div className="flex items-center bg-[#1B4332] text-white rounded-xl shadow-xs overflow-hidden">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity && onUpdateQuantity(combo, getItemQuantity(combo.id) - 1)}
                          className="px-2.5 py-2 hover:bg-[#2D6A4F] transition cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 font-black text-xs">{getItemQuantity(combo.id)}</span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity && onUpdateQuantity(combo, getItemQuantity(combo.id) + 1)}
                          className="px-2.5 py-2 hover:bg-[#2D6A4F] transition cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onAddToCart && onAddToCart(combo)}
                        className="px-4 py-2 rounded-xl bg-[#1B4332] hover:bg-[#2D6A4F] text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Combo
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. BESTSELLERS SHELF */}
      {bestsellers.length > 0 && (
        <section id="bestsellers-shelf" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-gray-200/80 pb-3">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-1.5">
                <Flame className="w-3.5 h-3.5 text-orange-600 fill-orange-500" />
                Crowd Favourites
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1B4332]">
                Trending Snack Bestsellers
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                The most re-ordered crisps, choco rolls, and instant treats across Sambalpur & Burla today.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {bestsellers.map(product => (
              <PackagedProductCard
                key={`bestseller-${product.id}`}
                product={product}
                quantity={getItemQuantity ? getItemQuantity(product.id) : 0}
                onAddToCart={onAddToCart}
                onUpdateQuantity={onUpdateQuantity}
                onOpenDetails={onOpenProductModal}
                isWishlisted={wishlistIds.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        </section>
      )}

      {/* 4. RECENTLY VIEWED PRODUCTS */}
      {recentlyViewed && recentlyViewed.length > 0 && (
        <section className="space-y-6 pt-4 border-t border-gray-200/80">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Your History</span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1B4332]">
                Recently Viewed Snacks
              </h3>
            </div>
            <span className="text-xs text-gray-500">{recentlyViewed.length} items</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {recentlyViewed.map(item => (
              <div
                key={`recent-${item.id}`}
                onClick={() => onOpenProductModal && onOpenProductModal(item)}
                className="bg-white rounded-2xl border border-gray-200 p-3 hover:border-[#2D6A4F] hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="w-full h-28 rounded-xl bg-[#FAF8F5] p-2 flex items-center justify-center overflow-hidden mb-2">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span className="text-[10px] text-gray-500 font-semibold uppercase">{item.brand}</span>
                  <h4 className="text-xs font-bold text-gray-900 line-clamp-2 group-hover:text-[#1B4332]">
                    {item.name}
                  </h4>
                </div>
                <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-extrabold text-[#1B4332]">₹{item.price}</span>
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                    ★ {item.rating}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

