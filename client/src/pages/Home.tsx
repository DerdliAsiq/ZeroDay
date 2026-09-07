import { ASSETS, hideBrokenImg } from "@/lib/site";
import { Activity, ArrowUpRight, ChevronRight, CircleDot, ShieldCheck } from "lucide-react";
import { Link } from "wouter";

const pageCards = [
  { to: "/haqqimizda", index: "01", tag: "ABOUT", title: "Haqqımızda", text: "Klubun missiyası və komanda quruluşu." },
  { to: "/istiqametler", index: "02", tag: "TRACKS", title: "Öyrənmə istiqamətləri", text: "İki istiqamət, bir müdafiə düşüncəsi." },
  { to: "/layiheler", index: "03", tag: "PROJECTS", title: "Layihələr", text: "Fikirdən müdafiəyə gedən yol." },
  { to: "/gallery", index: "04", tag: "GALLERY", title: "Qalereya", text: "Klubdan kadrlar və tədbir anları." },
  { to: "/qeydiyyat", index: "05", tag: "JOIN", title: "Qeydiyyat", text: "Rəsmi tələbə qeydiyyat formu." },
  { to: "/elaqe", index: "06", tag: "CONTACT", title: "Əlaqə", text: "Sualın var? Bizə yaz." },
];

export default function Home() {
  return (
    <div className="site-shell">
      <a href="#main-content" className="skip-link">Əsas məzmuna keç</a>
      <main id="main-content">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-image" style={{ backgroundImage: `url(${ASSETS.hero})` }} />
          <div className="hero-overlay" />
          <div className="hero-grid" />
          <div className="container hero-layout">
            <div className="hero-content">
              <h1 id="hero-title">Sistemi yalnız<br /><em>izləmə.</em><br />Onu başa düş.</h1>
              <p className="hero-description">Zero Day — Gəncə Dövlət Universitetinin tələbələri üçün kiber təhlükəsizliyi nəzəriyyədən praktikaya daşıyan öyrənmə klubudur.</p>
              <div className="hero-actions">
                <Link className="button button-primary" href="/qeydiyyat">
                  Qoşul <ArrowUpRight size={17} />
                </Link>
                <Link className="button button-ghost" href="/haqqimizda">
                  Klub haqqında <ChevronRight size={17} />
                </Link>
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
            <div><span className="metric-value">02</span><span className="metric-label">ÖYRƏNMƏ İSTİQAMƏTİ</span></div>
            <div><span className="metric-value">07</span><span className="metric-label">AÇIQ LAYİHƏ</span></div>
            <div><span className="metric-value">∞</span><span className="metric-label">BİRGƏ TƏCRÜBƏ</span></div>
            <div className="signal-note"><Activity size={17} /><span>İndi öyrənilir: <strong>Network Defense</strong></span></div>
          </div>
        </section>

        <section className="section section-tracks">
          <div className="container">
            <div className="section-topline"><div className="micro-label"><span className="green-bar" /> EXPLORE</div><span className="topline-meta">/ 6 SECTIONS</span></div>
            <div className="tracks-heading"><h2>Klubu<br /><span>kəşf et.</span></h2></div>
            <div className="tracks-grid">
              {pageCards.map((page) => (
                <Link key={page.to} href={page.to} className="track-card page-card">
                  <div className="card-index">{page.index} <span>{page.tag}</span></div>
                  <h3 className="page-card-title">{page.title}</h3>
                  <p>{page.text}</p>
                  <div className="card-arrow"><ArrowUpRight size={19} /></div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
