'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { authService } from '../services/authService';
import { useAuthStore } from '@/stores/useAuthStore';
import { Building2, Lock, User, Phone, Loader2, AlertCircle } from 'lucide-react';

export const LoginView: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const login = useAuthStore((state) => state.login);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      setError('Mohon masukkan nama kepala keluarga dan 5 digit nomor kontak.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await authService.verifyLogin(name, phone);
      console.log('Login response:', res);
      if (res.success) {
        login(res.member);
      } else {
        setError(res.message || 'Verifikasi gagal. Periksa kembali data Anda.');
      }
    } catch (err: any) {
      setError('Terjadi kesalahan koneksi ke server: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-emerald-900/10">
        <div className="bg-emerald-950 p-6 text-white text-center">
          <div className="w-14 h-14 rounded-full mx-auto overflow-hidden bg-white flex items-center justify-center border border-emerald-700 shadow-inner mb-3">
            <Image src="/logo.png" alt="Liqaa'i Rabbi Logo" width={60} height={60} className="object-cover w-full h-full" />
          </div>
          <h1 className="text-xl font-bold tracking-wide">Liqaa'i Rabbi</h1>
          <p className="text-xs text-emerald-300/80 mt-1">Portal Anggota Fardhu Kifayah</p>
        </div>

        <form onSubmit={handleLogin} className="p-6 sm:p-8 space-y-5">
          {error && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Nama Kepala Keluarga
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                required
                placeholder="cth: Budi Santoso"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-800"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              5 Digit Terakhir Nomor Kontak
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="password"
                maxLength={5}
                required
                placeholder="cth: 54321"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-slate-800 tracking-widest font-mono"
              />
            </div>
            <p className="text-[11px] text-slate-400">Masukkan 5 digit terakhir nomor HP yang terdaftar.</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Memverifikasi...</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4" />
                <span>Masuk ke Portal</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};