"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Zap, Star, Target } from "lucide-react";

const values = [
  { icon: ShieldCheck, title: "Integrity", desc: "Every win is verified and earned with honor." },
  { icon: Zap, title: "Speed", desc: "Rapid innovation and real-time competition results." },
  { icon: Star, title: "Recognition", desc: "Top performers get global visibility and rewards." },
  { icon: Target, title: "Precision", desc: "Focused programs designed for specific talent tracks." },
];

export const Narrative = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <div className="space-y-4">
              <Badge className="bg-secondary/10 text-secondary border-none px-4 py-1 font-bold">The Vision</Badge>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary">Cultivating a Culture of <span className="italic text-secondary">Winning</span></h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Born To Win was established in 2026 at Woldia University with a radical idea: that competition is the most powerful catalyst for academic and personal growth. We didn't just want a platform; we wanted a league of excellence where every student could find their voice and prove their worth.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Today, we bridge the gap between academic theory and practical brilliance. Our community is a melting pot of innovators, strategists, and creators, all united by a single drive: the pursuit of victory.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {values.map((item, i) => (
                 <div key={i} className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                       <item.icon size={20} />
                    </div>
                    <div>
                       <h4 className="font-bold text-primary">{item.title}</h4>
                       <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-card">
               <img 
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000" 
                  className="w-full h-full object-cover"
                  alt="Team collaboration"
               />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-card p-10 rounded-[2.5rem] shadow-2xl border border-border/50 max-w-xs">
               <p className="text-5xl font-serif font-bold text-secondary">2026</p>
               <p className="font-bold text-primary capitalize text-[10px] mt-2">The Year Everything Changed</p>
            </div>
            <div className="absolute -top-10 -right-10 w-32 h-32 premium-gradient rounded-full blur-[60px] opacity-20" />
          </div>
        </div>
      </div>
    </section>
  );
};
