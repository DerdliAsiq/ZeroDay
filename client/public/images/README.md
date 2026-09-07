# Görseller

- `logo.jpeg` — header/footer marka + konsol loqosu
- `team-board.jpeg` — Haqqımızda / komanda skemi
- `gallery-01.jpeg` … `gallery-NN.jpeg` — Qalereya (`/gallery`, `Gallery.tsx` dizisi)
- `project-omnivision.png`, `project-gbu-forum.png`, `project-zerotool.png`, `project-fidanbot.png`, `project-hacker-hunter.png`, `project-deryaforce.png`, `project-defhunter.png` — Layihələr (`/layiheler`)

## Yeni resim akışı

1. Resimleri repo kökündeki `user_images/` klasörüne at (staging, git'e düşmez).
2. Buradan `client/public/images/` altına normalize et:
   - Qalereya: `gallery-NN.jpeg`
   - Layihə: `project-<ad>.png`
3. İlgili diziye 1 satır ekle (`Gallery.tsx` / `Projects.tsx`).
4. Boşluklu orijinal isim kullanma.

Əlavə etmək istəsən (olmasa sayt qırılmır, şəkil gizlənir):
- `hero.jpg` — hero arxa plan + OG şəkil
- `network.jpg` — About bölümü
- `workshop.jpg` — yedek galeri görseli
