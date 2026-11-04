'use client';

import React from 'react';
import { useAuthStore } from '@/stores/useAuthStore';
import { useAppStore } from '@/stores/useAppStore';
import { Navbar } from '@/components/layout/Navbar';
import { BottomNav } from '@/components/layout/BottomNav';
import { LoginView } from '@/features/auth/components/LoginView';
import { ProfileView } from '@/features/auth/components/ProfileView';
import { DuesLayout } from '@/features/dues/components/DuesLayout';
import { ExpensesView } from '@/features/expenses/components/ExpenseView';

export default function DashboardPage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { activeTab } = useAppStore();

  if (!isAuthenticated) {
    return <LoginView />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans pb-24 md:pb-6">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8">
        {activeTab === 'dues' && <DuesLayout />}
        {activeTab === 'expenses' && <ExpensesView />}
        {activeTab === 'profile' && <ProfileView />}
      </main>
      <BottomNav />
    </div>
  );
}