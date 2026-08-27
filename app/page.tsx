"use client";

import { useEffect, useState, useRef } from "react";
import { useLanguage } from "../components/LanguageProvider";
import Link from "next/link";
import FadeIn from "../components/FadeIn";

export default function Home() {
  const { t } = useLanguage();
  
  const [timeLeft, setTimeLeft] = useState({
    days: "000",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [progress, setProgress] = useState(0);
  const [isEventStarted, setIsEventStarted] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const targetDate = new Date("2026-11-06T00:00:00").getTime();
    const startDate = new Date("2024-01-01T00:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setIsEventStarted(true);
        clearInterval(interval);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60));
      const minutes = Math.floor((distance % (1000 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(days).padStart(3, "0"),
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
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Chill Architectural Grid */}
      <div className="page-dividers" style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: 'calc(100% - 32px)', maxWidth: '1080px', height: '100%' }}>
          <div className="divider-v" style={{ left: '0' }} />
          <div className="divider-v" style={{ right: '0' }} />
          
          <div className="string-pulse" style={{ left: '0', animationDelay: '0s' }} />
          <div className="string-pulse" style={{ right: '0', animationDelay: '3s' }} />
        </div>
      </div>

      <main className="hero relative z-10">
        <div className="hero-content relative">
          <div className="content-wrapper">
            <div className="badge-reveal" style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <span className="label-badge">{t.date}</span>
              <span className="label-badge">{t.location}</span>
            </div>

            <h1 className="display-title">
              <span className="line-reveal">{t.heroTitle1}</span>
              <span className="line-reveal">{t.heroTitle2}</span>
            </h1>

            <p className="body-text">
              {t.heroDesc}
            </p>

            <div className="cta-group">
              <Link href="/badge" className="btn btn-primary">{t.getTickets}</Link>
              <button className="btn btn-secondary">{t.exploreAgenda}</button>
            </div>
          </div>

          <div className="card-wrapper">
            <div className="card-glow" />
            
            <div className="countdown-card" ref={cardRef}>
              <div className="card-header">
                <span className="mono-title">{t.timeUntil}</span>
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
                <div className="time-block">
                  <span className="time-value">{timeLeft.seconds}</span>
                  <span className="time-label">{t.seconds}</span>
                </div>
              </div>

              <div className="card-footer">
                <div className="progress-container">
                  <div className="progress-bar" style={{ width: `${progress}%` }} />
                </div>
                <div className="progress-text">
                  {Math.round(progress)}% {t.progress}
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

      <section className="features-section relative z-10">
        <FadeIn>
          <div className="section-header relative">
            <h2 className="section-title">{t.exploreTitle}</h2>
            <p className="section-subtitle">{t.exploreSub}</p>
          </div>
        </FadeIn>
        
        <div className="features-grid relative mt-8" style={{ padding: '0 16px' }}>
          <FadeIn delay={0.1} className="feature-card relative z-10" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div className="feature-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </div>
            <h3 className="feature-title">{t.track1Title}</h3>
            <p className="feature-subtitle">{t.track1Sub}</p>
            <Link href="/sponsor" className="btn btn-outline feature-btn">{t.track1Btn}</Link>
          </FadeIn>

          <FadeIn delay={0.2} className="feature-card relative z-10" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div className="feature-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
            </div>
            <h3 className="feature-title">{t.track2Title}</h3>
            <p className="feature-subtitle">{t.track2Sub}</p>
            <Link href="/stand" className="btn btn-outline feature-btn">{t.track2Btn}</Link>
          </FadeIn>

          <FadeIn delay={0.3} className="feature-card relative z-10" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div className="feature-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><circle cx="12" cy="11" r="3"/><rect x="9" y="16" width="6" height="2" rx="1"/></svg>
            </div>
            <h3 className="feature-title">{t.track3Title}</h3>
            <p className="feature-subtitle">{t.track3Sub}</p>
            <Link href="/badge" className="btn btn-outline feature-btn">{t.track3Btn}</Link>
          </FadeIn>
        </div>
      </section>

      {/* Global Impact Stats Section */}
      <section className="stats-section relative z-10" style={{ padding: '48px 24px' }}>
        <FadeIn>
          <div className="section-header relative" style={{ marginBottom: '32px' }}>
            <h2 className="section-title text-center">{t.stats.title}</h2>
          </div>
        </FadeIn>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '24px', maxWidth: '1080px', margin: '0 auto', textAlign: 'center' }}>
          {[
            { value: t.stats.stat1Value, label: t.stats.stat1Label },
            { value: t.stats.stat2Value, label: t.stats.stat2Label },
            { value: t.stats.stat3Value, label: t.stats.stat3Label },
            { value: t.stats.stat4Value, label: t.stats.stat4Label }
          ].map((stat, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{ fontFamily: 'var(--font-inter)', fontSize: 'clamp(22px, 2.6vw, 32px)', fontWeight: 600, color: 'var(--text-primary)', letterSpacing: '-0.8px', lineHeight: 1 }}>
                  {stat.value}
                </div>
                <div style={{ fontFamily: 'var(--font-jetbrains)', fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.8px', maxWidth: '180px', lineHeight: 1.3 }}>
                  {stat.label}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        <div className="divider-h absolute" style={{ bottom: '0', left: '0', right: '0', zIndex: 0 }}></div>
      </section>

      <section className="about-section relative z-10" style={{ padding: '40px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
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
              delay={i * 0.1}
              className="feature-card relative z-10"
              style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
            >
              <h3 className="feature-title" style={{ fontSize: '15px', marginBottom: '6px' }}>{axis.title}</h3>
              <p className="feature-subtitle" style={{ color: 'var(--text-secondary)', lineHeight: '1.4', fontSize: '12px' }}>{axis.desc}</p>
            </FadeIn>
          ))}
        </div>
        <div className="divider-h absolute" style={{ bottom: '0', left: '0', right: '0', zIndex: 0 }}></div>
      </section>

      {/* TEAM SECTION */}
      <section className="team-section relative z-10" style={{ padding: '40px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="section-header relative" style={{ marginBottom: '24px' }}>
          <h2 className="section-title text-center">{t.teamTitle}</h2>
          <p className="section-subtitle text-center">{t.teamSub}</p>
        </div>
        
        <div className="team-grid relative" style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div className="divider-h absolute" style={{ top: '50%', left: '0', right: '0', zIndex: 0 }}></div>
          
          <div className="feature-card relative z-10" style={{ padding: '18px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '220px' }}>
            <img 
              src="/assets/team/abdouPic.png" 
              alt="Abderafia Souhali" 
              style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', marginBottom: '12px', border: '1.5px solid rgba(0,0,0,0.08)' }} 
            />
            <h3 className="feature-title" style={{ fontSize: '15px', marginBottom: '2px' }}>Abderafia Souhali</h3>
            <p className="feature-subtitle" style={{ color: 'var(--text-secondary)', marginBottom: '12px', textAlign: 'center', fontSize: '11px' }}>{t.team1Role}</p>
            
            <a href="#" target="_blank" rel="noopener noreferrer" className="social-link" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', background: '#F3F4F6', color: 'var(--text-primary)', border: '1px solid rgba(0,0,0,0.08)', transition: 'background 0.25s ease' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </div>

          <div className="feature-card relative z-10" style={{ padding: '18px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '220px' }}>
            <img 
              src="/assets/team/najib.png" 
              alt="Najib Bredaa" 
              style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', marginBottom: '12px', border: '1.5px solid rgba(0,0,0,0.08)' }} 
            />
            <h3 className="feature-title" style={{ fontSize: '15px', marginBottom: '2px' }}>Najib Bredaa</h3>
            <p className="feature-subtitle" style={{ color: 'var(--text-secondary)', marginBottom: '12px', textAlign: 'center', fontSize: '11px', lineHeight: '1.3' }}>{t.team2Role}</p>
            
            <a href="#" target="_blank" rel="noopener noreferrer" className="social-link" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', background: '#F3F4F6', color: 'var(--text-primary)', border: '1px solid rgba(0,0,0,0.08)', transition: 'background 0.25s ease' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </div>

          <div className="feature-card relative z-10" style={{ padding: '18px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '220px' }}>
            <img 
              src="/assets/team/Yassine.png" 
              alt="Yassine Sadik" 
              style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', marginBottom: '12px', border: '1.5px solid rgba(0,0,0,0.08)' }} 
            />
            <h3 className="feature-title" style={{ fontSize: '15px', marginBottom: '2px' }}>Yassine Sadik</h3>
            <p className="feature-subtitle" style={{ color: 'var(--text-secondary)', marginBottom: '12px', textAlign: 'center', fontSize: '11px', lineHeight: '1.3' }}>{t.team3Role}</p>
            
            <a href="#" target="_blank" rel="noopener noreferrer" className="social-link" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', background: '#F3F4F6', color: 'var(--text-primary)', border: '1px solid rgba(0,0,0,0.08)', transition: 'background 0.25s ease' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </div>
        </div>
      </section>

    </>
  );
}
