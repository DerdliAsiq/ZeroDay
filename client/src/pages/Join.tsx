import { sendToTelegram } from "@/lib/telegram";
import { ArrowUpRight, Check } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function Join() {
  const [membershipSent, setMembershipSent] = useState(false);
  const [membershipSending, setMembershipSending] = useState(false);

  async function handleMembershipSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (String(data.get("company") ?? "").trim() !== "") return;
    const fullName = String(data.get("fullName") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const faculty = String(data.get("faculty") ?? "").trim();
    const specialty = String(data.get("specialty") ?? "").trim();
    const course = String(data.get("course") ?? "").trim();
    const university = String(data.get("university") ?? "").trim();
    setMembershipSending(true);
    const sent = await sendToTelegram(
      `ZeroDay qeydiyyat\nAd Soyad Ata: ${fullName}\nƏlaqə: ${phone}\nEmail: ${email}\nFakültə: ${faculty}\nİxtisas: ${specialty}\nKurs: ${course}\nUniversitet: ${university}`,
      "VITE_TELEGRAM_REG_BOT_TOKEN",
    );
    setMembershipSending(false);
    if (sent) {
      setMembershipSent(true);
      toast.success("Qeydiyyat göndərildi", { description: "Müraciətin qəbul edildi, tezliklə əlaqə saxlayacağıq." });
      form.reset();
      return;
    }
    const subject = encodeURIComponent(`ZeroDay qeydiyyat: ${fullName}`);
    const body = encodeURIComponent(`Ad Soyad Ata: ${fullName}\nƏlaqə: ${phone}\nEmail: ${email}\nFakültə: ${faculty}\nİxtisas: ${specialty}\nKurs: ${course}\nUniversitet: ${university}`);
    setMembershipSent(true);
    toast.success("Müraciət hazırdır", {
      description: "Telegram qoşulmayıb — e-poçt proqramın açılır, göndər ki, müraciət çatsın.",
      action: {
        label: "E-poçt aç",
        onClick: () => { window.location.href = `mailto:berzamin55@gmail.com?subject=${subject}&body=${body}`; },
      },
    });
    form.reset();
  }

  return (
    <div className="site-shell">
      <main id="main-content">
        <section className="section section-join">
          <div className="container join-layout"><div className="join-copy"><div className="micro-label"><span className="green-bar" /> RƏSMİ QEYDİYYAT</div><h2>Zero Day-ə<br /><span>qoşul.</span></h2><p>Tələbə qeydiyyat formunu doldur — müraciətin birbaşa komandaya çatacaq.</p><div className="join-note"><Check size={17} /><span>Qeydiyyat Telegram üzərindən göndərilir.</span></div></div><form className="cyber-form" onSubmit={handleMembershipSubmit}><div className="form-header"><span>REGISTRATION_FORM</span><span>ZD / 01</span></div><input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0 }} /><label>Ad Soyad Ata<input name="fullName" required minLength={3} autoComplete="name" placeholder="Məs. Əli Əliyev Oğlu" /></label><div className="form-split"><label>Əlaqə nömrəsi<input name="phone" type="tel" inputMode="tel" required minLength={7} autoComplete="tel" placeholder="+994 50 000 00 00" /></label><label>Email<input name="email" type="email" required autoComplete="email" placeholder="student@gdu.edu.az" /></label></div><div className="form-split"><label>Fakültə<input name="faculty" required placeholder="Məs. Riyaziyyat və İnformatika" /></label><label>İxtisas<input name="specialty" required placeholder="Məs. Kompüter mühəndisliyi" /></label></div><div className="form-split"><label>Kurs<select name="course" required defaultValue=""><option value="" disabled>Seç</option><option>I kurs</option><option>II kurs</option><option>III kurs</option><option>IV kurs</option><option>Magistratura</option></select></label><label>Universitet<input name="university" required placeholder="Məs. Gəncə Dövlət Universiteti" /></label></div><button className="button button-primary form-submit" type="submit" disabled={membershipSending}>{membershipSending ? "Göndərilir..." : membershipSent ? "Qeydiyyat göndərildi" : "Qeydiyyatı göndər"} <ArrowUpRight size={17} /></button></form></div>
        </section>
      </main>
    </div>
  );
}
