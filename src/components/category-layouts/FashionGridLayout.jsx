import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Sparkles, Heart, ShoppingBag, Plus, Star } from 'lucide-react';

export const FashionGridLayout = ({ products, shop, categoryName }) => {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState({});

  const handleSelectSize = (productId, size) => {
    setSelectedSize(prev => ({ ...prev, [productId]: size }));
  };

  return (
    <div className="space-y-6">
      {/* Visual Showcase Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="max-w-xl">
          <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-bold mb-2">
            Showcase Collection Template
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Curated Styles, Trends & Daily Wear
          </h2>
          <p className="text-xs sm:text-sm text-purple-100 mt-1">
            Standard visual grid template suitable for apparel, home decor, lifestyle and more.
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {products.map(product => {
          const currentSize = selectedSize[product.id] || 'M';

          return (
            <div
              key={product.id}
              className="bg-white rounded-3xl border border-gray-100 hover:border-purple-300 p-3 shadow-xs hover:shadow-md transition flex flex-col justify-between group"
            >
              <div>
                <Link
                  to={`/product/${product.id}`}
                  className="relative rounded-2xl overflow-hidden bg-gray-50 h-52 mb-3 block group/img"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover/img:scale-105 transition duration-300"
                  />
                  {product.discountPct && (
                    <span className="absolute top-2 left-2 bg-purple-700 text-white font-extrabold text-[9px] px-2 py-0.5 rounded-md">
                      {product.discountPct}% OFF
                    </span>
                  )}
                </Link>

                <div className="text-[11px] font-semibold text-gray-400">
                  {product.weightDisplay || 'Lifestyle Standard'}
                </div>
                <Link to={`/product/${product.id}`} className="hover:text-purple-700 transition">
                  <h4 className="font-bold text-sm text-gray-900 line-clamp-1 mb-1">
                    {product.name}
                  </h4>
                </Link>

                {/* Size options */}
                <div className="flex items-center gap-1 my-2">
                  {['S', 'M', 'L', 'XL'].map(sz => (
                    <button
                      key={sz}
                      onClick={() => handleSelectSize(product.id, sz)}
                      className={`w-6 h-6 rounded-md text-[10px] font-bold border transition ${
                        currentSize === sz
                          ? 'bg-purple-900 text-white border-purple-900'
                          : 'border-gray-200 text-gray-600 hover:border-gray-400'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-gray-50 flex items-center justify-between">
                <div>
                  <div className="font-extrabold text-base text-gray-900">
                    ₹{product.price}
                  </div>
                  {product.mrp && (
                    <div className="text-[11px] text-gray-400 line-through">
                      ₹{product.mrp}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => addToCart({ ...product, selectedSize: currentSize }, shop)}
                  className="p-2 bg-[#1B4332] hover:bg-[#2D6A4F] text-white rounded-xl shadow-xs transition"
                  title="Add to Cart"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

