import React from 'react';
import { Receipt } from 'lucide-react';

export const RiderSplitPaymentModal = ({
  cashAmount,
  setCashAmount,
  upiAmount,
  setUpiAmount,
  onConfirm,
  onCancel
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 text-white rounded-3xl max-w-sm w-full p-6 border border-slate-700 shadow-2xl space-y-4 text-xs">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
          <Receipt className="w-5 h-5 text-emerald-400" />
          <h3 className="font-extrabold text-sm text-white">Record COD Split Payment (Page 6)</h3>
        </div>

        <p className="text-slate-400">
          Customer can split payment between cash and UPI. Record the exact breakdown:
        </p>

        <form onSubmit={onConfirm} className="space-y-3 font-semibold">
          <div>
            <label className="block text-slate-300 mb-1">Cash Received (₹)</label>
            <input
              type="number"
              required
              value={cashAmount}
              onChange={(e) => setCashAmount(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white outline-none focus:border-emerald-500 font-mono text-sm"
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-1">UPI QR Paid (₹)</label>
            <input
              type="number"
              required
              value={upiAmount}
              onChange={(e) => setUpiAmount(e.target.value)}
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white outline-none focus:border-emerald-500 font-mono text-sm"
            />
          </div>

          <div className="p-3 bg-slate-800 rounded-xl flex justify-between items-center text-xs font-bold">
            <span className="text-slate-400">Total Recorded:</span>
            <span className="text-emerald-400 text-base">₹{Number(cashAmount) + Number(upiAmount)}</span>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-2.5 bg-slate-800 text-slate-400 rounded-xl font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl font-extrabold shadow-md"
            >
              Confirm Split
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

