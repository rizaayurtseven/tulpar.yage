'use client';

import React from 'react';
import Image from 'next/image';
import { isPlaceholder } from '@/lib/placeholder';

interface RadarHUDProps {
  realImageSrc?: string;
  className?: string;
}

export default function RadarHUD({ realImageSrc, className = '' }: RadarHUDProps) {
  const hasValidRealImage = realImageSrc && !isPlaceholder(realImageSrc);

  if (hasValidRealImage) {
    return (
      <div className={`relative w-full aspect-square rounded-2xl overflow-hidden border border-cyan-500/30 bg-[#0B1220] shadow-2xl ${className}`}>
        <Image
          src={realImageSrc}
          alt="Tulpar Ülgen Hava Savunma Platformu"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-transparent to-transparent opacity-60" />
      </div>
    );
  }

  return (
    <div
      className={`relative w-full max-w-[540px] aspect-square mx-auto rounded-3xl p-4 sm:p-6 bg-[#0B1220]/90 backdrop-blur-xl border border-cyan-500/30 shadow-[0_0_50px_-10px_rgba(34,211,238,0.2)] flex flex-col justify-between select-none ${className}`}
      aria-label="Otonom Hava Savunma Radar ve HUD Görseli"
    >
      {/* Üst Telemetri Başlığı */}
      <div className="flex items-center justify-between text-xs sm:text-sm font-medium border-b border-white/10 pb-3 z-10">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
          </span>
          <span className="text-cyan-300 font-semibold">TULPAR RADAR SİSTEMİ</span>
          <span className="text-slate-500">•</span>
          <span className="text-emerald-400 font-medium">AKTİF TARAMA</span>
        </div>
        <div className="flex items-center gap-3 text-slate-300">
          <span>FPS: <strong className="text-white">60</strong></span>
          <span>GECİKME: <strong className="text-cyan-300">&lt;25ms</strong></span>
        </div>
      </div>

      {/* SVG Radar Ekranı */}
      <div className="relative flex-1 my-2 flex items-center justify-center overflow-hidden">
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full max-h-[400px]"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            {/* Tarama çizgisi gradient açısı */}
            <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.08" />
              <stop offset="70%" stopColor="#3B82F6" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#070B14" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="sweepGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#22D3EE" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="sectorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Arka plan dolgu ve ışıltı */}
          <circle cx="250" cy="250" r="230" fill="url(#radarGlow)" />

          {/* Eş merkezli halkalar (Mesafe Kademeleri) */}
          <circle cx="250" cy="250" r="230" fill="none" stroke="#22D3EE" strokeWidth="1.5" strokeOpacity="0.3" />
          <circle cx="250" cy="250" r="170" fill="none" stroke="#22D3EE" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="6 4" />
          <circle cx="250" cy="250" r="110" fill="none" stroke="#22D3EE" strokeWidth="1" strokeOpacity="0.25" />
          <circle cx="250" cy="250" r="50" fill="none" stroke="#22D3EE" strokeWidth="1" strokeOpacity="0.3" />
          <circle cx="250" cy="250" r="4" fill="#22D3EE" />

          {/* Mesafe etiketleri */}
          <text x="256" y="90" fill="#94A3B8" fontSize="10" fontFamily="sans-serif">50 KM</text>
          <text x="256" y="150" fill="#94A3B8" fontSize="10" fontFamily="sans-serif">25 KM</text>
          <text x="256" y="210" fill="#94A3B8" fontSize="10" fontFamily="sans-serif">10 KM</text>

          {/* Ana Eksen Çizgileri */}
          <line x1="20" y1="250" x2="480" y2="250" stroke="#22D3EE" strokeWidth="1" strokeOpacity="0.2" />
          <line x1="250" y1="20" x2="250" y2="480" stroke="#22D3EE" strokeWidth="1" strokeOpacity="0.2" />

          {/* Çapraz Eksen Çizgileri */}
          <line x1="87" y1="87" x2="413" y2="413" stroke="#22D3EE" strokeWidth="0.8" strokeOpacity="0.15" strokeDasharray="3 3" />
          <line x1="87" y1="413" x2="413" y2="87" stroke="#22D3EE" strokeWidth="0.8" strokeOpacity="0.15" strokeDasharray="3 3" />

          {/* Dönen Tarama Sektörü & Çizgisi */}
          <g className="animate-radar-sweep">
            {/* Tarama Koni Gölgesi (45 derece) */}
            <path
              d="M 250 250 L 250 20 A 230 230 0 0 1 412 88 Z"
              fill="url(#sectorGradient)"
            />
            {/* Tarama Işını */}
            <line x1="250" y1="250" x2="250" y2="20" stroke="#22D3EE" strokeWidth="2.5" filter="drop-shadow(0 0 4px #22D3EE)" />
          </g>

          {/* Hedef 1 (Amber / Kilitlenme): Asimetrik tehdit mikro İHA */}
          <g transform="translate(170, 310)" className="animate-radar-blip-amber">
            <circle cx="0" cy="0" r="7" fill="#FBBF24" fillOpacity="0.3" />
            <circle cx="0" cy="0" r="3.5" fill="#F59E0B" />
            {/* Hedef Kilit Kare/Baklava İşareti */}
            <rect x="-8" y="-8" width="16" height="16" fill="none" stroke="#FBBF24" strokeWidth="1.2" />
            <text x="12" y="4" fill="#FBBF24" fontSize="10" fontWeight="bold" fontFamily="sans-serif">HEDEF-01 [18 KM]</text>
          </g>

          {/* Hedef 2 (Amber / Kilitlenme): Hızlı yaklaşan hava unsuru */}
          <g transform="translate(365, 340)" className="animate-radar-blip-amber">
            <circle cx="0" cy="0" r="6" fill="#FBBF24" fillOpacity="0.3" />
            <circle cx="0" cy="0" r="3" fill="#F59E0B" />
            <rect x="-7" y="-7" width="14" height="14" fill="none" stroke="#FBBF24" strokeWidth="1" strokeDasharray="2 2" />
            <text x="12" y="4" fill="#FCD34D" fontSize="10" fontFamily="sans-serif">HEDEF-02 [38 KM]</text>
          </g>

          {/* Hedef 3 (Cyan / Dost/Takip): Dost hava unsuru & Optik kilit */}
          <g transform="translate(340, 160)" className="animate-radar-blip-cyan">
            <circle cx="0" cy="0" r="6" fill="#22D3EE" fillOpacity="0.3" />
            <circle cx="0" cy="0" r="3" fill="#22D3EE" />
            <circle cx="0" cy="0" r="10" fill="none" stroke="#22D3EE" strokeWidth="0.8" strokeDasharray="2 2" />
            <text x="14" y="4" fill="#67E8F9" fontSize="10" fontFamily="sans-serif">DOST-HAVA [24 KM]</text>
          </g>

          {/* Hedef 4 (Cyan / Sensör): Optik Kamera Eksen Kilidi */}
          <g transform="translate(150, 150)" className="animate-radar-blip-cyan">
            <circle cx="0" cy="0" r="5" fill="#22D3EE" fillOpacity="0.25" />
            <circle cx="0" cy="0" r="2.5" fill="#38BDF8" />
            <text x="10" y="4" fill="#94A3B8" fontSize="9" fontFamily="sans-serif">EO/IR SENSÖR</text>
          </g>

          {/* Merkez Tulpar Logosu */}
          <image
            href="/images/tulpar-logo-transparent.png"
            x="195"
            y="235"
            width="110"
            height="30"
            opacity="0.85"
          />

          {/* Açı İşaretleri */}
          <text x="245" y="15" fill="#94A3B8" fontSize="10" fontWeight="bold">000°</text>
          <text x="484" y="254" fill="#94A3B8" fontSize="10" fontWeight="bold">090°</text>
          <text x="245" y="495" fill="#94A3B8" fontSize="10" fontWeight="bold">180°</text>
          <text x="0" y="254" fill="#94A3B8" fontSize="10" fontWeight="bold">270°</text>
        </svg>
      </div>

      {/* Alt Telemetri Şeridi */}
      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-300 z-10">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
          <span>Sistem: <span className="text-cyan-300 font-semibold">TULPAR HUD</span></span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span>Durum: <span className="text-emerald-300 font-semibold">AKTİF MOD</span></span>
        </div>
      </div>
    </div>
  );
}
