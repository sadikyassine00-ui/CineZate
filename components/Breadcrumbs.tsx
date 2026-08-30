"use client";

import Link from "next/link";
import { useLanguage } from "./LanguageProvider";

interface BreadcrumbsProps {
  currentPage: string;
  category?: {
    label: string;
    href: string;
  };
}

export default function Breadcrumbs({ currentPage, category }: BreadcrumbsProps) {
  const { t } = useLanguage();

  return (
    <nav 
      aria-label="Breadcrumb"
      className="relative z-20"
      style={{
        maxWidth: '1140px',
        margin: '12px auto 20px',
        padding: '0 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}
    >
      {/* Breadcrumb path */}
      <ol 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          listStyle: 'none', 
          padding: '6px 14px', 
          margin: 0,
          background: 'rgba(255, 255, 255, 0.75)',
          backdropFilter: 'blur(10px)',
          border: '1px solid var(--border)',
          borderRadius: '9999px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
          fontSize: '12px'
        }}
      >
        <li style={{ display: 'flex', alignItems: 'center' }}>
          <Link 
            href="/" 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '6px', 
              color: 'var(--text-secondary)', 
              textDecoration: 'none',
              fontWeight: 500,
              transition: 'color 0.2s ease'
            }}
            className="breadcrumb-home-link"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            <span>{t.nav.breadcrumbHome || "Accueil"}</span>
          </Link>
        </li>

        <li style={{ color: 'var(--border-hover)', display: 'flex', alignItems: 'center' }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </li>

        {category && (
          <>
            <li style={{ display: 'flex', alignItems: 'center' }}>
              <Link 
                href={category.href}
                style={{ 
                  color: 'var(--text-secondary)', 
                  textDecoration: 'none',
                  fontWeight: 500,
                  transition: 'color 0.2s ease'
                }}
              >
                {category.label}
              </Link>
            </li>
            <li style={{ color: 'var(--border-hover)', display: 'flex', alignItems: 'center' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </li>
          </>
        )}

        <li aria-current="page" style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ 
            color: '#B8432F', 
            fontWeight: 600,
            maxWidth: '280px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {currentPage}
          </span>
        </li>
      </ol>

      {/* Quick Return Button */}
      <Link 
        href="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '6px 14px',
          background: '#FFF8F6',
          border: '1px solid rgba(184, 67, 47, 0.25)',
          borderRadius: '9999px',
          color: '#B8432F',
          fontSize: '11.5px',
          fontWeight: 600,
          textDecoration: 'none',
          transition: 'all 0.2s ease',
          boxShadow: '0 1px 3px rgba(184, 67, 47, 0.08)'
        }}
        className="breadcrumb-back-btn"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"/>
          <polyline points="12 19 5 12 12 5"/>
        </svg>
        <span>{t.nav.backHome || "Retour à l'accueil"}</span>
      </Link>
    </nav>
  );
}
