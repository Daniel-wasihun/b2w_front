import { create } from 'zustand';
import Cookies from 'js-cookie';
import apiClient from './apiClient';

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
  currentLanguage: Cookies.get('lang') || 'en',
  availableLanguages: [],
  translations: {},
  isLoading: false,

  setLanguage: async (lang: string) => {
    Cookies.set('lang', lang, { expires: 365 });
    set({ currentLanguage: lang });
    await get().fetchTranslations();
  },

  fetchTranslations: async () => {
    set({ isLoading: true });
    try {
      const { data } = await apiClient.get('/front-language');
      set({
        availableLanguages: data.available_languages,
        translations: data.translations,
        currentLanguage: data.current_language,
      });
    } catch (error) {
      console.error('Failed to fetch translations', error);
    } finally {
      set({ isLoading: false });
    }
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
