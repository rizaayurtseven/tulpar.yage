'use client';

import React from 'react';
import Image from 'next/image';
import { 
  ArrowRight, 
  Shield, 
  Coins, 
  FileText, 
  ExternalLink,
  CheckCircle2,
  Globe
} from 'lucide-react';
import { siteData } from '@/data/site';
import { LinkedinIcon, InstagramIcon, LinktreeIcon } from '@/components/Icons';
import ApplicationForm from '@/components/ApplicationForm';

export default function HomePage() {
  const { takim, yarismalar, paydaslar, katilim, iletisim } = siteData;

  const heroSubtitle = `${takim.okul} ${takim.fakulte} ${takim.bolum}`;

  return (
    <div className="flex flex-col gap-24 sm:gap-32 pb-20">
      {/* 1. HERO BÖLÜMÜ */}
      <section className="relative w-full overflow-hidden">
        <div className="relative z-10 site-container pt-12 pb-16 sm:pt-24 sm:pb-28">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center space-y-6 sm:space-y-8">
            {/* Rozet */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B1826] border border-[#1B3A52] text-[#6CC4FF] text-xs sm:text-sm font-medium max-w-full flex-wrap justify-center text-center">
              <span className="h-2 w-2 rounded-full bg-[#42A5F5] shrink-0" />
              <span>{takim.okul}</span>
              <span className="text-[#1B3A52] hidden sm:inline">•</span>
              <span>TEKNOFEST {takim.sezon || ''}</span>
            </div>

            {/* Başlık ve Logo */}
            <div className="space-y-3 sm:space-y-4 flex flex-col items-center">
              <div className="flex items-center justify-center gap-3 sm:gap-5">
                <div className="relative h-14 w-14 sm:h-20 sm:w-20 rounded-2xl overflow-hidden border border-[#1B3A52] shrink-0 bg-[#0B1826]">
                  <Image
                    src={takim.logoPath || '/images/tulpar-logo.png'}
                    alt={takim.ad}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#F2F6FA] leading-none">
                  {takim.ad}
                </h1>
              </div>
              <p className="text-base sm:text-xl md:text-2xl text-[#42A5F5] font-bold tracking-tight text-center px-2">
                {heroSubtitle}
              </p>
            </div>

            <p className="max-w-2xl text-sm sm:text-base md:text-lg text-[#A8B4C2] leading-relaxed font-normal">
              Hava Savunma Sistemleri ve Finansal Teknolojiler alanında milli teknoloji hamlesine güç katan TEKNOFEST takımı.
            </p>

            {/* Aksiyon Butonları */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
              <a
                href="#projeler"
                className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-xl text-base font-bold bg-[#42A5F5] hover:bg-[#6CC4FF] text-[#07111C] transition-colors min-h-[48px]"
              >
                <span>Yarışmalarımız & Projeler</span>
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="#katil"
                className="inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-xl text-base font-semibold bg-[#0B1826] hover:bg-[#102235] text-[#F2F6FA] border border-[#1B3A52] transition-colors min-h-[48px]"
              >
                <FileText className="h-5 w-5 text-[#A8B4C2]" />
                <span>Aramıza Katılın</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. YARIŞMALARIMIZ & PROJELERİMİZ BÖLÜMÜ */}
      <section id="projeler" className="site-container scroll-mt-24 space-y-8 sm:space-y-10">
        <div className="max-w-3xl mx-auto text-center space-y-2.5 sm:space-y-3">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#F2F6FA] tracking-tight">
            Katıldığımız Yarışmalar & Projeler
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#A8B4C2] leading-relaxed">
            Tulpar Takımı bünyesinde TEKNOFEST kapsamında iki farklı ileri teknoloji alanında geliştirdiğimiz projelerimiz:
          </p>
        </div>

        {/* 2 Yarışma: Tulpar Ülgen & Tulpar Payna (Kutucuksuz, direkt yazı ve aralarında ince ayrım çizgisi) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-0 pt-2">
          {yarismalar.map((proje, index) => {
            const isCyan = proje.renk === 'cyan';
            const isFirst = index === 0;

            return (
              <div
                key={proje.id}
                className={`flex flex-col space-y-4 ${
                  isFirst
                    ? 'md:pr-10 lg:pr-14'
                    : 'md:pl-10 lg:pl-14 pt-8 md:pt-0 border-t md:border-t-0 md:border-l border-[#1B3A52]'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase">
                      {isCyan ? (
                        <span className="inline-flex items-center gap-1.5 text-[#6CC4FF]">
                          <Shield className="h-4 w-4 text-[#42A5F5]" />
                          <span>{proje.kategori}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-amber-300">
                          <Coins className="h-4 w-4 text-amber-400" />
                          <span>{proje.kategori}</span>
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-medium text-[#A8B4C2] tracking-wider">
                      TEKNOFEST
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#F2F6FA] tracking-tight">
                    {proje.ad}
                  </h3>

                  <p className="text-base sm:text-lg text-[#A8B4C2] leading-relaxed font-normal">
                    {proje.ozet}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. PAYDAŞLARIMIZ BÖLÜMÜ */}
      {paydaslar && paydaslar.length > 0 && (
        <section id="paydaslar" className="site-container scroll-mt-24 space-y-8 sm:space-y-10">
          <div className="flex flex-col items-center text-center space-y-2.5 sm:space-y-3 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#F2F6FA] tracking-tight">
              Paydaşlarımız
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-[#A8B4C2] leading-relaxed font-normal">
              Bize inanan ve yolculuğumuzda yanımızda olan değerli paydaşlarımız.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 pt-2">
            {paydaslar.map((paydas) => (
              <div
                key={paydas.id}
                className="group flex flex-col items-center space-y-3 sm:space-y-4"
              >
                <a
                  href={paydas.url || '#'}
                  target={paydas.url ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="relative h-28 w-28 sm:h-36 sm:w-36 rounded-2xl p-4 flex items-center justify-center bg-[#102235] border border-[#1B3A52] group-hover:border-[#42A5F5] transition-colors"
                >
                  <Image
                    src={paydas.logo}
                    alt={paydas.ad}
                    width={120}
                    height={120}
                    className="object-contain max-h-full max-w-full"
                  />
                </a>
                <div className="text-center flex flex-col items-center">
                  <a
                    href={paydas.url || '#'}
                    target={paydas.url ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="text-base sm:text-lg font-semibold text-[#F2F6FA] group-hover:text-[#6CC4FF] transition-colors block"
                  >
                    {paydas.ad}
                  </a>
                  {paydas.altAd && (
                    <span className="text-xs text-[#A8B4C2] max-w-[200px] block mt-1">
                      {paydas.altAd}
                    </span>
                  )}
                  {(paydas.instagram || paydas.linktree) && (
                    <div className="flex items-center justify-center gap-2 pt-2.5 flex-wrap">
                      {paydas.url && (
                        <a
                          href={paydas.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium text-[#A8B4C2] hover:text-[#6CC4FF] bg-[#0B1826] border border-[#1B3A52] hover:border-[#42A5F5] transition-colors min-h-[36px]"
                        >
                          <Globe className="h-3.5 w-3.5 text-[#42A5F5]" />
                          <span>Web</span>
                        </a>
                      )}
                      {paydas.instagram && (
                        <a
                          href={paydas.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium text-[#A8B4C2] hover:text-[#6CC4FF] bg-[#0B1826] border border-[#1B3A52] hover:border-[#42A5F5] transition-colors min-h-[36px]"
                        >
                          <InstagramIcon className="h-3.5 w-3.5 text-[#6CC4FF]" />
                          <span>Instagram</span>
                        </a>
                      )}
                      {paydas.linktree && (
                        <a
                          href={paydas.linktree}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium text-[#A8B4C2] hover:text-[#6CC4FF] bg-[#0B1826] border border-[#1B3A52] hover:border-[#42A5F5] transition-colors min-h-[36px]"
                        >
                          <LinktreeIcon className="h-3.5 w-3.5 text-emerald-400" />
                          <span>Linktree</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. ARAMIZA KATILIN & TEKNOFEST TAKIM ÜYESİ İLGİ FORMU */}
      <section id="katil" className="site-container scroll-mt-24 space-y-10 sm:space-y-12">
        <div className="max-w-3xl mx-auto text-center space-y-2.5 sm:space-y-3">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#F2F6FA] tracking-tight leading-tight">
            Tulpar Takımına Katılın
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#A8B4C2] leading-relaxed font-normal">
            {katilim.aciklama}
          </p>
        </div>

        {/* 3 Çalışma Alanı: Direkt yazı, kutucuksuz ve aralarında ince ayrım çizgisi */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 pt-2">
          <div className="md:pr-8 space-y-2">
            <div className="flex items-center gap-2 text-[#F2F6FA] font-bold text-base">
              <CheckCircle2 className="h-5 w-5 text-[#6CC4FF] shrink-0" />
              <span>Yazılım & Algoritma</span>
            </div>
            <p className="text-sm text-[#A8B4C2] leading-relaxed">
              Görüntü işleme, otonom hedef takip algoritmaları ve FinTech veri analitiği.
            </p>
          </div>

          <div className="md:px-8 pt-6 md:pt-0 border-t md:border-t-0 md:border-l border-[#1B3A52] space-y-2">
            <div className="flex items-center gap-2 text-[#F2F6FA] font-bold text-base">
              <CheckCircle2 className="h-5 w-5 text-amber-400 shrink-0" />
              <span>Donanım & Aviyonik</span>
            </div>
            <p className="text-sm text-[#A8B4C2] leading-relaxed">
              Gömülü Linux, gerçek zamanlı sensör haberleşmesi ve elektronik devre tasarımı.
            </p>
          </div>

          <div className="md:pl-8 pt-6 md:pt-0 border-t md:border-t-0 md:border-l border-[#1B3A52] space-y-2">
            <div className="flex items-center gap-2 text-[#F2F6FA] font-bold text-base">
              <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
              <span>Mekanik & Tasarım</span>
            </div>
            <p className="text-sm text-[#A8B4C2] leading-relaxed">
              CAD modelleme, kinematik analiz ve yarışma platformu üretim süreçleri.
            </p>
          </div>
        </div>

        {/* Canlı Başvuru Formu (Google Form yerine direkt sitede) */}
        <div className="pt-2">
          <ApplicationForm />
        </div>

        {/* Sosyal Kanallardan İletişim */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
          <span className="text-xs text-[#A8B4C2] font-mono uppercase tracking-wider block w-full text-center">
            Resmi Sosyal Bağlantılarımız:
          </span>
          {iletisim.linkedin && (
            <a
              href={iletisim.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-[#0B1826] hover:bg-[#102235] border border-[#1B3A52] text-[#F2F6FA] transition-colors w-full sm:w-auto min-h-[44px]"
            >
              <LinkedinIcon className="h-4 w-4 text-[#42A5F5]" />
              <span>LinkedIn</span>
            </a>
          )}

          {iletisim.instagram && (
            <a
              href={iletisim.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-[#0B1826] hover:bg-[#102235] border border-[#1B3A52] text-[#F2F6FA] transition-colors w-full sm:w-auto min-h-[44px]"
            >
              <InstagramIcon className="h-4 w-4 text-[#6CC4FF]" />
              <span>Instagram (@gazi.tulparr)</span>
            </a>
          )}
        </div>
      </section>
    </div>
  );
}
