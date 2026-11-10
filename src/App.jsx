import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { CartProvider } from './context/CartContext';

// Critical Eager Layouts & Landing Page
import { CustomerLayout } from './layouts/CustomerLayout';
import { Home } from './pages/customer/Home';
import { Login } from './pages/common/Login';
import { ScrollToTop } from './components/common/ScrollToTop';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { NotFound } from './pages/common/NotFound';

// Helper for lazy-loading named exports cleanly
const lazyNamed = (loader, name) => lazy(() => loader().then((m) => ({ default: m[name] })));

// Secondary Customer Pages (Code-split)
const CategoryView = lazyNamed(() => import('./pages/customer/CategoryView'), 'CategoryView');
const ShopStorefront = lazyNamed(() => import('./pages/customer/ShopStorefront'), 'ShopStorefront');
const SearchResults = lazyNamed(() => import('./pages/customer/SearchResults'), 'SearchResults');
const CartPage = lazyNamed(() => import('./pages/customer/CartPage'), 'CartPage');
const CheckoutPage = lazyNamed(() => import('./pages/customer/CheckoutPage'), 'CheckoutPage');
const OrderSuccess = lazyNamed(() => import('./pages/customer/OrderSuccess'), 'OrderSuccess');
const OrderTracking = lazyNamed(() => import('./pages/customer/OrderTracking'), 'OrderTracking');
const Account = lazyNamed(() => import('./pages/customer/Account'), 'Account');
const ExtensionModules = lazyNamed(() => import('./pages/customer/ExtensionModules'), 'ExtensionModules');
const ProductDetail = lazyNamed(() => import('./pages/customer/ProductDetail'), 'ProductDetail');

// Vendor Portal (Code-split)
const VendorLayout = lazyNamed(() => import('./layouts/VendorLayout'), 'VendorLayout');
const VendorDashboard = lazyNamed(() => import('./pages/vendor/VendorDashboard'), 'VendorDashboard');
const VendorCatalogue = lazyNamed(() => import('./pages/vendor/VendorCatalogue'), 'VendorCatalogue');
const VendorOrders = lazyNamed(() => import('./pages/vendor/VendorOrders'), 'VendorOrders');
const VendorStorefront = lazyNamed(() => import('./pages/vendor/VendorStorefront'), 'VendorStorefront');
const VendorOffers = lazyNamed(() => import('./pages/vendor/VendorOffers'), 'VendorOffers');
const VendorMarketing = lazyNamed(() => import('./pages/vendor/VendorMarketing'), 'VendorMarketing');
const VendorAccount = lazyNamed(() => import('./pages/vendor/VendorAccount'), 'VendorAccount');
const VendorExtensions = lazyNamed(() => import('./pages/vendor/VendorExtensions'), 'VendorExtensions');

// Rider Portal (Code-split)
const RiderLayout = lazyNamed(() => import('./layouts/RiderLayout'), 'RiderLayout');
const RiderDashboard = lazyNamed(() => import('./pages/rider/RiderDashboard'), 'RiderDashboard');
const RiderActiveTripPage = lazyNamed(() => import('./pages/rider/RiderActiveTripPage'), 'RiderActiveTripPage');
const RiderEarningsPage = lazyNamed(() => import('./pages/rider/RiderEarningsPage'), 'RiderEarningsPage');
const RiderHistoryPage = lazyNamed(() => import('./pages/rider/RiderHistoryPage'), 'RiderHistoryPage');
const RiderProfilePage = lazyNamed(() => import('./pages/rider/RiderProfilePage'), 'RiderProfilePage');

// Admin Portal (Code-split)
const AdminLayout = lazyNamed(() => import('./layouts/AdminLayout'), 'AdminLayout');
const AdminDashboard = lazyNamed(() => import('./pages/admin/AdminDashboard'), 'AdminDashboard');
const CategoryTemplateManager = lazyNamed(() => import('./pages/admin/CategoryTemplateManager'), 'CategoryTemplateManager');
const VendorManagement = lazyNamed(() => import('./pages/admin/VendorManagement'), 'VendorManagement');
const MasterProductTemplates = lazyNamed(() => import('./pages/admin/MasterProductTemplates'), 'MasterProductTemplates');
const PlatformSettings = lazyNamed(() => import('./pages/admin/PlatformSettings'), 'PlatformSettings');
const MonetisationSettings = lazyNamed(() => import('./pages/admin/MonetisationSettings'), 'MonetisationSettings');

const RouteFallback = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-gray-500">
    <div className="w-10 h-10 border-4 border-[#1B4332] border-t-transparent rounded-full animate-spin mb-3" />
    <p className="text-xs font-bold tracking-wide">Loading Burlamart module...</p>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <AppProvider>
          <CartProvider>
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                {/* Standalone Authentication with Mobile & OTP */}
                <Route path="/login" element={<Login />} />

                {/* 1. Customer Application */}
                <Route path="/" element={<CustomerLayout />}>
                  <Route index element={<Home />} />
                  <Route path="category/:categoryId" element={<CategoryView />} />
                  <Route path="storefront/:shopId" element={<ShopStorefront />} />
                  <Route path="search" element={<SearchResults />} />
                  <Route path="cart" element={<CartPage />} />
                  <Route path="checkout" element={<CheckoutPage />} />
                  <Route path="order-success/:orderId" element={<OrderSuccess />} />
                  <Route path="orders/:orderId" element={<OrderTracking />} />
                  <Route path="account" element={<Account />} />
                  <Route path="extensions" element={<ExtensionModules />} />
                  <Route path="product/:productId" element={<ProductDetail />} />
                </Route>

                {/* 2. Vendor Dashboard (Role-Guarded) */}
                <Route
                  path="/vendor"
                  element={
                    <ProtectedRoute allowedRoles={['vendor', 'admin']}>
                      <VendorLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<VendorDashboard />} />
                  <Route path="catalogue" element={<VendorCatalogue />} />
                  <Route path="orders" element={<VendorOrders />} />
                  <Route path="storefront" element={<VendorStorefront />} />
                  <Route path="offers" element={<VendorOffers />} />
                  <Route path="marketing" element={<VendorMarketing />} />
                  <Route path="account" element={<VendorAccount />} />
                  <Route path="extensions" element={<VendorExtensions />} />
                </Route>

                {/* 3. Rider Application (Role-Guarded) */}
                <Route
                  path="/rider"
                  element={
                    <ProtectedRoute allowedRoles={['rider', 'admin']}>
                      <RiderLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<RiderDashboard />} />
                  <Route path="active-trip" element={<RiderActiveTripPage />} />
                  <Route path="earnings" element={<RiderEarningsPage />} />
                  <Route path="history" element={<RiderHistoryPage />} />
                  <Route path="profile" element={<RiderProfilePage />} />
                </Route>

                {/* 4. Admin Panel (Role-Guarded) */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<AdminDashboard />} />
                  <Route path="templates" element={<CategoryTemplateManager />} />
                  <Route path="vendors" element={<VendorManagement />} />
                  <Route path="master-templates" element={<MasterProductTemplates />} />
                  <Route path="settings" element={<PlatformSettings />} />
                  <Route path="monetisation" element={<MonetisationSettings />} />
                </Route>

                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </CartProvider>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
