import { fetchFromAppsScript, IuranMonthlyResponse } from '@/libs/api';

export const duesService = {
  async getMonthlyDues(tabName = 'IURAN_03_12'): Promise<IuranMonthlyResponse> {
    return fetchFromAppsScript('getIuranMonthly', `&tab=${tabName}`);
  },
};