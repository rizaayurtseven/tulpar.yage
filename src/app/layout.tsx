import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SkyBackground from '@/components/SkyBackground';
import { siteData } from '@/data/site';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#07111C',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: `${siteData.takim.ad} | ${siteData.takim.okul} TEKNOFEST ${siteData.takim.sezon || ''}`.trim(),
    template: `%s | ${siteData.takim.ad}`,
  },
  description: `${siteData.takim.ad} - ${siteData.takim.okul} ${siteData.takim.fakulte} ${siteData.takim.bolum} TEKNOFEST Takımı.`,
  keywords: [
    'Teknofest',
    'Teknofest 2026',
    'Tulpar Ülgen',
    'Gazi Üniversitesi',
    'Bilgisayar Mühendisliği',
  ],
  authors: [{ name: siteData.takim.ad, url: 'https://gazi.edu.tr' }],
  metadataBase: new URL('https://tulparulgen.gazi.edu.tr'),
  openGraph: {
    title: `${siteData.takim.ad} | ${siteData.takim.okul}`,
    description: `${siteData.takim.ad} - ${siteData.takim.okul} ${siteData.takim.fakulte} ${siteData.takim.bolum} TEKNOFEST Takımı.`,
    url: 'https://tulparulgen.gazi.edu.tr',
    siteName: siteData.takim.ad,
    locale: 'tr_TR',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#07111C] text-[#F2F6FA] relative selection:bg-[#42A5F5]/30 selection:text-[#6CC4FF]">
        <SkyBackground />
        <div className="relative z-10 flex min-h-full flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
