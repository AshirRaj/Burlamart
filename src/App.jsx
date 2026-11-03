import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { CartProvider } from './context/CartContext';

// Layouts
import { CustomerLayout } from './layouts/CustomerLayout';
import { VendorLayout } from './layouts/VendorLayout';
import { RiderLayout } from './layouts/RiderLayout';
import { AdminLayout } from './layouts/AdminLayout';

// Customer Pages
import { Home } from './pages/customer/Home';
import { CategoryView } from './pages/customer/CategoryView';
import { ShopStorefront } from './pages/customer/ShopStorefront';
import { SearchResults } from './pages/customer/SearchResults';
import { CartPage } from './pages/customer/CartPage';
import { CheckoutPage } from './pages/customer/CheckoutPage';
import { OrderSuccess } from './pages/customer/OrderSuccess';
import { OrderTracking } from './pages/customer/OrderTracking';
import { Account } from './pages/customer/Account';
import { ExtensionModules } from './pages/customer/ExtensionModules';
import { ProductDetail } from './pages/customer/ProductDetail';

// Vendor Pages
import { VendorDashboard } from './pages/vendor/VendorDashboard';
import { VendorCatalogue } from './pages/vendor/VendorCatalogue';
import { VendorOrders } from './pages/vendor/VendorOrders';
import { VendorStorefront } from './pages/vendor/VendorStorefront';
import { VendorOffers } from './pages/vendor/VendorOffers';
import { VendorMarketing } from './pages/vendor/VendorMarketing';
import { VendorAccount } from './pages/vendor/VendorAccount';
import { VendorExtensions } from './pages/vendor/VendorExtensions';

// Rider Pages
import { RiderDashboard } from './pages/rider/RiderDashboard';
import { RiderActiveTripPage } from './pages/rider/RiderActiveTripPage';
import { RiderEarningsPage } from './pages/rider/RiderEarningsPage';
import { RiderHistoryPage } from './pages/rider/RiderHistoryPage';
import { RiderProfilePage } from './pages/rider/RiderProfilePage';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { CategoryTemplateManager } from './pages/admin/CategoryTemplateManager';
import { VendorManagement } from './pages/admin/VendorManagement';
import { MasterProductTemplates } from './pages/admin/MasterProductTemplates';
import { PlatformSettings } from './pages/admin/PlatformSettings';
import { MonetisationSettings } from './pages/admin/MonetisationSettings';

// Auth & Login
import { Login } from './pages/common/Login';

// Common Utilities
import { ScrollToTop } from './components/common/ScrollToTop';

// Not Found
import { NotFound } from './pages/common/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <AppProvider>
          <CartProvider>
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

              {/* 2. Vendor Dashboard */}
              <Route path="/vendor" element={<VendorLayout />}>
                <Route index element={<VendorDashboard />} />
                <Route path="catalogue" element={<VendorCatalogue />} />
                <Route path="orders" element={<VendorOrders />} />
                <Route path="storefront" element={<VendorStorefront />} />
                <Route path="offers" element={<VendorOffers />} />
                <Route path="marketing" element={<VendorMarketing />} />
                <Route path="account" element={<VendorAccount />} />
                <Route path="extensions" element={<VendorExtensions />} />
              </Route>

              {/* 3. Rider Application */}
              <Route path="/rider" element={<RiderLayout />}>
                <Route index element={<RiderDashboard />} />
                <Route path="active-trip" element={<RiderActiveTripPage />} />
                <Route path="earnings" element={<RiderEarningsPage />} />
                <Route path="history" element={<RiderHistoryPage />} />
                <Route path="profile" element={<RiderProfilePage />} />
              </Route>

              {/* 4. Admin Panel */}
              <Route path="/admin" element={<AdminLayout />}>
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
          </CartProvider>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

