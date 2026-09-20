'use client';

import React from 'react';
import Image from 'next/image';
import { 
  ArrowRight, 
  Shield, 
  Coins, 
  Award, 
  Handshake, 
  FileText, 
  ExternalLink,
  Cpu,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { siteData } from '@/data/site';
import RadarHUD from '@/components/RadarHUD';
import { LinkedinIcon } from '@/components/Icons';

export default function HomePage() {
  const { takim, yarismalar, paydaslar, katilim, iletisim } = siteData;

  const heroSubtitle = `${takim.okul} ${takim.fakulte} ${takim.bolum}`;

  return (
    <div className="flex flex-col gap-20 sm:gap-28 pb-16">
      {/* 1. HERO BÖLÜMÜ */}
      <section className="relative w-full overflow-hidden border-b border-white/10 bg-[#070B14]/70 backdrop-blur-[2px]">
        {/* Arka plan radyal ışık ve ince nokta ızgarası */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[130px]" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-dot-grid opacity-30" />
        </div>

        <div className="relative z-10 site-container pt-16 pb-20 sm:pt-24 sm:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Sol Kolon: Başlık ve Aksiyon Butonları */}
            <div className="lg:col-span-7 space-y-6">
              {/* Üst Rozet: Okul ve TEKNOFEST */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-300 text-sm font-medium shadow-inner">
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>{takim.okul}</span>
                <span className="text-slate-500">•</span>
                <span>TEKNOFEST {takim.sezon || ''}</span>
              </div>

              {/* Başlık: Logo ve Takım Adı */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-14 sm:h-18 sm:w-18 rounded-2xl overflow-hidden border-2 border-cyan-400/40 shadow-[0_0_25px_rgba(34,211,238,0.25)] shrink-0 bg-[#1c283e]">
                    <Image
                      src={takim.logoPath || '/images/tulpar-logo.png'}
                      alt={takim.ad}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div>
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
                      {takim.ad}
                    </h1>
                  </div>
                </div>
                <p className="text-xl sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 font-bold leading-snug">
                  {heroSubtitle}
                </p>
              </div>

              {/* İki Aksiyon Butonu: Yarışmalar & Aramıza Katılın */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="#projeler"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl text-base font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:brightness-110 active:scale-[0.98] transition-all"
                >
                  <span>Yarışmalarımız & Projeler</span>
                  <ArrowRight className="h-5 w-5" />
                </a>
                <a
                  href="#katil"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl text-base font-bold bg-slate-900/80 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/10 active:scale-[0.98] transition-all shadow-sm"
                >
                  <FileText className="h-5 w-5 text-cyan-400" />
                  <span>Aramıza Katılın</span>
                </a>
              </div>
            </div>

            {/* Sağ Kolon: Radar / HUD Görsel Arayüzü */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <RadarHUD />
            </div>
          </div>
        </div>
      </section>

      {/* 2. YARIŞMALARIMIZ & PROJELERİMİZ BÖLÜMÜ (id="projeler") */}
      <section id="projeler" className="site-container scroll-mt-24 space-y-12">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400">
            <Award className="h-4 w-4" />
            <span>TEKNOFEST Çalışmalarımız</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Katıldığımız Yarışmalar & Projeler
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Tulpar Takımı bünyesinde TEKNOFEST kapsamında iki farklı ileri teknoloji alanında geliştirdiğimiz projelerimiz:
          </p>
        </div>

        {/* 2 Yarışma Kartı: Tulpar Ülgen & Tulpar Payna */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {yarismalar.map((proje) => {
            const isCyan = proje.renk === 'cyan';

            return (
              <div
                key={proje.id}
                className={`tech-card p-8 sm:p-10 flex flex-col justify-between space-y-6 relative overflow-hidden transition-all duration-200 hover:-translate-y-1 ${
                  isCyan
                    ? 'border-cyan-500/40 bg-[#0B152A] hover:border-cyan-400/80 shadow-[0_0_30px_rgba(34,211,238,0.1)]'
                    : 'border-amber-500/40 bg-[#141525] hover:border-amber-400/80 shadow-[0_0_30px_rgba(251,191,36,0.1)]'
                }`}
              >
                <div className="space-y-4">
                  {/* Kategori Rozeti */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border ${
                        isCyan
                          ? 'border-cyan-500/40 text-cyan-300 bg-cyan-500/10'
                          : 'border-amber-500/40 text-amber-300 bg-amber-500/10'
                      }`}
                    >
                      {isCyan ? <Shield className="h-3.5 w-3.5" /> : <Coins className="h-3.5 w-3.5" />}
                      <span>{proje.kategori}</span>
                    </span>
                    <span className="text-xs text-slate-400 font-medium">TEKNOFEST</span>
                  </div>

                  {/* Proje Adı */}
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {proje.ad}
                  </h3>

                  {/* Açıklama */}
                  <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
                    {proje.ozet}
                  </p>
                </div>

                {/* Etiketler */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap gap-2">
                  {proje.etiketler.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-900/80 border border-white/10 text-slate-300"
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
          {/* Başlık ve İki Yandaki Çizgiler */}
          <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-4 w-full">
              <div className="h-[1px] flex-1 max-w-[100px] sm:max-w-[160px] bg-gradient-to-r from-transparent to-white/40" />
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Paydaşlarımız
              </h2>
              <div className="h-[1px] flex-1 max-w-[100px] sm:max-w-[160px] bg-gradient-to-l from-transparent to-white/40" />
            </div>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Bize inanan ve yolculuğumuzda yanımızda olan değerli paydaşlarımız.
            </p>
          </div>

          {/* Paydaş Logoları: Gazi Üniversitesi & Gazi YAGİ */}
          <div className="flex flex-wrap items-center justify-center gap-12 sm:gap-24 pt-4">
            {paydaslar.map((paydas) => (
              <a
                key={paydas.id}
                href={paydas.url || '#'}
                target={paydas.url ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="group flex flex-col items-center space-y-4 focus:outline-none"
              >
                {/* Logo Konteynırı */}
                <div className="relative h-28 w-28 sm:h-36 sm:w-36 rounded-2xl p-4 flex items-center justify-center bg-[#0B1220]/90 border border-white/10 group-hover:border-cyan-400/50 group-hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] transition-all duration-200">
                  <Image
                    src={paydas.logo}
                    alt={paydas.ad}
                    width={120}
                    height={120}
                    className="object-contain max-h-full max-w-full group-hover:scale-105 transition-transform"
                  />
                </div>
                {/* Paydaş Adı */}
                <div className="text-center">
                  <span className="text-base sm:text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors block">
                    {paydas.ad}
                  </span>
                  {paydas.altAd && (
                    <span className="text-xs text-slate-400 max-w-[200px] block mt-1">
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
        <div className="p-8 sm:p-14 relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0B172F]/90 via-[#0B1428]/85 to-[#070B14]/90 backdrop-blur-md border-2 border-cyan-500/40 shadow-2xl space-y-8">
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-sm font-semibold">
              <FileText className="h-4 w-4" />
              <span>{katilim.baslik}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Tulpar Takımına Katılın
            </h2>
            <p className="text-lg sm:text-xl text-slate-200 leading-relaxed font-normal">
              {katilim.aciklama}
            </p>
          </div>

          {/* Çalışma Alanlarımız */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-cyan-300 font-bold text-base">
                <CheckCircle2 className="h-5 w-5 text-cyan-400 shrink-0" />
                <span>Yazılım & Algoritma</span>
              </div>
              <p className="text-sm text-slate-300">
                Görüntü işleme, otonom hedef takip algoritmaları ve FinTech veri analitiği.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-base">
                <CheckCircle2 className="h-5 w-5 text-amber-400 shrink-0" />
                <span>Donanım & Aviyonik</span>
              </div>
              <p className="text-sm text-slate-300">
                Gömülü Linux, gerçek zamanlı sensör haberleşmesi ve elektronik devre tasarımı.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-base">
                <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                <span>Mekanik & Tasarım</span>
              </div>
              <p className="text-sm text-slate-300">
                CAD modelleme, kinematik analiz ve yarışma platformu üretim süreçleri.
              </p>
            </div>
          </div>

          {/* Google Forms Butonu */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 relative z-10">
            <a
              href={katilim.googleFormsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-9 py-4 rounded-xl text-base font-bold bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-white shadow-xl shadow-cyan-500/30 hover:brightness-110 active:scale-[0.98] transition-all"
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
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl text-base font-semibold bg-slate-900 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10 transition-all"
              >
                <LinkedinIcon className="h-5 w-5" />
                <span>LinkedIn ile İletişim</span>
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
