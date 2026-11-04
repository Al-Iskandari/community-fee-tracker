import { fetchFromAppsScript } from '@/libs/api';

export const authService = {
  async verifyLogin(name: string, phoneSuffix: string) {
    const encodedName = encodeURIComponent(name);
    const encodedPhone = encodeURIComponent(phoneSuffix);
    return fetchFromAppsScript('verifyLogin', `&name=${encodedName}&phone=${encodedPhone}`);
  },
};