import { ArrowUpRight, Check, ShieldCheck } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function Join() {
  const [membershipSent, setMembershipSent] = useState(false);
  const [membershipSending, setMembershipSending] = useState(false);

  async function handleMembershipSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      company: String(data.get("company") ?? ""),
      fullName: String(data.get("fullName") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      faculty: String(data.get("faculty") ?? "").trim(),
      specialty: String(data.get("specialty") ?? "").trim(),
      course: String(data.get("course") ?? "").trim(),
      university: String(data.get("university") ?? "").trim(),
    };
    const mailto = () => {
      const subject = encodeURIComponent(`ZeroDay qeydiyyat: ${payload.fullName}`);
      const body = encodeURIComponent(`Ad Soyad Ata: ${payload.fullName}\nƏlaqə: ${payload.phone}\nEmail: ${payload.email}\nFakültə: ${payload.faculty}\nİxtisas: ${payload.specialty}\nKurs: ${payload.course}\nUniversitet: ${payload.university}`);
      setMembershipSent(true);
      toast.success("Müraciət hazırdır", {
        description: "Bağlantı qurulmadı — e-poçt proqramın açılır, göndər ki, müraciət çatsın.",
        action: {
          label: "E-poçt aç",
          onClick: () => { window.location.href = `mailto:berzamin55@gmail.com?subject=${subject}&body=${body}`; },
        },
      });
      form.reset();
    };
    setMembershipSending(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setMembershipSending(false);
      if (res.ok) {
        setMembershipSent(true);
        toast.success("Qeydiyyat göndərildi", { description: "Müraciətin qəbul edildi, tezliklə əlaqə saxlayacağıq." });
        form.reset();
        return;
      }
      mailto();
    } catch {
      setMembershipSending(false);
      mailto();
    }
  }

  return (
    <div className="site-shell">
      <main id="main-content">
        <section className="section section-join">
          <div className="container join-layout"><div className="join-copy"><div className="micro-label"><span className="green-bar" /> RƏSMİ QEYDİYYAT</div><h2>Zero Day-ə<br /><span>qoşul.</span></h2><p>Tələbə qeydiyyat formunu doldur — müraciətin birbaşa komandaya çatacaq.</p><div className="join-note"><Check size={17} /><span>Qeydiyyat birbaşa komanda panelinə göndərilir.</span></div></div><form className="cyber-form" onSubmit={handleMembershipSubmit}><div className="form-header"><span>REGISTRATION_FORM</span><span>ZD / 01</span></div><input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0 }} /><label>Ad Soyad Ata<input name="fullName" required minLength={3} autoComplete="name" placeholder="Məs. Əli Əliyev Oğlu" /></label><div className="form-split"><label>Əlaqə nömrəsi<input name="phone" type="tel" inputMode="tel" required minLength={7} autoComplete="tel" placeholder="+994 50 000 00 00" /></label><label>Email<input name="email" type="email" required autoComplete="email" placeholder="student@gdu.edu.az" /></label></div><div className="form-split"><label>Fakültə<input name="faculty" required placeholder="Məs. Riyaziyyat və İnformatika" /></label><label>İxtisas<input name="specialty" required placeholder="Məs. Kompüter mühəndisliyi" /></label></div><div className="form-split"><label>Kurs<select name="course" required defaultValue=""><option value="" disabled>Seç</option><option>I kurs</option><option>II kurs</option><option>III kurs</option><option>IV kurs</option><option>Magistratura</option></select></label><label>Universitet<input name="university" required placeholder="Məs. Gəncə Dövlət Universiteti" /></label></div><button className="button button-primary form-submit" type="submit" disabled={membershipSending}>{membershipSending ? "Göndərilir..." : membershipSent ? "Qeydiyyat göndərildi" : "Qeydiyyatı göndər"} <ArrowUpRight size={17} /></button><div className="join-note"><ShieldCheck size={17} /><span>Paylaşdığın bilgiler yalnız başvuru değerlendirmesi için kullanılır, üçüncü kişilerle paylaşılmaz.</span></div></form></div>
        </section>
      </main>
    </div>
  );
}
