import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sparkles, 
  Image as ImageIcon, 
  Check, 
  RotateCcw, 
  Save, 
  Eye, 
  Tag, 
  Link as LinkIcon, 
  Edit3, 
  ShoppingBag, 
  Hotel, 
  Smartphone, 
  Cookie, 
  Store,
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const PRESET_IMAGE_SUGGESTIONS = [
  {
    name: 'Supermart & Fresh Produce',
    url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80',
    category: 'Home / Grocery'
  },
  {
    name: 'Organic Farm Harvest',
    url: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=1200&q=80',
    category: 'Grocery'
  },
  {
    name: 'Farm Green Vegetables',
    url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1200&q=80',
    category: 'Grocery'
  },
  {
    name: 'Luxury Hotel Room Suite',
    url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
    category: 'Hotels'
  },
  {
    name: 'Modern Hotel Interior',
    url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    category: 'Hotels'
  },
  {
    name: 'Flagship Tech & Gadgets',
    url: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=1200&q=80',
    category: 'Electronics'
  },
  {
    name: 'Gaming & Laptops Desk',
    url: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1200&q=80',
    category: 'Electronics'
  },
  {
    name: 'Party Snacks & Cookies Table',
    url: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=1200&q=80',
    category: 'Packaged Food'
  },
  {
    name: 'Crisp Chips & Soft Drinks',
    url: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=80',
    category: 'Packaged Food'
  }
];

