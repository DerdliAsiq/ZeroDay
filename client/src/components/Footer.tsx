import { ASSETS, SOCIALS, hideBrokenImg } from "@/lib/site";
import { CircleDot, Github, Instagram, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <img src={ASSETS.mark} alt="Zero Day işarəsi" loading="lazy" decoding="async" onError={hideBrokenImg} />
          <div><strong>ZERO DAY</strong><span>GDU / CYBERSECURITY CLUB</span></div>
        </div>
        <div className="footer-center"><span>Built for curious minds.</span><span className="footer-status"><CircleDot size={11} /> SYSTEM ONLINE</span></div>
        <div className="footer-socials">
          <a href={SOCIALS.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
          <a href={SOCIALS.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a>
          <a href={`mailto:${SOCIALS.email}`} aria-label="E-poçt"><Mail size={18} /></a>
        </div>
      </div>
      <div className="container footer-bottom"><span>© 2026 Zero Day Club · Gəncə Dövlət Universiteti</span><span>ETHICAL PRACTICE / ALWAYS</span></div>
    </footer>
  );
}
