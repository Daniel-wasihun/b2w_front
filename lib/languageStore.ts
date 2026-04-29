import { create } from 'zustand';
import Cookies from 'js-cookie';

interface LanguageOption {
  key: string;
  name: string;
  icon: string;
}

interface LanguageState {
  currentLanguage: string;
  availableLanguages: LanguageOption[];
  translations: Record<string, any>;
  isLoading: boolean;
  setLanguage: (lang: string) => Promise<void>;
  fetchTranslations: () => Promise<void>;
  t: (key: string, params?: Record<string, any>) => string;
}

export const useLanguageStore = create<LanguageState>((set, get) => ({
  currentLanguage: 'en',
  availableLanguages: [
    { key: 'en', name: 'English', icon: '🇺🇸' }
  ],
  translations: {
    hero: { title: "Unlock Your Potential", subtitle: "Join the elite arena of champions." },
    nav: { home: "Home", programs: "Programs", events: "Events", news: "News", contact: "Contact" }
  },
  isLoading: false,

  setLanguage: async (lang: string) => {
    // Force to English
    Cookies.set('lang', 'en', { expires: 365 });
    set({ currentLanguage: 'en' });
  },

  fetchTranslations: async () => {
    // No-op for now as we use static English
  },

  t: (key: string, params?: Record<string, any>) => {
    const { translations } = get();
    let text: any = key.split('.').reduce((obj: any, i) => obj?.[i], translations) || key;
    
    if (typeof text !== 'string') return key;

    let result = text as string;

    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        result = result.replace(`:${k}`, String(v));
      });
    }

    return result;
  },
}));
