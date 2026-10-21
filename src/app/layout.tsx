import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { siteData } from '../data/site';

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
    themeColor: '#09090b',
    width: 'device-width',
    initialScale: 1,
};

export const metadata: Metadata = {
    title: `${siteData.takim.ad} | ${siteData.takim.okul}`,
    description: `${siteData.takim.okul} ${siteData.takim.fakulte} TEKNOFEST Takımı.`,
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
    return (
        <html lang="tr" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
        <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-primary/30 selection:text-primary-foreground">
        <div className="relative z-10 flex min-h-full flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
        </body>
        </html>
    );
}