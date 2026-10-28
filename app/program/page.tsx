"use client";

import React, { useState } from "react";
import Link from "next/link";
import FadeIn from "../../components/FadeIn";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useLanguage } from "../../components/LanguageProvider";

export default function ProgramPage() {
  const { t } = useLanguage();
  const pp = t.programPage;
  const [activeTab, setActiveTab] = useState<string>("day1");

  const currentSchedule = activeTab === "day2" ? pp.day2Schedule : pp.day1Schedule;
  const currentDay = pp.daysTab.find((d) => d.id === activeTab) || pp.daysTab[0];

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

      {/* 2. DAY & ACTIVITIES SELECTOR TABS */}
      <section className="relative z-10" style={{ maxWidth: "1080px", margin: "24px auto 0", padding: "0 16px" }}>
        <FadeIn delay={0.1}>
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", 
            gap: "14px", 
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
                    padding: "18px 22px",
                    borderRadius: "14px",
                    border: isActive ? "2px solid #B8432F" : "1px solid var(--border)",
                    background: isActive ? "#FFF8F6" : "var(--surface)",
                    boxShadow: isActive ? "0 8px 24px rgba(184, 67, 47, 0.15)" : "0 2px 6px rgba(0,0,0,0.02)",
                    textAlign: "left",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ 
                      fontSize: "10.5px", 
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
                  <strong style={{ fontSize: "16px", color: isActive ? "#B8432F" : "var(--text-primary)", marginTop: "2px" }}>
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

        {/* 3. CONTENT AREA */}
        <FadeIn key={activeTab} delay={0.15}>
          <div className="feature-card" style={{ padding: "32px 28px", background: "rgba(255, 255, 255, 0.95)" }}>
            <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "16px", marginBottom: "26px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "8px" }}>
                <h2 className="feature-title" style={{ fontSize: "20px", fontWeight: 700, margin: 0, color: "var(--text-primary)" }}>
                  {currentDay.title}
                </h2>
                <span className="mono-title" style={{ 
                  fontSize: "11px", 
                  color: "#B8432F", 
                  fontWeight: 700, 
                  textTransform: "uppercase", 
                  letterSpacing: "0.8px",
                  background: "#FDECE7",
                  padding: "4px 10px",
                  borderRadius: "6px"
                }}>
                  {currentDay.subtitle}
                </span>
              </div>
              <p style={{ fontSize: "12.5px", color: "var(--text-secondary)", margin: "6px 0 0" }}>
                {activeTab === "parallel" 
                  ? "Palais des Congrès & Espaces Partenaires • Ouarzazate" 
                  : "Palais des Congrès de Ouarzazate • FICIAI 2027"}
              </p>
            </div>

            {activeTab === "parallel" ? (
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
                gap: "16px" 
              }}>
                {pp.parallelActivities.map((act, idx) => (
                  <div 
                    key={idx} 
                    style={{ 
                      padding: "20px 22px", 
                      borderRadius: "12px", 
                      border: "1px solid var(--border)", 
                      background: "var(--surface)",
                      display: "flex", 
                      flexDirection: "column", 
                      gap: "10px",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ 
                        fontSize: "10.5px", 
                        fontFamily: "var(--font-jetbrains)", 
                        fontWeight: 700, 
                        textTransform: "uppercase", 
                        letterSpacing: "0.8px", 
                        color: "#B8432F", 
                        background: "#FFF8F6", 
                        border: "1px solid rgba(184, 67, 47, 0.25)", 
                        padding: "3px 9px", 
                        borderRadius: "6px" 
                      }}>
                        {act.badge}
                      </span>
                    </div>

                    <h3 style={{ 
                      fontSize: "14.5px", 
                      fontWeight: 700, 
                      color: "var(--text-primary)", 
                      margin: 0, 
                      lineHeight: 1.4 
                    }}>
                      {act.title}
                    </h3>

                    {act.desc && (
                      <p style={{ 
                        fontSize: "12.5px", 
                        color: "var(--text-secondary)", 
                        margin: 0, 
                        lineHeight: 1.5 
                      }}>
                        {act.desc}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0", position: "relative" }}>
                {currentSchedule.map((item, idx) => (
                  <div 
                    key={idx} 
                    style={{ 
                      display: "grid", 
                      gridTemplateColumns: "115px 1fr", 
                      gap: "16px", 
                      position: "relative",
                      paddingBottom: idx === currentSchedule.length - 1 ? "0" : "24px"
                    }}
                  >
                    {/* Vertical connector line */}
                    {idx !== currentSchedule.length - 1 && (
                      <div style={{
                        position: "absolute",
                        left: "4px",
                        top: "20px",
                        bottom: "0",
                        width: "2px",
                        background: "linear-gradient(to bottom, #B8432F 0%, rgba(184, 67, 47, 0.15) 100%)",
                        zIndex: 0
                      }} />
                    )}

                    {/* Time + Dot */}
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", zIndex: 1 }}>
                      <span style={{ 
                        width: "10px", 
                        height: "10px", 
                        borderRadius: "50%", 
                        background: "#B8432F", 
                        marginTop: "4px", 
                        flexShrink: 0,
                        boxShadow: "0 0 0 3px #FDECE7"
                      }} />
                      <span style={{ 
                        fontFamily: "var(--font-jetbrains)", 
                        fontSize: "11.5px", 
                        fontWeight: 700, 
                        color: "#B8432F", 
                        whiteSpace: "nowrap" 
                      }}>
                        {item.time}
                      </span>
                    </div>

                    {/* Title */}
                    <div style={{ paddingLeft: "4px" }}>
                      <h3 style={{ 
                        fontSize: "15px", 
                        fontWeight: 700, 
                        color: "var(--text-primary)", 
                        margin: 0,
                        lineHeight: 1.35
                      }}>
                        {item.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </FadeIn>

        {/* 4. BOTTOM CTA STRIP */}
        <FadeIn delay={0.3}>
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
