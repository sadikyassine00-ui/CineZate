"use client";

import React, { useState } from 'react';
import FadeIn from '../../components/FadeIn';
import { useLanguage } from '../../components/LanguageProvider';

interface BadgeTier {
  id: string;
  title: string;
  badge: string;
  price: string;
  highlight?: boolean;
  tag?: string;
  icon: (color: string) => React.ReactNode;
  perks: string[];
  btnText: string;
}

const BADGE_TIERS: BadgeTier[] = [
  {
    id: "visiteur",
    title: "VISITEUR",
    badge: "Accès Général",
    price: "0,00 MAD HT",
    icon: (color: string) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <circle cx="12" cy="11" r="3"/>
        <rect x="9" y="16" width="6" height="2" rx="1"/>
      </svg>
    ),
    perks: [
      "Accès complet aux conférences publiques & panels",
      "Accès à l'espace d'exposition (Village du Cinéma)",
      "Accès aux démonstrations technologiques ouvertes",
      "Badge nominatif digital / QR Code d'entrée"
    ],
    btnText: "Commander mon Pass Gratuit"
  },
  {
    id: "vip",
    title: "VIP",
    badge: "Accès Premium",
    price: "2 500,00 MAD HT",
    highlight: true,
    tag: "Recommandé",
    icon: (color: string) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    perks: [
      "Accès prioritaire à toutes les conférences et masterclasses",
      "Accès à l'Espace VIP & salon de networking exclusif",
      "Déjeuners networking inclus (7 & 8 novembre)",
      "Invitation à la Soirée de Gala & Cinema Legacy Awards",
      "Placement réservé aux premiers rangs des auditoriums",
      "Matchmaking B2B via l'application mobile FICIAI 2026"
    ],
    btnText: "Réserver mon Pass VIP"
  },
  {
    id: "intervenant",
    title: "INTERVENANT",
    badge: "Speakers & Panélistes",
    price: "0,00 MAD HT",
    icon: (color: string) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
        <line x1="12" y1="19" x2="12" y2="23"/>
        <line x1="8" y1="23" x2="16" y2="23"/>
      </svg>
    ),
    perks: [
      "Réservé aux speakers, conférenciers et panélistes officiels",
      "Accès complet coulisses & salon des intervenants",
      "Invitation au dîner officiel des speakers et VIPs",
      "Prise en charge logistique et assistance technique régie"
    ],
    btnText: "Confirmer mon Badge Speaker"
  },
  {
    id: "exposant_9m",
    title: "EXPOSANT (Stand 9 m²)",
    badge: "Formule Start-Up",
    price: "9 000,00 MAD HT",
    icon: (color: string) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
        <line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    ),
    perks: [
      "Formule Start-Up : Espace stand équipé de 9 m² au Village du Cinéma",
      "Sol moquette, cloisons modulaires, éclairage LED & prises électriques",
      "Enseigne standard au nom de l'entreprise",
      "2 Badges Exposants avec accès complet aux espaces networking",
      "Référencement catalogue et application mobile"
    ],
    btnText: "Réserver un Stand 9 m²"
  },
  {
    id: "exposant_12m",
    title: "EXPOSANT (Stand 12 m²)",
    badge: "Formule Standard",
    price: "12 000,00 MAD HT",
    icon: (color: string) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <line x1="3" y1="9" x2="21" y2="9"/>
        <line x1="9" y1="21" x2="9" y2="9"/>
      </svg>
    ),
    perks: [
      "Formule Standard : Stand équipé de 12 m² au Village du Cinéma",
      "Emplacement optimisé avec cloisons, sol moquette, prises & spots LED",
      "Enseigne standard personnalisée",
      "3 Badges Exposants avec accès networking & événements",
      "Référencement prioritaire dans le catalogue exposants"
    ],
    btnText: "Réserver un Stand 12 m²"
  },
  {
    id: "exposant_18m",
    title: "EXPOSANT (Stand 18 m²)",
    badge: "Formule Premium",
    price: "18 000,00 MAD HT",
    icon: (color: string) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    perks: [
      "Formule Premium : Stand équipé de 18 m² au Village du Cinéma",
      "Emplacement stratégique à fort passage (allée centrale / angle)",
      "Équipement complet (moquette, électricité, enseigne, éclairage renforcé)",
      "4 Badges Exposants & accès B2B match",
      "Visibilité renforcée sur les supports digitaux du Forum"
    ],
    btnText: "Réserver un Stand 18 m²"
  }
];

