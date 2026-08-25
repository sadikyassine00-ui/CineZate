"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageProvider";
import Image from "next/image";

export default function Header() {
  const { lang, toggleLang, t } = useLanguage();

  return (
    <header className="header" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Link href="/">
          <Image src="/assets/logo/CinezateLogo.png" alt="CineZate Logo" width={40} height={40} style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.2))' }} />
        </Link>
        <div className="label-badge">{t.badge}</div>
      </div>
      
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <button 
          onClick={toggleLang}
          className="lang-toggle"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px' }}>
            <circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
          {lang === 'en' ? 'FR' : 'EN'}
        </button>
        <Link href="/badge" style={{ textDecoration: 'none' }}>
          <button className="btn btn-outline">{t.register}</button>
        </Link>
      </div>
    </header>
  );
}
