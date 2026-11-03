import React from 'react';
import { ShieldCheck, Trophy, Tag, Sparkles } from 'lucide-react';
import { HOTEL_AMENITIES_LIST } from './hotelData';

export const HotelAmenitiesSection = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Title & Trust Badges (Image 2) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">
              <span className="text-[#e01933]">Burlamart</span>-Serviced Hotels
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-3 text-xs font-semibold text-gray-700">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[#e01933] border border-red-100">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Professionally managed by Burlamart</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-100">
              <Trophy className="w-3.5 h-3.5 text-amber-600" />
              <span>Standardised experience</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100">
              <Tag className="w-3.5 h-3.5 text-emerald-600" />
              <span>Great Value</span>
            </div>
          </div>
        </div>

        {/* Quality Guarantee Mini Banner */}
        <div className="hidden lg:flex items-center gap-3 bg-gradient-to-r from-red-50 to-orange-50 border border-red-100 p-3 rounded-2xl">
          <div className="w-10 h-10 rounded-xl bg-[#e01933] text-white flex items-center justify-center font-bold text-sm shadow-xs">
            100%
          </div>
          <div>
            <p className="text-xs font-bold text-gray-900">Verified Stay Guarantee</p>
            <p className="text-[11px] text-gray-600">Spotless linen, hot water & sanitised spaces</p>
          </div>
        </div>
      </div>

      {/* 5 3D-Styled Feature Amenity Cards (User Reference Image 2) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
        {HOTEL_AMENITIES_LIST.map((item) => (
          <div
            key={item.id}
            className="group relative bg-[#F5F5F7] hover:bg-white rounded-3xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100 hover:border-red-200 cursor-default"
          >
            {/* 3D Icon Container */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 mb-4 flex items-center justify-center text-4xl sm:text-5xl rounded-2xl bg-white/80 shadow-inner group-hover:scale-110 transition-transform duration-300">
              <span className="drop-shadow-md select-none">{item.icon3d}</span>
            </div>

            {/* Label */}
            <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1 group-hover:text-[#e01933] transition-colors">
              {item.name}
            </h3>
            <p className="text-[11px] text-gray-500 leading-snug line-clamp-2">
              {item.desc}
            </p>

            {/* Subtle glow dot */}
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>
    </section>
  );
};

