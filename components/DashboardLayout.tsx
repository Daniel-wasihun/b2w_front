"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/lib/authStore";
import { useLanguageStore } from "@/lib/languageStore";

// Sub-components
import { Sidebar } from "./dashboard/Sidebar";
import { DashboardHeader } from "./dashboard/DashboardHeader";

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const currentLanguage = useLanguageStore((state) => state.currentLanguage);

  const isAdmin = user?.roles?.some((r: any) => r.slug === 'admin' || r.slug === 'super_admin');

  return (
    <div className="min-h-screen bg-muted/20 flex overflow-hidden">
      <Sidebar 
        isSidebarOpen={isSidebarOpen} 
        pathname={pathname} 
        isAdmin={!!isAdmin} 
        logout={logout} 
      />

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col h-screen overflow-hidden">
        <DashboardHeader 
          user={user} 
          isSidebarOpen={isSidebarOpen} 
          setIsSidebarOpen={setIsSidebarOpen} 
          currentLanguage={currentLanguage} 
        />

        {/* Scrollable Content */}
        <main className="flex-grow overflow-y-auto p-8 bg-muted/20">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};
