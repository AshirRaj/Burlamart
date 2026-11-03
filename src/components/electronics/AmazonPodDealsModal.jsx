import React from 'react';
import { Link } from 'react-router-dom';
import { X, Star, Truck, ShoppingCart, Check, ShieldCheck, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const AmazonPodDealsModal = ({ pod, onClose }) => {
  const { addToCart } = useCart();
  const [addedId, setAddedId] = React.useState(null);

  if (!pod) return null;

  const products = pod.allItems || pod.products || [];

  const handleAdd = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, { id: 'shop-2', name: 'Electronics SuperStore', category: 'electronics' });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-[#f8f9fa] rounded-3xl shadow-2xl border border-gray-200 flex flex-col max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="bg-[#131921] text-white p-4 sm:p-6 flex items-center justify-between border-b border-gray-800">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-bold text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Great Indian Festival Verified Collection</span>
            </div>
            <h3 className="text-lg sm:text-2xl font-black text-white mt-0.5">
              {pod.title}
            </h3>
            <p className="text-xs text-gray-400">
              Showing {products.length} handpicked festive deals with guaranteed savings
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Products Grid (10+ Products!) */}
        <div className="p-4 sm:p-6 overflow-y-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((item) => {
            const isAdded = addedId === item.id;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-3 border border-gray-200 hover:shadow-xl hover:border-amber-400 transition-all flex flex-col justify-between group"
              >
                <Link to={`/product/${item.id}`} onClick={onClose} className="block">
                  {/* Image */}
                  <div className="relative aspect-square w-full rounded-xl bg-gray-50 p-2 flex items-center justify-center mb-2 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                    />
                    {item.discount && (
                      <span className="absolute bottom-1.5 left-1.5 bg-[#cc0c39] text-white text-[10px] font-black px-1.5 py-0.5 rounded shadow-xs">
                        {item.discount}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h4 className="text-xs font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-[#c45500] transition-colors">
                    {item.name}
                  </h4>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mt-1 text-[11px] text-amber-500 font-bold">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i < Math.floor(item.rating || 4.5) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-400 font-normal">({item.reviewsCount || 150})</span>
                  </div>

                  {/* Pricing */}
                  <div className="mt-2">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-base font-black text-gray-900">
                        ₹{item.price.toLocaleString('en-IN')}
                      </span>
                      {item.mrp && (
                        <span className="text-xs text-gray-400 line-through">
                          ₹{item.mrp.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Badge */}
                  {item.badge && (
                    <span className="inline-block mt-1 bg-[#cc0c39] text-white text-[9px] font-black px-1.5 py-0.5 rounded">
                      {item.badge}
                    </span>
                  )}
                </Link>

                {/* Actions */}
                <div className="mt-3 pt-2 border-t border-gray-100 flex items-center gap-2">
                  <Link
                    to={`/product/${item.id}`}
                    onClick={onClose}
                    className="flex-1 py-1.5 text-center bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold rounded-xl transition"
                  >
                    Details
                  </Link>
                  <button
                    type="button"
                    onClick={(e) => handleAdd(e, item)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 shadow-xs ${
                      isAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#ffd814] hover:bg-[#f7ca00] text-gray-950'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

