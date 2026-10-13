import { ML_GRADING, ML_META, ML_MODULES, ML_RULES, ML_TECH } from "@/lib/ml-syllabus";
import { ALL_LESSONS, SYLLABUS, SYLLABUS_META, lessonStatus, nextLessonISO } from "@/lib/syllabus";
import { ArrowUpRight, BookOpenCheck, BrainCircuit, CalendarDays, ChevronDown, FileClock, TerminalSquare } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

const STATUS_LABEL: Record<string, string> = {
  done: "KEÇİRİLDİ",
  next: "NÖVBƏTİ DƏRS",
  todo: "QARŞIDA",
};

type Fenn = "kiber" | "python" | "ml";

const TABS: { id: Fenn; label: string; day: string }[] = [
  { id: "kiber", label: "Kibertəhlükəsizlik", day: "III GÜN" },
  { id: "python", label: "Python", day: "I GÜN" },
  { id: "ml", label: "Tətbiqi Riyaziyyat və ML", day: "II–IV GÜN" },
];

function initialFenn(): Fenn {
  if (typeof window === "undefined") return "kiber";
  const f = new URLSearchParams(window.location.search).get("fenn");
  return f === "python" || f === "ml" ? f : "kiber";
}

function KiberTab() {
  const nextISO = nextLessonISO();
  const nextNo = ALL_LESSONS.find((l) => l.dateISO === nextISO)?.no ?? null;
  const doneCount = ALL_LESSONS.filter((l) => lessonStatus(l.dateISO, nextISO) === "done").length;

  return (
    <>
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
      <p className="syllabus-term">{SYLLABUS_META.term}</p>
    </>
  );
}

function PythonTab() {
  return (
    <>
      <p className="syllabus-lead">I günlər keçirilən Python fənninin sillabusu hazırlanır.</p>
      <div className="coming-card">
        <span className="lesson-status st-todo">TEZLİKLƏ</span>
        <h3>Python sillabusu yoldadır</h3>
        <p>Mövzu bölgüsü dərc olunan kimi bu səhifədə görünəcək. Xəbərdarlıq üçün qeydiyyatdan keç.</p>
        <div className="hero-actions">
          <Link className="button button-primary" href="/qeydiyyat">Kluba qoşul <ArrowUpRight size={17} /></Link>
        </div>
      </div>
    </>
  );
}

function MlTab() {
  return (
    <>
      <p className="syllabus-lead">{ML_META.intro}</p>
      <div className="syllabus-meta">
        <span><CalendarDays size={14} /> {ML_META.schedule}</span>
        <span className="syllabus-progress">{ML_META.term}</span>
      </div>

      <div className="table-scroll">
        <table className="syllabus-table">
          <thead>
            <tr><th>Modul</th><th>Mövzu Bölməsi</th><th>Əsas Focus</th></tr>
          </thead>
          <tbody>
            {ML_MODULES.map((m) => (
              <tr key={m.index}>
                <td className="cell-no">Modul {m.index}</td>
                <td>{m.title}</td>
                <td>{m.focus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="syllabus-modules">
        {ML_MODULES.map((m, i) => (
          <details className="syllabus-module" key={m.index} open={i === 0}>
            <summary>
              <span className="card-index">{m.index} <span>{m.tag}</span></span>
              <span className="module-title">{m.title}</span>
              <ChevronDown size={18} className="module-chevron" />
            </summary>
            <div className="module-lessons">
              {m.sections.map((s, j) => (
                <article key={j} className="module-lesson">
                  {s.subtitle && <div className="module-lesson-top"><span className="cell-no">{s.subtitle}</span></div>}
                  <ul>{s.points.map((p) => <li key={p}>{p}</li>)}</ul>
                </article>
              ))}
            </div>
          </details>
        ))}
      </div>

      <div className="syllabus-modules">
        <details className="syllabus-module">
          <summary>
            <span className="card-index">+ <span>INFO</span></span>
            <span className="module-title">Qiymətləndirmə, texnologiyalar, qaydalar</span>
            <ChevronDown size={18} className="module-chevron" />
          </summary>
          <div className="module-lessons">
            <article className="module-lesson">
              <div className="module-lesson-top"><span className="cell-no">QİYMƏTLƏNDİRMƏ</span></div>
              <div className="table-scroll">
                <table className="syllabus-table">
                  <tbody>
                    {ML_GRADING.map((g) => (
                      <tr key={g.component}><td>{g.component}</td><td className="cell-no">{g.weight}</td></tr>
                    ))}
                    <tr><td><strong>Cəmi</strong></td><td className="cell-no"><strong>100%</strong></td></tr>
                  </tbody>
                </table>
              </div>
            </article>
            <article className="module-lesson">
              <div className="module-lesson-top"><span className="cell-no">TEXNOLOGİYALAR</span></div>
              <div className="ml-techs">{ML_TECH.map((t) => <span key={t}>{t}</span>)}</div>
            </article>
            <article className="module-lesson">
              <div className="module-lesson-top"><span className="cell-no">QAYDALAR</span></div>
              <ul>{ML_RULES.map((r) => <li key={r}>{r}</li>)}</ul>
            </article>
          </div>
        </details>
      </div>
      <p className="syllabus-term">{ML_META.source}</p>
    </>
  );
}

export default function Syllabus() {
  const [fenn, setFenn] = useState<Fenn>(initialFenn);

  const select = (id: Fenn) => {
    setFenn(id);
    window.history.replaceState(null, "", `/tedris-proqrami?fenn=${id}`);
  };

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
                <div className="heading-mark"><BookOpenCheck size={23} /><span>3 FƏNN<br />I · II–IV · III GÜN</span></div>
              </div>

              <div className="syllabus-tabs" role="tablist" aria-label="Fənnlər">
                {TABS.map((t) => (
                  <button
                    key={t.id}
                    role="tab"
                    aria-selected={fenn === t.id}
                    className={`syll-tab ${fenn === t.id ? "active" : ""}`}
                    onClick={() => select(t.id)}
                  >
                    {t.id === "kiber" ? <BookOpenCheck size={16} /> : t.id === "python" ? <TerminalSquare size={16} /> : <BrainCircuit size={16} />}
                    <span className="syll-tab-label">{t.label}</span>
                    <span className="syll-tab-day">{t.day}</span>
                  </button>
                ))}
              </div>

              {fenn === "kiber" && <KiberTab />}
              {fenn === "python" && <PythonTab />}
              {fenn === "ml" && <MlTab />}

              <div className="tracks-cta">
                <h3>Dərslərə qoşulmağa hazırsan?</h3>
                <p>Qeydiyyatdan keç — növbəti dərsin yeri və vaxtı sənə göndəriləcək.</p>
                <div className="hero-actions">
                  <Link className="button button-primary" href="/qeydiyyat">Kluba qoşul <ArrowUpRight size={17} /></Link>
                </div>
              </div>
              <p className="syllabus-term"><FileClock size={12} /> Sillabuslar ilkin xarakter daşıyır, dəyişikliklər əvvəlcədən bildiriləcək.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
