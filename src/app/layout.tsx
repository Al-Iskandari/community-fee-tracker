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
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://liqaai-rabbi.jhoniimx.workers.dev/'),
  title: {
    default: "Liqaa'i Rabbi",
    template: "%s | Liqaa'i Rabbi",
  },
  description: "Aplikasi Keuangan & Rekapitulasi Iuran",
  openGraph: {
    title: "Liqaa'i Rabbi",
    description: "Aplikasi Keuangan & Rekapitulasi Iuran",
    url: 'https://liqaai-rabbi.jhoniimx.workers.dev/',
    siteName: "Liqaa'i Rabbi",
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: 'https://liqaai-rabbi.jhoniimx.workers.dev/opengraph-image.png', // Automatically matches your static preview image in src/app or public/
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: "Liqaa'i Rabbi Preview",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Liqaa'i Rabbi",
    description: "Aplikasi Keuangan & Rekapitulasi Iuran",
    images: ['/opengraph-image.png'],
  },
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
