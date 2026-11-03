import React from 'react';
import { Store, MapPin } from 'lucide-react';

export const RiderIncomingModal = ({
  incomingTrip,
  onAccept,
  onReject
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 text-white rounded-3xl max-w-md w-full p-6 border-2 border-emerald-500 shadow-2xl space-y-4 text-xs relative overflow-hidden">
        <div className="flex justify-between items-center pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
            <h3 className="font-extrabold text-sm text-white">Incoming Delivery Trip Request!</h3>
          </div>
          <span className="bg-emerald-500/20 text-emerald-400 font-mono font-bold text-xs px-2.5 py-0.5 rounded">
            28s
          </span>
        </div>

        <div className="bg-gradient-to-r from-emerald-950 to-slate-900 p-4 rounded-2xl border border-emerald-500/40 flex justify-between items-center">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold">Estimated Trip Earnings</span>
            <div className="text-2xl font-extrabold text-emerald-400">₹{incomingTrip.payout}</div>
          </div>
          <div className="text-right text-[11px] text-slate-300">
            <div>₹{incomingTrip.basePay} base + ₹{incomingTrip.distancePay} dist</div>
            <div className="text-amber-400 font-bold">+₹{incomingTrip.surgePay} peak bonus</div>
          </div>
        </div>

        <div className="space-y-2.5">
          <div className="p-3 bg-slate-800/80 rounded-2xl flex items-start gap-2.5">
            <Store className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-white">{incomingTrip.shopName}</div>
              <div className="text-slate-400 text-[11px]">{incomingTrip.shopAddress}</div>
            </div>
          </div>

          <div className="p-3 bg-slate-800/80 rounded-2xl flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-white">{incomingTrip.customerName}</div>
              <div className="text-slate-400 text-[11px]">{incomingTrip.customerAddress}</div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={onReject}
            className="flex-1 py-3 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 rounded-2xl font-bold transition active:scale-95"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={onAccept}
            className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-2xl font-extrabold shadow-lg transition active:scale-95"
          >
            Accept Order
          </button>
        </div>
      </div>
    </div>
  );
};

