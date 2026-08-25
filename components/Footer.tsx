"use client";
import { useLanguage } from "./LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer-section relative z-10" style={{ padding: '64px 0', textAlign: 'center' }}>
      <div className="divider-h" style={{ top: '0' }}></div>
      <div className="logo" style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
          <img src="/assets/logo/CinezateLogo.png" alt="FICIAI 2026 Logo" style={{ height: '48px', width: 'auto', objectFit: 'contain' }} />
      </div>
      <p className="mono-title">{t.footerCopy}</p>
      <div className="footer-links" style={{ display: 'flex', gap: '32px', justifyContent: 'center', marginTop: '24px' }}>
        <a href="#" className="label-badge" style={{ background: 'transparent', border: 'none', padding: 0 }}>{t.privacy}</a>
        <a href="#" className="label-badge" style={{ background: 'transparent', border: 'none', padding: 0 }}>{t.terms}</a>
        <a href="#" className="label-badge" style={{ background: 'transparent', border: 'none', padding: 0 }}>{t.contact}</a>
      </div>
    </footer>
  );
}
