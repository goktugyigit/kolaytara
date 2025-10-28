# 🚀 KolayTara Hızlı Başlangıç

## Yerel Geliştirme (5 Dakika)

### 1. Bağımlılıkları Yükle
```bash
npm install
```

### 2. Yerel Sunucuyu Başlat
```bash
npm run dev
```

Tarayıcıda `http://localhost:8788` adresini açın.

### 3. Test Et
1. "Kayıt Ol" butonuna tıklayın
2. E-posta ve şifre girin
3. Dashboard'a yönlendirileceksiniz
4. Google AI Studio API anahtarınızı girin ([buradan alın](https://aistudio.google.com/app/apikey))
5. Bir Z raporu fotoğrafı yükleyin
6. "Yükle ve İşle" butonuna tıklayın
7. Sonuçları görüntüleyin ve Excel olarak indirin

## Cloudflare Pages'e Deploy (10 Dakika)

### Yöntem 1: GitHub ile (Önerilen)

1. **GitHub'a Push Edin**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main
```

2. **Cloudflare Dashboard'a Gidin**
   - [Cloudflare Dashboard](https://dash.cloudflare.com) > Pages
   - "Create a project" > "Connect to Git"
   - GitHub repository'nizi seçin

3. **Build Ayarları**
   - Framework preset: None
   - Build command: (boş bırakın)
   - Build output directory: `public`

4. **D1 Veritabanı Bağlayın**
   - Settings > Functions > D1 database bindings
   - Variable name: `DB`
   - D1 database: Yeni oluşturun veya mevcut olanı seçin

5. **R2 Bucket Bağlayın**
   - Settings > Functions > R2 bucket bindings
   - Variable name: `UPLOADS`
   - R2 bucket: Yeni oluşturun veya mevcut olanı seçin

6. **Deploy Edin**
   - "Save and Deploy" butonuna tıklayın

### Yöntem 2: Wrangler CLI ile

1. **Cloudflare'e Giriş Yapın**
```bash
npx wrangler login
```

2. **D1 Veritabanı Oluşturun**
```bash
npx wrangler d1 create kolaytara-users
```

Çıktıdaki `database_id`'yi `wrangler.toml` dosyasına ekleyin:
```toml
[[d1_databases]]
binding = "DB"
database_name = "kolaytara-users"
database_id = "your-database-id-here"
```

3. **Veritabanı Şemasını Uygulayın**
```bash
npx wrangler d1 execute kolaytara-users --file=./db/schema.sql
```

4. **R2 Bucket Oluşturun**
```bash
npx wrangler r2 bucket create kolaytara-uploads
```

5. **Deploy Edin**
```bash
npm run deploy
```

## 🔑 Google AI Studio API Anahtarı Alma

1. [AI Studio](https://aistudio.google.com/app/apikey) adresine gidin
2. Google hesabınızla giriş yapın
3. "Create API Key" butonuna tıklayın
4. Bir Google Cloud projesi seçin veya yeni oluşturun
5. API anahtarınızı kopyalayın
6. Dashboard'da "AI Studio API Anahtarınız" alanına yapıştırın

**Not:** API anahtarı tarayıcıda saklanmaz, sadece geçici olarak kullanılır.

## 📝 Önemli Notlar

### Güvenlik
- Production ortamında mutlaka şifre hash'leme (bcrypt) kullanın
- API anahtarlarını environment variables olarak saklayın
- CORS ayarlarını yapılandırın

### Veritabanı
- D1 şu anda beta aşamasında
- Yerel geliştirmede SQLite kullanılır
- Production'da Cloudflare D1 kullanılır

### Dosya Depolama
- R2'de saklanan dosyalar için lifecycle policy ayarlayın
- 15 dakika sonra otomatik silme için Cloudflare Cron Trigger kullanın

## 🐛 Sorun Giderme

### "API Key geçersiz" hatası
- API anahtarınızın doğru olduğundan emin olun
- AI Studio'da API'nin aktif olduğunu kontrol edin

### "Dosya yüklenemedi" hatası
- Dosya boyutunun 5MB'dan küçük olduğundan emin olun
- Dosya formatının JPG, PNG veya JPEG olduğunu kontrol edin

### Deploy hatası
- `wrangler.toml` dosyasındaki `database_id`'nin doğru olduğundan emin olun
- Cloudflare hesabınızın aktif olduğunu kontrol edin

## 📚 Daha Fazla Bilgi

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Cloudflare D1 Docs](https://developers.cloudflare.com/d1/)
- [Cloudflare R2 Docs](https://developers.cloudflare.com/r2/)
- [Google AI Studio](https://ai.google.dev/)

## 🎉 Başarılı!

Artık KolayTara projeniz hazır. Sorularınız için issue açabilirsiniz.
