"use client";
import { useLanguage } from "../../components/LanguageProvider";

export default function StandPage() {
  const { t } = useLanguage();

  return (
    <main className="hero relative z-10" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '120px 20px 40px' }}>
      
      <div className="page-dividers" style={{ display: 'flex', justifyContent: 'center', zIndex: -1 }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '1400px', height: '100%' }}>
          <div className="divider-v" style={{ left: '0' }} />
          <div className="divider-v" style={{ right: '0' }} />
        </div>
      </div>

      <div className="feature-card relative z-10" style={{ width: '100%', maxWidth: '500px', padding: '48px 40px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <div className="feature-icon" style={{ margin: '0 auto 24px auto' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
          </div>
          <h1 className="display-title" style={{ fontSize: '32px', marginBottom: '8px' }}>{t.track2Title}</h1>
          <p className="body-text" style={{ fontSize: '16px' }}>{t.track2Sub}</p>
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
            <label className="form-label">{t.companyLabel}</label>
            <input type="text" className="input-field" placeholder={t.companyLabel} required />
          </div>

          <div className="form-group">
            <label className="form-label">{t.sizeLabel}</label>
            <select className="input-field" required>
              {t.sizes.map((sz, i) => <option key={i} value={sz} style={{background: '#141414'}}>{sz}</option>)}
            </select>
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: '16px', width: '100%', justifyContent: 'center' }}>
            {t.submitStand}
          </button>
        </form>
      </div>
    </main>
  );
}
