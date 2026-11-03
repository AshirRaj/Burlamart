import React from 'react';
import { Link } from 'react-router-dom';

export const AmazonCategoryTile = ({ item }) => {
  return (
    <Link
      to={`/product/${item.id}`}
      className="group flex flex-col justify-between p-1.5 rounded-2xl bg-white hover:shadow-md transition-all border border-gray-100"
    >
      {/* Category Image Box */}
      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center mb-1.5">
        <img
          src={item.image}
          alt={item.label || item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Starting ₹X or Deal Ribbon Overlaid on Image */}
        {item.badge && (
          <div className="absolute bottom-1.5 left-1.5 right-1.5 bg-amber-400/95 backdrop-blur-xs text-gray-950 text-[10px] font-black px-1.5 py-0.5 rounded text-center shadow-xs">
            {item.badge}
          </div>
        )}
      </div>

      {/* Label under tile */}
      <div className="text-left px-0.5">
        <p className="text-[11px] font-bold text-gray-800 line-clamp-1 group-hover:text-[#c45500] transition-colors leading-tight">
          {item.label || item.name}
        </p>
        {item.priceText && (
          <p className="text-[10px] font-black text-[#cc0c39] mt-0.5">
            {item.priceText}
          </p>
        )}
      </div>
    </Link>
  );
};
