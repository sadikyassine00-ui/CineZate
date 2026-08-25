"use client";
import { useLanguage } from "../../components/LanguageProvider";

export default function BadgePage() {
  const { t } = useLanguage();

  return (
    <main className="hero relative z-10" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '120px 20px 40px' }}>
      
      <div className="page-dividers" style={{ display: 'flex', justifyContent: 'center', zIndex: -1 }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '1400px', height: '100%' }}>
          <div className="divider-v" style={{ left: '0' }} />
          <div className="divider-v" style={{ right: '0' }} />
        </div>
      </div>

      <div className="feature-card relative z-10" style={{ width: '100%', maxWidth: '500px', padding: '48px 40px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <div className="feature-icon" style={{ margin: '0 auto 24px auto' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><circle cx="12" cy="11" r="3"/><rect x="9" y="16" width="6" height="2" rx="1"/></svg>
          </div>
          <h1 className="display-title" style={{ fontSize: '32px', marginBottom: '8px' }}>{t.track3Title}</h1>
          <p className="body-text" style={{ fontSize: '16px' }}>{t.track3Sub}</p>
        </div>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} onSubmit={(e) => { e.preventDefault(); alert("Form submitted!"); }}>
          <div className="form-group">
            <label className="form-label">{t.nameLabel}</label>
            <input type="text" className="input-field" placeholder={t.nameLabel} required />
          </div>
          
          <div className="form-group">
            <label className="form-label">{t.emailLabel}</label>
            <input type="email" className="input-field" placeholder="hello@company.com" required />
          </div>
          
          <div className="form-group">
            <label className="form-label">{t.jobLabel}</label>
            <input type="text" className="input-field" placeholder={t.jobLabel} required />
          </div>

          <div className="form-group">
            <label className="form-label">{t.orgLabel}</label>
            <input type="text" className="input-field" placeholder={t.orgLabel} required />
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: '16px', width: '100%', justifyContent: 'center' }}>
            {t.submitBadge}
          </button>
        </form>
      </div>
    </main>
  );
}
