import React, { useState } from 'react';
import { Lock, Unlock, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BannerUnlock({ onOpenPhysicalCard }) {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleUnlock = () => {
    setIsUnlocked(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.2 }
    });
    if (onOpenPhysicalCard) {
      setTimeout(() => {
        onOpenPhysicalCard();
      }, 500);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 mt-3">
      <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-200/80 flex items-center justify-between gap-3 relative overflow-hidden transition-all hover:shadow-md">
        {/* Colorful left decorative pill */}
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#f77f00] to-[#e63946]"></div>

        <div className="flex items-center gap-3 pl-1.5">
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-xl shrink-0 border border-amber-100 shadow-2xs">
            🎉
          </div>
          <div>
            <h4 className="text-[13px] font-bold text-slate-800 leading-snug">
              {isUnlocked ? 'DNE Físico Desbloqueado!' : 'Uhul! Chegou!'}
            </h4>
            <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
              {isUnlocked 
                ? 'Seu cartão físico 2026 está pronto para visualização.' 
                : 'Desbloqueie seu DNE físico e aproveite.'}
            </p>
          </div>
        </div>

        <button
          onClick={handleUnlock}
          className={`shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-md active:scale-95 transition-all cursor-pointer ${
            isUnlocked 
              ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-200' 
              : 'bg-gradient-to-tr from-[#f77f00] to-[#fb8500] hover:brightness-105 shadow-orange-200'
          }`}
          title={isUnlocked ? "Ver DNE Físico" : "Desbloquear Cartão Físico"}
        >
          {isUnlocked ? (
            <Unlock className="w-5 h-5 animate-bounce" />
          ) : (
            <Lock className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
}
