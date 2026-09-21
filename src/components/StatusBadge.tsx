import { CheckCircle2, Clock } from 'lucide-react';

interface StatusBadgeProps {
  status: 'tamamlandi' | 'devam-ediyor' | 'yaklasiyor';
  isCurrent?: boolean;
  className?: string;
}

export default function StatusBadge({ status, isCurrent = false, className = '' }: StatusBadgeProps) {
  if (status === 'tamamlandi') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 ${className}`}
      >
        <CheckCircle2 className="h-4 w-4 text-emerald-400" aria-hidden="true" />
        <span>Tamamlandı</span>
      </span>
    );
  }

  if (status === 'devam-ediyor') {
    return (
      <span
        className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-sm font-medium bg-cyan-950/80 text-cyan-200 border border-cyan-400/50 shadow-[0_0_14px_rgba(0,210,255,0.25)] ${className}`}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
        </span>
        <span>{isCurrent ? 'Güncel Aşama (Devam Ediyor)' : 'Devam Ediyor'}</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-slate-900 text-slate-300 border border-slate-700/70 ${className}`}
    >
      <Clock className="h-4 w-4 text-slate-300" aria-hidden="true" />
      <span>Yaklaşıyor</span>
    </span>
  );
}
