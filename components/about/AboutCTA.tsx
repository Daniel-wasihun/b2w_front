"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const AboutCTA = () => {
  return (
    <section className="py-24 bg-muted/50">
       <div className="container mx-auto px-6">
          <div className="bg-card p-12 md:p-24 rounded-[8px] text-center border border-border/50 shadow-2xl relative overflow-hidden group">
             <div className="absolute inset-0 premium-gradient opacity-0 group-hover:opacity-[0.02] transition-opacity pointer-events-none" />
             <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 text-primary">Ready to be part of the <span className="italic text-secondary">story?</span></h2>
             <p className="text-muted-foreground max-w-xl mx-auto mb-12 text-lg">
                Join the most prestigious student initiative and start your path to recognition today.
             </p>
             <Link href="/register">
                <Button className="h-16 px-12 rounded-[8px] bg-primary text-white font-bold text-lg hover:scale-105 transition-transform shadow-glow-primary border-none">
                   Join the Initiative
                </Button>
             </Link>
          </div>
       </div>
    </section>
  );
};
