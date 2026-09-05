import { ArrowUpRight, Braces, Network } from "lucide-react";
import { toast } from "sonner";

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
    title: "Trace Notes",
    text: "Öyrənilənləri sənədləşdirən açıq bilik arxivi və klub resurs xəritəsi.",
    status: "PLANNED",
    icon: Braces,
  },
];

export default function Projects() {
  return (
    <div className="site-shell">
      <main id="main-content">
        <section className="section section-projects">
          <div className="container project-layout">
            <div className="project-intro"><div className="micro-label"><span className="green-bar" /> BUILT TO LEARN</div><h2>Fikirdən<br /><span>müdafiəyə.</span></h2><p>Kiçik layihələr böyük sistemləri başa düşmək üçün başlanğıcdır. Klubun növbəti izlərini burada saxlayırıq.</p><button className="text-link" onClick={() => toast.info("Layihə arxivi", { description: "Layihə detallarını klub görüşlərində birlikdə genişləndirəcəyik." })}>Layihə arxivini aç <ArrowUpRight size={16} /></button></div>
            <div className="project-list">{projects.map((project) => { const Icon = project.icon; return <article className="project-row" key={project.code}><div className="project-code">{project.code}<span className={`status-dot status-${project.status.replace(" ", "-").toLowerCase()}`} /></div><div className="project-icon"><Icon size={22} strokeWidth={1.25} /></div><div className="project-content"><h3>{project.title}</h3><p>{project.text}</p></div><span className="project-status">{project.status}</span></article>; })}</div>
          </div>
        </section>
      </main>
    </div>
  );
}
