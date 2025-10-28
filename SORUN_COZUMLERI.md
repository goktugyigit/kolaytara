# 🔧 KolayTara - Sorun Çözümleri

## ❓ Sık Sorulan Sorular

### 1. Public klasörü neden kullanıyoruz?

**Cevap:** Cloudflare Pages için gerekli!

- Cloudflare Pages, `public/` klasörünü **build output directory** olarak kullanır
- Deploy edildiğinde **sadece** `public/` içindeki dosyalar web'de gözükür
- URL'lerde `public/` kelimesi **gözükmez**

**Örnek:**
```
Dosya yolu: public/index.html
Web URL: https://kolaytara.pages.dev/index.html
         (public/ gözükmüyor!)

Dosya yolu: public/assets/logo.png
Web URL: https://kolaytara.pages.dev/assets/logo.png
```

**Neden böyle?**
- Cloudflare Pages, Vercel, Netlify gibi platformlar bu yapıyı kullanır
- `src/` → geliştirme dosyaları
- `public/` → production dosyaları
- Bizim projede direkt HTML kullandığımız için her şey `public/` içinde

---

### 2. Logo güncel gözükmüyor, neden?

**Sebep:** Tarayıcı cache'i eski logoyu saklıyor

**Çözüm 1: Hard Refresh (En Hızlı)**
```
Windows/Linux:
- Chrome/Edge: Ctrl + Shift + R veya Ctrl + F5
- Firefox: Ctrl + Shift + R

Mac:
- Cmd + Shift + R
```

**Çözüm 2: Cache Temizle**
1. `Ctrl + Shift + Delete` (Chrome/Edge)
2. "Cached images and files" seçin
3. "Clear data" tıklayın

**Çözüm 3: Incognito Mode**
- `Ctrl + Shift + N` (Chrome/Edge)
- `Ctrl + Shift + P` (Firefox)

**Çözüm 4: DevTools**
1. `F12` ile DevTools açın
2. Network tab'ına gidin
3. "Disable cache" işaretleyin
4. Sayfayı yenileyin

**Teknik Çözüm:**
Logo URL'lerine `?v=2` parametresi ekledik:
```html
<img src="assets/logo.png?v=2">
```
Bu, tarayıcıya "bu yeni bir dosya" der.

---

### 3. http://127.0.0.1:5500/ açılınca klasör listesi görünüyor, neden?

**Sebep:** Live Server, root klasörden başlatılmış ama uygulama `public/` içinde

**Çözüm A: Wrangler Kullan (ÖNERİLEN)**
```bash
npm run dev
```
Sonra: `http://localhost:8788`

**Çözüm B: VS Code Live Server Ayarı**
1. `.vscode/settings.json` dosyası güncellendi
2. `public/index.html` dosyasına sağ tıklayın
3. "Open with Live Server" seçin

**Çözüm C: Root Index.html**
- Root klasörde `index.html` oluşturuldu
- Otomatik olarak `public/index.html`'e yönlendirir
- Live Server'ı normal başlatın, otomatik yönlenecek

**Neden oluyor?**
```
Root klasör:
├── index.html (yönlendirme)
├── public/
│   └── index.html (asıl uygulama)
└── ...

Live Server root'tan başlarsa:
→ Root index.html'i gösterir (yönlendirme)
→ Otomatik public/index.html'e gider

Live Server public/'tan başlarsa:
→ Direkt public/index.html'i gösterir
```

---

### 4. Cloudflare'de public klasörü gözükecek mi?

**HAYIR!** Gözükmez.

**Yerel geliştirme:**
```
http://localhost:8788/index.html
http://localhost:8788/assets/logo.png
```

**Cloudflare Pages (production):**
```
https://kolaytara.pages.dev/index.html
https://kolaytara.pages.dev/assets/logo.png
```

`public/` kelimesi **hiçbir zaman** URL'de gözükmez!

**Cloudflare Pages nasıl çalışır?**
1. `wrangler.toml` dosyasında: `pages_build_output_dir = "./public"`
2. Deploy edildiğinde: Cloudflare sadece `public/` içini alır
3. Web'de: `public/` içindeki dosyalar root'ta serve edilir

---

### 5. npm run dev çalışmıyor

**Çözüm 1: Bağımlılıkları yükleyin**
```bash
npm install
```

**Çözüm 2: Wrangler'ı global yükleyin**
```bash
npm install -g wrangler
```

**Çözüm 3: Node.js versiyonunu kontrol edin**
```bash
node --version
# v18 veya üzeri olmalı
```

