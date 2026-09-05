# Zero Day Club — Design Direction

## Three initial directions

### Theme Name: Signal Lab
**Very Brief Intro:** Tünd texniki laboratoriya atmosferini terminal yaşıl, loqodan gələn qırmızı və elektrik göyü siqnallarla birləşdirən akademik-kiber vizual dil. Sayt tələbələrə həm praktik, həm də ciddi görünən bir klub dünyası hiss etdirir.
**Probability:** 0.06

### Theme Name: Redline Campus
**Very Brief Intro:** Ağ və açıq boz fon, qırmızı-göy diaqonal xətlər və universitet kataloqu estetikası ilə daha rəsmi, kampus-yönümlü təqdimat. Klubun akademik tərəfini əsas plana çıxarır.
**Probability:** 0.03

### Theme Name: Terminal Afterdark
**Very Brief Intro:** Qaranlıq, sərt və yüksək kontrastlı neon terminal təcrübəsi; kursor, log sətrləri və kod blokları ilə daha eksperimental gecə laboratoriyası hissi. Kiber təhlükəsizliyin enerji və ritmini vurğulayır.
**Probability:** 0.08

## Chosen direction: Signal Lab

### Design Movement
Neo-brutalist editorial interface meets university cyber-lab dashboard. Layouts should feel engineered, legible and intentional rather than glossy or generic.

### Core Principles
1. **Signal over decoration:** Every glow, line and status detail should clarify hierarchy or make the club's practice feel tangible.
2. **Academic credibility:** Copy, spacing and structure must feel trustworthy enough for a university organization.
3. **Asymmetric rhythm:** Use split hero compositions, staggered cards and offset section markers instead of centered template blocks.
4. **Human practice:** Pair technical graphics with language about learning, mentoring, teamwork and ethical defense.

### Color Philosophy
Charcoal black is the working surface of a lab; terminal green represents live learning and operational readiness; red and electric blue preserve the split identity of the supplied emblem and distinguish action from infrastructure. White is reserved for primary reading, while softened slate keeps secondary copy calm.

### Layout Paradigm
A wide editorial canvas with a left rail for section numbers/status labels and a fluid main column. The hero uses an asymmetric copy-and-image split. Cards are arranged as uneven clusters, with thin rules and horizontal telemetry bars making sections feel connected.

### Signature Elements
- Thin green telemetry line with a blinking status dot.
- Red/blue split accents echoing the shield in the supplied logo.
- Small monospace labels such as `SYS.STATUS`, `LAB/01`, and `ACCESS_LEVEL` used as orientation cues.

### Interaction Philosophy
Interactions should feel like a responsive instrument: buttons give a physical press response, cards reveal a little more structure on hover, and forms confirm action with a clear status message rather than playful confetti. Focus states use terminal green rings and remain visible.

### Animation
Use short ease-out transitions under 280ms for hover, button press and mobile menu. Reveal sections with subtle opacity/translate transitions only when reduced motion is not requested. Use one slow ambient pulse for the hero status indicator; do not animate layout dimensions or make text flicker.

### Typography System
Use **Space Grotesk** for display and interface headings, with **IBM Plex Mono** for labels, code-like metadata and numbers. Headlines are tight, bold and sentence-cased; body text is 16–18px with generous line-height. Monospace labels are uppercase with expanded tracking.

### Brand Essence
Zero Day is Gəncə Dövlət Universitetinin tələbələr üçün kiber təhlükəsizlik laboratoriyasıdır: nəzəriyyəni real müdafiə praktikası ilə birləşdirir. Personality: **sharp, collaborative, disciplined**.

### Brand Voice
Headlines are direct and active; CTAs sound like an invitation into practice, not generic marketing. Microcopy is concise and transparent.

Example lines:
- “Sistemi yalnız izləmə. Onu başa düş.”
- “Növbəti laboratoriyaya daxil ol.”

### Wordmark & Logo
Use the supplied circular Zero Day Club emblem as the primary identity lockup. Pair it with a custom text lockup that separates `ZERO DAY` from the smaller `GDU / CYBERSECURITY CLUB` line. Use the generated shield-circuit symbol only as a compact navigation mark and favicon.

### Signature Brand Color
**Signal Green — #B9F227**. It is an ownable operational green: brighter than institutional green, less decorative than neon, and reserved for live status, focus and action.

## Content decisions

The first frontend is a single-page presentation site with anchor navigation. It includes: Hero, About, Learning Tracks, Events, Projects, Team, Gallery, Contact and Membership form. Event, project and team entries are clearly sample content and can be replaced later without changing the component structure. Forms are frontend-only and show confirmation states; no backend submission is implied.
