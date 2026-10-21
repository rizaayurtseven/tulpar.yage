'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { siteData } from '../data/site';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
      <header
          className={`fixed top-0 z-50 w-full transition-all duration-300 ${
              isScrolled ? 'pt-2 sm:pt-4' : 'pt-4 sm:pt-6'
          }`}
      >
        <div className="site-container mx-auto px-4">
          <div
              className={`flex items-center justify-between px-6 sm:px-8 transition-all duration-500 rounded-lg ${
                  isScrolled
                      ? 'bg-black/90 backdrop-blur-xl border border-white/10 py-3 shadow-lg'
                      : 'bg-black/60 backdrop-blur-lg border border-white/5 py-4'
              }`}
          >
            {/* Logo */}
            <Link href="/" className="flex flex-col group">
              <span className="text-xl sm:text-2xl font-black tracking-tighter text-foreground uppercase leading-none group-hover:text-primary transition-colors">
                {siteData.takim.ad}
              </span>
              <span className="text-[8px] sm:text-[9px] text-muted-foreground tracking-[0.2em] uppercase mt-1">
                {siteData.takim.okul}
              </span>
            </Link>

            {/* Masaüstü Menü */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-muted-foreground tracking-wide uppercase">
              <div className="relative group py-2">
                <Link href="/#projeler" className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                  Projeler
                  <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>

                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-black/95 backdrop-blur-xl border border-white/10 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col shadow-2xl overflow-hidden">
                  {siteData.yarismalar.map((proje) => (
                      <Link
                          key={proje.id}
                          href={`/projeler/${proje.slug}`}
                          className="px-5 py-4 hover:bg-white/10 text-xs text-white/70 hover:text-white uppercase tracking-widest transition-colors border-b border-white/5 last:border-0"
                      >
                        {proje.ad}
                      </Link>
                  ))}
                </div>
              </div>
              <Link href="/#ekipler" className="hover:text-foreground transition-colors py-2">Ekip</Link>
              <Link href="/duyurular" className="hover:text-foreground transition-colors py-2">Duyurular</Link>
              <Link href="/#paydaslar" className="hover:text-foreground transition-colors py-2">Paydaşlar</Link>
            </nav>

            {/* Aksiyon */}
            <div className="flex items-center">
              <Link
                  href="/basvuru"
                  className="px-5 py-2 border border-white/20 text-white text-xs tracking-widest font-bold uppercase hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 rounded-md"
              >
                Başvuru Yap
              </Link>
            </div>
          </div>
        </div>
      </header>
  );
}