"use client";
import { useLanguage } from "./LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer-section relative z-10" style={{ padding: '32px 0', textAlign: 'center', borderTop: '1px solid var(--border)' }}>
      <div className="logo" style={{ marginBottom: '12px', display: 'flex', justifyContent: 'center' }}>
        <img 
          src="/assets/logo/CinezateLogo.png" 
          alt="CineZate Logo" 
          style={{ 
            height: '38px', 
            width: 'auto', 
            objectFit: 'contain',
            filter: 'drop-shadow(0 3px 10px rgba(0,0,0,0.1))',
            display: 'block'
          }} 
        />
      </div>

      <p className="mono-title" style={{ fontSize: '9px', color: 'var(--text-secondary)', margin: '0 0 10px 0', letterSpacing: '0.4px' }}>
        {t.footerCopy}
      </p>

      <div className="footer-links" style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '6px' }}>
        <a href="#" className="label-badge" style={{ background: 'transparent', border: 'none', padding: 0, fontSize: '9px', color: 'var(--text-secondary)', textDecoration: 'none', letterSpacing: '0.4px' }}>{t.privacy}</a>
        <a href="#" className="label-badge" style={{ background: 'transparent', border: 'none', padding: 0, fontSize: '9px', color: 'var(--text-secondary)', textDecoration: 'none', letterSpacing: '0.4px' }}>{t.terms}</a>
        <a href="#" className="label-badge" style={{ background: 'transparent', border: 'none', padding: 0, fontSize: '9px', color: 'var(--text-secondary)', textDecoration: 'none', letterSpacing: '0.4px' }}>{t.contact}</a>
      </div>
    </footer>
  );
}
