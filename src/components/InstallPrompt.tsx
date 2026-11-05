'use client';

import React, { useState, useEffect } from 'react';
import { Download, Smartphone } from 'lucide-react';

export const InstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsVisible(false);
    }
    setDeferredPrompt(null);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:w-96 bg-emerald-900 text-white p-5 rounded-2xl shadow-2xl border-2 border-emerald-400 z-50 flex items-center gap-4 animate-bounce-subtle">
      <div className="p-3 bg-emerald-800 rounded-xl text-emerald-200">
        <Smartphone className="w-8 h-8" />
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-base md:text-lg">Pasang Aplikasi</h4>
        <p className="text-xs md:text-sm text-emerald-200">
          Pasang aplikasi ini di HP Anda agar mudah dibuka tanpa lewat browser.
        </p>
      </div>
      <button
        onClick={handleInstallClick}
        className="bg-white text-emerald-950 font-bold px-4 py-3 rounded-xl text-sm md:text-base shadow-md hover:bg-emerald-50 transition flex items-center gap-2 shrink-0"
      >
        <Download className="w-5 h-5 text-emerald-700" />
        Pasang
      </button>
    </div>
  );
};