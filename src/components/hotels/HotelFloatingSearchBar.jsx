import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Navigation, 
  Calendar, 
  Users, 
  ChevronDown, 
  ChevronUp,
  Sparkles,
  X
} from 'lucide-react';
import { HotelGuestRoomModal } from './HotelGuestRoomModal';
import { ALL_ODISHA_CITIES } from './hotelData';

export const HotelFloatingSearchBar = ({
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
  onPerformSearch,
  isFloating = false,
  onClose = null
}) => {
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);
  const [showRoomGuestsModal, setShowRoomGuestsModal] = useState(false);
  const [showDatePickerModal, setShowDatePickerModal] = useState(false);

  const searchContainerRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setShowCitySuggestions(false);
        setShowRoomGuestsModal(false);
        setShowDatePickerModal(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalGuests = rooms.reduce((acc, r) => acc + r.guests, 0);

  // Odisha cities for auto-suggestions with Sambalpur, Burla & all districts
  const filteredCities = destination.trim()
    ? ALL_ODISHA_CITIES.filter(c => 
        c.name.toLowerCase().includes(destination.toLowerCase()) || 
        c.district.toLowerCase().includes(destination.toLowerCase()) ||
        c.tag.toLowerCase().includes(destination.toLowerCase())
      )
    : ALL_ODISHA_CITIES.slice(0, 10);

  // Format date readable: "Tue, 3 Nov"
  const formatDateDisplay = (dateStr) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
    } catch {
      return dateStr;
    }
  };

  const handleNearbyClick = () => {
    setDestination('Sambalpur');
    setShowCitySuggestions(false);
    setTimeout(() => {
      onPerformSearch();
    }, 50);
  };

  const handleSelectSuggestion = (cityName) => {
    setDestination(cityName);
    setShowCitySuggestions(false);
    setTimeout(() => {
      onPerformSearch();
    }, 50);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setShowCitySuggestions(false);
      onPerformSearch();
    }
  };

  const handleExecuteSearch = () => {
    setShowCitySuggestions(false);
    setShowDatePickerModal(false);
    setShowRoomGuestsModal(false);
    onPerformSearch();
  };

  return (
    <div 
      ref={searchContainerRef}
      className="relative w-full max-w-5xl mx-auto bg-white rounded-3xl sm:rounded-full p-2 sm:p-2.5 shadow-2xl border border-gray-200/90 text-gray-800 transition-all duration-200"
    >
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
        {/* 1. Destination Input */}
        <div className="relative flex-1 px-3 sm:px-4 py-2 sm:py-2 text-left">
          <div className="flex items-center justify-between">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Where to? (Odisha Cities & Towns)
            </label>
            {/* Quick Sambalpur chip on mobile */}
            <button
              type="button"
              onClick={handleNearbyClick}
              className="sm:hidden text-[10px] font-bold text-[#e01933] flex items-center gap-1 cursor-pointer"
            >
              <Navigation className="w-2.5 h-2.5 rotate-45" /> Sambalpur HQ
            </button>
          </div>

          <div className="flex items-center gap-2 mt-0.5">
            <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                setShowCitySuggestions(true);
              }}
              onClick={() => setShowCitySuggestions(true)}
              onFocus={() => setShowCitySuggestions(true)}
              onKeyDown={handleInputKeyDown}
              placeholder="Search Sambalpur, Burla, Puri, Bhubaneswar..."
              className="w-full bg-transparent text-sm font-semibold text-gray-900 placeholder:text-gray-400 focus:outline-none"
            />
            {destination && (
              <button
                type="button"
                onClick={() => {
                  setDestination('');
                  setShowCitySuggestions(false);
                  setTimeout(() => onPerformSearch(), 50);
                }}
                className="text-gray-400 hover:text-gray-700 p-0.5 cursor-pointer"
                title="Clear destination"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* City Suggestions Dropdown - ONLY appears after clicking in the search input */}
          {showCitySuggestions && (
            <div className="absolute top-full left-0 mt-3 w-full sm:w-84 bg-white rounded-2xl shadow-2xl border border-gray-200 p-2 z-50 text-gray-800 max-h-80 overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center justify-between border-b border-gray-100 pb-1.5 mb-1">
                <span>Odisha Destinations ({filteredCities.length})</span>
                <span className="text-[10px] bg-red-50 text-[#e01933] font-black px-2 py-0.5 rounded-full">
                  Mainly Sambalpur
                </span>
              </div>
              {filteredCities.map((city) => (
                <button
                  key={city.id}
                  type="button"
                  onClick={() => handleSelectSuggestion(city.name)}
                  className="w-full px-3 py-2 text-left hover:bg-red-50/70 rounded-xl flex items-center justify-between text-xs transition group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-red-100/60 flex items-center justify-center flex-shrink-0 group-hover:bg-[#e01933] group-hover:text-white transition-colors">
                      <MapPin className="w-3.5 h-3.5 text-[#e01933] group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 group-hover:text-[#e01933] transition-colors">{city.name}</p>
                      <p className="text-[10px] text-gray-500">{city.tag || `${city.district} District, Odisha`}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <span className="text-[10px] bg-gray-100 text-gray-700 font-bold px-2 py-0.5 rounded-full block">
                      {city.staysCount}+ stays
                    </span>
                    {city.badge && (
                      <span className="text-[9px] text-[#e01933] font-bold mt-0.5 block">
                        {city.badge}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 2. Nearby Button - Sets to Sambalpur / Local */}
        <div className="hidden sm:flex px-3 py-2 items-center justify-center flex-shrink-0">
          <button
            type="button"
            onClick={handleNearbyClick}
            className="flex items-center gap-1.5 px-3 py-2 bg-gray-50 hover:bg-red-50 border border-gray-200 hover:border-red-200 rounded-full text-xs font-bold text-gray-700 hover:text-[#e01933] transition cursor-pointer"
            title="Set to Sambalpur HQ"
          >
            <Navigation className="w-3.5 h-3.5 text-[#e01933] rotate-45" />
            <span>Nearby (Sambalpur)</span>
          </button>
        </div>

        {/* 3 & 4: Mobile 2-column or Desktop inline for Dates and Rooms */}
        <div className="grid grid-cols-2 sm:contents divide-x divide-gray-200 sm:divide-x-0">
          {/* 3. Date Range Selector */}
          <div className="relative px-3 sm:px-4 py-2 sm:py-2 text-left flex-shrink-0">
            <button
              type="button"
              onClick={() => {
                setShowDatePickerModal(!showDatePickerModal);
                setShowRoomGuestsModal(false);
                setShowCitySuggestions(false);
              }}
              className="w-full text-left cursor-pointer"
            >
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 cursor-pointer">
                Dates
              </label>
              <div className="flex items-center gap-2 mt-0.5">
                <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
                  {formatDateDisplay(checkInDate)} - {formatDateDisplay(checkOutDate)}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 hidden sm:block" />
              </div>
            </button>

            {/* Date Inputs Popover */}
            {showDatePickerModal && (
              <div className="absolute top-full left-0 sm:left-1/2 sm:-translate-x-1/2 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 z-50 text-gray-800 animate-in fade-in zoom-in-95 duration-150">
                <h4 className="font-bold text-gray-900 text-xs mb-3 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#e01933]" />
                  Select Stay Dates
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">Check-in Date</label>
                    <input
                      type="date"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-bold text-gray-800 focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-600 mb-1">Check-out Date</label>
                    <input
                      type="date"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-3 py-1.5 text-xs font-bold text-gray-800 focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowDatePickerModal(false)}
                    className="w-full mt-2 py-2 bg-[#e01933] text-white rounded-xl text-xs font-bold hover:bg-[#c8142b] transition cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 4. Room & Guests Dropdown */}
          <div className="relative px-3 sm:px-4 py-2 text-left flex-shrink-0">
            <button
              type="button"
              onClick={() => {
                setShowRoomGuestsModal(!showRoomGuestsModal);
                setShowDatePickerModal(false);
                setShowCitySuggestions(false);
              }}
              className={`w-full text-left transition-all cursor-pointer ${
                showRoomGuestsModal
                  ? 'border border-gray-900 rounded-2xl px-2 py-1 bg-gray-50/50'
                  : 'px-1 py-1'
              }`}
            >
              <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 cursor-pointer">
                Rooms & Guests
              </label>
              <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5">
                <Users className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-gray-900 truncate">
                  {rooms.length}R, {totalGuests}G
                </span>
                {showRoomGuestsModal ? (
                  <ChevronUp className="w-3.5 h-3.5 text-gray-900 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                )}
              </div>
            </button>

            {/* Room & Guests Popover */}
            {showRoomGuestsModal && (
              <HotelGuestRoomModal
                rooms={rooms}
                onUpdateRoomGuests={onUpdateRoomGuests}
                onAddRoom={onAddRoom}
                onDeleteRoom={onDeleteRoom}
              />
            )}
          </div>
        </div>

        {/* 5. Search Button & Optional Close Button */}
        <div className="p-1.5 sm:p-2 flex items-center gap-1.5 flex-shrink-0">
          <button
            type="button"
            onClick={handleExecuteSearch}
            className="flex-1 sm:flex-initial px-6 sm:px-8 py-3 sm:py-3.5 bg-[#e01933] hover:bg-[#c8142b] text-white font-bold text-xs sm:text-base rounded-2xl sm:rounded-full shadow-lg hover:shadow-red-500/25 transition flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <Search className="w-4 h-4 sm:hidden" />
            <span>Search Stays</span>
          </button>

          {/* Close option for floating mode */}
          {isFloating && onClose && (
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 flex items-center justify-center transition-colors flex-shrink-0 cursor-pointer"
              title="Close floating search bar"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
