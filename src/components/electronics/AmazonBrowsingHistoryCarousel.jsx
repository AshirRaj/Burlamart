import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Star, Truck } from 'lucide-react';
import { BROWSING_HISTORY_PRODUCTS } from './electronicsData';

export const AmazonBrowsingHistoryCarousel = () => {
  const scrollRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  const handleNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
      setCurrentPage((prev) => Math.min(totalPages, prev + 1));
    }
  };

  const handlePrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
      setCurrentPage((prev) => Math.max(1, prev - 1));
    }
  };

  return (
    <section className="w-full bg-white rounded-3xl p-6 border border-gray-200 shadow-sm">
      {/* Section Header (Image 10) */}
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-100">
        <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
          Inspired by your browsing history
        </h3>
        <span className="text-xs font-semibold text-gray-500">
          Page {currentPage} of {totalPages}
        </span>
      </div>

      {/* Carousel Track */}
      <div className="relative">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-14 bg-white hover:bg-gray-50 border border-gray-300 rounded-r-xl shadow-md flex items-center justify-center text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-14 bg-white hover:bg-gray-50 border border-gray-300 rounded-l-xl shadow-md flex items-center justify-center text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div
          ref={scrollRef}
          className="flex items-stretch gap-4 overflow-x-auto no-scrollbar scroll-smooth py-2 px-1"
        >
          {BROWSING_HISTORY_PRODUCTS.map((prod) => (
            <Link
              key={prod.id}
              to={`/product/${prod.id}`}
              className="min-w-[210px] max-w-[210px] bg-white rounded-2xl p-3 border border-gray-100 hover:border-gray-300 hover:shadow-lg transition-all flex flex-col justify-between group flex-shrink-0"
            >
              <div>
                {/* Image */}
                <div className="aspect-square w-full rounded-xl bg-gray-50 p-2 flex items-center justify-center mb-2 overflow-hidden">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                  />
                </div>

                {/* Title */}
                <h4 className="text-xs font-semibold text-gray-900 line-clamp-2 leading-snug group-hover:text-[#c45500] transition-colors">
                  {prod.name}
                </h4>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-1 text-[11px] text-amber-500 font-bold">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${i < Math.floor(prod.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-500 font-normal">({prod.reviewsCount})</span>
                </div>

                {/* Best Seller Badge */}
                {prod.isBestSeller && (
                  <span className="inline-block mt-1 text-[9px] font-black uppercase tracking-wider bg-[#e67a00] text-white px-1.5 py-0.5 rounded shadow-2xs">
                    #1 Best Seller
                  </span>
                )}

                {/* Pricing (Image 10) */}
                <div className="mt-2">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xs font-bold text-[#cc0c39]">-{prod.discountPct}%</span>
                    <span className="text-base font-black text-gray-900">
                      ₹{prod.price.toLocaleString('en-IN')}.00
                    </span>
                  </div>
                  <div className="text-[10px] text-gray-500">
                    M.R.P.: <span className="line-through">₹{prod.mrp.toLocaleString('en-IN')}.00</span>
                  </div>
                </div>

                {/* Event Badge */}
                {prod.badge && (
                  <span className="inline-block mt-1 bg-[#cc0c39] text-white text-[9px] font-black px-1.5 py-0.5 rounded">
                    {prod.badge}
                  </span>
                )}
              </div>

              {/* Delivery text */}
              <div className="mt-3 pt-2 border-t border-gray-50 text-[10px] text-gray-500 space-y-0.5">
                {prod.deliveryDate && (
                  <p>Get it by <span className="font-bold text-gray-800">{prod.deliveryDate}</span></p>
                )}
                {prod.freeDelivery && (
                  <p className="font-bold text-gray-700 flex items-center gap-1">
                    <Truck className="w-3 h-3 text-emerald-600" />
                    <span>FREE Delivery by Burlamart</span>
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