export default function BadgePage() {
  const [selectedTier, setSelectedTier] = useState<string>('vip');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const { t } = useLanguage();

  const handleSelectTier = (tierId: string) => {
    setSelectedTier(tierId);
    const formElement = document.getElementById('badge-registration-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(e.currentTarget);
    const currentTierObj = BADGE_TIERS.find(t => t.id === selectedTier);

    const payload = {
      type: 'badge',
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      organisation: formData.get('organisation'),
      jobTitle: formData.get('jobTitle'),
      tier: currentTierObj ? `${currentTierObj.title} (${currentTierObj.price})` : selectedTier,
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
        setSubmitMessage('Votre demande d\'accréditation / badge a été enregistrée avec succès. Notre équipe vous contactera très rapidement.');
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
      setSubmitMessage(error?.message || 'Erreur de connexion. Veuillez vérifier votre connexion et réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ paddingBottom: '60px' }}>
      
      {/* 1. HERO SECTION */}
      <section className="hero relative z-10" style={{ minHeight: 'auto', padding: '32px 16px 0 16px', justifyContent: 'center' }}>
        <FadeIn>
          <div style={{ maxWidth: '840px', margin: '0 auto', textAlign: 'center', paddingTop: '12px' }}>
            <div className="label-badge" style={{ marginBottom: '14px' }}>
              <span>Accréditations & Espaces Exposants</span>
              <span style={{ margin: '0 6px', opacity: 0.5 }}>•</span>
              <span>Ouarzazate, Maroc</span>
              <span style={{ margin: '0 6px', opacity: 0.5 }}>•</span>
              <span>6–8 Nov 2026</span>
            </div>
            
            <h1 className="display-title" style={{ fontSize: 'clamp(22px, 3.2vw, 36px)', marginBottom: '14px', lineHeight: 1.15 }}>
              Demander mon Badge / Pass FICIAI 2026
            </h1>

            <p className="body-text" style={{ maxWidth: '640px', margin: '0 auto 22px', fontSize: '13px', color: 'var(--text-secondary)' }}>
              Rejoignez les décideurs, créateurs, investisseurs et innovateurs de l'industrie cinématographique et de l'intelligence artificielle. Choisissez la formule adaptée à vos objectifs.
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="#badge-tiers" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                Voir les Formules & Tarifs
              </a>
              <a href="#badge-registration-form" className="btn btn-outline" style={{ textDecoration: 'none' }}>
                Formulaire d'Inscription
              </a>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* 2. BADGE TIER CARDS */}
      <section id="badge-tiers" className="relative z-10" style={{ maxWidth: '1100px', margin: '56px auto 0', padding: '0 16px' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h2 className="section-title">Formules d'Accès & Espaces Exposants</h2>
            <p className="body-text" style={{ maxWidth: '520px', margin: '6px auto 0', color: 'var(--text-secondary)', fontSize: '12px' }}>
              Sélectionnez votre pass ou stand pour pré-remplir instantanément le formulaire d'accréditation.
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
          {BADGE_TIERS.map((tier, i) => {
            const isSelected = selectedTier === tier.id;
            const isHighlighted = tier.highlight || isSelected;
            const iconColor = isSelected || isHighlighted ? '#B8432F' : 'var(--text-primary)';

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
                        {tier.icon(iconColor)}
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
                        Sélectionné
                      </span>
                    )}
                  </div>

                  <div className="time-value" style={{ fontSize: '24px', marginBottom: '16px', color: isSelected || tier.highlight ? '#B8432F' : 'var(--text-primary)' }}>
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
                      {isSelected ? "Formule Sélectionnée" : tier.btnText}
                    </button>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* 3. REGISTRATION FORM (Centered & Spacious) */}
      <section id="badge-registration-form" className="form-section-container relative z-10" style={{ maxWidth: '780px' }}>
        <FadeIn style={{ width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px', width: '100%' }}>
            <div className="label-badge" style={{ marginBottom: '10px', display: 'inline-block' }}>
              Étape 2 sur 2
            </div>
            <h2 className="section-title">Formulaire d'Enregistrement</h2>
            <p className="body-text" style={{ maxWidth: '520px', margin: '6px auto 0', color: 'var(--text-secondary)', fontSize: '12.5px' }}>
              Complétez vos coordonnées pour valider votre demande. Vous recevrez une confirmation officielle par email.
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
                  <strong style={{ display: 'block', marginBottom: '2px' }}>Demande enregistrée avec succès</strong>
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
                  <strong style={{ display: 'block', marginBottom: '2px' }}>Erreur de soumission</strong>
                  {submitMessage}
                </div>
              </div>
            )}

            <form style={{ display: 'flex', flexDirection: 'column', gap: '26px', width: '100%' }} onSubmit={handleFormSubmit}>
              
              {/* Section 1: Organisation & Identité */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                  <span className="mono-title" style={{ fontSize: '9.5px', color: '#B8432F', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 700 }}>
                    01. Organisation & Identité
                  </span>
                </div>
                
                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">
                      <span>Nom de l'Organisation</span>
                      <span style={{ color: '#B8432F' }}>*</span>
                    </label>
                    <input name="organisation" type="text" className="input-field" placeholder="ex. Atlas Cinema Studios" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      <span>Fonction / Titre Professionnel</span>
                      <span style={{ color: '#B8432F' }}>*</span>
                    </label>
                    <input name="jobTitle" type="text" className="input-field" placeholder="ex. Directrice Technique / Producteur" required />
                  </div>
                </div>
              </div>

              {/* Section 2: Coordonnées du Contact */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                  <span className="mono-title" style={{ fontSize: '9.5px', color: '#B8432F', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 700 }}>
                    02. Coordonnées du Contact
                  </span>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">
                      <span>Nom & Prénom</span>
                      <span style={{ color: '#B8432F' }}>*</span>
                    </label>
                    <input name="fullName" type="text" className="input-field" placeholder="ex. Sophia Bennani" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      <span>Email Professionnel</span>
                      <span style={{ color: '#B8432F' }}>*</span>
                    </label>
                    <input name="email" type="email" className="input-field" placeholder="ex. sophia@production.com" required />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <span>Numéro de Téléphone</span>
                    <span style={{ color: '#B8432F' }}>*</span>
                  </label>
                  <input name="phone" type="tel" className="input-field" placeholder="ex. +212 6 00 00 00 00" required />
                </div>
              </div>

              {/* Section 3: Formule & Précisions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
                <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
                  <span className="mono-title" style={{ fontSize: '9.5px', color: '#B8432F', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 700 }}>
                    03. Formule & Précisions
                  </span>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <span>Formule Sélectionnée</span>
                    <span style={{ color: '#B8432F' }}>*</span>
                  </label>
                  <select 
                    name="tier" 
                    className="input-field" 
                    value={selectedTier} 
                    onChange={(e) => setSelectedTier(e.target.value)}
                    required
                    style={{ fontWeight: 500 }}
                  >
                    {BADGE_TIERS.map(tier => (
                      <option key={tier.id} value={tier.id}>
                        {tier.title} — {tier.price}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <span>Message / Remarques complémentaires</span>
                    <span style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 400 }}>(Optionnel)</span>
                  </label>
                  <textarea 
                    name="message" 
                    rows={4} 
                    className="input-field" 
                    placeholder="Précisez vos besoins logistiques, vos thématiques d'intérêt ou toute information utile pour l'organisation..." 
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
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <>
                      <span>Valider et Soumettre ma Demande d'Accréditation</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </>
                  )}
                </button>
                <p style={{ textAlign: 'center', fontSize: '11px', color: 'var(--text-secondary)', marginTop: '10px', marginBottom: 0 }}>
                  Vos données sont traitées de manière confidentielle conformément au règlement du FICIAI 2026.
                </p>
              </div>

            </form>
          </div>
        </FadeIn>
      </section>

    </div>
  );
}
