import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface MemberSession {
  no: number | string; // Row number from spreadsheet
  kepalaKeluarga: string;
  jumlahAnggotaKeluarga: number;
  nomorKontak: string;
  status: string;
}

interface AuthState {
  isAuthenticated: boolean;
  member: MemberSession | null;
  login: (member: MemberSession) => void;
  logout: () => void;
  isAdmin: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      member: null,
      login: (member) => set({ isAuthenticated: true, member }),
      logout: () => set({ isAuthenticated: false, member: null }),
      isAdmin: () => {
        const member = get().member;
        if (!member || !member.no) return false;
        // Admins are row numbers 8, 9, and 10
        const adminNumbers = [8, 9, 10, '8', '9', '10'];
        return adminNumbers.includes(member.no);
      },
    }),
    { name: 'liqaa-auth-storage' }
  )
);