import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { 
  ShoppingBag, 
  Truck, 
  Bike, 
  Check, 
  X, 
  Edit, 
  Clock, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  AlertTriangle,
  ArrowRight,
  Store,
  RefreshCw,
  Send
} from 'lucide-react';

export const VendorOrders = () => {
  const [orders, setOrders] = useState([]);
  const [shops, setShops] = useState([]);
  const [shop, setShop] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [ownDeliveryFeeInput, setOwnDeliveryFeeInput] = useState(15);
  const [statusNotice, setStatusNotice] = useState(null);

  // Page 6 Reassignment Modal State
  const [reassignModalOpen, setReassignModalOpen] = useState(false);
  const [reassignTargetOrder, setReassignTargetOrder] = useState(null);
  const [selectedTargetShopId, setSelectedTargetShopId] = useState('shop-2');
  const [reassignReason, setReassignReason] = useState('Item Out of Stock');
  const [reassigningLoading, setReassigningLoading] = useState(false);

  const loadData = async () => {
    const list = await api.orders.getAll({ shopId: 'shop-1' });
    setOrders(list);
    const shopData = await api.shops.getById('shop-1');
    setShop(shopData);
    setOwnDeliveryFeeInput(shopData?.ownDeliveryFee || 15);
    const allShops = await api.shops.getAll();
    setShops(allShops.filter(s => s.id !== 'shop-1'));
  };

  useEffect(() => {
    loadData();
  }, []);

  const showToast = (msg) => {
    setStatusNotice(msg);
    setTimeout(() => setStatusNotice(null), 3500);
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    await api.orders.updateStatus(orderId, newStatus, 'Updated from vendor dispatch dashboard');
    showToast(`Order #${orderId} marked as "${newStatus}"!`);
    loadData();
  };

  const handleToggleOwnDelivery = async (hasOwn) => {
    await api.shops.updateStorefront('shop-1', {
      hasOwnDelivery: hasOwn,
      ownDeliveryFee: Number(ownDeliveryFeeInput)
    });
    showToast(hasOwn ? `Own delivery enabled at ₹${ownDeliveryFeeInput} per order!` : 'Switched to Burlamart centralized rider fleet.');
    loadData();
  };

  const openReassignModal = (order) => {
    setReassignTargetOrder(order);
    setReassignModalOpen(true);
  };

  const handleConfirmReassign = async () => {
    if (!reassignTargetOrder) return;
    setReassigningLoading(true);
    try {
      const targetShop = shops.find(s => s.id === selectedTargetShopId) || shops[0];
      await api.orders.reassignToShop(reassignTargetOrder.id, targetShop.id, reassignReason);
      setReassignModalOpen(false);
      showToast(`Order #${reassignTargetOrder.id} successfully forwarded to ${targetShop.name}! (Page 6 Policy)`);
      loadData();
    } catch (err) {
      showToast('Failed to forward order. Please try again.');
    } finally {
      setReassigningLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full overflow-hidden">
      {/* Toast Notification */}
      {statusNotice && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-sm animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-700 flex-shrink-0" />
          <span>{statusNotice}</span>
        </div>
      )}

      {/* Top Header & Delivery Fleet Selector (Section 8.3) */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded">
            Section 8.3 & Page 6 & 7 Requirements
          </span>
          <h2 className="text-xl font-extrabold text-gray-900 mt-1">
            Order Fulfillment & Delivery Configuration
          </h2>
          <p className="text-xs text-gray-500">
            Accept or reject orders, forward out-of-stock orders to next nearest shops, and configure custom delivery fleets.
          </p>
        </div>

        {/* Own Delivery vs Burlamart Fleet Toggle */}
        <div className="bg-gray-50 p-3 rounded-2xl border border-gray-200 flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-2">
            {shop?.hasOwnDelivery ? (
              <Truck className="w-5 h-5 text-amber-600" />
            ) : (
              <Bike className="w-5 h-5 text-emerald-700" />
            )}
            <div>
              <div className="font-bold text-gray-900">
                {shop?.hasOwnDelivery ? 'Using Shop Own Delivery' : 'Using Burlamart Rider Fleet'}
              </div>
              <div className="text-[11px] text-gray-500">
                {shop?.hasOwnDelivery ? `Custom Fee: ₹${shop.ownDeliveryFee}` : 'Automated nearby rider dispatch'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 border-t sm:border-t-0 sm:border-l border-gray-200 pt-2 sm:pt-0 sm:pl-3 w-full sm:w-auto">
            {shop?.hasOwnDelivery ? (
              <button
                onClick={() => handleToggleOwnDelivery(false)}
                className="px-3 py-1.5 bg-[#1B4332] text-white rounded-xl font-bold hover:bg-[#2D6A4F] text-[11px] transition"
              >
                Switch to Burlamart Fleet
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={ownDeliveryFeeInput}
                  onChange={(e) => setOwnDeliveryFeeInput(e.target.value)}
                  className="w-16 px-2 py-1 bg-white border border-gray-300 rounded-lg text-xs font-bold"
                  placeholder="₹15"
                />
                <button
                  onClick={() => handleToggleOwnDelivery(true)}
                  className="px-3 py-1.5 bg-amber-600 text-white rounded-xl font-bold hover:bg-amber-700 text-[11px] whitespace-nowrap transition"
                >
                  Enable Own Delivery
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        <h3 className="font-extrabold text-lg text-gray-900">
          Incoming & Active Store Orders ({orders.length})
        </h3>

        {orders.map((order) => {
          return (
            <div
              key={order.id}
              className="bg-white rounded-3xl border border-gray-200 p-4 sm:p-6 shadow-sm hover:shadow-md transition space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                    <ShoppingBag className="w-5 h-5 text-emerald-700" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-extrabold text-base text-gray-900">Order #{order.id}</span>
                      <span className="text-[11px] px-2.5 py-0.5 rounded-full font-extrabold bg-emerald-100 text-emerald-800">
                        {order.status}
                      </span>
                      {order.hasLimitedStock && (
                        <span className="text-[10px] px-2 py-0.5 bg-amber-100 text-amber-800 font-bold rounded-md">
                          Next-Day Delivery Only
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 font-medium mt-0.5">
                      Customer: <strong className="text-gray-800">{order.customerName}</strong> ({order.customerPhone})
                    </div>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <div className="font-extrabold text-base text-gray-900">₹{order.totalAmount}</div>
                  <div className="text-[11px] text-gray-500">
                    Payment: <span className="font-bold text-emerald-700">{order.paymentMethod}</span> ({order.paymentStatus})
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs bg-gray-50 p-3 rounded-2xl">
                {order.items?.map((it, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 bg-white rounded-xl border border-gray-100">
                    <span className="font-semibold text-gray-800">{it.quantity}x {it.name}</span>
                    <span className="font-bold text-gray-900">₹{it.price * it.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs">
                <div className="text-gray-500 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                  <span className="truncate max-w-md">{order.deliveryAddress}</span>
                </div>

                {/* Status Action Buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  {order.status === 'Order Placed' && (
                    <>
                      {/* PAGE 6: Send to next nearest shop if out of stock */}
                      <button
                        onClick={() => openReassignModal(order)}
                        className="px-3.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 rounded-xl font-bold flex items-center gap-1.5 transition text-xs"
                        title="Forward to next nearest shop per Page 6 requirements"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-amber-600" />
                        <span>Item Unavailable → Forward to Next Shop</span>
                      </button>

                      <button
                        onClick={() => handleUpdateStatus(order.id, 'Cancelled / Rejected')}
                        className="px-3 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-xl font-bold flex items-center gap-1 transition text-xs"
                      >
                        <X className="w-3.5 h-3.5" /> Reject
                      </button>

                      <button
                        onClick={() => handleUpdateStatus(order.id, 'Shop Confirmed')}
                        className="px-4 py-1.5 bg-[#1B4332] text-white hover:bg-[#2D6A4F] rounded-xl font-bold flex items-center gap-1 shadow-xs transition text-xs"
                      >
                        <Check className="w-3.5 h-3.5" /> Accept & Confirm
                      </button>
                    </>
                  )}

                  {order.status === 'Shop Confirmed' && (
                    <button
                      onClick={() => handleUpdateStatus(order.id, 'Picked Up')}
                      className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-xs transition text-xs"
                    >
                      Handover / Mark Picked Up
                    </button>
                  )}

                  {/* If shop uses own delivery, shop can mark delivered (Page 6 requirement) */}
                  {shop?.hasOwnDelivery && order.status === 'Picked Up' && (
                    <button
                      onClick={() => handleUpdateStatus(order.id, 'Delivered')}
                      className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold shadow-xs flex items-center gap-1 transition text-xs"
                    >
                      <Check className="w-3.5 h-3.5" /> Mark Delivered by Shop
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* PAGE 6: "Out of Stock" Reassignment Modal */}
      {reassignModalOpen && reassignTargetOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
                  <RefreshCw className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-gray-900">
                    Forward Order to Nearest Shop
                  </h3>
                  <span className="text-[11px] text-gray-500 font-semibold">
                    Page 6 Requirement • Zero-Loss Order Policy
                  </span>
                </div>
              </div>
              <button
                onClick={() => setReassignModalOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-1">
              <div className="font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>Shop does not have item in stock?</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-relaxed">
                Rather than cancelling the order, Burlamart forwards the order to the next nearest vendor carrying this category to ensure customer fulfillment.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                  Reason for Forwarding:
                </label>
                <select
                  value={reassignReason}
                  onChange={(e) => setReassignReason(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-bold text-gray-800 outline-none focus:border-emerald-600"
                >
                  <option value="Item Out of Stock">1 or more items Out of Stock</option>
                  <option value="Quantity Limit Exceeded">Quantity exceeds current shelf capacity</option>
                  <option value="Shop Peak Hours">Shop busy / Kitchen overwhelmed</option>
                  <option value="Store Closed Early">Store closing early today</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                  Select Next Nearest Partner Shop:
                </label>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {shops.map((s) => (
                    <label
                      key={s.id}
                      className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition ${
                        selectedTargetShopId === s.id
                          ? 'border-emerald-600 bg-emerald-50/50 ring-1 ring-emerald-600'
                          : 'border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="targetShop"
                          checked={selectedTargetShopId === s.id}
                          onChange={() => setSelectedTargetShopId(s.id)}
                          className="text-emerald-700"
                        />
                        <div>
                          <div className="font-bold text-gray-900">{s.name}</div>
                          <div className="text-[11px] text-gray-500">
                            {s.address} • <strong className="text-emerald-800">{s.distanceKm} km away</strong>
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white border border-gray-200 text-gray-600">
                        ⭐ {s.rating}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setReassignModalOpen(false)}
                className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={reassigningLoading}
                onClick={handleConfirmReassign}
                className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-extrabold shadow-md flex items-center gap-1.5 transition disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{reassigningLoading ? 'Forwarding...' : 'Confirm & Forward Order'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
