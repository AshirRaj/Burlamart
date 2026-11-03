import React from 'react';
import { Coins, QrCode, CreditCard, Banknote, CalendarCheck, ShieldCheck } from 'lucide-react';

export const CheckoutPayment = ({
  isHotelStay,
  selectedPayment,
  setSelectedPayment,
  useWalletOffset,
  setUseWalletOffset,
  sharedWalletBalance,
  isEmiEligible,
  selectedEmiTenure,
  setSelectedEmiTenure,
  finalPayable
}) => {
  return (
    <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm space-y-4">
      <h3 className="font-extrabold text-base text-gray-900 flex items-center gap-2">
        <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-bold">
          3
        </span>
        <span>Payment Method</span>
      </h3>

      {/* Shared Wallet Redemption Option */}
      {sharedWalletBalance > 0 && (
        <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Coins className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <div>
              <span className="font-bold text-emerald-950">Redeem Shared Rewards Balance</span>
              <p className="text-[11px] text-emerald-700">Available: ₹{sharedWalletBalance} (Universal cross-category reward)</p>
            </div>
          </div>
          <input
            type="checkbox"
            checked={useWalletOffset}
            onChange={(e) => setUseWalletOffset(e.target.checked)}
            className="w-4 h-4 accent-emerald-700"
          />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        {/* UPI */}
        <label className={`p-3.5 rounded-2xl border cursor-pointer flex items-center gap-3 transition ${
          selectedPayment === 'UPI' ? 'border-emerald-700 bg-emerald-50/50 font-bold' : 'border-gray-200'
        }`}>
          <input
            type="radio"
            name="payment"
            checked={selectedPayment === 'UPI'}
            onChange={() => setSelectedPayment('UPI')}
            className="accent-emerald-700"
          />
          <div>
            <div className="text-gray-900 font-bold flex items-center gap-1.5">
              <QrCode className="w-3.5 h-3.5 text-emerald-700" />
              <span>UPI (Instant Confirmation)</span>
            </div>
            <div className="text-[11px] text-gray-500">Google Pay, PhonePe, Paytm, BHIM</div>
          </div>
        </label>

        {/* Cards */}
        <label className={`p-3.5 rounded-2xl border cursor-pointer flex items-center gap-3 transition ${
          selectedPayment === 'CARD' ? 'border-emerald-700 bg-emerald-50/50 font-bold' : 'border-gray-200'
        }`}>
          <input
            type="radio"
            name="payment"
            checked={selectedPayment === 'CARD'}
            onChange={() => setSelectedPayment('CARD')}
            className="accent-emerald-700"
          />
          <div>
            <div className="text-gray-900 font-bold flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-blue-700" />
              <span>Credit / Debit Card</span>
            </div>
            <div className="text-[11px] text-gray-500">Visa, Mastercard, RuPay, Amex</div>
          </div>
        </label>

        {/* Pay on Delivery / Pay at Hotel */}
        <label className={`p-3.5 rounded-2xl border cursor-pointer flex items-center gap-3 transition ${
          selectedPayment === 'COD' ? 'border-emerald-700 bg-emerald-50/50 font-bold' : 'border-gray-200'
        }`}>
          <input
            type="radio"
            name="payment"
            checked={selectedPayment === 'COD'}
            onChange={() => setSelectedPayment('COD')}
            className="accent-emerald-700"
          />
          <div>
            <div className="text-gray-900 font-bold flex items-center gap-1.5">
              <Banknote className="w-3.5 h-3.5 text-emerald-700" />
              <span>{isHotelStay ? 'Pay at Front-Desk (Pay on Arrival)' : 'Cash on Delivery (COD)'}</span>
            </div>
            <div className="text-[11px] text-gray-500">
              {isHotelStay
                ? 'Pay via cash, UPI, or card when you check into the hotel'
                : 'Supports split cash + UPI payment to delivery rider'}
            </div>
          </div>
        </label>

        {/* EMI Option - only for eligible categories (e.g. high-value electronics) */}
        {!isHotelStay && (
          <label className={`p-3.5 rounded-2xl border transition ${
            !isEmiEligible ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'cursor-pointer'
          } ${selectedPayment === 'EMI' ? 'border-emerald-700 bg-emerald-50/50 font-bold' : 'border-gray-200'}`}>
            <div className="flex items-center gap-3">
              <input
                type="radio"
                name="payment"
                disabled={!isEmiEligible}
                checked={selectedPayment === 'EMI'}
                onChange={() => setSelectedPayment('EMI')}
                className="accent-emerald-700"
              />
              <div>
                <div className="text-gray-900 font-bold flex items-center gap-1.5">
                  <CalendarCheck className="w-3.5 h-3.5 text-purple-700" />
                  <span>No-Cost EMI</span>
                </div>
                <div className="text-[11px] text-gray-500">
                  {isEmiEligible ? 'Eligible on electronics over ₹3,000' : 'Requires eligible electronics'}
                </div>
              </div>
            </div>

            {isEmiEligible && selectedPayment === 'EMI' && (
              <div className="mt-2 pt-2 border-t border-gray-200">
                <span className="text-[10px] font-bold text-gray-500">Select EMI Tenure:</span>
                <div className="flex gap-1.5 mt-1 flex-wrap">
                  {[3, 6, 9, 12].map(m => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setSelectedEmiTenure(m)}
                      className={`px-2 py-1 rounded text-[10px] font-bold ${
                        selectedEmiTenure === m ? 'bg-emerald-800 text-white' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {m}M (₹{Math.round(finalPayable / m)}/mo)
                    </button>
                  ))}
                </div>
              </div>
            )}
          </label>
        )}
      </div>
    </div>
  );
};

