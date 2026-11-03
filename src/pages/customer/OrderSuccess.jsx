import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../services/api';
import { CheckCircle2, Gift, ArrowRight, Truck, MapPin } from 'lucide-react';
import { SpinRewardModal } from '../../components/common/SpinRewardModal';

export const OrderSuccess = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [isSpinModalOpen, setIsSpinModalOpen] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      const data = await api.orders.getById(orderId);
      setOrder(data);
      // Auto open spin reward modal after 800ms
      setTimeout(() => {
        setIsSpinModalOpen(true);
      }, 800);
    };
    fetchOrder();
  }, [orderId]);

  return (
    <div className="max-w-xl mx-auto px-4 py-12 text-center space-y-6">
      <div className="w-20 h-20 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-md">
        <CheckCircle2 className="w-12 h-12" />
      </div>

      <div className="space-y-1">
        <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full">
          Payment Recorded Successfully
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
          Order Confirmed!
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Order ID: <span className="font-mono font-bold text-gray-800">{orderId}</span>
        </p>
      </div>

      {/* Order mini card */}
      {order && (
        <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm text-left text-xs space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-gray-100 font-bold">
            <span className="text-gray-600">Shop:</span>
            <span className="text-gray-900">{order.shopName}</span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-gray-100">
            <span className="text-gray-600">Total Amount:</span>
            <span className="font-extrabold text-sm text-emerald-800">₹{order.totalAmount}</span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-gray-100">
            <span className="text-gray-600">Items Count:</span>
            <span className="text-gray-900">{order.items?.length || 2} items</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Delivery Address:</span>
            <span className="text-gray-900 text-right truncate max-w-xs">{order.deliveryAddress}</span>
          </div>
        </div>
      )}

      {/* Spin Reward CTA */}
      <div className="bg-gradient-to-r from-emerald-800 to-[#1B4332] text-white p-5 rounded-3xl shadow-lg flex items-center justify-between gap-3 text-left">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-yellow-400 text-gray-900 flex items-center justify-center font-bold flex-shrink-0">
            <Gift className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-xs sm:text-sm">Spin Wheel Reward Available!</div>
            <p className="text-[11px] text-emerald-200">Claim your instant cashback into your shared wallet.</p>
          </div>
        </div>

        <button
          onClick={() => setIsSpinModalOpen(true)}
          className="px-3.5 py-2 bg-yellow-400 hover:bg-yellow-300 text-gray-950 rounded-xl text-xs font-extrabold transition shadow-sm flex-shrink-0"
        >
          Spin Wheel
        </button>
      </div>

      {/* Navigation action buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Link
          to={`/orders/${orderId}`}
          className="w-full sm:w-auto px-6 py-3 bg-[#1B4332] text-white rounded-2xl text-xs sm:text-sm font-bold shadow-md hover:bg-[#2D6A4F] transition flex items-center justify-center gap-2"
        >
          <Truck className="w-4 h-4" />
          <span>Track Live Delivery</span>
        </Link>

        <Link
          to="/"
          className="w-full sm:w-auto px-6 py-3 bg-gray-100 text-gray-700 rounded-2xl text-xs sm:text-sm font-bold hover:bg-gray-200 transition"
        >
          Continue Shopping
        </Link>
      </div>

      <SpinRewardModal
        isOpen={isSpinModalOpen}
        onClose={() => setIsSpinModalOpen(false)}
        orderTotal={order?.totalAmount || 200}
      />
    </div>
  );
};

