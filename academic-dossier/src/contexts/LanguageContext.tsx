'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language } from '@/lib/i18n';

interface LanguageContextType {
  currentLang: Language;
  setCurrentLang: (lang: Language) => void;
  isHydrated: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const storedLang = localStorage.getItem('language') as Language;
    if (storedLang && ['en', 'fr', 'fa'].includes(storedLang)) {
      setCurrentLang(storedLang);
    }
    setIsHydrated(true);
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <LanguageContext.Provider value={{ currentLang, setCurrentLang: handleLanguageChange, isHydrated }}>
      {children}
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