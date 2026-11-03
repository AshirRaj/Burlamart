import React from 'react';
import { Package } from 'lucide-react';

export const CartExtrasConfig = ({ formData, handleChange }) => {
  return (
    <div className="space-y-5">
      <h3 className="font-extrabold text-base text-gray-900 pb-2 border-b border-gray-100 flex items-center gap-2">
        <Package className="w-5 h-5 text-emerald-700" />
        <span>Weight Extras, Quantity Surcharges & Packaging Limits (Page 5 & 8)</span>
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-gray-700 mb-1">Weight Threshold (kg)</label>
          <input
            type="number"
            value={formData.weightThresholdKg}
            onChange={(e) => handleChange('weightThresholdKg', Number(e.target.value))}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-bold text-gray-900"
          />
          <span className="text-[10px] text-gray-400">Free threshold (e.g. 5kg)</span>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Extra Charge Per KG (₹)</label>
          <input
            type="number"
            value={formData.weightExtraPerKg}
            onChange={(e) => handleChange('weightExtraPerKg', Number(e.target.value))}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-bold text-gray-900"
          />
          <span className="text-[10px] text-gray-400">Per kg above threshold</span>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Quantity Threshold (items)</label>
          <input
            type="number"
            value={formData.quantityThreshold}
            onChange={(e) => handleChange('quantityThreshold', Number(e.target.value))}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-bold text-gray-900"
          />
          <span className="text-[10px] text-gray-400">Big cart threshold</span>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Quantity Surcharge (₹ / item)</label>
          <input
            type="number"
            value={formData.quantityExtraPerItem}
            onChange={(e) => handleChange('quantityExtraPerItem', Number(e.target.value))}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-bold text-gray-900"
          />
          <span className="text-[10px] text-gray-400">Per item above threshold</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
        <div>
          <label className="block text-gray-700 mb-1">Standard Packaging Fee (₹)</label>
          <input
            type="number"
            value={formData.packagingCharge}
            onChange={(e) => handleChange('packagingCharge', Number(e.target.value))}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-bold text-gray-900"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Mandatory Packaging Weight W (kg)</label>
          <input
            type="number"
            value={formData.mandatoryPackagingWeightW}
            onChange={(e) => handleChange('mandatoryPackagingWeightW', Number(e.target.value))}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-bold text-purple-900"
          />
          <span className="text-[10px] text-gray-400">Requirement: mandatory above W</span>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Fast Delivery Fee (₹)</label>
          <input
            type="number"
            value={formData.fastDeliveryFee}
            onChange={(e) => handleChange('fastDeliveryFee', Number(e.target.value))}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-bold text-gray-900"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Fast Delivery Distance Radius R (km)</label>
          <input
            type="number"
            value={formData.fastDeliveryMaxDistanceR}
            onChange={(e) => handleChange('fastDeliveryMaxDistanceR', Number(e.target.value))}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-bold text-purple-900"
          />
          <span className="text-[10px] text-gray-400">Requirement: only within R km</span>
        </div>
      </div>
    </div>
  );
};

