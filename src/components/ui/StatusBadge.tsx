import React from 'react';
import { CheckCircle2, Clock } from 'lucide-react';

interface StatusBadgeProps {
  status: string;
  amount?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, amount }) => {
  const isPaid = (status && status.trim() !== '') || (amount && amount !== 'Rp0');

  if (isPaid) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
        {amount || status || 'Lunas'}
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-50 text-rose-600">
      <Clock className="w-3.5 h-3.5 text-rose-500" />
      Belum Bayar
    </span>
  );
};