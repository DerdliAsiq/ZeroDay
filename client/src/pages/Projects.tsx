import { hideBrokenImg } from "@/lib/site";
import { ArrowUpRight, Github } from "lucide-react";

const projects = [
  {
    code: "ZDC / 001",
    title: "OmniVision",
    text: "Kritik obyektlərin və İnsansız Dəniz Vasitələrinin monitorinqi üçün Edge AI müşahidə platforması. YOLO aşkarlama, izləmə, taktiki HUD və C2 panelini birləşdirir.",
    image: "/images/project-omnivision.png",
    github: "https://github.com/DerdliAsiq/OmniVision",
    techs: ["Python", "YOLOv8", "FastAPI", "SQLite"],
    status: "İnkişafda",
  },
  {
    code: "ZDC / 002",
    title: "GBU-forum",
    text: "Gəncə Bərəkət Universiteti üçün forum tətbiqi. Kateqoriyalar, postlar, cavablar, profillər və admin paneli var.",
    image: "/images/project-gbu-forum.png",
    github: "https://github.com/DerdliAsiq/GBU-forum",
    techs: ["TypeScript", "React", "Express", "PostgreSQL"],
    status: "İnkişafda",
  },
  {
    code: "ZDC / 003",
    title: "ZeroTool",
    text: "Domen və IP ünvanları üçün modul OSINT və kəşfiyyat aləti. WHOIS, DNS, port və WAF analizləri aparır.",
    image: "/images/project-zerotool.png",
    github: "https://github.com/DerdliAsiq/ZeroTool",
    techs: ["Python", "OSINT", "DNS", "Pytest"],
    status: "İnkişafda",
  },
  {
    code: "ZDC / 004",
    title: "fidanbot",
    text: "Telegram üçün Python botu. Salam mesajları, YouTube yükləmə, admin əmrləri və qrup idarəetməsi edir.",
    image: "/images/project-fidanbot.png",
    github: "https://github.com/DerdliAsiq/fidanbot",
    techs: ["Python", "Telegram Bot API", "aiohttp"],
    status: "İnkişafda",
  },
  {
    code: "ZDC / 005",
    title: "Hacker-Hunter",
    text: "Terminaldə işləyən interaktiv kibertəhlükəsizlik mətn oyunu. OSINT və giriş ssenarilərini simulyasiya edir.",
    image: "/images/project-hacker-hunter.png",
    github: "https://github.com/DerdliAsiq/Hacker-Hunter",
    techs: ["Python", "CLI", "JSON"],
    status: "İnkişafda",
  },
  {
    code: "ZDC / 006",
    title: "DeryaForce",
    text: "Sızma testləri üçün hash analiz və bərpa aləti. GPU varsa Hashcat, yoxdursa John the Ripper istifadə edir.",
    image: "/images/project-deryaforce.png",
    github: "https://github.com/DerdliAsiq/DeryaForce",
    techs: ["Python", "Hashcat", "Kali Linux"],
    status: "İnkişafda",
  },
  {
    code: "ZDC / 007",
    title: "DefHunter",
    text: "Pentest laboratoriyaları üçün çoxmodullu zəiflik aşkarlama aləti. Yanlış konfiqurasiyaları tapır.",
    image: "/images/project-defhunter.png",
    github: "https://github.com/DerdliAsiq/DefHunter",
    techs: ["Python", "Networking", "Multi-threading"],
    status: "İnkişafda",
  },
];

export default function Projects() {
  return (
    <div className="site-shell">
      <main id="main-content">
        <section className="section section-projects">
          <div className="container">
            <div className="micro-label"><span className="green-bar" /> BUILT TO LEARN</div>
            <div className="tracks-heading"><h2>Fikirdən<br /><span>müdafiəyə.</span></h2><p>Klub üzvlərinin açıq mənbə layihələri — kodu incələ, töhfə ver.</p></div>
            <div className="project-cards">
              {projects.map((p) => (
                <article className="project-card" key={p.code}>
                  <div className="project-thumb"><img src={p.image} alt={`${p.title} layihə görüntüsü`} loading="lazy" decoding="async" onError={hideBrokenImg} /><span className="project-status-badge"><span className="status-dot status-in-build" />{p.status}</span></div>
                  <div className="project-card-body">
                    <div className="project-code">{p.code}</div>
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                    <div className="project-techs">{p.techs.map((t) => <span key={t}>{t}</span>)}</div>
                    <a className="project-github" href={p.github} target="_blank" rel="noreferrer"><Github size={16} /> GitHubda görüntülə <ArrowUpRight size={15} /></a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
