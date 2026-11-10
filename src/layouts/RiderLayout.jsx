import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Bike, 
  User, 
  MapPin, 
  DollarSign, 
  Clock, 
  ShieldCheck, 
  Bell, 
  PhoneCall, 
  Power,
  ChevronRight,
  ExternalLink,
  Award,
  FileText,
  Users
} from 'lucide-react';

export const RiderLayout = () => {
  const { currentUser } = useAuth();
  const [isOnline, setIsOnline] = useState(true);
  const location = useLocation();

  // Comprehensive Rider Profile data
  const riderProfile = {
    id: 'BL-RD-8842',
    name: 'Deepak Kumar',
    phone: '+91 98111 22334',
    email: 'deepak.kumar@rider.burlamart.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    vehicle: 'Hero Splendor Plus (OD-15-AB-4021)',
    vehicleType: 'Two Wheeler (Motorcycle)',
    rating: 4.85,
    totalRatings: 412,
    completedDeliveries: 1248,
    acceptanceRate: '96.2%',
    onTimeRate: '98.4%',
    currentShift: 'Morning Shift (07:00 AM - 03:30 PM)',
    activeZone: 'Burla & Sambalpur Central: VSSUT, Jyoti Vihar & Khetrajpur',
    kycStatus: 'Verified (Aadhaar & PAN)',
    dlNumber: 'OD-15-2019-0089214',
    dlExpiry: '15 Aug 2031',
    insuranceExpiry: '24 Oct 2027',
    bankAccount: 'HDFC Bank (A/c ****4012)',
    upiId: 'deepak.kumar@okhdfcbank',
    emergencyContact: '+91 98222 99881 (Spouse - Sunita Kumar)'
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans w-full max-w-full overflow-x-hidden">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 py-3 shadow-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Brand & Identity */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-slate-950 flex items-center justify-center font-extrabold shadow-md">
              <Bike className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base text-white tracking-tight leading-none">
                  Burlamart Rider
                </span>
                <span className="bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                  {riderProfile.id}
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">
                {riderProfile.activeZone}
              </span>
            </div>
          </div>

          {/* Center Rider Profile Quick Chip for Desktop */}
          <div className="hidden lg:flex items-center gap-3 bg-slate-800/80 px-4 py-1.5 rounded-2xl border border-slate-700/60">
            <img
              src={riderProfile.avatar}
              alt={riderProfile.name}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500"
            />
            <div className="text-left text-xs">
              <div className="font-extrabold text-white flex items-center gap-1.5">
                <span>{riderProfile.name}</span>
                <span className="text-amber-400 font-bold text-[11px]">★ {riderProfile.rating}</span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono">{riderProfile.vehicle}</div>
            </div>
            <div className="border-l border-slate-700 pl-3 text-right">
              <span className="text-[10px] text-slate-400 block font-semibold">Today's Shift</span>
              <span className="text-emerald-400 font-bold text-xs">07:00 AM - 03:30 PM</span>
            </div>
          </div>

          {/* Right Action: Online/Offline Duty Switch & Emergency SOS */}
          <div className="flex items-center gap-3">
            <a
              href="tel:112"
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 rounded-xl text-xs font-bold transition"
              title="Emergency SOS Support"
            >
              <PhoneCall className="w-3.5 h-3.5 text-rose-400" />
              <span>SOS Helpline</span>
            </a>

            <Link
              to="/login"
              className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition border border-slate-700"
            >
              <Users className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Switch Role</span>
            </Link>

            {/* Online / Offline Toggle */}
            <button
              onClick={() => setIsOnline(!isOnline)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-extrabold transition shadow-md ${
                isOnline
                  ? 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 ring-2 ring-emerald-400/20'
                  : 'bg-rose-900/60 text-rose-300 border border-rose-700 hover:bg-rose-900'
              }`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-slate-950 animate-ping' : 'bg-rose-400'}`}></span>
              <span>{isOnline ? 'ON DUTY' : 'OFFLINE'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Outlet */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 pb-24 sm:pb-16">
        <Outlet context={{ isOnline, setIsOnline, riderProfile }} />
      </main>
    </div>
  );
};
