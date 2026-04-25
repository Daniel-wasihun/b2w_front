"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { HeroHeader } from "@/components/HeroHeader";
import { Heart, ShieldCheck, Zap, Globe, Coins, HandHeart, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const impactAreas = [
  { 
    icon: Coins, 
    title: "Student Stipends", 
    desc: "Direct financial support for top-performing students to focus on their mastery.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10"
  },
  { 
    icon: Zap, 
    title: "Infrastructure", 
    desc: "Maintaining the high-speed servers and hosting for our global competition platform.",
    color: "text-amber-500",
    bg: "bg-amber-500/10"
  },
  { 
    icon: Trophy, 
    title: "Elite Rewards", 
    desc: "Funding physical awards, equipment, and resources for challenge winners.",
    color: "text-blue-500",
    bg: "bg-blue-500/10"
  },
  { 
    icon: HandHeart, 
    title: "Mentorship", 
    desc: "Onboarding industry experts to provide hands-on coaching for student teams.",
    color: "text-purple-500",
    bg: "bg-purple-500/10"
  }
];

const donationOptions = [
  { amount: "$10", label: "Supporter", desc: "Covers one student's competition entry." },
  { amount: "$50", label: "Champion", desc: "Funds a weekly skill-based bootcamp." },
  { amount: "$100", label: "Visionary", desc: "Sponsors a full month stipend for a winner.", featured: true },
  { amount: "Custom", label: "Patron", desc: "Choose your own impact level." }
];

export default function DonatePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroHeader 
        title="Fuel the Future of Excellence"
        subtitle="Your contribution directly empowers the next generation of innovators, leaders, and champions."
      />

      {/* Narrative/Impact Section */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <Badge className="bg-primary/10 text-primary border-none px-4 py-1 font-bold">Why Donate?</Badge>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary">Investing in <span className="italic text-secondary">Potential</span></h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                The **Born To Win Initiative** is more than a platform—it's a launchpad. Every dollar donated goes directly into creating opportunities for students who possess the drive but lack the resources.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {impactAreas.map((area, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className="p-6 bg-card border border-border/50 rounded-[5px] space-y-4 shadow-sm"
                  >
                    <div className={`${area.bg} w-10 h-10 rounded-[5px] flex items-center justify-center ${area.color}`}>
                      <area.icon size={20} />
                    </div>
                    <h4 className="font-bold text-primary">{area.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{area.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] rounded-[5px] overflow-hidden shadow-2xl border-8 border-card">
                <img 
                  src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=1000" 
                  className="w-full h-full object-cover"
                  alt="Financial growth and support"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-primary p-8 rounded-[5px] shadow-2xl space-y-2 max-w-[200px]">
                <p className="text-3xl font-serif font-bold text-secondary">100%</p>
                <p className="text-white text-[10px] uppercase font-bold tracking-widest leading-tight">Proceeds go to programs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Tiers */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6 text-center space-y-16">
          <div className="max-w-2xl mx-auto space-y-4">
             <h2 className="text-4xl font-serif font-bold text-primary">Choose Your Contribution</h2>
             <p className="text-muted-foreground">Select a tier that reflects your commitment to academic excellence.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
             {donationOptions.map((tier, i) => (
               <motion.div
                 key={i}
                 whileHover={{ y: -10 }}
                 className={cn(
                   "p-10 bg-card rounded-[5px] border border-border/50 shadow-xl space-y-6 relative overflow-hidden",
                   tier.featured && "border-secondary/50 ring-2 ring-secondary/10"
                 )}
               >
                 {tier.featured && (
                   <div className="absolute top-0 right-0 py-1 px-4 bg-secondary text-primary font-bold text-[10px] rounded-bl-[5px]">
                     MOST IMPACT
                   </div>
                 )}
                 <div className="space-y-2">
                   <p className="text-4xl font-serif font-bold text-primary">{tier.amount}</p>
                   <p className="text-xs font-bold uppercase tracking-widest text-secondary">{tier.label}</p>
                 </div>
                 <p className="text-sm text-muted-foreground leading-relaxed">{tier.desc}</p>
                 <Button className={cn(
                   "w-full h-12 rounded-[5px] font-bold shadow-glow-primary",
                   tier.featured ? "bg-secondary text-primary hover:bg-secondary/90" : "bg-primary text-white"
                 )}>
                   Donate Now
                 </Button>
               </motion.div>
             ))}
          </div>
        </div>
      </section>

      {/* Payment Information */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-6 max-w-4xl">
           <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-[5px] space-y-10 text-center">
              <div className="space-y-4">
                 <h2 className="text-3xl font-serif font-bold">Direct Support Channels</h2>
                 <p className="text-white/60">If you prefer direct bank transfer or local mobile payment methods.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <div className="p-6 bg-white/5 rounded-[5px] border border-white/5 space-y-4">
                   <div className="w-10 h-10 rounded-[5px] bg-sky-500/20 flex items-center justify-center text-sky-400 mx-auto">
                     <Globe size={20} />
                   </div>
                   <h4 className="font-bold">Telebirr</h4>
                   <p className="text-[10px] text-white/50 leading-relaxed font-mono">+251 98 980 6310</p>
                 </div>
                 <div className="p-6 bg-white/5 rounded-[5px] border border-white/5 space-y-4">
                   <div className="w-10 h-10 rounded-[5px] bg-amber-500/20 flex items-center justify-center text-amber-400 mx-auto">
                     <ShieldCheck size={20} />
                   </div>
                   <h4 className="font-bold">CBE Bank</h4>
                   <p className="text-[10px] text-white/50 leading-relaxed font-mono">1000123456789</p>
                 </div>
                 <div className="p-6 bg-white/5 rounded-[5px] border border-white/5 space-y-4">
                   <div className="w-10 h-10 rounded-[5px] bg-rose-500/20 flex items-center justify-center text-rose-400 mx-auto">
                      <Heart size={20} />
                   </div>
                   <h4 className="font-bold">PayPal</h4>
                   <p className="text-[10px] text-white/50 leading-relaxed font-mono">donate@borntowin.org</p>
                 </div>
              </div>

              <div className="pt-10 border-t border-white/10">
                 <p className="text-xs text-white/40 italic">All donations are securely processed and tax-deductible under local law.</p>
              </div>
           </div>
        </div>
      </section>
    </main>
  );
}
