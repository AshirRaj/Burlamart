import React, { useState } from 'react';
import { Mic, MicOff, Sparkles, Check, X, Plus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { INITIAL_PRODUCTS, INITIAL_SHOPS } from '../../services/mockData';

export const VoiceOrderModal = ({ isOpen, onClose }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [matchedItems, setMatchedItems] = useState([]);
  const { addToCart } = useCart();

  if (!isOpen) return null;

  const sampleVoicePrompts = [
    "Order 2 kg tomatoes and 1 litre milk",
    "Add 5kg whole wheat flour to my cart",
    "Get crunchy potato crisps and chocolate cookies"
  ];

  const handleSimulateVoice = (phrase) => {
    setIsListening(true);
    setTranscript('');
    setMatchedItems([]);

    setTimeout(() => {
      setTranscript(phrase);
      setIsListening(false);
      
      // Fuzzy match items from INITIAL_PRODUCTS
      const lower = phrase.toLowerCase();
      const matches = INITIAL_PRODUCTS.filter(p => {
        const pName = p.name.toLowerCase();
        return lower.split(' ').some(w => w.length > 3 && pName.includes(w));
      });
      setMatchedItems(matches.length > 0 ? matches : [INITIAL_PRODUCTS[0], INITIAL_PRODUCTS[2]]);
    }, 1200);
  };

  const handleAddAll = () => {
    const defaultShop = INITIAL_SHOPS[0];
    matchedItems.forEach(item => {
      addToCart(item, defaultShop);
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-emerald-100">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Burlamart Voice AI Ordering</h3>
              <p className="text-xs text-gray-500">Speak or select what you want to order</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Listening orb */}
        <div className="flex flex-col items-center justify-center py-6 bg-gradient-to-b from-emerald-50/50 to-transparent rounded-2xl mb-4 border border-emerald-100/60">
          <button
            onClick={() => handleSimulateVoice("Order 2 kg tomatoes and 1 litre milk")}
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
              isListening 
                ? 'bg-rose-500 text-white animate-pulse shadow-lg shadow-rose-200' 
                : 'bg-[#1B4332] text-white hover:bg-[#2D6A4F] shadow-lg shadow-emerald-900/20'
            }`}
          >
            {isListening ? <Mic className="w-8 h-8 animate-bounce" /> : <Mic className="w-8 h-8" />}
          </button>
          <span className="mt-3 text-xs font-semibold text-emerald-900">
            {isListening ? 'Listening to your voice...' : 'Tap mic or click an example below'}
          </span>
          {transcript && (
            <p className="mt-2 text-sm text-gray-800 font-medium px-4 text-center italic bg-white/80 py-1.5 rounded-lg border border-gray-200">
              "{transcript}"
            </p>
          )}
        </div>

        {/* Suggested phrases */}
        <div className="mb-4">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Try speaking:</span>
          <div className="flex flex-col gap-1.5">
            {sampleVoicePrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSimulateVoice(p)}
                className="text-left text-xs bg-gray-50 hover:bg-emerald-50 text-gray-700 hover:text-emerald-800 px-3 py-2 rounded-xl border border-gray-200/70 transition flex items-center justify-between"
              >
                <span>"{p}"</span>
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 opacity-60" />
              </button>
            ))}
          </div>
        </div>

        {/* Matched Items */}
        {matchedItems.length > 0 && (
          <div className="bg-emerald-50/50 rounded-2xl p-3 border border-emerald-200 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-900">Identified {matchedItems.length} Products:</span>
              <button
                onClick={handleAddAll}
                className="text-xs font-bold text-[#1B4332] hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Add All to Cart
              </button>
            </div>
            <div className="space-y-2">
              {matchedItems.map(item => (
                <div key={item.id} className="flex items-center justify-between bg-white p-2 rounded-xl border border-gray-100 text-xs">
                  <div className="flex items-center gap-2">
                    <img src={item.image} alt={item.name} className="w-8 h-8 rounded-lg object-cover" />
                    <div>
                      <div className="font-semibold text-gray-900">{item.name}</div>
                      <div className="text-[11px] text-gray-500">₹{item.price} • {item.weightDisplay}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => addToCart(item, INITIAL_SHOPS[0])}
                    className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-lg hover:bg-emerald-200"
                  >
                    + Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

