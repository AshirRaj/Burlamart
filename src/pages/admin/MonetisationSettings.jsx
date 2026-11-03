import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  DollarSign, 
  Store, 
  Users, 
  Sparkles, 
  Save, 
  Check, 
  TrendingUp,
  Percent,
  BadgePercent
} from 'lucide-react';

export const MonetisationSettings = () => {
  const { platformSettings, updateSettings } = useApp();
  const [formData, setFormData] = useState({
    orderCommissionPct: platformSettings.orderCommissionPct || 5.5,
    membershipMonthlyFee: platformSettings.membershipMonthlyFee || 99,
    serviceBookingFee: platformSettings.serviceBookingFee || 49,
    broadcastPackPrice: platformSettings.broadcastPackPrice || 299,
    premiumShopListingFee: platformSettings.premiumShopListingFee || 999,
  });

  const [toast, setToast] = useState(null);

  const handleSave = async (e) => {
    e.preventDefault();
    await updateSettings(formData, 'SuperAdmin');
    setToast('Monetisation rates and commission percentages saved successfully!');
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <span className="text-[11px] font-bold text-purple-900 uppercase tracking-wider bg-purple-100 px-2.5 py-0.5 rounded">
          Section 13 & Page 11 Requirements
        </span>
        <h2 className="text-xl font-extrabold text-gray-900 mt-1">
          Monetisation Engine & Revenue Settings
        </h2>
        <p className="text-xs text-gray-500">
          Control platform commission rates, Burlamart Pass customer membership pricing, broadcast pack fees, and sponsored brand fees.
        </p>
      </div>

      {toast && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-2xl p-4 text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-700" />
          <span>{toast}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* 1. From Vendors (Page 11) */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4 text-xs font-semibold">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <Store className="w-4 h-4 text-emerald-700" />
            <h3 className="font-extrabold text-sm text-gray-900">Revenue From Vendors</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Platform Order Commission (%)</label>
              <input
                type="number"
                step="0.1"
                value={formData.orderCommissionPct}
                onChange={(e) => setFormData({ ...formData, orderCommissionPct: Number(e.target.value) })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-bold text-gray-900"
              />
              <span className="text-[10px] text-gray-400">Admin-set take rate on vendor orders</span>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">WhatsApp Broadcast Pack Price (₹)</label>
              <input
                type="number"
                value={formData.broadcastPackPrice}
                onChange={(e) => setFormData({ ...formData, broadcastPackPrice: Number(e.target.value) })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-bold text-gray-900"
              />
              <span className="text-[10px] text-gray-400">Cost for 500 promotional messages</span>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Premium Shop Featured Slot (₹/mo)</label>
              <input
                type="number"
                value={formData.premiumShopListingFee}
                onChange={(e) => setFormData({ ...formData, premiumShopListingFee: Number(e.target.value) })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-bold text-gray-900"
              />
              <span className="text-[10px] text-gray-400">Homepage prime positioning fee</span>
            </div>
          </div>
        </div>

        {/* 2. From Customers (Page 11) */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4 text-xs font-semibold">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
            <Users className="w-4 h-4 text-blue-700" />
            <h3 className="font-extrabold text-sm text-gray-900">Revenue From Customers</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Burlamart Pass Membership (₹/month)</label>
              <input
                type="number"
                value={formData.membershipMonthlyFee}
                onChange={(e) => setFormData({ ...formData, membershipMonthlyFee: Number(e.target.value) })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-bold text-gray-900"
              />
              <span className="text-[10px] text-gray-400">Unlocks free delivery & 2x reward points</span>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Service Appointment Booking Convenience Fee (₹)</label>
              <input
                type="number"
                value={formData.serviceBookingFee}
                onChange={(e) => setFormData({ ...formData, serviceBookingFee: Number(e.target.value) })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-bold text-gray-900"
              />
              <span className="text-[10px] text-gray-400">Convenience fee on hotel & salon slots</span>
            </div>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-[#1B4332] hover:bg-[#2D6A4F] text-white rounded-2xl font-bold text-xs shadow-md transition flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Monetisation Rates</span>
          </button>
        </div>
      </form>
    </div>
  );
};

