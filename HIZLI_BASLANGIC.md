# ⚡ KolayTara - Hızlı Başlangıç (2 Dakika)

## 🚀 Yerel Geliştirme (Frontend Test)

### 1. Bağımlılıkları Yükle
```bash
npm install
```

### 2. Sunucuyu Başlat
```bash
npm run dev
```

### 3. Tarayıcıda Aç
```
http://localhost:8788
```

**İşte bu kadar!** 🎉

---

## ✅ Şu Anda Çalışan Özellikler

- ✅ Ana sayfa
- ✅ Kayıt sayfası
- ✅ Giriş sayfası
- ✅ Dashboard
- ✅ Dosya yükleme (frontend)
- ✅ AI analizi (Google Gemini API ile)
- ✅ Excel export
- ✅ Responsive tasarım

---

## ⚠️ Önemli Notlar

### D1 ve R2 Henüz Aktif Değil

`wrangler.toml` dosyasında D1 ve R2 binding'leri **yorumda** (commented out).

**Neden?**
- Henüz Cloudflare'de database ve bucket oluşturmadınız
- Yerel geliştirme için gerekli değil
- Frontend özellikleri çalışıyor

**Ne zaman aktif edilmeli?**
- Cloudflare'de D1 database oluşturduğunuzda
- Cloudflare'de R2 bucket oluşturduğunuzda
- Production'a deploy edeceğinizde

---

## 🔧 D1 ve R2 Nasıl Aktif Edilir?

### Adım 1: D1 Database Oluştur
```bash
npx wrangler d1 create kolaytara-users
```

Çıktıda `database_id` göreceksiniz. Örnek:
```
✅ Successfully created DB 'kolaytara-users'
database_id = "abc123-def456-ghi789"
```

### Adım 2: wrangler.toml'u Güncelle
`wrangler.toml` dosyasında D1 kısmını yorumdan çıkarın:
```toml
[[d1_databases]]
binding = "DB"
database_name = "kolaytara-users"
database_id = "abc123-def456-ghi789"  # Buraya kendi ID'nizi yazın
```

### Adım 3: Schema Uygula
```bash
npx wrangler d1 execute kolaytara-users --file=./db/schema.sql
```

### Adım 4: R2 Bucket Oluştur
```bash
npx wrangler r2 bucket create kolaytara-uploads
```

### Adım 5: wrangler.toml'u Güncelle
`wrangler.toml` dosyasında R2 kısmını yorumdan çıkarın:
```toml
[[r2_buckets]]
binding = "UPLOADS"
bucket_name = "kolaytara-uploads"
```

### Adım 6: Sunucuyu Yeniden Başlat
```bash
npm run dev
```

---

## 🎯 Şu Anda Test Edebilecekleriniz

### 1. Ana Sayfa
- Logo ve navbar
- Hero section
- Feature cards
- Responsive tasarım

### 2. Kayıt/Giriş
- Form validasyonu
- LocalStorage auth (basit demo)
- Dashboard'a yönlendirme

### 3. Dashboard
- Dosya seçme
- Google AI API key girme
- Z raporu yükleme (frontend)
- AI analizi (API key gerekli)
- Excel export

### 4. AI Özelliği
**Gerekli:** Google AI Studio API Key

1. [AI Studio](https://aistudio.google.com/app/apikey) adresine git
2. "Create API Key" tıkla
3. API key'i kopyala
4. Dashboard'da yapıştır
5. Z raporu fotoğrafı yükle
6. "Yükle ve İşle" tıkla

---

## 🐛 Sorun mu var?

### "npm run dev" çalışmıyor
```bash
# Bağımlılıkları yeniden yükle
npm install

# Tekrar dene
npm run dev
```

### Logo gözükmüyor
```bash
# Hard refresh
Ctrl + Shift + R

# Veya incognito mode
Ctrl + Shift + N
```

### Port 8788 kullanımda
```bash
# Farklı port kullan
npm run preview
```

---

## 📚 Daha Fazla Bilgi

- **NASIL_CALISTIRILIR.md** - Detaylı çalıştırma kılavuzu
- **SORUN_COZUMLERI.md** - Tüm sorunlar ve çözümleri
- **DESIGN_SYSTEM.md** - Tasarım sistemi
- **README.md** - Genel dokümantasyon

---

## 🎨 Renk Şeması

- **Primary:** #d2242a (Kırmızı)
- **Secondary:** #000000 (Siyah)
- **Logo:** 500x70px

---

## ✨ Sonraki Adımlar

1. ✅ Yerel geliştirme test et
2. ✅ Google AI API key al
3. ✅ Z raporu fotoğrafı ile test et
4. ⏳ D1 database oluştur (opsiyonel)
5. ⏳ R2 bucket oluştur (opsiyonel)
6. ⏳ Cloudflare Pages'e deploy et

---

**Hemen başla:**
```bash
npm install
npm run dev
```

Tarayıcıda: `http://localhost:8788` 🚀
