export const runtime = 'nodejs';

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Liqaa'i Rabbi",
  description: "Aplikasi Keuangan & Rekapitulasi Iuran",
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: "Liqaa'i Rabbi",
  },
};

export const viewport: Viewport = {
  themeColor: '#082f49',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1, // Prevents awkward zooming on elderly users' phones
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
