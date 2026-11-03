import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Building } from 'lucide-react';

export const AmazonBusinessTile = ({ item }) => {
  if (item.isAmazonBusiness) {
    return (
      <Link
        to={`/product/${item.id || 'pod-8-item-4'}`}
        className="group relative aspect-square rounded-2xl p-3 bg-gradient-to-br from-[#4a148c] via-[#6a1b9a] to-[#311b92] text-white flex flex-col justify-between overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 border border-purple-400/40 text-center"
      >
        <div className="flex items-center justify-between text-[9px] text-purple-200 font-bold">
          <Briefcase className="w-3.5 h-3.5" />
          <span>B2B PERKS</span>
        </div>

        <div className="my-auto">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-1">
            <Building className="w-5 h-5 text-amber-300" />
          </div>
          <h4 className="text-xs font-black text-white leading-tight">
            Amazon Business
          </h4>
          <span className="inline-block mt-1 text-[9px] bg-amber-400 text-gray-950 font-black px-1.5 py-0.5 rounded shadow-xs">
            {item.badge || 'Up to 18% GST credit'}
          </span>
        </div>

        <p className="text-[9px] text-purple-200 font-semibold group-hover:underline">
          View Deal ›
        </p>
      </Link>
    );
  }

  return (
    <Link
      to={`/product/${item.id}`}
      className="group flex flex-col justify-between p-1.5 rounded-2xl bg-[#f3e5f5] hover:bg-white hover:shadow-md transition-all border border-purple-100"
    >
      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-white p-1.5 flex items-center justify-center mb-1.5">
        <img
          src={item.image}
          alt={item.label}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
        {item.badge && (
          <div className="absolute bottom-1.5 left-1.5 right-1.5 bg-[#4a148c] text-white text-[9px] font-black px-1.5 py-0.5 rounded text-center shadow-xs">
            {item.badge}
          </div>
        )}
      </div>

      <div className="text-left px-0.5">
        <p className="text-[11px] font-bold text-gray-800 line-clamp-1 group-hover:text-[#4a148c] transition-colors leading-tight">
          {item.label}
        </p>
      </div>
    </Link>
  );
};
