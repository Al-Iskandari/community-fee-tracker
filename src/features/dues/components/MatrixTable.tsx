'use client';

import React, { useState, useEffect } from 'react';
import { fetchFromAppsScript, MatrixData } from '@/libs/api';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { useAuthStore } from '@/stores/useAuthStore';
import { Search, Users, Calendar, Loader2, ShieldAlert } from 'lucide-react';

interface MatrixTableProps {
  isCurrentYearSheet?: boolean;
}

const MONTH_MAP: Record<string, number> = {
  januari: 1, februari: 2, maret: 3, april: 4, mei: 5, juni: 6,
  juli: 7, agustus: 8, september: 9, oktober: 10, november: 11, desember: 12
};

export const MatrixTable: React.FC<MatrixTableProps> = ({ isCurrentYearSheet = false }) => {
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from(
    { length: Math.max(currentYear - 2025, 1) },
    (_, index) => (2026 + index).toString()
  );

  const [selectedYear, setSelectedYear] = useState<string>(() => {
    const initialYear = currentYear >= 2026 ? currentYear.toString() : '2026';
    return initialYear;
  });
  const [data, setData] = useState<MatrixData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { member, isAdmin } = useAuthStore();
  const userIsAdmin = isAdmin();

  useEffect(() => {
    setLoading(true);
    const action = isCurrentYearSheet ? 'getIuranYear' : 'getIuran0102';
    const params = isCurrentYearSheet ? `&year=${selectedYear}` : '';

    fetchFromAppsScript(action, params)
      .then((res) => {
        if (!userIsAdmin && member) {
          const filteredRecords = res.records.filter(
            (rec: any) =>
              String(rec.no) === String(member.no) ||
              rec.kepalaKeluarga.toLowerCase() === member.kepalaKeluarga.toLowerCase()
          );
          setData({ ...res, records: filteredRecords });
        } else {
          setData(res);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [selectedYear, isCurrentYearSheet, userIsAdmin, member]);

  const filteredRecords = data?.records.filter((rec) =>
    rec.kepalaKeluarga.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Helper to determine if a column is a future month relative to current system date
  const checkIfFutureMonth = (colName: string) => {
    if (!isCurrentYearSheet) return false;
    const yearNum = parseInt(selectedYear, 10);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // 1-indexed current month

    if (yearNum > currentYear) return true;
    if (yearNum < currentYear) return false;

    const lowerCol = colName.toLowerCase();
    for (const [mName, mIdx] of Object.entries(MONTH_MAP)) {
      if (lowerCol.includes(mName)) {
        return mIdx > currentMonth;
      }
    }
    return false;
  };

  return (
    <div className="space-y-4">
      {!userIsAdmin && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Menampilkan data pribadi Anda sebagai anggota. Hubungi pengurus jika terdapat ketidaksesuaian.</span>
        </div>
      )}

      {/* Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h3 className="text-lg font-bold text-emerald-950">
            {isCurrentYearSheet ? `Rekapitulasi Iuran Tahun ${selectedYear}` : 'Iuran Khusus Periode 01-02'}
          </h3>
          <p className="text-slate-500 text-xs">
            {isCurrentYearSheet ? `Sheet: IURAN_${selectedYear}` : 'Sheet: IURAN_01_02'}
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {isCurrentYearSheet && (
            <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
              <Calendar className="w-4 h-4 text-emerald-700" />
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="bg-transparent text-sm font-semibold text-slate-700 focus:outline-none cursor-pointer"
              >
                {yearOptions.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          )}

          {userIsAdmin && (
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Cari Kepala Keluarga..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          )}
        </div>
      </div>

      {/* Table Content */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center py-24 text-emerald-700 gap-2">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span className="text-sm font-medium">Memuat data iuran...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs md:text-sm border-collapse">
              <thead>
                <tr className="bg-emerald-900 text-white font-semibold">
                  <th className={`p-3.5 w-12 text-center ${ userIsAdmin ? 'sticky left-0' : '' } bg-emerald-900 z-20 shadow-md`}>No</th>
                  <th className={`p-3.5 ${ userIsAdmin ? 'sticky left-12' : '' } bg-emerald-900 z-20 shadow-md min-w-[200px] flex items-center gap-2 border-l border-emerald-800`}>
                    <Users className="w-4 h-4 text-emerald-300" />
                    Kepala Keluarga
                  </th>
                  {data?.columns.map((col) => (
                    <th key={col} className="p-3.5 min-w-[110px] text-center border-l border-emerald-800">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRecords && filteredRecords.length > 0 ? (
                  filteredRecords.map((record, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                      <td className={`p-3.5 text-center font-mono text-slate-500 ${ userIsAdmin ? 'sticky left-0' : '' } bg-inherit shadow-sm`}>
                        {record.no}
                      </td>
                      <td className={`p-3.5 font-semibold text-slate-900 ${ userIsAdmin ? 'sticky left-12' : '' } bg-inherit shadow-sm border-r border-slate-100`}>
                        {record.kepalaKeluarga}
                      </td>
                      {data?.columns.map((col) => {
                        const val = record.tracking[col];
                        const isKeteranganCol = col.toLowerCase().includes('keterangan') || col.toLowerCase() === 'ket';
                        const isFuture = checkIfFutureMonth(col);
                        const isUnpaidOrEmpty = !val || val === '' || val === '0' || String(val).toLowerCase().includes('belum');

                        // If it's a future month and unpaid/empty, leave it empty or render a clean dash
                        if (isFuture && isUnpaidOrEmpty) {
                          return (
                            <td key={col} className="p-3 text-center border-l border-slate-100 text-slate-300">
                              -
                            </td>
                          );
                        }

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
                    <td colSpan={(data?.columns.length || 0) + 2} className="text-center p-12 text-slate-400">
                      Tidak ada data ditemukan.
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
};