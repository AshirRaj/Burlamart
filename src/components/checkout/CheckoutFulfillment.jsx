import React from 'react';
import { Truck, Store, Building2, CheckCircle2, ShieldCheck, MapPin, ExternalLink } from 'lucide-react';

export const CheckoutFulfillment = ({
  isHotelStay,
  deliveryType,
  setDeliveryType,
  currentShop
}) => {
  if (isHotelStay) {
    return (
      <div className="bg-white rounded-3xl p-5 border border-teal-200/90 shadow-sm space-y-4">
        <h3 className="font-extrabold text-base text-gray-900 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 text-xs flex items-center justify-center font-bold">
            1
          </span>
          <span>Stay Check-in & Fulfillment</span>
        </h3>

        <div className="p-4 bg-teal-50/70 rounded-2xl border border-teal-200 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-teal-950 flex items-center gap-1.5 text-sm">
              <Building2 className="w-4 h-4 text-teal-700" />
              <span>Direct Front-Desk Check-in</span>
            </span>
            <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>Zero Delivery Charge</span>
            </span>
          </div>

          <p className="text-[11px] text-gray-600 leading-relaxed">
            Physical delivery is not required for hotel reservations. Present your digital Burlamart Booking ID and a valid Government ID at the front desk upon arrival.
          </p>

          <div className="pt-2 border-t border-teal-200/60 flex flex-wrap items-center justify-between gap-2 text-[11px]">
            <span className="text-gray-700 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-teal-700" />
              <strong>{currentShop?.name || 'Hotel'}</strong> — {currentShop?.address || 'Civil Lines, Jaipur'}
            </span>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(currentShop?.address || 'Jaipur')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-800 font-bold hover:underline flex items-center gap-1"
            >
              <span>Get Directions</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm space-y-4">
      <h3 className="font-extrabold text-base text-gray-900 flex items-center gap-2">
        <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">
          1
        </span>
        <span>Delivery or Store Pickup</span>
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <button
          type="button"
          onClick={() => setDeliveryType('delivery')}
          className={`p-4 rounded-2xl border font-bold flex flex-col items-center gap-1.5 transition text-left ${
            deliveryType === 'delivery'
              ? 'bg-[#1B4332] text-white border-emerald-900 shadow-md'
              : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
          }`}
        >
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5" />
            <span className="text-sm">Doorstep Delivery</span>
          </div>
          <span className="text-[10px] font-normal opacity-80">Calculated by distance slabs</span>
        </button>

        <button
          type="button"
          onClick={() => setDeliveryType('pickup')}
          className={`p-4 rounded-2xl border font-bold flex flex-col items-center gap-1.5 transition text-left ${
            deliveryType === 'pickup'
              ? 'bg-[#1B4332] text-white border-emerald-900 shadow-md'
              : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
          }`}
        >
          <div className="flex items-center gap-2">
            <Store className="w-5 h-5" />
            <span className="text-sm">Store Pickup (No Delivery Fee)</span>
          </div>
          <span className="text-[10px] font-normal opacity-80">Collect from {currentShop?.name || 'Store'}</span>
        </button>
      </div>
    </div>
  );
};

