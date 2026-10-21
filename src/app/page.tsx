import Image from 'next/image';
import Link from 'next/link';
import { siteData } from '../data/site';
import { ShaderBackground } from '@/components/waves-shader';
import FeatureShaderCards from '@/components/feature-shader-cards';
import { ArrowRight, Calendar, User } from 'lucide-react';

const sonDuyurular = [
    { id: 1, tarih: "12 Ekim 2026", etiket: "TULPAR Ülgen", baslik: "Çelikkubbe HSS Projesi KTR Sonuçları Açıklandı: 96/100", link: "/duyurular" },
    { id: 2, tarih: "28 Eylül 2026", etiket: "Genel", baslik: "2027 Sezonu İçin Mühendislik Kadrosu Başvuruları Başladı", link: "/basvuru" },
    { id: 3, tarih: "15 Eylül 2026", etiket: "TULPAR Payna", baslik: "Finansal Teknolojiler Yarışması Proje Lansmanı Gerçekleşti", link: "/duyurular" }
];

const genelKaptan = {
    isim: "İSİM SOYİSİM",
    rol: "Genel Koordinatör",
    foto: ""
};

const takimKaptanlari = [
    { isim: "İSİM SOYİSİM", rol: "TULPAR Ülgen Kaptanı" },
    { isim: "İSİM SOYİSİM", rol: "TULPAR Roket Kaptanı" },
    { isim: "İSİM SOYİSİM", rol: "TULPAR Payna Kaptanı" },
];

