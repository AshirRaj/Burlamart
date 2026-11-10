import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Truck, 
  Package, 
  Coins, 
  Scale, 
  Gift, 
  FileText, 
  Check, 
  Save,
  MapPin
} from 'lucide-react';
import { DeliverySlabsConfig } from '../../components/admin/DeliverySlabsConfig';
import { CartExtrasConfig } from '../../components/admin/CartExtrasConfig';
import { CoinPricingConfig } from '../../components/admin/CoinPricingConfig';
import { RankingAlgorithmConfig } from '../../components/admin/RankingAlgorithmConfig';
import { RewardsAndEmiConfig } from '../../components/admin/RewardsAndEmiConfig';
import { AuditLogTable } from '../../components/admin/AuditLogTable';
import { ZoneServiceabilityManager } from '../../components/admin/ZoneServiceabilityManager';

export const PlatformSettings = () => {
  const { platformSettings, updateSettings } = useApp();
  const [formData, setFormData] = useState({ ...platformSettings });
  const [activeSection, setActiveSection] = useState('delivery'); // 'delivery', 'cart', 'coins', 'ranking', 'rewards', 'audit'
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    await updateSettings(formData, 'SuperAdmin (Rahul)');
    showToast('Platform settings updated and synced across all four applications!');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <span className="text-[11px] font-bold text-purple-900 uppercase tracking-wider bg-purple-100 px-2.5 py-0.5 rounded">
          Section 9.4 & Page 8 Requirements
        </span>
        <h2 className="text-xl font-extrabold text-gray-900 mt-1">
          Master Platform Configuration & Fee Engine
        </h2>
        <p className="text-xs text-gray-500">
          Admin controls all delivery distance slabs [0 to X, X to Y, Y+], cart surcharges, packaging limits W, fast delivery radius R, and coin economics.
        </p>
      </div>

      {toast && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-2xl p-4 text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-700" />
          <span>{toast}</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 pb-2 text-xs font-bold">
        {[
          { id: 'delivery', label: 'Delivery Distance Slabs & Logistics', icon: Truck },
          { id: 'zones', label: 'Odisha Zones & Cities', icon: MapPin },
          { id: 'cart', label: 'Cart Extras & Packaging Limit W', icon: Package },
          { id: 'coins', label: 'Coin Packs & Pricing', icon: Coins },
          { id: 'ranking', label: 'Ranking Algorithm & Radius', icon: Scale },
          { id: 'rewards', label: 'Offers, EMI & Spin Rewards', icon: Gift },
          { id: 'audit', label: 'Audit Change Log', icon: FileText }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`px-4 py-2 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap ${
                activeSection === tab.id
                  ? 'bg-purple-700 text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6 text-xs font-semibold">
        {/* 1. DELIVERY DISTANCE SLABS & FEES */}
        {activeSection === 'delivery' && (
          <DeliverySlabsConfig formData={formData} handleChange={handleChange} />
        )}

        {/* 1B. ODISHA ZONES & SERVICEABILITY */}
        {activeSection === 'zones' && (
          <ZoneServiceabilityManager formData={formData} handleChange={handleChange} />
        )}

        {/* 2. CART SURCHARGES & PACKAGING LIMIT W */}
        {activeSection === 'cart' && (
          <CartExtrasConfig formData={formData} handleChange={handleChange} />
        )}

        {/* 3. COINS ECONOMICS */}
        {activeSection === 'coins' && (
          <CoinPricingConfig formData={formData} handleChange={handleChange} />
        )}

        {/* 4. RANKING ALGORITHM */}
        {activeSection === 'ranking' && (
          <RankingAlgorithmConfig formData={formData} setFormData={setFormData} handleChange={handleChange} />
        )}

        {/* 5. REWARDS & EMI */}
        {activeSection === 'rewards' && (
          <RewardsAndEmiConfig formData={formData} handleChange={handleChange} />
        )}

        {/* 6. AUDIT LOG */}
        {activeSection === 'audit' && (
          <AuditLogTable auditLogs={formData.auditLogs} />
        )}

        {/* Save CTA */}
        {activeSection !== 'audit' && (
          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 bg-[#1B4332] hover:bg-[#2D6A4F] text-white rounded-2xl font-extrabold text-xs shadow-md transition flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Save & Apply Settings</span>
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
