import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, RefreshCw, Smartphone, Heart } from 'lucide-react';

export const CustomerFooter = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20 pt-12 pb-24 text-gray-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        {/* Brand info */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-[#1B4332] text-white flex items-center justify-center font-bold">
              B
            </div>
            <span className="font-extrabold text-base text-[#1B4332]">Burlamart</span>
          </div>
          <p className="text-gray-500 mb-4 leading-relaxed">
            India's unified multi-category commerce platform. Hyperlocal grocery, stays & services, electronics, and snacks on one unified wallet and delivery network.
          </p>
          <div className="text-[11px] text-emerald-800 font-semibold bg-emerald-50 px-3 py-1.5 rounded-lg inline-block">
            ⚡ 12-Minute Grocery • 100% Verified Vendors
          </div>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-bold text-gray-900 mb-3 uppercase tracking-wider text-[11px]">
            Categories
          </h4>
          <ul className="space-y-2">
            <li><Link to="/category/grocery" className="hover:text-emerald-700">Grocery & Daily Essentials (Blinkit-style)</Link></li>
            <li><Link to="/category/hotels-services" className="hover:text-emerald-700">Hotels & Services (OYO-style)</Link></li>
            <li><Link to="/category/electronics" className="hover:text-emerald-700">Electronics & Gadgets (Amazon-style)</Link></li>
            <li><Link to="/category/packaged-food" className="hover:text-emerald-700">Packaged Foods & Combos</Link></li>
            <li><Link to="/extensions" className="hover:text-emerald-700">Send Parcels & Local Booking</Link></li>
          </ul>
        </div>

        {/* Platform Apps */}
        <div>
          <h4 className="font-bold text-gray-900 mb-3 uppercase tracking-wider text-[11px]">
            Platform Portals
          </h4>
          <ul className="space-y-2">
            <li><Link to="/vendor" className="hover:text-emerald-700 font-medium">Vendor Partner Dashboard</Link></li>
            <li><Link to="/rider" className="hover:text-emerald-700 font-medium">Burlamart Delivery Fleet App</Link></li>
            <li><Link to="/admin" className="hover:text-emerald-700 font-medium">Admin & Template Control Panel</Link></li>
            <li><Link to="/account" className="hover:text-emerald-700">Customer Shared Rewards & Combos</Link></li>
            <li><Link to="/extensions" className="hover:text-emerald-700">Subscriptions & Pay Later (Khata)</Link></li>
          </ul>
        </div>

        {/* Trust Badges */}
        <div>
          <h4 className="font-bold text-gray-900 mb-3 uppercase tracking-wider text-[11px]">
            Trust & Security
          </h4>
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>100% Genuine Products with Brand Warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-700" />
              <span>Real-time Rider & Store Pickup Tracking</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-emerald-700" />
              <span>Easy Cancellation & Instant Wallet Refund</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-400 gap-2">
        <p>© 2026 Burlamart Technologies. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <Link to="/" className="hover:underline">Privacy Policy</Link>
          <Link to="/" className="hover:underline">Terms of Service</Link>
          <Link to="/" className="hover:underline">FSSAI / GST Disclosures</Link>
        </div>
      </div>
    </footer>
  );
};

