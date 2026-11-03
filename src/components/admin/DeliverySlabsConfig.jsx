import React from 'react';
import { Truck } from 'lucide-react';

export const DeliverySlabsConfig = ({ formData, handleChange }) => {
  return (
    <div className="space-y-5">
      <h3 className="font-extrabold text-base text-gray-900 pb-2 border-b border-gray-100 flex items-center gap-2">
        <Truck className="w-5 h-5 text-emerald-700" />
        <span>Distance Slabs [0 to X], [X to Y], [Y+] (Page 5 & 8)</span>
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-gray-700 mb-1">Distance Slab X (km)</label>
          <input
            type="number"
            value={formData.distanceSlabX}
            onChange={(e) => handleChange('distanceSlabX', Number(e.target.value))}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-bold text-gray-900"
          />
          <span className="text-[10px] text-gray-400">First slab range: 0 to X km</span>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Slab 1 Fee (₹) [0 to X km]</label>
          <input
            type="number"
            value={formData.slab1Fee}
            onChange={(e) => handleChange('slab1Fee', Number(e.target.value))}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-bold text-gray-900"
          />
          <span className="text-[10px] text-gray-400">Example in PDF: ₹20</span>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Distance Slab Y (km)</label>
          <input
            type="number"
            value={formData.distanceSlabY}
            onChange={(e) => handleChange('distanceSlabY', Number(e.target.value))}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-bold text-gray-900"
          />
          <span className="text-[10px] text-gray-400">Second slab: X to Y km</span>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Slab 2 Fee (₹) [X to Y km]</label>
          <input
            type="number"
            value={formData.slab2Fee}
            onChange={(e) => handleChange('slab2Fee', Number(e.target.value))}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-bold text-gray-900"
          />
          <span className="text-[10px] text-gray-400">Example in PDF: ₹35</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <div>
          <label className="block text-gray-700 mb-1">Slab 3 Base Fee (₹) [Y+ km]</label>
          <input
            type="number"
            value={formData.slab3Fee}
            onChange={(e) => handleChange('slab3Fee', Number(e.target.value))}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-bold text-gray-900"
          />
          <span className="text-[10px] text-gray-400">Example in PDF: ₹60</span>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Per-KM Rate beyond Y (₹/km)</label>
          <input
            type="number"
            value={formData.perKmRateBeyondY}
            onChange={(e) => handleChange('perKmRateBeyondY', Number(e.target.value))}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-bold text-gray-900"
          />
          <span className="text-[10px] text-gray-400">Rate for long-distance deliveries</span>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Burlamart Dedicated Delivery Fee (₹)</label>
          <input
            type="number"
            value={formData.burlamartDeliveryFee}
            onChange={(e) => handleChange('burlamartDeliveryFee', Number(e.target.value))}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-bold text-gray-900"
          />
          <span className="text-[10px] text-gray-400">Standard logistics partner fee</span>
        </div>
      </div>
    </div>
  );
};

