'use client';

import React from 'react';
import { useAppStore } from '@/stores/useAppStore';
import { Wallet, Receipt, UserCircle } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab } = useAppStore();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-lg md:hidden">
      <div className="grid grid-cols-3 h-16">
        <button
          onClick={() => setActiveTab('dues')}
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${
            activeTab === 'dues' ? 'text-emerald-700 font-bold' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Wallet className="w-5 h-5" />
          <span className="text-[10px]">Iuran Bulanan</span>
        </button>

        <button
          onClick={() => setActiveTab('expenses')}
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${
            activeTab === 'expenses' ? 'text-emerald-700 font-bold' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Receipt className="w-5 h-5" />
          <span className="text-[10px]">Pengeluaran</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center justify-center gap-1 transition-colors ${
            activeTab === 'profile' ? 'text-emerald-700 font-bold' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <UserCircle className="w-5 h-5" />
          <span className="text-[10px]">Profil Saya</span>
        </button>
      </div>
    </div>
  );
};