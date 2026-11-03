import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Sparkles, Building2 } from 'lucide-react';

export const CartSummary = ({
  isHotelStay,
  chargesBreakdown,
  deliveryType,
  cartItems,
  onOpenComboModal
}) => {
  return (
    <div className="space-y-4">
      {/* Bill Card */}
      <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm space-y-4">
        <h3 className="font-extrabold text-base text-gray-900 pb-3 border-b border-gray-100">
          Order Summary & Charges
        </h3>

        <div className="space-y-2.5 text-xs">
          <div className="flex justify-between text-gray-600">
            <span>{isHotelStay ? 'Room & Stays Total:' : 'Items Subtotal:'}</span>
            <span className="font-bold text-gray-900">₹{chargesBreakdown.subtotal}</span>
          </div>

          {/* If physical goods: show delivery & packaging breakdown */}
          {!isHotelStay ? (
            <>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Charge:</span>
                <span className={`font-bold ${chargesBreakdown.deliveryFee === 0 ? 'text-emerald-700' : 'text-gray-900'}`}>
                  {deliveryType === 'pickup' ? 'FREE (Store Pickup)' : chargesBreakdown.deliveryFee === 0 ? 'FREE' : `₹${chargesBreakdown.deliveryFee}`}
                </span>
              </div>

              {chargesBreakdown.weightCharge > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>Weight Extra Surcharge:</span>
                  <span className="font-bold text-gray-900">+₹{chargesBreakdown.weightCharge}</span>
                </div>
              )}

              {chargesBreakdown.packagingCharge > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>Protective Packaging:</span>
                  <span className="font-bold text-gray-900">+₹{chargesBreakdown.packagingCharge}</span>
                </div>
              )}

              {chargesBreakdown.fastDeliveryCharge > 0 && (
                <div className="flex justify-between text-amber-800 font-semibold">
                  <span>Express 12-Min Fast Dispatch:</span>
                  <span>+₹{chargesBreakdown.fastDeliveryCharge}</span>
                </div>
              )}
            </>
          ) : (
            <div className="p-2.5 bg-teal-50 rounded-xl border border-teal-200/70 text-[11px] text-teal-900 font-semibold flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-teal-700 flex-shrink-0" />
              <span>Zero shipping fee for hotel room bookings</span>
            </div>
          )}

          {/* Total */}
          <div className="pt-3 border-t border-gray-200 flex justify-between items-baseline text-sm">
            <span className="font-extrabold text-gray-900">Total Payable:</span>
            <span className="font-extrabold text-xl text-emerald-800">
              ₹{chargesBreakdown.total}
            </span>
          </div>
        </div>

        {/* Proceed to Checkout Button */}
        <Link
          to="/checkout"
          className="w-full py-3.5 bg-[#1B4332] hover:bg-[#2D6A4F] text-white rounded-2xl font-extrabold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
        >
          <span>{isHotelStay ? 'Proceed to Guest Details & Booking' : 'Proceed to Checkout'}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Save as My Combo Card (Section 5.7 requirement) */}
      <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-3xl p-4 text-xs space-y-2">
        <div className="flex items-center gap-2 font-bold text-emerald-950">
          <Sparkles className="w-4 h-4 text-emerald-700" />
          <span>Save as "My Combo"</span>
        </div>
        <p className="text-[11px] text-gray-600">
          Save this entire cart combination to your account and reorder it with a single tap in the future!
        </p>
        <button
          type="button"
          onClick={onOpenComboModal}
          className="px-3.5 py-2 bg-white text-[#1B4332] hover:bg-emerald-100 rounded-xl font-extrabold border border-emerald-300 transition shadow-2xs text-xs"
        >
          + Save Current Cart as Combo
        </button>
      </div>

      {/* Burlamart Trust Badge */}
      <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-2">
        <ShieldCheck className="w-4 h-4 text-emerald-700" />
        <span>100% Verified Sellers • Unified Burlamart Wallet</span>
      </div>
    </div>
  );
};

