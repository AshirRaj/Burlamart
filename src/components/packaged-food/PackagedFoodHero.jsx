import React, { useRef, useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Clock, ShieldCheck, Flame, Play, Pause, Volume2, VolumeX } from 'lucide-react';

export const PackagedFoodHero = ({ onExploreClick, onViewBestsellersClick }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Autoplay check
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.defaultMuted = true;
      video.muted = true;
      video.playsInline = true;
      video.play().catch(() => {});
    }
  }, []);

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

  return (
    <section className="relative w-full rounded-3xl overflow-hidden bg-[#1B4332] text-white shadow-xl min-h-[440px] sm:min-h-[500px] flex items-center border border-[#2D6A4F]/40">
      {/* 1. Cinematic Background Food Media with warm wooden lighting */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          poster="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1920&q=80"
          className="w-full h-full object-cover opacity-35 scale-105 motion-safe:transition-all motion-safe:duration-1000"
        >
          <source src="/videos/burla-all-categories.mp4" type="video/mp4" />
          <source src="/videos/burla all categories.mp4" type="video/mp4" />
        </video>

        {/* Warm cream/dark green readable gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B4332] via-[#1B4332]/90 to-[#1B4332]/40" />
        <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/50" />
      </div>

      {/* Floating Audio/Video controls */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
        <button
          type="button"
          onClick={togglePlay}
          className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition"
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
        </button>
        <button
          type="button"
          onClick={toggleMute}
          className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition"
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* 2. Content Left-Aligned with Positive Negative Space for Food Imagery */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-10 py-10 sm:py-14 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-4 sm:space-y-5">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-emerald-200 text-xs font-bold tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>BURLAMART • PACKAGED FOOD</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight sm:leading-none">
            Your Favourite Snacks, <br className="hidden sm:inline" />
            <span className="text-amber-300">Delivered Fresh</span>
          </h1>

          {/* Supporting Text */}
          <p className="text-sm sm:text-base text-emerald-100/90 max-w-xl font-normal leading-relaxed">
            Discover delicious snacks, everyday favourites, and treats for every craving. Handcrafted namkeen, artisanal cookies, instant noodles, and party munchies delivered to your doorstep in 10 minutes.
          </p>

          {/* CTA Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3.5">
            <button
              type="button"
              onClick={onExploreClick}
              className="px-6 py-3 bg-amber-400 hover:bg-amber-500 text-gray-950 font-black text-sm rounded-2xl shadow-lg hover:shadow-amber-500/30 transition flex items-center gap-2 active:scale-95 cursor-pointer"
            >
              <span>Explore Snacks</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onViewBestsellersClick}
              className="px-5 py-3 bg-white/15 hover:bg-white/25 text-white font-bold text-sm rounded-2xl border border-white/25 backdrop-blur-md transition flex items-center gap-2 active:scale-95 cursor-pointer"
            >
              <Flame className="w-4 h-4 text-amber-300" />
              <span>View Bestsellers</span>
            </button>
          </div>

          {/* Trust Footnotes */}
          <div className="pt-3 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-emerald-200/80 font-medium border-t border-white/10">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-300" />
              <span>10-Min Delivery in Burla & Sambalpur</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Genuine Certified Brands</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Snack time, anytime</span>
            </div>
          </div>
        </div>

        {/* Right Floating Snacks Showcase Badge (Desktop) */}
        <div className="hidden lg:flex lg:col-span-4 justify-end">
          <div className="relative p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 text-white max-w-xs space-y-3 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-300 bg-black/30 px-2.5 py-0.5 rounded-full">
                Featured Combo
              </span>
              <span className="text-xs font-black text-emerald-300">Save 35%</span>
            </div>
            <img
              src="https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=400&q=80"
              alt="Snack Feast"
              className="w-full h-36 object-cover rounded-2xl shadow-md"
            />
            <div>
              <h4 className="font-bold text-sm text-white">Weekend Movie Binge Box</h4>
              <p className="text-[11px] text-emerald-100">Chips + Cookies + Soda + Popcorn</p>
            </div>
            <div className="flex items-baseline justify-between pt-1 border-t border-white/10">
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-black text-amber-300">₹299</span>
                <span className="text-xs text-white/50 line-through">₹410</span>
              </div>
              <span className="text-[10px] text-emerald-200">10 mins away</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

