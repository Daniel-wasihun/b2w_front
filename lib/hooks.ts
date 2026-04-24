import { useLanguageStore } from './languageStore';
import { useAuthStore } from './authStore';

/**
 * Custom hook for translations
 */
export function useTranslation() {
  const { t, currentLanguage, setLanguage, availableLanguages, isLoading } = useLanguageStore();
  
  return {
    t,
    currentLanguage,
    setLanguage,
    availableLanguages,
    isLangLoading: isLoading
  };
}

/**
 * Custom hook for authentication
 */
export function useAuth() {
  const { user, isAuthenticated, isLoading, login, logout } = useAuthStore();
  
  return {
    user,
    isAuthenticated,
    isAuthLoading: isLoading,
    login,
    logout
  };
}
