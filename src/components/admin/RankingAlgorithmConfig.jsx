import React from 'react';
import { Scale } from 'lucide-react';

export const RankingAlgorithmConfig = ({ formData, setFormData, handleChange }) => {
  return (
    <div className="space-y-5">
      <h3 className="font-extrabold text-base text-gray-900 pb-2 border-b border-gray-100 flex items-center gap-2">
        <Scale className="w-5 h-5 text-purple-700" />
        <span>Price vs Distance Ranking Weights (Page 4 & 8)</span>
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-gray-700 mb-1">Distance Weight (%)</label>
          <input
            type="number"
            value={formData.distanceWeight}
            onChange={(e) => {
              const d = Number(e.target.value);
              setFormData(prev => ({ ...prev, distanceWeight: d, priceWeight: 100 - d }));
            }}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-bold text-gray-900"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Price Weight (%)</label>
          <input
            type="number"
            disabled
            value={formData.priceWeight}
            className="w-full bg-gray-100 border border-gray-200 rounded-xl p-2.5 font-bold text-gray-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Delivery Radius (km)</label>
          <input
            type="number"
            value={formData.deliveryRadiusKm}
            onChange={(e) => handleChange('deliveryRadiusKm', Number(e.target.value))}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-bold text-gray-900"
          />
        </div>
      </div>
    </div>
  );
};

