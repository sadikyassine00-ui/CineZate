"use client";

import React, { useState } from 'react';
import FadeIn from '../../components/FadeIn';
import { useLanguage } from '../../components/LanguageProvider';

const STAND_ICONS: Record<string, (color: string) => React.ReactNode> = {
  startup_9m: (color: string) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  ),
  standard_12m: (color: string) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <path d="M3 9h18"/>
      <path d="M9 21V9"/>
    </svg>
  ),
  premium_18m: (color: string) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  )
};

const INCLUSION_ICONS = [
  (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B8432F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </svg>
  ),
  (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B8432F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
      <line x1="3" y1="9" x2="21" y2="9"/>
      <line x1="9" y1="21" x2="9" y2="9"/>
    </svg>
  ),
  (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B8432F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B8432F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
      <circle cx="12" cy="12" r="4"/>
    </svg>
  ),
  (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B8432F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
      <line x1="7" y1="7" x2="7.01" y2="7"/>
    </svg>
  )
];

export default function StandPage() {
  const { t } = useLanguage();
  const sp = t.standPage;

  const [selectedTier, setSelectedTier] = useState<string>("standard_12m");
  const [selectedConfig, setSelectedConfig] = useState<string>("inline");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState<string>('');

  const currentTierObj = sp.tiers.find(t => t.id === selectedTier) || sp.tiers[1];
  const currentConfigObj = sp.configurations.find(c => c.id === selectedConfig) || sp.configurations[0];

  const handleSelectTier = (tierId: string) => {
    setSelectedTier(tierId);
    const formElement = document.getElementById('stand-reservation-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      type: 'stand',
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      organisation: formData.get('organisation'),
      jobTitle: formData.get('jobTitle'),
      tier: currentTierObj ? `${currentTierObj.title} (${currentTierObj.price})` : selectedTier,
      configuration: currentConfigObj ? `${currentConfigObj.title} (${currentConfigObj.badge})` : selectedConfig,
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage(sp.formSuccess);
        form.reset();
      } else {
        const errorData = await response.json();
        const msg = typeof errorData.error === 'string' 
          ? errorData.error 
          : (errorData.error?.message || 'Error sending request.');
        setSubmitStatus('error');
        setSubmitMessage(msg);
      }
    } catch (error: any) {
      setSubmitStatus('error');
      setSubmitMessage(error?.message || 'Connection error. Please check your network and retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ paddingBottom: '60px' }}>
      
      {/* 1. HERO SECTION */}
      <section className="hero relative z-10" style={{ minHeight: 'auto', padding: '32px 16px 0 16px', justifyContent: 'center' }}>
        <FadeIn>
          <div style={{ maxWidth: '880px', margin: '0 auto', textAlign: 'center', paddingTop: '12px' }}>
            <div className="label-badge" style={{ marginBottom: '14px' }}>
              <span>{sp.heroBadge}</span>
            </div>
            
            <h1 className="display-title" style={{ fontSize: 'clamp(22px, 3.2vw, 36px)', marginBottom: '14px', lineHeight: 1.15 }}>
              {sp.heroTitle}
            </h1>

            <p className="body-text" style={{ maxWidth: '680px', margin: '0 auto 22px', fontSize: '13px', color: 'var(--text-secondary)' }}>
              {sp.heroSubtitle}
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="#stand-tiers" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                {sp.btnChoose}
              </a>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* 2. STAND TIER CARDS */}
      <section id="stand-tiers" className="relative z-10" style={{ maxWidth: '1140px', margin: '56px auto 0', padding: '0 16px' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h2 className="section-title">{sp.tiersTitle}</h2>
            <p className="body-text" style={{ maxWidth: '560px', margin: '6px auto 0', color: 'var(--text-secondary)', fontSize: '12.5px' }}>
              {sp.tiersSubtitle}
            </p>
          </div>
        </FadeIn>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(310px, 100%), 1fr))', 
          gap: '36px 24px', 
          marginTop: '24px',
          alignItems: 'stretch'
        }}>
          {sp.tiers.map((tier, idx) => {
            const isSelected = selectedTier === tier.id;
            const isHighlight = !!tier.highlight;
            const renderIcon = STAND_ICONS[tier.id] || STAND_ICONS.standard_12m;

            return (
              <FadeIn key={tier.id} delay={0.1 * idx} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div 
                  onClick={() => handleSelectTier(tier.id)}
                  className="feature-card" 
                  style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'space-between',
                    height: '100%',
                    padding: '24px 22px', 
                    borderRadius: '16px',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    background: '#FFFFFF',
                    border: isSelected 
                      ? '2px solid #B8432F' 
                      : (isHighlight ? '1.5px solid rgba(184, 67, 47, 0.45)' : '1px solid rgba(0, 0, 0, 0.08)'),
                    boxShadow: isSelected 
                      ? '0 12px 32px rgba(184, 67, 47, 0.16), 0 0 0 1px #B8432F' 
                      : (isHighlight ? '0 8px 24px rgba(184, 67, 47, 0.08)' : '0 4px 16px rgba(0, 0, 0, 0.03)'),
                    transform: isSelected ? 'translateY(-2px)' : 'none'
                  }}
                >
                  {/* Ribbon for Recommandé */}
                  {tier.tag && (
                    <div style={{ 
                      position: 'absolute', 
                      top: '-10px', 
                      right: '18px', 
                      background: '#B8432F', 
                      color: '#FFFFFF', 
                      fontSize: '8px', 
                      fontWeight: 700, 
                      padding: '7px 18px', 
                      borderRadius: '9999px', 
                      textTransform: 'uppercase', 
                      letterSpacing: '1.2px',
                      lineHeight: 1,
                      boxShadow: '0 2px 8px rgba(184, 67, 47, 0.3)' 
                    }}>
                      {tier.tag}
                    </div>
                  )}

                  {/* Top Block */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                      <div style={{ 
                        width: '38px', 
                        height: '38px', 
                        borderRadius: '10px', 
                        background: isSelected || isHighlight ? 'var(--accent-subtle)' : '#FAFAF9', 
                        border: isSelected || isHighlight ? '1px solid var(--accent-border)' : '1px solid var(--border)',
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center' 
                      }}>
                        {renderIcon(isSelected || isHighlight ? '#B8432F' : '#374151')}
                      </div>

                      {isSelected && (
                        <span style={{ 
                          fontSize: '8px', 
                          background: '#ECFDF5', 
                          color: '#065F46', 
                          border: '1px solid #A7F3D0', 
                          padding: '6px 14px', 
                          borderRadius: '9999px', 
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '1px',
                          lineHeight: 1
                        }}>
                          {sp.selectedTag}
                        </span>
                      )}
                    </div>

                    <div style={{ marginBottom: '12px' }}>
                      <span className="mono-title" style={{ fontSize: '9px', textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.8px' }}>
                        {tier.badge}
                      </span>
                      <h3 className="feature-title" style={{ fontSize: '17px', margin: '2px 0 0', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {tier.title}
                      </h3>
                    </div>

                    <div style={{ padding: '12px 14px', background: '#FAFAF9', borderRadius: '10px', border: '1px solid var(--border)', marginBottom: '18px' }}>
                      <span className="mono-title" style={{ fontSize: '9px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>{sp.rateLabel}</span>
                      <div style={{ fontSize: '18px', fontWeight: 700, color: isHighlight || isSelected ? '#B8432F' : 'var(--text-primary)', marginTop: '2px' }}>
                        {tier.price}
                      </div>
                    </div>

                    {/* Specifications List */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '22px' }}>
                      <div style={{ display: 'flex', gap: '10px', fontSize: '12px', alignItems: 'flex-start', color: '#374151' }}>
                        <span style={{ color: '#B8432F', marginTop: '2px', flexShrink: 0 }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                        </span>
                        <div><strong>{sp.surfaceDim}</strong> {tier.surface} ({tier.dimensions})</div>
                      </div>

                      <div style={{ display: 'flex', gap: '10px', fontSize: '12px', alignItems: 'flex-start', color: '#374151' }}>
                        <span style={{ color: '#B8432F', marginTop: '2px', flexShrink: 0 }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                        </span>
                        <div><strong>{sp.equipmentLabel}</strong> {tier.equipment}</div>
                      </div>

                      <div style={{ display: 'flex', gap: '10px', fontSize: '12px', alignItems: 'flex-start', color: '#374151' }}>
                        <span style={{ color: '#B8432F', marginTop: '2px', flexShrink: 0 }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                        </span>
                        <div><strong>{sp.accessLabel}</strong> {tier.access}</div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action */}
                  <div>
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectTier(tier.id);
                      }}
                      className={isSelected || isHighlight ? "btn btn-primary" : "btn btn-outline"}
                      style={{ 
                        width: '100%', 
                        justifyContent: 'center', 
                        padding: '11px 16px',
                        fontSize: '12.5px',
                        fontWeight: 600,
                        borderRadius: '8px'
                      }}
                    >
                      {tier.btnText}
                    </button>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* 3. ÉQUIPEMENTS & CONFIGURATIONS DU STAND */}
      <section className="relative z-10" style={{ maxWidth: '1140px', margin: '64px auto 0', padding: '0 16px' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 className="section-title">{sp.inclusionsTitle}</h2>
            <p className="body-text" style={{ maxWidth: '580px', margin: '6px auto 0', color: 'var(--text-secondary)', fontSize: '12.5px' }}>
              {sp.inclusionsSubtitle}
            </p>
          </div>
        </FadeIn>

        {/* 5 Inclusions Standard Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(200px, 100%), 1fr))', gap: '16px', marginBottom: '40px' }}>
          {sp.inclusions.map((item, idx) => (
            <FadeIn key={idx} delay={0.08 * idx} style={{ minHeight: '100%' }}>
              <div className="feature-card" style={{ padding: '20px 18px', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', background: '#FFFFFF', borderRadius: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--accent-subtle)', border: '1px solid var(--accent-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                  {INCLUSION_ICONS[idx % INCLUSION_ICONS.length]}
                </div>
                <h4 className="feature-title" style={{ fontSize: '14px', marginBottom: '6px', fontWeight: 700 }}>{item.title}</h4>
                <p className="body-text" style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Types de Configurations */}
        <FadeIn delay={0.2}>
          <div style={{ background: '#FFFFFF', border: '1px solid rgba(0, 0, 0, 0.08)', borderRadius: '16px', padding: '28px 24px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
            <div style={{ marginBottom: '20px' }}>
              <span className="mono-title" style={{ fontSize: '9.5px', color: '#B8432F', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 700 }}>
                {sp.configurationsTitle}
              </span>
              <h3 className="feature-title" style={{ fontSize: '18px', marginTop: '4px', fontWeight: 700 }}>
                {sp.configurationsSubtitle}
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))', gap: '16px' }}>
              {sp.configurations.map((cfg) => {
                const isConfigSelected = selectedConfig === cfg.id;

                return (
                  <div 
                    key={cfg.id} 
                    onClick={() => setSelectedConfig(cfg.id)}
                    style={{ 
                      padding: '16px 18px', 
                      borderRadius: '10px', 
                      border: isConfigSelected ? '1.5px solid #B8432F' : '1px solid var(--border)',
                      background: isConfigSelected ? 'var(--accent-subtle)' : '#FAFAF9',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <h5 style={{ margin: 0, fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)' }}>{cfg.title}</h5>
                      <span style={{ fontSize: '8px', background: '#FFFFFF', border: '1px solid var(--border)', padding: '3px 8px', borderRadius: '9999px', fontWeight: 600, color: '#B8432F' }}>
                        {cfg.badge}
                      </span>
                    </div>
                    <p style={{ margin: 0, fontSize: '11.5px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>{cfg.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* 4. FORMULAIRE DE RÉSERVATION DE STAND */}
      <section id="stand-reservation-form" className="form-section-container relative z-10" style={{ maxWidth: '780px' }}>
        <FadeIn style={{ width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px', width: '100%' }}>
            <h2 className="section-title">{sp.formSectionTitle}</h2>
            <p className="body-text" style={{ maxWidth: '540px', margin: '6px auto 0', color: 'var(--text-secondary)', fontSize: '12.5px' }}>
              {sp.formSectionSubtitle}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <div className="form-card-container">
            
            {submitStatus === 'success' && (
              <div style={{ 
                padding: '16px 20px', 
                background: '#ECFDF5', 
                color: '#065F46', 
                border: '1px solid #A7F3D0', 
                borderRadius: '8px', 
                fontSize: '13px', 
                marginBottom: '24px', 
                lineHeight: 1.5,
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" style={{ flexShrink: 0, marginTop: '2px' }}>
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <div>
                  <strong style={{ display: 'block', marginBottom: '2px' }}>{sp.formSuccess}</strong>
                  {submitMessage}
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div style={{ 
                padding: '14px 18px', 
                background: '#FEF2F2', 
                color: '#991B1B', 
                border: '1px solid #FECACA', 
                borderRadius: '8px', 
                fontSize: '13px', 
                marginBottom: '24px', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px' 
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" style={{ flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <span>{submitMessage}</span>
              </div>
            )}

            <form style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }} onSubmit={handleFormSubmit}>
              
              {/* Section 1: Organisation & Identité */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                  <span className="mono-title" style={{ fontSize: '9.5px', color: '#B8432F', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 700 }}>
                    {sp.formS1}
                  </span>
                </div>
                
                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">
                      <span>{sp.formOrg}</span>
                      <span style={{ color: '#B8432F' }}>*</span>
                    </label>
                    <input name="organisation" type="text" className="input-field" placeholder={sp.formOrgPlaceholder} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      <span>{sp.formJob}</span>
                      <span style={{ color: '#B8432F' }}>*</span>
                    </label>
                    <input name="jobTitle" type="text" className="input-field" placeholder={sp.formJobPlaceholder} required />
                  </div>
                </div>
              </div>

              {/* Section 2: Coordonnées du Contact */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                  <span className="mono-title" style={{ fontSize: '9.5px', color: '#B8432F', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 700 }}>
                    {sp.formS2}
                  </span>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">
                      <span>{sp.formFullName}</span>
                      <span style={{ color: '#B8432F' }}>*</span>
                    </label>
                    <input name="fullName" type="text" className="input-field" placeholder={sp.formFullNamePlaceholder} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      <span>{sp.formEmail}</span>
                      <span style={{ color: '#B8432F' }}>*</span>
                    </label>
                    <input name="email" type="email" className="input-field" placeholder={sp.formEmailPlaceholder} required />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <span>{sp.formPhone}</span>
                    <span style={{ color: '#B8432F' }}>*</span>
                  </label>
                  <input name="phone" type="tel" className="input-field" placeholder={sp.formPhonePlaceholder} required />
                </div>
              </div>

              {/* Section 3: Formule & Configuration */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                  <span className="mono-title" style={{ fontSize: '9.5px', color: '#B8432F', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 700 }}>
                    {sp.formS3}
                  </span>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">
                      <span>{sp.formTierSelect}</span>
                      <span style={{ color: '#B8432F' }}>*</span>
                    </label>
                    <select 
                      name="tier"
                      className="input-field" 
                      value={selectedTier} 
                      onChange={(e) => setSelectedTier(e.target.value)}
                      required
                    >
                      {sp.tiers.map(tier => (
                        <option key={tier.id} value={tier.id}>
                          {tier.title} ({tier.surface} - {tier.price})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <span>{sp.formConfigSelect}</span>
                      <span style={{ color: '#B8432F' }}>*</span>
                    </label>
                    <select 
                      name="configuration"
                      className="input-field" 
                      value={selectedConfig} 
                      onChange={(e) => setSelectedConfig(e.target.value)}
                      required
                    >
                      {sp.configurations.map(cfg => (
                        <option key={cfg.id} value={cfg.id}>
                          {cfg.title} ({cfg.badge})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <span>{sp.formMessage}</span>
                  </label>
                  <textarea 
                    name="message" 
                    rows={4} 
                    className="input-field" 
                    placeholder={sp.formMessagePlaceholder} 
                  />
                </div>
              </div>

              <div style={{ paddingTop: '10px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <button 
                  type="submit" 
                  className="btn btn-primary btn-submit-main" 
                  disabled={isSubmitting}
                  style={{ 
                    width: '100%', 
                    justifyContent: 'center', 
                    padding: '13px 18px', 
                    fontSize: '13px', 
                    fontWeight: 600,
                    opacity: isSubmitting ? 0.7 : 1,
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    whiteSpace: 'normal',
                    lineHeight: 1.35,
                    textAlign: 'center'
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite', flexShrink: 0 }}>
                        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
                      </svg>
                      <span>{sp.formSubmitting}</span>
                    </>
                  ) : (
                    <>
                      <span>{sp.formSubmit}</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </>
                  )}
                </button>
                <p style={{ textAlign: 'center', fontSize: '11px', color: 'var(--text-secondary)', marginTop: '10px', marginBottom: 0 }}>
                  {sp.formDisclaimer}
                </p>
              </div>

            </form>
          </div>
        </FadeIn>
      </section>

    </div>
  );
}
