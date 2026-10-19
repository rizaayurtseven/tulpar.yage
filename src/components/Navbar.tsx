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
          className={`fixed top-0 z-50 w-full transition-all duration-300 border-b ${
              isScrolled
                  ? 'bg-background/95 backdrop-blur-md border-border py-3'
                  : 'bg-transparent border-transparent py-5'
          }`}
      >
        <div className="site-container flex items-center justify-between">

          <Link href="/" className="flex flex-col group">
            <span className="text-2xl sm:text-3xl font-black tracking-tighter text-foreground uppercase leading-none group-hover:text-white/80 transition-colors">
              {siteData.takim.ad}
            </span>
            <span className="text-[9px] sm:text-[10px] text-muted-foreground tracking-widest uppercase mt-1">
              {siteData.takim.okul}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-muted-foreground tracking-wide uppercase">

            {/* Projeler - Açılır Menü (Dropdown) */}
            <div className="relative group py-2">
              <Link href="/#projeler" className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                Projeler
                <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>

              {/* Açılır Kutu */}
              <div className="absolute top-full left-0 mt-0 w-56 bg-black/95 backdrop-blur-xl border border-white/10 rounded-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col shadow-2xl">
                {siteData.yarismalar.map((proje) => (
                    <Link
                        key={proje.id}
                        href={`/projeler/${proje.slug}`}
                        className="px-4 py-3.5 hover:bg-white/10 text-xs text-white/70 hover:text-white uppercase tracking-widest transition-colors border-b border-white/5 last:border-0"
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

          <div className="flex items-center">
            <Link
                href="/basvuru"
                className="px-6 py-2.5 bg-primary text-primary-foreground text-xs tracking-widest font-bold uppercase hover:bg-white/80 transition-colors rounded-sm"
            >
              Başvuru Yap
            </Link>
          </div>

        </div>
      </header>
  );
}