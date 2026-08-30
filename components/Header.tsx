"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageProvider";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const { lang, toggleLang, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: t.nav.home || "Accueil", href: "/" },
    { label: t.nav.stands || "Village du Cinéma", href: "/stand" },
    { label: t.nav.program || "Programme", href: "/program" },
    { label: t.nav.speakers || "Intervenants", href: "/speakers" },
    { label: t.nav.sponsoring || "Sponsoring", href: "/sponsor" },
    { label: t.nav.badges || "Billetterie", href: "/badge" }
  ];

  return (
    <>
      <header className="header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', zIndex: 1000 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img 
              src="/assets/logo/CinezateLogo.png" 
              alt="CineZate Logo" 
              className="header-logo-img"
              style={{ 
                height: '46px', 
                width: 'auto', 
                filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.1))',
                marginLeft: '4px',
                display: 'block'
              }} 
            />
          </Link>
        </div>

        <nav className="nav-links desktop-only" style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          {navItems.map((item, idx) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link 
                key={idx} 
                href={item.href}
                style={{ 
                  color: isActive ? '#B8432F' : 'var(--text-secondary)', 
                  fontWeight: isActive ? 600 : 500,
                  textDecoration: 'none',
                  fontSize: '12.5px',
                  padding: '5px 10px',
                  borderRadius: '6px',
                  transition: 'all 0.2s ease',
                  background: isActive ? 'rgba(184, 67, 47, 0.08)' : 'transparent'
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        
        <div className="desktop-only" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button onClick={toggleLang} className="lang-toggle" aria-label="Toggle language">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <span>{lang === 'en' ? 'FR' : 'EN'}</span>
          </button>
          <Link href="/badge" style={{ textDecoration: 'none' }}>
            <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '11.5px' }}>
              {t.track3Btn || "Demander mon Badge"}
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          )}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="mobile-menu-overlay">
          <button 
            onClick={() => setIsMenuOpen(false)}
            style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', padding: '6px' }}
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
          
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'center', width: '100%', maxWidth: '280px' }}>
            {navItems.map((item, idx) => (
              <Link 
                key={idx}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                style={{ 
                  fontFamily: 'var(--font-inter)', 
                  fontWeight: 600, 
                  color: pathname === item.href ? '#B8432F' : 'var(--text-primary)', 
                  textDecoration: 'none', 
                  fontSize: '16px',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  width: '100%',
                  textAlign: 'center',
                  background: pathname === item.href ? '#FFF8F6' : 'transparent'
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center', marginTop: '24px', width: '100%', maxWidth: '240px' }}>
            <button onClick={() => { toggleLang(); setIsMenuOpen(false); }} className="lang-toggle" style={{ fontSize: '9px !important', padding: '8px 18px !important', width: '100%', borderRadius: '9999px', justifyContent: 'center' }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '4px' }}>
                <circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              {lang === 'en' ? 'Passer en Français' : 'Switch to English'}
            </button>
            <Link href="/badge" onClick={() => setIsMenuOpen(false)} style={{ textDecoration: 'none', width: '100%' }}>
              <button className="btn btn-primary" style={{ width: '100%', fontSize: '12px', padding: '10px 16px' }}>
                {t.track3Btn || "Demander mon Badge"}
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
