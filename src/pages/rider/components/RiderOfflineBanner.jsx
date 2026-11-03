import React from 'react';
import { Bike } from 'lucide-react';

export const RiderOfflineBanner = ({ onGoOnline }) => {
  return (
    <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 text-center space-y-5 max-w-lg mx-auto my-12 shadow-2xl">
      <div className="w-20 h-20 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center mx-auto text-slate-500 shadow-inner">
        <Bike className="w-10 h-10" />
      </div>
      <div>
        <h2 className="text-xl font-extrabold text-white">You are Currently OFFLINE</h2>
        <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
          You are not receiving delivery trips right now. Turn on duty when ready to begin your shift.
        </p>
      </div>
      <button
        type="button"
        onClick={onGoOnline}
        className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold rounded-2xl text-xs shadow-lg transition active:scale-95"
      >
        Go ON DUTY Now
      </button>
    </div>
  );
};

