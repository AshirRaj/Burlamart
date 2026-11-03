import React from 'react';
import { Store, MapPin, ChevronRight, Flame } from 'lucide-react';
import { RiderProfileHeader } from './RiderProfileHeader';

export const RiderOverviewTab = ({
  riderProfile,
  earnings,
  assignedOrder,
  onViewProfile,
  onOpenNavigation,
  onSimulateIncoming
}) => {
  return (
    <div className="space-y-6">
      {/* Prominent Rider Profile Summary Card */}
      <RiderProfileHeader riderProfile={riderProfile} onViewProfile={onViewProfile} />

      {/* Quick Metrics KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 p-4 rounded-3xl border border-slate-800 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Today's Earnings</span>
          <div className="text-2xl font-extrabold text-emerald-400">₹{earnings.todayTotal}</div>
          <div className="text-[11px] text-slate-400 mt-1">Target: ₹{earnings.targetToday} (68% achieved)</div>
        </div>

        <div className="bg-slate-900 p-4 rounded-3xl border border-slate-800 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Trips Completed</span>
          <div className="text-2xl font-extrabold text-white">{earnings.ordersCompleted} Trips</div>
          <div className="text-[11px] text-emerald-400 mt-1 font-semibold">98.4% On-Time Rate</div>
        </div>

        <div className="bg-slate-900 p-4 rounded-3xl border border-slate-800 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Distance Driven</span>
          <div className="text-2xl font-extrabold text-white">{earnings.distanceKm} km</div>
          <div className="text-[11px] text-blue-400 mt-1 font-semibold">₹7.00/km payout rate</div>
        </div>

        <div className="bg-slate-900 p-4 rounded-3xl border border-slate-800 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Customer Tips</span>
          <div className="text-2xl font-extrabold text-amber-400">₹{earnings.tips}</div>
          <div className="text-[11px] text-slate-400 mt-1">100% passed to you</div>
        </div>
      </div>

      {/* Incentive / Daily Goal Progress */}
      <div className="bg-gradient-to-r from-amber-900/40 via-slate-900 to-slate-900 rounded-3xl p-5 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-400" />
            <h3 className="font-extrabold text-sm text-white">Peak Shift Incentive Active!</h3>
          </div>
          <p className="text-xs text-slate-300">
            Complete <strong>3 more deliveries</strong> before 03:30 PM to unlock an extra <strong>₹150 Cash Bonus</strong>!
          </p>
        </div>
        <div className="text-left sm:text-right">
          <span className="text-xs font-bold text-amber-400">9 of 12 completed</span>
          <div className="w-48 bg-slate-800 h-2.5 rounded-full overflow-hidden mt-1 border border-slate-700">
            <div className="bg-amber-400 h-full rounded-full" style={{ width: '75%' }}></div>
          </div>
        </div>
      </div>

      {/* Live Trip Radar Simulator Trigger */}
      <div className="bg-slate-900 rounded-3xl p-5 border border-slate-800 flex items-center justify-between gap-4 text-xs">
        <div>
          <div className="font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Nearby Order Dispatch Radar</span>
          </div>
          <p className="text-slate-400 text-[11px]">Simulate receiving a new delivery trip assignment</p>
        </div>
        <button
          onClick={onSimulateIncoming}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold transition shadow-sm"
        >
          Simulate Incoming Order
        </button>
      </div>

      {/* Active Trip Quick Preview or Empty state */}
      {assignedOrder ? (
        <div className="bg-slate-900 rounded-3xl p-6 border border-emerald-500/40 shadow-xl space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2 py-0.5 rounded">
                Active Trip In Progress
              </span>
              <h3 className="font-mono font-extrabold text-base text-white mt-1">
                {assignedOrder.id}
              </h3>
            </div>
            <button
              onClick={onOpenNavigation}
              className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-extrabold flex items-center gap-1"
            >
              <span>Open Full Navigation</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 bg-slate-800/80 rounded-2xl space-y-1">
              <div className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1">
                <Store className="w-3.5 h-3.5 text-emerald-400" /> Pickup Store
              </div>
              <div className="font-bold text-white text-sm">{assignedOrder.shopName}</div>
              <div className="text-slate-400 text-[11px] truncate">1.2 km away • Sector 14</div>
            </div>

            <div className="p-3.5 bg-slate-800/80 rounded-2xl space-y-1">
              <div className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-rose-400" /> Drop Location
              </div>
              <div className="font-bold text-white text-sm">{assignedOrder.customerName}</div>
              <div className="text-slate-400 text-[11px] truncate">{assignedOrder.deliveryAddress}</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 text-center text-slate-400 text-xs">
          No active trip right now. You are top of the queue for the next order.
        </div>
      )}
    </div>
  );
};

