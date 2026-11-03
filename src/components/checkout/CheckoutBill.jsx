import React from 'react';
import { Sparkles, Calendar, Users, ShieldCheck } from 'lucide-react';

export const CheckoutBill = ({
  cartItems,
  isHotelStay,
  deliveryType,
  distanceKm,
  chargesBreakdown,
  isPackagingMandatory,
  walletDeduction,
  finalPayable,
  isSubmitting,
  onPlaceOrder
}) => {
  return (
    <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm space-y-4">
      <h4 className="font-extrabold text-base text-gray-900 pb-3 border-b border-gray-100 flex items-center justify-between">
        <span>{isHotelStay ? 'Reservation & Billing' : 'Bill & Configurable Charges'}</span>
        <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full">
          {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
        </span>
      </h4>

      {/* Items Summary with Stay Details */}
      <div className="space-y-2.5 pb-3 border-b border-gray-100 max-h-56 overflow-y-auto pr-1">
        {cartItems.map((item, idx) => (
          <div key={idx} className="flex justify-between items-start text-xs">
            <div className="pr-2">
              <div className="font-bold text-gray-900">{item.quantity}x {item.name}</div>
              {item.bookingDetails && (
                <div className="text-[10px] text-teal-800 font-semibold mt-0.5 flex flex-wrap items-center gap-1.5">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-teal-600" />
                    {item.bookingDetails.checkInDate || item.bookingDetails.date} → {item.bookingDetails.checkOutDate || 'Next Day'}
                  </span>
                  <span>•</span>
                  <span>{item.bookingDetails.totalNights || 1} Night{(item.bookingDetails.totalNights || 1) > 1 ? 's' : ''}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-teal-600" />
                    {item.bookingDetails.adults || 2} Persons
                  </span>
                </div>
              )}
            </div>
            <span className="font-extrabold text-gray-900 whitespace-nowrap">₹{item.price * item.quantity}</span>
          </div>
        ))}
      </div>

      <div className="space-y-2.5 text-xs">
        <div className="flex justify-between text-gray-600">
          <span>{isHotelStay ? 'Stay Tariff Subtotal:' : 'Items Subtotal:'}</span>
          <span className="font-bold text-gray-900">₹{chargesBreakdown.subtotal}</span>
        </div>

        {/* Fulfillment / Delivery Fee */}
        {isHotelStay ? (
          <div className="flex justify-between text-gray-600">
            <span>Hotel Front-Desk Arrival:</span>
            <span className="font-bold text-emerald-700">₹0 (Included)</span>
          </div>
        ) : (
          <div className="flex justify-between text-gray-600">
            <span>
              Delivery Fee ({deliveryType === 'pickup' ? 'Store Pickup' : `${distanceKm} km`} slab):
            </span>
            <span className={`font-bold ${chargesBreakdown.deliveryFee === 0 ? 'text-emerald-700' : 'text-gray-900'}`}>
              {chargesBreakdown.deliveryFee === 0 ? 'FREE' : `₹${chargesBreakdown.deliveryFee}`}
            </span>
          </div>
        )}

        {/* Weight-based charge */}
        {!isHotelStay && chargesBreakdown.weightCharge > 0 && (
          <div className="flex justify-between text-gray-600">
            <span>Cart Weight Surcharge ({cartItems.reduce((acc, i) => acc + ((i.weightKg || 0.2) * i.quantity), 0).toFixed(1)} kg):</span>
            <span className="font-bold text-gray-900">+₹{chargesBreakdown.weightCharge}</span>
          </div>
        )}

        {/* Quantity-based charge */}
        {!isHotelStay && chargesBreakdown.quantityCharge > 0 && (
          <div className="flex justify-between text-gray-600">
            <span>Bulk Quantity Fee:</span>
            <span className="font-bold text-gray-900">+₹{chargesBreakdown.quantityCharge}</span>
          </div>
        )}

        {/* Packaging charge */}
        {!isHotelStay && (
          <div className="flex justify-between text-gray-600">
            <span>
              Packaging Fee {isPackagingMandatory && '(Mandatory for heavy carts)'}:
            </span>
            <span className="font-bold text-gray-900">
              {chargesBreakdown.packagingCharge === 0 ? '₹0' : `₹${chargesBreakdown.packagingCharge}`}
            </span>
          </div>
        )}

        {/* Fast Delivery charge */}
        {!isHotelStay && chargesBreakdown.fastDeliveryCharge > 0 && (
          <div className="flex justify-between text-amber-800 font-semibold">
            <span>12-Min Express Fast Dispatch:</span>
            <span>+₹{chargesBreakdown.fastDeliveryCharge}</span>
          </div>
        )}

        {/* Wallet deduction */}
        {walletDeduction > 0 && (
          <div className="flex justify-between text-emerald-700 font-bold border-t border-emerald-100 pt-1.5">
            <span>Shared Wallet Reward Offset:</span>
            <span>-₹{walletDeduction}</span>
          </div>
        )}

        {/* Final Payable */}
        <div className="pt-3 border-t border-gray-200 flex justify-between items-baseline text-sm">
          <span className="font-extrabold text-gray-900">
            {isHotelStay ? 'Total Booking Payable:' : 'Final Payable Amount:'}
          </span>
          <span className="font-extrabold text-xl text-emerald-800">₹{finalPayable}</span>
        </div>
      </div>

      <div className="bg-emerald-50 rounded-2xl p-3 text-[11px] text-emerald-900 flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-emerald-700 flex-shrink-0" />
        <span>
          {isHotelStay
            ? 'Earn 2% universal coins on checkout to use across all Burlamart categories!'
            : 'You will earn 2% cashback into your Shared Wallet upon order completion!'}
        </span>
      </div>

      {/* Place Order CTA */}
      <button
        onClick={onPlaceOrder}
        disabled={isSubmitting}
        className={`w-full py-3.5 rounded-2xl font-extrabold text-white text-sm shadow-xl transition-all ${
          isSubmitting
            ? 'bg-gray-400 cursor-not-allowed'
            : isHotelStay
            ? 'bg-teal-800 hover:bg-teal-900 active:scale-98 shadow-teal-950/20'
            : 'bg-[#1B4332] hover:bg-[#2D6A4F] active:scale-98 shadow-emerald-950/20'
        }`}
      >
        {isSubmitting
          ? 'Processing...'
          : isHotelStay
          ? `Confirm Booking (₹${finalPayable})`
          : `Pay ₹${finalPayable} & Place Order`}
      </button>
    </div>
  );
};

