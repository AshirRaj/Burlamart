import React from 'react';
import { X, Star, ShoppingCart, Check, ShieldCheck, CreditCard, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export const AmazonComparisonModal = ({ products = [], onRemoveProduct, onClearAll, onClose }) => {
  const { addToCart } = useCart();
  const [addedIds, setAddedIds] = React.useState([]);

  if (!products || products.length === 0) return null;

  const handleAddToCart = (product) => {
    addToCart(product, { id: 'shop-2', name: 'Electronics SuperStore', category: 'electronics' });
    setAddedIds(prev => [...prev, product.id]);
    setTimeout(() => {
      setAddedIds(prev => prev.filter(id => id !== product.id));
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-[#131921] text-white p-5 flex items-center justify-between border-b border-gray-800">
          <div>
            <h3 className="font-bold text-lg text-white">
              Compare Specifications & Deals ({products.length} of 3 selected)
            </h3>
            <p className="text-xs text-gray-400">
              Side-by-side comparison of key specs, EMI, warranty, and festival prices
            </p>
          </div>

          <div className="flex items-center gap-3">
            {products.length > 0 && (
              <button
                type="button"
                onClick={onClearAll}
                className="text-xs text-amber-300 hover:text-amber-200 font-semibold"
              >
                Clear All
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Table Grid */}
        <div className="p-6 overflow-y-auto overflow-x-auto text-xs">
          <div className="min-w-[640px]">
            {/* 1. Product Cards Row */}
            <div className="grid grid-cols-4 gap-4 pb-6 border-b border-gray-200 items-start">
              <div className="font-bold text-gray-500 pt-8">Product Overview</div>
              {products.map((p) => (
                <div key={p.id} className="relative bg-gray-50 rounded-2xl p-3 border border-gray-200 flex flex-col justify-between">
                  <button
                    type="button"
                    onClick={() => onRemoveProduct(p.id)}
                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white hover:bg-red-50 text-gray-400 hover:text-red-600 flex items-center justify-center shadow-xs transition"
                    title="Remove from comparison"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  <div className="aspect-square w-full rounded-xl bg-white p-2 mb-2 flex items-center justify-center">
                    <img src={p.image} alt={p.name} className="max-h-full max-w-full object-contain" />
                  </div>

                  <Link to={`/product/${p.id}`} onClick={onClose} className="font-bold text-gray-900 line-clamp-2 hover:text-[#c45500]">
                    {p.name}
                  </Link>

                  <div className="mt-2 flex items-baseline gap-1.5">
                    <span className="text-base font-black text-gray-900">₹{p.price.toLocaleString('en-IN')}</span>
                    {p.mrp && <span className="text-[10px] text-gray-400 line-through">₹{p.mrp.toLocaleString('en-IN')}</span>}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAddToCart(p)}
                    className={`w-full mt-3 py-2 rounded-xl font-bold transition flex items-center justify-center gap-1.5 ${
                      addedIds.includes(p.id)
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#ffd814] hover:bg-[#f7ca00] text-gray-950'
                    }`}
                  >
                    {addedIds.includes(p.id) ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
              {/* Empty placeholder slots if < 3 */}
              {[...Array(3 - products.length)].map((_, i) => (
                <div key={i} className="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center text-gray-400 min-h-[220px]">
                  <p className="text-xs font-semibold">Select another product to compare</p>
                </div>
              ))}
            </div>

            {/* 2. Rating & Reviews */}
            <div className="grid grid-cols-4 gap-4 py-3 border-b border-gray-100 items-center">
              <span className="font-bold text-gray-600">Customer Rating</span>
              {products.map((p) => (
                <div key={p.id} className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{p.rating || 4.5}</span>
                  <span className="text-gray-400 font-normal">({p.reviewsCount || 120} reviews)</span>
                </div>
              ))}
            </div>

            {/* 3. No Cost EMI */}
            <div className="grid grid-cols-4 gap-4 py-3 border-b border-gray-100 items-center">
              <span className="font-bold text-gray-600">EMI Options</span>
              {products.map((p) => (
                <div key={p.id} className="text-emerald-700 font-bold flex items-center gap-1">
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>No Cost EMI from ₹{Math.round(p.price / 6).toLocaleString('en-IN')}/mo</span>
                </div>
              ))}
            </div>

            {/* 4. Warranty & Guarantee */}
            <div className="grid grid-cols-4 gap-4 py-3 border-b border-gray-100 items-center">
              <span className="font-bold text-gray-600">Warranty Coverage</span>
              {products.map((p) => (
                <div key={p.id} className="text-gray-800 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  <span>1 Year Brand Warranty + 7 Days Replacement</span>
                </div>
              ))}
            </div>

            {/* 5. Key Highlights */}
            <div className="grid grid-cols-4 gap-4 py-3 border-b border-gray-100 items-start">
              <span className="font-bold text-gray-600">Key Highlights</span>
              {products.map((p) => (
                <ul key={p.id} className="space-y-1 text-[11px] text-gray-600 list-disc pl-4">
                  {(p.highlights || ['100% Genuine Certified Product', 'Fast Free Delivery', 'Festival Discounted Price']).slice(0, 3).map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              ))}
            </div>

            {/* 6. Return Policy */}
            <div className="grid grid-cols-4 gap-4 py-3 items-center">
              <span className="font-bold text-gray-600">Return Policy</span>
              {products.map((p) => (
                <span key={p.id} className="text-emerald-700 font-bold">
                  7 Days Replacement Guaranteed
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

