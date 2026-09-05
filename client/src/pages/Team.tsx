import { ArrowUpRight, Sparkles } from "lucide-react";

const team = [
  { initials: "ZD", role: "Klub rəhbərliyi", name: "Zero Day koordinasiya heyəti", color: "green" },
  { initials: "CT", role: "Tələbə komandaları", name: "CTF və layihə iştirakçıları", color: "red" },
];

export default function Team() {
  return (
    <div className="site-shell">
      <main id="main-content">
        <section className="section section-team">
          <div className="container split-layout">
            <div className="section-rail"><span className="section-index">02</span><span className="section-label">THE CREW</span><span className="rail-line" /></div>
            <div className="team-main"><div className="section-heading-row"><div><div className="micro-label"><span className="green-bar" /> PEOPLE BEHIND THE SIGNAL</div><h2>Birlikdə daha<br /><span>güclüyük.</span></h2></div><Sparkles size={27} className="section-icon green-icon" /></div><div className="team-grid">{team.map((member) => <article className="team-card" key={member.role}><div className={`avatar avatar-${member.color}`}>{member.initials}</div><div><span className="team-role">{member.role}</span><h3>{member.name}</h3></div><ArrowUpRight size={17} className="team-arrow" /></article>)}</div></div>
          </div>
        </section>
      </main>
    </div>
  );
}
