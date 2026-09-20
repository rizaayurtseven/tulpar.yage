import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Required fields validation
    if (
      !data.adSoyad ||
      !data.bolum ||
      !data.sinif ||
      !data.telefon ||
      !data.eposta ||
      !data.alanlar ||
      data.alanlar.length === 0 ||
      !data.aktifGorev
    ) {
      return NextResponse.json(
        { error: 'Lütfen tüm zorunlu alanları doldurunuz.' },
        { status: 400 }
      );
    }

    const submission = {
      id: `tulpar-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      tarih: new Date().toISOString(),
      adSoyad: String(data.adSoyad).trim(),
      bolum: String(data.bolum).trim(),
      sinif: String(data.sinif).trim(),
      telefon: String(data.telefon).trim(),
      eposta: String(data.eposta).trim(),
      alanlar: Array.isArray(data.alanlar) ? data.alanlar : [data.alanlar],
      digerAlan: data.digerAlan ? String(data.digerAlan).trim() : null,
      deneyim: data.deneyim ? String(data.deneyim).trim() : 'Belirtilmedi',
      teknolojiler: data.teknolojiler ? String(data.teknolojiler).trim() : null,
      aktifGorev: String(data.aktifGorev).trim(),
      eklemekIstedikleriniz: data.eklemekIstedikleriniz ? String(data.eklemekIstedikleriniz).trim() : null,
    };

    console.log('[TULPAR YENİ BAŞVURU]', JSON.stringify(submission, null, 2));

    try {
      const dataDir = path.join(process.cwd(), 'data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const filePath = path.join(dataDir, 'basvurular.json');
      let currentSubmissions = [];
      if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        try {
          currentSubmissions = JSON.parse(fileContent);
        } catch {
          currentSubmissions = [];
        }
      }
      currentSubmissions.push(submission);
      fs.writeFileSync(filePath, JSON.stringify(currentSubmissions, null, 2), 'utf8');
    } catch (fsErr) {
      console.warn('basvurular.json dosyasına yazılamadı (sunucusuz ortam için normal):', fsErr);
    }

    return NextResponse.json({ ok: true, message: 'Başvurunuz başarıyla kaydedildi.' });
  } catch (error) {
    console.error('Başvuru hatası:', error);
    return NextResponse.json(
      { error: 'Bir hata oluştu, lütfen tekrar deneyiniz.' },
      { status: 500 }
    );
  }
}
