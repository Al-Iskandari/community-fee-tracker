export const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL || 'YOUR_DEPLOYED_WEB_APP_URL';

/**
 * Required Interface for Monthly Matrix Records (Used by IURAN_{YEAR}, IURAN_01_02, IURAN_SAGU_HATI)
 */
export interface MonthlyRecord {
  no: number | string;
  kepalaKeluarga: string;
  payments: Record<string, string>; // Maps month/column headers to payment value (e.g. { "Januari": "Rp10.000" })
}

/**
 * Required Interface for Matrix API Responses
 */
export interface IuranMonthlyResponse {
  columns: string[]; // Replaces old 'months' array to support general column matrices like Sagu Hati & Yearly dues
  months?: string[]; // Backwards compatibility alias
  records: MonthlyRecord[];
}

/**
 * Required Interface for IURAN_POKOK (Initial Registration)
 */
export interface IuranPokokItem {
  no: number | string;
  kepalaKeluarga: string;
  jumlahAnggotaKeluarga: number;
  tanggalPembayaran: string;
  pembayaran: string;
  status: string;
  nomorKontak: string;
  keterangan: string;
}

/**
 * Required Interface for Individual Expense Items
 */
export interface PengeluaranItem {
  no: number | string;
  barangJasa: string;
  jenisPengeluaran: 'Inventaris' | 'Biaya Kematian' | 'Lain-Lain' | string;
  harga: string;
  jumlahBarang: number;
  unit: string;
  totalHarga: string;
  keterangan: string;
}

export interface EventExpenseSummary {
  inventaris: string;
  biayaKematian: string;
  grandTotal: string;
}

export interface EventExpenseBlock {
  eventName: string;
  items: PengeluaranItem[];
  summary: EventExpenseSummary;
}

export interface PengeluaranData {
  events: EventExpenseBlock[];
  overallGrandTotal: string;
}

export interface MatrixData {
  columns: string[];
  records: {
    no: number | string;
    kepalaKeluarga: string;
    tracking: Record<string, string>;
  }[];
}

/**
 * Generic API Fetcher for Google Apps Script backend supporting actions & year partitions
 */
export async function fetchFromAppsScript(action: string, extraParams = '') {
  const response = await fetch(`${APPS_SCRIPT_URL}?action=${action}${extraParams}`);
  const json = await response.json();
  if (json.status !== 'success') {
    throw new Error(json.message || 'Gagal mengambil data dari Google Apps Script');
  }
  return json.data;
}
