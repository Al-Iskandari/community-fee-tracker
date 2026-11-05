'use client';

import React from 'react';
import { useAppStore } from '@/stores/useAppStore';
import { Wallet, Receipt, UserCircle } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab } = useAppStore();

  const navItems = [
    { id: 'dues', label: 'Iuran', icon: Wallet },
    { id: 'expenses', label: 'Pengeluaran', icon: Receipt },
    { id: 'profile', label: 'Profil Saya', icon: UserCircle },
  ];

  return (
    <nav className="fixed bottom-3 left-4 right-4 z-40 md:hidden">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/80 px-3 py-2 flex justify-around items-center relative">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as 'dues' | 'expenses' | 'profile')}
              className="relative flex flex-col items-center justify-center flex-1 min-h-[56px] transition-all duration-300 focus:outline-none"
            >
              {isActive ? (
                /* Interactive Floating Active Indicator */
                <div className="flex flex-col items-center -mt-7">
                  <div className="w-14 h-14 bg-emerald-800 rounded-full flex items-center justify-center shadow-lg shadow-emerald-600/40 border-3 border-slate-50 transition-transform duration-300 scale-110">
                    <Icon className="w-7 h-7 text-emerald-300 stroke-[1]" />
                  </div>
                  <span className="text-sm font-bold text-emerald-800 mt-1 tracking-wide">
                    {item.label}
                  </span>
                </div>
              ) : (
                /* Inactive Menu Item */
                <div className="flex flex-col items-center gap-1 opacity-70 hover:opacity-100 transition-opacity">
                  <Icon className="w-6 h-6 text-slate-500 stroke-[1]" />
                  <span className="text-xs font-semibold text-slate-600">
                    {item.label}
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};