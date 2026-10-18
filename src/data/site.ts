export interface YarismaItem {
    id: string;
    slug: string;
    ad: string;
    kategori: string;
    ozet: string;
    etiketler: string[];
}

export interface PaydasItem {
    id: string;
    ad: string;
    logo: string;
    url: string;
    instagram?: string;
    altAd?: string;
}

export const siteData = {
    takim: {
        ad: "TULPAR",
        tamAd: "Tulpar AR-GE Takımı",
        okul: "Gazi Üniversitesi",
        fakulte: "Teknoloji Fakültesi",
        sezon: "2026"
    },
    yarismalar: [
        {
            id: "tulpar-ulgen",
            slug: "ulgen",
            ad: "TULPAR Ülgen",
            kategori: "Hava Savunma Sistemleri (HSS)",
            ozet: "Çelikkubbe projesi kapsamında otonom hedef tespiti ve dinamik izleme yeteneklerine sahip entegre hava savunma sistemi.",
            etiketler: ["Otonom Takip", "Görüntü İşleme", "Aviyonik"]
        },
        {
            id: "tulpar-roket",
            slug: "roket",
            ad: "TULPAR Roket",
            kategori: "Roket Yarışması",
            ozet: "Özgün aviyonik sistemler, aerodinamik tasarım ve kurtarma sistemleri ile donatılmış orta irtifa test roketi.",
            etiketler: ["Aerodinamik", "Kurtarma Sistemi", "Gömülü Yazılım"]
        },
        {
            id: "tulpar-payna",
            slug: "payna",
            ad: "TULPAR Payna",
            kategori: "Finansal Teknolojiler",
            ozet: "Finansal teknolojiler alanında güvenli işlem, veri analitiği ve yenilikçi yazılım çözümleri.",
            etiketler: ["FinTech", "Veri Analitiği", "Yazılım"]
        }
    ],
    paydaslar: [
        {
            id: "gazi",
            ad: "Gazi Üniversitesi",
            logo: "/images/gazi-universitesi-logo.png",
            url: "https://gazi.edu.tr"
        },
        {
            id: "yage",
            ad: "Gazi YAGE",
            logo: "/images/yage-logo.png",
            url: "https://gaziyage.org",
            altAd: "Yazılım Araştırma ve Geliştirme Topluluğu"
        }
    ],
    iletisim: {
        linkedin: "https://www.linkedin.com/company/teamtulpar",
        instagram: "https://www.instagram.com/gazi.tulparr/",
        eposta: "iletisim@tulparulgen.gazi.edu.tr"
    }
};