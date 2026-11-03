import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  Star, 
  Truck, 
  CreditCard, 
  ShieldCheck, 
  Check, 
  ShoppingCart, 
  SlidersHorizontal, 
  ChevronDown, 
  Layers, 
  X,
  Sparkles,
  Info
} from 'lucide-react';
import { ALL_ELECTRONICS_PRODUCTS } from './electronicsData';
import { AmazonEmiModal } from './AmazonEmiModal';
import { AmazonComparisonModal } from './AmazonComparisonModal';
import { useCart } from '../../context/CartContext';

export const AmazonDealsListingPage = ({ onBackToHub }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialFilter = searchParams.get('filter') || 'All';
  const collectionName = searchParams.get('collection') || searchParams.get('section') || 'Great Indian Festival Deals';

  const { addToCart } = useCart();

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBadge, setSelectedBadge] = useState(initialFilter === 'bestsellers' ? '#1 Best Seller' : 'All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [minRating, setMinRating] = useState(0);
  const [minDiscount, setMinDiscount] = useState(0);
  const [noCostEmiOnly, setNoCostEmiOnly] = useState(false);
  const [freeDeliveryOnly, setFreeDeliveryOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  // Modals & Comparison State
  const [activeEmiProduct, setActiveEmiProduct] = useState(null);
  const [compareItems, setCompareItems] = useState([]);
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [addedIds, setAddedIds] = useState([]);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Categories list
  const categoriesList = [
    { id: 'All', label: 'All Departments' },
    { id: 'electronics', label: 'Smartphones & Electronics' },
    { id: 'home', label: 'Home, Kitchen & Outdoors' },
    { id: 'beauty', label: 'Skincare, Grooming & Beauty' },
    { id: 'fashion', label: 'Festive Fashion & Kurtas' },
    { id: 'toys', label: "Children's Books, Toys & RC Cars" },
    { id: 'books', label: 'Exam & Academic Books' },
    { id: 'sports', label: 'Sports, Fitness & Wellness' },
    { id: 'business', label: 'Amazon Business B2B' },
    { id: 'auto', label: 'Automotive & Hardware' }
  ];

  // Deal badges
  const badgeOptions = [
    'All',
    'Great Indian Festival',
    '#1 Best Seller',
    'Mega Festival Deal',
    'Limited Time Deal'
  ];

  // Price ranges
  const priceRanges = [
    { id: 'All', label: 'All Prices' },
    { id: 'under-499', label: 'Under ₹499', min: 0, max: 499 },
    { id: '500-1499', label: '₹500 - ₹1,499', min: 500, max: 1499 },
    { id: '1500-4999', label: '₹1,500 - ₹4,999', min: 1500, max: 4999 },
    { id: '5000-15000', label: '₹5,000 - ₹15,000', min: 5000, max: 15000 },
    { id: 'above-15000', label: 'Over ₹15,000', min: 15000, max: 999999 }
  ];

  // Filter products logic
  const filteredProducts = useMemo(() => {
    let list = [...ALL_ELECTRONICS_PRODUCTS];

    // Category
    if (selectedCategory !== 'All') {
      list = list.filter(p => {
        const cat = (p.category || p.department || '').toLowerCase();
        if (selectedCategory === 'electronics') {
          return cat === 'electronics' || cat === 'tech' || cat === 'gadgets';
        }
        if (selectedCategory === 'home') {
          return cat === 'home' || cat === 'kitchen' || cat === 'furniture' || cat === 'appliances';
        }
        if (selectedCategory === 'beauty') {
          return cat === 'beauty' || cat === 'skincare' || cat === 'grooming';
        }
        if (selectedCategory === 'fashion') {
          return cat === 'fashion' || cat === 'clothing' || cat === 'apparel';
        }
        if (selectedCategory === 'toys') {
          return cat === 'toys' || cat === 'toy' || (cat === 'books' && (p.name.toLowerCase().includes('book') || p.id.includes('pod-17')));
        }
        if (selectedCategory === 'books') {
          return cat === 'books' || cat === 'book';
        }
        if (selectedCategory === 'sports') {
          return cat === 'sports' || cat === 'fitness' || cat === 'health' || cat === 'wellness';
        }
        if (selectedCategory === 'business') {
          return cat === 'business' || cat === 'furniture' || p.isAmazonBusiness;
        }
        if (selectedCategory === 'auto') {
          return cat === 'auto' || cat === 'automotive' || cat === 'vehicles';
        }
        return cat === selectedCategory.toLowerCase();
      });
    }

    // Badge / Deal
    if (selectedBadge !== 'All') {
      list = list.filter(p => p.badge === selectedBadge || (selectedBadge === '#1 Best Seller' && p.isBestSeller));
    }

    // Price
    if (selectedPriceRange !== 'All') {
      const range = priceRanges.find(r => r.id === selectedPriceRange);
      if (range) {
        list = list.filter(p => p.price >= range.min && p.price <= range.max);
      }
    }

    // Rating
    if (minRating > 0) {
      list = list.filter(p => (p.rating || 4.2) >= minRating);
    }

    // Discount
    if (minDiscount > 0) {
      list = list.filter(p => (p.discountPct || 10) >= minDiscount);
    }

    // No Cost EMI
    if (noCostEmiOnly) {
      list = list.filter(p => p.price >= 1500);
    }

    // Free delivery
    if (freeDeliveryOnly) {
      list = list.filter(p => p.price >= 499 || p.freeDelivery);
    }

    // Sorting
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'discount') {
      list.sort((a, b) => (b.discountPct || 0) - (a.discountPct || 0));
    }

    return list;
  }, [selectedCategory, selectedBadge, selectedPriceRange, minRating, minDiscount, noCostEmiOnly, freeDeliveryOnly, sortBy]);

  // Handle Add to Compare
  const toggleCompare = (product) => {
    if (compareItems.some(i => i.id === product.id)) {
      setCompareItems(prev => prev.filter(i => i.id !== product.id));
    } else {
      if (compareItems.length >= 3) {
        alert('You can compare a maximum of 3 products side-by-side.');
        return;
      }
      setCompareItems(prev => [...prev, product]);
    }
  };

  // Handle Add to Cart
  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, { id: 'shop-2', name: 'Electronics SuperStore', category: 'electronics' });
    setAddedIds(prev => [...prev, product.id]);
    setTimeout(() => {
      setAddedIds(prev => prev.filter(id => id !== product.id));
    }, 2500);
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedBadge('All');
    setSelectedPriceRange('All');
    setMinRating(0);
    setMinDiscount(0);
    setNoCostEmiOnly(false);
    setFreeDeliveryOnly(false);
  };

  return (
    <div className="w-full bg-[#f8f9fa] min-h-screen text-gray-900 pb-24">
      {/* Top Banner Navigation & Breadcrumbs */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <button
              type="button"
              onClick={onBackToHub}
              className="text-emerald-800 hover:text-emerald-950 font-bold flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to 10-Image Festive Hub</span>
            </button>
            <span>/</span>
            <span className="font-bold text-gray-800">{collectionName}</span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-500 font-semibold">
              Showing <strong className="text-gray-900">{filteredProducts.length}</strong> products
            </span>
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-xl font-bold flex items-center gap-1"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Layout Grid: Left Sidebar Filters + Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar Filters (Desktop & Mobile Drawer) */}
        <aside className={`lg:col-span-3 space-y-6 bg-white p-5 rounded-3xl border border-gray-200 shadow-sm ${
          mobileFilterOpen ? 'fixed inset-0 z-50 overflow-y-auto block p-6' : 'hidden lg:block'
        }`}>
          {mobileFilterOpen && (
            <div className="flex items-center justify-between pb-3 border-b border-gray-200 lg:hidden">
              <h3 className="font-black text-base">Filters & Refinements</h3>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Reset Filters Header */}
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h4 className="font-bold text-sm text-gray-900 flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4 text-amber-500" />
              <span>Refine Results</span>
            </h4>
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs font-bold text-[#007185] hover:text-[#c45500] hover:underline"
            >
              Clear All
            </button>
          </div>

          {/* 1. Department / Categories */}
          <div>
            <h5 className="font-bold text-xs uppercase tracking-wider text-gray-700 mb-2.5">
              Department
            </h5>
            <div className="space-y-1.5 text-xs">
              {categoriesList.map((cat) => {
                const count = cat.id === 'All' 
                  ? ALL_ELECTRONICS_PRODUCTS.length 
                  : ALL_ELECTRONICS_PRODUCTS.filter(p => {
                      const c = (p.category || p.department || '').toLowerCase();
                      if (cat.id === 'electronics') return c === 'electronics' || c === 'tech' || c === 'gadgets';
                      if (cat.id === 'home') return c === 'home' || c === 'kitchen' || c === 'furniture' || c === 'appliances';
                      if (cat.id === 'beauty') return c === 'beauty' || c === 'skincare' || c === 'grooming';
                      if (cat.id === 'fashion') return c === 'fashion' || c === 'clothing' || c === 'apparel';
                      if (cat.id === 'toys') return c === 'toys' || c === 'toy' || (c === 'books' && (p.name.toLowerCase().includes('book') || p.id.includes('pod-17')));
                      if (cat.id === 'books') return c === 'books' || c === 'book';
                      if (cat.id === 'sports') return c === 'sports' || c === 'fitness' || c === 'health' || c === 'wellness';
                      if (cat.id === 'business') return c === 'business' || c === 'furniture' || p.isAmazonBusiness;
                      if (cat.id === 'auto') return c === 'auto' || c === 'automotive' || c === 'vehicles';
                      return c === cat.id.toLowerCase();
                    }).length;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left py-1 px-2 rounded-lg transition font-medium flex items-center justify-between cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-amber-100 text-gray-950 font-bold'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                    }`}
                  >
                    <span className="truncate">{cat.label}</span>
                    <div className="flex items-center gap-1.5 flex-shrink-0 ml-1">
                      <span className="text-[10px] text-gray-400 font-normal">({count})</span>
                      {selectedCategory === cat.id && <Check className="w-3.5 h-3.5 text-amber-600" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Deals & Badges */}
          <div className="pt-3 border-t border-gray-100">
            <h5 className="font-bold text-xs uppercase tracking-wider text-gray-700 mb-2.5">
              Deals & Discounts
            </h5>
            <div className="space-y-1.5 text-xs">
              {badgeOptions.map((badge) => (
                <label key={badge} className="flex items-center gap-2 cursor-pointer py-0.5">
                  <input
                    type="radio"
                    name="badge"
                    checked={selectedBadge === badge}
                    onChange={() => setSelectedBadge(badge)}
                    className="accent-amber-500 w-3.5 h-3.5"
                  />
                  <span className={selectedBadge === badge ? 'font-bold text-gray-900' : 'text-gray-600'}>
                    {badge}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* 3. Price Range */}
          <div className="pt-3 border-t border-gray-100">
            <h5 className="font-bold text-xs uppercase tracking-wider text-gray-700 mb-2.5">
              Price Range
            </h5>
            <div className="space-y-1.5 text-xs">
              {priceRanges.map((range) => (
                <label key={range.id} className="flex items-center gap-2 cursor-pointer py-0.5">
                  <input
                    type="radio"
                    name="priceRange"
                    checked={selectedPriceRange === range.id}
                    onChange={() => setSelectedPriceRange(range.id)}
                    className="accent-amber-500 w-3.5 h-3.5"
                  />
                  <span className={selectedPriceRange === range.id ? 'font-bold text-gray-900' : 'text-gray-600'}>
                    {range.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* 4. Customer Reviews */}
          <div className="pt-3 border-t border-gray-100">
            <h5 className="font-bold text-xs uppercase tracking-wider text-gray-700 mb-2.5">
              Customer Reviews
            </h5>
            <div className="space-y-2 text-xs">
              {[4, 3].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setMinRating(minRating === star ? 0 : star)}
                  className={`w-full flex items-center gap-1.5 py-1 px-2 rounded-lg transition ${
                    minRating === star ? 'bg-amber-100 font-bold' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i < star ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-700 font-semibold">& Up</span>
                </button>
              ))}
            </div>
          </div>

          {/* 5. Discount Percentage */}
          <div className="pt-3 border-t border-gray-100">
            <h5 className="font-bold text-xs uppercase tracking-wider text-gray-700 mb-2.5">
              Discount
            </h5>
            <div className="space-y-1.5 text-xs">
              {[10, 25, 40, 50].map((disc) => (
                <label key={disc} className="flex items-center gap-2 cursor-pointer py-0.5">
                  <input
                    type="checkbox"
                    checked={minDiscount === disc}
                    onChange={() => setMinDiscount(minDiscount === disc ? 0 : disc)}
                    className="accent-amber-500 w-3.5 h-3.5"
                  />
                  <span className="text-gray-700">{disc}% Off or more</span>
                </label>
              ))}
            </div>
          </div>

          {/* 6. Pay & EMI Options */}
          <div className="pt-3 border-t border-gray-100 space-y-2 text-xs">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={noCostEmiOnly}
                onChange={(e) => setNoCostEmiOnly(e.target.checked)}
                className="accent-amber-500 w-3.5 h-3.5"
              />
              <span className="font-bold text-gray-800">Eligible for No Cost EMI</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={freeDeliveryOnly}
                onChange={(e) => setFreeDeliveryOnly(e.target.checked)}
                className="accent-amber-500 w-3.5 h-3.5"
              />
              <span className="font-bold text-gray-800">FREE Delivery by Burlamart</span>
            </label>
          </div>

          {mobileFilterOpen && (
            <button
              type="button"
              onClick={() => setMobileFilterOpen(false)}
              className="w-full mt-4 py-2.5 bg-black text-white font-bold text-xs rounded-xl"
            >
              Apply Filters
            </button>
          )}
        </aside>

        {/* Right Product Grid Column */}
        <main className="lg:col-span-9 space-y-4">
          {/* Top Sort and Results Strip */}
          <div className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-bold text-gray-900">RESULTS</span>
              <p className="text-gray-500 text-[11px]">
                Price and other details may vary based on product size and colour.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-gray-500 font-semibold">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-xl px-2.5 py-1.5 text-xs font-bold text-gray-800 bg-white focus:outline-none focus:border-amber-500"
              >
                <option value="featured">Featured Deals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Avg. Customer Review</option>
                <option value="discount">Biggest Discount %</option>
              </select>
            </div>
          </div>

          {/* Products List (Amazon Search Results Layout) */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-gray-200">
              <p className="font-bold text-base text-gray-700">No products match your selected filters</p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="mt-3 px-5 py-2 bg-[#ffd814] text-black font-bold text-xs rounded-xl"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredProducts.map((p) => {
                const isCompared = compareItems.some(i => i.id === p.id);
                const isAdded = addedIds.includes(p.id);

                return (
                  <div
                    key={p.id}
                    className="bg-white rounded-3xl p-4 border border-gray-200 hover:shadow-xl hover:border-amber-400 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Product Image & Badges */}
                      <Link to={`/product/${p.id}`} className="block">
                        <div className="relative aspect-square w-full rounded-2xl bg-gray-50 p-3 flex items-center justify-center mb-3 overflow-hidden">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                          />
                          {p.discount && (
                            <span className="absolute bottom-2 left-2 bg-[#cc0c39] text-white text-[10px] font-black px-2 py-0.5 rounded shadow-xs">
                              {p.discount}
                            </span>
                          )}
                          {p.badge && (
                            <span className="absolute top-2 left-2 bg-[#cc0c39] text-white text-[9px] font-black px-2 py-0.5 rounded shadow-xs">
                              {p.badge}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h4 className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-[#c45500] transition-colors">
                          {p.name}
                        </h4>
                      </Link>

                      {/* Ratings */}
                      <div className="flex items-center gap-1 mt-1 text-[11px] text-amber-500 font-bold">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${i < Math.floor(p.rating || 4.5) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                        <span className="text-gray-400 font-normal">({p.reviewsCount || 120})</span>
                      </div>

                      {/* Pricing */}
                      <div className="mt-2.5">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-lg font-black text-gray-900">
                            ₹{p.price.toLocaleString('en-IN')}
                          </span>
                          {p.mrp && (
                            <span className="text-xs text-gray-400 line-through">
                              ₹{p.mrp.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Amazon No Cost EMI Chip */}
                      <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between text-[11px]">
                        <span className="text-emerald-700 font-bold flex items-center gap-1">
                          <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
                          <span>EMI from ₹{Math.round(p.price / 6).toLocaleString('en-IN')}/mo</span>
                        </span>
                        <button
                          type="button"
                          onClick={() => setActiveEmiProduct(p)}
                          className="text-[#007185] hover:text-[#c45500] hover:underline font-bold"
                        >
                          EMI Plans
                        </button>
                      </div>

                      {/* Warranty & Delivery */}
                      <div className="mt-1 text-[10px] text-gray-500 flex items-center gap-1.5">
                        <ShieldCheck className="w-3 h-3 text-blue-600 flex-shrink-0" />
                        <span>1 Year Manufacturer Brand Warranty</span>
                      </div>
                    </div>

                    {/* Bottom Actions Row: Add to Compare + Add to Cart */}
                    <div className="mt-4 pt-3 border-t border-gray-100 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        {/* Compare checkbox */}
                        <label className="flex items-center gap-1.5 cursor-pointer text-[11px] font-semibold text-gray-700">
                          <input
                            type="checkbox"
                            checked={isCompared}
                            onChange={() => toggleCompare(p)}
                            className="accent-amber-500 w-3.5 h-3.5 rounded"
                          />
                          <span>Add to compare</span>
                        </label>

                        <Link
                          to={`/product/${p.id}`}
                          className="text-[11px] font-bold text-[#007185] hover:underline"
                        >
                          Full Specs ›
                        </Link>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => handleAddToCart(e, p)}
                        className={`w-full py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm active:scale-95 ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-[#ffd814] hover:bg-[#f7ca00] text-gray-950'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Added to Cart!</span>
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4" />
                            <span>Add to Cart</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>

      {/* Floating Bottom Comparison Drawer (When 1-3 items are selected) */}
      {compareItems.length > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-[#131921] text-white px-5 py-3 rounded-full shadow-2xl border border-amber-500/40 flex items-center gap-4 animate-in slide-in-from-bottom duration-300">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold">
              Comparing {compareItems.length} of 3 items
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {compareItems.map(c => (
              <img key={c.id} src={c.image} alt="Comp" className="w-6 h-6 rounded-md bg-white object-contain p-0.5" />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setShowComparisonModal(true)}
            className="px-4 py-1.5 bg-[#ffd814] hover:bg-[#f7ca00] text-gray-950 font-black text-xs rounded-full transition"
          >
            View Comparison Table
          </button>

          <button
            type="button"
            onClick={() => setCompareItems([])}
            className="text-gray-400 hover:text-white"
            title="Clear comparison"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* EMI Options Modal */}
      {activeEmiProduct && (
        <AmazonEmiModal
          product={activeEmiProduct}
          onClose={() => setActiveEmiProduct(null)}
        />
      )}

      {/* Side-by-Side Comparison Modal */}
      {showComparisonModal && (
        <AmazonComparisonModal
          products={compareItems}
          onRemoveProduct={(id) => setCompareItems(prev => prev.filter(p => p.id !== id))}
          onClearAll={() => {
            setCompareItems([]);
            setShowComparisonModal(false);
          }}
          onClose={() => setShowComparisonModal(false)}
        />
      )}
    </div>
  );
};

