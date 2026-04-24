"use client";

import React from "react";
import { MapPin } from "lucide-react";

export const ContactMap = () => {
  return (
    <section className="pb-24">
       <div className="container mx-auto px-6">
          <div className="h-[500px] bg-card rounded-[4rem] overflow-hidden border border-border/50 shadow-xl relative flex items-center justify-center">
             <div className="absolute inset-0 opacity-20 grayscale hover:grayscale-0 transition-all duration-1000">
                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000" className="w-full h-full object-cover" alt="Map Placeholder" />
             </div>
             <div className="relative z-10 bg-white/80 backdrop-blur-xl p-12 rounded-[3rem] shadow-2xl border border-white text-center max-w-sm">
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center mx-auto mb-6 shadow-glow-primary">
                   <MapPin size={32} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-primary mb-2">Our HQ</h3>
                <p className="text-muted-foreground font-medium">Main Administration Building, Woldia University, Ethiopia</p>
             </div>
          </div>
       </div>
    </section>
  );
};
