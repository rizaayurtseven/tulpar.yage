'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { isPlaceholder } from '@/lib/placeholder';

interface PlaceholderImageProps {
  src?: string;
  alt: string;
  placeholderLabel?: string;
  description?: string;
  aspectRatio?: 'video' | 'square' | 'portrait' | 'wide' | 'auto';
  className?: string;
  priority?: boolean;
}

export default function PlaceholderImage({
  src,
  alt,
  placeholderLabel = 'Görsel',
  description,
  aspectRatio = 'video',
  className = '',
  priority = false,
}: PlaceholderImageProps) {
  const [hasError, setHasError] = useState(false);

  const aspectClass = {
    video: 'aspect-video',
    square: 'aspect-square',
    portrait: 'aspect-[4/5]',
    wide: 'aspect-[21/9]',
    auto: 'h-full w-full min-h-[200px]',
  }[aspectRatio];

  const isDev = process.env.NODE_ENV === 'development';
  const isPlace = isPlaceholder(src);
  const showActualImage = src && !hasError && !isPlace;

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-white/10 bg-[#090E1B] ${aspectClass} ${className}`}
    >
      {showActualImage ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          onError={() => setHasError(true)}
        />
      ) : isDev ? (
        /* Geliştirme Modu (NODE_ENV=development): Kırmızı kesikli çerçeve, layout bozulmaz */
        <div className="absolute inset-0 border-2 border-dashed border-red-500/60 bg-red-950/20 p-4 flex flex-col items-center justify-center text-center select-none">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-red-900/60 border border-red-500/50 text-red-200 text-xs font-mono mb-2">
            <span className="h-2 w-2 rounded-full bg-red-400 animate-ping" />
            <span>Geliştirici Yer Tutucu</span>
          </span>
          <p className="text-xs font-semibold text-slate-200 max-w-[90%] break-all">
            {placeholderLabel.replace(/[{}]/g, '')}
          </p>
          {description && (
            <p className="mt-1 text-[11px] text-slate-300 max-w-xs">{description}</p>
          )}
        </div>
      ) : (
        /* Üretim Modu (Production): Kırık ikon veya raw placeholder YOK, şık teknik şematik zemin */
        <div className="blueprint-grid absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none bg-gradient-to-b from-[#0B1426] to-[#070B14]">
          <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 shadow-inner mb-3">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
            </svg>
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
          </div>
          <span className="text-sm font-semibold text-slate-200 tracking-wide">{alt}</span>
          <span className="text-xs text-cyan-400/80 mt-1">Tulpar Ülgen Mühendislik Kaydı</span>
        </div>
      )}
    </div>
  );
}
