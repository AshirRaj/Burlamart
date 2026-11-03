import React from 'react';

export const RiderHistoryTab = ({ deliveryHistory }) => {
  return (
    <div className="space-y-4 max-w-4xl mx-auto text-xs">
      <h3 className="font-extrabold text-sm text-white">Completed Deliveries Today ({deliveryHistory.length})</h3>

      <div className="space-y-3">
        {deliveryHistory.map((trip, idx) => (
          <div key={idx} className="bg-slate-900 p-4 rounded-3xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono font-bold text-white text-sm">{trip.id}</span>
                <span className="text-[10px] font-bold text-slate-400">({trip.time})</span>
                <span className="text-amber-400 font-bold text-[11px]">★ {trip.rating}</span>
              </div>
              <div className="text-slate-300 font-medium">Customer: <strong>{trip.customer}</strong></div>
              <div className="text-slate-400 text-[11px]">{trip.address} • {trip.distanceKm} km</div>
            </div>

            <div className="text-right flex sm:flex-col justify-between items-end">
              <div className="font-extrabold text-emerald-400 text-sm">+₹{trip.payout} Earned</div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase">{trip.payment}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

