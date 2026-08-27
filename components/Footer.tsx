"use client";
import { useLanguage } from "./LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer-section relative z-10" style={{ padding: '24px 0', textAlign: 'center' }}>
      <div className="divider-h" style={{ top: '0' }}></div>
      <div className="logo" style={{ marginBottom: '8px', display: 'flex', justifyContent: 'center' }}>
        <img src="/assets/logo/CinezateLogo.png" alt="FICIAI 2026 Logo" style={{ height: '22px', width: 'auto', objectFit: 'contain' }} />
      </div>
      <p style={{ fontFamily: 'var(--font-jetbrains)', fontSize: '9px', color: 'var(--text-secondary)', letterSpacing: '0.5px', textTransform: 'uppercase', margin: '0 0 8px 0' }}>
        {t.footerCopy}
      </p>
      <div className="footer-links" style={{ display: 'flex', gap: '14px', justifyContent: 'center', marginTop: '6px' }}>
        <a href="#" style={{ fontFamily: 'var(--font-jetbrains)', color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '9px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>{t.privacy}</a>
        <a href="#" style={{ fontFamily: 'var(--font-jetbrains)', color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '9px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>{t.terms}</a>
        <a href="#" style={{ fontFamily: 'var(--font-jetbrains)', color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '9px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>{t.contact}</a>
      </div>
    </footer>
  );
}
