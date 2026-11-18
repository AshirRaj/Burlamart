import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Smartphone, 
  CreditCard, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Copy, 
  Check, 
  RotateCcw,
  Zap
} from 'lucide-react';

export const AmazonFestivalBannerStrip = ({ onExploreDeals }) => {
  const { promotionalBanners } = useApp();
  const banner = promotionalBanners?.['electronics-festive'];
  const [copiedCode, setCopiedCode] = useState(false);

  // If admin toggled banner off, hide it
  if (banner && banner.isActive === false) {
    return null;
  }

  const tag = banner?.tag || 'Great Indian Festival • Campus Tech Carnival';
  const title = banner?.title || 'Upgrade Your Smartphone & Laptop with Up to ₹12,000 Extra Exchange Bonus';
  const subtitle = banner?.subtitle || 'No-cost EMI up to 12 months on all major bank credit cards, zero processing fee, guaranteed buyback value, and free doorstep delivery across Burla & Sambalpur.';
  const couponCode = banner?.couponCode || 'TECH15';
  const discountText = banner?.discountText || 'Flat 15% Off on Audio & Accessories';
  const ctaText = banner?.ctaText || 'Explore All 380+ Deals';
  const realImageUrl = banner?.imageUrl || 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=1200&q=80';

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(couponCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#0f141c] text-white p-5 sm:p-8 shadow-2xl border border-amber-500/30 my-6">
      {/* Real Background Gadgets Image Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={realImageUrl}
          alt="Tech & Gadgets"
          className="w-full h-full object-cover opacity-20 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f141c] via-[#0f141c]/90 to-[#232f3e]/85" />
      </div>

      {/* Golden Festive Aura Backdrop */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full bg-orange-600/15 blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left Information & Real Gadget Photo Card */}
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{tag}</span>
          </div>

          <div className="flex items-start gap-4">
            {/* Real Gadgets Showcase Card */}
            <div className="hidden sm:block w-24 h-24 lg:w-28 lg:h-28 rounded-2xl overflow-hidden flex-shrink-0 shadow-xl border-2 border-amber-400/40 group">
              <img
                src={realImageUrl}
                alt="Tech Deals"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-snug drop-shadow-sm">
                {title}
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-normal mt-1">
                {subtitle}
              </p>
            </div>
          </div>

          {/* 4 Feature Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-3 py-2 rounded-xl border border-white/10 text-xs font-bold text-gray-200">
              <RotateCcw className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>Easy Exchange</span>
            </div>
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-3 py-2 rounded-xl border border-white/10 text-xs font-bold text-gray-200">
              <CreditCard className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>0% No Cost EMI</span>
            </div>
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-3 py-2 rounded-xl border border-white/10 text-xs font-bold text-gray-200">
              <ShieldCheck className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <span>1-Yr Warranty</span>
            </div>
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-3 py-2 rounded-xl border border-white/10 text-xs font-bold text-gray-200">
              <Zap className="w-4 h-4 text-yellow-400 flex-shrink-0" />
              <span>24h Delivery</span>
            </div>
          </div>
        </div>

        {/* Right Coupon & Action Box */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 flex-shrink-0">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center sm:text-left lg:text-right space-y-1.5 w-full sm:w-auto shadow-lg">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 block">
              {discountText}
            </span>
            <div className="flex items-center justify-center sm:justify-start lg:justify-end gap-2">
              <span className="text-base font-black tracking-widest text-amber-300 font-mono bg-black/50 px-3 py-1 rounded-lg border border-amber-400/30">
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
            onClick={onExploreDeals}
            className="px-6 py-3 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-gray-950 font-black text-xs sm:text-sm rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <span>{ctaText}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
