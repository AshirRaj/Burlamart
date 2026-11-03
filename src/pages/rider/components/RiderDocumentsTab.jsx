import React from 'react';
import { Bike, ShieldCheck, FileText, CreditCard, Phone } from 'lucide-react';

export const RiderDocumentsTab = ({ riderProfile }) => {
  return (
    <div className="space-y-6 max-w-4xl mx-auto text-xs">
      {/* Header Profile Identity */}
      <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={riderProfile.avatar}
            alt={riderProfile.name}
            className="w-20 h-20 rounded-2xl object-cover ring-2 ring-emerald-500 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-extrabold text-white">{riderProfile.name}</h2>
              <span className="bg-emerald-500 text-slate-950 font-extrabold text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> VERIFIED
              </span>
            </div>
            <div className="text-slate-400 font-mono mt-0.5">Rider ID: {riderProfile.id}</div>
            <div className="text-slate-400 text-[11px] mt-1">{riderProfile.email} • {riderProfile.phone}</div>
          </div>
        </div>

        <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700 text-center sm:text-right">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Lifetime Deliveries</span>
          <span className="text-xl font-extrabold text-white">{riderProfile.completedDeliveries}</span>
          <span className="text-[10px] text-emerald-400 font-bold block">96.2% Acceptance Rate</span>
        </div>
      </div>

      {/* Vehicle & Verification Documents */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Vehicle Details Card */}
        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-3">
          <h3 className="font-extrabold text-sm text-white flex items-center gap-2 pb-2 border-b border-slate-800">
            <Bike className="w-4 h-4 text-emerald-400" />
            <span>Assigned Fleet Vehicle</span>
          </h3>

          <div className="space-y-2 text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-400">Make & Model:</span>
              <span className="font-bold text-white">Hero Splendor Plus</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Registration Number:</span>
              <span className="font-mono font-bold text-emerald-400">RJ-14-AB-4021</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Vehicle Category:</span>
              <span>Two-Wheeler Commercial Carrier</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Insurance Validity:</span>
              <span className="font-bold text-white">{riderProfile.insuranceExpiry} (Active)</span>
            </div>
          </div>
        </div>

        {/* KYC & Regulatory Documents */}
        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-3">
          <h3 className="font-extrabold text-sm text-white flex items-center gap-2 pb-2 border-b border-slate-800">
            <FileText className="w-4 h-4 text-emerald-400" />
            <span>KYC & Licenses</span>
          </h3>

          <div className="space-y-2 text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-400">Driving License:</span>
              <span className="font-mono font-bold text-white">{riderProfile.dlNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">DL Expiry:</span>
              <span>{riderProfile.dlExpiry}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Identity KYC:</span>
              <span className="text-emerald-400 font-bold">Aadhaar & PAN Verified ✓</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">FSSAI Food Hygiene:</span>
              <span className="text-emerald-400 font-bold">Certified Rider ✓</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bank Account & Emergency Contacts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-3">
          <h3 className="font-extrabold text-sm text-white flex items-center gap-2 pb-2 border-b border-slate-800">
            <CreditCard className="w-4 h-4 text-emerald-400" />
            <span>Payout Bank & UPI</span>
          </h3>
          <div className="space-y-2 text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-400">Linked Bank:</span>
              <span className="font-bold text-white">{riderProfile.bankAccount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Direct UPI ID:</span>
              <span className="font-mono text-emerald-400 font-bold">{riderProfile.upiId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Payout Frequency:</span>
              <span>Daily Instant IMPS</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-3">
          <h3 className="font-extrabold text-sm text-white flex items-center gap-2 pb-2 border-b border-slate-800">
            <Phone className="w-4 h-4 text-rose-400" />
            <span>Safety & Emergency Contacts</span>
          </h3>
          <div className="space-y-2 text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-400">Family SOS:</span>
              <span className="font-bold text-white">{riderProfile.emergencyContact}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Police Emergency:</span>
              <span className="text-rose-400 font-bold">112</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Burlamart Rider Helpdesk:</span>
              <span className="text-emerald-400 font-bold">1800-419-8800</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

