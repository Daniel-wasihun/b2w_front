'use client';

import { useState } from 'react';
import { useAuth, useTranslation } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Globe, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { login, isAuthLoading } = useAuth();
  const { t, currentLanguage, setLanguage, availableLanguages } = useTranslation();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login({ email, password });
      router.push('/');
    } catch (err) {
      // Error handled by store/toast
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fafafa] dark:bg-black p-6 selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-black">
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Logo/Branding */}
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-16 h-16 bg-black dark:bg-white rounded-2xl flex items-center justify-center mb-6 shadow-2xl shadow-black/10">
            <ShieldCheck className="w-8 h-8 text-white dark:text-black" />
          </div>
          <h2 className="text-3xl font-black tracking-tighter text-zinc-900 dark:text-white uppercase">
            Born to Win
          </h2>
          <p className="text-zinc-500 font-medium mt-1">Management Portal v1.0</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-10 rounded-[32px] shadow-2xl shadow-zinc-200/50 dark:shadow-none border border-zinc-100 dark:border-zinc-800/50 relative overflow-hidden">
          
          {/* Abstract background element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-zinc-50 dark:bg-zinc-800/20 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none" />

          {/* Language Toggle */}
          <div className="flex justify-center gap-1.5 p-1 bg-zinc-100 dark:bg-zinc-800/50 rounded-full w-fit mx-auto mb-10 border border-zinc-200/50 dark:border-zinc-700/50">
            {availableLanguages.map((lang) => (
              <button
                key={lang.key}
                onClick={() => setLanguage(lang.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  currentLanguage === lang.key
                    ? 'bg-white text-black dark:bg-zinc-100 dark:text-black shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'
                }`}
              >
                <span>{lang.icon}</span>
                <span className="uppercase tracking-widest">{lang.name}</span>
              </button>
            ))}
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <Input
                label="Identity"
                type="email"
                required
                icon={<Mail className="w-4 h-4" />}
                placeholder="email@b2w.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              
              <Input
                label="Security Key"
                type="password"
                required
                icon={<Lock className="w-4 h-4" />}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-14 text-sm uppercase tracking-[0.2em]"
              isLoading={isAuthLoading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {t('nav.login')}
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-zinc-100 dark:border-zinc-800 text-center">
            <p className="text-xs font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">
              Secured by BTWF Infrastructure
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
