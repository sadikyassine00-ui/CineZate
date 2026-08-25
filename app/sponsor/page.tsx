"use client";
import { useLanguage } from "../../components/LanguageProvider";

export default function SponsorPage() {
  const { t } = useLanguage();

  return (
    <main className="hero relative z-10" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '120px 20px 40px' }}>
      
      {/* Background Architectural Grid purely for aesthetics */}
      <div className="page-dividers" style={{ display: 'flex', justifyContent: 'center', zIndex: -1 }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '1400px', height: '100%' }}>
          <div className="divider-v" style={{ left: '0' }} />
          <div className="divider-v" style={{ right: '0' }} />
        </div>
      </div>

      <div className="feature-card relative z-10" style={{ width: '100%', maxWidth: '500px', padding: '48px 40px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <div className="feature-icon" style={{ margin: '0 auto 24px auto' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          </div>
          <h1 className="display-title" style={{ fontSize: '32px', marginBottom: '8px' }}>{t.track1Title}</h1>
          <p className="body-text" style={{ fontSize: '16px' }}>{t.track1Sub}</p>
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
            <label className="form-label">{t.levelLabel}</label>
            <select className="input-field" required>
              {t.levels.map((lvl, i) => <option key={i} value={lvl} style={{background: '#141414'}}>{lvl}</option>)}
            </select>
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: '16px', width: '100%', justifyContent: 'center' }}>
            {t.submitSponsor}
          </button>
        </form>
      </div>
    </main>
  );
}
