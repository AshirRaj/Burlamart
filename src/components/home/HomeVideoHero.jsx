import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Sparkles,
  ArrowRight,
  Zap,
  ShoppingBag,
  Hotel,
  Smartphone,
  Cookie,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Store,
  Tag
} from 'lucide-react';

export const HomeVideoHero = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'grocery' | 'hotels-services' | 'electronics' | 'packaged-food'

  const heroModes = {
    all: {
      tag: "Burla & Sambalpur's #1 Multi-Category Super-App",
      badgeColor: 'bg-emerald-400 text-gray-950 font-black',
      headline: 'Supermarket Groceries, Hotel Stays & Electronics.',
      subline: '10-minute lightning grocery delivery, verified hotel rooms with hourly check-in, festival electronics with No-Cost EMI, and gourmet food combos.',
      videoSrc: '/videos/burla all categories.mp4',
      poster: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1920&q=80',
      primaryCta: 'Shop 10-Min Groceries →',
      primaryLink: '/category/grocery',
      secondaryCta: 'Explore Hotel Stays',
      secondaryLink: '/category/hotels-services'
    },
    grocery: {
      tag: '10-Minute Micro-Fulfillment Supermarket',
      badgeColor: 'bg-emerald-400 text-gray-950 font-black',
      headline: 'Farm-Fresh Groceries, Milk & Daily Staples in 10 Mins.',
      subline: 'Browse over 2,500 daily staples, organic fruits, vegetables, bread & dairy sourced straight from verified neighborhood marts at wholesale rates.',
      videoSrc: '/videos/burla all categories.mp4',
      poster: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1920&q=80',
      primaryCta: 'Order Farm Produce Now →',
      primaryLink: '/category/grocery',
      secondaryCta: 'View 20+ Departments',
      secondaryLink: '/category/grocery'
    },
    'hotels-services': {
      tag: 'OYO-Style Verified Hotel Rooms & Stays',
      badgeColor: 'bg-teal-300 text-gray-950 font-black',
      headline: 'Spotless AC Hotel Stays & Flexible Hourly Check-Ins.',
      subline: 'Comfortable king-size rooms, sanitized linen, complimentary high-speed Wi-Fi, and 100% free cancellation with Pay-at-Hotel convenience.',
      videoSrc: null, // Shows vibrant modern hotel room visual
      poster: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1920&q=80',
      primaryCta: 'Book Verified Stays →',
      primaryLink: '/category/hotels-services',
      secondaryCta: 'Wizard Membership (10% Off)',
      secondaryLink: '/category/hotels-services'
    },
    electronics: {
      tag: 'Amazon-Style Great Indian Festival Gadgets',
      badgeColor: 'bg-amber-400 text-gray-950 font-black',
      headline: 'Flagship Smartphones, Laptops & Smartwatches with EMI.',
      subline: 'Compare specs side-by-side, unlock zero-interest No-Cost EMI across HDFC, ICICI, SBI, and receive manufacturer brand warranty cards in the box.',
      videoSrc: null, // Shows vibrant high-tech gadget store visual
      poster: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=1920&q=80',
      primaryCta: 'Explore 380+ Festival Deals →',
      primaryLink: '/category/electronics',
      secondaryCta: 'Calculate No Cost EMI',
      secondaryLink: '/category/electronics'
    },
    'packaged-food': {
      tag: 'Gourmet Snacks, Cookies & BxGy Combos',
      badgeColor: 'bg-orange-400 text-gray-950 font-black',
      headline: 'Packaged Munchies, Ready Meals & Instant Beverage Combos.',
      subline: 'Save up to 35% on curated snack boxes, party packs, biscuits, and cold drinks packed fresh with guaranteed 6-month shelf life.',
      videoSrc: null, // Shows delicious gourmet snack table
      poster: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=1920&q=80',
      primaryCta: 'Grab BxGy Combos →',
      primaryLink: '/category/packaged-food',
      secondaryCta: 'Explore Bulk Party Packs',
      secondaryLink: '/category/packaged-food'
    }
  };

  const currentMode = heroModes[activeTab] || heroModes.all;

  // Enforce autoplay & DOM muted properties for video
  useEffect(() => {
    const video = videoRef.current;
    if (video && currentMode.videoSrc) {
      video.defaultMuted = true;
      video.muted = isMuted;
      video.playsInline = true;
      video.play().catch(() => {});
    }
  }, [currentMode.videoSrc]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const showcaseCategories = [
    {
      id: 'grocery',
      title: 'Groceries & Staples',
      tag: '10 Mins',
      desc: 'Farm fruits, vegetables, dairy & kitchen staples',
      link: '/category/grocery',
      icon: ShoppingBag,
      gradient: 'from-emerald-700/90 via-emerald-800/85 to-teal-950/95',
      borderColor: 'border-emerald-400/50',
      textColor: 'text-emerald-300'
    },
    {
      id: 'hotels-services',
      title: 'Hotels & Serviced Stays',
      tag: 'Verified Stays',
      desc: 'Spotless rooms, AC stays & zero-cancellation fee',
      link: '/category/hotels-services',
      icon: Hotel,
      gradient: 'from-teal-700/90 via-cyan-800/85 to-blue-950/95',
      borderColor: 'border-teal-400/50',
      textColor: 'text-teal-300'
    },
    {
      id: 'electronics',
      title: 'Electronics & Mobiles',
      tag: 'No Cost EMI',
      desc: 'Festival gadgets, comparison matrix & 1-yr warranty',
      link: '/category/electronics',
      icon: Smartphone,
      gradient: 'from-blue-700/90 via-indigo-800/85 to-slate-950/95',
      borderColor: 'border-blue-400/50',
      textColor: 'text-blue-300'
    },
    {
      id: 'packaged-food',
      title: 'Packaged Food & Combos',
      tag: 'BxGy Deals',
      desc: 'Gourmet snacks, cookies, noodles & party drinks',
      link: '/category/packaged-food',
      icon: Cookie,
      gradient: 'from-amber-700/90 via-orange-800/85 to-rose-950/95',
      borderColor: 'border-amber-400/50',
      textColor: 'text-amber-300'
    }
  ];

  return (
    <div className="relative w-full min-h-[580px] lg:min-h-[640px] rounded-3xl overflow-hidden shadow-2xl bg-[#0f172a] text-white border border-slate-700/80 flex flex-col justify-between">
      {/* 1. RELATABLE PROJECT BACKGROUND LAYER (Real Supermarket Video / Hotel Suite / Tech Store - NO FOREST!) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {currentMode.videoSrc ? (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            poster={currentMode.poster}
            key={currentMode.videoSrc}
            className="w-full h-full object-cover opacity-90 transition-opacity duration-700 scale-100"
          >
            <source src="/videos/burla-all-categories.mp4" type="video/mp4" />
            <source src="/videos/burla all categories.mp4" type="video/mp4" />
            <source src={currentMode.videoSrc} type="video/mp4" />
          </video>
        ) : (
          <img
            src={currentMode.poster}
            alt="Retail Showcase"
            className="w-full h-full object-cover opacity-90 scale-105 transition-all duration-700 animate-pulse-slow"
          />
        )}

        {/* Clean, Translucent Retail Tint (Bright colors show through with maximum contrast, zero black void!) */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/50 to-slate-950/70"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/25"></div>
      </div>

      {/* Floating Media Controls (Play/Pause & Sound) */}
      {currentMode.videoSrc && (
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            type="button"
            onClick={togglePlay}
            className="w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition cursor-pointer"
            title={isPlaying ? 'Pause Supermarket Video' : 'Play Supermarket Video'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
          </button>
          <button
            type="button"
            onClick={toggleMute}
            className="w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition cursor-pointer"
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      )}

      {/* 2. Category Switcher Tabs - Instant Relatable Mode Switch */}
      <div className="relative z-10 pt-5 px-4 sm:px-8 max-w-6xl mx-auto w-full">
        <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-md border ${activeTab === 'all'
                ? 'bg-white text-gray-950 border-white shadow-lg scale-105'
                : 'bg-black/50 hover:bg-black/70 text-white border-white/20'
              }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>All Categories</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('grocery')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-md border ${activeTab === 'grocery'
                ? 'bg-emerald-500 text-gray-950 border-emerald-400 shadow-lg scale-105'
                : 'bg-black/50 hover:bg-black/70 text-white border-white/20'
              }`}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-emerald-300" />
            <span>Supermarket Video (10 Mins)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('hotels-services')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-md border ${activeTab === 'hotels-services'
                ? 'bg-teal-400 text-gray-950 border-teal-300 shadow-lg scale-105'
                : 'bg-black/50 hover:bg-black/70 text-white border-white/20'
              }`}
          >
            <Hotel className="w-3.5 h-3.5 text-teal-200" />
            <span>OYO Hotel Rooms</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('electronics')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-md border ${activeTab === 'electronics'
                ? 'bg-amber-400 text-gray-950 border-amber-300 shadow-lg scale-105'
                : 'bg-black/50 hover:bg-black/70 text-white border-white/20'
              }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-amber-200" />
            <span>Electronics & EMI</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('packaged-food')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-md border ${activeTab === 'packaged-food'
                ? 'bg-orange-400 text-gray-950 border-orange-300 shadow-lg scale-105'
                : 'bg-black/50 hover:bg-black/70 text-white border-white/20'
              }`}
          >
            <Cookie className="w-3.5 h-3.5 text-orange-200" />
            <span>Packaged Combos</span>
          </button>
        </div>
      </div>

      {/* 3. Hero Center Content: Dynamic Headline & Interactive Search */}
      <div className="relative z-10 px-5 sm:px-10 py-6 sm:py-8 max-w-5xl mx-auto flex flex-col items-center text-center space-y-4 my-auto">
        <span className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-sm transition-all animate-in fade-in duration-300 ${currentMode.badgeColor}`}>
          <Zap className="w-3.5 h-3.5" />
          {currentMode.tag}
        </span>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight text-white drop-shadow-xl max-w-4xl transition-all duration-300">
          {currentMode.headline}
        </h1>

        <p className="text-xs sm:text-base text-gray-100 max-w-2xl mx-auto leading-relaxed font-semibold drop-shadow-md">
          {currentMode.subline}
        </p>

        {/* Floating Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="w-full max-w-2xl relative flex items-center bg-white rounded-2xl sm:rounded-full p-2 shadow-2xl border-2 border-white/95 focus-within:ring-4 focus-within:ring-emerald-400/40 transition-all mt-1"
        >
          <Search className="w-5 h-5 text-gray-400 ml-3 flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search fresh groceries, OYO hotel rooms, smartphones, kurtas, snacks..."
            className="w-full px-3 py-2 text-xs sm:text-sm text-gray-900 placeholder-gray-500 font-bold bg-transparent outline-none"
          />
          <button
            type="submit"
            className="px-6 py-2.5 bg-gradient-to-r from-[#1B4332] to-[#2D6A4F] hover:from-[#2D6A4F] hover:to-[#40916C] text-white font-black text-xs sm:text-sm rounded-xl sm:rounded-full shadow-md transition flex items-center gap-1.5 flex-shrink-0 cursor-pointer"
          >
            <span>Search</span>
            <ArrowRight className="w-4 h-4 hidden sm:inline" />
          </button>
        </form>

        {/* Quick Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <Link
            to={currentMode.primaryLink}
            className="px-5 py-2.5 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-gray-950 font-black text-xs sm:text-sm rounded-xl shadow-lg transition transform hover:-translate-y-0.5 flex items-center gap-1.5 cursor-pointer"
          >
            <span>{currentMode.primaryCta}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to={currentMode.secondaryLink}
            className="px-5 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-extrabold text-xs sm:text-sm rounded-xl border border-white/30 transition cursor-pointer"
          >
            {currentMode.secondaryCta}
          </Link>
        </div>
      </div>

      {/* 4. Category Showcase Tiles at Bottom of Hero */}
      <div className="relative z-10 w-full px-4 sm:px-8 pb-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5 text-left">
          {showcaseCategories.map((cat) => {
            const IconComp = cat.icon;
            const isCurrent = activeTab === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`group relative overflow-hidden rounded-2xl p-3 sm:p-3.5 bg-gradient-to-br ${cat.gradient} border ${isCurrent ? 'ring-2 ring-white border-white scale-[1.02]' : cat.borderColor
                  } shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[9px] font-black uppercase tracking-wider bg-black/40 text-white px-2 py-0.5 rounded-full">
                      {cat.tag}
                    </span>
                    <IconComp className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-black text-white leading-snug">
                    {cat.title}
                  </h3>
                  <p className="text-[10px] text-gray-200 line-clamp-1 mt-0.5 font-medium">
                    {cat.desc}
                  </p>
                </div>

                <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-bold text-white group-hover:text-amber-200">
                  <Link to={cat.link} className="hover:underline flex items-center gap-1">
                    <span>Enter Page</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
