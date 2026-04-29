"use client";

import React from "react";
import {
  Menu,
  Search,
  Bell,
  Sun,
  Moon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { localize } from "@/lib/utils";
import { useTheme } from "next-themes";

interface DashboardHeaderProps {
  user: any;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  currentLanguage: string;
}

export const DashboardHeader = ({
  user,
  isSidebarOpen,
  setIsSidebarOpen,
  currentLanguage
}: DashboardHeaderProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="h-20 bg-card/80 backdrop-blur-md border-b border-border px-8 flex items-center justify-between z-30 transition-colors duration-300">
      <div className="flex items-center space-x-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
        >
          <Menu className="w-5 h-5" />
        </Button>
        <div className="hidden md:flex items-center bg-muted/50 rounded-xl px-4 py-2 border border-border w-96 group focus-within:border-primary/50 transition-all">
          <Search className="w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search Intelligence Stream..."
            className="bg-transparent border-none outline-none ml-3 text-sm w-full placeholder:text-muted-foreground text-foreground font-medium"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-xl text-muted-foreground hover:text-foreground transition-all"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <Sun className="w-5 h-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute w-5 h-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>

        <Button variant="ghost" size="icon" className="rounded-xl relative text-muted-foreground hover:text-foreground transition-all">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-card animate-pulse" />
        </Button>

        <div className="h-8 w-px bg-border mx-2" />
        
        <div className="flex items-center space-x-4 group cursor-pointer p-1 rounded-xl hover:bg-muted transition-all">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-black text-foreground leading-none">{localize(user?.name, currentLanguage)}</p>
            <p className="text-[10px] text-muted-foreground mt-1.5 uppercase font-black tracking-widest">
              {user?.roles?.[0]?.name || 'Standard Unit'}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-black shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform uppercase">
            {localize(user?.name, currentLanguage)?.[0] || 'A'}
          </div>
        </div>
      </div>
    </header>
  );
};
