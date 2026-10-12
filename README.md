# Zero Day - GDU Cybersecurity Club

Gəncə Dövlət Universitetinin tələbə kiber təhlükəsizlik klubu üçün çoxsəhifəli tanıtım sitesi. Karanlık "Signal" teması: charcoal zemin, Signal Green (`#B9F227`) vurgular, Space Grotesk + IBM Plex Mono.

**Səhifələr:** `/` (hero + konsol + bölmə kartları), `/haqqimizda`, `/istiqametler` (3 track: əsaslar, CTF, layihə laboratoriyası + CTA), `/layiheler` (GitHub kartları), `/gallery` (klub fotoları + lightbox), `/qeydiyyat` (server `/api/register`), `/elaqe` (server `/api/contact`).

## Texnologiyalar

- React 19 + Vite 7 + TypeScript 5.6
- Tailwind CSS 4 + shadcn/ui (new-york)
- wouter (routing), sonner (toast), lucide-react (ikon)
- Express 4 (prod statik serve + `/api` form endpointləri) + esbuild bundle
- pnpm

## Quruluş

```
client/
  index.html          # SEO, OG, favicon
  public/images/      # Prod görselleri (logo, team-board, gallery-*, project-*)
  src/
    pages/            # Home, About, Tracks, Projects, Gallery, Join, Contact, NotFound
    components/       # Header, Footer, ScrollToTop, ErrorBoundary, ui/
    contexts/ThemeContext.tsx
    lib/              # site.ts (ASSETS, SOCIALS, NAV)
    index.css         # Signal tasarım sistemi
server/index.ts       # /api/register + /api/contact + /api/anonymous, statik serve + SPA fallback
user_images/          # Lokal staging — resimleri bura at, git'e düşmür
```

Qeyd: açıq zeminli səhifələrdə (`/layiheler`, `/qeydiyyat`) header həmişə koyu fonda göstərilir (`Header.tsx` route kontrolü), yoxsa ağ yazı açıq zeminde itir.

## Başla

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm check      # tsc --noEmit
pnpm check:no-secrets  # dist bundle'da token sızıntısı tara
pnpm build      # dist/public + dist/index.js
pnpm start      # NODE_ENV=production node dist/index.js
```

Gereksinim: Node 20+, pnpm 10.

## Görseller

`client/public/images/` içində:

| Dosya | Harada işlənir |
|---|---|
| `logo.jpeg` | Header/footer marka, konsol, favicon, OG |
| `team-board.jpeg` | Haqqımızda / komanda sxemi |
| `gallery-01.jpeg` … `gallery-NN.jpeg` | Qalereya (`Gallery.tsx` dizisi) |
| `project-<ad>.png` (7 ədəd) | Layihələr kartları |

Yeni resim akışı: `user_images/` klasörünə at → `client/public/images/` altına `gallery-NN` / `project-<ad>` adıyla normalize et → ilgili diziye 1 satır ekle. Boşluklu orijinal isim kullanma. Əlavə etmək istəsən (olmasa şəkil gizlənir, sayt qırılmır): `hero.jpg`, `network.jpg`, `workshop.jpg`.

## Formlar (server-side)

- **Qeydiyyat** (`/qeydiyyat` → `POST /api/register`): Ad Soyad Ata, telefon, email, fakültə, ixtisas, kurs, universitet.
- **Əlaqə** (`/elaqe` → `POST /api/contact`): ad, e-poçt, mesaj.
- **Anonim** (`/elaqe` → `POST /api/anonymous`): yalnız mesaj (10-2000 simvol). Ad/e-poçt soruşulmur, IP qeydə alınmır, `mailto` fallback yoxdur. Mövcud chat-ə gedir.
- Server validasiyası + endpoint başına ayrı IP rate-limit (10/dk) + honeypot var. Token/ID yoxdursa API `501` dönür, kimlikli formalar `mailto:berzamin55@gmail.com` rejiminə düşür (anonim form düşmür).
- KVKK notu formun altındadır, servis adı yazılmır.

## Ortam dəyişkenleri (yalnız server)

```
TELEGRAM_BOT_TOKEN=...          # sual botu
TELEGRAM_REG_BOT_TOKEN=...      # qeydiyyat botu
TELEGRAM_CHAT_ID=...            # sual + qeydiyyat + anonim eyni chat-ə göndərir
```

UYARI: Token'ları əsla `VITE_` önekiylə tanımlama — bundle'a sızar. Nümunə: `.env.example`. `.env` git-ə düşmür.

## Deploy (Render)

Build: `pnpm install && pnpm build` — Start: `pnpm start`. Environment'a yuxarıdakı 3 secret + `NODE_ENV=production` əlavə et, köhnə `VITE_TELEGRAM_*` varsa sil, sonra redeploy.

Statik hostda `/qeydiyyat` kimi yollar üçün rewrite qaydası lazımdır (Vercel/Netlify-də avtomatik, Nginx-də `try_files`). SPA fallback `server/index.ts`-dədir.

## Yol haritası

- [ ] Test (vitest) + lint

## İletişim

berzamin55@gmail.com — Gəncə Dövlət Universiteti
Instagram: https://www.instagram.com/zeroday.gdu — GitHub: https://github.com/DerdliAsiq

MIT lisansı.
