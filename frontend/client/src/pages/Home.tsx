/*
 * Signal Lab design: editorial cyber-lab interface for Zero Day / GDU.
 * Use dark surfaces, technical labels, asymmetric sections, and restrained motion.
 */
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Braces,
  CalendarDays,
  Check,
  ChevronRight,
  CircleDot,
  Cpu,
  Crosshair,
  Github,
  Instagram,
  LockKeyhole,
  Mail,
  MapPin,
  Menu,
  Network,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  Terminal,
  Users,
  X,
} from "lucide-react";

// Prod görselleri: client/public/images/ içine koy.
// logo.jpg, mark.png, hero.jpg, network.jpg, workshop.jpg, team-board.jpeg
// Dosya yoksa onError ile gizlenip gradient fallback gösterilir.
const ASSETS = {
  logo: "/images/logo.jpg",
  mark: "/images/mark.png",
  hero: "/images/hero.jpg",
  network: "/images/network.jpg",
  workshop: "/images/workshop.jpg",
  teamBoard: "/images/team-board.jpeg",
};

function hideBrokenImg(event: React.SyntheticEvent<HTMLImageElement>) {
  event.currentTarget.style.display = "none";
}

const navItems = [
  { href: "#about", label: "Haqqımızda" },
  { href: "#events", label: "Tədbirlər" },
  { href: "#projects", label: "Layihələr" },
  { href: "#team", label: "Komanda" },
  { href: "#contact", label: "Əlaqə" },
];

const tracks = [
  {
    index: "01",
    icon: Terminal,
    title: "Təhlükəsizlik əsasları",
    description: "Şəbəkələr, əməliyyat sistemləri və təhlükə modellərini real nümunələr üzərindən anla.",
    tag: "FOUNDATION",
  },
  {
    index: "02",
    icon: ScanSearch,
    title: "Praktiki laboratoriyalar",
    description: "İzləri analiz et, zəiflikləri tap və müdafiə mexanizmlərini təhlükəsiz mühitdə sına.",
    tag: "HANDS-ON",
  },
  {
    index: "03",
    icon: Users,
    title: "Komanda və CTF",
    description: "Komanda daxilində düşün, tapşırıqları bölüşdür və yarış formatında özünü yoxla.",
    tag: "COLLAB",
  },
];

const events = [
  {
    date: "12 OKT",
    month: "2026",
    title: "Zero Day açıq laboratoriyası",
    type: "Workshop",
    detail: "Şəbəkə təhlükəsizliyinə giriş və ilk praktiki ssenari.",
    accent: "green",
  },
  {
    date: "26 OKT",
    month: "2026",
    title: "Mini CTF: First Trace",
    type: "Challenge",
    detail: "Yeni başlayanlar üçün iz analizi və məntiq tapşırıqları.",
    accent: "red",
  },
  {
    date: "09 NOY",
    month: "2026",
    title: "Müdafiə sistemlərinin anatomiyası",
    type: "Talk",
    detail: "Təhlükəsizlik əməliyyatlarına kampus daxilindən baxış.",
    accent: "blue",
  },
];

const projects = [
  {
    code: "ZDC / 001",
    title: "Campus Sentinel",
    text: "Kampus şəbəkəsində təhlükəsizliyə dair müşahidə və maarifləndirmə layihəsi.",
    status: "RESEARCH",
    icon: Network,
  },
  {
    code: "ZDC / 002",
    title: "Lab Zero",
    text: "Tələbələr üçün ssenari əsaslı, etik və təhlükəsiz təcrübə laboratoriyası.",
    status: "IN BUILD",
    icon: Cpu,
  },
  {
    code: "ZDC / 003",
    title: "Trace Notes",
    text: "Öyrənilənləri sənədləşdirən açıq bilik arxivi və klub resurs xəritəsi.",
    status: "PLANNED",
    icon: Braces,
  },
];

const team = [
  { initials: "ZD", role: "Klub rəhbərliyi", name: "Zero Day koordinasiya heyəti", color: "green" },
  { initials: "MT", role: "Mentor dəstəyi", name: "Praktiki laboratoriya komandası", color: "blue" },
  { initials: "CT", role: "Tələbə komandaları", name: "CTF və layihə iştirakçıları", color: "red" },
];

