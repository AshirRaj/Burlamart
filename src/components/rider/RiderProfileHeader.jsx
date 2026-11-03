import React from 'react';
import { User, ShieldCheck } from 'lucide-react';

export const RiderProfileHeader = ({ riderProfile, onViewProfile }) => {
  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950 rounded-3xl p-6 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="flex items-start sm:items-center gap-4">
        <div className="relative">
          <img
            src={riderProfile.avatar}
            alt={riderProfile.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-emerald-500 shadow-lg"
          />
          <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-slate-950 p-1 rounded-full shadow" title="KYC Verified Rider">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {riderProfile.name}
            </h2>
            <span className="bg-emerald-500/20 text-emerald-400 font-mono text-[11px] font-extrabold px-2 py-0.5 rounded border border-emerald-500/30">
              {riderProfile.id}
            </span>
            <span className="bg-amber-400/20 text-amber-300 font-bold text-xs px-2 py-0.5 rounded flex items-center gap-1">
              ★ {riderProfile.rating} ({riderProfile.totalRatings} ratings)
            </span>
          </div>

          <div className="text-xs text-slate-300 flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>🛵 {riderProfile.vehicle}</span>
            <span>📱 {riderProfile.phone}</span>
          </div>

          <div className="text-[11px] text-slate-400 flex flex-wrap items-center gap-x-4 gap-y-1 pt-1">
            <span>Shift: <strong className="text-emerald-400">{riderProfile.currentShift}</strong></span>
            <span>KYC: <strong className="text-emerald-400">100% Verified</strong></span>
          </div>
        </div>
      </div>

      <button
        onClick={onViewProfile}
        className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold border border-slate-700 transition flex items-center justify-center gap-2 self-start md:self-auto shadow-sm"
      >
        <User className="w-4 h-4 text-emerald-400" />
        <span>View Full Profile & KYC Docs</span>
      </button>
    </div>
  );
};

