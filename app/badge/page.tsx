"use client";

import React, { useState } from 'react';
import FadeIn from '../../components/FadeIn';
import Breadcrumbs from '../../components/Breadcrumbs';
import { useLanguage } from '../../components/LanguageProvider';

const BADGE_ICONS: Record<string, (color: string) => React.ReactNode> = {
  visiteur: (color: string) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <circle cx="12" cy="11" r="3"/>
      <rect x="9" y="16" width="6" height="2" rx="1"/>
    </svg>
  ),
  vip: (color: string) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
  intervenant: (color: string) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
      <line x1="12" y1="19" x2="12" y2="23"/>
      <line x1="8" y1="23" x2="16" y2="23"/>
    </svg>
  ),
  exposant_9m: (color: string) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
      <line x1="12" y1="22.08" x2="12" y2="12"/>
    </svg>
  ),
  exposant_12m: (color: string) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
      <line x1="3" y1="9" x2="21" y2="9"/>
      <line x1="9" y1="21" x2="9" y2="9"/>
    </svg>
  ),
  exposant_18m: (color: string) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  )
};

const SITE_ICONS = [
  // 1. Kasbah Taourirt
  <svg key="1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6a3 3 0 0 1 6 0v6"/>
    <path d="M9 10h.01M15 10h.01"/>
  </svg>,
  // 2. Musée du Cinéma
  <svg key="2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
    <line x1="7" y1="2" x2="7" y2="22"/>
    <line x1="17" y1="2" x2="17" y2="22"/>
    <line x1="2" y1="12" x2="22" y2="12"/>
    <line x1="2" y1="7" x2="7" y2="7"/>
    <line x1="2" y1="17" x2="7" y2="17"/>
    <line x1="17" y1="17" x2="22" y2="17"/>
    <line x1="17" y1="7" x2="22" y2="7"/>
  </svg>,
  // 3. Atlas Studios
  <svg key="3" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 10 4.553-2.276A1 1 0 0 1 21 8.618v6.764a1 1 0 0 1-1.447.894L15 14v-4z"/>
    <rect x="3" y="6" width="12" height="12" rx="2"/>
  </svg>,
  // 4. CLA Studios
  <svg key="4" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polygon points="10 8 16 12 10 16 10 8"/>
  </svg>,
  // 5. Kasbah Aït Ben Haddou
  <svg key="5" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
];

