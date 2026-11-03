import React from 'react';
import { Link } from 'react-router-dom';

export const AmazonProductTile = ({ item }) => {
  return (
    <Link
      to={`/product/${item.id}`}
      className="group flex flex-col justify-between p-2 rounded-2xl bg-white hover:shadow-md transition-all border border-gray-100"
    >
      {/* Product Image */}
      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center p-2 mb-2">
        <img
          src={item.image}
          alt={item.name}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
        {item.discount && (
          <span className="absolute bottom-1.5 left-1.5 bg-[#cc0c39] text-white text-[10px] font-black px-1.5 py-0.5 rounded">
            {item.discount}
          </span>
        )}
      </div>

      {/* Info */}
      <div>
        <p className="text-xs font-semibold text-gray-900 line-clamp-1 group-hover:text-[#c45500] transition-colors">
          {item.name}
        </p>

        {/* Pricing */}
        <div className="flex items-baseline gap-1 mt-1">
          <span className="text-sm font-black text-gray-900">₹{item.price.toLocaleString('en-IN')}</span>
          {item.mrp && (
            <span className="text-[10px] text-gray-400 line-through">
              ₹{item.mrp.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* Festival Badge */}
        {item.badge && (
          <p className="text-[10px] font-bold text-[#cc0c39] mt-0.5 truncate">
            {item.badge}
          </p>
        )}
      </div>
    </Link>
  );
};

