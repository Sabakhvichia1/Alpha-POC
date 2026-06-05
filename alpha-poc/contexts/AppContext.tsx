'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language } from '@/lib/translations';

interface AppContextType {
  isPlanned: boolean;
  toggleScenario: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [isPlanned, setIsPlanned] = useState(false);
  const [language, setLanguage] = useState<Language>('ka');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('appLanguage');
    if (stored === 'en' || stored === 'ka') {
      setLanguage(stored);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('appLanguage', language);
    }
  }, [language, mounted]);

  const toggleScenario = () => {
    setIsPlanned(!isPlanned);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'ka' ? 'en' : 'ka');
  };

  return (
    <AppContext.Provider value={{ isPlanned, toggleScenario, language, setLanguage, toggleLanguage }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
