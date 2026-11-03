import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useApp } from '../../context/AppContext';
import { 
  Store, 
  Check, 
  X, 
  CreditCard, 
  ShieldCheck, 
  Edit, 
  MapPin, 
  Star, 
  Save, 
  DollarSign 
} from 'lucide-react';

export const VendorManagement = () => {
  const { platformSettings, updateSettings } = useApp();
  const [vendors, setVendors] = useState([]);
  const [defaultRent, setDefaultRent] = useState(platformSettings.defaultMonthlyRent || 2000);
  const [rentOverrides, setRentOverrides] = useState(platformSettings.vendorRentOverrides || {});
  const [editingVendor, setEditingVendor] = useState(null);
  const [overrideValue, setOverrideValue] = useState('');
  const [notice, setNotice] = useState(null);

  // Pending approval queue simulation
  const [pendingVendors, setPendingVendors] = useState([
    {
      id: 'v-new-1',
      name: 'Organic Roots Dairy & Ghee',
      ownerName: 'Harish Bishnoi',
      category: 'grocery',
      address: 'Shop 19, Vaishali Nagar, Jaipur',
      phone: '+91 98444 11223',
      fssai: '22219001000492',
      appliedDate: '2026-11-02'
    }
  ]);

  const loadVendors = async () => {
    const list = await api.shops.getAll();
    setVendors(list);
  };

  useEffect(() => {
    loadVendors();
  }, []);

  const showToast = (msg) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3500);
  };

  const handleApprovePending = async (pending) => {
    setPendingVendors(pendingVendors.filter(v => v.id !== pending.id));
    const newShop = {
      id: `shop-${Date.now()}`,
      name: pending.name,
      category: pending.category,
      ownerName: pending.ownerName,
      address: pending.address,
      distanceKm: 2.5,
      rating: 5.0,
      reviewsCount: 1,
      hasOwnDelivery: false,
      isOpen: true,
      inStock: true,
      bannerUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80',
      minOrder: 100,
      plan: 'Silver Partner'
    };
    setVendors([newShop, ...vendors]);
    showToast(`Vendor "${pending.name}" approved and live on platform!`);
  };

  const handleRejectPending = (pendingId) => {
    setPendingVendors(pendingVendors.filter(v => v.id !== pendingId));
    showToast('Vendor registration rejected.');
  };

  const handleSaveDefaultRent = async () => {
    await updateSettings({ defaultMonthlyRent: Number(defaultRent) });
    showToast(`Default monthly rent set to ₹${defaultRent}!`);
  };

  const handleSetOverride = async (vendorId) => {
    const updatedOverrides = { ...rentOverrides, [vendorId]: Number(overrideValue) };
    setRentOverrides(updatedOverrides);
    await updateSettings({ vendorRentOverrides: updatedOverrides });
    setEditingVendor(null);
    showToast(`Special monthly rent override of ₹${overrideValue} saved for ${vendorId}!`);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <span className="text-[11px] font-bold text-purple-900 uppercase tracking-wider bg-purple-100 px-2.5 py-0.5 rounded">
          Section 9.1 & Page 8 Requirements
        </span>
        <h2 className="text-xl font-extrabold text-gray-900 mt-1">
          Vendor Approvals, Plans & Monthly Rent Settings
        </h2>
        <p className="text-xs text-gray-500">
          Approve onboarding applications, define default monthly rent, and apply individual rent overrides per vendor.
        </p>
      </div>

      {notice && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-2xl p-4 text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-700" />
          <span>{notice}</span>
        </div>
      )}

      {/* Default Rent Global Configuration */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <div>
          <h3 className="font-extrabold text-sm text-gray-900 flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-emerald-700" />
            <span>Default Base Monthly Rent for All Vendors</span>
          </h3>
          <p className="text-gray-500 mt-0.5">
            Applicable to all standard onboarded shops unless an individual override is configured.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-700">₹</span>
          <input
            type="number"
            value={defaultRent}
            onChange={(e) => setDefaultRent(e.target.value)}
            className="w-28 bg-gray-50 border border-gray-200 rounded-xl p-2 font-extrabold text-gray-900 text-sm outline-none focus:border-emerald-600 text-center"
          />
          <button
            onClick={handleSaveDefaultRent}
            className="px-4 py-2 bg-[#1B4332] text-white rounded-xl font-bold hover:bg-[#2D6A4F] transition shadow-xs"
          >
            Update Rent
          </button>
        </div>
      </div>

      {/* Pending Vendor Approval Queue (Section 9.1) */}
      {pendingVendors.length > 0 && (
        <div className="bg-amber-50/70 border border-amber-200 rounded-3xl p-6 space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
              <h3 className="font-extrabold text-base text-amber-950">
                Pending Vendor Onboarding Approvals ({pendingVendors.length})
              </h3>
            </div>
            <span className="text-[11px] font-bold text-amber-800">KYC & FSSAI Verification Queue</span>
          </div>

          <div className="space-y-3">
            {pendingVendors.map(pending => (
              <div key={pending.id} className="bg-white p-4 rounded-2xl border border-amber-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-extrabold text-sm text-gray-900">{pending.name}</span>
                    <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                      {pending.category}
                    </span>
                  </div>
                  <div className="text-gray-600">
                    Owner: <strong className="text-gray-800">{pending.ownerName}</strong> • {pending.phone}
                  </div>
                  <div className="text-gray-400 text-[11px] mt-0.5">
                    Address: {pending.address} • FSSAI Lic: <span className="font-mono">{pending.fssai}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleRejectPending(pending.id)}
                    className="px-3.5 py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-xl font-bold flex items-center gap-1"
                  >
                    <X className="w-3.5 h-3.5" /> Reject
                  </button>
                  <button
                    onClick={() => handleApprovePending(pending)}
                    className="px-4 py-2 bg-[#1B4332] text-white hover:bg-[#2D6A4F] rounded-xl font-bold flex items-center gap-1 shadow-xs"
                  >
                    <Check className="w-3.5 h-3.5" /> Approve Vendor
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active Vendors Directory & Rent Overrides Table */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden text-xs">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-extrabold text-base text-gray-900">
            Active Verified Merchants & Rent Ledger ({vendors.length})
          </h3>
          <span className="text-gray-400 font-semibold">Individual Rent Override Controls</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Store & Owner</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Partner Plan</th>
                <th className="py-3 px-4">Effective Monthly Rent</th>
                <th className="py-3 px-4 text-right">Rent Override Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
              {vendors.map(v => {
                const override = rentOverrides[v.id];
                const isOverridden = override !== undefined;
                const currentRent = isOverridden ? override : defaultRent;

                return (
                  <tr key={v.id} className="hover:bg-gray-50/60">
                    <td className="py-3 px-4">
                      <div className="font-bold text-gray-900">{v.name}</div>
                      <div className="text-[11px] text-gray-400">{v.ownerName} • {v.address}</div>
                    </td>
                    <td className="py-3 px-4 capitalize font-semibold text-emerald-800">
                      {v.category}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-50 text-purple-900">
                        {v.plan || 'Gold Partner'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-extrabold text-gray-900 text-sm">₹{currentRent} / mo</div>
                      {isOverridden ? (
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded">
                          Custom Override
                        </span>
                      ) : (
                        <span className="text-[10px] text-gray-400">Default Rate</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {editingVendor === v.id ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <input
                            type="number"
                            value={overrideValue}
                            onChange={(e) => setOverrideValue(e.target.value)}
                            placeholder="₹ Override"
                            className="w-20 p-1 border rounded-lg text-center font-bold text-xs"
                          />
                          <button
                            onClick={() => handleSetOverride(v.id)}
                            className="p-1.5 bg-emerald-800 text-white rounded-lg font-bold"
                            title="Save"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setEditingVendor(null)}
                            className="p-1.5 bg-gray-200 rounded-lg text-gray-600"
                            title="Cancel"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setEditingVendor(v.id);
                            setOverrideValue(currentRent.toString());
                          }}
                          className="px-3 py-1 bg-gray-100 hover:bg-[#1B4332] text-gray-700 hover:text-white rounded-xl font-bold transition inline-flex items-center gap-1"
                        >
                          <Edit className="w-3 h-3" />
                          <span>Set Rent Override</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

