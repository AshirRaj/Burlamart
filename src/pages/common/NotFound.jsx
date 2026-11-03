import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F8FAF9] text-center">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-gray-200 shadow-xl space-y-4">
        <div className="text-5xl font-extrabold text-[#1B4332]">404</div>
        <h2 className="text-xl font-bold text-gray-900">Page Not Found</h2>
        <p className="text-xs text-gray-500">
          The requested page or route does not exist on Burlamart.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1B4332] text-white rounded-xl text-xs font-bold hover:bg-[#2D6A4F] transition"
        >
          <Home className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
};