export const AdminBannerManager = () => {
  const { promotionalBanners, updateBanner, toggleBannerActive, resetBanners } = useApp();
  const bannerList = Object.values(promotionalBanners || {});

  const [selectedBannerId, setSelectedBannerId] = useState(bannerList[0]?.id || 'home-privilege');
  const [formData, setFormData] = useState(() => promotionalBanners[selectedBannerId] || {});
  const [savedFeedback, setSavedFeedback] = useState(false);

  // Sync formData when selecting another banner
  const handleSelectBanner = (id) => {
    setSelectedBannerId(id);
    setFormData(promotionalBanners[id] || {});
    setSavedFeedback(false);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateBanner(selectedBannerId, formData);
    setSavedFeedback(true);
    setTimeout(() => setSavedFeedback(false), 2500);
  };

  const currentBanner = promotionalBanners[selectedBannerId] || formData;

  const getCategoryIcon = (page) => {
    switch (page) {
      case 'grocery': return ShoppingBag;
      case 'hotels-services': return Hotel;
      case 'electronics': return Smartphone;
      case 'packaged-food': return Cookie;
      default: return Store;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* 1. Header with Stats & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-100 text-purple-700">
              <Sparkles className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">
              Promotional Banner Manager
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Customize real banner images, promotional headlines, vouchers, and action links across Home, Grocery, Hotels, Electronics, and Packaged Food.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Reset all promotional banners to their default settings?')) {
                resetBanners();
                setFormData(promotionalBanners[selectedBannerId] || {});
              }
            }}
            className="px-4 py-2 text-xs font-bold text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-xl transition flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Defaults</span>
          </button>
        </div>
      </div>

      {/* 2. Banner Selector Horizontal Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {bannerList.map(b => {
          const IconComp = getCategoryIcon(b.page);
          const isSelected = b.id === selectedBannerId;
          return (
            <button
              key={b.id}
              type="button"
              onClick={() => handleSelectBanner(b.id)}
              className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-purple-950 text-white border-purple-800 shadow-md scale-[1.02]'
                  : 'bg-white hover:bg-gray-50 text-gray-800 border-gray-200/80'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <span className={`p-1.5 rounded-lg ${isSelected ? 'bg-purple-800 text-purple-200' : 'bg-gray-100 text-gray-600'}`}>
                  <IconComp className="w-4 h-4" />
                </span>
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                  b.isActive 
                    ? (isSelected ? 'bg-emerald-500 text-gray-950' : 'bg-emerald-100 text-emerald-800')
                    : (isSelected ? 'bg-rose-500/80 text-white' : 'bg-gray-200 text-gray-600')
                }`}>
                  {b.isActive ? 'Active' : 'Hidden'}
                </span>
              </div>
              <div>
                <h4 className="font-black text-xs truncate">{b.categoryName}</h4>
                <p className={`text-[10px] truncate ${isSelected ? 'text-purple-300' : 'text-gray-400'}`}>
                  {b.couponCode || 'No code'}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* 3. Main Workspace: Live Preview & Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Editor Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-200/80 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-600 bg-purple-50 px-2.5 py-1 rounded-md">
                Editing: {currentBanner.categoryName}
              </span>
              <h2 className="text-lg font-black text-gray-900 mt-1">
                Banner Configuration
              </h2>
            </div>

            {/* Toggle Active Switch */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-600">
                {formData.isActive ? 'Visible on Storefront' : 'Hidden'}
              </span>
              <button
                type="button"
                onClick={() => {
                  handleInputChange('isActive', !formData.isActive);
                  toggleBannerActive(selectedBannerId);
                }}
                className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out ${
                  formData.isActive ? 'bg-emerald-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                    formData.isActive ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            {/* Banner Title */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Main Headline / Title
              </label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-semibold text-gray-900 focus:bg-white focus:ring-2 focus:ring-purple-500/30 outline-none transition"
                required
              />
            </div>

            {/* Eyebrow Tag & Coupon Code Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Eyebrow Tag / Badge
                </label>
                <input
                  type="text"
                  value={formData.tag || ''}
                  onChange={(e) => handleInputChange('tag', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-900 focus:bg-white focus:ring-2 focus:ring-purple-500/30 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Voucher / Coupon Code
                </label>
                <input
                  type="text"
                  value={formData.couponCode || ''}
                  onChange={(e) => handleInputChange('couponCode', e.target.value.toUpperCase())}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-mono font-bold text-gray-900 focus:bg-white focus:ring-2 focus:ring-purple-500/30 outline-none transition uppercase"
                />
              </div>
            </div>

            {/* Subtitle / Description */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Subtitle / Description
              </label>
              <textarea
                rows={3}
                value={formData.subtitle || ''}
                onChange={(e) => handleInputChange('subtitle', e.target.value)}
                className="w-full px-3.5 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-800 focus:bg-white focus:ring-2 focus:ring-purple-500/30 outline-none transition"
              />
            </div>

            {/* Real Image URL Field */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Real Image URL (Unsplash or Static Asset)
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={formData.imageUrl || ''}
                  onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-mono text-gray-900 focus:bg-white focus:ring-2 focus:ring-purple-500/30 outline-none transition"
                />
              </div>
            </div>

            {/* Preset Image Suggestions */}
            <div>
              <span className="block text-[11px] font-bold text-gray-500 mb-1.5">
                Quick Select Real Photo Presets:
              </span>
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                {PRESET_IMAGE_SUGGESTIONS.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleInputChange('imageUrl', preset.url)}
                    className="flex-shrink-0 group relative rounded-xl overflow-hidden border border-gray-200 hover:border-purple-600 transition p-1 bg-white cursor-pointer"
                    title={preset.name}
                  >
                    <img
                      src={preset.url}
                      alt={preset.name}
                      className="w-14 h-10 object-cover rounded-lg group-hover:scale-105 transition"
                    />
                    <span className="text-[9px] block font-bold text-gray-700 truncate max-w-[70px] mt-0.5">
                      {preset.name.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Discount Text & CTA Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Discount Text
                </label>
                <input
                  type="text"
                  value={formData.discountText || ''}
                  onChange={(e) => handleInputChange('discountText', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-900 focus:bg-white focus:ring-2 focus:ring-purple-500/30 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  CTA Button Label
                </label>
                <input
                  type="text"
                  value={formData.ctaText || ''}
                  onChange={(e) => handleInputChange('ctaText', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-900 focus:bg-white focus:ring-2 focus:ring-purple-500/30 outline-none transition"
                />
              </div>
            </div>

            {/* Submit & Save */}
            <div className="pt-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {savedFeedback && (
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 animate-in fade-in">
                    <Check className="w-4 h-4" />
                    <span>Saved! Changes are live on customer storefront.</span>
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 bg-purple-700 hover:bg-purple-800 text-white font-black text-xs rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <Save className="w-4 h-4" />
                <span>Save Banner Changes</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Live Responsive Storefront Preview (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl border border-gray-200/80 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5 text-xs font-black text-gray-900">
                <Eye className="w-4 h-4 text-purple-600" />
                <span>Live Storefront Preview</span>
              </div>
              <span className="text-[10px] font-bold text-gray-400">
                Real time simulation
              </span>
            </div>

            {/* Mini Simulated Banner Card */}
            <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${formData.themeColor || 'from-slate-900 to-gray-900'} text-white p-4 shadow-lg border border-white/10`}>
              {/* Background Real Image with dark overlay */}
              {formData.imageUrl && (
                <div className="absolute inset-0 z-0">
                  <img
                    src={formData.imageUrl}
                    alt={formData.title}
                    className="w-full h-full object-cover opacity-25"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
                </div>
              )}

              <div className="relative z-10 space-y-2">
                <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${formData.badgeColor || 'bg-white/20 text-white'}`}>
                  {formData.tag}
                </span>

                <h3 className="text-sm font-black text-white leading-snug line-clamp-2">
                  {formData.title}
                </h3>

                <p className="text-[11px] text-gray-300 line-clamp-2">
                  {formData.subtitle}
                </p>

                {/* Right real image thumbnail preview */}
                {formData.imageUrl && (
                  <div className="mt-2 rounded-xl overflow-hidden h-24 w-full relative shadow-md">
                    <img
                      src={formData.imageUrl}
                      alt="Banner Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-1 right-2 bg-black/60 px-2 py-0.5 rounded text-[9px] text-white font-mono">
                      Real Image Visible
                    </div>
                  </div>
                )}

                <div className="pt-2 flex items-center justify-between border-t border-white/10 text-xs">
                  <div className="bg-white/10 px-2.5 py-1 rounded-lg font-mono text-[11px] font-black text-amber-300">
                    {formData.couponCode}
                  </div>
                  <span className="px-3 py-1 bg-white text-gray-950 font-black text-[10px] rounded-lg">
                    {formData.ctaText}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Link to customer page */}
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-gray-500">
              <span>Customer Route:</span>
              <Link
                to={formData.ctaLink || '/'}
                target="_blank"
                rel="noreferrer"
                className="text-purple-600 hover:underline flex items-center gap-1 font-bold"
              >
                <span>Open {formData.categoryName} page</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Quick Help Card */}
          <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100 text-xs text-purple-900 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold">
              <ShieldCheck className="w-4 h-4 text-purple-700" />
              <span>Admin Instant Sync</span>
            </div>
            <p className="text-[11px] text-purple-800 leading-relaxed">
              Any changes made here to images, headlines, discounts, or coupons are immediately synchronized to the customer storefront without requiring a code rebuild.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminBannerManager;
