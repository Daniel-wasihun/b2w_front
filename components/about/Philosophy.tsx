"use client";

import React from "react";
import { Award, Trophy, Heart } from "lucide-react";

const pillars = [
  { 
    title: "Empowerment", 
    desc: "We provide the resources and mentorship needed to turn raw potential into realized brilliance.",
    icon: Award
  },
  { 
    title: "Excellence", 
    desc: "We never settle for good enough. We push for the extraordinary in every submission and event.",
    icon: Trophy
  },
  { 
    title: "Community", 
    desc: "Winning is better together. We foster a supportive environment where peers lift each other up.",
    icon: Heart
  }
];

export const Philosophy = () => {
  return (
    <section className="py-24 bg-card">
       <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
             <h2 className="text-4xl font-serif font-bold text-primary">The B2W Philosophy</h2>
             <p className="text-muted-foreground">We believe that every student has a unique talent that deserves a stage. Our philosophy is built on three unbreakable pillars.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
             {pillars.map((pillar, i) => (
               <div key={i} className="bg-card p-12 rounded-[8px] text-center space-y-6 hover:shadow-2xl border border-primary/10 transition-all group">
                  <div className="w-16 h-16 rounded-[8px] bg-background border border-primary/20 flex items-center justify-center text-primary mx-auto shadow-sm group-hover:scale-110 transition-transform">
                     <pillar.icon size={32} />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-primary">{pillar.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{pillar.desc}</p>
               </div>
             ))}
          </div>
       </div>
    </section>
  );
};
