import React from 'react';
import { Sparkles, CheckCircle2, Crown, ArrowRight, Zap, Gift } from 'lucide-react';

export const HotelWizardMembership = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-950 via-gray-900 to-[#1e1b4b] text-white p-6 sm:p-10 lg:p-12 shadow-2xl border border-amber-500/30">
        {/* Glow ambient background lights */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text & Benefits Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Membership Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/40 text-amber-300 text-xs font-black uppercase tracking-wider">
              <Crown className="w-4 h-4 text-amber-400" />
              <span>Smart way to travel</span>
            </div>

            {/* Title */}
            <div>
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                Join <span className="bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent">Wizard Membership</span>
              </h2>
              <p className="text-sm sm:text-base text-gray-300 mt-2 font-medium">
                Unlock member-only rates, luxury upgrades, and seamless priority hospitality across all stays.
              </p>
            </div>

            {/* User Requested Exact Bullet Points */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-400 text-gray-950 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-sm sm:text-base font-bold text-gray-100">
                  Get upto 10% discount on wizard hotels
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-400 text-gray-950 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-sm sm:text-base font-bold text-gray-100">
                  Faster, priority support
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-400 text-gray-950 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-sm sm:text-base font-bold text-gray-100">
                  1 free night after 7 night stays
                </span>
              </div>
            </div>

            {/* CTA Button matching user link requirement */}
            <div className="pt-4">
              <a
                href="https://www.oyorooms.com/wizard/renew/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-gray-950 font-black text-sm sm:text-base rounded-2xl shadow-xl hover:shadow-amber-500/25 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <span>Join Wizard</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <span className="block text-[11px] text-gray-400 mt-2 font-medium">
                Instant activation • Valid across all partner cities
              </span>
            </div>
          </div>

          {/* Right Gold Card Visual */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm aspect-[1.58/1] rounded-2xl p-6 bg-gradient-to-br from-amber-500 via-yellow-600 to-amber-700 shadow-2xl border border-yellow-300/40 text-gray-950 flex flex-col justify-between overflow-hidden">
              {/* Card Watermark */}
              <Crown className="absolute -bottom-8 -right-8 w-44 h-44 text-yellow-300/20 pointer-events-none" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-black text-amber-400 flex items-center justify-center font-black text-xs">
                    W
                  </div>
                  <span className="font-black text-lg tracking-wider text-black">WIZARD GOLD</span>
                </div>
                <Sparkles className="w-5 h-5 text-yellow-200" />
              </div>

              <div className="my-auto">
                <p className="text-[11px] uppercase tracking-widest font-black text-amber-950/80">Privilege Pass</p>
                <p className="text-xl font-mono font-bold tracking-widest text-black">
                  4820 •••• •••• 9102
                </p>
              </div>

              <div className="flex items-center justify-between text-xs font-bold text-amber-950 border-t border-amber-400/40 pt-2">
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-amber-900">Member</p>
                  <p className="text-black">BURLAMART VIP</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-amber-900">Discount</p>
                  <p className="text-black">UP TO 10% OFF</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

