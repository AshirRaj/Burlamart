import React from 'react';
import { X, Sparkles, Bookmark } from 'lucide-react';

export const SaveComboModal = ({
  isOpen,
  onClose,
  comboName,
  setComboName,
  onSaveCombo,
  subtotal
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-scaleUp">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
              <Bookmark className="w-4 h-4 text-emerald-700" />
            </div>
            <h3 className="font-extrabold text-base text-gray-900">
              Save as My Combo
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-gray-600 leading-relaxed">
          Give this cart combination a custom name (e.g. <em>"Sunday Biryani Feast"</em>, <em>"Monthly Groceries"</em>, or <em>"Weekend Getaway Stays"</em>).
        </p>

        <div>
          <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
            Combo Name
          </label>
          <input
            type="text"
            value={comboName}
            onChange={(e) => setComboName(e.target.value)}
            placeholder="My Custom Combo"
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 font-bold text-sm text-gray-900 outline-none focus:border-emerald-600 focus:bg-white"
            autoFocus
          />
        </div>

        <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100 text-xs font-bold">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSaveCombo}
            className="px-5 py-2.5 bg-[#1B4332] hover:bg-[#2D6A4F] text-white rounded-xl shadow-md transition flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Save Combo (₹{subtotal})</span>
          </button>
        </div>
      </div>
    </div>
  );
};

