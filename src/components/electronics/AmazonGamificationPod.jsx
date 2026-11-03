import React from 'react';
import { ChevronRight, Sparkles, Gift } from 'lucide-react';

export const AmazonGamificationPod = ({ pod, onSelectPod }) => {
  return (
    <div className="bg-gradient-to-br from-[#ff6f00] via-[#e65100] to-[#bf360c] text-white rounded-3xl p-4 shadow-lg border border-amber-400/50 flex flex-col justify-between">
      {/* Title */}
      <div className="mb-3">
        <button
          type="button"
          onClick={() => onSelectPod && onSelectPod(pod)}
          className="group w-full flex items-center justify-between text-left cursor-pointer"
        >
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-amber-200">
              <Gift className="w-3.5 h-3.5" />
              <span>Rewards Worth 20 Lakh+</span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-white leading-snug group-hover:text-amber-200 transition-colors line-clamp-1">
              Win big this Great Indian Festival
            </h3>
          </div>
          <ChevronRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform flex-shrink-0" />
        </button>
      </div>

      {/* 2x2 Game Tiles */}
      <div className="grid grid-cols-2 gap-2.5 my-auto">
        {pod.items.map((item, idx) => (
          <button
            key={item.id || idx}
            type="button"
            onClick={() => onSelectPod && onSelectPod(pod)}
            className="group relative aspect-square rounded-2xl bg-gradient-to-b from-amber-400 to-yellow-500 text-gray-950 p-2.5 flex flex-col justify-between shadow-md hover:scale-105 transition-all text-center overflow-hidden cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-white/80 mx-auto flex items-center justify-center text-lg shadow-sm">
              🎯
            </div>
            <div>
              <p className="text-xs font-black text-gray-950 leading-tight">
                {item.title}
              </p>
              <p className="text-[9px] font-bold text-gray-800 line-clamp-1 mt-0.5">
                {item.label}
              </p>
            </div>
            <span className="text-[9px] font-black uppercase tracking-wider text-[#bf360c] group-hover:underline">
              Play & Win ›
            </span>
          </button>
        ))}
      </div>

      <div className="mt-3 pt-2 text-left flex items-center justify-between">
        <button
          type="button"
          onClick={() => onSelectPod && onSelectPod(pod)}
          className="text-xs font-bold text-amber-200 hover:text-white hover:underline cursor-pointer"
        >
          Explore All {pod.allItems?.length || 10} FunZone Rewards ›
        </button>
        <span className="text-[10px] text-amber-300 font-semibold">10 items</span>
      </div>
    </div>
  );
};
