import React from 'react';
import { Download, X, Smartphone } from 'lucide-react';
import { UNELogo } from './Logos';

export default function PWAInstallPrompt({ installPrompt, onInstall, onDismiss }) {
  if (!installPrompt) return null;

  return (
    <div className="fixed bottom-16 left-4 right-4 z-50 max-w-md mx-auto no-print animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-slate-900 text-white rounded-2xl p-3.5 shadow-2xl border border-slate-700 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <UNELogo className="w-10 h-10 shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-white">Instalar App Oficial UNE</h4>
            <p className="text-[10px] text-slate-300 leading-tight mt-0.5">
              Tenha a carteira digital na tela de início com acesso 100% offline.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={onInstall}
            className="px-3 py-1.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs rounded-xl shadow-xs cursor-pointer active:scale-95 transition-all"
          >
            Instalar
          </button>
          <button
            onClick={onDismiss}
            className="text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
