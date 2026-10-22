import { ASSETS, hideBrokenImg } from "@/lib/site";
import { LockKeyhole } from "lucide-react";

const MENTORS = [
  {
    name: "Bərzamin Eyvazov",
    role: "SƏDR / MENTOR",
    initials: "BE",
    image: ASSETS.mentorBerzamin,
    alt: "Bərzamin Eyvazov — Sədr / Mentor",
    bio: "Bərzamin Eyvazov kibertəhlükəsizlik və proqram təminatının hazırlanması sahəsində inkişaf edən gənc mütəxəssisdir. O, Linux, penetrasiya testləri, zəifliklərin araşdırılması, şəbəkə təhlükəsizliyi və Python əsaslı avtomatlaşdırma üzərində çalışır. Hazırda Holberton School-da kibertəhlükəsizlik, Gəncə Dövlət Universitetində isə Kompüter Elmləri üzrə təhsil alır. Bərzamin həmçinin süni intellekt, təhlükəsizlik sistemləri və praktiki kibertəhlükəsizlik layihələri ilə maraqlanır.",
  },
  {
    name: "Natəvan Rüstəmova",
    role: "SƏDR MÜAVİNİ",
    initials: "NR",
    image: ASSETS.mentorNatevan,
    alt: "Natəvan Rüstəmova — Sədr müavini",
    bio: "Natəvan Rüstəmova texnologiya, kibertəhlükəsizlik və rəqəmsal sahələrə böyük marağı olan, təşkilatçılıq və liderlik bacarıqları olan bir gəncdir. O, klub daxilində layihələrin idarə olunması, tədbirlərin təşkili istiqamətində fəaliyyət göstərir. Hazırda Gəncə Dövlət Universitetində Kompüter Elmləri üzrə təhsil alır və Zero Day Cyber Club-ın Sədr müavini olaraq klubun inkişafına və tələbələrin birgə öyrənmə mühitinin formalaşdırılmasına töhfə verir.",
  },
  {
    name: "Ramil Əliyev",
    role: "MENTOR",
    initials: "RE",
    image: ASSETS.mentorRamil,
    alt: "Ramil Əliyev — Mentor",
    bio: "Məlumat tezliklə əlavə olunacaq.",
  },
  {
    name: "Qasımov Kazım",
    role: "İdarə heyəti",
    initials: "QK",
    image: ASSETS.mentorKazim,
    alt: "Qasımov Kazım — İdarə heyəti",
    bio: "Məlumat tezliklə əlavə olunacaq.",
  },
  {
    name: "Aydan Abbasova",
    role: "İdarə heyəti",
    initials: "AA",
    image: ASSETS.mentorAydan,
    alt: "Aydan Abbasova — İdarə heyəti",
    bio: "Məlumat tezliklə əlavə olunacaq.",
  },
  {
    name: "Ferrux Ismayilov",
    role: "İdarə heyəti",
    initials: "FI",
    image: ASSETS.mentorFerrux,
    alt: "Ferrux Ismayilov — İdarə heyəti",
    bio: "Məlumat tezliklə əlavə olunacaq.",
  },
  {
    name: "Aytac Celil",
    role: "Sədər müavini",
    initials: "AC",
    image: ASSETS.mentorAytac,
    alt: "Aytac Celil — Sədər müavini",
    bio: "Məlumat tezliklə əlavə olunacaq.",
  },
];

export default function About() {
  return (
    <div className="site-shell">
      <main id="main-content">
        <section className="section section-about">
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
                <div className="body-copy"><p>Gəncə Dövlət Universitetinin klub mühiti daxilində birlikdə araşdırır, sənədləşdirir və müdafiə yönümlü düşüncə formalaşdırırıq.</p></div>
              </div>
              <div className="about-image-wrap"><img src={ASSETS.network} alt="Abstrakt şəbəkə xəritəsi" className="about-image" loading="lazy" decoding="async" onError={hideBrokenImg} /><div className="image-caption"><span>FIELD NOTE / 001</span><span>Observe. Map. Defend.</span></div></div>
              <div className="about-mentors">
                <div className="team-board-header"><div><span className="micro-label"><span className="green-bar" /> CLUB TEAM</span><h3>Komanda</h3></div><span className="team-board-code">ZERO DAY / PEOPLE</span></div>
                {MENTORS.map((m) => (
                  <article className="mentor-card" key={m.name}>
                    <div className="mentor-photo">
                      <span className="mentor-initials" aria-hidden="true">{m.initials}</span>
                      <img src={m.image} alt={m.alt} loading="lazy" decoding="async" onError={hideBrokenImg} />
                    </div>
                    <div className="mentor-info">
                      <div className="mentor-role">{m.role}</div>
                      <h4>{m.name}</h4>
                      <p>{m.bio}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
