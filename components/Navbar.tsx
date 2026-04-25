"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useAuthStore } from "@/lib/authStore";
import { useLanguageStore } from "@/lib/languageStore";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

// Sub-components
import { Logo } from "./navbar/Logo";
import { ThemeToggle } from "./navbar/ThemeToggle";
import { ExploreDropdown } from "./navbar/ExploreDropdown";
import { AuthButtons } from "./navbar/AuthButtons";
import { UserMenu } from "./navbar/UserMenu";
import { MobileMenu } from "./navbar/MobileMenu";

const publicLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Programs", href: "/programs" },
  { name: "Events", href: "/events" },
  { name: "News", href: "/news" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

const memberLinks = [
  { name: "Home", href: "/" },
  { name: "Events", href: "/events" },
  { name: "Programs", href: "/programs" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const { theme, setTheme } = useTheme();
  const currentLanguage = useLanguageStore((state) => state.currentLanguage);
  
  const isLoggedIn = !!user;
  const isAdmin = (user as any)?.roles?.some((r: any) => r.slug === 'admin' || r.slug === 'super_admin');
  const activeLinks = isLoggedIn ? memberLinks : publicLinks;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setIsOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-500",
        scrolled 
          ? "py-3 bg-background/90 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]" 
          : "py-6 bg-transparent"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Logo scrolled={scrolled} />

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-8">
          {activeLinks.map((link) => {
            if (["Races", "Events", "News", "Gallery", "Contact"].includes(link.name)) return null;
            
            return (
              <Link 
                key={link.href} 
                href={link.href}
                className={cn(
                  "text-sm font-bold capitalize transition-all relative group",
                  scrolled 
                    ? "text-foreground/70 hover:text-primary" 
                    : "text-white/80 hover:text-secondary",
                  pathname === link.href && (scrolled ? "text-foreground" : "text-white")
                )}
              >
                {link.name}
                {pathname === link.href && (
                  <motion.div 
                    layoutId="nav-active"
                    className={cn(
                      "absolute -bottom-1 left-0 w-full h-0.5 rounded-full",
                      scrolled ? "bg-primary" : "bg-secondary"
                    )}
                  />
                )}
              </Link>
            );
          })}

          <ExploreDropdown scrolled={scrolled} pathname={pathname} />

          {activeLinks.filter(l => ["Gallery", "Contact"].includes(l.name)).map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={cn(
                "text-sm font-bold capitalize transition-all relative group",
                scrolled 
                  ? "text-foreground/70 hover:text-primary" 
                  : "text-white/80 hover:text-secondary",
                pathname === link.href && (scrolled ? "text-foreground" : "text-white")
              )}
            >
              {link.name}
              {pathname === link.href && (
                <motion.div 
                  layoutId="nav-active"
                  className={cn(
                    "absolute -bottom-1 left-0 w-full h-0.5 rounded-[5px]",
                    scrolled ? "bg-primary" : "bg-secondary"
                  )}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="hidden lg:flex items-center space-x-6">
          <ThemeToggle scrolled={scrolled} />

          {isLoggedIn ? (
            <UserMenu 
              user={user} 
              logout={logout} 
              scrolled={scrolled} 
              currentLanguage={currentLanguage} 
              isAdmin={isAdmin} 
            />
          ) : (
            <AuthButtons scrolled={scrolled} />
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              "rounded-[5px]",
              scrolled ? "text-primary" : "text-white hover:bg-white/10"
            )}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" /> }
          </Button>
        </div>
      </div>

      {/* Mobile Menu Content */}
      <AnimatePresence>
        {isOpen && (
          <MobileMenu 
            isOpen={isOpen}
            activeLinks={activeLinks}
            setIsOpen={setIsOpen}
            isLoggedIn={isLoggedIn}
            logout={logout}
            theme={theme || "light"}
            setTheme={setTheme}
          />
        )}
      </AnimatePresence>
    </nav>
  );
};
