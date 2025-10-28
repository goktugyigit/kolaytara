# KolayTara - AI ile Z Raporu Muhasebeleştirme

KolayTara, yapay zeka destekli Z raporu ve fiş analiz platformudur. Cloudflare Pages üzerinde çalışır.

## 🚀 Özellikler

- 📸 Z raporu fotoğrafı yükleme
- 🤖 Google Gemini AI ile otomatik veri çıkarımı
- 📊 Excel/CSV formatında veri indirme
- 🔐 Kullanıcı kayıt ve giriş sistemi
- 📱 Responsive tasarım (mobil/tablet/desktop)
- ☁️ Cloudflare Pages, D1, R2 entegrasyonu

## 📦 Kurulum

### 1. Gereksinimler
- Node.js (v18+)
- npm veya yarn
- Cloudflare hesabı
- Google AI Studio API anahtarı

### 2. Projeyi Klonlayın
```bash
git clone <repo-url>
cd kolaytara
```

### 3. Bağımlılıkları Yükleyin
```bash
npm install
```

### 4. Cloudflare D1 Veritabanı Oluşturun
```bash
npx wrangler d1 create kolaytara-users
```

Çıktıdaki `database_id`'yi `wrangler.toml` dosyasına ekleyin.

### 5. Veritabanı Şemasını Uygulayın
```bash
npx wrangler d1 execute kolaytara-users --file=./db/schema.sql
```

### 6. Cloudflare R2 Bucket Oluşturun
```bash
npx wrangler r2 bucket create kolaytara_uploads
```

### 7. Yerel Geliştirme
```bash
npm run dev
```

Tarayıcıda `http://localhost:8788` adresini açın.

## 🌐 Cloudflare Pages'e Deploy

### GitHub ile Deploy
1. Projeyi GitHub'a push edin
2. Cloudflare Dashboard > Pages > Create a project
3. GitHub repository'nizi bağlayın
4. Build ayarları:
   - Build command: (boş bırakın)
   - Build output directory: `public`
5. Environment variables ekleyin (gerekirse)
6. Deploy edin

### Wrangler ile Deploy
```bash
npm run deploy
```

## 🔑 Google AI Studio API Anahtarı

1. [AI Studio](https://aistudio.google.com/app/apikey) adresine gidin
2. "Create API Key" butonuna tıklayın
3. API anahtarınızı kopyalayın
4. Dashboard'da API anahtarını girin

## 📁 Proje Yapısı

```
kolaytara/
├── public/
│   ├── index.html          # Ana sayfa
│   ├── login.html          # Giriş sayfası
│   ├── register.html       # Kayıt sayfası
│   ├── dashboard.html      # Kullanıcı paneli
│   ├── assets/
│   │   ├── logo.png        # Logo
│   │   └── styles.css      # CSS stilleri
│   └── scripts/
│       ├── app.js          # Ana uygulama
│       ├── auth.js         # Kimlik doğrulama
│       ├── upload.js       # Dosya yükleme
│       ├── ai.js           # AI entegrasyonu
│       └── excel.js        # Excel oluşturma
├── db/
│   └── schema.sql          # Veritabanı şeması
├── wrangler.toml           # Cloudflare yapılandırması
├── package.json
└── README.md
```

## 🛠️ Teknolojiler

- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Backend**: Cloudflare Pages Functions
- **Veritabanı**: Cloudflare D1 (SQLite)
- **Depolama**: Cloudflare R2
- **AI**: Google Gemini 2.0 Flash

## 📝 Kullanım

1. Kayıt olun veya giriş yapın
2. Dashboard'a gidin
3. Google AI Studio API anahtarınızı girin
4. Z raporu fotoğrafını yükleyin
5. "Yükle ve İşle" butonuna tıklayın
6. Sonuçları görüntüleyin
7. Excel/CSV olarak indirin

## 🔒 Güvenlik

- API anahtarları tarayıcıda saklanmaz
- Yüklenen dosyalar 15 dakika sonra otomatik silinir
- Şifreler hash'lenerek saklanır (production'da bcrypt kullanın)

## 📄 Lisans

MIT

## 🤝 Katkıda Bulunma

Pull request'ler kabul edilir. Büyük değişiklikler için önce bir issue açın.

## 📧 İletişim

Sorularınız için issue açabilirsiniz.
