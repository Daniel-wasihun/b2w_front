"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  scrolled: boolean;
}

export const ThemeToggle = ({ scrolled }: ThemeToggleProps) => {
  const { setTheme, theme } = useTheme();

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={cn(
        "rounded-[8px] transition-all duration-300 relative group overflow-hidden",
        scrolled ? "text-primary hover:bg-primary/5" : "text-white hover:bg-white/10"
      )}
    >
      <Sun className={cn(
        "h-[1.2rem] w-[1.2rem] transition-all duration-500",
        theme === "dark" ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
      )} />
      <Moon className={cn(
        "absolute h-[1.2rem] w-[1.2rem] transition-all duration-500",
        theme === "dark" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
      )} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
