"use client";

import React from "react";
import { 
  Menu, 
  Search, 
  Bell 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { localize } from "@/lib/utils";

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
  return (
    <header className="h-20 bg-card/80 backdrop-blur-md border-b border-border px-8 flex items-center justify-between z-30">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="rounded-xl hover:bg-muted"
        >
          <Menu className="w-5 h-5" />
        </Button>
        <div className="hidden md:flex items-center bg-muted/50 rounded-xl px-4 py-2 border border-border w-96 group focus-within:border-primary/50 transition-all">
          <Search className="w-4 h-4 text-muted-foreground group-focus-within:text-primary" />
          <input 
            type="text" 
            placeholder="Search everything..." 
            className="bg-transparent border-none outline-none ml-3 text-sm w-full placeholder:text-muted-foreground"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="rounded-xl relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-card" />
        </Button>
        <div className="h-8 w-px bg-border mx-2" />
        <div className="flex items-center space-x-3 group cursor-pointer">
          <div className="text-right">
            <p className="text-sm font-bold leading-none">{localize(user?.name, currentLanguage)}</p>
            <p className="text-[11px] text-muted-foreground mt-1 capitalize font-bold">
              {user?.roles?.[0]?.name || 'Member'}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl premium-gradient flex items-center justify-center text-white font-bold shadow-lg shadow-primary/20">
            {localize(user?.name, currentLanguage)?.[0]}
          </div>
        </div>
      </div>
    </header>
  );
};
