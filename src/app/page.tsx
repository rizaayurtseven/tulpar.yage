import Image from 'next/image';
import { siteData } from '../data/site';
import { ShaderBackground } from '@/components/waves-shader';
import FeatureShaderCards from '@/components/feature-shader-cards';
import { Mail, ArrowRight } from 'lucide-react';

// Şimdilik takım üyeleri JSON'da olmadığı için buraya bir mockup veri ekliyoruz.
// Daha sonra bunu JSON'dan çekecek şekilde ayarlayabiliriz.
const takimUyeleri = [
    { isim: "Ad Soyad", rol: "Takım Kaptanı", birim: "Yazılım" },
    { isim: "Ad Soyad", rol: "Aviyonik Sorumlusu", birim: "Elektronik" },
    { isim: "Ad Soyad", rol: "Yapısal Tasarım", birim: "Mekanik" },
    { isim: "Ad Soyad", rol: "Algoritma Geliştirici", birim: "Yazılım" },
];

export default function HomePage() {
    return (
        <div className="relative w-full flex flex-col">

            <div className="fixed inset-0 -z-20 bg-background">
                <ShaderBackground className="h-full w-full" />
            </div>
            <div className="fixed inset-0 -z-10 bg-black/70" />

            <div className="relative z-10 flex flex-col w-full">

                {/* HERO */}
                <section className="relative w-full min-h-screen flex items-center justify-center pt-20 pb-10">
                    <div className="site-container flex flex-col items-center text-center">
                        <div className="px-4 py-1.5 border border-white/20 bg-black/40 backdrop-blur-md text-white/80 text-xs font-mono tracking-[0.2em] uppercase mb-8">
                            {siteData.takim.okul}
                        </div>
                        <h1 className="text-7xl sm:text-8xl md:text-[11rem] font-black text-white tracking-tighter uppercase leading-[0.85] drop-shadow-2xl">
                            {siteData.takim.ad}
                        </h1>
                        <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-light tracking-widest mt-8 drop-shadow-lg">
                            {siteData.takim.tamAd}
                        </p>
                        <p className="text-sm md:text-base text-white/60 max-w-xl mt-4 font-normal tracking-wide drop-shadow-md">
                            Hava Savunma ve Orta İrtifa Roket sistemleri geliştiren mühendislik ekibi.
                        </p>
                    </div>
                </section>

                {/* PROJELER (Akışkan Shader Kartları) */}
                <section id="projeler" className="w-full py-32 border-t border-white/10 bg-black/20 backdrop-blur-sm">
                    <div className="site-container">
                        <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase mb-16">
                            Projeler
                        </h2>
                        <FeatureShaderCards />
                    </div>
                </section>

                {/* EKİPLER (Kişi Kartları) */}
                <section id="ekipler" className="w-full py-32 border-t border-white/10 bg-black/60 backdrop-blur-md">
                    <div className="site-container">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase">
                                Mühendislik<br />Kadrosu
                            </h2>
                            <p className="text-white/50 max-w-sm text-sm font-light">
                                Disiplinler arası çalışan, algoritma, aviyonik ve mekanik alanlarında uzmanlaşmış ana operasyon ekibi.
                            </p>
                        </div>

                        {/* Kişi Grid Tasarımı */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {takimUyeleri.map((uye, i) => (
                                <div key={i} className="group relative overflow-hidden border border-white/10 bg-black">
                                    {/* Fotoğraf Placeholder (Gerçek fotoğraflar eklenene kadar monokrom doku) */}
                                    <div className="aspect-[3/4] bg-white/5 relative grayscale group-hover:grayscale-0 transition-all duration-500">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                                        {/* İleride buraya Image bileşeni gelecek */}
                                    </div>

                                    <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform">
                    <span className="text-[10px] font-mono text-white/50 tracking-widest uppercase mb-1 block">
                      {uye.birim}
                    </span>
                                        <h3 className="text-lg font-bold text-white uppercase tracking-wide">
                                            {uye.isim}
                                        </h3>
                                        <p className="text-xs text-white/70 mt-1">
                                            {uye.rol}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* PAYDAŞLAR (Merkezi Dev Logolar) */}
                <section id="paydaslar" className="w-full py-40 border-t border-white/10 bg-black/40 backdrop-blur-sm">
                    <div className="site-container flex flex-col items-center text-center">
                        <h2 className="text-sm font-mono text-white/40 tracking-[0.3em] uppercase mb-16">
                            Destekleyen Kurumlar
                        </h2>

                        <div className="flex flex-wrap justify-center items-center gap-16 md:gap-32">
                            {siteData.paydaslar.map((paydas) => (
                                <a
                                    key={paydas.id}
                                    href={paydas.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative flex flex-col items-center opacity-60 hover:opacity-100 transition-opacity duration-300"
                                >
                                    <div className="relative w-32 h-32 md:w-48 md:h-48 mb-6 grayscale brightness-0 invert">
                                        <Image
                                            src={paydas.logo}
                                            alt={paydas.ad}
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <span className="text-white font-bold tracking-widest uppercase text-sm md:text-base">
                    {paydas.ad}
                  </span>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>

                {/* İLETİŞİM (Minimalist & Mail Odaklı) */}
                <section id="iletisim" className="w-full py-40 border-t border-white/10 bg-black">
                    <div className="site-container flex flex-col items-center text-center">

                        <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mb-10 text-white/80">
                            <Mail className="w-6 h-6" />
                        </div>

                        <h2 className="text-3xl md:text-4xl font-light text-white mb-6">
                            Bir projeniz mi var?
                        </h2>

                        <a
                            href="mailto:iletisim@tulparulgen.gazi.edu.tr"
                            className="group text-4xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter flex items-center gap-4 hover:text-white/80 transition-colors break-all"
                        >
                            BİZE YAZIN
                            <ArrowRight className="w-10 h-10 md:w-16 md:h-16 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                        </a>

                        <div className="mt-20 text-white/40 font-mono text-sm tracking-widest uppercase">
                            iletisim@tulparulgen.gazi.edu.tr
                        </div>

                    </div>
                </section>

            </div>
        </div>
    );
}