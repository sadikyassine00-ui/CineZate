"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import FadeIn from "../../components/FadeIn";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useLanguage } from "../../components/LanguageProvider";

interface Speaker {
  id: string;
  name: string;
  role: string;
  organization: string;
  category: "cinema" | "ai_tech" | "institutions" | "media" | "finance";
  isModerator?: boolean;
  isKeynote?: boolean;
  country?: string;
  highlight?: boolean;
}

const SPEAKERS_LIST: Speaker[] = [
  { id: "1", name: "Nisrine Aouzdagh", role: "Journaliste Senior, Rédactrice / Présentatrice", organization: "SNRT (Al Oula TV)", category: "media", isModerator: true },
  { id: "2", name: "Aurélia Khazan", role: "Réalisatrice", organization: "FICIAI", category: "cinema" },
  { id: "3", name: "Mariya Spartalis", role: "Fondatrice & CEO / Intervenante UHNWI", organization: "Spartalis Capital (Zurich)", category: "finance", country: "Suisse", isKeynote: true },
  { id: "4", name: "Melinda Mrini", role: "Journaliste, Présentatrice (Les Matins Luxe)", organization: "Luxe Radio", category: "media", isModerator: true },
  { id: "5", name: "Dr Rohit Gupta", role: "Global Chairman", organization: "Eurasia Afro Chamber of Commerce", category: "institutions", country: "Inde" },
  { id: "6", name: "Najib Bredaa", role: "Ambassadeur, Directeur des Relations Diplomatiques", organization: "Chambre Eurasie Afrique", category: "institutions" },
  { id: "7", name: "C. V. Rao", role: "CEO", organization: "Annapurna Studios", category: "cinema", country: "Inde", highlight: true },
  { id: "8", name: "Rishabh Chopra", role: "CEO / VP – Production", organization: "Yash Raj Films", category: "cinema", country: "Inde", highlight: true },
  { id: "9", name: "Jake Seal", role: "Fondateur", organization: "ORWO Studios", category: "cinema", country: "International", highlight: true },
  { id: "10", name: "Aminou Akadiri", role: "CEO / Executive Director", organization: "FEWACCI", category: "institutions" },
  { id: "11", name: "Amb. Prof. Dr. Karim Errouaki", role: "Haut Diplomate UNACCC", organization: "UNACCC / GPEN", category: "institutions" },
  { id: "12", name: "Driss Drif", role: "Président", organization: "Club des Dirigeants (CDD)", category: "institutions" },
  { id: "13", name: "Fayçal Marzouqi", role: "Ambassadeur de Paix / Président ISS", organization: "Bridges of Africa / ISS", category: "institutions" },
  { id: "14", name: "Marielle Sander", role: "Représentante de l'UNFPA au Maroc", organization: "UNFPA (Nations Unies)", category: "institutions", highlight: true },
  { id: "15", name: "Saida Belouali", role: "Experte Internationale", organization: "UNESCO", category: "institutions", highlight: true },
  { id: "16", name: "Marco Landi", role: "Président, Institut EuropIA / Fondateur WAIFF Cannes (ex-COO Apple)", organization: "Institut EuropIA / WAIFF Cannes", category: "ai_tech", highlight: true },
  { id: "17", name: "Haïkel Drine", role: "CEO", organization: "Afrikanda", category: "ai_tech" },
  { id: "18", name: "Henri Poulain", role: "Auteur & Créateur", organization: "Addax", category: "media" },
  { id: "19", name: "Assem Alami (Laalami)", role: "Directeur Audiovisuel / Fondateur", organization: "UM6P / THE E.L Signature Media", category: "media" },
  { id: "20", name: "Éric Atlan", role: "Réalisateur & Producteur International", organization: "Artistic Finances / Phoenix Studio", category: "cinema", highlight: true },
  { id: "21", name: "Mini Sarma", role: "Présidente Mondiale / Fondatrice-Productrice", organization: "7 Media", category: "cinema", country: "Inde" },
  { id: "22", name: "Souha Abou Taha", role: "Fondatrice", organization: "Alcor", category: "finance" },
  { id: "23", name: "Tzipporah Mayala", role: "Présidente", organization: "L'Étoile de l'Afrique", category: "institutions" },
  { id: "24", name: "Lamia Allouli", role: "Présidente, Expert-Comptable", organization: "ILA Consulting (Paris)", category: "finance", country: "France" },
  { id: "25", name: "S. Ali Alaoui Mdaghri", role: "Président / Dirigeant-Fondateur", organization: "AMEDSON INTELLIGENCIA", category: "ai_tech" },
  { id: "26", name: "Vincent Yaldoo", role: "Réseau Mondial", organization: "Indiana University", category: "institutions", country: "USA" },
  { id: "27", name: "Nasser Kettani", role: "Managing Partner", organization: "Akkan Crowdfunding (ex-CTO Microsoft)", category: "finance" },
  { id: "28", name: "Aicha Bacha", role: "Secrétaire Générale", organization: "MMFLP", category: "institutions" },
  { id: "29", name: "Mouna Bennani", role: "Présidente Fondatrice", organization: "Association ASLI, France", category: "institutions", country: "France" },
  { id: "30", name: "Hanna Assouline", role: "Fondatrice", organization: "Guerrières de la Paix", category: "institutions" },
  { id: "31", name: "Sabah Chraibi", role: "Fondatrice", organization: "Espace Partners", category: "institutions" },
  { id: "32", name: "Hamid Bentahar", role: "Président", organization: "Fédération Nationale du Tourisme / Hub DD", category: "institutions", highlight: true },
  { id: "33", name: "Mohamed Boussa (Boussalla)", role: "General Manager / Fondateur", organization: "Dév. durable & ing. env. / Bee Sentinel", category: "institutions" },
  { id: "34", name: "Jaafar El Alamy", role: "CEO", organization: "Seiki", category: "ai_tech" },
  { id: "35", name: "Youness Seffar", role: "Président", organization: "Alliance Maroc-France", category: "institutions", country: "France" },
  { id: "36", name: "Mustapha Zaouini", role: "Fondateur", organization: "AI in Africa NPC", category: "ai_tech", highlight: true },
  { id: "37", name: "Othmane Benslimane", role: "Vice-Président IA", organization: "APEBI / Tython & TyBot", category: "ai_tech", highlight: true }
];

