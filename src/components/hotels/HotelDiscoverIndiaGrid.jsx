import React, { useState } from 'react';
import { ChevronRight, ArrowRight, MapPin, Sparkles, Compass } from 'lucide-react';
import { ODISHA_CITIES_BY_TAB, ALL_ODISHA_CITIES } from './hotelData';

export const HotelDiscoverIndiaGrid = ({ onSelectCity }) => {
  const [activeTab, setActiveTab] = useState('sambalpur');
  const [showAllDistricts, setShowAllDistricts] = useState(false);

  const tabs = [
    { id: 'sambalpur', label: 'Sambalpur & Western', emoji: '🏛️' },
    { id: 'smart_cities', label: 'Smart & Capital Cities', emoji: '🏙️' },
    { id: 'heritage', label: 'Temples & Heritage', emoji: '🛕' },
    { id: 'nature', label: 'Lakes & Eco-Sanctuaries', emoji: '🌊' }
  ];

  const currentCities = ODISHA_CITIES_BY_TAB[activeTab] || ODISHA_CITIES_BY_TAB.sambalpur;

  // Primary 6 cities for Bento Grid layout
  const primaryCities = currentCities.slice(0, 6);
  const city1 = primaryCities[0]; // Tall Left (e.g., Hyderabad)
  const city2 = primaryCities[1]; // Wide Center Top (e.g., Kolkata)
  const city3 = primaryCities[2]; // Bottom Left (e.g., Gurgaon)
  const city4 = primaryCities[3]; // Bottom Center (e.g., New Delhi)
  const city5 = primaryCities[4]; // Top Right small (e.g., Noida)
  const city6 = primaryCities[5]; // Tall Right (e.g., Chennai)

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Discover Odisha with <span className="text-[#e01933]">Burlamart</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Explore verified stays across Sambalpur, Burla, and all 30 districts of Odisha
          </p>
        </div>

        {/* Tab Switcher (Matching Reference Image 5) */}
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-1.5 px-3 py-2 rounded-2xl transition border flex-shrink-0 ${
                  isActive
                    ? 'border-gray-900 bg-white shadow-xs'
                    : 'border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-100/60'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-xl shadow-xs">
                  {tab.emoji}
                </div>
                <span className={`text-xs font-bold ${isActive ? 'text-gray-900 underline underline-offset-4 decoration-2 decoration-gray-900' : 'text-gray-500'}`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bento Grid Layout (Matching User Reference Image 5) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[170px] sm:auto-rows-[190px]">
        {/* 1. Left Tall Card: Hyderabad / City 1 (Row span 2) */}
        {city1 && (
          <div
            onClick={() => onSelectCity(city1.name)}
            className="group relative lg:row-span-2 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer"
          >
            <img
              src={city1.image}
              alt={city1.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-red-600/90 text-white px-2 py-0.5 rounded-full mb-2 inline-block">
                {city1.badge || 'Popular'}
              </span>
              <h3 className="text-2xl font-black">{city1.name}</h3>
              <p className="text-xs text-gray-300 mt-0.5">{city1.tag}</p>
              <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-amber-300 group-hover:translate-x-1 transition-transform">
                <span>View Stays</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </div>
        )}

        {/* 2. Center Top Wide Card: Kolkata / City 2 (Col span 2) */}
        {city2 && (
          <div
            onClick={() => onSelectCity(city2.name)}
            className="group relative lg:col-span-2 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer"
          >
            <img
              src={city2.image}
              alt={city2.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-4 left-5 right-5 text-white flex items-end justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 backdrop-blur-xs text-white px-2 py-0.5 rounded-full mb-1 inline-block">
                  {city2.badge || 'Explore'}
                </span>
                <h3 className="text-xl sm:text-2xl font-black">{city2.name}</h3>
                <p className="text-xs text-gray-300">{city2.tag}</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-white text-gray-900 flex items-center justify-center group-hover:bg-[#e01933] group-hover:text-white transition-colors">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        )}

        {/* 3. Right Tall Card: Chennai / City 6 (Row span 2) */}
        {city6 && (
          <div
            onClick={() => onSelectCity(city6.name)}
            className="group relative lg:row-span-2 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer"
          >
            <img
              src={city6.image}
              alt={city6.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-600/90 text-white px-2 py-0.5 rounded-full mb-2 inline-block">
                {city6.badge || 'Coastal'}
              </span>
              <h3 className="text-2xl font-black">{city6.name}</h3>
              <p className="text-xs text-gray-300 mt-0.5">{city6.tag}</p>
              <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-amber-300 group-hover:translate-x-1 transition-transform">
                <span>View Stays</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </div>
        )}

        {/* 4. Center Bottom Left: Gurgaon / City 3 */}
        {city3 && (
          <div
            onClick={() => onSelectCity(city3.name)}
            className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer"
          >
            <img
              src={city3.image}
              alt={city3.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 text-white">
              <h3 className="text-lg font-black">{city3.name}</h3>
              <p className="text-[11px] text-gray-300 truncate">{city3.tag}</p>
            </div>
          </div>
        )}

        {/* 5. Center Bottom Center: New Delhi / City 4 */}
        {city4 && (
          <div
            onClick={() => onSelectCity(city4.name)}
            className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 cursor-pointer"
          >
            <img
              src={city4.image}
              alt={city4.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 text-white">
              <h3 className="text-lg font-black">{city4.name}</h3>
              <p className="text-[11px] text-gray-300 truncate">{city4.tag}</p>
            </div>
          </div>
        )}
      </div>

      {/* Additional Odisha Cities in this Category */}
      {currentCities.length > 4 && (
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-gray-500 mr-2">Featured in {tabs.find(t => t.id === activeTab)?.label}:</span>
          {currentCities.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => onSelectCity(c.name)}
              className="px-3.5 py-1.5 rounded-full bg-white hover:bg-red-50 border border-gray-200 hover:border-red-300 text-xs font-bold text-gray-700 hover:text-[#e01933] transition shadow-xs flex items-center gap-1.5"
            >
              <MapPin className="w-3 h-3 text-red-500" />
              <span>{c.name}</span>
              <span className="text-[10px] text-gray-400">({c.staysCount}+)</span>
            </button>
          ))}
        </div>
      )}

      {/* All 30 Districts of Odisha Quick Browser */}
      <div className="mt-10 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#e01933]" />
            <h4 className="font-bold text-sm text-gray-900">
              Browse All Districts & Cities of Odisha ({ALL_ODISHA_CITIES.length})
            </h4>
          </div>
          <button
            type="button"
            onClick={() => setShowAllDistricts(!showAllDistricts)}
            className="text-xs font-bold text-[#e01933] hover:underline"
          >
            {showAllDistricts ? 'Show Less ▲' : 'View All 30 Districts ▼'}
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {(showAllDistricts ? ALL_ODISHA_CITIES : ALL_ODISHA_CITIES.slice(0, 14)).map((city) => (
            <button
              key={city.id}
              type="button"
              onClick={() => onSelectCity(city.name)}
              className="px-3 py-1 bg-gray-50 hover:bg-red-50 border border-gray-200 hover:border-red-300 rounded-lg text-xs text-gray-700 hover:text-[#e01933] font-medium transition flex items-center gap-1"
            >
              <span>{city.name}</span>
              <span className="text-[10px] text-gray-400">({city.district})</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

