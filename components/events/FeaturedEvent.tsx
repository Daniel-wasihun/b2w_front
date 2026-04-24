"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const FeaturedEvent = () => {
  return (
    <section className="py-12 bg-muted/50">
       <div className="container mx-auto px-6">
          <div className="bg-card p-1 rounded-[3rem] shadow-2xl overflow-hidden relative group border border-border/50">
             <div className="flex flex-col lg:flex-row bg-card rounded-[2.8rem] overflow-hidden">
                <div className="lg:w-1/2 relative h-[400px] lg:h-auto overflow-hidden">
                   <img 
                      src="https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?q=80&w=1000" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      alt="Featured Event"
                   />
                   <div className="absolute top-8 left-8">
                      <Badge className="bg-secondary text-primary border-none px-4 py-2 font-bold shadow-lg">Featured Event</Badge>
                   </div>
                </div>
                <div className="lg:w-1/2 p-12 lg:p-20 space-y-8 flex flex-col justify-center">
                   <div className="space-y-4">
                      <h2 className="text-4xl font-serif font-bold text-primary">Born To Win Grand <span className="italic text-secondary">Summit</span> 2026</h2>
                      <p className="text-muted-foreground text-lg leading-relaxed">
                         Our annual flagship event bringing together the brightest minds from across the continent for three days of intense competition and networking.
                      </p>
                   </div>
                   <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-1">
                         <p className="text-[10px] font-bold capitalize text-secondary">Date</p>
                         <p className="font-bold text-primary">Dec 15-18, 2026</p>
                      </div>
                      <div className="space-y-1">
                         <p className="text-[10px] font-bold capitalize text-secondary">Location</p>
                         <p className="font-bold text-primary">Convention Hall A</p>
                      </div>
                   </div>
                   <Button size="lg" className="rounded-2xl h-16 px-10 font-bold shadow-glow-primary w-fit">
                      Get Early Bird Ticket
                   </Button>
                </div>
             </div>
          </div>
       </div>
    </section>
  );
};
