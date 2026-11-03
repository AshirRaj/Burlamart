import React from 'react';
import { Plus, Minus } from 'lucide-react';

export const HotelGuestRoomModal = ({
  rooms,
  onUpdateRoomGuests,
  onAddRoom,
  onDeleteRoom
}) => {
  return (
    <div className="absolute top-full mt-2 right-0 w-72 sm:w-80 bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 z-50 animate-in fade-in zoom-in-95 duration-150">
      {/* Header labels matching reference Image 1 */}
      <div className="flex items-center justify-between pb-3 text-sm font-semibold text-gray-900 border-b border-gray-100">
        <span>Rooms</span>
        <span>Guests</span>
      </div>

      {/* Dynamic Rooms List - Room 1 is always constant */}
      <div className="divide-y divide-gray-100 max-h-64 overflow-y-auto pr-1">
        {rooms.map((room, index) => (
          <div
            key={room.id || index}
            className="flex items-center justify-between py-3.5"
          >
            <span className="font-semibold text-gray-900 text-sm">
              Room {index + 1}
            </span>

            {/* Stepper for how many persons in this room */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => onUpdateRoomGuests(index, Math.max(1, room.guests - 1))}
                disabled={room.guests <= 1}
                className={`w-6 h-6 flex items-center justify-center font-bold text-lg transition ${
                  room.guests <= 1
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-[#0284c7] hover:text-[#0369a1]'
                }`}
                title="Decrease guests in this room"
              >
                <Minus className="w-4 h-4" />
              </button>

              <span className="w-4 text-center font-semibold text-gray-900 text-sm select-none">
                {room.guests}
              </span>

              <button
                type="button"
                onClick={() => onUpdateRoomGuests(index, Math.min(3, room.guests + 1))}
                disabled={room.guests >= 3}
                className={`w-6 h-6 flex items-center justify-center font-bold text-lg transition ${
                  room.guests >= 3
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-[#0284c7] hover:text-[#0369a1]'
                }`}
                title="Add guest to this room"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Action Footer matching reference Image 1 */}
      <div className="flex items-center justify-between pt-4 mt-1 border-t border-gray-100 text-xs font-semibold">
        {/* Delete Room - Grayed out & disabled when only 1 room is present */}
        <button
          type="button"
          onClick={onDeleteRoom}
          disabled={rooms.length <= 1}
          className={`transition ${
            rooms.length <= 1
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-700 hover:text-red-600 cursor-pointer'
          }`}
        >
          Delete Room
        </button>

        {/* Add Room - Adds next room (Room 2, Room 3) with its own guest counter */}
        <button
          type="button"
          onClick={onAddRoom}
          disabled={rooms.length >= 6}
          className={`transition ${
            rooms.length >= 6
              ? 'text-gray-300 cursor-not-allowed'
              : 'text-gray-900 hover:text-black cursor-pointer font-bold'
          }`}
        >
          Add Room
        </button>
      </div>
    </div>
  );
};
