"use client";
import { useLanguage } from "./LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer-section relative z-10" style={{ padding: '36px 0', textAlign: 'center' }}>
      <div className="divider-h" style={{ top: '0' }}></div>
      
      <div className="logo" style={{ marginBottom: '14px', display: 'flex', justifyContent: 'center' }}>
        <img 
          src="/assets/logo/CinezateLogo.png" 
          alt="CineZate Logo" 
          style={{ 
            height: '40px', 
            width: 'auto', 
            objectFit: 'contain',
            filter: 'drop-shadow(0 3px 10px rgba(0,0,0,0.1))',
            display: 'block'
          }} 
        />
      </div>

      <p className="mono-title" style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: '0 0 12px 0' }}>
        {t.footerCopy}
      </p>

      <div className="footer-links" style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '8px' }}>
        <a href="#" className="label-badge" style={{ background: 'transparent', border: 'none', padding: 0, fontSize: '10.5px', color: 'var(--text-secondary)', textDecoration: 'none' }}>{t.privacy}</a>
        <a href="#" className="label-badge" style={{ background: 'transparent', border: 'none', padding: 0, fontSize: '10.5px', color: 'var(--text-secondary)', textDecoration: 'none' }}>{t.terms}</a>
        <a href="#" className="label-badge" style={{ background: 'transparent', border: 'none', padding: 0, fontSize: '10.5px', color: 'var(--text-secondary)', textDecoration: 'none' }}>{t.contact}</a>
      </div>
    </footer>
  );
}
