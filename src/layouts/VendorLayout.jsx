import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { playOrderNotificationChime } from '../utils/notificationSound';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Store, 
  Tag, 
  BarChart3, 
  Coins, 
  UserCircle, 
  Wrench,
  Bell,
  ArrowLeft,
  ExternalLink,
  Users,
  Menu,
  X
} from 'lucide-react';

export const VendorLayout = () => {
  const location = useLocation();
  const { vendorCoinBalance } = useApp();
  const { currentUser, switchVendorShop } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shops, setShops] = useState([]);
  const [newOrderAlert, setNewOrderAlert] = useState(null);
  const prevOrderCountRef = useRef(null);

  const activeShopId = currentUser?.activeVendorId || 'shop-1';
  const activeShop = shops.find(s => s.id === activeShopId) || shops[0];
  const displayShopName = activeShop?.name || currentUser?.shopName || 'Burlamart Fresh Supermart';
  const displayShopCategory = activeShop?.category || currentUser?.activeVendorCategory || 'grocery';

  useEffect(() => {
    api.shops.getAll().then(list => setShops(list || []));
  }, []);

  // Listen for live customer orders and play subtle sound alert
  useEffect(() => {
    const checkOrders = async () => {
      const shopOrders = await api.orders.getAll({ shopId: activeShopId });
      if (prevOrderCountRef.current !== null && shopOrders.length > prevOrderCountRef.current) {
        const latest = shopOrders[0];
        playOrderNotificationChime();
        setNewOrderAlert(`New order #${latest?.id} (₹${latest?.totalAmount}) received!`);
        setTimeout(() => setNewOrderAlert(null), 5000);
      }
      prevOrderCountRef.current = shopOrders.length;
    };
    checkOrders();
    const handleSync = () => checkOrders();
    window.addEventListener('storage', handleSync);
    window.addEventListener('burlamart_db_updated', handleSync);
    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('burlamart_db_updated', handleSync);
    };
  }, [activeShopId]);

  const navItems = [
    { path: '/vendor', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    { path: '/vendor/catalogue', label: 'Catalogue & Barcode', icon: Package },
    { path: '/vendor/orders', label: 'Orders & Dispatch', icon: ShoppingBag },
    { path: '/vendor/storefront', label: 'Storefront & Videos', icon: Store },
    { path: '/vendor/offers', label: 'Offers & BxGy', icon: Tag },
    { path: '/vendor/marketing', label: 'Marketing & GST', icon: BarChart3 },
    { path: '/vendor/account', label: 'Rent & Coin Wallet', icon: Coins },
    { path: '/vendor/extensions', label: 'Wholesale & POS', icon: Wrench },
  ];

  const isActive = (item) => {
    if (item.exact) return location.pathname === item.path;
    return location.pathname.startsWith(item.path);
  };

  return (
    <div className="min-h-screen bg-[#F4F6F4] flex flex-col md:flex-row w-full max-w-full overflow-x-hidden">
      {/* Mobile Top Header (Visible only on mobile) */}
      <div className="md:hidden bg-[#1B4332] text-white p-3.5 flex items-center justify-between shadow-md sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition text-emerald-200"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500 text-gray-950 font-extrabold flex items-center justify-center text-xs">
              V
            </div>
            <div>
              <span className="font-extrabold text-xs block leading-none">Vendor Portal</span>
              <span className="text-[10px] text-emerald-300 truncate max-w-[130px] block">{displayShopName}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Link
            to="/login"
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-[11px]"
          >
            <Users className="w-3 h-3" />
            <span>Role</span>
          </Link>
          <Link
            to="/vendor/account"
            className="flex items-center gap-1 bg-emerald-900/80 px-2 py-1 rounded-lg border border-emerald-700/60 font-extrabold text-amber-400 text-xs"
          >
            <Coins className="w-3.5 h-3.5" />
            <span>{vendorCoinBalance}</span>
          </Link>
        </div>
      </div>

      {/* Mobile Slide-down / Overlay Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1B4332] text-white p-4 space-y-3 border-b border-emerald-800 shadow-xl z-30">
          <nav className="space-y-1 text-xs font-semibold">
            {navItems.map(item => {
              const Icon = item.icon;
              const active = isActive(item);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition ${
                    active
                      ? 'bg-emerald-500 text-gray-950 font-bold shadow-sm'
                      : 'text-emerald-100 hover:bg-emerald-800/60 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <div className="pt-2 border-t border-emerald-800/80 flex items-center justify-between text-xs">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-emerald-300 hover:underline flex items-center gap-1"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Customer Storefront</span>
            </Link>
          </div>
        </div>
      )}

      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex w-64 bg-[#1B4332] text-white flex-shrink-0 flex-col justify-between p-4 shadow-xl">
        <div>
          {/* Brand & Partner identity */}
          <div className="flex items-center gap-3 px-2 py-3 mb-4 border-b border-emerald-800">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-gray-950 font-extrabold flex items-center justify-center text-lg">
              V
            </div>
            <div>
              <h2 className="font-extrabold text-sm text-white tracking-tight">Vendor Portal</h2>
              <span className="text-[11px] text-emerald-300 font-semibold block truncate max-w-[150px]">{displayShopName}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-xs font-semibold">
            {navItems.map(item => {
              const Icon = item.icon;
              const active = isActive(item);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition ${
                    active
                      ? 'bg-emerald-500 text-gray-950 font-bold shadow-sm'
                      : 'text-emerald-100 hover:bg-emerald-800/60 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom coin status & switch back */}
        <div className="pt-4 border-t border-emerald-800 space-y-3">
          <Link
            to="/vendor/account"
            className="flex items-center justify-between p-3 rounded-xl bg-emerald-900/80 border border-emerald-700/60 text-xs"
          >
            <div className="flex items-center gap-2">
              <Coins className="w-4 h-4 text-amber-400" />
              <span className="font-semibold text-emerald-100">Coin Balance:</span>
            </div>
            <span className="font-extrabold text-amber-400 text-sm">{vendorCoinBalance}</span>
          </Link>

          <Link
            to="/"
            className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Customer App</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3.5 sm:py-4 flex flex-wrap items-center justify-between gap-3 shadow-xs">
          <div>
            <h1 className="text-base sm:text-lg font-extrabold text-gray-900 leading-tight">
              {displayShopName}
            </h1>
            <p className="text-[11px] sm:text-xs text-gray-500 truncate max-w-xs sm:max-w-md">
              Logged in as: {currentUser?.name} (Owner) • ID: {activeShopId} • Category: {displayShopCategory}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            {newOrderAlert && (
              <div className="bg-amber-50 border border-amber-300 text-amber-900 px-3 py-1 rounded-full font-bold flex items-center gap-1.5 animate-pulse">
                <Bell className="w-3.5 h-3.5 text-amber-600" />
                <span>{newOrderAlert}</span>
              </div>
            )}

            {shops.length > 0 && (
              <select
                value={activeShopId}
                onChange={(e) => {
                  const chosen = shops.find(s => s.id === e.target.value);
                  if (chosen) switchVendorShop(chosen);
                }}
                className="px-2.5 py-1.5 rounded-xl border border-gray-200 bg-gray-50 text-xs font-bold text-gray-700 focus:outline-none focus:border-emerald-600 cursor-pointer max-w-[180px]"
                title="Switch Active Storefront"
              >
                {shops.map(s => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            )}

            <span className="hidden sm:flex bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              Store Open
            </span>
            <Link
              to="/login"
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-100 font-bold transition text-xs"
            >
              <Users className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Switch Role</span>
            </Link>
          </div>
        </header>

        <main className="p-3 sm:p-6 flex-1 pb-16 overflow-y-auto">
          <Outlet context={{ activeShopId, activeShop, displayShopName, displayShopCategory }} />
        </main>
      </div>
    </div>
  );
};
