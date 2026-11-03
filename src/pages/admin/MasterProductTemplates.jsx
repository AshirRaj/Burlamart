import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useApp } from '../../context/AppContext';
import { 
  Package, 
  Plus, 
  Coins, 
  Sparkles, 
  Edit, 
  Check, 
  X, 
  SlidersHorizontal,
  Layers
} from 'lucide-react';

export const MasterProductTemplates = () => {
  const { categories } = useApp();
  const [templates, setTemplates] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [notice, setNotice] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    category: 'grocery',
    coinCost: 5,
    fields: 'weightKg, mrp, sellingPrice, fssaiLicence',
    requiredSpecs: 'Packaging Type, Origin, Dietary Type',
    isSponsored: false
  });

  const loadTemplates = async () => {
    const list = await api.masterTemplates.getAll();
    setTemplates(list);
  };

  useEffect(() => {
    loadTemplates();
  }, []);

  const showToast = (msg) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3500);
  };

  const handleOpenAdd = () => {
    setEditingTemplate(null);
    setFormData({
      title: '',
      category: 'grocery',
      coinCost: 5,
      fields: 'weightKg, mrp, sellingPrice, fssaiLicence',
      requiredSpecs: 'Packaging Type, Origin, Dietary Type',
      isSponsored: false
    });
    setShowModal(true);
  };

  const handleOpenEdit = (t) => {
    setEditingTemplate(t);
    setFormData({
      title: t.title,
      category: t.category,
      coinCost: t.coinCost,
      fields: t.fields ? t.fields.join(', ') : '',
      requiredSpecs: t.requiredSpecs ? t.requiredSpecs.join(', ') : '',
      isSponsored: t.isSponsored || false
    });
    setShowModal(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = {
      title: formData.title,
      category: formData.category,
      coinCost: Number(formData.coinCost),
      fields: formData.fields.split(',').map(s => s.trim()).filter(Boolean),
      requiredSpecs: formData.requiredSpecs.split(',').map(s => s.trim()).filter(Boolean),
      isSponsored: formData.isSponsored
    };

    if (editingTemplate) {
      payload.id = editingTemplate.id;
    }

    await api.masterTemplates.save(payload);
    setShowModal(false);
    showToast(editingTemplate ? 'Master template updated!' : 'New master template created!');
    loadTemplates();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <span className="text-[11px] font-bold text-purple-900 uppercase tracking-wider bg-purple-100 px-2.5 py-0.5 rounded">
            Section 9.3 & Page 9 Requirements
          </span>
          <h2 className="text-xl font-extrabold text-gray-900 mt-1">
            Master Product Templates & Sponsored Slots
          </h2>
          <p className="text-xs text-gray-500">
            Define standardized product specifications. Vendors spend coins to instantiate listings with their own pricing & stock.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2 bg-[#1B4332] hover:bg-[#2D6A4F] text-white rounded-xl text-xs font-bold shadow-xs transition flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create Master Template</span>
        </button>
      </div>

      {notice && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-2xl p-4 text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-700" />
          <span>{notice}</span>
        </div>
      )}

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {templates.map(tmpl => (
          <div
            key={tmpl.id}
            className="bg-white rounded-3xl p-5 border border-gray-200 shadow-sm space-y-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-900 bg-purple-100 px-2.5 py-0.5 rounded">
                  {tmpl.category}
                </span>
                {tmpl.isSponsored && (
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-900 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-600" /> Sponsored Slot
                  </span>
                )}
              </div>

              <h4 className="font-extrabold text-base text-gray-900 mb-1 leading-snug">
                {tmpl.title}
              </h4>

              <div className="mt-3 space-y-1.5 text-xs text-gray-600 bg-gray-50 p-3 rounded-2xl border border-gray-100">
                <div>
                  <strong className="text-gray-800">Fields: </strong>
                  <span>{tmpl.fields?.join(', ')}</span>
                </div>
                <div>
                  <strong className="text-gray-800">Mandatory Specs: </strong>
                  <span>{tmpl.requiredSpecs?.join(', ')}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
              <div>
                <span className="font-extrabold text-amber-800 flex items-center gap-1">
                  <Coins className="w-3.5 h-3.5 text-amber-500" /> {tmpl.coinCost} Coins / use
                </span>
                <span className="text-[10px] text-gray-400">Used {tmpl.usageCount || 0} times by vendors</span>
              </div>

              <button
                onClick={() => handleOpenEdit(tmpl)}
                className="px-3 py-1.5 bg-gray-100 hover:bg-[#1B4332] text-gray-700 hover:text-white rounded-xl font-bold transition flex items-center gap-1"
              >
                <Edit className="w-3 h-3" /> Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Template Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 space-y-4 text-xs font-semibold">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <h3 className="font-extrabold text-base text-gray-900">
                {editingTemplate ? 'Edit Master Template' : 'Create Master Product Template'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block text-gray-700 mb-1">Template Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 outline-none focus:border-purple-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 mb-1">Target Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 outline-none focus:border-purple-600"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Coins Cost to Instantiate</label>
                  <input
                    type="number"
                    required
                    value={formData.coinCost}
                    onChange={(e) => setFormData({ ...formData, coinCost: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 outline-none focus:border-purple-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Configured Product Fields (comma-separated)</label>
                <input
                  type="text"
                  value={formData.fields}
                  onChange={(e) => setFormData({ ...formData, fields: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 outline-none focus:border-purple-600"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Required Specifications (comma-separated)</label>
                <input
                  type="text"
                  value={formData.requiredSpecs}
                  onChange={(e) => setFormData({ ...formData, requiredSpecs: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 outline-none focus:border-purple-600"
                />
              </div>

              <div className="p-3 bg-amber-50 rounded-xl flex items-center justify-between border border-amber-200">
                <span className="text-amber-900 font-bold">Sponsored Featured Product Slot</span>
                <input
                  type="checkbox"
                  checked={formData.isSponsored}
                  onChange={(e) => setFormData({ ...formData, isSponsored: e.target.checked })}
                  className="w-4 h-4 accent-amber-600"
                />
              </div>

              <div className="flex gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2 border rounded-xl font-bold text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-[#1B4332] text-white rounded-xl font-bold"
                >
                  Save Master Template
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

