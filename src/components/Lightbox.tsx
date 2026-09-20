'use client';

import React, { useEffect, useCallback, useState, useRef } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import type { GalleryItem } from '@/data/site';

interface LightboxProps {
  items: GalleryItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({
  items,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: LightboxProps) {
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [hasImageError, setHasImageError] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const currentItem = items[currentIndex];

  const handlePrev = useCallback(() => {
    setHasImageError(false);
    onNavigate((currentIndex - 1 + items.length) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  const handleNext = useCallback(() => {
    setHasImageError(false);
    onNavigate((currentIndex + 1) % items.length);
  }, [currentIndex, items.length, onNavigate]);

  // Klavye erişilebilirliği: Esc ile kapat, Sol/Sağ ile değiştir
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  // Mobil Swipe desteği
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    const minSwipeDistance = 50;

    if (deltaX > minSwipeDistance) {
      handlePrev();
    } else if (deltaX < -minSwipeDistance) {
      handleNext();
    }
    setTouchStartX(null);
  };

  if (!isOpen || !currentItem) return null;

  // Caption kuralı: Sadece veride başlık veya tarih varsa gösterilir, fallback metin konmaz!
  const hasCaption = Boolean(currentItem.baslik || currentItem.tarih);
  const showRealImage = currentItem.url && !hasImageError && !currentItem.url.startsWith('{{');

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label="Görsel büyütme alanı"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Kapat butonu */}
      <button
        onClick={onClose}
        aria-label="Kapat (Esc)"
        className="absolute top-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-slate-800/80 text-white hover:bg-slate-700 transition-colors border border-white/10"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Önceki görsel butonu */}
      <button
        onClick={handlePrev}
        aria-label="Önceki görsel (Sol ok)"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-slate-800/80 text-white hover:bg-slate-700 transition-colors border border-white/10 shadow-lg"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      {/* Sonraki görsel butonu */}
      <button
        onClick={handleNext}
        aria-label="Sonraki görsel (Sağ ok)"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-slate-800/80 text-white hover:bg-slate-700 transition-colors border border-white/10 shadow-lg"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Görsel ve Altyazı Konteyneri */}
      <div className="relative max-w-5xl w-full flex flex-col items-center max-h-[90vh]">
        <div className="relative w-full aspect-video max-h-[75vh] flex items-center justify-center overflow-hidden rounded-xl bg-slate-950 border border-white/10">
          {showRealImage ? (
            <Image
              src={currentItem.url}
              alt={currentItem.alt}
              fill
              className="object-contain"
              sizes="(max-width: 1280px) 100vw, 1200px"
              onError={() => setHasImageError(true)}
            />
          ) : (
            <div className="blueprint-grid w-full h-full flex flex-col items-center justify-center p-8 text-center">
              <div className="rounded-lg border border-cyan-500/40 bg-cyan-500/10 p-3 text-cyan-300 mb-4">
                <span className="text-sm font-semibold">{currentItem.placeholder}</span>
              </div>
              <p className="text-slate-300 text-sm max-w-md">{currentItem.alt}</p>
              <span className="mt-4 text-xs text-slate-300">Dosya: public{currentItem.url}</span>
            </div>
          )}
        </div>

        {/* Caption alanı: Sadece veri varsa render edilir */}
        {hasCaption && (
          <div className="mt-4 w-full rounded-lg bg-slate-900/90 border border-white/10 p-4 text-left flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            {currentItem.baslik && (
              <h4 className="text-lg font-semibold text-white">{currentItem.baslik}</h4>
            )}
            {currentItem.tarih && (
              <div className="flex items-center gap-1.5 text-sm text-cyan-400 shrink-0">
                <Calendar className="h-4 w-4" />
                <span>{currentItem.tarih}</span>
              </div>
            )}
          </div>
        )}

        {/* Sayaç */}
        <div className="mt-2 text-sm text-slate-300">
          {currentIndex + 1} / {items.length}
        </div>
      </div>
    </div>
  );
}
