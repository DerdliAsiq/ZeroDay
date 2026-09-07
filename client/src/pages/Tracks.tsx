import { ArrowDownRight, ArrowUpRight, ChevronRight, FlaskConical, Terminal, Users } from "lucide-react";
import { Link } from "wouter";

const tracks = [
  {
    index: "01",
    icon: Terminal,
    title: "Təhlükəsizlik əsasları",
    description: "Şəbəkələr, əməliyyat sistemləri və təhlükə modellərini real nümunələr üzərindən anla.",
    tag: "FOUNDATION",
    topics: ["Linux və terminal", "Şəbəkə əsasları", "TCP/IP və DNS", "Python ilə avtomatlaşdırma", "Web təhlükəsizliyinə giriş", "OSINT", "Təhlükə modelləri"],
    level: "BEGINNER → INTERMEDIATE",
    format: "HƏFTƏLİK PRAKTİKA",
  },
  {
    index: "02",
    icon: Users,
    title: "Komanda və CTF",
    description: "Komanda daxilində düşün, tapşırıqları bölüşdür və yarış formatında özünü yoxla.",
    tag: "COLLAB",
    topics: ["Web exploitation", "OSINT tapşırıqları", "Cryptography", "Digital forensics", "Reverse engineering", "Privilege escalation", "Komanda daxili yarışlar"],
    level: "INTERMEDIATE",
    format: "CTF · TEAM PRACTICE",
  },
  {
    index: "03",
    icon: FlaskConical,
    title: "Layihə laboratoriyası",
    description: "Fikirdən işlək sistemə. Real layihələr üzərində işlə, kodu yaz, nəticəni GitHub-da paylaş.",
    tag: "LAB",
    topics: ["Python layihələri", "Şəbəkə alətləri", "OSINT sistemləri", "Telegram botları", "Təhlükəsizlik avtomatlaşdırması", "Açıq mənbəyə töhfə"],
    level: "INTERMEDIATE → ADVANCED",
    format: "REAL PROJECT · GITHUB",
    to: "/layiheler",
  },
];

export default function Tracks() {
  return (
    <div className="site-shell">
      <main id="main-content">
        <section className="section section-tracks">
          <div className="container">
            <div className="section-topline"><div className="micro-label"><span className="green-bar" /> HOW WE LEARN</div><span className="topline-meta">/ 3 CORE TRACKS</span></div>
            <div className="tracks-heading"><h2>Üç istiqamət.<br /><span>Bir müdafiə</span> düşüncəsi.</h2><p>Əsas anlayışlardan komandaya, komandadan real açıq mənbə layihələrinə gedən yol.</p></div>
            <div className="tracks-grid">
              {tracks.map((track) => {
                const Icon = track.icon;
                const body = (
                  <>
                    <div className="card-index">{track.index} <span>{track.tag}</span></div>
                    <div className="track-icon"><Icon size={24} strokeWidth={1.4} /></div>
                    <h3>{track.title}</h3>
                    <p>{track.description}</p>
                    <ul className="track-topics">{track.topics.map((t) => <li key={t}>{t}</li>)}</ul>
                    <div className="track-meta"><span>LEVEL / {track.level}</span><span>FORMAT / {track.format}</span></div>
                    <div className="card-arrow"><ArrowDownRight size={19} /></div>
                  </>
                );
                return track.to ? (
                  <Link key={track.index} href={track.to} className="track-card track-card-link">{body}</Link>
                ) : (
                  <article className="track-card" key={track.index}>{body}</article>
                );
              })}
            </div>
            <div className="tracks-cta">
              <h3>Növbəti səviyyəyə keçməyə hazırsan?</h3>
              <p>Sıfırdan başla, praktika ilə inkişaf et, komanda ilə real layihələr hazırla.</p>
              <div className="hero-actions">
                <Link className="button button-primary" href="/qeydiyyat">Kluba qoşul <ArrowUpRight size={17} /></Link>
                <Link className="button button-ghost" href="/layiheler">Layihələrə bax <ChevronRight size={17} /></Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
