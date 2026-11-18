import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Cookie, 
  Clock, 
  Moon, 
  Flame, 
  Copy, 
  Check, 
  ArrowRight, 
  Gift 
} from 'lucide-react';

export const PackagedCravingsBanner = ({ onExploreCombos }) => {
  const { promotionalBanners } = useApp();
  const banner = promotionalBanners?.['packaged-cravings'];
  const [copiedCode, setCopiedCode] = useState(false);

  // If admin toggled banner off, hide it
  if (banner && banner.isActive === false) {
    return null;
  }

  const tag = banner?.tag || 'Burla Late-Night Cravings Hotline • Active Till 2:00 AM';
  const title = banner?.title || 'Midnight Study Munchies, Artisanal Namkeen & Chilled Drink Combos';
  const subtitle = banner?.subtitle || 'Cramming for semester exams or hosting friends in your dorm? Get fresh crunchy namkeen, imported chocolates, party dips, and cold sodas delivered straight to your gate in 10 minutes.';
  const couponCode = banner?.couponCode || 'MUNCH30';
  const discountText = banner?.discountText || 'Flat 30% Off on orders above ₹299';
  const ctaText = banner?.ctaText || 'Explore BxGy Combos';
  const realImageUrl = banner?.imageUrl || 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=1200&q=80';

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(couponCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#2e0909] text-white p-5 sm:p-8 shadow-xl border border-amber-400/30 my-6">
      {/* Real Background Snack Feast Image */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={realImageUrl}
          alt="Midnight Snacks Feast"
          className="w-full h-full object-cover opacity-20 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#2e0909] via-[#2e0909]/90 to-[#7f1d1d]/85" />
      </div>

      {/* Decorative Warm Ambient Glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-amber-400/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full bg-orange-500/15 blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left Information & Real Snack Visual Card */}
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-black uppercase tracking-wider">
            <Moon className="w-3.5 h-3.5" />
            <span>{tag}</span>
          </div>

          <div className="flex items-start gap-4">
            {/* Real Snack Photo Card */}
            <div className="hidden sm:block w-24 h-24 lg:w-28 lg:h-28 rounded-2xl overflow-hidden flex-shrink-0 shadow-xl border-2 border-amber-400/40 group">
              <img
                src={realImageUrl}
                alt="Snack Feast"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-snug drop-shadow-sm">
                {title}
              </h2>
              <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed font-normal mt-1">
                {subtitle}
              </p>
            </div>
          </div>

          {/* 4 Feature Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-xl border border-white/10 text-xs font-bold text-amber-100">
              <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>10-Min Delivery</span>
            </div>
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-xl border border-white/10 text-xs font-bold text-amber-100">
              <Flame className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>Buy 2 Get 1 Free</span>
            </div>
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-xl border border-white/10 text-xs font-bold text-amber-100">
              <Cookie className="w-4 h-4 text-yellow-300 flex-shrink-0" />
              <span>Gourmet Combos</span>
            </div>
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-xl border border-white/10 text-xs font-bold text-amber-100">
              <Gift className="w-4 h-4 text-emerald-300 flex-shrink-0" />
              <span>Party Packs</span>
            </div>
          </div>
        </div>

        {/* Right Coupon & Action Box */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 flex-shrink-0">
          <div className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center sm:text-left lg:text-right space-y-1.5 w-full sm:w-auto shadow-lg">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 block">
              {discountText}
            </span>
            <div className="flex items-center justify-center sm:justify-start lg:justify-end gap-2">
              <span className="text-base font-black tracking-widest text-amber-300 font-mono bg-black/40 px-3 py-1 rounded-lg border border-amber-300/30">
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
            onClick={onExploreCombos}
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