export default function HomePage() {
    return (
        <div className="relative w-full flex flex-col min-h-screen bg-transparent">

            {/* 1. SABİT MONOKROM ARKA PLAN */}
            <div className="fixed inset-0 -z-30">
                <ShaderBackground colorVariant="monochrome" className="h-full w-full opacity-100" />
            </div>

            {/* İnce karartma filtresi */}
            <div className="fixed inset-0 -z-20 bg-black/40 pointer-events-none" />

            {/* 2. HERO İÇİN ÇOK RENKLİ ARKA PLAN */}
            <div
                className="absolute top-0 left-0 w-full h-[120vh] -z-10 pointer-events-none"
                style={{
                    maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
                }}
            >
                <ShaderBackground colorVariant="default" className="h-full w-full opacity-100" />
            </div>

            <div className="relative z-10 flex flex-col w-full">

                {/* 1. HERO BÖLÜMÜ */}
                <section className="relative w-full min-h-[95vh] flex items-center justify-center pt-20 pb-12">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.6)_0%,transparent_60%)] pointer-events-none z-0" />

                    <div className="site-container relative z-10 flex flex-col items-center text-center">
                        <span className="text-white/80 text-xs font-mono tracking-widest uppercase mb-6 px-4 py-1.5 border border-white/20 bg-black/40 backdrop-blur-md rounded-sm shadow-lg">
                            {siteData.takim.okul}
                        </span>
                        <h1 className="text-7xl sm:text-8xl md:text-[11rem] font-black text-white tracking-tighter uppercase leading-[0.85] drop-shadow-2xl">
                            {siteData.takim.ad}
                        </h1>
                        <h2 className="text-xl sm:text-3xl md:text-4xl text-white font-bold tracking-wider mt-8 uppercase drop-shadow-xl">
                            {siteData.takim.tamAd}
                        </h2>
                        <p className="text-base md:text-lg text-white/80 max-w-xl mt-6 font-light tracking-wide leading-relaxed drop-shadow-lg">
                            Hava Savunma, Roket ve Finansal Teknolojiler alanlarında otonom projeler geliştiren mühendislik ekibi.
                        </p>
                    </div>
                </section>

                {/* 2. PROJELER */}
                <section id="projeler" className="w-full py-24 bg-transparent">
                    <div className="site-container">
                        <div className="mb-12 text-center md:text-left">
                            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase">
                                Projeler
                            </h2>
                        </div>
                        <FeatureShaderCards />
                    </div>
                </section>

                {/* 3. DUYURULAR */}
                <section id="duyurular" className="w-full py-24 bg-black/40 backdrop-blur-sm">
                    <div className="site-container">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tighter uppercase">
                                Son Duyurular
                            </h2>
                            <Link href="/duyurular" className="text-sm font-mono text-white/50 hover:text-white uppercase tracking-widest transition-colors flex items-center gap-2">
                                Tümünü Gör <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <div className="flex flex-col gap-3">
                            {sonDuyurular.map((duyuru) => (
                                <Link
                                    href={duyuru.link}
                                    key={duyuru.id}
                                    className="group flex flex-col md:flex-row md:items-center gap-4 md:gap-8 p-5 bg-white/[0.03] border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all rounded-lg"
                                >
                                    <div className="flex items-center gap-2 text-white/40 text-sm font-mono shrink-0 w-36">
                                        <Calendar className="w-4 h-4" />
                                        {duyuru.tarih}
                                    </div>
                                    <div className="px-3 py-1 bg-white/5 text-primary text-[10px] uppercase tracking-widest font-mono rounded-sm w-fit shrink-0">
                                        {duyuru.etiket}
                                    </div>
                                    <h3 className="text-base md:text-lg font-semibold text-white/90 group-hover:text-white transition-colors">
                                        {duyuru.baslik}
                                    </h3>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. EKİP - Temiz ve Hiyerarşik Tasarım */}
                <section id="ekipler" className="w-full py-24 bg-black/20">
                    <div className="site-container">
                        <div className="flex flex-col mb-16 text-center">
                            <h2 className="text-4xl font-black text-white tracking-tighter uppercase">
                                Takım Sorumluları
                            </h2>
                        </div>

                        <div className="flex flex-col items-center gap-16 max-w-4xl mx-auto">

                            {/* Genel Kaptan (Büyük) */}
                            <div className="flex flex-col items-center text-center group">
                                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-white/10 group-hover:border-primary/50 transition-colors overflow-hidden relative bg-black/50 mb-6 flex items-center justify-center">
                                    {genelKaptan.foto ? (
                                        <Image src={genelKaptan.foto} alt={genelKaptan.isim} fill className="object-cover" />
                                    ) : (
                                        <User className="w-12 h-12 text-white/20" strokeWidth={1.5} />
                                    )}
                                </div>
                                <h3 className="text-2xl font-bold text-white uppercase tracking-wide">
                                    {genelKaptan.isim}
                                </h3>
                                <p className="text-primary font-mono text-sm tracking-widest uppercase mt-2">
                                    {genelKaptan.rol}
                                </p>
                            </div>

                            {/* Alt Ekip Kaptanları (Yan yana daha küçük) */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full">
                                {takimKaptanlari.map((uye, i) => (
                                    <div key={i} className="flex flex-col items-center text-center group">
                                        <div className="w-24 h-24 rounded-full border-2 border-white/5 group-hover:border-primary/50 transition-colors overflow-hidden relative bg-black/50 mb-5 flex items-center justify-center">
                                            <User className="w-8 h-8 text-white/20" strokeWidth={1.5} />
                                        </div>
                                        <h4 className="text-lg font-bold text-white uppercase tracking-wide">
                                            {uye.isim}
                                        </h4>
                                        <p className="text-xs text-white/50 mt-1 uppercase tracking-widest font-mono">
                                            {uye.rol}
                                        </p>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                </section>

                {/* 5. PAYDAŞLAR - Boşluklar Azaltıldı */}
                <section id="paydaslar" className="w-full py-20 bg-transparent">
                    <div className="site-container flex flex-col items-center text-center">
                        <h2 className="text-sm font-mono text-white/50 tracking-[0.3em] uppercase mb-12">
                            Destekleyen Kurumlar
                        </h2>

                        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-12 opacity-80 hover:opacity-100 transition-opacity duration-500">
                            {siteData.paydaslar.map((paydas) => (
                                <a
                                    key={paydas.id}
                                    href={paydas.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative w-36 h-20 md:w-44 md:h-24 grayscale brightness-0 invert opacity-60 hover:opacity-100 transition-all duration-300"
                                    aria-label={paydas.ad}
                                >
                                    <Image
                                        src={paydas.logo}
                                        alt={paydas.ad}
                                        fill
                                        className="object-contain"
                                    />
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 6. İLETİŞİM - Sade Kapanış */}
                <section id="iletisim" className="w-full py-24 bg-black/60 backdrop-blur-lg">
                    <div className="site-container flex flex-col items-center text-center">
                        <p className="text-xl font-light text-white/50 mb-6">
                            Sponsorluk Görüşmeleri ve Ortaklıklar İçin
                        </p>
                        <a
                            href={`mailto:${siteData.iletisim.eposta}`}
                            className="group flex items-center justify-center gap-4 text-5xl md:text-7xl font-black text-white hover:text-primary transition-colors"
                        >
                            BİZE YAZIN
                            <ArrowRight className="w-10 h-10 md:w-16 md:h-16 -rotate-45 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300" />
                        </a>
                        <div className="mt-12 text-lg text-white/80 font-mono tracking-widest">
                            {siteData.iletisim.eposta}
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
}