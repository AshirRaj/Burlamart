import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { Coins, CreditCard, Shield, Users, Check, AlertCircle, Plus } from 'lucide-react';

export const VendorAccount = () => {
  const { vendorCoinBalance, buyVendorCoins, platformSettings } = useApp();
  const { currentUser } = useAuth();
  
  // Calculate shop monthly rent based on platform settings overrides
  const defaultRent = platformSettings.defaultMonthlyRent || 2000;
  const shopRentOverride = platformSettings.vendorRentOverrides?.['shop-1'];
  const effectiveRent = shopRentOverride !== undefined ? shopRentOverride : defaultRent;

  const [rentPaid, setRentPaid] = useState(false);
  const [toast, setToast] = useState(null);

  const [coinLedger] = useState([
    { id: 'tx-1', action: 'Used Grocery Master Template', change: -5, date: '2026-11-01' },
    { id: 'tx-2', action: 'Purchased Standard Coin Pack (100 coins)', change: +100, date: '2026-10-28' },
    { id: 'tx-3', action: 'Product Boost in Search Results', change: -10, date: '2026-10-25' }
  ]);

  const [staffList, setStaffList] = useState([
    { id: 's-1', name: 'Ramesh Sharma', role: 'Store Owner', access: 'Full Admin' },
    { id: 's-2', name: 'Vikas Meena', role: 'Billing Cashier', access: 'POS & Orders Only' },
    { id: 's-3', name: 'Sunil Verma', role: 'Inventory Clerk', access: 'Stock & Barcode Only' }
  ]);

  const handlePayRent = () => {
    setRentPaid(true);
    setToast(`Monthly rent of ₹${effectiveRent} paid successfully! Store active for November 2026.`);
    setTimeout(() => setToast(null), 3500);
  };

  const handleBuyCoinPack = () => {
    buyVendorCoins(100);
    setToast('Added 100 Burlamart Coins to your vendor wallet!');
    setTimeout(() => setToast(null), 3500);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded">
          Section 8.7 & Page 7
        </span>
        <h2 className="text-xl font-extrabold text-gray-900 mt-1">
          Store Rent, Coin Wallet & Staff Permissions
        </h2>
        <p className="text-xs text-gray-500">
          Manage your monthly platform rent, purchase Burlamart coins for templates & product boosts, and manage staff roles.
        </p>
      </div>

      {toast && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-2xl p-4 text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-700" />
          <span>{toast}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Monthly Platform Rent Card */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-emerald-700" />
              <h3 className="font-extrabold text-sm text-gray-900">Monthly Platform Rent</h3>
            </div>
            <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
              rentPaid ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
            }`}>
              {rentPaid ? 'Paid for Nov 2026' : 'Due: 5th Nov 2026'}
            </span>
          </div>

          <div className="bg-gray-50 p-4 rounded-2xl space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="text-gray-500 font-semibold">Standard Monthly Rent:</span>
              <span className="text-gray-400 line-through">₹{defaultRent}</span>
            </div>
            {shopRentOverride && (
              <div className="flex justify-between items-baseline text-emerald-700 font-bold">
                <span>Admin Special Rate Override:</span>
                <span>₹{shopRentOverride} / mo</span>
              </div>
            )}
            <div className="pt-2 border-t border-gray-200 flex justify-between items-baseline">
              <span className="font-extrabold text-gray-900">Payable This Month:</span>
              <span className="font-extrabold text-xl text-gray-900">₹{effectiveRent}</span>
            </div>
          </div>

          <button
            onClick={handlePayRent}
            disabled={rentPaid}
            className={`w-full py-2.5 rounded-xl font-bold transition ${
              rentPaid 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-[#1B4332] text-white hover:bg-[#2D6A4F] shadow-sm'
            }`}
          >
            {rentPaid ? 'Rent Settled' : `Pay ₹${effectiveRent} via UPI / Netbanking`}
          </button>
        </div>

        {/* Vendor Coin Wallet Card */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Coins className="w-5 h-5 text-amber-500" />
              <h3 className="font-extrabold text-sm text-gray-900">Burlamart Coin Wallet</h3>
            </div>
            <span className="font-extrabold text-base text-amber-800 bg-amber-50 px-3 py-0.5 rounded-full">
              {vendorCoinBalance} Coins
            </span>
          </div>

          <p className="text-gray-500">
            Coins are required to import Admin Master Product Templates ({platformSettings.coinsPerTemplateUse} coins/use) and feature products in search boosts.
          </p>

          <div className="p-3 bg-amber-50/60 rounded-2xl border border-amber-200/60 flex items-center justify-between">
            <div>
              <div className="font-bold text-amber-950">Pack of 100 Coins</div>
              <div className="text-[11px] text-amber-700">₹{platformSettings.coinPackPrice} per pack</div>
            </div>
            <button
              onClick={handleBuyCoinPack}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold shadow-xs flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Buy 100 Coins
            </button>
          </div>
        </div>
      </div>

      {/* Staff Roles & Permissions (Page 7) */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4 text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-700" />
            <h3 className="font-extrabold text-base text-gray-900">Staff Roles & Shop Data Isolation</h3>
          </div>
          <span className="text-gray-400 font-semibold">Strict Shop ID Isolation Active</span>
        </div>

        <div className="divide-y divide-gray-100">
          {staffList.map(st => (
            <div key={st.id} className="py-3 flex items-center justify-between">
              <div>
                <div className="font-bold text-gray-900">{st.name}</div>
                <div className="text-[11px] text-gray-500">{st.role}</div>
              </div>
              <span className="bg-gray-100 text-gray-800 font-semibold px-2.5 py-1 rounded-lg text-[11px]">
                {st.access}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

