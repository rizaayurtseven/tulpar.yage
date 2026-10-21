"use client"

import { Warp } from "@paper-design/shaders-react"
import { Shield, Rocket, LineChart } from "lucide-react"
import { siteData } from "../data/site"
import Link from "next/link"

export default function FeatureShaderCards() {
    const getShaderConfig = (index: number) => {
        const configs = [
            { proportion: 0.3, softness: 0.8, distortion: 0.15, swirl: 0.6, swirlIterations: 8, shape: "checks" as const, shapeScale: 0.08, colors: ["hsl(0, 0%, 5%)", "hsl(0, 0%, 15%)", "hsl(0, 0%, 8%)", "hsl(0, 0%, 12%)"] },
            { proportion: 0.4, softness: 1.2, distortion: 0.2, swirl: 0.9, swirlIterations: 12, shape: "dots" as const, shapeScale: 0.12, colors: ["hsl(0, 0%, 8%)", "hsl(0, 0%, 18%)", "hsl(0, 0%, 12%)", "hsl(0, 0%, 20%)"] },
            { proportion: 0.2, softness: 1.0, distortion: 0.1, swirl: 0.5, swirlIterations: 6, shape: "checks" as const, shapeScale: 0.15, colors: ["hsl(0, 0%, 4%)", "hsl(0, 0%, 14%)", "hsl(0, 0%, 6%)", "hsl(0, 0%, 16%)"] }
        ]
        return configs[index % configs.length]
    }

    const getIcon = (kategori: string) => {
        const k = kategori.toLowerCase();
        if (k.includes("hava") || k.includes("ülgen")) return <Shield className="w-8 h-8 text-white" strokeWidth={1.5} />;
        if (k.includes("roket")) return <Rocket className="w-8 h-8 text-white" strokeWidth={1.5} />;
        if (k.includes("finans") || k.includes("payna")) return <LineChart className="w-8 h-8 text-white" strokeWidth={1.5} />;
        return <Shield className="w-8 h-8 text-white" strokeWidth={1.5} />;
    }

    const getYarismaAdi = (id: string) => {
        if (id.includes("ulgen")) return "Çelikkubbe Hava Savunma Sistemleri Yarışması";
        if (id.includes("roket")) return "Orta İrtifa Roket Yarışması";
        if (id.includes("payna")) return "Finansal Teknolojiler Yarışması";
        return "";
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {siteData.yarismalar.map((proje, index) => {
                const shaderConfig = getShaderConfig(index)
                return (
                    <Link
                        href={`/projeler/${proje.slug}`}
                        key={proje.id}
                        className="group relative flex flex-col min-h-[26rem] bg-black border border-white/10 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 rounded-xl overflow-hidden"
                    >
                        {/* Arka Plan Shader */}
                        <div className="absolute inset-0">
                            <Warp style={{ height: "100%", width: "100%" }} {...shaderConfig} scale={1} rotation={0} speed={0.5} />
                        </div>

                        {/* Metin okunaklılığı için karartma katmanı */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/80 pointer-events-none" />

                        {/* İçerik */}
                        <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                            {/* Üst Kısım: İkon */}
                            <div className="opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 bg-black/30 p-3 rounded-lg border border-white/5 backdrop-blur-sm w-fit">
                                {getIcon(proje.kategori)}
                            </div>

                            {/* Alt Kısım: Hiyerarşik Metinler */}
                            <div className="mt-auto pt-8 flex flex-col">
                                <span className="text-primary font-mono text-xs font-bold tracking-widest uppercase mb-3 drop-shadow-md leading-relaxed">
                                    {getYarismaAdi(proje.id)}
                                </span>
                                <h3 className="text-3xl font-black mb-3 text-white uppercase tracking-tight drop-shadow-lg">
                                    {proje.ad}
                                </h3>
                                <p className="text-white/70 font-light text-sm leading-relaxed line-clamp-3 drop-shadow-md">
                                    {proje.ozet}
                                </p>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}