import { useState, useEffect } from 'react';
import { duesService } from '../services/duesService';
import { IuranMonthlyResponse } from '@/libs/api';

export function useDues(tabName = 'IURAN_03_12') {
  const [data, setData] = useState<IuranMonthlyResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    duesService
      .getMonthlyDues(tabName)
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [tabName]);

  return { data, loading, error };
}