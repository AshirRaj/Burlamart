import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { api } from '../../services/api';
import { useCart } from '../../context/CartContext';
import { Search, SlidersHorizontal, Plus, ArrowLeft, Star } from 'lucide-react';

export const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { addToCart } = useCart();

  const [products, setProducts] = useState([]);
  const [shops, setShops] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('relevance');

  useEffect(() => {
    const fetchResults = async () => {
      const allProds = await api.products.getAll({ search: query });
      setProducts(allProds);
      const allShops = await api.shops.getAll();
      setShops(allShops);
    };
    fetchResults();
  }, [query]);

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filtered = products
    .filter(p => selectedCategory === 'All' || p.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <Link to="/" className="hover:text-emerald-800 flex items-center gap-1 font-semibold">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200 gap-3">
        <div>
          <h1 className="text-xl font-extrabold text-gray-900">
            Search results for "{query}"
          </h1>
          <p className="text-xs text-gray-500">{filtered.length} products found</p>
        </div>

        {/* Filter & Sort controls */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-white border border-gray-200 rounded-xl px-3 py-1.5 font-bold text-gray-700 outline-none"
          >
            {categories.map(c => (
              <option key={c} value={c}>Category: {c}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white border border-gray-200 rounded-xl px-3 py-1.5 font-bold text-gray-700 outline-none"
          >
            <option value="relevance">Sort: Relevance</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Customer Rating</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="py-16 text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto text-gray-400">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-gray-700">No matching products found</h3>
          <p className="text-xs text-gray-400">Try searching for tomatoes, milk, stay, voltpro, or snacks.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map(product => {
            const productShop = shops.find(s => s.id === product.shopId) || shops[0];
            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl border border-gray-100 hover:border-emerald-300 p-3 shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-36 object-cover rounded-2xl mb-2"
                  />
                  <div className="text-[10px] font-semibold text-gray-400 uppercase">{product.category}</div>
                  <h4 className="font-bold text-xs sm:text-sm text-gray-900 line-clamp-2 mb-1">{product.name}</h4>
                  <div className="text-[11px] text-gray-500 font-medium">Sold by {productShop?.name}</div>
                </div>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between mt-2">
                  <div className="font-extrabold text-sm text-gray-900">₹{product.price}</div>
                  <button
                    onClick={() => addToCart(product, productShop)}
                    className="px-2.5 py-1.5 bg-[#1B4332] text-white rounded-xl text-xs font-bold hover:bg-[#2D6A4F] transition flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

