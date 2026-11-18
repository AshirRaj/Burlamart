import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  GraduationCap, 
  Zap, 
  Hotel, 
  Smartphone, 
  ArrowRight, 
  Sparkles, 
  Check, 
  Copy, 
  Tag 
} from 'lucide-react';

export const HomeHyperlocalBanner = () => {
  const { promotionalBanners } = useApp();
  const banner = promotionalBanners?.['home-privilege'];
  const [copiedCode, setCopiedCode] = useState(false);

  // If admin toggled banner off, hide it
  if (banner && banner.isActive === false) {
    return null;
  }

  const tag = banner?.tag || 'Burla & Sambalpur Hyperlocal Privilege';
  const title = banner?.title || 'One Super-App for Everything in Burla & Sambalpur';
  const subtitle = banner?.subtitle || "Whether you're in university dorms, family homes, or travelling across Odisha, enjoy verified quality with 10-minute delivery.";
  const couponCode = banner?.couponCode || 'BURLAFIRST';
  const discountText = banner?.discountText || 'Special Welcoming Voucher • Flat 15% Off';
  const realImageUrl = banner?.imageUrl || 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80';

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(couponCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const perks = [
    {
      id: 'campus',
      icon: GraduationCap,
      title: 'VSSUT & VIMSAR Express',
      desc: '10-min drop at Hostels 1–11, PGs & faculty quarters with zero surge fees.',
      tag: 'Campus Priority',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      link: '/category/grocery',
      actionText: 'Order To Campus',
      photo: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'express',
      icon: Zap,
      title: '10-Min Micro Fulfillment',
      desc: 'Farm-fresh milk, produce, staples & medicines packed from local Burla hubs.',
      tag: 'Lightning Fast',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
      link: '/category/grocery',
      actionText: 'Shop Groceries',
      photo: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'stays',
      icon: Hotel,
      title: 'Verified Odisha Stays',
      desc: 'Comfortable AC rooms near Hirakud Dam, Samaleswari Temple & Sambalpur City.',
      tag: 'Hourly Stays',
      badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-200',
      link: '/category/hotels-services',
      actionText: 'Explore Stays',
      photo: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 'tech',
      icon: Smartphone,
      title: 'Festival Gadgets & EMI',
      desc: 'Smartphones, audio gear & study laptops with zero-down payment No-Cost EMI.',
      tag: 'No Cost EMI',
      badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      link: '/category/electronics',
      actionText: 'View Tech Deals',
      photo: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=400&q=80'
    }
  ];

  return (
    <div className="w-full relative overflow-hidden rounded-3xl bg-slate-950 text-white p-5 sm:p-8 shadow-2xl border border-emerald-500/25">
      {/* Real Background Image with high-contrast cinematic overlay - visible yet text is razor sharp */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={realImageUrl}
          alt="Burlamart Hyperlocal Operations"
          className="w-full h-full object-cover opacity-20 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/60" />
      </div>

      {/* Ambient background decoration */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

      {/* Top Banner Header & Coupon Box with Featured Real Photo Badge */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-6 border-b border-white/10">
        <div className="flex items-start gap-4 max-w-3xl">
          {/* Prominent Real Visual Card on Left/Top */}
          <div className="hidden sm:block w-24 h-24 lg:w-28 lg:h-28 rounded-2xl overflow-hidden flex-shrink-0 shadow-xl border-2 border-emerald-400/30 group">
            <img
              src={realImageUrl}
              alt="Burlamart Mart"
              className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
            />
          </div>

          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{tag}</span>
            </div>
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight drop-shadow-sm">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/90 font-medium max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Promo Voucher Box */}
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 flex-shrink-0 self-start lg:self-center shadow-lg">
          <div className="w-9 h-9 rounded-xl bg-amber-400 text-gray-950 flex items-center justify-center font-black flex-shrink-0">
            <Tag className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] text-emerald-200 uppercase font-black tracking-wider block">
              {discountText}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-white tracking-widest font-mono">
                {couponCode}
              </span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="text-[11px] font-bold text-amber-300 hover:text-white flex items-center gap-1 transition cursor-pointer"
                title="Copy Coupon Code"
              >
                {copiedCode ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
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
        </div>
      </div>

      {/* 4 Feature Perk Cards Grid with Real Imagery */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 pt-6">
        {perks.map((perk) => {
          const IconComp = perk.icon;
          return (
            <div
              key={perk.id}
              className="group relative overflow-hidden bg-white/5 hover:bg-white/10 rounded-2xl p-4 border border-white/10 transition-all duration-300 flex flex-col justify-between hover:scale-[1.02] hover:border-emerald-400/40 shadow-sm"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl overflow-hidden shadow-sm flex-shrink-0 border border-white/20">
                    <img
                      src={perk.photo}
                      alt={perk.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    />
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border ${perk.badgeColor}`}>
                    {perk.tag}
                  </span>
                </div>
                <h4 className="text-sm font-black text-white group-hover:text-emerald-300 transition">
                  {perk.title}
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed font-normal">
                  {perk.desc}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-white/10">
                <Link
                  to={perk.link}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 hover:text-white transition group-hover:translate-x-0.5"
                >
                  <span>{perk.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
