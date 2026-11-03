import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  ChevronRight, 
  ChevronLeft, 
  Truck, 
  ShieldCheck,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { FESTIVE_HERO_SLIDES } from './electronicsData';

export const AmazonHeroCarousel = ({ onSelectPod }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const scrollRef = useRef(null);

  // Auto scroll carousel every 4.5 seconds if playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 340, behavior: 'smooth' });
        }
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleScrollNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 360, behavior: 'smooth' });
    }
  };

  const handleScrollPrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -360, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full bg-[#131921] py-4 overflow-hidden border-b border-gray-800">
      {/* Scroll Controls on Desktop */}
      <button
        type="button"
        onClick={handleScrollPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-20 bg-white/10 hover:bg-white/30 backdrop-blur-md rounded-r-2xl flex items-center justify-center text-white transition hidden sm:flex"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        type="button"
        onClick={handleScrollNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-20 bg-white/10 hover:bg-white/30 backdrop-blur-md rounded-l-2xl flex items-center justify-center text-white transition hidden sm:flex"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Container (Image 1) */}
      <div
        ref={scrollRef}
        className="max-w-7xl mx-auto px-4 flex items-stretch gap-4 overflow-x-auto no-scrollbar scroll-smooth"
      >
        {/* Card 1: Great Indian Festival Logo & Bank Offers (Image 1 Left) */}
        <div className="min-w-[300px] sm:min-w-[340px] max-w-[340px] rounded-3xl p-5 bg-gradient-to-b from-[#e65100] via-[#bf360c] to-[#3e2723] text-white flex flex-col justify-between shadow-2xl border border-amber-500/30 flex-shrink-0">
          <div>
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 p-1 flex items-center justify-center shadow-lg mb-2">
              <div className="w-full h-full rounded-full bg-[#bf360c] flex flex-col items-center justify-center text-center p-1.5">
                <span className="text-[9px] uppercase font-bold text-amber-200">Great</span>
                <span className="text-xs font-black text-white leading-tight">Indian</span>
                <span className="text-[9px] font-bold text-amber-200">Festival</span>
              </div>
            </div>
            <div className="text-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-300 bg-black/40 px-2.5 py-0.5 rounded-full">
                Diwali Edition
              </span>
              <h3 className="text-xl font-black text-white mt-2">Last Chance Deals</h3>
              <p className="text-xs font-black text-amber-300 mt-0.5">Get 35% cashback up to ₹150*</p>
            </div>

            {/* 4 Mini Products Showcase Inside Card 1 */}
            <div className="grid grid-cols-2 gap-2 mt-3 bg-black/30 p-2 rounded-2xl">
              {FESTIVE_HERO_SLIDES[0].products.slice(0, 4).map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  className="bg-white/10 hover:bg-white/20 p-1.5 rounded-xl flex items-center gap-2 group transition text-left"
                >
                  <img src={p.image} alt={p.name} className="w-8 h-8 rounded-lg object-contain bg-white/20 p-0.5" />
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-white truncate">{p.name}</p>
                    <p className="text-[10px] text-amber-300 font-black">₹{p.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-3">
            <button
              type="button"
              onClick={() => onSelectPod({ title: 'Great Indian Festival - Top 10 Diwali Deals', allItems: FESTIVE_HERO_SLIDES[0].products })}
              className="w-full py-2 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-gray-950 font-black text-xs rounded-xl shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Explore All 10 Festival Deals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* HDFC Bank Ribbon */}
            <div className="mt-2.5 bg-white text-gray-900 rounded-xl p-2 flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-1.5">
                <span className="bg-[#004c8f] text-white text-[9px] font-black px-1.5 py-0.5 rounded">HDFC BANK</span>
                <span className="text-[9px] font-black text-[#004c8f]">10% Instant Discount*</span>
              </div>
              <span className="text-[9px] text-gray-500 font-semibold">*T&C</span>
            </div>
          </div>
        </div>

        {/* Card 2: Apple Watch Series 11 (Orange Card - Image 1) with 10 Products Access */}
        <div className="min-w-[300px] sm:min-w-[340px] max-w-[340px] rounded-3xl p-5 bg-gradient-to-b from-[#ff6f00] to-[#e65100] text-white flex flex-col justify-between shadow-2xl border border-orange-400/40 flex-shrink-0">
          <div>
            <div className="flex items-center justify-between text-[11px] text-orange-100 mb-1 font-bold">
              <span>Exciting offers^</span>
              <span className="bg-black/30 px-2 py-0.5 rounded-full text-[10px]">Sponsored</span>
            </div>
            <h3 className="text-xl font-black text-white leading-tight">
              The ultimate way to watch your health.
            </h3>
            <p className="text-xs text-orange-200 font-semibold mt-0.5">Apple Watch Series 11 & Gadgets</p>

            {/* 4 Mini Products Showcase Inside Card 2 */}
            <div className="grid grid-cols-2 gap-2 mt-3 bg-black/20 p-2 rounded-2xl">
              {FESTIVE_HERO_SLIDES[1].products.slice(0, 4).map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  className="bg-white/10 hover:bg-white/20 p-1.5 rounded-xl flex items-center gap-2 group transition text-left"
                >
                  <img src={p.image} alt={p.name} className="w-8 h-8 rounded-lg object-contain bg-white/20 p-0.5" />
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-white truncate">{p.name}</p>
                    <p className="text-[10px] text-amber-200 font-black">₹{p.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-3">
            <button
              type="button"
              onClick={() => onSelectPod({ title: 'Top 10 Smartwatches & Wearables', allItems: FESTIVE_HERO_SLIDES[1].products })}
              className="w-full py-2 bg-white hover:bg-gray-100 text-gray-950 font-black text-xs rounded-xl shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>View All 10 Smartwatch Deals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <div className="mt-2 text-center text-[10px] text-orange-200">
              Free Delivery • 10% Bank Discount
            </div>
          </div>
        </div>

        {/* Card 3: Facewashes Under ₹499 (Purple Card - Image 1) with 10 Products Access */}
        <div className="min-w-[300px] sm:min-w-[340px] max-w-[340px] rounded-3xl p-5 bg-gradient-to-b from-[#7b1fa2] to-[#4a148c] text-white flex flex-col justify-between shadow-2xl border border-purple-400/40 flex-shrink-0">
          <div>
            <div className="flex items-center justify-between text-[11px] text-purple-200 mb-1 font-bold">
              <span>Free Delivery on first 3 orders*</span>
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px]">Latest Trends</span>
            </div>
            <h3 className="text-xl font-black text-white leading-tight">
              Under ₹499 | Facewashes
            </h3>
            <p className="text-xs text-purple-200 font-semibold mt-0.5">Minimalist, Derma Co, Garnier</p>

            {/* 4 Mini Products Showcase Inside Card 3 */}
            <div className="grid grid-cols-2 gap-2 mt-3 bg-purple-950/40 p-2 rounded-2xl">
              {FESTIVE_HERO_SLIDES[2].products.slice(0, 4).map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  className="bg-white/10 hover:bg-white/20 p-1.5 rounded-xl flex items-center gap-2 group transition text-left"
                >
                  <img src={p.image} alt={p.name} className="w-8 h-8 rounded-lg object-contain bg-white/20 p-0.5" />
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-white truncate">{p.name}</p>
                    <p className="text-[10px] text-amber-200 font-black">₹{p.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-3">
            <button
              type="button"
              onClick={() => onSelectPod({ title: 'Top 10 Facewashes & Skincare Under ₹499', allItems: FESTIVE_HERO_SLIDES[2].products })}
              className="w-full py-2 bg-white hover:bg-gray-100 text-gray-950 font-black text-xs rounded-xl shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>View All 10 Skincare Deals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <div className="mt-2 text-center text-[10px] text-purple-200">
              35% Cashback + 10% Instant Off
            </div>
          </div>
        </div>

        {/* Card 4: Kurta Sets Under ₹399 (Maroon Card - Image 1) with 10 Products Access */}
        <div className="min-w-[300px] sm:min-w-[340px] max-w-[340px] rounded-3xl p-5 bg-gradient-to-b from-[#c2185b] to-[#880e4f] text-white flex flex-col justify-between shadow-2xl border border-pink-400/40 flex-shrink-0">
          <div>
            <div className="flex items-center justify-between text-[11px] text-pink-200 mb-1 font-bold">
              <span>Free Delivery</span>
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px]">Easy Returns</span>
            </div>
            <h3 className="text-xl font-black text-white leading-tight">
              Under ₹399 | Kurta sets
            </h3>
            <p className="text-xs text-pink-200 font-semibold mt-0.5">Pure Silk & Cotton Weaves</p>

            {/* 4 Mini Products Showcase Inside Card 4 */}
            <div className="grid grid-cols-2 gap-2 mt-3 bg-pink-950/40 p-2 rounded-2xl">
              {FESTIVE_HERO_SLIDES[3].products.slice(0, 4).map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  className="bg-white/10 hover:bg-white/20 p-1.5 rounded-xl flex items-center gap-2 group transition text-left"
                >
                  <img src={p.image} alt={p.name} className="w-8 h-8 rounded-lg object-contain bg-white/20 p-0.5" />
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-white truncate">{p.name}</p>
                    <p className="text-[10px] text-amber-200 font-black">₹{p.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-3">
            <button
              type="button"
              onClick={() => onSelectPod({ title: 'Top 10 Festive Kurta Sets Under ₹399', allItems: FESTIVE_HERO_SLIDES[3].products })}
              className="w-full py-2 bg-white hover:bg-gray-100 text-gray-950 font-black text-xs rounded-xl shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>View All 10 Kurta Deals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <div className="mt-2 text-center text-[10px] text-pink-200">
              Pure Silk & Cotton • Easy Returns
            </div>
          </div>
        </div>

        {/* Card 5: Kitchen Essentials Starting ₹199 (Green Card - Image 1) with 10 Products Access */}
        <div className="min-w-[300px] sm:min-w-[340px] max-w-[340px] rounded-3xl p-5 bg-gradient-to-b from-[#2e7d32] to-[#1b5e20] text-white flex flex-col justify-between shadow-2xl border border-emerald-400/40 flex-shrink-0">
          <div>
            <div className="flex items-center justify-between text-[11px] text-emerald-200 mb-1 font-bold">
              <span>Starting ₹199</span>
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px]">Festive Kitchen</span>
            </div>
            <h3 className="text-xl font-black text-white leading-tight">
              Festive kitchen essentials
            </h3>
            <p className="text-xs text-emerald-200 font-semibold mt-0.5">Lunchboxes, Choppers & Flasks</p>

            {/* 4 Mini Products Showcase Inside Card 5 */}
            <div className="grid grid-cols-2 gap-2 mt-3 bg-emerald-950/40 p-2 rounded-2xl">
              {FESTIVE_HERO_SLIDES[4].products.slice(0, 4).map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  className="bg-white/10 hover:bg-white/20 p-1.5 rounded-xl flex items-center gap-2 group transition text-left"
                >
                  <img src={p.image} alt={p.name} className="w-8 h-8 rounded-lg object-contain bg-white/20 p-0.5" />
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-white truncate">{p.name}</p>
                    <p className="text-[10px] text-amber-200 font-black">₹{p.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-3">
            <button
              type="button"
              onClick={() => onSelectPod({ title: 'Top 10 Festive Kitchen Deals Starting ₹199', allItems: FESTIVE_HERO_SLIDES[4].products })}
              className="w-full py-2 bg-white hover:bg-gray-100 text-gray-950 font-black text-xs rounded-xl shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>View All 10 Kitchen Deals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <div className="mt-2 text-center text-[10px] text-emerald-200">
              Airtight Storage • 10% Instant Off
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Media Bar (Play/Pause, Mute toggle - Image 1 Bottom Left) */}
      <div className="max-w-7xl mx-auto px-4 mt-3 flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-7 h-7 rounded-full bg-gray-800 hover:bg-gray-700 text-white flex items-center justify-center transition"
            title={isPlaying ? 'Pause Auto-scroll' : 'Play Auto-scroll'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
          </button>
          <button
            type="button"
            onClick={() => setIsMuted(!isMuted)}
            className="w-7 h-7 rounded-full bg-gray-800 hover:bg-gray-700 text-white flex items-center justify-center transition"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
          <span className="text-[11px] font-semibold text-gray-300">Great Indian Festival Deals Live (10+ Items in every card)</span>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-amber-300 font-bold">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>Click any card to view full 10-item collection</span>
        </div>
      </div>
    </div>
  );
};
