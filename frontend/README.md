# Zero Day — GDU Cybersecurity Club

Gəncə Dövlət Universitetinin tələbə kiber təhlükəsizlik klubu üçün tək səhifəlik tanıtım sitesi. Karanlık "Signal Lab" teması: charcoal zemin, Signal Green (`#B9F227`) vurgular, Space Grotesk + IBM Plex Mono.

**Canlı bölümler:** Hero + konsol, göstergeler, Haqqımızda, Öyrənmə istiqamətləri (3), Tədbirlər, Layihələr, Komanda, Qalereya, Üzvlük formu, Əlaqə.

## Texnologiyalar

- React 19 + Vite 7 + TypeScript 5.6
- Tailwind CSS 4 + shadcn/ui (new-york)
- wouter (routing), sonner (toast), lucide-react (ikon)
- Express 4 (prod statik serve) + esbuild bundle
- pnpm

## Quruluş

```
client/
  index.html          # SEO, OG, favicon
  public/images/      # Prod görselleri (logo, hero, network...)
  src/
    pages/Home.tsx    # Tüm tek sayfa bölümleri
    pages/NotFound.tsx
    components/ErrorBoundary.tsx
    components/ui/    # shadcn bileşenleri
    contexts/ThemeContext.tsx
    index.css         # Signal Lab tasarım sistemi
server/index.ts       # Statik serve + SPA fallback
shared/const.ts
```

## Başla

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm check      # tsc --noEmit
pnpm build      # dist/public + dist/index.js
pnpm start      # NODE_ENV=production node dist/index.js
```

Gereksinim: Node 20+, pnpm 10.

## Görseller

`client/public/images/` içine şunları koy:

| Dosya | Açıklama |
|---|---|
| `logo.jpg` | Konsol logosu |
| `mark.png` | Header/footer marka |
| `hero.jpg` | Hero arka plan |
| `network.jpg` | About bölümü |
| `workshop.jpg` | Galeri |
| `team-board.jpeg` | Heyet/rol haritası |

Detay: `client/public/images/README.md`. Dosya yoksa site kırılmaz — resim gizlenip gradient fallback görünür.

## Formlar

Backend yok. Üyelik + iletişim formu doğrular (`required`, honeypot, `maxlength`), sonra `mailto:zeroday@gdu.edu.az` açmayı teklif eder. Gerçek backend (API/Formspree/Supabase) sonradan eklenebilir.

## Ortam değişkenleri

Zorunlu değişken yok. Opsiyonel analitik için `.env.example`'a bak.

## Deploy

Statik çıktı `dist/public`, herhangi bir statik hostta çalışır (Vercel/Netlify/Nginx). Node ile serve etmek istersen:

```bash
pnpm build
PORT=3000 NODE_ENV=production node dist/index.js
```

## Yol haritası

- [ ] Gerçek backend'li üyelik kaydı
- [ ] Etkinlik kayıt linkleri + CMS
- [ ] Gerçek ekip üyeleri + fotoğraflar
- [ ] Kullanılmayan bağımlılıkların temizliği (`axios`, `zod`, `recharts`, `framer-motion`)
- [ ] Test (vitest) + lint

## İletişim

zeroday@gdu.edu.az — Gəncə Dövlət Universiteti

MIT lisansı.
