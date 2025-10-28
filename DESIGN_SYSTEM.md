# 🎨 KolayTara Design System

## Renk Paleti

### Ana Renkler
```css
--primary-red: #d2242a;      /* Ana kırmızı */
--primary-black: #000000;    /* Siyah */
--accent-red: #ff3d47;       /* Açık kırmızı (hover/glow) */
--dark-red: #b01e24;         /* Koyu kırmızı (hover) */
```

### Nötr Renkler
```css
--background: #f5f5f5;       /* Sayfa arkaplanı */
--white: #ffffff;            /* Beyaz */
--gray-light: #d1d5db;       /* Açık gri (border) */
--gray-medium: #666666;      /* Orta gri (text) */
--gray-dark: #333333;        /* Koyu gri (text) */
--black-soft: #0a0a0a;       /* Yumuşak siyah */
--black-light: #1a1a1a;      /* Açık siyah */
```

## Logo Özellikleri

### Boyutlar
- **Desktop:** 500x70px (max-width: 500px, height: 70px)
- **Tablet:** 300x50px (max-width: 300px, height: 50px)
- **Mobile:** 200x40px (max-width: 200px, height: 40px)

### Efektler
- Drop shadow: `0 2px 8px rgba(210, 36, 42, 0.3)`
- Hover shadow: `0 4px 12px rgba(210, 36, 42, 0.5)`
- Hover scale: `1.05`

## Navbar

### Stil
- Background: `linear-gradient(180deg, #000000 0%, #0a0a0a 100%)`
- Border bottom: `3px solid #d2242a`
- Box shadow: `0 4px 12px rgba(210, 36, 42, 0.3)`
- Padding: `20px 40px` (desktop), `15px 20px` (tablet), `12px 15px` (mobile)

### Glow Efekti
- Alt border'da animasyonlu glow efekti
- Gradient: `#d2242a → #ff3d47 → #d2242a`
- Animasyon: 3s ease-in-out infinite

### Link Stilleri
- Color: `#ffffff`
- Hover background: `rgba(210, 36, 42, 0.1)`
- Hover color: `#d2242a`
- Padding: `8px 16px`
- Border radius: `6px`

## Butonlar

### Primary Button
```css
background: #d2242a;
border: 2px solid #d2242a;
color: #ffffff;
padding: 12px 24px;
border-radius: 8px;
font-weight: 600;
```

**Hover:**
```css
background: #b01e24;
border-color: #b01e24;
transform: translateY(-2px);
box-shadow: 0 4px 12px rgba(210, 36, 42, 0.4);
```

### Secondary Button
```css
background: #000000;
border: 2px solid #000000;
color: #ffffff;
```

**Hover:**
```css
background: #1a1a1a;
border-color: #1a1a1a;
```

## Hero Section

### Background
```css
background: linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #d2242a 100%);
```

### Overlay Efekti
```css
radial-gradient(circle at 20% 50%, rgba(210, 36, 42, 0.2) 0%, transparent 50%);
```

### Typography
- H1: 48px (desktop), 32px (tablet), 24px (mobile)
- P: 20px (desktop), 16px (mobile)
- Color: `#ffffff`
- Font weight: 700 (h1)

## Kartlar

### Feature Cards
```css
background: #ffffff;
border: 2px solid transparent;
border-radius: 12px;
padding: 30px;
box-shadow: 0 2px 8px rgba(0,0,0,0.08);
```

**Hover:**
```css
border-color: #d2242a;
transform: translateY(-8px);
box-shadow: 0 8px 24px rgba(210, 36, 42, 0.2);
```

### Auth Cards
```css
background: #ffffff;
border-top: 4px solid #d2242a;
border-radius: 12px;
padding: 40px;
box-shadow: 0 4px 12px rgba(0,0,0,0.1);
```

### Upload Section
```css
background: #ffffff;
border-top: 4px solid #d2242a;
border-radius: 12px;
padding: 40px;
box-shadow: 0 2px 8px rgba(0,0,0,0.08);
```

## Form Elemanları

### Input Fields
```css
border: 2px solid #d1d5db;
border-radius: 8px;
padding: 12px;
font-size: 15px;
```

**Focus:**
```css
border-color: #d2242a;
box-shadow: 0 0 0 3px rgba(210, 36, 42, 0.1);
```

## Tablolar

### Table Header
```css
background: #000000;
color: #ffffff;
font-weight: 600;
```

### Table Row Hover
```css
background: rgba(210, 36, 42, 0.05);
```

## Loading Spinner

```css
border: 4px solid #f3f4f6;
border-top: 4px solid #d2242a;
border-radius: 50%;
width: 50px;
height: 50px;
animation: spin 1s linear infinite;
```

## Linkler

### Normal
```css
color: #d2242a;
text-decoration: none;
font-weight: 600;
```

### Hover
```css
color: #b01e24;
```

## Animasyonlar

### Glow (Navbar)
```css
@keyframes glow {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
```

### Spin (Loading)
```css
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

## Responsive Breakpoints

| Breakpoint | Width | Logo Height | Navbar Padding |
|------------|-------|-------------|----------------|
| Desktop | 769px+ | 70px | 20px 40px |
| Tablet | 481-768px | 50px | 15px 20px |
| Mobile | 320-480px | 40px | 12px 15px |

## Typography

### Font Family
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

### Font Weights
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

### Line Height
```css
line-height: 1.6;
```

## Shadows

### Light
```css
box-shadow: 0 2px 8px rgba(0,0,0,0.08);
```

### Medium
```css
box-shadow: 0 4px 12px rgba(0,0,0,0.1);
```

### Heavy
```css
box-shadow: 0 8px 24px rgba(210, 36, 42, 0.2);
```

### Red Glow
```css
box-shadow: 0 4px 12px rgba(210, 36, 42, 0.4);
```

## Transitions

### Standard
```css
transition: all 0.3s ease;
```

### Quick
```css
transition: all 0.2s ease;
```

## Border Radius

- Small: `6px`
- Medium: `8px`
- Large: `12px`

## Spacing Scale

- XS: `5px`
- S: `10px`
- M: `15px`
- L: `20px`
- XL: `30px`
- XXL: `40px`
- XXXL: `80px`

---

**Renk Şeması:** Kırmızı (#d2242a) + Siyah (#000000)  
**Logo Boyutu:** 500x70px  
**Stil:** Modern, Bold, Professional
