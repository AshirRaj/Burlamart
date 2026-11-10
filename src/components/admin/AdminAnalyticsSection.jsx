import React, { useMemo } from 'react';
import { BarChart3, TrendingUp, DollarSign, Store } from 'lucide-react';

export const AdminAnalyticsSection = ({ orders = [], vendors = [], categories = [], platformSettings = {} }) => {
  const analytics = useMemo(() => {
    const ordersGmv = orders.reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0);
    const defaultRent = Number(platformSettings.defaultMonthlyRent) || 2000;
    const overrides = platformSettings.vendorRentOverrides || {};
    const totalRentRevenue = vendors.reduce((sum, v) => sum + Number(overrides[v.id] ?? defaultRent), 0);
    const commissionPct = Number(platformSettings.orderCommissionPct) || 5.5;
    const commissionEarned = Math.round((ordersGmv * commissionPct) / 100);

    // Category revenue breakdown
    const categoryTotals = {};
    categories.forEach(c => {
      categoryTotals[c.id] = { name: c.name, color: c.color || '#1B4332', total: 0, count: 0 };
    });

    orders.forEach((order) => {
      const shop = vendors.find(v => v.id === order.shopId);
      const catId = shop?.category || order.items?.[0]?.category || 'grocery';
      if (!categoryTotals[catId]) {
        categoryTotals[catId] = { name: catId, color: '#1B4332', total: 0, count: 0 };
      }
      categoryTotals[catId].total += Number(order.totalAmount) || 0;
      categoryTotals[catId].count += 1;
    });

    const catList = Object.values(categoryTotals);
    const maxCatTotal = Math.max(1, ...catList.map(c => c.total));

    // Top vendor revenue
    const vendorStats = vendors.map(v => {
      const vOrders = orders.filter(o => o.shopId === v.id);
      const rev = vOrders.reduce((s, o) => s + (Number(o.totalAmount) || 0), 0);
      return { id: v.id, name: v.name, orders: vOrders.length, revenue: rev };
    }).sort((a, b) => b.revenue - a.revenue);

    return {
      ordersGmv,
      totalRentRevenue,
      commissionEarned,
      commissionPct,
      avgOrderValue: orders.length > 0 ? Math.round(ordersGmv / orders.length) : 0,
      catList,
      maxCatTotal,
      vendorStats
    };
  }, [orders, vendors, categories, platformSettings]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Left: Category GMV Bars */}
      <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-5">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div>
            <h3 className="font-extrabold text-base text-gray-900 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-purple-700" />
              <span>Category Sales & Order Breakdown</span>
            </h3>
            <p className="text-xs text-gray-500">Computed live from platform orders across all categories</p>
          </div>
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full">
            Avg Order: ₹{analytics.avgOrderValue}
          </span>
        </div>

        <div className="space-y-4">
          {analytics.catList.map((cat, idx) => {
            const pct = Math.max(6, Math.round((cat.total / analytics.maxCatTotal) * 100));
            return (
              <div key={idx} className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-gray-800">{cat.name}</span>
                  <span className="text-gray-900">₹{cat.total.toLocaleString('en-IN')} ({cat.count} orders)</span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${cat.total > 0 ? pct : 3}%`, backgroundColor: cat.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right: Commission + Vendor Leaderboard */}
      <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-5">
        <div className="border-b border-gray-100 pb-3">
          <h3 className="font-extrabold text-base text-gray-900 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-700" />
            <span>Platform Revenue & Partner Volume</span>
          </h3>
          <p className="text-xs text-gray-500">Live commissions ({analytics.commissionPct}%) & monthly vendor rents</p>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-100">
            <span className="text-[10px] font-bold uppercase text-purple-800 block">Order Commissions</span>
            <span className="text-lg font-black text-purple-950">₹{analytics.commissionEarned.toLocaleString('en-IN')}</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100">
            <span className="text-[10px] font-bold uppercase text-emerald-800 block">Monthly Vendor Rent</span>
            <span className="text-lg font-black text-emerald-950">₹{analytics.totalRentRevenue.toLocaleString('en-IN')}</span>
          </div>
        </div>

        <div className="space-y-2.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
            <Store className="w-3.5 h-3.5" /> Vendor Sales Ranking
          </span>
          {analytics.vendorStats.slice(0, 4).map((v) => (
            <div key={v.id} className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 border border-gray-100 text-xs">
              <div>
                <div className="font-bold text-gray-900">{v.name}</div>
                <div className="text-[10px] text-gray-500">{v.orders} orders fulfilled</div>
              </div>
              <span className="font-extrabold text-[#1B4332]">₹{v.revenue.toLocaleString('en-IN')}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

