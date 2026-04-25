"use client";

import React from "react";
import Link from "next/link";
import { Trophy, Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

// Brand icons not grouped in Lucide
const FacebookIcon = ({ size, className }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const TwitterIcon = ({ size, className }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);
const YoutubeIcon = ({ size, className }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
  </svg>
);
const LinkedinIcon = ({ size, className }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

export const Footer = () => {
  const pathname = usePathname();
  const isAuthPage = pathname && ["/login", "/register", "/forgot-password"].includes(pathname);
  const isDashboard = pathname && (pathname.startsWith("/dashboard") || pathname.startsWith("/admin"));

  if (isAuthPage || isDashboard) return null;

  // Dynamic Content Mapping for Footer CTA
  const getCTAContent = () => {
    switch (pathname) {
      case "/about":
        return {
          title: "Join Our Mission",
          highlight: "History",
          desc: "Learn about our journey and how we are building the future of student excellence through verified achievement.",
          btn1: "Our Story",
          btn2: "Join Us"
        };
      case "/programs":
        return {
          title: "Start Your Elite",
          highlight: "Path",
          desc: "Choose from our specialized programs designed to push your limits and guarantee your competitive edge.",
          btn1: "Explore Programs",
          btn2: "Contact Advisor"
        };
      case "/donate":
        return {
          title: "Support the Next",
          highlight: "Generation",
          desc: "Your contribution directly empowers students to claim their victory and reach their full potential.",
          btn1: "Donate Now",
          btn2: "Watch Impact"
        };
      case "/races":
        return {
          title: "Enter the Competition",
          highlight: "Arena",
          desc: "Compete with the most talented students and showcase your skills to claim extraordinary rewards.",
          btn1: "Join a Race",
          btn2: "View Leaderboard"
        };
      case "/gallery":
        return {
          title: "Witness Verified",
          highlight: "Excellence",
          desc: "Explore the moments of victory and the achievements that define our community of winners.",
          btn1: "View Gallery",
          btn2: "Submit Yours"
        };
      case "/news":
      case "/events":
        return {
          title: "Stay Ahead of the",
          highlight: "Game",
          desc: "Never miss an update on upcoming competitions, news, and success stories from the Born To Win community.",
          btn1: "Check Updates",
          btn2: "Notify Me"
        };
      case "/contact":
        return {
          title: "Have a Question for",
          highlight: "Us?",
          desc: "Our support team is ready to help you navigate your path to victory. Reach out to us anytime.",
          btn1: "Send Message",
          btn2: "Live Chat"
        };
      default:
        return {
          title: "Ready to Claim Your",
          highlight: "Victory?",
          desc: "Join thousands of students who are already pushing their limits and winning extraordinary rewards.",
          btn1: "Register Now",
          btn2: "Talk to Us"
        };
    }
  };

  const cta = getCTAContent();

  return (
    <footer className="bg-card border-t border-border pt-24 mt-32 sm:mt-44 lg:mt-56 min-h-[200px] max-h-[1000px] sm:min-h-[220px] lg:min-h-[220px] lg:max-h-[800px] xl:min-h-[260px] xl:max-h-[600px] relative">
      <div className="container mx-auto px-6">
        
        {/* Overlapping CTA Card */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-24 w-[90%] max-w-4xl bg-muted/90 backdrop-blur-md rounded-[8px] py-10 px-8 text-center border border-border shadow-2xl z-20">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-3">
            {cta.title} <span className="italic text-secondary">{cta.highlight}</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto mb-6 leading-relaxed">
            {cta.desc}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="h-12 px-8 rounded-[8px] bg-primary text-white font-bold shadow-glow-primary hover:bg-primary/90 transition-all w-full sm:w-auto">
              {cta.btn1}
            </Button>
            <Button variant="outline" className="h-12 px-8 rounded-[8px] font-bold border-border text-primary hover:bg-muted/50 transition-all w-full sm:w-auto">
              {cta.btn2}
            </Button>
          </div>
        </div>

        {/* Since the absolute card uses -mt-24, we add pad-top to not overlap the grid on mobile. */}
        <div className="pt-24 mt-10 md:pt-16 lg:pt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Column 1: Brand & Contact */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="p-2 premium-gradient rounded-[8px] shadow-lg shadow-primary/20">
                <Trophy className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-primary flex flex-col">
                <span>Born To Win</span>
                <span className="text-[10px] font-serif italic text-secondary leading-none mt-1 uppercase tracking-widest">Technologies</span>
              </span>
            </Link>
            
            <div className="space-y-3 pt-2 text-xs font-medium text-muted-foreground">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span className="leading-relaxed">Woldia University, Ethiopia<br/>Main Campus, 2nd floor</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>+251 900 123 456</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>hello@borntowin.initiative</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6 lg:pl-6">
            <h4 className="text-sm font-bold text-primary">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "Programs", href: "/programs" },
                { name: "Support & Donate", href: "/donate" },
                { name: "Competitions", href: "/races" },
                { name: "Gallery", href: "/gallery" },
              ].map((link, j) => (
                <li key={j}>
                  <Link href={link.href} className="text-xs text-muted-foreground hover:text-secondary transition-colors font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-primary">Community</h4>
            <ul className="space-y-3">
              {[
                { name: "Latest News", href: "/news" },
                { name: "Upcoming Events", href: "/events" },
                { name: "Success Stories", href: "/news?category=success-stories" },
                { name: "Winners Circle", href: "/races?tab=winners" },
                { name: "Contact Support", href: "/contact" },
              ].map((link, j) => (
                <li key={j}>
                  <Link href={link.href} className="text-xs text-muted-foreground hover:text-secondary transition-colors font-medium">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Socials & Newsletter */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-primary">Follow Us</h4>
            <div className="flex space-x-4">
              {[
                { icon: FacebookIcon, href: "#" },
                { icon: TwitterIcon, href: "#" },
                { icon: YoutubeIcon, href: "#" },
                { icon: LinkedinIcon, href: "#" },
                { icon: Send, href: "#" },
              ].map((social, i) => (
                <a key={i} href={social.href} className="text-primary hover:text-secondary transition-colors">
                  <social.icon size={18} className="opacity-90 fill-current" />
                </a>
              ))}
            </div>

            <div className="pt-2 space-y-3">
              <h4 className="text-sm font-bold text-primary">Subscribe for Updates</h4>
              <div className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder="Enter Your Email Address" 
                  className="flex-1 h-10 bg-background rounded-[8px] px-3 text-xs outline-none focus:ring-2 focus:ring-primary/20 border border-border min-w-0"
                />
                <Button className="h-10 px-5 rounded-[8px] bg-secondary hover:bg-secondary/90 text-white text-xs font-bold shadow-sm shadow-secondary/20">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-8 border-t border-border/50">
           <p className="text-[10px] text-muted-foreground font-medium">
             © 2026 Born To Win Technologies. All rights reserved.
           </p>
           <div className="flex items-center space-x-4 text-[10px] text-muted-foreground font-medium">
              <Link href="/terms" className="hover:text-primary transition-colors">Term Of Use</Link>
              <span className="w-px h-3 bg-border"></span>
              <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
           </div>
        </div>
      </div>
    </footer>
  );
};
