import { Dialog, DialogContent } from "@/components/ui/dialog";
import { hideBrokenImg } from "@/lib/site";
import { ChevronLeft, ChevronRight, Expand, Images } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const GALLERY = Array.from({ length: 26 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return {
    src: `/images/gallery-${n}.jpeg`,
    code: `GAL / ${n}`,
    alt: `Zero Day klub tədbiri ${n}`,
  };
});

export default function Gallery() {
  const [active, setActive] = useState<number | null>(null);

  const step = useCallback(
    (dir: 1 | -1) => {
      setActive((prev) => {
        if (prev === null) return prev;
        return (prev + dir + GALLERY.length) % GALLERY.length;
      });
    },
    [],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, step]);

  return (
    <div className="site-shell">
      <main id="main-content">
        <section className="section section-gallery">
          <div className="container split-layout">
            <div className="section-rail"><span className="section-index">02</span><span className="section-label">GALLERY</span><span className="rail-line" /></div>
            <div className="gallery-main">
              <div className="section-heading-row">
                <div>
                  <div className="micro-label"><span className="green-bar" /> CLUB IN FRAMES</div>
                  <h2>Klubdan<br /><span>kadrlar.</span></h2>
                </div>
                <div className="heading-mark"><Images size={23} /><span>FIELD<br />ARCHIVE</span></div>
              </div>
              <p className="gallery-lead">Görüşlər, məşqlər və komanda anları — böyütmək üçün şəkilə kliklə.</p>
              {GALLERY.length === 0 ? (
                <p className="gallery-empty">Hələlik foto əlavə edilməyib.</p>
              ) : (
                <div className="gallery-grid">
                  {GALLERY.map((item, i) => (
                    <button key={item.src} className="gallery-item" onClick={() => setActive(i)} aria-label={`${item.alt} — böyüt`}>
                      <img src={item.src} alt={item.alt} loading="lazy" decoding="async" onError={hideBrokenImg} />
                      <span className="gallery-meta"><span>{item.code}</span><Expand size={14} /></span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Dialog open={active !== null} onOpenChange={(open) => { if (!open) setActive(null); }}>
        <DialogContent className="gallery-lightbox" aria-label={active !== null ? GALLERY[active].alt : "Qalereya şəkli"}>
          {active !== null && (
            <div className="gallery-viewer">
              <div className="gallery-viewer-top"><span>{GALLERY[active].code} / {String(GALLERY.length).padStart(2, "0")}</span><span>{GALLERY[active].alt}</span></div>
              <img src={GALLERY[active].src} alt={GALLERY[active].alt} onError={hideBrokenImg} />
              <div className="gallery-viewer-nav">
                <button onClick={() => step(-1)} aria-label="Əvvəlki şəkil"><ChevronLeft size={20} /></button>
                <button onClick={() => step(1)} aria-label="Növbəti şəkil"><ChevronRight size={20} /></button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
