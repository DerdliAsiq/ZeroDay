import { Dialog, DialogContent } from "@/components/ui/dialog";
import { hideBrokenImg } from "@/lib/site";
import { ChevronLeft, ChevronRight, Expand, Images, Play } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

type GalleryItem = {
  src: string;
  code: string;
  alt: string;
  kind: "image" | "video";
};

function item(n: string, ext = "jpeg", kind: GalleryItem["kind"] = "image"): GalleryItem {
  return {
    src: `/images/gallery-${n}.${ext}`,
    code: `GAL / ${n}`,
    alt: kind === "video" ? `Zero Day klub videosu ${n}` : `Zero Day klub tədbiri ${n}`,
    kind,
  };
}

// Mövcud faylların dəqiq siyahısı (03,04,16,17 yoxdur — boş düymə yaratmamaq üçün).
// Yeni: 29-30 jpeg (Kahoot), 31 mp4 (video) — user_images-dən normalize edilib.
// Qeyd: user_images-dəki 3 portret (27,28,32) Haqqımızda hissəsinə aiddir,
// team-member-01/02/03 kimi saxlanılır, qalereyaya daxil deyil.
const GALLERY: GalleryItem[] = [
  item("01"), item("02"),
  item("05"), item("06"), item("07"), item("08"), item("09"), item("10"),
  item("11"), item("12"), item("13"), item("14"), item("15"),
  item("18"), item("19"), item("20"), item("21"), item("22"),
  item("23"), item("24"), item("25"), item("26"),
  item("29"), item("30"),
  item("31", "mp4", "video"),
  item("32"), item("33"),
  item("34", "mp4", "video"),
  item("35", "mp4", "video"),
];

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
                      {item.kind === "video" ? (
                        <>
                          <video src={item.src} muted playsInline preload="metadata" aria-label={item.alt} />
                          <span className="gallery-play" aria-hidden="true"><Play size={26} /></span>
                        </>
                      ) : (
                        <img src={item.src} alt={item.alt} loading="lazy" decoding="async" onError={hideBrokenImg} />
                      )}
                      <span className="gallery-meta"><span>{item.code}</span>{item.kind === "video" ? <span className="gallery-videotag"><Play size={12} /> VİDEO</span> : <Expand size={14} />}</span>
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
              {GALLERY[active].kind === "video" ? (
                <video src={GALLERY[active].src} controls autoPlay playsInline style={{ width: "100%", maxHeight: "70vh", background: "#05070a" }} />
              ) : (
                <img src={GALLERY[active].src} alt={GALLERY[active].alt} onError={hideBrokenImg} />
              )}
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
