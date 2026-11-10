import React, { useState, useEffect, useCallback } from 'react';
import { useOutletContext } from 'react-router-dom';
import { api } from '../../services/api';
import { playOrderNotificationChime } from '../../utils/notificationSound';
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
      shopAddress: 'VSSUT Road, Main Market, Burla (1.2 km away)',
      customerName: 'Pooja Agarwal',
      customerAddress: 'Hall-2, Jyoti Vihar, Sambalpur University (2.8 km away)',
      itemsCount: 4,
      payout: 72,
      basePay: 40,
      distancePay: 22,
      surgePay: 10,
      distanceTotalKm: 4.0,
      timeRemainingSeconds: 28
    });

    const [showIncomingModal, setShowIncomingModal] = useState(false);
    const [dismissedOrderIds, setDismissedOrderIds] = useState([]);
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

    // Completed deliveries history (Odisha zones)
    const [deliveryHistory, setDeliveryHistory] = useState([
      { id: 'ORD-98214', time: '10:41 AM', customer: 'Aarav Patel', address: 'Hall-4, VSSUT Campus, Burla', amount: 176, payout: 65, distanceKm: 2.4, rating: 5, payment: 'UPI' },
      { id: 'ORD-98210', time: '09:55 AM', customer: 'Vikas Sharma', address: 'Qtr 12, Hirakud Colony, Sambalpur', amount: 420, payout: 75, distanceKm: 3.8, rating: 5, payment: 'Prepaid' },
      { id: 'ORD-98205', time: '09:12 AM', customer: 'Ananya Roy', address: 'Block C, Jyoti Vihar, Burla', amount: 150, payout: 58, distanceKm: 1.8, rating: 4, payment: 'Cash' },
      { id: 'ORD-98198', time: '08:30 AM', customer: 'Rohit Joshi', address: 'Khetrajpur Main Rd, Sambalpur', amount: 620, payout: 82, distanceKm: 4.5, rating: 5, payment: 'COD (Split)' },
    ]);

    const syncLiveOrders = useCallback(async () => {
      const orders = await api.orders.getAll();
      // Active trip assigned or picked up
      const active = orders.find(o => o.status === 'Rider Assigned' || o.status === 'Picked Up') ||
                     orders.find(o => o.status !== 'Delivered' && o.status !== 'Cancelled / Rejected') ||
                     orders[0];
      setAssignedOrder(active);

      // Check for vendor-dispatched "Ready for Pickup" order
      const dispatchReady = orders.find(
        o => o.status === 'Ready for Pickup' && !dismissedOrderIds.includes(o.id)
      );
      if (dispatchReady) {
        setIncomingTrip({
          id: dispatchReady.id,
          shopName: dispatchReady.shopName || 'Burlamart Partner Store',
          shopAddress: 'VSSUT Road, Burla, Sambalpur',
          customerName: dispatchReady.customerName || 'Customer',
          customerAddress: dispatchReady.deliveryAddress || 'Burla, Sambalpur',
          itemsCount: dispatchReady.items?.length || 1,
          items: dispatchReady.items,
          totalAmount: dispatchReady.totalAmount,
          paymentMethod: dispatchReady.paymentMethod || 'UPI',
          deliveryPin: dispatchReady.deliveryPin,
          payout: Math.max(45, Math.round((dispatchReady.distanceKm || 2.5) * 18 + 20)),
          basePay: 40,
          distancePay: Math.round((dispatchReady.distanceKm || 2.5) * 10),
          surgePay: 10,
          distanceTotalKm: dispatchReady.distanceKm || 2.5,
          timeRemainingSeconds: 30,
          isLiveDispatch: true
        });
        if (isOnline) {
          playOrderNotificationChime();
          setShowIncomingModal(true);
        }
      }
    }, [dismissedOrderIds, isOnline]);

    useEffect(() => {
      syncLiveOrders();
      const handleSync = () => syncLiveOrders();
      window.addEventListener('storage', handleSync);
      window.addEventListener('burlamart_db_updated', handleSync);
      return () => {
        window.removeEventListener('storage', handleSync);
        window.removeEventListener('burlamart_db_updated', handleSync);
      };
    }, [syncLiveOrders]);

    const showToast = (msg) => {
      setToast(msg);
      setTimeout(() => setToast(null), 3500);
    };

    // Accept incoming trip request
    const handleAcceptIncoming = async () => {
      setShowIncomingModal(false);
      if (incomingTrip.isLiveDispatch) {
        const updated = await api.orders.updateStatus(
          incomingTrip.id,
          'Rider Assigned',
          `Rider ${riderProfile?.name || 'Deepak Kumar'} accepted trip`
        );
        if (updated) {
          setAssignedOrder(updated);
          setActiveTab('active-order');
          showToast(`Live Order #${incomingTrip.id} accepted! Navigating to ${incomingTrip.shopName}.`);
          return;
        }
      }

      const newAssigned = {
        id: incomingTrip.id,
        shopName: incomingTrip.shopName,
        shopAddress: incomingTrip.shopAddress,
        customerName: incomingTrip.customerName,
        customerAddress: incomingTrip.customerAddress,
        deliveryAddress: incomingTrip.customerAddress,
        customerPhone: '+91 98222 55443',
        totalAmount: incomingTrip.totalAmount || 245,
        deliveryPin: incomingTrip.deliveryPin || '1234',
        items: incomingTrip.items || [
          { name: 'Fresh Farm Desi Tomatoes', quantity: 2, price: 38 },
          { name: 'Full Cream Dairy Milk', quantity: 2, price: 68 }
        ],
        paymentMethod: incomingTrip.paymentMethod || 'COD',
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
      setDismissedOrderIds(prev => [...prev, incomingTrip.id]);
      showToast('Order declined. Backend automatically assigned next nearest available rider (Sanjay Rawat).');
    };

    // Delivery status progression
    const handleAdvanceDeliveryStage = async (nextStatus, extraFields = {}) => {
      if (!assignedOrder) return;

      if (nextStatus === 'Delivered' && assignedOrder.paymentMethod === 'COD') {
        setShowSplitPaymentModal(true);
        return;
      }

      await api.orders.updateStatus(assignedOrder.id, nextStatus, `Rider Deepak Kumar updated delivery progress`, extraFields);
      setAssignedOrder(prev => ({ ...prev, ...extraFields, status: nextStatus }));
      showToast(`Status updated to "${nextStatus}"!`);

      if (nextStatus === 'Delivered') {
        const tripEarning = 68;
        setEarnings(prev => ({
          ...prev,
          todayTotal: prev.todayTotal + tripEarning,
          ordersCompleted: prev.ordersCompleted + 1,
          distanceKm: Number((prev.distanceKm + (assignedOrder.distanceKm || 2.8)).toFixed(1)),
          orderPay: prev.orderPay + 40,
          distancePay: prev.distancePay + 28
        }));
        setDeliveryHistory(prev => [
          {
            id: assignedOrder.id,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            customer: assignedOrder.customerName,
            address: assignedOrder.deliveryAddress || assignedOrder.customerAddress,
            amount: assignedOrder.totalAmount,
            payout: tripEarning,
            distanceKm: assignedOrder.distanceKm || 2.8,
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
