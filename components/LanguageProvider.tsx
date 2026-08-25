"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Locale, translations } from '../lib/translations';

type LanguageContextType = {
  lang: Locale;
  setLang: (lang: Locale) => void;
  t: typeof translations.en;
  toggleLang: () => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Locale>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('cinezate-lang') as Locale;
    if (savedLang === 'fr' || savedLang === 'en') {
      setLangState(savedLang);
    }
    setMounted(true);
  }, []);

  const setLang = (newLang: Locale) => {
    setLangState(newLang);
    localStorage.setItem('cinezate-lang', newLang);
  };

  const toggleLang = () => {
    setLang(lang === 'en' ? 'fr' : 'en');
  };

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, toggleLang }}>
      <div style={{ visibility: mounted ? 'visible' : 'hidden' }}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
