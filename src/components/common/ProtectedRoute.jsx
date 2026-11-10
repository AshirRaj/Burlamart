import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, LogIn, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const ProtectedRoute = ({ allowedRoles = [], children }) => {
  const { currentRole, switchRole } = useAuth();

  if (allowedRoles.length === 0 || allowedRoles.includes(currentRole)) {
    return children;
  }

  const targetRole = allowedRoles[0];

  return (
    <div className="min-h-screen bg-[#F8FAF9] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-7 border border-gray-200 shadow-2xl text-center space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-1.5">
          <span className="text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 px-3 py-1 rounded-full">
            Role-Based Portal Guard
          </span>
          <h2 className="text-xl font-black text-gray-900 mt-2">
            {targetRole.charAt(0).toUpperCase() + targetRole.slice(1)} Access Required
          </h2>
          <p className="text-xs text-gray-500 leading-relaxed">
            You are currently signed in as <strong className="text-gray-800 capitalize">{currentRole}</strong>. To prevent accidental cross-portal access, switch to the <strong className="text-gray-800 capitalize">{targetRole}</strong> role to open this dashboard.
          </p>
        </div>

        <div className="space-y-2.5 pt-2">
          <button
            type="button"
            onClick={() => switchRole(targetRole)}
            className="w-full py-3 px-4 bg-[#1B4332] hover:bg-[#2D6A4F] text-white rounded-2xl text-xs font-extrabold shadow-lg transition flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Switch to {targetRole.toUpperCase()} Demo & Enter</span>
          </button>

          <div className="grid grid-cols-2 gap-2.5">
            <Link
              to="/login"
              className="py-2.5 px-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>OTP Login</span>
            </Link>
            <Link
              to="/"
              className="py-2.5 px-3 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

