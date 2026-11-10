import React, { useState } from 'react';
import { Calendar, BedDouble, Clock, Check, AlertCircle, Users, Sparkles } from 'lucide-react';

const DEFAULT_ROOMS = [
  { id: 'rm-101', name: 'Deluxe AC Room • 101', type: 'Deluxe', price: 1199, capacity: '2 Adults, 1 Child' },
  { id: 'rm-102', name: 'Executive Suite • 204', type: 'Suite', price: 1899, capacity: '3 Adults' },
  { id: 'rm-103', name: 'Family Lakeview Wing • 301', type: 'Family', price: 2499, capacity: '4 Adults' },
  { id: 'rm-104', name: 'Transit Day-Use Pod • 105', type: 'Day-Use', price: 599, capacity: '2 Adults' }
];

const TIME_SLOTS = ['10:00 AM (Early)', '12:00 PM (Standard)', '03:00 PM', '06:00 PM', '09:00 PM (Late)'];

export const VendorHotelCalendar = ({ shopName, onNotify }) => {
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [availability, setAvailability] = useState(() => {
    try {
      const saved = localStorage.getItem('burlamart_hotel_slots');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const getSlotStatus = (roomId, slot) => {
    const key = `${selectedDate}_${roomId}_${slot}`;
    return availability[key] || 'Available';
  };

  const cycleSlotStatus = (roomId, slot) => {
    const order = ['Available', 'Booked', 'Blocked'];
    const current = getSlotStatus(roomId, slot);
    const next = order[(order.indexOf(current) + 1) % order.length];
    const key = `${selectedDate}_${roomId}_${slot}`;
    const updated = { ...availability, [key]: next };
    setAvailability(updated);
    localStorage.setItem('burlamart_hotel_slots', JSON.stringify(updated));
    if (onNotify) onNotify(`Updated ${slot} to "${next}" for ${selectedDate}`);
  };

  const getBadgeStyle = (status) => {
    if (status === 'Booked') return 'bg-rose-50 text-rose-700 border-rose-200';
    if (status === 'Blocked') return 'bg-amber-50 text-amber-800 border-amber-200';
    return 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100';
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200 shadow-sm space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-[#e01933] bg-red-50 px-2.5 py-0.5 rounded-full">
            Hotel & Stay Inventory Mode
          </span>
          <h3 className="text-lg font-extrabold text-gray-900 mt-1 flex items-center gap-2">
            <BedDouble className="w-5 h-5 text-[#1B4332]" />
            <span>Room Calendar & Check-In Slot Matrix</span>
          </h3>
          <p className="text-xs text-gray-500">
            Click any check-in slot for <strong className="text-gray-800">{shopName}</strong> to toggle between Available, Booked, and Blocked.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-emerald-700" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-800 focus:outline-none focus:border-emerald-600"
          />
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold">
        <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1">
          <Check className="w-3 h-3" /> Available
        </span>
        <span className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
          <Users className="w-3 h-3" /> Guest Checked-In / Booked
        </span>
        <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" /> Maintenance Blocked
        </span>
      </div>

      {/* Room Slot Matrix */}
      <div className="space-y-4">
        {DEFAULT_ROOMS.map((room) => (
          <div key={room.id} className="p-4 rounded-2xl border border-gray-200 bg-[#FAF8F5] space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="font-extrabold text-sm text-gray-900">{room.name}</h4>
                <span className="text-[11px] text-gray-500">{room.type} • {room.capacity}</span>
              </div>
              <span className="font-black text-sm text-[#1B4332]">₹{room.price} / night</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {TIME_SLOTS.map((slot) => {
                const status = getSlotStatus(room.id, slot);
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => cycleSlotStatus(room.id, slot)}
                    className={`p-2.5 rounded-xl border text-left transition active:scale-95 cursor-pointer ${getBadgeStyle(status)}`}
                  >
                    <div className="flex items-center gap-1 text-[10px] font-semibold opacity-80">
                      <Clock className="w-3 h-3" />
                      <span className="truncate">{slot}</span>
                    </div>
                    <div className="text-xs font-extrabold mt-0.5">{status}</div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

