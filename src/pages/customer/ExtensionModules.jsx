import React, { useState } from 'react';
import { 
  CreditCard, 
  Calendar, 
  Users, 
  Wrench, 
  Package, 
  BellRing, 
  FileText, 
  Pill, 
  Tractor, 
  Sparkles, 
  PhoneCall, 
  ShieldCheck, 
  Check, 
  Upload,
  ArrowRight
} from 'lucide-react';

export const ExtensionModules = () => {
  const [activeModule, setActiveModule] = useState('khata');
  const [successNotice, setSuccessNotice] = useState(null);

  // Sub-module form states
  const [subscriptionItem, setSubscriptionItem] = useState('Full Cream Milk (1L Daily)');
  const [subscriptionTime, setSubscriptionTime] = useState('06:30 AM');
  const [parcelWeight, setParcelWeight] = useState(2);
  const [prescriptionFile, setPrescriptionFile] = useState(null);
  const [khataBalance, setKhataBalance] = useState(1240);

  const showFeedback = (msg) => {
    setSuccessNotice(msg);
    setTimeout(() => setSuccessNotice(null), 3500);
  };

  const handleKhataPayment = () => {
    setKhataBalance(0);
    showFeedback('Khata bill settled! Your ₹5,000 credit limit has been fully restored.');
  };

  const handleCreateSubscription = () => {
    showFeedback(`Recurring subscription active: ${subscriptionItem} will be delivered daily at ${subscriptionTime}!`);
  };

  const handleSendParcel = () => {
    showFeedback(`Parcel delivery scheduled! Assigned rider will collect package (${parcelWeight}kg) shortly.`);
  };

  const handlePrescriptionUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPrescriptionFile(e.target.files[0].name);
      showFeedback(`Prescription "${e.target.files[0].name}" uploaded! Pharmacist will verify & add medications to cart.`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-teal-950 via-[#1B4332] to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full">
          Burlamart Unified Ecosystem
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-2">
          Special Services & Customer Extensions
        </h1>
        <p className="text-xs sm:text-sm text-emerald-100 max-w-2xl mt-1">
          Explore digital khata credit, daily milk subscriptions, society group orders, parcel courier, and verified digital prescription dispensary.
        </p>
      </div>

      {successNotice && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-2xl p-4 text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <Check className="w-4 h-4 text-emerald-700" />
          <span>{successNotice}</span>
        </div>
      )}

      {/* Module Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {[
          { id: 'khata', label: 'Pay Later / Khata', icon: CreditCard },
          { id: 'subscriptions', label: 'Daily Subscriptions', icon: Calendar },
          { id: 'group', label: 'Group Orders', icon: Users },
          { id: 'parcel', label: 'Send Anything (Courier)', icon: Package },
          { id: 'prescription', label: 'Prescription Pharmacy', icon: Pill },
          { id: 'farmer', label: 'Farmer Direct Bulk', icon: Tractor },
          { id: 'warranty', label: 'Digital Invoices & Warranty', icon: FileText },
          { id: 'alerts', label: 'Stock & Price Alerts', icon: BellRing },
          { id: 'whatsapp', label: 'WhatsApp / Phone Order', icon: PhoneCall },
          { id: 'festival', label: 'Festival Storefront', icon: Sparkles }
        ].map(mod => {
          const Icon = mod.icon;
          return (
            <button
              key={mod.id}
              onClick={() => setActiveModule(mod.id)}
              className={`p-3.5 rounded-2xl border text-xs font-bold transition flex flex-col items-center justify-center gap-2 text-center ${
                activeModule === mod.id
                  ? 'bg-[#1B4332] text-white border-emerald-900 shadow-md'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-emerald-50/50 hover:border-emerald-300'
              }`}
            >
              <Icon className={`w-5 h-5 ${activeModule === mod.id ? 'text-emerald-300' : 'text-emerald-700'}`} />
              <span className="line-clamp-1">{mod.label}</span>
            </button>
          );
        })}
      </div>

      {/* ACTIVE MODULE CONTAINER */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm">
        {/* 1. DIGITAL KHATA / PAY LATER */}
        {activeModule === 'khata' && (
          <div className="max-w-xl space-y-6">
            <div>
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded">
                Section 12: Digital Khata (P4)
              </span>
              <h2 className="text-xl font-extrabold text-gray-900 mt-1">Burlamart Digital Khata & Pay Later</h2>
              <p className="text-xs text-gray-500">
                Interest-free monthly credit ledger backed by your verified neighborhood shops.
              </p>
            </div>

            <div className="bg-gradient-to-br from-emerald-900 to-teal-900 text-white p-5 rounded-2xl space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span>Credit Limit Approved: ₹5,000</span>
                <span className="text-emerald-300 font-bold">Billing Cycle: 1st of month</span>
              </div>
              <div className="pt-2 border-t border-white/10 flex justify-between items-baseline">
                <div>
                  <div className="text-[11px] text-gray-300">Outstanding Khata Balance</div>
                  <div className="text-2xl font-extrabold">₹{khataBalance}</div>
                </div>
                {khataBalance > 0 && (
                  <button
                    onClick={handleKhataPayment}
                    className="px-4 py-2 bg-emerald-400 hover:bg-emerald-300 text-gray-950 font-bold rounded-xl text-xs transition"
                  >
                    Clear Bill (Pay ₹{khataBalance})
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="font-bold text-gray-700 uppercase tracking-wider text-[11px]">Recent Khata Ledger Entries:</div>
              <div className="p-3 bg-gray-50 rounded-xl flex justify-between items-center">
                <div>
                  <div className="font-bold text-gray-900">Weekly Grocery at Fresh Supermart</div>
                  <div className="text-[11px] text-gray-500">28 Oct 2026 • Shop verified</div>
                </div>
                <span className="font-bold text-gray-900">₹780.00</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl flex justify-between items-center">
                <div>
                  <div className="font-bold text-gray-900">Snacks at Craving Junction</div>
                  <div className="text-[11px] text-gray-500">30 Oct 2026 • Shop verified</div>
                </div>
                <span className="font-bold text-gray-900">₹460.00</span>
              </div>
            </div>
          </div>
        )}

        {/* 2. DAILY SUBSCRIPTIONS */}
        {activeModule === 'subscriptions' && (
          <div className="max-w-xl space-y-6">
            <div>
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded">
                Section 12: Subscriptions (P3)
              </span>
              <h2 className="text-xl font-extrabold text-gray-900 mt-1">Milk, Bread & Farm Produce Subscriptions</h2>
              <p className="text-xs text-gray-500">
                Guaranteed early morning delivery by 7 AM with flexible pause/resume anytime.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Select Subscription Item</label>
                <select
                  value={subscriptionItem}
                  onChange={(e) => setSubscriptionItem(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-semibold text-gray-800"
                >
                  <option value="Full Cream Milk (1L Daily)">Full Cream Pasteurized Milk (1 Litre Daily) — ₹68/day</option>
                  <option value="Organic Brown Eggs (6 Pack Alternate Days)">Country Eggs (6 Pack Alternate Days) — ₹65/order</option>
                  <option value="Fresh Seasonal Salad Basket">Morning Fresh Salad Basket (Daily) — ₹85/day</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Target Morning Slot</label>
                <select
                  value={subscriptionTime}
                  onChange={(e) => setSubscriptionTime(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5 font-semibold text-gray-800"
                >
                  <option value="06:00 AM">06:00 AM Early Dawn</option>
                  <option value="06:30 AM">06:30 AM Standard Morning</option>
                  <option value="07:15 AM">07:15 AM Breakfast Slot</option>
                </select>
              </div>

              <button
                onClick={handleCreateSubscription}
                className="w-full py-3 bg-[#1B4332] hover:bg-[#2D6A4F] text-white rounded-2xl font-bold transition flex items-center justify-center gap-2"
              >
                <span>Activate Daily Subscription</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* 3. GROUP ORDERS */}
        {activeModule === 'group' && (
          <div className="max-w-xl space-y-4">
            <div>
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded">
                Section 12: Group Orders (P3)
              </span>
              <h2 className="text-xl font-extrabold text-gray-900 mt-1">Society & Office Group Orders</h2>
              <p className="text-xs text-gray-500">
                Share a single link with your apartment tower or office team. All items arrive together with zero delivery fee!
              </p>
            </div>

            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 space-y-2 text-xs">
              <div className="font-bold text-emerald-950">Active Group Pool: "Tower 4 Neighbours"</div>
              <p className="text-emerald-800">4 participants joined • Total cart: ₹1,840 • Free Delivery unlocked</p>
              <button
                onClick={() => showFeedback('Group order invite link copied to clipboard!')}
                className="px-3.5 py-1.5 bg-[#1B4332] text-white rounded-xl font-bold hover:bg-[#2D6A4F]"
              >
                Copy Invite Link
              </button>
            </div>
          </div>
        )}

        {/* 4. SEND ANYTHING / PARCEL DELIVERY */}
        {activeModule === 'parcel' && (
          <div className="max-w-xl space-y-4">
            <div>
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded">
                Section 12: Send Anything (P3)
              </span>
              <h2 className="text-xl font-extrabold text-gray-900 mt-1">Hyperlocal Parcel Courier Service</h2>
              <p className="text-xs text-gray-500">
                Send keys, documents, lunchboxes or chargers across the city in 30 minutes.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Pickup Address</label>
                <input
                  type="text"
                  defaultValue="Flat 402, Sunshine Heights, Civil Lines, Jaipur"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Drop-off Address</label>
                <input
                  type="text"
                  placeholder="Enter recipient address and phone number"
                  defaultValue="Office 12, World Trade Park, Malviya Nagar"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Estimated Weight: {parcelWeight} kg</label>
                <input
                  type="range"
                  min="0.5"
                  max="10"
                  step="0.5"
                  value={parcelWeight}
                  onChange={(e) => setParcelWeight(Number(e.target.value))}
                  className="w-full accent-emerald-700"
                />
              </div>

              <div className="p-3 bg-gray-50 rounded-xl flex justify-between items-center font-bold">
                <span>Estimated Courier Fee:</span>
                <span className="text-emerald-800 text-sm">₹{40 + parcelWeight * 12}</span>
              </div>

              <button
                onClick={handleSendParcel}
                className="w-full py-3 bg-[#1B4332] text-white rounded-2xl font-bold hover:bg-[#2D6A4F] transition"
              >
                Book Parcel Rider
              </button>
            </div>
          </div>
        )}

        {/* 5. MEDICINES WITH PRESCRIPTION */}
        {activeModule === 'prescription' && (
          <div className="max-w-xl space-y-4">
            <div>
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded">
                Section 12: Prescription Medicines (P4)
              </span>
              <h2 className="text-xl font-extrabold text-gray-900 mt-1">Upload Doctor's Prescription</h2>
              <p className="text-xs text-gray-500">
                Our certified pharmacist reviews your Rx and prepares the exact dosage from licensed pharmacies.
              </p>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-3xl p-8 text-center space-y-3 hover:border-emerald-500 transition">
              <Upload className="w-10 h-10 text-emerald-700 mx-auto" />
              <div className="font-bold text-xs text-gray-800">
                {prescriptionFile ? `Selected: ${prescriptionFile}` : 'Drag & drop or click to upload prescription (JPG, PNG or PDF)'}
              </div>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handlePrescriptionUpload}
                className="text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-50 file:text-emerald-800 hover:file:bg-emerald-100"
              />
            </div>
          </div>
        )}

        {/* 6. FARMER DIRECT BULK */}
        {activeModule === 'farmer' && (
          <div className="max-w-xl space-y-4">
            <div>
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded">
                Section 12: Farmer-Direct & Bulk (P4)
              </span>
              <h2 className="text-xl font-extrabold text-gray-900 mt-1">Farm Direct Sacks & Crate Purchasing</h2>
              <p className="text-xs text-gray-500">
                Direct mandi sourcing for 25kg wheat bags, 50kg onion crates, and seasonal mustard oil tins.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 border rounded-2xl bg-gray-50 space-y-1">
                <div className="font-bold text-gray-900">Sharbati Wheat (50kg Sack)</div>
                <div className="text-emerald-800 font-extrabold">₹1,950 (Mandi rate)</div>
                <button
                  onClick={() => showFeedback('Added 50kg Wheat Sack to cart!')}
                  className="w-full py-1 bg-emerald-100 text-emerald-900 font-bold rounded-lg"
                >
                  Order Sack
                </button>
              </div>

              <div className="p-3 border rounded-2xl bg-gray-50 space-y-1">
                <div className="font-bold text-gray-900">Nasik Red Onions (25kg Bag)</div>
                <div className="text-emerald-800 font-extrabold">₹620 (Wholesale)</div>
                <button
                  onClick={() => showFeedback('Added 25kg Onion Bag to cart!')}
                  className="w-full py-1 bg-emerald-100 text-emerald-900 font-bold rounded-lg"
                >
                  Order Bag
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 7. DIGITAL INVOICES & WARRANTY */}
        {activeModule === 'warranty' && (
          <div className="max-w-xl space-y-4">
            <div>
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded">
                Section 12: Bill & Warranty Storage (P3)
              </span>
              <h2 className="text-xl font-extrabold text-gray-900 mt-1">Digital Bill & Warranty Vault</h2>
              <p className="text-xs text-gray-500">
                Never lose an electronics bill or appliance warranty card again.
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-gray-50 rounded-2xl flex justify-between items-center border border-gray-100">
                <div>
                  <div className="font-bold text-gray-900">VoltPro 5G Smartphone Tax Invoice</div>
                  <div className="text-[11px] text-emerald-700">Warranty Active: 312 days remaining</div>
                </div>
                <button
                  onClick={() => showFeedback('Downloaded tax invoice PDF!')}
                  className="px-3 py-1 bg-white border border-gray-200 rounded-lg font-bold hover:bg-gray-50"
                >
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 8. ALERTS */}
        {activeModule === 'alerts' && (
          <div className="max-w-xl space-y-4">
            <div>
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded">
                Section 12: Stock & Price Alerts (P3)
              </span>
              <h2 className="text-xl font-extrabold text-gray-900 mt-1">Smart Restock & Price Drop Notifications</h2>
              <p className="text-xs text-gray-500">
                Get an instant ping on WhatsApp when limited-stock mangoes or laptop prices drop.
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="font-bold">Alphonso Mangoes (Restock Alert)</span>
                <span className="text-emerald-700 font-bold">Subscribed</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold">ZenBook 14" Laptop (Price Drop Alert below ₹50,000)</span>
                <span className="text-emerald-700 font-bold">Subscribed</span>
              </div>
            </div>
          </div>
        )}

        {/* 9. WHATSAPP & PHONE ORDERING */}
        {activeModule === 'whatsapp' && (
          <div className="max-w-xl space-y-4">
            <div>
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded">
                Section 12: WhatsApp & Phone Ordering (P4)
              </span>
              <h2 className="text-xl font-extrabold text-gray-900 mt-1">Order Over WhatsApp or Assisted Phone Call</h2>
              <p className="text-xs text-gray-500">
                Senior citizen friendly ordering. Send your handwritten grocery list photo on WhatsApp!
              </p>
            </div>

            <div className="flex gap-3 text-xs">
              <a
                href="https://wa.me/919876543210?text=Hi%20Burlamart,%20I%20want%20to%20place%20an%20order"
                target="_blank"
                rel="noreferrer"
                className="flex-1 p-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-md"
              >
                <span>Chat on WhatsApp</span>
              </a>
              <a
                href="tel:1800123456"
                className="flex-1 p-4 bg-gray-900 hover:bg-black text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-md"
              >
                <span>Call Toll-Free Helpline</span>
              </a>
            </div>
          </div>
        )}

        {/* 10. FESTIVAL STOREFRONTS */}
        {activeModule === 'festival' && (
          <div className="max-w-xl space-y-4">
            <div>
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded">
                Section 12: Festival Storefronts (P3)
              </span>
              <h2 className="text-xl font-extrabold text-gray-900 mt-1">Diwali, Eid & Festive Hampers</h2>
              <p className="text-xs text-gray-500">
                Handcrafted sweets, gift dry-fruit trays, diyas and festival celebration boxes.
              </p>
            </div>

            <div className="p-4 bg-gradient-to-r from-amber-100 to-rose-100 rounded-2xl border border-amber-300 text-amber-950 text-xs font-semibold">
              🎉 Festive season hamper discounts active! Claim 25% off on customized corporate gifting hampers.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

