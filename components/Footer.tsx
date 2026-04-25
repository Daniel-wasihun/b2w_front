"use client";

import React from "react";
import Link from "next/link";
import { Trophy, Mail, Phone, MapPin, Send, MessageCircle, Share2, Globe, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const footerLinks = [
  {
    title: "Quick Links",
    links: [
      { name: "Home", href: "/" },
      { name: "About Us", href: "/about" },
      { name: "Programs", href: "/programs" },
      { name: "Support & Donate", href: "/donate" },
      { name: "Competitions", href: "/races" },
      { name: "Gallery", href: "/gallery" },
    ],
  },
  {
    title: "Community",
    links: [
      { name: "Latest News", href: "/news" },
      { name: "Upcoming Events", href: "/events" },
      { name: "Success Stories", href: "/news?category=success-stories" },
      { name: "Winners Circle", href: "/races?tab=winners" },
      { name: "Contact Support", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "Anti-Fraud", href: "/legal/anti-fraud" },
    ],
  },
];

export const Footer = () => {
  const pathname = usePathname();
  const isAuthPage = pathname && ["/login", "/register", "/forgot-password"].includes(pathname);
  const isDashboard = pathname && (pathname.startsWith("/dashboard") || pathname.startsWith("/admin"));

  if (isAuthPage || isDashboard) return null;

  return (
    <footer className="bg-card border-t border-border pt-16 pb-8 mt-auto">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="p-2 premium-gradient rounded-[5px] shadow-lg shadow-primary/20">
                <Trophy className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-primary">
                Born To <span className="font-serif italic text-secondary">Win</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-xs leading-relaxed max-w-sm">
              The ultimate platform for student excellence and verified achievement. 
              Empowering the next generation to claim their victory.
            </p>
            <div className="flex space-x-3">
              {[
                { icon: MessageCircle, href: "#" },
                { icon: Share2, href: "#" },
                { icon: Globe, href: "#" },
                { icon: Heart, href: "#" },
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  className="w-8 h-8 rounded-[5px] bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all shadow-sm"
                >
                  <social.icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Sections */}
          {footerLinks.map((section, i) => (
            <div key={i} className="space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <Link 
                      href={link.href} 
                      className="text-xs text-muted-foreground hover:text-secondary transition-colors font-medium"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Newsletter & Contact Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 py-8 border-y border-border/50 mb-8">
           <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-[5px] bg-secondary/10 flex items-center justify-center text-secondary">
                 <Mail size={20} />
              </div>
              <div>
                 <p className="text-[10px] font-bold capitalize text-muted-foreground">Email Us</p>
                 <p className="text-xs font-bold text-primary">hello@borntowin.initiative</p>
              </div>
           </div>
           <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-[5px] bg-secondary/10 flex items-center justify-center text-secondary">
                 <Phone size={20} />
              </div>
              <div>
                 <p className="text-[10px] font-bold capitalize text-muted-foreground">Call Us</p>
                 <p className="text-xs font-bold text-primary">+251 900 123 456</p>
              </div>
           </div>
           <div className="relative">
              <input 
                type="email" 
                placeholder="Subscribe" 
                className="w-full h-12 bg-muted rounded-[5px] px-5 pr-14 text-xs outline-none focus:ring-2 focus:ring-primary/20 border border-border"
              />
              <button className="absolute right-1.5 top-1.5 w-9 h-9 bg-primary text-white rounded-[5px] flex items-center justify-center hover:bg-primary/90 transition-all">
                <Send size={14} />
              </button>
           </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
           <p className="text-[10px] text-muted-foreground font-medium">
             © 2026 Born To Win Initiative.
           </p>
           <div className="flex items-center space-x-2 text-[10px] text-muted-foreground font-bold capitalize">
              <MapPin size={12} className="text-secondary" />
              <span>Woldia University, Ethiopia</span>
           </div>
        </div>
      </div>
    </footer>
  );
};
