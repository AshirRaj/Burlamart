import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../services/api';
import { useCart } from '../../context/CartContext';
import { 
  Store, 
  MapPin, 
  Star, 
  Clock, 
  Video, 
  Sparkles, 
  Truck, 
  ArrowLeft, 
  Play, 
  Pause,
  Plus, 
  Check, 
  ChevronRight 
} from 'lucide-react';

export const ShopStorefront = () => {
  const { shopId } = useParams();
  const { addToCart } = useCart();
  const [shop, setShop] = useState(null);
  const [products, setProducts] = useState([]);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const autoScrollRef = useRef(null);

  useEffect(() => {
    const fetchShopData = async () => {
      const shopData = await api.shops.getById(shopId);
      setShop(shopData);
      setIsAutoScrolling(shopData?.autoScrollEnabled || false);

      const allProds = await api.products.getAll();
      const shopProds = allProds.filter(p => p.shopId === shopId);
      setProducts(shopProds.length > 0 ? shopProds : allProds.slice(0, 6));
    };
    fetchShopData();
  }, [shopId]);

  // Handle auto-scroll feature if enabled
  useEffect(() => {
    let scrollInterval;
    if (isAutoScrolling) {
      scrollInterval = setInterval(() => {
        window.scrollBy({ top: 1, behavior: 'smooth' });
      }, 50);
    }
    return () => clearInterval(scrollInterval);
  }, [isAutoScrolling]);

  if (!shop) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-gray-500">
        Loading storefront...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <Link to="/" className="hover:text-emerald-800 flex items-center gap-1 font-semibold">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
        <span className="font-bold text-gray-900">{shop.name}</span>
      </div>

      {/* Storefront Hero with Custom Banner & Video Tour */}
      <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm">
        <div className="h-56 sm:h-72 relative overflow-hidden bg-gray-900">
          <img
            src={shop.bannerUrl}
            alt={shop.name}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="bg-emerald-500 text-gray-950 font-extrabold text-[11px] px-2.5 py-0.5 rounded-full">
                {shop.plan || 'Verified Partner'}
              </span>
              <span className="bg-white/20 text-white backdrop-blur-md text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <MapPin className="w-3 h-3 text-emerald-400" /> {shop.distanceKm} km away
              </span>
              <span className="bg-amber-400 text-gray-900 text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <Star className="w-3 h-3 fill-gray-900" /> {shop.rating} ({shop.reviewsCount} reviews)
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              {shop.name}
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 max-w-xl mt-1">
              {shop.address}
            </p>
          </div>
        </div>

        {/* Storefront Controls: Auto-scroll & Logistics */}
        <div className="p-4 sm:p-5 bg-gray-50 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            {shop.hasOwnDelivery ? (
              <span className="bg-amber-100 text-amber-900 px-3 py-1 rounded-xl font-bold flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-amber-700" /> Shop Delivers Directly (₹{shop.ownDeliveryFee})
              </span>
            ) : (
              <span className="bg-emerald-100 text-emerald-900 px-3 py-1 rounded-xl font-bold flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-emerald-700" /> Burlamart Fast Delivery Fleet
              </span>
            )}
            <span className="text-gray-500 font-medium">Min Order: ₹{shop.minOrder}</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Auto-scroll toggle */}
            <button
              onClick={() => setIsAutoScrolling(!isAutoScrolling)}
              className={`px-3 py-1.5 rounded-xl font-bold border transition flex items-center gap-1.5 ${
                isAutoScrolling
                  ? 'bg-emerald-700 text-white border-emerald-700'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
              }`}
              title="Storefront auto-scroll through catalogue"
            >
              {isAutoScrolling ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>Auto-Scroll: {isAutoScrolling ? 'ON' : 'OFF'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Store Pop-up announcement if configured */}
      {shop.popupNotice && showPopup && (
        <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 shadow-sm flex items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-200 text-emerald-800 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h4 className="font-bold text-xs sm:text-sm text-emerald-950">Store Announcement</h4>
              <p className="text-xs text-emerald-800">{shop.popupNotice}</p>
            </div>
          </div>
          <button
            onClick={() => setShowPopup(false)}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 px-2 py-1"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Storefront Video Showcase */}
      {shop.videoUrl && (
        <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm space-y-3">
          <div className="flex items-center gap-2">
            <Video className="w-4 h-4 text-emerald-700" />
            <h3 className="font-extrabold text-sm text-gray-900">Virtual Storefront Tour & Kitchen Preview</h3>
          </div>
          <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black">
            <iframe
              src={shop.videoUrl}
              title="Store Video"
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Product Catalogue for this Shop */}
      <div>
        <h3 className="font-extrabold text-lg text-gray-900 mb-4">
          All Products from {shop.name} ({products.length})
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {products.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-3xl border border-gray-200 p-4 shadow-xs hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-2xl mb-3"
                />
                <div className="text-[11px] font-semibold text-gray-400">{product.weightDisplay}</div>
                <h4 className="font-bold text-sm text-gray-900 line-clamp-2 mb-1">{product.name}</h4>
              </div>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between mt-2">
                <span className="font-extrabold text-base text-gray-900">₹{product.price}</span>
                <button
                  onClick={() => addToCart(product, shop)}
                  className="px-3 py-1.5 bg-[#1B4332] text-white rounded-xl text-xs font-bold hover:bg-[#2D6A4F] transition flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

