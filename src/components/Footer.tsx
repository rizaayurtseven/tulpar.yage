import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { siteData } from '@/data/site';
import { LinkedinIcon } from '@/components/Icons';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { takim, iletisim } = siteData;

  return (
    <footer id="iletisim" className="border-t border-white/10 bg-[#05080f]/85 backdrop-blur-md text-slate-300 pt-16 pb-12 mt-20">
      <div className="site-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          {/* Sütun 1: Takım ve Kurum Bilgisi */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 rounded-xl overflow-hidden border border-cyan-500/40 bg-[#1c283e] shrink-0">
                <Image
                  src="/images/tulpar-logo.png"
                  alt={takim.ad}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                {takim.ad}
              </span>
            </div>
            <div className="text-sm text-slate-300 space-y-1">
              <p className="font-semibold text-white">{takim.okul}</p>
              <p>{takim.fakulte}</p>
              <p>{takim.bolum}</p>
            </div>
          </div>

          {/* Sütun 2: Navigasyon */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Navigasyon</h3>
            <ul className="space-y-2.5 text-base">
              <li>
                <a href="/" className="hover:text-cyan-300 transition-colors">
                  Giriş (Ana Sayfa)
                </a>
              </li>
              <li>
                <a href="/#projeler" className="hover:text-cyan-300 transition-colors">
                  Yarışmalar & Projeler
                </a>
              </li>
              <li>
                <a href="/#paydaslar" className="hover:text-cyan-300 transition-colors">
                  Paydaşlarımız
                </a>
              </li>
              <li>
                <a href="/#katil" className="hover:text-cyan-300 transition-colors">
                  Aramıza Katılın
                </a>
              </li>
            </ul>
          </div>

          {/* Sütun 3: Doğrulanmış İletişim */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">İletişim & Sosyal Bağlantı</h3>
            <div className="space-y-4 text-base">
              {iletisim.linkedin ? (
                <div className="space-y-2">
                  <span className="text-xs text-slate-400 block uppercase tracking-wider font-semibold">
                    Resmi İletişim Kanalı
                  </span>
                  <a
                    href={iletisim.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10 transition-colors text-sm font-semibold"
                  >
                    <LinkedinIcon className="h-4 w-4" />
                    <span>LinkedIn Şirket Sayfamız</span>
                    <ExternalLink className="h-3.5 w-3.5 opacity-70" />
                  </a>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* Alt Telif Çizgisi */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <p>
            © {currentYear} {takim.ad} — {takim.okul} {takim.bolum}. Tüm hakları saklıdır.
          </p>
          <p className="text-slate-400">
            TEKNOFEST {takim.sezon || ''}
          </p>
        </div>
      </div>
    </footer>
  );
}
