"use client";

import Link from "next/link";
import { ChevronDown, Trophy, Star, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ExploreDropdownProps {
  scrolled: boolean;
  pathname: string;
}

export const ExploreDropdown = ({ scrolled, pathname }: ExploreDropdownProps) => {
  const isActive = ["/races", "/events", "/news"].includes(pathname);

  return (
    <div className="relative group/explore">
      <button className={cn(
        "flex items-center space-x-1 text-sm font-bold capitalize transition-all cursor-pointer group-hover/explore:text-primary",
        scrolled 
          ? "text-foreground/70" 
          : "text-white/80 group-hover/explore:text-secondary",
        isActive && (scrolled ? "text-foreground" : "text-white")
      )}>
        <span>Explore</span>
        <ChevronDown className="w-4 h-4 transition-transform group-hover/explore:rotate-180" />
        {isActive && (
          <motion.div 
            layoutId="nav-active"
            className={cn(
              "absolute -bottom-1 left-0 w-full h-0.5 rounded-full",
              scrolled ? "bg-primary" : "bg-secondary"
            )}
          />
        )}
      </button>

      {/* Hover Menu with Arrow */}
      <div className="absolute top-full left-0 pt-4 opacity-0 translate-y-2 pointer-events-none group-hover/explore:opacity-100 group-hover/explore:translate-y-0 group-hover/explore:pointer-events-auto transition-all duration-300 z-50">
        {/* Caret/Arrow */}
        <div className="absolute top-2 left-6 w-4 h-4 bg-background border-t border-l border-border/50 rotate-45 z-10" />
        
        <div className="bg-background border border-border/50 rounded-[5px] p-2 shadow-2xl min-w-[200px] overflow-hidden relative z-20">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-2xl pointer-events-none" />
          {[
            { name: "Challenges", href: "/races", icon: Trophy, desc: "Elite Challenges" },
            { name: "Events", href: "/events", icon: Star, desc: "Club Gatherings" },
            { name: "News", href: "/news", icon: FileText, desc: "Latest Updates" }
          ].map((item) => (
            <Link 
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center px-4 py-3 rounded-[5px] transition-all hover:bg-muted group/item",
                pathname === item.href ? "text-primary bg-primary/5" : "text-foreground/70"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-[5px] flex items-center justify-center mr-3 transition-colors",
                pathname === item.href ? "bg-primary text-white" : "bg-muted text-muted-foreground group-hover/item:bg-primary/10 group-hover/item:text-primary"
              )}>
                <item.icon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-bold">{item.name}</p>
                <p className="text-[10px] text-muted-foreground font-medium opacity-0 group-hover/item:opacity-100 transition-opacity">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
