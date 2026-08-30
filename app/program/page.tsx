"use client";

import React, { useState } from "react";
import Link from "next/link";
import FadeIn from "../../components/FadeIn";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useLanguage } from "../../components/LanguageProvider";

const SITE_ICONS = [
  <svg key="1" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"/><path d="M5 21V7l8-4v18"/><path d="M19 21V11l-6-4"/><path d="M9 9v1"/><path d="M9 13v1"/><path d="M9 17v1"/></svg>,
  <svg key="2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg>,
  <svg key="3" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2"/></svg>,
  <svg key="4" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>,
  <svg key="5" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
];

export default function ProgramPage() {
  const { t } = useLanguage();
  const pp = t.programPage;
  const bp = t.badgePage;
  const [activeTab, setActiveTab] = useState<string>("day1");

  return (
    <div style={{ paddingBottom: "60px" }}>
      <Breadcrumbs currentPage={pp.heroTitle} />

      {/* 1. HERO SECTION */}
      <section className="hero relative z-10" style={{ minHeight: "auto", padding: "28px 16px 0 16px", justifyContent: "center" }}>
        <FadeIn>
          <div style={{ maxWidth: "880px", margin: "0 auto", textAlign: "center", paddingTop: "12px" }}>
            <div className="label-badge" style={{ marginBottom: "14px" }}>
              <span>{pp.heroBadge}</span>
            </div>

            <h1 className="display-title" style={{ fontSize: "clamp(24px, 3.4vw, 38px)", marginBottom: "14px", lineHeight: 1.15 }}>
              {pp.heroTitle}
            </h1>

            <p className="body-text" style={{ maxWidth: "680px", margin: "0 auto 24px", fontSize: "13.5px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              {pp.heroSubtitle}
            </p>
          </div>
        </FadeIn>
      </section>

      {/* 2. DAY SELECTOR TABS */}
      <section className="relative z-10" style={{ maxWidth: "1080px", margin: "24px auto 0", padding: "0 16px" }}>
        <FadeIn delay={0.1}>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", 
            gap: "12px", 
            marginBottom: "36px" 
          }}>
            {pp.daysTab.map((day) => {
              const isActive = activeTab === day.id;
              return (
                <button
                  key={day.id}
                  type="button"
                  onClick={() => setActiveTab(day.id)}
                  style={{
                    padding: "16px 20px",
                    borderRadius: "12px",
                    border: isActive ? "2px solid #B8432F" : "1px solid var(--border)",
                    background: isActive ? "#FFF8F6" : "var(--surface)",
                    boxShadow: isActive ? "0 8px 20px rgba(184, 67, 47, 0.15)" : "0 2px 6px rgba(0,0,0,0.02)",
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ 
                      fontSize: "10px", 
                      fontFamily: "var(--font-jetbrains)", 
                      textTransform: "uppercase", 
                      letterSpacing: "0.8px",
                      color: isActive ? "#B8432F" : "var(--text-secondary)",
                      fontWeight: 700 
                    }}>
                      {day.badge}
                    </span>
                    {isActive && (
                      <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#B8432F" }}></span>
                    )}
                  </div>
                  <strong style={{ fontSize: "15px", color: isActive ? "#B8432F" : "var(--text-primary)", marginTop: "2px" }}>
                    {day.title}
                  </strong>
                  <span style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: 1.35 }}>
                    {day.subtitle}
                  </span>
                </button>
              );
            })}
          </div>
        </FadeIn>

        {/* 3. TAB 1: DAY 1 — PATRIMOINE & STUDIOS IMMERSION */}
        {activeTab === "day1" && bp.vipHeritageProgram && (
          <div>
            {/* Key Facts Metric Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px", marginBottom: "28px" }}>
              <FadeIn delay={0.1}>
                <div className="feature-card" style={{ padding: "20px", display: "flex", alignItems: "center", gap: "14px", minHeight: "100%" }}>
                  <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "#FDECE7", display: "flex", alignItems: "center", justifyContent: "center", color: "#B8432F", flexShrink: 0 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  </div>
                  <div>
                    <span className="mono-title" style={{ fontSize: "9.5px", textTransform: "uppercase", letterSpacing: "0.8px", color: "var(--text-secondary)" }}>
                      {bp.vipHeritageProgram.dateLabel}
                    </span>
                    <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)", marginTop: "2px" }}>
                      {bp.vipHeritageProgram.dateVal}
                    </div>
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="feature-card" style={{ padding: "20px", display: "flex", alignItems: "center", gap: "14px", border: "1px solid rgba(184, 67, 47, 0.25)", background: "#FFF8F6", minHeight: "100%" }}>
                  <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "#B8432F", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFFFFF", flexShrink: 0 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="12" y1="1" x2="12" y2="23"/>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    </svg>
                  </div>
                  <div>
                    <span className="mono-title" style={{ fontSize: "9.5px", textTransform: "uppercase", letterSpacing: "0.8px", color: "#B8432F", fontWeight: 700 }}>
                      {bp.vipHeritageProgram.priceLabel}
                    </span>
                    <div className="mono-title" style={{ fontSize: "17px", fontWeight: 800, color: "#B8432F", marginTop: "2px" }}>
                      {bp.vipHeritageProgram.priceVal}
                    </div>
                    {bp.vipHeritageProgram.priceNote && (
                      <span style={{ display: "block", fontSize: "10.5px", color: "#4B5563", marginTop: "2px", lineHeight: 1.3 }}>
                        {bp.vipHeritageProgram.priceNote}
                      </span>
                    )}
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div className="feature-card" style={{ padding: "20px", display: "flex", alignItems: "center", gap: "14px", minHeight: "100%" }}>
                  <div style={{ width: "42px", height: "42px", borderRadius: "10px", background: "#FDECE7", display: "flex", alignItems: "center", justifyContent: "center", color: "#B8432F", flexShrink: 0 }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div>
                    <span className="mono-title" style={{ fontSize: "9.5px", textTransform: "uppercase", letterSpacing: "0.8px", color: "var(--text-secondary)" }}>
                      {bp.vipHeritageProgram.locationLabel}
                    </span>
                    <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--text-primary)", marginTop: "2px" }}>
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
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  padding: "14px 20px",
                  background: "#FFF8F6",
                  border: "1px solid rgba(184, 67, 47, 0.25)",
                  borderRadius: "12px",
                  marginBottom: "28px"
                }}>
                  <div style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    background: "#B8432F",
                    color: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
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
                    <span className="mono-title" style={{ fontSize: "9.5px", textTransform: "uppercase", letterSpacing: "0.8px", color: "#B8432F", fontWeight: 700, display: "block" }}>
                      Logistique VIP • Transport Dédié
                    </span>
                    <span style={{ fontSize: "13px", color: "#1F2937", fontWeight: 600, lineHeight: 1.4 }}>
                      {bp.vipHeritageProgram.shuttleNote}
                    </span>
                  </div>
                </div>
              </FadeIn>
            )}

            {/* 5 Visited Sites Grid */}
            <FadeIn delay={0.3}>
              <div style={{ marginBottom: "32px" }}>
                <h3 className="section-title" style={{ fontSize: "18px", marginBottom: "16px" }}>
                  {bp.vipHeritageProgram.sitesTitle}
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: "14px" }}>
                  {bp.vipHeritageProgram.sites.map((site, i) => (
                    <div 
                      key={i} 
                      className="feature-card" 
                      style={{ 
                        padding: "18px 16px", 
                        border: "1px solid var(--border)", 
                        background: "var(--surface)",
                        display: "flex", 
                        flexDirection: "column"
                      }}
                    >
                      <div style={{ 
                        width: "36px", 
                        height: "36px", 
                        borderRadius: "8px", 
                        background: "#FFF8F6", 
                        border: "1px solid rgba(184, 67, 47, 0.2)", 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center", 
                        color: "#B8432F", 
                        marginBottom: "10px" 
                      }}>
                        {SITE_ICONS[i % SITE_ICONS.length]}
                      </div>
                      <div style={{ fontSize: "13.5px", fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>
                        {site.name}
                      </div>
                      <p style={{ fontSize: "11.5px", color: "var(--text-secondary)", margin: 0, lineHeight: 1.4 }}>
                        {site.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Inclusions & Recommendations Dual Box */}
            <FadeIn delay={0.35}>
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
                gap: "16px", 
                marginBottom: "32px" 
              }}>
                <div className="feature-card" style={{ padding: "20px", background: "#F8FAF9", border: "1px solid #D1FAE5" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                    <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#ECFDF5", color: "#059669", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <strong style={{ fontSize: "13.5px", color: "#065F46" }}>{bp.vipHeritageProgram.inclusionsLabel}</strong>
                  </div>
                  <p style={{ fontSize: "12px", color: "#374151", margin: 0, lineHeight: 1.5, paddingLeft: "38px" }}>
                    {bp.vipHeritageProgram.inclusionsText}
                  </p>
                </div>

                <div className="feature-card" style={{ padding: "20px", background: "#FFFDF9", border: "1px solid #FEF3C7" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                    <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "#FEF3C7", color: "#D97706", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="12"/>
                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                    </div>
                    <strong style={{ fontSize: "13.5px", color: "#92400E" }}>{bp.vipHeritageProgram.bringLabel}</strong>
                  </div>
                  <p style={{ fontSize: "12px", color: "#374151", margin: 0, lineHeight: 1.5, paddingLeft: "38px" }}>
                    {bp.vipHeritageProgram.bringText}
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Timeline */}
            <FadeIn delay={0.4}>
              <div className="feature-card" style={{ padding: "28px 24px", background: "rgba(255, 255, 255, 0.95)" }}>
                <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "14px", marginBottom: "22px" }}>
                  <h3 className="feature-title" style={{ fontSize: "17px", fontWeight: 700, margin: 0 }}>
                    {bp.vipHeritageProgram.scheduleTitle}
                  </h3>
                  <p style={{ fontSize: "12px", color: "var(--text-secondary)", margin: "4px 0 0" }}>
                    {bp.vipHeritageProgram.scheduleSubtitle}
                  </p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "0", position: "relative" }}>
                  {bp.vipHeritageProgram.schedule.map((item, idx) => (
                    <div 
                      key={idx} 
                      style={{ 
                        display: "grid", 
                        gridTemplateColumns: "75px 1fr", 
                        gap: "16px", 
                        position: "relative",
                        paddingBottom: idx === bp.vipHeritageProgram!.schedule.length - 1 ? "0" : "22px"
                      }}
                    >
                      {idx !== bp.vipHeritageProgram!.schedule.length - 1 && (
                        <div style={{
                          position: "absolute",
                          left: "35px",
                          top: "24px",
                          bottom: "0",
                          width: "2px",
                          background: "linear-gradient(to bottom, #B8432F 0%, rgba(184, 67, 47, 0.15) 100%)",
                          zIndex: 0
                        }} />
                      )}

                      <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", zIndex: 1 }}>
                        <span style={{ 
                          width: "9px", 
                          height: "9px", 
                          borderRadius: "50%", 
                          background: "#B8432F", 
                          marginTop: "5px", 
                          flexShrink: 0,
                          boxShadow: "0 0 0 3px #FDECE7"
                        }} />
                        <span style={{ 
                          fontFamily: "var(--font-jetbrains)", 
                          fontSize: "11px", 
                          fontWeight: 700, 
                          color: "#B8432F", 
                          whiteSpace: "nowrap" 
                        }}>
                          {item.time}
                        </span>
                      </div>

                      <div style={{ paddingLeft: "4px" }}>
                        <h4 style={{ 
                          fontSize: "14px", 
                          fontWeight: 700, 
                          color: "var(--text-primary)", 
                          margin: "0 0 4px 0",
                          lineHeight: 1.3
                        }}>
                          {item.title}
                        </h4>
                        <p style={{ 
                          fontSize: "12px", 
                          color: "var(--text-secondary)", 
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
                    marginTop: "20px",
                    padding: "12px 16px",
                    background: "#FFF8F6",
                    borderRadius: "8px",
                    border: "1px solid rgba(184, 67, 47, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px"
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B8432F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                      <rect x="1" y="3" width="15" height="13"/>
                      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                      <circle cx="5.5" cy="18.5" r="2.5"/>
                      <circle cx="18.5" cy="18.5" r="2.5"/>
                    </svg>
                    <span style={{ fontSize: "12px", color: "#374151", fontWeight: 600 }}>
                      {bp.vipHeritageProgram.shuttleNote}
                    </span>
                  </div>
                )}
              </div>
            </FadeIn>
          </div>
        )}

        {/* 4. TAB 2: DAY 2 — CONFERENCES & MASTERCLASSES */}
        {activeTab === "day2" && (
          <FadeIn>
            <div className="feature-card" style={{ padding: "28px 24px", background: "rgba(255, 255, 255, 0.95)" }}>
              <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "14px", marginBottom: "22px" }}>
                <h3 className="feature-title" style={{ fontSize: "18px", fontWeight: 700, margin: 0 }}>
                  Jour 2 — Conférences Internationales & IA Générative
                </h3>
                <p style={{ fontSize: "12.5px", color: "var(--text-secondary)", margin: "4px 0 0" }}>
                  Palais des Congrès de Ouarzazate • 700 places & 3 salles simultanées
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0", position: "relative" }}>
                {pp.day2Schedule.map((item, idx) => (
                  <div 
                    key={idx} 
                    style={{ 
                      display: "grid", 
                      gridTemplateColumns: "75px 1fr", 
                      gap: "16px", 
                      position: "relative",
                      paddingBottom: idx === pp.day2Schedule.length - 1 ? "0" : "24px"
                    }}
                  >
                    {idx !== pp.day2Schedule.length - 1 && (
                      <div style={{
                        position: "absolute",
                        left: "35px",
                        top: "24px",
                        bottom: "0",
                        width: "2px",
                        background: "linear-gradient(to bottom, #B8432F 0%, rgba(184, 67, 47, 0.15) 100%)",
                        zIndex: 0
                      }} />
                    )}

                    <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", zIndex: 1 }}>
                      <span style={{ 
                        width: "9px", 
                        height: "9px", 
                        borderRadius: "50%", 
                        background: "#B8432F", 
                        marginTop: "5px", 
                        flexShrink: 0,
                        boxShadow: "0 0 0 3px #FDECE7"
                      }} />
                      <span style={{ 
                        fontFamily: "var(--font-jetbrains)", 
                        fontSize: "11px", 
                        fontWeight: 700, 
                        color: "#B8432F", 
                        whiteSpace: "nowrap" 
                      }}>
                        {item.time}
                      </span>
                    </div>

                    <div style={{ paddingLeft: "4px" }}>
                      <h4 style={{ 
                        fontSize: "14.5px", 
                        fontWeight: 700, 
                        color: "var(--text-primary)", 
                        margin: "0 0 4px 0",
                        lineHeight: 1.3
                      }}>
                        {item.title}
                      </h4>
                      <p style={{ 
                        fontSize: "12.5px", 
                        color: "var(--text-secondary)", 
                        margin: 0, 
                        lineHeight: 1.55 
                      }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        )}

        {/* 5. TAB 3: DAY 3 — CINEMA VILLAGE & CLOSING GALA */}
        {activeTab === "day3" && (
          <FadeIn>
            <div className="feature-card" style={{ padding: "28px 24px", background: "rgba(255, 255, 255, 0.95)" }}>
              <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "14px", marginBottom: "22px" }}>
                <h3 className="feature-title" style={{ fontSize: "18px", fontWeight: 700, margin: 0 }}>
                  Jour 3 — Village du Cinéma, Pitch Sessions & Soirée de Clôture
                </h3>
                <p style={{ fontSize: "12.5px", color: "var(--text-secondary)", margin: "4px 0 0" }}>
                  Grand Pavillon 2 000 m² & Espace Prestige
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0", position: "relative" }}>
                {pp.day3Schedule.map((item, idx) => (
                  <div 
                    key={idx} 
                    style={{ 
                      display: "grid", 
                      gridTemplateColumns: "75px 1fr", 
                      gap: "16px", 
                      position: "relative",
                      paddingBottom: idx === pp.day3Schedule.length - 1 ? "0" : "24px"
                    }}
                  >
                    {idx !== pp.day3Schedule.length - 1 && (
                      <div style={{
                        position: "absolute",
                        left: "35px",
                        top: "24px",
                        bottom: "0",
                        width: "2px",
                        background: "linear-gradient(to bottom, #B8432F 0%, rgba(184, 67, 47, 0.15) 100%)",
                        zIndex: 0
                      }} />
                    )}

                    <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", zIndex: 1 }}>
                      <span style={{ 
                        width: "9px", 
                        height: "9px", 
                        borderRadius: "50%", 
                        background: "#B8432F", 
                        marginTop: "5px", 
                        flexShrink: 0,
                        boxShadow: "0 0 0 3px #FDECE7"
                      }} />
                      <span style={{ 
                        fontFamily: "var(--font-jetbrains)", 
                        fontSize: "11px", 
                        fontWeight: 700, 
                        color: "#B8432F", 
                        whiteSpace: "nowrap" 
                      }}>
                        {item.time}
                      </span>
                    </div>

                    <div style={{ paddingLeft: "4px" }}>
                      <h4 style={{ 
                        fontSize: "14.5px", 
                        fontWeight: 700, 
                        color: "var(--text-primary)", 
                        margin: "0 0 4px 0",
                        lineHeight: 1.3
                      }}>
                        {item.title}
                      </h4>
                      <p style={{ 
                        fontSize: "12.5px", 
                        color: "var(--text-secondary)", 
                        margin: 0, 
                        lineHeight: 1.55 
                      }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        )}

        {/* Bottom CTA Strip */}
        <FadeIn delay={0.5}>
          <div style={{ 
            marginTop: "48px", 
            padding: "36px 24px", 
            borderRadius: "16px", 
            background: "linear-gradient(135deg, #1A1A1A 0%, #111827 100%)", 
            color: "#FFFFFF",
            textAlign: "center",
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
          }}>
            <h3 style={{ fontSize: "clamp(20px, 2.6vw, 26px)", fontWeight: 700, margin: "0 0 8px 0" }}>
              {pp.ctaTitle}
            </h3>
            <p style={{ color: "#9CA3AF", fontSize: "13.5px", maxWidth: "560px", margin: "0 auto 20px" }}>
              {pp.ctaSub}
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/badge" className="btn btn-primary" style={{ padding: "12px 24px", fontSize: "13px" }}>
                {pp.ctaBtn}
              </Link>
              <Link href="/stand" className="btn btn-outline" style={{ padding: "12px 24px", fontSize: "13px", color: "#FFFFFF", borderColor: "rgba(255,255,255,0.3)" }}>
                {t.track2Btn || "Réserver un Stand"}
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
