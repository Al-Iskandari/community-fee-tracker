import { create } from 'zustand';

export type MainTabType = 'dues' | 'expenses' | 'profile';
export type DuesSubTabType = 'pokok' | '01-02' | 'current' | 'sagu';

interface AppState {
  activeTab: MainTabType;
  activeDuesSubTab: DuesSubTabType;
  setActiveTab: (tab: MainTabType) => void;
  setActiveDuesSubTab: (subTab: DuesSubTabType) => void;
}

export const useAppStore = create<AppState>((set) => ({
  activeTab: 'dues',
  activeDuesSubTab: 'current',
  setActiveTab: (activeTab) => set({ activeTab }),
  setActiveDuesSubTab: (activeDuesSubTab) => set({ activeDuesSubTab }),
}));