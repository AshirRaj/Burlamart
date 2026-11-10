import React from 'react';
import { Bike, Navigation, DollarSign, Clock, User } from 'lucide-react';

export const RiderNavigationTabs = ({ activeTab, onSelectTab, activeOrderCount }) => {
  const tabs = [
    { id: 'overview', label: 'Rider Dashboard', shortLabel: 'Home', icon: Bike },
    { id: 'active-order', label: 'Active Delivery Trip', shortLabel: 'Trip', icon: Navigation, count: activeOrderCount },
    { id: 'earnings', label: 'Earnings & Payouts', shortLabel: 'Earnings', icon: DollarSign },
    { id: 'history', label: 'Trip History', shortLabel: 'History', icon: Clock },
    { id: 'profile', label: 'Profile & Documents', shortLabel: 'Profile', icon: User, badge: 'Verified' },
  ];

  return (
    <>
      {/* Desktop Top Pills */}
      <div className="hidden sm:flex flex-wrap items-center gap-2 bg-slate-900 p-2 rounded-2xl border border-slate-800 text-xs font-bold shadow-lg">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition cursor-pointer ${
                isActive
                  ? 'bg-emerald-500 text-slate-950 font-extrabold shadow-md'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count ? (
                <span className="w-5 h-5 rounded-full bg-slate-950 text-emerald-400 text-[10px] flex items-center justify-center font-extrabold">
                  {tab.count}
                </span>
              ) : null}
              {tab.badge && !isActive && (
                <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Mobile Sticky Bottom Navigation Bar (Thumb-Friendly) */}
      <nav
        aria-label="Rider Mobile Bottom Navigation"
        className="sm:hidden fixed bottom-0 inset-x-0 z-50 bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 h-16 flex items-center justify-around px-1 shadow-2xl"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={`mob-${tab.id}`}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center py-1 transition relative cursor-pointer ${
                isActive ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'scale-110 stroke-[2.5]' : 'stroke-[1.8]'}`} />
                {tab.count ? (
                  <span className="absolute -top-1.5 -right-2.5 w-4 h-4 rounded-full bg-amber-400 text-slate-950 text-[9px] font-black flex items-center justify-center">
                    {tab.count}
                  </span>
                ) : null}
              </div>
              <span className={`text-[10px] mt-1 ${isActive ? 'font-extrabold text-emerald-400' : 'font-medium'}`}>
                {tab.shortLabel}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
