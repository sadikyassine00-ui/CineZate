"use client";
import { useState } from "react";
import { useLanguage } from "../../components/LanguageProvider";

export default function StandPage() {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      organisation: formData.get('organisation'),
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      tier: formData.get('size'),
      message: formData.get('message'),
      type: 'stand'
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Erreur lors de l\'envoi');

      setSubmitStatus('success');
      setSubmitMessage('Votre demande d\'espace d\'exposition a été enregistrée avec succès. Notre équipe vous contactera sous peu.');
      form.reset();
    } catch (err: any) {
      setSubmitStatus('error');
      setSubmitMessage(err.message || 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="hero relative z-10" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 16px' }}>

      <div className="form-card-container">
        <div style={{ textAlign: 'center', marginBottom: '8px' }}>
          <div className="feature-icon" style={{ margin: '0 auto 12px auto' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
          </div>
          <h1 className="display-title" style={{ fontSize: '22px', marginBottom: '4px', fontWeight: 700 }}>{t.track2Title}</h1>
          <p className="body-text" style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>{t.track2Sub}</p>
        </div>

        {submitStatus === 'success' && (
          <div style={{ padding: '12px 16px', background: '#ECFDF5', color: '#065F46', border: '1px solid #A7F3D0', borderRadius: '8px', textAlign: 'center', fontSize: '12.5px' }}>
            {submitMessage}
          </div>
        )}
        {submitStatus === 'error' && (
          <div style={{ padding: '12px 16px', background: '#FEF2F2', color: '#991B1B', border: '1px solid #FECACA', borderRadius: '8px', textAlign: 'center', fontSize: '12.5px' }}>
            {submitMessage}
          </div>
        )}

        <form style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }} onSubmit={handleFormSubmit}>
          
          {/* Section 1: Organisation & Identité */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
            <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '6px' }}>
              <span className="mono-title" style={{ fontSize: '9.5px', color: '#B8432F', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 700 }}>01. Organisation & Identité</span>
            </div>
            <div className="form-group">
              <label className="form-label">{t.companyLabel} <span style={{ color: '#B8432F' }}>*</span></label>
              <input name="organisation" type="text" className="input-field" placeholder="ex. Atlas Cinema Studios" required />
            </div>
          </div>

          {/* Section 2: Coordonnées du Contact */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
            <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '6px' }}>
              <span className="mono-title" style={{ fontSize: '9.5px', color: '#B8432F', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 700 }}>02. Coordonnées du Contact</span>
            </div>
            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label">{t.nameLabel} <span style={{ color: '#B8432F' }}>*</span></label>
                <input name="fullName" type="text" className="input-field" placeholder="ex. Sophia Bennani" required />
              </div>
              <div className="form-group">
                <label className="form-label">{t.emailLabel} <span style={{ color: '#B8432F' }}>*</span></label>
                <input name="email" type="email" className="input-field" placeholder="ex. sophia@production.com" required />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Numéro de Téléphone <span style={{ color: '#B8432F' }}>*</span></label>
              <input name="phone" type="tel" className="input-field" placeholder="ex. +212 6 00 00 00 00" required />
            </div>
          </div>

          {/* Section 3: Formule & Précisions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
            <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '6px' }}>
              <span className="mono-title" style={{ fontSize: '9.5px', color: '#B8432F', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 700 }}>03. Formule & Précisions</span>
            </div>
            <div className="form-group">
              <label className="form-label">{t.sizeLabel} <span style={{ color: '#B8432F' }}>*</span></label>
              <select name="size" className="input-field" required>
                {t.sizes.map((sz, i) => <option key={i} value={sz}>{sz}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Message / Remarques complémentaires <span style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 400 }}>(Optionnel)</span></label>
              <textarea name="message" className="input-field" placeholder="Précisez vos besoins logistiques, d'électricité ou d'aménagement..." rows={3} style={{ resize: 'vertical' }}></textarea>
            </div>
          </div>

          <div style={{ paddingTop: '8px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-submit-main" style={{ width: '100%', justifyContent: 'center', padding: '12px 18px', fontSize: '13px', fontWeight: 600, opacity: isSubmitting ? 0.7 : 1, borderRadius: '8px', whiteSpace: 'normal', lineHeight: 1.35, textAlign: 'center' }}>
              {isSubmitting ? 'Envoi en cours...' : t.submitStand}
            </button>
            <p style={{ textAlign: 'center', fontSize: '11px', color: 'var(--text-secondary)', marginTop: '10px', marginBottom: 0 }}>
              Vos données sont traitées de manière confidentielle conformément au règlement du FICIAI 2026.
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
