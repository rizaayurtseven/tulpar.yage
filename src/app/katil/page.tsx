import type { Metadata } from 'next';
import ApplicationForm from '@/components/ApplicationForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Aramıza Katılın | Tulpar TEKNOFEST 2026',
  description: 'Tulpar TEKNOFEST projelerimizde yer almak, yeni teknolojiler öğrenmek ve takımımızla birlikte proje geliştirmek için başvuru formu.',
};

export default function KatilPage() {
  return (
    <div className="site-container pt-10 pb-24 space-y-8">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#A8B4C2] hover:text-[#6CC4FF] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Ana Sayfaya Dön</span>
        </Link>
      </div>

      <ApplicationForm />
    </div>
  );
}