export default function BadgePage() {
  const [selectedTier, setSelectedTier] = useState<string>('vip');
  const [includeHeritageTour, setIncludeHeritageTour] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const { t } = useLanguage();
  const bp = t.badgePage;

  const handleTierChange = (newTier: string) => {
    setSelectedTier(newTier);
    if (newTier === 'vip') {
      setIncludeHeritageTour(true);
    }
  };

  const handleSelectTier = (tierId: string, withTour: boolean = false) => {
    setSelectedTier(tierId);
    if (tierId === 'vip') {
      setIncludeHeritageTour(true);
    } else {
      setIncludeHeritageTour(withTour);
    }
    const formElement = document.getElementById('badge-registration-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const calculateTotalDisplay = () => {
    if (selectedTier === 'vip') {
      return {
        amount: '2 000,00 MAD HT',
        badge: 'Pass VIP (Tout Inclus)'
      };
    }
    if (selectedTier === 'visiteur') {
      return {
        amount: includeHeritageTour ? '1 500,00 MAD' : '0,00 MAD (Gratuit)',
        badge: includeHeritageTour ? 'Pass Visiteur + Programme VIP Patrimoine' : 'Pass Visiteur Gratuit'
      };
    }
    if (selectedTier === 'intervenant') {
      return {
        amount: includeHeritageTour ? '1 500,00 MAD' : '0,00 MAD (Accréditation)',
        badge: includeHeritageTour ? 'Badge Speaker + Programme VIP Patrimoine' : 'Accréditation Speaker'
      };
    }
    if (selectedTier === 'exposant_9m') {
      return {
        amount: includeHeritageTour ? '19 500,00 MAD HT' : '18 000,00 MAD HT',
        badge: includeHeritageTour ? 'Stand 9 m² + Option Tour VIP' : 'Stand 9 m²'
      };
    }
    if (selectedTier === 'exposant_12m') {
      return {
        amount: includeHeritageTour ? '25 500,00 MAD HT' : '24 000,00 MAD HT',
        badge: includeHeritageTour ? 'Stand 12 m² + Option Tour VIP' : 'Stand 12 m²'
      };
    }
    if (selectedTier === 'exposant_18m') {
      return {
        amount: includeHeritageTour ? '37 500,00 MAD HT' : '36 000,00 MAD HT',
        badge: includeHeritageTour ? 'Stand 18 m² + Option Tour VIP' : 'Stand 18 m²'
      };
    }
    return {
      amount: includeHeritageTour ? '1 500,00 MAD' : '0,00 MAD',
      badge: 'Badge FICIAI 2026'
    };
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(e.currentTarget);
    const currentTierObj = bp.tiers.find(t => t.id === selectedTier);
    const summary = calculateTotalDisplay();

    const payload = {
      type: 'badge',
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      organisation: formData.get('organisation'),
      jobTitle: formData.get('jobTitle'),
      tier: `${currentTierObj ? currentTierObj.title : selectedTier} [Formule: ${summary.badge} — Montant: ${summary.amount}]`,
      heritageTourOption: selectedTier === 'vip' ? 'Inclus d\'office (Pass VIP)' : (includeHeritageTour ? 'Oui (+1 500 MAD)' : 'Non'),
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
        setSubmitMessage(bp.formSuccess);
        (e.target as HTMLFormElement).reset();
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
      setSubmitMessage(error?.message || 'Connection error. Please check your connection and retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ paddingBottom: '60px' }}>
      <Breadcrumbs currentPage={bp.heroTitle} />
      
      {/* 1. HERO SECTION */}
      <section className="hero relative z-10" style={{ minHeight: 'auto', padding: '32px 16px 0 16px', justifyContent: 'center' }}>
        <FadeIn>
          <div style={{ maxWidth: '840px', margin: '0 auto', textAlign: 'center', paddingTop: '12px' }}>
            <div className="label-badge" style={{ marginBottom: '14px' }}>
              <span>{bp.heroBadge}</span>
            </div>
            
            <h1 className="display-title" style={{ fontSize: 'clamp(22px, 3.2vw, 36px)', marginBottom: '14px', lineHeight: 1.15 }}>
              {bp.heroTitle}
            </h1>

            <p className="body-text" style={{ maxWidth: '640px', margin: '0 auto 22px', fontSize: '13px', color: 'var(--text-secondary)' }}>
              {bp.heroSubtitle}
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="#badge-tiers" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                {bp.btnChoose}
              </a>
              <a href="#badge-registration-form" className="btn btn-outline" style={{ textDecoration: 'none' }}>
                {bp.btnForm}
              </a>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* 2. BADGE TIER CARDS */}
      <section id="badge-tiers" className="relative z-10" style={{ maxWidth: '1100px', margin: '56px auto 0', padding: '0 16px' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h2 className="section-title">{bp.passesTitle}</h2>
            <p className="body-text" style={{ maxWidth: '520px', margin: '6px auto 0', color: 'var(--text-secondary)', fontSize: '12px' }}>
              {bp.passesSubtitle}
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
          {bp.tiers.map((tier, i) => {
            const isSelected = selectedTier === tier.id;
            const isHighlighted = tier.highlight || isSelected;
            const iconColor = isSelected || isHighlighted ? '#B8432F' : 'var(--text-primary)';
            const renderIcon = BADGE_ICONS[tier.id] || BADGE_ICONS.visiteur;

            return (
              <FadeIn key={tier.id} delay={0.08 * i} style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '100%' }}>
                <div 
                  className="feature-card" 
                  style={{ 
                    height: '100%',
                    flex: 1,
                    minHeight: '100%', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    padding: '24px 22px',
                    boxSizing: 'border-box',
                    border: isSelected 
                      ? '2px solid #B8432F' 
                      : (tier.highlight ? '2px solid #B8432F' : '1px solid var(--border)'),
                    background: isSelected 
                      ? '#FFF8F6' 
                      : (tier.highlight ? '#FFFDFD' : 'var(--surface)'),
                    boxShadow: isSelected 
                      ? '0 10px 24px rgba(184, 67, 47, 0.16)' 
                      : (tier.highlight ? '0 8px 20px rgba(184, 67, 47, 0.1)' : '0 2px 10px rgba(0,0,0,0.02)'),
                    transition: 'all 0.25s ease',
                    transform: isSelected ? 'translateY(-2px)' : 'none',
                    position: 'relative'
                  }}
                >
                  {/* Highlight Ribbon / Tag */}
                  {tier.tag && (
                    <div style={{ 
                      position: 'absolute', 
                      top: '-13px', 
                      right: '20px', 
                      background: '#B8432F', 
                      color: '#FFFFFF', 
                      fontSize: '8px', 
                      fontFamily: 'var(--font-jetbrains)', 
                      fontWeight: 700, 
                      padding: '7px 18px', 
                      borderRadius: '9999px', 
                      letterSpacing: '1.2px', 
                      textTransform: 'uppercase',
                      boxShadow: '0 2px 10px rgba(184, 67, 47, 0.35)',
                      lineHeight: 1
                    }}>
                      {tier.tag}
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ 
                        width: '38px', 
                        height: '38px', 
                        borderRadius: '8px', 
                        background: isSelected || tier.highlight ? '#FDECE7' : '#F3F4F6', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        {renderIcon(iconColor)}
                      </div>
                      <div>
                        <h3 className="feature-title" style={{ fontSize: '15.5px', color: isSelected || tier.highlight ? '#B8432F' : 'var(--text-primary)', margin: 0, fontWeight: 700 }}>
                          {tier.title}
                        </h3>
                        <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', marginTop: '2px' }}>
                          {tier.badge}
                        </span>
                      </div>
                    </div>

                    {isSelected && (
                      <span style={{ 
                        fontSize: '8px', 
                        fontFamily: 'var(--font-jetbrains)',
                        backgroundColor: '#FDECE7', 
                        padding: '6px 14px', 
                        borderRadius: '9999px', 
                        border: '1px solid #F5C6BA', 
                        color: '#B8432F', 
                        letterSpacing: '1px', 
                        textTransform: 'uppercase',
                        fontWeight: 700,
                        lineHeight: 1
                      }}>
                        {bp.selectedBadge}
                      </span>
                    )}
                  </div>

                  <div style={{ 
                    fontFamily: 'var(--font-jetbrains)',
                    fontSize: 'clamp(18px, 1.6vw, 22px)', 
                    fontWeight: 700,
                    lineHeight: 1.25,
                    marginBottom: '16px', 
                    color: isSelected || tier.highlight ? '#B8432F' : 'var(--text-primary)',
                    whiteSpace: 'normal',
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word'
                  }}>
                    {tier.price}
                  </div>

                  <ul className="body-text" style={{ paddingLeft: '18px', margin: 0, color: 'var(--text-secondary)', fontSize: '12px', flex: 1, display: 'flex', flexDirection: 'column', gap: '9px' }}>
                    {tier.perks.map((perk, j) => (
                      <li key={j} style={{ lineHeight: '1.45' }}>{perk}</li>
                    ))}
                  </ul>

                  <div style={{ marginTop: 'auto', paddingTop: '18px', borderTop: '1px solid var(--border)', width: '100%' }}>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        handleSelectTier(tier.id);
                      }}
                      className="btn" 
                      style={{ 
                        width: '100%', 
                        justifyContent: 'center', 
                        padding: '10px 14px',
                        fontSize: '12px',
                        fontWeight: 600,
                        border: isSelected ? 'none' : (isHighlighted ? '1px solid #B8432F' : '1px solid #D1D5DB'), 
                        color: isSelected ? '#FFFFFF' : (isHighlighted ? '#B8432F' : 'var(--text-primary)'),
                        background: isSelected ? '#B8432F' : (isHighlighted ? '#FDECE7' : 'transparent'),
                        cursor: 'pointer',
                        borderRadius: '8px'
                      }}
                    >
                      {isSelected ? bp.selectedBadge : tier.btnText}
                    </button>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* 2.5 VIP HERITAGE PROGRAM (Cinema & Culture) */}
      {bp.vipHeritageProgram && (
        <section id="vip-heritage-program" className="relative z-10" style={{ maxWidth: '1080px', margin: '56px auto 0', padding: '0 16px' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div className="badge-reveal" style={{ display: 'inline-flex', marginBottom: '8px' }}>
                <span className="label-badge" style={{ background: '#FDECE7', color: '#B8432F', borderColor: 'rgba(184, 67, 47, 0.25)', fontWeight: 700 }}>
                  {bp.vipHeritageProgram.badge}
                </span>
              </div>
              <h2 className="section-title" style={{ fontSize: 'clamp(24px, 3.5vw, 36px)', marginTop: '6px' }}>
                {bp.vipHeritageProgram.title}
              </h2>
              <p className="body-text" style={{ maxWidth: '640px', margin: '8px auto 0', color: 'var(--text-secondary)', fontSize: '13px' }}>
                {bp.vipHeritageProgram.subtitle}
              </p>
            </div>
          </FadeIn>

          {/* Key Facts Summary Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '28px' }}>
            <FadeIn delay={0.1}>
              <div className="feature-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '14px', minHeight: '100%' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#FDECE7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#B8432F', flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                </div>
                <div>
                  <span className="mono-title" style={{ fontSize: '9.5px', textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-secondary)' }}>
                    {bp.vipHeritageProgram.dateLabel}
                  </span>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                    {bp.vipHeritageProgram.dateVal}
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="feature-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '14px', border: '1px solid rgba(184, 67, 47, 0.25)', background: '#FFF8F6', minHeight: '100%' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#B8432F', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="1" x2="12" y2="23"/>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                </div>
                <div>
                  <span className="mono-title" style={{ fontSize: '9.5px', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#B8432F', fontWeight: 700 }}>
                    {bp.vipHeritageProgram.priceLabel}
                  </span>
                  <div className="mono-title" style={{ fontSize: '17px', fontWeight: 800, color: '#B8432F', marginTop: '2px' }}>
                    {bp.vipHeritageProgram.priceVal}
                  </div>
                  {bp.vipHeritageProgram.priceNote && (
                    <span style={{ display: 'block', fontSize: '10.5px', color: '#4B5563', marginTop: '2px', lineHeight: 1.3 }}>
                      {bp.vipHeritageProgram.priceNote}
                    </span>
                  )}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div className="feature-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '14px', minHeight: '100%' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#FDECE7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#B8432F', flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <span className="mono-title" style={{ fontSize: '9.5px', textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--text-secondary)' }}>
                    {bp.vipHeritageProgram.locationLabel}
                  </span>
                  <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px' }}>
                    {bp.vipHeritageProgram.locationVal}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Special VIP Accommodation Shuttle Notice */}
          {bp.vipHeritageProgram.shuttleNote && (
            <FadeIn delay={0.25}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '14px 20px',
                background: '#FFF8F6',
                border: '1px solid rgba(184, 67, 47, 0.25)',
                borderRadius: '12px',
                marginBottom: '28px'
              }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: '#B8432F',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13"/>
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                    <circle cx="5.5" cy="18.5" r="2.5"/>
                    <circle cx="18.5" cy="18.5" r="2.5"/>
                  </svg>
                </div>
                <div>
                  <span className="mono-title" style={{ fontSize: '9.5px', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#B8432F', fontWeight: 700, display: 'block' }}>
                    Logistique VIP • Transport Dédié
                  </span>
                  <span style={{ fontSize: '13px', color: '#1F2937', fontWeight: 600, lineHeight: 1.4 }}>
                    {bp.vipHeritageProgram.shuttleNote}
                  </span>
                </div>
              </div>
            </FadeIn>
          )}

          {/* Visited Sites Grid */}
          <FadeIn delay={0.3}>
            <div style={{ marginBottom: '32px' }}>
              <h3 className="feature-title" style={{ fontSize: '16px', fontWeight: 700, marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '6px', height: '16px', background: '#B8432F', borderRadius: '2px', display: 'inline-block' }}></span>
                {bp.vipHeritageProgram.sitesTitle}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '14px' }}>
                {bp.vipHeritageProgram.sites.map((site, i) => (
                  <div 
                    key={i} 
                    className="feature-card" 
                    style={{ 
                      padding: '16px 14px', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'flex-start',
                      transition: 'all 0.25s ease'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = 'rgba(184, 67, 47, 0.4)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
                  >
                    <div style={{ 
                      width: '36px', 
                      height: '36px', 
                      borderRadius: '8px', 
                      background: '#FFF8F6', 
                      border: '1px solid rgba(184, 67, 47, 0.2)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      color: '#B8432F', 
                      marginBottom: '10px' 
                    }}>
                      {SITE_ICONS[i % SITE_ICONS.length]}
                    </div>
                    <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
                      {site.name}
                    </div>
                    <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
                      {site.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Inclusions & À Prévoir Dual Box */}
          <FadeIn delay={0.4}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: '16px', 
              marginBottom: '32px' 
            }}>
              {/* Inclusions */}
              <div className="feature-card" style={{ padding: '20px', background: '#F8FAF9', border: '1px solid #D1FAE5' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#ECFDF5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <strong style={{ fontSize: '13.5px', color: '#065F46' }}>{bp.vipHeritageProgram.inclusionsLabel}</strong>
                </div>
                <p style={{ fontSize: '12px', color: '#374151', margin: 0, lineHeight: 1.5, paddingLeft: '38px' }}>
                  {bp.vipHeritageProgram.inclusionsText}
                </p>
              </div>

              {/* À Prévoir */}
              <div className="feature-card" style={{ padding: '20px', background: '#FFFDF9', border: '1px solid #FEF3C7' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="8" x2="12" y2="12"/>
                      <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                  </div>
                  <strong style={{ fontSize: '13.5px', color: '#92400E' }}>{bp.vipHeritageProgram.bringLabel}</strong>
                </div>
                <p style={{ fontSize: '12px', color: '#374151', margin: 0, lineHeight: 1.5, paddingLeft: '38px' }}>
                  {bp.vipHeritageProgram.bringText}
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Full Day Schedule / Timeline */}
          <FadeIn delay={0.5}>
            <div className="feature-card" style={{ padding: '28px 24px', background: 'rgba(255, 255, 255, 0.95)' }}>
              <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '14px', marginBottom: '22px' }}>
                <h3 className="feature-title" style={{ fontSize: '17px', fontWeight: 700, margin: 0 }}>
                  {bp.vipHeritageProgram.scheduleTitle}
                </h3>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '4px 0 0' }}>
                  {bp.vipHeritageProgram.scheduleSubtitle}
                </p>
              </div>

              {/* Timeline Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0', position: 'relative' }}>
                {bp.vipHeritageProgram.schedule.map((item, idx) => (
                  <div 
                    key={idx} 
                    style={{ 
                      display: 'grid', 
                      gridTemplateColumns: '75px 1fr', 
                      gap: '16px', 
                      position: 'relative',
                      paddingBottom: idx === bp.vipHeritageProgram!.schedule.length - 1 ? '0' : '22px'
                    }}
                  >
                    {/* Vertical Connector line */}
                    {idx !== bp.vipHeritageProgram!.schedule.length - 1 && (
                      <div style={{ 
                        position: 'absolute', 
                        left: '82px', 
                        top: '22px', 
                        bottom: '0', 
                        width: '2px', 
                        background: 'linear-gradient(to bottom, #B8432F 0%, rgba(184, 67, 47, 0.15) 100%)' 
                      }} />
                    )}

                    {/* Time Pill */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end' }}>
                      <span className="mono-title" style={{ 
                        fontSize: '11px', 
                        fontWeight: 700, 
                        color: '#B8432F', 
                        background: '#FDECE7', 
                        padding: '3px 8px', 
                        borderRadius: '6px', 
                        border: '1px solid rgba(184, 67, 47, 0.25)',
                        whiteSpace: 'nowrap'
                      }}>
                        {item.time}
                      </span>
                    </div>

                    {/* Content Details */}
                    <div style={{ paddingLeft: '8px' }}>
                      <h4 style={{ 
                        fontSize: '13.5px', 
                        fontWeight: 700, 
                        color: 'var(--text-primary)', 
                        margin: '0 0 4px',
                        fontFamily: 'var(--font-inter)' 
                      }}>
                        {item.title}
                      </h4>
                      <p style={{ 
                        fontSize: '12px', 
                        color: 'var(--text-secondary)', 
                        margin: 0, 
                        lineHeight: 1.5 
                      }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Shuttle note at bottom */}
              {bp.vipHeritageProgram.shuttleNote && (
                <div style={{
                  marginTop: '20px',
                  padding: '12px 16px',
                  background: '#FFF8F6',
                  borderRadius: '8px',
                  border: '1px solid rgba(184, 67, 47, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B8432F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <rect x="1" y="3" width="15" height="13"/>
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                    <circle cx="5.5" cy="18.5" r="2.5"/>
                    <circle cx="18.5" cy="18.5" r="2.5"/>
                  </svg>
                  <span style={{ fontSize: '12px', color: '#374151', fontWeight: 600 }}>
                    {bp.vipHeritageProgram.shuttleNote}
                  </span>
                </div>
              )}

              {/* Action buttons: Option 1 VIP All Included or Option 2 Visitor + Tour */}
              <div style={{ 
                marginTop: '26px', 
                paddingTop: '20px', 
                borderTop: '1px solid var(--border)', 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '12px', 
                justifyContent: 'center', 
                alignItems: 'center' 
              }}>
                <button
                  type="button"
                  onClick={() => handleSelectTier('vip', true)}
                  className="btn btn-primary"
                  style={{
                    padding: '12px 24px',
                    fontSize: '13px',
                    fontWeight: 700,
                    borderRadius: '8px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 14px rgba(184, 67, 47, 0.35)',
                    cursor: 'pointer'
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                  <span>{bp.vipHeritageProgram.bookVipAllInclusive || "Réserver le Pass VIP Complet (2 000 MAD — Tout Inclus)"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSelectTier('visiteur', true)}
                  className="btn btn-secondary"
                  style={{
                    padding: '12px 20px',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    borderRadius: '8px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer'
                  }}
                >
                  <span>{bp.vipHeritageProgram.bookVisitorWithTour || "Pass Visiteur + Option Tour (1 500 MAD)"}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </button>
              </div>

            </div>
          </FadeIn>
        </section>
      )}

      {/* 3. REGISTRATION FORM (Centered & Spacious) */}
      <section id="badge-registration-form" className="form-section-container relative z-10" style={{ maxWidth: '780px' }}>
        <FadeIn style={{ width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px', width: '100%' }}>
            <h2 className="section-title">{bp.formSectionTitle}</h2>
            <p className="body-text" style={{ maxWidth: '520px', margin: '6px auto 0', color: 'var(--text-secondary)', fontSize: '12.5px' }}>
              {bp.formSectionSubtitle}
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
                  <strong style={{ display: 'block', marginBottom: '2px' }}>{bp.formSuccess}</strong>
                  {submitMessage}
                </div>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div style={{ 
                padding: '16px 20px', 
                background: '#FEF2F2', 
                color: '#991B1B', 
                border: '1px solid #FECACA', 
                borderRadius: '8px', 
                fontSize: '13px', 
                marginBottom: '24px', 
                lineHeight: 1.5,
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" style={{ flexShrink: 0, marginTop: '2px' }}>
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <div>
                  <strong style={{ display: 'block', marginBottom: '2px' }}>Erreur</strong>
                  {submitMessage}
                </div>
              </div>
            )}

            {/* Direct Contact Banner */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
              padding: '14px 18px',
              background: '#FFF8F6',
              border: '1px solid rgba(184, 67, 47, 0.2)',
              borderRadius: '12px',
              marginBottom: '24px',
              width: '100%',
              boxSizing: 'border-box'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#B8432F', display: 'inline-block' }}></span>
                <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--text-primary)', textTransform: 'uppercase', letterSpacing: '0.6px', fontFamily: 'var(--font-jetbrains)' }}>
                  {t.directContact?.label || "Direct Contact:"}
                </span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px' }}>
                <a 
                  href="tel:+212665658959" 
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '6px', 
                    color: '#B8432F', 
                    fontSize: '12px', 
                    fontWeight: 700, 
                    textDecoration: 'none',
                    fontFamily: 'var(--font-jetbrains)'
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <span>+212 665658959</span>
                </a>
                <a 
                  href="mailto:contact@cinezate.com" 
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '6px', 
                    color: '#B8432F', 
                    fontSize: '12px', 
                    fontWeight: 700, 
                    textDecoration: 'none',
                    fontFamily: 'var(--font-jetbrains)'
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                  <span>contact@cinezate.com</span>
                </a>
              </div>
            </div>

            <form style={{ display: 'flex', flexDirection: 'column', gap: '26px', width: '100%' }} onSubmit={handleFormSubmit}>
              
              {/* Section 1: Organisation & Identité */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                  <span className="mono-title" style={{ fontSize: '9.5px', color: '#B8432F', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 700 }}>
                    {bp.formS1}
                  </span>
                </div>
                
                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">
                      <span>{bp.formOrg}</span>
                      <span style={{ color: '#B8432F' }}>*</span>
                    </label>
                    <input name="organisation" type="text" className="input-field" placeholder={bp.formOrgPlaceholder} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      <span>{bp.formJob}</span>
                      <span style={{ color: '#B8432F' }}>*</span>
                    </label>
                    <input name="jobTitle" type="text" className="input-field" placeholder={bp.formJobPlaceholder} required />
                  </div>
                </div>
              </div>

              {/* Section 2: Coordonnées du Contact */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                  <span className="mono-title" style={{ fontSize: '9.5px', color: '#B8432F', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 700 }}>
                    {bp.formS2}
                  </span>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">
                      <span>{bp.formFullName}</span>
                      <span style={{ color: '#B8432F' }}>*</span>
                    </label>
                    <input name="fullName" type="text" className="input-field" placeholder={bp.formFullNamePlaceholder} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      <span>{bp.formEmail}</span>
                      <span style={{ color: '#B8432F' }}>*</span>
                    </label>
                    <input name="email" type="email" className="input-field" placeholder={bp.formEmailPlaceholder} required />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                  <span>{bp.formPhone}</span>
                    <span style={{ color: '#B8432F' }}>*</span>
                  </label>
                  <input name="phone" type="tel" className="input-field" placeholder={bp.formPhonePlaceholder} required />
                </div>
              </div>

              {/* Section 3: Pass Selection & Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                  <span className="mono-title" style={{ fontSize: '9.5px', color: '#B8432F', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 700 }}>
                    {bp.formS3}
                  </span>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <span>{bp.formBadgeSelect}</span>
                    <span style={{ color: '#B8432F' }}>*</span>
                  </label>
                  <select 
                    name="tier" 
                    className="input-field" 
                    value={selectedTier} 
                    onChange={(e) => handleTierChange(e.target.value)}
                    required
                    style={{ fontWeight: 500 }}
                  >
                    {bp.tiers.map(tier => (
                      <option key={tier.id} value={tier.id}>
                        {tier.title} ({tier.price}) {tier.id === 'vip' ? '— (Programme VIP Patrimoine Inclus)' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                {/* VIP Heritage Tour Option Card / Interactive Toggle */}
                {bp.vipHeritageProgram && (
                  <div style={{
                    padding: '16px 18px',
                    borderRadius: '12px',
                    background: selectedTier === 'vip' ? '#FFF8F6' : (includeHeritageTour ? '#FFF8F6' : '#FAFAF9'),
                    border: selectedTier === 'vip' ? '1px solid rgba(184, 67, 47, 0.3)' : (includeHeritageTour ? '1px solid #B8432F' : '1px solid var(--border)'),
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flex: 1, minWidth: '240px' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          background: selectedTier === 'vip' || includeHeritageTour ? '#B8432F' : '#E5E7EB',
                          color: selectedTier === 'vip' || includeHeritageTour ? '#FFFFFF' : '#6B7280',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          marginTop: '2px'
                        }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                          </svg>
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '4px' }}>
                            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
                              {bp.vipHeritageProgram.title}
                            </span>
                            <span className="mono-title" style={{ 
                              fontSize: '9.5px', 
                              fontWeight: 700, 
                              padding: '2px 8px', 
                              borderRadius: '4px',
                              background: selectedTier === 'vip' ? '#ECFDF5' : '#FDECE7',
                              color: selectedTier === 'vip' ? '#059669' : '#B8432F',
                              border: selectedTier === 'vip' ? '1px solid #A7F3D0' : '1px solid rgba(184, 67, 47, 0.2)'
                            }}>
                              {selectedTier === 'vip' ? 'INCLUS DANS LE PASS VIP (0 MAD)' : '+1 500 MAD'}
                            </span>
                          </div>
                          <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.45 }}>
                            {bp.formTourAddonSub}
                          </p>
                        </div>
                      </div>

                      {/* Toggle / Status Badge */}
                      {selectedTier === 'vip' ? (
                        <div style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          fontSize: '11px',
                          fontWeight: 700,
                          color: '#059669',
                          background: '#ECFDF5',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          border: '1px solid #A7F3D0',
                          whiteSpace: 'nowrap',
                          flexShrink: 0
                        }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                          <span>Inclus d'office</span>
                        </div>
                      ) : (
                        <button 
                          type="button"
                          onClick={() => setIncludeHeritageTour(!includeHeritageTour)}
                          style={{ 
                            display: 'inline-flex', 
                            alignItems: 'center', 
                            gap: '8px', 
                            cursor: 'pointer',
                            padding: '6px 12px',
                            background: includeHeritageTour ? '#B8432F' : '#FFFFFF',
                            color: includeHeritageTour ? '#FFFFFF' : 'var(--text-primary)',
                            border: includeHeritageTour ? '1px solid #B8432F' : '1px solid var(--border)',
                            borderRadius: '6px',
                            fontSize: '11.5px',
                            fontWeight: 600,
                            whiteSpace: 'nowrap',
                            flexShrink: 0,
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <span style={{
                            width: '14px',
                            height: '14px',
                            borderRadius: '3px',
                            border: includeHeritageTour ? '1px solid #FFFFFF' : '1px solid #9CA3AF',
                            background: includeHeritageTour ? '#FFFFFF' : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#B8432F',
                            fontSize: '10px',
                            fontWeight: 800
                          }}>
                            {includeHeritageTour ? '✓' : ''}
                          </span>
                          <span>{includeHeritageTour ? 'Option Ajoutée (+1 500 MAD)' : 'Ajouter l\'Option (+1 500 MAD)'}</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Real-time Total Calculation Summary Box */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '10px',
                  padding: '12px 18px',
                  background: '#141414',
                  borderRadius: '10px',
                  color: '#FFFFFF'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span className="mono-title" style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#9CA3AF' }}>
                      {bp.formTotalPriceLabel || "Montant Total :"}
                    </span>
                    <span style={{ fontSize: '12px', color: '#E5E7EB' }}>
                      {calculateTotalDisplay().badge}
                    </span>
                  </div>
                  <div className="mono-title" style={{ fontSize: '15px', fontWeight: 800, color: '#FDECE7', letterSpacing: '0.5px' }}>
                    {calculateTotalDisplay().amount}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <span>{bp.formMessage}</span>
                  </label>
                  <textarea 
                    name="message" 
                    rows={4} 
                    className="input-field" 
                    placeholder={bp.formMessagePlaceholder} 
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
                      <span>{bp.formSubmitting}</span>
                    </>
                  ) : (
                    <>
                      <span>{bp.formSubmit}</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </>
                  )}
                </button>
                <p style={{ textAlign: 'center', fontSize: '11px', color: 'var(--text-secondary)', marginTop: '10px', marginBottom: 0 }}>
                  {bp.formDisclaimer}
                </p>
              </div>

            </form>
          </div>
        </FadeIn>
      </section>

    </div>
  );
}
