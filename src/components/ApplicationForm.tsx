'use client';

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Send, 
  Loader2, 
  AlertCircle, 
  Sparkles, 
  Check, 
  User, 
  GraduationCap, 
  Phone, 
  Mail, 
  Layers, 
  Award, 
  Cpu, 
  Compass, 
  MessageSquare,
  RotateCcw
} from 'lucide-react';

const SINIF_OPTIONS = ['Hazırlık', '1', '2', '3', '4', 'Diğer'];

const ALANLAR_OPTIONS = [
  'Yazılım',
  'Yapay Zeka / Görüntü İşleme',
  'Elektronik',
  'Gömülü Sistemler',
  'Mekanik / CAD Tasarım',
  'Kontrol ve Otomasyon',
  'Tasarım / Sosyal Medya',
  'Teknik Raporlama',
  'Organizasyon / Sponsorluk',
  'Henüz bilmiyorum, keşfetmek istiyorum',
  'Diğer',
];

const DENEYIM_OPTIONS = [
  { id: 'none', label: 'Hiç olmadı', desc: 'Sıfırdan öğrenmek ve kendimi geliştirmek istiyorum.' },
  { id: 'basic', label: 'Biraz bilgim var', desc: 'Temel kavramlara ve araçlara aşinayım.' },
  { id: 'self', label: 'Kendi kendime çalışmalar yaptım', desc: 'Bireysel denemeler, kurslar ve küçük projeler yaptım.' },
  { id: 'projects', label: 'Projelerde görev aldım', desc: 'Topluluk veya okul projelerinde aktif rol aldım.' },
  { id: 'competitions', label: 'Yarışma / TEKNOFEST deneyimim var', desc: 'Daha önce yarışmalarda takım tecrübesi edindim.' },
];

const AKTIF_GOREV_OPTIONS = [
  { id: 'yes', label: 'Evet', desc: 'Takım çalışmalarında aktif olarak yer almak ve sorumluluk üstlenmek istiyorum.' },
  { id: 'after_meeting', label: 'Ekipleri tanıdıktan sonra karar vermek istiyorum', desc: 'Toplantı ve tanışma süreçlerinden sonra netleştirmek isterim.' },
  { id: 'updates_only', label: 'Şimdilik sadece etkinliklerden haberdar olmak istiyorum', desc: 'Duyuruları ve gelişmeleri takip etmek istiyorum.' },
];

interface FormData {
  adSoyad: string;
  bolum: string;
  sinif: string;
  telefon: string;
  eposta: string;
  alanlar: string[];
  digerAlan: string;
  deneyim: string;
  teknolojiler: string;
  aktifGorev: string;
  eklemekIstedikleriniz: string;
}

const INITIAL_FORM: FormData = {
  adSoyad: '',
  bolum: '',
  sinif: '',
  telefon: '',
  eposta: '',
  alanlar: [],
  digerAlan: '',
  deneyim: '',
  teknolojiler: '',
  aktifGorev: '',
  eklemekIstedikleriniz: '',
};

