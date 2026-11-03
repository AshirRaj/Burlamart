import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

export const CartRelatedProducts = ({
  relatedProducts,
  onAddToCart,
  shop
}) => {
  if (!relatedProducts || relatedProducts.length === 0) return null;

  return (
    <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <div>
          <h3 className="font-extrabold text-base text-gray-900">
            Customers Also Added from this Store
          </h3>
          <p className="text-xs text-gray-500">
            Easily add related essentials to your order before checkout
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {relatedProducts.map((p) => (
          <div
            key={p.id}
            className="p-3 bg-gray-50 hover:bg-emerald-50/40 rounded-2xl border border-gray-100 hover:border-emerald-200 transition flex flex-col justify-between group"
          >
            <div>
              <Link to={`/product/${p.id}`} className="block h-28 rounded-xl overflow-hidden mb-2 bg-white flex items-center justify-center p-1">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </Link>
              <div className="text-[10px] text-gray-400 font-semibold">{p.weightDisplay || '1 unit'}</div>
              <Link to={`/product/${p.id}`} className="hover:text-emerald-800 transition">
                <h4 className="font-bold text-xs text-gray-900 line-clamp-1 mb-1">{p.name}</h4>
              </Link>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-2">
              <span className="font-extrabold text-xs text-gray-900">₹{p.price}</span>
              <button
                type="button"
                onClick={() => onAddToCart(p, shop)}
                className="p-1.5 bg-[#1B4332] hover:bg-[#2D6A4F] text-white rounded-lg shadow-2xs transition"
                title="Add to cart"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

