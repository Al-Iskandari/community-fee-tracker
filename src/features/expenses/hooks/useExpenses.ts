import { useState, useEffect } from 'react';
import { expensesService } from '../services/expensesService';
import { PengeluaranData } from '@/libs/api';

export function useExpenses() {
  const [data, setData] = useState<PengeluaranData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    expensesService
      .getPengeluaran()
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}