export default function ApplicationForm() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const toggleAlan = (alan: string) => {
    setFormData((prev) => {
      const exists = prev.alanlar.includes(alan);
      if (exists) {
        return {
          ...prev,
          alanlar: prev.alanlar.filter((a) => a !== alan),
          digerAlan: alan === 'Diğer' ? '' : prev.digerAlan,
        };
      } else {
        return {
          ...prev,
          alanlar: [...prev.alanlar, alan],
        };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Validation
    if (!formData.adSoyad.trim()) {
      setErrorMessage('Lütfen Ad Soyad alanını doldurunuz.');
      return;
    }
    if (!formData.bolum.trim()) {
      setErrorMessage('Lütfen Bölümünüzü belirtiniz.');
      return;
    }
    if (!formData.sinif) {
      setErrorMessage('Lütfen Kaçıncı Sınıfta olduğunuzu seçiniz.');
      return;
    }
    if (!formData.telefon.trim()) {
      setErrorMessage('Lütfen Telefon numaranızı giriniz.');
      return;
    }
    if (!formData.eposta.trim()) {
      setErrorMessage('Lütfen E-posta adresinizi giriniz.');
      return;
    }
    if (formData.alanlar.length === 0) {
      setErrorMessage('Lütfen ilgilendiğiniz en az bir alanı seçiniz.');
      return;
    }
    if (formData.alanlar.includes('Diğer') && !formData.digerAlan.trim()) {
      setErrorMessage('Lütfen "Diğer" seçeneği için ilgilendiğiniz alanı yazınız.');
      return;
    }
    if (!formData.deneyim) {
      setErrorMessage('Lütfen bu alanlardaki deneyim durumunuzu seçiniz.');
      return;
    }
    if (!formData.aktifGorev) {
      setErrorMessage('Lütfen takımda aktif görev alma durumunuzu seçiniz.');
      return;
    }

    setStatus('loading');

    try {
      const res = await fetch('/api/katil', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
      } else {
        const errorData = await res.json().catch(() => ({}));
        setErrorMessage(errorData.error || 'Başvuru gönderilirken bir hata oluştu. Lütfen tekrar deneyiniz.');
        setStatus('error');
      }
    } catch {
      setErrorMessage('Sunucuya ulaşılamadı. Lütfen internet bağlantınızı kontrol edip tekrar deneyiniz.');
      setStatus('error');
    }
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM);
    setStatus('idle');
    setErrorMessage('');
  };

  if (status === 'success') {
    return (
      <div className="w-full max-w-3xl mx-auto rounded-3xl bg-[#0B1826] border border-[#1B3A52] p-8 sm:p-14 text-center space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#42A5F5]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#6CC4FF]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center space-y-4">
          <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-2xl bg-[#42A5F5]/10 border border-[#42A5F5]/30 flex items-center justify-center text-[#42A5F5]">
            <CheckCircle2 className="h-8 w-8 sm:h-10 sm:w-10" />
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-[#6CC4FF] bg-[#07111C] border border-[#1B3A52]">
            <Sparkles className="h-3.5 w-3.5" />
            BAŞVURUNUZ ALINDI
          </span>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#F2F6FA] tracking-tight text-center">
            Aday Havuzumuza Hoş Geldin, {formData.adSoyad.split(' ')[0]}! 🚀
          </h3>

          <p className="text-sm sm:text-base md:text-lg text-[#A8B4C2] leading-relaxed max-w-xl font-normal text-center">
            Tulpar TEKNOFEST takımımıza gösterdiğin ilgi için teşekkür ederiz. Başvurun başarıyla kaydedildi; ekibimiz başvurunu değerlendirdikten sonra belirttiğin iletişim bilgileri üzerinden seninle iletişime geçecektir.
          </p>

          <div className="w-full max-w-md bg-[#07111C] border border-[#1B3A52] rounded-xl p-3.5 sm:p-4 text-left space-y-2 text-xs sm:text-sm mt-2">
            <div className="flex justify-between items-center gap-2 border-b border-[#1B3A52]/60 pb-1.5">
              <span className="text-[#A8B4C2]/70 shrink-0">Bölüm & Sınıf:</span>
              <span className="font-semibold text-[#F2F6FA] truncate text-right">{formData.bolum} ({formData.sinif}. Sınıf)</span>
            </div>
            <div className="flex justify-between items-center gap-2 border-b border-[#1B3A52]/60 pb-1.5">
              <span className="text-[#A8B4C2]/70 shrink-0">İletişim:</span>
              <span className="font-semibold text-[#F2F6FA] truncate text-right">{formData.eposta}</span>
            </div>
            <div className="flex justify-between items-center gap-2 pt-0.5">
              <span className="text-[#A8B4C2]/70 shrink-0">İlgi Alanları:</span>
              <span className="font-semibold text-[#6CC4FF] text-right truncate max-w-[60%]">
                {formData.alanlar.join(', ')}
              </span>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleReset}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-[#102235] hover:bg-[#07111C] text-[#F2F6FA] border border-[#1B3A52] transition-colors w-full sm:w-auto"
            >
              <RotateCcw className="h-4 w-4 text-[#42A5F5]" />
              <span>Yeni Başvuru Yap</span>
            </button>
            <a
              href="/#projeler"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-[#42A5F5] hover:bg-[#6CC4FF] text-[#07111C] transition-colors w-full sm:w-auto"
            >
              <span>Projelerimizi İncele</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl sm:rounded-3xl bg-[#0B1826] border border-[#1B3A52] p-4 sm:p-8 lg:p-12 shadow-2xl relative overflow-hidden">
      {/* Arka Plan Işık Efektleri */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#42A5F5]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#6CC4FF]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Form Başlık & Açıklama */}
      <div className="relative z-10 space-y-3 sm:space-y-4 mb-8 sm:mb-10 pb-6 sm:pb-8 border-b border-[#1B3A52]">
        <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-xs font-mono uppercase tracking-wider text-[#6CC4FF] bg-[#07111C] border border-[#1B3A52] max-w-full flex-wrap">
          <span className="h-2 w-2 rounded-full bg-[#42A5F5] shrink-0" />
          <span>TEKNOFEST 2026 • ADAY HAVUZU</span>
        </div>

        <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#F2F6FA] tracking-tight">
          TEKNOFEST Takım Üyesi İlgi Formu
        </h3>

        <p className="text-sm sm:text-base md:text-lg text-[#A8B4C2] leading-relaxed max-w-2xl font-normal">
          TEKNOFEST projelerimizde yer almak, yeni teknolojiler öğrenmek ve takımımızla birlikte proje geliştirmek ister misin?
          Formu doldurarak aday havuzumuza katılabilirsin. <span className="text-[#6CC4FF] font-semibold">Deneyim şart değil! 🚀</span>
        </p>
      </div>

      {/* Form Gövdesi */}
      <form onSubmit={handleSubmit} className="relative z-10 space-y-8 sm:space-y-10">
        {/* Hata Bildirimi */}
        {errorMessage && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-start gap-3 animate-fade-in">
            <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* 1. BÖLÜM: Kişisel & Akademik Bilgiler */}
        <div className="space-y-6">
          <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-[#42A5F5] border-b border-[#1B3A52]/70 pb-2">
            <User className="h-4 w-4" />
            <span>01 / Kişisel ve Akademik Bilgiler</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Ad Soyad */}
            <div className="space-y-2 sm:col-span-2">
              <label className="text-sm font-semibold text-[#F2F6FA] flex items-center justify-between">
                <span>Ad Soyad <span className="text-[#42A5F5]">*</span></span>
                <span className="text-xs text-[#A8B4C2] font-normal font-mono">Zorunlu</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Adınız ve Soyadınız"
                  value={formData.adSoyad}
                  onChange={(e) => setFormData({ ...formData, adSoyad: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-[#07111C] border border-[#1B3A52] text-[#F2F6FA] placeholder-[#A8B4C2]/40 focus:outline-none focus:border-[#42A5F5] focus:ring-1 focus:ring-[#42A5F5] transition-colors text-sm sm:text-base"
                />
              </div>
            </div>

            {/* Bölümün Nedir? */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#F2F6FA] flex items-center justify-between">
                <span>Bölümün nedir? <span className="text-[#42A5F5]">*</span></span>
                <span className="text-xs text-[#A8B4C2] font-normal font-mono">Zorunlu</span>
              </label>
              <input
                type="text"
                required
                placeholder="Örn: Bilgisayar Mühendisliği"
                value={formData.bolum}
                onChange={(e) => setFormData({ ...formData, bolum: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl bg-[#07111C] border border-[#1B3A52] text-[#F2F6FA] placeholder-[#A8B4C2]/40 focus:outline-none focus:border-[#42A5F5] focus:ring-1 focus:ring-[#42A5F5] transition-colors text-sm sm:text-base"
              />
            </div>

            {/* Kaçıncı Sınıftasın? */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#F2F6FA] flex items-center justify-between">
                <span>Kaçıncı sınıftasın? <span className="text-[#42A5F5]">*</span></span>
                <span className="text-xs text-[#A8B4C2] font-normal font-mono">Zorunlu</span>
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {SINIF_OPTIONS.map((opt) => {
                  const isSelected = formData.sinif === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setFormData({ ...formData, sinif: opt })}
                      className={`py-3 px-2 text-xs sm:text-sm font-semibold rounded-xl border text-center transition-all flex items-center justify-center min-h-[44px] ${
                        isSelected
                          ? 'bg-[#42A5F5]/20 border-[#42A5F5] text-[#6CC4FF] ring-1 ring-[#42A5F5]'
                          : 'bg-[#07111C] border-[#1B3A52] text-[#A8B4C2] hover:text-[#F2F6FA] hover:border-[#42A5F5]/50'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Telefon Numarası */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#F2F6FA] flex items-center justify-between">
                <span>Telefon numarası <span className="text-[#42A5F5]">*</span></span>
                <span className="text-xs text-[#A8B4C2] font-normal font-mono">Zorunlu</span>
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  placeholder="05XX XXX XX XX"
                  value={formData.telefon}
                  onChange={(e) => setFormData({ ...formData, telefon: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-[#07111C] border border-[#1B3A52] text-[#F2F6FA] placeholder-[#A8B4C2]/40 focus:outline-none focus:border-[#42A5F5] focus:ring-1 focus:ring-[#42A5F5] transition-colors text-sm sm:text-base min-h-[48px]"
                />
              </div>
            </div>

            {/* E-posta Adresi */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#F2F6FA] flex items-center justify-between">
                <span>E-posta adresi <span className="text-[#42A5F5]">*</span></span>
                <span className="text-xs text-[#A8B4C2] font-normal font-mono">Zorunlu</span>
              </label>
              <input
                type="email"
                required
                placeholder="ornek@gazi.edu.tr veya ornek@gmail.com"
                value={formData.eposta}
                onChange={(e) => setFormData({ ...formData, eposta: e.target.value })}
                className="w-full px-4 py-3.5 rounded-xl bg-[#07111C] border border-[#1B3A52] text-[#F2F6FA] placeholder-[#A8B4C2]/40 focus:outline-none focus:border-[#42A5F5] focus:ring-1 focus:ring-[#42A5F5] transition-colors text-sm sm:text-base min-h-[48px]"
              />
            </div>
          </div>
        </div>

        {/* 2. BÖLÜM: İlgi Alanları & Deneyim */}
        <div className="space-y-6">
          <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-[#42A5F5] border-b border-[#1B3A52]/70 pb-2">
            <Layers className="h-4 w-4" />
            <span>02 / İlgi Alanları ve Yetkinlikler</span>
          </div>

          {/* Hangi Alanlarla İlgileniyorsun? */}
          <div className="space-y-3">
            <div>
              <label className="text-sm sm:text-base font-semibold text-[#F2F6FA] block">
                Hangi alanlarla ilgileniyorsun? <span className="text-[#42A5F5]">*</span>
              </label>
              <p className="text-xs text-[#A8B4C2] mt-0.5 font-normal">
                Birden fazla seçilebilir. İlgilendiğin veya öğrenmek istediğin tüm alanları işaretleyebilirsin.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-2.5 pt-1">
              {ALANLAR_OPTIONS.map((alan) => {
                const isSelected = formData.alanlar.includes(alan);
                return (
                  <button
                    key={alan}
                    type="button"
                    onClick={() => toggleAlan(alan)}
                    className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium border text-left transition-all max-w-full min-h-[44px] ${
                      isSelected
                        ? 'bg-[#42A5F5]/20 border-[#42A5F5] text-[#6CC4FF] shadow-sm shadow-[#42A5F5]/10'
                        : 'bg-[#07111C] border-[#1B3A52] text-[#A8B4C2] hover:text-[#F2F6FA] hover:border-[#42A5F5]/40'
                    }`}
                  >
                    <span className={`h-4 w-4 shrink-0 rounded-md flex items-center justify-center border text-[10px] ${
                      isSelected
                        ? 'bg-[#42A5F5] border-[#42A5F5] text-[#07111C] font-bold'
                        : 'border-[#1B3A52] bg-[#0B1826]'
                    }`}>
                      {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                    </span>
                    <span className="break-words leading-tight">{alan}</span>
                  </button>
                );
              })}
            </div>

            {/* "Diğer" seçildiğinde açılan alan */}
            {formData.alanlar.includes('Diğer') && (
              <div className="pt-2 animate-fade-in">
                <input
                  type="text"
                  placeholder="İlgilendiğin diğer alanı belirtiniz..."
                  value={formData.digerAlan}
                  onChange={(e) => setFormData({ ...formData, digerAlan: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#07111C] border border-[#42A5F5]/60 text-[#F2F6FA] placeholder-[#A8B4C2]/40 focus:outline-none focus:border-[#42A5F5] text-sm min-h-[48px]"
                />
              </div>
            )}
          </div>

          {/* Bu Alanlarda Daha Önce Deneyimin Oldu mu? */}
          <div className="space-y-3 pt-2">
            <div>
              <label className="text-sm sm:text-base font-semibold text-[#F2F6FA] block">
                Bu alanlarda daha önce bir deneyimin oldu mu? <span className="text-[#42A5F5]">*</span>
              </label>
              <p className="text-xs text-[#A8B4C2] mt-0.5 font-normal">
                Durumunu en iyi yansıtan seçeneği işaretle. (Deneyim şart değildir)
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {DENEYIM_OPTIONS.map((item) => {
                const isSelected = formData.deneyim === item.label;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, deneyim: item.label })}
                    className={`p-3.5 sm:p-4 rounded-xl border text-left flex items-start gap-3 transition-all min-h-[52px] ${
                      isSelected
                        ? 'bg-[#42A5F5]/15 border-[#42A5F5] text-[#F2F6FA] ring-1 ring-[#42A5F5]/40'
                        : 'bg-[#07111C] border-[#1B3A52] text-[#A8B4C2] hover:text-[#F2F6FA] hover:border-[#42A5F5]/40'
                    }`}
                  >
                    <span className={`h-4 w-4 rounded-full border mt-0.5 shrink-0 flex items-center justify-center ${
                      isSelected ? 'border-[#42A5F5] bg-[#42A5F5]' : 'border-[#1B3A52] bg-[#0B1826]'
                    }`}>
                      {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-[#07111C]" />}
                    </span>
                    <div className="space-y-0.5">
                      <span className="text-xs sm:text-sm font-semibold block text-[#F2F6FA]">{item.label}</span>
                      <span className="text-[11px] sm:text-xs text-[#A8B4C2] block leading-relaxed">{item.desc}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Varsa Bildiğin Teknolojiler / Programlar */}
          <div className="space-y-2 pt-2">
            <label className="text-sm font-semibold text-[#F2F6FA] flex items-center justify-between">
              <span>Varsa bildiğin teknolojiler / programlar nelerdir?</span>
              <span className="text-xs text-[#A8B4C2] font-mono">Opsiyonel</span>
            </label>
            <input
              type="text"
              placeholder="Örn: Python, Arduino, SolidWorks, C++, React, STM32..."
              value={formData.teknolojiler}
              onChange={(e) => setFormData({ ...formData, teknolojiler: e.target.value })}
              className="w-full px-4 py-3.5 rounded-xl bg-[#07111C] border border-[#1B3A52] text-[#F2F6FA] placeholder-[#A8B4C2]/40 focus:outline-none focus:border-[#42A5F5] focus:ring-1 focus:ring-[#42A5F5] transition-colors text-sm sm:text-base min-h-[48px]"
            />
          </div>
        </div>

        {/* 3. BÖLÜM: Takım Katılımı & Ek Notlar */}
        <div className="space-y-6">
          <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-[#42A5F5] border-b border-[#1B3A52]/70 pb-2">
            <Compass className="h-4 w-4" />
            <span>03 / Takım Katılımı ve Notlar</span>
          </div>

          {/* Aktif Görev Alma İsteği */}
          <div className="space-y-3">
            <div>
              <label className="text-sm sm:text-base font-semibold text-[#F2F6FA] block">
                TEKNOFEST takımında aktif olarak görev almak ister misin? <span className="text-[#42A5F5]">*</span>
              </label>
            </div>

            <div className="space-y-2.5 pt-1">
              {AKTIF_GOREV_OPTIONS.map((item) => {
                const isSelected = formData.aktifGorev === item.label;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, aktifGorev: item.label })}
                    className={`w-full p-3.5 sm:p-4 rounded-xl border text-left flex items-start gap-3 transition-all min-h-[52px] ${
                      isSelected
                        ? 'bg-[#42A5F5]/15 border-[#42A5F5] text-[#F2F6FA] ring-1 ring-[#42A5F5]/40'
                        : 'bg-[#07111C] border-[#1B3A52] text-[#A8B4C2] hover:text-[#F2F6FA] hover:border-[#42A5F5]/40'
                    }`}
                  >
                    <span className={`h-4 w-4 rounded-full border mt-0.5 shrink-0 flex items-center justify-center ${
                      isSelected ? 'border-[#42A5F5] bg-[#42A5F5]' : 'border-[#1B3A52] bg-[#0B1826]'
                    }`}>
                      {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-[#07111C]" />}
                    </span>
                    <div className="space-y-0.5">
                      <span className="text-xs sm:text-sm font-semibold block text-[#F2F6FA]">{item.label}</span>
                      <span className="text-[11px] sm:text-xs text-[#A8B4C2] block leading-relaxed">{item.desc}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Eklemek İstediğin Bir Şey Var mı? */}
          <div className="space-y-2 pt-2">
            <label className="text-sm font-semibold text-[#F2F6FA] flex items-center justify-between">
              <span>Eklemek istediğin bir şey var mı?</span>
              <span className="text-xs text-[#A8B4C2] font-mono">Opsiyonel</span>
            </label>
            <textarea
              rows={3}
              placeholder="Eklemek istediğin bir not, soru, proje fikri veya kendini tanıtmak istediğin ek detaylar..."
              value={formData.eklemekIstedikleriniz}
              onChange={(e) => setFormData({ ...formData, eklemekIstedikleriniz: e.target.value })}
              className="w-full px-4 py-3.5 rounded-xl bg-[#07111C] border border-[#1B3A52] text-[#F2F6FA] placeholder-[#A8B4C2]/40 focus:outline-none focus:border-[#42A5F5] focus:ring-1 focus:ring-[#42A5F5] transition-colors text-sm sm:text-base resize-y min-h-[96px]"
            />
          </div>
        </div>

        {/* Gönder Butonu */}
        <div className="pt-4 border-t border-[#1B3A52] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#A8B4C2] text-center sm:text-left">
            Bilgileriniz sadece Tulpar TEKNOFEST takımı başvuru ve iletişim süreçlerinde kullanılacaktır.
          </p>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl text-base font-bold bg-[#42A5F5] hover:bg-[#6CC4FF] text-[#07111C] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#42A5F5]/15 min-h-[48px]"
          >
            {status === 'loading' ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Gönderiliyor...</span>
              </>
            ) : (
              <>
                <span>Başvuruyu Gönder</span>
                <Send className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
