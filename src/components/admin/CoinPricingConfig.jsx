import React from 'react';
import { Coins } from 'lucide-react';

export const CoinPricingConfig = ({ formData, handleChange }) => {
  return (
    <div className="space-y-5">
      <h3 className="font-extrabold text-base text-gray-900 pb-2 border-b border-gray-100 flex items-center gap-2">
        <Coins className="w-5 h-5 text-amber-500" />
        <span>Vendor Coin Packs & Template Usage Costs (Page 8)</span>
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-gray-700 mb-1">Coin Pack Size (coins)</label>
          <input
            type="number"
            value={formData.coinPackSize}
            onChange={(e) => handleChange('coinPackSize', Number(e.target.value))}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-bold text-gray-900"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Coin Pack Price (₹)</label>
          <input
            type="number"
            value={formData.coinPackPrice}
            onChange={(e) => handleChange('coinPackPrice', Number(e.target.value))}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-bold text-gray-900"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Coins Per Template Use</label>
          <input
            type="number"
            value={formData.coinsPerTemplateUse}
            onChange={(e) => handleChange('coinsPerTemplateUse', Number(e.target.value))}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-bold text-gray-900"
          />
        </div>
      </div>
    </div>
  );
};

