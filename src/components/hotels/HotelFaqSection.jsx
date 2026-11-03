import React, { useState } from 'react';
import { ChevronDown, HelpCircle, PhoneCall, Mail } from 'lucide-react';
import { HOTEL_FAQS } from './hotelData';

export const HotelFaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[#e01933] text-xs font-bold mb-2">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">
          Everything You Need to Know
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-2">
          Quick answers to common questions about reservations, check-in, payments, and member discounts
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {HOTEL_FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs transition-all duration-200"
            >
              <button
                type="button"
                onClick={() => toggleFaq(index)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-gray-900 text-sm sm:text-base hover:text-[#e01933] transition"
              >
                <span>{faq.q}</span>
                <div className={`w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-red-50 text-[#e01933]' : 'text-gray-400'}`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-3 animate-in fade-in duration-200">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 24x7 Customer Support Strip */}
      <div className="mt-10 p-6 rounded-3xl bg-gray-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-amber-400">
            <PhoneCall className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-sm sm:text-base">Need help with your stay reservation?</h4>
            <p className="text-xs text-gray-400">Our dedicated 24x7 hotel concierge is available to assist you.</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="tel:0124-6201611"
            className="px-5 py-2.5 bg-[#e01933] hover:bg-[#c8142b] text-white text-xs font-bold rounded-xl transition shadow-xs"
          >
            Call 0124-6201611
          </a>
        </div>
      </div>
    </section>
  );
};

