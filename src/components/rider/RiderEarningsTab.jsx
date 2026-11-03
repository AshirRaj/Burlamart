import React from 'react';
import { CreditCard } from 'lucide-react';

export const RiderEarningsTab = ({ earnings, riderProfile, onInstantTransfer }) => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto text-xs">
      {/* Daily Total Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 rounded-3xl p-6 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Today's Total Net Payout</span>
          <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 mt-1">₹{earnings.todayTotal}</div>
          <div className="text-slate-400 mt-1">
            Linked Account: <strong className="text-white">{riderProfile.bankAccount}</strong>
          </div>
        </div>

        <button
          onClick={onInstantTransfer}
          className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold rounded-2xl shadow-lg transition flex items-center gap-1.5 self-start sm:self-auto"
        >
          <CreditCard className="w-4 h-4" />
          <span>Instant Bank Transfer (IMPS)</span>
        </button>
      </div>

      {/* Breakdown based on Section 11: number of orders & distance */}
      <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4">
        <h3 className="font-extrabold text-sm text-white">Payout Structure Breakdown (Section 11)</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700/60">
            <div>
              <div className="font-bold text-white text-sm">Base Delivery Fee ({earnings.ordersCompleted} orders)</div>
              <div className="text-[11px] text-slate-400">Fixed rate of ₹40 per completed delivery</div>
            </div>
            <span className="font-extrabold text-emerald-400 text-base">₹{earnings.orderPay}</span>
          </div>

          <div className="flex justify-between items-center p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700/60">
            <div>
              <div className="font-bold text-white text-sm">Distance Surcharge ({earnings.distanceKm} km traveled)</div>
              <div className="text-[11px] text-slate-400">₹7.00 per km distance rate</div>
            </div>
            <span className="font-extrabold text-emerald-400 text-base">₹{earnings.distancePay}</span>
          </div>

          <div className="flex justify-between items-center p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700/60">
            <div>
              <div className="font-bold text-white text-sm">Peak Shift Incentive / Surge Bonus</div>
              <div className="text-[11px] text-slate-400">Rain & peak lunch hour bonus</div>
            </div>
            <span className="font-extrabold text-emerald-400 text-base">₹{earnings.surgeBonus}</span>
          </div>

          <div className="flex justify-between items-center p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700/60">
            <div>
              <div className="font-bold text-white text-sm">Customer Tips</div>
              <div className="text-[11px] text-slate-400">100% tip passed directly to rider wallet</div>
            </div>
            <span className="font-extrabold text-emerald-400 text-base">₹{earnings.tips}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

