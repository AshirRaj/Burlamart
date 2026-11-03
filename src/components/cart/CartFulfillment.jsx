import React from 'react';
import { 
  Truck, 
  MapPin, 
  Store, 
  CheckCircle2, 
  ShieldCheck, 
  AlertTriangle,
  Building2,
  Calendar,
  ExternalLink
} from 'lucide-react';

export const CartFulfillment = ({
  isHotelStay,
  deliveryType,
  setDeliveryType,
  currentShop,
  distanceKm,
  chargesBreakdown,
  hasLimitedStock,
  useFastDelivery,
  setUseFastDelivery,
  isFastDeliveryEligible,
  includePackaging,
  setIncludePackaging,
  isPackagingMandatory
}) => {
  if (isHotelStay) {
    return (
      <div className="bg-white rounded-3xl p-5 border border-teal-200/90 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5 text-teal-700" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-gray-900">
                Hotel Front-Desk Check-in
              </h3>
              <span className="text-[11px] text-teal-800 font-bold bg-teal-50 px-2 py-0.2 rounded-full">
                Zero Shipping Fee • Direct Arrival
              </span>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Confirmed Venue
          </span>
        </div>

        <div className="p-3.5 bg-teal-50/70 rounded-2xl border border-teal-200 text-xs text-teal-950 space-y-2">
          <div className="font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-teal-700 flex-shrink-0" />
            <span>Digital Booking Pass & Reception Check-in:</span>
          </div>
          <p className="text-[11px] text-gray-600 leading-relaxed">
            Physical delivery and store pickup are not required for hotel stays. Simply show your Burlamart booking confirmation ID and government photo ID at the hotel front desk upon arrival.
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
      <div className="flex items-center justify-between border-b border-gray-100 pb-3">
        <h3 className="font-extrabold text-base text-gray-900">
          Delivery or Store Pickup
        </h3>
        <span className="text-xs text-gray-500 font-medium">
          Section 6 Requirement
        </span>
      </div>

      {/* Prominent Delivery vs Store Pickup Toggle (Section 6) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <button
          type="button"
          onClick={() => setDeliveryType('delivery')}
          className={`p-4 rounded-2xl border transition text-left flex flex-col justify-between gap-2 ${
            deliveryType === 'delivery'
              ? 'bg-[#1B4332] text-white border-emerald-900 shadow-md'
              : 'bg-gray-50 hover:bg-gray-100 text-gray-800 border-gray-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5" />
              <span className="font-bold text-sm">Doorstep Delivery</span>
            </div>
            {deliveryType === 'delivery' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
          </div>
          <p className="text-[11px] opacity-80 leading-relaxed">
            Rider delivers right to your door. Distance fee calculated by slabs ({distanceKm} km away).
          </p>
        </button>

        <button
          type="button"
          onClick={() => setDeliveryType('pickup')}
          className={`p-4 rounded-2xl border transition text-left flex flex-col justify-between gap-2 ${
            deliveryType === 'pickup'
              ? 'bg-[#1B4332] text-white border-emerald-900 shadow-md'
              : 'bg-gray-50 hover:bg-gray-100 text-gray-800 border-gray-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Store className="w-5 h-5" />
              <span className="font-bold text-sm">Store Pickup</span>
            </div>
            {deliveryType === 'pickup' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
          </div>
          <p className="text-[11px] opacity-80 leading-relaxed">
            Pick up your order directly from the shop. Zero delivery charge!
          </p>
        </button>
      </div>

      {/* Next-Day Delivery Warning for Limited Stock */}
      {hasLimitedStock && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-center gap-2.5 text-xs text-amber-900 font-semibold">
          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>Contains limited-stock items: Eligible for Next-Day Delivery only.</span>
        </div>
      )}

      {/* Express Fast Delivery Option (if eligible) */}
      {deliveryType === 'delivery' && isFastDeliveryEligible && !hasLimitedStock && (
        <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs">
          <div>
            <div className="font-bold text-emerald-900">12-Minute Express Fast Delivery</div>
            <div className="text-[11px] text-emerald-700">Available within 5 km of shop location</div>
          </div>
          <button
            type="button"
            onClick={() => setUseFastDelivery(!useFastDelivery)}
            className={`px-3 py-1.5 rounded-xl font-bold transition text-xs ${
              useFastDelivery
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-white border border-emerald-300 text-emerald-800'
            }`}
          >
            {useFastDelivery ? '✓ Express Enabled (+₹30)' : '+ Add Express (₹30)'}
          </button>
        </div>
      )}

      {/* Packaging Charge Toggle (Section 6) */}
      {deliveryType === 'delivery' && (
        <div className="flex items-center justify-between text-xs pt-2 border-t border-gray-100">
          <div>
            <span className="font-bold text-gray-800">Eco-Friendly Protective Packaging</span>
            <p className="text-[11px] text-gray-500">
              {isPackagingMandatory ? 'Mandatory for heavy orders (>6 kg)' : 'Recommended for fragile or cold items'}
            </p>
          </div>
          <button
            type="button"
            disabled={isPackagingMandatory}
            onClick={() => setIncludePackaging(!includePackaging)}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
              isPackagingMandatory || includePackaging
                ? 'bg-[#1B4332] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {isPackagingMandatory ? 'Required (₹15)' : includePackaging ? 'Added (₹15)' : '+ Opt In'}
          </button>
        </div>
      )}
    </div>
  );
};

