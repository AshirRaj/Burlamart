import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { CategoryTemplateRenderer } from '../../components/category-layouts/CategoryTemplateRenderer';
import { INITIAL_PRODUCTS, INITIAL_SHOPS } from '../../services/mockData';
import { 
  Layers, 
  Check, 
  Eye, 
  Save, 
  ExternalLink, 
  ShoppingBag, 
  Hotel, 
  Smartphone, 
  Cookie, 
  Shirt,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const CategoryTemplateManager = () => {
  const { categories, updateCategoryTemplate } = useApp();
  
  // Active editing state
  const [selectedCategory, setSelectedCategory] = useState(categories[0] || null);
  const [selectedTemplate, setSelectedTemplate] = useState(categories[0]?.layoutTemplate || 'grocery');
  const [previewMode, setPreviewMode] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const availableTemplates = [
    {
      id: 'grocery',
      title: 'Blinkit-Style Grocery Grid',
      desc: 'Optimized for instant quick-commerce: compact cards, quantity steppers, 12-min delivery badge, persistent cart bar.',
      icon: ShoppingBag,
      color: 'border-emerald-600 bg-emerald-50/40 text-emerald-900',
      badge: 'Quick-Commerce'
    },
    {
      id: 'hotel',
      title: 'OYO-Style Hotels & Booking Slots',
      desc: 'Optimized for bookings: check-in date selection, time slot picker, appointment scheduling, amenities badges & guest reviews.',
      icon: Hotel,
      color: 'border-teal-600 bg-teal-50/40 text-teal-900',
      badge: 'Booking Engine'
    },
    {
      id: 'electronics',
      title: 'Amazon-Style Specs & EMI Hub',
      desc: 'Optimized for tech & devices: specification matrices, side-by-side product comparison, brand filters and No-Cost EMI calculators.',
      icon: Smartphone,
      color: 'border-blue-600 bg-blue-50/40 text-blue-900',
      badge: 'Specs & EMI'
    },
    {
      id: 'packaged-food',
      title: 'Packaged Food, Combos & BxGy',
      desc: 'Optimized for impulse munching: Buy X Get Y discount badges, movie night curated bundles, and 1-tap reordering.',
      icon: Cookie,
      color: 'border-orange-600 bg-orange-50/40 text-orange-900',
      badge: 'BxGy Deals'
    },
    {
      id: 'fashion-grid',
      title: 'Showcase Grid & Lifestyle Lookbook',
      desc: 'Clean visual grid template with size selectors (S, M, L, XL), color swatches, and lifestyle imagery suitable for general categories.',
      icon: Shirt,
      color: 'border-purple-600 bg-purple-50/40 text-purple-900',
      badge: 'Visual Showcase'
    }
  ];

  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    setSelectedTemplate(cat.layoutTemplate || 'grocery');
    setSaveSuccess(false);
  };

  const handleApplyTemplate = async () => {
    if (!selectedCategory) return;
    await updateCategoryTemplate(selectedCategory.id, selectedTemplate);
    setSaveSuccess(true);
  };

  // Prepare dummy products for the live preview
  const previewProducts = INITIAL_PRODUCTS.filter(p => p.category === selectedCategory?.id);
  const sampleProducts = previewProducts.length > 0 ? previewProducts : INITIAL_PRODUCTS.slice(0, 4);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Module Title Banner */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-extrabold text-purple-900 uppercase tracking-wider bg-purple-100 px-3 py-1 rounded-full">
            Core Mandate: Section 9.2 & Page 3
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mt-2">
            Category UI Layout & Template Management
          </h2>
          <p className="text-xs text-gray-500 max-w-2xl mt-1 leading-relaxed">
            Assign ready-made shopping & booking layouts to any category. Changes immediately alter how customers browse and order from that category.
          </p>
        </div>

        {selectedCategory && (
          <Link
            to={`/category/${selectedCategory.id}`}
            target="_blank"
            className="px-4 py-2.5 bg-purple-700 hover:bg-purple-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md flex-shrink-0"
          >
            <span>View Category in Customer App</span>
            <ExternalLink className="w-4 h-4" />
          </Link>
        )}
      </div>

      {saveSuccess && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-950 rounded-2xl p-4 text-xs font-bold flex items-center justify-between animate-fadeIn shadow-sm">
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-emerald-700" />
            <span>
              Layout updated! Category <span className="underline">{selectedCategory.name}</span> now renders as{' '}
              <span className="uppercase text-emerald-800 font-extrabold">{selectedTemplate}</span>.
            </span>
          </div>
          <Link
            to={`/category/${selectedCategory.id}`}
            className="px-3 py-1 bg-emerald-800 text-white rounded-lg text-xs font-bold hover:bg-emerald-900"
          >
            Verify in Customer App →
          </Link>
        </div>
      )}

      {/* STEP 1: SELECT CATEGORY */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
        <h3 className="font-extrabold text-base text-gray-900 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-900 text-xs flex items-center justify-center font-bold">1</span>
          <span>Select Platform Category</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {categories.map(cat => {
            const isSelected = selectedCategory?.id === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleSelectCategory(cat)}
                className={`p-3.5 rounded-2xl border text-left transition ${
                  isSelected
                    ? 'border-purple-600 bg-purple-50/70 shadow-md ring-2 ring-purple-100'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="text-[10px] text-gray-400 font-mono">ID: {cat.id}</div>
                <div className="font-extrabold text-xs text-gray-900 mt-0.5">{cat.name}</div>
                <div className="mt-2 text-[10px] font-bold text-purple-800 uppercase bg-purple-100/60 px-2 py-0.5 rounded inline-block">
                  Current: {cat.layoutTemplate}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 2: CHOOSE READY-MADE UI TEMPLATE */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
        <h3 className="font-extrabold text-base text-gray-900 flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-900 text-xs flex items-center justify-center font-bold">2</span>
          <span>Choose Layout Type for "{selectedCategory?.name}"</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableTemplates.map(tmpl => {
            const Icon = tmpl.icon;
            const isChosen = selectedTemplate === tmpl.id;

            return (
              <div
                key={tmpl.id}
                onClick={() => setSelectedTemplate(tmpl.id)}
                className={`p-5 rounded-3xl border-2 cursor-pointer transition flex flex-col justify-between ${
                  isChosen
                    ? 'border-purple-600 bg-purple-50/40 shadow-lg ring-2 ring-purple-200'
                    : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-gray-50/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-purple-800 shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900">
                      {tmpl.badge}
                    </span>
                  </div>

                  <h4 className="font-extrabold text-sm text-gray-900 mb-1">
                    {tmpl.title}
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {tmpl.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 mt-4 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-gray-400">
                    Template: <span className="font-mono text-gray-700">{tmpl.id}</span>
                  </span>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    isChosen ? 'bg-purple-600 text-white' : 'border border-gray-300'
                  }`}>
                    {isChosen && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Save CTA */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="text-xs text-gray-500">
            Selected: <strong className="text-gray-900">{selectedCategory?.name}</strong> → Layout:{' '}
            <strong className="text-purple-800 uppercase font-mono">{selectedTemplate}</strong>
          </div>

          <button
            onClick={handleApplyTemplate}
            className="px-6 py-3 bg-[#1B4332] hover:bg-[#2D6A4F] text-white rounded-2xl font-extrabold text-xs shadow-md transition flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save & Apply to Customer App</span>
          </button>
        </div>
      </div>

      {/* STEP 3: LIVE INTERACTIVE PREVIEW */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-purple-700" />
            <h3 className="font-extrabold text-base text-gray-900">
              Live Layout Preview (Rendering "{selectedTemplate}")
            </h3>
          </div>
          <span className="text-xs font-semibold text-gray-400">
            Interactive preview with sample catalogue data
          </span>
        </div>

        {/* Embedded Dynamic Category Template Renderer */}
        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200">
          <CategoryTemplateRenderer
            category={{ ...selectedCategory, layoutTemplate: selectedTemplate }}
            products={sampleProducts}
            shop={INITIAL_SHOPS[0]}
          />
        </div>
      </div>
    </div>
  );
};

