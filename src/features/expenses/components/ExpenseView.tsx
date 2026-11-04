'use client';

import React, { useState, useMemo } from 'react';
import { useExpenses } from '../hooks/useExpenses';
import { ExpenseStats } from './ExpenseStats';
import { EventExpenseBlock } from '@/libs/api';
import { Receipt, Loader2, PackageCheck, ShieldAlert, WalletCards, Filter, Calendar } from 'lucide-react';

export const ExpensesView: React.FC = () => {
  const { data, loading, error } = useExpenses();
  const [selectedEvent, setSelectedEvent] = useState<string>('ALL');

  // Hitung akumulasi global stats dari seluruh event block
  const globalStats = useMemo(() => {
    if (!data?.events || data.events.length === 0) {
      return { totalInventaris: 'Rp0', totalBiayaKematian: 'Rp0' };
    }

    let inventarisSum = 0;
    let kematianSum = 0;

    data.events.forEach((evt) => {
      const invNum = parseInt(evt.summary.inventaris.replace(/[^0-9]/g, ''), 10) || 0;
      const kemNum = parseInt(evt.summary.biayaKematian.replace(/[^0-9]/g, ''), 10) || 0;

      inventarisSum += invNum;
      kematianSum += kemNum;
    });

    return {
      totalInventaris: `Rp${inventarisSum.toLocaleString('id-ID')}`,
      totalBiayaKematian: `Rp${kematianSum.toLocaleString('id-ID')}`,
    };
  }, [data]);

  const getCategoryBadge = (category: string) => {
    switch (category.toLowerCase()) {
      case 'biaya kematian':
        return 'bg-sky-100 text-sky-800 border-sky-200';
      case 'inventaris':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default:
        return 'bg-amber-100 text-amber-800 border-amber-200';
    }
  };

  // Filter aman berbasis normalisasi string (lowercase & trim)
  const eventsToDisplay = useMemo(() => {
    const list = data?.events || [];
    if (selectedEvent === 'ALL') return list;
    return list.filter(
      (e) => e.eventName.trim().toLowerCase() === selectedEvent.trim().toLowerCase()
    );
  }, [data?.events, selectedEvent]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-32 text-emerald-700 gap-3">
        <Loader2 className="w-8 h-8 animate-spin" />
        <p className="text-sm font-medium">Memuat rincian pengeluaran per acara...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl my-6">
        <p className="font-semibold">Gagal memuat data:</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header & Event Selector Dropdown */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-emerald-950 flex items-center gap-2">
            <Receipt className="w-5 h-5 text-emerald-700" />
            Laporan Pengeluaran Kas per Acara
          </h2>
          <p className="text-slate-500 text-xs mt-0.5">
            Sheet: PENGELUARAN • Rincian biaya kematian dan inventaris terpisah setiap duka / acara
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 w-full md:w-auto">
          <Filter className="w-4 h-4 text-emerald-700 shrink-0" />
          <select
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="bg-transparent text-xs md:text-sm font-semibold text-slate-800 focus:outline-none cursor-pointer w-full"
          >
            <option value="ALL">Semua Acara / Duka ({data?.events?.length || 0} Acara)</option>
            {data?.events?.map((evt, idx) => (
              <option key={idx} value={evt.eventName}>
                {evt.eventName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Global Aggregate Stats */}
      <ExpenseStats
        overallGrandTotal={data?.overallGrandTotal}
        totalInventaris={globalStats.totalInventaris}
        totalBiayaKematian={globalStats.totalBiayaKematian}
      />

      {/* Render Event Blocks or Fallback Notice */}
      {eventsToDisplay.length > 0 ? (
        eventsToDisplay.map((eventBlock, index) => (
          <EventBlockCard
            key={index}
            eventBlock={eventBlock}
            getCategoryBadge={getCategoryBadge}
          />
        ))
      ) : (
        <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 text-slate-500 font-medium">
          {data?.events && data.events.length > 0 
            ? "Pilihan acara tidak ditemukan." 
            : "Data laporan pengeluaran belum tersedia atau gagal dimuat dari spreadsheet."}
        </div>
      )}
    </div>
  );
};

/**
 * Sub-component for rendering a single event section
 */
function EventBlockCard({
  eventBlock,
  getCategoryBadge,
}: {
  eventBlock: EventExpenseBlock;
  getCategoryBadge: (cat: string) => string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-4 md:p-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-emerald-700" />
          <h3 className="text-lg font-bold text-slate-900">{eventBlock.eventName}</h3>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
          {eventBlock.items.length} Item
        </span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-100">
        <table className="w-full text-left text-xs md:text-sm border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <th className="p-3 w-12 text-center">No</th>
              <th className="p-3">Nama Barang / Jasa</th>
              <th className="p-3">Jenis Pengeluaran</th>
              <th className="p-3 text-right">Harga Satuan</th>
              <th className="p-3 text-center">Jumlah</th>
              <th className="p-3 text-right">Total Harga</th>
              <th className="p-3">Keterangan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {eventBlock.items.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                <td className="p-3 text-center font-mono text-slate-500">{item.no}</td>
                <td className="p-3 font-medium text-slate-900">{item.barangJasa}</td>
                <td className="p-3">
                  <span className={`px-2.5 py-1 text-[11px] font-semibold rounded-full border ${getCategoryBadge(item.jenisPengeluaran)}`}>
                    {item.jenisPengeluaran}
                  </span>
                </td>
                <td className="p-3 text-right text-slate-600">{item.harga}</td>
                <td className="p-3 text-center text-slate-600">
                  {item.jumlahBarang} {item.unit}
                </td>
                <td className="p-3 text-right font-semibold text-slate-900">{item.totalHarga}</td>
                <td className="p-3 text-slate-500 text-xs italic">{item.keterangan || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
              Total Inventaris
            </span>
            <p className="text-base font-bold text-emerald-800 mt-0.5">
              {eventBlock.summary.inventaris}
            </p>
          </div>
          <PackageCheck className="w-5 h-5 text-emerald-600" />
        </div>

        <div className="bg-sky-50/60 p-3.5 rounded-xl border border-sky-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold text-sky-700 uppercase tracking-wider">
              Total Biaya Kematian
            </span>
            <p className="text-base font-bold text-sky-800 mt-0.5">
              {eventBlock.summary.biayaKematian}
            </p>
          </div>
          <ShieldAlert className="w-5 h-5 text-sky-600" />
        </div>

        <div className="bg-emerald-900 p-3.5 rounded-xl border border-emerald-800 text-white flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold text-emerald-300 uppercase tracking-wider">
              Total Acara Ini
            </span>
            <p className="text-lg font-bold text-emerald-300 mt-0.5">
              {eventBlock.summary.grandTotal}
            </p>
          </div>
          <WalletCards className="w-5 h-5 text-emerald-300" />
        </div>
      </div>
    </div>
  );
}