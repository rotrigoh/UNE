import React, { useState, useEffect } from 'react';
import { DNELogo, UNELogo, UBESLogo, ANPGLogo } from './Logos';
import { Wifi, WifiOff, Download, Sparkles } from 'lucide-react';

export default function Header({ onInstallClick, canInstall, isInstalled }) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, []);

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs transition-all">
      {/* Mobile top status bar simulation */}
      <div className="flex items-center justify-between px-5 pt-2 pb-1 text-[11px] font-semibold text-slate-500">
        <span>{currentTime || '9:30'}</span>
        <div className="flex items-center gap-2">
          {isOnline ? (
            <span className="flex items-center gap-1 text-emerald-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              Online
            </span>
          ) : (
            <span className="flex items-center gap-1 text-amber-600">
              <WifiOff className="w-3 h-3" />
              Offline
            </span>
          )}
          <span className="text-slate-400">5G</span>
          <div className="w-5 h-2.5 border border-slate-400 rounded-xs p-0.5 flex items-center">
            <div className="w-full h-full bg-slate-700 rounded-2xs"></div>
          </div>
        </div>
      </div>

      {/* Main App Navigation Bar */}
      <div className="max-w-md mx-auto px-4 py-2.5 flex items-center justify-between">
        {/* Left: DNE Logo */}
        <div className="flex items-center gap-2">
          <DNELogo className="h-7" />
        </div>

        {/* Right: Entity Logos (UNE, UBES, ANPG) & PWA Badge */}
        <div className="flex items-center gap-2.5">
          {canInstall && !isInstalled && (
            <button
              onClick={onInstallClick}
              className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 active:scale-95 rounded-full border border-sky-200 transition-all cursor-pointer shadow-2xs"
            >
              <Download className="w-3 h-3" />
              Instalar App
            </button>
          )}

          <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-full border border-slate-200/80 shadow-2xs">
            <UNELogo className="w-5 h-5" />
            <UBESLogo className="w-5 h-5" />
            <ANPGLogo className="w-5 h-5" />
          </div>
        </div>
      </div>
    </header>
  );
}
