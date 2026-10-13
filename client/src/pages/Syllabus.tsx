import { ALL_LESSONS, SYLLABUS, SYLLABUS_META, lessonStatus, nextLessonISO } from "@/lib/syllabus";
import { ArrowUpRight, BookOpenCheck, CalendarDays, ChevronDown } from "lucide-react";
import { Link } from "wouter";

const STATUS_LABEL: Record<string, string> = {
  done: "KEÇİRİLDİ",
  next: "NÖVBƏTİ DƏRS",
  todo: "QARŞIDA",
};

export default function Syllabus() {
  const nextISO = nextLessonISO();
  const nextNo = ALL_LESSONS.find((l) => l.dateISO === nextISO)?.no ?? null;
  const doneCount = ALL_LESSONS.filter((l) => lessonStatus(l.dateISO, nextISO) === "done").length;

  return (
    <div className="site-shell">
      <main id="main-content">
        <section className="section section-syllabus">
          <div className="container split-layout">
            <div className="section-rail"><span className="section-index">04</span><span className="section-label">CURRICULUM</span><span className="rail-line" /></div>
            <div className="syllabus-main">
              <div className="section-heading-row">
                <div>
                  <div className="micro-label"><span className="green-bar" /> ZERO DAY / TRAINING</div>
                  <h2>Tədris<br /><span>proqramı.</span></h2>
                </div>
                <div className="heading-mark"><BookOpenCheck size={23} /><span>15 WEEKS<br />SEP — DEC 2026</span></div>
              </div>
              <p className="syllabus-lead">{SYLLABUS_META.intro}</p>
              <div className="syllabus-meta">
                <span><CalendarDays size={14} /> {SYLLABUS_META.schedule}</span>
                <span className="syllabus-progress">{doneCount} / {ALL_LESSONS.length} dərs keçirildi</span>
              </div>

              <div className="table-scroll">
                <table className="syllabus-table">
                  <thead>
                    <tr><th>Dərs</th><th>Tarix</th><th>Mövzu Bölməsi</th><th>Əsas Focus</th><th>Status</th></tr>
                  </thead>
                  <tbody>
                    {ALL_LESSONS.map((l) => {
                      const st = lessonStatus(l.dateISO, nextISO);
                      return (
                        <tr key={l.no} className={st === "next" ? "row-next" : ""}>
                          <td className="cell-no">Dərs {l.no}</td>
                          <td>{l.date}</td>
                          <td>{l.title}</td>
                          <td>{l.focus}</td>
                          <td><span className={`lesson-status st-${st}`}>{STATUS_LABEL[st]}</span></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="syllabus-modules">
                {SYLLABUS.map((m) => {
                  const open = nextNo !== null && m.lessons.some((l) => l.no === nextNo);
                  return (
                    <details className="syllabus-module" key={m.index} open={open}>
                      <summary>
                        <span className="card-index">{m.index} <span>{m.tag}</span></span>
                        <span className="module-title">{m.title}</span>
                        <ChevronDown size={18} className="module-chevron" />
                      </summary>
                      <div className="module-lessons">
                        {m.lessons.map((l) => {
                          const st = lessonStatus(l.dateISO, nextISO);
                          return (
                            <article key={l.no} className="module-lesson">
                              <div className="module-lesson-top">
                                <span className="cell-no">Dərs {l.no} — {l.date}</span>
                                <span className={`lesson-status st-${st}`}>{STATUS_LABEL[st]}</span>
                              </div>
                              <h4>{l.title}</h4>
                              <ul>{l.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
                            </article>
                          );
                        })}
                      </div>
                    </details>
                  );
                })}
              </div>

              <div className="tracks-cta">
                <h3>Dərslərə qoşulmağa hazırsan?</h3>
                <p>Qeydiyyatdan keç — növbəti dərsin yeri və vaxtı sənə göndəriləcək.</p>
                <div className="hero-actions">
                  <Link className="button button-primary" href="/qeydiyyat">Kluba qoşul <ArrowUpRight size={17} /></Link>
                </div>
              </div>
              <p className="syllabus-term">{SYLLABUS_META.term}</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
