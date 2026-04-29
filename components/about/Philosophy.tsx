"use client";

import React from "react";
import { Award, Trophy, Heart, LucideIcon, Zap, ShieldCheck, Target, Star } from "lucide-react";
import * as LucideIcons from "lucide-react";

interface PhilosophyProps {
  philosophies: any[];
}

export const Philosophy = ({ philosophies }: PhilosophyProps) => {
  if (!philosophies || philosophies.length === 0) return null;

  return (
    <section className="py-24 bg-card">
       <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
             <h2 className="text-4xl font-serif font-bold text-primary">The B2W Philosophy</h2>
             <p className="text-muted-foreground">We believe that every student has a unique talent that deserves a stage. Our philosophy is built on unbreakable pillars of excellence.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
             {philosophies.map((pillar, i) => {
               const IconComponent = (LucideIcons as any)[pillar.icon] || Award;
               
               return (
                 <div key={pillar.id || i} className="bg-card p-12 rounded-[8px] text-center space-y-6 hover:shadow-2xl border border-primary/10 transition-all group">
                    <div className="w-16 h-16 rounded-[8px] bg-background border border-primary/20 flex items-center justify-center text-primary mx-auto shadow-sm group-hover:scale-110 transition-transform">
                       <IconComponent size={32} />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-primary">{pillar.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{pillar.content}</p>
                 </div>
               );
             })}
          </div>
       </div>
    </section>
  );
};
