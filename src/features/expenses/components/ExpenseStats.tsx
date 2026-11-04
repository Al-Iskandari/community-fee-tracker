import React from 'react';
import { PackageCheck, ShieldAlert, WalletCards } from 'lucide-react';

interface ExpenseStatsProps {
  overallGrandTotal?: string;
  totalInventaris?: string;
  totalBiayaKematian?: string;
}

export const ExpenseStats: React.FC<ExpenseStatsProps> = ({
  overallGrandTotal = 'Rp0',
  totalInventaris = 'Rp0',
  totalBiayaKematian = 'Rp0',
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {/* Total Inventaris Card */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Akumulasi Inventaris
          </span>
          <p className="text-xl md:text-2xl font-bold text-emerald-700 mt-1">
            {totalInventaris}
          </p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100">
          <PackageCheck className="w-6 h-6" />
        </div>
      </div>

      {/* Total Biaya Kematian Card */}
      <div className="bg-white p-5 rounded-2xl border border-sky-100 shadow-sm flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold text-sky-600 uppercase tracking-wider">
            Akumulasi Biaya Kematian
          </span>
          <p className="text-xl md:text-2xl font-bold text-sky-700 mt-1">
            {totalBiayaKematian}
          </p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center text-sky-600 border border-sky-100">
          <ShieldAlert className="w-6 h-6" />
        </div>
      </div>

      {/* Grand Total Card */}
      <div className="bg-emerald-950 p-5 rounded-2xl shadow-md text-white flex items-center justify-between border border-emerald-900">
        <div>
          <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider">
            Global Grand Total
          </span>
          <p className="text-2xl md:text-3xl font-extrabold text-emerald-400 mt-1">
            {overallGrandTotal}
          </p>
        </div>
        <div className="w-12 h-12 rounded-xl bg-emerald-900 flex items-center justify-center text-emerald-300 border border-emerald-800">
          <WalletCards className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};