import React, { useState, useMemo, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { 
  HotelHeroVideoBanner,
  HotelFloatingSearchBar,
  HotelAmenitiesSection,
  HotelDiscoverIndiaGrid,
  HotelVideoToursSection,
  HotelWizardMembership,
  HotelNewsSection,
  HotelFaqSection
} from '../hotels';
import { CheckCircle2, X, Search } from 'lucide-react';

export const HotelServicesLayout = ({ products = [], shop, categoryName }) => {
  const { addToCart } = useCart();

  // 1. Search & Stay State
  const [destination, setDestination] = useState('');
  const [isFloatingSearchOpen, setIsFloatingSearchOpen] = useState(true);
  
  const [checkInDate, setCheckInDate] = useState(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  });

  const [checkOutDate, setCheckOutDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3); // 2 nights default
    return d.toISOString().split('T')[0];
  });

  // Rooms & Guests: Room 1 is always constant. User can add Room 2, Room 3, etc.
  const [rooms, setRooms] = useState([
    { id: 1, guests: 1 }
  ]);

  const [bookingNotice, setBookingNotice] = useState(null);
  const [showFloatingBar, setShowFloatingBar] = useState(false);

  // Monitor scroll position to make the search bar float at the top across all sections below hero
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowFloatingBar(true);
      } else {
        setShowFloatingBar(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update how many persons are in a specific room
  const handleUpdateRoomGuests = (index, newGuests) => {
    setRooms(prev => {
      const next = [...prev];
      next[index] = { ...next[index], guests: newGuests };
      return next;
    });
  };

  // Add room: appends Room 2, Room 3, etc. with 1 person
  const handleAddRoom = () => {
    if (rooms.length >= 6) return;
    setRooms(prev => [...prev, { id: Date.now(), guests: 1 }]);
  };

  // Delete room: removes latest room. Room 1 is constant and can never be deleted
  const handleDeleteRoom = () => {
    if (rooms.length <= 1) return;
    setRooms(prev => prev.slice(0, prev.length - 1));
  };

  // Calculate Nights (Minimum 1 Night)
  const calculateNights = () => {
    const inDate = new Date(checkInDate);
    const outDate = new Date(checkOutDate);
    const diffTime = outDate - inDate;
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const totalNights = calculateNights();
  const roomsCount = rooms.length;
  const adultsCount = rooms.reduce((acc, r) => acc + r.guests, 0);

  // Filter Stays: Filter hotel products by destination if specified
  const filteredStays = useMemo(() => {
    // Only keep hotel stays (exclude plumbing/electrician services from stay listings)
    const hotelProds = products.filter(p => 
      !p.name.toLowerCase().includes('plumbing') &&
      !p.name.toLowerCase().includes('cleaning')
    );

    const baseList = hotelProds.length > 0 ? hotelProds : products;

    if (!destination.trim()) {
      return baseList;
    }

    const q = destination.toLowerCase().trim();
    const matched = baseList.filter(p => {
      const name = (p.name || '').toLowerCase();
      const desc = (p.description || '').toLowerCase();
      const city = (p.city || '').toLowerCase();
      const district = (p.district || '').toLowerCase();
      const location = (p.location || '').toLowerCase();
      const badge = (p.badge || '').toLowerCase();
      const tags = Array.isArray(p.tags) ? p.tags.map(t => t.toLowerCase()) : [];

      return (
        name.includes(q) ||
        desc.includes(q) ||
        city.includes(q) ||
        district.includes(q) ||
        location.includes(q) ||
        badge.includes(q) ||
        tags.some(t => t.includes(q))
      );
    });

    return matched;
  }, [products, destination]);

  // Handle Search Execution
  const handlePerformSearch = () => {
    const el = document.getElementById('hotel-stays-results');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handle Destination Pick from Discover Odisha Grid
  const handleSelectCity = (cityName) => {
    setDestination(cityName);
    setTimeout(() => {
      handlePerformSearch();
    }, 50);
  };

  // Handle Room Booking into Cart
  const handleBookRoom = (product) => {
    const grandTotal = product.price * totalNights * roomsCount;

    const bookingPayload = {
      ...product,
      price: grandTotal,
      pricePerNight: product.price,
      bookingDetails: {
        destination: destination || 'Selected City',
        checkInDate,
        checkOutDate,
        totalNights,
        roomsCount,
        adultsCount,
        pricePerNight: product.price,
        totalStayPrice: grandTotal
      }
    };

    addToCart(bookingPayload, shop);

    setBookingNotice({
      title: product.name,
      nights: totalNights,
      rooms: roomsCount,
      guests: adultsCount,
      total: grandTotal
    });

    setTimeout(() => {
      setBookingNotice(null);
    }, 5000);
  };

  return (
    <div className="w-full bg-white space-y-2 pb-16 relative">
      {/* 0. Floating Sticky Search Bar / Search Icon trigger */}
      {showFloatingBar && (
        <>
          {isFloatingSearchOpen ? (
            <div className="fixed top-2.5 sm:top-3.5 left-0 right-0 z-50 pointer-events-none flex justify-center px-2 sm:px-4 animate-in slide-in-from-top-2 duration-200">
              <div className="pointer-events-auto w-full max-w-5xl">
                <HotelFloatingSearchBar
                  isFloating={true}
                  onClose={() => setIsFloatingSearchOpen(false)}
                  destination={destination}
                  setDestination={setDestination}
                  checkInDate={checkInDate}
                  setCheckInDate={setCheckInDate}
                  checkOutDate={checkOutDate}
                  setCheckOutDate={setCheckOutDate}
                  rooms={rooms}
                  onUpdateRoomGuests={handleUpdateRoomGuests}
                  onAddRoom={handleAddRoom}
                  onDeleteRoom={handleDeleteRoom}
                  onPerformSearch={handlePerformSearch}
                />
              </div>
            </div>
          ) : (
            <div className="fixed top-3 sm:top-4 right-4 sm:right-6 z-50 animate-in fade-in zoom-in-95 duration-200">
              <button
                type="button"
                onClick={() => setIsFloatingSearchOpen(true)}
                className="bg-[#e01933] hover:bg-[#c8142b] text-white p-3 sm:px-4 sm:py-2.5 rounded-full shadow-2xl hover:shadow-red-500/40 flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
                title="Open Hotel Search"
              >
                <Search className="w-5 h-5 sm:w-4 sm:h-4 stroke-[2.5]" />
                <span className="hidden sm:inline text-xs font-bold">Search Stays</span>
              </button>
            </div>
          )}
        </>
      )}

      {/* Toast Notification for Instant Booking */}
      {bookingNotice && (
        <div className="fixed top-24 right-4 sm:right-6 z-50 bg-gray-900 text-white rounded-2xl p-4 shadow-2xl border border-gray-700 max-w-sm animate-in slide-in-from-top-4 duration-300">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>Room Reserved & Added to Cart!</span>
            </div>
            <button
              onClick={() => setBookingNotice(null)}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="font-bold text-sm mt-1 text-white line-clamp-1">{bookingNotice.title}</p>
          <p className="text-[11px] text-gray-300 mt-0.5">
            {bookingNotice.nights} Night{bookingNotice.nights > 1 ? 's' : ''} • {bookingNotice.rooms} Room{bookingNotice.rooms > 1 ? 's' : ''} • {bookingNotice.guests} Guest{bookingNotice.guests > 1 ? 's' : ''}
          </p>
          <div className="mt-2 pt-2 border-t border-gray-800 flex items-center justify-between text-xs">
            <span className="text-gray-400">Total Stay:</span>
            <span className="font-black text-amber-400">₹{bookingNotice.total}</span>
          </div>
        </div>
      )}

      {/* 1. Hero Section with Background Video, Search Bar & Trust Ribbon (Image 1) */}
      <HotelHeroVideoBanner
        destination={destination}
        setDestination={setDestination}
        checkInDate={checkInDate}
        setCheckInDate={setCheckInDate}
        checkOutDate={checkOutDate}
        setCheckOutDate={setCheckOutDate}
        rooms={rooms}
        onUpdateRoomGuests={handleUpdateRoomGuests}
        onAddRoom={handleAddRoom}
        onDeleteRoom={handleDeleteRoom}
        onPerformSearch={handlePerformSearch}
      />

      {/* 2. Burlamart-Serviced Hotels & 5 3D Amenity Cards (Image 2) */}
      <HotelAmenitiesSection />

      {/* 3. Discover India with Burlamart - Tabs & Bento Grid (Images 4 & 5) */}
      <HotelDiscoverIndiaGrid onSelectCity={handleSelectCity} />

      {/* 4. Video Tours & Verified Room Stays Section (Image 6 & Room Listings) */}
      <HotelVideoToursSection
        destination={destination}
        setDestination={setDestination}
        filteredStays={filteredStays}
        totalNights={totalNights}
        roomsCount={roomsCount}
        adultsCount={adultsCount}
        onBookRoom={handleBookRoom}
      />

      {/* 5. Join Wizard Membership Banner (Exact user text & link) */}
      <HotelWizardMembership />

      {/* 6. Travel News & Guides Section */}
      <HotelNewsSection />

      {/* 7. FAQ Accordion Section */}
      <HotelFaqSection />
    </div>
  );
};
