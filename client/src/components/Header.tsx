import { ASSETS, NAV, hideBrokenImg } from "@/lib/site";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [path] = useLocation();
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    closeMenu();
  }, [path]);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container header-inner">
        <Link href="/" className="brand-lockup" aria-label="Zero Day ana səhifə">
          <span className="brand-mark-wrap">
            <img src={ASSETS.mark} alt="Zero Day qalxan işarəsi" className="brand-mark" loading="lazy" decoding="async" onError={hideBrokenImg} />
          </span>
          <span className="brand-copy">
            <span className="brand-name">ZERO DAY</span>
            <span className="brand-meta">GDU / CYBER CLUB</span>
          </span>
        </Link>

        <nav className={`desktop-nav ${menuOpen ? "mobile-open" : ""}`} aria-label="Əsas naviqasiya">
          {NAV.map((item) => (
            <Link key={item.to} href={item.to} className={path === item.to ? "active" : ""}>
              {item.label}
            </Link>
          ))}
          <Link className="nav-cta" href="/qeydiyyat">
            Kluba qoşul <ArrowUpRight size={15} />
          </Link>
        </nav>

        <button className="menu-toggle" onClick={() => setMenuOpen((value) => !value)} aria-label={menuOpen ? "Menyunu bağla" : "Menyunu aç"} aria-expanded={menuOpen}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
    </header>
  );
}
