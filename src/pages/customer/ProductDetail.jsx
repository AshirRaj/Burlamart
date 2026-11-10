import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { useCart } from '../../context/CartContext';
import { ALL_ELECTRONICS_PRODUCTS } from '../../components/electronics/electronicsData';
import { AmazonEmiModal, AmazonComparisonModal } from '../../components/electronics';
import { 
  Star, 
  Truck, 
  ShieldCheck, 
  Store, 
  MapPin, 
  Plus, 
  Minus, 
  Check, 
  CreditCard, 
  Sparkles, 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Share2, 
  Heart,
  ChevronRight,
  Zap,
  Tag,
  Info,
  Users,
  Moon,
  BedDouble,
  RotateCcw,
  Award,
  Scale
} from 'lucide-react';

export const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { cartItems, addToCart, updateQuantity } = useCart();

  const [product, setProduct] = useState(null);
  const [shop, setShop] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('');
  
  // Amazon-style Modals & Warranty State
  const [showEmiModal, setShowEmiModal] = useState(false);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [compareList, setCompareList] = useState([]);
  const [extendedWarranty, setExtendedWarranty] = useState(false);

  // Hotel Stay Duration & Persons State
  const [checkInDate, setCheckInDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [checkOutDate, setCheckOutDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 3); // 2 nights default
    return d.toISOString().split('T')[0];
  });
  const [hotelAdults, setHotelAdults] = useState(2);
  const [hotelChildren, setHotelChildren] = useState(0);
  const [hotelRooms, setHotelRooms] = useState(1);
  const [bookingSlot, setBookingSlot] = useState('12:00 PM');
  const [toastNotice, setToastNotice] = useState(null);
  const [loading, setLoading] = useState(true);

  // Nights Calculation
  const calculateHotelNights = () => {
    const inD = new Date(checkInDate);
    const outD = new Date(checkOutDate);
    const diffDays = Math.round((outD - inD) / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const hotelNights = calculateHotelNights();

  // Price Calculation for Hotel Stay
  const getHotelPricing = () => {
    if (!product) return { total: 0, nights: 1 };
    const nights = hotelNights;
    const baseRoomTotal = product.price * nights * hotelRooms;
    const baseCapacity = hotelRooms * 2;
    const extraAdults = Math.max(0, hotelAdults - baseCapacity);
    const extraCharge = extraAdults * 500 * nights;
    const total = baseRoomTotal + extraCharge;
    return {
      nights,
      rooms: hotelRooms,
      adults: hotelAdults,
      children: hotelChildren,
      baseRoomTotal,
      extraAdults,
      extraCharge,
      total
    };
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const prod = await api.products.getById(productId);
        if (prod) {
          setProduct(prod);
          setSelectedImage(prod.image);
          if (prod.availableSizes && prod.availableSizes.length > 0) {
            setSelectedSize(prod.availableSizes[0]);
          }
          if (prod.availableColors && prod.availableColors.length > 0) {
            setSelectedColor(prod.availableColors[0]);
          }

          // Fetch shop
          const shopData = await api.shops.getById(prod.shopId);
          setShop(shopData);

          // Fetch related products in same category (show minimum 10 products!)
          const allProds = await api.products.getAll({ category: prod.category });
          const filtered = allProds.filter(p => p.id !== prod.id);
          const combined = filtered.length >= 10 
            ? filtered.slice(0, 12) 
            : [...filtered, ...ALL_ELECTRONICS_PRODUCTS.filter(p => p.id !== prod.id)].slice(0, 12);
          setRelatedProducts(combined);
        }
      } catch (err) {
        console.error('Failed to load product details', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [productId]);

  const showToast = (msg) => {
    setToastNotice(msg);
    setTimeout(() => setToastNotice(null), 3500);
  };

  const cartItem = cartItems.find(i => i.id === product?.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    const isHotel = product.category === 'hotels-services';
    const pricing = isHotel ? getHotelPricing() : null;

    const payload = {
      ...product,
      price: isHotel ? pricing.total : product.price, // Multi-night price calculation for hotels!
      pricePerNight: isHotel ? product.price : undefined,
      selectedSize: product.availableSizes ? selectedSize : undefined,
      selectedColor: product.availableColors ? selectedColor : undefined,
      bookingDetails: isHotel ? {
        checkInDate,
        checkOutDate,
        totalNights: pricing.nights,
        adults: hotelAdults,
        children: hotelChildren,
        rooms: hotelRooms,
        timeSlot: bookingSlot,
        pricePerNight: product.price,
        totalStayPrice: pricing.total,
        extraAdultsFee: pricing.extraCharge
      } : undefined
    };

    addToCart(payload, shop);
    showToast(
      isHotel 
        ? `Reserved ${product.name} for ${pricing.nights} Night(s) (${hotelAdults} Persons) — ₹${pricing.total}! Added to cart.`
        : `Added ${product.name} to cart!`
    );
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-gray-500">
        <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="font-semibold text-sm">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-black text-gray-900">Product Not Found</h2>
        <p className="text-sm text-gray-500">
          This item may have been removed or is currently unavailable.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1B4332] text-white rounded-xl text-xs font-bold hover:bg-[#2D6A4F] transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    );
  }

  const effectiveMrp = product.mrp || product.originalPrice || product.price;
  const effectiveDiscountPct = product.discountPct || (effectiveMrp > product.price ? Math.round(((effectiveMrp - product.price) / effectiveMrp) * 100) : 0);

  const galleryList = product.gallery && product.gallery.length > 0 
    ? product.gallery 
    : [product.image];

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-6 sm:space-y-8 overflow-hidden">
      {/* Breadcrumb Navigation */}
      <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
        <Link to="/" className="hover:text-emerald-800 flex items-center gap-1 font-semibold">
          <ArrowLeft className="w-3.5 h-3.5" /> Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
        <Link to={`/category/${product.category}`} className="hover:text-emerald-800 font-semibold capitalize">
          {product.category.replace('-', ' ')}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
        <span className="font-bold text-gray-900 truncate max-w-xs sm:max-w-md">{product.name}</span>
      </div>

      {toastNotice && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-2xl p-4 text-xs font-bold flex items-center justify-between animate-fadeIn shadow-sm">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-700 flex-shrink-0" />
            <span>{toastNotice}</span>
          </div>
          <Link to="/cart" className="px-3 py-1 bg-[#1B4332] text-white rounded-lg text-xs font-bold hover:bg-[#2D6A4F]">
            View Cart →
          </Link>
        </div>
      )}

      {/* Main PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Image Gallery (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-4 border border-gray-200 shadow-sm relative flex items-center justify-center h-80 sm:h-96 overflow-hidden">
            <img
              src={selectedImage}
              alt={product.name}
              className="max-h-full max-w-full object-contain transition duration-300"
            />
            {product.discountPct && (
              <span className="absolute top-4 left-4 bg-[#1B4332] text-emerald-200 font-extrabold text-xs px-2.5 py-1 rounded-lg shadow-sm">
                {product.discountPct}% OFF
              </span>
            )}
            {product.badge && (
              <span className="absolute top-4 right-4 bg-emerald-100 text-emerald-900 font-extrabold text-xs px-2.5 py-1 rounded-lg shadow-sm">
                {product.badge}
              </span>
            )}
          </div>

          {/* Thumbnails without horizontal scroll (wrap cleanly in rows) */}
          {galleryList.length > 1 && (
            <div className="flex flex-wrap gap-2.5">
              {galleryList.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-16 h-16 rounded-2xl overflow-hidden border-2 p-1 bg-white transition ${
                    selectedImage === img ? 'border-emerald-700 ring-2 ring-emerald-200' : 'border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <img src={img} alt="Thumb" className="w-full h-full object-cover rounded-xl" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Info & Actions (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded">
                {product.category.replace('-', ' ')}
              </span>
              {product.brand && (
                <span className="text-[11px] font-bold text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded">
                  Brand: {product.brand}
                </span>
              )}
              <div className="flex items-center gap-1 bg-amber-50 text-amber-900 text-xs font-bold px-2.5 py-0.5 rounded">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
                <span className="text-gray-400 font-normal">({product.reviewsCount || product.reviewCount || 120} reviews)</span>
              </div>
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight">
              {product.name}
            </h1>

            <div className="text-xs text-gray-500 font-medium">
              Net Quantity / Specification: <strong className="text-gray-800">{product.weightDisplay || product.weight || '1 unit'}</strong>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="bg-gray-50/80 p-4 sm:p-5 rounded-3xl border border-gray-200 space-y-2">
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                ₹{product.price.toLocaleString()}
              </span>
              {effectiveMrp > product.price && (
                <span className="text-sm text-gray-400 line-through">
                  ₹{effectiveMrp.toLocaleString()}
                </span>
              )}
              {effectiveDiscountPct > 0 && (
                <span className="text-xs font-extrabold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  Save ₹{(effectiveMrp - product.price).toLocaleString()} ({effectiveDiscountPct}% OFF)
                </span>
              )}
            </div>

            <div className="text-[11px] text-gray-500">
              Inclusive of all taxes • Guaranteed price by Burlamart partner
            </div>

            {/* Amazon-style EMI Card */}
            {(product.isEmiEligible || product.price >= 999) && (
              <div className="pt-2.5 border-t border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-medium text-gray-800">
                  <CreditCard className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-gray-900">
                      EMI from ₹{Math.round(product.price / 6).toLocaleString('en-IN')}/mo
                    </span>
                    <span className="text-gray-500 text-[11px] ml-1.5 hidden sm:inline">
                      • No Cost EMI available on major cards
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowEmiModal(true)}
                  className="text-xs font-extrabold text-blue-800 hover:text-blue-950 underline flex-shrink-0 cursor-pointer"
                >
                  EMI Options ›
                </button>
              </div>
            )}
          </div>

          {/* Amazon-style Trust & Warranty Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 py-1">
            <div className="p-2.5 bg-white border border-gray-200 rounded-2xl flex items-center gap-2 text-left shadow-2xs">
              <RotateCcw className="w-4 h-4 text-emerald-700 flex-shrink-0" />
              <div>
                <div className="font-bold text-[11px] text-gray-900">7 Days Return</div>
                <div className="text-[10px] text-gray-400">Zero return hassle</div>
              </div>
            </div>
            <div className="p-2.5 bg-white border border-gray-200 rounded-2xl flex items-center gap-2 text-left shadow-2xs">
              <Truck className="w-4 h-4 text-blue-700 flex-shrink-0" />
              <div>
                <div className="font-bold text-[11px] text-gray-900">Free Delivery</div>
                <div className="text-[10px] text-gray-400">Fast delivery</div>
              </div>
            </div>
            <div className="p-2.5 bg-white border border-gray-200 rounded-2xl flex items-center gap-2 text-left shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-amber-700 flex-shrink-0" />
              <div>
                <div className="font-bold text-[11px] text-gray-900">{product.warranty || '1-Year Warranty'}</div>
                <div className="text-[10px] text-gray-400">Brand authorized</div>
              </div>
            </div>
            <div className="p-2.5 bg-white border border-gray-200 rounded-2xl flex items-center gap-2 text-left shadow-2xs">
              <Award className="w-4 h-4 text-purple-700 flex-shrink-0" />
              <div>
                <div className="font-bold text-[11px] text-gray-900">Top Brand</div>
                <div className="text-[10px] text-gray-400">100% Genuine</div>
              </div>
            </div>
          </div>

          {/* Optional Extended Warranty Add-On */}
          <div className="p-3 bg-blue-50/60 border border-blue-200/80 rounded-2xl flex items-center justify-between text-xs">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={extendedWarranty}
                onChange={(e) => setExtendedWarranty(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
              />
              <div>
                <span className="font-bold text-gray-900">
                  Add 1-Year Extended Warranty & Damage Protection
                </span>
                <p className="text-[11px] text-gray-500">
                  Complete breakdown cover + doorstep assistance for only ₹{Math.max(149, Math.round(product.price * 0.05)).toLocaleString('en-IN')}
                </p>
              </div>
            </label>
            <span className="font-extrabold text-blue-900 text-xs">
              ₹{Math.max(149, Math.round(product.price * 0.05)).toLocaleString('en-IN')}
            </span>
          </div>

          {/* Category-Specific Selectors */}
          {/* Fashion: Sizes & Colors */}
          {product.availableSizes && (
            <div className="space-y-2">
              <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                Select Size: <strong className="text-gray-900">{selectedSize}</strong>
              </span>
              <div className="flex flex-wrap gap-2">
                {product.availableSizes.map(sz => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition ${
                      selectedSize === sz
                        ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-sm'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-gray-500'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Hotels & Stays: Stay Duration (Days/Nights) & Persons Calculator */}
          {product.category === 'hotels-services' && (() => {
            const pricing = getHotelPricing();

            return (
              <div className="p-4 sm:p-5 bg-teal-50/70 rounded-3xl border border-teal-200/90 space-y-4 text-xs">
                <div className="flex items-center justify-between border-b border-teal-200/60 pb-2.5">
                  <span className="font-extrabold text-teal-950 flex items-center gap-1.5 text-sm">
                    <Calendar className="w-4 h-4 text-teal-700" /> Stay Duration & Guest Setup
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-teal-200/60 text-teal-950 font-extrabold text-[11px] flex items-center gap-1">
                    <Moon className="w-3 h-3 text-teal-800" />
                    <span>{hotelNights} Night{hotelNights > 1 ? 's' : ''}</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">Check-in Date</label>
                    <input
                      type="date"
                      value={checkInDate}
                      onChange={(e) => {
                        setCheckInDate(e.target.value);
                        if (new Date(e.target.value) >= new Date(checkOutDate)) {
                          const n = new Date(e.target.value);
                          n.setDate(n.getDate() + 1);
                          setCheckOutDate(n.toISOString().split('T')[0]);
                        }
                      }}
                      className="w-full bg-white border border-teal-300 rounded-xl p-2.5 font-bold text-gray-800 outline-none focus:border-teal-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">Check-out Date</label>
                    <input
                      type="date"
                      min={checkInDate}
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      className="w-full bg-white border border-teal-300 rounded-xl p-2.5 font-bold text-gray-800 outline-none focus:border-teal-600"
                    />
                  </div>
                </div>

                {/* Persons & Rooms Stepper */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-teal-700" /> Persons / Adults
                    </label>
                    <div className="flex items-center justify-between bg-white border border-teal-300 rounded-xl p-2">
                      <span className="font-extrabold text-gray-800 text-xs">
                        {hotelAdults} Adult{hotelAdults > 1 ? 's' : ''}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setHotelAdults(Math.max(1, hotelAdults - 1))}
                          className="w-6 h-6 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-gray-700"
                        >
                          -
                        </button>
                        <span className="w-4 text-center font-bold text-xs">{hotelAdults}</span>
                        <button
                          type="button"
                          onClick={() => setHotelAdults(hotelAdults + 1)}
                          className="w-6 h-6 rounded-lg bg-teal-700 hover:bg-teal-800 text-white flex items-center justify-center font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1 flex items-center gap-1">
                      <BedDouble className="w-3.5 h-3.5 text-teal-700" /> Rooms Needed
                    </label>
                    <div className="flex items-center justify-between bg-white border border-teal-300 rounded-xl p-2">
                      <span className="font-extrabold text-gray-800 text-xs">
                        {hotelRooms} Room{hotelRooms > 1 ? 's' : ''}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setHotelRooms(Math.max(1, hotelRooms - 1))}
                          className="w-6 h-6 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold text-gray-700"
                        >
                          -
                        </button>
                        <span className="w-4 text-center font-bold text-xs">{hotelRooms}</span>
                        <button
                          type="button"
                          onClick={() => setHotelRooms(hotelRooms + 1)}
                          className="w-6 h-6 rounded-lg bg-teal-700 hover:bg-teal-800 text-white flex items-center justify-center font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Arrival Slot */}
                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1">Expected Arrival Slot</label>
                  <select
                    value={bookingSlot}
                    onChange={(e) => setBookingSlot(e.target.value)}
                    className="w-full bg-white border border-teal-300 rounded-xl p-2 font-bold text-gray-800 text-xs"
                  >
                    <option value="10:00 AM">10:00 AM (Early Check-in)</option>
                    <option value="12:00 PM">12:00 PM (Standard Check-in)</option>
                    <option value="02:00 PM">02:00 PM (Afternoon Check-in)</option>
                    <option value="06:00 PM">06:00 PM (Evening Check-in)</option>
                  </select>
                </div>

                {/* Transparent Live Cost Breakdown */}
                <div className="p-3 bg-white rounded-2xl border border-teal-200 text-xs space-y-1.5 shadow-2xs">
                  <div className="flex justify-between text-gray-700 font-semibold">
                    <span>Base Room (₹{product.price} × {pricing.nights} Night{pricing.nights > 1 ? 's' : ''} × {pricing.rooms} Room):</span>
                    <span className="font-bold text-gray-900">₹{pricing.baseRoomTotal}</span>
                  </div>
                  {pricing.extraCharge > 0 && (
                    <div className="flex justify-between text-amber-800 font-semibold text-[11px]">
                      <span>{pricing.extraAdults} Extra Adult(s) Fee (₹500/night):</span>
                      <span className="font-bold">+₹{pricing.extraCharge}</span>
                    </div>
                  )}
                  <div className="pt-1.5 border-t border-gray-100 flex justify-between items-center text-teal-950 font-extrabold text-sm">
                    <span>Total Calculated Stay:</span>
                    <span className="text-base text-teal-800">₹{pricing.total}</span>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Add to Cart / Quantity Stepper Button */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {quantityInCart === 0 ? (
              <button
                onClick={handleAddToCart}
                className="flex-1 min-w-[200px] py-3.5 px-6 bg-[#1B4332] hover:bg-[#2D6A4F] text-white rounded-2xl font-extrabold text-sm shadow-lg transition flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>
                  {product.category === 'hotels-services' 
                    ? `Reserve ${hotelNights} Night(s) for ₹${getHotelPricing().total}` 
                    : 'Add to Cart'}
                </span>
              </button>
            ) : (
              <div className="flex items-center gap-3 bg-[#1B4332] text-white p-1.5 rounded-2xl shadow-md">
                <button
                  onClick={() => updateQuantity(product.id, quantityInCart - 1)}
                  className="w-9 h-9 rounded-xl bg-[#2D6A4F] hover:bg-[#40916C] flex items-center justify-center text-white"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-extrabold text-sm px-3">{quantityInCart} in Cart</span>
                <button
                  onClick={() => updateQuantity(product.id, quantityInCart + 1)}
                  className="w-9 h-9 rounded-xl bg-[#2D6A4F] hover:bg-[#40916C] flex items-center justify-center text-white"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            )}

            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: product.name, url: window.location.href });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  showToast('Product link copied to clipboard!');
                }
              }}
              className="p-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl transition"
              title="Share Product"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>

          {/* Seller / Store Information Card */}
          {shop && (
            <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold flex-shrink-0">
                  <Store className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 flex items-center gap-1.5">
                    <span>Sold by {shop.name}</span>
                    <span className="text-amber-500 font-extrabold">★ {shop.rating}</span>
                  </div>
                  <div className="text-gray-400 text-[11px] truncate">{shop.address} • {shop.distanceKm} km away</div>
                </div>
              </div>
              <Link
                to={`/storefront/${shop.id}`}
                className="text-xs font-bold text-emerald-800 hover:underline flex-shrink-0"
              >
                Visit Store →
              </Link>
            </div>
          )}

          {/* Highlights & Bullet Points */}
          {product.highlights && (
            <div className="space-y-2 pt-2">
              <h3 className="font-extrabold text-sm text-gray-900 uppercase tracking-wider text-xs">
                Key Features & Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {product.highlights.map((hl, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 rounded-xl text-gray-700 font-medium">
                    <Check className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="space-y-2 pt-2 border-t border-gray-100">
            <h3 className="font-extrabold text-sm text-gray-900 uppercase tracking-wider text-xs">
              Product Overview
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Amazon-style Technical Specifications Table */}
          <div className="space-y-2 pt-2 border-t border-gray-100 text-xs">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-gray-900 uppercase tracking-wider text-xs flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Technical Specifications
              </h3>
              <span className="text-[11px] text-gray-400">Verified manufacturer details</span>
            </div>
            <div className="border border-gray-200 rounded-2xl overflow-hidden divide-y divide-gray-100 shadow-2xs">
              {Object.entries(product.specs || {
                'Brand': product.brand || 'Burlamart Certified Partner',
                'Model Year': '2026 Festive Edition',
                'Item Model / SKU': product.id,
                'Package Dimensions': '22 x 14 x 7 cm; 480 Grams',
                'Item Weight': product.weightDisplay || 'Standard Retail Packaging',
                'Warranty': product.warranty || '1 Year Brand Warranty & Doorstep Assistance',
                'Country of Origin': 'India',
                'Customer Care': '1800-120-BURLA / care@burlamart.com'
              }).map(([key, value]) => (
                <div key={key} className="grid grid-cols-3 p-3 bg-white hover:bg-gray-50/50 transition">
                  <span className="font-bold text-gray-700 col-span-1">{key}</span>
                  <span className="text-gray-600 col-span-2">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews & Feedback Section */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4 text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-gray-100 gap-2">
          <div>
            <h3 className="font-extrabold text-base text-gray-900">Verified Customer Reviews</h3>
            <p className="text-gray-500">Based on {product.reviewsCount} verified purchase ratings</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-extrabold text-gray-900">{product.rating}</span>
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { author: 'Meera S.', comment: 'Exceptional quality! Exactly as described and delivered within 12 minutes.', date: 'Yesterday' },
            { author: 'Rajesh K.', comment: 'Genuine product with brand warranty. Highly recommended from this verified seller.', date: '3 days ago' },
            { author: 'Sunil V.', comment: 'Great packaging and super fast dispatch. Burlamart points earned too!', date: '1 week ago' },
          ].map((rev, idx) => (
            <div key={idx} className="p-3.5 bg-gray-50 rounded-2xl border border-gray-100 space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-900">{rev.author}</span>
                <span className="text-[10px] text-gray-400">{rev.date}</span>
              </div>
              <p className="text-gray-600 italic leading-snug">"{rev.comment}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* Amazon-style Side-by-Side Comparison Table */}
      {relatedProducts.length >= 2 && (
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4 text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100">
            <div>
              <h3 className="font-extrabold text-base text-gray-900 flex items-center gap-2">
                <Scale className="w-4 h-4 text-blue-600" />
                Compare with Similar Items
              </h3>
              <p className="text-gray-500 text-xs">
                Side-by-side comparison of pricing, customer ratings, EMI, and warranty
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setCompareList([product, relatedProducts[0], relatedProducts[1]].slice(0, 3));
                setShowCompareModal(true);
              }}
              className="px-3.5 py-1.5 bg-blue-50 text-blue-800 rounded-xl font-bold hover:bg-blue-100 transition flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Open Side-by-Side Modal</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="p-3 bg-gray-50 font-bold text-gray-500 w-1/4">Criteria</th>
                  <th className="p-3 bg-amber-50/50 font-bold text-amber-950 w-1/4 border-x border-amber-200/60">
                    <span className="text-[10px] uppercase tracking-wider text-amber-700 block">This Item</span>
                    <span className="line-clamp-1">{product.name}</span>
                  </th>
                  {relatedProducts.slice(0, 2).map((rel, idx) => (
                    <th key={rel.id} className="p-3 bg-gray-50 font-bold text-gray-800 w-1/4">
                      <span className="text-[10px] uppercase tracking-wider text-gray-400 block">Alternative {idx + 1}</span>
                      <span className="line-clamp-1">{rel.name}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="p-3 font-semibold text-gray-500">Image</td>
                  <td className="p-3 bg-amber-50/30 border-x border-amber-200/40">
                    <img src={selectedImage || product.image} alt="" className="w-16 h-16 object-contain rounded-xl bg-white p-1 border border-gray-200" />
                  </td>
                  {relatedProducts.slice(0, 2).map(rel => (
                    <td key={rel.id} className="p-3">
                      <Link to={`/product/${rel.id}`}>
                        <img src={rel.image} alt="" className="w-16 h-16 object-contain rounded-xl bg-white p-1 border border-gray-200 hover:opacity-80" />
                      </Link>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-gray-500">Customer Rating</td>
                  <td className="p-3 bg-amber-50/30 border-x border-amber-200/40 font-bold text-amber-900">
                    ★ {product.rating} ({product.reviewsCount})
                  </td>
                  {relatedProducts.slice(0, 2).map(rel => (
                    <td key={rel.id} className="p-3 font-bold text-gray-700">
                      ★ {rel.rating || 4.3} ({rel.reviewsCount || 150})
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-gray-500">Price</td>
                  <td className="p-3 bg-amber-50/30 border-x border-amber-200/40 font-extrabold text-base text-gray-900">
                    ₹{product.price.toLocaleString('en-IN')}
                  </td>
                  {relatedProducts.slice(0, 2).map(rel => (
                    <td key={rel.id} className="p-3 font-extrabold text-base text-gray-800">
                      ₹{rel.price.toLocaleString('en-IN')}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-gray-500">EMI Starting</td>
                  <td className="p-3 bg-amber-50/30 border-x border-amber-200/40 text-blue-900 font-bold">
                    ₹{Math.round(product.price / 6).toLocaleString('en-IN')}/mo
                  </td>
                  {relatedProducts.slice(0, 2).map(rel => (
                    <td key={rel.id} className="p-3 text-blue-900 font-bold">
                      ₹{Math.round(rel.price / 6).toLocaleString('en-IN')}/mo
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-gray-500">Warranty</td>
                  <td className="p-3 bg-amber-50/30 border-x border-amber-200/40 text-gray-700">
                    {product.warranty || '1 Year Brand Warranty'}
                  </td>
                  {relatedProducts.slice(0, 2).map(rel => (
                    <td key={rel.id} className="p-3 text-gray-700">
                      {rel.warranty || '1 Year Brand Warranty'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-gray-500">Action</td>
                  <td className="p-3 bg-amber-50/30 border-x border-amber-200/40">
                    <span className="text-xs font-bold text-emerald-800">Viewing Current Item</span>
                  </td>
                  {relatedProducts.slice(0, 2).map(rel => (
                    <td key={rel.id} className="p-3">
                      <Link
                        to={`/product/${rel.id}`}
                        className="px-3 py-1.5 bg-[#1B4332] text-white rounded-xl font-bold hover:bg-[#2D6A4F] text-xs inline-block"
                      >
                        View Deal →
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Related Products from This Category (Vertical/Wrap Grid — No horizontal scroll!) */}
      {relatedProducts.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-lg text-gray-900">
                Related Products in {product.category.replace('-', ' ')}
              </h3>
              <p className="text-xs text-gray-500">More popular items from this category</p>
            </div>
            <Link
              to={`/category/${product.category}`}
              className="text-xs font-bold text-emerald-800 hover:underline"
            >
              View All ({product.category.replace('-', ' ')}) →
            </Link>
          </div>

          {/* Clean 2-column on mobile, 4-column on desktop (wraps vertically, no horizontal scroll!) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {relatedProducts.map(rel => (
              <div
                key={rel.id}
                className="bg-white rounded-3xl border border-gray-100 hover:border-emerald-300 p-3 shadow-xs hover:shadow-md transition flex flex-col justify-between group"
              >
                <Link to={`/product/${rel.id}`} className="block">
                  <div className="w-full h-36 rounded-2xl overflow-hidden bg-gray-50 mb-2 relative flex items-center justify-center">
                    <img
                      src={rel.image}
                      alt={rel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    {rel.discountPct && (
                      <span className="absolute top-2 left-2 bg-[#1B4332] text-white font-extrabold text-[9px] px-1.5 py-0.5 rounded">
                        {rel.discountPct}% OFF
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] font-semibold text-gray-400">{rel.weightDisplay}</div>
                  <h4 className="font-bold text-xs sm:text-sm text-gray-900 line-clamp-2 leading-snug group-hover:text-emerald-800 transition">
                    {rel.name}
                  </h4>
                </Link>

                <div className="pt-2 border-t border-gray-100 flex items-center justify-between mt-2">
                  <span className="font-extrabold text-sm text-gray-900">₹{rel.price}</span>
                  <Link
                    to={`/product/${rel.id}`}
                    className="px-2.5 py-1 bg-emerald-50 text-emerald-800 font-bold rounded-lg hover:bg-emerald-100 text-xs"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Amazon EMI Modal */}
      {showEmiModal && product && (
        <AmazonEmiModal product={product} onClose={() => setShowEmiModal(false)} />
      )}

      {/* Amazon Side-by-Side Comparison Modal */}
      {showCompareModal && (
        <AmazonComparisonModal
          products={compareList}
          onRemoveProduct={(id) => setCompareList(prev => prev.filter(p => p.id !== id))}
          onClearAll={() => setCompareList([])}
          onClose={() => setShowCompareModal(false)}
        />
      )}
    </div>
  );
};