function getInitials(name: string): string {
  const parts = name.replace(/^(Dr|Amb\. Prof\. Dr\.|Dr\.)\s+/i, '').trim().split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export default function SpeakersPage() {
  const { lang, t } = useLanguage();
  const sp = t.speakersPage;

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const CATEGORIES = [
    { id: "all", label: lang === "fr" ? "Tous les Intervenants" : "All Speakers", count: SPEAKERS_LIST.length },
    { id: "cinema", label: lang === "fr" ? "Cinéma & Studios" : "Cinema & Studios", count: SPEAKERS_LIST.filter(s => s.category === "cinema").length },
    { id: "ai_tech", label: lang === "fr" ? "IA & Technologies" : "AI & Tech", count: SPEAKERS_LIST.filter(s => s.category === "ai_tech").length },
    { id: "institutions", label: lang === "fr" ? "Institutions & Diplomatie" : "Institutions & Diplomacy", count: SPEAKERS_LIST.filter(s => s.category === "institutions").length },
    { id: "media", label: lang === "fr" ? "Médias & Modération" : "Media & Moderation", count: SPEAKERS_LIST.filter(s => s.category === "media").length },
    { id: "finance", label: lang === "fr" ? "Finance & Investissement" : "Finance & Investment", count: SPEAKERS_LIST.filter(s => s.category === "finance").length }
  ];

  const filteredSpeakers = useMemo(() => {
    return SPEAKERS_LIST.filter((speaker) => {
      const matchesCat = selectedCategory === "all" || speaker.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        speaker.name.toLowerCase().includes(q) || 
        speaker.role.toLowerCase().includes(q) || 
        speaker.organization.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div style={{ paddingBottom: "60px" }}>
      <Breadcrumbs currentPage={sp.heroTitle} />

      {/* 1. HERO SECTION */}
      <section className="hero relative z-10" style={{ minHeight: "auto", padding: "28px 16px 0 16px", justifyContent: "center" }}>
        <FadeIn>
          <div style={{ maxWidth: "880px", margin: "0 auto", textAlign: "center", paddingTop: "12px" }}>
            <div className="label-badge" style={{ marginBottom: "14px" }}>
              <span>{sp.heroBadge}</span>
            </div>

            <h1 className="display-title" style={{ fontSize: "clamp(24px, 3.4vw, 38px)", marginBottom: "14px", lineHeight: 1.15 }}>
              {sp.heroTitle}
            </h1>

            <p className="body-text" style={{ maxWidth: "680px", margin: "0 auto 24px", fontSize: "13.5px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              {sp.heroSubtitle}
            </p>
          </div>
        </FadeIn>
      </section>

      {/* 2. GUEST OF HONOUR (INDIA) SPOTLIGHT BANNER */}
      <section className="relative z-10" style={{ maxWidth: "1140px", margin: "20px auto 0", padding: "0 16px" }}>
        <FadeIn delay={0.1}>
          <div style={{ 
            padding: "20px 24px", 
            borderRadius: "14px", 
            background: "#FFF8F6", 
            border: "1px solid rgba(184, 67, 47, 0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "14px",
            marginBottom: "32px",
            boxShadow: "0 2px 10px rgba(184, 67, 47, 0.06)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "24px" }}>🇮🇳</span>
              <div>
                <span className="mono-title" style={{ fontSize: "11px", color: "#B8432F", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px" }}>
                  {sp.guestHonourTitle}
                </span>
                <p style={{ fontSize: "12.5px", color: "#374151", margin: "2px 0 0", lineHeight: 1.4 }}>
                  {sp.guestHonourDesc}
                </p>
              </div>
            </div>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              <span className="mono-badge" style={{ background: "#FFFFFF", borderColor: "#F5C6BA", color: "#B8432F", fontSize: "10px", fontWeight: 600 }}>Annapurna Studios</span>
              <span className="mono-badge" style={{ background: "#FFFFFF", borderColor: "#F5C6BA", color: "#B8432F", fontSize: "10px", fontWeight: 600 }}>Yash Raj Films</span>
              <span className="mono-badge" style={{ background: "#FFFFFF", borderColor: "#F5C6BA", color: "#B8432F", fontSize: "10px", fontWeight: 600 }}>7 Media</span>
            </div>
          </div>
        </FadeIn>

        {/* 3. INTERACTIVE SEARCH & CATEGORY FILTER BAR */}
        <FadeIn delay={0.15}>
          <div style={{ marginBottom: "28px" }}>
            {/* Search Input */}
            <div style={{ maxWidth: "480px", margin: "0 auto 20px", position: "relative" }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === "fr" ? "Rechercher un intervenant, rôle, entité (ex. UNESCO, Annapurna, SNRT...)" : "Search speaker, role, organization (e.g. UNESCO, Annapurna, SNRT...)"}
                style={{
                  width: "100%",
                  padding: "12px 16px 12px 42px",
                  borderRadius: "9999px",
                  border: "1px solid var(--border)",
                  background: "var(--surface)",
                  fontSize: "13px",
                  color: "var(--text-primary)",
                  outline: "none",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                  boxSizing: "border-box"
                }}
              />
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "var(--text-secondary)" }}
              >
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  style={{
                    position: "absolute",
                    right: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "transparent",
                    border: "none",
                    color: "var(--text-secondary)",
                    cursor: "pointer",
                    fontSize: "12px",
                    padding: "4px"
                  }}
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center" }}>
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "9999px",
                      border: isActive ? "1px solid #B8432F" : "1px solid var(--border)",
                      background: isActive ? "#B8432F" : "var(--surface)",
                      color: isActive ? "#FFFFFF" : "var(--text-primary)",
                      fontSize: "12px",
                      fontWeight: isActive ? 600 : 500,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      boxShadow: isActive ? "0 2px 10px rgba(184, 67, 47, 0.25)" : "none"
                    }}
                  >
                    <span>{cat.label}</span>
                    <span style={{ 
                      fontSize: "10px", 
                      fontFamily: "var(--font-jetbrains)", 
                      background: isActive ? "rgba(255,255,255,0.25)" : "#F3F4F6", 
                      color: isActive ? "#FFFFFF" : "var(--text-secondary)",
                      padding: "2px 6px", 
                      borderRadius: "9999px",
                      lineHeight: 1
                    }}>
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </FadeIn>

        {/* 4. SPEAKERS GRID */}
        <FadeIn delay={0.2}>
          {filteredSpeakers.length === 0 ? (
            <div style={{ textAlign: "center", padding: "48px 20px", background: "var(--surface)", borderRadius: "12px", border: "1px solid var(--border)", margin: "24px 0" }}>
              <p style={{ color: "var(--text-secondary)", fontSize: "14px", margin: 0 }}>
                {lang === "fr" ? "Aucun intervenant ne correspond à votre recherche." : "No speakers matching your search query."}
              </p>
            </div>
          ) : (
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fill, minmax(min(310px, 100%), 1fr))", 
              gap: "20px", 
              marginBottom: "48px",
              alignItems: "stretch"
            }}>
              {filteredSpeakers.map((speaker) => {
                const initials = getInitials(speaker.name);
                const isIndia = speaker.country === "Inde";

                return (
                  <div
                    key={speaker.id}
                    className="feature-card"
                    style={{
                      padding: "22px 20px",
                      borderRadius: "14px",
                      border: speaker.highlight ? "1.5px solid rgba(184, 67, 47, 0.35)" : "1px solid var(--border)",
                      background: speaker.highlight ? "#FFFDFD" : "var(--surface)",
                      boxShadow: speaker.highlight ? "0 4px 16px rgba(184, 67, 47, 0.08)" : "0 2px 6px rgba(0,0,0,0.02)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease",
                      position: "relative"
                    }}
                  >
                    {/* Top Tag Ribbons */}
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "14px" }}>
                      {speaker.isModerator && (
                        <span style={{ 
                          fontSize: "9px", 
                          fontFamily: "var(--font-jetbrains)", 
                          fontWeight: 700, 
                          padding: "3px 8px", 
                          borderRadius: "4px", 
                          background: "#ECFDF5", 
                          color: "#059669", 
                          border: "1px solid #A7F3D0",
                          textTransform: "uppercase" 
                        }}>
                          🎤 {lang === "fr" ? "Modération" : "Moderator"}
                        </span>
                      )}
                      {speaker.isKeynote && (
                        <span style={{ 
                          fontSize: "9px", 
                          fontFamily: "var(--font-jetbrains)", 
                          fontWeight: 700, 
                          padding: "3px 8px", 
                          borderRadius: "4px", 
                          background: "#FEF3C7", 
                          color: "#D97706", 
                          border: "1px solid #FDE68A",
                          textTransform: "uppercase" 
                        }}>
                          ⭐ Keynote
                        </span>
                      )}
                      {isIndia && (
                        <span style={{ 
                          fontSize: "9px", 
                          fontFamily: "var(--font-jetbrains)", 
                          fontWeight: 700, 
                          padding: "3px 8px", 
                          borderRadius: "4px", 
                          background: "#FDECE7", 
                          color: "#B8432F", 
                          border: "1px solid #F5C6BA",
                          textTransform: "uppercase" 
                        }}>
                          🇮🇳 {lang === "fr" ? "Délégation Inde" : "India Delegation"}
                        </span>
                      )}
                    </div>

                    {/* Speaker Header Info */}
                    <div style={{ display: "flex", gap: "14px", alignItems: "flex-start", marginBottom: "12px" }}>
                      {/* Monogram Avatar */}
                      <div style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "12px",
                        background: speaker.highlight 
                          ? "linear-gradient(135deg, #B8432F 0%, #D97706 100%)" 
                          : "linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%)",
                        color: speaker.highlight ? "#FFFFFF" : "#374151",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "16px",
                        fontWeight: 700,
                        fontFamily: "var(--font-jetbrains)",
                        flexShrink: 0,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                        border: speaker.highlight ? "none" : "1px solid var(--border)"
                      }}>
                        {initials}
                      </div>

                      <div style={{ flex: 1 }}>
                        <h3 className="feature-title" style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-primary)", margin: "0 0 4px 0", lineHeight: 1.25 }}>
                          {speaker.name}
                        </h3>
                        <p style={{ fontSize: "12px", color: "var(--text-secondary)", margin: 0, lineHeight: 1.35 }}>
                          {speaker.role}
                        </p>
                      </div>
                    </div>

                    {/* Organization / Affiliation Pill */}
                    <div style={{ 
                      marginTop: "auto", 
                      paddingTop: "12px", 
                      borderTop: "1px solid var(--border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "8px"
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", overflow: "hidden" }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#B8432F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                          <path d="M3 21h18"/>
                          <path d="M5 21V7l8-4v18"/>
                          <path d="M19 21V11l-6-4"/>
                        </svg>
                        <span style={{ 
                          fontSize: "11.5px", 
                          fontWeight: 600, 
                          color: "#1F2937",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis"
                        }}>
                          {speaker.organization}
                        </span>
                      </div>
                      {speaker.country && (
                        <span style={{ fontSize: "10.5px", color: "var(--text-secondary)", fontFamily: "var(--font-jetbrains)", flexShrink: 0 }}>
                          {speaker.country}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </FadeIn>

        {/* 5. CALL FOR SPEAKERS & ACCREDITATION CTA */}
        <FadeIn delay={0.3}>
          <div style={{ 
            padding: "40px 24px", 
            borderRadius: "16px", 
            background: "linear-gradient(135deg, #1A1A1A 0%, #111827 100%)", 
            color: "#FFFFFF",
            textAlign: "center",
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)"
          }}>
            <div className="label-badge" style={{ background: "rgba(184, 67, 47, 0.2)", borderColor: "rgba(184, 67, 47, 0.4)", color: "#F87171", marginBottom: "14px" }}>
              <span>FICIAI 2026 • ACCRÉDITATION OFFICIELLE</span>
            </div>
            <h3 style={{ fontSize: "clamp(20px, 2.6vw, 28px)", fontWeight: 700, margin: "0 0 10px 0" }}>
              {sp.callTitle}
            </h3>
            <p style={{ color: "#9CA3AF", fontSize: "13.5px", maxWidth: "600px", margin: "0 auto 24px", lineHeight: 1.6 }}>
              {sp.callSub}
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/badge" className="btn btn-primary" style={{ padding: "12px 24px", fontSize: "13px" }}>
                {sp.callBtn}
              </Link>
              <a href="mailto:contact@cinezate.com" className="btn btn-outline" style={{ padding: "12px 24px", fontSize: "13px", color: "#FFFFFF", borderColor: "rgba(255,255,255,0.3)" }}>
                {t.contact || "Nous Contacter"}
              </a>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
