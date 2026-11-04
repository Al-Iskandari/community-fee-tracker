import { fetchFromAppsScript, PengeluaranData } from '@/libs/api';

export const expensesService = {
  async getPengeluaran(): Promise<PengeluaranData> {
    return fetchFromAppsScript('getPengeluaran');
  },
};