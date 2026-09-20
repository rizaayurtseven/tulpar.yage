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
          ? 'bg-[#07111C]/95 backdrop-blur-md border-b border-[#1B3A52] shadow-sm'
          : 'bg-[#07111C]/80 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="site-container">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 sm:gap-3.5 group focus:outline-none min-w-0"
            aria-label="Tulpar Ülgen Ana Sayfa"
          >
            <div className="relative h-10 w-10 sm:h-11 sm:w-11 rounded-xl overflow-hidden border border-[#1B3A52] shrink-0 bg-[#0B1826]">
              <Image
                src="/images/tulpar-logo.png"
                alt={siteData.takim.ad}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-[#F2F6FA] group-hover:text-[#6CC4FF] transition-colors truncate">
                {siteData.takim.ad}
              </span>
              <span className="text-[11px] sm:text-xs text-[#A8B4C2] truncate max-w-[160px] sm:max-w-none">
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
                className="px-4 py-2 rounded-lg text-base font-medium text-[#A8B4C2] hover:text-[#6CC4FF] hover:bg-[#0B1826] transition-colors"
              >
                <span>{item.baslik}</span>
              </a>
            ))}
          </nav>

          {/* Desktop Sağ Buton: Başvuru Yap */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="/#katil"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-[#42A5F5] hover:bg-[#6CC4FF] text-[#07111C] transition-colors"
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              <span>Başvuru Yap</span>
            </a>
          </div>

          {/* Mobil Menü Butonu */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl text-[#A8B4C2] hover:text-[#F2F6FA] hover:bg-[#0B1826] border border-transparent hover:border-[#1B3A52] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
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
        <div className="md:hidden border-b border-[#1B3A52] bg-[#0B1826]/98 backdrop-blur-xl px-4 pt-3 pb-6 animate-in slide-in-from-top-2 duration-200 shadow-xl">
          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="px-4 py-3.5 rounded-xl text-base font-medium text-[#A8B4C2] hover:bg-[#102235] hover:text-[#6CC4FF] active:bg-[#102235] transition-colors flex items-center min-h-[48px]"
              >
                <span>{item.baslik}</span>
              </a>
            ))}
          </nav>
          <div className="mt-4 pt-4 border-t border-[#1B3A52]">
            <a
              href="/#katil"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-base font-bold bg-[#42A5F5] text-[#07111C] shadow-lg shadow-[#42A5F5]/20 min-h-[48px]"
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
