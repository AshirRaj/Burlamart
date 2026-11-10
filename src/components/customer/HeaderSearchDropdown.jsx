import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Sparkles, Tag } from 'lucide-react';
import { api } from '../../services/api';

export const HeaderSearchDropdown = ({ query, isOpen, onClose, onSelectQuery }) => {
  const [matches, setMatches] = useState([]);
  const [allCatalog, setAllCatalog] = useState([]);

  useEffect(() => {
    let active = true;
    api.products.getAll().then((prods) => {
      if (active) setAllCatalog(prods || []);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const trimmed = (query || '').trim().toLowerCase();
    if (!trimmed || trimmed.length < 1) {
      setMatches([]);
      return;
    }

    const found = allCatalog
      .filter((item) => {
        const nameMatch = item.name?.toLowerCase().includes(trimmed);
        const brandMatch = item.brand?.toLowerCase().includes(trimmed);
        const catMatch = item.category?.toLowerCase().includes(trimmed);
        const tagMatch = Array.isArray(item.tags) && item.tags.some(t => t.toLowerCase().includes(trimmed));
        return nameMatch || brandMatch || catMatch || tagMatch;
      })
      .slice(0, 6);

    setMatches(found);
  }, [query, allCatalog]);

  if (!isOpen || !query?.trim()) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
      <div className="px-3.5 py-2 bg-[#FAF8F5] border-b border-gray-100 flex items-center justify-between text-[11px] font-bold text-gray-500">
        <span className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Live Suggestions for "{query}"
        </span>
        <span>{matches.length} quick hits</span>
      </div>

      {matches.length > 0 ? (
        <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
          {matches.map((item) => (
            <Link
              key={item.id}
              to={`/product/${item.id}`}
              onClick={onClose}
              className="flex items-center justify-between gap-3 px-3.5 py-2.5 hover:bg-emerald-50/60 transition group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-10 h-10 rounded-xl object-cover bg-gray-50 border border-gray-100 flex-shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-gray-900 group-hover:text-[#1B4332] truncate">
                    {item.name}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-gray-500 mt-0.5">
                    <span className="capitalize bg-gray-100 px-1.5 py-0.5 rounded font-semibold">
                      {(item.category || '').replace('-', ' ')}
                    </span>
                    {item.weightDisplay || item.weight ? (
                      <span>{item.weightDisplay || item.weight}</span>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                <div className="text-xs font-black text-[#1B4332]">₹{item.price}</div>
                <span className="text-[10px] text-emerald-700 font-semibold flex items-center justify-end gap-0.5">
                  View <ArrowRight className="w-2.5 h-2.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="p-4 text-center text-xs text-gray-500">
          No instant matches. Press Enter to run a full catalog search.
        </div>
      )}

      <Link
        to={`/search?q=${encodeURIComponent(query.trim())}`}
        onClick={() => {
          if (onSelectQuery) onSelectQuery(query.trim());
          onClose();
        }}
        className="flex items-center justify-center gap-1.5 py-2.5 px-4 bg-[#1B4332] hover:bg-[#2D6A4F] text-white text-xs font-bold transition"
      >
        <Search className="w-3.5 h-3.5" />
        <span>View all results for "{query.trim()}"</span>
      </Link>
    </div>
  );
};

