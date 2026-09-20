import React from 'react';

/**
 * Bir değerin henüz doldurulmamış bir placeholder olup olmadığını kontrol eder.
 * Örn: {{KATEGORI}}, {{PROJE_ADI}}, {{DEGER}}, vb.
 */
export function isPlaceholder(val: string | undefined | null): boolean {
  if (!val) return true;
  const trimmed = val.trim();
  return trimmed.startsWith('{{') || trimmed.includes('{{') || trimmed === '';
}

/**
 * Eğer değer placeholder ise temiz bir fallback döndürür veya boş string bırakır.
 */
export function cleanValue(val: string | undefined | null, fallback: string = ''): string {
  if (isPlaceholder(val)) return fallback;
  return val as string;
}

/**
 * Geliştirici modunda (NODE_ENV=development) placeholder alanlarını
 * kırmızı kesikli çerçeveyle gösteren, production'da ise layout'u bozmadan
 * ya da gizleyerek render eden bileşen.
 */
interface DevPlaceholderProps {
  val: string | undefined | null;
  fallback?: React.ReactNode;
  label?: string;
  className?: string;
  children?: React.ReactNode;
}

export function DevPlaceholder({
  val,
  fallback = null,
  label,
  className = '',
  children,
}: DevPlaceholderProps) {
  const hasPlaceholder = isPlaceholder(val);

  if (!hasPlaceholder) {
    return <>{children || val}</>;
  }

  // Development modunda kırmızı kesikli çerçeve ile göster
  if (process.env.NODE_ENV === 'development') {
    return (
      <span
        title={`Doldurulması gereken alan: ${label || val}`}
        className={`inline-flex items-center gap-1 border border-dashed border-red-500/70 bg-red-500/10 px-2 py-0.5 rounded text-xs text-red-300 font-mono select-all ${className}`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
        <span>{label || val}</span>
      </span>
    );
  }

  // Production modunda kullanıcıya ham {{...}} ASLA gösterilmez
  return <>{fallback}</>;
}
