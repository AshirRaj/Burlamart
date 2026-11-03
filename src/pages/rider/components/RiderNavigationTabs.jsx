import React from 'react';
import { Bike, Navigation, DollarSign, Clock, User } from 'lucide-react';

export const RiderNavigationTabs = ({ activeTab, onSelectTab, activeOrderCount }) => {
  const tabs = [
    { id: 'overview', label: 'Rider Dashboard', icon: Bike },
    { id: 'active-order', label: 'Active Delivery Trip', icon: Navigation, count: activeOrderCount },
    { id: 'earnings', label: 'Earnings & Payouts', icon: DollarSign },
    { id: 'history', label: 'Trip History', icon: Clock },
    { id: 'profile', label: 'Profile & Documents', icon: User, badge: 'Verified' },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 bg-slate-900 p-2 rounded-2xl border border-slate-800 text-xs font-bold shadow-lg">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelectTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition ${
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
  );
};

