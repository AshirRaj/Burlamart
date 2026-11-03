import React from 'react';
import { Plus, Minus, Calendar, ShieldCheck, CreditCard, Tag } from 'lucide-react';

export const CartItemList = ({ cartItems, updateQuantity }) => {
  return (
    <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm space-y-4">
      <h3 className="font-extrabold text-base text-gray-900 pb-3 border-b border-gray-100">
        Review Items ({cartItems.length})
      </h3>

      <div className="divide-y divide-gray-100">
        {cartItems.map((item) => {
          const isHotel = item.category === 'hotels-services';

          return (
            <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-2xl object-cover bg-gray-50 flex-shrink-0 border border-gray-100"
                />
                <div className="space-y-1">
                  <h4 className="font-bold text-sm text-gray-900 leading-snug">{item.name}</h4>
                  
                  {/* Category-specific specifications */}
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-gray-500">
                    {!isHotel && (
                      <span>{item.weightDisplay || '1 unit'} • ₹{item.price} each</span>
                    )}

                    {/* Fashion Selected Size */}
                    {item.selectedSize && (
                      <span className="px-1.5 py-0.2 bg-purple-50 text-purple-800 font-extrabold rounded border border-purple-200 text-[10px]">
                        Size: {item.selectedSize}
                      </span>
                    )}

                    {/* Electronics Warranty */}
                    {item.warranty && (
                      <span className="flex items-center gap-1 text-emerald-800 font-semibold text-[10px]">
                        <ShieldCheck className="w-3 h-3 text-emerald-600" />
                        <span>{item.warranty}</span>
                      </span>
                    )}

                    {/* Electronics EMI */}
                    {item.isEmiEligible && (
                      <span className="flex items-center gap-1 text-blue-700 font-semibold text-[10px]">
                        <CreditCard className="w-3 h-3" />
                        <span>EMI from ₹{item.emiStartingAt || Math.round(item.price / 6)}/mo</span>
                      </span>
                    )}

                    {/* Food Combos or BxGy tags */}
                    {item.offerTag && (
                      <span className="px-1.5 py-0.2 bg-rose-50 text-rose-700 font-extrabold rounded text-[10px]">
                        {item.offerTag}
                      </span>
                    )}
                  </div>

                  {/* Hotel Stay Specification Pill */}
                  {item.bookingDetails && (
                    <div className="text-[10px] text-teal-900 bg-teal-50 border border-teal-200/80 p-2.5 rounded-xl space-y-1 mt-1">
                      <div className="font-extrabold flex flex-wrap items-center gap-1.5 text-teal-800">
                        <Calendar className="w-3.5 h-3.5 text-teal-700" />
                        <span>Stay:</span>
                        <span>{item.bookingDetails.checkInDate || item.bookingDetails.date} → {item.bookingDetails.checkOutDate || 'Next Day'}</span>
                        <span className="bg-teal-200/60 text-teal-950 px-1.5 py-0.2 rounded font-extrabold text-[9px]">
                          {item.bookingDetails.totalNights || 1} Night{(item.bookingDetails.totalNights || 1) > 1 ? 's' : ''}
                        </span>
                      </div>
                      <div className="text-gray-600 font-semibold">
                        {item.bookingDetails.adults || 2} Persons ({item.bookingDetails.rooms || 1} Room)
                        {item.bookingDetails.timeSlot && ` • Arrival Slot: ${item.bookingDetails.timeSlot}`}
                      </div>
                      <div className="text-teal-900 font-bold text-[10px]">
                        ₹{item.pricePerNight || item.price}/night base rate • Front-desk check-in
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Quantity Stepper & Price */}
              <div className="flex items-center justify-between sm:justify-end gap-4 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-50">
                {!isHotel ? (
                  <div className="flex items-center bg-gray-100 rounded-xl overflow-hidden text-xs">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2.5 py-1.5 hover:bg-gray-200 text-gray-700 transition"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 font-bold text-gray-900">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2.5 py-1.5 hover:bg-gray-200 text-gray-700 transition"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <span className="text-[11px] font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-lg">
                    1 Reservation
                  </span>
                )}

                <div className="text-right min-w-[70px]">
                  <div className="font-extrabold text-base text-gray-900">
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

