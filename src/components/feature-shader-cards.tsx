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
        if (k.includes("hava") || k.includes("ülgen")) return <Shield className="w-10 h-10 text-white" strokeWidth={1.5} />;
        if (k.includes("roket")) return <Rocket className="w-10 h-10 text-white" strokeWidth={1.5} />;
        if (k.includes("finans") || k.includes("payna")) return <LineChart className="w-10 h-10 text-white" strokeWidth={1.5} />;
        return <Shield className="w-10 h-10 text-white" strokeWidth={1.5} />;
    }

    const getTeamUrl = (id: string) => {
        if (id.includes("ulgen")) return "/projeler/ulgen";
        if (id.includes("roket")) return "/projeler/roket";
        if (id.includes("payna")) return "/projeler/payna";
        return "/#";
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {siteData.yarismalar.map((proje, index) => {
                const shaderConfig = getShaderConfig(index)
                return (
                    <Link href={getTeamUrl(proje.id)} key={proje.id} className="relative h-[24rem] group block cursor-pointer">
                        <div className="absolute inset-0 rounded-xl overflow-hidden border border-white/10">
                            <Warp style={{ height: "100%", width: "100%" }} {...shaderConfig} scale={1} rotation={0} speed={0.4} />
                        </div>
                        <div className="relative z-10 p-8 rounded-xl h-full flex flex-col bg-black/40 hover:bg-black/20 transition-all duration-500 border border-white/5">
                            <div className="mb-6 filter drop-shadow-lg opacity-80 group-hover:opacity-100 transition-opacity">
                                {getIcon(proje.kategori)}
                            </div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="text-[10px] font-mono text-white/50 tracking-widest uppercase border border-white/10 px-2 py-1 bg-black/50">
                                  {proje.kategori}
                                </span>
                            </div>
                            <h3 className="text-2xl font-black mb-4 text-white uppercase tracking-tight group-hover:text-primary transition-colors">
                                {proje.ad}
                            </h3>
                            <p className="leading-relaxed flex-grow text-white/70 font-light text-sm">
                                {proje.ozet}
                            </p>
                            <div className="mt-6 flex flex-wrap gap-2">
                                {proje.etiketler.map(etiket => (
                                    <span key={etiket} className="text-[10px] text-white/40 uppercase tracking-widest">#{etiket}</span>
                                ))}
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}