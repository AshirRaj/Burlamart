import React from 'react';
import { Bike, Navigation, Store, MapPin, Phone, Check } from 'lucide-react';

export const RiderActiveTripTab = ({
  assignedOrder,
  onAdvanceDeliveryStage,
  onReroute,
  onGoToDashboard
}) => {
  if (!assignedOrder) {
    return (
      <div className="bg-slate-900 rounded-3xl p-12 border border-slate-800 text-center space-y-3 shadow-xl">
        <Bike className="w-12 h-12 text-slate-600 mx-auto" />
        <h3 className="font-bold text-white">No Active Delivery Assignment</h3>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          You can simulate receiving a new delivery request from the main dashboard.
        </p>
        <button
          type="button"
          onClick={onGoToDashboard}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition"
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Column */}
        <div className="lg:col-span-2 bg-slate-900 rounded-3xl p-5 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span className="font-extrabold text-white text-sm">Live GPS Turn-by-Turn Navigation</span>
            </div>
            <span className="text-emerald-400 font-mono font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Distance: {assignedOrder.distanceKm || 2.4} km • ~9 Mins
            </span>
          </div>

          {/* Simulated Interactive Map */}
          <div className="w-full h-96 rounded-2xl bg-slate-950 border border-slate-800 relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px]"></div>

            {/* Store Pin */}
            <div className="absolute top-12 left-16 flex flex-col items-center">
              <div className="w-9 h-9 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-xl">
                <Store className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold bg-slate-900/95 text-white px-2 py-0.5 rounded shadow mt-1">
                Store Pickup
              </span>
            </div>

            {/* Polyline Route */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <path
                d="M 85 70 Q 200 180 380 260"
                fill="transparent"
                stroke="#10b981"
                strokeWidth="5"
                strokeDasharray="10,10"
              />
            </svg>

            {/* Rider Current Position */}
            <div className="absolute top-44 left-48 flex flex-col items-center animate-pulse">
              <div className="w-11 h-11 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-2xl ring-4 ring-blue-500/30">
                <Navigation className="w-6 h-6 -rotate-45" />
              </div>
              <span className="text-[10px] font-bold bg-blue-900 text-blue-200 px-2 py-0.5 rounded shadow mt-1">
                Deepak (You)
              </span>
            </div>

            {/* Customer Pin */}
            <div className="absolute bottom-14 right-16 flex flex-col items-center">
              <div className="w-9 h-9 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-xl animate-bounce">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold bg-slate-900/95 text-white px-2 py-0.5 rounded shadow mt-1">
                Customer Drop
              </span>
            </div>
          </div>

          <div className="p-3 bg-slate-800 rounded-xl text-xs flex items-center justify-between">
            <span className="text-slate-300">Next Maneuver: Turn right in 300m onto Janpath Avenue</span>
            <button
              type="button"
              onClick={onReroute}
              className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-bold text-[11px] transition"
            >
              Reroute
            </button>
          </div>
        </div>

        {/* Order Actions Column */}
        <div className="bg-slate-900 rounded-3xl p-5 border border-slate-800 space-y-5 text-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="pb-3 border-b border-slate-800 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Order Details</span>
                <h4 className="font-mono font-extrabold text-sm text-white">{assignedOrder.id}</h4>
              </div>
              <div className="text-right">
                <span className="font-extrabold text-base text-emerald-400">₹{assignedOrder.totalAmount}</span>
                <span className="text-[10px] text-slate-400 block font-bold uppercase">{assignedOrder.paymentMethod}</span>
              </div>
            </div>

            {/* Store Details */}
            <div className="p-3.5 bg-slate-800/80 rounded-2xl space-y-1">
              <div className="font-bold text-slate-300">1. Store: {assignedOrder.shopName}</div>
              <p className="text-[11px] text-slate-400">{assignedOrder.shopAddress || 'Sector 14'}</p>
              <a href="tel:+919876543210" className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-bold hover:underline mt-1">
                <Phone className="w-3 h-3" /> Call Store Manager
              </a>
            </div>

            {/* Customer Details */}
            <div className="p-3.5 bg-slate-800/80 rounded-2xl space-y-1">
              <div className="font-bold text-slate-300">2. Customer: {assignedOrder.customerName}</div>
              <p className="text-[11px] text-slate-400">{assignedOrder.deliveryAddress}</p>
              <a href={`tel:${assignedOrder.customerPhone || '+919811122334'}`} className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-bold hover:underline mt-1">
                <Phone className="w-3 h-3" /> Call Customer ({assignedOrder.customerPhone || '+91 98111 22334'})
              </a>
            </div>

            {/* Items Summary */}
            <div>
              <span className="font-bold text-slate-400 text-[11px] uppercase tracking-wider block mb-1.5">Package Items:</span>
              <div className="space-y-1 bg-slate-800/50 p-2.5 rounded-xl border border-slate-800">
                {assignedOrder.items?.map((it, idx) => (
                  <div key={idx} className="flex justify-between text-[11px]">
                    <span className="text-slate-300">{it.quantity}x {it.name}</span>
                    <span className="font-bold text-white">₹{it.price * it.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Status Stepper Actions */}
          <div className="space-y-2 pt-3 border-t border-slate-800">
            <div className="text-[11px] text-slate-400 font-semibold flex justify-between">
              <span>Current Delivery Phase:</span>
              <span className="text-emerald-400 font-bold">{assignedOrder.status}</span>
            </div>

            {assignedOrder.status === 'Rider Assigned' && (
              <button
                type="button"
                onClick={() => onAdvanceDeliveryStage('Picked Up')}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-extrabold text-xs shadow-lg transition active:scale-98"
              >
                Confirm Order Picked Up from Store
              </button>
            )}

            {assignedOrder.status === 'Picked Up' && (
              <button
                type="button"
                onClick={() => onAdvanceDeliveryStage('Delivered')}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-2xl font-extrabold text-xs shadow-xl transition flex items-center justify-center gap-2 active:scale-98"
              >
                <Check className="w-4 h-4" />
                <span>Confirm Delivery & Record Payment</span>
              </button>
            )}

            {assignedOrder.status === 'Delivered' && (
              <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl text-center font-bold text-emerald-300 text-xs">
                ✓ Delivery Completed & Payout Credited!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

