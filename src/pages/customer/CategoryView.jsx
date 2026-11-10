import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { CategoryTemplateRenderer } from '../../components/category-layouts/CategoryTemplateRenderer';
import { getGroceryCategoryById, GroceryCategoryPage } from '../../components/grocery';
import { HotelServicesLayout } from '../../components/category-layouts/HotelServicesLayout';
import { ElectronicsLayout } from '../../components/category-layouts/ElectronicsLayout';
import { PackagedFoodLayout } from '../../components/category-layouts/PackagedFoodLayout';
import { 
  Store, 
  MapPin, 
  Layers, 
  ChevronRight, 
  ArrowLeft,
  Settings,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';

export const CategoryView = () => {
  const { categoryId } = useParams();
  const [searchParams] = useSearchParams();
  const targetShopId = searchParams.get('shopId');

  const { categories } = useApp();
  const { currentRole } = useAuth();
  const [category, setCategory] = useState(null);
  const [shops, setShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Synchronize category object from AppContext so when Admin changes template, it immediately reacts!
  useEffect(() => {
    const currentCat = categories.find(c => c.id === categoryId) || {
      id: categoryId,
      name: categoryId ? categoryId.replace('-', ' ') : 'Category',
      layoutTemplate: 'grocery'
    };
    setCategory(currentCat);
  }, [categoryId, categories]);

  // Load shops and products
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const allShops = await api.shops.getAll();
        // find shops matching category or default to all
        const catShops = allShops.filter(s => s.category === categoryId);
        const shopList = catShops.length > 0 ? catShops : allShops;

        // Automatically sort by proximity: closest store to user first
        const sortedByProximity = [...shopList].sort(
          (a, b) => (a.distanceKm ?? 99) - (b.distanceKm ?? 99)
        );
        setShops(sortedByProximity);

        // Nearest store is automatically chosen according to user location
        const activeShop = targetShopId 
          ? sortedByProximity.find(s => s.id === targetShopId) || sortedByProximity[0] 
          : sortedByProximity[0];
        setSelectedShop(activeShop);

        const allProds = await api.products.getAll();
        // filter by category or fallback to allProds
        let catProds = allProds.filter(p => p.category === categoryId);
        if (catProds.length === 0) {
          catProds = allProds.slice(0, 4);
        }
        setProducts(catProds);
      } catch (err) {
        console.error('Failed to load category view data', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [categoryId, targetShopId]);

  if (loading || !category) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-gray-500">
        <div className="w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="font-semibold text-sm">Loading category interface...</p>
      </div>
    );
  }

  // If this is a specific subcategory (e.g. dairy-bread-eggs, paan-corner, cold-drinks-juices, fruits-vegetables),
  // render its dedicated Category Product Page!
  const isDedicatedSubcat = categoryId !== 'grocery' && Boolean(getGroceryCategoryById(categoryId));
  if (isDedicatedSubcat) {
    return (
      <GroceryCategoryPage
        categoryId={categoryId}
        shop={selectedShop || shops[0]}
        initialProducts={products}
      />
    );
  }

  // If this is Hotels & Services, render the dedicated full-bleed OYO-style hotel layout
  if (category?.layoutTemplate === 'hotel' || categoryId === 'hotels-services') {
    return (
      <HotelServicesLayout
        products={products}
        shop={selectedShop || shops[0]}
        categoryName={category.name}
      />
    );
  }

  // If this is Electronics, render the dedicated Amazon-style festival deals layout
  if (category?.layoutTemplate === 'electronics' || categoryId === 'electronics') {
    return (
      <ElectronicsLayout
        products={products}
        shop={selectedShop || shops[0]}
        categoryName={category.name}
      />
    );
  }

  // If this is Packaged Food & Snacks, render the dedicated Swiggy Instamart-inspired layout
  if (category?.layoutTemplate === 'packaged-food' || categoryId === 'packaged-food' || categoryId === 'packaged-food-and-snacks' || categoryId === 'packaged-food-snacks') {
    return (
      <PackagedFoodLayout
        products={products}
        shop={selectedShop || shops[0]}
        categoryName={category?.name || 'Packaged Food & Snacks'}
      />
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-6 overflow-hidden">
      {/* Breadcrumb & Live Layout Identifier Ribbon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs bg-white p-3.5 rounded-2xl border border-gray-200 shadow-xs">
        <div className="flex items-center gap-2 text-gray-500">
          <Link to="/" className="hover:text-emerald-800 flex items-center gap-1 font-semibold">
            <ArrowLeft className="w-3.5 h-3.5" /> Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
          <span className="font-bold text-gray-900 capitalize">{category.name}</span>
        </div>

        {/* Live Template Engine Indicator (Admin only) or Customer Express Badge */}
        {currentRole === 'admin' ? (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-xl font-bold">
              <Layers className="w-3.5 h-3.5 text-emerald-700" />
              <span>Active Layout: <span className="uppercase text-emerald-800">{category.layoutTemplate}</span></span>
            </div>

            <Link
              to="/admin/templates"
              className="hidden md:flex items-center gap-1 text-[11px] text-gray-500 hover:text-purple-700 bg-gray-50 hover:bg-purple-50 px-2.5 py-1 rounded-xl border border-gray-200 transition"
              title="Admins can change this category's layout template here"
            >
              <Settings className="w-3 h-3 text-purple-600" />
              <span>Configure Template in Admin</span>
            </Link>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl font-bold">
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span>10-Min Hyperlocal Express • Burla & Sambalpur</span>
          </div>
        )}
      </div>

      {/* Automatic Nearest Store Routing (User is never asked to choose seller) */}
      <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-emerald-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center flex-shrink-0 border border-emerald-100 shadow-2xs">
            <Store className="w-5 h-5 text-emerald-700" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100/90 px-2.5 py-0.5 rounded-full">
                Nearest Store Auto-Assigned
              </span>
              <h4 className="text-xs sm:text-sm font-bold text-gray-900">
                {selectedShop?.name || 'Burlamart Fresh Supermart'}
              </h4>
            </div>
            <p className="text-[11px] text-gray-500 mt-0.5">
              Closest dark store to your location ({selectedShop?.distanceKm || 1.4} km away) • Orders are automatically routed here for fast 10-12 min delivery
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto text-xs font-bold text-emerald-800 bg-emerald-50/80 px-3 py-1.5 rounded-xl border border-emerald-200/80 shadow-2xs">
          <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-400 flex-shrink-0" />
          <span>Optimal 10-Min Dispatch Route</span>
        </div>
      </div>

      {/* RENDER THE DYNAMIC CATEGORY TEMPLATE */}
      <CategoryTemplateRenderer
        category={category}
        products={products}
        shop={selectedShop || shops[0]}
      />
    </div>
  );
};

