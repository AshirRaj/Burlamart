import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { 
  TrendingUp, 
  ShoppingBag, 
  Package, 
  AlertCircle, 
  Coins, 
  Users, 
  ArrowUpRight, 
  Check, 
  X, 
  Download,
  Calendar
} from 'lucide-react';

export const VendorDashboard = () => {
  const outletCtx = useOutletContext() || {};
  const { currentUser } = useAuth();
  const activeShopId = outletCtx.activeShopId || currentUser?.activeVendorId || 'shop-1';

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [shop, setShop] = useState(null);

  const fetchData = async () => {
    const [allOrders, allProds, shopInfo] = await Promise.all([
      api.orders.getAll({ shopId: activeShopId }),
      api.products.getAll({ shopId: activeShopId }),
      api.shops.getById(activeShopId)
    ]);
    setOrders(allOrders);
    setProducts(allProds);
    setShop(shopInfo);
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
  }, [activeShopId]);

  const lowStockItems = products.filter(p => (p.stock ?? 20) <= 10 || p.limitedStock);
  const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0);
  const pendingOrdersCount = orders.filter(o => o.status === 'Order Placed').length;
  const deliveredOrdersCount = orders.filter(o => o.status === 'Delivered').length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Store Revenue</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-gray-900">₹{totalRevenue.toLocaleString('en-IN')}</div>
          <div className="text-[11px] text-emerald-700 font-bold mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> {deliveredOrdersCount} settled deliveries
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Active Orders</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-gray-900">{orders.length} Orders</div>
          <div className="text-[11px] text-blue-700 font-semibold mt-1">
            {pendingOrdersCount} pending dispatch confirmation
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Stock & Inventory</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-gray-900">{products.length} SKUs</div>
          <div className="text-[11px] text-amber-700 font-bold mt-1">
            {lowStockItems.length} low stock warnings
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Partner Reputation</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-gray-900">{shop?.rating || 4.8} ★</div>
          <div className="text-[11px] text-purple-700 font-semibold mt-1">
            {shop?.reviewsCount || 0} verified customer reviews
          </div>
        </div>
      </div>

      {/* Live Orders Overview Section */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div>
            <h3 className="font-extrabold text-base text-gray-900">Recent Customer Orders</h3>
            <p className="text-xs text-gray-500">Live order management and dispatch status</p>
          </div>
          <Link
            to="/vendor/orders"
            className="text-xs font-bold text-emerald-800 hover:underline"
          >
            Manage All Orders →
          </Link>
        </div>

        <div className="divide-y divide-gray-100">
          {orders.map(order => (
            <div key={order.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono font-bold text-gray-900">{order.id}</span>
                  <span className="bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded">
                    {order.status}
                  </span>
                  <span className="text-gray-400 font-medium">({order.deliveryType})</span>
                </div>
                <div className="font-medium text-gray-700">
                  Customer: <span className="font-bold text-gray-900">{order.customerName}</span> ({order.customerPhone})
                </div>
                <div className="text-gray-500 text-[11px] truncate max-w-md">
                  {order.items?.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="font-extrabold text-sm text-gray-900">₹{order.totalAmount}</div>
                  <span className="text-[10px] text-gray-400 font-semibold">{order.paymentMethod}</span>
                </div>

                <Link
                  to="/vendor/orders"
                  className="px-3 py-1.5 bg-gray-100 hover:bg-[#1B4332] text-gray-800 hover:text-white rounded-xl font-bold transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Low Stock & Limited-Stock Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h3 className="font-extrabold text-base text-gray-900 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>Stock Alerts & Limited Stock SKUs</span>
            </h3>
            <Link to="/vendor/catalogue" className="text-xs font-bold text-emerald-800 hover:underline">
              Catalogue →
            </Link>
          </div>

          <div className="space-y-2 text-xs">
            {lowStockItems.map(item => (
              <div key={item.id} className="p-3 rounded-2xl bg-gray-50 flex items-center justify-between border border-gray-100">
                <div className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <div className="font-bold text-gray-900">{item.name}</div>
                    <div className="text-[11px] text-gray-500">₹{item.price} • {item.weightDisplay}</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`font-extrabold ${item.limitedStock ? 'text-amber-600' : 'text-rose-600'}`}>
                    {item.limitedStock ? 'Limited (Next-Day Only)' : `${item.stock} left`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reports & GST Invoices Quick Download */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
          <h3 className="font-extrabold text-base text-gray-900 pb-3 border-b border-gray-100">
            Accounting, GST & Tax Reports
          </h3>
          <p className="text-xs text-gray-500">
            Export monthly sales summaries, GST tax liability breakdowns and stock reorder ledgers.
          </p>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 border border-gray-100">
              <div>
                <div className="font-bold text-gray-900">Monthly Sales Ledger (October 2026)</div>
                <div className="text-[11px] text-gray-500">Total Net GMV: ₹4,18,500</div>
              </div>
              <button
                onClick={() => alert('Downloaded Monthly Sales CSV')}
                className="px-3 py-1.5 bg-white border border-gray-200 rounded-xl font-bold hover:bg-gray-100 flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" /> CSV
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 border border-gray-100">
              <div>
                <div className="font-bold text-gray-900">GSTR-1 Ready Tax Report</div>
                <div className="text-[11px] text-gray-500">B2C small invoices summary with HSN codes</div>
              </div>
              <button
                onClick={() => alert('Downloaded GSTR-1 Excel Report')}
                className="px-3 py-1.5 bg-white border border-gray-200 rounded-xl font-bold hover:bg-gray-100 flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" /> Excel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