function scrollToTarget(href: string, closeMenu?: () => void) {
  closeMenu?.();
  const element = document.querySelector(href);
  if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [membershipSent, setMembershipSent] = useState(false);
  const [contactSent, setContactSent] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleMembershipSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (String(data.get("company") ?? "").trim() !== "") return;
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const major = String(data.get("major") ?? "").trim();
    const interest = String(data.get("interest") ?? "").trim();
    const note = String(data.get("note") ?? "").trim();
    const subject = encodeURIComponent(`ZeroDay üzvlük: ${name} (${major})`);
    const body = encodeURIComponent(`Ad: ${name}\nE-poçt: ${email}\nİxtisas: ${major}\nMaraq: ${interest}\nQeyd: ${note}`);
    setMembershipSent(true);
    toast.success("Müraciət hazırdır", {
      description: "Backend yoxdur — e-poçt proqramın açılır, göndər ki, müraciət çatsın.",
      action: {
        label: "E-poçt aç",
        onClick: () => { window.location.href = `mailto:zeroday@gdu.edu.az?subject=${subject}&body=${body}`; },
      },
    });
    form.reset();
  }

  function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (String(data.get("company") ?? "").trim() !== "") return;
    const name = String(data.get("contact-name") ?? "").trim();
    const email = String(data.get("contact-email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const subject = encodeURIComponent(`ZeroDay sual: ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    setContactSent(true);
    toast.success("Mesaj hazırdır", {
      description: "Backend yoxdur — e-poçt proqramın açılır, göndər ki, mesaj çatsın.",
      action: {
        label: "E-poçt aç",
        onClick: () => { window.location.href = `mailto:zeroday@gdu.edu.az?subject=${subject}&body=${body}`; },
      },
    });
    form.reset();
  }

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <a href="#main-content" className="skip-link" onClick={(e) => { e.preventDefault(); scrollToTarget("#main-content"); }}>Əsas məzmuna keç</a>
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="container header-inner">
          <a href="#top" className="brand-lockup" onClick={(e) => { e.preventDefault(); scrollToTarget("#top", closeMenu); }} aria-label="Zero Day ana səhifə">
            <span className="brand-mark-wrap">
              <img src={ASSETS.mark} alt="Zero Day qalxan işarəsi" className="brand-mark" loading="lazy" decoding="async" onError={hideBrokenImg} />
            </span>
            <span className="brand-copy">
              <span className="brand-name">ZERO DAY</span>
              <span className="brand-meta">GDU / CYBER CLUB</span>
            </span>
          </a>

          <nav className={`desktop-nav ${menuOpen ? "mobile-open" : ""}`} aria-label="Əsas naviqasiya">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={(e) => { e.preventDefault(); scrollToTarget(item.href, closeMenu); }}>
                {item.label}
              </a>
            ))}
            <a className="nav-cta" href="#join" onClick={(e) => { e.preventDefault(); scrollToTarget("#join", closeMenu); }}>
              Kluba qoşul <ArrowUpRight size={15} />
            </a>
          </nav>

          <button className="menu-toggle" onClick={() => setMenuOpen((value) => !value)} aria-label={menuOpen ? "Menyunu bağla" : "Menyunu aç"} aria-expanded={menuOpen}>
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </header>

      <main id="top"><span id="main-content" tabIndex={-1} />
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-image" style={{ backgroundImage: `url(${ASSETS.hero})` }} />
          <div className="hero-overlay" />
          <div className="hero-grid" />
          <div className="container hero-layout">
            <div className="hero-content">
              <div className="eyebrow"><span className="pulse-dot" /> GDU / LIVE LEARNING LAB <span className="eyebrow-line" /></div>
              <h1 id="hero-title">Sistemi yalnız<br /><em>izləmə.</em><br />Onu başa düş.</h1>
              <p className="hero-description">Zero Day — Gəncə Dövlət Universitetinin tələbələri üçün kiber təhlükəsizliyi nəzəriyyədən praktikaya daşıyan öyrənmə klubudur.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#join" onClick={(e) => { e.preventDefault(); scrollToTarget("#join"); }}>
                  Növbəti laboratoriyaya daxil ol <ArrowUpRight size={17} />
                </a>
                <a className="button button-ghost" href="#about" onClick={(e) => { e.preventDefault(); scrollToTarget("#about"); }}>
                  Klub haqqında <ChevronRight size={17} />
                </a>
              </div>
              <div className="hero-footnote"><span>ACCESS_LEVEL</span> STUDENT / CURIOUS / READY</div>
            </div>

            <div className="hero-console" aria-label="Zero Day fəaliyyət göstəricisi">
              <div className="console-top"><span>ZD_CONSOLE / 001</span><span className="console-live"><CircleDot size={11} /> ONLINE</span></div>
              <div className="console-body">
                <div className="console-shield"><img src={ASSETS.logo} alt="Zero Day Club loqosu" className="console-logo" loading="lazy" decoding="async" onError={hideBrokenImg} /><ShieldCheck size={22} strokeWidth={1.4} className="console-shield-icon" /></div>
                <div className="console-lines">
                  <div><span className="console-muted">$</span> initialize_zero_day<span className="cursor" /></div>
                  <div className="console-success">[ok] learning environment ready</div>
                  <div className="console-success">[ok] ethical practice enabled</div>
                  <div className="console-muted">[--] next_session: 12.10.2026</div>
                </div>
              </div>
              <div className="console-bottom"><span>GƏNCƏ / AZ</span><span>v.01.26</span></div>
            </div>
          </div>
          <div className="hero-scroll"><span className="scroll-line" /> aşağı sürüşdür</div>
        </section>

        <section className="signal-strip" aria-label="Klubun qısa göstəriciləri">
          <div className="container signal-grid">
            <div><span className="metric-value">01</span><span className="metric-label">LAB MÜHİTİ</span></div>
            <div><span className="metric-value">03</span><span className="metric-label">ÖYRƏNMƏ İSTİQAMƏTİ</span></div>
            <div><span className="metric-value">∞</span><span className="metric-label">BİRGƏ TƏCRÜBƏ</span></div>
            <div className="signal-note"><Activity size={17} /><span>İndi öyrənilir: <strong>Network Defense</strong></span></div>
          </div>
        </section>

        <section id="about" className="section section-about">
          <div className="container split-layout">
            <div className="section-rail"><span className="section-index">01</span><span className="section-label">WHO WE ARE</span><span className="rail-line" /></div>
            <div className="about-main">
              <div className="section-heading-row">
                <div>
                  <div className="micro-label"><span className="green-bar" /> ZERO DAY / MISSION</div>
                  <h2>Öyrənmək üçün<br /><span>təhlükəsiz</span> məkan.</h2>
                </div>
                <div className="heading-mark"><LockKeyhole size={23} /><span>ETHICAL<br />BY DESIGN</span></div>
              </div>
              <div className="about-copy-grid">
                <p className="lead-copy">Kiber təhlükəsizlik sadəcə kod yazmaq deyil. Bu, sual vermək, izləri görmək və sistemlərin necə düşündüyünü anlamaqdır.</p>
                <div className="body-copy"><p>Zero Day tələbələri nəzəri biliklərlə yanaşı, real problemləri təhlükəsiz laboratoriyalarda həll etməyə dəvət edir. Burada səhv etmək öyrənmə prosesinin bir hissəsidir.</p><p>Gəncə Dövlət Universitetinin klub mühiti daxilində birlikdə araşdırır, sənədləşdirir və müdafiə yönümlü düşüncə formalaşdırırıq.</p></div>
              </div>
              <div className="about-image-wrap"><img src={ASSETS.network} alt="Abstrakt şəbəkə xəritəsi" className="about-image" loading="lazy" decoding="async" onError={hideBrokenImg} /><div className="image-caption"><span>FIELD NOTE / 001</span><span>Observe. Map. Defend.</span></div></div>
              <div className="about-team-board">
                <div className="team-board-header"><div><span className="micro-label"><span className="green-bar" /> CLUB STRUCTURE</span><h3>Komanda və vəzifə bölgüsü</h3></div><span className="team-board-code">ZERO DAY / PEOPLE</span></div>
                <div className="team-board-frame"><img src={ASSETS.teamBoard} alt="Zero Day Club komanda və vəzifə bölgüsü: sədr, mentor, teaching assistant, social media manager və success manager rolları" loading="lazy" decoding="async" onError={hideBrokenImg} /></div>
                <div className="team-board-caption"><span>GDU / RİYAZİYYAT VƏ İNFORMATİKA FAKÜLTƏSİ</span><span>STRUCTURE MAP / 2026</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-tracks">
          <div className="container">
            <div className="section-topline"><div className="micro-label"><span className="green-bar" /> HOW WE LEARN</div><span className="topline-meta">/ 3 CORE TRACKS</span></div>
            <div className="tracks-heading"><h2>Üç istiqamət.<br /><span>Bir müdafiə</span> düşüncəsi.</h2><p>Zero Day-də hər dərs izlənə bilən bir sistem, hər laboratoriya isə sınana bilən bir hipotezdir.</p></div>
            <div className="tracks-grid">
              {tracks.map((track) => { const Icon = track.icon; return <article className="track-card" key={track.index}><div className="card-index">{track.index} <span>{track.tag}</span></div><div className="track-icon"><Icon size={24} strokeWidth={1.4} /></div><h3>{track.title}</h3><p>{track.description}</p><div className="card-arrow"><ArrowDownRight size={19} /></div></article>; })}
            </div>
          </div>
        </section>

        <section id="events" className="section section-events">
          <div className="container split-layout">
            <div className="section-rail"><span className="section-index">02</span><span className="section-label">NEXT SIGNALS</span><span className="rail-line" /></div>
            <div className="events-main">
              <div className="section-heading-row"><div><div className="micro-label"><span className="green-bar" /> UPCOMING EVENTS</div><h2>Gələn siqnallar.</h2></div><CalendarDays size={31} className="section-icon" /></div>
              <div className="events-list">
                {events.map((event) => <article className="event-row" key={event.title}><div className={`event-date event-${event.accent}`}><span>{event.date}</span><small>{event.month}</small></div><div className="event-info"><span className="event-type">{event.type}</span><h3>{event.title}</h3><p>{event.detail}</p></div><button className="row-action" aria-label={`${event.title} haqqında ətraflı`} onClick={() => toast.info("Tədbir detalları", { description: "Qeydiyyat linki yaxın zamanda aktiv olacaq." })}><ArrowUpRight size={19} /></button></article>)}
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="section section-projects">
          <div className="container project-layout">
            <div className="project-intro"><div className="micro-label"><span className="green-bar" /> BUILT TO LEARN</div><h2>Fikirdən<br /><span>müdafiəyə.</span></h2><p>Kiçik layihələr böyük sistemləri başa düşmək üçün başlanğıcdır. Klubun növbəti izlərini burada saxlayırıq.</p><button className="text-link" onClick={() => toast.info("Layihə arxivi", { description: "Layihə detallarını klub görüşlərində birlikdə genişləndirəcəyik." })}>Layihə arxivini aç <ArrowUpRight size={16} /></button></div>
            <div className="project-list">{projects.map((project) => { const Icon = project.icon; return <article className="project-row" key={project.code}><div className="project-code">{project.code}<span className={`status-dot status-${project.status.replace(" ", "-").toLowerCase()}`} /></div><div className="project-icon"><Icon size={22} strokeWidth={1.25} /></div><div className="project-content"><h3>{project.title}</h3><p>{project.text}</p></div><span className="project-status">{project.status}</span></article>; })}</div>
          </div>
        </section>

        <section id="team" className="section section-team">
          <div className="container split-layout">
            <div className="section-rail"><span className="section-index">03</span><span className="section-label">THE CREW</span><span className="rail-line" /></div>
            <div className="team-main"><div className="section-heading-row"><div><div className="micro-label"><span className="green-bar" /> PEOPLE BEHIND THE SIGNAL</div><h2>Birlikdə daha<br /><span>güclüyük.</span></h2></div><Sparkles size={27} className="section-icon green-icon" /></div><div className="team-grid">{team.map((member) => <article className="team-card" key={member.role}><div className={`avatar avatar-${member.color}`}>{member.initials}</div><div><span className="team-role">{member.role}</span><h3>{member.name}</h3></div><ArrowUpRight size={17} className="team-arrow" /></article>)}</div></div>
          </div>
        </section>

        <section className="section section-gallery">
          <div className="container gallery-layout"><div className="gallery-copy"><div className="micro-label"><span className="green-bar" /> FIELD NOTES</div><h2>Öyrənmə<br /><span>anları.</span></h2><p>Hər sessiya bir iz buraxır. Növbəti iz sənin ola bilər.</p><span className="gallery-counter">01 <i>/</i> 03</span></div><div className="gallery-image-main"><img src={ASSETS.workshop} alt="Kiber təhlükəsizlik workshop masası" loading="lazy" decoding="async" onError={hideBrokenImg} /><div className="gallery-overlay"><span>WORKSHOP / 01</span><span>GDU · ZERO DAY</span></div></div><div className="gallery-mini"><div className="mini-pattern"><Network size={25} /><span>NETWORK<br />STUDY</span></div><div className="mini-line" /><span>ARCHIVE<br />/ 2026</span></div></div>
        </section>

        <section id="join" className="section section-join">
          <div className="container join-layout"><div className="join-copy"><div className="micro-label"><span className="green-bar" /> INITIATE ACCESS</div><h2>İlk addımı<br /><span>indi at.</span></h2><p>Klubda öyrənmək üçün bütün cavabları bilməyə ehtiyac yoxdur. Sadəcə marağını gətir.</p><div className="join-note"><Check size={17} /><span>Backend yoxdur — göndər düyməsi e-poçt proqramını açır (zeroday@gdu.edu.az).</span></div></div><form className="cyber-form" onSubmit={handleMembershipSubmit}><div className="form-header"><span>MEMBERSHIP_REQUEST</span><span>01 / 04</span></div><input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0 }} /><label>Ad və soyad<input name="name" required minLength={2} autoComplete="name" placeholder="Adını daxil et" /></label><label>E-poçt ünvanı<input name="email" type="email" required autoComplete="email" placeholder="student@gdu.edu.az" /></label><div className="form-split"><label>İxtisas / fakültə<input name="major" required placeholder="Məs. Kompüter mühəndisliyi" /></label><label>Əsas maraq<select name="interest" required defaultValue=""><option value="" disabled>Seç</option><option>Şəbəkə təhlükəsizliyi</option><option>CTF və ethical hacking</option><option>Kriptoqrafiya</option><option>Rəqəmsal forensika</option></select></label></div><label>Özün haqqında qısa qeyd<textarea name="note" rows={3} maxLength={500} placeholder="Nə öyrənmək istəyirsən?" /></label><button className="button button-primary form-submit" type="submit">{membershipSent ? "Müraciət hazırdır" : "Müraciəti göndər"} <ArrowUpRight size={17} /></button></form></div>
        </section>

        <section id="contact" className="section section-contact">
          <div className="container contact-layout"><div><div className="micro-label"><span className="green-bar" /> OPEN CHANNEL</div><h2>Bir sualın<br /><span>var?</span></h2><p>Klubun fəaliyyəti, əməkdaşlıq və ya növbəti görüş haqqında bizə yaz.</p><div className="contact-details"><div><Mail size={18} /><span>zeroday@gdu.edu.az</span></div><div><MapPin size={18} /><span>Gəncə Dövlət Universiteti</span></div></div></div><form className="contact-form" onSubmit={handleContactSubmit}><input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0 }} /><label>Adın<input name="contact-name" required minLength={2} autoComplete="name" placeholder="Ad və soyad" /></label><label>E-poçtun<input name="contact-email" type="email" required autoComplete="email" placeholder="student@gdu.edu.az" /></label><label>Mesajın<textarea name="message" required minLength={5} maxLength={1000} rows={4} placeholder="Mesajını yaz..." /></label><button className="text-link" type="submit">{contactSent ? "Mesaj hazırdır" : "Mesaj göndər"} <ArrowUpRight size={16} /></button></form></div>
        </section>
      </main>

      <footer className="site-footer"><div className="container footer-inner"><div className="footer-brand"><img src={ASSETS.mark} alt="Zero Day işarəsi" loading="lazy" decoding="async" onError={hideBrokenImg} /><div><strong>ZERO DAY</strong><span>GDU / CYBERSECURITY CLUB</span></div></div><div className="footer-center"><span>Built for curious minds.</span><span className="footer-status"><CircleDot size={11} /> SYSTEM ONLINE</span></div><div className="footer-socials"><a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={18} /></a><a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a><a href="mailto:zeroday@gdu.edu.az" aria-label="E-poçt"><Mail size={18} /></a></div></div><div className="container footer-bottom"><span>© 2026 Zero Day Club · Gəncə Dövlət Universiteti</span><span>ETHICAL PRACTICE / ALWAYS</span></div></footer>
    </div>
  );
}
