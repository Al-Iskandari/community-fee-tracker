'use client';

import React from 'react';
import Image from 'next/image';
import { useAppStore } from '@/stores/useAppStore';
import { Wallet, Receipt, Building2 } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { activeTab, setActiveTab } = useAppStore();

  return (
    <header className="bg-emerald-950 text-white border-b border-emerald-900 sticky top-0 z-30 shadow-md">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-white flex items-center justify-center border border-emerald-700 shadow-inner">
                <Image src="/logo.png" alt="Liqaa'i Rabbi Logo" width={40} height={40} className="object-cover w-full h-full" />
            </div>
            <div>
                <h1 className="font-bold text-base md:text-lg tracking-wide">Liqaa'i Rabbi</h1>
                <p className="text-xs text-emerald-300/80">Kelompok Fardhu Kifayah</p>
            </div>
        </div>

        <nav className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('dues')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'dues'
                ? 'bg-emerald-800 text-white shadow-sm border border-emerald-700'
                : 'text-emerald-200 hover:bg-emerald-900/60'
            }`}
          >
            <Wallet className="w-4 h-4" />
            <span className="hidden sm:inline">Iuran Bulanan</span>
          </button>

          <button
            onClick={() => setActiveTab('expenses')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'expenses'
                ? 'bg-emerald-800 text-white shadow-sm border border-emerald-700'
                : 'text-emerald-200 hover:bg-emerald-900/60'
            }`}
          >
            <Receipt className="w-4 h-4" />
            <span className="hidden sm:inline">Pengeluaran Kas</span>
          </button>
        </nav>
      </div>
    </header>
  );
};