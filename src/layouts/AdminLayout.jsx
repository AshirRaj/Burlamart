import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  ShieldCheck, 
  Layers, 
  Store, 
  Package, 
  Settings, 
  DollarSign, 
  FileText, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  Users,
  Menu,
  X
} from 'lucide-react';

export const AdminLayout = () => {
  const location = useLocation();
  const { currentUser } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/admin', label: 'Overview', icon: ShieldCheck, exact: true },
    { path: '/admin/templates', label: 'Category UI Templates', icon: Layers, highlight: true },
    { path: '/admin/vendors', label: 'Vendor Management & Rent', icon: Store },
    { path: '/admin/master-templates', label: 'Master Product Templates', icon: Package },
    { path: '/admin/settings', label: 'Settings & Distance Slabs', icon: Settings },
    { path: '/admin/monetisation', label: 'Monetisation & Commissions', icon: DollarSign },
  ];

  const isActive = (item) => {
    if (item.exact) return location.pathname === item.path;
    return location.pathname.startsWith(item.path);
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col md:flex-row w-full max-w-full overflow-x-hidden">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-[#0B2518] text-white p-3.5 flex items-center justify-between shadow-md sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition text-purple-200"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-purple-500 text-white font-extrabold flex items-center justify-center text-xs">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="font-extrabold text-xs block leading-none">Admin Suite</span>
              <span className="text-[10px] text-purple-300">Platform Control</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Link
            to="/login"
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-[11px]"
          >
            <Users className="w-3 h-3 text-purple-300" />
            <span>Role</span>
          </Link>
          <span className="bg-purple-900/80 text-purple-200 text-[10px] font-bold px-2 py-0.5 rounded-full border border-purple-700/60">
            Admin
          </span>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0B2518] text-white p-4 space-y-3 border-b border-emerald-900 shadow-xl z-30">
          <nav className="space-y-1.5 text-xs font-semibold">
            {navItems.map(item => {
              const Icon = item.icon;
              const active = isActive(item);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition ${
                    active
                      ? 'bg-purple-600 text-white font-bold shadow-sm'
                      : 'text-emerald-100 hover:bg-emerald-900/60 hover:text-white'
                  } ${item.highlight && !active ? 'border border-purple-500/30' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 flex-shrink-0 ${item.highlight ? 'text-purple-300' : ''}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.highlight && (
                    <span className="text-[9px] font-extrabold uppercase bg-purple-400 text-purple-950 px-1.5 py-0.2 rounded">
                      Core
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
          <div className="pt-2 border-t border-emerald-900 flex items-center justify-between text-xs">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-purple-300 hover:underline flex items-center gap-1"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Customer Portal</span>
            </Link>
          </div>
        </div>
      )}

      {/* Admin Sidebar for Desktop */}
      <aside className="hidden md:flex w-72 bg-[#0B2518] text-white flex-shrink-0 flex-col justify-between p-4 shadow-2xl">
        <div>
          {/* Admin Header */}
          <div className="flex items-center gap-3 px-2 py-3 mb-4 border-b border-emerald-900">
            <div className="w-10 h-10 rounded-xl bg-purple-500 text-white font-extrabold flex items-center justify-center text-lg shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-extrabold text-sm text-white tracking-tight">SuperAdmin Suite</h2>
              <span className="text-[10px] text-emerald-300 font-semibold uppercase tracking-wider block">Burlamart Control</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 text-xs font-semibold">
            {navItems.map(item => {
              const Icon = item.icon;
              const active = isActive(item);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition ${
                    active
                      ? 'bg-purple-600 text-white font-bold shadow-sm'
                      : 'text-emerald-100 hover:bg-emerald-900/60 hover:text-white'
                  } ${item.highlight && !active ? 'border border-purple-500/30' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 flex-shrink-0 ${item.highlight ? 'text-purple-300' : ''}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.highlight && (
                    <span className="text-[9px] font-extrabold uppercase bg-purple-400 text-purple-950 px-1.5 py-0.2 rounded">
                      Core
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Switch back to Customer App */}
        <div className="pt-4 border-t border-emerald-900 space-y-2">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Customer App</span>
          </Link>
          <div className="text-[10px] text-emerald-300 text-center">
            Synchronized with Platform Engine
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between shadow-xs">
          <div>
            <h1 className="text-base sm:text-lg font-extrabold text-gray-900 leading-tight">
              Platform Configuration & Control
            </h1>
            <p className="text-[11px] sm:text-xs text-gray-500 truncate max-w-xs sm:max-w-md">
              Real-time synchronization across Customer, Vendor, and Rider applications
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:flex bg-purple-100 text-purple-900 text-xs font-bold px-3 py-1 rounded-full items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse"></span>
              Admin Mode
            </span>
            <Link
              to="/login"
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-100 font-bold text-xs transition"
            >
              <Users className="w-3.5 h-3.5 text-purple-700" />
              <span className="hidden sm:inline">Switch Role</span>
            </Link>
          </div>
        </header>

        <main className="p-3 sm:p-6 flex-1 pb-16 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
