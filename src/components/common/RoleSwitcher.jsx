import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { 
  Users, 
  Store, 
  Bike, 
  ShieldCheck, 
  Coins, 
  Smartphone, 
  Monitor,
  ChevronDown
} from 'lucide-react';

export const RoleSwitcher = ({ isMobileFrame, setIsMobileFrame }) => {
  const { currentRole, switchRole } = useAuth();
  const { sharedWalletBalance, vendorCoinBalance } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const handleSwitch = (role, path) => {
    switchRole(role);
    navigate(path);
  };

  const roles = [
    { id: 'customer', name: 'Customer App', path: '/', icon: Users, color: 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100' },
    { id: 'vendor', name: 'Vendor Dashboard', path: '/vendor', icon: Store, color: 'text-amber-700 bg-amber-50 hover:bg-amber-100' },
    { id: 'rider', name: 'Rider App', path: '/rider', icon: Bike, color: 'text-blue-700 bg-blue-50 hover:bg-blue-100' },
    { id: 'admin', name: 'Admin Panel', path: '/admin', icon: ShieldCheck, color: 'text-purple-700 bg-purple-50 hover:bg-purple-100' },
  ];

  if (collapsed) {
    return (
      <button 
        onClick={() => setCollapsed(false)}
        className="fixed bottom-4 right-4 z-50 bg-[#1B4332] text-white p-3 rounded-full shadow-2xl hover:bg-[#2D6A4F] transition-all flex items-center gap-2 text-xs font-semibold"
        title="Open App Switcher"
      >
        <Users className="w-5 h-5 text-emerald-300" />
        <span className="hidden sm:inline">Switch App</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 max-w-4xl w-[95%] sm:w-auto bg-white/95 backdrop-blur-md border border-gray-200/80 shadow-2xl rounded-2xl p-2 transition-all">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-medium">
        <div className="flex items-center gap-1.5 px-2 py-1 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          Apps:
        </div>

        <div className="flex flex-wrap items-center gap-1 py-0.5">
          {roles.map(r => {
            const Icon = r.icon;
            const isActive = (r.id === 'customer' && !location.pathname.startsWith('/vendor') && !location.pathname.startsWith('/rider') && !location.pathname.startsWith('/admin')) ||
                             (r.id === 'vendor' && location.pathname.startsWith('/vendor')) ||
                             (r.id === 'rider' && location.pathname.startsWith('/rider')) ||
                             (r.id === 'admin' && location.pathname.startsWith('/admin'));

            return (
              <button
                key={r.id}
                onClick={() => handleSwitch(r.id, r.path)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all font-semibold ${
                  isActive 
                    ? 'bg-[#1B4332] text-white shadow-sm' 
                    : `${r.color} text-gray-700`
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-300' : ''}`} />
                <span>{r.name}</span>
              </button>
            );
          })}
        </div>

        <div className="hidden md:flex items-center gap-2 border-l border-gray-200 pl-2">
          {/* Shared Rewards & Coins indicators */}
          <div className="flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-800 rounded-lg text-[11px] font-bold" title="Customer Shared Wallet Rewards">
            <Coins className="w-3.5 h-3.5 text-emerald-600" />
            <span>₹{sharedWalletBalance} Rewards</span>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-800 rounded-lg text-[11px] font-bold" title="Vendor Coin Wallet">
            <Coins className="w-3.5 h-3.5 text-amber-600" />
            <span>{vendorCoinBalance} Coins</span>
          </div>

          {/* Mobile frame toggle */}
          {setIsMobileFrame && (
            <button
              onClick={() => setIsMobileFrame(prev => !prev)}
              className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-600"
              title={isMobileFrame ? "Switch to Desktop full view" : "Preview Mobile device frame"}
            >
              {isMobileFrame ? <Monitor className="w-4 h-4 text-emerald-700" /> : <Smartphone className="w-4 h-4" />}
            </button>
          )}

          <button 
            onClick={() => setCollapsed(true)} 
            className="p-1 text-gray-400 hover:text-gray-700 rounded-lg"
            title="Minimize"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

