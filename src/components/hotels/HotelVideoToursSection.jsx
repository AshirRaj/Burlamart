import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Play, 
  Pause, 
  Star, 
  MapPin, 
  Eye, 
  CalendarCheck, 
  BedDouble, 
  Users, 
  Check, 
  X, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  ShieldCheck 
} from 'lucide-react';
import { HOTEL_VIDEO_TOURS } from './hotelData';

export const HotelVideoToursSection = ({
  destination,
  setDestination,
  filteredStays = [],
  totalNights = 1,
  roomsCount = 1,
  adultsCount = 1,
  onBookRoom
}) => {
  const navigate = useNavigate();
  const [activeVideoModal, setActiveVideoModal] = useState(null);
  const [hoveredTourId, setHoveredTourId] = useState(null);

  // Auto-sort video walkthroughs based on destination
  const sortedTours = useMemo(() => {
    if (!destination?.trim()) return HOTEL_VIDEO_TOURS;
    const q = destination.toLowerCase().trim();
    return [...HOTEL_VIDEO_TOURS].sort((a, b) => {
      const aMatch = (a.city || '').toLowerCase().includes(q) || (a.hotelName || '').toLowerCase().includes(q) || (a.location || '').toLowerCase().includes(q);
      const bMatch = (b.city || '').toLowerCase().includes(q) || (b.hotelName || '').toLowerCase().includes(q) || (b.location || '').toLowerCase().includes(q);
      if (aMatch && !bMatch) return -1;
      if (!aMatch && bMatch) return 1;
      return 0;
    });
  }, [destination]);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-16">
      {/* 1. PRIMARY SECTION: AVAILABLE STAYS RESULTS (Target of Search & City Clicks) */}
      <div id="hotel-stays-results" className="scroll-mt-28">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                {destination ? `Available Stays in ${destination}, Odisha` : 'Verified Stays Across Odisha (Mainly Sambalpur & Burla)'}
              </h3>
              {destination && (
                <button
                  type="button"
                  onClick={() => setDestination?.('')}
                  className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-[#e01933] text-xs font-bold rounded-lg border border-red-200 transition flex items-center gap-1 active:scale-95"
                  title="Clear location filter"
                >
                  <span>Clear Filter</span>
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Calculating stay pricing for: <span className="font-bold text-gray-800">{totalNights} Night{totalNights > 1 ? 's' : ''}</span>, <span className="font-bold text-gray-800">{roomsCount} Room{roomsCount > 1 ? 's' : ''}</span>, <span className="font-bold text-gray-800">{adultsCount} Guest{adultsCount > 1 ? 's' : ''}</span>
            </p>
          </div>

          <div className="text-xs font-semibold text-gray-700 bg-gray-50 px-3.5 py-1.5 rounded-xl border border-gray-200 flex items-center gap-1.5 self-start sm:self-auto shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{filteredStays.length} {filteredStays.length === 1 ? 'property' : 'properties'} available</span>
          </div>
        </div>

        {/* Zero Results Feedback */}
        {filteredStays.length === 0 && (
          <div className="bg-amber-50/70 border border-amber-200 rounded-3xl p-8 text-center max-w-xl mx-auto space-y-3 my-8 shadow-sm">
            <MapPin className="w-10 h-10 text-amber-600 mx-auto" />
            <h4 className="font-black text-gray-900 text-lg">No direct stays found in "{destination}"</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              We are actively onboarding more partner hotels across every district of Odisha! Try searching for our primary hubs <strong>Sambalpur</strong>, <strong>Burla</strong>, <strong>Hirakud</strong>, or coastal hubs like <strong>Puri</strong> & <strong>Bhubaneswar</strong>.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => setDestination?.('Sambalpur')}
                className="px-4 py-2 bg-[#e01933] text-white text-xs font-bold rounded-xl shadow hover:bg-[#c8142b] transition active:scale-95"
              >
                View Sambalpur Stays
              </button>
              <button
                type="button"
                onClick={() => setDestination?.('')}
                className="px-4 py-2 bg-white text-gray-800 border border-gray-300 text-xs font-bold rounded-xl hover:bg-gray-50 transition active:scale-95"
              >
                Show All Odisha Stays
              </button>
            </div>
          </div>
        )}

        {/* Stays Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStays.map((stay) => {
            const stayPrice = stay.price * totalNights * roomsCount;
            const originalPrice = (stay.mrp || stay.price * 1.5) * totalNights * roomsCount;

            return (
              <div
                key={stay.id}
                onClick={() => navigate(`/product/${stay.id}`)}
                className="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-xl hover:border-gray-400 transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer"
              >
                {/* Stay Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                  <img
                    src={stay.image}
                    alt={stay.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {stay.badge && (
                      <span className="bg-[#e01933] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs">
                        {stay.badge}
                      </span>
                    )}
                    <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      Sanitised
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-xs text-white text-xs font-bold px-2.5 py-1 rounded-xl flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{stay.rating || 4.8}</span>
                    <span className="text-gray-300 text-[10px]">({stay.reviewsCount || 120})</span>
                  </div>
                </div>

                {/* Stay Body Info */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {stay.location && (
                      <div className="flex items-center gap-1 text-[11px] text-gray-400 mb-1 line-clamp-1">
                        <MapPin className="w-3 h-3 text-[#e01933] flex-shrink-0" />
                        <span>{stay.location}</span>
                      </div>
                    )}
                    <h4 className="font-bold text-gray-900 text-base group-hover:text-[#e01933] transition-colors line-clamp-1">
                      {stay.name}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {stay.description}
                    </p>

                    {/* Amenities list */}
                    {stay.amenities && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {stay.amenities.slice(0, 3).map((am, i) => (
                          <span
                            key={i}
                            className="bg-gray-100 text-gray-600 text-[10px] font-semibold px-2 py-0.5 rounded-md"
                          >
                            {am}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Pricing and Book Button */}
                  <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xl font-black text-gray-900">₹{stayPrice}</span>
                        <span className="text-xs text-gray-400 line-through">₹{originalPrice}</span>
                      </div>
                      <span className="text-[10px] text-gray-500 font-medium">
                        ₹{stay.price}/night • {totalNights} night{totalNights > 1 ? 's' : ''}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        to={`/product/${stay.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="p-2.5 rounded-xl border border-gray-200 hover:border-gray-900 text-gray-700 hover:text-gray-900 transition"
                        title="View Full Room Gallery & Details"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onBookRoom(stay);
                        }}
                        className="px-4 py-2.5 bg-[#e01933] hover:bg-[#c8142b] text-white text-xs font-bold rounded-xl shadow-xs transition active:scale-95 flex items-center gap-1.5 cursor-pointer"
                      >
                        <CalendarCheck className="w-3.5 h-3.5" />
                        <span>Book Stay</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. SECONDARY SECTION: VIRTUAL ROOM VIDEO TOURS */}
      <div className="border-t border-gray-200 pt-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-red-600">
                Live Video Walkthroughs
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-1">
              Virtual Room Tours
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              See 100% authentic video reels of bedrooms, bathrooms, and scenic views in Odisha before reserving
            </p>
          </div>

          <div className="text-xs text-gray-500 font-semibold">
            Showing verified video reels from partner stays
          </div>
        </div>

        {/* Video Reel Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sortedTours.map((tour) => {
            const isHovered = hoveredTourId === tour.id;

            return (
              <div
                key={tour.id}
                onClick={() => navigate(`/product/${tour.productId}`)}
                onMouseEnter={() => setHoveredTourId(tour.id)}
                onMouseLeave={() => setHoveredTourId(null)}
                className="group relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl hover:border-gray-300 transition-all duration-300 flex flex-col cursor-pointer"
              >
                {/* Video Preview Box */}
                <div className="relative aspect-[9/12] w-full overflow-hidden bg-black">
                  {isHovered ? (
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    >
                      <source src={tour.videoUrl} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      src={tour.thumbnail}
                      alt={tour.hotelName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30 pointer-events-none" />

                  {/* Tag & City Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="text-[10px] font-bold bg-[#e01933] text-white px-2.5 py-0.5 rounded-full shadow-sm">
                      {tour.tag}
                    </span>
                    <span className="text-[10px] font-bold bg-black/60 backdrop-blur-xs text-white px-2 py-0.5 rounded-full flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-red-400" />
                      {tour.city}
                    </span>
                  </div>

                  {/* Center Play Button Overlay */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveVideoModal(tour);
                    }}
                    className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-white/90 hover:bg-[#e01933] text-gray-900 hover:text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer"
                    title="Watch Full HD Tour"
                  >
                    <Play className="w-5 h-5 ml-0.5 fill-current" />
                  </button>

                  {/* Bottom Overlay Info */}
                  <div className="absolute bottom-3 left-3 right-3 text-white pointer-events-none">
                    <div className="flex items-center gap-1 text-xs text-amber-300 font-bold mb-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{tour.rating}</span>
                      <span className="text-gray-300 text-[10px]">({tour.reviews})</span>
                    </div>
                    <h4 className="font-bold text-sm leading-tight text-white line-clamp-1">
                      {tour.hotelName}
                    </h4>
                    <p className="text-[11px] text-gray-300 line-clamp-1">{tour.location}</p>
                  </div>
                </div>

                {/* Price & Action Row */}
                <div className="p-4 flex items-center justify-between border-t border-gray-100 bg-white">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg font-black text-gray-900">₹{tour.price}</span>
                      <span className="text-xs text-gray-400 line-through">₹{tour.mrp}</span>
                    </div>
                    <span className="text-[10px] text-gray-500 font-medium">+ taxes / night</span>
                  </div>

                  <Link
                    to={`/product/${tour.productId}`}
                    onClick={(e) => e.stopPropagation()}
                    className="px-4 py-2 bg-gray-900 hover:bg-[#e01933] text-white text-xs font-bold rounded-xl transition"
                  >
                    View Stay
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full Screen HD Video Player Modal */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-black rounded-3xl overflow-hidden shadow-2xl border border-gray-800">
            {/* Modal Header */}
            <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
              <div className="text-white">
                <span className="text-[10px] font-bold bg-[#e01933] px-2 py-0.5 rounded-full">
                  Virtual Tour
                </span>
                <h4 className="font-bold text-sm sm:text-base mt-1 drop-shadow-md">
                  {activeVideoModal.hotelName}
                </h4>
              </div>

              <button
                type="button"
                onClick={() => setActiveVideoModal(null)}
                className="w-9 h-9 rounded-full bg-white/20 hover:bg-white text-white hover:text-black flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player */}
            <video
              autoPlay
              controls
              playsInline
              className="w-full aspect-video object-cover"
            >
              <source src={activeVideoModal.videoUrl} type="video/mp4" />
            </video>

            {/* Modal Footer info */}
            <div className="p-4 bg-gray-950 text-white flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400">{activeVideoModal.location}</p>
                <p className="text-sm font-bold text-emerald-400">
                  ₹{activeVideoModal.price} / night
                </p>
              </div>

              <Link
                to={`/product/${activeVideoModal.productId}`}
                onClick={() => setActiveVideoModal(null)}
                className="px-5 py-2.5 bg-[#e01933] hover:bg-[#c8142b] text-white text-xs font-bold rounded-xl transition"
              >
                Book This Room
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
