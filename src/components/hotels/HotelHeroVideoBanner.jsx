import React, { useRef, useEffect } from 'react';
import { 
  Building2, 
  Globe2, 
  Users, 
  Smartphone, 
  Award, 
  ChevronDown
} from 'lucide-react';
import { HotelFloatingSearchBar } from './HotelFloatingSearchBar';

export const HotelHeroVideoBanner = ({
  destination,
  setDestination,
  checkInDate,
  setCheckInDate,
  checkOutDate,
  setCheckOutDate,
  rooms,
  onUpdateRoomGuests,
  onAddRoom,
  onDeleteRoom,
  onPerformSearch
}) => {
  const videoRef = useRef(null);

  // Enforce autoplay & DOM muted properties
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.defaultMuted = true;
      video.muted = true;
      video.playsInline = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Deferred until user interaction
          const startPlayback = () => {
            video.play().catch(() => {});
            document.removeEventListener('click', startPlayback);
          };
          document.addEventListener('click', startPlayback, { once: true });
        });
      }
    }
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-slate-950 text-white min-h-[580px] sm:min-h-[660px] lg:min-h-[720px] flex flex-col justify-between">
      {/* Background High-Definition Video & Dynamic Ambiance */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          src="/videos/hotel-hero.mp4"
          poster="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1920&q=80"
          className="w-full h-full object-cover opacity-85 scale-105"
        >
          <source src="/videos/hotel-hero.mp4" type="video/mp4" />
        </video>

        {/* Ambient City Lights Backdrop & Subtle Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-black/85" />
      </div>

      {/* Top Header Cities Ribbon - Odisha Cities (Mainly Sambalpur & Burla) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 pt-6 sm:pt-8 flex items-center justify-center">
        <div className="hidden lg:flex items-center gap-5 text-xs text-gray-200 font-medium bg-black/40 backdrop-blur-md px-6 py-2.5 rounded-full border border-white/10 shadow-lg">
          {['Sambalpur', 'Burla', 'Bhubaneswar', 'Puri', 'Cuttack', 'Rourkela', 'Jharsuguda', 'Berhampur', 'Balasore', 'Bargarh'].map((cityName) => (
            <button
              key={cityName}
              type="button"
              onClick={() => {
                setDestination(cityName);
                setTimeout(() => {
                  onPerformSearch();
                }, 50);
              }}
              className={`hover:text-white transition flex items-center gap-1 group ${
                destination.toLowerCase() === cityName.toLowerCase() ? 'text-amber-400 font-bold' : ''
              }`}
            >
              <span>{cityName}</span>
              <ChevronDown className="w-3 h-3 text-gray-400 group-hover:text-white transition" />
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              setDestination('');
              setTimeout(() => {
                onPerformSearch();
              }, 50);
            }}
            className="text-amber-400 hover:text-amber-300 font-bold ml-1 underline underline-offset-4"
          >
            All Odisha Cities
          </button>
        </div>
      </div>

      {/* Center Hero Content & Main Headline */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 flex-1 flex flex-col items-center justify-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-bold mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span>Odisha’s Premier Verified Stays & Homestays • Sambalpur & Burla HQ</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight max-w-4xl leading-tight sm:leading-none drop-shadow-2xl mb-8">
          Top rated stays across Sambalpur, Burla & all Odisha
        </h1>

        {/* Hero Search Bar */}
        <div className="w-full">
          <HotelFloatingSearchBar
            destination={destination}
            setDestination={setDestination}
            checkInDate={checkInDate}
            setCheckInDate={setCheckInDate}
            checkOutDate={checkOutDate}
            setCheckOutDate={setCheckOutDate}
            rooms={rooms}
            onUpdateRoomGuests={onUpdateRoomGuests}
            onAddRoom={onAddRoom}
            onDeleteRoom={onDeleteRoom}
            onPerformSearch={onPerformSearch}
          />
        </div>
      </div>

      {/* Trust Statistics Ribbon (Matching Reference Image 1) */}
      <div className="relative z-10 w-full bg-white text-gray-800 border-t border-gray-100 py-4 sm:py-5 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-around gap-4 sm:gap-6 text-center text-xs font-semibold">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-red-50 text-[#e01933] flex items-center justify-center">
              <Building2 className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-gray-900">175k+ hotels and homes</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <Globe2 className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-gray-900">35+ countries (500+ Indian cities)</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Users className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-gray-900">100mn+ guests hosted</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
              <Smartphone className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-gray-900">10cr+ app downloads</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
              <Award className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-gray-900">Since 2013</span>
          </div>
        </div>
      </div>
    </div>
  );
};
