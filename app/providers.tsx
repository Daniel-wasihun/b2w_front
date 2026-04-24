'use client';

import { useEffect } from 'react';
import { useLanguageStore } from '@/lib/languageStore';
import { useAuthStore } from '@/lib/authStore';

export function Providers({ children }: { children: React.ReactNode }) {
  const fetchTranslations = useLanguageStore((state) => state.fetchTranslations);
  const fetchUser = useAuthStore((state) => state.fetchUser);

  useEffect(() => {
    fetchTranslations();
    fetchUser();
  }, [fetchTranslations, fetchUser]);

  return <>{children}</>;
}
