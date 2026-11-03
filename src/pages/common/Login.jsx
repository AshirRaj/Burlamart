import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  ShieldCheck, 
  Smartphone, 
  KeyRound, 
  ArrowRight, 
  Store, 
  Bike, 
  Lock, 
  ShoppingBag, 
  Sparkles, 
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';

export const Login = () => {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') || 'customer';

  const navigate = useNavigate();
  const { requestOtp, verifyOtp, DEMO_PROFILES } = useAuth();

  const [selectedRole, setSelectedRole] = useState(initialRole);
  const [phone, setPhone] = useState(DEMO_PROFILES[initialRole]?.phone || '9876543210');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successNotice, setSuccessNotice] = useState('');

  const roles = [
    { id: 'customer', label: 'Customer', icon: ShoppingBag, color: 'emerald', desc: 'Shop groceries, book stays, electronics' },
    { id: 'vendor', label: 'Vendor', icon: Store, color: 'blue', desc: 'Manage catalogue, orders & storefront' },
    { id: 'rider', label: 'Rider', icon: Bike, color: 'amber', desc: 'Accept trips, navigate & COD split payment' },
    { id: 'admin', label: 'Admin', icon: Lock, color: 'purple', desc: 'Control templates, ranking & commissions' },
  ];

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    setPhone(DEMO_PROFILES[roleId]?.phone || '');
    setOtpSent(false);
    setOtp('');
    setError('');
  };

  const handleSendOtp = async (e) => {
    e?.preventDefault();
    if (!phone || phone.replace(/\D/g, '').length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await requestOtp(phone);
      if (res.success) {
        setOtpSent(true);
        setOtp('1234'); // Pre-fill fake demo OTP for immediate test convenience!
        setSuccessNotice('OTP sent! Use demo code: 1234');
      }
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e?.preventDefault();
    if (!otp || otp.length < 4) {
      setError('Please enter the 4-digit OTP');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await verifyOtp(phone, otp, selectedRole);
      if (res.success) {
        setSuccessNotice(`Welcome back, ${res.user.name}! Redirecting...`);
        setTimeout(() => {
          navigate(res.redirectPath);
        }, 600);
      } else {
        setError(res.message || 'Invalid OTP');
      }
    } catch (err) {
      setError('Verification failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const quickLoginAs = (roleId) => {
    handleRoleSelect(roleId);
    setPhone(DEMO_PROFILES[roleId]?.phone || '');
    setOtpSent(true);
    setOtp('1234');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1B4332]/5 via-white to-emerald-50/50 flex flex-col justify-between p-4 sm:p-6">
      {/* Top bar */}
      <div className="max-w-md w-full mx-auto flex items-center justify-between mb-4">
        <Link to="/" className="flex items-center gap-2 group text-xs font-bold text-gray-600 hover:text-emerald-800 transition">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Store</span>
        </Link>
        <span className="text-[11px] font-semibold text-gray-400">
          Multi-Role Mobile Authentication
        </span>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md w-full mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xl space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-[#1B4332] text-white font-extrabold text-2xl flex items-center justify-center mx-auto shadow-md">
            B
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Login to Burlamart
          </h1>
          <p className="text-xs text-gray-500">
            Enter your mobile number to receive a secure OTP
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div>
          <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 text-center">
            Select Your Account Type
          </label>
          <div className="grid grid-cols-4 gap-1.5 p-1 bg-gray-100 rounded-2xl text-xs font-bold">
            {roles.map(r => {
              const Icon = r.icon;
              const isActive = selectedRole === r.id;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => handleRoleSelect(r.id)}
                  className={`py-2 px-1 rounded-xl flex flex-col items-center gap-1 transition ${
                    isActive 
                      ? 'bg-white text-gray-900 shadow-sm ring-1 ring-black/5' 
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-700' : 'text-gray-400'}`} />
                  <span className="text-[11px] truncate">{r.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Demo Fill Pill Buttons */}
        <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-3 text-xs space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold text-emerald-900">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Demo One-Tap Credentials:
            </span>
            <span className="text-[10px] text-emerald-700">Fake OTP: 1234</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {roles.map(r => (
              <button
                key={r.id}
                type="button"
                onClick={() => quickLoginAs(r.id)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition ${
                  selectedRole === r.id
                    ? 'bg-emerald-700 text-white border-emerald-700'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {r.label}: {DEMO_PROFILES[r.id]?.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Feedback / Error Alerts */}
        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-semibold">
            {error}
          </div>
        )}
        {successNotice && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>{successNotice}</span>
          </div>
        )}

        {/* Form: Step 1 (Mobile Input) or Step 2 (OTP Input) */}
        {!otpSent ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-emerald-700" />
                <span>Mobile Number</span>
              </label>
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-100 transition">
                <span className="px-3.5 py-3 text-xs font-bold text-gray-500 bg-gray-100 border-r border-gray-200">
                  +91
                </span>
                <input
                  type="tel"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="Enter 10-digit number"
                  className="w-full bg-transparent px-3 py-3 text-sm font-bold text-gray-900 outline-none"
                  autoFocus
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#1B4332] hover:bg-[#2D6A4F] text-white rounded-2xl font-extrabold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'Sending OTP...' : 'Send Fake OTP'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Enter 4-Digit OTP</span>
                </label>
                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  className="text-[11px] text-emerald-800 font-bold hover:underline"
                >
                  Change Number
                </button>
              </div>

              <div className="relative">
                <input
                  type="text"
                  maxLength={4}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="1234"
                  className="w-full bg-gray-50 border border-gray-200 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 rounded-2xl px-4 py-3 text-center tracking-[1em] text-lg font-extrabold text-gray-900 outline-none transition"
                  autoFocus
                />
              </div>
              <p className="text-[11px] text-gray-400 mt-1 text-center">
                OTP sent to +91 {phone}. Enter <strong className="text-emerald-700">1234</strong> to proceed.
              </p>
            </div>

            <div className="space-y-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#1B4332] hover:bg-[#2D6A4F] text-white rounded-2xl font-extrabold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? 'Verifying...' : `Verify & Enter as ${selectedRole.toUpperCase()}`}
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setOtp('1234')}
                className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold text-xs transition"
              >
                Auto-fill Fake OTP (1234)
              </button>
            </div>
          </form>
        )}

        {/* Security badge */}
        <div className="pt-2 border-t border-gray-100 flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Role-based access control with session persistence</span>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-400 mt-6">
        Burlamart Unified Platform • Connected to single backend API
      </div>
    </div>
  );
};

