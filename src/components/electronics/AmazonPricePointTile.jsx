import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

export const AmazonPricePointTile = ({ item }) => {
  return (
    <Link
      to={`/product/${item.id || 'pod-2-item-1'}`}
      className="group relative aspect-square rounded-2xl p-3 bg-gradient-to-br from-[#b71c1c] via-[#c62828] to-[#880e4f] text-white flex flex-col justify-between overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 border border-red-400/40"
    >
      {/* Festive rangoli background ornament */}
      <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full border-4 border-amber-300/20 pointer-events-none" />
      <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full border-4 border-amber-300/20 pointer-events-none" />

      <div className="relative z-10 flex items-center justify-between">
        <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
        <span className="text-[9px] font-bold uppercase tracking-wider bg-black/30 px-1.5 py-0.5 rounded text-amber-200">
          Festival
        </span>
      </div>

      <div className="relative z-10 text-center my-auto">
        <h4 className="text-base sm:text-lg font-black tracking-tight text-white drop-shadow-sm leading-tight">
          {item.title}
        </h4>
        <p className="text-[10px] text-amber-200 font-bold mt-0.5">
          {item.subtitle}
        </p>
      </div>

      <div className="relative z-10 flex items-center justify-end text-[10px] text-amber-300 font-bold group-hover:translate-x-1 transition-transform">
        <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </Link>
  );
};
