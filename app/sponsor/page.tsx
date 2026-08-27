"use client";
import React, { useState } from 'react';
import FadeIn from '../../components/FadeIn';
import { useLanguage } from '../../components/LanguageProvider';

export default function SponsorPage() {
  const [selectedTier, setSelectedTier] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const { t } = useLanguage();
  const ts = t.sponsor;

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(e.currentTarget);
    const data = {
      type: 'sponsor',
      organisation: formData.get('organisation'),
      jobTitle: formData.get('jobTitle'),
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      tier: selectedTier,
      goals: formData.get('goals'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage('Votre demande a été envoyée avec succès. Nous vous contacterons bientôt.');
        (e.target as HTMLFormElement).reset();
      } else {
        const errorData = await response.json();
        const msg = typeof errorData.error === 'string' 
          ? errorData.error 
          : (errorData.error?.message || 'Une erreur est survenue lors de l\'envoi.');
        setSubmitStatus('error');
        setSubmitMessage(msg);
      }
    } catch (error: any) {
      setSubmitStatus('error');
      setSubmitMessage(error?.message || 'Erreur de connexion. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ paddingBottom: '40px' }}>
      
      {/* 1. HERO SECTION */}
      <section className="hero relative z-10" style={{ minHeight: 'auto', padding: '20px 16px 0 16px', justifyContent: 'center' }}>
        <FadeIn>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', paddingTop: '12px' }}>
            <div className="label-badge" style={{ marginBottom: '10px', display: 'inline-block' }}>
              {ts.badge}
            </div>
            <h1 className="display-title" style={{ marginBottom: '10px', display: 'flex', justifyContent: 'center' }}>
              <img 
                src="/assets/logo/ficiailogo_original.png" 
                alt={ts.title} 
                style={{ 
                  maxWidth: '100%', 
                  height: 'auto', 
                  maxHeight: 'min(280px, 35vw)',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.05))'
                }} 
              />
            </h1>

            <p className="body-text" style={{ maxWidth: '600px', margin: '0 auto 20px', fontSize: '13px' }}>
              <strong>{ts.subtitle}</strong>
            </p>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="#sponsor-tiers" className="btn btn-primary" style={{ textDecoration: 'none' }}>{ts.btnSponsor}</a>
              <a href="/Dossier_de_sponsoring.pdf" download="Dossier_de_sponsoring.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ textDecoration: 'none' }}>{ts.btnDossier}</a>
            </div>
          </div>
        </FadeIn>

        {/* Global Impact Grid */}
        <FadeIn delay={0.2}>
          <div style={{ maxWidth: '960px', margin: '28px auto 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(140px, 100%), 1fr))', gap: '16px' }}>
            {ts.stats.map((stat, i) => (
              <div key={i} className="feature-card" style={{ padding: '14px 12px', textAlign: 'center', minHeight: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div className="time-value" style={{ marginBottom: '4px', fontSize: '20px' }}>{stat.val}</div>
                <div className="time-label" style={{ fontSize: '10px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* 2. VALUE PROPOSITIONS */}
      <section className="relative z-10" style={{ maxWidth: '1080px', margin: '56px auto 0', padding: '0 16px' }}>
        <FadeIn>
          <h2 className="section-title text-center" style={{ textAlign: 'center' }}>{ts.whyTitle}</h2>
        </FadeIn>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))', gap: '32px 24px', marginTop: '24px' }}>
          {ts.vpCards.map((vp, i) => (
            <FadeIn key={i} delay={0.1 * i} style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '100%' }}>
              <div className="feature-card" style={{ height: '100%', flex: 1, minHeight: '100%', display: 'flex', flexDirection: 'column', padding: '22px 20px', boxSizing: 'border-box' }}>
                <h3 className="feature-title" style={{ marginBottom: '8px', fontSize: '15px' }}>{vp.title}</h3>
                <p className="body-text" style={{ flex: 1, color: 'var(--text-secondary)', fontSize: '12px' }}>{vp.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* 3. PRICING CARDS */}
      <section id="sponsor-tiers" className="relative z-10" style={{ maxWidth: '1080px', margin: '56px auto 0', padding: '0 16px' }}>
        <FadeIn>
          <h2 className="section-title text-center" style={{ textAlign: 'center' }}>{ts.tiersTitle}</h2>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(230px, 100%), 1fr))', gap: '36px 24px', marginTop: '24px' }}>
          {ts.tiers.map((tier, i) => {
            const isSelected = selectedTier === tier.id;
            const isHighlighted = tier.highlight || isSelected;
            
            return (
              <FadeIn key={i} delay={0.1 * i} style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '100%' }}>
                <div className="feature-card" style={{ 
                  height: '100%',
                  flex: 1,
                  minHeight: '100%', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  padding: '22px 20px',
                  boxSizing: 'border-box',
                  border: isHighlighted ? '2px solid #B8432F' : '1px solid var(--border)',
                  background: isHighlighted ? '#FFF8F6' : 'var(--surface)',
                  boxShadow: isHighlighted ? '0 8px 20px rgba(184, 67, 47, 0.12)' : '0 2px 10px rgba(0,0,0,0.02)',
                  transition: 'all 0.25s ease',
                  transform: isSelected ? 'translateY(-2px)' : 'none'
                }}>
                  <h3 className="feature-title" style={{ fontSize: '15px', color: isHighlighted ? '#B8432F' : 'var(--text-primary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {tier.title}
                    {isSelected && <span style={{ fontSize: '8px', backgroundColor: '#FDECE7', padding: '6px 14px', borderRadius: '9999px', border: '1px solid #F5C6BA', color: '#B8432F', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 700, lineHeight: 1 }}>{ts.tierSelectedBtn}</span>}
                  </h3>
                  <div className="time-value" style={{ fontSize: '22px', marginBottom: '14px', color: isHighlighted ? '#B8432F' : 'var(--text-primary)' }}>{tier.price}</div>
                  <ul className="body-text" style={{ paddingLeft: '16px', margin: 0, color: 'var(--text-secondary)', fontSize: '12px', flex: 1 }}>
                    {tier.perks.map((perk, j) => (
                      <li key={j} style={{ marginBottom: '8px' }}>{perk}</li>
                    ))}
                  </ul>
                  <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid var(--border)' }}>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedTier(tier.id);
                        document.getElementById('sponsor-form')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="btn" 
                      style={{ 
                        width: '100%', 
                        justifyContent: 'center', 
                        padding: '8px 12px',
                        fontSize: '12px',
                        border: isSelected ? 'none' : (isHighlighted ? '1px solid #B8432F' : '1px solid #D1D5DB'), 
                        color: isSelected ? '#FFFFFF' : (isHighlighted ? '#B8432F' : 'var(--text-primary)'),
                        background: isSelected ? '#B8432F' : (isHighlighted ? '#FDECE7' : 'transparent'),
                        fontWeight: 600
                      }}>
                      {isSelected ? ts.tierSelectedBtn : ts.tierSelectBtn}
                    </button>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* 4. SPONSORSHIP MATRIX */}
      <section className="relative z-10" style={{ maxWidth: '1080px', margin: '48px auto 0', padding: '0 16px' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <h2 className="section-title">{ts.matrixTitle}</h2>
            <p className="body-text" style={{ maxWidth: '500px', margin: '8px auto 0', color: 'var(--text-secondary)', fontSize: '12px' }}>
              {ts.matrixDesc}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div style={{ 
            overflowX: 'auto', 
            background: '#FFFFFF', 
            borderRadius: '12px', 
            border: '1px solid var(--border)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
          }}>
            <table style={{ width: '100%', minWidth: '700px', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#F9FAFB' }}>
                  <th className="mono-title" style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.8px', fontSize: '10px' }}>{ts.matrixDeliverable}</th>
                  <th className="mono-title" style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', color: '#B8432F', background: '#FDECE7', fontSize: '10px' }}>PRESTIGE</th>
                  <th className="mono-title" style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', color: 'var(--text-primary)', fontSize: '10px' }}>OFFICIEL</th>
                  <th className="mono-title" style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', color: 'var(--text-primary)', fontSize: '10px' }}>GOLD</th>
                  <th className="mono-title" style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', color: 'var(--text-primary)', fontSize: '10px' }}>SILVER</th>
                </tr>
              </thead>
              <tbody>
                {ts.matrixRows.map((item, i) => (
                  <tr key={i} style={{ 
                    borderBottom: i === 6 ? 'none' : '1px solid #F3F4F6',
                    background: i % 2 === 0 ? '#FFFFFF' : '#FAFAFA',
                    transition: 'background 0.2s ease'
                  }} className="matrix-row">
                    <td className="feature-title" style={{ padding: '12px 16px', fontSize: '13px', fontWeight: 500 }}>{item.row}</td>
                    {item.vals.map((v, j) => (
                      <td key={j} className="body-text" style={{ 
                        padding: '12px 16px', 
                        color: j === 0 ? '#B8432F' : 'var(--text-secondary)',
                        background: j === 0 ? '#FFF8F6' : 'transparent',
                        fontWeight: j === 0 ? 600 : 400,
                        fontSize: '12px'
                      }}>
                        {v === '—' ? <span style={{ opacity: 0.3 }}>—</span> : v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>
      </section>

      {/* 5. ECOSYSTEM & PARTNERS */}
      <section className="relative z-10" style={{ maxWidth: '1080px', margin: '48px auto 0', padding: '0 16px' }}>
        <FadeIn>
          <h2 className="section-title text-center" style={{ textAlign: 'center' }}>{ts.ecoTitle}</h2>
        </FadeIn>
        
        <FadeIn delay={0.2}>
          <div style={{ marginTop: '20px' }}>
            {/* Logo Grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', 
              gap: '16px', 
              alignItems: 'center', 
              justifyItems: 'center',
              background: '#FFFFFF',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
            }}>
              {[
                "/gov_logos/maroc.png", "/gov_logos/province.png", "/gov_logos/region.png",
                "/sponsoring_logos/1.png", "/sponsoring_logos/2.png", "/sponsoring_logos/3.jpg", "/sponsoring_logos/4.png", "/sponsoring_logos/5.png", "/sponsoring_logos/6.jpg", "/sponsoring_logos/7.png", "/sponsoring_logos/8.jpg", "/sponsoring_logos/9.jpg",
                "/sponsoring_logos/10.jpg", "/sponsoring_logos/11.png", "/sponsoring_logos/12.jpg", "/sponsoring_logos/13.jpg", "/sponsoring_logos/14.jpg", "/sponsoring_logos/15.jpg", "/sponsoring_logos/16.png", "/sponsoring_logos/17.jpg", "/sponsoring_logos/18.png", "/sponsoring_logos/19.png",
                "/sponsoring_logos/20.jpg", "/sponsoring_logos/21.jpg", "/sponsoring_logos/22.jpg", "/sponsoring_logos/23.jpg", "/sponsoring_logos/24.jpg", "/sponsoring_logos/25.jpg", "/sponsoring_logos/26.png", "/sponsoring_logos/27.jpg", "/sponsoring_logos/28.jpg", "/sponsoring_logos/29.png",
                "/sponsoring_logos/30.png", "/sponsoring_logos/31.jpg", "/sponsoring_logos/32.jpg", "/sponsoring_logos/33.png", "/sponsoring_logos/34.jpg", "/sponsoring_logos/35.jpg", "/sponsoring_logos/36.jpg", "/sponsoring_logos/37.png", "/sponsoring_logos/38.jpg", "/sponsoring_logos/39.jpg",
                "/sponsoring_logos/40.jpg", "/sponsoring_logos/41.png", "/sponsoring_logos/42.png", "/sponsoring_logos/43.jpg", "/sponsoring_logos/44.jpg", "/sponsoring_logos/45.png", "/sponsoring_logos/46.jpg", "/sponsoring_logos/47.png"
              ].map((logoPath, i) => (
                <div key={i} style={{ 
                  width: '100%', 
                  display: 'flex', 
                  justifyContent: 'center',
                  opacity: 1,
                  transition: 'transform 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  <img 
                    src={`${logoPath}?v=3`} 
                    alt={`Sponsor ${i + 1}`} 
                    style={{ 
                      maxWidth: '100%', 
                      maxHeight: '40px', 
                      objectFit: 'contain',
                      borderRadius: '6px'
                    }} 
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* 6. ACTIVATION WORKFLOW */}
      <section className="relative z-10" style={{ maxWidth: '1080px', margin: '48px auto 0', padding: '0 16px' }}>
        <FadeIn>
          <h2 className="section-title text-center" style={{ textAlign: 'center' }}>{ts.workflowTitle}</h2>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(140px, 100%), 1fr))', gap: '16px', marginTop: '20px' }}>
          {ts.workflowSteps.map((step, i) => (
            <FadeIn key={i} delay={0.1 * i} style={{ minHeight: '100%' }}>
              <div className="feature-card" style={{ minHeight: '100%', padding: '16px 14px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <div className="time-value" style={{ color: '#9CA3AF', marginBottom: '8px', fontSize: '18px' }}>{step.step}</div>
                <h4 className="feature-title" style={{ fontSize: '13px' }}>{step.title}</h4>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* 7. CONTACT & FORM */}
      <section id="sponsor-form" className="form-section-container relative z-10" style={{ maxWidth: '1080px' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 className="section-title">{ts.formTitle}</h2>
            <p className="body-text" style={{ maxWidth: '520px', margin: '8px auto 0', color: 'var(--text-secondary)', fontSize: '12.5px' }}>
              {ts.formDesc}
            </p>
          </div>
        </FadeIn>
        
        <div className="sponsor-contact-grid">
          
          {/* Enhanced Form Card */}
          <FadeIn delay={0.2} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <div className="form-card-container">
              <div style={{ textAlign: 'center', marginBottom: '22px' }}>
                <h3 className="feature-title" style={{ fontSize: '17px', marginBottom: '4px', fontWeight: 700 }}>{ts.formAppTitle}</h3>
                <p className="body-text" style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>{ts.formAppReq}</p>
              </div>
              
              <form style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }} onSubmit={handleFormSubmit}>
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
                
                {/* Section 1: Organisation & Identité */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
                  <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '6px' }}>
                    <span className="mono-title" style={{ fontSize: '9.5px', color: '#B8432F', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 700 }}>{ts.formS1}</span>
                  </div>
                  <div className="form-row-2">
                    <div className="form-group">
                      <label className="form-label">{ts.formOrg} <span style={{ color: '#B8432F' }}>*</span></label>
                      <input name="organisation" type="text" className="input-field" placeholder={ts.formOrgPlaceholder} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">{ts.formJob} <span style={{ color: '#B8432F' }}>*</span></label>
                      <input name="jobTitle" type="text" className="input-field" placeholder={ts.formJobPlaceholder} required />
                    </div>
                  </div>
                </div>

                {/* Section 2: Coordonnées du Contact */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
                  <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '6px' }}>
                    <span className="mono-title" style={{ fontSize: '9.5px', color: '#B8432F', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 700 }}>{ts.formS2}</span>
                  </div>
                  <div className="form-row-2">
                    <div className="form-group">
                      <label className="form-label">{ts.formFullName} <span style={{ color: '#B8432F' }}>*</span></label>
                      <input name="fullName" type="text" className="input-field" placeholder={ts.formFullNamePlaceholder} required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">{ts.formEmail} <span style={{ color: '#B8432F' }}>*</span></label>
                      <input name="email" type="email" className="input-field" placeholder={ts.formEmailPlaceholder} required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">{ts.formPhone} <span style={{ color: '#B8432F' }}>*</span></label>
                    <input name="phone" type="tel" className="input-field" placeholder={ts.formPhonePlaceholder} required />
                  </div>
                </div>

                {/* Section 3: Formule & Précisions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
                  <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '6px' }}>
                    <span className="mono-title" style={{ fontSize: '9.5px', color: '#B8432F', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 700 }}>{ts.formS3}</span>
                  </div>
                  <div className="form-group">
                    <label className="form-label">{ts.formTier} <span style={{ color: '#B8432F' }}>*</span></label>
                    <select 
                      name="tier"
                      className="input-field" 
                      value={selectedTier}
                      onChange={(e) => setSelectedTier(e.target.value)}
                      required 
                    >
                      <option value="">{ts.formTierSelect}</option>
                      {ts.tiers.map(tier => (
                        <option key={tier.id} value={tier.id}>{tier.title} ({tier.price})</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">{ts.formGoals} <span style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 400 }}>(Optionnel)</span></label>
                    <textarea name="goals" className="input-field" placeholder={ts.formGoalsPlaceholder} rows={3} style={{ resize: 'vertical' }}></textarea>
                  </div>
                </div>

                <div style={{ paddingTop: '8px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-submit-main" style={{ 
                    width: '100%', 
                    justifyContent: 'center', 
                    padding: '12px 18px', 
                    fontSize: '13px', 
                    fontWeight: 600,
                    opacity: isSubmitting ? 0.7 : 1,
                    borderRadius: '8px',
                    whiteSpace: 'normal',
                    lineHeight: 1.35,
                    textAlign: 'center'
                  }}>
                    {isSubmitting ? 'Envoi en cours...' : ts.formSubmit}
                  </button>
                  <p style={{ textAlign: 'center', fontSize: '11px', color: 'var(--text-secondary)', marginTop: '10px', marginBottom: 0 }}>
                    {ts.formDisclaimer}
                  </p>
                </div>
              </form>
            </div>
          </FadeIn>

          {/* Sleek Administrative Info */}
          <FadeIn delay={0.4} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <div className="sticky-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'sticky', top: '80px', width: '100%' }}>
              
              <div className="feature-card" style={{ padding: '24px 22px', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <img src="/assets/logo/CinezateLogo.png" alt="CineZate Logo" style={{ height: '52px', width: 'auto', objectFit: 'contain' }} />
                  </div>
                  <div>
                    <h3 className="feature-title" style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>{ts.adminOrgTitle}</h3>
                    <p className="body-text" style={{ margin: '2px 0 0', color: 'var(--text-secondary)', fontSize: '12px' }}>{ts.adminOrgVal}</p>
                  </div>
                </div>
                
                <div className="mono-title" style={{ padding: '10px 14px', background: '#FAFAF9', borderRadius: '8px', border: '1px solid var(--border)', color: 'var(--text-secondary)', textAlign: 'center' }}>
                  <span style={{ fontSize: '9.5px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{ts.adminAuth}</span><br/>
                  <span className="feature-title" style={{ color: 'var(--text-primary)', marginTop: '4px', display: 'block', fontSize: '16px', fontWeight: 700 }}>653270</span>
                </div>
              </div>

              <div className="feature-card" style={{ padding: '24px 22px', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: 'var(--accent-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#B8432F', flexShrink: 0, border: '1px solid var(--accent-border)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
                  </div>
                  <div>
                    <h3 className="feature-title" style={{ margin: 0, fontSize: '15px', fontWeight: 700 }}>{ts.adminWireTitle}</h3>
                    <p className="body-text" style={{ margin: '2px 0 0', color: 'var(--text-secondary)', fontSize: '12px' }}>{ts.adminBank}</p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#FAFAF9', borderRadius: '8px', border: '1px solid var(--border)' }}>
                    <span className="mono-title" style={{ color: 'var(--text-secondary)', fontSize: '9.5px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{ts.adminAccount}</span>
                    <span className="mono-title" style={{ color: 'var(--text-primary)', fontSize: '12px', fontWeight: 700 }}>0/00013832270</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#FAFAF9', borderRadius: '8px', border: '1px solid var(--border)' }}>
                    <span className="mono-title" style={{ color: 'var(--text-secondary)', fontSize: '9.5px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{ts.adminRib}</span>
                    <span className="mono-title" style={{ color: 'var(--text-primary)', fontSize: '12px', fontWeight: 700 }}>350810000000001383227060</span>
                  </div>
                </div>
              </div>

            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
