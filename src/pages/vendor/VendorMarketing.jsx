import React, { useState } from 'react';
import { 
  MessageSquare, 
  Instagram, 
  BarChart3, 
  TrendingUp, 
  Search, 
  Eye, 
  FileSpreadsheet, 
  Send, 
  Check 
} from 'lucide-react';

export const VendorMarketing = () => {
  const [waMessage, setWaMessage] = useState('🌟 Weekend Special: 20% off all dairy and fresh vegetables at Fresh Supermart! Order now on Burlamart.');
  const [igCampaign, setIgCampaign] = useState('Festive season kitchen essentials fresh arrivals!');
  const [broadcastSentNotice, setBroadcastSentNotice] = useState(null);

  const handleSendBroadcast = (channel) => {
    setBroadcastSentNotice(`Campaign queued for dispatch across 450 verified local customers on ${channel}!`);
    setTimeout(() => setBroadcastSentNotice(null), 3500);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded">
          Section 8.6 & Page 7
        </span>
        <h2 className="text-xl font-extrabold text-gray-900 mt-1">
          Marketing Broadcasts & Hyperlocal Demand Insights
        </h2>
        <p className="text-xs text-gray-500">
          Reach nearby customers through WhatsApp broadcast packs, Instagram campaigns, and analyze local search trends.
        </p>
      </div>

      {broadcastSentNotice && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-2xl p-4 text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-700" />
          <span>{broadcastSentNotice}</span>
        </div>
      )}

      {/* Broadcast Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* WhatsApp Broadcast */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
              <MessageSquare className="w-4 h-4 text-emerald-700" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-gray-900">WhatsApp Broadcast Blast</h3>
              <p className="text-[11px] text-gray-400">Direct message to your store's loyal buyers</p>
            </div>
          </div>

          <textarea
            rows={3}
            value={waMessage}
            onChange={(e) => setWaMessage(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 font-medium outline-none focus:border-emerald-600"
          />

          <div className="flex items-center justify-between text-[11px]">
            <span className="text-gray-500">Credits: 1 Pack Available (Cost: ₹299)</span>
            <button
              onClick={() => handleSendBroadcast('WhatsApp')}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold flex items-center gap-1.5 shadow-sm transition"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send Broadcast</span>
            </button>
          </div>
        </div>

        {/* Instagram Broadcast */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-pink-100 text-pink-800 flex items-center justify-center font-bold">
              <Instagram className="w-4 h-4 text-pink-700" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-gray-900">Instagram Local Story Promotion</h3>
              <p className="text-[11px] text-gray-400">Geo-targeted sponsored post in 3km radius</p>
            </div>
          </div>

          <textarea
            rows={3}
            value={igCampaign}
            onChange={(e) => setIgCampaign(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 font-medium outline-none focus:border-pink-600"
          />

          <div className="flex items-center justify-between text-[11px]">
            <span className="text-gray-500">Estimated Reach: ~3,200 local feeds</span>
            <button
              onClick={() => handleSendBroadcast('Instagram')}
              className="px-4 py-2 bg-pink-700 hover:bg-pink-800 text-white rounded-xl font-bold flex items-center gap-1.5 shadow-sm transition"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Launch Promo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Demand & Search Insights */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4 text-xs">
        <h3 className="font-extrabold text-base text-gray-900 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-emerald-700" />
          <span>Local Area Demand & Search Trends</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-1">
            <div className="text-[11px] text-gray-500 flex items-center gap-1">
              <Search className="w-3.5 h-3.5 text-blue-600" /> Top Searched Item
            </div>
            <div className="font-extrabold text-sm text-gray-900">Fresh Desi Tomatoes</div>
            <div className="text-[11px] text-emerald-700 font-bold">+42% search volume today</div>
          </div>

          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-1">
            <div className="text-[11px] text-gray-500 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-amber-600" /> High Demand Gap
            </div>
            <div className="font-extrabold text-sm text-gray-900">A2 Cow Ghee (500ml)</div>
            <div className="text-[11px] text-amber-800 font-semibold">Stock running low in 2km radius</div>
          </div>

          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-1">
            <div className="text-[11px] text-gray-500 flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-purple-600" /> Peak Browsing Hour
            </div>
            <div className="font-extrabold text-sm text-gray-900">07:00 PM – 09:30 PM</div>
            <div className="text-[11px] text-purple-700 font-semibold">320 orders per hour avg</div>
          </div>
        </div>
      </div>
    </div>
  );
};

