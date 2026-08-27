"use client";
import { useLanguage } from "./LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer-section relative z-10" style={{ padding: '32px 0', textAlign: 'center' }}>
      <div className="divider-h" style={{ top: '0' }}></div>
      <div className="logo" style={{ marginBottom: '12px', display: 'flex', justifyContent: 'center' }}>
          <img src="/assets/logo/CinezateLogo.png" alt="FICIAI 2026 Logo" style={{ height: '32px', width: 'auto', objectFit: 'contain' }} />
      </div>
      <p className="mono-title" style={{ fontSize: '10px' }}>{t.footerCopy}</p>
      <div className="footer-links" style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '16px' }}>
        <a href="#" className="label-badge" style={{ background: 'transparent', border: 'none', padding: 0, fontSize: '10px' }}>{t.privacy}</a>
        <a href="#" className="label-badge" style={{ background: 'transparent', border: 'none', padding: 0, fontSize: '10px' }}>{t.terms}</a>
        <a href="#" className="label-badge" style={{ background: 'transparent', border: 'none', padding: 0, fontSize: '10px' }}>{t.contact}</a>
      </div>
    </footer>
  );
}
