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
    <footer id="iletisim" className="border-t border-[#1B3A52] bg-[#050C14] text-[#A8B4C2] pt-16 pb-12 mt-20">
      <div className="site-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          {/* Sütun 1: Takım ve Kurum Bilgisi */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 rounded-xl overflow-hidden border border-[#1B3A52] bg-[#0B1826] shrink-0">
                <Image
                  src="/images/tulpar-logo.png"
                  alt={takim.ad}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-xl font-bold text-[#F2F6FA] tracking-tight">
                {takim.ad}
              </span>
            </div>
            <div className="text-sm text-[#A8B4C2] space-y-1">
              <p className="font-semibold text-[#F2F6FA]">{takim.okul}</p>
              <p>{takim.fakulte}</p>
              <p>{takim.bolum}</p>
            </div>
          </div>

          {/* Sütun 2: Navigasyon */}
          <div>
            <h3 className="text-lg font-bold text-[#F2F6FA] mb-4">Navigasyon</h3>
            <ul className="space-y-2.5 text-base">
              <li>
                <a href="/" className="hover:text-[#6CC4FF] transition-colors">
                  Giriş (Ana Sayfa)
                </a>
              </li>
              <li>
                <a href="/#projeler" className="hover:text-[#6CC4FF] transition-colors">
                  Yarışmalar & Projeler
                </a>
              </li>
              <li>
                <a href="/#paydaslar" className="hover:text-[#6CC4FF] transition-colors">
                  Paydaşlarımız
                </a>
              </li>
              <li>
                <a href="/#katil" className="hover:text-[#6CC4FF] transition-colors">
                  Aramıza Katılın
                </a>
              </li>
            </ul>
          </div>

          {/* Sütun 3: Doğrulanmış İletişim */}
          <div>
            <h3 className="text-lg font-bold text-[#F2F6FA] mb-4">İletişim & Sosyal Bağlantı</h3>
            <div className="space-y-4 text-base">
              {iletisim.linkedin ? (
                <div className="space-y-2">
                  <span className="text-xs text-[#A8B4C2] block uppercase tracking-wider font-semibold">
                    Resmi İletişim Kanalı
                  </span>
                  <a
                    href={iletisim.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#0B1826] border border-[#1B3A52] text-[#6CC4FF] hover:border-[#42A5F5] transition-colors text-sm font-semibold"
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
        <div className="mt-12 pt-8 border-t border-[#1B3A52]/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#A8B4C2]">
          <p>
            © {currentYear} {takim.ad} — {takim.okul} {takim.bolum}. Tüm hakları saklıdır.
          </p>
          <p className="text-[#A8B4C2]">
            TEKNOFEST {takim.sezon || ''}
          </p>
        </div>
      </div>
    </footer>
  );
}
