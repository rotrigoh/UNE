import React from 'react';

// Official DNE Logo SVG
export function DNELogo({ className = "h-8" }) {
  return (
    <div className={`flex items-center gap-1.5 font-bold tracking-tight select-none ${className}`}>
      <div className="relative flex items-baseline">
        <span className="text-[#004e89] text-2xl font-black font-['Space_Grotesk'] tracking-tighter">d</span>
        <span className="text-[#0077b6] text-2xl font-black font-['Space_Grotesk'] tracking-tighter">n</span>
        <span className="text-[#0096c7] text-2xl font-black font-['Space_Grotesk'] tracking-tighter">e</span>
        <div className="w-1.5 h-1.5 rounded-full bg-[#f77f00] ml-0.5 mb-1 animate-pulse"></div>
      </div>
      <div className="hidden sm:flex flex-col text-[8px] uppercase tracking-wider text-slate-500 font-semibold leading-tight border-l border-slate-300 pl-1.5">
        <span>Documento</span>
        <span>Nacional</span>
        <span className="text-[#004e89] font-bold">do Estudante</span>
      </div>
    </div>
  );
}

// UNE Logo
export function UNELogo({ className = "w-6 h-6" }) {
  return (
    <img 
      src="/assets/logo_une_round.png" 
      alt="UNE - União Nacional dos Estudantes" 
      className={`rounded-full object-contain shadow-sm ${className}`}
    />
  );
}

// UBES Logo (SVG representation)
export function UBESLogo({ className = "w-6 h-6" }) {
  return (
    <div className={`rounded-full bg-[#008751] flex items-center justify-center p-0.5 text-white shadow-sm ring-1 ring-[#00663d] ${className}`} title="UBES - União Brasileira dos Estudantes Secundaristas">
      <svg viewBox="0 0 100 100" className="w-full h-full fill-white">
        <circle cx="50" cy="50" r="48" fill="#008751" />
        <path d="M20 65 L50 25 L80 65 L50 55 Z" fill="#FFCC00" />
        <text x="50" y="80" textAnchor="middle" fontSize="19" fontWeight="900" fill="#FFFFFF" fontFamily="sans-serif">UBES</text>
      </svg>
    </div>
  );
}

// ANPG Logo (SVG representation)
export function ANPGLogo({ className = "w-6 h-6" }) {
  return (
    <div className={`rounded-full bg-[#1A1A1A] flex items-center justify-center p-0.5 text-white shadow-sm ring-1 ring-slate-800 ${className}`} title="ANPG - Associação Nacional dos Pós-Graduandos">
      <div className="flex items-center justify-center font-black text-[9px] tracking-tighter text-[#F9A825]">
        <span className="text-white">A</span>
        <span className="text-[#E53935]">★</span>
        <span className="text-yellow-400">PG</span>
      </div>
    </div>
  );
}

// UFPE Crest / Brasão
export function UFPECrest({ className = "w-10 h-10" }) {
  return (
    <img 
      src="/assets/brasao_ufpe.png" 
      alt="Brasão UFPE - Universidade Federal de Pernambuco" 
      className={`object-contain ${className}`}
    />
  );
}

// Apple Wallet Button Badge
export function AppleWalletBadge({ onClick }) {
  return (
    <button 
      onClick={onClick}
      type="button"
      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-black hover:bg-neutral-900 active:scale-95 transition-all text-white rounded-xl shadow-md border border-neutral-800 cursor-pointer"
    >
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="5" width="20" height="14" rx="3" fill="#1C1C1E" stroke="#3A3A3C" strokeWidth="1.2"/>
        <path d="M2 9H22" stroke="#48484A" strokeWidth="1.2"/>
        <rect x="5" y="12" width="6" height="4" rx="1.5" fill="#FF9F0A"/>
        <rect x="12" y="12" width="4" height="4" rx="1.5" fill="#30D158"/>
        <rect x="17" y="12" width="3" height="4" rx="1" fill="#0A84FF"/>
      </svg>
      <div className="flex flex-col text-left leading-none">
        <span className="text-[9px] text-neutral-400 uppercase tracking-wider font-medium">Adicionar à</span>
        <span className="text-[13px] font-semibold text-white tracking-tight">Carteira da Apple</span>
      </div>
    </button>
  );
}

// Google Wallet Button Badge
export function GoogleWalletBadge({ onClick }) {
  return (
    <button 
      onClick={onClick}
      type="button"
      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 active:scale-95 transition-all text-slate-800 rounded-xl shadow-md border border-slate-300 cursor-pointer"
    >
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
        <path d="M4 7C4 5.34315 5.34315 4 7 4H17C18.6569 4 20 5.34315 20 7V17C20 18.6569 18.6569 20 17 20H7C5.34315 20 4 18.6569 4 17V7Z" fill="#F8F9FA"/>
        <path d="M12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17C14.2091 17 16 15.2091 16 13" stroke="#4285F4" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="12" cy="13" r="2.5" fill="#34A853"/>
      </svg>
      <div className="flex flex-col text-left leading-none">
        <span className="text-[9px] text-slate-500 uppercase tracking-wider font-medium">Salvar no</span>
        <span className="text-[13px] font-semibold text-slate-800 tracking-tight">Google Wallet</span>
      </div>
    </button>
  );
}
