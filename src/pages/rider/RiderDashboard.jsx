import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { api } from '../../services/api';
import { Check } from 'lucide-react';
import {
  RiderOfflineBanner,
  RiderNavigationTabs,
  RiderOverviewTab,
  RiderActiveTripTab,
  RiderEarningsTab,
  RiderHistoryTab,
  RiderDocumentsTab,
  RiderIncomingModal,
  RiderSplitPaymentModal
} from './components';

  export const RiderDashboard = ({ defaultTab = 'overview' }) => {
    const { isOnline, setIsOnline, riderProfile } = useOutletContext();
    const [activeTab, setActiveTab] = useState(defaultTab); // 'overview', 'active-order', 'earnings', 'history', 'profile'
    const [assignedOrder, setAssignedOrder] = useState(null);
    const [incomingTrip, setIncomingTrip] = useState({
      id: 'ORD-98218',
      shopName: 'Burlamart Fresh Supermart',
      shopAddress: 'Sector 14 Main Market (1.2 km away)',
      customerName: 'Pooja Agarwal',
      customerAddress: 'Flat 304, Royal Palms, C-Scheme (2.8 km away)',
      itemsCount: 4,
      payout: 72,
      basePay: 40,
      distancePay: 22,
      surgePay: 10,
      distanceTotalKm: 4.0,
      timeRemainingSeconds: 28
    });

    const [showIncomingModal, setShowIncomingModal] = useState(false);
    const [showSplitPaymentModal, setShowSplitPaymentModal] = useState(false);
    const [cashAmount, setCashAmount] = useState('100');
    const [upiAmount, setUpiAmount] = useState('76');
    const [toast, setToast] = useState(null);

    // Daily Metrics & Earnings
    const [earnings, setEarnings] = useState({
      todayTotal: 680,
      targetToday: 1000,
      ordersCompleted: 9,
      distanceKm: 38.4,
      orderPay: 360,
      distancePay: 268,
      tips: 52,
      surgeBonus: 50
    });

    // Completed deliveries history
    const [deliveryHistory, setDeliveryHistory] = useState([
      { id: 'ORD-98214', time: '10:41 AM', customer: 'Aarav Patel', address: 'Sunshine Heights, Civil Lines', amount: 176, payout: 65, distanceKm: 2.4, rating: 5, payment: 'UPI' },
      { id: 'ORD-98210', time: '09:55 AM', customer: 'Vikas Sharma', address: 'H-12, Malviya Nagar', amount: 420, payout: 75, distanceKm: 3.8, rating: 5, payment: 'Prepaid' },
      { id: 'ORD-98205', time: '09:12 AM', customer: 'Ananya Roy', address: 'Block C, Raja Park', amount: 150, payout: 58, distanceKm: 1.8, rating: 4, payment: 'Cash' },
      { id: 'ORD-98198', time: '08:30 AM', customer: 'Rohit Joshi', address: 'Sector 3, Jawahar Nagar', amount: 620, payout: 82, distanceKm: 4.5, rating: 5, payment: 'COD (Split)' },
    ]);

    useEffect(() => {
      const fetchActiveOrder = async () => {
        const orders = await api.orders.getAll();
        const active = orders.find(o => o.status !== 'Delivered') || orders[0];
        setAssignedOrder(active);
      };
      fetchActiveOrder();
    }, []);

    const showToast = (msg) => {
      setToast(msg);
      setTimeout(() => setToast(null), 3500);
    };

    // Accept incoming trip request
    const handleAcceptIncoming = () => {
      setShowIncomingModal(false);
      const newAssigned = {
        id: incomingTrip.id,
        shopName: incomingTrip.shopName,
        shopAddress: incomingTrip.shopAddress,
        customerName: incomingTrip.customerName,
        customerAddress: incomingTrip.customerAddress,
        customerPhone: '+91 98222 55443',
        totalAmount: 245,
        items: [
          { name: 'Fresh Farm Tomatoes', quantity: 2, price: 38 },
          { name: 'Full Cream Dairy Milk', quantity: 2, price: 68 }
        ],
        paymentMethod: 'COD',
        status: 'Rider Assigned',
        distanceKm: incomingTrip.distanceTotalKm
      };
      setAssignedOrder(newAssigned);
      setActiveTab('active-order');
      showToast(`Order #${incomingTrip.id} accepted! Navigating to ${incomingTrip.shopName}.`);
    };

    // Reject incoming order -> backend auto-assigns next nearest rider
    const handleRejectIncoming = () => {
      setShowIncomingModal(false);
      showToast('Order declined. Backend automatically assigned next nearest available rider (Sanjay Rawat).');
    };

    // Delivery status progression
    const handleAdvanceDeliveryStage = async (nextStatus) => {
      if (!assignedOrder) return;

      if (nextStatus === 'Delivered' && assignedOrder.paymentMethod === 'COD') {
        setShowSplitPaymentModal(true);
        return;
      }

      await api.orders.updateStatus(assignedOrder.id, nextStatus, 'Rider Deepak Kumar updated delivery progress');
      setAssignedOrder(prev => ({ ...prev, status: nextStatus }));
      showToast(`Status updated to "${nextStatus}"!`);

      if (nextStatus === 'Delivered') {
        const tripEarning = 68;
        setEarnings(prev => ({
          ...prev,
          todayTotal: prev.todayTotal + tripEarning,
          ordersCompleted: prev.ordersCompleted + 1,
          distanceKm: prev.distanceKm + 2.8,
          orderPay: prev.orderPay + 40,
          distancePay: prev.distancePay + 28
        }));
        setDeliveryHistory(prev => [
          {
            id: assignedOrder.id,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            customer: assignedOrder.customerName,
            address: assignedOrder.deliveryAddress,
            amount: assignedOrder.totalAmount,
            payout: tripEarning,
            distanceKm: 2.8,
            rating: 5,
            payment: assignedOrder.paymentMethod
          },
          ...prev
        ]);
      }
    };

    // Confirm COD Split Payment
    const handleConfirmSplitPayment = async (e) => {
      e.preventDefault();
      const splitData = {
        cash: Number(cashAmount),
        upi: Number(upiAmount),
        totalRecorded: Number(cashAmount) + Number(upiAmount)
      };

      await api.orders.recordSplitPayment(assignedOrder.id, splitData);
      setShowSplitPaymentModal(false);
      setAssignedOrder(prev => ({ ...prev, status: 'Delivered', codSplit: splitData }));
      showToast(`Recorded COD Split Payment: ₹${cashAmount} Cash + ₹${upiAmount} UPI = ₹${splitData.totalRecorded}!`);
    };

    if (!isOnline) {
      return <RiderOfflineBanner onGoOnline={() => setIsOnline(true)} />;
    }

    return (
      <div className="space-y-6">
        {/* Rider Navigation Ribbon Tabs */}
        <RiderNavigationTabs
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          activeOrderCount={assignedOrder ? 1 : null}
        />

        {toast && (
          <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-2xl p-4 text-xs font-bold flex items-center gap-2 animate-fadeIn shadow-lg">
            <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{toast}</span>
          </div>
        )}

        {/* 1. OVERVIEW / DASHBOARD TAB */}
        {activeTab === 'overview' && (
          <RiderOverviewTab
            riderProfile={riderProfile}
            earnings={earnings}
            assignedOrder={assignedOrder}
            onViewProfile={() => setActiveTab('profile')}
            onOpenNavigation={() => setActiveTab('active-order')}
            onSimulateIncoming={() => setShowIncomingModal(true)}
          />
        )}

        {/* 2. ACTIVE DELIVERY & LIVE NAVIGATION TAB */}
        {activeTab === 'active-order' && (
          <RiderActiveTripTab
            assignedOrder={assignedOrder}
            onAdvanceDeliveryStage={handleAdvanceDeliveryStage}
            onReroute={() => showToast('Recalculating route...')}
            onGoToDashboard={() => setActiveTab('overview')}
          />
        )}

        {/* 3. EARNINGS & PAYOUTS TAB */}
        {activeTab === 'earnings' && (
          <RiderEarningsTab
            earnings={earnings}
            riderProfile={riderProfile}
            onInstantTransfer={() =>
              showToast(`Instant withdrawal of ₹${earnings.todayTotal} transferred to ${riderProfile.upiId} via IMPS!`)
            }
          />
        )}

        {/* 4. TRIP HISTORY TAB */}
        {activeTab === 'history' && (
          <RiderHistoryTab deliveryHistory={deliveryHistory} />
        )}

        {/* 5. DEDICATED PROFILE & VERIFIED DOCUMENTS TAB */}
        {activeTab === 'profile' && (
          <RiderDocumentsTab riderProfile={riderProfile} />
        )}

        {/* INCOMING TRIP REQUEST MODAL */}
        {showIncomingModal && (
          <RiderIncomingModal
            incomingTrip={incomingTrip}
            onAccept={handleAcceptIncoming}
            onReject={handleRejectIncoming}
          />
        )}

        {/* COD SPLIT PAYMENT MODAL */}
        {showSplitPaymentModal && assignedOrder && (
          <RiderSplitPaymentModal
            cashAmount={cashAmount}
            setCashAmount={setCashAmount}
            upiAmount={upiAmount}
            setUpiAmount={setUpiAmount}
            onConfirm={handleConfirmSplitPayment}
            onCancel={() => setShowSplitPaymentModal(false)}
          />
        )}
      </div>
    );
  };
