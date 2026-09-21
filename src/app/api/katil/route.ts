import { NextResponse } from "next/server";
import { google } from "googleapis";

// Basit Memory-based Rate Limiter
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_MAX_REQUESTS = 3;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 dakika

export async function POST(req: Request) {
  try {
    // IP Adresini al (Vercel başlıklarından)
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown_ip";

    // Rate Limiting Kontrolü
    const now = Date.now();
    const ipData = rateLimitMap.get(ip);

    if (ipData) {
      if (now - ipData.timestamp < RATE_LIMIT_WINDOW_MS) {
        if (ipData.count >= RATE_LIMIT_MAX_REQUESTS) {
          return NextResponse.json({ error: "Çok fazla istek gönderdiniz. Lütfen daha sonra tekrar deneyin." }, { status: 429 });
        }
        ipData.count++;
      } else {
        rateLimitMap.set(ip, { count: 1, timestamp: now });
      }
    } else {
      rateLimitMap.set(ip, { count: 1, timestamp: now });
    }

    const body = await req.json();
    const {
      adSoyad, bolum, sinif, telefon, eposta,
      alanlar, digerAlan, deneyim, teknolojiler, aktifGorev, eklemekIstedikleriniz
    } = body;

    // Form Doğrulama
    if (
        !adSoyad || !bolum || !sinif || !telefon || !eposta || !aktifGorev ||
        !alanlar || !Array.isArray(alanlar) || alanlar.length === 0
    ) {
      return NextResponse.json({ error: "Lütfen tüm zorunlu alanları doldurunuz." }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(eposta)) {
      return NextResponse.json({ error: "Geçerli bir e-posta adresi giriniz." }, { status: 400 });
    }

    // Çevre Değişkenleri Kontrolü
    if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SPREADSHEET_ID) {
      return NextResponse.json({ error: "Başvuru formu henüz kullanıma açık değil (API ayarları eksik)." }, { status: 503 });
    }

    // Google Yetkilendirmesi
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Alanları aralarına virgül koyarak string'e çevir
    const alanlarString = alanlar.join(", ");
    const trTime = new Date().toLocaleString("tr-TR", { timeZone: "Europe/Istanbul" });

    // Tabloya eklenecek veri dizisi (Sırasıyla Excel sütunları: A'dan L'ye)
    const appendData = [
      [
        trTime,
        String(adSoyad).trim(),
        String(bolum).trim(),
        String(sinif).trim(),
        String(telefon).trim(),
        String(eposta).trim(),
        alanlarString,
        digerAlan ? String(digerAlan).trim() : "-",
        deneyim ? String(deneyim).trim() : "Belirtilmedi",
        teknolojiler ? String(teknolojiler).trim() : "-",
        String(aktifGorev).trim(),
        eklemekIstedikleriniz ? String(eklemekIstedikleriniz).trim() : "-"
      ]
    ];

    // Veriyi Sheets'e yazma
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
      // Google Spreadsheet dosyasında "Tulpar" adında bir sayfa sekmesi olması zorunludur.
      range: "Tulpar!A:L",
      valueInputOption: "RAW",
      requestBody: {
        values: appendData,
      },
    });

    return NextResponse.json({ success: true, message: "Başvurunuz başarıyla kaydedildi." }, { status: 200 });

  } catch (error) {
    console.error("Sheets Hatası (Tulpar):", error);
    return NextResponse.json({ error: "Sunucu hatası oluştu. Lütfen daha sonra tekrar deneyiniz." }, { status: 500 });
  }
}