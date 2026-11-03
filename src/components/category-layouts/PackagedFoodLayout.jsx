import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useCart } from '../../context/CartContext';
import { 
  PACKAGED_CATEGORIES, 
  PACKAGED_PRODUCTS, 
  SWIGGY_STYLE_DISH_OPTIONS, 
  PROMOTIONAL_CARDS_DATA 
} from '../../data/packagedFoodData';

import { PackagedFoodHero } from '../packaged-food/PackagedFoodHero';
import { FoodOptionsCarousel } from '../packaged-food/FoodOptionsCarousel';
import { PackagedPromotions } from '../packaged-food/PackagedPromotions';
import { PackagedCategoryNav } from '../packaged-food/PackagedCategoryNav';
import { PackagedFilterBar } from '../packaged-food/PackagedFilterBar';
import { PackagedProductCard } from '../packaged-food/PackagedProductCard';
import { PackagedProductModal } from '../packaged-food/PackagedProductModal';
import { PackagedWishlistDrawer } from '../packaged-food/PackagedWishlistDrawer';
import { PackagedAdditionalSections } from '../packaged-food/PackagedAdditionalSections';

import { 
  ShoppingBag, 
  Heart, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  ArrowUp,
  X,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const DEFAULT_SNACK_SHOP = {
  id: 'burlamart-express-hub',
  name: 'Burlamart Express Snack Hub (Burla & Sambalpur)',
  distanceKm: 1.2
};

export const PackagedFoodLayout = ({ products: initialProducts, shop, categoryName }) => {
  const currentEffectiveShop = shop || DEFAULT_SNACK_SHOP;
  const { cartItems, addToCart, updateQuantity, subtotal, totalQuantity } = useCart();

  // Combine default packaged food data with any passed from props
  const allProducts = useMemo(() => {
    if (!initialProducts || initialProducts.length === 0) {
      return PACKAGED_PRODUCTS;
    }
    // Merge without duplicates
    const existingIds = new Set(initialProducts.map(p => p.id));
    const extra = PACKAGED_PRODUCTS.filter(p => !existingIds.has(p.id));
    return [...initialProducts, ...extra];
  }, [initialProducts]);

  // Extract unique brands for filtering
  const availableBrands = useMemo(() => {
    const brands = new Set(allProducts.map(p => p.brand).filter(Boolean));
    return Array.from(brands).sort();
  }, [allProducts]);

  // UI state
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [priceRange, setPriceRange] = useState(1000);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('recommended');

  // Modal & Drawer state
  const [selectedProductForModal, setSelectedProductForModal] = useState(null);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Toast notification state
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const toastTimeoutRef = useRef(null);

  const showToast = (message, type = 'success') => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast({ show: true, message, type });
    toastTimeoutRef.current = setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 2800);
  };

  // Wishlist state (persisted in localStorage)
  const [wishlistIds, setWishlistIds] = useState(() => {
    try {
      const saved = localStorage.getItem('burlamart_packaged_wishlist');
      return saved ? JSON.parse(saved) : ['chip-1', 'choc-1', 'bisc-2'];
    } catch (e) {
      return ['chip-1', 'choc-1', 'bisc-2'];
    }
  });

  const toggleWishlist = (productId) => {
    setWishlistIds(prev => {
      let updated;
      if (prev.includes(productId)) {
        updated = prev.filter(id => id !== productId);
        showToast('Removed from wishlist', 'info');
      } else {
        updated = [...prev, productId];
        showToast('Saved to your wishlist ❤️', 'success');
      }
      try {
        localStorage.setItem('burlamart_packaged_wishlist', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const wishlistedProducts = useMemo(() => {
    return allProducts.filter(p => wishlistIds.includes(p.id));
  }, [allProducts, wishlistIds]);

  // Recently viewed products (persisted in localStorage)
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    try {
      const saved = localStorage.getItem('burlamart_recently_viewed_snacks');
      if (saved) return JSON.parse(saved);
      return PACKAGED_PRODUCTS.slice(0, 4);
    } catch (e) {
      return PACKAGED_PRODUCTS.slice(0, 4);
    }
  });

  const handleOpenProductModal = (product) => {
    setSelectedProductForModal(product);
    // Track in recently viewed
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      const updated = [product, ...filtered].slice(0, 8);
      try {
        localStorage.setItem('burlamart_recently_viewed_snacks', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  // Batch add from Frequently Bought Together or Wishlist
  const handleBatchAddToCart = (items) => {
    let addedCount = 0;
    items.forEach(item => {
      addToCart(item, currentEffectiveShop);
      addedCount++;
    });
    showToast(`Added ${addedCount} items to your cart! 🛍️`, 'success');
  };

  // Reset all filters
  const handleResetFilters = () => {
    setActiveCategory('all');
    setSearchQuery('');
    setSelectedBrand('all');
    setPriceRange(1000);
    setMinRating(0);
    setSortBy('recommended');
  };

  // Scroll helpers
  const handleExploreClick = () => {
    const el = document.getElementById('snacks-product-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewBestsellersClick = () => {
    const el = document.getElementById('bestsellers-shelf');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return allProducts.filter(p => {
      // 1. Category filter
      if (activeCategory !== 'all') {
        if (activeCategory === 'combos') {
          if (!p.isCombo) return false;
        } else if (p.category !== activeCategory) {
          return false;
        }
      }

      // 2. Search query filter (by name, brand, or category)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchName = p.name?.toLowerCase().includes(query);
        const matchBrand = p.brand?.toLowerCase().includes(query);
        const matchCat = p.category?.toLowerCase().includes(query);
        const matchDesc = p.description?.toLowerCase().includes(query);
        if (!matchName && !matchBrand && !matchCat && !matchDesc) {
          return false;
        }
      }

      // 3. Brand filter
      if (selectedBrand !== 'all') {
        if (p.brand?.toLowerCase() !== selectedBrand.toLowerCase()) {
          return false;
        }
      }

      // 4. Price range filter
      if (p.price > priceRange) {
        return false;
      }

      // 5. Min rating filter
      if (minRating > 0 && (p.rating || 0) < minRating) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') {
        return a.price - b.price;
      }
      if (sortBy === 'price-high') {
        return b.price - a.price;
      }
      if (sortBy === 'rating') {
        return (b.rating || 0) - (a.rating || 0);
      }
      if (sortBy === 'popular') {
        return (b.reviewCount || 0) - (a.reviewCount || 0);
      }
      // 'recommended': bestsellers first, then highest rating
      if (a.isBestseller && !b.isBestseller) return -1;
      if (!a.isBestseller && b.isBestseller) return 1;
      return (b.rating || 0) - (a.rating || 0);
    });
  }, [allProducts, activeCategory, searchQuery, selectedBrand, priceRange, minRating, sortBy]);

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-gray-900 font-sans pb-24 antialiased selection:bg-[#1B4332] selection:text-white">
      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-2xl shadow-xl border bg-[#1B4332] text-white border-emerald-700/60 text-xs sm:text-sm font-semibold transition-all transform animate-bounce">
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Floating Action Controls (Wishlist & Cart Access) */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        {/* Wishlist Floating Button */}
        <button
          onClick={() => setIsWishlistOpen(true)}
          className="relative w-12 h-12 rounded-full bg-white text-[#1B4332] border border-gray-200/80 shadow-lg hover:shadow-xl hover:scale-105 transition flex items-center justify-center cursor-pointer group"
          title="View Wishlist"
        >
          <Heart className="w-5 h-5 group-hover:text-red-500 group-hover:scale-110 transition-transform" />
          {wishlistIds.length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-extrabold flex items-center justify-center shadow-xs">
              {wishlistIds.length}
            </span>
          )}
        </button>

        {/* Quick Cart Floating Pill */}
        {totalQuantity > 0 && (
          <Link
            to="/cart"
            className="flex items-center gap-3 px-4 py-3 rounded-full bg-[#1B4332] hover:bg-[#2D6A4F] text-white shadow-xl hover:shadow-2xl hover:scale-105 transition cursor-pointer group active:scale-95"
          >
            <div className="relative">
              <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-amber-400 text-gray-900 text-[10px] font-black flex items-center justify-center">
                {totalQuantity}
              </span>
            </div>
            <div className="text-left pr-1">
              <div className="text-[10px] uppercase font-bold text-emerald-200 tracking-wider">Cart Total</div>
              <div className="text-xs font-black">₹{subtotal} • View</div>
            </div>
            <ArrowRight className="w-4 h-4 text-emerald-300 group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>

      {/* 1. ANIMATED HERO SECTION */}
      <PackagedFoodHero
        onExploreClick={handleExploreClick}
        onViewBestsellersClick={handleViewBestsellersClick}
      />

      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 mt-8">
        {/* 2. SWIGGY INSTAMART STYLE CIRCULAR DISH OPTIONS CAROUSEL */}
        <section className="pt-2">
          <FoodOptionsCarousel
            options={SWIGGY_STYLE_DISH_OPTIONS}
            activeCategory={activeCategory}
            onSelectCategory={(catId) => {
              setActiveCategory(catId);
              const el = document.getElementById('snacks-product-catalog');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />
        </section>

        {/* 3. PROMOTIONAL BANNERS */}
        <section>
          <PackagedPromotions
            promos={PROMOTIONAL_CARDS_DATA}
            onSelectPromoCategory={(catId) => {
              if (catId === 'combos') {
                const el = document.getElementById('family-combos-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              } else {
                setActiveCategory(catId);
                const el = document.getElementById('snacks-product-catalog');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          />
        </section>

        {/* 4. CATEGORY HORIZONTAL NAVIGATION (10 CATEGORIES) */}
        <section>
          <PackagedCategoryNav
            categories={PACKAGED_CATEGORIES}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />
        </section>

        {/* 5. SEARCH & FILTER BAR */}
        <section id="snacks-product-catalog" className="pt-2">
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1B4332]">
                Popular Snacks & Munchies
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                Crispy chips, gourmet cookies, tea-time namkeen and late-night cravings
              </p>
            </div>
            <div className="text-xs font-semibold text-gray-500">
              Showing <span className="font-bold text-[#1B4332]">{filteredProducts.length}</span> curated snacks
            </div>
          </div>

          <PackagedFilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedBrand={selectedBrand}
            onBrandChange={setSelectedBrand}
            availableBrands={availableBrands}
            priceRange={priceRange}
            onPriceChange={setPriceRange}
            minRating={minRating}
            onRatingChange={setMinRating}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onResetFilters={handleResetFilters}
            totalResults={filteredProducts.length}
          />
        </section>

        {/* 6. PRODUCT GRID & EMPTY STATE */}
        <section>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map(product => (
                <PackagedProductCard
                  key={product.id}
                  product={product}
                  shop={currentEffectiveShop}
                  onOpenModal={handleOpenProductModal}
                  isWishlisted={wishlistIds.includes(product.id)}
                  onToggleWishlist={toggleWishlist}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-gray-200/80 p-12 text-center max-w-lg mx-auto shadow-xs">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 mx-auto flex items-center justify-center mb-4">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">No snacks matched your search</h3>
              <p className="text-xs sm:text-sm text-gray-500 mb-6">
                Try clearing your filters, searching for another brand like "Lay's" or "Haldiram's", or resetting the price limit.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-xl bg-[#1B4332] hover:bg-[#2D6A4F] text-white text-xs font-bold transition shadow-sm cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </section>

        {/* 7. ADDITIONAL SECTIONS (FREQUENTLY BOUGHT TOGETHER, COMBOS, BESTSELLERS, RECENTLY VIEWED) */}
        <PackagedAdditionalSections
          allProducts={allProducts}
          onOpenProductModal={handleOpenProductModal}
          wishlistIds={wishlistIds}
          onToggleWishlist={toggleWishlist}
          recentlyViewed={recentlyViewed}
          onBatchAddToCart={handleBatchAddToCart}
          shop={currentEffectiveShop}
        />
      </main>

      {/* PRODUCT DETAILS MODAL */}
      <PackagedProductModal
        product={selectedProductForModal}
        isOpen={Boolean(selectedProductForModal)}
        onClose={() => setSelectedProductForModal(null)}
        shop={currentEffectiveShop}
        isWishlisted={selectedProductForModal ? wishlistIds.includes(selectedProductForModal.id) : false}
        onToggleWishlist={toggleWishlist}
      />

      {/* WISHLIST DRAWER */}
      <PackagedWishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistedProducts}
        onRemoveFromWishlist={toggleWishlist}
        onMoveAllToCart={handleBatchAddToCart}
        onOpenProductModal={handleOpenProductModal}
        shop={currentEffectiveShop}
      />
    </div>
  );
};
