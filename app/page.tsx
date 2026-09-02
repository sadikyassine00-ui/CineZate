"use client";

import { useEffect, useState, useRef } from "react";
import { useLanguage } from "../components/LanguageProvider";
import Link from "next/link";
import FadeIn from "../components/FadeIn";

export default function Home() {
  const { t } = useLanguage();
  
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [progress, setProgress] = useState(0);
  const [isEventStarted, setIsEventStarted] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const targetDate = new Date("2026-11-06T09:00:00+01:00").getTime();
    const startDate = new Date("2026-01-01T00:00:00+01:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        setIsEventStarted(true);
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        setProgress(100);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });

      const totalDuration = targetDate - startDate;
      const elapsed = now - startDate;
      let progressPct = (elapsed / totalDuration) * 100;
      if (progressPct < 0) progressPct = 0;
      if (progressPct > 100) progressPct = 100;
      setProgress(progressPct);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <main className="hero relative z-10">
        <div className="hero-content relative">
          <div className="content-wrapper">
            <div className="badge-reveal" style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <span className="label-badge">{t.date}</span>
              <span className="label-badge">{t.location}</span>
            </div>

            <h1 className="display-title">
              <span className="line-reveal">{t.heroTitle1}</span>
              <span className="line-reveal hero-accent-gradient">{t.heroTitle2}</span>
            </h1>

            <p className="body-text hero-description">
              {t.heroDesc}
            </p>

            <div className="cta-group">
              <Link href="/badge" className="btn btn-primary btn-hero-primary">{t.getTickets}</Link>
              <Link href="/sponsor" className="btn btn-secondary btn-hero-secondary">{t.track1Btn || "Devenir Sponsor"}</Link>
            </div>
          </div>

          <div className="card-wrapper">
            <div className="card-glow" />
            
            <div className="countdown-card" ref={cardRef}>
              <div className="card-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ display: 'inline-flex', color: '#B8432F' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  </span>
                  <span className="mono-title" style={{ fontWeight: 700, letterSpacing: '0.6px', color: 'var(--text-primary)' }}>
                    FICIAI 2026
                  </span>
                </div>
                <div className="status-indicator">
                  <span className="dot"></span>
                  <span>{isEventStarted ? t.eventInProgress : t.upcoming}</span>
                </div>
              </div>

              <div className="countdown-grid">
                <div className="time-block">
                  <span className="time-value">{timeLeft.days}</span>
                  <span className="time-label">{t.days}</span>
                </div>
                <span className="time-divider">:</span>
                <div className="time-block">
                  <span className="time-value">{timeLeft.hours}</span>
                  <span className="time-label">{t.hours}</span>
                </div>
                <span className="time-divider">:</span>
                <div className="time-block">
                  <span className="time-value">{timeLeft.minutes}</span>
                  <span className="time-label">{t.minutes}</span>
                </div>
                <span className="time-divider">:</span>
                <div className="time-block" style={{ border: '1px solid rgba(184, 67, 47, 0.25)', background: 'rgba(184, 67, 47, 0.03)' }}>
                  <span className="time-value" style={{ color: '#B8432F' }}>{timeLeft.seconds}</span>
                  <span className="time-label" style={{ color: '#B8432F' }}>{t.seconds}</span>
                </div>
              </div>

              <div className="card-footer">
                <div className="progress-container">
                  <div className="progress-bar" style={{ width: `${progress}%` }} />
                </div>
                <div className="progress-text">
                  <span>{Math.round(progress)}% {t.progress}</span>
                  <span>6–8 Nov 2026</span>
                </div>

                <div className="countdown-cta-strip">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#059669', display: 'inline-block' }}></span>
                    <span style={{ fontSize: '11px', color: '#4B5563', fontWeight: 500 }}>Accréditations en cours</span>
                  </div>
                  <Link 
                    href="/badge" 
                    style={{ 
                      fontSize: '11.5px', 
                      color: '#B8432F', 
                      fontWeight: 600, 
                      textDecoration: 'none', 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '4px' 
                    }}
                  >
                    <span>Demander mon Pass</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Partners Marquee Section */}
      <section className="partners-section">
        <div className="marquee">
          <div className="marquee-content">
            <img src="/assets/logo bar/logo1.png" alt="Partner 1" className="marquee-logo" />
            <img src="/assets/logo bar/logo2.png" alt="Partner 2" className="marquee-logo" />
            <img src="/assets/logo bar/logo3.png" alt="Partner 3" className="marquee-logo" />
            <img src="/assets/logo bar/logo4.png" alt="Partner 4" className="marquee-logo" />
            <img src="/assets/logo bar/logo5.png" alt="Partner 5" className="marquee-logo" />
            <img src="/assets/logo bar/logo6.jpg" alt="Partner 6" className="marquee-logo" />
            <img src="/assets/logo bar/logo7.jpg" alt="Partner 7" className="marquee-logo" />
            <img src="/assets/logo bar/logo8.png" alt="Partner 8" className="marquee-logo" />
            {/* Duplicated for smooth loop */}
            <img src="/assets/logo bar/logo1.png" alt="Partner 1" className="marquee-logo" />
            <img src="/assets/logo bar/logo2.png" alt="Partner 2" className="marquee-logo" />
            <img src="/assets/logo bar/logo3.png" alt="Partner 3" className="marquee-logo" />
            <img src="/assets/logo bar/logo4.png" alt="Partner 4" className="marquee-logo" />
            <img src="/assets/logo bar/logo5.png" alt="Partner 5" className="marquee-logo" />
            <img src="/assets/logo bar/logo6.jpg" alt="Partner 6" className="marquee-logo" />
            <img src="/assets/logo bar/logo7.jpg" alt="Partner 7" className="marquee-logo" />
            <img src="/assets/logo bar/logo8.png" alt="Partner 8" className="marquee-logo" />
          </div>
        </div>
      </section>

      {/* 3. DÉCOUVREZ L'EXPÉRIENCE (DARK MODE SHOWCASE SECTION) */}
      <section id="experience" className="dark-showcase-section">
        <div className="dark-showcase-grid-bg" />
        
        <div style={{ maxWidth: '1140px', margin: '0 auto', position: 'relative', zIndex: 2, width: '100%', boxSizing: 'border-box' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: '44px' }}>
              <div 
                className="label-badge" 
                style={{ 
                  background: 'rgba(184, 67, 47, 0.15)', 
                  borderColor: 'rgba(184, 67, 47, 0.35)', 
                  color: '#F87171',
                  marginBottom: '16px' 
                }}
              >
                <span>FICIAI 2026 • 3 PARCOURS D'ENGAGEMENT</span>
              </div>
              <h2 
                className="section-title" 
                style={{ 
                  color: '#FFFFFF', 
                  fontSize: 'clamp(24px, 3.4vw, 38px)', 
                  fontWeight: 700, 
                  letterSpacing: '-0.8px',
                  marginBottom: '12px' 
                }}
              >
                {t.exploreTitle}
              </h2>
              <p style={{ maxWidth: '640px', margin: '0 auto', color: '#94A3B8', fontSize: '13.5px', lineHeight: 1.6 }}>
                {t.exploreSub}
              </p>
            </div>
          </FadeIn>
          
          <div className="features-grid relative" style={{ maxWidth: '1080px', margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
            <FadeIn delay={0.1} style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', minWidth: 0, boxSizing: 'border-box' }}>
              <div className="dark-feature-card">
                <div className="dark-feature-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                </div>
                <h3 className="dark-feature-title">{t.track1Title}</h3>
                <p className="dark-feature-sub">{t.track1Sub}</p>
                <Link 
                  href="/sponsor" 
                  className="btn btn-outline" 
                  style={{ 
                    marginTop: 'auto', 
                    width: '100%', 
                    justifyContent: 'center', 
                    fontSize: '12.5px'
                  }}
                >
                  {t.track1Btn}
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={0.2} style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', minWidth: 0, boxSizing: 'border-box' }}>
              <div 
                className="dark-feature-card" 
                style={{ 
                  border: '1.5px solid rgba(184, 67, 47, 0.45)', 
                  background: 'rgba(184, 67, 47, 0.06)',
                  boxShadow: '0 20px 48px rgba(184, 67, 47, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  width: '100%',
                  maxWidth: '100%',
                  boxSizing: 'border-box'
                }}
              >
                <div className="dark-feature-icon" style={{ background: '#B8432F', color: '#FFFFFF', border: 'none' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                    <line x1="3" y1="9" x2="21" y2="9"/>
                    <line x1="9" y1="21" x2="9" y2="9"/>
                  </svg>
                </div>
                <h3 className="dark-feature-title">{t.track2Title}</h3>
                <p className="dark-feature-sub">{t.track2Sub}</p>
                <Link 
                  href="/stand" 
                  className="btn btn-primary" 
                  style={{ 
                    marginTop: 'auto', 
                    width: '100%', 
                    justifyContent: 'center', 
                    fontSize: '12.5px' 
                  }}
                >
                  {t.track2Btn}
                </Link>
              </div>
            </FadeIn>

            <FadeIn delay={0.3} style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', minWidth: 0, boxSizing: 'border-box' }}>
              <div className="dark-feature-card">
                <div className="dark-feature-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <circle cx="12" cy="11" r="3"/>
                    <rect x="9" y="16" width="6" height="2" rx="1"/>
                  </svg>
                </div>
                <h3 className="dark-feature-title">{t.track3Title}</h3>
                <p className="dark-feature-sub">{t.track3Sub}</p>
                <Link 
                  href="/badge" 
                  className="btn btn-outline" 
                  style={{ 
                    marginTop: 'auto', 
                    width: '100%', 
                    justifyContent: 'center', 
                    fontSize: '12.5px' 
                  }}
                >
                  {t.track3Btn}
                </Link>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.4}>
            <div className="dark-banner-strip">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#B8432F', boxShadow: '0 0 10px #B8432F', display: 'inline-block' }}></span>
                <div>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#FFFFFF', display: 'block' }}>
                    Ouarzazate Smart City of Cinema 2030
                  </span>
                  <span style={{ fontSize: '11px', color: '#94A3B8' }}>
                    Passerelle industrielle et technologique entre Hollywood, Bollywood & Nollywood
                  </span>
                </div>
              </div>
              <Link 
                href="/sponsor" 
                className="btn btn-primary" 
                style={{ 
                  textDecoration: 'none', 
                  fontSize: '12px', 
                  padding: '9px 18px',
                  whiteSpace: 'nowrap'
                }}
              >
                Rejoindre l'Écosystème
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 4. GLOBAL IMPACT STATS SECTION (LIGHT AESTHETIC) */}
      <section className="stats-section relative z-10" style={{ padding: '48px 24px 32px' }}>
        <FadeIn>
          <div className="section-header relative" style={{ marginBottom: '32px' }}>
            <h2 className="section-title text-center">{t.stats.title}</h2>
          </div>
        </FadeIn>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '20px', maxWidth: '1080px', margin: '0 auto' }}>
          {[
            { value: t.stats.stat1Value, label: t.stats.stat1Label },
            { value: t.stats.stat2Value, label: t.stats.stat2Label },
            { value: t.stats.stat3Value, label: t.stats.stat3Label },
            { value: t.stats.stat4Value, label: t.stats.stat4Label }
          ].map((stat, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="stat-card-light">
                <div style={{ fontFamily: 'var(--font-jetbrains)', fontSize: 'clamp(20px, 2.4vw, 32px)', fontWeight: 700, color: '#B8432F', letterSpacing: '-0.5px', lineHeight: 1.15, marginBottom: '8px' }}>
                  {stat.value}
                </div>
                <div style={{ fontFamily: 'var(--font-jetbrains)', fontSize: '10.5px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.8px', maxWidth: '200px', lineHeight: 1.4 }}>
                  {stat.label}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section id="about" className="about-section relative z-10" style={{ padding: '40px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <FadeIn>
          <div className="section-header relative" style={{ marginBottom: '24px', padding: '0 20px' }}>
            <h2 className="section-title text-center">{t.about.axesTitle}</h2>
            <p className="section-subtitle text-center">{t.about.axesSubtitle}</p>
          </div>
        </FadeIn>

        <div className="features-grid relative mt-4">
          {t.about.axes.map((axis: { title: string; desc: string }, i: number) => (
            <FadeIn 
              key={i} 
              delay={i * 0.08}
              style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
            >
              <div 
                className="feature-card relative z-10" 
                style={{ height: '100%', flex: 1, padding: '24px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', boxSizing: 'border-box' }}
              >
                <h3 className="feature-title" style={{ fontSize: '15px', marginBottom: '6px' }}>{axis.title}</h3>
                <p className="feature-subtitle" style={{ color: 'var(--text-secondary)', lineHeight: '1.4', fontSize: '12px', marginBottom: 0 }}>{axis.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* TEAM / VISIONARIES (CREATORS OF FICIAI) */}
      <section id="visionnaires" className="team-section relative z-10" style={{ padding: '52px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="section-header relative" style={{ marginBottom: '32px' }}>
          <h2 className="section-title text-center">{t.teamTitle}</h2>
          <p className="section-subtitle text-center">{t.teamSub}</p>
        </div>
        
        <div className="team-grid relative" style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '28px', flexWrap: 'wrap' }}>
          
          <div className="feature-card relative z-10" style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '280px' }}>
            <img 
              src="/assets/team/abdouPic.png" 
              alt="Abderafia Souhali" 
              style={{ width: '88px', height: '88px', borderRadius: '50%', objectFit: 'cover', marginBottom: '16px', border: '2px solid rgba(0,0,0,0.08)' }} 
            />
            <h3 className="feature-title" style={{ fontSize: '18px', marginBottom: '4px' }}>Abderafia Souhali</h3>
            <p className="feature-subtitle" style={{ color: 'var(--text-secondary)', marginBottom: '16px', textAlign: 'center', fontSize: '13px' }}>{t.team1Role}</p>
            
            <a href="#" target="_blank" rel="noopener noreferrer" className="social-link" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '50%', background: '#F3F4F6', color: 'var(--text-primary)', border: '1px solid rgba(0,0,0,0.08)', transition: 'background 0.25s ease' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </div>

          <div className="feature-card relative z-10" style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '280px' }}>
            <img 
              src="/assets/team/najib.png" 
              alt="Najib Bredaa" 
              style={{ width: '88px', height: '88px', borderRadius: '50%', objectFit: 'cover', marginBottom: '16px', border: '2px solid rgba(0,0,0,0.08)' }} 
            />
            <h3 className="feature-title" style={{ fontSize: '18px', marginBottom: '4px' }}>Najib Bredaa</h3>
            <p className="feature-subtitle" style={{ color: 'var(--text-secondary)', marginBottom: '16px', textAlign: 'center', fontSize: '13px', lineHeight: '1.35' }}>{t.team2Role}</p>
            
            <a href="#" target="_blank" rel="noopener noreferrer" className="social-link" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '50%', background: '#F3F4F6', color: 'var(--text-primary)', border: '1px solid rgba(0,0,0,0.08)', transition: 'background 0.25s ease' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </div>

          <div className="feature-card relative z-10" style={{ padding: '28px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '280px' }}>
            <img 
              src="/assets/team/Yassine.png" 
              alt="Yassine Sadik" 
              style={{ width: '88px', height: '88px', borderRadius: '50%', objectFit: 'cover', marginBottom: '16px', border: '2px solid rgba(0,0,0,0.08)' }} 
            />
            <h3 className="feature-title" style={{ fontSize: '18px', marginBottom: '4px' }}>Yassine Sadik</h3>
            <p className="feature-subtitle" style={{ color: 'var(--text-secondary)', marginBottom: '16px', textAlign: 'center', fontSize: '13px', lineHeight: '1.35' }}>{t.team3Role}</p>
            
            <a href="#" target="_blank" rel="noopener noreferrer" className="social-link" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '50%', background: '#F3F4F6', color: 'var(--text-primary)', border: '1px solid rgba(0,0,0,0.08)', transition: 'background 0.25s ease' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </div>
        </div>
      </section>

    </>
  );
}
