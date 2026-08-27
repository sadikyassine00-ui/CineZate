"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageProvider";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const { lang, toggleLang, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                height: '32px', 
                width: 'auto', 
                filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.05))',
                marginLeft: '4px'
              }} 
            />
          </Link>
        </div>

        <nav className="nav-links desktop-only" style={{ display: 'flex', gap: '24px' }}>
          <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>{t.nav.about}</a>
          <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>{t.nav.speakers}</a>
          <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>{t.nav.agenda}</a>
        </nav>
        
        <div className="desktop-only" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button onClick={toggleLang} className="lang-toggle">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '4px' }}>
              <circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            {lang === 'en' ? 'FR' : 'EN'}
          </button>
          <Link href="/sponsor" style={{ textDecoration: 'none' }}>
            <button className="btn btn-outline">{t.track1Btn}</button>
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
          
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
            <a href="#" onClick={() => setIsMenuOpen(false)} style={{ fontFamily: 'var(--font-inter)', fontWeight: 500, color: 'var(--text-primary)', textDecoration: 'none', fontSize: '20px' }}>{t.nav.about}</a>
            <a href="#" onClick={() => setIsMenuOpen(false)} style={{ fontFamily: 'var(--font-inter)', fontWeight: 500, color: 'var(--text-primary)', textDecoration: 'none', fontSize: '20px' }}>{t.nav.speakers}</a>
            <a href="#" onClick={() => setIsMenuOpen(false)} style={{ fontFamily: 'var(--font-inter)', fontWeight: 500, color: 'var(--text-primary)', textDecoration: 'none', fontSize: '20px' }}>{t.nav.agenda}</a>
          </nav>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', marginTop: '24px', width: '100%', maxWidth: '240px' }}>
            <button onClick={() => { toggleLang(); setIsMenuOpen(false); }} className="lang-toggle" style={{ fontSize: '14px', padding: '10px 18px', width: '100%' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px' }}>
                <circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              {lang === 'en' ? 'Français' : 'English'}
            </button>
            <Link href="/sponsor" onClick={() => setIsMenuOpen(false)} style={{ textDecoration: 'none', width: '100%' }}>
              <button className="btn btn-outline" style={{ width: '100%', fontSize: '14px', padding: '10px 18px' }}>{t.track1Btn}</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
