"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const CTA = () => {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto px-6">
        <div className="bg-card rounded-[5px] p-12 md:p-24 text-center border border-border/50 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-full premium-gradient opacity-0 group-hover:opacity-[0.02] transition-opacity" />
          <h2 className="text-5xl md:text-6xl font-serif font-bold text-primary mb-8">Ready to Claim Your <span className="italic text-secondary">Victory?</span></h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Join thousands of students who are already pushing their limits and winning extraordinary rewards.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
             <Link href="/register">
               <Button size="lg" className="h-16 px-12 rounded-[5px] text-lg font-bold shadow-glow-primary">
                  Register Now
               </Button>
             </Link>
             <Link href="/contact">
               <Button size="lg" variant="outline" className="h-16 px-12 rounded-[5px] text-lg font-bold">
                  Talk to Us
               </Button>
             </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
