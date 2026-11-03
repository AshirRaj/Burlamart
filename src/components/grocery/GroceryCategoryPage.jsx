import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Zap, SlidersHorizontal, Layers, Check } from 'lucide-react';
import { GroceryProductCard } from './GroceryProductCard';
import { GrocerySubcategoryGrid } from './GrocerySubcategoryGrid';
import { 
  getGroceryCategoryById, 
  getGroceryProductsByCategory,
  GROCERY_CATALOG_SECTIONS,
  ALL_GROCERY_PRODUCTS
} from './groceryData';

export const GroceryCategoryPage = ({ categoryId, shop, initialProducts = [] }) => {
  const [selectedTag, setSelectedTag] = useState('All');
  const [sortBy, setSortBy] = useState('relevance'); // 'relevance', 'price-low', 'price-high', 'discount'

  // Look up category info and section
  const section = useMemo(() => {
    return GROCERY_CATALOG_SECTIONS.find(s => s.id === categoryId);
  }, [categoryId]);

  const categoryMeta = useMemo(() => {
    return getGroceryCategoryById(categoryId) || {
      id: categoryId,
      name: categoryId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
    };
  }, [categoryId]);

  // Combine section products with any products passed from backend
  const categoryProducts = useMemo(() => {
    let prods = [];
    if (section && section.items) {
      prods = [...section.items];
    } else {
      prods = getGroceryProductsByCategory(categoryId);
    }

    if (prods.length === 0) {
      // Fallback matching by tag or category
      prods = ALL_GROCERY_PRODUCTS.filter(p => 
        p.category === categoryId ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(categoryId.toLowerCase())))
      );
    }

    if (prods.length === 0 && initialProducts && initialProducts.length > 0) {
      prods = initialProducts;
    }

    return prods;
  }, [categoryId, section, initialProducts]);

  // Filter by subTags
  const filteredProducts = useMemo(() => {
    let list = [...categoryProducts];

    if (selectedTag !== 'All') {
      list = list.filter(p => 
        (p.tags && p.tags.some(t => t.toLowerCase() === selectedTag.toLowerCase())) ||
        p.name.toLowerCase().includes(selectedTag.toLowerCase())
      );
    }

    // Sort
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'discount') {
      list.sort((a, b) => (b.discountPct || 0) - (a.discountPct || 0));
    }

    return list;
  }, [categoryProducts, selectedTag, sortBy]);

  const subTags = section?.subTags || ['All'];

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 overflow-hidden">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-gray-500 bg-white p-3 rounded-2xl border border-gray-200 shadow-2xs">
        <Link to="/" className="hover:text-emerald-800 font-semibold flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
        <Link to="/category/grocery" className="hover:text-emerald-800 font-semibold">
          Grocery & Staples
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
        <span className="font-extrabold text-gray-900 capitalize">
          {categoryMeta.name || categoryMeta.title}
        </span>
      </div>

      {/* Category Hero Banner */}
      <div className="bg-gradient-to-r from-[#1B4332] via-[#2D6A4F] to-[#40916C] rounded-3xl p-5 sm:p-7 text-white shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-lg">
          <div className="flex items-center gap-2">
            <span className="bg-yellow-400 text-gray-900 font-extrabold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
              <Zap className="w-3 h-3 fill-gray-900" /> 8 MINS DELIVERY
            </span>
            <span className="text-xs text-emerald-100 font-semibold">
              Delivered chilled & fresh
            </span>
          </div>

          <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight text-white capitalize">
            {categoryMeta.name || categoryMeta.title}
          </h1>
          <p className="text-xs text-emerald-100">
            Browse {filteredProducts.length} premium products handpicked from verified neighborhood stores.
          </p>
        </div>

        <div className="text-left sm:text-right">
          <span className="text-[11px] text-emerald-200 uppercase font-bold tracking-wider block">Total Products</span>
          <span className="text-2xl font-extrabold text-white">{categoryProducts.length} Items</span>
        </div>
      </div>

      {/* Filter Subtags & Sort Bar */}
      <div className="bg-white rounded-2xl p-3 sm:p-4 border border-gray-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {subTags.map(tag => (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedTag(tag)}
              className={`px-3.5 py-1.5 rounded-full font-bold transition ${
                selectedTag === tag
                  ? 'bg-[#1B4332] text-white shadow-2xs'
                  : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <SlidersHorizontal className="w-3.5 h-3.5 text-gray-500" />
          <span className="font-bold text-gray-700">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-xl px-2.5 py-1 font-bold text-gray-800 outline-none focus:border-emerald-600 transition"
          >
            <option value="relevance">Relevance</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="discount">Highest Discount</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
          {filteredProducts.map((product) => (
            <GroceryProductCard
              key={product.id}
              product={product}
              shop={shop || { id: 'shop-1', name: 'Burlamart Fresh Store', category: 'grocery' }}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 space-y-3">
          <p className="text-gray-500 font-bold text-sm">No products found matching "{selectedTag}"</p>
          <button
            type="button"
            onClick={() => setSelectedTag('All')}
            className="px-4 py-2 bg-[#1B4332] text-white rounded-xl text-xs font-bold shadow-xs hover:bg-emerald-900 transition"
          >
            Clear Filters & View All
          </button>
        </div>
      )}

      {/* Explore Other Categories Strip */}
      <div className="pt-6 border-t border-gray-200 space-y-3">
        <h3 className="text-sm font-extrabold text-gray-900">Explore Other Categories</h3>
        <GrocerySubcategoryGrid selectedSubcat={categoryId} />
      </div>
    </div>
  );
};

