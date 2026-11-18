import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Building2, 
  ShieldCheck, 
  Coffee, 
  Wifi, 
  Sparkles, 
  ArrowRight, 
  Copy, 
  Check 
} from 'lucide-react';

export const HotelPromotionalBanner = ({ onSearchClick }) => {
  const { promotionalBanners } = useApp();
  const banner = promotionalBanners?.['hotels-heritage'];
  const [copiedCode, setCopiedCode] = useState(false);

  // If admin toggled banner off, hide it
  if (banner && banner.isActive === false) {
    return null;
  }

  const tag = banner?.tag || 'Odisha Heritage & Stay Privilege • Sambalpur & Burla';
  const title = banner?.title || 'Save Up to 35% on Verified Stays Near Hirakud Dam & Temple Hubs';
  const subtitle = banner?.subtitle || 'Whether visiting VSSUT Burla for convocation, exploring the longest earthen dam in the world at Hirakud, or seeking divine darshan at Maa Samaleswari Temple — book spotless AC rooms with Pay-at-Hotel convenience.';
  const couponCode = banner?.couponCode || 'BURLASTAY';
  const discountText = banner?.discountText || 'Flat ₹400 Off on bookings above ₹1,499';
  const ctaText = banner?.ctaText || 'Search Verified Stays';
  const realImageUrl = banner?.imageUrl || 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80';

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(couponCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-[#280509] text-white p-5 sm:p-8 shadow-2xl border border-red-500/25 my-6">
      {/* Real Background Image with high-end hotel ambiance */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={realImageUrl}
          alt="Verified Hotel Suite"
          className="w-full h-full object-cover opacity-25 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#280509] via-[#280509]/90 to-[#4a0404]/80" />
      </div>

      {/* Ambient background illumination */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-red-600/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full bg-amber-500/15 blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left Information & Real Image Card */}
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-400/20 text-amber-300 border border-red-400/30 text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{tag}</span>
          </div>

          <div className="flex items-start gap-4">
            {/* Real Hotel Suite Photo Card */}
            <div className="hidden sm:block w-24 h-24 lg:w-28 lg:h-28 rounded-2xl overflow-hidden flex-shrink-0 shadow-xl border-2 border-amber-400/30 group">
              <img
                src={realImageUrl}
                alt="Hotel Room"
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-snug drop-shadow-sm">
                {title}
              </h2>
              <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-normal mt-1">
                {subtitle}
              </p>
            </div>
          </div>

          {/* 4 Feature Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-xl border border-white/10 text-xs font-bold text-gray-100">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>100% Sanitized</span>
            </div>
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-xl border border-white/10 text-xs font-bold text-gray-100">
              <Coffee className="w-4 h-4 text-amber-300 flex-shrink-0" />
              <span>Free Breakfast</span>
            </div>
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-xl border border-white/10 text-xs font-bold text-gray-100">
              <Wifi className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>High-Speed Wi-Fi</span>
            </div>
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-xl border border-white/10 text-xs font-bold text-gray-100">
              <Building2 className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>Pay At Hotel</span>
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
            onClick={onSearchClick}
            className="px-6 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <span>{ctaText}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
