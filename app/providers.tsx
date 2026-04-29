'use client';

import { useEffect } from 'react';
import { useLanguageStore } from '@/lib/languageStore';
import { useAuthStore } from '@/lib/authStore';
import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
  const fetchTranslations = useLanguageStore((state) => state.fetchTranslations);
  const fetchUser = useAuthStore((state) => state.fetchUser);

  useEffect(() => {
    fetchTranslations();
    fetchUser();
  }, [fetchTranslations, fetchUser]);

  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="system" 
      enableSystem 
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
