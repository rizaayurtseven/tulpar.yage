'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, FileText } from 'lucide-react';
import { siteData } from '@/data/site';

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
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm'
          : 'bg-white/75 backdrop-blur-sm border-b border-slate-200/50'
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
            <div className="relative h-11 w-11 rounded-xl overflow-hidden border border-blue-200 shadow-xs group-hover:border-blue-500 group-hover:shadow-md transition-all shrink-0 bg-white">
              <Image
                src="/images/tulpar-logo.png"
                alt={siteData.takim.ad}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                {siteData.takim.ad}
              </span>
              <span className="text-xs text-slate-500">
                {siteData.takim.okul} • TEKNOFEST
              </span>
            </div>
          </Link>

          {/* Desktop Menü */}
          <nav className="hidden md:flex items-center gap-2" aria-label="Ana Navigasyon">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-2.5 rounded-lg text-base font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-100/80 transition-all duration-150"
              >
                <span>{item.baslik}</span>
              </a>
            ))}
          </nav>

          {/* Desktop Sağ Buton: Başvuru Yap */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#katil"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 hover:shadow-blue-500/35 hover:brightness-105 active:scale-[0.98] transition-all"
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              <span>Başvuru Yap</span>
            </a>
          </div>

          {/* Mobil Menü Butonu */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
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
        <div className="md:hidden border-b border-slate-200 bg-white/95 backdrop-blur-xl px-4 pt-3 pb-6 animate-in slide-in-from-top-2 duration-200 shadow-xl">
          <nav className="flex flex-col space-y-1.5">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-100 hover:text-blue-600 transition-colors"
              >
                <span>{item.baslik}</span>
              </a>
            ))}
          </nav>
          <div className="mt-4 pt-4 border-t border-slate-200">
            <a
              href="#katil"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-base font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25"
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
