"use client";

import React from "react";
import { Button } from "@/components/ui/button";

import Link from "next/link";

export const RaceSupportCTA = () => {
  return (
    <section className="pb-24 pt-12 bg-muted/50">
       <div className="container mx-auto px-6">
          <div className="bg-card p-12 md:p-20 rounded-[8px] border border-border/50 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
             <div className="max-w-2xl space-y-6 relative z-10 text-center md:text-left">
                <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight text-primary">Can't find a <span className="italic text-secondary">Challenge?</span></h2>
                <p className="text-muted-foreground text-lg">
                  Check our academic calendar for upcoming events or contact the coordination office to propose a new challenge in your field.
                </p>
             </div>
             <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full md:w-auto">
                <Link href="/events">
                  <Button size="lg" variant="secondary" className="h-16 px-10 rounded-[8px] font-bold shadow-glow-secondary text-primary border-none">
                    View Calendar
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="h-16 px-10 rounded-[8px] font-bold border-border text-primary hover:bg-muted">
                    Get Support
                  </Button>
                </Link>
             </div>
          </div>
       </div>
    </section>
  );
};
