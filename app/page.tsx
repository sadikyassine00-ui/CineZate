"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "../components/LanguageProvider";

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
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const targetDate = new Date("2026-11-06T09:00:00").getTime();
    const startDate = new Date("2024-01-01T00:00:00").getTime();
    const totalDuration = targetDate - startDate;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setIsEventStarted(true);
        setProgress(100);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        days: days.toString().padStart(3, '0'),
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0'),
      });

      const elapsed = now - startDate;
      const currentProgress = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
      setProgress(currentProgress);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current) return;
      const card = cardRef.current;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      if (!cardRef.current) return;
      cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    };

    const cardNode = cardRef.current;
    if (cardNode) {
      cardNode.addEventListener('mousemove', handleMouseMove);
      cardNode.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (cardNode) {
        cardNode.removeEventListener('mousemove', handleMouseMove);
        cardNode.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <main className="hero relative z-10" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/* Background Architectural Grid purely for aesthetics */}
      <div className="page-dividers" style={{ display: 'flex', justifyContent: 'center', zIndex: -1 }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '1400px', height: '100%' }}>
          <div className="divider-v" style={{ left: '0' }} />
          <div className="divider-v" style={{ right: '0' }} />
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', padding: '120px 20px', maxWidth: '1200px' }}>
        
        <div className="card-3d-wrapper" style={{ width: '100%', maxWidth: '800px' }}>
          <div ref={cardRef} className="glass-card main-card" style={{ padding: '60px', transition: 'transform 0.1s ease-out' }}>
            <div style={{ textAlign: 'center' }}>
              <h1 className="display-title" style={{ fontSize: '64px', letterSpacing: '-0.02em', lineHeight: '1.1', marginBottom: '24px' }}>
                <span style={{ display: 'block', color: 'var(--text-secondary)' }}>{t.title1}</span>
                <span style={{ display: 'block', color: 'var(--text-primary)' }}>{t.title2}</span>
                <span style={{ display: 'block', color: 'var(--text-secondary)', marginTop: '8px' }}>
                  {t.title3} <span style={{ color: 'var(--text-primary)' }}>{t.title4}</span> {t.title5}
                </span>
              </h1>
              
              <p className="body-text" style={{ maxWidth: '600px', margin: '0 auto 40px auto', fontSize: '18px', color: 'rgba(255,255,255,0.7)' }}>
                {t.desc}
              </p>
            </div>
            
            <div className="metrics-grid">
              <div className="metric-box">
                <div className="metric-value">{timeLeft.days}</div>
                <div className="metric-label">DAYS</div>
              </div>
              <div className="metric-box">
                <div className="metric-value">{timeLeft.hours}</div>
                <div className="metric-label">HOURS</div>
              </div>
              <div className="metric-box">
                <div className="metric-value">{timeLeft.minutes}</div>
                <div className="metric-label">MINS</div>
              </div>
              <div className="metric-box">
                <div className="metric-value">{timeLeft.seconds}</div>
                <div className="metric-label">SECS</div>
              </div>
            </div>

            <div className="progress-container">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
                <span className="label-badge" style={{ background: 'transparent', padding: 0 }}>SYSTEM INIT</span>
                <span className="label-badge" style={{ background: 'transparent', padding: 0 }}>{progress.toFixed(2)}%</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <section className="features-section" style={{ width: '100%', maxWidth: '1400px', padding: '80px 20px', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 className="display-title" style={{ fontSize: '48px', marginBottom: '16px' }}>{t.exploreTitle}</h2>
          <p className="body-text" style={{ maxWidth: '600px', margin: '0 auto' }}>{t.exploreSub}</p>
        </div>

        <div className="features-grid relative mt-16" style={{ padding: '0 32px' }}>
          <div className="feature-card relative z-10">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </div>
            <h3 className="feature-title">{t.track1Title}</h3>
            <p className="feature-subtitle">{t.track1Sub}</p>
            <Link href="/sponsor" className="btn btn-outline feature-btn">{t.track1Btn}</Link>
          </div>

          <div className="feature-card relative z-10">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
            </div>
            <h3 className="feature-title">{t.track2Title}</h3>
            <p className="feature-subtitle">{t.track2Sub}</p>
            <Link href="/stand" className="btn btn-outline feature-btn">{t.track2Btn}</Link>
          </div>

          <div className="feature-card relative z-10">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><circle cx="12" cy="11" r="3"/><rect x="9" y="16" width="6" height="2" rx="1"/></svg>
            </div>
            <h3 className="feature-title">{t.track3Title}</h3>
            <p className="feature-subtitle">{t.track3Sub}</p>
            <Link href="/badge" className="btn btn-outline feature-btn">{t.track3Btn}</Link>
          </div>
        </div>
      </section>
      
      <section className="team-section" style={{ width: '100%', maxWidth: '1400px', padding: '80px 20px', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 className="display-title" style={{ fontSize: '48px', marginBottom: '16px' }}>{t.teamTitle}</h2>
          <p className="body-text" style={{ maxWidth: '600px', margin: '0 auto' }}>{t.teamSub}</p>
        </div>

        <div className="features-grid relative mt-16" style={{ padding: '0 32px' }}>
          
          <div className="feature-card relative z-10" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '20px' }}>
            <div style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.1)' }}>
              <Image src="/assets/team/abdouPic.png" alt="Abderafia Souhali" width={120} height={120} style={{ objectFit: 'cover' }} />
            </div>
            <div>
              <h3 className="feature-title" style={{ marginBottom: '8px' }}>Abderafia Souhali</h3>
              <p className="feature-subtitle" style={{ minHeight: '48px' }}>{t.team1Role}</p>
            </div>
            <a href="https://linkedin.com/in/abdou" target="_blank" rel="noreferrer" className="btn btn-outline feature-btn" style={{ textDecoration: 'none' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              LinkedIn
            </a>
          </div>

          <div className="feature-card relative z-10" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '20px' }}>
            <div style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.1)' }}>
              <Image src="/assets/team/najib.png" alt="Najib Bredaa" width={120} height={120} style={{ objectFit: 'cover' }} />
            </div>
            <div>
              <h3 className="feature-title" style={{ marginBottom: '8px' }}>Najib Bredaa</h3>
              <p className="feature-subtitle" style={{ minHeight: '48px' }}>{t.team2Role}</p>
            </div>
            <a href="https://linkedin.com/in/najib" target="_blank" rel="noreferrer" className="btn btn-outline feature-btn" style={{ textDecoration: 'none' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239-5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              LinkedIn
            </a>
          </div>

          <div className="feature-card relative z-10" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '20px' }}>
            <div style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.1)' }}>
              <Image src="/assets/team/Yassine.png" alt="Yassine Sadik" width={120} height={120} style={{ objectFit: 'cover' }} />
            </div>
            <div>
              <h3 className="feature-title" style={{ marginBottom: '8px' }}>Yassine Sadik</h3>
              <p className="feature-subtitle" style={{ minHeight: '48px' }}>{t.team3Role}</p>
            </div>
            <a href="https://linkedin.com/in/yassine" target="_blank" rel="noreferrer" className="btn btn-outline feature-btn" style={{ textDecoration: 'none' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '8px' }}><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239-5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              LinkedIn
            </a>
          </div>

        </div>
      </section>

      <section className="partners-section" style={{ width: '100%', maxWidth: '1400px', padding: '60px 0', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '40px' }}>
        <p className="label-badge" style={{ textAlign: 'center', marginBottom: '32px' }}>{t.backedBy}</p>
        
        <div className="marquee-container">
          <div className="marquee-track">
            {/* Logos Group 1 */}
            <div className="marquee-item"><Image src="/assets/logo bar/logo1.png" alt="Partner" width={100} height={40} /></div>
            <div className="marquee-item"><Image src="/assets/logo bar/logo2.png" alt="Partner" width={100} height={40} /></div>
            <div className="marquee-item"><Image src="/assets/logo bar/logo3.png" alt="Partner" width={100} height={40} /></div>
            <div className="marquee-item"><Image src="/assets/logo bar/logo4.png" alt="Partner" width={100} height={40} /></div>
            <div className="marquee-item"><Image src="/assets/logo bar/logo5.png" alt="Partner" width={100} height={40} /></div>
            <div className="marquee-item"><Image src="/assets/logo bar/logo6.jpg" alt="Partner" width={100} height={40} /></div>
            <div className="marquee-item"><Image src="/assets/logo bar/logo7.jpg" alt="Partner" width={100} height={40} /></div>
            <div className="marquee-item"><Image src="/assets/logo bar/logo8.png" alt="Partner" width={100} height={40} /></div>
            
            {/* Logos Group 2 (Duplicate for seamless loop) */}
            <div className="marquee-item"><Image src="/assets/logo bar/logo1.png" alt="Partner" width={100} height={40} /></div>
            <div className="marquee-item"><Image src="/assets/logo bar/logo2.png" alt="Partner" width={100} height={40} /></div>
            <div className="marquee-item"><Image src="/assets/logo bar/logo3.png" alt="Partner" width={100} height={40} /></div>
            <div className="marquee-item"><Image src="/assets/logo bar/logo4.png" alt="Partner" width={100} height={40} /></div>
            <div className="marquee-item"><Image src="/assets/logo bar/logo5.png" alt="Partner" width={100} height={40} /></div>
            <div className="marquee-item"><Image src="/assets/logo bar/logo6.jpg" alt="Partner" width={100} height={40} /></div>
            <div className="marquee-item"><Image src="/assets/logo bar/logo7.jpg" alt="Partner" width={100} height={40} /></div>
            <div className="marquee-item"><Image src="/assets/logo bar/logo8.png" alt="Partner" width={100} height={40} /></div>
          </div>
        </div>
      </section>

    </main>
  );
}
