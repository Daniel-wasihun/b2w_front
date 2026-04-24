'use client';

import { useAuth, useTranslation } from '@/lib/hooks';
import Link from 'next/link';
import { LogOut, User as UserIcon, ShieldCheck, ArrowRight, LayoutDashboard, Settings, Users, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function Home() {
  const { user, isAuthenticated, logout } = useAuth();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa] dark:bg-black font-sans text-zinc-900 dark:text-zinc-50">
      
      {/* Navigation */}
      <nav className="h-20 border-b border-zinc-100 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl sticky top-0 z-50 px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-black dark:bg-white rounded-xl flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-white dark:text-black" />
          </div>
          <span className="font-black uppercase tracking-tighter text-lg">B2W Portal</span>
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold">{user?.name}</p>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest">{user?.email}</p>
              </div>
              <Button variant="danger" size="sm" onClick={() => logout()} leftIcon={<LogOut className="w-4 h-4" />}>
                Logout
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Partner Login
              </Button>
            </Link>
          )}
        </div>
      </nav>

      <main className="flex-1 max-w-7xl w-full mx-auto p-8 md:p-12 space-y-12">
        
        {/* Hero Section */}
        <section className="space-y-4">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]"
          >
            BORN TO <br />
            <span className="text-zinc-300 dark:text-zinc-800">WIN FOUNDATION.</span>
          </motion.h1>
          <p className="text-xl text-zinc-500 max-w-2xl font-medium leading-relaxed">
            Standardizing academic excellence through professional infrastructure and seamless digital integration.
          </p>
        </section>

        {/* Action Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard 
            icon={<LayoutDashboard className="w-6 h-6" />}
            title="Management"
            desc="Centralized dashboard for role and permission orchestration."
            href="/dashboard"
            disabled={!isAuthenticated}
          />
          <FeatureCard 
            icon={<Users className="w-6 h-6" />}
            title="Community"
            desc="Unified user directory with professional verification levels."
            href="/users"
            disabled={!isAuthenticated}
          />
          <FeatureCard 
            icon={<BookOpen className="w-6 h-6" />}
            title="Resources"
            desc="Access to the digital repository and academic materials."
            href="/resources"
            disabled={!isAuthenticated}
          />
        </div>

        {!isAuthenticated && (
          <div className="bg-zinc-900 dark:bg-white p-12 rounded-[40px] text-white dark:text-black flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">Ready to start?</h2>
              <p className="text-zinc-400 dark:text-zinc-500 font-medium">Access your personalized workstation in seconds.</p>
            </div>
            <Link href="/login">
              <Button size="lg" className="bg-white text-black dark:bg-black dark:text-white h-16 px-10">
                Enter Workstation
              </Button>
            </Link>
          </div>
        )}
      </main>

      <footer className="p-12 border-t border-zinc-100 dark:border-zinc-800 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-400">
          &copy; 2026 Born to Win Foundation &bull; Built for Excellence
        </p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc, href, disabled }: { icon: any, title: string, desc: string, href: string, disabled?: boolean }) {
  return (
    <Link 
      href={disabled ? '#' : href}
      className={`p-8 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[32px] space-y-4 transition-all group ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-2xl hover:shadow-zinc-200/50 dark:hover:shadow-none hover:-translate-y-1'
      }`}
    >
      <div className="w-12 h-12 bg-zinc-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center group-hover:bg-black dark:group-hover:bg-white transition-colors">
        <span className="group-hover:text-white dark:group-hover:text-black transition-colors">{icon}</span>
      </div>
      <div className="space-y-1">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{desc}</p>
      </div>
    </Link>
  );
}
