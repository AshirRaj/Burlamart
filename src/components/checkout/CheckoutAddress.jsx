import React from 'react';
import { Navigation, MapPin, Zap, User, Phone, Clock, FileText, CheckCircle2 } from 'lucide-react';

export const CheckoutAddress = ({
  isHotelStay,
  deliveryType,
  address,
  setAddress,
  distanceKm,
  setDistanceKm,
  gpsSimulating,
  onUseCurrentLocation,
  useFastDelivery,
  setUseFastDelivery,
  isFastDeliveryEligible,
  platformSettings,
  currentShop,
  currentUser,
  guestInfo,
  setGuestInfo
}) => {
  if (isHotelStay) {
    return (
      <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm space-y-4">
        <h3 className="font-extrabold text-base text-gray-900 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-teal-100 text-teal-800 text-xs flex items-center justify-center font-bold">
            2
          </span>
          <span>Primary Guest & Arrival Details</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block text-gray-600 font-bold mb-1 flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-teal-700" />
              <span>Primary Guest Name</span>
            </label>
            <input
              type="text"
              value={guestInfo?.name || currentUser?.name || ''}
              onChange={(e) => setGuestInfo && setGuestInfo(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Full name as on Govt ID"
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-3 text-xs sm:text-sm font-medium outline-none focus:border-teal-600 focus:bg-white transition"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-bold mb-1 flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-teal-700" />
              <span>WhatsApp / Mobile Number</span>
            </label>
            <input
              type="tel"
              value={guestInfo?.phone || currentUser?.phone || ''}
              onChange={(e) => setGuestInfo && setGuestInfo(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="For check-in voucher & OTP"
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-3 text-xs sm:text-sm font-medium outline-none focus:border-teal-600 focus:bg-white transition"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="block text-gray-600 font-bold mb-1 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-teal-700" />
              <span>Estimated Arrival Time</span>
            </label>
            <select
              value={guestInfo?.checkInTime || '12:00 PM - 02:00 PM'}
              onChange={(e) => setGuestInfo && setGuestInfo(prev => ({ ...prev, checkInTime: e.target.value }))}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-3 text-xs sm:text-sm font-medium outline-none focus:border-teal-600 focus:bg-white transition"
            >
              <option value="12:00 PM - 02:00 PM">12:00 PM - 02:00 PM (Standard Check-in)</option>
              <option value="02:00 PM - 06:00 PM">02:00 PM - 06:00 PM (Afternoon)</option>
              <option value="06:00 PM - 10:00 PM">06:00 PM - 10:00 PM (Evening)</option>
              <option value="10:00 PM onwards">10:00 PM onwards (Late Arrival)</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-600 font-bold mb-1 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-teal-700" />
              <span>Special Requests (Optional)</span>
            </label>
            <input
              type="text"
              value={guestInfo?.specialRequests || ''}
              onChange={(e) => setGuestInfo && setGuestInfo(prev => ({ ...prev, specialRequests: e.target.value }))}
              placeholder="e.g. Quiet floor, early check-in, non-smoking"
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-3 text-xs sm:text-sm font-medium outline-none focus:border-teal-600 focus:bg-white transition"
            />
          </div>
        </div>

        <div className="p-3 bg-teal-50/50 rounded-2xl border border-teal-100 flex items-center gap-2 text-[11px] text-teal-900 font-medium">
          <CheckCircle2 className="w-4 h-4 text-teal-700 flex-shrink-0" />
          <span>Voucher and check-in confirmation will be automatically dispatched via SMS & WhatsApp upon booking.</span>
        </div>
      </div>
    );
  }

  if (deliveryType === 'pickup') {
    return (
      <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm space-y-3">
        <h3 className="font-extrabold text-base text-gray-900 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">
            2
          </span>
          <span>Store Pickup Location & Details</span>
        </h3>

        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 text-xs space-y-2">
          <div className="flex items-center gap-2 font-bold text-gray-900 text-sm">
            <MapPin className="w-4 h-4 text-emerald-700" />
            <span>{currentShop?.name || 'Partner Store'}</span>
          </div>
          <p className="text-gray-600 text-xs">
            {currentShop?.address || 'Civil Lines, Tech Zone, Jaipur, Rajasthan'}
          </p>
          <div className="pt-2 border-t border-gray-200 text-[11px] text-gray-500">
            ⏰ Order is typically prepared within 20-30 minutes. You can pick it up anytime during store business hours.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-extrabold text-base text-gray-900 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">
            2
          </span>
          <span>Delivery Address</span>
        </h3>

        {/* Current Location Button */}
        <button
          onClick={onUseCurrentLocation}
          disabled={gpsSimulating}
          className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
        >
          <Navigation className={`w-3.5 h-3.5 text-emerald-600 ${gpsSimulating ? 'animate-spin' : ''}`} />
          <span>{gpsSimulating ? 'Detecting GPS...' : 'Use Current Location'}</span>
        </button>
      </div>

      <textarea
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        rows={2}
        className="w-full bg-gray-50 border border-gray-200 rounded-2xl p-3 text-xs sm:text-sm font-medium outline-none focus:border-emerald-600 focus:bg-white transition"
        placeholder="Enter complete house number, street, landmark and pincode"
      />

      {/* Distance simulator slider for testing distance slabs */}
      <div className="bg-emerald-50/50 rounded-2xl p-3 border border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div>
          <span className="font-bold text-emerald-950">Simulated Distance from Store: </span>
          <span className="font-extrabold text-emerald-800">{distanceKm} km</span>
          <span className="text-[11px] text-gray-500 block">
            (Slabs: 0-{platformSettings?.distanceSlabX || 2}km = ₹{platformSettings?.slab1Fee || 0}, {platformSettings?.distanceSlabX || 2}-{platformSettings?.distanceSlabY || 5}km = ₹{platformSettings?.slab2Fee || 30}, {platformSettings?.distanceSlabY || 5}+ km = ₹{platformSettings?.slab3Fee || 60}+₹{platformSettings?.perKmRateBeyondY || 10}/km)
          </span>
        </div>
        <input
          type="range"
          min="0.5"
          max="15"
          step="0.5"
          value={distanceKm}
          onChange={(e) => setDistanceKm(Number(e.target.value))}
          className="accent-emerald-700 w-36"
        />
      </div>

      {/* Fast Delivery Option within R km */}
      <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-2xl border border-gray-200">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-500 flex-shrink-0" />
          <div>
            <div className="font-bold text-xs text-gray-900 flex items-center gap-1.5">
              <span>Express Fast Delivery (+₹{platformSettings?.fastDeliveryFee || 25})</span>
              {!isFastDeliveryEligible && (
                <span className="text-[10px] text-rose-600 font-semibold">(Disabled: beyond {platformSettings?.fastDeliveryMaxDistanceR || 4}km or limited stock)</span>
              )}
            </div>
            <div className="text-[11px] text-gray-500">Guaranteed priority dispatch within 12-15 minutes</div>
          </div>
        </div>
        <input
          type="checkbox"
          checked={useFastDelivery && isFastDeliveryEligible}
          disabled={!isFastDeliveryEligible}
          onChange={(e) => setUseFastDelivery(e.target.checked)}
          className="w-4 h-4 accent-emerald-700"
        />
      </div>
    </div>
  );
};

