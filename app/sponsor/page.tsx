"use client";
import React, { useState } from 'react';
import FadeIn from '../../components/FadeIn';
import { useLanguage } from '../../components/LanguageProvider';

export default function SponsorPage() {
  const [selectedTier, setSelectedTier] = useState<string>('');
  const { t } = useLanguage();
  const ts = t.sponsor;

  return (
    <div style={{ paddingBottom: '64px' }}>
      
      {/* 1. HERO SECTION */}
      <section className="hero relative z-10" style={{ minHeight: '60vh', padding: '32px 16px 0 16px', justifyContent: 'center' }}>
        <div className="page-dividers" style={{ display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}>
          <div style={{ position: 'relative', width: 'calc(100% - 64px)', maxWidth: '1200px', minHeight: '100%' }}>
            <div className="divider-v" style={{ left: '0' }} />
            <div className="divider-v" style={{ right: '0' }} />
          </div>
        </div>

        <FadeIn>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', paddingTop: '24px' }}>
            <div className="label-badge" style={{ marginBottom: '16px', display: 'inline-block', boxShadow: '0 0 20px rgba(255,255,255,0.1)' }}>
              {ts.badge}
            </div>
            <h1 className="display-title" style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
              <img 
                src="/assets/logo/ficiailogo_original.png" 
                alt={ts.title} 
                style={{ 
                  maxWidth: '100%', 
                  height: 'auto', 
                  maxHeight: 'min(540px, 60vw)',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.15))'
                }} 
              />
            </h1>

            <p className="body-text" style={{ maxWidth: '700px', margin: '0 auto 32px' }}>
              <strong>{ts.subtitle}</strong>
            </p>

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="#sponsor-tiers" className="btn btn-primary" style={{ textDecoration: 'none', boxShadow: '0 0 20px rgba(255,255,255,0.2)' }}>{ts.btnSponsor}</a>
              <a href="/Dossier_de_sponsoring.pdf" download="Dossier_de_sponsoring.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ textDecoration: 'none' }}>{ts.btnDossier}</a>
            </div>
          </div>
        </FadeIn>

        {/* Global Impact Grid */}
        <FadeIn delay={0.2}>
          <div style={{ maxWidth: '1000px', margin: '48px auto 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(160px, 100%), 1fr))', gap: '32px' }}>
            {ts.stats.map((stat, i) => (
              <div key={i} className="feature-card" style={{ padding: '24px 16px', textAlign: 'center', minHeight: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div className="time-value" style={{ marginBottom: '8px', textShadow: '0 0 10px rgba(255,255,255,0.2)' }}>{stat.val}</div>
                <div className="time-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* 2. VALUE PROPOSITION */}
      <section className="relative z-10" style={{ maxWidth: '1200px', margin: '120px auto 0', padding: '0 16px' }}>
        <FadeIn>
          <h2 className="section-title text-center" style={{ textAlign: 'center' }}>{ts.whyTitle}</h2>
        </FadeIn>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))', gap: '48px', marginTop: '32px' }}>
          {ts.vpCards.map((vp, i) => (
            <FadeIn key={i} delay={0.1 * i} style={{ minHeight: '100%' }}>
              <div className="feature-card" style={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
                <h3 className="feature-title" style={{ marginBottom: '12px' }}>{vp.title}</h3>
                <p className="body-text" style={{ flex: 1, color: 'var(--text-secondary)' }}>{vp.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* 3. PRICING CARDS */}
      <section id="sponsor-tiers" className="relative z-10" style={{ maxWidth: '1200px', margin: '120px auto 0', padding: '0 16px' }}>
        <FadeIn>
          <h2 className="section-title text-center" style={{ textAlign: 'center' }}>{ts.tiersTitle}</h2>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: '48px', marginTop: '32px' }}>
          {ts.tiers.map((tier, i) => {
            const isSelected = selectedTier === tier.id;
            const isHighlighted = tier.highlight || isSelected;
            
            return (
              <FadeIn key={i} delay={0.1 * i} style={{ minHeight: '100%' }}>
                <div className="feature-card" style={{ 
                  minHeight: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  border: isHighlighted ? '1px solid rgba(255,215,0,0.5)' : '1px solid var(--border)',
                  background: isHighlighted ? 'linear-gradient(180deg, rgba(255,215,0,0.08) 0%, rgba(0,0,0,0) 100%)' : 'var(--surface)',
                  boxShadow: isHighlighted ? '0 0 30px rgba(255,215,0,0.1)' : 'none',
                  transition: 'all 0.3s ease',
                  transform: isSelected ? 'translateY(-4px)' : 'none'
                }}>
                  <h3 className="feature-title" style={{ color: isHighlighted ? '#FFD700' : 'var(--text-primary)', textShadow: isHighlighted ? '0 0 10px rgba(255,215,0,0.3)' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {tier.title}
                    {isSelected && <span style={{ fontSize: '10px', backgroundColor: 'rgba(255,215,0,0.2)', padding: '4px 8px', borderRadius: '4px', border: '1px solid rgba(255,215,0,0.4)', color: '#FFD700', letterSpacing: '1px', textTransform: 'uppercase' }}>{ts.tierSelectedBtn}</span>}
                  </h3>
                  <div className="time-value" style={{ marginBottom: '24px', color: 'var(--accent)' }}>{tier.price}</div>
                  <ul className="body-text" style={{ paddingLeft: '20px', margin: 0, color: 'var(--text-secondary)', flex: 1 }}>
                    {tier.perks.map((perk, j) => (
                      <li key={j} style={{ marginBottom: '12px' }}>{perk}</li>
                    ))}
                  </ul>
                  <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedTier(tier.id);
                        document.getElementById('sponsor-form')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="btn btn-outline" 
                      style={{ 
                        width: '100%', 
                        justifyContent: 'center', 
                        borderColor: isSelected ? '#FFD700' : (tier.highlight ? 'rgba(255,215,0,0.5)' : 'rgba(255,255,255,0.2)'), 
                        color: isSelected ? '#000' : (tier.highlight ? '#FFD700' : '#FFF'),
                        background: isSelected ? 'linear-gradient(90deg, #FFD700 0%, #B8860B 100%)' : 'transparent',
                        fontWeight: isSelected ? 600 : 400
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
      <section className="relative z-10" style={{ maxWidth: '1200px', margin: '120px auto 0', padding: '0 16px' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 className="section-title">{ts.matrixTitle}</h2>
            <p className="body-text" style={{ maxWidth: '600px', margin: '16px auto 0', color: 'var(--text-secondary)' }}>
              {ts.matrixDesc}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div style={{ 
            overflowX: 'auto', 
            background: 'rgba(20,20,20,0.6)', 
            backdropFilter: 'blur(20px)',
            borderRadius: '24px', 
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
          }}>
            <table style={{ width: '100%', minWidth: '800px', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr>
                  <th className="mono-title" style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>{ts.matrixDeliverable}</th>
                  <th className="mono-title" style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#FFD700', textShadow: '0 0 10px rgba(255,215,0,0.5)', background: 'rgba(255,215,0,0.05)' }}>PRESTIGE</th>
                  <th className="mono-title" style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-primary)' }}>OFFICIEL</th>
                  <th className="mono-title" style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-primary)' }}>GOLD</th>
                  <th className="mono-title" style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-primary)' }}>SILVER</th>
                </tr>
              </thead>
              <tbody>
                {ts.matrixRows.map((item, i) => (
                  <tr key={i} style={{ 
                    borderBottom: i === 6 ? 'none' : '1px solid rgba(255,255,255,0.05)',
                    transition: 'background 0.2s ease'
                  }} className="matrix-row">
                    <td className="feature-title" style={{ padding: '20px 24px' }}>{item.row}</td>
                    {item.vals.map((v, j) => (
                      <td key={j} className="body-text" style={{ 
                        padding: '20px 24px', 
                        color: j === 0 ? 'rgba(255,215,0,0.9)' : 'var(--text-secondary)',
                        background: j === 0 ? 'rgba(255,215,0,0.02)' : 'transparent',
                        fontWeight: j === 0 ? 600 : 400
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
      <section className="relative z-10" style={{ maxWidth: '1200px', margin: '120px auto 0', padding: '0 16px' }}>
        <FadeIn>
          <h2 className="section-title text-center" style={{ textAlign: 'center' }}>{ts.ecoTitle}</h2>
        </FadeIn>
        
        <FadeIn delay={0.2}>
          <div style={{ marginTop: '32px' }}>
            {/* Logo Grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', 
              gap: '32px', 
              alignItems: 'center', 
              justifyItems: 'center',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '24px',
              padding: '40px'
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
                  transition: 'transform 0.3s ease',
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
                      maxHeight: '60px', 
                      objectFit: 'contain',
                      borderRadius: '8px'
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
      <section className="relative z-10" style={{ maxWidth: '1200px', margin: '120px auto 0', padding: '0 16px' }}>
        <FadeIn>
          <h2 className="section-title text-center" style={{ textAlign: 'center' }}>{ts.workflowTitle}</h2>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(160px, 100%), 1fr))', gap: '32px', marginTop: '32px' }}>
          {ts.workflowSteps.map((step, i) => (
            <FadeIn key={i} delay={0.1 * i} style={{ minHeight: '100%' }}>
              <div className="feature-card" style={{ minHeight: '100%', padding: '24px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', background: 'rgba(255,255,255,0.02)' }}>
                <div className="time-value" style={{ color: 'rgba(255,255,255,0.15)', marginBottom: '16px' }}>{step.step}</div>
                <h4 className="feature-title">{step.title}</h4>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* 7. CONTACT & FORM */}
      <section id="sponsor-form" className="relative z-10" style={{ maxWidth: '1200px', margin: '120px auto 0', padding: '0 16px' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 className="section-title">{ts.formTitle}</h2>
            <p className="body-text" style={{ maxWidth: '600px', margin: '16px auto 0', color: 'var(--text-secondary)' }}>
              {ts.formDesc}
            </p>
          </div>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))', gap: '48px', alignItems: 'start' }}>
          
          {/* Enhanced Form Card */}
          <FadeIn delay={0.2}>
            <div className="feature-card" style={{ padding: '24px' }}>
              <div style={{ marginBottom: '24px' }}>
                <h3 className="feature-title" style={{ fontSize: '20px', marginBottom: '4px' }}>{ts.formAppTitle}</h3>
                <p className="body-text" style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>{ts.formAppReq}</p>
              </div>
              
              <form style={{ display: 'flex', flexDirection: 'column', gap: '48px' }} onSubmit={(e) => { e.preventDefault(); alert(ts.formSuccess); }}>
                
                {/* Section 1: Identity */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '6px', marginBottom: '4px' }}>
                    <span className="mono-title" style={{ fontSize: '10px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px' }}>{ts.formS1}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label className="mono-title" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px', display: 'block' }}>{ts.formOrg}</label>
                      <input type="text" className="input-field body-text" placeholder={ts.formOrgPlaceholder} required style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '10px 12px', fontSize: '14px', color: '#FFF', outline: 'none' }} />
                    </div>
                    <div className="form-group">
                      <label className="mono-title" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px', display: 'block' }}>{ts.formContact}</label>
                      <input type="text" className="input-field body-text" placeholder={ts.formContactPlaceholder} required style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '10px 12px', fontSize: '14px', color: '#FFF', outline: 'none' }} />
                    </div>
                  </div>
                </div>

                {/* Section 2: Contact */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '6px', marginBottom: '4px' }}>
                    <span className="mono-title" style={{ fontSize: '10px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px' }}>{ts.formS2}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className="form-group">
                      <label className="mono-title" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px', display: 'block' }}>{ts.formEmail}</label>
                      <input type="email" className="input-field body-text" placeholder={ts.formEmailPlaceholder} required style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '10px 12px', fontSize: '14px', color: '#FFF', outline: 'none' }} />
                    </div>
                    <div className="form-group">
                      <label className="mono-title" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px', display: 'block' }}>{ts.formPhone}</label>
                      <input type="tel" className="input-field body-text" placeholder={ts.formPhonePlaceholder} required style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '10px 12px', fontSize: '14px', color: '#FFF', outline: 'none' }} />
                    </div>
                  </div>
                </div>

                {/* Section 3: Partnership */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '6px', marginBottom: '4px' }}>
                    <span className="mono-title" style={{ fontSize: '10px', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px' }}>{ts.formS3}</span>
                  </div>
                  <div className="form-group">
                    <label className="mono-title" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px', display: 'block' }}>{ts.formTier}</label>
                    <select 
                      className="input-field body-text" 
                      value={selectedTier}
                      onChange={(e) => setSelectedTier(e.target.value)}
                      required 
                      style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '10px 12px', fontSize: '14px', color: '#FFF', outline: 'none', appearance: 'none', cursor: 'pointer' }}
                    >
                      <option value="" style={{ color: '#000' }}>{ts.formTierSelect}</option>
                      {ts.tiers.map(tier => (
                        <option key={tier.id} value={tier.id} style={{ color: '#000' }}>{tier.title} ({tier.price})</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label className="mono-title" style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px', display: 'block' }}>{ts.formGoals}</label>
                    <textarea className="input-field body-text" placeholder={ts.formGoalsPlaceholder} rows={2} style={{ width: '100%', boxSizing: 'border-box', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '10px 12px', fontSize: '14px', color: '#FFF', outline: 'none', resize: 'vertical' }}></textarea>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{ 
                  width: '100%', 
                  justifyContent: 'center', 
                  padding: '12px', 
                  fontSize: '14px', 
                  marginTop: '8px', 
                  background: 'linear-gradient(90deg, var(--text-primary) 0%, #E0E0E0 100%)',
                  color: '#000',
                  boxShadow: '0 4px 10px rgba(255,255,255,0.1)',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 600
                }}>
                  {ts.formSubmit}
                </button>
              </form>
            </div>
          </FadeIn>

          {/* Sleek Administrative Info */}
          <FadeIn delay={0.4}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'sticky', top: '100px' }}>
              
              <div className="feature-card" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <img src="/assets/logo/CinezateLogo.png" alt="CineZate Logo" style={{ height: '80px', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.5))' }} />
                  </div>
                  <div>
                    <h3 className="feature-title" style={{ margin: 0, fontSize: '16px' }}>{ts.adminOrgTitle}</h3>
                    <p className="body-text" style={{ margin: '2px 0 0', color: 'var(--text-secondary)', fontSize: '13px' }}>{ts.adminOrgVal}</p>
                  </div>
                </div>
                
                <div className="mono-title" style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }}>
                  <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>{ts.adminAuth}</span><br/>
                  <span className="feature-title" style={{ color: 'var(--text-primary)', marginTop: '4px', display: 'block', fontSize: '18px' }}>653270</span>
                </div>
              </div>

              <div className="feature-card" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, #FFD700 0%, #B8860B 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', flexShrink: 0 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
                  </div>
                  <div>
                    <h3 className="feature-title" style={{ margin: 0, fontSize: '16px' }}>{ts.adminWireTitle}</h3>
                    <p className="body-text" style={{ margin: '2px 0 0', color: 'var(--text-secondary)', fontSize: '13px' }}>{ts.adminBank}</p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'space-between', padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <span className="mono-title" style={{ color: 'var(--text-secondary)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>{ts.adminAccount}</span>
                    <span className="mono-title" style={{ color: 'var(--text-primary)', fontSize: '13px' }}>0/00013832270</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'space-between', padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <span className="mono-title" style={{ color: 'var(--text-secondary)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>{ts.adminRib}</span>
                    <span className="mono-title" style={{ color: 'var(--text-primary)', fontSize: '13px' }}>350810000000001383227060</span>
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
