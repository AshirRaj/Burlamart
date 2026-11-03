import React from 'react';
import { 
  Zap, 
  ShieldCheck, 
  Clock, 
  Award, 
  Truck, 
  CreditCard, 
  CheckCircle2, 
  Star, 
  Users, 
  Store, 
  MapPin, 
  Headphones, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const HomeWhyChooseUs = () => {
  const steps = [
    {
      num: '01',
      title: 'Choose Category or Mart',
      desc: 'Browse 10-min groceries, verified hotel rooms, flagship electronics with EMI, or gourmet packaged snacks.',
      icon: Store,
      color: 'bg-emerald-100 text-emerald-800'
    },
    {
      num: '02',
      title: 'Real-Time Wholesale Rates',
      desc: 'Enjoy verified seller prices with zero markups, instant BxGy combo discounts, and bank cashback offers.',
      icon: Zap,
      color: 'bg-teal-100 text-teal-800'
    },
    {
      num: '03',
      title: '10-Min Delivery or Slot',
      desc: 'Riders dispatch within 2 minutes from micro-fulfillment hubs, or receive instant OYO stay confirmation vouchers.',
      icon: Truck,
      color: 'bg-blue-100 text-blue-800'
    },
    {
      num: '04',
      title: '100% Brand Guarantee',
      desc: 'Official manufacturer brand warranties, 7-day hassle-free replacements, and round-the-clock callback support.',
      icon: ShieldCheck,
      color: 'bg-amber-100 text-amber-800'
    }
  ];

  const whyChoosePillars = [
    {
      title: '10-Minute Lightning Delivery',
      desc: 'Micro dark stores and hyperlocal logistics ensure your groceries, fresh produce, and essentials arrive in 10-12 minutes.',
      icon: Clock,
      color: 'text-emerald-700 bg-emerald-50 border-emerald-200'
    },
    {
      title: 'Direct Verified Merchants',
      desc: 'All 1,500+ shops and partner hotels are physically audited, FSSAI certified, and backed by genuine customer reviews.',
      icon: Award,
      color: 'text-teal-700 bg-teal-50 border-teal-200'
    },
    {
      title: 'No-Cost EMI & Smart Combos',
      desc: 'Compare gadget specs side-by-side with zero-interest EMIs, and save up to 35% on curated food & beverage combos.',
      icon: CreditCard,
      color: 'text-blue-700 bg-blue-50 border-blue-200'
    },
    {
      title: '24/7 Support & 15-Min Callback',
      desc: 'Instant answers via our bottom-right AI Assistant, plus guaranteed priority phone callback from a human within 15 minutes.',
      icon: Headphones,
      color: 'text-amber-700 bg-amber-50 border-amber-200'
    }
  ];

  const testimonials = [
    {
      name: 'Aditi Deshmukh',
      role: 'Daily Grocery Shopper',
      rating: 5,
      comment: 'Burlamart is genuinely faster than walking to the local market. Milk, eggs and bread delivered in literally 9 minutes at 7:30 AM!',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      badge: 'Verified Buyer • Grocery'
    },
    {
      name: 'Vikramaditya Roy',
      role: 'Business Traveler',
      rating: 5,
      comment: 'Booked an OYO partner stay in Bangalore through Burlamart. Seamless check-in slot selection, spotless room, and zero cancellation fee.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      badge: 'Verified Guest • Hotels'
    },
    {
      name: 'Pooja Chhabra',
      role: 'Tech Enthusiast',
      rating: 5,
      comment: 'Bought the Apple Watch with No-Cost EMI during the Great Indian Festival hub. Fast delivery, 1-year brand warranty, and ₹150 instant cashback!',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      badge: 'Verified Buyer • Electronics'
    }
  ];

  return (
    <div className="space-y-12 pt-4">
      {/* 1. HOW IT WORKS SECTION */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-200 shadow-xs space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
            Effortless Experience
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            How Burlamart Works
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            From placing your order to doorstep lightning delivery in 4 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((st, idx) => {
            const IconComp = st.icon;
            return (
              <div
                key={idx}
                className="bg-[#f8faf9] rounded-2xl p-5 border border-gray-100 hover:border-emerald-300 transition-all flex flex-col justify-between group shadow-2xs relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-emerald-700/80 font-mono">
                      {st.num}
                    </span>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${st.color} group-hover:scale-110 transition`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="font-black text-sm text-gray-900 group-hover:text-emerald-800 transition">
                    {st.title}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1.5 leading-relaxed font-medium">
                    {st.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. WHY CHOOSE BURLAMART (GRID) */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-teal-800 bg-teal-100 px-3 py-1 rounded-full">
            Our Guarantees
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Why Choose Burlamart?
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            India's most trusted hyperlocal super-app combining fast retail, stays, gadgets and food
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {whyChoosePillars.map((p, idx) => {
            const IconComp = p.icon;
            return (
              <div
                key={idx}
                className={`p-6 rounded-3xl border bg-white shadow-xs hover:shadow-md transition-all flex flex-col justify-between group`}
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${p.color} border`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="font-black text-base text-gray-900 group-hover:text-emerald-800 transition">
                    {p.title}
                  </h3>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed font-medium">
                    {p.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-[11px] font-bold text-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Burlamart Certified</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. ABOUT US & PLATFORM METRICS */}
      <div className="bg-gradient-to-r from-[#1B4332] via-[#2D6A4F] to-[#1B4332] rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="max-w-xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider text-amber-300">
            <Sparkles className="w-3.5 h-3.5" />
            About Burlamart
          </div>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Building the Digital Backbone for Neighborhood Commerce.
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-medium">
            Burlamart connects everyday shoppers with verified local grocers, trusted hotel chains, authorized electronics brands, and artisanal food kitchens. We combine 10-minute ultra-fast logistics with transparent wholesale pricing so you never overpay.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              to="/category/grocery"
              className="px-5 py-2.5 bg-white text-gray-950 font-black text-xs rounded-xl hover:bg-gray-100 transition shadow-md"
            >
              Start Shopping Now →
            </Link>
            <Link
              to="/vendor"
              className="px-5 py-2.5 bg-emerald-950/60 hover:bg-emerald-950 text-white font-bold text-xs rounded-xl border border-white/20 transition"
            >
              Partner with Us as Merchant
            </Link>
          </div>
        </div>

        {/* Real Metrics Grid */}
        <div className="grid grid-cols-2 gap-4 w-full lg:w-auto flex-shrink-0">
          <div className="bg-white/10 backdrop-blur-md border border-white/15 p-5 rounded-2xl text-center">
            <div className="text-2xl sm:text-3xl font-black text-amber-300">100k+</div>
            <div className="text-xs text-emerald-100 font-semibold mt-1">Happy Customers</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/15 p-5 rounded-2xl text-center">
            <div className="text-2xl sm:text-3xl font-black text-emerald-300">1,500+</div>
            <div className="text-xs text-emerald-100 font-semibold mt-1">Verified Partners</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/15 p-5 rounded-2xl text-center">
            <div className="text-2xl sm:text-3xl font-black text-teal-300">10 Mins</div>
            <div className="text-xs text-emerald-100 font-semibold mt-1">Average Delivery</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/15 p-5 rounded-2xl text-center">
            <div className="text-2xl sm:text-3xl font-black text-rose-300">35+</div>
            <div className="text-xs text-emerald-100 font-semibold mt-1">Stay Destinations</div>
          </div>
        </div>
      </div>

      {/* 4. VERIFIED CUSTOMER TESTIMONIALS */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
            Customer Love
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            What Our Customers Say
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-medium">
            Real feedback from verified shoppers across all our service verticals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-gray-200 shadow-xs space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                    {t.badge}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-700 italic leading-relaxed">
                  "{t.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover border border-emerald-300"
                />
                <div>
                  <h4 className="font-extrabold text-xs text-gray-900">{t.name}</h4>
                  <p className="text-[11px] text-gray-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

