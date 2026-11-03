import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { GroceryProductCard } from './GroceryProductCard';

export const GrocerySectionRow = ({ section, shop }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!section || !section.items || section.items.length === 0) return null;

  return (
    <div id={`section-${section.id}`} className="space-y-3 relative group">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base sm:text-lg font-extrabold text-gray-900 tracking-tight">
          {section.title}
        </h3>
        <Link
          to={`/category/${section.id}`}
          className="text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline transition"
        >
          see all
        </Link>
      </div>

      {/* Relative Carousel Container with Left/Right Buttons */}
      <div className="relative">
        {/* Left Arrow Button */}
        <button
          type="button"
          onClick={() => scroll('left')}
          className="hidden sm:flex absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white border border-gray-200 shadow-md items-center justify-center text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition active:scale-95"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Right Arrow Button */}
        <button
          type="button"
          onClick={() => scroll('right')}
          className="hidden sm:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white border border-gray-200 shadow-md items-center justify-center text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition active:scale-95"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Scrollable Row */}
        <div
          ref={scrollRef}
          className="flex items-stretch gap-3 overflow-x-auto scrollbar-none py-1 px-0.5 scroll-smooth"
        >
          {section.items.map((item) => (
            <GroceryProductCard key={item.id} product={item} shop={shop} />
          ))}
        </div>
      </div>
    </div>
  );
};

