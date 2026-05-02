"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Trophy,
  FileCheck,
  LogOut,
  Sparkles,
  ShieldCheck,
  Calendar,
  Flag,
  Newspaper,
  Star,
  BarChart3,
  Palette,
  Shield,
  Key,
  Building2,
  Award,
  BookOpen,
  CheckCircle2,
  MessageSquare,
  MessagesSquare,
  Users2,
  Target,
  FileText,
  Tags,
  Layers,
  Handshake,
  Megaphone,
  Mail,
  MailQuestion
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  user: any;
  isSidebarOpen: boolean;
}

export const Sidebar = ({ user, isSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();

  const menuItems = [
    { label: "Overview", icon: LayoutDashboard, href: "/admin" },

    // Core Ops
    { label: "Identity Nodes", icon: Users, href: "/admin/users" },
    { label: "Role Definitions", icon: Shield, href: "/admin/roles" },
    { label: "Department Units", icon: Building2, href: "/admin/departments" },

    // Competitions
    { label: "Review Queue", icon: FileCheck, href: "/admin/submissions" },
    { label: "Race Challenges", icon: Trophy, href: "/admin/races" },
    { label: "Merit Certificates", icon: Award, href: "/admin/certificates" },

    // Taxonomy & Structure
    { label: "Global Categories", icon: Layers, href: "/admin/categories" },
    { label: "Metadata Tags", icon: Tags, href: "/admin/tags" },
    { label: "Static Content", icon: FileText, href: "/admin/pages" },

    // Educational
    { label: "Program Tracks", icon: BookOpen, href: "/admin/landing/programs" },
    { label: "Track Benefits", icon: CheckCircle2, href: "/admin/landing/benefits" },
    { label: "Methodology", icon: Target, href: "/admin/landing/methodology" },

    // Communication & Public
    { label: "Press & News", icon: Newspaper, href: "/admin/news" },
    { label: "Elite Events", icon: Calendar, href: "/admin/events" },
    { label: "Announcements", icon: Megaphone, href: "/admin/announcements" },
    { label: "Newsletter Sync", icon: Mail, href: "/admin/newsletter" },
    { label: "Contact Inbound", icon: MailQuestion, href: "/admin/contacts" },


    // Branding
    { label: "Hero Header", icon: Sparkles, href: "/admin/landing/hero" },
    { label: "Core Features", icon: ShieldCheck, href: "/admin/landing/features" },
    { label: "Success Stories", icon: Star, href: "/admin/landing/testimonials" },
    { label: "Visual Vault", icon: Palette, href: "/admin/gallery" },
    { label: "Partner Network", icon: Handshake, href: "/admin/partners" },
    { label: "Live Metrics", icon: BarChart3, href: "/admin/landing/stats" },

    // Organizational
    { label: "About Narrative", icon: FileText, href: "/admin/about" },
    { label: "Leadership Team", icon: Users2, href: "/admin/leadership" },
    { label: "Philosophy Nodes", icon: Flag, href: "/admin/philosophy" },
  ];

  return (
    <div className={cn(
      "w-72 h-screen bg-card border-r border-border flex flex-col fixed left-0 top-0 z-50 transition-transform duration-300 shadow-2xl shadow-black/5",
      !isSidebarOpen && "-translate-x-full"
    )}>
      {/* Branding */}
      <div className="p-8 border-b border-border shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary/30">
            B
          </div>
          <div className="flex flex-col">
            <span className="text-foreground font-black tracking-tight text-lg">B2W Admin</span>
            <span className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em]">Management v6.0</span>
          </div>
        </div>
      </div>

      {/* Flattened Scrollable Menu */}
      <nav className="grow p-4 space-y-1 overflow-y-auto no-scrollbar custom-scrollbar">
        <p className="px-4 py-3 text-[10px] font-black text-muted-foreground/60 uppercase tracking-[0.2em]">Master Control Stream</p>
        {menuItems.map((item) => {
           // Role-based logic
           const userRole = user?.roles?.[0]?.slug;
           const isIdentityNode = ["/admin/users", "/admin/roles", "/admin/departments"].includes(item.href);
           const isAdmin = ["admin", "super_admin"].includes(userRole);
           
           if (isIdentityNode && !isAdmin) return null;

           const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
           return (
             <Link
               key={item.href}
               href={item.href}
               className={cn(
                 "flex items-center gap-3 px-4 py-3 rounded-xl text-[13px] font-bold transition-all duration-200 group",
                 isActive
                   ? "bg-primary text-primary-foreground shadow-xl shadow-primary/20"
                   : "text-muted-foreground hover:text-foreground hover:bg-muted"
               )}
             >
               <item.icon className={cn("w-4 h-4 transition-colors", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-primary")} />
               <span className="truncate">{item.label}</span>
             </Link>
           )
         })}
      </nav>

      {/* User Session */}
      <div className="p-6 border-t border-border shrink-0 bg-muted/30">
        <div className="flex items-center gap-3 p-1">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black text-xs border border-primary/20 uppercase">
            {user?.name?.[0] || "A"}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-black text-foreground truncate">{user?.name || "Admin User"}</span>
            <span className="text-[10px] text-muted-foreground font-bold truncate uppercase tracking-tighter">{user?.email}</span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: var(--border);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: var(--muted-foreground);
        }
      `}</style>
    </div>
  );
};