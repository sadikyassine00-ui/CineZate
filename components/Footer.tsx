"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer-section relative z-10" style={{ padding: '48px 16px 36px', textAlign: 'center', borderTop: '1px solid var(--border)', background: 'rgba(255, 255, 255, 0.4)' }}>
      {/* Prominent Logo */}
      <div className="logo" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
        <Link href="/" style={{ display: 'inline-block', transition: 'transform 0.25s ease' }}>
          <img 
            src="/assets/logo/CinezateLogo.png" 
            alt="CineZate Logo" 
            style={{ 
              height: '72px', 
              width: 'auto', 
              objectFit: 'contain',
              filter: 'drop-shadow(0 4px 14px rgba(0,0,0,0.12))',
              display: 'block'
            }} 
          />
        </Link>
      </div>

      {/* Footer Navigation Links */}
      <nav style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center', alignItems: 'center', marginBottom: '22px' }}>
        <Link href="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '13px', fontWeight: 500, transition: 'color 0.2s ease' }}>
          {t.nav.home || "Accueil"}
        </Link>
        <span style={{ color: 'var(--border-hover)', fontSize: '12px' }}>•</span>
        <Link href="/stand" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '13px', fontWeight: 500, transition: 'color 0.2s ease' }}>
          {t.nav.stands || "Village du Cinéma"}
        </Link>
        <span style={{ color: 'var(--border-hover)', fontSize: '12px' }}>•</span>
        <Link href="/program" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '13px', fontWeight: 500, transition: 'color 0.2s ease' }}>
          {t.nav.program || "Programme"}
        </Link>
        <span style={{ color: 'var(--border-hover)', fontSize: '12px' }}>•</span>
        <Link href="/speakers" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '13px', fontWeight: 500, transition: 'color 0.2s ease' }}>
          {t.nav.speakers || "Intervenants"}
        </Link>
        <span style={{ color: 'var(--border-hover)', fontSize: '12px' }}>•</span>
        <Link href="/sponsor" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '13px', fontWeight: 500, transition: 'color 0.2s ease' }}>
          {t.nav.sponsoring || "Sponsoring"}
        </Link>
        <span style={{ color: 'var(--border-hover)', fontSize: '12px' }}>•</span>
        <Link href="/badge" style={{ color: '#B8432F', textDecoration: 'none', fontSize: '13px', fontWeight: 600, transition: 'color 0.2s ease' }}>
          {t.nav.badges || "Billetterie"}
        </Link>
      </nav>

      {/* Direct Contact Inquiries Strip */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center', alignItems: 'center', marginBottom: '22px' }}>
        <a 
          href="tel:+212665658959" 
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '6px', 
            color: '#B8432F', 
            fontSize: '12px', 
            fontWeight: 600, 
            textDecoration: 'none',
            fontFamily: 'var(--font-jetbrains)',
            padding: '4px 10px',
            background: '#FFF8F6',
            borderRadius: '6px',
            border: '1px solid rgba(184, 67, 47, 0.2)'
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          <span>+212 6 65 65 89 59</span>
        </a>

        <a 
          href="tel:+212611358061" 
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '6px', 
            color: '#B8432F', 
            fontSize: '12px', 
            fontWeight: 600, 
            textDecoration: 'none',
            fontFamily: 'var(--font-jetbrains)',
            padding: '4px 10px',
            background: '#FFF8F6',
            borderRadius: '6px',
            border: '1px solid rgba(184, 67, 47, 0.2)'
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
          </svg>
          <span>+212 611 35 80 61</span>
        </a>

        <a 
          href="mailto:contact@cinezate.com" 
          style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '6px', 
            color: '#B8432F', 
            fontSize: '12px', 
            fontWeight: 600, 
            textDecoration: 'none',
            fontFamily: 'var(--font-jetbrains)',
            padding: '4px 10px',
            background: '#FFF8F6',
            borderRadius: '6px',
            border: '1px solid rgba(184, 67, 47, 0.2)'
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2"/>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
          </svg>
          <span>contact@cinezate.com</span>
        </a>
      </div>

      {/* Association, Legal & Banking Details */}
      <div
        style={{
          maxWidth: '820px',
          margin: '0 auto 24px',
          padding: '18px 20px',
          background: 'rgba(255, 255, 255, 0.78)',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          borderRadius: '14px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px 24px',
          textAlign: 'left',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ fontFamily: 'var(--font-jetbrains)', fontSize: '10.5px', fontWeight: 700, color: '#B8432F', letterSpacing: '0.6px', textTransform: 'uppercase' }}>
            {t.footerInfo.associationName}
          </div>
          <div style={{ fontSize: '11.5px', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.45 }}>
            {t.footerInfo.authorization}
          </div>
          <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
            {t.footerInfo.address}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ fontFamily: 'var(--font-jetbrains)', fontSize: '10.5px', fontWeight: 700, color: '#B8432F', letterSpacing: '0.6px', textTransform: 'uppercase' }}>
            {t.footerInfo.bankTitle}
          </div>
          <div style={{ fontSize: '11.5px', color: 'var(--text-primary)', lineHeight: 1.45 }}>
            <span style={{ fontWeight: 600 }}>{t.footerInfo.accountLabel} </span>
            <span style={{ fontFamily: 'var(--font-jetbrains)', fontWeight: 600, userSelect: 'all' }}>{t.footerInfo.accountNumber}</span>
          </div>
          <div style={{ fontSize: '11.5px', color: 'var(--text-primary)', lineHeight: 1.45, wordBreak: 'break-all' }}>
            <span style={{ fontWeight: 600 }}>{t.footerInfo.ribLabel} </span>
            <span style={{ fontFamily: 'var(--font-jetbrains)', fontWeight: 700, color: '#111827', userSelect: 'all' }}>{t.footerInfo.ribNumber}</span>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '14px', display: 'flex', justifyContent: 'center' }}>
        <a
          href="https://www.cinezate.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mono-title"
          style={{ fontSize: '10.5px', fontWeight: 700, color: '#B8432F', textDecoration: 'none', letterSpacing: '0.6px', textTransform: 'uppercase' }}
        >
          {t.footerInfo.website}
        </a>
      </div>

      <p className="mono-title" style={{ fontSize: '9.5px', color: 'var(--text-secondary)', margin: '0 0 12px 0', letterSpacing: '0.4px' }}>
        {t.footerCopy}
      </p>

      <div className="footer-links" style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
        <a href="#" className="label-badge" style={{ background: 'transparent', border: 'none', padding: 0, fontSize: '9px', color: 'var(--text-secondary)', textDecoration: 'none', letterSpacing: '0.4px' }}>{t.privacy}</a>
        <a href="#" className="label-badge" style={{ background: 'transparent', border: 'none', padding: 0, fontSize: '9px', color: 'var(--text-secondary)', textDecoration: 'none', letterSpacing: '0.4px' }}>{t.terms}</a>
        <a href="mailto:contact@cinezate.com" className="label-badge" style={{ background: 'transparent', border: 'none', padding: 0, fontSize: '9px', color: 'var(--text-secondary)', textDecoration: 'none', letterSpacing: '0.4px' }}>{t.contact}</a>
      </div>
    </footer>
  );
}
