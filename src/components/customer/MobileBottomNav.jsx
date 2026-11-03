import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  LayoutGrid, 
  Hotel, 
  ShoppingBag, 
  User, 
  X, 
  ChevronRight, 
  Sparkles, 
  Flame, 
  Tag, 
  UtensilsCrossed, 
  Smartphone,
  Apple
} from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const MobileBottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  // Hide bottom bar on checkout and portal routes
  if (
    location.pathname.startsWith('/checkout') ||
    location.pathname.startsWith('/admin') ||
    location.pathname.startsWith('/vendor') ||
    location.pathname.startsWith('/rider') ||
    location.pathname.startsWith('/login')
  ) {
    return null;
  }

  const isHomeActive = location.pathname === '/';
  const isHotelsActive = location.pathname === '/category/hotels-services';
  const isCartActive = location.pathname === '/cart';
  const isAccountActive = location.pathname === '/account';
  const isCategoriesActive = isCategoriesOpen || (location.pathname.startsWith('/category') && !isHotelsActive);

  const handleCategoryPick = (path) => {
    setIsCategoriesOpen(false);
    navigate(path);
  };

  const CATEGORY_ITEMS = [
    {
      id: 'groceries',
      name: 'Grocery & Fresh Staples',
      badge: '10 Mins Delivery',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      icon: Apple,
      iconBg: 'bg-emerald-50 text-emerald-700',
      desc: 'Fresh fruits, vegetables, dairy, atta, rice & spices',
      path: '/category/groceries'
    },
    {
      id: 'packaged-food',
      name: 'Packaged Food & Snacks',
      badge: 'Swiggy Instamart Style',
      badgeColor: 'bg-amber-100 text-amber-900',
      icon: UtensilsCrossed,
      iconBg: 'bg-amber-50 text-amber-700',
      desc: 'Chips, biscuits, namkeen, instant noodles & chocolates',
      path: '/category/packaged-food'
    },
    {
      id: 'hotels-services',
      name: 'Hotels & Serviced Stays',
      badge: 'OYO Verified • Odisha',
      badgeColor: 'bg-red-100 text-[#e01933]',
      icon: Hotel,
      iconBg: 'bg-red-50 text-[#e01933]',
      desc: 'Top verified stays in Sambalpur, Burla & across Odisha',
      path: '/category/hotels-services'
    },
    {
      id: 'electronics',
      name: 'Electronics & Mobiles',
      badge: 'Festival Deals & EMI',
      badgeColor: 'bg-blue-100 text-blue-800',
      icon: Smartphone,
      iconBg: 'bg-blue-50 text-blue-700',
      desc: 'Smartphones, audio, smartwatches & home appliances',
      path: '/category/electronics'
    }
  ];

  return (
    <>
      {/* ──────────────────────────────────────────────────────────
          1. SLIDE-UP CATEGORIES SHEET ON MOBILE
         ────────────────────────────────────────────────────────── */}
      {isCategoriesOpen && (
        <div className="fixed inset-0 z-50 sm:hidden">
          {/* Backdrop */}
          <div 
            onClick={() => setIsCategoriesOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
          />

          {/* Drawer Panel */}
          <div className="absolute bottom-0 inset-x-0 bg-white rounded-t-3xl shadow-2xl p-5 border-t border-gray-200 animate-in slide-in-from-bottom duration-300 max-h-[85vh] overflow-y-auto">
            {/* Grab Handle */}
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4" />

            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <div>
                <h3 className="text-base font-black text-gray-900 flex items-center gap-1.5">
                  <LayoutGrid className="w-4 h-4 text-[#1B4332]" />
                  <span>Browse All Categories</span>
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Pick a store to explore instant doorstep delivery & stays
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsCategoriesOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-900 flex items-center justify-center transition"
                title="Close categories"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Category Options List */}
            <div className="space-y-3 pb-4">
              {CATEGORY_ITEMS.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleCategoryPick(item.path)}
                    className="p-3.5 rounded-2xl border border-gray-200 hover:border-[#1B4332] bg-[#FAF8F5] hover:bg-white transition-all shadow-xs flex items-center justify-between cursor-pointer group active:scale-98"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-xl ${item.iconBg} flex items-center justify-center flex-shrink-0 shadow-xs group-hover:scale-105 transition-transform`}>
                        <IconComponent className="w-5 h-5 stroke-[2.2]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#1B4332] transition-colors">
                            {item.name}
                          </h4>
                        </div>
                        <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────
          2. STICKY PWA BOTTOM NAVIGATION BAR (Mobile Only)
         ────────────────────────────────────────────────────────── */}
      <nav 
        aria-label="Mobile Bottom Navigation"
        className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-lg border-t border-gray-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] h-16 flex items-center justify-around px-2 pb-safe"
      >
        {/* Tab 1: Home */}
        <Link
          to="/"
          onClick={() => setIsCategoriesOpen(false)}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-all relative ${
            isHomeActive ? 'text-[#1B4332]' : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          <div className="relative">
            <Home className={`w-5 h-5 transition-transform ${isHomeActive ? 'scale-110 stroke-[2.5]' : 'stroke-[1.8]'}`} />
            {isHomeActive && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#1B4332]" />
            )}
          </div>
          <span className={`text-[10px] mt-1 tracking-tight ${isHomeActive ? 'font-extrabold text-[#1B4332]' : 'font-medium'}`}>
            Home
          </span>
        </Link>

        {/* Tab 2: Categories */}
        <button
          type="button"
          onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-all relative cursor-pointer ${
            isCategoriesActive ? 'text-[#1B4332]' : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          <div className="relative">
            <LayoutGrid className={`w-5 h-5 transition-transform ${isCategoriesActive ? 'scale-110 stroke-[2.5]' : 'stroke-[1.8]'}`} />
            {isCategoriesActive && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#1B4332]" />
            )}
          </div>
          <span className={`text-[10px] mt-1 tracking-tight ${isCategoriesActive ? 'font-extrabold text-[#1B4332]' : 'font-medium'}`}>
            Categories
          </span>
        </button>

        {/* Tab 3: Hotels */}
        <Link
          to="/category/hotels-services"
          onClick={() => setIsCategoriesOpen(false)}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-all relative ${
            isHotelsActive ? 'text-[#e01933]' : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          <div className="relative">
            <Hotel className={`w-5 h-5 transition-transform ${isHotelsActive ? 'scale-110 stroke-[2.5]' : 'stroke-[1.8]'}`} />
            {isHotelsActive && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#e01933]" />
            )}
          </div>
          <span className={`text-[10px] mt-1 tracking-tight ${isHotelsActive ? 'font-extrabold text-[#e01933]' : 'font-medium'}`}>
            Hotels
          </span>
        </Link>

        {/* Tab 4: Cart (with Badge) */}
        <Link
          to="/cart"
          onClick={() => setIsCategoriesOpen(false)}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-all relative ${
            isCartActive ? 'text-[#1B4332]' : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          <div className="relative">
            <ShoppingBag className={`w-5 h-5 transition-transform ${isCartActive ? 'scale-110 stroke-[2.5]' : 'stroke-[1.8]'}`} />
            {totalCartCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 min-w-[18px] h-[18px] bg-[#e01933] text-white text-[10px] font-black rounded-full flex items-center justify-center px-1 shadow-xs animate-in zoom-in">
                {totalCartCount > 99 ? '99+' : totalCartCount}
              </span>
            )}
            {isCartActive && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#1B4332]" />
            )}
          </div>
          <span className={`text-[10px] mt-1 tracking-tight ${isCartActive ? 'font-extrabold text-[#1B4332]' : 'font-medium'}`}>
            Cart
          </span>
        </Link>

        {/* Tab 5: Account */}
        <Link
          to="/account"
          onClick={() => setIsCategoriesOpen(false)}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-all relative ${
            isAccountActive ? 'text-[#1B4332]' : 'text-gray-500 hover:text-gray-800'
          }`}
        >
          <div className="relative">
            <User className={`w-5 h-5 transition-transform ${isAccountActive ? 'scale-110 stroke-[2.5]' : 'stroke-[1.8]'}`} />
            {isAccountActive && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#1B4332]" />
            )}
          </div>
          <span className={`text-[10px] mt-1 tracking-tight ${isAccountActive ? 'font-extrabold text-[#1B4332]' : 'font-medium'}`}>
            Account
          </span>
        </Link>
      </nav>
    </>
  );
};

