import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sprout, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  Copy, 
  Check, 
  Leaf, 
  HeartHandshake 
} from 'lucide-react';

export const GroceryPromotionalBanner = ({ onShopProduce }) => {
  const { promotionalBanners } = useApp();
  const banner = promotionalBanners?.['grocery-fresh'];
  const [copiedCode, setCopiedCode] = useState(false);

  // If admin toggled banner off, hide it
  if (banner && banner.isActive === false) {
    return null;
  }

  const tag = banner?.tag || 'Farm-To-Kitchen Promise • Sambalpur & Bargarh Belt';
  const title = banner?.title || 'Crisp Morning Harvest & 100% Certified Organic Produce';
  const subtitle = banner?.subtitle || "Plucked at 4:30 AM from trusted Western Odisha farming belts and delivered to your doorstep in 10 minutes. If a tomato isn't firm or spinach isn't crisp, enjoy our 1-click no-questions replacement.";
  const couponCode = banner?.couponCode || 'FARM20';
  const discountText = banner?.discountText || 'Flat 20% Off on Fresh Fruits & Veggies';
  const ctaText = banner?.ctaText || 'Explore Farm Harvest';
  const realImageUrl = banner?.imageUrl || 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=1200&q=80';

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(couponCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#0d281e] text-white p-5 sm:p-8 shadow-xl border border-emerald-400/30">
      {/* Real Background Image Layer with atmospheric tint */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={realImageUrl}
          alt="Organic Farm Harvest"
          className="w-full h-full object-cover opacity-25 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d281e] via-[#0d281e]/90 to-[#1b4332]/80" />
      </div>

      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-emerald-400/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-teal-300/10 blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left Headline, Real Image Preview & Details */}
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-300/20 text-emerald-200 border border-emerald-300/30 text-xs font-black uppercase tracking-wider">
            <Sprout className="w-3.5 h-3.5 text-emerald-300" />
            <span>{tag}</span>
          </div>

          <div className="flex items-start gap-4">
            {/* Real Image Card */}
            <div className="hidden sm:block w-24 h-24 lg:w-28 lg:h-28 rounded-2xl overflow-hidden flex-shrink-0 shadow-xl border-2 border-emerald-400/40 group">
              <img
                src={realImageUrl}
                alt="Organic Produce"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-snug drop-shadow-sm">
                {title}
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-normal mt-1">
                {subtitle}
              </p>
            </div>
          </div>

          {/* 3 Value Pillars with Micro Photos */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-xl border border-white/10">
              <Leaf className="w-4 h-4 text-emerald-300 flex-shrink-0" />
              <span className="text-xs font-bold text-emerald-100">Zero Chemical Residue</span>
            </div>
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-xl border border-white/10">
              <Clock className="w-4 h-4 text-amber-300 flex-shrink-0" />
              <span className="text-xs font-bold text-amber-100">10-Min Cold-Bag Delivery</span>
            </div>
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-xl border border-white/10">
              <HeartHandshake className="w-4 h-4 text-teal-300 flex-shrink-0" />
              <span className="text-xs font-bold text-teal-100">100% Instant Refund</span>
            </div>
          </div>
        </div>

        {/* Right Promo Action & Voucher Code */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 flex-shrink-0">
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center sm:text-left lg:text-right space-y-1.5 w-full sm:w-auto shadow-lg">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 block">
              {discountText}
            </span>
            <div className="flex items-center justify-center sm:justify-start lg:justify-end gap-2">
              <span className="text-base font-black tracking-widest text-white font-mono bg-black/40 px-3 py-1 rounded-lg border border-white/15">
                {couponCode}
              </span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="text-xs font-black text-amber-300 hover:text-white flex items-center gap-1 transition px-2 py-1 bg-white/10 rounded-lg cursor-pointer"
              >
                {copiedCode ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={onShopProduce}
            className="px-6 py-3 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-gray-950 font-black text-xs sm:text-sm rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <span>{ctaText}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
