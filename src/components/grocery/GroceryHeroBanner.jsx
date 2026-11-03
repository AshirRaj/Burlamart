import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const GroceryHeroBanner = ({ onShopNow }) => {
  return (
    <div className="space-y-4">
      {/* 1. Main Hero Banner: Stock up on daily essentials */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#1B4332] via-[#2D6A4F] to-[#40916C] text-white shadow-xl min-h-[220px] sm:min-h-[260px] flex items-center">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="relative z-10 p-6 sm:p-10 max-w-xl space-y-3">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white drop-shadow-sm">
            Stock up on daily essentials
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 font-medium max-w-md leading-relaxed">
            Get farm-fresh goodness & a range of exotic fruits, vegetables, eggs & more
          </p>
          <div className="pt-2">
            <button
              type="button"
              onClick={onShopNow}
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-900 font-extrabold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-lg transition active:scale-95"
            >
              <span>Shop Now</span>
            </button>
          </div>
        </div>

        {/* Right Hero Image Collage */}
        <div className="hidden md:flex absolute right-4 lg:right-10 bottom-0 top-0 items-center justify-end pointer-events-none w-1/2">
          <img
            src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=700&q=80"
            alt="Farm fresh fruits, vegetables, milk & daily essentials"
            className="h-full max-h-[240px] object-cover object-center rounded-2xl drop-shadow-2xl"
          />
        </div>
      </div>

      {/* 2. Three Promotional Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
        {/* Card 1: Fresh Dairy & Eggs */}
        <div className="rounded-3xl p-5 bg-gradient-to-br from-[#00A896] to-[#028090] text-white shadow-md relative overflow-hidden flex flex-col justify-between min-h-[150px] group hover:shadow-lg transition">
          <div className="relative z-10 space-y-1 max-w-[65%]">
            <h3 className="font-extrabold text-sm sm:text-base leading-snug">
              Fresh Dairy & Farm Eggs!
            </h3>
            <p className="text-[11px] text-teal-100 leading-tight">
              Pasteurized milk, butter, cheese & organic eggs
            </p>
          </div>

          <div className="relative z-10 pt-3">
            <Link
              to="/category/grocery"
              className="inline-block px-3.5 py-1.5 bg-[#1B4332] text-white font-extrabold text-xs rounded-xl shadow transition hover:bg-emerald-950 active:scale-95"
            >
              Order Now
            </Link>
          </div>

          {/* Product shot on right */}
          <div className="absolute -right-2 -bottom-2 w-28 h-28 pointer-events-none opacity-90 group-hover:scale-105 transition duration-300">
            <img
              src="https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=300&q=80"
              alt="Fresh dairy and eggs"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>

        {/* Card 2: Pet care */}
        <div className="rounded-3xl p-5 bg-gradient-to-br from-[#F4A261] to-[#E76F51] text-white shadow-md relative overflow-hidden flex flex-col justify-between min-h-[150px] group hover:shadow-lg transition">
          <div className="relative z-10 space-y-1 max-w-[65%]">
            <h3 className="font-extrabold text-sm sm:text-base leading-snug">
              Pet care supplies at your door
            </h3>
            <p className="text-[11px] text-amber-100 leading-tight">
              Food, treats, toys & more
            </p>
          </div>

          <div className="relative z-10 pt-3">
            <button
              type="button"
              onClick={onShopNow}
              className="inline-block px-3.5 py-1.5 bg-[#1B4332] text-white font-extrabold text-xs rounded-xl shadow transition hover:bg-emerald-950 active:scale-95"
            >
              Order Now
            </button>
          </div>

          {/* Dog & Cat shot on right */}
          <div className="absolute -right-2 -bottom-2 w-28 h-28 pointer-events-none opacity-90 group-hover:scale-105 transition duration-300">
            <img
              src="https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=300&q=80"
              alt="Pet dog and cat supplies"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>

        {/* Card 3: Baby Care */}
        <div className="rounded-3xl p-5 bg-gradient-to-br from-[#90E0EF] via-[#A0C4FF] to-[#BDB2FF] text-slate-900 shadow-md relative overflow-hidden flex flex-col justify-between min-h-[150px] group hover:shadow-lg transition">
          <div className="relative z-10 space-y-1 max-w-[65%]">
            <h3 className="font-extrabold text-sm sm:text-base leading-snug text-slate-900">
              No time for a diaper run?
            </h3>
            <p className="text-[11px] text-slate-700 leading-tight">
              Get baby care essentials
            </p>
          </div>

          <div className="relative z-10 pt-3">
            <button
              type="button"
              onClick={onShopNow}
              className="inline-block px-3.5 py-1.5 bg-[#1B4332] text-white font-extrabold text-xs rounded-xl shadow transition hover:bg-emerald-950 active:scale-95"
            >
              Order Now
            </button>
          </div>

          {/* Baby care shot on right */}
          <div className="absolute -right-2 -bottom-2 w-28 h-28 pointer-events-none opacity-90 group-hover:scale-105 transition duration-300">
            <img
              src="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=300&q=80"
              alt="Baby care essentials"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

