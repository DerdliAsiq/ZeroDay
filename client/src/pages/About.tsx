import { ASSETS, hideBrokenImg } from "@/lib/site";
import { LockKeyhole } from "lucide-react";

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
              <div className="about-team-board">
                <div className="team-board-header"><div><span className="micro-label"><span className="green-bar" /> CLUB STRUCTURE</span><h3>Komanda və vəzifə bölgüsü</h3></div><span className="team-board-code">ZERO DAY / PEOPLE</span></div>
                <div className="team-board-frame"><img src={ASSETS.teamBoard} alt="Zero Day Club komanda və vəzifə bölgüsü: sədr, mentor, teaching assistant, social media manager və success manager rolları" loading="lazy" decoding="async" onError={hideBrokenImg} /></div>
                <div className="team-board-caption"><span>GDU / RİYAZİYYAT VƏ İNFORMATİKA FAKÜLTƏSİ</span><span>STRUCTURE MAP / 2026</span></div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
