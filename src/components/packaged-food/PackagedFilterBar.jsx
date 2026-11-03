import React from 'react';
import { Search, X, SlidersHorizontal, ArrowUpDown, Star } from 'lucide-react';

export const PackagedFilterBar = ({
  searchQuery,
  setSearchQuery,
  selectedBrand,
  setSelectedBrand,
  brands = [],
  selectedPriceRange,
  setSelectedPriceRange,
  selectedRating,
  setSelectedRating,
  sortBy,
  setSortBy,
  onClearAll,
  totalResults
}) => {
  const priceRanges = [
    { id: 'all', label: 'All Prices' },
    { id: 'under-50', label: 'Under ₹50', max: 50 },
    { id: '50-100', label: '₹50 - ₹100', min: 50, max: 100 },
    { id: '100-200', label: '₹100 - ₹200', min: 100, max: 200 },
    { id: 'above-200', label: 'Over ₹200', min: 200 }
  ];

  const hasActiveFilters = 
    searchQuery.trim() !== '' || 
    selectedBrand !== 'all' || 
    selectedPriceRange !== 'all' || 
    selectedRating !== 'all' ||
    sortBy !== 'recommended';

  return (
    <div className="w-full bg-white rounded-2xl p-4 border border-gray-200/80 shadow-xs space-y-3.5">
      {/* 1. Search Bar & Sort Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input with Clear Button */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search chips, biscuits, namkeen, Maggi, chocolates..."
            className="w-full pl-9 pr-9 py-2 bg-gray-50 hover:bg-gray-100/70 focus:bg-white border border-gray-200 rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:border-[#1B4332] transition"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="flex items-center gap-1.5 text-xs text-gray-500 font-bold">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <span>Sort:</span>
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-50 border border-gray-200 text-gray-800 text-xs font-bold rounded-xl px-3 py-2 focus:outline-none focus:border-[#1B4332]"
          >
            <option value="recommended">Recommended</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="bestseller">Popularity</option>
          </select>
        </div>
      </div>

      {/* 2. Filter Pills: Brands, Price, Rating */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-gray-100 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          {/* Brand Filter */}
          <div className="flex items-center gap-1">
            <span className="font-bold text-gray-500 text-[11px]">Brand:</span>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-gray-800 text-xs font-semibold rounded-lg px-2.5 py-1 focus:outline-none"
            >
              <option value="all">All Brands</option>
              {brands.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="flex items-center gap-1">
            <span className="font-bold text-gray-500 text-[11px]">Price:</span>
            <select
              value={selectedPriceRange}
              onChange={(e) => setSelectedPriceRange(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-gray-800 text-xs font-semibold rounded-lg px-2.5 py-1 focus:outline-none"
            >
              {priceRanges.map((pr) => (
                <option key={pr.id} value={pr.id}>{pr.label}</option>
              ))}
            </select>
          </div>

          {/* Rating Filter */}
          <div className="flex items-center gap-1">
            <span className="font-bold text-gray-500 text-[11px]">Rating:</span>
            <select
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-gray-800 text-xs font-semibold rounded-lg px-2.5 py-1 focus:outline-none"
            >
              <option value="all">All Ratings</option>
              <option value="4.5">4.5★ & Above</option>
              <option value="4.0">4.0★ & Above</option>
            </select>
          </div>
        </div>

        {/* Clear Filters & Count */}
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-bold text-gray-500">
            {totalResults} {totalResults === 1 ? 'snack' : 'snacks'} found
          </span>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onClearAll}
              className="text-[11px] font-bold text-red-600 hover:text-red-700 underline cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

