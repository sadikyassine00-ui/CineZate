"use client";

import { useEffect, useState, useRef } from "react";

const translations = {
  en: {
    nav: { about: "About", speakers: "Speakers", agenda: "Agenda" },
    register: "Register Interest",
    date: "November 6-8, 2026",
    location: "Ouarzazate, Morocco",
    heroTitle1: "The Premier Event",
    heroTitle2: "for Creators & Innovators.",
    heroDesc: "Join industry leaders, designers, and developers at FICIAI 2026. Discover cutting-edge tools, connect with front-end teams, and explore the strategies shaping the next generation of the web.",
    getTickets: "Get Tickets",
    exploreAgenda: "Explore Agenda",
    timeUntil: "Time Until Event",
    upcoming: "Upcoming",
    eventInProgress: "EVENT IN PROGRESS",
    days: "Days", hours: "Hours", minutes: "Minutes", seconds: "Seconds",
    progress: "Progress to launch",
    backedBy: "Backed by industry leaders",
    exploreTitle: "Explore the Experience",
    exploreSub: "Dive into dedicated tracks designed to push the boundaries of modern digital creation and artificial intelligence.",
    track1Title: "Architecture",
    track1Sub: "Discover scalable solutions for next-gen web applications and decentralized platforms.",
    track1Btn: "View Track",
    track2Title: "Global Networking",
    track2Sub: "Connect with industry leaders, designers, and top-tier developers from around the world.",
    track2Btn: "See Speakers",
    track3Title: "AI Tooling",
    track3Sub: "Get hands-on experience with the latest agentic frameworks and generative design tools.",
    track3Btn: "View Workshops",
    teamTitle: "Meet the Visionaries",
    teamSub: "The driving forces behind CineZate and FICIAI 2026.",
    team1Role: "Founder of CineZate & FICIAI",
    team2Role: "High Representative of CineZate, Head of Partnerships, & Advisory Board Member",
    team3Role: "Tech Lead / Digital Systems Specialist",
    footerCopy: "© 2026 FICIAI Event. All rights reserved.",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    contact: "Contact Us"
  },
  fr: {
    nav: { about: "À propos", speakers: "Intervenants", agenda: "Programme" },
    register: "Manifester son intérêt",
    date: "6-8 Novembre, 2026",
    location: "Ouarzazate, Maroc",
    heroTitle1: "L'Événement Incontournable",
    heroTitle2: "pour les Créateurs et Innovateurs.",
    heroDesc: "Rejoignez les leaders de l'industrie, designers et développeurs au FICIAI 2026. Découvrez des outils de pointe, connectez-vous avec des équipes front-end et explorez les stratégies qui façonnent la nouvelle génération du web.",
    getTickets: "Obtenir des Billets",
    exploreAgenda: "Explorer le Programme",
    timeUntil: "Temps Restant",
    upcoming: "À venir",
    eventInProgress: "ÉVÉNEMENT EN COURS",
    days: "Jours", hours: "Heures", minutes: "Minutes", seconds: "Secondes",
    progress: "Progression avant lancement",
    backedBy: "Soutenu par les leaders de l'industrie",
    exploreTitle: "Découvrez l'Expérience",
    exploreSub: "Plongez dans des parcours dédiés, conçus pour repousser les limites de la création numérique moderne et de l'intelligence artificielle.",
    track1Title: "Architecture",
    track1Sub: "Découvrez des solutions évolutives pour les applications web de nouvelle génération et les plateformes décentralisées.",
    track1Btn: "Voir le Parcours",
    track2Title: "Réseautage Mondial",
    track2Sub: "Connectez-vous avec des leaders de l'industrie, des designers et des développeurs de haut niveau du monde entier.",
    track2Btn: "Voir les Intervenants",
    track3Title: "Outils d'IA",
    track3Sub: "Profitez d'une expérience pratique avec les derniers frameworks agentiques et les outils de conception générative.",
    track3Btn: "Voir les Ateliers",
    teamTitle: "Rencontrez les Visionnaires",
    teamSub: "La force motrice derrière CineZate et FICIAI 2026.",
    team1Role: "Fondateur de CineZate & FICIAI",
    team2Role: "Haut Représentant de l'Association CineZate, Chargé des Partenariats, Membre du Conseil d'Orientation",
    team3Role: "Tech Lead / Spécialiste des Systèmes Numériques",
    footerCopy: "© 2026 Événement FICIAI. Tous droits réservés.",
    privacy: "Politique de Confidentialité",
    terms: "Conditions d'Utilisation",
    contact: "Nous Contacter"
  }
};

