import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { api } from '../../services/api';
import { 
  Sparkles, 
  MapPin, 
  Star, 
  Clock, 
  ShoppingBag, 
  Hotel, 
  Smartphone, 
  Cookie, 
  Shirt, 
  Gamepad2, 
  SlidersHorizontal, 
  ArrowRight, 
  TrendingUp,
  Percent,
  Video,
  Play,
  CheckCircle2,
  Zap,
  Store
} from 'lucide-react';
import { HomeVideoHero } from '../../components/home/HomeVideoHero';
import { HomeCategorySlider } from '../../components/home/HomeCategorySlider';
import { HomeCategoryProductsRow } from '../../components/home/HomeCategoryProductsRow';
import { HomeWhyChooseUs } from '../../components/home/HomeWhyChooseUs';
import { ALL_GROCERY_PRODUCTS } from '../../components/grocery/groceryData';
import { ALL_ELECTRONICS_PRODUCTS } from '../../components/electronics/electronicsData';
import { INITIAL_PRODUCTS } from '../../services/mockData';

export const Home = () => {
  const { categories, platformSettings } = useApp();
  const [shops, setShops] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [sortBy, setSortBy] = useState('recommended'); // 'recommended', 'distance', 'rating', 'alphabetical'

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [shopsData, prodsData] = await Promise.all([
          api.shops.getAll(),
          api.products.getAll()
        ]);
        setShops(shopsData);
        setAllProducts(prodsData);
      } catch (err) {
        console.error('Error fetching home data:', err);
      }
    };
    fetchInitialData();
  }, []);

  // 1. Curated Products per Category for the one-by-one single-line rows
  // A. Groceries (First 7 items from authentic grocery catalog)
  const groceryProducts = useMemo(() => {
    return ALL_GROCERY_PRODUCTS.slice(0, 8);
  }, []);

  // B. Hotels & Stays (Verified stays & rooms from mock products or allProducts)
  const hotelProducts = useMemo(() => {
    const stays = allProducts.filter(p => p.category === 'hotels-services');
    return stays.length > 0 ? stays.slice(0, 7) : INITIAL_PRODUCTS.filter(p => p.category === 'hotels-services').slice(0, 7);
  }, [allProducts]);

  // C. Electronics & Mobiles (Amazon-style festival deals)
  const electronicsProducts = useMemo(() => {
    return ALL_ELECTRONICS_PRODUCTS.filter(p => p.category === 'electronics').slice(0, 8);
  }, []);

  // D. Packaged Food & Gourmet Combos
  const packagedFoodProducts = useMemo(() => {
    const food = allProducts.filter(p => p.category === 'packaged-food');
    return food.length > 0 ? food.slice(0, 7) : INITIAL_PRODUCTS.filter(p => p.category === 'packaged-food').slice(0, 7);
  }, [allProducts]);

  // F. Children's Books, Toys & RC Cars
  const toyProducts = useMemo(() => {
    return ALL_ELECTRONICS_PRODUCTS.filter(p => p.category === 'toys').slice(0, 8);
  }, []);

  // Sorting logic for nearby storefronts based on admin ranking weights & user choice
  const sortedShops = useMemo(() => {
    return [...shops].sort((a, b) => {
      if (sortBy === 'distance') return a.distanceKm - b.distanceKm;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'alphabetical') return a.name.localeCompare(b.name);
      // Recommended ranking: weighted distance & price score
      const distWeight = (platformSettings?.distanceWeight || 60) / 100;
      const scoreA = (a.rating * 2) - (a.distanceKm * distWeight);
      const scoreB = (b.rating * 2) - (b.distanceKm * distWeight);
      return scoreB - scoreA;
    });
  }, [shops, sortBy, platformSettings]);

  return (
    <div className="w-full space-y-10 sm:space-y-12 pb-16">
      {/* 1. EXPANDED IMMERSIVE FULL-WIDTH HERO SECTION (Vibrant Video with Interactivity) */}
      <section className="w-full max-w-[1536px] mx-auto px-2 sm:px-4 pt-1 sm:pt-2">
        <HomeVideoHero />
      </section>

      {/* 2. MAIN CONTENT SECTIONS */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 space-y-10 sm:space-y-12 overflow-hidden">
        {/* ATTRACTIVE CATEGORIES SLIDER RIGHT BELOW HERO SECTION */}
        <HomeCategorySlider />

        {/* 3. CATEGORY BY CATEGORY - ONE BY ONE WITH PRODUCTS IN ONE LINE & VIEW ALL REDIRECT */}
      <div className="space-y-8">
        <div className="text-center sm:text-left">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
            Featured Catalogs
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-1.5">
            Shop by Category Highlights
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            Discover trending picks in each category. Click "View All" on any section to enter its tailored store.
          </p>
        </div>

        {/* Row 1: Groceries & Fresh Produce */}
        <HomeCategoryProductsRow
          title="Groceries & Daily Essentials"
          subtitle="Farm-fresh fruits, vegetables, milk, bread & staples delivered in 10 minutes"
          badge="10 Mins Delivery"
          categorySlug="grocery"
          categoryLink="/category/grocery"
          icon={ShoppingBag}
          products={groceryProducts}
          shopId="shop-1"
          shopName="Burlamart Fresh Supermart"
        />

        {/* Row 2: Hotels & Verified Stays (Sambalpur & Odisha) */}
        <HomeCategoryProductsRow
          title="Hotels & Stays (Sambalpur, Burla & Odisha)"
          subtitle="Verified AC rooms & homestays in Sambalpur, Burla, Puri & Bhubaneswar with Pay at Hotel"
          badge="Odisha Stays"
          categorySlug="hotels-services"
          categoryLink="/category/hotels-services"
          icon={Hotel}
          products={hotelProducts}
          shopId="shop-3"
          shopName="Burlamart Sambalpur & Burla Grand Residency"
        />

        {/* Row 3: Electronics, Mobiles & Festival Gadgets */}
        <HomeCategoryProductsRow
          title="Electronics & Mobiles (Great Indian Festival)"
          subtitle="Smartphones, smartwatches, earbuds with specs comparison & No Cost EMI"
          badge="No Cost EMI"
          categorySlug="electronics"
          categoryLink="/category/electronics"
          icon={Smartphone}
          products={electronicsProducts}
          shopId="shop-4"
          shopName="TechHub Gadgets"
        />

        {/* Row 4: Packaged Food, Gourmet Snacks & BxGy Combos */}
        <HomeCategoryProductsRow
          title="Packaged Food & Gourmet Snacks"
          subtitle="Chips, juices, cookies and BxGy smart combo bundles with up to 35% savings"
          badge="BxGy Combos"
          categorySlug="packaged-food"
          categoryLink="/category/packaged-food"
          icon={Cookie}
          products={packagedFoodProducts}
          shopId="shop-5"
          shopName="Craving Junction"
        />

        {/* Row 5: Children's Books, Toys & RC Cars */}
        <HomeCategoryProductsRow
          title="Children's Books, Toys & Remote Control Cars"
          subtitle="High-speed RC stunt vehicles, cuddly plushies, board games and educational books"
          badge="Starting ₹99"
          categorySlug="electronics"
          categoryLink="/category/electronics?category=toys"
          icon={Gamepad2}
          products={toyProducts}
          shopId="shop-2"
          shopName="Electronics & Festive Hub"
        />
      </div>

      {/* 4. SMART DEALS & PROMOTIONS BANNER */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0 border border-white/30">
            <Percent className="w-8 h-8 text-yellow-200" />
          </div>
          <div className="space-y-1">
            <span className="text-xs font-black uppercase tracking-wider bg-black/20 px-2.5 py-0.5 rounded-full text-yellow-300">
              Limited Festival Window
            </span>
            <div className="font-black text-xl sm:text-2xl text-white">
              Smart Deals, BxGy Combos & Instant Cashback
            </div>
            <p className="text-xs sm:text-sm text-amber-100 font-medium">
              Save up to 35% on curated food combos, 10% HDFC card discount on electronics, and complimentary breakfast at partner stays.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto flex-shrink-0">
          <Link
            to="/category/packaged-food"
            className="px-5 py-3 bg-white text-gray-950 font-black text-xs rounded-xl hover:bg-gray-100 transition shadow-md flex items-center gap-1.5"
          >
            <span>Explore BxGy Offers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/category/electronics"
            className="px-5 py-3 bg-black/30 hover:bg-black/40 text-white font-black text-xs rounded-xl backdrop-blur-sm transition border border-white/20"
          >
            Festive Electronics Hub
          </Link>
        </div>
      </div>

      {/* 5. HOW IT WORKS, WHY CHOOSE US, ABOUT BURLAMART & TESTIMONIALS */}
      <HomeWhyChooseUs />

      {/* 6. NEARBY VERIFIED NEIGHBORHOOD SHOPS & STOREFRONTS */}
      <div className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-200 gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              Nearby Shops & Verified Storefronts
            </h2>
            <p className="text-xs text-gray-500 font-medium">
              Ranked with Burlamart's distance & price algorithm ({platformSettings?.distanceWeight || 60}% distance / {platformSettings?.priceWeight || 40}% price)
            </p>
          </div>

          {/* Sorting controls */}
          <div className="flex items-center gap-2 text-xs">
            <SlidersHorizontal className="w-4 h-4 text-gray-400" />
            <span className="font-semibold text-gray-600">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-200 rounded-xl px-3 py-1.5 font-bold text-gray-800 outline-none focus:border-emerald-600 shadow-2xs"
            >
              <option value="recommended">Recommended (Smart Rank)</option>
              <option value="distance">Nearest Distance (km)</option>
              <option value="rating">Highest Rated</option>
              <option value="alphabetical">Alphabetical (A to Z)</option>
            </select>
          </div>
        </div>

        {/* Shops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {sortedShops.map((shop) => (
            <div
              key={shop.id}
              className="bg-white rounded-3xl border border-gray-200/90 hover:border-emerald-400 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Storefront banner */}
                <div className="h-36 relative overflow-hidden bg-gray-100">
                  <img
                    src={shop.bannerUrl}
                    alt={shop.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                    <div className="bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-gray-900 flex items-center gap-1 shadow-xs">
                      <MapPin className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{shop.distanceKm} km away</span>
                    </div>
                    {shop.isSponsored && (
                      <span className="bg-purple-900/90 text-purple-200 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-md shadow-xs tracking-wider">
                        ⭐ Sponsored Partner
                      </span>
                    )}
                  </div>

                  <div className="absolute top-3 right-3 bg-emerald-950/80 backdrop-blur-md text-emerald-300 px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{shop.rating}</span>
                  </div>

                  {shop.hasOwnDelivery && (
                    <div className="absolute bottom-3 left-3 bg-amber-500 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-md shadow-sm">
                      Shop Self-Delivery (₹{shop.ownDeliveryFee})
                    </div>
                  )}
                </div>

                {/* Shop details */}
                <div className="p-5">
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                    <span className="capitalize font-semibold text-emerald-800">{shop.category?.replace('-', ' ')}</span>
                    <span>Min Order: ₹{shop.minOrder}</span>
                  </div>

                  <h3 className="font-extrabold text-base text-gray-900 group-hover:text-emerald-800 transition mb-1">
                    {shop.name}
                  </h3>

                  <p className="text-xs text-gray-500 line-clamp-1 mb-3">
                    {shop.address}
                  </p>

                  {/* Storefront Pop-up notice preview */}
                  {shop.popupNotice && (
                    <div className="bg-emerald-50/70 border border-emerald-100 rounded-xl p-2.5 text-[11px] text-emerald-900 mb-3 flex items-start gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{shop.popupNotice}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-5 pb-5 pt-0 flex items-center justify-between gap-2 border-t border-gray-50 pt-3">
                <Link
                  to={`/storefront/${shop.id}`}
                  className="text-xs font-bold text-gray-600 hover:text-emerald-800 flex items-center gap-1"
                >
                  <Video className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Storefront Tour</span>
                </Link>

                <Link
                  to={`/category/${shop.category}?shopId=${shop.id}`}
                  className="px-4 py-2 bg-[#1B4332] hover:bg-[#2D6A4F] text-white rounded-xl text-xs font-bold shadow-xs transition flex items-center gap-1"
                >
                  <span>Enter Shop</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
};
