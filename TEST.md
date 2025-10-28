# 🧪 KolayTara Test Senaryoları

## Yerel Test

### 1. Sunucuyu Başlat
```bash
npm run dev
```

Beklenen: `http://localhost:8788` adresinde sunucu çalışmalı

### 2. Ana Sayfa Testi
- URL: `http://localhost:8788/index.html`
- Kontroller:
  - ✅ Logo görünüyor
  - ✅ "Giriş Yap" butonu çalışıyor
  - ✅ "Kayıt Ol" butonu çalışıyor
  - ✅ "Hemen Başla" butonu register.html'e yönlendiriyor
  - ✅ Responsive tasarım çalışıyor

### 3. Kayıt Sayfası Testi
- URL: `http://localhost:8788/register.html`
- Test Adımları:
  1. Email: `test@example.com`
  2. Şifre: `test123`
  3. Şifre Tekrar: `test123`
  4. "Kayıt Ol" butonuna tıkla
- Beklenen: Dashboard'a yönlendirilmeli

### 4. Giriş Sayfası Testi
- URL: `http://localhost:8788/login.html`
- Test Adımları:
  1. Email: `test@example.com`
  2. Şifre: `test123`
  3. "Giriş Yap" butonuna tıkla
- Beklenen: Dashboard'a yönlendirilmeli

### 5. Dashboard Testi
- URL: `http://localhost:8788/dashboard.html`
- Kontroller:
  - ✅ Kullanıcı email görünüyor
  - ✅ "Dosya Seç" butonu çalışıyor
  - ✅ API key input alanı var
  - ✅ "Yükle ve İşle" butonu var
  - ✅ "Çıkış" butonu çalışıyor

### 6. AI İşleme Testi
- Gereksinimler:
  - Google AI Studio API Key ([buradan alın](https://aistudio.google.com/app/apikey))
  - Örnek Z raporu fotoğrafı
- Test Adımları:
  1. Dashboard'a git
  2. API key gir
  3. Z raporu fotoğrafı seç
  4. "Yükle ve İşle" butonuna tıkla
  5. Sonuçları bekle
  6. "Excel Olarak İndir" butonuna tıkla
- Beklenen:
  - ✅ Loading spinner görünmeli
  - ✅ AI analiz sonuçları görünmeli
  - ✅ Excel butonu aktif olmalı
  - ✅ CSV dosyası indirilmeli

## Browser Compatibility Test

### Desktop Browsers
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

### Mobile Browsers
- [ ] Chrome Mobile
- [ ] Safari iOS
- [ ] Samsung Internet
- [ ] Firefox Mobile

## Responsive Design Test

### Breakpoints
- [ ] Mobile: 320px - 480px
- [ ] Tablet: 481px - 768px
- [ ] Desktop: 769px - 1920px
- [ ] Large Desktop: 1921px+

### Orientation
- [ ] Portrait
- [ ] Landscape

## Performance Test

### Page Load Times
- [ ] index.html < 2s
- [ ] dashboard.html < 2s
- [ ] CSS load < 500ms
- [ ] JS load < 1s

### Image Processing
- [ ] Small image (< 1MB) < 5s
- [ ] Medium image (1-3MB) < 10s
- [ ] Large image (3-5MB) < 15s

## Security Test

### Input Validation
- [ ] Email format validation
- [ ] Password length validation
- [ ] File type validation
- [ ] File size validation
- [ ] API key format validation

### XSS Prevention
- [ ] Script injection in email field
- [ ] HTML injection in results
- [ ] URL manipulation

### Authentication
- [ ] Unauthorized dashboard access
- [ ] Session persistence
- [ ] Logout functionality

## Error Handling Test

### Network Errors
- [ ] Offline mode
- [ ] Slow connection
- [ ] API timeout
- [ ] Invalid API response

### User Errors
- [ ] Empty form submission
- [ ] Invalid file format
- [ ] Missing API key
- [ ] Wrong credentials

### System Errors
- [ ] Large file upload
- [ ] Corrupted image
- [ ] Invalid JSON response

## Accessibility Test

### Keyboard Navigation
- [ ] Tab navigation works
- [ ] Enter key submits forms
- [ ] Escape key closes modals

### Screen Reader
- [ ] Alt text on images
- [ ] Form labels present
- [ ] Error messages readable

### Color Contrast
- [ ] Text readable on background
- [ ] Buttons have sufficient contrast
- [ ] Links distinguishable

## API Integration Test

### Google Gemini API
- [ ] Valid API key accepted
- [ ] Invalid API key rejected
- [ ] Image successfully sent
- [ ] JSON response parsed
- [ ] Error handling works

### Response Formats
- [ ] Valid JSON response
- [ ] Malformed JSON handling
- [ ] Empty response handling
- [ ] Large response handling

## Data Export Test

### CSV Export
- [ ] File downloads successfully
- [ ] Filename includes date
- [ ] UTF-8 encoding correct
- [ ] Turkish characters display correctly
- [ ] Excel opens file correctly

### Data Accuracy
- [ ] All fields exported
- [ ] Numbers formatted correctly
- [ ] Dates formatted correctly
- [ ] Currency symbols correct

## Cloudflare Integration Test (After Deploy)

### D1 Database
- [ ] User registration saves to D1
- [ ] User login queries D1
- [ ] Upload history saves to D1

### R2 Storage
- [ ] Files upload to R2
- [ ] Files accessible from R2
- [ ] Files delete after 15 min (if cron configured)

### Pages Functions
- [ ] API routes work
- [ ] Environment variables accessible
- [ ] Bindings configured correctly

## Load Test (Optional)

### Concurrent Users
- [ ] 10 simultaneous users
- [ ] 50 simultaneous users
- [ ] 100 simultaneous users

### File Processing
- [ ] 10 files in queue
- [ ] 50 files in queue
- [ ] Rate limiting works

---

## Test Results Template

```
Test Date: ___________
Tester: ___________
Environment: [ ] Local [ ] Staging [ ] Production

| Test Category | Status | Notes |
|--------------|--------|-------|
| Ana Sayfa | ✅ / ❌ | |
| Kayıt | ✅ / ❌ | |
| Giriş | ✅ / ❌ | |
| Dashboard | ✅ / ❌ | |
| AI İşleme | ✅ / ❌ | |
| Excel İndirme | ✅ / ❌ | |
| Responsive | ✅ / ❌ | |
| Performance | ✅ / ❌ | |
| Security | ✅ / ❌ | |

Overall Status: [ ] PASS [ ] FAIL

Issues Found:
1. 
2. 
3. 
```