**Çözüm 4: Cache temizle**
```bash
npm cache clean --force
npm install
```

---

### 6. Port 8788 kullanımda hatası

**Çözüm 1: Farklı port kullanın**
```bash
npm run preview
# veya
npx wrangler pages dev public --port 3000
```

**Çözüm 2: Çalışan process'i durdurun**
```bash
# Windows
netstat -ano | findstr :8788
taskkill /PID <PID_NUMBER> /F

# Veya Ctrl+C ile durdurun
```

---

### 7. Logo boyutu yanlış görünüyor

**Kontrol edin:**
1. Logo dosyası `public/assets/logo.png` konumunda mı?
2. Logo boyutu 500x70px mi?
3. CSS'de `.logo` class'ı doğru mu?

**CSS kontrol:**
```css
.logo {
  height: 70px;
  width: auto;
  max-width: 500px;
}
```

**Responsive kontrol:**
- Desktop: 70px
- Tablet: 50px
- Mobile: 40px

---

### 8. Navbar siyah değil, beyaz görünüyor

**Sebep:** CSS yüklenmemiş veya cache

**Çözüm:**
1. Hard refresh: `Ctrl + Shift + R`
2. CSS dosyasını kontrol: `public/assets/styles.css`
3. HTML'de CSS linki doğru mu:
```html
<link rel="stylesheet" href="assets/styles.css">
```

---

### 9. Butonlar kırmızı değil, mavi görünüyor

**Sebep:** Eski CSS cache'lenmiş

**Çözüm:**
1. Hard refresh: `Ctrl + Shift + R`
2. Incognito mode deneyin
3. DevTools'da "Disable cache" aktif edin

---

### 10. AI işleme çalışmıyor

**Kontrol listesi:**
1. ✅ Google AI Studio API key'iniz var mı?
2. ✅ API key doğru girildi mi?
3. ✅ İnternet bağlantınız var mı?
4. ✅ Görsel formatı JPG/PNG mi?
5. ✅ Görsel boyutu 5MB'dan küçük mü?

**API Key alma:**
1. [AI Studio](https://aistudio.google.com/app/apikey)
2. "Create API Key" tıklayın
3. Kopyalayın
4. Dashboard'da yapıştırın

---

## 🎯 Önerilen Çalışma Yöntemi

### Geliştirme (Development)
```bash
npm run dev
```
→ `http://localhost:8788`

### Avantajları:
- ✅ Cloudflare Pages ortamını simüle eder
- ✅ `public/` klasörünü otomatik serve eder
- ✅ D1 ve R2 binding'leri çalışır
- ✅ Production'a en yakın ortam
- ✅ Hot reload

### Dezavantajları:
- ❌ İlk kurulum gerektirir (`npm install`)

---

## 📋 Hızlı Kontrol Listesi

Sorun yaşıyorsanız sırayla deneyin:

1. ✅ `npm install` çalıştırdınız mı?
2. ✅ `npm run dev` ile başlattınız mı?
3. ✅ `http://localhost:8788` adresini kullanıyor musunuz?
4. ✅ Tarayıcı cache'ini temizlediniz mi? (`Ctrl + Shift + R`)
5. ✅ Logo dosyası `public/assets/logo.png` konumunda mı?
6. ✅ CSS dosyası `public/assets/styles.css` konumunda mı?
7. ✅ Incognito mode denediniz mi?
8. ✅ DevTools Console'da hata var mı? (`F12`)

---

## 🆘 Hala Çalışmıyor?

### Sıfırdan Başlama
```bash
# 1. Bağımlılıkları temizle
rm -rf node_modules
rm package-lock.json

# 2. Yeniden yükle
npm install

# 3. Başlat
npm run dev

# 4. Tarayıcıda aç
# http://localhost:8788
```

### Tarayıcı Sıfırlama
1. `Ctrl + Shift + Delete`
2. "All time" seçin
3. Tüm cache'i temizleyin
4. Tarayıcıyı yeniden başlatın

### VS Code Sıfırlama
1. VS Code'u kapatın
2. `.vscode/` klasörünü silin
3. VS Code'u açın
4. Tekrar deneyin

---

## 📞 Destek

Sorun devam ederse:
1. Console'da hata mesajını kontrol edin (`F12`)
2. Network tab'ında dosyaların yüklendiğini kontrol edin
3. `NASIL_CALISTIRILIR.md` dosyasını okuyun
4. GitHub Issues'da sorun açın

---

**En Önemli İpucu:** `npm run dev` kullanın! 🚀
