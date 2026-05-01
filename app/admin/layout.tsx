"use client";

import React, { useState, useEffect } from "react";
import { useAuthStore } from "@/lib/authStore";
import { useLanguageStore } from "@/lib/languageStore";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user, isAuthenticated } = useAuthStore();
  const currentLanguage = useLanguageStore((state) => state.currentLanguage);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  // If authenticated but no user data yet, fetch it (handle initial load)
  useEffect(() => {
    if (isAuthenticated && !user) {
      // fetchUser would be called here if needed
      // For now, we rely on the login flow to set user data
    }
  }, [isAuthenticated, user]);

  if (!isAuthenticated) {
    // Return null or a loading state while redirecting
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex overflow-hidden transition-colors duration-300">
      {/* Sidebar - Solid and Static */}
      <Sidebar user={user} isSidebarOpen={isSidebarOpen} />

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