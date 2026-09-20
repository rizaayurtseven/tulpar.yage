/**
 * TULPAR - MERKEZİ VERİ ERİŞİM KATMANI
 * 
 * Sitenin TEK VE MUTLAK VERİ KAYNAĞI: /data/tulpar-ulgen-dogrulanmis.json
 */

import rawData from './tulpar-ulgen-dogrulanmis.json';

export interface YarismaItem {
  id: string;
  ad: string;
  kategori: string;
  ozet: string;
  etiketler: string[];
  renk?: 'cyan' | 'amber' | string;
}

export interface PaydasItem {
  id: string;
  ad: string;
  altAd?: string;
  logo: string;
  url?: string;
  instagram?: string;
  linktree?: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  placeholder?: string;
  alt: string;
  baslik?: string;
  tarih?: string;
  kategori?: string;
}

export interface SiteData {
  takim: {
    ad: string;
    tamAd?: string;
    okul: string;
    fakulte: string;
    bolum: string;
    sezon: string | null;
    logoPath: string | null;
  };
  yarismalar: YarismaItem[];
  paydaslar: PaydasItem[];
  katilim: {
    baslik: string;
    aciklama: string;
    googleFormsUrl: string;
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

// Navigasyon
const navigasyon = [
  { baslik: 'Giriş', href: '/' },
  { baslik: 'Yarışmalar', href: '/#projeler' },
  { baslik: 'Paydaşlarımız', href: '/#paydaslar' },
  { baslik: 'Aramıza Katılın', href: '/#katil' },
];

export const siteData: SiteData = {
  takim: rawData.takim,
  yarismalar: (rawData.yarismalar || []) as YarismaItem[],
  paydaslar: (rawData.paydaslar || []) as PaydasItem[],
  katilim: rawData.katilim,
  iletisim: {
    ...rawData.iletisim,
    navigasyon,
  },
};

export default siteData;
