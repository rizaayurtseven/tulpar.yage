/**
 * TULPAR ÜLGEN - MERKEZİ VERİ ERİŞİM KATMANI
 * 
 * Sitenin TEK VE MUTLAK VERİ KAYNAĞI: /data/tulpar-ulgen-dogrulanmis.json
 * Tüm sayfa ve bileşenler doğrudan doğrulanmış veriyi buradan tüketir.
 */

import rawData from './tulpar-ulgen-dogrulanmis.json';

export interface StatItem {
  id: string;
  etiket: string;
  deger: string;
}

export interface MilestoneItem {
  id: number;
  baslik: string;
  tarih: string;
  durum: 'tamamlandi' | 'devam-ediyor' | 'yaklasiyor';
  not: string;
  guncel?: boolean;
}

export interface TeamMember {
  id: string;
  isim: string;
  rol?: string | null;
  bolum?: string | null;
  foto?: string | null;
  biyografi?: string | null;
  linkedin?: string | null;
  github?: string | null;
}

export interface PaydasItem {
  id: string;
  ad: string;
  altAd?: string;
  logo: string;
  url?: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  placeholder?: string;
  alt: string;
  kategori: string;
  baslik?: string;
  tarih?: string;
}

export interface UpdatePost {
  id: string;
  tarih: string;
  baslik: string;
  ozet: string;
  etiket: string;
}

export interface SponsorPackage {
  id: string;
  ad: string;
  kapsam: string[];
  vurgulu?: boolean;
}

export interface SponsorItem {
  id: string;
  ad: string;
  logo: string;
  kategori: string;
  url?: string;
}

export interface SiteData {
  takim: {
    ad: string;
    okul: string;
    fakulte: string;
    bolum: string;
    sezon: string | null;
    kategori: string | null;
    slogan: string | null;
    logoPath: string | null;
  };
  hero: {
    gorsel: string | null;
  };
  metrikler: StatItem[] | null;
  proje: {
    ad: string | null;
    ozet: string | null;
    problem: string | null;
    cozum: string | null;
    teknikOzellikler: Array<{ id: string; parametre: string; deger: string; aciklama?: string }>;
    teknolojiler: string[];
    galeri: Array<{ id: string; url: string; baslik?: string; aciklama?: string }>;
  } | null;
  yolHaritasi: MilestoneItem[];
  ekip: {
    durum: string;
    danisman: TeamMember | null;
    kaptan: TeamMember | null;
    uyeler: string[];
  };
  paydaslar: PaydasItem[];
  galeri: GalleryItem[];
  gelismeler: UpdatePost[];
  sponsorluk: {
    paketler: SponsorPackage[];
    mevcutSponsorlar: SponsorItem[];
    dosyaYolu: string | null;
    nedenSponsor: Array<{ baslik: string; aciklama: string }>;
  };
  iletisim: {
    eposta: string | null;
    telefon: string | null;
    whatsapp: string | null;
    konum: string | null;
    linkedin: string | null;
    instagram: string | null;
    youtube: string | null;
    github: string | null;
    navigasyon: Array<{ baslik: string; href: string }>;
  };
}

// Navigasyon sadece dolu/aktif sayfa ve bölümlerden oluşur
const navigasyon = [
  { baslik: 'Giriş', href: '/' },
  { baslik: 'Ekibimiz', href: '/#ekip' },
  { baslik: 'Paydaşlarımız', href: '/#paydaslar' },
];

export const siteData: SiteData = {
  takim: rawData.takim,
  hero: rawData.hero,
  metrikler: rawData.metrikler as StatItem[] | null,
  proje: rawData.proje as SiteData['proje'],
  yolHaritasi: (rawData.yolHaritasi || []) as MilestoneItem[],
  ekip: {
    durum: rawData.ekip.durum,
    danisman: rawData.ekip.danisman as TeamMember | null,
    kaptan: rawData.ekip.kaptan as TeamMember | null,
    uyeler: rawData.ekip.uyeler,
  },
  paydaslar: ((rawData as any).paydaslar || []) as PaydasItem[],
  galeri: (rawData.galeri || []) as GalleryItem[],
  gelismeler: (rawData.gelismeler || []) as UpdatePost[],
  sponsorluk: {
    paketler: (rawData.sponsorluk?.paketler || []) as SponsorPackage[],
    mevcutSponsorlar: (rawData.sponsorluk?.mevcutSponsorlar || []) as SponsorItem[],
    dosyaYolu: rawData.sponsorluk?.dosyaYolu || null,
    nedenSponsor: (rawData.sponsorluk?.nedenSponsor || []) as Array<{ baslik: string; aciklama: string }>,
  },
  iletisim: {
    ...rawData.iletisim,
    navigasyon,
  }
};

export default siteData;
