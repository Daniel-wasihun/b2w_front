"use client";

import React, { useState } from "react";
import { useAuthStore } from "@/lib/authStore";
import { useLanguageStore } from "@/lib/languageStore";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user } = useAuthStore();
  const currentLanguage = useLanguageStore((state) => state.currentLanguage);

  return (
    <div className="min-h-screen bg-background flex overflow-hidden transition-colors duration-300">
      {/* Sidebar - Solid and Static */}
      <Sidebar user={user} />

      {/* Main Content Area */}
      <div className="grow flex flex-col h-screen overflow-hidden ml-72 bg-muted/30">
        <DashboardHeader
          user={user}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          currentLanguage={currentLanguage}
        />

        {/* Static Content - No transitions for maximum speed */}
        <main className="grow overflow-y-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
