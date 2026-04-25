"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AuthButtonsProps {
  scrolled: boolean;
}

export const AuthButtons = ({ scrolled }: AuthButtonsProps) => {
  return (
    <div className="flex items-center space-x-4">
      <Link href="/login">
        <Button 
          variant="ghost" 
          className={cn(
            "font-bold capitalize text-xs h-11 px-6 rounded-[5px] transition-all duration-300",
            scrolled 
              ? "text-primary hover:bg-primary/5" 
              : "text-white border border-white/20 hover:bg-white hover:text-primary"
          )}
        >
          Login
        </Button>
      </Link>
      <Link href="/donate">
        <Button 
          className={cn(
            "font-bold capitalize text-xs h-11 px-7 rounded-[5px] shadow-lg transition-all duration-500",
            scrolled 
              ? "bg-primary text-white shadow-primary/20 hover:shadow-primary/40" 
              : "bg-secondary text-white shadow-secondary/20 hover:scale-105"
          )}
        >
          Donate
        </Button>
      </Link>
    </div>
  );
};
