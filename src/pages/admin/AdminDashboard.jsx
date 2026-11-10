import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  Layers, 
  Store, 
  Package, 
  SlidersHorizontal, 
  TrendingUp, 
  Users, 
  ShoppingBag,
  ArrowRight,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { AdminAnalyticsSection } from '../../components/admin/AdminAnalyticsSection';

export const AdminDashboard = () => {
  const { categories, platformSettings } = useApp();
  const [vendors, setVendors] = useState([]);
  const [orders, setOrders] = useState([]);

  const fetchData = async () => {
    const v = await api.shops.getAll();
    setVendors(v);
    const o = await api.orders.getAll();
    setOrders(o);
  };

  useEffect(() => {
    fetchData();
    const handleSync = () => fetchData();
    window.addEventListener('storage', handleSync);
    window.addEventListener('burlamart_db_updated', handleSync);
    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('burlamart_db_updated', handleSync);
    };
  }, []);

  const liveGmv = orders.reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0);
  const deliveredOrders = orders.filter(o => o.status === 'Delivered').length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0F3923] via-[#1B4332] to-[#2D6A4F] text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full">
            Burlamart Central Nervous System
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-2">
            Platform Master Operations & Control
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl mt-1">
            Real-time management for category UI templates, vendor rent overrides, distance slab logistics, and master product catalogues.
          </p>
        </div>

        <Link
          to="/admin/templates"
          className="px-5 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-2xl font-bold text-xs sm:text-sm shadow-lg transition flex items-center gap-2 self-start md:self-auto"
        >
          <Layers className="w-4 h-4" />
          <span>Category UI Template Engine</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-xs">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Live Platform GMV</span>
          <div className="text-2xl font-extrabold text-gray-900 mt-1">₹{liveGmv.toLocaleString('en-IN')}</div>
          <div className="text-[11px] text-emerald-700 font-bold mt-1">{deliveredOrders} settled deliveries</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-xs">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Active Vendors</span>
          <div className="text-2xl font-extrabold text-gray-900 mt-1">{vendors.length} Shops</div>
          <div className="text-[11px] text-purple-700 font-semibold mt-1">100% Verified Partners</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-xs">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Configured Categories</span>
          <div className="text-2xl font-extrabold text-gray-900 mt-1">{categories.length} Categories</div>
          <div className="text-[11px] text-blue-700 font-semibold mt-1">All with dynamic UI layouts</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-xs">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Platform Orders</span>
          <div className="text-2xl font-extrabold text-gray-900 mt-1">{orders.length} Orders</div>
          <div className="text-[11px] text-emerald-700 font-bold mt-1">Active fulfillment running</div>
        </div>
      </div>

      {/* Live Analytics Section */}
      <AdminAnalyticsSection
        orders={orders}
        vendors={vendors}
        categories={categories}
        platformSettings={platformSettings}
      />

      {/* Quick Action Portals */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/admin/templates"
          className="bg-white p-6 rounded-3xl border border-gray-200 hover:border-purple-400 shadow-xs hover:shadow-md transition space-y-3 block group"
        >
          <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-base text-gray-900 group-hover:text-purple-800 transition">
            Category UI Layout Management
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Switch any category between Blinkit-style, OYO-style, Amazon-style, or Packaged Food snack grids with live preview.
          </p>
          <div className="text-xs font-bold text-purple-700 flex items-center gap-1">
            <span>Manage Templates</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        <Link
          to="/admin/settings"
          className="bg-white p-6 rounded-3xl border border-gray-200 hover:border-emerald-400 shadow-xs hover:shadow-md transition space-y-3 block group"
        >
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <SlidersHorizontal className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-base text-gray-900 group-hover:text-emerald-800 transition">
            Delivery Slabs & Fee Settings
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Configure distance slabs [0-X], [X-Y], [Y+], weight surcharges, mandatory packaging weight limit W, and radius R.
          </p>
          <div className="text-xs font-bold text-emerald-700 flex items-center gap-1">
            <span>Configure Slabs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        <Link
          to="/admin/vendors"
          className="bg-white p-6 rounded-3xl border border-gray-200 hover:border-amber-400 shadow-xs hover:shadow-md transition space-y-3 block group"
        >
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
            <Store className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-base text-gray-900 group-hover:text-amber-800 transition">
            Vendor Approvals & Rent Overrides
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Approve new merchant partners, set base monthly rents, and apply individual rent overrides per vendor.
          </p>
          <div className="text-xs font-bold text-amber-700 flex items-center gap-1">
            <span>Manage Vendors</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>
      </div>

      {/* Audit Log Preview */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4 text-xs">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <h3 className="font-extrabold text-base text-gray-900">Platform Setting Change Audit Log</h3>
          <span className="text-gray-400 font-semibold">Every configuration change logged</span>
        </div>

        <div className="divide-y divide-gray-100">
          {platformSettings.auditLogs?.map(log => (
            <div key={log.id} className="py-2.5 flex justify-between items-center">
              <div>
                <span className="font-bold text-gray-900">{log.action}</span>
                <div className="text-[11px] text-gray-500">By {log.admin}</div>
              </div>
              <span className="text-gray-400 font-mono text-[11px]">{log.timestamp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

