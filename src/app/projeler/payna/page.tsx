import { ShaderBackground } from '@/components/waves-shader';
import { LineChart, History, Target, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function PaynaPage() {
    return (
        <div className="relative w-full flex flex-col min-h-screen pt-24 pb-20">
            <div className="fixed inset-0 -z-20 bg-background">
                <ShaderBackground className="h-full w-full opacity-30" />
            </div>
            <div className="fixed inset-0 -z-10 bg-black/80" />

            <div className="site-container relative z-10 flex flex-col gap-16 max-w-5xl">

                {/* GENEL TANITIM */}
                <div className="flex flex-col gap-6">
                    <div className="px-4 py-1.5 border border-white/10 bg-white/5 text-white/70 text-xs font-mono tracking-widest uppercase rounded-sm w-fit">
                        Finansal Teknolojiler
                    </div>
                    <div className="flex items-center gap-6">
                        <LineChart className="w-16 h-16 text-white opacity-80" strokeWidth={1.5} />
                        <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none drop-shadow-lg">
                            TULPAR PAYNA
                        </h1>
                    </div>
                    <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed mt-4">
                        Finansal teknolojiler alanında güvenli dijital işlem, veri analitiği ve yenilikçi yazılım çözümleri geliştiren ekibimizdir. Veri odaklı modern yazılım teknolojileri üzerine yoğunlaşmaktadır.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* TARİHÇE (2026) */}
                    <div className="bg-white/5 border border-white/10 p-8 rounded-sm flex flex-col gap-4">
                        <div className="flex items-center gap-3 text-primary">
                            <History className="w-6 h-6" />
                            <h2 className="text-xl font-bold uppercase tracking-wider">Proje Geçmişi</h2>
                        </div>
                        <p className="text-white/70 font-light leading-relaxed">
                            Ekibimiz, ilk olarak TEKNOFEST 2026 Finansal Teknolojiler (FinTech) kategorisinde yer alarak takım altyapısını kurmuş ve proje lansmanını gerçekleştirerek yarışma tecrübesi edinmiştir.
                        </p>
                    </div>

                    {/* 2027 BAŞVURU */}
                    <div className="bg-primary/5 border border-primary/20 p-8 rounded-sm flex flex-col gap-4">
                        <div className="flex items-center gap-3 text-primary">
                            <Target className="w-6 h-6" />
                            <h2 className="text-xl font-bold uppercase tracking-wider text-white">2027 Sezonu</h2>
                        </div>
                        <p className="text-white/70 font-light leading-relaxed flex-grow">
                            TULPAR Payna, TEKNOFEST 2027'de yenilikçi yazılım çözümlerini daha da ileri taşımayı hedefliyor. FinTech projelerinde yazılımcı veya veri analisti olarak yer almak istersen ekibe katılabilirsin.
                        </p>
                        <Link
                            href="/basvuru"
                            className="inline-flex items-center gap-2 mt-4 text-sm font-bold text-black bg-primary px-6 py-3 uppercase tracking-widest hover:bg-white transition-colors w-fit"
                        >
                            Başvuru Yap <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}