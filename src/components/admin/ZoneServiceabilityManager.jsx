import React, { useState } from 'react';
import { MapPin, Plus, CheckCircle2, PauseCircle } from 'lucide-react';
import { INITIAL_PLATFORM_SETTINGS } from '../../services/mockData';

export const ZoneServiceabilityManager = ({ formData, handleChange }) => {
  const zones = formData.serviceableZones || INITIAL_PLATFORM_SETTINGS.serviceableZones;
  const [newZoneName, setNewZoneName] = useState('');
  const [newZonePin, setNewZonePin] = useState('');
  const [newZoneRadius, setNewZoneRadius] = useState(8);

  const toggleZone = (id) => {
    const updated = zones.map(z => z.id === id ? { ...z, active: !z.active } : z);
    handleChange('serviceableZones', updated);
  };

  const updateZoneField = (id, field, val) => {
    const updated = zones.map(z => z.id === id ? { ...z, [field]: Number(val) } : z);
    handleChange('serviceableZones', updated);
  };

  const handleAddZone = () => {
    if (!newZoneName.trim() || !newZonePin.trim()) return;
    const newEntry = {
      id: `zone-${Date.now()}`,
      name: newZoneName.trim(),
      pin: newZonePin.trim(),
      active: true,
      radiusKm: Number(newZoneRadius) || 8,
      surgeFee: 0,
      badge: 'New Odisha Hub'
    };
    handleChange('serviceableZones', [...zones, newEntry]);
    setNewZoneName('');
    setNewZonePin('');
  };

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-purple-700" />
          <span>Odisha Cities & Campus Serviceability Zones</span>
        </h3>
        <p className="text-xs text-gray-500 mt-0.5">
          Enable or pause delivery & hotel corridors across Burla, VSSUT Campus, Jyoti Vihar, VIMSAR, Sambalpur, and Hirakud, and control per-zone radius and surge fees.
        </p>
      </div>

      {/* Zones Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {zones.map((zone) => (
          <div
            key={zone.id}
            className={`p-4 rounded-2xl border transition ${
              zone.active
                ? 'bg-emerald-50/40 border-emerald-200'
                : 'bg-gray-50 border-gray-200 opacity-75'
            }`}
          >
            <div className="flex items-start justify-between gap-2 mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm text-gray-900">{zone.name}</span>
                  {zone.badge && (
                    <span className="text-[9px] font-black uppercase bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                      {zone.badge}
                    </span>
                  )}
                </div>
                <span className="text-[11px] font-mono text-gray-500">PIN: {zone.pin}</span>
              </div>

              <button
                type="button"
                onClick={() => toggleZone(zone.id)}
                className={`px-3 py-1 rounded-xl text-[11px] font-extrabold flex items-center gap-1 transition cursor-pointer ${
                  zone.active
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
                }`}
              >
                {zone.active ? <CheckCircle2 className="w-3.5 h-3.5" /> : <PauseCircle className="w-3.5 h-3.5" />}
                <span>{zone.active ? 'Serviceable' : 'Paused'}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-[11px]">
              <div>
                <label className="text-gray-500 font-semibold block mb-1">Max Radius (km)</label>
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={zone.radiusKm}
                  onChange={(e) => updateZoneField(zone.id, 'radiusKm', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-xl border border-gray-200 bg-white font-bold text-gray-900"
                />
              </div>
              <div>
                <label className="text-gray-500 font-semibold block mb-1">Zone Surge Fee (₹)</label>
                <input
                  type="number"
                  min={0}
                  max={200}
                  value={zone.surgeFee}
                  onChange={(e) => updateZoneField(zone.id, 'surgeFee', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-xl border border-gray-200 bg-white font-bold text-gray-900"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Odisha Zone */}
      <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col sm:flex-row items-stretch sm:items-end gap-3">
        <div className="flex-1">
          <label className="block text-[11px] font-bold text-gray-600 mb-1">New Odisha City / Hub Name</label>
          <input
            type="text"
            value={newZoneName}
            onChange={(e) => setNewZoneName(e.target.value)}
            placeholder="e.g., Bargarh Main Corridor"
            className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white text-xs font-semibold"
          />
        </div>
        <div className="w-full sm:w-32">
          <label className="block text-[11px] font-bold text-gray-600 mb-1">PIN Code</label>
          <input
            type="text"
            value={newZonePin}
            onChange={(e) => setNewZonePin(e.target.value)}
            placeholder="768028"
            className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white text-xs font-mono font-semibold"
          />
        </div>
        <div className="w-full sm:w-28">
          <label className="block text-[11px] font-bold text-gray-600 mb-1">Radius (km)</label>
          <input
            type="number"
            value={newZoneRadius}
            onChange={(e) => setNewZoneRadius(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white text-xs font-semibold"
          />
        </div>
        <button
          type="button"
          onClick={handleAddZone}
          className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Zone</span>
        </button>
      </div>
    </div>
  );
};

