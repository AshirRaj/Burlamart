import React from 'react';
import { Link } from 'react-router-dom';
import { GROCERY_SUBCATEGORIES } from './groceryData';

export const GrocerySubcategoryGrid = ({ selectedSubcat }) => {
  return (
    <div className="bg-white rounded-3xl p-4 sm:p-6 border border-gray-100 shadow-xs space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-extrabold text-sm sm:text-base text-gray-900 tracking-tight">
          Shop by Category
        </h3>
        <span className="text-xs text-gray-400 font-semibold">
          {GROCERY_SUBCATEGORIES.length} Categories
        </span>
      </div>

      {/* Grid on tablet/desktop, horizontal scroll on mobile with zero page overflow */}
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-3 sm:gap-4 overflow-x-auto pb-2 scrollbar-none">
        {GROCERY_SUBCATEGORIES.map((cat) => {
          const isSelected = selectedSubcat === cat.id;
          return (
            <Link
              key={cat.id}
              to={`/category/${cat.id}`}
              className="flex flex-col items-center gap-1.5 group text-center focus:outline-none flex-shrink-0 transition"
              title={`View ${cat.name} products`}
            >
              {/* Rounded Image Container */}
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl p-2 flex items-center justify-center transition duration-200 ${
                  isSelected
                    ? 'ring-2 ring-emerald-600 bg-emerald-50 shadow-md scale-105'
                    : 'bg-sky-50/70 hover:bg-sky-100/70 hover:shadow-xs group-hover:scale-105'
                }`}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-contain rounded-xl"
                  loading="lazy"
                />
              </div>

              {/* Title */}
              <span
                className={`text-[11px] sm:text-xs font-semibold leading-tight line-clamp-2 max-w-[80px] transition ${
                  isSelected ? 'text-emerald-800 font-extrabold' : 'text-gray-700 group-hover:text-emerald-700'
                }`}
              >
                {cat.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
