import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Sparkles, ChevronDown } from 'lucide-react';
import { AMAZON_SUB_NAV_LINKS } from './electronicsData';

export const AmazonSubNav = () => {
  return (
    <nav className="w-full bg-[#232f3e] text-white text-xs font-medium px-4 py-2 border-b border-gray-700 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
        {/* Left Links */}
        <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0">
          <Link
            to="/category/electronics"
            className="flex items-center gap-1.5 hover:text-amber-400 font-bold transition px-2 py-1 rounded hover:border hover:border-white"
          >
            <Menu className="w-4 h-4" />
            <span>All</span>
          </Link>

          {AMAZON_SUB_NAV_LINKS.slice(1).map((item) => (
            <Link
              key={item.id}
              to={item.link}
              className={`hover:text-amber-300 transition whitespace-nowrap px-2 py-1 rounded hover:border hover:border-white ${
                item.active ? 'font-black text-amber-400 underline underline-offset-4' : 'text-gray-200'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right Festive Live Banner (Exact matching Image 1) */}
        <div className="hidden lg:flex items-center gap-2 flex-shrink-0 text-amber-300 font-bold bg-[#131921] px-3.5 py-1 rounded-full border border-amber-500/30">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>Great Indian Festival | Live Now</span>
        </div>
      </div>
    </nav>
  );
};

