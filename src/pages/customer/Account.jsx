import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { 
  Coins, 
  Bookmark, 
  ShoppingBag, 
  RotateCcw, 
  Star, 
  Bell, 
  Globe, 
  ShieldCheck, 
  Sparkles, 
  Trash2, 
  ArrowRight,
  MessageSquare
} from 'lucide-react';

export const Account = () => {
  const { 
    sharedWalletBalance, 
    creditSharedWallet, 
    notifications, 
    setNotifications,
    language,
    setLanguage
  } = useApp();
  const { addToCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [combos, setCombos] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('wallet'); // 'wallet', 'combos', 'orders', 'notifications'
  const [reviewNotice, setReviewNotice] = useState(null);

  useEffect(() => {
    const loadAccountData = async () => {
      const userCombos = await api.combos.getAll();
      setCombos(userCombos);
      const userOrders = await api.orders.getAll();
      setOrders(userOrders);
    };
    loadAccountData();
  }, []);

  const handleReorderCombo = async (combo) => {
    const shops = await api.shops.getAll();
    const defaultShop = shops[0];
    combo.items.forEach(item => {
      addToCart(item, defaultShop);
    });
    navigate('/cart');
  };

  const handleDeleteCombo = async (comboId) => {
    const updated = await api.combos.delete(comboId);
    setCombos(updated);
  };

  const handleLeaveReview = (orderId, rating) => {
    setReviewNotice(`Thank you! ${rating}-star rating recorded for Order #${orderId}. 5 reward points added.`);
    creditSharedWallet(5);
    setTimeout(() => setReviewNotice(null), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Account Hero Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-[#1B4332] to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full">
            Burlamart Pass Member
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
            {currentUser.name}
          </h1>
          <p className="text-xs sm:text-sm text-gray-300">
            {currentUser.phone} • {currentUser.email}
          </p>
        </div>

        {/* Shared Wallet Balance Pill */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center sm:text-right flex items-center gap-4">
          <div>
            <div className="text-[11px] text-emerald-300 font-semibold uppercase tracking-wider">
              Shared Rewards Wallet
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white flex items-center justify-center sm:justify-end gap-1.5">
              <Coins className="w-6 h-6 text-amber-400" />
              <span>₹{sharedWalletBalance}</span>
            </div>
          </div>
        </div>
      </div>

      {reviewNotice && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-2xl p-4 text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <Sparkles className="w-4 h-4 text-emerald-700" />
          <span>{reviewNotice}</span>
        </div>
      )}

      {/* Tabs Bar - flex-wrap to prevent horizontal scrolling on mobile */}
      <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 pb-2">
        <button
          onClick={() => setActiveTab('wallet')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            activeTab === 'wallet' ? 'bg-[#1B4332] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Coins className="w-4 h-4 text-amber-400" />
          <span>Shared Rewards Wallet</span>
        </button>

        <button
          onClick={() => setActiveTab('combos')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            activeTab === 'combos' ? 'bg-[#1B4332] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Bookmark className="w-4 h-4 text-emerald-400" />
          <span>My Saved Combos ({combos.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            activeTab === 'orders' ? 'bg-[#1B4332] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Order History ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('notifications')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
            activeTab === 'notifications' ? 'bg-[#1B4332] text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Alerts & Preferences</span>
        </button>
      </div>

      {/* TAB CONTENT: SHARED WALLET & REWARDS (Section 10 Requirement) */}
      {activeTab === 'wallet' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
              <div>
                <h3 className="text-lg font-extrabold text-gray-900">
                  How Burlamart Shared Wallet Works
                </h3>
                <p className="text-xs text-gray-500">
                  Universal cross-vendor loyalty rewards guaranteed by platform architecture
                </p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-extrabold text-[#1B4332]">₹{sharedWalletBalance}</span>
                <span className="block text-[11px] text-gray-400">Available to spend</span>
              </div>
            </div>

            {/* 3-Step diagram from Page 9 of PDF */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="bg-emerald-50/60 border border-emerald-100 p-4 rounded-2xl space-y-1.5">
                <div className="font-extrabold text-emerald-900 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-800 text-white flex items-center justify-center text-[10px]">1</span>
                  <span>Customer pays at Vendor A</span>
                </div>
                <p className="text-[11px] text-emerald-700">
                  Place an order for fresh groceries at Fresh Greens Supermart.
                </p>
              </div>

              <div className="bg-emerald-50/60 border border-emerald-100 p-4 rounded-2xl space-y-1.5">
                <div className="font-extrabold text-emerald-900 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-800 text-white flex items-center justify-center text-[10px]">2</span>
                  <span>Reward added to shared wallet</span>
                </div>
                <p className="text-[11px] text-emerald-700">
                  2% platform reward points + Spin wheel bonus credited instantly.
                </p>
              </div>

              <div className="bg-emerald-50/60 border border-emerald-100 p-4 rounded-2xl space-y-1.5">
                <div className="font-extrabold text-emerald-900 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-800 text-white flex items-center justify-center text-[10px]">3</span>
                  <span>Reward redeemed at Vendor B</span>
                </div>
                <p className="text-[11px] text-emerald-700">
                  Redeem balance seamlessly when booking hotel stays or electronics!
                </p>
              </div>
            </div>

            {/* Transaction Ledger */}
            <div className="pt-4">
              <h4 className="font-bold text-xs uppercase tracking-wider text-gray-400 mb-3">
                Recent Reward Activity
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <div>
                    <div className="font-bold text-gray-900">Post-Payment Spin Wheel Win</div>
                    <div className="text-[11px] text-gray-500">Order #ORD-98214</div>
                  </div>
                  <span className="font-bold text-emerald-700">+₹25 Cashback</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <div>
                    <div className="font-bold text-gray-900">2% Platform Shared Reward</div>
                    <div className="text-[11px] text-gray-500">Order #ORD-98214 (Grocery)</div>
                  </div>
                  <span className="font-bold text-emerald-700">+₹15 Points</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: MY COMBOS (Section 10 Requirement) */}
      {activeTab === 'combos' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-base text-gray-900">My Combos (1-Tap Reorder)</h3>
              <p className="text-xs text-gray-500">Saved carts within any category ready for 1-tap reordering</p>
            </div>
            <Link to="/cart" className="text-xs font-bold text-emerald-800 hover:underline">
              Save current cart as combo
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {combos.map(combo => (
              <div key={combo.id} className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      {combo.category}
                    </span>
                    <button
                      onClick={() => handleDeleteCombo(combo.id)}
                      className="text-gray-400 hover:text-rose-600 p-1"
                      title="Delete Combo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h4 className="font-extrabold text-base text-gray-900 mt-1">
                    {combo.name}
                  </h4>

                  <ul className="mt-2 space-y-1 text-xs text-gray-600">
                    {combo.items.map((it, idx) => (
                      <li key={idx} className="flex justify-between">
                        <span>{it.quantity}x {it.name}</span>
                        <span className="font-semibold text-gray-900">₹{it.price * it.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div className="font-extrabold text-base text-emerald-800">
                    ₹{combo.totalPrice}
                  </div>
                  <button
                    onClick={() => handleReorderCombo(combo)}
                    className="px-4 py-2 bg-[#1B4332] hover:bg-[#2D6A4F] text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reorder in 1-Tap</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: ORDER HISTORY & REVIEWS */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <h3 className="font-extrabold text-base text-gray-900">Past Orders & Invoices</h3>
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gray-100 gap-2">
                  <div>
                    <span className="font-mono text-xs font-bold text-gray-800">{order.id}</span>
                    <div className="text-xs text-gray-500 font-semibold">{order.shopName} • {order.items?.length || 2} items</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-emerald-50 text-emerald-800 font-extrabold text-xs px-2.5 py-1 rounded-full">
                      {order.status}
                    </span>
                    <span className="font-extrabold text-base text-gray-900">₹{order.totalAmount}</span>
                  </div>
                </div>

                {/* Star rating interactive review */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500 font-medium">Rate this order:</span>
                    {[1, 2, 3, 4, 5].map(st => (
                      <button
                        key={st}
                        onClick={() => handleLeaveReview(order.id, st)}
                        className="p-1 text-amber-400 hover:scale-125 transition"
                      >
                        <Star className="w-4 h-4 fill-amber-400" />
                      </button>
                    ))}
                  </div>

                  <Link
                    to={`/orders/${order.id}`}
                    className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1"
                  >
                    <span>View Live Tracker</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: NOTIFICATIONS & LANGUAGE PREFERENCES (Page 4) */}
      {activeTab === 'notifications' && (
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-6 max-w-xl">
          <h3 className="font-extrabold text-base text-gray-900">Communication & Language Preferences</h3>

          <div className="space-y-4 text-xs">
            {/* Push Notifications */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50">
              <div>
                <div className="font-bold text-gray-900">Push Notifications</div>
                <div className="text-[11px] text-gray-500">Real-time status updates on order tracking and flash deals</div>
              </div>
              <input
                type="checkbox"
                checked={notifications.push}
                onChange={(e) => setNotifications(prev => ({ ...prev, push: e.target.checked }))}
                className="w-4 h-4 accent-emerald-700"
              />
            </div>

            {/* SMS Alerts */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50">
              <div>
                <div className="font-bold text-gray-900">SMS Alerts</div>
                <div className="text-[11px] text-gray-500">Critical order OTPs, delivery assignment & payment receipts</div>
              </div>
              <input
                type="checkbox"
                checked={notifications.sms}
                onChange={(e) => setNotifications(prev => ({ ...prev, sms: e.target.checked }))}
                className="w-4 h-4 accent-emerald-700"
              />
            </div>

            {/* WhatsApp Alerts */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50">
              <div>
                <div className="font-bold text-gray-900">WhatsApp Broadcast & Bill Delivery</div>
                <div className="text-[11px] text-gray-500">Receive order bills and rider live location directly on WhatsApp</div>
              </div>
              <input
                type="checkbox"
                checked={notifications.whatsapp}
                onChange={(e) => setNotifications(prev => ({ ...prev, whatsapp: e.target.checked }))}
                className="w-4 h-4 accent-emerald-700"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

