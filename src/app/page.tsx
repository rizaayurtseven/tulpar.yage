'use client';

import React from 'react';
import Image from 'next/image';
import { 
  ArrowRight, 
  Users, 
  Handshake,
  ExternalLink
} from 'lucide-react';
import { siteData } from '@/data/site';
import RadarHUD from '@/components/RadarHUD';
import { LinkedinIcon } from '@/components/Icons';

function getInitials(name: string): string {
  return name
    .split(' ')
    .filter((n) => !n.startsWith('Doç.') && !n.startsWith('Dr.'))
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

export default function HomePage() {
  const { takim, ekip, metrikler, proje, yolHaritasi, paydaslar, galeri, gelismeler, iletisim } = siteData;

  // Hero alt başlığı: slogan null ise sadece okul/fakülte/bölüm gösterilir
  const heroSubtitle = takim.slogan || `${takim.okul} ${takim.fakulte} ${takim.bolum}`;

  return (
    <div className="flex flex-col gap-20 sm:gap-28 pb-16">
      {/* 1. HERO BÖLÜMÜ (Yalnızca doğrulanmış veriler: Takım adı, okul/fakülte/bölüm ve TEKNOFEST) */}
      <section className="relative w-full overflow-hidden border-b border-white/10 bg-[#070B14]">
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
                {takim.kategori && (
                  <>
                    <span className="text-slate-500">•</span>
                    <span>{takim.kategori}</span>
                  </>
                )}
              </div>

              {/* Başlık: Takım Adı ve Logo */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-14 sm:h-18 sm:w-18 rounded-2xl overflow-hidden border-2 border-cyan-400/40 shadow-[0_0_25px_rgba(34,211,238,0.25)] shrink-0 bg-[#1c283e]">
                    <Image
                      src="/images/tulpar-logo.png"
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

              {/* İki Aksiyon Butonu: Ekip (Keşfet) + Paydaşlarımız */}
              <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href="#ekip"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl text-base font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:brightness-110 active:scale-[0.98] transition-all"
                >
                  <span>Ekibimizi Tanıyın</span>
                  <ArrowRight className="h-5 w-5" />
                </a>
                <a
                  href="#paydaslar"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl text-base font-bold bg-slate-900/80 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/10 active:scale-[0.98] transition-all shadow-sm"
                >
                  <Handshake className="h-5 w-5 text-cyan-400" />
                  <span>Paydaşlarımız</span>
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

      {/* 2. RAKAM ŞERİDİ: metrikler veride null olduğu için tamamen gizlenir, veri eklenince otomatik render edilir */}
      {metrikler && metrikler.length > 0 && (
        <section className="site-container -mt-14 sm:-mt-16 relative z-20">
          <div className="p-6 sm:p-8 bg-[#0B1220]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {metrikler.map((stat, idx) => (
                <div key={stat.id || idx} className="flex flex-col space-y-2 min-w-0">
                  <span className="text-3xl sm:text-4xl font-black text-cyan-400 block truncate">
                    {stat.deger}
                  </span>
                  <p className="text-sm text-slate-300 font-medium">
                    {stat.etiket}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. PROJE BÖLÜMÜ: Veri doğrulanmadıkça / null iken tamamen gizlenir */}
      {proje && (proje.ad || (proje.teknikOzellikler && proje.teknikOzellikler.length > 0)) && (
        <section id="proje" className="site-container scroll-mt-24 space-y-12">
          <div className="max-w-3xl space-y-4">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              {proje.ad || 'Proje Mimarisi'}
            </h2>
            {proje.ozet && (
              <p className="text-lg text-slate-200 leading-relaxed">
                {proje.ozet}
              </p>
            )}
          </div>
        </section>
      )}

      {/* 4. YOL HARİTASI BÖLÜMÜ: Boş dizi olduğunda tamamen gizlenir */}
      {yolHaritasi && yolHaritasi.length > 0 && (
        <section id="yol-haritasi" className="site-container scroll-mt-24 space-y-12">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Yol Haritası
          </h2>
        </section>
      )}

      {/* 5. EKİP BÖLÜMÜ (id="ekip") - TEYİT EDİLMELİ: Rol ve alt takım uydurmadan, yalnızca isimler sade kartlarla */}
      <section id="ekip" className="site-container scroll-mt-24 space-y-12">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400">
            <Users className="h-4 w-4" />
            <span>Takım Kadrosu</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              {takim.ad} Ekibi
            </h2>
            {ekip.durum && (
              <span className="inline-flex items-center self-start sm:self-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                {ekip.durum}
              </span>
            )}
          </div>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            {takim.okul} {takim.fakulte} {takim.bolum} bünyesinde TEKNOFEST çalışmalarını yürüten ekip üyelerimiz.
          </p>
        </div>

        {/* Danışman ve Kaptan veride null olduğu için liderlik blokları gizlenir */}
        {ekip.danisman && (
          <div className="tech-card p-6 bg-[#0B172D] border-cyan-500/30">
            <h3 className="text-xl font-bold text-white">Akademik Danışman: {(ekip.danisman as any).isim}</h3>
          </div>
        )}
        {ekip.kaptan && (
          <div className="tech-card p-6 bg-[#0B172D] border-cyan-500/30">
            <h3 className="text-xl font-bold text-white">Takım Kaptanı: {(ekip.kaptan as any).isim}</h3>
          </div>
        )}

        {/* 15 Üyenin Sade Kartları */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {ekip.uyeler.map((isim, idx) => {
            const initials = getInitials(isim);

            return (
              <div
                key={idx}
                className="tech-card p-4 flex items-center gap-3.5 hover:border-cyan-500/40 transition-colors"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-500/30 bg-gradient-to-br from-cyan-950 to-blue-950 text-cyan-300 font-bold text-sm shrink-0 shadow-inner">
                  {initials}
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-semibold text-white truncate">
                    {isim}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. PAYDAŞLARIMIZ BÖLÜMÜ (id="paydaslar") - Görsel Tasarımla Tam Uyumlu */}
      {paydaslar && paydaslar.length > 0 && (
        <section id="paydaslar" className="site-container scroll-mt-24 space-y-12">
          {/* Başlık ve İki Yandaki Zarif Çizgiler */}
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

      {/* 7. GALERİ & GELİŞMELER: Boş olduğunda gizlenir */}
      {galeri && galeri.length > 0 && (
        <section id="galeri" className="site-container scroll-mt-24 space-y-12">
          <h2 className="text-3xl font-bold text-white">Galeri</h2>
        </section>
      )}

      {/* 8. BÜYÜK GEÇİŞ / İLETİŞİM BANNERI */}
      <section className="site-container">
        <div className="p-8 sm:p-12 relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0D172E] via-[#0B1428] to-[#070B14] border border-cyan-500/30 shadow-2xl">
          <div className="max-w-3xl space-y-5 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-sm font-semibold">
              <Handshake className="h-4 w-4" />
              <span>İletişim & İş Birliği</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Bizimle İletişime Geçin
            </h2>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
              Tulpar Ülgen takımımız, yarışma hazırlık süreçlerimiz ve iş birliği talepleriniz için resmi LinkedIn hesabımız üzerinden bize ulaşabilirsiniz.
            </p>
            {iletisim.linkedin && (
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href={iletisim.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:brightness-110 active:scale-[0.98] transition-all"
                >
                  <LinkedinIcon className="h-5 w-5" />
                  <span>LinkedIn Üzerinden İletişim</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
