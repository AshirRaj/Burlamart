import React from 'react';
import { Link } from 'react-router-dom';

export const AmazonPersonalizedFooter = () => {
  return (
    <div className="w-full bg-white rounded-3xl p-8 border border-gray-200 text-center my-6 shadow-sm">
      <h4 className="text-base font-black text-gray-900 mb-3">
        See personalized recommendations
      </h4>

      <Link
        to="/login"
        className="inline-block w-full sm:w-auto px-16 sm:px-24 py-2.5 bg-[#ffd814] hover:bg-[#f7ca00] text-gray-950 font-bold text-sm rounded-xl shadow-sm hover:shadow transition"
      >
        Sign in
      </Link>

      <p className="text-xs text-gray-600 mt-2">
        New customer?{' '}
        <Link to="/login" className="text-[#007185] hover:text-[#c45500] hover:underline font-semibold">
          Start here.
        </Link>
      </p>
    </div>
  );
};

