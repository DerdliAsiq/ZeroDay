# Zero Day - GDU Cybersecurity Club

Gəncə Dövlət Universitetinin tələbə kiber təhlükəsizlik klubu üçün çoxsəhifəli tanıtım sitesi. Karanlık "Signal" teması: charcoal zemin, Signal Green (`#B9F227`) vurgular, Space Grotesk + IBM Plex Mono.

**Səhifələr:** `/` (hero + konsol + bölmə kartları), `/haqqimizda`, `/istiqametler`, `/layiheler`, `/komanda`, `/qeydiyyat` (Telegram bot), `/elaqe` (Telegram bot).

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
  public/images/      # Prod görselleri (logo.jpeg, team-board.jpeg)
  src/
    pages/            # Home, About, Tracks, Projects, Team, Join, Contact, NotFound
    components/       # Header, Footer, ScrollToTop, ErrorBoundary, ui/
    contexts/ThemeContext.tsx
    lib/              # site.ts (ASSETS, SOCIALS, NAV), telegram.ts
    index.css         # Signal tasarım sistemi
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

`client/public/images/` içində:

| Dosya | Harada işlənir |
|---|---|
| `logo.jpeg` | Header/footer marka, konsol, favicon, OG |
| `team-board.jpeg` | Haqqımızda / komanda sxemi |

Əlavə etmək istəsən (olmasa şəkil gizlənir, sayt qırılmır): `hero.jpg`, `network.jpg`, `workshop.jpg`.

## Formlar

- **Qeydiyyat** (`/qeydiyyat`): Ad Soyad Ata, telefon, email, fakültə, ixtisas, kurs, universitet → qeydiyyat Telegram botuna.
- **Əlaqə** (`/elaqe`): ad, e-poçt, mesaj → sual Telegram botuna.
- Token/ID yoxdursa formalar `mailto:berzamin55@gmail.com` rejiminə düşür.

## Ortam dəyişkenleri

```
VITE_TELEGRAM_BOT_TOKEN=...      # sual botu
VITE_TELEGRAM_REG_BOT_TOKEN=...  # qeydiyyat botu
VITE_TELEGRAM_CHAT_ID=...        # hər ikisi eyni chat-ə göndərir
```

Nümunə: `.env.example`. `.env` git-ə düşmür.

## Deploy

Statik çıktı `dist/public`, herhangi bir statik hostta çalışır (Vercel/Netlify/Nginx). Node ile serve etmek istersen:

```bash
pnpm build
PORT=3000 NODE_ENV=production node dist/index.js
```

Qeyd: SPA fallback `server/index.ts`-dədir — statik hostda `/qeydiyyat` kimi yollar üçün rewrite qaydası lazımdır (Vercel/Netlify-də avtomatik, Nginx-də `try_files`).

## Yol haritası

- [ ] Test (vitest) + lint

## İletişim

berzamin55@gmail.com — Gəncə Dövlət Universiteti
Instagram: https://www.instagram.com/zeroday.gdu — GitHub: https://github.com/DerdliAsiq

MIT lisansı.
