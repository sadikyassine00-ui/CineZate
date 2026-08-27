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
      organisation: formData.get('organisation'),
      contact: formData.get('contact'),
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
        <div className="page-dividers" style={{ display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}>
          <div style={{ position: 'relative', width: 'calc(100% - 32px)', maxWidth: '1080px', minHeight: '100%' }}>
            <div className="divider-v" style={{ left: '0' }} />
            <div className="divider-v" style={{ right: '0' }} />
          </div>
        </div>

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

      {/* 2. VALUE PROPOSITION */}
      <section className="relative z-10" style={{ maxWidth: '1080px', margin: '48px auto 0', padding: '0 16px' }}>
        <FadeIn>
          <h2 className="section-title text-center" style={{ textAlign: 'center' }}>{ts.whyTitle}</h2>
        </FadeIn>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))', gap: '20px', marginTop: '20px' }}>
          {ts.vpCards.map((vp, i) => (
            <FadeIn key={i} delay={0.1 * i} style={{ minHeight: '100%' }}>
              <div className="feature-card" style={{ minHeight: '100%', display: 'flex', flexDirection: 'column', padding: '18px 16px' }}>
                <h3 className="feature-title" style={{ marginBottom: '8px', fontSize: '15px' }}>{vp.title}</h3>
                <p className="body-text" style={{ flex: 1, color: 'var(--text-secondary)', fontSize: '12px' }}>{vp.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* 3. PRICING CARDS */}
      <section id="sponsor-tiers" className="relative z-10" style={{ maxWidth: '1080px', margin: '48px auto 0', padding: '0 16px' }}>
        <FadeIn>
          <h2 className="section-title text-center" style={{ textAlign: 'center' }}>{ts.tiersTitle}</h2>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))', gap: '20px', marginTop: '20px' }}>
          {ts.tiers.map((tier, i) => {
            const isSelected = selectedTier === tier.id;
            const isHighlighted = tier.highlight || isSelected;
            
            return (
              <FadeIn key={i} delay={0.1 * i} style={{ minHeight: '100%' }}>
                <div className="feature-card" style={{ 
                  minHeight: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  padding: '18px 16px',
                  border: isHighlighted ? '2px solid #D97706' : '1px solid var(--border)',
                  background: isHighlighted ? '#FFFBEB' : 'var(--surface)',
                  boxShadow: isHighlighted ? '0 8px 20px rgba(217, 119, 6, 0.1)' : '0 2px 10px rgba(0,0,0,0.02)',
                  transition: 'all 0.25s ease',
                  transform: isSelected ? 'translateY(-2px)' : 'none'
                }}>
                  <h3 className="feature-title" style={{ fontSize: '15px', color: isHighlighted ? '#B45309' : 'var(--text-primary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {tier.title}
                    {isSelected && <span style={{ fontSize: '9px', backgroundColor: '#FEF3C7', padding: '2px 6px', borderRadius: '4px', border: '1px solid #FCD34D', color: '#B45309', letterSpacing: '0.8px', textTransform: 'uppercase' }}>{ts.tierSelectedBtn}</span>}
                  </h3>
                  <div className="time-value" style={{ fontSize: '22px', marginBottom: '14px', color: isHighlighted ? '#B45309' : 'var(--text-primary)' }}>{tier.price}</div>
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
                        border: isSelected ? 'none' : (isHighlighted ? '1px solid #D97706' : '1px solid #D1D5DB'), 
                        color: isSelected ? '#FFFFFF' : (isHighlighted ? '#B45309' : 'var(--text-primary)'),
                        background: isSelected ? '#111827' : (isHighlighted ? '#FEF3C7' : 'transparent'),
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
                  <th className="mono-title" style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', color: '#B45309', background: '#FEF3C7', fontSize: '10px' }}>PRESTIGE</th>
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
                        color: j === 0 ? '#B45309' : 'var(--text-secondary)',
                        background: j === 0 ? '#FFFDF5' : 'transparent',
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
      <section id="sponsor-form" className="relative z-10" style={{ maxWidth: '1080px', margin: '48px auto 0', padding: '0 16px' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <h2 className="section-title">{ts.formTitle}</h2>
            <p className="body-text" style={{ maxWidth: '500px', margin: '8px auto 0', color: 'var(--text-secondary)', fontSize: '12px' }}>
              {ts.formDesc}
            </p>
          </div>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: '24px', alignItems: 'start' }}>
          
          {/* Enhanced Form Card */}
          <FadeIn delay={0.2}>
            <div className="feature-card" style={{ padding: '20px 18px' }}>
              <div style={{ marginBottom: '16px' }}>
                <h3 className="feature-title" style={{ fontSize: '16px', marginBottom: '2px' }}>{ts.formAppTitle}</h3>
                <p className="body-text" style={{ color: 'var(--text-secondary)', fontSize: '12px' }}>{ts.formAppReq}</p>
              </div>
              
              <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} onSubmit={handleFormSubmit}>
                {submitStatus === 'success' && (
                  <div style={{ padding: '10px 14px', background: '#ECFDF5', color: '#047857', border: '1px solid #A7F3D0', borderRadius: '6px', textAlign: 'center', fontSize: '12px' }}>
                    {submitMessage}
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div style={{ padding: '10px 14px', background: '#FEF2F2', color: '#B91C1C', border: '1px solid #FECACA', borderRadius: '6px', textAlign: 'center', fontSize: '12px' }}>
                    {submitMessage}
                  </div>
                )}
                
                {/* Section 1: Identity */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '4px' }}>
                    <span className="mono-title" style={{ fontSize: '10px', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{ts.formS1}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div className="form-group">
                      <label className="mono-title" style={{ fontSize: '10px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '2px', display: 'block' }}>{ts.formOrg}</label>
                      <input name="organisation" type="text" className="input-field" placeholder={ts.formOrgPlaceholder} required />
                    </div>
                    <div className="form-group">
                      <label className="mono-title" style={{ fontSize: '10px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '2px', display: 'block' }}>{ts.formContact}</label>
                      <input name="contact" type="text" className="input-field" placeholder={ts.formContactPlaceholder} required />
                    </div>
                  </div>
                </div>

                {/* Section 2: Contact */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '4px' }}>
                    <span className="mono-title" style={{ fontSize: '10px', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{ts.formS2}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div className="form-group">
                      <label className="mono-title" style={{ fontSize: '10px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '2px', display: 'block' }}>{ts.formEmail}</label>
                      <input name="email" type="email" className="input-field" placeholder={ts.formEmailPlaceholder} required />
                    </div>
                    <div className="form-group">
                      <label className="mono-title" style={{ fontSize: '10px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '2px', display: 'block' }}>{ts.formPhone}</label>
                      <input name="phone" type="tel" className="input-field" placeholder={ts.formPhonePlaceholder} required />
                    </div>
                  </div>
                </div>

                {/* Section 3: Partnership */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '4px' }}>
                    <span className="mono-title" style={{ fontSize: '10px', color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{ts.formS3}</span>
                  </div>
                  <div className="form-group">
                    <label className="mono-title" style={{ fontSize: '10px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '2px', display: 'block' }}>{ts.formTier}</label>
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
                    <label className="mono-title" style={{ fontSize: '10px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '2px', display: 'block' }}>{ts.formGoals}</label>
                    <textarea name="goals" className="input-field" placeholder={ts.formGoalsPlaceholder} rows={2} style={{ resize: 'vertical' }}></textarea>
                  </div>
                </div>

                <button type="submit" disabled={isSubmitting} className="btn btn-primary" style={{ 
                  width: '100%', 
                  justifyContent: 'center', 
                  padding: '10px', 
                  fontSize: '12px', 
                  marginTop: '4px', 
                  fontWeight: 600,
                  opacity: isSubmitting ? 0.7 : 1
                }}>
                  {isSubmitting ? 'ENVOI EN COURS...' : ts.formSubmit}
                </button>
              </form>
            </div>
          </FadeIn>

          {/* Sleek Administrative Info */}
          <FadeIn delay={0.4}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', position: 'sticky', top: '80px' }}>
              
              <div className="feature-card" style={{ padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <img src="/assets/logo/CinezateLogo.png" alt="CineZate Logo" style={{ height: '54px', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.04))' }} />
                  </div>
                  <div>
                    <h3 className="feature-title" style={{ margin: 0, fontSize: '14px' }}>{ts.adminOrgTitle}</h3>
                    <p className="body-text" style={{ margin: '2px 0 0', color: 'var(--text-secondary)', fontSize: '12px' }}>{ts.adminOrgVal}</p>
                  </div>
                </div>
                
                <div className="mono-title" style={{ padding: '8px 10px', background: '#F9FAFB', borderRadius: '6px', border: '1px solid var(--border)', color: 'var(--text-secondary)' }}>
                  <span style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{ts.adminAuth}</span><br/>
                  <span className="feature-title" style={{ color: 'var(--text-primary)', marginTop: '2px', display: 'block', fontSize: '15px' }}>653270</span>
                </div>
              </div>

              <div className="feature-card" style={{ padding: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#111827', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', flexShrink: 0 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
                  </div>
                  <div>
                    <h3 className="feature-title" style={{ margin: 0, fontSize: '14px' }}>{ts.adminWireTitle}</h3>
                    <p className="body-text" style={{ margin: '2px 0 0', color: 'var(--text-secondary)', fontSize: '12px' }}>{ts.adminBank}</p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'space-between', padding: '8px 10px', background: '#F9FAFB', borderRadius: '6px', border: '1px solid var(--border)' }}>
                    <span className="mono-title" style={{ color: 'var(--text-secondary)', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{ts.adminAccount}</span>
                    <span className="mono-title" style={{ color: 'var(--text-primary)', fontSize: '11px', fontWeight: 600 }}>0/00013832270</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'space-between', padding: '8px 10px', background: '#F9FAFB', borderRadius: '6px', border: '1px solid var(--border)' }}>
                    <span className="mono-title" style={{ color: 'var(--text-secondary)', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{ts.adminRib}</span>
                    <span className="mono-title" style={{ color: 'var(--text-primary)', fontSize: '11px', fontWeight: 600 }}>350810000000001383227060</span>
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
