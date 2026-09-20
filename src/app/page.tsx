'use client';

import React from 'react';
import Image from 'next/image';
import { 
  ArrowRight, 
  Shield, 
  Coins, 
  Award, 
  FileText, 
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { siteData } from '@/data/site';
import { LinkedinIcon } from '@/components/Icons';

export default function HomePage() {
  const { takim, yarismalar, paydaslar, katilim, iletisim } = siteData;

  const heroSubtitle = `${takim.okul} ${takim.fakulte} ${takim.bolum}`;

  return (
    <div className="flex flex-col gap-20 sm:gap-28 pb-16">
      {/* 1. HERO BÖLÜMÜ (Ayrımsız, çizgisiz ve parlamasız) */}
      <section className="relative w-full overflow-hidden">
        <div className="relative z-10 site-container pt-12 pb-16 sm:pt-20 sm:pb-24">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center space-y-6">
            {/* Üst Rozet: Okul ve TEKNOFEST (Parlamasız) */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-sm font-medium">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              <span>{takim.okul}</span>
              <span className="text-slate-400">•</span>
              <span>TEKNOFEST {takim.sezon || ''}</span>
            </div>

            {/* Başlık: Logo ve Takım Adı (Parlamasız) */}
            <div className="space-y-3 flex flex-col items-center">
              <div className="flex items-center justify-center gap-4">
                <div className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-2xl overflow-hidden border border-slate-200 shrink-0 bg-white">
                  <Image
                    src={takim.logoPath || '/images/tulpar-logo.png'}
                    alt={takim.ad}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-tight">
                  {takim.ad}
                </h1>
              </div>
              <p className="text-xl sm:text-2xl text-blue-700 font-bold leading-snug">
                {heroSubtitle}
              </p>
            </div>

            <p className="max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Hava Savunma Sistemleri ve Finansal Teknolojiler alanında milli teknoloji hamlesine güç katan TEKNOFEST takımı.
            </p>

            {/* İki Aksiyon Butonu: Yarışmalar & Aramıza Katılın (Parlamasız, Düz ve Şık) */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full sm:w-auto">
              <a
                href="#projeler"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
              >
                <span>Yarışmalarımız & Projeler</span>
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="#katil"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-base font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 transition-colors"
              >
                <FileText className="h-5 w-5 text-slate-600" />
                <span>Aramıza Katılın</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. YARIŞMALARIMIZ & PROJELERİMİZ BÖLÜMÜ (id="projeler") */}
      <section id="projeler" className="site-container scroll-mt-24 space-y-12">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
            <Award className="h-4 w-4 text-blue-600" />
            <span>TEKNOFEST Çalışmalarımız</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Katıldığımız Yarışmalar & Projeler
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Tulpar Takımı bünyesinde TEKNOFEST kapsamında iki farklı ileri teknoloji alanında geliştirdiğimiz projelerimiz:
          </p>
        </div>

        {/* 2 Yarışma Kartı: Tulpar Ülgen & Tulpar Payna (Parlamasız) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {yarismalar.map((proje) => {
            const isCyan = proje.renk === 'cyan';

            return (
              <div
                key={proje.id}
                className="p-8 sm:p-10 flex flex-col justify-between space-y-6 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-colors"
              >
                <div className="space-y-4">
                  {/* Kategori Rozeti */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border ${
                        isCyan
                          ? 'border-blue-200 text-blue-700 bg-blue-50'
                          : 'border-amber-200 text-amber-800 bg-amber-50'
                      }`}
                    >
                      {isCyan ? <Shield className="h-3.5 w-3.5 text-blue-600" /> : <Coins className="h-3.5 w-3.5 text-amber-600" />}
                      <span>{proje.kategori}</span>
                    </span>
                    <span className="text-xs text-slate-500 font-medium">TEKNOFEST</span>
                  </div>

                  {/* Proje Adı */}
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                    {proje.ad}
                  </h3>

                  {/* Açıklama */}
                  <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                    {proje.ozet}
                  </p>
                </div>

                {/* Etiketler */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2">
                  {proje.etiketler.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-50 border border-slate-200 text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. PAYDAŞLARIMIZ BÖLÜMÜ (id="paydaslar") */}
      {paydaslar && paydaslar.length > 0 && (
        <section id="paydaslar" className="site-container scroll-mt-24 space-y-12">
          {/* Başlık (Ayrımsız) */}
          <div className="flex flex-col items-center text-center space-y-3 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Paydaşlarımız
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Bize inanan ve yolculuğumuzda yanımızda olan değerli paydaşlarımız.
            </p>
          </div>

          {/* Paydaş Logoları: Gazi Üniversitesi & Gazi YAGİ (Parlamasız) */}
          <div className="flex flex-wrap items-center justify-center gap-12 sm:gap-20 pt-2">
            {paydaslar.map((paydas) => (
              <a
                key={paydas.id}
                href={paydas.url || '#'}
                target={paydas.url ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="group flex flex-col items-center space-y-4 focus:outline-none"
              >
                <div className="relative h-28 w-28 sm:h-36 sm:w-36 rounded-2xl p-4 flex items-center justify-center bg-white border border-slate-200 group-hover:border-slate-300 transition-colors">
                  <Image
                    src={paydas.logo}
                    alt={paydas.ad}
                    width={120}
                    height={120}
                    className="object-contain max-h-full max-w-full"
                  />
                </div>
                <div className="text-center">
                  <span className="text-base sm:text-lg font-semibold text-slate-800 group-hover:text-blue-600 transition-colors block">
                    {paydas.ad}
                  </span>
                  {paydas.altAd && (
                    <span className="text-xs text-slate-500 max-w-[200px] block mt-1">
                      {paydas.altAd}
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* 4. ARAMIZA KATILIN & GOOGLE FORMS BAŞVURU BÖLÜMÜ (id="katil") */}
      <section id="katil" className="site-container scroll-mt-24 space-y-10">
        <div className="p-8 sm:p-14 relative overflow-hidden rounded-3xl bg-slate-50 border border-slate-200 space-y-8">
          <div className="max-w-3xl space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-sm font-semibold">
              <FileText className="h-4 w-4 text-blue-600" />
              <span>{katilim.baslik}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Tulpar Takımına Katılın
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed font-normal">
              {katilim.aciklama}
            </p>
          </div>

          {/* Çalışma Alanlarımız (Parlamasız, Düz ve Temiz) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                <CheckCircle2 className="h-5 w-5 text-blue-600 shrink-0" />
                <span>Yazılım & Algoritma</span>
              </div>
              <p className="text-sm text-slate-600">
                Görüntü işleme, otonom hedef takip algoritmaları ve FinTech veri analitiği.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                <CheckCircle2 className="h-5 w-5 text-amber-600 shrink-0" />
                <span>Donanım & Aviyonik</span>
              </div>
              <p className="text-sm text-slate-600">
                Gömülü Linux, gerçek zamanlı sensör haberleşmesi ve elektronik devre tasarımı.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                <span>Mekanik & Tasarım</span>
              </div>
              <p className="text-sm text-slate-600">
                CAD modelleme, kinematik analiz ve yarışma platformu üretim süreçleri.
              </p>
            </div>
          </div>

          {/* Google Forms Butonu (Parlamasız Düz Buton) */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 relative z-10">
            <a
              href={katilim.googleFormsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors"
            >
              <FileText className="h-5 w-5" />
              <span>Google Forms ile Başvuru Yap</span>
              <ExternalLink className="h-4 w-4" />
            </a>

            {iletisim.linkedin && (
              <a
                href={iletisim.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl text-base font-semibold bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 transition-colors"
              >
                <LinkedinIcon className="h-5 w-5 text-blue-600" />
                <span>LinkedIn ile İletişim</span>
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
