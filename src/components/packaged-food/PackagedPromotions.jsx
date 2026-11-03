import React from 'react';
import { ArrowRight, Sparkles, Tag } from 'lucide-react';
import { PROMOTIONAL_CARDS_DATA } from '../../data/packagedFoodData';

export const PackagedPromotions = ({ onSelectCategory }) => {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {PROMOTIONAL_CARDS_DATA.map((promo) => (
          <div
            key={promo.id}
            className={`relative rounded-3xl overflow-hidden p-6 text-white shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between min-h-[190px] bg-gradient-to-br ${promo.bgGradient} group border border-white/10`}
          >
            {/* Background Image Texture */}
            <div className="absolute right-0 bottom-0 w-44 h-44 pointer-events-none opacity-25 group-hover:scale-105 group-hover:opacity-35 transition-all duration-500 overflow-hidden">
              <img
                src={promo.image}
                alt={promo.title}
                className="w-full h-full object-cover rounded-full"
                loading="lazy"
              />
            </div>

            <div className="relative z-10 space-y-2 max-w-[80%]">
              <span className="inline-block text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20">
                {promo.badge}
              </span>
              <h3 className="text-xl font-black leading-tight text-white drop-shadow-sm">
                {promo.title}
              </h3>
              <p className="text-xs text-white/80 line-clamp-2 leading-relaxed">
                {promo.subtitle}
              </p>
            </div>

            <div className="relative z-10 pt-4">
              <button
                type="button"
                onClick={() => onSelectCategory(promo.targetCategory)}
                className="px-4 py-2 bg-white text-gray-900 hover:bg-amber-100 font-extrabold text-xs rounded-xl shadow-md transition flex items-center gap-1.5 active:scale-95 cursor-pointer"
              >
                <span>{promo.ctaText}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

