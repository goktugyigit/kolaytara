# 🚀 KolayTara Nasıl Çalıştırılır?

## ⚠️ Önemli Bilgiler

### Public Klasörü Nedir?
- `public/` klasörü Cloudflare Pages için **build output directory**'dir
- Deploy edildiğinde sadece `public/` içindeki dosyalar web'de gözükür
- URL'lerde `public/` gözükmez

**Örnek:**
```
Dosya: public/index.html
URL: https://siteniz.com/index.html (public/ gözükmez!)
```

## 🎯 Çalıştırma Yöntemleri

### Yöntem 1: Wrangler (ÖNERİLEN) ✅

**En iyi yöntem - Cloudflare Pages'i simüle eder**

```bash
# Tek komut
npm run dev

# Veya batch dosyası ile
start-dev.bat
```

Tarayıcıda: `http://localhost:8788`

**Avantajları:**
- ✅ Cloudflare Pages ortamını simüle eder
- ✅ D1 ve R2 binding'leri çalışır
- ✅ Production'a en yakın ortam
- ✅ `public/` klasörünü otomatik serve eder

---

### Yöntem 2: Live Server (VS Code Extension)

**VS Code'da Live Server extension'ı varsa:**

1. `.vscode/settings.json` dosyası güncellendi (otomatik)
2. `public/index.html` dosyasına sağ tıklayın
3. "Open with Live Server" seçin

Tarayıcıda: `http://127.0.0.1:5500`

**Avantajları:**
- ✅ Otomatik reload
- ✅ Hızlı geliştirme

**Dezavantajları:**
- ❌ D1/R2 çalışmaz (sadece frontend test için)

---

### Yöntem 3: Root Index.html (Yönlendirme)

**Root klasörde `index.html` oluşturuldu**

1. Live Server'ı root klasörden başlatın
2. Otomatik olarak `public/index.html`'e yönlendirileceksiniz

Tarayıcıda: `http://127.0.0.1:5500` → `http://127.0.0.1:5500/public/index.html`

---

## 🔧 Sorun Giderme

### Sorun 1: "Klasör listesi görünüyor, index.html açılmıyor"

**Sebep:** Live Server root klasörden başlatılmış

**Çözüm A:** Wrangler kullanın
```bash
npm run dev
```

**Çözüm B:** VS Code'da `public/index.html`'e sağ tıklayıp "Open with Live Server"

**Çözüm C:** Root'taki `index.html` otomatik yönlendirecek

---

### Sorun 2: "Logo güncel gözükmüyor"

**Sebep:** Tarayıcı cache'i

**Çözüm 1:** Hard Refresh
- Chrome/Edge: `Ctrl + Shift + R` veya `Ctrl + F5`
- Firefox: `Ctrl + Shift + R`
- Safari: `Cmd + Shift + R`

**Çözüm 2:** Cache temizle
- Chrome: `Ctrl + Shift + Delete` → "Cached images and files"

**Çözüm 3:** Incognito/Private mode
- `Ctrl + Shift + N` (Chrome/Edge)
- `Ctrl + Shift + P` (Firefox)

**Not:** Logo URL'lerine `?v=2` parametresi eklendi, cache bypass için

---

### Sorun 3: "npm run dev çalışmıyor"

**Çözüm:**
```bash
# 1. Bağımlılıkları yükleyin
npm install

# 2. Wrangler'ı global yükleyin (opsiyonel)
npm install -g wrangler

# 3. Tekrar deneyin
npm run dev
```

---

### Sorun 4: "Port 8788 kullanımda"

**Çözüm:**
```bash
# Farklı port kullanın
npx wrangler pages dev public --port 3000
```

---

## 📁 Proje Yapısı

```
kolaytara/
├── index.html              ← Root yönlendirme (Live Server için)
├── package.json
├── wrangler.toml
├── start-dev.bat          ← Hızlı başlatma scripti
│
└── public/                ← ASIL UYGULAMA BURADA
    ├── index.html         ← Ana sayfa
    ├── login.html
    ├── register.html
    ├── dashboard.html
    ├── assets/
    │   ├── logo.png       ← Logo (500x70px)
    │   └── styles.css
    └── scripts/
        ├── app.js
        ├── auth.js
        ├── upload.js
        ├── ai.js
        └── excel.js
```

## 🎨 Logo Bilgileri

- **Boyut:** 500x70px (desktop)
- **Konum:** `public/assets/logo.png`
- **Responsive:** Otomatik küçülür (tablet: 50px, mobile: 40px)
- **Cache:** `?v=2` parametresi ile bypass

## 🌐 Cloudflare Pages Deploy

Deploy edildiğinde:
- ✅ `public/` içindeki dosyalar serve edilir
- ✅ URL'lerde `public/` gözükmez
- ✅ `public/index.html` → `https://siteniz.com/`
- ✅ `public/assets/logo.png` → `https://siteniz.com/assets/logo.png`

## 🚀 Hızlı Başlangıç

### İlk Kurulum
```bash
# 1. Bağımlılıkları yükle
npm install

# 2. Sunucuyu başlat
npm run dev

# 3. Tarayıcıda aç
# http://localhost:8788
```

### Her Seferinde
```bash
# Tek komut
npm run dev

# Veya
start-dev.bat
```

## 💡 İpuçları

1. **Geliştirme için:** `npm run dev` kullanın (Wrangler)
2. **Hızlı test için:** Live Server kullanabilirsiniz
3. **Logo güncellemesi:** Hard refresh yapın (`Ctrl + Shift + R`)
4. **Cache sorunu:** Incognito mode kullanın
5. **Production test:** Wrangler kullanın (D1/R2 için)

## 📞 Yardım

Sorun devam ederse:
1. `npm install` çalıştırın
2. Tarayıcı cache'ini temizleyin
3. Incognito mode deneyin
4. `npm run dev` ile başlatın
5. `http://localhost:8788` adresini kullanın

---

**Önerilen Yöntem:** `npm run dev` (Wrangler) ✅
