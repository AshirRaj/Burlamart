import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useApp } from '../../context/AppContext';
import { 
  Package, 
  Plus, 
  Scan, 
  Upload, 
  Coins, 
  Edit, 
  Check, 
  AlertCircle, 
  Search,
  Sparkles,
  Layers,
  X
} from 'lucide-react';

export const VendorCatalogue = () => {
  const { vendorCoinBalance, spendVendorCoins } = useApp();
  const [products, setProducts] = useState([]);
  const [masterTemplates, setMasterTemplates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showProductModal, setShowProductModal] = useState(false);
  const [showBarcodeModal, setShowBarcodeModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [notice, setNotice] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    category: 'grocery',
    price: '',
    mrp: '',
    stock: 20,
    weightDisplay: '1 kg',
    weightKg: 1.0,
    limitedStock: false,
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=500&q=80',
    description: ''
  });

  const loadData = async () => {
    const prods = await api.products.getAll({ shopId: 'shop-1' });
    setProducts(prods);
    const tmpls = await api.masterTemplates.getAll();
    setMasterTemplates(tmpls);
  };

  useEffect(() => {
    loadData();
  }, []);

  const showToast = (msg) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 3500);
  };

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: 'grocery',
      price: '',
      mrp: '',
      stock: 20,
      weightDisplay: '1 kg',
      weightKg: 1.0,
      limitedStock: false,
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=500&q=80',
      description: ''
    });
    setShowProductModal(true);
  };

  const handleOpenEdit = (prod) => {
    setEditingProduct(prod);
    setFormData({
      ...prod,
      price: prod.price.toString(),
      mrp: prod.mrp ? prod.mrp.toString() : ''
    });
    setShowProductModal(true);
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      price: Number(formData.price),
      mrp: formData.mrp ? Number(formData.mrp) : Number(formData.price),
      stock: Number(formData.stock),
      weightKg: Number(formData.weightKg),
      shopId: 'shop-1'
    };

    if (editingProduct) {
      payload.id = editingProduct.id;
    }

    await api.products.save(payload);
    setShowProductModal(false);
    showToast(editingProduct ? 'Product updated successfully!' : 'New product created in your shop catalogue!');
    loadData();
  };

  // Use Admin Master Template spending coins (Section 8.2 & Page 9)
  const handleUseMasterTemplate = (tmpl) => {
    const cost = tmpl.coinCost || 5;
    if (vendorCoinBalance < cost) {
      alert(`Insufficient coins! This template costs ${cost} coins. You have ${vendorCoinBalance} coins.`);
      return;
    }

    const success = spendVendorCoins(cost);
    if (success) {
      setEditingProduct(null);
      setFormData({
        name: tmpl.title,
        category: tmpl.category,
        price: '199',
        mrp: '250',
        stock: 25,
        weightDisplay: '1 unit',
        weightKg: 1.0,
        limitedStock: false,
        image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=500&q=80',
        description: `Pre-configured listing derived from admin master template "${tmpl.title}".`
      });
      setShowProductModal(true);
      showToast(`Spent ${cost} coins to use master template "${tmpl.title}"!`);
    }
  };

  // Barcode scanner simulation (Page 7)
  const handleScanBarcode = () => {
    setShowBarcodeModal(true);
  };

  const handleSimulateScanCode = (code, mockName, price) => {
    setShowBarcodeModal(false);
    setFormData({
      name: `${mockName} (EAN: ${code})`,
      category: 'grocery',
      price: price.toString(),
      mrp: (price + 20).toString(),
      stock: 50,
      weightDisplay: '500 g',
      weightKg: 0.5,
      limitedStock: false,
      image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?auto=format&fit=crop&w=500&q=80',
      description: `Scanned via POS barcode ${code}. High turnover consumer good.`
    });
    setShowProductModal(true);
    showToast(`Barcode ${code} scanned! Form pre-filled.`);
  };

  // Bulk product upload simulation (JSON/CSV)
  const handleBulkUpload = () => {
    setShowBulkModal(false);
    showToast('Bulk upload completed: 12 new items imported into catalogue!');
  };

  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">
            Shop Catalogue & Inventory Management
          </h2>
          <p className="text-xs text-gray-500">
            Create products, use admin master templates with coins, scan barcodes, and manage stock limits.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleScanBarcode}
            className="px-3.5 py-2 bg-purple-50 text-purple-900 hover:bg-purple-100 rounded-xl text-xs font-bold border border-purple-200 transition flex items-center gap-1.5"
          >
            <Scan className="w-3.5 h-3.5 text-purple-700" />
            <span>Barcode Scanner</span>
          </button>

          <button
            onClick={() => setShowBulkModal(true)}
            className="px-3.5 py-2 bg-blue-50 text-blue-900 hover:bg-blue-100 rounded-xl text-xs font-bold border border-blue-200 transition flex items-center gap-1.5"
          >
            <Upload className="w-3.5 h-3.5 text-blue-700" />
            <span>Bulk CSV Upload</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="px-4 py-2 bg-[#1B4332] hover:bg-[#2D6A4F] text-white rounded-xl text-xs font-bold shadow-sm transition flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {notice && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-2xl p-4 text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-700" />
          <span>{notice}</span>
        </div>
      )}

      {/* Admin Master Templates Ribbon (Section 8.2 & Page 9) */}
      <div className="bg-white rounded-3xl p-5 border border-gray-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-700" />
            <h3 className="font-extrabold text-sm text-gray-900">
              Admin Master Product Templates (Spend Coins to Use)
            </h3>
          </div>
          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <Coins className="w-3.5 h-3.5 text-amber-500" /> Your Balance: {vendorCoinBalance} Coins
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          {masterTemplates.map(tmpl => (
            <div key={tmpl.id} className="p-3.5 rounded-2xl border border-gray-200 bg-gray-50/50 flex flex-col justify-between space-y-2">
              <div>
                <span className="text-[10px] font-bold uppercase text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
                  {tmpl.category}
                </span>
                <h4 className="font-bold text-gray-900 mt-1">{tmpl.title}</h4>
                <p className="text-[11px] text-gray-500 line-clamp-1">Used {tmpl.usageCount} times across platform</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                <span className="font-extrabold text-amber-800 flex items-center gap-1">
                  <Coins className="w-3.5 h-3.5 text-amber-500" /> {tmpl.coinCost} Coins
                </span>
                <button
                  onClick={() => handleUseMasterTemplate(tmpl)}
                  className="px-2.5 py-1 bg-[#1B4332] text-white rounded-lg font-bold hover:bg-[#2D6A4F] text-[11px]"
                >
                  Use Template
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search Bar for Catalogue */}
      <div className="relative max-w-md">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products in your catalogue..."
          className="w-full bg-white border border-gray-200 rounded-2xl pl-9 pr-4 py-2.5 text-xs font-medium outline-none focus:border-emerald-600 shadow-xs"
        />
        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Product Details</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Price / MRP</th>
                <th className="py-3.5 px-4">Stock Count</th>
                <th className="py-3.5 px-4">Delivery Flag</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
              {filtered.map(product => (
                <tr key={product.id} className="hover:bg-gray-50/60 transition">
                  <td className="py-3 px-4 flex items-center gap-3">
                    <img src={product.image} alt={product.name} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <div className="font-bold text-gray-900">{product.name}</div>
                      <div className="text-[11px] text-gray-400">{product.weightDisplay} • {product.weightKg} kg</div>
                    </div>
                  </td>
                  <td className="py-3 px-4 capitalize font-semibold text-emerald-800">
                    {product.category}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-extrabold text-gray-900">₹{product.price}</span>
                    {product.mrp && <span className="text-[11px] text-gray-400 line-through ml-1">₹{product.mrp}</span>}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`font-bold ${product.stock <= 5 ? 'text-rose-600' : 'text-gray-900'}`}>
                      {product.stock} units
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {product.limitedStock ? (
                      <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded text-[10px] font-bold">
                        Limited (Next-Day Only)
                      </span>
                    ) : (
                      <span className="bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded text-[10px] font-bold">
                        Same-Day Allowed
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleOpenEdit(product)}
                      className="px-3 py-1.5 bg-gray-100 hover:bg-[#1B4332] text-gray-700 hover:text-white rounded-xl font-bold transition flex items-center gap-1 ml-auto"
                    >
                      <Edit className="w-3 h-3" /> Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Product Modal */}
      {showProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
              <h3 className="font-extrabold text-base text-gray-900">
                {editingProduct ? 'Edit Product' : 'Add New Product to Store'}
              </h3>
              <button onClick={() => setShowProductModal(false)} className="text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-gray-700 mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 outline-none focus:border-emerald-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 outline-none focus:border-emerald-600"
                  >
                    <option value="grocery">Grocery & Staples</option>
                    <option value="hotels-services">Hotels & Services</option>
                    <option value="electronics">Electronics & Mobiles</option>
                    <option value="packaged-food">Packaged Food & Snacks</option>
                    <option value="fashion">Fashion & Lifestyle</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 mb-1">MRP (₹)</label>
                  <input
                    type="number"
                    value={formData.mrp}
                    onChange={(e) => setFormData({ ...formData, mrp: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Stock Count</label>
                  <input
                    type="number"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-700 mb-1">Weight Display (e.g. 1 kg)</label>
                  <input
                    type="text"
                    value={formData.weightDisplay}
                    onChange={(e) => setFormData({ ...formData, weightDisplay: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-1">Weight in KG (for shipping slabs)</label>
                  <input
                    type="number"
                    step="0.05"
                    value={formData.weightKg}
                    onChange={(e) => setFormData({ ...formData, weightKg: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              {/* Limited Stock Flag checkbox (Section 8.2 & Page 7 rule: Limited-stock items must not support same-day delivery!) */}
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 flex items-start gap-2">
                <input
                  type="checkbox"
                  id="limitedStockCheck"
                  checked={formData.limitedStock}
                  onChange={(e) => setFormData({ ...formData, limitedStock: e.target.checked })}
                  className="w-4 h-4 accent-amber-600 mt-0.5"
                />
                <label htmlFor="limitedStockCheck" className="text-[11px] text-amber-900 cursor-pointer">
                  <span className="font-bold block">Mark as Limited-Stock Item</span>
                  Rule: Limited-stock items only support next-day delivery. Same-day fast delivery is automatically disabled for customers.
                </label>
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Image URL</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 outline-none focus:border-emerald-600 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 outline-none focus:border-emerald-600"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowProductModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-xl font-bold text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1B4332] hover:bg-[#2D6A4F] text-white rounded-xl font-bold shadow-sm"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Barcode Scanner Modal Simulation */}
      {showBarcodeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Scan className="w-5 h-5 text-purple-700" />
                <h3 className="font-extrabold text-base text-gray-900">POS Barcode Scanner</h3>
              </div>
              <button onClick={() => setShowBarcodeModal(false)} className="text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-40 bg-slate-900 rounded-2xl relative overflow-hidden flex items-center justify-center text-white">
              <div className="w-48 h-24 border-2 border-emerald-400 border-dashed rounded-lg relative flex items-center justify-center">
                <div className="w-full h-0.5 bg-rose-500 animate-pulse"></div>
              </div>
              <span className="absolute bottom-2 text-[10px] text-gray-400">Laser Optical Scanner Active</span>
            </div>

            <span className="text-xs font-bold text-gray-700 block">Select scanned barcode to import:</span>
            <div className="space-y-1.5 text-xs">
              <button
                onClick={() => handleSimulateScanCode('8901030829141', 'Tata Salt Vacuum Evaporated (1kg)', 28)}
                className="w-full p-2.5 bg-gray-50 hover:bg-emerald-50 rounded-xl text-left border border-gray-200 flex justify-between items-center"
              >
                <span>8901030829141 — Tata Salt (1kg)</span>
                <span className="font-bold text-emerald-800">₹28</span>
              </button>
              <button
                onClick={() => handleSimulateScanCode('8901725131209', 'Fortune Sunlite Refined Oil (1L)', 135)}
                className="w-full p-2.5 bg-gray-50 hover:bg-emerald-50 rounded-xl text-left border border-gray-200 flex justify-between items-center"
              >
                <span>8901725131209 — Fortune Oil (1L)</span>
                <span className="font-bold text-emerald-800">₹135</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk CSV Upload Modal */}
      {showBulkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-200 space-y-4">
            <h3 className="font-extrabold text-base text-gray-900">Bulk Product Upload</h3>
            <p className="text-xs text-gray-500">Upload CSV or JSON sheet with product titles, prices and stock counts.</p>
            <div className="border-2 border-dashed border-gray-300 p-6 rounded-2xl text-center space-y-2">
              <Upload className="w-8 h-8 text-blue-600 mx-auto" />
              <span className="text-xs font-bold text-gray-700 block">inventory_restock_nov2026.csv</span>
              <span className="text-[10px] text-gray-400">Ready to parse 12 products</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowBulkModal(false)} className="flex-1 py-2 bg-gray-100 rounded-xl text-xs font-bold">
                Cancel
              </button>
              <button onClick={handleBulkUpload} className="flex-1 py-2 bg-[#1B4332] text-white rounded-xl text-xs font-bold">
                Import SKUs
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

