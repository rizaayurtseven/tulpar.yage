import Link from 'next/link';
import { siteData } from '../data/site';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
      <footer className="border-t border-white/10 bg-black pt-16 pb-8">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

            <div className="flex flex-col gap-4">
              <span className="text-2xl font-black tracking-tighter text-white uppercase leading-none">
                {siteData.takim.ad}
              </span>
              <p className="text-sm text-white/50 leading-relaxed max-w-sm mt-2">
                Gazi Üniversitesi bünyesinde yarışmalara hazırlanan AR-GE ve mühendislik takımı.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-xs font-bold text-white/70 tracking-widest uppercase">Sayfalar</h3>
              <ul className="flex flex-col gap-3 text-sm text-white/50">
                <li><Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link></li>
                <li><Link href="/#projeler" className="hover:text-white transition-colors">Projeler</Link></li>
                <li><Link href="/duyurular" className="hover:text-white transition-colors">Duyurular</Link></li>
                <li><Link href="/basvuru" className="hover:text-white transition-colors">Başvuru Formu</Link></li>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-xs font-bold text-white/70 tracking-widest uppercase">İletişim</h3>
              <div className="flex flex-col gap-3 text-sm text-white/50">
                <a href={siteData.iletisim.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
                <a href={siteData.iletisim.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
                <a href={`mailto:${siteData.iletisim.eposta}`} className="hover:text-white transition-colors">{siteData.iletisim.eposta}</a>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-white/10 text-xs text-white/40 text-center md:text-left">
            <p>© {currentYear} {siteData.takim.tamAd}. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
  );
}