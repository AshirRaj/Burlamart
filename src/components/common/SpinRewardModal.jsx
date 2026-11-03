import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Gift, Coins, Trophy, Sparkles, X, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SpinRewardModal = ({ isOpen, onClose, orderTotal }) => {
  const { creditSharedWallet } = useApp();
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState(null);

  if (!isOpen) return null;

  const prizes = [
    { label: '₹15 Cashback', value: 15, color: '#1B4332' },
    { label: '₹25 Cashback', value: 25, color: '#2D6A4F' },
    { label: '₹50 Cashback', value: 50, color: '#40916C' },
    { label: '₹10 Coins', value: 10, color: '#52B788' },
    { label: '₹100 Jackpot', value: 100, color: '#0F3923' },
    { label: '₹20 Cashback', value: 20, color: '#166534' },
  ];

  const handleSpin = () => {
    if (spinning || wonPrize) return;

    setSpinning(true);
    const randomIndex = Math.floor(Math.random() * prizes.length);
    const selected = prizes[randomIndex];

    // calculate target degree
    const segmentAngle = 360 / prizes.length;
    const targetDegree = 360 * 5 + (randomIndex * segmentAngle) + (segmentAngle / 2);

    setRotation(targetDegree);

    setTimeout(() => {
      setSpinning(false);
      setWonPrize(selected);
      creditSharedWallet(selected.value);

      // launch confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 3200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl border border-emerald-100 relative overflow-hidden">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-700 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-[#1B4332] rounded-full text-xs font-bold mb-3">
          <Trophy className="w-3.5 h-3.5" /> Order Completed Reward
        </div>

        <h3 className="text-xl font-extrabold text-gray-900 mb-1">
          Spin & Win Rewards!
        </h3>
        <p className="text-xs text-gray-500 mb-6">
          Rewards go directly to your Burlamart Shared Wallet
        </p>

        {/* Wheel container */}
        <div className="relative w-56 h-56 mx-auto mb-6 flex items-center justify-center">
          {/* Wheel Pointer */}
          <div className="absolute top-0 z-20 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[18px] border-t-amber-500 -mt-1 drop-shadow-md"></div>

          {/* Rotating Wheel */}
          <div 
            className="w-full h-full rounded-full border-4 border-emerald-800 shadow-inner overflow-hidden relative transition-transform duration-[3200ms] ease-out"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            {prizes.map((p, idx) => {
              const deg = (360 / prizes.length) * idx;
              return (
                <div
                  key={idx}
                  className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white uppercase tracking-tight"
                  style={{
                    backgroundColor: p.color,
                    clipPath: 'polygon(50% 50%, 0 0, 100% 0)',
                    transform: `rotate(${deg}deg)`,
                    transformOrigin: 'center center'
                  }}
                >
                  <span className="mb-24 block transform -rotate-90 select-none">
                    {p.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Center Hub */}
          <div className="absolute z-10 w-12 h-12 rounded-full bg-white shadow-lg border-2 border-emerald-600 flex items-center justify-center">
            <Coins className="w-5 h-5 text-amber-500" />
          </div>
        </div>

        {wonPrize ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-4 animate-scaleUp">
            <div className="text-sm font-bold text-emerald-900 mb-1 flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" /> You Won {wonPrize.label}!
            </div>
            <p className="text-xs text-emerald-700">
              ₹{wonPrize.value} added to your Shared Wallet. Redeem at any Burlamart shop!
            </p>
          </div>
        ) : (
          <button
            onClick={handleSpin}
            disabled={spinning}
            className={`w-full py-3 px-6 rounded-2xl font-bold text-white shadow-lg transition-all ${
              spinning 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-[#1B4332] hover:bg-[#2D6A4F] active:scale-95 shadow-emerald-900/30'
            }`}
          >
            {spinning ? 'Spinning Wheel...' : 'Tap to Spin Wheel'}
          </button>
        )}

        {wonPrize && (
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-emerald-800 text-white rounded-xl text-xs font-bold hover:bg-emerald-900 transition"
          >
            Claim & Continue
          </button>
        )}
      </div>
    </div>
  );
};

