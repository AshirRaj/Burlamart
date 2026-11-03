import React, { useState } from 'react';
import { 
  Scan, 
  FileSpreadsheet, 
  Truck, 
  BadgePercent, 
  Building2, 
  Check, 
  ArrowRight,
  TrendingUp,
  Receipt
} from 'lucide-react';

export const VendorExtensions = () => {
  const [activeTab, setActiveTab] = useState('pos');
  const [notice, setNotice] = useState(null);

  const showToast = (msg) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3500);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded">
          Section 12 & Page 10 Requirements
        </span>
        <h2 className="text-xl font-extrabold text-gray-900 mt-1">
          Vendor Extension Modules: POS, Wholesale & Loans
        </h2>
        <p className="text-xs text-gray-500">
          Integrated counter billing POS, B2B wholesale reordering, shared fleet delivery, and merchant working capital loans.
        </p>
      </div>

      {notice && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-2xl p-4 text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-700" />
          <span>{notice}</span>
        </div>
      )}

      {/* Extension Navigation Tabs - flex-wrap to prevent horizontal scrolling */}
      <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 pb-2 text-xs font-bold">
        {[
          { id: 'pos', label: 'Counter POS & Invoices', icon: Scan },
          { id: 'wholesale', label: 'In-App Wholesale Restock', icon: Building2 },
          { id: 'shared-delivery', label: 'Shared Delivery with Nearby Shops', icon: Truck },
          { id: 'loans', label: 'Partner Small Business Loans', icon: BadgePercent }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === tab.id ? 'bg-[#1B4332] text-white shadow-xs' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT: COUNTER POS & GST BILLING */}
      {activeTab === 'pos' && (
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4 text-xs">
          <div className="flex justify-between items-center pb-3 border-b border-gray-100">
            <div>
              <h3 className="font-extrabold text-base text-gray-900">Countertop POS Terminal & Quick Bill Generator</h3>
              <p className="text-gray-500">Direct walk-in customer checkout with GST compliance</p>
            </div>
            <button
              onClick={() => showToast('Walk-in POS invoice #INV-4921 printed!')}
              className="px-4 py-2 bg-emerald-800 text-white font-bold rounded-xl hover:bg-emerald-900"
            >
              + New Walk-in Bill
            </button>
          </div>

          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex justify-between items-center">
            <div>
              <span className="font-bold text-gray-900">Today's Offline Walk-in Sales (Burlamart POS)</span>
              <p className="text-gray-500">22 receipts generated • Net: ₹8,420 • GST: ₹421 (5%)</p>
            </div>
            <button
              onClick={() => showToast('Exported GSTR-1 Sales Report')}
              className="px-3 py-1.5 bg-white border border-gray-300 font-bold rounded-xl"
            >
              Export GSTR-1
            </button>
          </div>
        </div>
      )}

      {/* TAB CONTENT: WHOLESALE RESTOCKING (Section 12, P4) */}
      {activeTab === 'wholesale' && (
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4 text-xs">
          <div>
            <h3 className="font-extrabold text-base text-gray-900">In-App Wholesale Restocking & Direct Mandi Supply</h3>
            <p className="text-gray-500">Order inventory in bulk directly from FMCG brands & farmer mandis</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
              <span className="font-bold text-gray-900">Bulk Desi Tomatoes (100kg Crate)</span>
              <div className="text-emerald-800 font-extrabold text-base">₹2,800 / crate</div>
              <p className="text-[11px] text-gray-500">Next morning 6 AM store delivery</p>
              <button
                onClick={() => showToast('Restock order placed for 100kg Tomato Crate!')}
                className="w-full py-2 bg-[#1B4332] text-white font-bold rounded-xl"
              >
                Order Wholesale Crate
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-2">
              <span className="font-bold text-gray-900">Fortune Sunflower Oil (15L Tin x 4)</span>
              <div className="text-emerald-800 font-extrabold text-base">₹5,900 / case</div>
              <p className="text-[11px] text-gray-500">Direct FMCG distributor dispatch</p>
              <button
                onClick={() => showToast('Restock order placed for Oil Case!')}
                className="w-full py-2 bg-[#1B4332] text-white font-bold rounded-xl"
              >
                Order Wholesale Case
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: SHARED DELIVERY (Section 12, P4) */}
      {activeTab === 'shared-delivery' && (
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4 text-xs">
          <div>
            <h3 className="font-extrabold text-base text-gray-900">Shared Rider Delivery Between Nearby Shops</h3>
            <p className="text-gray-500">
              Pool local delivery riders with neighboring stores in your market circle to cut delivery overhead by 40%.
            </p>
          </div>

          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
            <div className="font-bold text-emerald-950">Active Cluster: "Sector 14 Main Market Delivery Pool"</div>
            <p className="text-emerald-800">5 shops participating • 4 shared riders on duty right now</p>
            <button
              onClick={() => showToast('Rider requested from shared Sector 14 delivery pool!')}
              className="px-4 py-2 bg-[#1B4332] text-white font-bold rounded-xl"
            >
              Call Shared Rider
            </button>
          </div>
        </div>
      )}

      {/* TAB CONTENT: SMALL LOANS (Section 12, P4) */}
      {activeTab === 'loans' && (
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4 text-xs">
          <div>
            <h3 className="font-extrabold text-base text-gray-900">Instant Merchant Working Capital Loans</h3>
            <p className="text-gray-500">Pre-approved credit lines from NBFC partners based on your Burlamart daily sales.</p>
          </div>

          <div className="p-5 bg-gradient-to-r from-teal-900 to-[#1B4332] text-white rounded-2xl space-y-3">
            <div className="flex justify-between items-center">
              <span>Pre-Approved Credit Limit:</span>
              <span className="font-extrabold text-xl text-yellow-300">₹2,50,000</span>
            </div>
            <p className="text-teal-100 text-[11px]">Daily auto-deduction from sales: ₹450/day • 0% processing fee</p>
            <button
              onClick={() => showToast('Loan application initiated with partner NBFC! Agent will verify KYC.')}
              className="px-4 py-2 bg-yellow-400 text-gray-950 font-extrabold rounded-xl"
            >
              Disburse to Bank Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

