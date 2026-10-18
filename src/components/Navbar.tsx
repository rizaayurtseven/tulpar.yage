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
            <Link href="/#projeler" className="hover:text-foreground transition-colors">Projeler</Link>
            <Link href="/#ekipler" className="hover:text-foreground transition-colors">Ekip</Link>
            <Link href="/duyurular" className="hover:text-foreground transition-colors">Duyurular</Link>
            <Link href="/#paydaslar" className="hover:text-foreground transition-colors">Paydaşlar</Link>
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