import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { CheckoutFulfillment } from '../../components/checkout/CheckoutFulfillment';
import { CheckoutAddress } from '../../components/checkout/CheckoutAddress';
import { CheckoutPayment } from '../../components/checkout/CheckoutPayment';
import { CheckoutBill } from '../../components/checkout/CheckoutBill';

export const CheckoutPage = () => {
  const { 
    cartItems, 
    currentShop, 
    deliveryType, 
    setDeliveryType, 
    address, 
    setAddress, 
    distanceKm, 
    setDistanceKm, 
    useFastDelivery, 
    setUseFastDelivery, 
    isPackagingMandatory, 
    isFastDeliveryEligible, 
    isEmiEligible, 
    isHotelStay,
    chargesBreakdown,
    clearCart,
    subtotal
  } = useCart();

  const { platformSettings, sharedWalletBalance, debitSharedWallet } = useApp();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Payment states
  const [selectedPayment, setSelectedPayment] = useState('UPI'); // 'UPI', 'CARD', 'COD', 'EMI'
  const [useWalletOffset, setUseWalletOffset] = useState(false);
  const [selectedEmiTenure, setSelectedEmiTenure] = useState(6);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [gpsSimulating, setGpsSimulating] = useState(false);

  // Guest details state (for Hotels & Homestays)
  const [guestInfo, setGuestInfo] = useState({
    name: currentUser?.name || '',
    phone: currentUser?.phone || '',
    checkInTime: '12:00 PM - 02:00 PM',
    specialRequests: ''
  });

  // Address "Current-location button fills the address" (Page 5 requirement)
  const handleUseCurrentLocation = () => {
    setGpsSimulating(true);
    setTimeout(() => {
      setAddress('Current GPS: Tower 3, Malviya Nagar Tech Corridor, Jaipur (Distance: 1.8 km)');
      setDistanceKm(1.8);
      setGpsSimulating(false);
    }, 800);
  };

  // Wallet deduction calculation
  const walletDeduction = useWalletOffset ? Math.min(sharedWalletBalance, chargesBreakdown.total) : 0;
  const finalPayable = Math.max(0, chargesBreakdown.total - walletDeduction);

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    try {
      const orderPayload = {
        customerId: currentUser?.id || 'guest-1',
        customerName: isHotelStay ? (guestInfo.name || currentUser?.name) : currentUser?.name,
        customerPhone: isHotelStay ? (guestInfo.phone || currentUser?.phone) : currentUser?.phone,
        deliveryAddress: isHotelStay ? `Direct Hotel Check-in (${guestInfo.checkInTime})` : address,
        distanceKm: isHotelStay ? 0 : distanceKm,
        shopId: currentShop?.id || 'shop-1',
        shopName: currentShop?.name || 'Burlamart Partner',
        items: cartItems.map(i => ({
          id: i.id,
          name: i.name,
          quantity: i.quantity,
          price: i.price,
          weightKg: i.weightKg || 0.2,
          bookingDetails: i.bookingDetails || null
        })),
        itemSubtotal: subtotal,
        deliveryType: isHotelStay ? 'hotel-checkin' : deliveryType,
        deliveryFee: chargesBreakdown.deliveryFee,
        weightCharge: chargesBreakdown.weightCharge,
        quantityCharge: chargesBreakdown.quantityCharge,
        packagingCharge: chargesBreakdown.packagingCharge,
        fastDeliveryCharge: chargesBreakdown.fastDeliveryCharge,
        totalAmount: finalPayable,
        paymentMethod: selectedPayment,
        paymentStatus: selectedPayment === 'COD' ? 'Pending' : 'Recorded',
        walletUsed: walletDeduction,
        isHotelBooking: isHotelStay,
        specialRequests: guestInfo.specialRequests || ''
      };

      const placedOrder = await api.orders.create(orderPayload);

      if (walletDeduction > 0) {
        debitSharedWallet(walletDeduction);
      }

      clearCart();
      navigate(`/order-success/${placedOrder.id}`);
    } catch (err) {
      console.error('Failed to place order', err);
      alert('Order submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Your cart is empty</h2>
        <Link to="/" className="text-emerald-800 font-bold hover:underline">
          Return to shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-6 sm:space-y-8 overflow-hidden">
      {/* Checkout Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <Link to="/cart" className="hover:text-emerald-800 flex items-center gap-1 font-semibold">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Cart
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
        <span className="font-bold text-gray-900">
          {isHotelStay ? 'Hotel Reservation & Front-Desk Confirmation' : 'Checkout & Configurable Charges'}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Delivery/Pickup/Checkin, Address & Payment */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1. Fulfillment Option (Hotel Check-in vs Doorstep/Store Pickup) */}
          <CheckoutFulfillment
            isHotelStay={isHotelStay}
            deliveryType={deliveryType}
            setDeliveryType={setDeliveryType}
            currentShop={currentShop}
          />

          {/* 2. Address / Primary Guest Details */}
          <CheckoutAddress
            isHotelStay={isHotelStay}
            deliveryType={deliveryType}
            address={address}
            setAddress={setAddress}
            distanceKm={distanceKm}
            setDistanceKm={setDistanceKm}
            gpsSimulating={gpsSimulating}
            onUseCurrentLocation={handleUseCurrentLocation}
            useFastDelivery={useFastDelivery}
            setUseFastDelivery={setUseFastDelivery}
            isFastDeliveryEligible={isFastDeliveryEligible}
            platformSettings={platformSettings}
            currentShop={currentShop}
            currentUser={currentUser}
            guestInfo={guestInfo}
            setGuestInfo={setGuestInfo}
          />

          {/* 3. Payment Method Selection */}
          <CheckoutPayment
            isHotelStay={isHotelStay}
            selectedPayment={selectedPayment}
            setSelectedPayment={setSelectedPayment}
            useWalletOffset={useWalletOffset}
            setUseWalletOffset={setUseWalletOffset}
            sharedWalletBalance={sharedWalletBalance}
            isEmiEligible={isEmiEligible}
            selectedEmiTenure={selectedEmiTenure}
            setSelectedEmiTenure={setSelectedEmiTenure}
            finalPayable={finalPayable}
          />
        </div>

        {/* Right Column: Complete Configurable Charges Breakdown */}
        <div className="space-y-6">
          <CheckoutBill
            cartItems={cartItems}
            isHotelStay={isHotelStay}
            deliveryType={deliveryType}
            distanceKm={distanceKm}
            chargesBreakdown={chargesBreakdown}
            isPackagingMandatory={isPackagingMandatory}
            walletDeduction={walletDeduction}
            finalPayable={finalPayable}
            isSubmitting={isSubmitting}
            onPlaceOrder={handlePlaceOrder}
          />
        </div>
      </div>
    </div>
  );
};
