import React, { useState } from 'react';
import { X, CreditCard, ShieldCheck, Check, Sparkles } from 'lucide-react';

export const AmazonEmiModal = ({ product, onClose }) => {
  if (!product) return null;

  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const price = product.price || 9999;

  const banks = [
    { name: 'HDFC Bank', hasNoCost: true },
    { name: 'ICICI Bank', hasNoCost: true },
    { name: 'SBI Card', hasNoCost: true },
    { name: 'Axis Bank', hasNoCost: true },
    { name: 'Amazon Pay ICICI', hasNoCost: true }
  ];

  const emiPlans = [
    { months: 3, isNoCost: true, interestRate: 0 },
    { months: 6, isNoCost: true, interestRate: 0 },
    { months: 9, isNoCost: false, interestRate: 14 },
    { months: 12, isNoCost: false, interestRate: 15 },
    { months: 24, isNoCost: false, interestRate: 16 }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#131921] text-white p-5 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-bold text-base text-white">
                EMI Payment Options & No Cost EMI
              </h3>
              <p className="text-xs text-gray-400">
                Product: <span className="text-gray-200 font-semibold">{product.name}</span> (₹{price.toLocaleString('en-IN')})
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Bank Selection Tabs */}
        <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {banks.map((b) => (
            <button
              key={b.name}
              type="button"
              onClick={() => setSelectedBank(b.name)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 flex-shrink-0 ${
                selectedBank === b.name
                  ? 'bg-[#131921] text-white shadow-xs'
                  : 'bg-white hover:bg-gray-100 text-gray-700 border border-gray-200'
              }`}
            >
              <span>{b.name}</span>
              {b.hasNoCost && (
                <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-black">
                  No Cost
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Plans Table */}
        <div className="p-5 overflow-y-auto space-y-4">
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 flex items-center gap-2.5 text-xs text-emerald-900">
            <Sparkles className="w-4 h-4 text-emerald-700 flex-shrink-0" />
            <span>
              <strong>No Cost EMI Available:</strong> Zero interest and zero processing fee on 3 and 6-month tenures with {selectedBank}!
            </span>
          </div>

          <div className="border border-gray-200 rounded-2xl overflow-hidden text-xs">
            <div className="grid grid-cols-4 bg-gray-100 p-3 font-bold text-gray-700">
              <span>EMI Tenure</span>
              <span>Monthly EMI</span>
              <span>Interest Rate</span>
              <span className="text-right">Total Cost</span>
            </div>

            <div className="divide-y divide-gray-100">
              {emiPlans.map((plan) => {
                const monthly = plan.isNoCost 
                  ? Math.round(price / plan.months)
                  : Math.round((price * (1 + (plan.interestRate / 100) * (plan.months / 12))) / plan.months);
                const totalCost = monthly * plan.months;

                return (
                  <div key={plan.months} className="grid grid-cols-4 p-3 items-center hover:bg-gray-50/80 transition">
                    <div>
                      <span className="font-bold text-gray-900">{plan.months} Months</span>
                      {plan.isNoCost && (
                        <span className="block text-[10px] text-emerald-700 font-extrabold">No Cost EMI</span>
                      )}
                    </div>
                    <span className="font-black text-gray-900">₹{monthly.toLocaleString('en-IN')}/mo</span>
                    <span className="text-gray-600">{plan.isNoCost ? '0% (Free)' : `${plan.interestRate}% p.a.`}</span>
                    <span className="text-right font-bold text-gray-900">₹{totalCost.toLocaleString('en-IN')}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="text-[11px] text-gray-400">
            *Bank charges and standard terms apply. The bank will convert your payment into EMI within 3-4 working days of order placement.
          </p>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-[#131921] hover:bg-black text-white text-xs font-bold rounded-xl transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

