import React, { useState } from 'react';
import { Tag, Sparkles, Percent, Gift, Plus, Check } from 'lucide-react';

export const VendorOffers = () => {
  const [offers, setOffers] = useState([
    { id: 'off-1', type: 'BxGy', title: 'Buy 2 Get 1 Free on Desi Farm Tomatoes', status: 'Active', usedCount: 34 },
    { id: 'off-2', type: 'Combo', title: 'Sunday Morning Breakfast Combo (Eggs + Milk) at ₹115', status: 'Active', usedCount: 78 },
    { id: 'off-3', type: 'Smart Deal', title: 'Flat ₹50 OFF on orders above ₹499', status: 'Active', usedCount: 112 },
    { id: 'off-4', type: 'Spin Rule', title: '10% Extra Reward Coin Chance on Organic Atta', status: 'Active', usedCount: 19 }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [offerType, setOfferType] = useState('BxGy');
  const [offerTitle, setOfferTitle] = useState('');
  const [toast, setToast] = useState(null);

  const handleCreateOffer = (e) => {
    e.preventDefault();
    const newOffer = {
      id: `off-${Date.now()}`,
      type: offerType,
      title: offerTitle,
      status: 'Active',
      usedCount: 0
    };
    setOffers([newOffer, ...offers]);
    setShowModal(false);
    setOfferTitle('');
    setToast('Promotional offer created and live across customer store!');
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded">
            Section 8.5 & Page 7
          </span>
          <h2 className="text-xl font-extrabold text-gray-900 mt-1">
            Offers, BxGy, Combos & Shared Rewards
          </h2>
          <p className="text-xs text-gray-500">
            Create Buy X Get Y deals, snack combos, and configure spin or item reward rules.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-[#1B4332] hover:bg-[#2D6A4F] text-white rounded-xl text-xs font-bold shadow-xs transition flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Offer</span>
        </button>
      </div>

      {toast && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-2xl p-4 text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-700" />
          <span>{toast}</span>
        </div>
      )}

      {/* Offers List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {offers.map(off => (
          <div key={off.id} className="bg-white rounded-3xl p-5 border border-gray-200 shadow-xs space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-900">
                  {off.type}
                </span>
                <span className="text-[11px] font-bold text-emerald-700">● {off.status}</span>
              </div>
              <h4 className="font-extrabold text-sm text-gray-900 leading-snug">{off.title}</h4>
            </div>

            <div className="pt-2 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
              <span>Redeemed {off.usedCount} times</span>
              <button
                onClick={() => {
                  setOffers(offers.filter(o => o.id !== off.id));
                  setToast('Offer paused / removed.');
                  setTimeout(() => setToast(null), 3000);
                }}
                className="text-rose-600 hover:underline font-bold"
              >
                End Offer
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal to create offer */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-200 space-y-4 text-xs">
            <h3 className="font-extrabold text-base text-gray-900">Launch New Promotional Offer</h3>
            <form onSubmit={handleCreateOffer} className="space-y-3 font-semibold">
              <div>
                <label className="block text-gray-700 mb-1">Offer Mechanism</label>
                <select
                  value={offerType}
                  onChange={(e) => setOfferType(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 outline-none"
                >
                  <option value="BxGy">Buy X Get Y (BxGy Free Offer)</option>
                  <option value="Combo">Multi-Item Combo Bundle</option>
                  <option value="Smart Deal">Smart Discount Deal (Flat / %)</option>
                  <option value="Spin Rule">Spin Wheel Reward Bonus</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Offer Title & Customer Headline</label>
                <input
                  type="text"
                  required
                  placeholder="E.g., Buy 1 Get 1 Free on Dark Choco Cookies"
                  value={offerTitle}
                  onChange={(e) => setOfferTitle(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2 border rounded-xl font-bold text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-[#1B4332] text-white rounded-xl font-bold"
                >
                  Publish Deal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

