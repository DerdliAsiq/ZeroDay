import { SOCIALS } from "@/lib/site";
import { sendToTelegram } from "@/lib/telegram";
import { ArrowUpRight, Github, Instagram, Mail, MapPin } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export default function Contact() {
  const [contactSent, setContactSent] = useState(false);
  const [contactSending, setContactSending] = useState(false);

  async function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    if (String(data.get("company") ?? "").trim() !== "") return;
    const name = String(data.get("contact-name") ?? "").trim();
    const email = String(data.get("contact-email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    setContactSending(true);
    const sent = await sendToTelegram(`ZeroDay sual\nAd: ${name}\nE-poçt: ${email}\n\n${message}`, "VITE_TELEGRAM_BOT_TOKEN");
    setContactSending(false);
    if (sent) {
      setContactSent(true);
      toast.success("Mesaj göndərildi", { description: "Tezliklə səninlə əlaqə saxlayacağıq." });
      form.reset();
      return;
    }
    const subject = encodeURIComponent(`ZeroDay sual: ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    setContactSent(true);
    toast.success("Mesaj hazırdır", {
      description: "Telegram qoşulmayıb — e-poçt proqramın açılır, göndər ki, mesaj çatsın.",
      action: {
        label: "E-poçt aç",
        onClick: () => { window.location.href = `mailto:${SOCIALS.email}?subject=${subject}&body=${body}`; },
      },
    });
    form.reset();
  }

  return (
    <div className="site-shell">
      <main id="main-content">
        <section className="section section-contact">
          <div className="container contact-layout"><div><div className="micro-label"><span className="green-bar" /> OPEN CHANNEL</div><h2>Bir sualın<br /><span>var?</span></h2><p>Klubun fəaliyyəti, əməkdaşlıq və ya növbəti görüş haqqında bizə yaz.</p><div className="contact-details"><div><Mail size={18} /><span>{SOCIALS.email}</span></div><div><MapPin size={18} /><span>Gəncə Dövlət Universiteti</span></div><div><Instagram size={18} /><a href={SOCIALS.instagram} target="_blank" rel="noreferrer">{SOCIALS.instagramLabel}</a></div><div><Github size={18} /><a href={SOCIALS.github} target="_blank" rel="noreferrer">{SOCIALS.githubLabel}</a></div></div></div><form className="contact-form" onSubmit={handleContactSubmit}><input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0 }} /><label>Adın<input name="contact-name" required minLength={2} autoComplete="name" placeholder="Ad və soyad" /></label><label>E-poçtun<input name="contact-email" type="email" required autoComplete="email" placeholder="student@gdu.edu.az" /></label><label>Mesajın<textarea name="message" required minLength={5} maxLength={1000} rows={4} placeholder="Mesajını yaz..." /></label><button className="text-link" type="submit" disabled={contactSending}>{contactSending ? "Göndərilir..." : contactSent ? "Mesaj hazırdır" : "Mesaj göndər"} <ArrowUpRight size={16} /></button></form></div>
        </section>
      </main>
    </div>
  );
}
