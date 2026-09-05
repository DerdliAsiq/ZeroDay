import { ArrowDownRight, Terminal, Users } from "lucide-react";

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
    icon: Users,
    title: "Komanda və CTF",
    description: "Komanda daxilində düşün, tapşırıqları bölüşdür və yarış formatında özünü yoxla.",
    tag: "COLLAB",
  },
];

export default function Tracks() {
  return (
    <div className="site-shell">
      <main id="main-content">
        <section className="section section-tracks">
          <div className="container">
            <div className="section-topline"><div className="micro-label"><span className="green-bar" /> HOW WE LEARN</div><span className="topline-meta">/ 2 CORE TRACKS</span></div>
            <div className="tracks-heading"><h2>İki istiqamət.<br /><span>Bir müdafiə</span> düşüncəsi.</h2></div>
            <div className="tracks-grid">
              {tracks.map((track) => { const Icon = track.icon; return <article className="track-card" key={track.index}><div className="card-index">{track.index} <span>{track.tag}</span></div><div className="track-icon"><Icon size={24} strokeWidth={1.4} /></div><h3>{track.title}</h3><p>{track.description}</p><div className="card-arrow"><ArrowDownRight size={19} /></div></article>; })}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
