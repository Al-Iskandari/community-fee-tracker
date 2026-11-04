'use client';

import React, { useEffect, useState } from 'react';
import { fetchFromAppsScript, IuranPokokItem } from '@/libs/api';
import { MatrixTable } from './MatrixTable';
import { useAppStore } from '@/stores/useAppStore';
import { useAuthStore } from '@/stores/useAuthStore';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Calendar, ShieldCheck, HeartHandshake, Layers, Loader2, Search, Users } from 'lucide-react';

export const DuesLayout: React.FC = () => {
  const { activeDuesSubTab, setActiveDuesSubTab } = useAppStore();
  const [loading, setLoading] = useState(true);

  const { member, isAdmin } = useAuthStore();
  const userIsAdmin = isAdmin();
  
  // State for IURAN_POKOK list view
  const [pokokData, setPokokData] = useState<IuranPokokItem[]>([]);
  const [searchPokok, setSearchPokok] = useState('');

  useEffect(() => {
    // Pre-fetch pokok data on mount
    fetchFromAppsScript('getIuranPokok')
      .then((res) => setPokokData(res || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

// For Pokok data:
const filteredPokok = userIsAdmin
  ? pokokData.filter((item) => item.kepalaKeluarga.toLowerCase().includes(searchPokok.toLowerCase()))
  : pokokData.filter((item) => String(item.no) === String(member?.no) || item.kepalaKeluarga.toLowerCase() === member?.kepalaKeluarga.toLowerCase());

  return (
    <div className="space-y-6">
      {/* Sub-tab Navigation */}
      <div className="flex bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm overflow-x-auto gap-1">
        <button
          onClick={() => setActiveDuesSubTab('current')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs md:text-sm font-medium whitespace-nowrap transition-all ${
            activeDuesSubTab === 'current'
              ? 'bg-emerald-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Iuran Tahun Berjalan</span>
        </button>

        <button
          onClick={() => setActiveDuesSubTab('01-02')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs md:text-sm font-medium whitespace-nowrap transition-all ${
            activeDuesSubTab === '01-02'
              ? 'bg-emerald-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Iuran Bulan 01-02 2026</span>
        </button>

        <button
          onClick={() => setActiveDuesSubTab('pokok')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs md:text-sm font-medium whitespace-nowrap transition-all ${
            activeDuesSubTab === 'pokok'
              ? 'bg-emerald-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Iuran Pokok</span>
        </button>

        <button
          onClick={() => setActiveDuesSubTab('sagu')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs md:text-sm font-medium whitespace-nowrap transition-all ${
            activeDuesSubTab === 'sagu'
              ? 'bg-emerald-900 text-white shadow-sm'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <HeartHandshake className="w-4 h-4" />
          <span>Sagu Hati</span>
        </button>
      </div>

      {/* Sub-tab Views */}
      {activeDuesSubTab === 'current' && (
        <MatrixTable isCurrentYearSheet={true} />
      )}

      {activeDuesSubTab === '01-02' && (
        <MatrixTable isCurrentYearSheet={false} />
      )}

      {activeDuesSubTab === 'sagu' && (
        <SaguHatiView />
      )}

      {activeDuesSubTab === 'pokok' && (
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div>
              <h3 className="text-lg font-bold text-emerald-950">Iuran Registrasi Pokok</h3>
              <p className="text-slate-500 text-xs">Sheet: IURAN_POKOK • Data pendaftaran awal anggota</p>
            </div>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Cari Kepala Keluarga..."
                value={searchPokok}
                onChange={(e) => setSearchPokok(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            {loading ? (
              <div className="flex justify-center items-center py-24 text-emerald-700 gap-2">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="text-sm font-medium">Memuat data iuran pokok...</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs md:text-sm border-collapse">
                  <thead>
                    <tr className="bg-emerald-900 text-white font-semibold">
                      <th className={`p-3.5 w-12 text-center ${userIsAdmin ? 'sticky left-0' : ''} bg-emerald-900 z-10 shadow-md`}>No</th>
                      <th className={`p-3.5 ${userIsAdmin ? 'sticky left-12' : ''} bg-emerald-900 z-10 shadow-md min-w-[200px] border-l border-emerald-800`}>
                        <Users className="inline w-4 h-4 mr-1 text-emerald-300" /> Kepala Keluarga
                      </th>
                      <th className="p-3.5 text-center">Jml Anggota</th>
                      <th className="p-3.5">Tanggal Bayar</th>
                      <th className="p-3.5 text-right">Pembayaran</th>
                      <th className="p-3.5 text-center">Status</th>
                      <th className="p-3.5">Kontak</th>
                      <th className="p-3.5">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredPokok.length > 0 ? (
                      filteredPokok.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className={`p-3.5 text-center font-mono text-slate-500 ${userIsAdmin ? 'sticky left-0' : ''} bg-inherit shadow-sm`}>
                            {item.no}
                          </td>
                          <td className={`p-3.5 font-semibold text-slate-900 ${userIsAdmin ? 'sticky left-12' : ''} bg-inherit shadow-sm border-r border-slate-100`}>
                            {item.kepalaKeluarga}
                          </td>
                          <td className="p-3.5 text-center text-slate-600">{item.jumlahAnggotaKeluarga} Orang</td>
                          <td className="p-3.5 text-slate-600">{item.tanggalPembayaran || '-'}</td>
                          <td className="p-3.5 text-right font-medium text-slate-900">{item.pembayaran}</td>
                          <td className="p-3.5 text-center">
                            <StatusBadge status={item.status} />
                          </td>
                          <td className="p-3.5 font-mono text-xs text-slate-600">{item.nomorKontak || '-'}</td>
                          <td className="p-3.5 text-slate-500 text-xs italic">{item.keterangan || '-'}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={8} className="text-center p-12 text-slate-400">Tidak ada data iuran pokok.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Dedicated sub-component for Sagu Hati matrix data sheet
 */
function SaguHatiView() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const { member, isAdmin } = useAuthStore();
  const userIsAdmin = isAdmin();

  useEffect(() => {
    fetchFromAppsScript('getIuranSaguHati')
      .then(setData)
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = userIsAdmin
    ? data?.records.filter((record: any) =>
        record.kepalaKeluarga.toLowerCase().includes(search.toLowerCase())
      )
    : data?.records.filter(
        (record: any) =>
          String(record.no) === String(member?.no) ||
          record.kepalaKeluarga.toLowerCase() === member?.kepalaKeluarga.toLowerCase()
      );
  

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h3 className="text-lg font-bold text-emerald-950">Rekapitulasi Dana Sagu Hati</h3>
          <p className="text-slate-500 text-xs">Sheet: IURAN_SAGU_HATI • Kontribusi sosial / insidental</p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Cari Kepala Keluarga..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center py-24 text-emerald-700 gap-2">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="text-sm font-medium">Memuat data sagu hati...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs md:text-sm border-collapse">
              <thead>
                <tr className="bg-emerald-900 text-white font-semibold">
                  <th className="p-3.5 w-12 text-center sticky left-0 bg-emerald-900 z-20 shadow-md">No</th>
                  <th className="p-3.5 sticky left-12 bg-emerald-900 z-20 shadow-md min-w-[200px] border-l border-emerald-800">
                    <Users className="inline w-4 h-4 mr-1 text-emerald-300" /> Kepala Keluarga
                  </th>
                  {data?.columns?.map((col: string) => (
                    <th key={col} className="p-3.5 min-w-[110px] text-center border-l border-emerald-800">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered && filtered.length > 0 ? (
                  filtered.map((record: any, idx: number) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className={`p-3.5 text-center font-mono text-slate-500 ${ userIsAdmin ? 'sticky left-0' : '' } bg-inherit shadow-sm`}>
                        {record.no}
                      </td>
                      <td className={`p-3.5 font-semibold text-slate-900 ${ userIsAdmin ? 'sticky left-12' : '' } bg-inherit shadow-sm border-r border-slate-100`}>
                        {record.kepalaKeluarga}
                      </td>
                      {data.columns.map((col: string) => {
                        const val = record.tracking[col];
                        const isKeteranganCol = col.toLowerCase().includes('keterangan') || col.toLowerCase() === 'ket';

                        return (
                          <td key={col} className="p-3 text-center border-l border-slate-100">
                            {isKeteranganCol ? (
                              <span className="text-xs text-slate-500 italic">
                                {val && val.trim() !== '' ? val : '-'}
                              </span>
                            ) : (
                              <StatusBadge status="" amount={val} />
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={(data?.columns?.length || 0) + 2} className="text-center p-12 text-slate-400">
                      Tidak ada data sagu hati.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}