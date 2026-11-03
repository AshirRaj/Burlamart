import React, { useRef } from 'react';
import { 
  Sparkles, 
  Flame, 
  Cookie, 
  UtensilsCrossed, 
  Heart, 
  Soup, 
  Tv, 
  Clock, 
  Leaf, 
  Coffee,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { PACKAGED_CATEGORIES } from '../../data/packagedFoodData';

const iconMap = {
  Sparkles,
  Flame,
  Cookie,
  UtensilsCrossed,
  Heart,
  Soup,
  Tv,
  Clock,
  Leaf,
  Coffee
};

export const PackagedCategoryNav = ({ activeCategory, onSelectCategory }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -240 : 240,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative w-full bg-white rounded-2xl p-2.5 sm:p-3 border border-gray-200/80 shadow-xs">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => scroll('left')}
          className="hidden sm:flex w-7 h-7 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-600 items-center justify-center transition flex-shrink-0 cursor-pointer"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        <div
          ref={scrollRef}
          className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth flex-1 py-1 px-0.5"
        >
          {PACKAGED_CATEGORIES.map((cat) => {
            const Icon = iconMap[cat.icon] || Sparkles;
            const isSelected = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-[#1B4332] text-white shadow-sm ring-2 ring-[#1B4332]/20'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-300' : 'text-gray-500'}`} />
                <span>{cat.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-gray-200/70 text-gray-600'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => scroll('right')}
          className="hidden sm:flex w-7 h-7 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-600 items-center justify-center transition flex-shrink-0 cursor-pointer"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

