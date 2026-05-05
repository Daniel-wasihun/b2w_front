"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  LogOut, 
  ArrowLeft 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  activeLinks: any[];
  setIsOpen: (open: boolean) => void;
  isLoggedIn: boolean;
  isAdmin: boolean;
  user: any;
  logout: () => void;
  theme: string;
  setTheme: (theme: string) => void;
}

export const MobileMenu = ({ 
  isOpen, 
  activeLinks, 
  setIsOpen, 
  isLoggedIn, 
  isAdmin,
  user,
  logout, 
  theme, 
  setTheme 
}: MobileMenuProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="lg:hidden bg-background/95 backdrop-blur-3xl border-b border-border/50 overflow-hidden shadow-2xl"
    >
      <div className="container mx-auto px-6 py-10 space-y-8 flex flex-col">
        <div className="grid grid-cols-1 gap-4">
          {activeLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-2xl font-bold text-foreground hover:text-primary transition-colors flex items-center justify-between group"
            >
              {link.name}
              <motion.div whileHover={{ x: 5 }} className="opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowLeft className="w-5 h-5 rotate-180 text-primary" />
              </motion.div>
            </Link>
          ))}
        </div>
        
        <div className="pt-6 border-t border-border/50">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-6">Appearance</p>
          <div className="grid grid-cols-3 gap-3">
            {['light', 'dark', 'system'].map((t) => (
              <button
                key={t}
                onClick={() => { setTheme(t); setIsOpen(false); }}
                className={cn(
                   "py-3 rounded-[8px] text-[10px] font-bold uppercase transition-all",
                  theme === t ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-muted text-muted-foreground hover:bg-primary/5"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {isLoggedIn ? (
          <div className="space-y-6 pt-6 border-t border-border/50">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 rounded-[8px] premium-gradient flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20">
                {user?.name?.[0]}
              </div>
              <div>
                <p className="font-bold text-foreground">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            
            {isAdmin && (
              <Link href="/dashboard" className="flex items-center text-xl font-bold text-primary" onClick={() => setIsOpen(false)}>
                <LayoutDashboard className="mr-4 w-6 h-6" />
                Dashboard
              </Link>
            )}
            
            <Button variant="ghost" onClick={logout} className="justify-start px-0 text-destructive font-bold text-xl h-auto w-full">
              <LogOut className="mr-4 w-6 h-6" />
              Logout
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 pt-6 border-t border-border/50">
            <Link href="/login" className="w-full" onClick={() => setIsOpen(false)}>
              <Button variant="outline" className="w-full rounded-[8px] font-bold h-14 text-lg">Login</Button>
            </Link>
            <Link href="/register" className="w-full" onClick={() => setIsOpen(false)}>
              <Button className="w-full rounded-[8px] font-bold h-14 text-lg shadow-xl shadow-primary/20">Register</Button>
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
};
