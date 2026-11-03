import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import burlaLogo from '../../assets/burla.png';
import { useCart } from '../../context/CartContext';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { 
  Search, 
  MapPin, 
  ShoppingCart, 
  Mic, 
  Globe, 
  Bell, 
  Coins, 
  Sparkles,
  User,
  Layers,
  ChevronDown,
  LogIn,
  Store,
  Bike,
  ShieldCheck
} from 'lucide-react';
import { VoiceOrderModal } from '../common/VoiceOrderModal';

export const CustomerHeader = () => {
  const { cartItems, address } = useCart();
  const { sharedWalletBalance, language, setLanguage, categories } = useApp();
  const { currentRole, currentUser, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const navigate = useNavigate();

  // Rotating placeholder like Blinkit
  const searchPlaceholders = [
    'Search "paneer"',
    'Search "milk"',
    'Search "bread"',
    'Search "atta"',
    'Search "chips"',
    'Search "chocolate"',
    'Search "curd"',
    'Search "butter"'
  ];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % searchPlaceholders.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    const query = searchQuery.trim() || searchPlaceholders[placeholderIndex].replace(/Search |"/g, '');
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const languages = ['English', 'हिन्दी (Hindi)', 'বাংলা (Bengali)', 'తెలుగు (Telugu)'];

  const getRoleBadge = () => {
    if (currentRole === 'admin') return { label: 'Admin', bg: 'bg-purple-100 text-purple-800' };
    if (currentRole === 'vendor') return { label: 'Vendor', bg: 'bg-blue-100 text-blue-800' };
    if (currentRole === 'rider') return { label: 'Rider', bg: 'bg-amber-100 text-amber-800' };
    return { label: 'Customer', bg: 'bg-emerald-100 text-emerald-800' };
  };

  const roleBadge = getRoleBadge();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm w-full max-w-full overflow-hidden">
      {/* Top micro bar for announcements & pass - strict overflow containment */}
      <div className="bg-[#1B4332] text-white text-[11px] px-3 sm:px-4 py-1.5 flex items-center justify-between gap-2 overflow-hidden w-full">
        <div className="flex items-center gap-2 truncate min-w-0">
          <span className="bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-bold text-[10px] flex-shrink-0">
            PASS
          </span>
          <span className="truncate">Free delivery & 2x rewards on orders ₹199+</span>
        </div>
        
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link 
            to="/login" 
            className="flex items-center gap-1 text-[11px] font-bold text-emerald-200 hover:text-white transition"
            title="Switch App / Role with Fake Phone & OTP"
          >
            <span className="hidden xs:inline">App:</span>
            <span className="bg-white/15 px-1.5 py-0.5 rounded text-white capitalize">{currentRole}</span>
            <span className="hidden sm:inline hover:underline">• Switch</span>
          </Link>
          <div className="hidden sm:flex items-center gap-1 text-emerald-300 font-bold">
            <Coins className="w-3 h-3 text-amber-400" />
            <span>₹{sharedWalletBalance}</span>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 w-full">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand Logo & Delivery Estimate */}
          <div className="flex items-center gap-2 sm:gap-4 min-w-0">
            <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
              <img
                src={burlaLogo}
                alt="Burlamart Logo"
                className="h-8 sm:h-9 w-auto max-w-[42px] object-contain drop-shadow-sm group-hover:scale-105 transition-transform"
              />
              <div className="min-w-0">
                <span className="text-base sm:text-xl font-extrabold text-[#1B4332] tracking-tight block leading-none">
                  Burlamart
                </span>
                <span className="hidden sm:block text-[10px] text-gray-500 font-medium tracking-wide">
                  Commerce & Local Services
                </span>
              </div>
            </Link>

            {/* Location Delivery Selector (Desktop) */}
            <div className="hidden md:flex items-center gap-2 text-xs border-l border-gray-200 pl-3 py-1 max-w-xs">
              <MapPin className="w-3.5 h-3.5 text-emerald-700 flex-shrink-0" />
              <div className="truncate">
                <div className="font-bold text-gray-900 flex items-center gap-1 text-[11px]">
                  Delivering in <span className="text-emerald-700 font-extrabold">12 Mins</span>
                </div>
                <div className="text-gray-500 truncate text-[11px]" title={address}>
                  {address}
                </div>
              </div>
            </div>
          </div>

          {/* Global Search Bar (Desktop / Tablet) */}
          <form onSubmit={handleSearchSubmit} className="hidden sm:flex flex-1 max-w-lg relative min-w-0 mx-2">
            <div className="relative flex items-center w-full">
              <button
                type="submit"
                className="p-1.5 text-gray-500 hover:text-emerald-700 absolute left-2.5 z-10 transition"
                title="Search"
              >
                <Search className="w-4 h-4" />
              </button>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchPlaceholders[placeholderIndex]}
                className="w-full bg-gray-100/90 focus:bg-white text-xs sm:text-sm pl-9 pr-20 py-2 rounded-full border border-gray-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none transition placeholder-gray-400 font-medium"
              />
              <div className="absolute right-2 flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setIsVoiceOpen(true)}
                  className="p-1 rounded-full text-emerald-800 hover:bg-emerald-50 transition"
                  title="Voice Search"
                >
                  <Mic className="w-3.5 h-3.5" />
                </button>
                <button
                  type="submit"
                  className="px-2.5 py-1 bg-[#1B4332] hover:bg-[#2D6A4F] text-white rounded-full text-xs font-bold transition shadow-xs"
                >
                  Search
                </button>
              </div>
            </div>
          </form>

          {/* Right Action Icons: Login / Profile, Language, Cart */}
          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
            {/* Login / Auth Button */}
            <Link
              to="/login"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-bold transition"
              title="Mobile OTP Login / Switch Portal"
            >
              <LogIn className="w-3.5 h-3.5 text-[#1B4332]" />
              <span className="hidden sm:inline">Login</span>
            </Link>

            {/* Account link */}
            <Link
              to="/account"
              className="flex items-center gap-1 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl text-gray-700 hover:bg-gray-100 text-xs font-bold transition"
              title="Account & My Combos"
            >
              <User className="w-4 h-4 text-[#1B4332]" />
              <span className="hidden lg:inline">Account</span>
            </Link>

            {/* Cart button */}
            <Link
              to="/cart"
              className="flex items-center gap-1.5 bg-[#1B4332] hover:bg-[#2D6A4F] text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-bold text-xs sm:text-sm shadow-md transition relative flex-shrink-0"
            >
              <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-300" />
              <span className="hidden sm:inline">Cart</span>
              {totalCartCount > 0 && (
                <span className="bg-emerald-400 text-gray-900 font-extrabold text-[10px] sm:text-[11px] px-1.5 py-0.2 rounded-full">
                  {totalCartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Search Bar Row (renders on mobile only, 100% width containment) */}
        <form onSubmit={handleSearchSubmit} className="mt-2 sm:hidden relative w-full">
          <div className="relative flex items-center w-full">
            <button
              type="submit"
              className="p-1.5 text-gray-500 hover:text-emerald-700 absolute left-2.5 z-10 transition"
              title="Search"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchPlaceholders[placeholderIndex]}
              className="w-full bg-gray-100/90 text-xs pl-8 pr-16 py-2 rounded-full border border-gray-200 focus:bg-white focus:border-emerald-600 outline-none placeholder-gray-400 font-medium"
            />
            <div className="absolute right-2 flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsVoiceOpen(true)}
                className="p-1 text-emerald-800"
                title="Voice Search"
              >
                <Mic className="w-3.5 h-3.5" />
              </button>
              <button
                type="submit"
                className="px-2 py-0.5 bg-[#1B4332] text-white rounded-full text-[11px] font-bold shadow-2xs"
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Category Navigation Ribbon - ONE SINGLE ROW with smooth horizontal scrolling */}
      <nav className="bg-gray-50/90 border-t border-gray-100 py-1.5 px-3 sm:px-4 w-full overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto scrollbar-none whitespace-nowrap text-xs font-semibold py-0.5">
          <Link
            to="/"
            className="px-3 py-1 rounded-full bg-white border border-gray-200 text-gray-800 hover:border-emerald-500 hover:text-emerald-800 transition shadow-2xs flex-shrink-0"
          >
            All Categories
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/category/${cat.id}`}
              className="px-3 py-1 rounded-full bg-white hover:bg-emerald-50 border border-gray-200/90 text-gray-700 hover:text-[#1B4332] transition flex items-center gap-1.5 shadow-2xs flex-shrink-0"
            >
              <span>{cat.name}</span>
              {cat.badge && (
                <span className="text-[9px] font-extrabold px-1.5 py-0.2 bg-emerald-100 text-emerald-800 rounded-full">
                  {cat.badge}
                </span>
              )}
            </Link>
          ))}
          <Link
            to="/extensions"
            className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 font-bold border border-emerald-200 hover:bg-emerald-100 transition flex items-center gap-1 shadow-2xs flex-shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>More Services</span>
          </Link>
        </div>
      </nav>

      <VoiceOrderModal isOpen={isVoiceOpen} onClose={() => setIsVoiceOpen(false)} />
    </header>
  );
};

