import { SOCIALS } from "@/lib/site";
import { csrfHeaders } from "@/lib/csrf";
import { ArrowUpRight, Github, Instagram, Mail, MapPin, ShieldCheck } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function Contact() {
  const [contactSent, setContactSent] = useState(false);
  const [contactSending, setContactSending] = useState(false);
  const [anonSent, setAnonSent] = useState(false);
  const [anonSending, setAnonSending] = useState(false);

  async function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      company: String(data.get("company") ?? ""),
      name: String(data.get("contact-name") ?? "").trim(),
      email: String(data.get("contact-email") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
    };
    const mailto = () => {
      const subject = encodeURIComponent(`ZeroDay sual: ${payload.name}`);
      const body = encodeURIComponent(`${payload.message}\n\n— ${payload.name} (${payload.email})`);
      setContactSent(true);
      toast.success("Mesaj hazırdır", {
        description: "Bağlantı qurulmadı — e-poçt proqramın açılır, göndər ki, mesaj çatsın.",
        action: {
          label: "E-poçt aç",
          onClick: () => { window.location.href = `mailto:${SOCIALS.email}?subject=${subject}&body=${body}`; },
        },
      });
      form.reset();
    };
    setContactSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: csrfHeaders(),
        body: JSON.stringify(payload),
      });
      setContactSending(false);
      if (res.ok) {
        setContactSent(true);
        toast.success("Mesaj göndərildi", { description: "Tezliklə səninlə əlaqə saxlayacağıq." });
        form.reset();
        return;
      }
      mailto();
    } catch {
      setContactSending(false);
      mailto();
    }
  }

  async function handleAnonymousSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      company: String(data.get("company") ?? ""),
      message: String(data.get("anonymous-message") ?? "").trim(),
    };
    setAnonSending(true);
    try {
      const res = await fetch("/api/anonymous", {
        method: "POST",
        headers: csrfHeaders(),
        body: JSON.stringify(payload),
      });
      setAnonSending(false);
      if (res.ok) {
        setAnonSent(true);
        toast.success("Anonim mesaj göndərildi", {
          description: "Mesajın komandaya çatdı. Adın və əlaqə məlumatın qeydə alınmadı.",
        });
        form.reset();
        return;
      }
      toast.error("Göndərilmədi", {
        description: "Bağlantı qurulmadı — bir az sonra yenidən cəhd et.",
      });
    } catch {
      setAnonSending(false);
      toast.error("Göndərilmədi", {
        description: "Bağlantı qurulmadı — bir az sonra yenidən cəhd et.",
      });
    }
  }

  return (
    <div className="site-shell">
      <main id="main-content">
        <section className="section section-contact">
          <div className="container contact-layout">
            <div>
              <div className="micro-label"><span className="green-bar" /> OPEN CHANNEL</div>
              <h2>Bir sualın<br /><span>var?</span></h2>
              <p>Klubun fəaliyyəti, əməkdaşlıq və ya növbəti görüş haqqında bizə yaz.</p>
              <div className="contact-details">
                <div><Mail size={18} /><span>{SOCIALS.email}</span></div>
                <div><MapPin size={18} /><span>Gəncə Dövlət Universiteti</span></div>
                <div><Instagram size={18} /><a href={SOCIALS.instagram} target="_blank" rel="noreferrer">{SOCIALS.instagramLabel}</a></div>
                <div><Github size={18} /><a href={SOCIALS.github} target="_blank" rel="noreferrer">{SOCIALS.githubLabel}</a></div>
              </div>
            </div>
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0 }} />
              <label>Adın<input name="contact-name" required minLength={2} autoComplete="name" placeholder="Ad və soyad" /></label>
              <label>E-poçtun<input name="contact-email" type="email" required autoComplete="email" placeholder="student@gdu.edu.az" /></label>
              <label>Mesajın<textarea name="message" required minLength={5} maxLength={1000} rows={4} placeholder="Mesajını yaz..." /></label>
              <button className="text-link" type="submit" disabled={contactSending}>{contactSending ? "Göndərilir..." : contactSent ? "Mesaj hazırdır" : "Mesaj göndər"} <ArrowUpRight size={16} /></button>
            </form>
          </div>
          <div className="container contact-layout" style={{ marginTop: 72 }}>
            <div>
              <div className="micro-label"><span className="green-bar" /> ANONYMOUS BOX</div>
              <h2>Anonim<br /><span>şikayət / təklif</span></h2>
              <p>Adın soruşulmur, IP ünvanın qeydə alınmır. Sadəcə mesajını yaz və göndər.</p>
              <div className="contact-details">
                <div><ShieldCheck size={18} /><span>Kimlik məlumatı toplanmır</span></div>
              </div>
            </div>
            <form className="contact-form" onSubmit={handleAnonymousSubmit}>
              <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0 }} />
              <label>Mesajın<textarea name="anonymous-message" required minLength={10} maxLength={2000} rows={5} placeholder="Şikayət və ya təklifini bura yaz..." /></label>
              <button className="text-link" type="submit" disabled={anonSending}>{anonSending ? "Göndərilir..." : anonSent ? "Qəbul edildi" : "Anonim göndər"} <ArrowUpRight size={16} /></button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
