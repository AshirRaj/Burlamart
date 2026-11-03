import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { SWIGGY_STYLE_DISH_OPTIONS } from '../../data/packagedFoodData';

export const FoodOptionsCarousel = ({ selectedCategory, onSelectCategory }) => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 360;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <section className="w-full bg-white rounded-3xl p-5 sm:p-6 border border-amber-100/80 shadow-xs">
      {/* Header matching user reference image */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider mb-0.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Instant Munchies</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            Order our best snack options
          </h2>
        </div>

        {/* Left & Right Circular Arrow Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scroll('left')}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition active:scale-95 shadow-xs cursor-pointer"
            aria-label="Previous snack options"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll('right')}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition active:scale-95 shadow-xs cursor-pointer"
            aria-label="Next snack options"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Swiggy Instamart styled Circular Food Items Slider */}
      <div
        ref={scrollContainerRef}
        className="flex items-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar scroll-smooth py-2 px-1"
      >
        {SWIGGY_STYLE_DISH_OPTIONS.map((item) => {
          const isSelected = selectedCategory === item.category;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectCategory(item.category)}
              className="group flex flex-col items-center flex-shrink-0 cursor-pointer transition-transform hover:-translate-y-1 focus:outline-none"
            >
              {/* Circular Dish Image Frame with glow border when selected */}
              <div
                className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden p-1 transition-all duration-300 ${
                  isSelected
                    ? 'ring-4 ring-emerald-600 ring-offset-2 scale-105 shadow-md bg-emerald-50'
                    : 'bg-gradient-to-b from-amber-50 to-orange-50/50 hover:shadow-md'
                }`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Title & Tag */}
              <span
                className={`text-xs sm:text-sm font-bold mt-2.5 text-center leading-tight transition-colors line-clamp-1 max-w-[100px] ${
                  isSelected ? 'text-emerald-800 font-black' : 'text-gray-800 group-hover:text-emerald-800'
                }`}
              >
                {item.name}
              </span>
              <span className="text-[10px] text-gray-400 font-medium">
                {item.tag}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

