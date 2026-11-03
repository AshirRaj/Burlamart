import React from 'react';
import { Gift } from 'lucide-react';

export const RewardsAndEmiConfig = ({ formData, handleChange }) => {
  return (
    <div className="space-y-5">
      <h3 className="font-extrabold text-base text-gray-900 pb-2 border-b border-gray-100 flex items-center gap-2">
        <Gift className="w-5 h-5 text-amber-500" />
        <span>Shared Reward Funding & No-Cost EMI Categories (Page 8)</span>
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-gray-700 mb-1">Shared Reward Funding (% of Cart)</label>
          <input
            type="number"
            step="0.5"
            value={formData.sharedRewardFundingPct}
            onChange={(e) => handleChange('sharedRewardFundingPct', Number(e.target.value))}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-bold text-gray-900"
          />
          <span className="text-[10px] text-gray-400">Funded into universal shared wallet</span>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Min Order Value for EMI (₹)</label>
          <input
            type="number"
            value={formData.emiMinCartValue}
            onChange={(e) => handleChange('emiMinCartValue', Number(e.target.value))}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-bold text-gray-900"
          />
          <span className="text-[10px] text-gray-400">Threshold for EMI checkout</span>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Reward Points Expiry (Days)</label>
          <input
            type="number"
            value={formData.rewardExpiryDays}
            onChange={(e) => handleChange('rewardExpiryDays', Number(e.target.value))}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-bold text-gray-900"
          />
        </div>
      </div>
    </div>
  );
};

