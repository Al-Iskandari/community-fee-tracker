'use client';

import React from 'react';
import { useAuthStore } from '@/stores/useAuthStore';
import { Users, Phone, CheckCircle2, LogOut } from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { member, logout } = useAuthStore();

  return (
    <div className="max-w-xl mx-auto space-y-6 pb-20">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold border-4 border-emerald-50 shadow-inner">
          {member?.kepalaKeluarga ? member.kepalaKeluarga.charAt(0).toUpperCase() : 'U'}
        </div>
        <h2 className="text-xl font-bold text-slate-900">{member?.kepalaKeluarga}</h2>
        <p className="text-xs text-emerald-700 font-medium mt-1">Kepala Keluarga • Kelompok Fardhu Kifayah</p>

        <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          Status Registrasi: {member?.status || 'Lunas'}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden">
        <div className="p-4 flex items-center justify-between text-sm">
          <div className="flex items-center gap-3 text-slate-600">
            <Users className="w-4 h-4 text-emerald-700" />
            <span>Jumlah Anggota Keluarga</span>
          </div>
          <span className="font-semibold text-slate-900">{member?.jumlahAnggotaKeluarga || 0} Orang</span>
        </div>

        <div className="p-4 flex items-center justify-between text-sm">
          <div className="flex items-center gap-3 text-slate-600">
            <Phone className="w-4 h-4 text-emerald-700" />
            <span>Nomor Kontak Terdaftar</span>
          </div>
          <span className="font-semibold text-slate-900 font-mono">{member?.nomorKontak || '-'}</span>
        </div>
      </div>

      <button
        onClick={logout}
        className="w-full py-3 bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold rounded-xl border border-rose-200 transition-all flex items-center justify-center gap-2 text-sm shadow-sm"
      >
        <LogOut className="w-4 h-4" />
        <span>Keluar Akun</span>
      </button>
    </div>
  );
};