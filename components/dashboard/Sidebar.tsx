"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Trophy, 
  LogOut,
  LayoutDashboard,
  Calendar,
  FileText,
  Award,
  Users,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const sidebarLinks = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Competitions", href: "/dashboard/races", icon: Trophy },
  { name: "Events", href: "/dashboard/events", icon: Calendar },
  { name: "Submissions", href: "/dashboard/submissions", icon: FileText },
  { name: "Certificates", href: "/dashboard/certificates", icon: Award },
  { name: "Users", href: "/admin/users", icon: Users, adminOnly: true },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

interface SidebarProps {
  isSidebarOpen: boolean;
  pathname: string;
  isAdmin: boolean;
  logout: () => void;
}

export const Sidebar = ({ isSidebarOpen, pathname, isAdmin, logout }: SidebarProps) => {
  return (
    <motion.aside
      initial={false}
      animate={{ width: isSidebarOpen ? 280 : 80 }}
      className="bg-card border-r border-border flex flex-col z-40 relative shadow-xl shadow-primary/5"
    >
      <div className="p-6 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 overflow-hidden">
          <div className="p-2 premium-gradient rounded-xl shrink-0">
            <Trophy className="text-white w-6 h-6" />
          </div>
          {isSidebarOpen && (
            <span className="text-xl font-bold tracking-tight whitespace-nowrap">
              Born To <span className="text-primary">Win</span>
            </span>
          )}
        </Link>
      </div>

      <nav className="flex-grow px-4 space-y-2 py-4 overflow-y-auto overflow-x-hidden">
        {sidebarLinks.map((link) => {
          if (link.adminOnly && !isAdmin) return null;
          const isActive = pathname === link.href;
          
          return (
            <Link key={link.href} href={link.href}>
              <div
                className={cn(
                  "flex items-center group transition-all duration-200 rounded-xl px-4 py-3 mb-1 cursor-pointer relative",
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <link.icon className={cn("w-5 h-5 shrink-0", isActive ? "text-primary" : "group-hover:text-primary")} />
                {isSidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="ml-4 font-bold text-sm whitespace-nowrap"
                  >
                    {link.name}
                  </motion.span>
                )}
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"
                  />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <Button
          variant="ghost"
          onClick={logout}
          className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl h-12 px-4"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {isSidebarOpen && <span className="ml-4 font-bold">Logout</span>}
        </Button>
      </div>
    </motion.aside>
  );
};