export default function Home() {
  const [lang, setLang] = useState('en');
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
    const savedLang = localStorage.getItem('cinezate-lang');
    if (savedLang === 'fr' || savedLang === 'en') {
      setLang(savedLang);
    }
  }, []);

  const handleLangToggle = () => {
    const newLang = lang === 'en' ? 'fr' : 'en';
    setLang(newLang);
    localStorage.setItem('cinezate-lang', newLang);
  };

  const t = translations[lang];

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
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
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
        <div style={{ position: 'relative', width: '100%', maxWidth: '1400px', height: '100%' }}>
          {/* Outer bounds only, preventing intersections with centered text */}
          <div className="divider-v" style={{ left: '0' }} />
          <div className="divider-v" style={{ right: '0' }} />
          
          {/* Subtle data pulses */}
          <div className="string-pulse" style={{ left: '0', animationDelay: '0s' }} />
          <div className="string-pulse" style={{ right: '0', animationDelay: '3s' }} />
        </div>
      </div>

      <main className="hero relative z-10">
        <header className="hero-nav relative" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '32px' }}>
          <div className="logo" style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/assets/logo/CinezateLogo.png" alt="FICIAI 2026 Logo" style={{ height: '40px', width: 'auto', objectFit: 'contain' }} />
          </div>
          <nav className="nav-links">
            <a href="#">{t.nav.about}</a>
            <a href="#">{t.nav.speakers}</a>
            <a href="#">{t.nav.agenda}</a>
          </nav>
          
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <button 
              onClick={handleLangToggle}
              className="lang-toggle"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '8px' }}>
                <circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              {lang === 'en' ? 'Français' : 'English'}
            </button>
            <button className="btn btn-outline">{t.register}</button>
          </div>
        </header>

        <div className="hero-content relative" style={{ padding: '0 32px', paddingTop: '64px' }}>
          <div className="content-wrapper">
            <div className="badge-reveal" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
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
              <button className="btn btn-primary">{t.getTickets}</button>
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
                  {t.upcoming}
                </div>
              </div>

              <div className="countdown-grid" id="countdown">
                {isEventStarted ? (
                  <div className="time-value" style={{ gridColumn: "1 / -1", textAlign: "center", fontSize: '24px' }}>
                    {t.eventInProgress}
                  </div>
                ) : (
                  <>
                    <div className="time-block">
                      <span className="time-value">{timeLeft.days}</span>
                      <span className="time-label">{t.days}</span>
                    </div>
                    <div className="time-divider">:</div>
                    <div className="time-block">
                      <span className="time-value">{timeLeft.hours}</span>
                      <span className="time-label">{t.hours}</span>
                    </div>
                    <div className="time-divider">:</div>
                    <div className="time-block">
                      <span className="time-value">{timeLeft.minutes}</span>
                      <span className="time-label">{t.minutes}</span>
                    </div>
                    <div className="time-divider">:</div>
                    <div className="time-block">
                      <span className="time-value">{timeLeft.seconds}</span>
                      <span className="time-label">{t.seconds}</span>
                    </div>
                  </>
                )}
              </div>

              <div className="card-footer">
                <div className="progress-container">
                  <div
                    className="progress-bar"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <div className="progress-text">{t.progress}</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Full width dividing string */}
        <div className="divider-h" style={{ bottom: '0' }}></div>
      </main>

      <section className="partners-section relative z-10">
        <p className="mono-title text-center" style={{ marginBottom: '24px' }}>{t.backedBy}</p>
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
            
            {/* Duplicated for smooth scrolling */}
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
        <div className="divider-h" style={{ bottom: '0' }}></div>
      </section>

      <section className="features-section relative z-10">
        <div className="section-header relative">
          <h2 className="section-title">{t.exploreTitle}</h2>
          <p className="section-subtitle">{t.exploreSub}</p>
        </div>
        
        <div className="features-grid relative mt-16" style={{ padding: '0 32px' }}>
          <div className="feature-card relative z-10">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
            <h3 className="feature-title">{t.track1Title}</h3>
            <p className="feature-subtitle">{t.track1Sub}</p>
            <button className="btn btn-outline feature-btn">{t.track1Btn}</button>
          </div>

          <div className="feature-card relative z-10">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            </div>
            <h3 className="feature-title">{t.track2Title}</h3>
            <p className="feature-subtitle">{t.track2Sub}</p>
            <button className="btn btn-outline feature-btn">{t.track2Btn}</button>
          </div>

          <div className="feature-card relative z-10">
            <div className="feature-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
            </div>
            <h3 className="feature-title">{t.track3Title}</h3>
            <p className="feature-subtitle">{t.track3Sub}</p>
            <button className="btn btn-outline feature-btn">{t.track3Btn}</button>
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="team-section relative z-10" style={{ padding: '64px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="section-header relative" style={{ marginBottom: '48px' }}>
          <h2 className="section-title text-center">{t.teamTitle}</h2>
          <p className="section-subtitle text-center">{t.teamSub}</p>
        </div>
        
        <div className="team-grid relative" style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap' }}>
          <div className="divider-h absolute" style={{ top: '50%', left: '0', right: '0', zIndex: 0 }}></div>
          
          <div className="feature-card relative z-10" style={{ padding: '40px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '350px', background: 'rgba(22, 22, 24, 0.7)' }}>
            <img 
              src="/assets/team/abdouPic.png" 
              alt="Abderafia Souhali" 
              style={{ width: '140px', height: '140px', borderRadius: '50%', objectFit: 'cover', marginBottom: '24px', border: '2px solid rgba(255,255,255,0.1)' }} 
            />
            <h3 className="feature-title" style={{ fontSize: '22px', marginBottom: '4px' }}>Abderafia Souhali</h3>
            <p className="feature-subtitle" style={{ color: 'var(--text-secondary)', marginBottom: '24px', textAlign: 'center' }}>{t.team1Role}</p>
            
            <a href="#" target="_blank" rel="noopener noreferrer" className="social-link" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)', border: '1px solid rgba(255,255,255,0.1)', transition: 'background 0.3s ease' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </div>

          <div className="feature-card relative z-10" style={{ padding: '40px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '350px', background: 'rgba(22, 22, 24, 0.7)' }}>
            <img 
              src="/assets/team/najib.png" 
              alt="Najib Bredaa" 
              style={{ width: '140px', height: '140px', borderRadius: '50%', objectFit: 'cover', marginBottom: '24px', border: '2px solid rgba(255,255,255,0.1)' }} 
            />
            <h3 className="feature-title" style={{ fontSize: '22px', marginBottom: '4px' }}>Najib Bredaa</h3>
            <p className="feature-subtitle" style={{ color: 'var(--text-secondary)', marginBottom: '24px', textAlign: 'center', fontSize: '14px', lineHeight: '1.4' }}>{t.team2Role}</p>
            
            <a href="#" target="_blank" rel="noopener noreferrer" className="social-link" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)', border: '1px solid rgba(255,255,255,0.1)', transition: 'background 0.3s ease' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </div>

          <div className="feature-card relative z-10" style={{ padding: '40px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '350px', background: 'rgba(22, 22, 24, 0.7)' }}>
            <img 
              src="/assets/team/Yassine.png" 
              alt="Yassine Sadik" 
              style={{ width: '140px', height: '140px', borderRadius: '50%', objectFit: 'cover', marginBottom: '24px', border: '2px solid rgba(255,255,255,0.1)' }} 
            />
            <h3 className="feature-title" style={{ fontSize: '22px', marginBottom: '4px' }}>Yassine Sadik</h3>
            <p className="feature-subtitle" style={{ color: 'var(--text-secondary)', marginBottom: '24px', textAlign: 'center', fontSize: '14px', lineHeight: '1.4' }}>{t.team3Role}</p>
            
            <a href="#" target="_blank" rel="noopener noreferrer" className="social-link" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)', border: '1px solid rgba(255,255,255,0.1)', transition: 'background 0.3s ease' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
          </div>
        </div>
      </section>

      <footer className="footer-section relative z-10" style={{ padding: '64px 0', textAlign: 'center' }}>
        <div className="divider-h" style={{ top: '0' }}></div>
        <div className="logo" style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
            <img src="/assets/logo/CinezateLogo.png" alt="FICIAI 2026 Logo" style={{ height: '48px', width: 'auto', objectFit: 'contain' }} />
        </div>
        <p className="mono-title">{t.footerCopy}</p>
        <div className="footer-links" style={{ display: 'flex', gap: '32px', justifyContent: 'center', marginTop: '24px' }}>
          <a href="#" className="label-badge" style={{ background: 'transparent', border: 'none', padding: 0 }}>{t.privacy}</a>
          <a href="#" className="label-badge" style={{ background: 'transparent', border: 'none', padding: 0 }}>{t.terms}</a>
          <a href="#" className="label-badge" style={{ background: 'transparent', border: 'none', padding: 0 }}>{t.contact}</a>
        </div>
      </footer>
    </>
  );
}
