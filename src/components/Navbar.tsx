'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ExternalLink, FileText } from 'lucide-react';
import { siteData } from '@/data/site';
import { LinkedinIcon } from '@/components/Icons';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navItems = siteData.iletisim.navigasyon;

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled
          ? 'bg-[#070B14]/95 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/30'
          : 'bg-[#070B14]/80 backdrop-blur-sm border-b border-white/5'
      }`}
    >
      <div className="site-container">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3.5 group focus:outline-none"
            aria-label="Tulpar Ülgen Ana Sayfa"
          >
            <div className="relative h-11 w-11 rounded-xl overflow-hidden border border-cyan-500/40 group-hover:border-cyan-300 group-hover:shadow-[0_0_16px_rgba(34,211,238,0.35)] transition-all shrink-0 bg-[#1c283e]">
              <Image
                src="/images/tulpar-logo.png"
                alt={siteData.takim.ad}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                {siteData.takim.ad}
              </span>
              <span className="text-xs text-slate-300">
                {siteData.takim.okul} • TEKNOFEST
              </span>
            </div>
          </Link>

          {/* Desktop Menü: Giriş, Ekibimiz, Paydaşlarımız */}
          <nav className="hidden md:flex items-center gap-2" aria-label="Ana Navigasyon">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-2.5 rounded-lg text-base font-medium text-slate-300 hover:text-white hover:bg-white/[0.04] transition-all duration-150"
              >
                <span>{item.baslik}</span>
              </a>
            ))}
          </nav>

          {/* Desktop Sağ Buton: Başvuru Yap */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#katil"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:brightness-110 active:scale-[0.98] transition-all"
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              <span>Başvuru Yap</span>
            </a>
          </div>

          {/* Mobil Menü Butonu */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label={isOpen ? 'Menüyü kapat' : 'Menüyü aç'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobil Drawer */}
      {isOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#090E1A]/95 backdrop-blur-xl px-4 pt-3 pb-6 animate-in slide-in-from-top-2 duration-200 shadow-2xl">
          <nav className="flex flex-col space-y-1.5">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 rounded-lg text-base font-medium text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
              >
                <span>{item.baslik}</span>
              </a>
            ))}
          </nav>
          <div className="mt-4 pt-4 border-t border-white/10">
            <a
              href="#katil"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-base font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30"
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              <span>Başvuru Yap</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
