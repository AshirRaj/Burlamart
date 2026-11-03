import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { 
  Store, 
  Image, 
  Video, 
  Sparkles, 
  Play, 
  Pause, 
  Check, 
  Palette, 
  Save 
} from 'lucide-react';

export const VendorStorefront = () => {
  const [shop, setShop] = useState(null);
  const [bannerUrl, setBannerUrl] = useState('');
  const [popupNotice, setPopupNotice] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    const fetchShop = async () => {
      const data = await api.shops.getById('shop-1');
      setShop(data);
      setBannerUrl(data.bannerUrl || '');
      setPopupNotice(data.popupNotice || '');
      setVideoUrl(data.videoUrl || '');
      setAutoScrollEnabled(data.autoScrollEnabled || false);
    };
    fetchShop();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    await api.shops.updateStorefront('shop-1', {
      bannerUrl,
      popupNotice,
      videoUrl,
      autoScrollEnabled
    });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded">
          Section 8.4 & Page 7
        </span>
        <h2 className="text-xl font-extrabold text-gray-900 mt-1">
          Storefront Design, Banners, Videos & Auto-Scroll
        </h2>
        <p className="text-xs text-gray-500">
          Personalize how customers experience your shop. Configure promotional banners, flash deal pop-ups, kitchen video tours, and auto-scrolling catalogues.
        </p>
      </div>

      {savedNotice && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-2xl p-4 text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-700" />
          <span>Storefront changes saved and published to customer app!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-6 text-xs">
        {/* Banner URL */}
        <div className="space-y-2">
          <label className="font-bold text-gray-700 flex items-center gap-2">
            <Image className="w-4 h-4 text-emerald-700" />
            <span>Storefront Hero Banner Image URL</span>
          </label>
          <input
            type="url"
            value={bannerUrl}
            onChange={(e) => setBannerUrl(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-mono text-[11px] outline-none focus:border-emerald-600"
            placeholder="https://images.unsplash.com/..."
          />
          {bannerUrl && (
            <div className="h-32 rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 mt-2">
              <img src={bannerUrl} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
        </div>

        {/* Pop-up Notice */}
        <div className="space-y-2">
          <label className="font-bold text-gray-700 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Storefront Pop-Up Announcement</span>
          </label>
          <textarea
            rows={2}
            value={popupNotice}
            onChange={(e) => setPopupNotice(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-medium outline-none focus:border-emerald-600"
            placeholder="E.g., Flash Deal: 15% extra cashback on orders above ₹499 today!"
          />
        </div>

        {/* Video Embed */}
        <div className="space-y-2">
          <label className="font-bold text-gray-700 flex items-center gap-2">
            <Video className="w-4 h-4 text-blue-600" />
            <span>Store Video URL (YouTube embed or MP4 stream)</span>
          </label>
          <input
            type="url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-mono text-[11px] outline-none focus:border-emerald-600"
            placeholder="https://www.youtube.com/embed/..."
          />
        </div>

        {/* Auto-scroll toggle */}
        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 flex items-center justify-between">
          <div>
            <div className="font-bold text-gray-900 flex items-center gap-2">
              {autoScrollEnabled ? <Play className="w-4 h-4 text-emerald-700" /> : <Pause className="w-4 h-4 text-gray-400" />}
              <span>Enable Storefront Auto-Scroll</span>
            </div>
            <p className="text-[11px] text-gray-500">
              When enabled, your store page slowly auto-scrolls down when customers browse, showcasing all products automatically.
            </p>
          </div>
          <input
            type="checkbox"
            checked={autoScrollEnabled}
            onChange={(e) => setAutoScrollEnabled(e.target.checked)}
            className="w-5 h-5 accent-emerald-700"
          />
        </div>

        <div className="pt-3 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#1B4332] hover:bg-[#2D6A4F] text-white rounded-xl font-bold shadow-sm transition flex items-center gap-2 text-xs"
          >
            <Save className="w-4 h-4" />
            <span>Save & Publish Storefront</span>
          </button>
        </div>
      </form>
    </div>
  );
};

