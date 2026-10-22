import { ASSETS, hideBrokenImg } from "@/lib/site";

/**
 * /admin — honeypot səhifəsi (tam ekran, tam qara).
 * Şəkil ilk olaraq tam enlilikdə açılır, altında qırmızı xəbərdarlıq mətnləri.
 * Header/Footer App.tsx-də bu route üçün gizlidir.
 */
export default function Admin() {
  return (
    <div className="admin-fullscreen">
      <div className="admin-layout">
        {/* Şəkil — solda */}
        <div className="admin-image-wrap">
          <img
            src={ASSETS.adminBanner}
            alt="Zero Day honeypot banner"
            className="admin-image"
            decoding="async"
            onError={hideBrokenImg}
          />
        </div>

        {/* Qırmızı mətnlər — sağda */}
        <div className="admin-text-block">
          <p className="admin-line">
            Bu bir administrator paneli deyil, sadəcə normal bir səhifədir. Dizin fuzzing edib gizli yol axtarırsansa — boş yerə vaxt itirirsən.
          </p>
          <p className="admin-line">
            Bu səhifəyə olan hər istək (IP ünvanın, istifadə etdiyin alət və User-Agent) arxa planda qeydə alınır və birbaşa komanda bildiriş kanalına göndərilir.
          </p>
          <p className="admin-line admin-line-strong">
            Ooo, kimlər gəlib — kiber aləmin qorxulu yuxusu, klaviatura şiri! Qaqaş, sən ciddi-ciddi bura düşəcək qədər günə qalmısan? Sənə burdan çörək çıxmaz, çıxacaq maksimum şey ekrandakı böyük qardaşımızın sənə uzatdığı o mənalı hədiyyədir. Mesajı tutdunsa, indi sürüş burdan. Loqlarda boş-boşuna yer tutursan!
          </p>
          <p className="admin-line admin-line-warn">⚡ Fuzzing detected. IP logged. Go back where you came from.</p>
        </div>
      </div>
    </div>
  );
}
