"use client";

import Link from "next/link";
import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  scrolled: boolean;
}

export const Logo = ({ scrolled }: LogoProps) => {
  return (
    <Link href="/" className="flex items-center space-x-3 group">
      <div className="p-2 premium-gradient rounded-[8px] shadow-lg shadow-primary/20 transition-transform group-hover:scale-110">
        <Trophy className="text-white w-6 h-6" />
      </div>
      <span className={cn(
        "text-xl font-bold tracking-tight transition-colors",
        scrolled ? "text-primary" : "text-white"
      )}>
        Born To <span className={cn(
          "font-serif italic transition-colors", 
          scrolled ? "text-secondary" : "text-secondary/90"
        )}>Win</span>
      </span>
    </Link>
  );
};
