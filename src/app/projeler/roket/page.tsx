import { ShaderBackground } from '@/components/waves-shader';
import { Rocket, Target, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function RoketPage() {
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
                        Orta İrtifa Roket Yarışması
                    </div>
                    <div className="flex items-center gap-6">
                        <Rocket className="w-16 h-16 text-white opacity-80" strokeWidth={1.5} />
                        <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none drop-shadow-lg">
                            TULPAR ROKET
                        </h1>
                    </div>
                    <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed mt-4">
                        Takımımızın yeni organizasyonu olan TULPAR Roket; özgün aviyonik sistemler, aerodinamik gövde tasarımı ve kurtarma sistemleri üzerine çalışarak orta irtifa test roketi geliştiren ekibimizdir.
                    </p>
                </div>

                {/* SADECE 2027 BAŞVURU (GEÇMİŞ YOK) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-primary/5 border border-primary/20 p-8 rounded-sm flex flex-col gap-4 md:col-span-2">
                        <div className="flex items-center gap-3 text-primary">
                            <Target className="w-6 h-6" />
                            <h2 className="text-xl font-bold uppercase tracking-wider text-white">2027 Sezonu Başvuruları</h2>
                        </div>
                        <p className="text-white/70 font-light leading-relaxed max-w-3xl">
                            TULPAR Roket ekibi bu yıl ilk defa TEKNOFEST 2027 roket yarışmalarında boy gösterecek. Sıfırdan bir roket projesi inşa etme deneyimi yaşamak, aviyonik veya mekanik ekiplerimize katılmak istersen başvurunu bekliyoruz.
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